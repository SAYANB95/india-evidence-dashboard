import { schemes } from "../../../../lib/schemes";

const cell=(input:unknown)=>`"${String(input ?? "").replaceAll('"','""')}"`;
export function GET(){const headers=["id","name","shortName","category","supportType","status","availability","amount","interest","collateral","audience","needs","area","applicationRoute","applyUrl","sourceLabel","sourceUrl","sourceChecked","limitation"] as const;const csv=[headers.map(cell).join(","),...schemes.map(record=>headers.map(key=>cell(Array.isArray(record[key])?(record[key] as string[]).join("; "):record[key])).join(","))].join("\n");return new Response(csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":"attachment; filename=india-loans-schemes-verified-seed.csv","cache-control":"public, max-age=3600"}})}
