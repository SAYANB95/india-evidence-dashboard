import { randomUUID } from "node:crypto";
import { and, count, eq, gte, sql } from "drizzle-orm";
import { getDb } from "../../../../db/postgres";
import { editorialActionAttempts, evidenceRecords, revisions, reviews } from "../../../../db/pg-schema";
import { canSubmitReview, getEditorialActor } from "../../../../lib/editor-auth";

const reviewTypes=["source","definition","publication"] as const;
const decisions=["approved","changes_requested","rejected"] as const;

export async function POST(request:Request){
  const correlationId=randomUUID();
  try {
  const actor=await getEditorialActor();
  if(!actor) return Response.json({error:"Authentication required.",correlationId},{status:401});
  const origin=request.headers.get("origin");
  if(!origin || origin!==new URL(request.url).origin) return Response.json({error:"Same-origin request required.",correlationId},{status:403});
  if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({error:"JSON content type required.",correlationId},{status:415});
  const declaredLength=Number(request.headers.get("content-length")||0);
  if(declaredLength>12_000) return Response.json({error:"Request body is too large.",correlationId},{status:413});
  const db=getDb();
  const now=new Date();
  const cutoff=new Date(now.getTime()-60_000).toISOString();
  const [recentAttempts]=await db.select({value:count()}).from(editorialActionAttempts).where(and(eq(editorialActionAttempts.actorId,actor.userId),gte(editorialActionAttempts.attemptedAt,cutoff)));
  if(recentAttempts.value>=20) return Response.json({error:"Too many editorial requests. Try again shortly.",correlationId},{status:429,headers:{"Retry-After":"60"}});
  await db.insert(editorialActionAttempts).values({id:randomUUID(),actorId:actor.userId,route:"reviews",attemptedAt:now.toISOString()});
  let body:Record<string,unknown>;
  try { const raw=await request.text(); if(raw.length>12_000) return Response.json({error:"Request body is too large.",correlationId},{status:413}); body=JSON.parse(raw); } catch { return Response.json({error:"A valid JSON body is required.",correlationId},{status:400}); }
  const recordId=typeof body.recordId==="string"?body.recordId:"";
  const reviewType=typeof body.reviewType==="string"?body.reviewType:"";
  const decision=typeof body.decision==="string"?body.decision:"";
  const note=typeof body.note==="string"?body.note.trim():"";
  if(!reviewTypes.includes(reviewType as typeof reviewTypes[number]) || !decisions.includes(decision as typeof decisions[number]) || note.length<20 || note.length>2000) return Response.json({error:"Choose a valid stage and decision, with a 20–2,000 character evidence note.",correlationId},{status:400});
  if(!canSubmitReview(actor.role,reviewType)) return Response.json({error:"Your editorial role cannot perform this review stage.",correlationId},{status:403});
  const [record]=await db.select().from(evidenceRecords).where(eq(evidenceRecords.id,recordId)).limit(1);
  if(!record) return Response.json({error:"Evidence record not found.",correlationId},{status:404});
  if(reviewType==="publication" && decision==="approved"){
    const approvals=await db.select({reviewType:reviews.reviewType,reviewerId:reviews.reviewerId}).from(reviews).where(and(eq(reviews.recordId,recordId),eq(reviews.decision,"approved")));
    const hasSource=approvals.some(review=>review.reviewType==="source");
    const hasDefinition=approvals.some(review=>review.reviewType==="definition");
    const hasSecondPerson=approvals.some(review=>review.reviewerId!==actor.userId);
    if(!hasSource || !hasDefinition || !hasSecondPerson) return Response.json({error:"Publication requires approved source and definition reviews, including an approval by a different user.",correlationId},{status:409});
  }
  const recordedAt=now.toISOString();
  const workflowStatus=decision==="rejected"?"rejected":decision==="changes_requested"?"draft":reviewType==="source"?"definition_review":reviewType==="definition"?"ready":"published";
  const reviewId=randomUUID();
  const revisionId=randomUUID();
  const changedFields=JSON.stringify({workflowStatus,reviewType,decision});
  await db.execute(sql`WITH next_revision AS MATERIALIZED (
      SELECT COALESCE(MAX(${revisions.revisionNumber}), 0) + 1 AS revision_number
      FROM ${revisions} WHERE ${revisions.recordId} = ${recordId}
    ), inserted_review AS (
      INSERT INTO ${reviews} ("id", "record_id", "review_type", "decision", "note", "reviewer_id", "created_at")
      VALUES (${reviewId}, ${recordId}, ${reviewType}, ${decision}, ${note}, ${actor.userId}, ${recordedAt}) RETURNING "id"
    ), updated_record AS (
      UPDATE ${evidenceRecords} SET "workflow_status" = ${workflowStatus}, "updated_at" = ${recordedAt},
        "published_at" = CASE WHEN ${workflowStatus} = 'published' THEN ${recordedAt} ELSE "published_at" END
      WHERE "id" = ${recordId} AND EXISTS (SELECT 1 FROM inserted_review) RETURNING "id"
    )
    INSERT INTO ${revisions} ("id", "record_id", "revision_number", "changed_fields_json", "reason", "actor_id", "created_at")
    SELECT ${revisionId}, ${recordId}, next_revision.revision_number, ${changedFields}, ${note}, ${actor.userId}, ${recordedAt}
    FROM next_revision, updated_record`);
  return Response.json({ok:true,workflowStatus,recordId,correlationId});
  } catch(error) {
    console.error("Editorial review request failed.",{correlationId,errorType:error instanceof Error?error.name:"UnknownError"});
    return Response.json({error:"The editorial action could not be completed.",correlationId},{status:500,headers:{"Cache-Control":"no-store"}});
  }
}
