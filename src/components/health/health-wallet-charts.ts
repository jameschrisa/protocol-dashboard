import { HealthWalletEntry } from "../../data/health-wallet-data";

export const COLORS = {
  Medical: 'hsl(217, 91%, 60%)',
  Dental: 'hsl(142, 71%, 45%)',
  Vision: 'hsl(271, 91%, 65%)',
  Pharmacy: 'hsl(24, 95%, 53%)',
  Insurance: 'hsl(199, 89%, 48%)',
  'Out-of-pocket': 'hsl(346, 87%, 60%)',
  'Credit Card': 'hsl(45, 93%, 47%)',
  'Covered by Insurance': 'hsl(199, 89%, 48%)',
  'Not Covered': 'hsl(346, 87%, 60%)'
};

export interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

export const calculateCategoryData = (data: HealthWalletEntry[]): ChartDataItem[] => {
  const categoryTotals: { [key: string]: number } = {};
  data.forEach(entry => {
    categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + entry.amount;
  });
  
  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    fill: COLORS[name as keyof typeof COLORS]
  }));
};

export const calculatePaymentMethodData = (data: HealthWalletEntry[]): ChartDataItem[] => {
  const methodTotals: { [key: string]: number } = {};
  data.forEach(entry => {
    methodTotals[entry.paymentMethod] = (methodTotals[entry.paymentMethod] || 0) + entry.amount;
  });
  
  return Object.entries(methodTotals).map(([name, value]) => ({
    name,
    value,
    fill: COLORS[name as keyof typeof COLORS]
  }));
};

export const calculateInsuranceCoverageData = (data: HealthWalletEntry[]): ChartDataItem[] => {
  let coveredByInsurance = 0;
  let notCovered = 0;

  data.forEach(entry => {
    const coveredAmount = (entry.amount * entry.insuranceCoverage) / 100;
    coveredByInsurance += coveredAmount;
    notCovered += entry.amount - coveredAmount;
  });

  return [
    { name: 'Covered', value: coveredByInsurance, fill: COLORS['Covered by Insurance'] },
    { name: 'Not Covered', value: notCovered, fill: COLORS['Not Covered'] }
  ];
};
