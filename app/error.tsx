"use client";

export default function ErrorBoundary({error,reset}:{error:Error&{digest?:string};reset:()=>void}){void error;return <main className="access-pending"><p className="eyebrow">Evidence view interrupted</p><h1>This page could not be completed.</h1><p>No cached or invented number has replaced the failed response. Try the view again, or return to the public operations register.</p><button className="record-compare" onClick={reset}>Try again</button> <a className="record-compare" href="/operations">System operations</a></main>}
