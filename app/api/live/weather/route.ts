const WEATHER_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "precipitation",
  "wind_speed_10m",
  "weather_code",
].join(",");

function isCoordinate(value: string | null, min: number, max: number) {
  if (value === null || value.trim() === "") return false;
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max;
}

export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const latitude = incoming.searchParams.get("lat");
  const longitude = incoming.searchParams.get("lon");
  const place = incoming.searchParams.get("place")?.slice(0, 80) || "Selected location";
  const jurisdiction = incoming.searchParams.get("jurisdiction")?.slice(0, 100) || "India";

  if (!isCoordinate(latitude, -90, 90) || !isCoordinate(longitude, -180, 180)) {
    return Response.json({ error: "A valid latitude and longitude are required." }, { status: 400 });
  }

  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.searchParams.set("latitude", latitude!);
  endpoint.searchParams.set("longitude", longitude!);
  endpoint.searchParams.set("current", WEATHER_FIELDS);
  endpoint.searchParams.set("timezone", "Asia/Kolkata");

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json", "User-Agent": "India-Evidence-Dashboard/0.3" },
    });

    if (!response.ok) throw new Error(`Weather source returned ${response.status}`);

    const payload = await response.json() as {
      latitude: number;
      longitude: number;
      elevation: number;
      current_units: Record<string, string>;
      current: Record<string, number | string>;
    };

    return Response.json(
      {
        status: "live",
        jurisdiction,
        place,
        observedAt: `${payload.current.time}+05:30`,
        intervalSeconds: payload.current.interval,
        temperature: payload.current.temperature_2m,
        apparentTemperature: payload.current.apparent_temperature,
        humidity: payload.current.relative_humidity_2m,
        precipitation: payload.current.precipitation,
        windSpeed: payload.current.wind_speed_10m,
        weatherCode: payload.current.weather_code,
        coordinates: { latitude: payload.latitude, longitude: payload.longitude },
        elevation: payload.elevation,
        units: payload.current_units,
        source: {
          name: "Open-Meteo",
          url: "https://open-meteo.com/en/docs",
          type: "Public model-data API",
          officialIndia: false,
        },
        retrievedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=600, stale-while-revalidate=1200",
        },
      },
    );
  } catch {
    return Response.json(
      {
        status: "unavailable",
        error: "The live weather source is temporarily unavailable. No stale value is being presented as current.",
        retrievedAt: new Date().toISOString(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
