export type JurisdictionType = "State" | "Union territory";

export type Jurisdiction = {
  name: string;
  slug: string;
  type: JurisdictionType;
  capital: string;
};

const stateNames = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
] as const;

const territoryNames = [
  "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi (NCT)",
  "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
] as const;

const capitals: Record<string, string> = {
  "Andhra Pradesh": "Amaravati", "Arunachal Pradesh": "Itanagar", Assam: "Dispur", Bihar: "Patna",
  Chhattisgarh: "Raipur", Goa: "Panaji", Gujarat: "Gandhinagar", Haryana: "Chandigarh",
  "Himachal Pradesh": "Shimla", Jharkhand: "Ranchi", Karnataka: "Bengaluru", Kerala: "Thiruvananthapuram",
  "Madhya Pradesh": "Bhopal", Maharashtra: "Mumbai", Manipur: "Imphal", Meghalaya: "Shillong", Mizoram: "Aizawl",
  Nagaland: "Kohima", Odisha: "Bhubaneswar", Punjab: "Chandigarh", Rajasthan: "Jaipur", Sikkim: "Gangtok",
  "Tamil Nadu": "Chennai", Telangana: "Hyderabad", Tripura: "Agartala", "Uttar Pradesh": "Lucknow",
  Uttarakhand: "Dehradun", "West Bengal": "Kolkata", "Andaman & Nicobar Islands": "Port Blair",
  Chandigarh: "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu": "Daman", "Delhi (NCT)": "New Delhi",
  "Jammu & Kashmir": "Srinagar / Jammu", Ladakh: "Leh", Lakshadweep: "Kavaratti", Puducherry: "Puducherry",
};

