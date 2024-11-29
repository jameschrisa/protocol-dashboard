import type { BaseDataPoint } from "./data-utils";
import type { ChartConfig } from "../types/chart-types";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface SocialDataPoint extends BaseDataPoint {
  socialInteractions: number;
  relationshipSatisfaction: number;
  supportNetworkSize: number;
}

// Generate dates for the last 24 weeks
const dates: string[] = generateDates(24);

// Generate social data
export const socialData: SocialDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  socialInteractions: generateTrendedRandom(2, 8, index, 24),
  relationshipSatisfaction: generateTrendedRandom(1, 5, index, 24),
  supportNetworkSize: generateTrendedRandom(5, 15, index, 24),
}));

// Chart configurations for each metric
export const socialInteractionsConfig: ChartConfig = {
  data: socialData,
  series: [{
    key: "socialInteractions",
    name: "Weekly Interactions",
    color: "#3B82F6",
    ranges: [
      { min: 0, max: 2, color: "#EF4444" },    // Low: Red
      { min: 2, max: 5, color: "#F59E0B" },    // Moderate: Orange
      { min: 5, max: 10, color: "#10B981" }    // Good: Green
    ]
  }],
  title: "Social Interactions",
  yAxisLabel: "Count",
  domain: [0, 10]
};

export const relationshipSatisfactionConfig: ChartConfig = {
  data: socialData,
  series: [{
    key: "relationshipSatisfaction",
    name: "Satisfaction Level",
    color: "#10B981",
    ranges: [
      { min: 1, max: 2, color: "#EF4444" },    // Low: Red
      { min: 2, max: 4, color: "#F59E0B" },    // Moderate: Orange
      { min: 4, max: 5, color: "#10B981" }     // High: Green
    ]
  }],
  title: "Relationship Satisfaction",
  yAxisLabel: "Score",
  domain: [1, 5]
};

export const supportNetworkConfig: ChartConfig = {
  data: socialData,
  series: [{
    key: "supportNetworkSize",
    name: "Network Size",
    color: "#8B5CF6",
    ranges: [
      { min: 0, max: 5, color: "#F59E0B" },    // Small: Orange
      { min: 5, max: 10, color: "#10B981" },   // Medium: Green
      { min: 10, max: 20, color: "#3B82F6" }   // Large: Blue
    ]
  }],
  title: "Support Network Size",
  yAxisLabel: "People",
  domain: [0, 20]
};
