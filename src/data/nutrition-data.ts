import type { BaseDataPoint } from "./data-utils";
import type { ChartConfig } from "../types/chart-types";
import { generateDates, generateTrendedRandom, createBaseDataPoint } from "./data-utils";

interface NutritionDataPoint extends BaseDataPoint {
  dailyCalories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  fruitsAndVegetables: number;
}

// Generate dates for the last 24 weeks
const dates: string[] = generateDates(24);

// Generate nutrition data
export const nutritionData: NutritionDataPoint[] = dates.map((timestamp: string, index: number) => ({
  ...createBaseDataPoint(timestamp, index),
  dailyCalories: generateTrendedRandom(1800, 2500, index, 24),
  carbohydrates: generateTrendedRandom(45, 65, index, 24),
  protein: generateTrendedRandom(20, 35, index, 24),
  fat: generateTrendedRandom(20, 35, index, 24),
  fruitsAndVegetables: generateTrendedRandom(3, 8, index, 24),
}));

// Chart configurations for each metric
export const caloriesConfig: ChartConfig = {
  data: nutritionData,
  series: [{
    key: "dailyCalories",
    name: "Daily Calories",
    color: "#3B82F6",
    ranges: [
      { min: 0, max: 1800, color: "#F59E0B" },     // Low: Orange
      { min: 1800, max: 2500, color: "#10B981" },  // Normal: Green
      { min: 2500, max: 5000, color: "#EF4444" }   // High: Red
    ]
  }],
  title: "Daily Calorie Intake",
  yAxisLabel: "Calories",
  domain: [1500, 3000]
};

export const macronutrientsConfig: ChartConfig = {
  data: nutritionData,
  series: [{
    key: "carbohydrates",
    name: "Carbohydrates",
    color: "#3B82F6",
    ranges: [
      { min: 0, max: 45, color: "#F59E0B" },    // Low: Orange
      { min: 45, max: 65, color: "#10B981" },   // Normal: Green
      { min: 65, max: 100, color: "#EF4444" }   // High: Red
    ]
  }],
  title: "Macronutrient Distribution",
  yAxisLabel: "Percentage",
  domain: [0, 100]
};

export const fruitsAndVegetablesConfig: ChartConfig = {
  data: nutritionData,
  series: [{
    key: "fruitsAndVegetables",
    name: "Servings",
    color: "#10B981",
    ranges: [
      { min: 0, max: 3, color: "#EF4444" },    // Low: Red
      { min: 3, max: 5, color: "#F59E0B" },    // Moderate: Orange
      { min: 5, max: 10, color: "#10B981" }    // Good: Green
    ]
  }],
  title: "Daily Fruits & Vegetables",
  yAxisLabel: "Servings",
  domain: [0, 10]
};
