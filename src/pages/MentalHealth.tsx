import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Brain, Activity, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { mentalHealthData, mentalHealthScoreConfig, stressLevelConfig, sleepQualityConfig } from "../data/mental-health-data";

// Define ranges for each metric
const mentalHealthRanges = [
  { min: 0, max: 5, label: "Severe", color: "#EF4444" },
  { min: 5, max: 10, label: "Moderate", color: "#F59E0B" },
  { min: 10, max: 15, label: "Mild", color: "#10B981" },
];

const stressRanges = [
  { min: 1, max: 2, label: "Low", color: "#10B981" },
  { min: 2, max: 4, label: "Moderate", color: "#F59E0B" },
  { min: 4, max: 5, label: "High", color: "#EF4444" },
];

const sleepQualityRanges = [
  { min: 1, max: 2, label: "Poor", color: "#EF4444" },
  { min: 2, max: 4, label: "Fair", color: "#F59E0B" },
  { min: 4, max: 5, label: "Good", color: "#10B981" },
];

// Helper function to get rating based on value and ranges
const getRating = (value: number, ranges: { min: number; max: number; label: string; color: string }[]) => {
  const category = ranges.find(r => value >= r.min && value <= r.max);
  return category || { label: "Unknown", color: "#94A3B8" };
};

export const MentalHealth = () => {
  // Calculate current values (using the most recent data point)
  const currentData = mentalHealthData[mentalHealthData.length - 1];

  // Get ratings for each metric
  const mentalHealthRating = getRating(currentData.mentalHealthScore, mentalHealthRanges);
  const stressRating = getRating(currentData.stressLevel, stressRanges);
  const sleepQualityRating = getRating(currentData.sleepQualityScore, sleepQualityRanges);

  return (
    <div className="space-y-4">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${mentalHealthRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${mentalHealthRating.color}10` }}>
              <Brain className="h-4 w-4" style={{ color: mentalHealthRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">0-15</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Mental Health Score</p>
            <p className="text-2xl font-bold">{currentData.mentalHealthScore.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: mentalHealthRating.color }} />
            <span className="text-xs font-medium" style={{ color: mentalHealthRating.color }}>{mentalHealthRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${stressRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${stressRating.color}10` }}>
              <Activity className="h-4 w-4" style={{ color: stressRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1-5</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Stress Level</p>
            <p className="text-2xl font-bold">{currentData.stressLevel.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stressRating.color }} />
            <span className="text-xs font-medium" style={{ color: stressRating.color }}>{stressRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${sleepQualityRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${sleepQualityRating.color}10` }}>
              <Moon className="h-4 w-4" style={{ color: sleepQualityRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1-5</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Sleep Quality</p>
            <p className="text-2xl font-bold">{currentData.sleepQualityScore.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: sleepQualityRating.color }} />
            <span className="text-xs font-medium" style={{ color: sleepQualityRating.color }}>{sleepQualityRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Trend Charts in Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="mentalHealth" className="space-y-4">
          <TabsList>
            <TabsTrigger value="mentalHealth">Mental Health Score</TabsTrigger>
            <TabsTrigger value="stress">Stress Level</TabsTrigger>
            <TabsTrigger value="sleepQuality">Sleep Quality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mentalHealth">
            <BarChart {...mentalHealthScoreConfig} />
          </TabsContent>

          <TabsContent value="stress">
            <BarChart {...stressLevelConfig} />
          </TabsContent>

          <TabsContent value="sleepQuality">
            <BarChart {...sleepQualityConfig} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
