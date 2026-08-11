"use client";

import { useMemo, useState } from "react";

type TollPlaza = {
  id:string; name:string; state:string; highway:string; location:string; model:string; stretch:string;
  tollableLengthKm:number; feeEffective:string; revisionDue:string; carSingle:number|null; carReturn:number|null;
  carMonthly:number|null; localPass:number|null; notificationDate:string|null; commercialOperationDate:string|null;
  capitalCostCrore:number|null; cumulativeRevenueCrore:number|null; revenueAsOf:string|null;
  concessionPeriod:string|null; concessionaire:string|null; trafficPcu:number|null; trafficAsOf:string|null; sourceUrl:string;
};
type Project = {
  id:string; name:string; mode:string; state:string; agency:string; deliveryModel:string; lengthKm:number|null;
  originalCostCrore:number|null; currentCostCrore:number|null; originalDeadline:string|null; currentMilestone:string;
  status:string; progressValue:number|null; progressDefinition:string; contractor:string|null; sourcePeriod:string; sourceUrl:string;
};

const money = (value:number|null) => value === null ? "Data gap" : `₹${value.toLocaleString("en-IN")} cr`;
const rate = (value:number|null) => value === null ? "Data gap" : `₹${value.toLocaleString("en-IN")}`;
const value = (item:string|number|null, suffix="") => item === null ? "Data gap" : `${typeof item === "number" ? item.toLocaleString("en-IN") : item}${suffix}`;

