/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { editorialRecords, editorialStats } from "../../lib/editorial";
import { getSystemStatus } from "../../lib/system-status";
import EditorialClient from "./editorial-client";

export const metadata:Metadata={
  title:"Editorial evidence console — India Evidence Dashboard",
  description:"Public view of the evidence review, revision and publication workflow.",
  robots:{index:false,follow:false},
};

export const dynamic="force-dynamic";

export default async function EditorialPage(){const system=await getSystemStatus();return <main className="editorial-shell">
  <header className="record-header"><a className="record-brand" href="/"><span className="brand-mark"/><b>India Evidence <em>Dashboard</em></b></a><nav><a href="#queue">Review queue</a><a href="#model">Evidence model</a><a href="#policy">Publication gate</a></nav><a className="record-compare" href="/editorial/manage">Editorial sign-in</a></header>
  <section className="editorial-hero"><p className="eyebrow">Public workflow record · read only</p><h1>Evidence needs<br/><span>a chain of custody.</span></h1><p>This public console shows how dashboard records retain sources, definitions, gaps, revisions and approval gates. Persistent storage and protected editorial sign-in are connected; write actions exist only inside the role-gated manager.</p><div className="editorial-system-state"><i/><b>Postgres {system.database}</b><span>{system.jurisdictions || 37} jurisdiction rows</span><span>{system.sources || editorialStats.sources} source rows</span><span>Clerk role-gated sign-in active</span><span>Public data remains read only</span></div></section>
  <section className="editorial-summary" aria-label="Editorial migration summary">
    <article><span>Seed records</span><strong>{editorialStats.records}</strong><p>Existing verified toll and infrastructure records mapped into the normalized model.</p></article>
    <article><span>Distinct source URLs</span><strong>{editorialStats.sources}</strong><p>Duplicate source pages remain one source entity with multiple evidence records.</p></article>
    <article><span>Ready for import</span><strong>{editorialStats.ready}</strong><p>Meets this seed migration check; not equivalent to editorial publication approval.</p></article>
    <article><span>Missing fields disclosed</span><strong>{editorialStats.gaps}</strong><p>Unknown fields remain gaps and are never silently converted to zero.</p></article>
  </section>
  <EditorialClient records={editorialRecords}/>
  <section className="editorial-model" id="model"><div><p className="eyebrow">Normalized evidence model</p><h2>One source can support many records. Every change becomes a revision.</h2></div><div className="model-flow"><span>Jurisdiction</span><i>→</i><span>Evidence record</span><i>→</i><span>Observation</span><i>→</i><span>Revision</span><i>→</i><span>Review</span></div><div className="model-grid">{[
    ["Sources","Publisher, URL, publication/retrieval dates, archive URL, checksum and link health."],
    ["Evidence records","Topic, measure, exact definition, limitation, source and public evidence status."],
    ["Observations","Period, value, unit, denominator, provisional flag and retrieval timestamp."],
    ["Promises","Commitment, baseline, target, deadline, assessment, rationale and evidence cutoff."],
    ["Revisions","Changed fields, reason, actor and immutable sequential revision number."],
    ["Reviews & corrections","Review type, decision, reviewer, public correction request and response."],
  ].map(([title,detail])=><article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
  <section className="publication-gate" id="policy"><div><p className="eyebrow">Publication gate</p><h2>Nothing becomes a verdict in one click.</h2></div><ol><li><b>01</b><strong>Source review</strong><p>Confirm publisher, document identity, date, archival copy and exact supporting passage/table.</p></li><li><b>02</b><strong>Definition review</strong><p>Confirm jurisdiction, period, unit, denominator, comparability and limitation.</p></li><li><b>03</b><strong>Second-person approval</strong><p>A different reviewer approves publication or requests documented changes.</p></li><li><b>04</b><strong>Revision history</strong><p>Corrections and superseding official releases create a new revision; the old state remains traceable.</p></li></ol></section>
  <footer className="record-footer"><a href="/">← National dashboard</a><a href="/infrastructure/registry">Public registry</a><a href="/#methodology">Methodology</a></footer>
  </main>}
