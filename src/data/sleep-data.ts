import type { BaseDataPoint } from "./data-utils";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface SleepDataPoint extends BaseDataPoint {
  sleepDuration: number;
  recoveryTime: number;
  sleepQualityScore: number;
  deepSleep: number;
  remSleep: number;
}

interface ChartConfig {
  data: SleepDataPoint[];
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

// Generate sleep data
export const sleepData: SleepDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  sleepDuration: generateTrendedRandom(6, 8, index, 24),
  recoveryTime: generateTrendedRandom(15, 45, index, 24),
  sleepQualityScore: generateTrendedRandom(3, 4.5, index, 24),
  deepSleep: generateTrendedRandom(1.5, 2.5, index, 24),
  remSleep: generateTrendedRandom(1.5, 2, index, 24),
}));

// Chart configurations for each metric
export const sleepDurationConfig: ChartConfig = {
  data: sleepData,
  series: [{ key: "sleepDuration", name: "Sleep Duration (hours)", color: "#3B82F6" }],
  title: "Sleep Duration Trend",
  yAxisLabel: "hours"
};

export const recoveryTimeConfig: ChartConfig = {
  data: sleepData,
  series: [{ key: "recoveryTime", name: "Recovery Time (min)", color: "#10B981" }],
  title: "Recovery Time Trend",
  yAxisLabel: "minutes"
};

export const sleepQualityConfig: ChartConfig = {
  data: sleepData,
  series: [{ key: "sleepQualityScore", name: "Sleep Quality Score", color: "#8B5CF6" }],
  title: "Sleep Quality Trend",
  yAxisLabel: "score"
};
