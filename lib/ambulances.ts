export type AmbulanceSnapshot = {
  advancedLifeSupport: number;
  basicLifeSupport: number;
  patientTransport: number;
  boats: number;
  bikes: number;
  otherVehicles: number;
  totalOperational: number;
};

const rows: [string, number, number, number, number, number, number, number][] = [
  ["Andhra Pradesh",105,523,0,0,0,0,628],["Arunachal Pradesh",0,112,149,0,0,0,261],["Assam",14,779,0,7,0,0,800],["Bihar",576,1082,0,0,0,0,1658],["Chhattisgarh",30,296,380,0,0,0,706],["Goa",27,0,0,0,0,4,31],["Gujarat",175,425,0,2,0,18,620],["Haryana",55,265,261,0,0,0,581],["Himachal Pradesh",35,213,150,0,6,0,404],["Jharkhand",125,418,0,0,0,1633,2176],["Karnataka",231,484,0,0,0,166,881],["Kerala",0,315,0,0,0,0,315],["Madhya Pradesh",167,835,1059,0,0,0,2061],["Maharashtra",233,704,0,3,30,3255,4225],["Manipur",0,0,0,0,0,33,33],["Meghalaya",12,38,142,0,0,0,192],["Mizoram",0,0,62,0,0,3,65],["Nagaland",0,27,66,0,0,0,93],["Odisha",411,449,500,6,0,0,1366],["Punjab",0,0,0,0,0,0,0],["Rajasthan",147,797,0,0,45,0,989],["Sikkim",0,8,0,0,0,0,8],["Tamil Nadu",205,1148,0,0,0,0,1353],["Telangana",31,425,0,0,0,0,456],["Tripura",0,50,0,0,0,0,50],["Uttar Pradesh",250,4470,0,0,0,0,4720],["Uttarakhand",54,217,128,1,0,0,400],["West Bengal",0,1000,629,0,0,1362,2991],["Andaman & Nicobar Islands",0,26,0,0,0,0,26],["Chandigarh",0,6,0,0,0,0,6],["Dadra & Nagar Haveli and Daman & Diu",0,0,0,0,0,11,11],["Delhi (NCT)",0,97,84,0,0,0,181],["Jammu & Kashmir",139,64,286,0,0,0,489],["Ladakh",22,0,5,0,0,0,27],["Lakshadweep",0,0,17,0,0,0,17],["Puducherry",0,10,0,0,0,0,10]
];

export const ambulancesByJurisdiction = Object.fromEntries(rows.map(([name,advancedLifeSupport,basicLifeSupport,patientTransport,boats,bikes,otherVehicles,totalOperational]) => [name,{advancedLifeSupport,basicLifeSupport,patientTransport,boats,bikes,otherVehicles,totalOperational}])) as Record<string,AmbulanceSnapshot>;

export const ambulanceSource = {
  label: "NHM MIS · operational ambulances as on 30 June 2024",
  url: "https://www.data.gov.in/resource/stateut-wise-number-basic-life-support-bls-and-advanced-life-support-als-ambulances",
  primaryDocumentUrl: "https://sansad.in/getFile/annex/267/AU296_TX2dTa.pdf?source=pqars",
  period: "30 June 2024",
  limitation: "Vehicles reported available and operational under the National Health Mission. This is not every public or private ambulance, a live GPS/dispatch feed, current vehicle availability, response time or a guarantee that a vehicle can be assigned. A reported zero remains zero rather than being replaced with an estimate."
};
