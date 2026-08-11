/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import ExploreClient from "./explore-client";

export const metadata: Metadata = { title:"Explore all evidence — India Evidence Dashboard", description:"Search all 36 Indian states and union territories and inspect topic coverage." };

export default function ExplorePage() {
  return <main className="directory-shell"><header className="record-header"><a className="record-brand" href="/"><span className="brand-mark"/><b>India Evidence <em>Dashboard</em></b></a><nav><a href="/">National view</a><a href="/compare">Compare states</a><a href="/#methodology">Methodology</a></nav></header><section className="directory-hero"><p className="eyebrow">National evidence directory</p><h1>36 jurisdictions. One transparent standard.</h1><p>Search by state, union territory or topic. A listed jurisdiction is not a claim of complete coverage.</p></section><ExploreClient/></main>;
}
