import type { BaseDataPoint } from "./data-utils";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface GeneralHealthDataPoint extends BaseDataPoint {
  weight: number;
  height: number;
  bmi: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodGlucose: number;
}

interface ChartConfig {
  data: GeneralHealthDataPoint[];
  series: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  title: string;
  yAxisLabel?: string;
}

// Generate dates for the last 24 weeks
const dates: string[] = generateDates(24);

// Generate general health data
export const generalHealthData: GeneralHealthDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  weight: generateTrendedRandom(70, 75, index, 24),
  height: 1.75,
  bmi: generateTrendedRandom(22, 24, index, 24),
  bloodPressureSystolic: generateTrendedRandom(110, 130, index, 24),
  bloodPressureDiastolic: generateTrendedRandom(70, 85, index, 24),
  bloodGlucose: generateTrendedRandom(80, 120, index, 24),
}));

// Chart configurations for each metric
export const weightChartConfig: ChartConfig = {
  data: generalHealthData,
  series: [{ key: "weight", name: "Weight (kg)", color: "#3B82F6" }],
  title: "Weight Trend",
  yAxisLabel: "kg"
};

export const bmiChartConfig: ChartConfig = {
  data: generalHealthData,
  series: [{ key: "bmi", name: "BMI", color: "#10B981" }],
  title: "BMI Trend"
};

export const bloodPressureChartConfig: ChartConfig = {
  data: generalHealthData,
  series: [
    { key: "bloodPressureSystolic", name: "Systolic", color: "#EF4444" },
    { key: "bloodPressureDiastolic", name: "Diastolic", color: "#F59E0B" },
  ],
  title: "Blood Pressure Trend",
  yAxisLabel: "mmHg"
};

export const bloodGlucoseChartConfig: ChartConfig = {
  data: generalHealthData,
  series: [{ key: "bloodGlucose", name: "Blood Glucose", color: "#8B5CF6" }],
  title: "Blood Glucose Trend",
  yAxisLabel: "mg/dL"
};
