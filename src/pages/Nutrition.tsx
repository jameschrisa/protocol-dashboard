import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Utensils, PieChart, Apple, Info } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { 
  nutritionData,
  caloriesConfig,
  macronutrientsConfig,
  fruitsAndVegetablesConfig
} from "../data/nutrition-data";
import SplitCard from "../components/health/split-card";

// Define ranges for each metric
const calorieRanges = [
  { min: 0, max: 1800, label: "Low", color: "#F59E0B" },
  { min: 1800, max: 2500, label: "Normal", color: "#10B981" },
  { min: 2500, max: 5000, label: "High", color: "#EF4444" },
];

const macroRanges = [
  { min: 0, max: 45, label: "Low", color: "#F59E0B" },
  { min: 45, max: 65, label: "Normal", color: "#10B981" },
  { min: 65, max: 100, label: "High", color: "#EF4444" },
];

const fruitsVegRanges = [
  { min: 0, max: 3, label: "Low", color: "#EF4444" },
  { min: 3, max: 5, label: "Moderate", color: "#F59E0B" },
  { min: 5, max: 10, label: "Good", color: "#10B981" },
];

// Helper function to get rating based on value and ranges
const getRating = (value: number, ranges: { min: number; max: number; label: string; color: string }[]) => {
  const category = ranges.find(r => value >= r.min && value <= r.max);
  return category || { label: "Unknown", color: "#94A3B8" };
};

export const Nutrition = () => {
  // Calculate current values (using the most recent data point)
  const currentData = nutritionData[nutritionData.length - 1];

  // Get ratings for each metric
  const calorieRating = getRating(currentData.dailyCalories, calorieRanges);
  const macroRating = getRating(currentData.carbohydrates, macroRanges);
  const fruitsVegRating = getRating(currentData.fruitsAndVegetables, fruitsVegRanges);

  const calorieInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Daily Calorie Intake</h4>
          <p className="text-sm text-muted-foreground">
            Daily calorie intake represents the total energy consumed through food and beverages. The recommended range varies based on factors like age, sex, weight, and activity level.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Target Ranges:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Normal (1800-2500 kcal): Balanced intake
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Low (&lt;1800 kcal): May need increase
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                High (&gt;2500 kcal): May need reduction
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const macroInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Macronutrient Distribution</h4>
          <p className="text-sm text-muted-foreground">
            Macronutrients are the three main categories of nutrients your body needs: carbohydrates, proteins, and fats. A balanced distribution is crucial for optimal health.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Recommended Distribution:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Carbohydrates: 45-65% of total calories
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                Protein: 10-35% of total calories
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                Fats: 20-35% of total calories
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const fruitsVegInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Fruits & Vegetables Intake</h4>
          <p className="text-sm text-muted-foreground">
            Daily fruits and vegetables intake is measured in servings. One serving is approximately 1 cup of raw vegetables or fruits, or ½ cup of cooked vegetables.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Daily Recommendations:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Good (5+ servings): Optimal intake
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (3-5 servings): Room for improvement
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (&lt;3 servings): Needs attention
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Aim for a variety of colors to ensure a wide range of nutrients.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      {/* Split Card */}
      <SplitCard healthSpaceKey="nutrition" />

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${calorieRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${calorieRating.color}10` }}>
              <Utensils className="h-4 w-4" style={{ color: calorieRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1800-2500 kcal</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Daily Calories</p>
            <p className="text-2xl font-bold">{currentData.dailyCalories.toFixed(0)} kcal</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: calorieRating.color }} />
            <span className="text-xs font-medium" style={{ color: calorieRating.color }}>{calorieRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${macroRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${macroRating.color}10` }}>
              <PieChart className="h-4 w-4" style={{ color: macroRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">45-65%</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Carbohydrates</p>
            <p className="text-2xl font-bold">{currentData.carbohydrates.toFixed(1)}%</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: macroRating.color }} />
            <span className="text-xs font-medium" style={{ color: macroRating.color }}>{macroRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${fruitsVegRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${fruitsVegRating.color}10` }}>
              <Apple className="h-4 w-4" style={{ color: fruitsVegRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">3-8 servings</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Fruits & Vegetables</p>
            <p className="text-2xl font-bold">{currentData.fruitsAndVegetables.toFixed(1)} servings</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: fruitsVegRating.color }} />
            <span className="text-xs font-medium" style={{ color: fruitsVegRating.color }}>{fruitsVegRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Trend Charts in Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="calories" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calories">Daily Calories</TabsTrigger>
            <TabsTrigger value="macros">Macronutrients</TabsTrigger>
            <TabsTrigger value="fruits">Fruits & Vegetables</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calories">
            <BarChart {...caloriesConfig} titleExtra={calorieInfo} />
          </TabsContent>

          <TabsContent value="macros">
            <BarChart {...macronutrientsConfig} titleExtra={macroInfo} />
          </TabsContent>

          <TabsContent value="fruits">
            <BarChart {...fruitsAndVegetablesConfig} titleExtra={fruitsVegInfo} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
