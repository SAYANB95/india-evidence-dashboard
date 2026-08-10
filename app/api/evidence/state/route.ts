const RESOURCES = {
  ipc: "41cea936-f64e-4591-bc27-9219c4187ab5",
  violent: "061b35b0-da03-430e-933b-b5175cc835eb",
  accidents: "1277ace4-acf7-4754-ae39-316cfc07d168",
};

const RAPE_CSV = "https://www.data.gov.in/files/ogdpv2dms/s3fs-public/NCRB_CII_2023_Table_3A.11_0.csv";

const aliases: Record<string, string[]> = {
  "India — national view": ["TOTAL ALL INDIA", "Total All India", "Total (All India)"],
  "Andaman & Nicobar Islands": ["A & N Islands", "Andaman and Nicobar Islands", "Andaman and Nicoabr Islands", "Andaman and Nagar Islands"],
  "Dadra & Nagar Haveli and Daman & Diu": ["D & N Haveli", "Daman & Diu", "Dadra and Nagar Haveli and Daman and Diu"],
  "Delhi (NCT)": ["Delhi"],
  "Jammu & Kashmir": ["Jammu & Kashmir", "Jammu and Kashmir"],
};

function namesFor(jurisdiction: string) {
  return aliases[jurisdiction] || [jurisdiction];
}

function sameName(value: unknown, candidates: string[]) {
  const normalized = String(value || "").trim().toLowerCase();
  return candidates.some((candidate) => candidate.toLowerCase() === normalized);
}

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
      values.push(current);
      current = "";
    } else current += character;
  }
  values.push(current);
  return values;
}

async function fetchResource(resourceId: string, apiKey: string) {
  const endpoint = new URL(`https://api.data.gov.in/resource/${resourceId}`);
  endpoint.searchParams.set("api-key", apiKey);
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("limit", "100");
  const response = await fetch(endpoint, { headers: { Accept: "application/json", "User-Agent": "India-Evidence-Dashboard/0.4" } });
  if (!response.ok) throw new Error(`Resource ${resourceId} returned ${response.status}`);
  const payload = await response.json() as { records?: Record<string, unknown>[] };
  return Array.isArray(payload.records) ? payload.records : [];
}

export async function GET(request: Request) {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;
  if (!apiKey) return Response.json({ status: "unconfigured", error: "The official data connector is not configured." }, { status: 503 });

  const jurisdiction = new URL(request.url).searchParams.get("jurisdiction")?.slice(0, 100) || "India — national view";
  const candidates = namesFor(jurisdiction);

  try {
    const [ipcRecords, violentRecords, accidentRecords, rapeResponse] = await Promise.all([
      fetchResource(RESOURCES.ipc, apiKey),
      fetchResource(RESOURCES.violent, apiKey),
      fetchResource(RESOURCES.accidents, apiKey),
      fetch(RAPE_CSV, { headers: { Accept: "text/csv", "User-Agent": "India-Evidence-Dashboard/0.4" } }),
    ]);
    if (!rapeResponse.ok) throw new Error(`Rape cases resource returned ${rapeResponse.status}`);

    const ipcMatches = ipcRecords.filter((record) => sameName(record.state_ut, candidates));
    const ipc = ipcMatches[0];
    const violent = violentRecords.find((record) => sameName(record.state_ut, candidates));
    const accidents = accidentRecords.find((record) => sameName(record.state_ut_, candidates));
    const rapeRows = (await rapeResponse.text()).trim().split(/\r?\n/).slice(1).map(parseCsvLine);
    const rape = rapeRows.find((row) => sameName(row[1], candidates));

    const accidentCases = accidents ? Number(accidents.road_accidents___cases) : null;

    return Response.json({
      status: "available",
      jurisdiction,
      crime: {
        ipcRegistered: ipcMatches.length ? ipcMatches.reduce((total, record) => total + Number(record._2019 || 0), 0) : null,
        ipcRatePerLakh: ipcMatches.length === 1 && ipc ? Number(ipc.rate_of_total_cognizable_crime__ipc___2019__) : null,
        ipcYear: 2019,
        violentRegistered: violent ? Number(violent._2022) : null,
        violentRatePerLakh: violent ? Number(violent.rate_of_violent_crimes__2022_) : null,
        chargesheetingRate: violent ? Number(violent.chargesheeting_rate__2022_) : null,
        violentYear: 2022,
        rapeRegistered: rape ? Number(rape[28]) : null,
        rapeYear: 2023,
      },
      roadSafety: {
        accidentsReported: Number.isFinite(accidentCases) ? accidentCases : null,
        deaths: accidents ? Number(accidents.road_accidents___died) : null,
        injured: accidents ? Number(accidents.road_accidents___injured) : null,
        derivedDailyAverage: Number.isFinite(accidentCases) ? Number((accidentCases! / 365).toFixed(1)) : null,
        year: 2023,
      },
      sources: {
        ipc: "https://www.data.gov.in/resource/stateut-wise-ipc-crimes-2017-2019",
        violent: "https://www.data.gov.in/resource/stateut-wise-details-violent-crimes-incidence-and-crime-rate-2020-2022",
        rape: "https://www.data.gov.in/resource/stateut-wise-cases-registered-under-rape-section-wise-during-2023",
        accidents: "https://www.data.gov.in/resource/stateutcity-wise-number-cases-reported-and-persons-injured-and-died-due-traffic-accidents",
      },
      caveats: [
        "Registered cases measure police-recorded incidence, not the true prevalence of crime.",
        "NCRB states that States/UTs should not be compared purely on crime figures; reporting practices and population differ.",
        "The daily accident figure is an annual total divided by 365, not a live daily incident feed.",
        ...(jurisdiction === "Jammu & Kashmir" ? ["The 2019 IPC series predates the present J&K/Ladakh reporting split."] : []),
        ...(jurisdiction === "Dadra & Nagar Haveli and Daman & Diu" ? ["The 2019 IPC count combines the two predecessor UT rows; a combined population rate is not shown."] : []),
      ],
      retrievedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400" } });
  } catch {
    return Response.json({ status: "unavailable", error: "The official annual evidence sources are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
