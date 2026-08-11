import { editorialRecords } from "../../../../lib/editorial";

const cell=(input:unknown)=>`"${String(input ?? "").replaceAll('"','""')}"`;

export function GET(){
  const headers=["id","title","kind","jurisdiction","topic","workflow","currentValue","sourceLabel","sourceUrl","sourcePeriod","missingFields","definition","limitation","recordVersion"] as const;
  const csv=[headers.map(cell).join(","),...editorialRecords.map(record=>headers.map(header=>cell(header === "missingFields" ? record.missingFields.join("; ") : record[header])).join(","))].join("\n");
  return new Response(csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":"attachment; filename=editorial-migration-seed.csv","cache-control":"public, max-age=3600"}});
}
