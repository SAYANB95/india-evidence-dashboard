"use client";

import { useMemo, useState } from "react";
import { economy, jurisdictions, topicRecords } from "../../lib/evidence";

export default function ExploreClient() {
  const [query,setQuery] = useState("");
  const [type,setType] = useState("All");
  const [topic,setTopic] = useState("All topics");
  const rows = useMemo(() => jurisdictions.filter((item) => (type === "All" || item.type === type) && `${item.name} ${item.capital} ${topic}`.toLowerCase().includes(query.toLowerCase())),[query,type,topic]);
  return <section className="directory-body"><div className="directory-controls"><label>Search<input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="State, UT, capital or topic"/></label><label>Jurisdiction<select value={type} onChange={(event)=>setType(event.target.value)}><option>All</option><option>State</option><option>Union territory</option></select></label><label>Topic<select value={topic} onChange={(event)=>setTopic(event.target.value)}><option>All topics</option>{topicRecords.map((item)=><option key={item.id}>{item.label}</option>)}</select></label></div><p className="result-count" aria-live="polite">{rows.length} jurisdictions shown</p><div className="directory-grid">{rows.map((item) => { const record=economy[item.name]; return <article key={item.slug}><span>{item.type}</span><h2>{item.name}</h2><p>{item.capital}</p><div><b>{record?.perCapita ? `₹${record.perCapita.value.toLocaleString("en-IN")}` : "Data gap"}</b><small>Per-capita NSDP · {record?.perCapita?.year || "no published value"}</small></div><div><b>{topic === "All topics" ? `${topicRecords.filter((x)=>x.status!=="data gap").length} mapped topics` : topicRecords.find((x)=>x.label===topic)?.status}</b><small>{topic === "All topics" ? "Not all contain ingested values" : "Coverage state"}</small></div><a href={`/state/${item.slug}`}>Open complete state record →</a></article>; })}</div></section>;
}
