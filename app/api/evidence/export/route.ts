import { economy, slugifyJurisdiction, topicRecords } from "../../../../lib/evidence";

function csv(value: unknown) { return `"${String(value ?? "").replaceAll('"','""')}"`; }

export async function GET(request: Request) {
  const url = new URL(request.url);
  const jurisdiction = (url.searchParams.get("jurisdiction") || "India").slice(0,100);
  const economic = economy[jurisdiction] || {};
  const rows: unknown[][] = [
    ["jurisdiction","topic","metric","value","unit","period","status","definition","limitation","source"],
    [jurisdiction,"Economy","Net State Domestic Product",economic.output?.valueCrore ?? "","crore rupees",economic.output?.year ?? "","available","NSDP at current prices","Source years differ across jurisdictions","https://www.indiabudget.gov.in/budget2024-25/economicsurvey/doc/stat/tab110a.pdf"],
    [jurisdiction,"Economy","Per-capita NSDP",economic.perCapita?.value ?? "","rupees per person",economic.perCapita?.year ?? "","available","Per-capita NSDP at current prices","An average, not typical salary or wealth","https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22483"],
    ...topicRecords.map((topic) => [jurisdiction,topic.group,topic.label,"","",topic.period,topic.status,topic.definition,topic.limitation,topic.sourceUrl]),
  ];
  const body = rows.map((row) => row.map(csv).join(",")).join("\n");
  const filename = `${url.searchParams.get("slug") || slugifyJurisdiction(jurisdiction)}-evidence.csv`;
  return new Response(body,{ headers:{ "Content-Type":"text/csv; charset=utf-8", "Content-Disposition":`attachment; filename="${filename}"`, "Cache-Control":"public, max-age=3600" } });
}
