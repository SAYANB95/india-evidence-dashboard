import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
}

async function renderState(slug) {
  return readFile(new URL(`../.next/server/app/state/${slug}.html`, import.meta.url), "utf8");
}

async function renderInfrastructure() {
  return readFile(new URL("../.next/server/app/infrastructure.html", import.meta.url), "utf8");
}

async function renderInfrastructureRegistry() {
  return readFile(new URL("../.next/server/app/infrastructure/registry.html", import.meta.url), "utf8");
}

async function renderEditorial() {
  return (await Promise.all([
    readFile(new URL("../app/editorial/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/editorial/editorial-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/editorial.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/toll-plazas.json", import.meta.url), "utf8"),
  ])).join("\n");
}

async function renderSchemes() {
  return readFile(new URL("../.next/server/app/schemes.html", import.meta.url), "utf8");
}

async function renderStaticPage(name) {
  return readFile(new URL(`../.next/server/app/${name}.html`, import.meta.url), "utf8");
}

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
}

test("server-renders the India Evidence Dashboard", async () => {
  const html = await render();
  assert.match(html, /<title>India Evidence Dashboard/);
  assert.match(html, /What can be proved/);
  assert.match(html, /All data/);
  assert.match(html, /GDP, state output/);
  assert.match(html, /36/);
  assert.match(html, /Promises tracker/);
  assert.match(html, /Running data demo/);
  assert.match(html, /Open-Meteo/);
  assert.match(html, /Government schemes/);
  assert.match(html, /Road condition reports/);
  assert.match(html, /Insufficient evidence/);
  assert.ok(html.indexOf("What changed") < html.indexOf("GDP, state output"), "landing hero must render before economic evidence");
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("pre-renders a source-labelled state evidence record", async () => {
  const html = await renderState("maharashtra");
  assert.match(html, /Maharashtra/);
  assert.match(html, /Output and income per person/);
  assert.match(html, /Per-capita state income/);
  assert.match(html, /What is loaded/);
  assert.match(html, /visible gaps/);
  assert.match(html, /Download CSV/);
  assert.match(html, /Complete coverage ledger/);
  assert.match(html, /Courts, pendency and legal services/);
  assert.match(html, /Schools, vital statistics, public beds and ambulances/);
  assert.match(html, /1,08,237/);
  assert.match(html, /Infant mortality rate/);
  assert.match(html, /Reported public-system beds/);
  assert.match(html, /45,291/);
  assert.match(html, /NHM operational ambulances/);
  assert.match(html, /4,225/);
  assert.match(html, /not live dispatch/i);
});

test("pre-renders a comparable all-state education and vital-statistics table",async()=>{
  const html=await renderStaticPage("state-packs");
  assert.match(html,/No hidden states/);
  assert.match(html,/36 jurisdictions/);
  assert.match(html,/UDISE\+ 2023-24/);
  assert.match(html,/SRS Bulletin 2023/);
  assert.match(html,/Public beds/);
  assert.match(html,/Health Dynamics of India 2022-23/);
  assert.match(html,/NHM operational ambulances/);
  assert.match(html,/NHM MIS/);
  assert.match(html,/Maharashtra/);
  assert.match(html,/Ladakh/);
  assert.match(html,/not a government, school-system or health-performance rank/i);
});

test("pre-renders the complete evidence catalogue and privacy correction pathway",async()=>{
  const [catalog,corrections]=await Promise.all([renderStaticPage("catalog"),renderStaticPage("corrections")]);
  assert.match(catalog,/Complete implementation ledger/);
  assert.match(catalog,/Debt, liabilities and guarantees/);
  assert.match(catalog,/Police strength, vacancies and prisons/);
  assert.match(catalog,/Everything belongs/);
  assert.match(corrections,/Public correction pathway/);
  assert.match(corrections,/stores no name, email, phone number, image or precise location/i);
  assert.match(corrections,/Submit correction request/);
});

test("pre-renders a document-first freedom movement and contested-history archive",async()=>{
  const [history,catalog]=await Promise.all([renderStaticPage("history"),renderStaticPage("catalog")]);
  assert.match(history,/History deserves/);
  assert.match(history,/Freedom fighters across India/);
  assert.match(history,/Subhas Chandra Bose and the INA/);
  assert.match(history,/Clemency petitions and colonial prison record/);
  assert.match(history,/Syama Prasad Mookerjee/);
  assert.match(history,/Verified starting points/);
  assert.match(history,/Contested interpretations/);
  assert.match(history,/We can document betrayal claims/);
  assert.match(history,/Digital District Repository/);
  assert.match(history,/National Archives of India/);
  assert.match(history,/People beyond/);
  assert.match(history,/the usual shortlist/);
  assert.match(history,/Bengal was the largest recorded group/);
  assert.match(history,/398 revolutionaries from undivided Bengal/);
  assert.match(history,/585(?:<!-- -->)? people/);
  assert.match(history,/not the number of freedom fighters from this jurisdiction/i);
  assert.match(history,/Open the parliamentary answer/);
  assert.match(history,/No single list contains everyone/);
  assert.match(history,/13,500 martyrs/);
  assert.match(history,/Jallianwala Bagh massacre/);
  assert.match(history,/Bhagat Singh/);
  assert.match(history,/Khudiram Bose/);
  assert.match(history,/Pritilata Waddedar/);
  assert.match(history,/Royal Indian Navy uprising/);
  assert.match(history,/Velu Nachiyar/);
  assert.match(history,/U Tirot Sing/);
  assert.match(history,/What the document proves/);
  assert.match(history,/What it does not/);
  assert.match(history,/Does not establish/);
  assert.match(catalog,/Freedom movement people, documents and disputes/);
});

test("pre-renders the Independence Day equity evidence edition",async()=>{
  const html=await renderStaticPage("independence-day");
  assert.match(html,/Happy 80th/);
  assert.match(html,/79 years completed/);
  assert.match(html,/4,48,211/);
  assert.match(html,/Girl-child POCSO/);
  assert.match(html,/57,789/);
  assert.match(html,/All-state official evidence/);
  assert.match(html,/POSH · new SHe-Box portal/);
  assert.match(html,/not the total handled by every employer Internal Committee/i);
  assert.match(html,/No complete current public aggregate/);
  assert.match(html,/Racism \/ ethnicity/);
  assert.match(html,/political interpretation, not a police crime classification/i);
});

test("pre-renders transport finance, service and audit evidence", async () => {
  const html = await renderInfrastructure();
  assert.match(html, /Built, financed, charged/);
  assert.match(html, /NHAI outstanding debt/);
  assert.match(html, /What a toll-plaza record must prove/);
  assert.match(html, /Consequential train accidents/);
  assert.match(html, /UDAN viability funding/);
  assert.match(html, /Findings, not slogans/);
  assert.match(html, /State roads &amp; bridges/);
  assert.match(html, /verified toll &amp; project registry/);
});

test("pre-renders the toll and project evidence registry", async () => {
  const html = await renderInfrastructureRegistry();
  assert.match(html, /Plazas and projects/);
  assert.match(html, /Verified plaza records/);
  assert.match(html, /Haladgaon/);
  assert.match(html, /official NHTIS record/i);
  assert.match(html, /not a complete national database/i);
});

test("registry seeds preserve provenance, unique IDs and explicit gaps", async () => {
  const tolls = await readJson("../data/toll-plazas.json");
  const projects = await readJson("../data/infrastructure-projects.json");
  assert.equal(tolls.length, 8);
  assert.equal(projects.length, 8);
  assert.equal(new Set(tolls.map((item) => item.id)).size, tolls.length);
  assert.equal(new Set(projects.map((item) => item.id)).size, projects.length);
  assert.ok(tolls.every((item) => item.sourceUrl.startsWith("https://") && item.feeEffective));
  assert.ok(projects.every((item) => item.sourceUrl.startsWith("https://") && item.sourcePeriod && item.progressDefinition));
  assert.ok(tolls.some((item) => item.cumulativeRevenueCrore === null), "unknown revenue must remain null");
  assert.ok(projects.some((item) => item.progressValue === null), "unknown progress must remain null");
  assert.ok(tolls.every((item) => item.carSingle === null || item.carSingle > 0));
});

test("keeps the public editorial evidence console read only", async () => {
  const html = await renderEditorial();
  assert.match(html, /Evidence needs/);
  assert.match(html, /Persistent storage and protected editorial sign-in are connected/);
  assert.match(html, /Clerk role-gated sign-in active/);
  assert.match(html, /Evidence migration queue/);
  assert.match(html, /Second-person approval/);
  assert.match(html, /Haladgaon/);
  assert.doesNotMatch(html, /Save changes|Publish now|Delete record/i);
});

test("protects editorial actions with roles, audit revisions and a second-person gate", async () => {
  const files = (await Promise.all([
    readFile(new URL("../proxy.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/editor-auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/editorial/reviews/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/editorial/manage/page.tsx", import.meta.url), "utf8"),
  ])).join("\n");
  assert.match(files, /clerkMiddleware/);
  assert.match(files, /redirect\("\/sign-in/);
  assert.match(files, /editor|reviewer|publisher/);
  assert.match(files, /different user/);
  assert.match(files, /inserted_review/);
  assert.match(files, /INSERT INTO \$\{revisions\}/);
  assert.doesNotMatch(files, /temporary password|auth bypass/i);
});

test("pre-renders the privacy-safe loans and schemes navigator", async () => {
  const html = await renderSchemes();
  assert.match(html, /Find the doorway/);
  assert.match(html, /MUDRA \/ PMMY/);
  assert.match(html, /West Bengal/);
  assert.match(html, /No Aadhaar/);
  assert.match(html, /not an eligibility decision/i);
  assert.match(html, /Legacy \/ successor pending/);
  assert.match(html, /no private middleman is authorized/i);
  assert.match(html, /State catalogues next/);
  assert.doesNotMatch(html, /guaranteed approval|instant sanction/i);
});

test("database migration preserves evidence, source, review and revision entities", async () => {
  const sql = await readFile(new URL("../drizzle/0000_silent_sheva_callister.sql", import.meta.url), "utf8");
  for (const table of ["jurisdictions", "sources", "evidence_records", "observations", "promises", "revisions", "reviews", "corrections"]) {
    assert.ok(sql.includes(`CREATE TABLE \`${table}\``), `migration must create ${table}`);
  }
  assert.match(sql, /record_revision_unique/);
  assert.match(sql, /source_url_unique/);
});

test("database migrations include schemes, jurisdiction coverage and application rules", async () => {
  const directory = new URL("../drizzle/", import.meta.url);
  const migrations = (await readdir(directory)).filter((name) => name.endsWith(".sql"));
  const sql = (await Promise.all(migrations.map((name) => readFile(new URL(name, directory), "utf8")))).join("\n");
  for (const table of ["schemes", "scheme_jurisdictions", "eligibility_rules", "application_channels"]) {
    assert.ok(sql.includes(`CREATE TABLE \`${table}\``), `migration must create ${table}`);
  }
  assert.match(sql, /scheme_jurisdiction_unique/);
});

test("Postgres migration creates the persistent evidence and freshness model", async () => {
  const sql = await readFile(new URL("../drizzle-pg/0000_small_rictor.sql", import.meta.url), "utf8");
  for (const table of ["jurisdictions", "sources", "evidence_records", "observations", "schemes", "scheme_jurisdictions", "eligibility_rules", "application_channels", "source_checks"]) {
    assert.ok(sql.includes(`CREATE TABLE "${table}"`), `Postgres migration must create ${table}`);
  }
  assert.match(sql, /record_revision_unique/);
  assert.match(sql, /source_url_unique/);
});

test("security migration creates an editorial request-rate ledger", async () => {
  const sql = await readFile(new URL("../drizzle-pg/0001_red_puppet_master.sql", import.meta.url), "utf8");
  assert.match(sql, /CREATE TABLE "editorial_action_attempts"/);
  assert.match(sql, /editorial_attempt_actor_time_idx/);
});

test("correction migration creates a persistent anonymous request-rate ledger",async()=>{
  const sql=await readFile(new URL("../drizzle-pg/0002_mean_shinobi_shaw.sql",import.meta.url),"utf8");
  assert.match(sql,/CREATE TABLE "public_action_attempts"/);
  assert.match(sql,/public_attempt_actor_time_idx/);
});
