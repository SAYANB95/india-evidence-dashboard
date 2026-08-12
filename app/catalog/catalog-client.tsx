"use client";

import { useMemo, useState } from "react";
import { catalogGroups, evidenceCatalog, type EvidenceCoverage } from "../../lib/catalog";

const statuses: Array<"All coverage" | EvidenceCoverage> = ["All coverage","loaded","connected","source mapped","editorial queue","data gap"];

export default function CatalogClient(){
  const [query,setQuery]=useState(""); const [group,setGroup]=useState("All domains"); const [coverage,setCoverage]=useState<(typeof statuses)[number]>("All coverage");
  const rows=useMemo(()=>evidenceCatalog.filter((item)=>(group==="All domains"||item.group===group)&&(coverage==="All coverage"||item.coverage===coverage)&&`${item.label} ${item.group} ${item.definition} ${item.sourceTitle}`.toLowerCase().includes(query.toLowerCase())),[query,group,coverage]);
  return <section className="catalog-body"><div className="catalog-controls"><label>Search the evidence model<input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Budget, hospitals, tolls, courts…"/></label><label>Domain<select value={group} onChange={(event)=>setGroup(event.target.value)}><option>All domains</option>{catalogGroups.map((item)=><option key={item}>{item}</option>)}</select></label><label>Coverage<select value={coverage} onChange={(event)=>setCoverage(event.target.value as typeof coverage)}>{statuses.map((item)=><option key={item}>{item}</option>)}</select></label></div><div className="catalog-result"><b>{rows.length}</b> evidence domains shown <span>Coverage describes this dashboard—not the importance of the subject.</span></div><div className="catalog-grid">{rows.map((item)=><article key={item.id} id={item.id}><div className="catalog-card-head"><span>{item.group}</span><b data-coverage={item.coverage}>{item.coverage}</b></div><h2>{item.label}</h2><dl><div><dt>Refresh pattern</dt><dd>{item.cadence}</dd></div><div><dt>Geography</dt><dd>{item.geography}</dd></div></dl><p><strong>Definition</strong>{item.definition}</p><p><strong>Limitation</strong>{item.limitation}</p><div className="catalog-links"><a href={item.sourceUrl} target={item.sourceUrl.startsWith("http")?"_blank":undefined} rel="noreferrer">{item.sourceTitle} ↗</a>{item.route&&<a href={item.route}>Open dashboard module →</a>}</div></article>)}</div></section>;
}
