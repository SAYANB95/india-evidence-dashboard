import { editorialRecords } from "../../../../lib/editorial";
import { safeCsvCell } from "../../../../lib/csv";

export function GET(){
  const headers=["id","title","kind","jurisdiction","topic","workflow","currentValue","sourceLabel","sourceUrl","sourcePeriod","missingFields","definition","limitation","recordVersion"] as const;
  const csv=[headers.map(safeCsvCell).join(","),...editorialRecords.map(record=>headers.map(header=>safeCsvCell(header === "missingFields" ? record.missingFields.join("; ") : record[header])).join(","))].join("\n");
  return new Response(csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":"attachment; filename=editorial-migration-records.csv","cache-control":"public, max-age=3600"}});
}
