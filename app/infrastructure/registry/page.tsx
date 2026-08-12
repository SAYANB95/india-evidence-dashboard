/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import projects from "../../../data/infrastructure-projects.json";
import tollPlazas from "../../../data/toll-plazas.json";
import RegistryClient from "./registry-client";

export const metadata: Metadata = {
  title: "Toll & infrastructure registry — India Evidence Dashboard",
  description: "A source-linked sample register of Indian toll plazas and road, rail and aviation projects.",
};

export default function InfrastructureRegistryPage() {
  return <main className="registry-shell">
    <header className="record-header">
      <a className="record-brand" href="/"><span className="brand-mark"/><b>India Evidence <em>Dashboard</em></b></a>
      <nav><a href="/infrastructure">Transport room</a><a href="#registry">Registry</a><a href="/#methodology">Methodology</a></nav>
      <a className="record-compare" href="/explore">All states</a>
    </header>
    <section className="registry-hero">
      <p className="eyebrow">Official-record explorer</p>
      <h1>Plazas and projects.<br/><span>One claim at a time.</span></h1>
      <p>This is a small source-checked sample, not a complete national database. Every row links to the public record used; absent cost, revenue, traffic or deadline fields are shown as data gaps.</p>
    </section>
    <RegistryClient tollPlazas={tollPlazas} projects={projects}/>
    <footer className="record-footer"><a href="/infrastructure">← Transport evidence room</a><a href="/">National dashboard</a><a href="/#methodology">Methodology</a></footer>
  </main>;
}
