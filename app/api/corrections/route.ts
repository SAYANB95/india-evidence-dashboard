import { createHmac, randomUUID } from "node:crypto";
import { and, count, eq, gte, sql } from "drizzle-orm";
import { getDb } from "../../../db/postgres";
import { corrections, evidenceRecords, publicActionAttempts } from "../../../db/pg-schema";

const MAX_BODY=9_000;

function anonymousActorHash(request:Request){
  const secret=process.env.CORRECTION_HASH_SECRET;
  if(!secret || secret.length<24) return null;
  const forwarded=request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()||"unknown";
  const agent=(request.headers.get("user-agent")||"unknown").slice(0,240);
  return createHmac("sha256",secret).update(`${forwarded}|${agent}`).digest("hex");
}

export function safeSupportingUrl(value:unknown){
  if(value==null || value==="") return null;
  if(typeof value!=="string" || value.length>1200 || [...value].some(character=>{const code=character.charCodeAt(0);return code<32||code===127;})) return undefined;
  try { const url=new URL(value); if(url.protocol!=="https:" || url.username || url.password || url.port) return undefined; return url.toString(); } catch { return undefined; }
}

export async function POST(request:Request){
  const correlationId=randomUUID();
  try {
    const origin=request.headers.get("origin");
    if(!origin || origin!==new URL(request.url).origin) return Response.json({error:"Same-origin request required.",correlationId},{status:403});
    if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({error:"JSON content type required.",correlationId},{status:415});
    const declaredLength=Number(request.headers.get("content-length")||0);
    if(declaredLength>MAX_BODY) return Response.json({error:"Request body is too large.",correlationId},{status:413});
    const actorHash=anonymousActorHash(request);
    if(!actorHash) return Response.json({error:"Correction intake is temporarily unavailable.",correlationId},{status:503,headers:{"Cache-Control":"no-store"}});
    const db=getDb(); const now=new Date(); const cutoff=new Date(now.getTime()-60*60*1000).toISOString();
    const [recent]=await db.select({value:count()}).from(publicActionAttempts).where(and(eq(publicActionAttempts.actorHash,actorHash),eq(publicActionAttempts.route,"corrections"),gte(publicActionAttempts.attemptedAt,cutoff)));
    if(recent.value>=5) return Response.json({error:"Too many correction requests. Try again later.",correlationId},{status:429,headers:{"Retry-After":"3600"}});
    let body:Record<string,unknown>; try { const raw=await request.text(); if(raw.length>MAX_BODY) return Response.json({error:"Request body is too large.",correlationId},{status:413}); body=JSON.parse(raw); } catch { return Response.json({error:"A valid JSON body is required.",correlationId},{status:400}); }
    const recordId=typeof body.recordId==="string"&&body.recordId.trim()?body.recordId.trim():null;
    const requestText=typeof body.requestText==="string"?body.requestText.trim():"";
    const supportingUrl=safeSupportingUrl(body.supportingUrl);
    const attestation=body.attestation===true;
    if(requestText.length<30 || requestText.length>3000 || supportingUrl===undefined || !attestation) return Response.json({error:"Provide a 30–3,000 character correction, an optional valid HTTPS source, and confirm the evidence-only policy.",correlationId},{status:400});
    if(recordId){ const [record]=await db.select({id:evidenceRecords.id}).from(evidenceRecords).where(eq(evidenceRecords.id,recordId)).limit(1); if(!record) return Response.json({error:"The referenced evidence record was not found.",correlationId},{status:404}); }
    const receipt=randomUUID(); const recordedAt=now.toISOString();
    const attemptId=randomUUID();
    await db.execute(sql`WITH inserted_attempt AS (
      INSERT INTO ${publicActionAttempts} ("id", "actor_hash", "route", "attempted_at")
      VALUES (${attemptId}, ${actorHash}, 'corrections', ${recordedAt}) RETURNING "id"
    )
    INSERT INTO ${corrections} ("id", "record_id", "request_text", "supporting_url", "status", "created_at")
    SELECT ${receipt}, ${recordId}, ${requestText}, ${supportingUrl}, 'received', ${recordedAt} FROM inserted_attempt`);
    return Response.json({ok:true,receipt,status:"received",correlationId},{status:201,headers:{"Cache-Control":"no-store"}});
  } catch(error){ console.error("Correction request failed.",{correlationId,errorType:error instanceof Error?error.name:"UnknownError"}); return Response.json({error:"The correction request could not be recorded.",correlationId},{status:500,headers:{"Cache-Control":"no-store"}}); }
}
