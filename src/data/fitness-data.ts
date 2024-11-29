import type { BaseDataPoint } from "./data-utils";
import type { ChartConfig } from "../types/chart-types";
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
  series: [{
    key: "stepCount",
    name: "Daily Steps",
    color: "#3B82F6",
    ranges: [
      { min: 0, max: 5000, color: "#EF4444" },    // Low: Red
      { min: 5000, max: 7500, color: "#F59E0B" }, // Moderate: Orange
      { min: 7500, max: 20000, color: "#10B981" } // Good: Green
    ]
  }],
  title: "Daily Step Count",
  yAxisLabel: "Steps",
  domain: [0, 15000]
};

export const activeMinutesConfig: ChartConfig = {
  data: fitnessData,
  series: [{
    key: "activeMinutes",
    name: "Active Minutes",
    color: "#10B981",
    ranges: [
      { min: 0, max: 30, color: "#EF4444" },    // Low: Red
      { min: 30, max: 60, color: "#F59E0B" },   // Moderate: Orange
      { min: 60, max: 300, color: "#10B981" }   // Good: Green
    ]
  }],
  title: "Weekly Active Minutes",
  yAxisLabel: "Minutes",
  domain: [0, 200]
};

export const workoutsConfig: ChartConfig = {
  data: fitnessData,
  series: [{
    key: "workouts",
    name: "Workouts",
    color: "#8B5CF6",
    ranges: [
      { min: 0, max: 2, color: "#F59E0B" },   // Low: Orange
      { min: 2, max: 4, color: "#10B981" },   // Moderate: Green
      { min: 4, max: 10, color: "#3B82F6" }   // High: Blue
    ]
  }],
  title: "Weekly Workouts",
  yAxisLabel: "Count",
  domain: [0, 8]
};
