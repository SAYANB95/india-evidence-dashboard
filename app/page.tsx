"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const unionTerritories = [
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi (NCT)",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

type JurisdictionLocation = { place: string; lat: number; lon: number };

const jurisdictionLocations: Record<string, JurisdictionLocation> = {
  "India — national view": { place: "New Delhi reference point", lat: 28.6139, lon: 77.209 },
  "Andhra Pradesh": { place: "Amaravati", lat: 16.5062, lon: 80.648 },
  "Arunachal Pradesh": { place: "Itanagar", lat: 27.0844, lon: 93.6053 },
  Assam: { place: "Dispur", lat: 26.1433, lon: 91.7898 },
  Bihar: { place: "Patna", lat: 25.5941, lon: 85.1376 },
  Chhattisgarh: { place: "Raipur", lat: 21.2514, lon: 81.6296 },
  Goa: { place: "Panaji", lat: 15.4909, lon: 73.8278 },
  Gujarat: { place: "Gandhinagar", lat: 23.2156, lon: 72.6369 },
  Haryana: { place: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  "Himachal Pradesh": { place: "Shimla", lat: 31.1048, lon: 77.1734 },
  Jharkhand: { place: "Ranchi", lat: 23.3441, lon: 85.3096 },
  Karnataka: { place: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  Kerala: { place: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
  "Madhya Pradesh": { place: "Bhopal", lat: 23.2599, lon: 77.4126 },
  Maharashtra: { place: "Mumbai", lat: 19.076, lon: 72.8777 },
  Manipur: { place: "Imphal", lat: 24.817, lon: 93.9368 },
  Meghalaya: { place: "Shillong", lat: 25.5788, lon: 91.8933 },
  Mizoram: { place: "Aizawl", lat: 23.7271, lon: 92.7176 },
  Nagaland: { place: "Kohima", lat: 25.6751, lon: 94.1086 },
  Odisha: { place: "Bhubaneswar", lat: 20.2961, lon: 85.8245 },
  Punjab: { place: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  Rajasthan: { place: "Jaipur", lat: 26.9124, lon: 75.7873 },
  Sikkim: { place: "Gangtok", lat: 27.3389, lon: 88.6065 },
  "Tamil Nadu": { place: "Chennai", lat: 13.0827, lon: 80.2707 },
  Telangana: { place: "Hyderabad", lat: 17.385, lon: 78.4867 },
  Tripura: { place: "Agartala", lat: 23.8315, lon: 91.2868 },
  "Uttar Pradesh": { place: "Lucknow", lat: 26.8467, lon: 80.9462 },
  Uttarakhand: { place: "Dehradun", lat: 30.3165, lon: 78.0322 },
  "West Bengal": { place: "Kolkata", lat: 22.5726, lon: 88.3639 },
  "Andaman & Nicobar Islands": { place: "Port Blair", lat: 11.6234, lon: 92.7265 },
  Chandigarh: { place: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  "Dadra & Nagar Haveli and Daman & Diu": { place: "Daman", lat: 20.3974, lon: 72.8328 },
  "Delhi (NCT)": { place: "New Delhi", lat: 28.6139, lon: 77.209 },
  "Jammu & Kashmir": { place: "Srinagar reference point", lat: 34.0837, lon: 74.7973 },
  Ladakh: { place: "Leh", lat: 34.1526, lon: 77.5771 },
  Lakshadweep: { place: "Kavaratti", lat: 10.5593, lon: 72.6358 },
  Puducherry: { place: "Puducherry", lat: 11.9416, lon: 79.8083 },
};

type LiveWeather = {
  status: "live";
  jurisdiction: string;
  place: string;
  observedAt: string;
  intervalSeconds: number;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  retrievedAt: string;
};

type PollutantReading = {
  id: string;
  average: number | null;
  minimum: number | null;
  maximum: number | null;
};

type LiveAirQuality = {
  status: "live";
  jurisdiction: string;
  sourceState: string;
  station: string;
  city: string;
  observedAt: string;
  pollutants: PollutantReading[];
  sourceRecordCount: number;
  sourceTotal: number | null;
  limitation: string;
  retrievedAt: string;
};

type AnnualEvidence = {
  status: "available";
  jurisdiction: string;
  crime: {
    ipcRegistered: number | null;
    ipcRatePerLakh: number | null;
    ipcYear: number;
    violentRegistered: number | null;
    violentRatePerLakh: number | null;
    chargesheetingRate: number | null;
    violentYear: number;
    rapeRegistered: number | null;
    rapeYear: number;
  };
  roadSafety: {
    accidentsReported: number | null;
    deaths: number | null;
    injured: number | null;
    derivedDailyAverage: number | null;
    year: number;
  };
  sources: Record<string, string>;
  caveats: string[];
  retrievedAt: string;
};

type AllStateEvidenceRow = {
  jurisdiction: string;
  type: "State" | "Union territory";
  rapeRegistered2023: number | null;
  violentRegistered2022: number | null;
  violentRatePerLakh2022: number | null;
  ipcRegistered2019: number | null;
  ipcRatePerLakh2019: number | null;
  roadAccidents2023: number | null;
  derivedAccidentsPerDay2023: number | null;
  roadDeaths2023: number | null;
  roadInjured2023: number | null;
  caveats: string[];
};

type AllStateEvidence = {
  status: "available";
  rows: AllStateEvidenceRow[];
  coverage: Record<string, number>;
  sources: Record<string, string>;
  limitations: string[];
  retrievedAt: string;
};

type AllStateSort = "name" | "rape" | "violent-rate" | "accidents" | "deaths" | "daily";

type PerCapitaNsdpRecord = { value: number; year: "2022-23" | "2023-24" };
type StateOutputRecord = { valueCrore: number; year: "2021-22" | "2022-23" | "2023-24" };

const perCapitaNsdp: Record<string, PerCapitaNsdpRecord> = {
  "Andhra Pradesh": { value: 242479, year: "2023-24" }, "Arunachal Pradesh": { value: 199992, year: "2022-23" },
  Assam: { value: 135787, year: "2023-24" }, Bihar: { value: 60337, year: "2023-24" }, Chhattisgarh: { value: 147361, year: "2023-24" },
  Goa: { value: 492648, year: "2022-23" }, Gujarat: { value: 272451, year: "2022-23" }, Haryana: { value: 325759, year: "2023-24" },
  "Himachal Pradesh": { value: 235199, year: "2023-24" }, "Jammu & Kashmir": { value: 142138, year: "2023-24" },
  Jharkhand: { value: 105274, year: "2023-24" }, Karnataka: { value: 332926, year: "2023-24" }, Kerala: { value: 281001, year: "2023-24" },
  "Madhya Pradesh": { value: 142565, year: "2023-24" }, Maharashtra: { value: 277603, year: "2023-24" },
  Manipur: { value: 111853, year: "2022-23" }, Meghalaya: { value: 136948, year: "2023-24" }, Mizoram: { value: 215144, year: "2022-23" },
  Nagaland: { value: 145537, year: "2022-23" }, Odisha: { value: 163101, year: "2023-24" }, Punjab: { value: 196505, year: "2023-24" },
  Rajasthan: { value: 167964, year: "2023-24" }, Sikkim: { value: 587743, year: "2023-24" }, "Tamil Nadu": { value: 315220, year: "2023-24" },
  Telangana: { value: 356564, year: "2023-24" }, Tripura: { value: 177723, year: "2023-24" }, "Uttar Pradesh": { value: 93514, year: "2023-24" },
  Uttarakhand: { value: 260201, year: "2023-24" }, "West Bengal": { value: 154119, year: "2023-24" },
  "Andaman & Nicobar Islands": { value: 258151, year: "2022-23" }, Chandigarh: { value: 399654, year: "2022-23" },
  "Delhi (NCT)": { value: 461910, year: "2023-24" }, Puducherry: { value: 262166, year: "2023-24" },
};

const stateOutputNsdp: Record<string, StateOutputRecord> = {
  "Andhra Pradesh": { valueCrore: 1291518, year: "2023-24" }, "Arunachal Pradesh": { valueCrore: 35555, year: "2022-23" },
  Assam: { valueCrore: 487584, year: "2023-24" }, Bihar: { valueCrore: 681761, year: "2022-23" }, Chhattisgarh: { valueCrore: 447682, year: "2023-24" },
  Goa: { valueCrore: 83711, year: "2022-23" }, Gujarat: { valueCrore: 1946334, year: "2022-23" }, Haryana: { valueCrore: 985877, year: "2023-24" },
  "Himachal Pradesh": { valueCrore: 176164, year: "2023-24" }, Jharkhand: { valueCrore: 360689, year: "2022-23" },
  Karnataka: { valueCrore: 2261867, year: "2023-24" }, Kerala: { valueCrore: 933564, year: "2022-23" }, "Madhya Pradesh": { valueCrore: 1242883, year: "2023-24" },
  Maharashtra: { valueCrore: 2690525, year: "2021-22" }, Manipur: { valueCrore: 32874, year: "2021-22" }, Meghalaya: { valueCrore: 42214, year: "2023-24" },
  Mizoram: { valueCrore: 24293, year: "2021-22" }, Nagaland: { valueCrore: 31416, year: "2022-23" }, Odisha: { valueCrore: 749809, year: "2023-24" },
  Punjab: { valueCrore: 639252, year: "2023-24" }, Rajasthan: { valueCrore: 1366626, year: "2023-24" }, Sikkim: { valueCrore: 35670, year: "2022-23" },
  "Tamil Nadu": { valueCrore: 2417237, year: "2023-24" }, Telangana: { valueCrore: 1326022, year: "2023-24" }, Tripura: { valueCrore: 65808, year: "2022-23" },
  "Uttar Pradesh": { valueCrore: 2217055, year: "2023-24" }, Uttarakhand: { valueCrore: 304592, year: "2023-24" }, "West Bengal": { valueCrore: 1531371, year: "2023-24" },
  "Andaman & Nicobar Islands": { valueCrore: 9209, year: "2021-22" }, Chandigarh: { valueCrore: 48261, year: "2022-23" }, "Delhi (NCT)": { valueCrore: 997171, year: "2023-24" },
  "Jammu & Kashmir": { valueCrore: 200046, year: "2023-24" }, Puducherry: { valueCrore: 44809, year: "2022-23" },
};

const dataMenu = [
  { title: "Economy & budgets", links: [["GDP and state output", "#economy"], ["Per-capita NSDP", "#economy"], ["Debt and reported assets", "#economy"], ["Wealth distribution", "#economy"], ["Budget bifurcation", "#evidence"]] },
  { title: "People & services", links: [["Birth rate", "#jurisdictions"], ["Sex ratio at birth", "#jurisdictions"], ["Schools and students", "#jurisdictions"], ["Hospitals and beds", "#jurisdictions"], ["Ambulances", "#jurisdictions"]] },
  { title: "Safety & infrastructure", links: [["Registered crime", "#jurisdictions"], ["Road accidents", "#jurisdictions"], ["Air quality", "#live-data"], ["Environment", "#modules"], ["Road condition reports", "#road-report"]] },
  { title: "Accountability", links: [["Promises tracker", "#evidence"], ["1947–present timeline", "#timeline"], ["Schemes", "#modules"], ["All states and UTs", "#jurisdictions"], ["Methodology and gaps", "#methodology"]] },
] as const;

const decadeEvidence = [
  { period: "1947–59", title: "Independence and the Constitution", detail: "Public validation anchor: constitutional text and commencement record.", href: "https://legislative.gov.in/constitution-of-india/" },
  { period: "1960s", title: "Sample Registration System begins", detail: "Birth and death estimates move toward a continuing dual-record statistical system.", href: "https://censusindia.gov.in/census.website/en/node/180" },
  { period: "1970s", title: "Constitutional amendments register", detail: "Amendment texts are indexed; policy outcomes still require separate evidence.", href: "https://legislative.gov.in/constitution-amendment-acts/" },
  { period: "1980s", title: "Environment protection framework", detail: "The statutory record is an anchor, not proof of enforcement or outcomes.", href: "https://www.indiacode.nic.in/" },
  { period: "1990s", title: "Economic reform and local-government change", detail: "The decade register separates policy announcements from measurable results.", href: "https://www.rbi.org.in/" },
  { period: "2000s", title: "RTI and rights-based programmes", detail: "Acts, rules, budgets and delivery evidence are tracked as distinct layers.", href: "https://rti.gov.in/" },
  { period: "2010s", title: "GST and digital public infrastructure", detail: "National implementation records require state and sector breakdowns.", href: "https://www.gst.gov.in/" },
  { period: "2020s", title: "Pandemic response and recovery", detail: "Health, relief, mortality and economic evidence remain separate series.", href: "https://www.mohfw.gov.in/" },
];

const evidenceTopics = [
  { title: "Budget bifurcation", status: "Source mapping", detail: "State BE, RE and actuals require each finance department and CAG series.", href: "https://cag.gov.in/en/state-accounts-report" },
  { title: "Promises", status: "Method records", detail: "Commitment, deadline, target, dated evidence and rationale—not campaign scoring.", href: "#evidence" },
  { title: "Birth rate", status: "Annual SRS", detail: "Latest official estimates are periodic, not a live birth counter.", href: "https://censusindia.gov.in/census.website/en/node/294" },
  { title: "Sex ratio at birth", status: "Definition required", detail: "Use SRS/CRS sex ratio and PCPNDT enforcement data—not a fabricated ‘foetus killing rate’.", href: "https://censusindia.gov.in/census.website/en/node/294" },
  { title: "Girls vs boys", status: "UDISE+ 2023–24", detail: "National school enrolment: 119.30m girls and 128.74m boys; state extraction pending.", href: "https://dsel.education.gov.in/sites/default/files/statistics/report_in_PDF/udise_report_nep_23_24.pdf" },
  { title: "Government schools", status: "UDISE+ 2023–24", detail: "1,017,660 government schools and 127.49m enrolments nationally; location-level ingestion pending.", href: "https://dsel.education.gov.in/sites/default/files/statistics/report_in_PDF/udise_report_nep_23_24.pdf" },
  { title: "Inflation", status: "Monthly publication", detail: "CPI is time- and basket-specific; state series must preserve rural/urban/combined definitions.", href: "https://www.mospi.gov.in/" },
  { title: "Per-capita NSDP", status: "Annual publication", detail: "The relevant state measure is per-capita NSDP at current and constant prices, not total GDP.", href: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22089" },
  { title: "Investment comparison", status: "Metric unresolved", detail: "FDI inflow, portfolio return and public-investment outcomes are different measures; no composite rank yet.", href: "https://dpiit.gov.in/publications/fdi-statistics" },
  { title: "Ambulances", status: "State-managed", detail: "No verified national real-time fleet-availability feed; sanctioned, deployed and active vehicles differ.", href: "https://www.mohfw.gov.in/" },
  { title: "Hospital beds", status: "Capacity snapshot", detail: "Official bed counts are periodic capacity reports, not real-time vacant-bed availability.", href: "https://www.mohfw.gov.in/sites/default/files/RHS%202021-22.pdf" },
];

function weatherLabel(code: number) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Fog or haze";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

function mapMarkerPosition(name: string) {
  const location = jurisdictionLocations[name];
  if (!location) return { left: "50%", top: "50%" };
  const left = 8 + ((location.lon - 68) / 29) * 84;
  const top = 5 + ((37 - location.lat) / 30) * 86;
  return { left: `${Math.max(4, Math.min(96, left))}%`, top: `${Math.max(4, Math.min(94, top))}%` };
}

function evidenceNumber(value: number | null, digits = 0) {
  if (value === null || !Number.isFinite(value)) return "Not available";
  return value.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

const modules = [
  {
    number: "01",
    title: "Promises tracker",
    description: "A traceable chain from an official commitment to dated delivery evidence.",
    status: "3 method records",
    tone: "ready",
    tags: ["Source", "deadline", "evidence"],
  },
  {
    number: "02",
    title: "Decade timelines",
    description: "National and jurisdiction timelines from 1947, with empty decades shown—not hidden.",
    status: "Coverage scaffold",
    tone: "partial",
    tags: ["1947–now", "crisis", "policy"],
  },
  {
    number: "03",
    title: "Government schemes",
    description: "Eligibility, allocation, actual spend, beneficiaries, coverage and audit findings.",
    status: "1 verified snapshot",
    tone: "ready",
    tags: ["Eligibility", "spend", "audit"],
  },
  {
    number: "04",
    title: "Budgets & sectors",
    description: "Union and state estimates, revised estimates and actuals kept visibly distinct.",
    status: "Union seed loaded",
    tone: "ready",
    tags: ["BE", "RE", "actuals"],
  },
  {
    number: "05",
    title: "Health structure",
    description: "Facility tiers, beds, workforce and access—only when definitions are comparable.",
    status: "Source mapping",
    tone: "gap",
    tags: ["Facilities", "staff", "access"],
  },
  {
    number: "06",
    title: "Environment",
    description: "Forest and tree cover, air quality, water and other pollution by reporting period.",
    status: "Forest seed loaded",
    tone: "ready",
    tags: ["Forest", "air", "pollution"],
  },
  {
    number: "07",
    title: "Crisis record",
    description: "Wars, assassinations, disasters, relief and official response with careful sourcing.",
    status: "Index only",
    tone: "partial",
    tags: ["Event", "response", "relief"],
  },
  {
    number: "08",
    title: "Road condition reports",
    description: "Citizen photos, location, authority routing, verification state and privacy controls.",
    status: "Workflow prototype",
    tone: "partial",
    tags: ["Photo", "authority", "verification"],
  },
];

const contextLinks = [
  { label: "Representatives", detail: "Constituency and election context", href: "https://www.eci.gov.in/" },
  { label: "Grievances", detail: "Central public grievance portal", href: "https://pgportal.gov.in/" },
  { label: "RTI", detail: "Central RTI filing and status", href: "https://rtionline.gov.in/" },
  { label: "Education", detail: "UDISE+ school data", href: "https://dashboard.udiseplus.gov.in/" },
  { label: "Jobs", detail: "Periodic Labour Force Survey", href: "https://www.mospi.gov.in/publication/plfs" },
  { label: "Transport", detail: "Road transport ministry data", href: "https://morth.nic.in/" },
  { label: "Water", detail: "Jal Jeevan Mission reports", href: "https://ejalshakti.gov.in/jjmreport/JJMIndia.aspx" },
  { label: "Crime & safety", detail: "NCRB publications", href: "https://ncrb.gov.in/" },
  { label: "Digital access", detail: "TRAI performance indicators", href: "https://www.trai.gov.in/release-publication/reports/performance-indicators-reports" },
];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const [jurisdiction, setJurisdiction] = useState("India — national view");
  const [moduleQuery, setModuleQuery] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState("");
  const [liveWeather, setLiveWeather] = useState<LiveWeather | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState("");
  const [liveAir, setLiveAir] = useState<LiveAirQuality | null>(null);
  const [airLoading, setAirLoading] = useState(true);
  const [airError, setAirError] = useState("");
  const [annualEvidence, setAnnualEvidence] = useState<AnnualEvidence | null>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(true);
  const [evidenceError, setEvidenceError] = useState("");
  const [allStateEvidence, setAllStateEvidence] = useState<AllStateEvidence | null>(null);
  const [allStateLoading, setAllStateLoading] = useState(true);
  const [allStateError, setAllStateError] = useState("");
  const [allStateQuery, setAllStateQuery] = useState("");
  const [allStateSort, setAllStateSort] = useState<AllStateSort>("name");
  const [incomeTableOpen, setIncomeTableOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredModules = useMemo(() => {
    const query = moduleQuery.trim().toLowerCase();
    if (!query) return modules;
    return modules.filter((module) =>
      [module.title, module.description, module.status, ...module.tags].join(" ").toLowerCase().includes(query),
    );
  }, [moduleQuery]);

  const visibleStateRows = useMemo(() => {
    const query = allStateQuery.trim().toLowerCase();
    const rows = (allStateEvidence?.rows || []).filter((row) => row.jurisdiction.toLowerCase().includes(query));
    const values: Record<Exclude<AllStateSort, "name">, keyof AllStateEvidenceRow> = {
      rape: "rapeRegistered2023",
      "violent-rate": "violentRatePerLakh2022",
      accidents: "roadAccidents2023",
      deaths: "roadDeaths2023",
      daily: "derivedAccidentsPerDay2023",
    };
    return [...rows].sort((left, right) => {
      if (allStateSort === "name") return left.jurisdiction.localeCompare(right.jurisdiction);
      const key = values[allStateSort];
      const leftValue = typeof left[key] === "number" ? left[key] as number : -1;
      const rightValue = typeof right[key] === "number" ? right[key] as number : -1;
      return rightValue - leftValue;
    });
  }, [allStateEvidence, allStateQuery, allStateSort]);

  const incomeRows = useMemo(() => [...states, ...unionTerritories].map((name) => ({
    jurisdiction: name,
    record: perCapitaNsdp[name] || null,
  })).sort((left, right) => (right.record?.value ?? -1) - (left.record?.value ?? -1)), []);

  const loadLiveWeather = useCallback(async () => {
    const location = jurisdictionLocations[jurisdiction] ?? jurisdictionLocations["India — national view"];
    setLiveLoading(true);
    setLiveError("");

    try {
      const params = new URLSearchParams({
        lat: String(location.lat),
        lon: String(location.lon),
        place: location.place,
        jurisdiction,
      });
      const response = await fetch(`/api/live/weather?${params.toString()}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.status !== "live") throw new Error(payload.error || "Live source unavailable");
      setLiveWeather(payload);
    } catch (error) {
      setLiveWeather(null);
      setLiveError(error instanceof Error ? error.message : "Live source unavailable");
    } finally {
      setLiveLoading(false);
    }
  }, [jurisdiction]);

  const loadLiveAir = useCallback(async () => {
    const location = jurisdictionLocations[jurisdiction] ?? jurisdictionLocations["India — national view"];
    setAirLoading(true);
    setAirError("");

    try {
      const params = new URLSearchParams({
        lat: String(location.lat),
        lon: String(location.lon),
        jurisdiction,
      });
      const response = await fetch(`/api/live/air-quality?${params.toString()}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.status !== "live") throw new Error(payload.error || "Official air-quality source unavailable");
      setLiveAir(payload);
    } catch (error) {
      setLiveAir(null);
      setAirError(error instanceof Error ? error.message : "Official air-quality source unavailable");
    } finally {
      setAirLoading(false);
    }
  }, [jurisdiction]);

  const loadAnnualEvidence = useCallback(async () => {
    setEvidenceLoading(true);
    setEvidenceError("");
    setAnnualEvidence(null);
    try {
      const response = await fetch(`/api/evidence/state?jurisdiction=${encodeURIComponent(jurisdiction)}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.status !== "available") throw new Error(payload.error || "Annual evidence unavailable");
      setAnnualEvidence(payload);
    } catch (error) {
      setAnnualEvidence(null);
      setEvidenceError(error instanceof Error ? error.message : "Annual evidence unavailable");
    } finally {
      setEvidenceLoading(false);
    }
  }, [jurisdiction]);

  const loadAllStateEvidence = useCallback(async () => {
    setAllStateLoading(true);
    setAllStateError("");
    try {
      const response = await fetch("/api/evidence/all-states", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.status !== "available" || payload.rows?.length !== 36) throw new Error(payload.error || "All-state evidence unavailable");
      setAllStateEvidence(payload);
    } catch (error) {
      setAllStateEvidence(null);
      setAllStateError(error instanceof Error ? error.message : "All-state evidence unavailable");
    } finally {
      setAllStateLoading(false);
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void loadLiveWeather(), 0);
    const refresh = window.setInterval(() => void loadLiveWeather(), 10 * 60 * 1000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(refresh);
    };
  }, [loadLiveWeather]);

  useEffect(() => {
    const initial = window.setTimeout(() => void loadLiveAir(), 0);
    const refresh = window.setInterval(() => void loadLiveAir(), 15 * 60 * 1000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(refresh);
    };
  }, [loadLiveAir]);

  useEffect(() => {
    const initial = window.setTimeout(() => void loadAnnualEvidence(), 0);
    return () => window.clearTimeout(initial);
  }, [loadAnnualEvidence]);

  useEffect(() => {
    const initial = window.setTimeout(() => void loadAllStateEvidence(), 0);
    return () => window.clearTimeout(initial);
  }, [loadAllStateEvidence]);

  function submitPrototypeReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReportStatus("Prototype confirmed: no photo, location or personal data was uploaded or saved.");
  }

  return (
    <main>
      <div className="topline">
        <span><i /> <b lang="hi">भारत</b> / India · Independent civic-data prototype</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="India Evidence Dashboard home">
          <span className="brand-mark" aria-hidden="true"><b /><b /><b /></span>
          <span>India Evidence <em>Dashboard</em></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#economy">Economy</a>
          <a href="#live-data">Live data</a>
          <a href="#jurisdictions">States & UTs</a>
          <a href="#methodology">Methodology</a>
        </nav>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="data-menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Close" : "All data"}<span aria-hidden="true">{menuOpen ? "×" : "+"}</span></button>
        <button className="header-action" onClick={() => setReportOpen(true)}>Report a road issue</button>
      </header>

      {menuOpen && <aside className="data-menu" id="data-menu" aria-label="All dashboard data">
        <div className="data-menu-head"><div><p>Evidence directory</p><h2>Every dataset, one clear route.</h2></div><span>Live, periodic and data-gap records remain visibly different.</span></div>
        <div className="data-menu-grid">{dataMenu.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<span>→</span></a>)}</section>)}</div>
      </aside>}

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="india-identity"><span lang="hi">भारत</span><i /><b>INDIA EVIDENCE LEDGER</b></div>
          <p className="eyebrow">36 jurisdictions · one evidence standard</p>
          <h1>What changed.<br /><span>What can be proved.</span></h1>
          <p className="hero-intro">
            A politically neutral record of public commitments, spending, services and outcomes across every Indian state and union territory.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#economy">Explore the evidence <span>↓</span></a>
            <a className="text-link" href="#methodology">How claims are checked <span>→</span></a>
          </div>
          <div className="integrity-note">
            <span className="shield" aria-hidden="true">◇</span>
            <p><strong>No party score.</strong> Every comparison must name its metric, period, definition, source and limitation.</p>
          </div>
        </div>

      </section>

      <section className="economic-section" id="economy" aria-labelledby="economic-title">
        <div className="economic-intro">
          <div>
            <p className="eyebrow">India and state economies · periodic evidence</p>
            <h1 id="economic-title">GDP, state output, public balance sheet, and wealth.</h1>
            <p>These are dated statistical releases—not Worldometer-style live counters. GDP, debt, assets, and household wealth describe different measurement systems and are kept separate.</p>
          </div>
          <label className="economic-jurisdiction"><span>Show economic context for</span><select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
            <option>India — national view</option>
            <optgroup label="28 states">{states.map((state) => <option key={state}>{state}</option>)}</optgroup>
            <optgroup label="8 union territories">{unionTerritories.map((territory) => <option key={territory}>{territory}</option>)}</optgroup>
          </select></label>
        </div>

        <div className="economic-grid">
          <article className="economic-card gdp-card">
            <div className="economic-card-top"><span>{jurisdiction.startsWith("India") ? "India · nominal GDP" : `${jurisdiction} · state output`}</span><b>{jurisdiction.startsWith("India") ? "Provisional estimate" : stateOutputNsdp[jurisdiction]?.year || "Data gap"}</b></div>
            {jurisdiction.startsWith("India") ? <>
              <strong className="economic-value">₹346.36<span> lakh crore</span></strong>
              <h2>Gross domestic product</h2>
              <p><b>FY 2025–26 · current prices.</b> This measures the country’s annual production, not government revenue or household wealth.</p>
              <ExternalLink href="https://www.mospi.gov.in/uploads/latestreleasesfiles/1780656381622-Press%20Note%20on%20GDP%20Estimates%20for%20Q4%202025-26%20and%20PE%20FY%202025-26_F.pdf">MoSPI release · 5 Jun 2026</ExternalLink>
            </> : stateOutputNsdp[jurisdiction] ? <>
              <strong className="economic-value">₹{(stateOutputNsdp[jurisdiction].valueCrore / 100000).toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}<span> lakh crore</span></strong>
              <h2>Net state domestic product</h2>
              <p><b>{stateOutputNsdp[jurisdiction].year} · current prices.</b> This is the latest published NSDP value in the cited Economic Survey table—not national GDP and not a live estimate.</p>
              <ExternalLink href="https://www.indiabudget.gov.in/budget2024-25/economicsurvey/doc/stat/tab110a.pdf">Economic Survey · state NSDP table</ExternalLink>
            </> : <>
              <strong className="economic-value gap-value">Not available</strong>
              <h2>State output data gap</h2>
              <p>No separate value is published for {jurisdiction} in this source table. India’s GDP is not substituted.</p>
              <ExternalLink href="https://www.indiabudget.gov.in/budget2024-25/economicsurvey/doc/stat/tab110a.pdf">Economic Survey · state NSDP table</ExternalLink>
            </>}
          </article>

          <article className="economic-card income-card">
            <div className="economic-card-top"><span>{jurisdiction.startsWith("India") ? "India · GDP per person" : `${jurisdiction} · NSDP per person`}</span><b>{jurisdiction.startsWith("India") ? "PE 2025–26" : perCapitaNsdp[jurisdiction]?.year || "Data gap"}</b></div>
            {jurisdiction.startsWith("India") ? <>
              <strong className="economic-value">₹2,27,447<span> per person</span></strong>
              <h2>Per-capita GDP</h2>
              <p>Current-price provisional estimate. It is an average, not median income, take-home pay, or wealth.</p>
            </> : perCapitaNsdp[jurisdiction] ? <>
              <strong className="economic-value">₹{perCapitaNsdp[jurisdiction].value.toLocaleString("en-IN")}<span> per person</span></strong>
              <h2>Per-capita net state domestic product</h2>
              <p><b>{perCapitaNsdp[jurisdiction].year} · current prices.</b> RBI/NSO latest available in the selected table; source years differ across jurisdictions.</p>
            </> : <>
              <strong className="economic-value gap-value">Not available</strong>
              <h2>Per-capita NSDP data gap</h2>
              <p>The RBI table does not publish a separate current-series value for {jurisdiction}. No national or neighbouring-state value is substituted.</p>
            </>}
            <ExternalLink href="https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22483">RBI per-capita NSDP table</ExternalLink>
          </article>

          <article className="economic-card balance-card">
            <div className="economic-card-top"><span>Central Government · 2025–26 BE</span><b>Book-value comparison</b></div>
            <strong className="economic-value">2.23<span>× liabilities / reported assets</span></strong>
            <h2>₹196.78 lakh cr liabilities vs ₹88.28 lakh cr assets</h2>
            <div className="balance-bars"><div><span>Liabilities</span><i style={{ width: "100%" }} /></div><div><span>Capital outlay + loans</span><i style={{ width: "44.9%" }} /></div></div>
            <p><b>Limit:</b> “Assets” here means cumulative book-value capital outlay plus loans advanced in the Union Receipt Budget. It is not a market valuation of all public assets or India’s national wealth.</p>
            <ExternalLink href="https://www.indiabudget.gov.in/budget2025-26/doc/rec/annex92.pdf">Union Receipt Budget · asset statement</ExternalLink>
          </article>

          <article className="economic-card wealth-card">
            <div className="economic-card-top"><span>India · household wealth shares</span><b>Research estimate · 2022–23</b></div>
            <h2>How total net wealth is distributed</h2>
            <div className="wealth-bars">
              <div><span>Bottom 50% of adults</span><i style={{ width: "6.4%" }} /><strong>6.4%</strong></div>
              <div><span>Middle 40%</span><i style={{ width: "28.6%" }} /><strong>28.6%</strong></div>
              <div><span>Top 10%</span><i style={{ width: "65%" }} /><strong>65.0%</strong></div>
            </div>
            <p><b>Top 1%: 40.1%</b>, included inside the top 10%. This is World Inequality Lab research combining survey and rich-list evidence—not an official Government of India series.</p>
            <ExternalLink href="https://wid.world/wp-content/uploads/2024/03/WorldInequalityLab_WP2024_09_Income-and-Wealth-Inequality-in-India-1922-2023_Final.pdf">World Inequality Lab paper · table 3</ExternalLink>
          </article>
        </div>

        <div className="income-coverage">
          <button aria-expanded={incomeTableOpen} onClick={() => setIncomeTableOpen((open) => !open)}><span><b>Per-capita NSDP across all 36 jurisdictions</b><small>33 published values · 3 visible data gaps · current prices</small></span><i>{incomeTableOpen ? "−" : "+"}</i></button>
          {incomeTableOpen && <div className="income-table-wrap"><table><caption>Latest available RBI per-capita NSDP values by state and union territory</caption><thead><tr><th>State / union territory</th><th>Latest value</th><th>Source year</th><th>Interpretation</th></tr></thead><tbody>{incomeRows.map(({ jurisdiction: name, record }) => <tr key={name}><th><button onClick={() => setJurisdiction(name)}>{name}</button></th><td>{record ? `₹${record.value.toLocaleString("en-IN")}` : "Not available"}</td><td>{record?.year || "Data gap"}</td><td>{record ? record.year === "2023-24" ? "Latest common-year value" : "Latest older value" : "No separate RBI value"}</td></tr>)}</tbody></table><p>Do not treat this mixed-year ordering as an official rank. Compare jurisdictions only after matching the same year, price basis, boundary and revision status.</p></div>}
        </div>
      </section>

      <section className="trust-strip" aria-label="Evidence principles">
        <p>Built for scrutiny</p>
        <div><span>01</span> Official or attributable sources</div>
        <div><span>02</span> Evidence date on every claim</div>
        <div><span>03</span> Estimates ≠ actual spending</div>
        <div><span>04</span> Unknown stays visible</div>
      </section>

      <section className="section live-section" id="live-data">
        <div className="section-heading live-heading">
          <div>
            <p className="eyebrow"><span className="pulse-dot" /> Running data demo</p>
            <h2>Current conditions.<br /><em>Source and freshness visible.</em></h2>
          </div>
          <div className="live-control">
            <label htmlFor="live-jurisdiction">Reference location</label>
            <select id="live-jurisdiction" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
              <option>India — national view</option>
              <optgroup label="28 states">{states.map((state) => <option key={state}>{state}</option>)}</optgroup>
              <optgroup label="8 union territories">{unionTerritories.map((territory) => <option key={territory}>{territory}</option>)}</optgroup>
            </select>
          </div>
        </div>

        <div className="live-dashboard">
          <div className="live-primary">
            <div className="live-source-line">
              <span><i /> {liveLoading ? "Refreshing" : liveWeather ? "Feed responding" : "Feed unavailable"}</span>
              <button onClick={() => void loadLiveWeather()} disabled={liveLoading}>{liveLoading ? "Checking…" : "Refresh now ↻"}</button>
            </div>

            {liveLoading && !liveWeather ? (
              <div className="live-loading" role="status"><span /><span /><span /><p>Requesting the latest public model data…</p></div>
            ) : liveError ? (
              <div className="live-error" role="alert"><strong>Current value unavailable</strong><p>{liveError}</p><small>No cached number is being passed off as live.</small></div>
            ) : liveWeather && (
              <>
                <div className="live-place">
                  <div><p>{liveWeather.jurisdiction}</p><h3>{liveWeather.place}</h3></div>
                  <span>{weatherLabel(liveWeather.weatherCode)}</span>
                </div>
                <div className="live-metrics">
                  <article className="temperature-reading"><span>Air temperature</span><strong>{liveWeather.temperature.toFixed(1)}<small>°C</small></strong><p>Feels like {liveWeather.apparentTemperature.toFixed(1)}°C</p></article>
                  <article><span>Relative humidity</span><strong>{Math.round(liveWeather.humidity)}<small>%</small></strong><p>At reference grid cell</p></article>
                  <article><span>Wind speed</span><strong>{liveWeather.windSpeed.toFixed(1)}<small> km/h</small></strong><p>10 metres above ground</p></article>
                  <article><span>Precipitation</span><strong>{liveWeather.precipitation.toFixed(1)}<small> mm</small></strong><p>Previous 15-minute interval</p></article>
                </div>
                <div className="freshness-row">
                  <div><span>Valid at</span><strong>{new Date(liveWeather.observedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST</strong></div>
                  <div><span>Retrieved</span><strong>{new Date(liveWeather.retrievedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" })} IST</strong></div>
                  <div><span>Refresh policy</span><strong>10 minutes</strong></div>
                  <ExternalLink href="https://open-meteo.com/en/docs" className="live-attribution">Open-Meteo · CC BY 4.0</ExternalLink>
                </div>
              </>
            )}
          </div>

          <aside className="connector-panel">
            <p className="connector-kicker">Data connection ledger</p>
            <h3>Live does not mean<br />the same thing everywhere.</h3>
            <div className="connector-list">
              <div><span className="connector-status connected">Running</span><p><strong>Open-Meteo current conditions</strong><small>Public model-data API · automatic</small></p></div>
              <div><span className={`connector-status ${liveAir ? "connected" : "editorial"}`}>{liveAir ? "Running" : "Credential-ready"}</span><p><strong>CPCB air quality</strong><small>Official hourly feed · server-side data.gov.in key required</small></p></div>
              <div><span className="connector-status key">Restricted</span><p><strong>IMD warnings</strong><small>Government-email registration required · not connected</small></p></div>
              <div><span className="connector-status editorial">Release cycle</span><p><strong>Budgets, audits, forests</strong><small>Updated only when source publications change</small></p></div>
            </div>
            <p className="connector-note">Weather is a public model-data demo. CPCB values are official station records. Neither is a government-performance score or emergency-warning service.</p>
          </aside>
        </div>

        <section className="air-quality-card" aria-labelledby="air-quality-title">
          <div className="air-quality-head">
            <div>
              <p className="eyebrow"><span className="pulse-dot" /> Official CPCB station feed</p>
              <h3 id="air-quality-title">Air-quality evidence near the reference location</h3>
            </div>
            <button onClick={() => void loadLiveAir()} disabled={airLoading}>{airLoading ? "Checking…" : "Refresh official feed ↻"}</button>
          </div>
          {airLoading && !liveAir ? (
            <div className="air-state" role="status">Requesting the latest CPCB records through data.gov.in…</div>
          ) : airError ? (
            <div className="air-state error" role="alert"><strong>No station value shown</strong><span>{airError}</span></div>
          ) : liveAir && (
            <>
              <div className="air-station-row">
                <div><span>Nearest reporting station</span><strong>{liveAir.station}</strong><small>{liveAir.city}, {liveAir.sourceState}</small></div>
                <div><span>Source observation</span><strong>{liveAir.observedAt} IST</strong><small>Retrieved {new Date(liveAir.retrievedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST</small></div>
                <div><span>Coverage returned</span><strong>{liveAir.sourceRecordCount} records</strong><small>For the selected source jurisdiction</small></div>
              </div>
              <div className="pollutant-grid">
                {liveAir.pollutants.slice(0, 7).map((pollutant) => (
                  <article key={pollutant.id}>
                    <span>{pollutant.id}</span>
                    <strong>{pollutant.average === null ? "NA" : pollutant.average}</strong>
                    <small>source-reported average</small>
                    <p>{pollutant.minimum === null ? "NA" : pollutant.minimum} min · {pollutant.maximum === null ? "NA" : pollutant.maximum} max</p>
                  </article>
                ))}
              </div>
              <div className="air-source-row">
                <p>{liveAir.limitation} Pollutant units and averaging conventions follow the source metadata.</p>
                <ExternalLink href="https://www.data.gov.in/resource/real-time-air-quality-index-various-locations" className="live-attribution">CPCB via data.gov.in</ExternalLink>
              </div>
            </>
          )}
        </section>
      </section>

      <section className="section national-section" id="evidence">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{jurisdiction.startsWith("India") ? "National overview" : `${unionTerritories.includes(jurisdiction) ? "Union territory" : "State"} overview`}</p>
            <h2>{jurisdiction.startsWith("India") ? "Three facts. Full context." : jurisdiction}</h2>
          </div>
          <p>{jurisdiction.startsWith("India") ? "Seed evidence is intentionally small. Each figure is linked to a public primary source and carries a definition and limitation." : `The overview now follows the selected jurisdiction. These are official annual records for ${jurisdiction}, not national totals or a performance score.`}</p>
        </div>

        {jurisdiction.startsWith("India") ? <div className="metric-grid">
          <article className="metric-card featured">
            <div className="metric-top"><span>Union Budget · BE 2025–26</span><span className="source-state">Official PDF</span></div>
            <strong className="metric-value">₹50.65<span> lakh cr</span></strong>
            <h3>Total expenditure estimated</h3>
            <div className="mini-bar"><i style={{ width: "77%" }} /></div>
            <div className="metric-detail"><span>Capital expenditure</span><strong>₹11.21 lakh cr</strong></div>
            <p className="limitation"><b>Limit:</b> Budget Estimate, not audited actual expenditure. Figures rounded from ₹50,65,345 crore and ₹11,21,090 crore.</p>
            <ExternalLink href="https://www.indiabudget.gov.in/budget2025-26/doc/Budget_at_Glance/budget_at_a_glance.pdf" className="source-link">Budget at a Glance 2025–26</ExternalLink>
          </article>

          <article className="metric-card">
            <div className="metric-top"><span>Environment · ISFR 2023</span><span className="source-state">Official release</span></div>
            <strong className="metric-value">25.17<span>%</span></strong>
            <h3>Forest and tree cover</h3>
            <div className="split-stat">
              <div><span>Forest cover</span><strong>21.76%</strong></div>
              <div><span>Tree cover</span><strong>3.41%</strong></div>
            </div>
            <p className="limitation"><b>Period:</b> 2023 assessment. <b>Definition:</b> share of India’s geographical area. <b>Limit:</b> cover does not by itself measure ecological quality.</p>
            <ExternalLink href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2086742" className="source-link">Forest Survey of India release · 21 Dec 2024</ExternalLink>
          </article>

          <article className="metric-card">
            <div className="metric-top"><span>PMAY-G · Original tranche</span><span className="status-badge partial">Partial</span></div>
            <strong className="metric-value">2.69<span> cr</span></strong>
            <h3>Rural houses completed</h3>
            <div className="target-track"><i style={{ width: "91.2%" }} /><b>91.2%</b></div>
            <div className="metric-detail"><span>Original target</span><strong>2.95 crore</strong></div>
            <p className="limitation"><b>Evidence date:</b> end FY 2023–24, reported 11 Mar 2025. <b>Limit:</b> later extension and additional target require separate tracking.</p>
            <ExternalLink href="https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=2110310" className="source-link">Lok Sabha reply via PIB · 11 Mar 2025</ExternalLink>
          </article>
        </div> : evidenceLoading && !annualEvidence ? (
          <div className="state-overview-loading" role="status">Loading official annual evidence for {jurisdiction}…</div>
        ) : evidenceError ? (
          <div className="state-overview-loading error" role="alert">{evidenceError}. National values are not being substituted.</div>
        ) : annualEvidence && (
          <div className="metric-grid state-overview-grid">
            <article className="metric-card featured">
              <div className="metric-top"><span>{jurisdiction} · NCRB {annualEvidence.crime.rapeYear}</span><span className="source-state">Official annual series</span></div>
              <strong className="metric-value">{evidenceNumber(annualEvidence.crime.rapeRegistered)}</strong>
              <h3>Rape cases registered</h3>
              <div className="metric-detail"><span>Geography</span><strong>{jurisdiction}</strong></div>
              <p className="limitation"><b>Definition:</b> police-registered cases, not the true prevalence of sexual violence. Counts should not be read as a safety ranking.</p>
              <ExternalLink href={annualEvidence.sources.rape} className="source-link">NCRB state/UT table · {annualEvidence.crime.rapeYear}</ExternalLink>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>{jurisdiction} · NCRB {annualEvidence.crime.violentYear}</span><span className="source-state">Rate + count</span></div>
              <strong className="metric-value">{evidenceNumber(annualEvidence.crime.violentRatePerLakh, 1)}<span> / lakh</span></strong>
              <h3>Violent-crime registration rate</h3>
              <div className="split-stat"><div><span>Registered cases</span><strong>{evidenceNumber(annualEvidence.crime.violentRegistered)}</strong></div><div><span>Chargesheeting</span><strong>{evidenceNumber(annualEvidence.crime.chargesheetingRate, 1)}%</strong></div></div>
              <p className="limitation"><b>Period:</b> {annualEvidence.crime.violentYear}. <b>Limit:</b> reporting practices and population structure differ between jurisdictions.</p>
              <ExternalLink href={annualEvidence.sources.violent} className="source-link">NCRB violent-crime series</ExternalLink>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>{jurisdiction} · ADSI {annualEvidence.roadSafety.year}</span><span className="source-state">Official annual series</span></div>
              <strong className="metric-value">{evidenceNumber(annualEvidence.roadSafety.accidentsReported)}</strong>
              <h3>Road accidents reported</h3>
              <div className="split-stat"><div><span>Deaths</span><strong>{evidenceNumber(annualEvidence.roadSafety.deaths)}</strong></div><div><span>Derived / day</span><strong>{evidenceNumber(annualEvidence.roadSafety.derivedDailyAverage, 1)}</strong></div></div>
              <p className="limitation"><b>Limit:</b> police-reported annual cases. Daily average is the annual total ÷ 365, not a real-time accident feed.</p>
              <ExternalLink href={annualEvidence.sources.accidents} className="source-link">ADSI road-safety table · {annualEvidence.roadSafety.year}</ExternalLink>
            </article>
          </div>
        )}
      </section>

      <section className="section tracker-section">
        <div className="section-heading compact">
          <div><p className="eyebrow">Promises vs actual delivery · {jurisdiction}</p><h2>{jurisdiction.startsWith("India") ? "What was promised, and what does the evidence prove?" : `Verified promises for ${jurisdiction}`}</h2></div>
          <span className="demo-label">{jurisdiction.startsWith("India") ? "National method demonstration" : "Selected-state evidence register"} · not a complete tracker</span>
        </div>
        <p className="promise-explainer">Each record needs four things: the original official promise, its deadline and target, the latest dated delivery evidence, and a plain-language conclusion. A status is never assigned from a headline alone.</p>
        {jurisdiction.startsWith("India") ? <div className="tracker-table" role="table" aria-label="Sample national promises tracker">
          <div className="tracker-row tracker-head" role="row">
            <span role="columnheader">Official promise</span><span role="columnheader">Conclusion</span><span role="columnheader">Latest dated evidence</span><span role="columnheader">Source</span>
          </div>
          <div className="tracker-row" role="row">
            <div role="cell"><strong>PMAY-G original 2.95 crore rural homes</strong><small>Ministry of Rural Development · deadline record: Mar 2024</small></div>
            <div role="cell"><span className="status-badge partial">Partial / continued</span></div>
            <div role="cell"><strong>2.69 cr completed</strong><small>End FY 2023–24</small></div>
            <div role="cell"><ExternalLink href="https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=2110310" className="trace-link">Official reply</ExternalLink></div>
          </div>
          <div className="tracker-row" role="row">
            <div role="cell"><strong>Rural tap-water coverage goal</strong><small>Jal Jeevan Mission · official target record</small></div>
            <div role="cell"><span className="status-badge unknown">Insufficient evidence</span></div>
            <div role="cell"><strong>Snapshot not ingested</strong><small>Live dashboard is not mirrored in v0.6</small></div>
            <div role="cell"><ExternalLink href="https://ejalshakti.gov.in/jjmreport/JJMIndia.aspx" className="trace-link">Official dashboard</ExternalLink></div>
          </div>
          <div className="tracker-row" role="row">
            <div role="cell"><strong>Public health expenditure target</strong><small>National Health Policy 2017 · target year 2025</small></div>
            <div role="cell"><span className="status-badge unknown">Insufficient evidence</span></div>
            <div role="cell"><strong>Comparable series pending</strong><small>Budgeted and actual spend must be reconciled</small></div>
            <div role="cell"><ExternalLink href="https://www.mohfw.gov.in/sites/default/files/9147562941489753121.pdf" className="trace-link">Policy PDF</ExternalLink></div>
          </div>
        </div> : <div className="state-promise-empty">
          <div><span>Selected jurisdiction</span><strong>{jurisdiction}</strong></div>
          <div><span>Verified promise records loaded</span><strong>0</strong></div>
          <div><span>Current conclusion</span><strong>Insufficient evidence</strong></div>
          <p>No {jurisdiction} promise is being labelled delivered, delayed, or broken until its official commitment and dated outcome evidence are both loaded. National PMAY-G examples are intentionally hidden in this state view.</p>
          <ExternalLink href="https://www.india.gov.in/my-government/government-websites/state-and-union-territory-government" className="state-promise-source">Open official state-government directory</ExternalLink>
        </div>}
        <div className="promise-status-guide" aria-label="Plain-language promise status definitions">
          <div><span className="status-badge delivered">Delivered</span><p>The documented target was achieved by the evidence cutoff.</p></div>
          <div><span className="status-badge partial">Partial</span><p>Some measurable delivery occurred, but the full target was not proved.</p></div>
          <div><span className="status-badge ongoing">Ongoing</span><p>The deadline has not passed and dated implementation evidence exists.</p></div>
          <div><span className="status-badge delayed">Delayed</span><p>The stated deadline passed without proof of full delivery.</p></div>
          <div><span className="status-badge disputed">Disputed</span><p>Credible sources conflict and both interpretations remain visible.</p></div>
          <div><span className="status-badge unknown">Insufficient evidence</span><p>The promise or outcome cannot yet be verified responsibly.</p></div>
        </div>
      </section>

      <section className="section timeline-section" id="timeline">
        <div className="section-heading inverse">
          <div><p className="eyebrow">1947 → present</p><h2>The gaps belong in the timeline too.</h2></div>
          <p>This register provides at least one public validation anchor for every decade from 1947 onward. It is not the number of events that occurred or a claim of complete government coverage.</p>
        </div>
        <div className="decade-strip" aria-label="Decade-by-decade public validation anchors">
          {decadeEvidence.map((item) => <a className="decade loaded" href={`#decade-${item.period.replace(/\W/g, "")}`} key={item.period}><span>{item.period}</span><i /><b>1 anchor loaded</b></a>)}
        </div>
        <div className="timeline-cards decade-register">
          {decadeEvidence.map((item) => (
            <article id={`decade-${item.period.replace(/\W/g, "")}`} key={item.period}>
              <span>{item.period} · public validation anchor</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <ExternalLink href={item.href} className="inverse-link">Open primary public doorway</ExternalLink>
            </article>
          ))}
          <article className="gap-card"><span>Coverage warning</span><h3>One anchor does not mean a decade is complete.</h3><p>Budgets, governments, laws, schemes, crises and outcomes need separate records. Missing records remain visible in the editorial queue.</p><a href="#methodology" className="inverse-link">Read the inclusion rule <span>↓</span></a></article>
        </div>
      </section>

      <section className="section jurisdiction-section" id="jurisdictions">
        <div className="section-heading">
          <div><p className="eyebrow">All-state foundation</p><h2>Every jurisdiction is in the model.</h2></div>
          <p>Being indexed does not mean a state has a complete evidence record. The selected jurisdiction below deliberately exposes that distinction.</p>
        </div>
        <div className="jurisdiction-browser">
          <div className="map-panel">
            <div className="map-glow" />
            <div className="interactive-map" aria-label="Interactive state and union territory locator">
              <Image src="/india-states-outline.png" width={1200} height={1200} alt="Outline locator map of Indian states and union territories" priority />
              {[...states, ...unionTerritories].map((name) => (
                <button
                  key={name}
                  className={jurisdiction === name ? "state-marker active" : "state-marker"}
                  style={mapMarkerPosition(name)}
                  onMouseEnter={() => setJurisdiction(name)}
                  onFocus={() => setJurisdiction(name)}
                  onClick={() => setJurisdiction(name)}
                  aria-label={`Show evidence for ${name}`}
                  data-label={name}
                />
              ))}
            </div>
            <div className="map-caption"><span>Locator only</span><p>Boundaries are not used as a measurement layer. Map artwork: <ExternalLink href="https://ultimaps.com/vector-maps/asia/india/">Ultimaps</ExternalLink>.</p></div>
          </div>
          <div className="jurisdiction-panel">
            <label htmlFor="jurisdiction">Choose a jurisdiction</label>
            <div className="select-wrap">
              <select id="jurisdiction" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
                <option>India — national view</option>
                <optgroup label="28 states">{states.map((state) => <option key={state}>{state}</option>)}</optgroup>
                <optgroup label="8 union territories">{unionTerritories.map((territory) => <option key={territory}>{territory}</option>)}</optgroup>
              </select>
            </div>
            <div className="selected-jurisdiction">
              <span className="selected-type">{jurisdiction.startsWith("India") ? "National overview" : unionTerritories.includes(jurisdiction) ? "Union territory" : "State"}</span>
              <h3>{jurisdiction}</h3>
              <p>{jurisdiction.startsWith("India") ? "Three verified national snapshots are available in this prototype." : annualEvidence ? `Official crime and road-safety evidence is loaded for ${jurisdiction}. Topic coverage and source limitations are shown below.` : `The ${jurisdiction} record is loading its available official evidence.`}</p>
            </div>
            <div className="state-topic-cards">
              <article><span>Budget & public finance</span><strong>{jurisdiction.startsWith("India") ? "Union seed loaded" : "Official source mapped"}</strong><p>{jurisdiction.startsWith("India") ? "BE 2025–26 card available above." : "State BE, RE and audited actuals are not yet ingested; the source doorway is ready."}</p><ExternalLink href="https://cag.gov.in/en/state-accounts-report">CAG state accounts</ExternalLink></article>
              <article><span>Government schemes</span><strong>{jurisdiction.startsWith("India") ? "PMAY-G seed loaded" : "State context ready"}</strong><p>{jurisdiction.startsWith("India") ? "One national proof-chain example is loaded." : `Scheme discovery is available for ${jurisdiction}; beneficiary and spend records remain source-by-source.`}</p><ExternalLink href="https://www.myscheme.gov.in/">Official myScheme portal</ExternalLink></article>
              <article><span>Health structure</span><strong>Official source mapped</strong><p>Facility and bed capacity are periodic reports. No unverified real-time vacancy number is shown.</p><ExternalLink href="https://hmis.mohfw.gov.in/">MoHFW HMIS doorway</ExternalLink></article>
              <article><span>Environment</span><strong>{liveAir ? `${liveAir.station} connected` : airLoading ? "Loading CPCB station" : "CPCB unavailable"}</strong><p>{liveAir ? `${liveAir.pollutants.length} pollutant records near the reference location; not a statewide average.` : "The selected-state CPCB station feed appears in the live section when available."}</p><ExternalLink href="https://www.data.gov.in/resource/real-time-air-quality-index-various-locations">CPCB source</ExternalLink></article>
            </div>
            <ExternalLink href="https://knowindia.india.gov.in/states-uts/" className="source-link">National Portal jurisdiction directory</ExternalLink>
          </div>
        </div>
        <details className="all-jurisdictions">
          <summary>View all 36 jurisdictions <span>+</span></summary>
          <div className="jurisdiction-list">
            <div><p>28 states</p><div>{states.map((state) => <button key={state} onClick={() => setJurisdiction(state)}>{state}</button>)}</div></div>
            <div><p>8 union territories</p><div>{unionTerritories.map((territory) => <button key={territory} onClick={() => setJurisdiction(territory)}>{territory}</button>)}</div></div>
          </div>
        </details>

        <section className="all-state-report" id="all-state-report" aria-labelledby="all-state-title">
          <div className="all-state-report-head">
            <div>
              <p className="eyebrow">Nationwide report · all 36 jurisdictions</p>
              <h3 id="all-state-title">Every state and UT, shown together.</h3>
              <p>Official annual records are displayed for all current jurisdictions. Sort order is exploration—not a government or safety ranking.</p>
            </div>
            <div className="all-state-summary">
              <strong>{allStateEvidence?.rows.length ?? 36}</strong>
              <span>28 states + 8 union territories</span>
            </div>
          </div>

          <div className="all-state-controls">
            <label><span>Find a state or UT</span><input value={allStateQuery} onChange={(event) => setAllStateQuery(event.target.value)} placeholder="Search all 36" /></label>
            <label><span>Order rows by</span><select value={allStateSort} onChange={(event) => setAllStateSort(event.target.value as AllStateSort)}>
              <option value="name">State / UT name</option>
              <option value="rape">Rape cases registered · 2023</option>
              <option value="violent-rate">Violent-crime rate · 2022</option>
              <option value="accidents">Road accidents · 2023</option>
              <option value="deaths">Road deaths · 2023</option>
              <option value="daily">Derived accidents/day · 2023</option>
            </select></label>
            <p><b>{visibleStateRows.length}</b> rows visible</p>
          </div>

          {allStateLoading && !allStateEvidence ? (
            <div className="all-state-status" role="status">Loading the 36-jurisdiction official-source matrix…</div>
          ) : allStateError ? (
            <div className="all-state-status error" role="alert">{allStateError}. No stale values are being substituted.</div>
          ) : allStateEvidence && (
            <>
              <div className="all-state-table-wrap">
                <table className="all-state-table">
                  <caption>State and union territory crime and road-safety evidence. Years and units are stated in every column.</caption>
                  <thead><tr>
                    <th scope="col">State / union territory</th>
                    <th scope="col">Rape cases<br /><small>registered · 2023</small></th>
                    <th scope="col">Violent crime<br /><small>rate/lakh · 2022</small></th>
                    <th scope="col">IPC crimes<br /><small>registered · 2019</small></th>
                    <th scope="col">Road accidents<br /><small>reported · 2023</small></th>
                    <th scope="col">Accidents/day<br /><small>derived · 2023</small></th>
                    <th scope="col">Road deaths<br /><small>reported · 2023</small></th>
                  </tr></thead>
                  <tbody>{visibleStateRows.map((row) => (
                    <tr key={row.jurisdiction} className={jurisdiction === row.jurisdiction ? "selected" : ""}>
                      <th scope="row"><button onClick={() => setJurisdiction(row.jurisdiction)}><strong>{row.jurisdiction}</strong><small>{row.type} · open report →</small></button></th>
                      <td>{evidenceNumber(row.rapeRegistered2023)}</td>
                      <td>{evidenceNumber(row.violentRatePerLakh2022, 1)}</td>
                      <td>{evidenceNumber(row.ipcRegistered2019)}</td>
                      <td>{evidenceNumber(row.roadAccidents2023)}</td>
                      <td>{evidenceNumber(row.derivedAccidentsPerDay2023, 1)}</td>
                      <td>{evidenceNumber(row.roadDeaths2023)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="all-state-sources">
                <div>{allStateEvidence.limitations.map((limitation) => <p key={limitation}>{limitation}</p>)}</div>
                <div><span>Primary public data</span><ExternalLink href={allStateEvidence.sources.rape}>NCRB rape 2023</ExternalLink><ExternalLink href={allStateEvidence.sources.violent}>NCRB violent crime 2022</ExternalLink><ExternalLink href={allStateEvidence.sources.ipc}>NCRB IPC 2019</ExternalLink><ExternalLink href={allStateEvidence.sources.accidents}>ADSI roads 2023</ExternalLink></div>
              </div>
            </>
          )}
        </section>

        <div className="state-evidence-console" aria-live="polite">
          <div className="state-evidence-head">
            <div><p className="eyebrow">Selected jurisdiction evidence</p><h3>{jurisdiction}</h3></div>
            <div><span>Live feeds</span><strong>Weather + CPCB</strong><span>Official annual series</span><strong>NCRB / ADSI</strong></div>
          </div>

          {evidenceLoading && !annualEvidence ? (
            <div className="evidence-console-state" role="status">Loading the selected jurisdiction’s official annual records…</div>
          ) : evidenceError ? (
            <div className="evidence-console-state error" role="alert">{evidenceError} No previous value is being presented as current.</div>
          ) : annualEvidence && (
            <>
              <div className="annual-metric-grid">
                <article><span>Rape cases registered</span><strong>{evidenceNumber(annualEvidence.crime.rapeRegistered)}</strong><small>NCRB · {annualEvidence.crime.rapeYear} · cases, not prevalence</small><ExternalLink href={annualEvidence.sources.rape}>Source</ExternalLink></article>
                <article><span>Violent crimes registered</span><strong>{evidenceNumber(annualEvidence.crime.violentRegistered)}</strong><small>NCRB · {annualEvidence.crime.violentYear} · rate {evidenceNumber(annualEvidence.crime.violentRatePerLakh, 1)} per lakh</small><ExternalLink href={annualEvidence.sources.violent}>Source</ExternalLink></article>
                <article><span>IPC cognizable crimes</span><strong>{evidenceNumber(annualEvidence.crime.ipcRegistered)}</strong><small>NCRB · {annualEvidence.crime.ipcYear} · older comparable API series</small><ExternalLink href={annualEvidence.sources.ipc}>Source</ExternalLink></article>
                <article><span>Road accidents reported</span><strong>{evidenceNumber(annualEvidence.roadSafety.accidentsReported)}</strong><small>ADSI · {annualEvidence.roadSafety.year} · annual police-reported cases</small><ExternalLink href={annualEvidence.sources.accidents}>Source</ExternalLink></article>
                <article><span>Derived accidents / day</span><strong>{evidenceNumber(annualEvidence.roadSafety.derivedDailyAverage, 1)}</strong><small>{annualEvidence.roadSafety.year} annual total ÷ 365 · not a live daily feed</small><ExternalLink href={annualEvidence.sources.accidents}>Method</ExternalLink></article>
                <article><span>Road deaths reported</span><strong>{evidenceNumber(annualEvidence.roadSafety.deaths)}</strong><small>ADSI · {annualEvidence.roadSafety.year} · road accidents only</small><ExternalLink href={annualEvidence.sources.accidents}>Source</ExternalLink></article>
              </div>
              <div className="crime-caveats">{annualEvidence.caveats.map((caveat) => <p key={caveat}>{caveat}</p>)}</div>
            </>
          )}

          <div className="topic-evidence-grid">
            {evidenceTopics.map((topic) => (
              <article key={topic.title}>
                <div><span>{topic.status}</span><h4>{topic.title}</h4></div>
                <p>{topic.detail}</p>
                <ExternalLink href={topic.href}>Official source / method</ExternalLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section modules-section" id="modules">
        <div className="section-heading">
          <div><p className="eyebrow">Evidence rooms</p><h2>One public record, eight rigorous lenses.</h2></div>
          <label className="module-search"><span>Filter modules</span><input value={moduleQuery} onChange={(event) => setModuleQuery(event.target.value)} placeholder="Try “budget” or “audit”" /></label>
        </div>
        <div className="module-grid">
          {filteredModules.map((module) => (
            <article className="module-card" key={module.number}>
              <div className="module-number">{module.number}</div>
              <span className={`module-state ${module.tone}`}>{module.status}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="tag-row">{module.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {module.number === "08" ? <button onClick={() => setReportOpen(true)}>Open prototype workflow <span>→</span></button> : <a href={module.number === "01" ? "#evidence" : module.number === "02" ? "#timeline" : "#methodology"}>See evidence rules <span>→</span></a>}
            </article>
          ))}
        </div>
        {filteredModules.length === 0 && <p className="empty-result">No evidence room matches “{moduleQuery}”. Try a source type or topic.</p>}
      </section>

      <section className="section context-section">
        <div className="section-heading compact">
          <div><p className="eyebrow">Civic context</p><h2>From evidence to the right public doorway.</h2></div>
          <span className="demo-label">Links open official portals · no account connection</span>
        </div>
        <div className="context-grid">
          {contextLinks.map((item, index) => (
            <ExternalLink href={item.href} key={item.label} className="context-link">
              <span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.label}</strong><small>{item.detail}</small></div>
            </ExternalLink>
          ))}
        </div>
      </section>

      <section className="section methodology-section" id="methodology">
        <div className="method-card">
          <div className="method-intro">
            <p className="eyebrow">Methodology first</p>
            <h2>Proof is a chain, not a badge.</h2>
            <p>Each record must keep the original claim, source type, jurisdiction, target, evidence date, observed value, status rationale and limitations together.</p>
            <ExternalLink href="https://data.gov.in/" className="primary-button light">Browse India’s open-data portal</ExternalLink>
          </div>
          <ol className="method-steps">
            <li><span>01</span><div><strong>Capture the exact claim</strong><p>Quote or faithfully paraphrase an official manifesto, policy, budget speech, order or scheme guideline.</p></div></li>
            <li><span>02</span><div><strong>Separate input, output and outcome</strong><p>Money allocated, money spent, assets created and lived outcomes are different facts.</p></div></li>
            <li><span>03</span><div><strong>Reconcile time and definition</strong><p>Compare like periods and definitions. Preserve BE, RE and actuals as separate values.</p></div></li>
            <li><span>04</span><div><strong>Publish uncertainty</strong><p>Use disputed or insufficient evidence when sources conflict or the chain cannot be completed.</p></div></li>
          </ol>
          <div className="status-key">
            <p>Allowed promise statuses</p>
            <div><span className="status-badge delivered">Delivered</span><span className="status-badge partial">Partial</span><span className="status-badge ongoing">Ongoing</span><span className="status-badge delayed">Delayed</span><span className="status-badge disputed">Disputed</span><span className="status-badge unknown">Insufficient evidence</span></div>
          </div>
        </div>
      </section>

      <section className="road-cta" id="road-report">
        <div><p className="eyebrow">Citizen road evidence</p><h2>A photo is a report—not proof by itself.</h2><p>The proposed workflow strips precise public location, warns against faces and number plates, rate-limits submissions, and separates “received”, “screened”, “authority routed”, “verified” and “resolved”.</p></div>
        <button className="primary-button" onClick={() => setReportOpen(true)}>Preview a safe report <span>→</span></button>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true"><b /><b /><b /></span><span>India Evidence <em>Dashboard</em></span></div>
        <p>Independent prototype for verifiable public information. No party affiliation or official endorsement. The CPCB connector requires a server-side data.gov.in key.</p>
        <div><a href="#methodology">Methodology</a><a href="#jurisdictions">Data gaps</a><a href="#top">Back to top ↑</a></div>
      </footer>

      {reportOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setReportOpen(false); }}>
          <section className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title">
            <button className="modal-close" onClick={() => setReportOpen(false)} aria-label="Close report workflow">×</button>
            <p className="eyebrow">Prototype workflow · nothing is uploaded</p>
            <h2 id="report-title">Report a road condition</h2>
            <p className="modal-intro">This demonstrates safe intake only. Submitting the form stores no fields, photos or location.</p>
            <form onSubmit={submitPrototypeReport}>
              <label>State or union territory<select required defaultValue=""><option value="" disabled>Select jurisdiction</option>{[...states, ...unionTerritories].map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>Road or area description<input required placeholder="Landmark or road name—no home address" /></label>
              <div className="form-pair"><label>Issue type<select><option>Pothole</option><option>Broken surface</option><option>Flooded road</option><option>Missing barrier</option><option>Other safety issue</option></select></label><label>Authority (if known)<input placeholder="Municipality / PWD / NHAI" /></label></div>
              <label className="upload-demo">Photo attachment <span>Disabled in prototype</span><input type="file" accept="image/*" disabled /></label>
              <div className="privacy-box"><strong>Before a real upload</strong><ul><li>Blur faces and number plates.</li><li>Do not photograph while driving or enter traffic.</li><li>Precise coordinates must never be public by default.</li><li>Duplicate, abusive and automated reports require screening.</li></ul></div>
              <label className="check-row"><input type="checkbox" required /> I understand this prototype does not save or send my report.</label>
              <button className="primary-button" type="submit">Test privacy-safe submission</button>
              {reportStatus && <p className="success-message" role="status">{reportStatus}</p>}
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
