# India Evidence Dashboard

India Evidence Dashboard is an independent, politically neutral civic-data prototype for showing what changed over time and what public evidence can support across all 28 Indian states and 8 union territories.

This repository is a public-safe website foundation. Version 1.8 adds reviewed UDISE+ 2023-24 education and SRS 2023 vital-statistics packs for all 36 jurisdictions, an all-state comparison/export route, and a searchable, source-linked freedom-movement people and primary-document library. It also retains the production Postgres evidence store, protected editorial identities, role-checked review actions, immutable revision entries, second-person publication gate, complete 46-domain evidence catalogue, public operations transparency, and privacy-minimised correction requests. It is **not** a complete historical or scheme database, a lender, a public authority, an emergency-warning service, or a system for rating political parties or governments.

## What the prototype includes

- all 36 jurisdictions in the navigation and data model;
- a dedicated, shareable `/state/[jurisdiction]` page for every state and union territory;
- `/explore`, a searchable/filterable national evidence directory;
- `/compare`, a definition-preserving two-jurisdiction comparison without a composite score;
- `/catalog`, a searchable implementation ledger defining all 46 in-scope economy, finance, people, education, health, services, safety, justice, infrastructure, agriculture, environment, governance and historical evidence domains;
- `/history`, a document-first archive with initial dossiers on district freedom fighters, Subhas Chandra Bose and the INA, Savarkar's clemency petitions, and controversies concerning Syama Prasad Mookerjee;
- `/state-packs`, a searchable and sortable all-36 table of official UDISE+ school, enrolment and teacher counts plus SRS birth, death and infant-mortality estimates, with CSV export and source-period warnings;
- a searchable reviewed history seed containing 12 freedom-movement people from multiple regions and five primary-document doorways; this is a starting register, not a complete national list;
- the same 46-domain ledger on every state and UT page, so no jurisdiction silently loses a category when its numeric evidence is missing;
- `/operations`, a public-safe register of stored coverage, source health, running connectors, periodic releases and held production gates;
- `/corrections`, a stored public correction pathway that collects no name, email, phone, image or location and never changes published evidence automatically;
- downloadable CSV manifests containing period, status, definition, limitation and source;
- `/infrastructure`, separating highway construction, maintenance, NHAI debt, toll collection, railway network/traffic/safety, aviation coverage and bounded audit findings;
- `/infrastructure/registry`, an interactive verified seed register of eight NHTIS toll plazas and eight road, rail and aviation projects/programmes, with filters, expandable evidence and CSV exports;
- `/editorial`, a deliberately read-only, non-indexed public view of the evidence migration queue, normalized data model and publication gates;
- `/editorial/manage`, a Clerk-protected workspace for named editors, reviewers and publishers;
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

## Scope completion in v1.6

The product taxonomy is complete for the agreed civic-evidence scope: 46 domains are defined, grouped, source-mapped, assigned a refresh pattern and displayed uniformly for all 36 jurisdictions. Thirteen domains now have loaded or connected evidence; every other source doorway, editorial queue and explicit data gap remains visible. These coverage labels describe this dashboard, not the importance or performance of a state or government.

## Freedom movement and contested history in v1.7

`/history` begins a document-first historical layer. Its four seed dossiers separate verified starting points, contested interpretations, missing records and primary public doorways. A 25-part ingestion register covers regional and Adivasi resistance, 1857, revolutionary and mass movements, prison records, Quit India, Netaji and the INA, Partition, constitutional debates, political collaboration controversies, wars, assassinations and inquiries, Emergency, violence commissions, citizenship, declassified records and public-memory disputes. Charged words such as “betrayal” or “traitor” may appear only as dated, attributed claims—not as dashboard verdicts.

Category completion is not data fabrication. A domain can be fully represented in the product model while its observations remain unfilled until a compatible official release is ingested and reviewed. Future work is therefore data expansion, source maintenance and editorial operation—not discovery of another missing top-level category.

## All-state periodic evidence in v1.8

Every state and union-territory record now includes the same reviewed UDISE+ 2023-24 measures: schools, enrolments, teachers, pupil-teacher ratio, zero-enrolment schools and single-teacher schools. It also includes SRS 2023 birth and death rates and infant-mortality estimates; for smaller jurisdictions, the source's 2021-23 pooled IMR period remains visible. `/state-packs` compares and exports these 36 records. Sort order is exploratory, not a ranking, and administrative school counts do not measure learning quality.

