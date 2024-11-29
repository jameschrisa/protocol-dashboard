import type { BaseDataPoint } from "./data-utils";
import type { ChartConfig } from "../types/chart-types";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface LifestyleDataPoint extends BaseDataPoint {
  productivityScore: number;
  taskTime: number;
  leisureTime: number;
}

// Generate dates for the last 24 weeks
const dates: string[] = generateDates(24);

// Generate lifestyle data
export const lifestyleData: LifestyleDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  productivityScore: generateTrendedRandom(1, 5, index, 24),
  taskTime: generateTrendedRandom(4, 10, index, 24),
  leisureTime: generateTrendedRandom(1, 4, index, 24),
}));

// Chart configurations for each metric
export const productivityConfig: ChartConfig = {
  data: lifestyleData,
  series: [{
    key: "productivityScore",
    name: "Productivity Score",
    color: "#3B82F6",
    ranges: [
      { min: 1, max: 2, color: "#EF4444" },    // Low: Red
      { min: 2, max: 4, color: "#F59E0B" },    // Moderate: Orange
      { min: 4, max: 5, color: "#10B981" }     // High: Green
    ]
  }],
  title: "Productivity Score",
  yAxisLabel: "Score",
  domain: [1, 5]
};

export const taskTimeConfig: ChartConfig = {
  data: lifestyleData,
  series: [{
    key: "taskTime",
    name: "Task Time",
    color: "#10B981",
    ranges: [
      { min: 0, max: 4, color: "#F59E0B" },    // Low: Orange
      { min: 4, max: 8, color: "#10B981" },    // Moderate: Green
      { min: 8, max: 12, color: "#3B82F6" }    // High: Blue
    ]
  }],
  title: "Daily Task Time",
  yAxisLabel: "Hours",
  domain: [0, 12]
};

export const leisureTimeConfig: ChartConfig = {
  data: lifestyleData,
  series: [{
    key: "leisureTime",
    name: "Leisure Time",
    color: "#8B5CF6",
    ranges: [
      { min: 0, max: 1, color: "#EF4444" },    // Low: Red
      { min: 1, max: 3, color: "#10B981" },    // Moderate: Green
      { min: 3, max: 6, color: "#F59E0B" }     // High: Orange
    ]
  }],
  title: "Daily Leisure Time",
  yAxisLabel: "Hours",
  domain: [0, 6]
};
