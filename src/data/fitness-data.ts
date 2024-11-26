import type { BaseDataPoint, ChartConfig } from "./data-utils";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface FitnessDataPoint extends BaseDataPoint {
  stepCount: number;
  activeMinutes: number;
  workouts: number;
}

// Generate dates for the last 24 weeks
const dates: string[] = generateDates(24);

// Generate fitness data
export const fitnessData: FitnessDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  stepCount: generateTrendedRandom(5000, 12000, index, 24),
  activeMinutes: generateTrendedRandom(30, 180, index, 24),
  workouts: generateTrendedRandom(0, 7, index, 24),
}));

// Chart configurations for each metric
export const stepCountConfig: ChartConfig = {
  data: fitnessData,
  series: [{ key: "stepCount", name: "Daily Steps", color: "#3B82F6" }],
  title: "Daily Step Count",
  yAxisLabel: "Steps"
};

export const activeMinutesConfig: ChartConfig = {
  data: fitnessData,
  series: [{ key: "activeMinutes", name: "Active Minutes", color: "#10B981" }],
  title: "Weekly Active Minutes",
  yAxisLabel: "Minutes"
};

export const workoutsConfig: ChartConfig = {
  data: fitnessData,
  series: [{ key: "workouts", name: "Workouts", color: "#8B5CF6" }],
  title: "Weekly Workouts",
  yAxisLabel: "Count"
};
