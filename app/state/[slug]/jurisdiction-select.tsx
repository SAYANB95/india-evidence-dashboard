"use client";

import type { Jurisdiction } from "../../../lib/evidence";
import { useRouter } from "next/navigation";

export default function JurisdictionSelect({ current, jurisdictions }: { current:string; jurisdictions:Jurisdiction[] }) {
  const router=useRouter();
  return <label>Change jurisdiction<select value={current} onChange={(event) => router.push(`/state/${event.target.value}`)}>{jurisdictions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><span className="select-help">The complete record updates at this URL.</span></label>;
}
