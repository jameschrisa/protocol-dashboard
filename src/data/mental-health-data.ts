import type { BaseDataPoint } from "./data-utils";
import type { ChartConfig } from "../types/chart-types";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface MentalHealthDataPoint extends BaseDataPoint {
  mentalHealthScore: number;
  stressLevel: number;
  sleepQualityScore: number;
}

// Generate dates for the last 24 weeks
const dates: string[] = generateDates(24);

// Generate mental health data
export const mentalHealthData: MentalHealthDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  mentalHealthScore: generateTrendedRandom(0, 15, index, 24),
  stressLevel: generateTrendedRandom(1, 5, index, 24),
  sleepQualityScore: generateTrendedRandom(1, 5, index, 24),
}));

// Chart configurations for each metric
export const mentalHealthScoreConfig: ChartConfig = {
  data: mentalHealthData,
  series: [{
    key: "mentalHealthScore",
    name: "Mental Health Score",
    color: "#8B5CF6",
    ranges: [
      { min: 0, max: 5, color: "#EF4444" },  // Severe: Red
      { min: 5, max: 10, color: "#F59E0B" }, // Moderate: Orange
      { min: 10, max: 15, color: "#10B981" } // Mild: Green
    ]
  }],
  title: "Mental Health Score Trend",
  yAxisLabel: "Score",
  domain: [0, 15]
};

export const stressLevelConfig: ChartConfig = {
  data: mentalHealthData,
  series: [{
    key: "stressLevel",
    name: "Stress Level",
    color: "#EF4444",
    ranges: [
      { min: 1, max: 2, color: "#10B981" }, // Low: Green
      { min: 2, max: 4, color: "#F59E0B" }, // Moderate: Orange
      { min: 4, max: 5, color: "#EF4444" }  // High: Red
    ]
  }],
  title: "Stress Level Trend",
  yAxisLabel: "Level",
  domain: [1, 5]
};

export const sleepQualityConfig: ChartConfig = {
  data: mentalHealthData,
  series: [{
    key: "sleepQualityScore",
    name: "Sleep Quality",
    color: "#10B981",
    ranges: [
      { min: 1, max: 2, color: "#EF4444" }, // Poor: Red
      { min: 2, max: 4, color: "#F59E0B" }, // Fair: Orange
      { min: 4, max: 5, color: "#10B981" }  // Good: Green
    ]
  }],
  title: "Sleep Quality Trend",
  yAxisLabel: "Score",
  domain: [1, 5]
};