export default function RegistryClient({tollPlazas, projects}:{tollPlazas:TollPlaza[]; projects:Project[]}) {
  const [view,setView]=useState<"tolls"|"projects">("tolls");
  const [query,setQuery]=useState("");
  const [state,setState]=useState("All jurisdictions");
  const [category,setCategory]=useState("All models");

  const dataset=view === "tolls" ? tollPlazas : projects;
  const states=useMemo(()=>["All jurisdictions",...Array.from(new Set(dataset.map(item=>item.state))).sort()], [dataset]);
  const categories=useMemo(()=>[view === "tolls" ? "All models" : "All modes",...Array.from(new Set(dataset.map(item=>view === "tolls" ? (item as TollPlaza).model : (item as Project).mode))).sort()], [dataset,view]);
  const filtered=useMemo(()=>dataset.filter(item=>{
    const haystack=JSON.stringify(item).toLowerCase();
    const itemCategory=view === "tolls" ? (item as TollPlaza).model : (item as Project).mode;
    return (!query || haystack.includes(query.toLowerCase())) && (state === "All jurisdictions" || item.state === state) && (category.startsWith("All ") || itemCategory === category);
  }).sort((a,b)=>a.name.localeCompare(b.name)),[dataset,query,state,category,view]);
  const selectView=(next:"tolls"|"projects")=>{setView(next);setQuery("");setState("All jurisdictions");setCategory(next === "tolls" ? "All models" : "All modes");};

  const tollStates=new Set(tollPlazas.map(item=>item.state)).size;
  const costLoaded=tollPlazas.filter(item=>item.capitalCostCrore !== null).length;
  const revenueLoaded=tollPlazas.filter(item=>item.cumulativeRevenueCrore !== null).length;
  const projectModes=new Set(projects.map(item=>item.mode)).size;

  return <section className="registry-body" id="registry">
    <div className="registry-coverage" aria-label="Registry coverage">
      <article><span>Verified plaza records</span><strong>{tollPlazas.length}</strong><p>Across {tollStates} states; official 2024 total was 1,051 ETC plazas.</p></article>
      <article><span>Seed coverage</span><strong>{(tollPlazas.length/1051*100).toFixed(1)}%</strong><p>Illustrative coverage only—not a statistically representative sample.</p></article>
      <article><span>Project/programme records</span><strong>{projects.length}</strong><p>Road, rail and aviation across {projectModes} transport modes.</p></article>
      <article><span>Plaza field completeness</span><strong>{costLoaded}/{revenueLoaded}</strong><p>Capital-cost loaded / cumulative-revenue loaded.</p></article>
    </div>

    <div className="registry-tabs" role="tablist" aria-label="Registry dataset">
      <button role="tab" aria-selected={view === "tolls"} onClick={()=>selectView("tolls")}>Toll plazas <b>{tollPlazas.length}</b></button>
      <button role="tab" aria-selected={view === "projects"} onClick={()=>selectView("projects")}>Projects & programmes <b>{projects.length}</b></button>
    </div>

    <div className="registry-controls">
      <label>Search records<input value={query} onChange={event=>setQuery(event.target.value)} placeholder={view === "tolls" ? "Plaza, highway, stretch…" : "Project, agency, milestone…"}/></label>
      <label>Jurisdiction<select value={state} onChange={event=>setState(event.target.value)}>{states.map(item=><option key={item}>{item}</option>)}</select></label>
      <label>{view === "tolls" ? "Delivery model" : "Transport mode"}<select value={category} onChange={event=>setCategory(event.target.value)}>{categories.map(item=><option key={item}>{item}</option>)}</select></label>
      <a className="registry-download" href={`/api/infrastructure/export?dataset=${view}`}>Download full seed CSV ↓</a>
    </div>

    <div className="registry-result-line"><b>{filtered.length}</b> of {dataset.length} verified seed records shown <span>· Sorted alphabetically · No performance rank</span></div>

    {view === "tolls" ? <div className="registry-grid">{(filtered as TollPlaza[]).map(plaza=><article className="registry-card" key={plaza.id}>
      <div className="registry-card-head"><span>{plaza.state} · {plaza.highway}</span><b>{plaza.model}</b><h2>{plaza.name}</h2><p>{plaza.stretch} · {plaza.location}</p></div>
      <div className="registry-rate"><span>Car / jeep / van · single journey</span><strong>{rate(plaza.carSingle)}</strong><small>Return {rate(plaza.carReturn)} · Monthly {rate(plaza.carMonthly)}</small></div>
      <dl className="registry-facts"><div><dt>Tollable length</dt><dd>{value(plaza.tollableLengthKm," km")}</dd></div><div><dt>Fee effective</dt><dd>{plaza.feeEffective}</dd></div><div><dt>Capital cost</dt><dd>{money(plaza.capitalCostCrore)}</dd></div><div><dt>Revenue recorded</dt><dd>{money(plaza.cumulativeRevenueCrore)}</dd></div></dl>
      <details><summary>Open evidence fields <span>+</span></summary><dl>
        <div><dt>Rate revision due</dt><dd>{plaza.revisionDue}</dd></div><div><dt>Local pass</dt><dd>{rate(plaza.localPass)}</dd></div>
        <div><dt>Notification date</dt><dd>{value(plaza.notificationDate)}</dd></div><div><dt>Commercial operation</dt><dd>{value(plaza.commercialOperationDate)}</dd></div>
        <div><dt>Revenue as of</dt><dd>{value(plaza.revenueAsOf)}</dd></div><div><dt>Concession period</dt><dd>{value(plaza.concessionPeriod)}</dd></div>
        <div><dt>Operator / concessionaire</dt><dd>{value(plaza.concessionaire)}</dd></div><div><dt>Traffic</dt><dd>{plaza.trafficPcu === null ? "Data gap" : `${plaza.trafficPcu.toLocaleString("en-IN")} PCU · ${plaza.trafficAsOf}`}</dd></div>
      </dl><p>Rates and associated fields reproduce the cited NHTIS record. Revenue/traffic dates can be much older than the current fee schedule and must not be treated as current.</p></details>
      <a href={plaza.sourceUrl} target="_blank" rel="noreferrer">Open official NHTIS record ↗</a>
    </article>)}</div> : <div className="registry-grid">{(filtered as Project[]).map(project=><article className="registry-card project-card" key={project.id}>
      <div className="registry-card-head"><span>{project.mode} · {project.state}</span><b>{project.status}</b><h2>{project.name}</h2><p>{project.agency} · {project.deliveryModel}</p></div>
      <div className="project-milestone"><span>Latest sourced milestone</span><strong>{project.currentMilestone}</strong><small>{project.sourcePeriod}</small></div>
      {project.progressValue !== null && <div className="registry-progress"><span style={{width:`${project.progressValue}%`}}/><b>{project.progressValue}%</b></div>}
      <dl className="registry-facts"><div><dt>Length / output</dt><dd>{value(project.lengthKm," km")}</dd></div><div><dt>Current cost</dt><dd>{money(project.currentCostCrore)}</dd></div><div><dt>Original cost</dt><dd>{money(project.originalCostCrore)}</dd></div><div><dt>Original deadline</dt><dd>{value(project.originalDeadline)}</dd></div></dl>
      <details><summary>Definition & limitation <span>+</span></summary><p>{project.progressDefinition}</p><dl><div><dt>Contractor / operator</dt><dd>{value(project.contractor)}</dd></div><div><dt>Source period</dt><dd>{project.sourcePeriod}</dd></div></dl></details>
      <a href={project.sourceUrl} target="_blank" rel="noreferrer">Open primary public record ↗</a>
    </article>)}</div>}
    {filtered.length === 0 && <div className="registry-empty"><b>No matching verified seed record.</b><p>Clear a filter or search another name. Absence here does not mean the plaza or project does not exist.</p></div>}
    <aside className="registry-method"><b>Coverage rule</b><p>The 1,051-plaza denominator is the MoRTH count of NH fee plazas with electronic toll collection as of 31 December 2024. The eight displayed pages are manually verified examples from NHTIS. They are not a complete sample, live transaction feed, fraud register or quality ranking.</p><a href="https://morth.nic.in/sites/default/files/Annual-Report-English-with-Cover.pdf" target="_blank" rel="noreferrer">MoRTH Annual Report 2024–25 ↗</a></aside>
  </section>;
}
