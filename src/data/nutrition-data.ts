import type { BaseDataPoint, ChartConfig } from "./data-utils";
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
  fruitsAndVegetables: generateTrendedRandom(2, 8, index, 24),
}));

// Chart configurations for each metric
export const caloriesConfig: ChartConfig = {
  data: nutritionData,
  series: [{ key: "dailyCalories", name: "Daily Calories", color: "#3B82F6" }],
  title: "Daily Calorie Intake",
  yAxisLabel: "Calories"
};

export const macronutrientsConfig: ChartConfig = {
  data: nutritionData,
  series: [
    { key: "carbohydrates", name: "Carbohydrates", color: "#F59E0B" },
    { key: "protein", name: "Protein", color: "#10B981" },
    { key: "fat", name: "Fat", color: "#EF4444" },
  ],
  title: "Macronutrient Distribution",
  yAxisLabel: "Percentage"
};

export const fruitsAndVegetablesConfig: ChartConfig = {
  data: nutritionData,
  series: [{ key: "fruitsAndVegetables", name: "Fruits & Vegetables", color: "#8B5CF6" }],
  title: "Daily Fruits & Vegetables",
  yAxisLabel: "Servings"
};
