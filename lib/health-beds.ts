export type HealthBedSnapshot = {
  phc: number;
  chc: number | null;
  subDistrictHospital: number | null;
  districtHospital: number;
  medicalCollege: number | null;
  totalBeds: number;
};

const rows: [string, number, number | null, number | null, number, number | null, number][] = [
  ["Andhra Pradesh",8712,6400,5400,2600,12583,35695],["Arunachal Pradesh",397,594,null,1151,350,2492],["Assam",3166,6218,844,3677,9343,23248],["Bihar",5596,8039,2459,4575,7251,27920],["Chhattisgarh",5015,6726,629,3542,4458,20370],["Goa",183,210,253,600,1342,2588],["Gujarat",9422,11167,4492,3257,17899,46237],["Haryana",2183,3079,1581,3647,3660,14150],["Himachal Pradesh",1005,969,3665,1924,2632,10195],["Jharkhand",1229,3647,534,3215,2900,11525],["Karnataka",15112,6500,14530,6174,13712,56028],["Kerala",5727,6371,8347,15113,7175,42733],["Madhya Pradesh",8640,10590,9721,16650,5850,51451],["Maharashtra",18276,15004,7903,4108,16998,45291],["Manipur",420,365,10,551,1449,2795],["Meghalaya",1127,867,40,1960,594,4588],["Mizoram",655,240,70,903,500,2368],["Nagaland",706,325,null,1017,null,2048],["Odisha",1501,6290,1946,7288,9291,26316],["Punjab",1688,3711,2509,3931,3160,14999],["Rajasthan",13866,23820,2500,9474,17131,66791],["Sikkim",257,28,null,400,null,685],["Tamil Nadu",10025,12582,21978,7695,29888,82168],["Telangana",4662,3320,5400,2270,5960,21612],["Tripura",918,630,900,1260,727,4435],["Uttar Pradesh",13548,26157,null,22812,14726,77243],["Uttarakhand",2111,1699,2035,1511,1850,9206],["West Bengal",7640,11205,13110,7599,25086,64640],["Andaman & Nicobar Islands",230,210,null,220,700,1360],["Chandigarh",23,120,100,527,3096,3866],["Dadra & Nagar Haveli and Daman & Diu",177,132,100,240,589,1238],["Delhi (NCT)",12,null,431,9789,12060,22292],["Jammu & Kashmir",3955,2769,null,1862,5420,14006],["Ladakh",320,190,null,370,null,880],["Lakshadweep",40,90,70,50,null,250],["Puducherry",185,120,null,1853,2794,4952]
];

export const healthBedsByJurisdiction = Object.fromEntries(rows.map(([name,phc,chc,subDistrictHospital,districtHospital,medicalCollege,totalBeds]) => [name,{phc,chc,subDistrictHospital,districtHospital,medicalCollege,totalBeds}])) as Record<string,HealthBedSnapshot>;

export const healthBedsSource = {
  label: "Health Dynamics of India 2022-23 · beds as on 31 March 2023",
  url: "https://www.data.gov.in/resource/stateut-wise-number-beds-phc-chc-sdh-dh-and-medical-colleges-india-rural-urban-31-03-2023",
  resourceId: "d133eac1-143f-4c1d-bdc4-b9dfd73ab78c",
  period: "31 March 2023",
  limitation: "Reported public-system bed capacity across PHC, CHC, sub-district hospital, district hospital and medical-college categories. This is not current vacancy, private-hospital capacity or an emergency availability feed. Source NA values remain null."
};
