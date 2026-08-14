import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read=(path)=>readFile(new URL(path,import.meta.url),"utf8");

test("sets production browser security headers",async()=>{
  const config=await read("../next.config.ts");
  for(const header of ["Content-Security-Policy","Strict-Transport-Security","X-Content-Type-Options","X-Frame-Options","Referrer-Policy","Permissions-Policy"]) assert.match(config,new RegExp(header));
  assert.match(config,/frame-ancestors 'none'/);
  assert.match(config,/object-src 'none'/);
});

test("editorial writes resist bypass, cross-site, oversized and burst requests",async()=>{
  const route=await read("../app/api/editorial/reviews/route.ts");
  assert.match(route,/getEditorialActor/);
  assert.match(route,/origin!==new URL\(request\.url\)\.origin/);
  assert.match(route,/content-length/);
  assert.match(route,/editorialActionAttempts/);
  assert.match(route,/recentAttempts\.value>=20/);
  assert.match(route,/role cannot perform this review stage/);
  assert.match(route,/different user/);
  assert.match(route,/WITH next_revision AS MATERIALIZED/);
  assert.match(route,/correlationId/);
  assert.doesNotMatch(route,/error\.message|error\.stack/);
});

test("source checks block SSRF targets and validate every redirect",async()=>{
  const probe=await read("../lib/safe-source-probe.ts");
  assert.match(probe,/url\.protocol!=="https:"/);
  assert.match(probe,/Private source targets are blocked/);
  assert.match(probe,/lookup\(url\.hostname/);
  assert.match(probe,/redirect:"manual"/);
  assert.match(probe,/redirects<=5/);
});

test("CSV downloads neutralize formulas and sanitize filenames",async()=>{
  const csv=await read("../lib/csv.ts");
  const route=await read("../app/api/evidence/export/route.ts");
  assert.match(csv,/\^\[=\+\\-@\]/);
  assert.match(csv,/\[\^a-z0-9-\]/);
  assert.match(route,/safeDownloadSlug/);
});

test("example configuration contains placeholders only",async()=>{
  const example=await read("../.env.example");
  assert.match(example,/NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_replace/);
  assert.match(example,/CLERK_SECRET_KEY=sk_test_replace/);
  assert.doesNotMatch(example,/DATABASE_URL=postgres|CRON_SECRET=.{12,}|DATA_GOV_IN_API_KEY=.{8,}/);
});

test("public status omits provider and authentication internals",async()=>{
  const route=await read("../app/api/system/status/route.ts");
  assert.match(route,/coverage/);
  assert.match(route,/sourceHealth/);
  assert.doesNotMatch(route,/writesEnabled|Clerk connected|DATABASE_URL/);
});

test("public corrections are bounded, privacy-minimised and persistently rate limited",async()=>{
  const route=await read("../app/api/corrections/route.ts");
  assert.match(route,/origin!==new URL\(request\.url\)\.origin/);
  assert.match(route,/CORRECTION_HASH_SECRET/);
  assert.match(route,/createHmac\("sha256"/);
  assert.match(route,/recent\.value>=5/);
  assert.match(route,/requestText\.length<30/);
  assert.match(route,/supportingUrl/);
  assert.match(route,/publicActionAttempts/);
  assert.match(route,/WITH inserted_attempt AS/);
  assert.doesNotMatch(route,/requesterContactHash|email|phone/);
  assert.doesNotMatch(route,/error\.message|error\.stack/);
});

test("public visitor count is same-origin, bot-filtered and privacy-minimised",async()=>{
  const [route,migration]=await Promise.all([
    read("../app/api/visitors/route.ts"),
    read("../drizzle-pg/0003_bitter_dark_phoenix.sql"),
  ]);
  assert.match(route,/origin === new URL\(request\.url\)\.origin/);
  assert.match(route,/sec-fetch-site/);
  assert.match(route,/createHash\("sha256"\)/);
  assert.match(route,/randomUUID\(\)/);
  assert.match(route,/httpOnly: true/);
  assert.match(route,/sameSite: "lax"/);
  assert.match(route,/bot\|crawler\|spider/);
  assert.match(route,/private, no-store/);
  assert.doesNotMatch(route,/x-forwarded-for|cf-connecting-ip/);
  assert.match(migration,/CREATE TABLE "visitor_sessions"/);
  assert.match(migration,/CREATE INDEX "visitor_last_seen_idx"/);
  assert.doesNotMatch(migration,/ip_address|user_agent/);
});
