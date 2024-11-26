import type { BaseDataPoint, ChartConfig } from "./data-utils";
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
  series: [{ key: "socialInteractions", name: "Social Interactions", color: "#3B82F6" }],
  title: "Weekly Social Interactions",
  yAxisLabel: "Count"
};

export const relationshipSatisfactionConfig: ChartConfig = {
  data: socialData,
  series: [{ key: "relationshipSatisfaction", name: "Relationship Satisfaction", color: "#10B981" }],
  title: "Relationship Satisfaction",
  yAxisLabel: "Score"
};

export const supportNetworkConfig: ChartConfig = {
  data: socialData,
  series: [{ key: "supportNetworkSize", name: "Support Network", color: "#8B5CF6" }],
  title: "Support Network Size",
  yAxisLabel: "People"
};
