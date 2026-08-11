import projects from "../../../../data/infrastructure-projects.json";
import tollPlazas from "../../../../data/toll-plazas.json";

const csvCell=(input:unknown)=>`"${String(input ?? "Data gap").replaceAll('"','""')}"`;

export async function GET(request:Request){
  const dataset=new URL(request.url).searchParams.get("dataset");
  const records=dataset === "projects" ? projects : tollPlazas;
  const headers=Array.from(new Set(records.flatMap(record=>Object.keys(record))));
  const csv=[headers.map(csvCell).join(","),...records.map(record=>headers.map(header=>csvCell((record as Record<string,unknown>)[header])).join(","))].join("\n");
  const name=dataset === "projects" ? "infrastructure-projects-seed.csv" : "toll-plazas-seed.csv";
  return new Response(csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":`attachment; filename="${name}"`,"cache-control":"public, max-age=3600"}});
}
