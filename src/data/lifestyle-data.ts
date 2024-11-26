import type { BaseDataPoint } from "./data-utils";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface LifestyleDataPoint extends BaseDataPoint {
  productivityScore: number;
  taskTime: number;
  leisureTime: number;
}

interface ChartConfig {
  data: LifestyleDataPoint[];
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

// Generate lifestyle data
export const lifestyleData: LifestyleDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  productivityScore: generateTrendedRandom(3, 4.5, index, 24), // 1-5 scale
  taskTime: generateTrendedRandom(6, 8, index, 24), // 4-10 hours
  leisureTime: generateTrendedRandom(2, 3, index, 24), // 1-4 hours
}));

// Chart configurations for each metric
export const productivityConfig: ChartConfig = {
  data: lifestyleData,
  series: [{ key: "productivityScore", name: "Productivity Score", color: "#3B82F6" }],
  title: "Productivity Score Trend",
  yAxisLabel: "score"
};

export const taskTimeConfig: ChartConfig = {
  data: lifestyleData,
  series: [{ key: "taskTime", name: "Task Time (hours)", color: "#10B981" }],
  title: "Task Time Trend",
  yAxisLabel: "hours"
};

export const leisureTimeConfig: ChartConfig = {
  data: lifestyleData,
  series: [{ key: "leisureTime", name: "Leisure Time (hours)", color: "#8B5CF6" }],
  title: "Leisure Time Trend",
  yAxisLabel: "hours"
};
