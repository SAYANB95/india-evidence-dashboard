import projects from "../data/infrastructure-projects.json";
import tollPlazas from "../data/toll-plazas.json";

export type EditorialWorkflow = "Ready for import" | "Gap review" | "Definition review";
export type EditorialRecord = {
  id:string; title:string; kind:"Toll plaza"|"Infrastructure project"; jurisdiction:string; topic:string;
  workflow:EditorialWorkflow; sourceLabel:string; sourceUrl:string; sourcePeriod:string; missingFields:string[];
  definition:string; limitation:string; currentValue:string; recordVersion:number;
};

function missing(entries:Array<[string,unknown]>) {
  return entries.filter(([,item])=>item === null || item === "").map(([label])=>label);
}

const tollRecords:EditorialRecord[]=tollPlazas.map((plaza)=>{
  const missingFields=missing([
    ["car single-journey fee",plaza.carSingle],
    ["capital cost",plaza.capitalCostCrore],["cumulative revenue",plaza.cumulativeRevenueCrore],
    ["concession period",plaza.concessionPeriod],["traffic",plaza.trafficPcu],
  ]);
  return {
    id:`toll-${plaza.id}`,title:`${plaza.name} fee plaza`,kind:"Toll plaza",jurisdiction:plaza.state,topic:"Roads & tolls",
    workflow:missingFields.length > 2 ? "Gap review" : "Ready for import",sourceLabel:"NHAI Toll Information System",sourceUrl:plaza.sourceUrl,
    sourcePeriod:`Fee schedule effective ${plaza.feeEffective}`,missingFields,
    definition:`Car/jeep/van single-journey fee for the ${plaza.stretch} record.`,
    limitation:"The plaza page is a fee and project-information record. It does not prove current road quality, correctness of every transaction, or fraud.",
    currentValue:plaza.carSingle === null ? "Data gap" : `₹${plaza.carSingle.toLocaleString("en-IN")} single journey`,recordVersion:1,
  };
});

const projectRecords:EditorialRecord[]=projects.map((project)=>{
  const missingFields=missing([
    ["original cost",project.originalCostCrore],["current cost",project.currentCostCrore],
    ["original deadline",project.originalDeadline],["contractor",project.contractor],
  ]);
  return {
    id:`project-${project.id}`,title:project.name,kind:"Infrastructure project",jurisdiction:project.state,topic:project.mode,
    workflow:project.progressValue === null ? "Definition review" : missingFields.length > 2 ? "Gap review" : "Ready for import",
    sourceLabel:project.agency,sourceUrl:project.sourceUrl,sourcePeriod:project.sourcePeriod,missingFields,
    definition:project.currentMilestone,limitation:project.progressDefinition,
    currentValue:project.progressValue === null ? project.status : `${project.progressValue}% · ${project.status}`,recordVersion:1,
  };
});

export const editorialRecords=[...tollRecords,...projectRecords].sort((a,b)=>a.title.localeCompare(b.title));

export const editorialStats={
  records:editorialRecords.length,
  sources:new Set(editorialRecords.map(item=>item.sourceUrl)).size,
  ready:editorialRecords.filter(item=>item.workflow === "Ready for import").length,
  gaps:editorialRecords.reduce((count,item)=>count+item.missingFields.length,0),
};
