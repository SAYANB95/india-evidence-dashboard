"use client";

import { useMemo, useState } from "react";
import type { EditorialRecord, EditorialWorkflow } from "../../lib/editorial";

export default function EditorialClient({records}:{records:EditorialRecord[]}){
  const [query,setQuery]=useState("");
  const [kind,setKind]=useState("All record types");
  const [workflow,setWorkflow]=useState("All workflow states");
  const workflows:EditorialWorkflow[]=["Ready for import","Gap review","Definition review"];
  const filtered=useMemo(()=>records.filter(record=>{
    const matchesQuery=!query || JSON.stringify(record).toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (kind === "All record types" || record.kind === kind) && (workflow === "All workflow states" || record.workflow === workflow);
  }),[records,query,kind,workflow]);

  return <section className="editorial-queue" id="queue"><div className="editorial-head"><div><p className="eyebrow">Seed migration queue</p><h2>Review the evidence before the interface.</h2></div><p>This queue audits database readiness only. “Ready for import” does not mean the claim has passed the future two-person publication workflow.</p></div>
    <div className="editorial-controls"><label>Search<input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Record, state, source, missing field…"/></label><label>Record type<select value={kind} onChange={event=>setKind(event.target.value)}><option>All record types</option><option>Toll plaza</option><option>Infrastructure project</option></select></label><label>Workflow<select value={workflow} onChange={event=>setWorkflow(event.target.value)}><option>All workflow states</option>{workflows.map(item=><option key={item}>{item}</option>)}</select></label><a href="/api/editorial/export">Download migration CSV ↓</a></div>
    <div className="editorial-count"><b>{filtered.length}</b> of {records.length} seed records <span>Read-only preview</span></div>
    <div className="editorial-table" aria-label="Editorial migration queue"><div className="editorial-table-head"><span>Record</span><span>Workflow</span><span>Evidence</span><span>Gaps & source</span></div>{filtered.map(record=><article key={record.id}>
      <div><small>{record.kind} · {record.jurisdiction}</small><h3>{record.title}</h3><p>{record.topic} · version {record.recordVersion}</p></div>
      <div><b data-workflow={record.workflow}>{record.workflow}</b><small>{record.workflow === "Ready for import" ? "Seed fields pass migration check" : "Human review required"}</small></div>
      <div><strong>{record.currentValue}</strong><p>{record.definition}</p><details><summary>Definition & limitation +</summary><p>{record.limitation}</p></details></div>
      <div><div className="gap-tags">{record.missingFields.length ? record.missingFields.map(item=><span key={item}>{item}</span>) : <b>No core seed gaps</b>}</div><small>{record.sourcePeriod}</small><a href={record.sourceUrl} target="_blank" rel="noreferrer">{record.sourceLabel} ↗</a></div>
    </article>)}</div>
    {!filtered.length&&<div className="registry-empty"><b>No matching migration record.</b><p>Clear one or more filters. This does not remove or alter any evidence.</p></div>}
  </section>
}
