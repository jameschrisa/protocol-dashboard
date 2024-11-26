export interface HealthWalletEntry {
  id: string;
  date: string;
  providerName: string;
  category: "Medical" | "Dental" | "Vision" | "Pharmacy";
  amount: number;
  paymentMethod: "Insurance" | "Out-of-pocket" | "Credit Card";
  insuranceClaimId?: string;
  billingStatus: "Paid" | "Pending" | "Denied";
  insuranceCoverage: number; // Percentage
  outOfPocketCost: number;
}

export const healthWalletData: HealthWalletEntry[] = [
  {
    id: "1",
    date: "2023-12-01",
    providerName: "Dr. Sarah Johnson",
    category: "Medical",
    amount: 250.00,
    paymentMethod: "Insurance",
    insuranceClaimId: "INS-2023-001",
    billingStatus: "Paid",
    insuranceCoverage: 80,
    outOfPocketCost: 50.00
  },
  {
    id: "2",
    date: "2023-11-15",
    providerName: "City Dental Care",
    category: "Dental",
    amount: 180.00,
    paymentMethod: "Credit Card",
    insuranceClaimId: "INS-2023-002",
    billingStatus: "Pending",
    insuranceCoverage: 60,
    outOfPocketCost: 72.00
  },
  {
    id: "3",
    date: "2023-11-01",
    providerName: "Vision Plus",
    category: "Vision",
    amount: 350.00,
    paymentMethod: "Insurance",
    insuranceClaimId: "INS-2023-003",
    billingStatus: "Paid",
    insuranceCoverage: 70,
    outOfPocketCost: 105.00
  },
  {
    id: "4",
    date: "2023-10-28",
    providerName: "CVS Pharmacy",
    category: "Pharmacy",
    amount: 75.00,
    paymentMethod: "Out-of-pocket",
    billingStatus: "Paid",
    insuranceCoverage: 0,
    outOfPocketCost: 75.00
  },
  {
    id: "5",
    date: "2023-10-15",
    providerName: "General Hospital",
    category: "Medical",
    amount: 1200.00,
    paymentMethod: "Insurance",
    insuranceClaimId: "INS-2023-004",
    billingStatus: "Paid",
    insuranceCoverage: 90,
    outOfPocketCost: 120.00
  },
  {
    id: "6",
    date: "2023-10-01",
    providerName: "Dr. Michael Smith",
    category: "Medical",
    amount: 150.00,
    paymentMethod: "Insurance",
    insuranceClaimId: "INS-2023-005",
    billingStatus: "Denied",
    insuranceCoverage: 0,
    outOfPocketCost: 150.00
  },
  {
    id: "7",
    date: "2023-09-15",
    providerName: "Family Dental",
    category: "Dental",
    amount: 420.00,
    paymentMethod: "Insurance",
    insuranceClaimId: "INS-2023-006",
    billingStatus: "Paid",
    insuranceCoverage: 75,
    outOfPocketCost: 105.00
  },
  {
    id: "8",
    date: "2023-09-01",
    providerName: "Walgreens Pharmacy",
    category: "Pharmacy",
    amount: 45.00,
    paymentMethod: "Credit Card",
    billingStatus: "Paid",
    insuranceCoverage: 0,
    outOfPocketCost: 45.00
  }
];
