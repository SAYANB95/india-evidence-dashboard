const SOURCES = {
  sc: "https://www.data.gov.in/files/ogdpv2dms/s3fs-public/NCRB_CII_2023_Table_7A.1_0.csv",
  st: "https://www.data.gov.in/files/ogdpv2dms/s3fs-public/NCRB_CII_2023_Table_7C.1_0.csv",
  women: "https://www.data.gov.in/files/ogdpv2dms/s3fs-public/NCRB_CII_2023_Table_3A.2_0.csv",
} as const;

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') { current += '"'; index += 1; }
      else quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else current += character;
  }
  values.push(current.trim());
  return values;
}

function rows(csv: string) {
  return csv.trim().split(/\r?\n/).slice(1).map(parseCsvLine);
}

function numeric(value: string | undefined) {
  if (!value || value === "NA" || value === "N.A.") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function key(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/nct of /g, "").replace(/\(nct\)/g, "").replace(/[^a-z0-9]/g, "");
}

export async function GET() {
  try {
    const responses = await Promise.all(Object.values(SOURCES).map((url) => fetch(url, {
      headers: { Accept: "text/csv", "User-Agent": "India-Evidence-Dashboard/2.3" },
      next: { revalidate: 21600 },
    })));
    if (responses.some((response) => !response.ok)) throw new Error("Official CSV unavailable");
    const [scRows, stRows, womenRows] = await Promise.all(responses.map(async (response) => rows(await response.text())));
    const stIndex = new Map(stRows.map((row) => [key(row[1]), row]));
    const womenIndex = new Map(womenRows.map((row) => [key(row[1]), row]));
    const allIndiaSc = scRows.find((row) => row[1] === "Total All India");
    const allIndiaSt = stRows.find((row) => row[1] === "Total All India");
    const allIndiaWomen = womenRows.find((row) => row[1] === "Total All India");
    if (!allIndiaSc || !allIndiaSt || !allIndiaWomen) throw new Error("Official total row missing");

    const stateRows = scRows.filter((row) => /^\d+$/.test(row[0])).map((sc) => {
      const st = stIndex.get(key(sc[1]));
      const women = womenIndex.get(key(sc[1]));
      return {
        jurisdiction: sc[1],
        sc2021: numeric(sc[2]), sc2022: numeric(sc[3]), sc2023: numeric(sc[4]), scRate2023: numeric(sc[6]),
        st2021: numeric(st?.[2]), st2022: numeric(st?.[3]), st2023: numeric(st?.[4]), stRate2023: numeric(st?.[6]),
        women2023: numeric(women?.[161]), womenRate2023: numeric(women?.[163]),
        rape2023: numeric(women?.[62]), dowryDeaths2023: numeric(women?.[5]),
        crueltyByHusband2023: numeric(women?.[20]), girlPocso2023: numeric(women?.[134]),
      };
    });

    return Response.json({
      status: "available",
      period: "NCRB Crime in India 2023",
      national: {
        sc2021: numeric(allIndiaSc[2]), sc2022: numeric(allIndiaSc[3]), sc2023: numeric(allIndiaSc[4]),
        st2021: numeric(allIndiaSt[2]), st2022: numeric(allIndiaSt[3]), st2023: numeric(allIndiaSt[4]),
        women2023: numeric(allIndiaWomen[161]), rape2023: numeric(allIndiaWomen[62]),
        dowryDeaths2023: numeric(allIndiaWomen[5]), crueltyByHusband2023: numeric(allIndiaWomen[20]),
        assaultWomen2023: numeric(allIndiaWomen[80]), girlPocso2023: numeric(allIndiaWomen[134]),
      },
      rows: stateRows,
      sources: {
        sc: "https://www.data.gov.in/resource/stateut-wise-crimeatrocities-against-scheduled-castes-2021-2023",
        st: "https://www.data.gov.in/resource/stateut-wise-crimeatrocities-against-scheduled-tribes-2021-2023",
        women: "https://www.data.gov.in/resource/crime-head-wise-and-stateut-wise-indian-penal-code-ipc-crimes-and-special-and-local-laws",
      },
      limitations: [
        "These are police-registered cases, not estimates of the true prevalence of violence or discrimination.",
        "NCRB cautions that States and UTs should not be compared purely on crime figures because reporting, registration and population differ.",
        "SC/ST atrocity counts use the source's statutory definitions; they are not a count of every caste-based or tribal discrimination incident.",
      ],
      retrievedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400" } });
  } catch {
    return Response.json({ status: "unavailable", error: "Official equity datasets are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
