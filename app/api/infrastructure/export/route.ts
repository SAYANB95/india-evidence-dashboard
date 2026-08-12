import projects from "../../../../data/infrastructure-projects.json";
import tollPlazas from "../../../../data/toll-plazas.json";
import { safeCsvCell } from "../../../../lib/csv";

export async function GET(request:Request){
  const dataset=new URL(request.url).searchParams.get("dataset");
  const records=dataset === "projects" ? projects : tollPlazas;
  const headers=Array.from(new Set(records.flatMap(record=>Object.keys(record))));
  const csv=[headers.map(safeCsvCell).join(","),...records.map(record=>headers.map(header=>safeCsvCell((record as Record<string,unknown>)[header]??"Data gap")).join(","))].join("\n");
  const name=dataset === "projects" ? "infrastructure-projects-seed.csv" : "toll-plazas-seed.csv";
  return new Response(csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":`attachment; filename="${name}"`,"cache-control":"public, max-age=3600"}});
}
