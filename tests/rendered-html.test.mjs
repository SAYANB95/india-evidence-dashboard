import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
}

async function renderState(slug) {
  return readFile(new URL(`../.next/server/app/state/${slug}.html`, import.meta.url), "utf8");
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
