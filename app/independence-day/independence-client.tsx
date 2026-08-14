"use client";

import { useEffect, useMemo, useState } from "react";

type EquityRow = {
  jurisdiction: string;
  sc2021:number|null; sc2022:number|null; sc2023:number|null; scRate2023:number|null;
  st2021:number|null; st2022:number|null; st2023:number|null; stRate2023:number|null;
  women2023:number|null; womenRate2023:number|null; rape2023:number|null; dowryDeaths2023:number|null;
  crueltyByHusband2023:number|null; girlPocso2023:number|null;
};
type EquityPayload = { status:"available"|"unavailable"; rows?:EquityRow[]; retrievedAt?:string };

const number = (value:number|null|undefined) => value === null || value === undefined ? "—" : value.toLocaleString("en-IN");

export default function IndependenceClient() {
  const [payload,setPayload]=useState<EquityPayload|null>(null);
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState<"women"|"sc"|"st"|"rape"|"name">("women");
  useEffect(()=>{fetch("/api/equity").then(response=>response.json()).then(setPayload).catch(()=>setPayload({status:"unavailable"}))},[]);
  const rows=useMemo(()=>{
    const filtered=(payload?.rows??[]).filter(row=>row.jurisdiction.toLowerCase().includes(query.toLowerCase()));
    if(sort==="name") return [...filtered].sort((a,b)=>a.jurisdiction.localeCompare(b.jurisdiction));
    const metric=`${sort}2023` as keyof EquityRow;
    return [...filtered].sort((a,b)=>Number(b[metric]??-1)-Number(a[metric]??-1));
  },[payload,query,sort]);
  return <section className="id-state-data" id="states">
    <div className="id-section-head"><div><p className="eyebrow">All-state official evidence</p><h2>Where are cases being registered?</h2></div><p>Use counts and rates together. More registered cases can reflect more violence, more reporting, better FIR registration—or several factors at once.</p></div>
    <div className="id-controls"><label>Find a State or UT<input value={query} onChange={event=>setQuery(event.target.value)} placeholder="West Bengal, Maharashtra…"/></label><label>Explore by<select value={sort} onChange={event=>setSort(event.target.value as typeof sort)}><option value="women">Crimes against women</option><option value="rape">Rape cases</option><option value="sc">SC atrocities</option><option value="st">ST atrocities</option><option value="name">Name</option></select></label><span>{payload===null?"Loading official NCRB tables…":payload.status==="available"?`${rows.length} jurisdictions · official annual data`:"Official source temporarily unavailable"}</span></div>
    {payload?.status==="available"&&<div className="id-table-wrap"><table><thead><tr><th>State / UT</th><th>Crimes against women</th><th>Rape</th><th>Girl-child POCSO</th><th>Dowry deaths</th><th>Cruelty by husband / relatives</th><th>SC atrocities</th><th>SC rate</th><th>ST atrocities</th><th>ST rate</th></tr></thead><tbody>{rows.map(row=><tr key={row.jurisdiction}><th>{row.jurisdiction}</th><td>{number(row.women2023)}</td><td>{number(row.rape2023)}</td><td>{number(row.girlPocso2023)}</td><td>{number(row.dowryDeaths2023)}</td><td>{number(row.crueltyByHusband2023)}</td><td>{number(row.sc2023)}</td><td>{number(row.scRate2023)}</td><td>{number(row.st2023)}</td><td>{number(row.stRate2023)}</td></tr>)}</tbody></table></div>}
    <p className="id-table-note">All figures are 2023 police-registered cases. SC/ST rates use the source population denominator. “—” means not available or not applicable, not zero.</p>
  </section>
}
