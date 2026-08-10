const RESOURCE_ID = "3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69";

type CpcbRecord = {
  state: string;
  city: string;
  station: string;
  last_update: string;
  pollutant_id: string;
  min_value: string;
  max_value: string;
  avg_value: string;
  latitude: string;
  longitude: string;
};

const stateAliases: Record<string, string> = {
  "Andaman & Nicobar Islands": "Andaman and Nicobar Islands",
  "Dadra & Nagar Haveli and Daman & Diu": "Daman and Diu",
  "Delhi (NCT)": "Delhi",
  "India — national view": "Delhi",
  "Jammu & Kashmir": "Jammu and Kashmir",
};

function finiteNumber(value: string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function reportedNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function distanceSquared(record: CpcbRecord, latitude: number, longitude: number) {
  const recordLatitude = finiteNumber(record.latitude);
  const recordLongitude = finiteNumber(record.longitude);
  if (recordLatitude === null || recordLongitude === null) return Number.POSITIVE_INFINITY;
  return (recordLatitude - latitude) ** 2 + (recordLongitude - longitude) ** 2;
}

export async function GET(request: Request) {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;
  if (!apiKey) {
    return Response.json(
      { status: "unconfigured", error: "The official air-quality connector is not configured on this server." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const incoming = new URL(request.url);
  const jurisdiction = incoming.searchParams.get("jurisdiction")?.slice(0, 100) || "India — national view";
  const latitude = finiteNumber(incoming.searchParams.get("lat"));
  const longitude = finiteNumber(incoming.searchParams.get("lon"));

  if (latitude === null || longitude === null || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return Response.json({ error: "A valid latitude and longitude are required." }, { status: 400 });
  }

  const sourceState = stateAliases[jurisdiction] || jurisdiction;
  const endpoint = new URL(`https://api.data.gov.in/resource/${RESOURCE_ID}`);
  endpoint.searchParams.set("api-key", apiKey);
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("limit", "1000");
  endpoint.searchParams.set("filters[state]", sourceState);

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json", "User-Agent": "India-Evidence-Dashboard/0.3" },
    });
    if (!response.ok) throw new Error(`CPCB source returned ${response.status}`);

    const payload = await response.json() as { total?: number; records?: CpcbRecord[] };
    const records = Array.isArray(payload.records) ? payload.records : [];
    const locatedRecords = records.filter((record) => Number.isFinite(distanceSquared(record, latitude, longitude)));

    if (locatedRecords.length === 0) {
      return Response.json(
        {
          status: "no-coverage",
          jurisdiction,
          sourceState,
          error: "No geocoded CPCB station record was returned for this jurisdiction.",
          retrievedAt: new Date().toISOString(),
        },
        { status: 404, headers: { "Cache-Control": "public, max-age=60, s-maxage=900" } },
      );
    }

    const nearest = locatedRecords.reduce((best, record) =>
      distanceSquared(record, latitude, longitude) < distanceSquared(best, latitude, longitude) ? record : best,
    );
    const stationRecords = records.filter((record) => record.station === nearest.station);
    const pollutants = stationRecords
      .map((record) => ({
        id: record.pollutant_id,
        average: reportedNumber(record.avg_value),
        minimum: reportedNumber(record.min_value),
        maximum: reportedNumber(record.max_value),
      }))
      .sort((a, b) => ["PM2.5", "PM10", "NO2", "OZONE", "SO2", "CO", "NH3"].indexOf(a.id) - ["PM2.5", "PM10", "NO2", "OZONE", "SO2", "CO", "NH3"].indexOf(b.id));

    return Response.json(
      {
        status: "live",
        jurisdiction,
        sourceState,
        station: nearest.station,
        city: nearest.city,
        observedAt: nearest.last_update,
        coordinates: { latitude: Number(nearest.latitude), longitude: Number(nearest.longitude) },
        pollutants,
        sourceRecordCount: records.length,
        sourceTotal: payload.total ?? null,
        source: {
          name: "Central Pollution Control Board via data.gov.in",
          url: `https://www.data.gov.in/resource/real-time-air-quality-index-various-locations`,
          resourceId: RESOURCE_ID,
          publisher: "Central Pollution Control Board",
          refreshDescription: "Source catalogue describes the feed as hourly.",
        },
        limitation: "Values are the station-level minimum, maximum and average fields returned by the source. They are not a statewide average or a government-performance score.",
        retrievedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=900, stale-while-revalidate=1800" } },
    );
  } catch {
    return Response.json(
      {
        status: "unavailable",
        error: "The official CPCB source is temporarily unavailable. No stale value is being presented as current.",
        retrievedAt: new Date().toISOString(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
