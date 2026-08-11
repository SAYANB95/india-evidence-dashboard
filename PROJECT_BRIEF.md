# Project Brief — India Evidence Dashboard

## Product goal

Build a public, politically neutral, source-linked dashboard that covers every Indian state and union territory and answers two questions: **what changed over time, and what can be proved?** The product must make uncertainty and missing data visible instead of manufacturing completeness.

## Audience

- residents seeking understandable public-service evidence;
- journalists, researchers and civic groups tracing a claim to a source;
- officials and representatives who need a fair, inspectable record;
- citizens who want the correct grievance, RTI or authority route.

## Current release boundary

Version 1.0 is an attractive responsive website foundation. Its first screen is the India civic-evidence statement, followed immediately by source-linked national GDP and state/UT output, per-capita NSDP coverage, a defined Central Government liabilities-to-reported-assets comparison, and clearly labelled research estimates of wealth distribution. An `All data` menu routes to four topic groups and their subtopics. It also contains verified national snapshots, one official CPCB station feed connected through data.gov.in, an all-36-jurisdiction official annual NCRB/ADSI matrix through data.gov.in, one working non-government public weather-model feed, a transport evidence room, and a manually verified toll-plaza/project seed registry. It has no database, authentication, upload storage or moderation backend. It must not be described as a complete tracker.

The economic screen uses MoSPI provisional FY 2025–26 national accounts, the Economic Survey state NSDP table for total jurisdiction output, and RBI Handbook Table 9 for per-capita NSDP at current prices. Selecting a state/UT must update both total and per-capita cards; India values must never remain visible as if they belong to the selected state. Both all-jurisdiction series have 33 published values and three explicit gaps; mixed source years must remain visible and must not be presented as a strict same-year ranking. NSDP is not GSDP or household income. The 2.23× liabilities/assets figure compares ₹196.78 lakh crore of budgeted Central Government liabilities with ₹88.28 lakh crore of reported assets defined as cumulative capital outlay plus loans advanced. It is not a valuation of India’s total national or household wealth. Wealth-group shares are World Inequality Lab research estimates for 2022–23, not an official Government of India series; the top 1% is a subset of the top 10% and must not be added to it.

The current-conditions panel uses Open-Meteo at a named state/UT reference coordinate. Its purpose is to validate the live-data product pattern: explicit source, observation time, retrieval time, refresh policy, location definition, failure state and limitation. It is not an emergency-warning service or evidence of government performance.

The air-quality panel uses the CPCB resource `3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69` through data.gov.in. It displays the nearest reporting station returned for the jurisdiction reference point and preserves the source's pollutant-level minimum, maximum and average fields. It must never be described as a statewide average. The production key is server-side only. Direct IMD API access is unavailable because its registration requires an eligible government email account; do not bypass or misrepresent that restriction.

The evidence layer adds annual registered rape cases (2023), violent crime (2022), IPC cognizable crime (2019), and road accidents/deaths (2023) for all 28 states and 8 union territories in one visible table. The selected-jurisdiction overview must follow the shared dropdown: a state selection shows that state’s evidence, while Union-level seed cards appear only in the India national view. Reporting-year labels and NCRB comparison warnings are mandatory. Table sorting is exploration, not a performance ranking. A derived daily accident average must always be labelled annual total divided by 365, never live daily reporting. Requests for a “foetus killing rate” must be translated into defined sources such as sex ratio at birth and PCPNDT enforcement records; no invented rate is permitted. Real-time hospital-bed or ambulance availability must remain unavailable until a verified operational feed exists.

The approved visual direction is distinctly Indian but politically neutral: Anek Latin/Anek Devanagari display typography, Manrope interface typography, saffron–ivory–green spatial fields and Ashoka-blue navigation/data surfaces. Avoid party symbols, flag imitation, generic AI gradients and ornamental illustration that does not carry information.

## Core modules

1. **Promises tracker:** official commitment/source, target, deadline, jurisdiction, status, dated evidence, rationale and limitations.
2. **National and state timelines:** 1947 onward where records exist; explicit decade-level gaps elsewhere.
3. **Government schemes:** eligibility, allocation, actual spend, beneficiaries, coverage and performance/audit evidence.
4. **Budgets:** Union/state BE, RE and actuals; sector and per-capita comparisons only with compatible definitions.
5. **Health structure:** facility tier, beds, workforce, access and reporting-year metadata.
6. **Environment:** forest/tree cover, air pollution, water and other pollution where comparable records exist.
7. **Crisis record:** event, consequence, relief/support, authority response, evidence date and source confidence for wars, assassinations and disasters.
8. **Road condition reports:** citizen photo and location intake with verification state, authority routing, privacy controls and anti-spam protections.
9. **Economic evidence:** national GDP, GDP per capita, state/UT per-capita NSDP, public debt/accounting context, inflation and wealth-distribution estimates with definition, period, source and comparability warnings.

Supporting context includes representatives/constituencies, grievances, RTI, education, jobs, transport, water, crime/safety, digital access, data-gap disclosure and methodology.

## Evidence model

Minimum fields for a factual record:

- stable record ID;
- jurisdiction and geographic level;
- topic and measure;
- exact claim or definition;
- source title, publisher, URL, publication date and source type;
- observation period and evidence-retrieval date;
- value, unit, denominator and whether provisional;
- comparison basis where relevant;
- limitation and editorial note;
- correction/supersession history.

