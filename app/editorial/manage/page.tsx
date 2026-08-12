import { UserButton } from "@clerk/nextjs";
import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "../../../db/postgres";
import { evidenceRecords, jurisdictions } from "../../../db/pg-schema";
import { getEditorialActor } from "../../../lib/editor-auth";
import EditorialManagerClient from "./editorial-manager-client";

export const dynamic="force-dynamic";
export const metadata={title:"Protected editorial manager — India Evidence Dashboard",robots:{index:false,follow:false}};

export default async function EditorialManagerPage(){
  const actor=await getEditorialActor();
  if(!actor) redirect("/sign-in?redirect_url=/editorial/manage");
  const shell=(content:React.ReactNode)=><main className="editorial-shell manager-shell"><header className="record-header"><Link className="record-brand" href="/"><span className="brand-mark"/><b>India Evidence <em>Dashboard</em></b></Link><nav><Link href="/editorial">Public console</Link><Link href="/#methodology">Methodology</Link></nav><div className="manager-user"><span>{actor.displayName}</span><UserButton/></div></header>{content}</main>;
  if(!actor.role) return shell(<section className="access-pending"><p className="eyebrow">Signed in · role not assigned</p><h1>Editorial access is pending.</h1><p>Your identity is authenticated, but no editorial role is present in Clerk public metadata. An administrator must assign <code>editor</code>, <code>reviewer</code> or <code>publisher</code>.</p><dl><div><dt>User ID</dt><dd>{actor.userId}</dd></div><div><dt>Email</dt><dd>{actor.email}</dd></div></dl><Link href="/editorial">Return to the read-only console</Link></section>);
  const db=getDb();
  const records=await db.select({id:evidenceRecords.id,title:evidenceRecords.title,jurisdiction:jurisdictions.name,topic:evidenceRecords.topic,workflowStatus:evidenceRecords.workflowStatus,evidenceStatus:evidenceRecords.evidenceStatus}).from(evidenceRecords).innerJoin(jurisdictions,eq(evidenceRecords.jurisdictionId,jurisdictions.id)).orderBy(asc(jurisdictions.name),asc(evidenceRecords.title));
  return shell(<><section className="manager-hero"><div><p className="eyebrow">Protected editorial manager</p><h1>Review with<br/><span>an audit trail.</span></h1></div><div><b>{actor.role}</b><p>{actor.displayName}<br/>{actor.email}</p><small>Role permissions are checked again by the server for every action.</small></div></section><EditorialManagerClient records={records} role={actor.role}/></>);
}