`/history` now adds a searchable 12-person reviewed seed and five document records beneath the archive's methodology. Present-day state filters are discovery aids, not claims about historical borders or exclusive ownership. A complete district-level freedom-movement register remains future editorial work and is not implied by these seeds.

The correction API requires same-origin JSON, a bounded body, a server-only HMAC salt, persistent anonymous rate limits, an evidence-only attestation and an optional credential-free HTTPS source. It stores a random receipt and the correction text, not raw IP addresses or contact information.

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

## Persistent evidence foundation in v1.3

The Vercel project now has a managed Neon Postgres resource. The committed Postgres migration defines 13 tables for jurisdictions, sources, evidence records, observations, promises, revisions, reviews, corrections, schemes, jurisdiction coverage, eligibility rules, application channels and append-only source checks. The first production seed contains 37 jurisdiction rows, 20 distinct sources, 16 reviewed transport evidence records, eight national scheme records, 288 scheme-jurisdiction coverage rows and 24 published eligibility conditions.

`/api/system/status` reports only public coverage and source-health summaries without exposing provider names, credentials, authentication configuration or database connection details. A protected Vercel Cron endpoint checks every stored source daily, records response status and duration, and updates the source health state. Access-restricted or anti-bot responses remain distinct from confirmed unavailable pages. The cron route requires `CRON_SECRET`; it cannot be triggered anonymously. A failed link check changes link-health metadata—it does not delete evidence or silently change a public verdict.

The public editorial console remains intentionally read-only. Clerk protects the separate manager route and review API. Roles are stored in Clerk public metadata as `editor`, `reviewer` or `publisher`; every action is validated again on the server and written to both the review and revision audit tables. Publication approval is limited to publishers and requires approved source and definition reviews, including an approval from a different authenticated user. No temporary password, public write API or authentication bypass is included.

## Protected editorial workflow in v1.4

Clerk is connected through Vercel Marketplace environment variables. Session context is attached only to the protected manager and review API, while both resources enforce authorization again internally so public evidence requests do not depend on the identity provider. `/editorial/manage` redirects unauthenticated visitors to `/sign-in`; authenticated users without an approved metadata role see an access-pending screen and cannot submit actions. Editors and reviewers can record source and definition reviews. Publishers can perform those stages and may approve publication only after the two-person prerequisite is satisfied.

The claimed Marketplace resource currently supplies a Clerk **development instance**. The public dashboard may remain online, but named editorial users must not be onboarded until the Vercel production environment has been changed to Clerk production keys and the signed-in two-person workflow has been re-tested. No development key is committed to this repository.

To authorize a named account, set its Clerk `publicMetadata` to one of the following in the Clerk user dashboard: `{ "role": "editor" }`, `{ "role": "reviewer" }` or `{ "role": "publisher" }`. A publisher account alone is deliberately insufficient to publish its own unreviewed record.

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

`DATA_GOV_IN_API_KEY` is required for the official CPCB panel. The Open-Meteo demo works without a credential. Neon Postgres and Clerk are configured on Vercel; no public file-upload storage is connected.

## Security hardening in v1.5

The supplied five-prompt security checklist was applied to the current repository. Global responses now include CSP, HSTS, clickjacking, MIME-sniffing, referrer and permissions protections. Protected review writes require Clerk identity, a server-controlled role, same-origin JSON, a bounded body, a per-account request ledger and the existing second-person publication rule. Review, workflow update and revision creation execute as one atomic SQL statement. CSV downloads neutralize spreadsheet formulas and sanitize filenames. Scheduled source checks validate HTTPS and public DNS targets at every redirect to reduce SSRF risk. Unexpected review failures return a correlation ID without a stack trace or database detail.

This is hardening, not a claim that the system is unhackable. Clerk owns password/session storage and authentication rate controls; Neon owns managed database transport and access controls. The app stores Clerk user IDs in editorial audit rows but does not store reviewer passwords, phone numbers or payment data. Before adding public uploads, payments, citizen accounts or sensitive personal data, commission an independent human penetration test and privacy review.

## Production boundaries

The public read-only product, evidence store, source checks and correction queue are production-deployed. Named editorial onboarding remains held until production identity keys replace the current development instance and the two-user approval path is re-tested. The current road-report form still saves nothing; image moderation, duplicate detection, precise-location controls, retention, consent and authority routing are required before citizen uploads can be enabled.
