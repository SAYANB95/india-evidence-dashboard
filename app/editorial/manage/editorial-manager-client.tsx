"use client";

import { useMemo, useState } from "react";
import type { EditorialRole } from "../../../lib/editor-auth";

type RecordRow = { id:string; title:string; jurisdiction:string; topic:string; workflowStatus:string; evidenceStatus:string };

export default function EditorialManagerClient({ records, role }:{ records:RecordRow[]; role:EditorialRole }) {
  const [recordId,setRecordId]=useState(records[0]?.id || "");
  const [reviewType,setReviewType]=useState("source");
  const [decision,setDecision]=useState("approved");
  const [note,setNote]=useState("");
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  const selected=useMemo(()=>records.find(record=>record.id===recordId),[records,recordId]);

  async function submitReview(event:React.FormEvent){
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response=await fetch("/api/editorial/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({recordId,reviewType,decision,note})});
      const body=await response.json();
      setMessage(response.ok ? `Review recorded. Workflow is now ${body.workflowStatus}.` : body.error || "Review could not be recorded.");
      if(response.ok) setNote("");
    } catch { setMessage("The review service is unavailable. No action was recorded."); }
    finally { setBusy(false); }
  }

  return <section className="manager-workspace">
    <div className="manager-records"><p className="eyebrow">Evidence records</p><h2>Select a record.</h2>{records.map(record=><button key={record.id} type="button" aria-pressed={record.id===recordId} onClick={()=>setRecordId(record.id)}><small>{record.jurisdiction} · {record.topic}</small><strong>{record.title}</strong><span>{record.workflowStatus}</span></button>)}</div>
    <form className="review-form" onSubmit={submitReview}><p className="eyebrow">Audited review action</p><h2>{selected?.title || "No evidence record"}</h2><p>Your Clerk identity, role, decision, note and timestamp are stored. Publication approval is rejected unless source and definition approvals exist and at least one was made by another user.</p>
      <label>Review stage<select value={reviewType} onChange={event=>setReviewType(event.target.value)}><option value="source">Source review</option><option value="definition">Definition review</option><option value="publication" disabled={role!=="publisher"}>Publication approval</option></select></label>
      <label>Decision<select value={decision} onChange={event=>setDecision(event.target.value)}><option value="approved">Approved</option><option value="changes_requested">Changes requested</option><option value="rejected">Rejected</option></select></label>
      <label>Evidence note<textarea value={note} onChange={event=>setNote(event.target.value)} minLength={20} maxLength={2000} required placeholder="Cite the supporting table, passage, definition issue or reason for the decision."/></label>
      <button disabled={busy || !recordId}>{busy ? "Recording…" : "Record review"}</button>{message&&<output aria-live="polite">{message}</output>}
    </form>
  </section>;
}
