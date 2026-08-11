"use client";

import type { Jurisdiction } from "../../../lib/evidence";

export default function JurisdictionSelect({ current, jurisdictions }: { current:string; jurisdictions:Jurisdiction[] }) {
  return <label>Change jurisdiction<select value={current} onChange={(event) => { window.location.href=`/state/${event.target.value}`; }}>{jurisdictions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><span className="select-help">The complete record updates at this URL.</span></label>;
}
