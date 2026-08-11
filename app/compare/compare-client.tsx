"use client";

import { useMemo, useState } from "react";
import { economy, jurisdictions } from "../../lib/evidence";

function Compare({ initialLeft }: { initialLeft?:string }) {
  const [left,setLeft]=useState(initialLeft && jurisdictions.some((x)=>x.slug===initialLeft) ? initialLeft : "maharashtra");
  const [right,setRight]=useState("tamil-nadu");
  const a=jurisdictions.find((x)=>x.slug===left)!; const b=jurisdictions.find((x)=>x.slug===right)!;
  const records=useMemo(()=>[a,b].map((j)=>({j,e:economy[j.name]||{}})),[a,b]);
  const maxPc=Math.max(...records.map((x)=>x.e.perCapita?.value||0),1);
  return <><section className="compare-hero"><p className="eyebrow">Metric-by-metric comparison</p><h1>Compare definitions, not scores.</h1><p>Only compatible measures are placed side by side. Differing source years remain visible.</p><div><label>First jurisdiction<select value={left} onChange={(e)=>setLeft(e.target.value)}>{jurisdictions.map((j)=><option key={j.slug} value={j.slug}>{j.name}</option>)}</select></label><span>versus</span><label>Second jurisdiction<select value={right} onChange={(e)=>setRight(e.target.value)}>{jurisdictions.map((j)=><option key={j.slug} value={j.slug}>{j.name}</option>)}</select></label></div></section><section className="comparison-table"><div className="comparison-head"><span>Metric</span><strong>{a.name}</strong><strong>{b.name}</strong></div><div className="comparison-row"><span>Per-capita NSDP<small>Current prices · RBI</small></span>{records.map(({j,e})=><div key={j.slug}><b>{e.perCapita ? `₹${e.perCapita.value.toLocaleString("en-IN")}` : "Data gap"}</b><i style={{width:`${((e.perCapita?.value||0)/maxPc)*100}%`}}/><small>{e.perCapita?.year || "No value"}</small></div>)}</div><div className="comparison-row"><span>Total NSDP<small>Current prices · Economic Survey</small></span>{records.map(({j,e})=><div key={j.slug}><b>{e.output ? `₹${(e.output.valueCrore/100000).toLocaleString("en-IN",{maximumFractionDigits:2})} lakh cr` : "Data gap"}</b><small>{e.output?.year || "No value"}</small></div>)}</div><aside><b>Comparison limitation</b><p>A higher nominal value is not a government-performance score. Population, price levels, industry mix, boundary definitions and revision status differ. Source years shown above must match before drawing a strict ranking conclusion.</p></aside><div className="comparison-links"><a href={`/state/${a.slug}`}>Open {a.name} record →</a><a href={`/state/${b.slug}`}>Open {b.name} record →</a></div></section></>;
}

export default function CompareClient({ initialLeft }: { initialLeft?:string }){ return <Compare initialLeft={initialLeft}/>; }
