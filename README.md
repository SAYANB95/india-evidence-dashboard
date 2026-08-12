# India Evidence Dashboard

India Evidence Dashboard is an independent, politically neutral civic-data prototype for showing what changed over time and what public evidence can support across all 28 Indian states and 8 union territories.

This repository is a public-safe website foundation. Version 1.2 adds a source-reviewed loans and schemes navigator, jurisdiction-aware discovery and a normalized scheme data model to the existing evidence platform. It is **not** a connected production database, a complete historical or scheme database, a lender, a public authority, an emergency-warning service, or a system for rating political parties or governments.

## What the prototype includes

- all 36 jurisdictions in the navigation and data model;
- a dedicated, shareable `/state/[jurisdiction]` page for every state and union territory;
- `/explore`, a searchable/filterable national evidence directory;
- `/compare`, a definition-preserving two-jurisdiction comparison without a composite score;
- downloadable CSV manifests containing period, status, definition, limitation and source;
- `/infrastructure`, separating highway construction, maintenance, NHAI debt, toll collection, railway network/traffic/safety, aviation coverage and bounded audit findings;
- `/infrastructure/registry`, an interactive verified seed register of eight NHTIS toll plazas and eight road, rail and aviation projects/programmes, with filters, expandable evidence and CSV exports;
- `/editorial`, a deliberately read-only, non-indexed preview of the evidence migration queue, normalized data model and publication gates;
- an `All data` directory with economy, people/services, safety/infrastructure and accountability subtopics;
- a selected-jurisdiction total-output card using the latest available official NSDP value for 33 jurisdictions, with three explicit gaps;
- an economy-first screen with MoSPI national GDP and GDP per capita, RBI per-capita NSDP for 33 of 36 current jurisdictions, a defined Central Government liabilities-to-reported-assets comparison, and a clearly labelled research estimate of wealth distribution;
- a live current-conditions demo for a named state/UT reference location, with observation time, retrieval time, source and limitations;
- official CPCB pollutant records from the nearest reporting station returned for the selected jurisdiction;
- interactive state/UT locator markers that synchronize the selected jurisdiction across panels;
- a searchable, sortable table displaying all 28 states and 8 union territories together for registered rape cases (2023), violent crime (2022), an older comparable IPC series (2019), and road accidents/deaths (2023);
- a selected-jurisdiction overview that replaces national seed cards with the chosen state/UT’s own official annual evidence;
- one public validation anchor per decade from 1947 onward, with an explicit warning that the register is not complete;
- source/status cards for budgets, promises, birth rate, sex ratio at birth, school gender ratio, government schools, inflation, per-capita NSDP, investment comparison, ambulances, and hospital beds;
- a national overview with three small, source-linked seed snapshots;
- a promise-to-proof method demonstration;
- a 1947-to-present timeline scaffold that displays data gaps;
- evidence rooms for promises, timelines, schemes, budgets, health, environment, crisis records and roads;
- official public doorways for representatives, grievances, RTI, education, jobs, transport, water, crime/safety and digital access;
- a non-persistent citizen road-report workflow demonstrating privacy and anti-spam requirements.

## Evidence rules

1. Prefer primary public material: official policies, budgets, scheme guidelines, dashboards, parliamentary answers, audit reports and statistical publications.
2. Keep claim, jurisdiction, target, evidence date, observed value, status rationale and limitation together.
3. Do not treat Budget Estimates, Revised Estimates and actual expenditure as interchangeable.
4. Separate inputs, outputs and outcomes.
5. Allowed promise statuses are: `delivered`, `partial`, `ongoing`, `delayed`, `disputed`, and `insufficient evidence`.
6. A missing record must remain a visible data gap. It must never be converted into a zero or a negative finding.
7. Do not publish a single composite “government work score”. Any comparison must name the metric, definition, period, source and limitation.
8. Public submissions are allegations or observations until screened and independently verified.

## Seed evidence and attribution

