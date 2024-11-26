export interface MedicationEntry {
  id: string;
  type: "Medication" | "Supplement" | "Nutraceutical" | "Vitamin";
  name: string;
  datePrescribed?: string;
  dosage: string;
  routeOfAdministration: string;
  startDate: string;
  endDate?: string;
  refills?: number;
  pharmacy?: string;
}

export const rxCabinetData: MedicationEntry[] = [
  {
    id: "1",
    type: "Medication",
    name: "Lisinopril",
    datePrescribed: "2023-10-15",
    dosage: "10mg once daily",
    routeOfAdministration: "Oral",
    startDate: "2023-10-16",
    refills: 3,
    pharmacy: "CVS Pharmacy - Downtown"
  },
  {
    id: "2",
    type: "Supplement",
    name: "Omega-3 Fish Oil",
    dosage: "1000mg twice daily",
    routeOfAdministration: "Oral",
    startDate: "2023-09-01"
  },
  {
    id: "3",
    type: "Vitamin",
    name: "Vitamin D3",
    dosage: "2000 IU daily",
    routeOfAdministration: "Oral",
    startDate: "2023-08-15"
  },
  {
    id: "4",
    type: "Nutraceutical",
    name: "Coenzyme Q10",
    dosage: "100mg daily",
    routeOfAdministration: "Oral",
    startDate: "2023-09-15"
  },
  {
    id: "5",
    type: "Medication",
    name: "Metformin",
    datePrescribed: "2023-09-20",
    dosage: "500mg twice daily",
    routeOfAdministration: "Oral",
    startDate: "2023-09-21",
    refills: 2,
    pharmacy: "Walgreens - Eastside"
  },
  {
    id: "6",
    type: "Supplement",
    name: "Magnesium Citrate",
    dosage: "400mg daily",
    routeOfAdministration: "Oral",
    startDate: "2023-07-01"
  },
  {
    id: "7",
    type: "Medication",
    name: "Atorvastatin",
    datePrescribed: "2023-08-10",
    dosage: "20mg daily",
    routeOfAdministration: "Oral",
    startDate: "2023-08-11",
    refills: 5,
    pharmacy: "Rite Aid - North"
  },
  {
    id: "8",
    type: "Vitamin",
    name: "B-Complex",
    dosage: "One tablet daily",
    routeOfAdministration: "Oral",
    startDate: "2023-06-15"
  },
  {
    id: "9",
    type: "Nutraceutical",
    name: "Glucosamine",
    dosage: "1500mg daily",
    routeOfAdministration: "Oral",
    startDate: "2023-05-01"
  },
  {
    id: "10",
    type: "Medication",
    name: "Sertraline",
    datePrescribed: "2023-07-05",
    dosage: "50mg daily",
    routeOfAdministration: "Oral",
    startDate: "2023-07-06",
    refills: 1,
    pharmacy: "CVS Pharmacy - Westside"
  },
  {
    id: "11",
    type: "Supplement",
    name: "Probiotics",
    dosage: "One capsule daily",
    routeOfAdministration: "Oral",
    startDate: "2023-04-15"
  },
  {
    id: "12",
    type: "Vitamin",
    name: "Vitamin C",
    dosage: "500mg twice daily",
    routeOfAdministration: "Oral",
    startDate: "2023-03-01"
  }
];
