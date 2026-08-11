import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  return readFile(new URL("../.next/server/app/editorial.html", import.meta.url), "utf8");
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
  assert.match(html, /Data gap|data gap/);
  assert.match(html, /Download CSV/);
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

test("pre-renders a safe read-only editorial evidence console", async () => {
  const html = await renderEditorial();
  assert.match(html, /Evidence needs/);
  assert.match(html, /Persistent provider not connected/);
  assert.match(html, /No authentication configured/);
  assert.match(html, /Seed migration queue/);
  assert.match(html, /Second-person approval/);
  assert.match(html, /Haladgaon fee plaza/);
  assert.doesNotMatch(html, /Save changes|Publish now|Delete record/i);
});

test("database migration preserves evidence, source, review and revision entities", async () => {
  const sql = await readFile(new URL("../drizzle/0000_silent_sheva_callister.sql", import.meta.url), "utf8");
  for (const table of ["jurisdictions", "sources", "evidence_records", "observations", "promises", "revisions", "reviews", "corrections"]) {
    assert.ok(sql.includes(`CREATE TABLE \`${table}\``), `migration must create ${table}`);
  }
  assert.match(sql, /record_revision_unique/);
  assert.match(sql, /source_url_unique/);
});