Minimum additional fields for a promise record:

- commitment text and issuing body;
- announcement/source date;
- target, baseline and deadline;
- status from the allowed controlled vocabulary;
- status rationale and evidence cutoff.

## Methodology rules

- Primary public sources are preferred. Secondary sources may point to evidence but should not substitute for an available primary document.
- A government statement can prove that a government reported a figure; it does not automatically prove the underlying outcome. Audit or independent statistical evidence should be paired where available.
- Budget allocation, release, utilization, asset creation, service delivery and outcome are separate stages.
- Denominators, boundaries, inflation treatment, revision status and reporting periods must be captured before comparison.
- Conflicting credible sources produce `disputed`, not a silently chosen winner.
- Missing or non-comparable data produces `insufficient evidence` or a data-gap card.
- Never infer individual misconduct or make defamatory assertions from an unverified report.
- Never reduce multi-dimensional public performance to one partisan or composite score.

## Citizen-report safety requirements

The production road workflow must:

- warn users not to photograph while driving or enter traffic;
- detect/blur faces and vehicle plates before public display;
- keep precise coordinates private by default and publish only a safe approximation;
- strip unnecessary EXIF data;
- rate-limit by device/account/network signals without exposing those signals publicly;
- detect duplicates and coordinated spam;
- separate `received`, `screened`, `authority routed`, `verified`, `resolved` and `rejected` states;
- allow correction/removal requests;
- log moderator actions and evidence changes;
- clearly distinguish citizen observation from authority acknowledgement and independent verification.

## Implemented foundation through v0.8

- 36 stable jurisdiction records with human-readable URLs and state/UT identity.
- A normalized evidence catalog that keeps status, period, definition, limitation and source together.
- Dedicated state pages using the existing verified NSDP series and official data.gov.in annual crime/road connector.
- Search/filter directory, compatible-metric comparison and downloadable CSV evidence manifests.
- Source-mapped periodic records for budget, inflation, education, vital statistics, health, environment, schemes and promises; missing values remain visible gaps.
- Production build, lint, rendered HTML checks and browser verification across state selection, directory search and comparison.

## Transport foundation through v0.9

- National road evidence separates construction, capital expenditure, maintenance, NHAI debt, toll-plaza coverage and electronic collection.
- Toll accountability uses a proof chain covering notification, concession, completion, length, collection/remittance, maintenance, complaints and authoritative findings.
- Rail evidence separates network size, passenger journeys, freight, track renewal and consequential accidents.
- Aviation evidence separates passenger traffic, airports, awarded/operating routes and viability funding.
- A bounded CAG ledger records specific road/toll, Bharatmala, railway-track, UDAN and airport-PPP audits without generalising findings beyond the audited scope.
- Missing state roads, bridges, buses, metros, ports, freight/logistics, safety, land/environment, contract and passenger-experience layers are visible implementation records.

## Toll and project registry in v1.0

- Eight NHTIS toll-plaza records are linked to their official pages and preserve rate, length, cost, revenue, concession and traffic gaps without inference.
- The interface states that eight records are only 0.8% of MoRTH's reported 1,051 ETC fee plazas as of 31 December 2024; the sample is not presented as representative.
- Eight road, rail and aviation project/programme records keep milestones, outputs, costs and completion definitions separate.
- Search, jurisdiction, model/mode filters, expandable provenance and downloadable CSVs are implemented.
- No plaza is labelled a scam and no ranking is generated. Fraud or excess-charge claims require a bounded CAG, court or competent-authority finding.

## Seed sources through v0.8

- Government of India, Budget at a Glance 2025–26.
- Forest Survey of India / MoEFCC, India State of Forest Report 2023 release.
- Ministry of Rural Development, parliamentary reply on PMAY-G progress, 11 March 2025.
- Ministry of Statistics and Programme Implementation, Provisional Estimates of Annual GDP for FY 2025–26.
- Reserve Bank of India, Handbook of Statistics on Indian States, Table 9: Per Capita Net State Domestic Product.
- Government of India, Economic Survey 2023–24 Statistical Appendix, Table 1.10A: Net State Domestic Product at Current Prices.
- Government of India, Receipt Budget 2025–26, Statement of Assets and liabilities total.
- World Inequality Lab Working Paper 2024/09, used only as a clearly identified non-government research estimate.

No other interface card should display an apparently complete numeric result until its source record is added and reviewed.

## Remaining production steps

1. Convert the normalized application model into persistent SQL tables for sources, measures, promises, observations and revision history.
2. Establish an editorial source archive and two-person review for status changes.
3. Ingest and review state tables topic by topic, beginning with same-year education, health, CPI and audited public-finance series.
4. Add state budget and audit-source mapping without promising real-time refresh.
5. Build the secure citizen-report backend only after privacy, moderation and authority-routing decisions are approved.
6. Add automated accessibility, broken-link and source-freshness checks.
7. Revisit official weather warnings only if legitimate IMD access is approved; do not treat the government-email restriction as a technical problem to bypass.

## Release constraints

The website is published at [india-evidence-dashboard-public.vercel.app](https://india-evidence-dashboard-public.vercel.app/). Do not add private credentials, imply official endorsement, or enable real uploads without explicit approval. Keep all prototype and data-gap labels visible. CPCB and data.gov.in evidence routes use the server-only `DATA_GOV_IN_API_KEY`, stored as a Vercel Sensitive production variable and never exposed to browser code.
