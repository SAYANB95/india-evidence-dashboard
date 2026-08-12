export function safeCsvCell(input:unknown){
  const raw=String(input??"");
  const spreadsheetSafe=/^[=+\-@]/.test(raw)?`'${raw}`:raw;
  return `"${spreadsheetSafe.replaceAll('"','""')}"`;
}

export function safeDownloadSlug(input:string|null,fallback:string){
  const normalized=(input||"").toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);
  return normalized||fallback;
}
