"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Evidence = {
  status: "available";
  crime: { ipcRegistered:number|null; ipcRatePerLakh:number|null; ipcYear:number; violentRegistered:number|null; violentRatePerLakh:number|null; chargesheetingRate:number|null; violentYear:number; rapeRegistered:number|null; rapeYear:number };
  roadSafety: { accidentsReported:number|null; deaths:number|null; injured:number|null; derivedDailyAverage:number|null; year:number };
  sources: Record<string,string>; caveats:string[]; retrievedAt:string;
};

const value = (number: number | null) => number == null ? "Data gap" : number.toLocaleString("en-IN");

export default function StateEvidenceClient({ jurisdiction, slug }: { jurisdiction:string; slug:string }) {
  const router=useRouter();
  const [evidence,setEvidence] = useState<Evidence|null>(null);
  const [failed,setFailed] = useState(false);
  useEffect(() => { let live=true; fetch(`/api/evidence/state?jurisdiction=${encodeURIComponent(jurisdiction)}`)
    .then((response) => { if(!response.ok) throw new Error(); return response.json(); })
    .then((data) => { if(live) setEvidence(data); }).catch(() => { if(live) setFailed(true); }); return () => { live=false; }; }, [jurisdiction]);

  const download = () => {
    router.push(`/api/evidence/export?jurisdiction=${encodeURIComponent(jurisdiction)}&slug=${slug}`);
  };

  return <section className="record-section safety-record" id="safety">
    <div className="record-section-head"><div><p className="eyebrow">Official annual safety evidence</p><h2>Registered cases and road incidents</h2></div><button onClick={download}>Download CSV ↓</button></div>
    {!evidence && !failed && <div className="record-loading">Loading official data.gov.in records…</div>}
    {failed && <div className="record-unavailable"><b>Official connector temporarily unavailable.</b><p>No cached or invented figures have replaced it. Try again later or open the source catalog below.</p></div>}
    {evidence && <>
      <div className="safety-grid">
        <article><span>Rape cases registered</span><strong>{value(evidence.crime.rapeRegistered)}</strong><b>NCRB {evidence.crime.rapeYear}</b><p>Police-recorded cases, not estimated prevalence.</p><a href={evidence.sources.rape} target="_blank" rel="noreferrer">Source ↗</a></article>
        <article><span>Violent crimes registered</span><strong>{value(evidence.crime.violentRegistered)}</strong><b>{evidence.crime.violentRatePerLakh == null ? "Rate gap" : `${evidence.crime.violentRatePerLakh} per lakh`} · {evidence.crime.violentYear}</b><p>Count and population rate must be read together.</p><a href={evidence.sources.violent} target="_blank" rel="noreferrer">Source ↗</a></article>
        <article><span>Total IPC cases</span><strong>{value(evidence.crime.ipcRegistered)}</strong><b>{evidence.crime.ipcRatePerLakh == null ? "Rate gap" : `${evidence.crime.ipcRatePerLakh} per lakh`} · {evidence.crime.ipcYear}</b><p>An older comparable series; not mixed with newer totals.</p><a href={evidence.sources.ipc} target="_blank" rel="noreferrer">Source ↗</a></article>
        <article><span>Road accidents reported</span><strong>{value(evidence.roadSafety.accidentsReported)}</strong><b>{evidence.roadSafety.derivedDailyAverage == null ? "Daily average gap" : `${evidence.roadSafety.derivedDailyAverage}/day derived`} · {evidence.roadSafety.year}</b><p>Annual total divided by 365—not a live incident counter.</p><a href={evidence.sources.accidents} target="_blank" rel="noreferrer">Source ↗</a></article>
      </div>
      <details className="caveat-box"><summary>Read comparison cautions <span>+</span></summary><ul>{evidence.caveats.map((item) => <li key={item}>{item}</li>)}</ul><p>Retrieved {new Date(evidence.retrievedAt).toLocaleString("en-IN")}</p></details>
    </>}
  </section>;
}
