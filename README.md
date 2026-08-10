# India Evidence Dashboard

India Evidence Dashboard is an independent, politically neutral civic-data prototype for showing what changed over time and what public evidence can support across all 28 Indian states and 8 union territories.

This repository is a public-safe website foundation. Version 0.7 opens with the India civic-evidence landing screen, places a state-aware economic evidence screen directly below it, includes a full topic/subtopic menu, and provides credential-ready data.gov.in evidence routes. It is **not** a complete historical database, a public authority, an emergency-warning service, or a system for rating political parties or governments.

## What the prototype includes

- all 36 jurisdictions in the navigation and data model;
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

## Economic evidence in v0.7

The first screen is the civic-evidence landing view; the economic section follows immediately below. India’s view reports FY 2025–26 provisional nominal GDP and GDP per capita from MoSPI. When a state or union territory is selected, both blue total-output and per-person cards change to that jurisdiction. The total card uses **Net State Domestic Product at current prices** from the Economic Survey table; the per-person card uses **per-capita NSDP at current prices** from RBI Table 9. Neither is a live income counter or household income. Coverage is 33 published values and three explicit gaps for Dadra & Nagar Haveli and Daman & Diu, Ladakh, and Lakshadweep. Source years differ, so the order is exploratory rather than a strict same-year ranking.

The displayed 2.23× comparison divides the Union Government’s budgeted 2025–26 total liabilities of ₹196.78 lakh crore by ₹88.28 lakh crore of reported assets defined in the Receipt Budget as cumulative capital outlay plus loans advanced. It is a transparent Central Government accounting comparison—not a market valuation of all public land, enterprises, infrastructure, natural resources or household assets, and therefore not a national debt-to-wealth ratio.

The wealth-share panel uses World Inequality Lab’s 2022–23 research estimate: bottom 50% 6.4%, middle 40% 28.6%, and top 10% 65.0%; the top 1% share of 40.1% is included within the top 10%. The interface identifies this as non-government research and links to its methods. UDISE+, SRS, RBI and health-infrastructure publications remain periodic evidence and are never labelled live.

## Running data in v0.7

`/api/live/weather` retrieves current conditions from [Open-Meteo](https://open-meteo.com/en/docs) for the reference coordinates associated with the selected jurisdiction. The browser refreshes the panel when the jurisdiction changes and every ten minutes while it remains open. Responses identify the observation time and retrieval time; failures produce an unavailable state instead of displaying a cached number as live.

Open-Meteo combines public weather-model output from multiple national providers. This feed is useful for proving the live-data plumbing and user experience, but it is not official Government of India evidence and must not be used as an emergency-warning service. Attribution is required under CC BY 4.0. Review Open-Meteo's commercial terms before a public commercial launch.

`/api/live/air-quality` queries the CPCB resource published through data.gov.in, filters it to the selected source jurisdiction and shows the station nearest to the jurisdiction's reference coordinate. The interface displays the source's minimum, maximum and average fields by pollutant; these are station records, not statewide averages or a performance rating. The production key stays in `DATA_GOV_IN_API_KEY` on the server and is never sent to browser code.

The IMD connector remains unavailable. The public registration portal requires an eligible government email address, so the prototype does not claim direct IMD API access. Weather warnings must remain disconnected unless legitimate access is later approved.

## Annual state evidence in v0.7

`/api/evidence/state` retrieves the selected jurisdiction’s official annual series, and `/api/evidence/all-states` returns one normalized row for every current state and union territory. Selecting Maharashtra, for example, changes the overview itself to Maharashtra evidence; Union-level cards appear only in the India national view. The all-state table remains separate so the public can inspect all 36 jurisdictions without changing the selected report.

Both panels distinguish reporting year from retrieval time. Registered crime is not the same as underlying prevalence, and NCRB cautions against comparing States/UTs purely on crime counts. Sorting is an exploration control, not a performance or safety ranking. The displayed accidents-per-day value is the 2023 annual total divided by 365; it is not a live incident counter. Ladakh’s separate 2019 IPC field remains a visible data gap because that series predates the current reporting split.

The dashboard does not invent a “foetus killing rate.” It maps that request to separately defined evidence: sex ratio at birth, registered PCPNDT enforcement cases where available, and official vital-statistics limitations. Hospital-bed and ambulance cards are also not marked live because there is no verified national real-time availability feed connected to this prototype.

Never place either credential in browser code. Add them as server-side environment variables after access is approved.

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