- Union Budget 2025–26 figures: Government of India, [Budget at a Glance 2025–26](https://www.indiabudget.gov.in/budget2025-26/doc/Budget_at_Glance/budget_at_a_glance.pdf).
- Forest and tree cover: Forest Survey of India / Ministry of Environment, Forest and Climate Change, [ISFR 2023 release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2086742), published 21 December 2024.
- PMAY-G original-tranche progress: Ministry of Rural Development, [Lok Sabha reply via PIB](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=2110310), published 11 March 2025.
- National GDP and GDP per capita: Ministry of Statistics and Programme Implementation, [Provisional Estimates for FY 2025–26](https://www.mospi.gov.in/uploads/latestreleasesfiles/1780656381622-Press%20Note%20on%20GDP%20Estimates%20for%20Q4%202025-26%20and%20PE%20FY%202025-26_F.pdf).
- State/UT per-capita NSDP: Reserve Bank of India, [Handbook of Statistics on Indian States, Table 9](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22483), values at current prices with the latest usable year shown per jurisdiction.
- State/UT total NSDP: Government of India, [Economic Survey 2023–24 statistical appendix, Table 1.10A](https://www.indiabudget.gov.in/budget2024-25/economicsurvey/doc/stat/tab110a.pdf), with the latest published value and year preserved for each jurisdiction.
- Central Government liabilities and reported assets: Government of India, [Receipt Budget 2025–26, Statement of Assets](https://www.indiabudget.gov.in/budget2025-26/doc/rec/annex92.pdf).
- Wealth distribution: World Inequality Lab, [Income and Wealth Inequality in India, 1922–2023](https://wid.world/wp-content/uploads/2024/03/WorldInequalityLab_WP2024_09_Income-and-Wealth-Inequality-in-India-1922-2023_Final.pdf), a non-government research estimate rather than an official statistic.
- India outline map artwork: [Ultimaps](https://ultimaps.com/vector-maps/asia/india/), used as a visual locator with attribution. It is not a measurement layer or a legal boundary statement.

Every figure in the interface states its source period and limitation. Links to live official dashboards are reference doorways only; the prototype does not claim to mirror or integrate them.

## Economic evidence in v0.8

The first screen is the civic-evidence landing view; the economic section follows immediately below. India’s view reports FY 2025–26 provisional nominal GDP and GDP per capita from MoSPI. When a state or union territory is selected, both blue total-output and per-person cards change to that jurisdiction. The total card uses **Net State Domestic Product at current prices** from the Economic Survey table; the per-person card uses **per-capita NSDP at current prices** from RBI Table 9. Neither is a live income counter or household income. Coverage is 33 published values and three explicit gaps for Dadra & Nagar Haveli and Daman & Diu, Ladakh, and Lakshadweep. Source years differ, so the order is exploratory rather than a strict same-year ranking.

The displayed 2.23× comparison divides the Union Government’s budgeted 2025–26 total liabilities of ₹196.78 lakh crore by ₹88.28 lakh crore of reported assets defined in the Receipt Budget as cumulative capital outlay plus loans advanced. It is a transparent Central Government accounting comparison—not a market valuation of all public land, enterprises, infrastructure, natural resources or household assets, and therefore not a national debt-to-wealth ratio.

The wealth-share panel uses World Inequality Lab’s 2022–23 research estimate: bottom 50% 6.4%, middle 40% 28.6%, and top 10% 65.0%; the top 1% share of 40.1% is included within the top 10%. The interface identifies this as non-government research and links to its methods. UDISE+, SRS, RBI and health-infrastructure publications remain periodic evidence and are never labelled live.

## Running data in v0.8

`/api/live/weather` retrieves current conditions from [Open-Meteo](https://open-meteo.com/en/docs) for the reference coordinates associated with the selected jurisdiction. The browser refreshes the panel when the jurisdiction changes and every ten minutes while it remains open. Responses identify the observation time and retrieval time; failures produce an unavailable state instead of displaying a cached number as live.

Open-Meteo combines public weather-model output from multiple national providers. This feed is useful for proving the live-data plumbing and user experience, but it is not official Government of India evidence and must not be used as an emergency-warning service. Attribution is required under CC BY 4.0. Review Open-Meteo's commercial terms before a public commercial launch.

`/api/live/air-quality` queries the CPCB resource published through data.gov.in, filters it to the selected source jurisdiction and shows the station nearest to the jurisdiction's reference coordinate. The interface displays the source's minimum, maximum and average fields by pollutant; these are station records, not statewide averages or a performance rating. The production key stays in `DATA_GOV_IN_API_KEY` on the server and is never sent to browser code.

The IMD connector remains unavailable. The public registration portal requires an eligible government email address, so the prototype does not claim direct IMD API access. Weather warnings must remain disconnected unless legitimate access is later approved.

## Annual state evidence in v0.8

`/api/evidence/state` retrieves the selected jurisdiction’s official annual series, and `/api/evidence/all-states` returns one normalized row for every current state and union territory. Selecting Maharashtra, for example, changes the overview itself to Maharashtra evidence; Union-level cards appear only in the India national view. The all-state table remains separate so the public can inspect all 36 jurisdictions without changing the selected report.

Both panels distinguish reporting year from retrieval time. Registered crime is not the same as underlying prevalence, and NCRB cautions against comparing States/UTs purely on crime counts. Sorting is an exploration control, not a performance or safety ranking. The displayed accidents-per-day value is the 2023 annual total divided by 365; it is not a live incident counter. Ladakh’s separate 2019 IPC field remains a visible data gap because that series predates the current reporting split.

The dashboard does not invent a “foetus killing rate.” It maps that request to separately defined evidence: sex ratio at birth, registered PCPNDT enforcement cases where available, and official vital-statistics limitations. Hospital-bed and ambulance cards are also not marked live because there is no verified national real-time availability feed connected to this prototype.

## Evidence platform routes in v0.8

Every current state and union territory has a statically generated public record, for example `/state/maharashtra`. The jurisdiction selector changes the entire record and URL. Each page combines the source-backed NSDP measures already in the project with the credential-backed annual crime and road-safety connector, then exposes consistent topic records for budgets, inflation, schools, vital statistics, health infrastructure, environment, schemes and promises.

`/explore` searches all 36 records and filters by jurisdiction type or evidence topic. `/compare` places only defined compatible metrics side by side and keeps differing years visible. `/api/evidence/export` produces a CSV evidence manifest; a blank value remains blank and is never silently converted to zero.

UDISE+, SRS, CPI and health-infrastructure records are explicitly periodic. Their source-mapped cards do not claim live integration, and state numeric values are not shown until an attributable official table can be ingested and checked. The current downloadable CSV is an evidence manifest, not a claim of complete data coverage.

## Transport evidence in v0.9

`/infrastructure` keeps infrastructure outputs and accountability evidence separate. Roads include annual construction, capital expenditure, an NHAI debt snapshot, maintenance expenditure, fee-plaza coverage and dated ETC collection. Railways include route kilometres, passengers, freight, track renewal and the narrowly defined consequential-accident series. Aviation includes scheduled domestic passengers and dated UDAN coverage/funding.

The audit ledger uses bounded CAG records. It does not call tolling itself a “scam” or generalise a sampled finding to all plazas. A future plaza-level record must connect the rate notification, concession agreement, completion status, applicable length, collection/remittance, maintenance duty, complaint resolution and authoritative audit/court outcome. State roads, buses, metro, ports, logistics, land/environment, contracts and public-experience measures remain explicit next-layer tables.

## Toll and project registry in v1.0

`/infrastructure/registry` is a manually verified seed explorer, not a bulk mirror of NHTIS. Its eight plaza records cover eight states and show the cited fee schedule, applicable length, capital cost, cumulative revenue, concession and traffic fields only when the official plaza page publishes them. The interface compares that sample with MoRTH's reported 1,051 NH fee plazas with ETC as of 31 December 2024, making the 0.8% coverage gap prominent.

The project register contains eight source-linked road, rail and aviation records. A commercial-operation date, inauguration, route award or technical milestone is not relabelled as complete delivery. Missing cost, deadline, contractor and current-service fields remain `Data gap`. CSV downloads preserve nulls as `Data gap` and the interface provides no toll, fraud, safety or government-performance ranking.

## Editorial data foundation in v1.1

The Drizzle/SQLite schema defines jurisdictions, sources, evidence records, observations, promises, revisions, reviews and corrections. The generated migration is committed so a compatible persistent provider can later be provisioned deliberately. Sources support archival URLs, checksums and link-health state; observations keep period, value, unit, denominator, provisional status and retrieval date; revisions have immutable per-record sequence numbers.

`/editorial` maps the 16 existing toll and infrastructure seed records into a reviewable migration queue. Its workflow labels are database-readiness checks—not publication approval or factual verdicts. The route has no write controls, is marked `noindex`, and clearly states that no persistent provider or authentication system is connected. `/api/editorial/export` downloads the migration manifest as CSV.

Connecting a database, authentication, source archive and write-capable editorial actions remains a separate production step. Do not make the console writable on the public route without role-based access, server-side validation, revision logging and a second-person publication gate.

Never place either credential in browser code. Add them as server-side environment variables after access is approved.

## Loans and schemes navigator in v1.2

`/schemes` provides a privacy-safe discovery flow across all 36 states and union territories. The first reviewed catalogue contains eight national credit or support routes: MUDRA/PMMY, PMEGP, Agriculture Infrastructure Fund, PM-Vidyalaxmi, DAY-NRLM credit linkage, CGTMSE, PMJDY overdraft and the legacy Stand-Up India record. Each card separates the published support structure, likely users, interest treatment, collateral or guarantee position, documents, access steps, official source and limitation.

Matching uses only broad selections in the browser. It collects no Aadhaar number, bank details, phone number or application data, and a possible match is never presented as eligibility, approval or sanction. Loans, subsidies, interest support, overdrafts and credit guarantees remain distinct. PMEGP retains the official warning against private middlemen, and CGTMSE is correctly described as lender-mediated guarantee support rather than a direct borrower loan.

The state selector means that the reviewed national routes are available for discovery from that jurisdiction; it does not claim that every state-government programme has been loaded. State corporation, department and local implementing-agency catalogues remain an explicit data gap, with the official [myScheme](https://www.myscheme.gov.in/) State/UT finder provided as the current public doorway. Stand-Up India is retained as a clearly labelled legacy record because its official page says that version ran through 31 March 2025 and a successor was under preparation; the dashboard provides no stale application button.

The schema now also defines `schemes`, `scheme_jurisdictions`, `eligibility_rules` and `application_channels`. `/api/schemes/export` provides the reviewed seed as CSV. PM SVANidhi and individual state programmes require a fresh official source and status review before inclusion; absence from this small catalogue does not mean absence of support.

## Visual system

The interface uses self-hosted font files so its typography does not depend on a third-party font request:

- **Anek Latin** for display headings and high-impact civic labels;
- **Anek Devanagari** for the `भारत` identity line and Devanagari support;
- **Manrope** for navigation, source metadata, tables and interface copy.

The palette uses saffron, warm ivory, India green and Ashoka blue as a civic identity system rather than party branding. The opening economic viewport uses a restrained tricolour field; data surfaces remain high-contrast and sober.

## Local development

Requires Node.js 22.13 or later.

```bash
npm install
cp .env.example .env.local
# Add your data.gov.in key to .env.local
npm run dev
```

No domain is required for local use. `npm run dev` opens the dashboard on this Mac at `http://localhost:3000`. To open it on another phone or computer connected to the same Wi-Fi, run `npm run dev:network` and use this Mac's local network address followed by port `3000`. The Mac must remain awake and the terminal process must keep running. This does not expose the site to the public internet.

The production build is published at [india-evidence-dashboard-public.vercel.app](https://india-evidence-dashboard-public.vercel.app/). The public project uses the standard Next.js adapter so the page and API routes are routed correctly. The data.gov.in connector is configured with `DATA_GOV_IN_API_KEY` as a Vercel Sensitive production variable; the credential is never committed or sent to browser code.

Validation:

```bash
npm run build
npm test
```

`DATA_GOV_IN_API_KEY` is required for the official CPCB panel. The Open-Meteo demo works without a credential. No database or upload storage is configured.

## Before production

Production work requires an editorial review workflow, source archival policy, structured jurisdiction records, automated link checks, secure storage, image moderation, duplicate detection, rate limiting, precise-location controls, consent text, correction requests and legal/privacy review. The current road-report form saves nothing.
