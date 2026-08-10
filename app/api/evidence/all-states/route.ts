const RESOURCES = {
  ipc: "41cea936-f64e-4591-bc27-9219c4187ab5",
  violent: "061b35b0-da03-430e-933b-b5175cc835eb",
  accidents: "1277ace4-acf7-4754-ae39-316cfc07d168",
};

const RAPE_CSV = "https://www.data.gov.in/files/ogdpv2dms/s3fs-public/NCRB_CII_2023_Table_3A.11_0.csv";

const JURISDICTIONS = [
  ["Andhra Pradesh", "State"], ["Arunachal Pradesh", "State"], ["Assam", "State"], ["Bihar", "State"],
  ["Chhattisgarh", "State"], ["Goa", "State"], ["Gujarat", "State"], ["Haryana", "State"],
  ["Himachal Pradesh", "State"], ["Jharkhand", "State"], ["Karnataka", "State"], ["Kerala", "State"],
  ["Madhya Pradesh", "State"], ["Maharashtra", "State"], ["Manipur", "State"], ["Meghalaya", "State"],
  ["Mizoram", "State"], ["Nagaland", "State"], ["Odisha", "State"], ["Punjab", "State"],
  ["Rajasthan", "State"], ["Sikkim", "State"], ["Tamil Nadu", "State"], ["Telangana", "State"],
  ["Tripura", "State"], ["Uttar Pradesh", "State"], ["Uttarakhand", "State"], ["West Bengal", "State"],
  ["Andaman & Nicobar Islands", "Union territory"], ["Chandigarh", "Union territory"],
  ["Dadra & Nagar Haveli and Daman & Diu", "Union territory"], ["Delhi (NCT)", "Union territory"],
  ["Jammu & Kashmir", "Union territory"], ["Ladakh", "Union territory"],
  ["Lakshadweep", "Union territory"], ["Puducherry", "Union territory"],
] as const;

const aliases: Record<string, string[]> = {
  "Andaman & Nicobar Islands": ["A & N Islands", "Andaman and Nicobar Islands", "Andaman and Nicoabr Islands", "Andaman and Nagar Islands"],
  "Dadra & Nagar Haveli and Daman & Diu": ["D & N Haveli", "Daman & Diu", "Dadra and Nagar Haveli and Daman and Diu"],
  "Delhi (NCT)": ["Delhi"],
  "Jammu & Kashmir": ["Jammu & Kashmir", "Jammu and Kashmir"],
};

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
  const response = await fetch(endpoint, { headers: { Accept: "application/json", "User-Agent": "India-Evidence-Dashboard/0.5" } });
  if (!response.ok) throw new Error(`Resource ${resourceId} returned ${response.status}`);
  const payload = await response.json() as { records?: Record<string, unknown>[] };
  return Array.isArray(payload.records) ? payload.records : [];
}

function finiteNumber(value: unknown) {
  const number = Number(value);
  return value !== null && value !== "" && Number.isFinite(number) ? number : null;
}

export async function GET() {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;
  if (!apiKey) return Response.json({ status: "unconfigured", error: "The official data connector is not configured." }, { status: 503 });

  try {
    const [ipcRecords, violentRecords, accidentRecords, rapeResponse] = await Promise.all([
      fetchResource(RESOURCES.ipc, apiKey), fetchResource(RESOURCES.violent, apiKey), fetchResource(RESOURCES.accidents, apiKey),
      fetch(RAPE_CSV, { headers: { Accept: "text/csv", "User-Agent": "India-Evidence-Dashboard/0.5" } }),
    ]);
    if (!rapeResponse.ok) throw new Error(`Rape cases resource returned ${rapeResponse.status}`);
    const rapeRows = (await rapeResponse.text()).trim().split(/\r?\n/).slice(1).map(parseCsvLine);

    const rows = JURISDICTIONS.map(([jurisdiction, type]) => {
      const candidates = aliases[jurisdiction] || [jurisdiction];
      const ipcMatches = ipcRecords.filter((record) => sameName(record.state_ut, candidates));
      const violent = violentRecords.find((record) => sameName(record.state_ut, candidates));
      const accidents = accidentRecords.find((record) => sameName(record.state_ut_, candidates));
      const rape = rapeRows.find((row) => sameName(row[1], candidates));
      const accidentCases = accidents ? finiteNumber(accidents.road_accidents___cases) : null;
      const caveats: string[] = [];
      if (jurisdiction === "Jammu & Kashmir") caveats.push("The 2019 IPC series predates the present J&K/Ladakh reporting split.");
      if (jurisdiction === "Ladakh") caveats.push("No separate Ladakh row exists in the pre-reorganisation 2019 IPC series.");
      if (jurisdiction === "Dadra & Nagar Haveli and Daman & Diu") caveats.push("The 2019 IPC count combines two predecessor UT rows; no combined rate is shown.");

      return {
        jurisdiction,
        type,
        rapeRegistered2023: rape ? finiteNumber(rape[28]) : null,
        violentRegistered2022: violent ? finiteNumber(violent._2022) : null,
        violentRatePerLakh2022: violent ? finiteNumber(violent.rate_of_violent_crimes__2022_) : null,
        ipcRegistered2019: ipcMatches.length ? ipcMatches.reduce((total, record) => total + (finiteNumber(record._2019) || 0), 0) : null,
        ipcRatePerLakh2019: ipcMatches.length === 1 ? finiteNumber(ipcMatches[0].rate_of_total_cognizable_crime__ipc___2019__) : null,
        roadAccidents2023: accidentCases,
        derivedAccidentsPerDay2023: accidentCases === null ? null : Number((accidentCases / 365).toFixed(1)),
        roadDeaths2023: accidents ? finiteNumber(accidents.road_accidents___died) : null,
        roadInjured2023: accidents ? finiteNumber(accidents.road_accidents___injured) : null,
        caveats,
      };
    });

    return Response.json({
      status: "available",
      rows,
      coverage: {
        jurisdictions: rows.length,
        rape2023: rows.filter((row) => row.rapeRegistered2023 !== null).length,
        violent2022: rows.filter((row) => row.violentRegistered2022 !== null).length,
        ipc2019: rows.filter((row) => row.ipcRegistered2019 !== null).length,
        roads2023: rows.filter((row) => row.roadAccidents2023 !== null).length,
      },
      sources: {
        ipc: "https://www.data.gov.in/resource/stateut-wise-ipc-crimes-2017-2019",
        violent: "https://www.data.gov.in/resource/stateut-wise-details-violent-crimes-incidence-and-crime-rate-2020-2022",
        rape: "https://www.data.gov.in/resource/stateut-wise-cases-registered-under-rape-section-wise-during-2023",
        accidents: "https://www.data.gov.in/resource/stateutcity-wise-number-cases-reported-and-persons-injured-and-died-due-traffic-accidents",
      },
      limitations: [
        "Registered crime counts measure police-recorded incidence, not the true prevalence of crime.",
        "NCRB cautions against comparing States/UTs purely on crime figures because population and reporting practices differ.",
        "Accidents per day is the 2023 annual total divided by 365, not a real-time incident feed.",
      ],
      retrievedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400" } });
  } catch {
    return Response.json({ status: "unavailable", error: "The all-state official evidence sources are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
