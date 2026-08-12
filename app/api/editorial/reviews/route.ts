import { randomUUID } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../../db/postgres";
import { evidenceRecords, revisions, reviews } from "../../../../db/pg-schema";
import { canSubmitReview, getEditorialActor } from "../../../../lib/editor-auth";

const reviewTypes=["source","definition","publication"] as const;
const decisions=["approved","changes_requested","rejected"] as const;

export async function POST(request:Request){
  const actor=await getEditorialActor();
  if(!actor) return Response.json({error:"Authentication required."},{status:401});
  let body:Record<string,unknown>;
  try { body=await request.json(); } catch { return Response.json({error:"A valid JSON body is required."},{status:400}); }
  const recordId=typeof body.recordId==="string"?body.recordId:"";
  const reviewType=typeof body.reviewType==="string"?body.reviewType:"";
  const decision=typeof body.decision==="string"?body.decision:"";
  const note=typeof body.note==="string"?body.note.trim():"";
  if(!reviewTypes.includes(reviewType as typeof reviewTypes[number]) || !decisions.includes(decision as typeof decisions[number]) || note.length<20 || note.length>2000) return Response.json({error:"Choose a valid stage and decision, with a 20–2,000 character evidence note."},{status:400});
  if(!canSubmitReview(actor.role,reviewType)) return Response.json({error:"Your editorial role cannot perform this review stage."},{status:403});
  const db=getDb();
  const [record]=await db.select().from(evidenceRecords).where(eq(evidenceRecords.id,recordId)).limit(1);
  if(!record) return Response.json({error:"Evidence record not found."},{status:404});
  if(reviewType==="publication" && decision==="approved"){
    const approvals=await db.select({reviewType:reviews.reviewType,reviewerId:reviews.reviewerId}).from(reviews).where(and(eq(reviews.recordId,recordId),eq(reviews.decision,"approved")));
    const hasSource=approvals.some(review=>review.reviewType==="source");
    const hasDefinition=approvals.some(review=>review.reviewType==="definition");
    const hasSecondPerson=approvals.some(review=>review.reviewerId!==actor.userId);
    if(!hasSource || !hasDefinition || !hasSecondPerson) return Response.json({error:"Publication requires approved source and definition reviews, including an approval by a different user."},{status:409});
  }
  const now=new Date().toISOString();
  await db.insert(reviews).values({id:randomUUID(),recordId,reviewType,decision,note,reviewerId:actor.userId,createdAt:now});
  const workflowStatus=decision==="rejected"?"rejected":decision==="changes_requested"?"draft":reviewType==="source"?"definition_review":reviewType==="definition"?"ready":"published";
  await db.update(evidenceRecords).set({workflowStatus,updatedAt:now,...(workflowStatus==="published"?{publishedAt:now}:{})}).where(eq(evidenceRecords.id,recordId));
  const [latestRevision]=await db.select({revisionNumber:revisions.revisionNumber}).from(revisions).where(eq(revisions.recordId,recordId)).orderBy(desc(revisions.revisionNumber)).limit(1);
  await db.insert(revisions).values({id:randomUUID(),recordId,revisionNumber:(latestRevision?.revisionNumber||0)+1,changedFieldsJson:JSON.stringify({workflowStatus,reviewType,decision}),reason:note,actorId:actor.userId,createdAt:now});
  return Response.json({ok:true,workflowStatus,recordId});
}
