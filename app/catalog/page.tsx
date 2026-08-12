/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { catalogCoverage, evidenceCatalog } from "../../lib/catalog";
import CatalogClient from "./catalog-client";

export const metadata: Metadata = { title: "Complete evidence catalogue — India Evidence Dashboard", description: "Every evidence domain, source doorway, refresh pattern, coverage state and limitation in the India Evidence Dashboard." };

export default function CatalogPage(){
  return <main className="catalog-shell">
    <header className="record-header"><a className="record-brand" href="/"><span className="brand-mark" aria-hidden="true"/><b>India Evidence <em>Dashboard</em></b></a><nav aria-label="Catalogue navigation"><a href="/explore">States &amp; UTs</a><a href="/compare">Compare</a><a href="/operations">Operations</a><a href="/corrections">Corrections</a></nav><a className="record-compare" href="/">National view</a></header>
    <section className="catalog-hero"><p className="eyebrow">Complete implementation ledger</p><h1>Everything belongs<br/><span>in the evidence chain.</span></h1><p>{evidenceCatalog.length} civic-data domains are now named, defined, source-mapped and assigned an honest coverage state. This catalogue closes category gaps; it does not fabricate missing observations.</p><div className="catalog-summary"><article><strong>{evidenceCatalog.length}</strong><span>defined domains</span></article><article><strong>{catalogCoverage.loaded + catalogCoverage.connected}</strong><span>loaded or connected</span></article><article><strong>{catalogCoverage["source mapped"]}</strong><span>official doorways mapped</span></article><article><strong>{catalogCoverage["editorial queue"] + catalogCoverage["data gap"]}</strong><span>visible work queue</span></article></div></section>
    <CatalogClient/>
    <section className="catalog-contract"><div><p className="eyebrow">Completion standard</p><h2>A category is present only when its absence is visible too.</h2></div><ol><li><b>01</b><strong>Definition</strong><span>What is counted and under which rule.</span></li><li><b>02</b><strong>Period</strong><span>Observation, publication and retrieval dates.</span></li><li><b>03</b><strong>Source</strong><span>Responsible public authority or clearly attributable research.</span></li><li><b>04</b><strong>Limitation</strong><span>What the evidence cannot establish.</span></li></ol></section>
    <footer className="record-footer"><a href="/">← National dashboard</a><a href="/explore">All jurisdictions</a><a href="/operations">System operations</a><a href="/corrections">Request a correction</a></footer>
  </main>;
}
