/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { economy, getJurisdiction, jurisdictions, sources } from "../../../lib/evidence";
import { evidenceCatalog } from "../../../lib/catalog";
import StateEvidenceClient from "./state-evidence-client";
import JurisdictionSelect from "./jurisdiction-select";
import { educationByJurisdiction, statePackSources, vitalByJurisdiction } from "../../../lib/state-packs";

export function generateStaticParams() {
  return jurisdictions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getJurisdiction((await params).slug);
  return { title: item ? `${item.name} evidence — India Evidence Dashboard` : "State evidence" };
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getJurisdiction((await params).slug);
  if (!item) notFound();
  const economic = economy[item.name] || {};
  const education = educationByJurisdiction[item.name];
  const vital = vitalByJurisdiction[item.name];

  return <main className="record-shell">
    <header className="record-header">
      <a className="record-brand" href="/"><span className="brand-mark" aria-hidden="true"/><b>India Evidence <em>Dashboard</em></b></a>
      <nav aria-label="State report navigation"><a href="#economy">Economy</a><a href="#safety">Safety</a><a href="#services">All domains</a><a href="/schemes">Schemes & loans</a><a href="/catalog">Catalogue</a><a href="#sources">Sources</a></nav>
      <a className="record-compare" href={`/compare?left=${item.slug}`}>Compare</a>
    </header>

    <section className="record-hero">
      <div><p className="eyebrow">{item.type} evidence record</p><h1>{item.name}</h1><p>{item.capital} reference context · one URL for the jurisdiction’s available evidence, source dates and visible gaps.</p></div>
      <JurisdictionSelect current={item.slug} jurisdictions={jurisdictions}/>
    </section>

    <section className="record-section" id="economy">
      <div className="record-section-head"><div><p className="eyebrow">Economic evidence</p><h2>Output and income per person</h2></div><p>Current prices. Source years vary, so these cards are not a same-year ranking.</p></div>
      <div className="record-metric-grid">
        <article className="record-metric featured"><span>Total state output · NSDP</span>{economic.output ? <><strong>₹{(economic.output.valueCrore / 100000).toLocaleString("en-IN",{maximumFractionDigits:2})}<small> lakh crore</small></strong><b>{economic.output.year}</b></> : <><strong className="record-gap">Data gap</strong><b>No substitute used</b></>}<p>Net State Domestic Product at current prices. It is not national GDP or household wealth.</p><a href={sources.output.url} target="_blank" rel="noreferrer">{sources.output.label} ↗</a></article>
        <article className="record-metric"><span>Per-capita state income · NSDP</span>{economic.perCapita ? <><strong>₹{economic.perCapita.value.toLocaleString("en-IN")}<small> per person</small></strong><b>{economic.perCapita.year}</b></> : <><strong className="record-gap">Data gap</strong><b>No substitute used</b></>}<p>Per-capita NSDP at current prices. This is an average, not a typical salary or wealth measure.</p><a href={sources.nsdp.url} target="_blank" rel="noreferrer">{sources.nsdp.label} ↗</a></article>
      </div>
    </section>

    <section className="record-section state-pack" id="people-services">
      <div className="record-section-head"><div><p className="eyebrow">State evidence pack · official periodic data</p><h2>Schools and vital statistics</h2></div><p>These are source-period snapshots, not live counters. The same definitions are applied to every state and union territory.</p></div>
      <div className="state-pack-grid">
        <article><span>Recognised schools</span><strong>{education.schools.toLocaleString("en-IN")}</strong><b>UDISE+ 2023-24</b><p>All management categories reported in the source table.</p></article>
        <article><span>School enrolments</span><strong>{education.enrolments.toLocaleString("en-IN")}</strong><b>UDISE+ 2023-24</b><p>Student records in the source reporting system; not a population census.</p></article>
        <article><span>Teachers</span><strong>{education.teachers.toLocaleString("en-IN")}</strong><b>PTR {education.pupilTeacherRatio}:1</b><p>{education.singleTeacherSchools.toLocaleString("en-IN")} single-teacher schools; {education.zeroEnrolmentSchools.toLocaleString("en-IN")} zero-enrolment schools reported.</p></article>
        <article className="vital-card"><span>Birth rate</span><strong>{vital.birthRate.toFixed(1)}<small> / 1,000</small></strong><b>SRS 2023</b><p>Estimated live births per 1,000 population.</p></article>
        <article className="vital-card"><span>Death rate</span><strong>{vital.deathRate.toFixed(1)}<small> / 1,000</small></strong><b>SRS 2023</b><p>Estimated deaths per 1,000 population.</p></article>
        <article className="vital-card"><span>Infant mortality rate</span><strong>{vital.infantMortalityRate}<small> / 1,000</small></strong><b>{vital.imrPeriod}</b><p>Infant deaths per 1,000 live births. Smaller-state/UT estimates use a three-year period.</p></article>
      </div>
      <div className="state-pack-sources"><a href={statePackSources.education.url} target="_blank" rel="noreferrer"><b>{statePackSources.education.label} ↗</b><span>{statePackSources.education.limitation}</span></a><a href={statePackSources.vital.url} target="_blank" rel="noreferrer"><b>{statePackSources.vital.label} ↗</b><span>{statePackSources.vital.limitation}</span></a></div>
    </section>

    <StateEvidenceClient jurisdiction={item.name} slug={item.slug}/>

    <section className="record-section record-topics" id="services">
      <div className="record-section-head"><div><p className="eyebrow">Complete coverage ledger · {evidenceCatalog.length} domains</p><h2>What is loaded—and what is not</h2></div><p>Every jurisdiction receives the same evidence model. “Source mapped” means a public doorway exists; it does not mean a state observation has been ingested.</p></div>
      <div className="topic-ledger">{evidenceCatalog.map((topic) => <details key={topic.id} id={topic.id}><summary><span><i>{topic.group}</i>{topic.label}</span><b data-status={topic.coverage}>{topic.coverage}</b><em>+</em></summary><div><p><strong>Definition:</strong> {topic.definition}</p><p><strong>Refresh:</strong> {topic.cadence} · {topic.geography}</p><p><strong>Limitation:</strong> {topic.limitation}</p><a href={topic.sourceUrl} target={topic.sourceUrl.startsWith("http") ? "_blank" : undefined} rel="noreferrer">Open {topic.sourceTitle} ↗</a></div></details>)}</div>
    </section>

    <section className="record-section source-manifest" id="sources"><p className="eyebrow">Evidence standard</p><h2>Every number must travel with its proof.</h2><div><p><b>Metric</b><br/>What exactly is being counted.</p><p><b>Period</b><br/>Observation year and retrieval time.</p><p><b>Geography</b><br/>The jurisdiction or station represented.</p><p><b>Source</b><br/>A public primary doorway.</p><p><b>Limitation</b><br/>What the figure cannot prove.</p></div></section>

    <footer className="record-footer"><a href="/">← National dashboard</a><a href="/schemes">Find loans & schemes</a><a href="/catalog">Complete evidence catalogue</a><a href="/corrections">Request a correction</a></footer>
  </main>;
}