export function slugifyJurisdiction(name: string) {
  return name.toLowerCase().replace(/&/g, "and").replace(/\(nct\)/g, "nct").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const jurisdictions: Jurisdiction[] = [
  ...stateNames.map((name) => ({ name, slug: slugifyJurisdiction(name), type: "State" as const, capital: capitals[name] })),
  ...territoryNames.map((name) => ({ name, slug: slugifyJurisdiction(name), type: "Union territory" as const, capital: capitals[name] })),
];

export function getJurisdiction(slug: string) {
  return jurisdictions.find((item) => item.slug === slug);
}

export type EconomicRecord = { perCapita?: { value: number; year: string }; output?: { valueCrore: number; year: string } };

const pc = (value: number, year = "2023-24") => ({ value, year });
const out = (valueCrore: number, year = "2023-24") => ({ valueCrore, year });

export const economy: Record<string, EconomicRecord> = {
  "Andhra Pradesh": { perCapita: pc(242479), output: out(1291518) }, "Arunachal Pradesh": { perCapita: pc(199992,"2022-23"), output: out(35555,"2022-23") },
  Assam: { perCapita: pc(135787), output: out(487584) }, Bihar: { perCapita: pc(60337), output: out(681761,"2022-23") },
  Chhattisgarh: { perCapita: pc(147361), output: out(447682) }, Goa: { perCapita: pc(492648,"2022-23"), output: out(83711,"2022-23") },
  Gujarat: { perCapita: pc(272451,"2022-23"), output: out(1946334,"2022-23") }, Haryana: { perCapita: pc(325759), output: out(985877) },
  "Himachal Pradesh": { perCapita: pc(235199), output: out(176164) }, Jharkhand: { perCapita: pc(105274), output: out(360689,"2022-23") },
  Karnataka: { perCapita: pc(332926), output: out(2261867) }, Kerala: { perCapita: pc(281001), output: out(933564,"2022-23") },
  "Madhya Pradesh": { perCapita: pc(142565), output: out(1242883) }, Maharashtra: { perCapita: pc(277603), output: out(2690525,"2021-22") },
  Manipur: { perCapita: pc(111853,"2022-23"), output: out(32874,"2021-22") }, Meghalaya: { perCapita: pc(136948), output: out(42214) },
  Mizoram: { perCapita: pc(215144,"2022-23"), output: out(24293,"2021-22") }, Nagaland: { perCapita: pc(145537,"2022-23"), output: out(31416,"2022-23") },
  Odisha: { perCapita: pc(163101), output: out(749809) }, Punjab: { perCapita: pc(196505), output: out(639252) },
  Rajasthan: { perCapita: pc(167964), output: out(1366626) }, Sikkim: { perCapita: pc(587743), output: out(35670,"2022-23") },
  "Tamil Nadu": { perCapita: pc(315220), output: out(2417237) }, Telangana: { perCapita: pc(356564), output: out(1326022) },
  Tripura: { perCapita: pc(177723), output: out(65808,"2022-23") }, "Uttar Pradesh": { perCapita: pc(93514), output: out(2217055) },
  Uttarakhand: { perCapita: pc(260201), output: out(304592) }, "West Bengal": { perCapita: pc(154119), output: out(1531371) },
  "Andaman & Nicobar Islands": { perCapita: pc(258151,"2022-23"), output: out(9209,"2021-22") },
  Chandigarh: { perCapita: pc(399654,"2022-23"), output: out(48261,"2022-23") },
  "Delhi (NCT)": { perCapita: pc(461910), output: out(997171) }, "Jammu & Kashmir": { perCapita: pc(142138), output: out(200046) },
  Puducherry: { perCapita: pc(262166), output: out(44809,"2022-23") },
  "Dadra & Nagar Haveli and Daman & Diu": {}, Ladakh: {}, Lakshadweep: {},
};

export type TopicRecord = {
  id: string;
  label: string;
  group: string;
  status: "available" | "periodic" | "source mapped" | "data gap";
  period: string;
  definition: string;
  limitation: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const topicRecords: TopicRecord[] = [
  { id:"budget", label:"Budget and audited expenditure", group:"Economy", status:"source mapped", period:"Annual financial cycle", definition:"Budget estimates, revised estimates and audited actuals are kept as separate fields.", limitation:"Comparable state tables are not yet ingested; no BE is presented as actual spending.", sourceLabel:"CAG State Accounts", sourceUrl:"https://cag.gov.in/en/state-accounts-report" },
  { id:"inflation", label:"Consumer price inflation", group:"Economy", status:"periodic", period:"Monthly publication", definition:"CPI is a price-index change for a defined rural, urban or combined basket.", limitation:"State series require matching base year, geography and basket; values are not live.", sourceLabel:"MoSPI CPI", sourceUrl:"https://www.mospi.gov.in/faq" },
  { id:"schools", label:"Schools, students and gender", group:"People", status:"periodic", period:"UDISE+ 2023–24", definition:"Recognised schools, enrolment and teachers reported through UDISE+.", limitation:"School-level files are not loaded here; a source doorway is not a live integration.", sourceLabel:"UDISE+ state table", sourceUrl:"https://www.data.gov.in/resource/stateuts-wise-details-distribution-schools-enrolments-and-teachers-school-category-during" },
  { id:"births", label:"Birth rate and sex ratio at birth", group:"People", status:"periodic", period:"Annual SRS/CRS releases", definition:"Births per 1,000 population and girls born per 1,000 boys, using the publication’s definition.", limitation:"There is no defensible 'foetus killing rate'; PCPNDT enforcement is a separate legal series.", sourceLabel:"Census SRS", sourceUrl:"https://censusindia.gov.in/census.website/en/node/294" },
  { id:"health", label:"Hospitals, beds and ambulances", group:"Services", status:"periodic", period:"Publication cycle", definition:"Sanctioned/in-position facilities, beds and vehicles are capacity measures.", limitation:"No verified nationwide real-time vacant-bed or active-ambulance feed is connected.", sourceLabel:"Health Dynamics of India", sourceUrl:"https://www.mohfw.gov.in/" },
  { id:"environment", label:"Forest and pollution evidence", group:"Environment", status:"periodic", period:"Source-specific cycles", definition:"Forest-cover assessments and station pollutant records remain separate evidence series.", limitation:"A monitoring station is not a statewide average; forest cover is not updated continuously.", sourceLabel:"Forest Survey of India", sourceUrl:"https://fsi.nic.in/forest-report-2023" },
  { id:"transport", label:"Roads, tolls, railways and aviation", group:"Infrastructure", status:"source mapped", period:"Mode and source-specific", definition:"Construction, maintenance, debt, user charges, traffic, safety, contracts and audits are separate measures.", limitation:"The national transport room does not yet contain complete state, corridor, plaza, station or airport records.", sourceLabel:"Transport evidence room", sourceUrl:"/infrastructure" },
  { id:"promises", label:"Promises and delivery evidence", group:"Accountability", status:"data gap", period:"Claim-specific", definition:"An official commitment is matched to target, deadline, dated outcome evidence and rationale.", limitation:"No state promise receives a verdict until both the commitment and outcome chain are loaded.", sourceLabel:"Methodology", sourceUrl:"/#methodology" },
  { id:"schemes", label:"Government schemes", group:"Services", status:"source mapped", period:"Scheme-specific", definition:"Eligibility, allocation, expenditure, beneficiaries, coverage and audit evidence are separate fields.", limitation:"Discovery portals do not prove delivery or current eligibility.", sourceLabel:"myScheme", sourceUrl:"https://www.myscheme.gov.in/" },
];

export const sources = {
  nsdp: { label: "RBI Handbook of Statistics on Indian States, Table 9", url: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22483" },
  output: { label: "Economic Survey 2023–24, Table 1.10A", url: "https://www.indiabudget.gov.in/budget2024-25/economicsurvey/doc/stat/tab110a.pdf" },
};
