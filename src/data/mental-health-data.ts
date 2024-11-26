import type { BaseDataPoint, ChartConfig } from "./data-utils";
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
  series: [{ key: "mentalHealthScore", name: "Mental Health Score", color: "#8B5CF6" }],
  title: "Mental Health Score Trend",
  yAxisLabel: "Score"
};

export const stressLevelConfig: ChartConfig = {
  data: mentalHealthData,
  series: [{ key: "stressLevel", name: "Stress Level", color: "#EF4444" }],
  title: "Stress Level Trend",
  yAxisLabel: "Level"
};

export const sleepQualityConfig: ChartConfig = {
  data: mentalHealthData,
  series: [{ key: "sleepQualityScore", name: "Sleep Quality", color: "#10B981" }],
  title: "Sleep Quality Trend",
  yAxisLabel: "Score"
};
