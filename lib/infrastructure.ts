export type TransportMetric = {
  label:string; value:string; period:string; definition:string; limitation:string; sourceLabel:string; sourceUrl:string;
};

export type AuditRecord = {
  mode:string; title:string; period:string; finding:string; status:string; sourceUrl:string;
};

export const roadMetrics: TransportMetric[] = [
  { label:"National highways constructed", value:"5,313 km", period:"FY 2025–26", definition:"Length NHAI reports as constructed during the financial year.", limitation:"Construction length does not prove lane quality, maintenance, land settlement or completion of every project component.", sourceLabel:"PIB / NHAI result", sourceUrl:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2247870" },
  { label:"NHAI capital expenditure", value:"₹2.44 lakh cr", period:"FY 2025–26", definition:"Reported capital expenditure for National Highway infrastructure.", limitation:"Capital expenditure is not the same as final project cost, audited value for money or contractor payment by corridor.", sourceLabel:"PIB / NHAI result", sourceUrl:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2247870" },
  { label:"NHAI outstanding debt", value:"≈₹3.20 lakh cr", period:"After Jul 2024 prepayment", definition:"NHAI-reported outstanding debt after ₹15,700 crore of bank-loan prepayment using InvIT monetisation proceeds.", limitation:"This is a dated authority-wide liability snapshot, not state road debt or the total liabilities of every road agency and concessionaire.", sourceLabel:"NHAI debt release", sourceUrl:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2042074" },
  { label:"Highway maintenance spent", value:"₹4,451.51 cr", period:"FY 2023–24", definition:"NHAI annual-account expenditure on maintenance of highways.", limitation:"An authority total cannot establish the condition of a particular road, and maintenance grants and expenditure are different fields.", sourceLabel:"NHAI Annual Report 2023–24", sourceUrl:"https://nhai.gov.in/nhai/sites/default/files/2025-09/NHAI-Annual_Report_2023-24_English.pdf" },
  { label:"NH fee plazas with ETC", value:"1,051", period:"31 Dec 2024", definition:"National Highway fee plazas reported live with electronic-toll infrastructure in all lanes.", limitation:"Plaza count does not show whether a charge was contractually correct, whether a lane worked, or the collection retained by each concessionaire.", sourceLabel:"MoRTH Annual Report 2024–25", sourceUrl:"https://morth.nic.in/sites/default/files/Annual-Report-English-with-Cover.pdf" },
  { label:"Average ETC collection", value:"≈₹192 cr/day", period:"As at 31 Dec 2024", definition:"MoRTH-reported average daily electronic toll collection, with 98.5% penetration in total fee collection.", limitation:"An average is not a live counter. Gross collection is not profit and must be reconciled with concession, O&M and remittance terms.", sourceLabel:"MoRTH Annual Report 2024–25", sourceUrl:"https://morth.nic.in/sites/default/files/Annual-Report-English-with-Cover.pdf" },
];

export const railMetrics: TransportMetric[] = [
  { label:"Rail route network", value:"69,181 km", period:"31 Mar 2024", definition:"Route kilometres in the Indian Railways year book; running-track and total-track kilometres are separate measures.", limitation:"Route kilometres do not measure service frequency, capacity, punctuality or state access.", sourceLabel:"IR Year Book 2023–24", sourceUrl:"https://nfr.indianrailways.gov.in/railwayboard/uploads/directorate/stat_econ/2025/IR%20Year%20Book%202023-24-English.pdf" },
  { label:"Passengers carried", value:"741 crore", period:"FY 2025–26", definition:"Indian Railways-reported passenger journeys during the financial year.", limitation:"Journeys are not unique people; the figure does not show class, crowding, delay or affordability distribution.", sourceLabel:"Ministry of Railways result", sourceUrl:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2247768" },
  { label:"Freight loaded", value:"1,670 MT", period:"FY 2025–26", definition:"Reported freight loading across Indian Railways.", limitation:"Tonnes loaded do not measure tonne-kilometres, delivery time, modal share or external costs.", sourceLabel:"Ministry of Railways result", sourceUrl:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2247768" },
  { label:"Track renewed", value:"6,851 track km", period:"FY 2024–25", definition:"Track kilometres reported renewed during the year.", limitation:"Renewal output does not by itself prove that the maintenance backlog or every safety risk was resolved.", sourceLabel:"Rail safety investment release", sourceUrl:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2215807" },
  { label:"Consequential train accidents", value:"40", period:"FY 2023–24", definition:"Indian Railways’ defined consequential train-accident series including Konkan Railway.", limitation:"The series excludes several other railway deaths and incidents; it must not be presented as all rail casualties.", sourceLabel:"IR Annual Report 2023–24", sourceUrl:"https://indianrailways.gov.in/railwayboard/uploads/directorate/stat_econ/2025/Indian%20Railways%20Annual%20Report%20%20Accounts%202023-24%20-English.pdf" },
];

export const airMetrics: TransportMetric[] = [
  { label:"Scheduled domestic passengers", value:"122.2 million", period:"Calendar 2024", definition:"Passengers carried on 8.49 lakh scheduled domestic flights reported by the Ministry of Civil Aviation.", limitation:"Passenger journeys are not unique people; the annual total does not show fares, delays or airport-level access.", sourceLabel:"Civil Aviation Annual Report 2024–25", sourceUrl:"https://www.civilaviation.gov.in/ministry-documents/annual-reports/annual-report-2024-25" },
  { label:"UDAN airports", value:"95", period:"30 Jun 2026", definition:"Airports operationalised under RCS-UDAN, including 17 heliports and two water aerodromes.", limitation:"Operationalised does not mean every awarded route remains active every day or commercially sustainable.", sourceLabel:"MoCA UDAN dashboard", sourceUrl:"https://www.civilaviation.gov.in/udan-rcs/udan-rcs" },
  { label:"UDAN routes", value:"677", period:"30 Jun 2026", definition:"Routes reported under the Regional Connectivity Scheme.", limitation:"The figure is programme coverage, not a verified count of routes operating on the viewing date.", sourceLabel:"MoCA UDAN dashboard", sourceUrl:"https://www.civilaviation.gov.in/udan-rcs/udan-rcs" },
  { label:"UDAN viability funding", value:"₹4,881.10 cr", period:"Through 30 Jun 2026", definition:"Viability Gap Funding displayed by the Ministry’s UDAN dashboard.", limitation:"Funding does not equal passenger benefit, airline profitability or value for money; route-level payments and outcomes need separate records.", sourceLabel:"MoCA UDAN dashboard", sourceUrl:"https://www.civilaviation.gov.in/udan-rcs/udan-rcs" },
];

export const auditRecords: AuditRecord[] = [
  { mode:"Roads & tolls", title:"Toll operations in Southern India", period:"CAG Report 7 of 2023", finding:"A compliance audit is the correct evidence doorway for tested toll-operation weaknesses; findings apply to audited samples, not every plaza.", status:"Audit finding", sourceUrl:"https://cag.gov.in/en/audit-report?title=ca+start+date+in+toll+plazas" },
  { mode:"Roads & projects", title:"Bharatmala Phase-I implementation", period:"CAG Report 19 of 2023", finding:"The performance audit recorded implementation weaknesses and 41 recommendations. Project award, construction and final completion must remain separate measures.", status:"Audit finding", sourceUrl:"https://cag.gov.in/en/audit-report/details/119177" },
  { mode:"Roads & tolls", title:"Excess user-fee burden in an audited case", period:"CAG Report 39 of 2025", finding:"CAG reported ₹19.66 crore of excess burden in a sampled matter involving the linking factor used for fee calculation. It is not evidence that every toll charge is fraudulent.", status:"Specific audited case", sourceUrl:"https://cag.gov.in/uploads/download_audit_report/2025/Report-of-CAG-March-2024-English-for-Approval_02-Feb-069ca6947a16ae2.43363906.pdf" },
  { mode:"Railways", title:"Track maintenance on heavy-traffic sections", period:"CAG Report 45 of 2017", finding:"The audit reported inspection and mechanisation shortfalls in selected sections. The dashboard keeps this historical audit separate from current network totals.", status:"Historical audit", sourceUrl:"https://cag.gov.in/en/audit-report/details/43219" },
  { mode:"Aviation", title:"Regional Connectivity Scheme — UDAN", period:"CAG Report 22 of 2023", finding:"Use the audit report to evaluate scheme implementation; awarded routes, operational routes, passengers and viability funding are not interchangeable.", status:"Audit finding", sourceUrl:"https://cag.gov.in/en/audit-report?page=44" },
  { mode:"Aviation", title:"Mumbai airport PPP", period:"CAG Report 15 of 2014", finding:"A historical performance audit covering project management, financing, revenue, land and passenger-service-fee arrangements.", status:"Historical audit", sourceUrl:"https://cag.gov.in/en/audit-report/details/973" },
];

export const missingTransportLayers = [
  ["State roads & bridges","PWD budgets, project completion, defects liability, maintenance condition and contractor history"],
  ["Toll-plaza ledger","Plaza rate notification, concession end date, project cost, collection, exemptions, complaints and audit/court outcomes"],
  ["Buses & para-transit","State RTC routes, fleet age, availability, ridership, losses, accessibility and rural coverage"],
  ["Metro & urban mobility","Project cost, ridership, fare, subsidy, last-mile access, safety and construction delays"],
  ["Ports & inland waterways","Cargo, dwell time, capacity, concessions, dredging, environmental conditions and coastal impact"],
  ["Freight & logistics","Rail/road/modal share, terminals, warehousing, turnaround time, costs and emissions"],
  ["Maintenance & safety","Potholes, black spots, bridge health, track renewal, runway incidents and independent inspections"],
  ["Land & environment","Acquisition, compensation, displacement, forest diversion, emissions and compliance conditions"],
  ["Contracts & finance","Tender, winning bidder, original cost, revised cost, completion date, debt, guarantees, PPP terms and arbitration"],
  ["Public experience","Fares/tolls, delays, cancellations, refunds, crowding, accessibility, grievances and resolution time"],
] as const;
