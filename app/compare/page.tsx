/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import CompareClient from "./compare-client";

export const metadata: Metadata = { title:"Compare jurisdictions — India Evidence Dashboard" };
export default async function ComparePage({ searchParams }: { searchParams:Promise<{left?:string}> }) { const { left }=await searchParams; return <main className="compare-shell"><header className="record-header"><a className="record-brand" href="/"><span className="brand-mark"/><b>India Evidence <em>Dashboard</em></b></a><nav><a href="/explore">All evidence</a><a href="/#methodology">Methodology</a></nav></header><CompareClient initialLeft={left}/></main>; }
