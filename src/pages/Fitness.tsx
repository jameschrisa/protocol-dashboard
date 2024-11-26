import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Footprints, Timer, Dumbbell } from "lucide-react";
import { cn } from "../lib/utils";
import { 
  fitnessData,
  stepCountConfig,
  activeMinutesConfig,
  workoutsConfig
} from "../data/fitness-data";

// Define ranges for each metric
const stepRanges = [
  { min: 0, max: 5000, label: "Low", color: "#EF4444" },
  { min: 5000, max: 7500, label: "Moderate", color: "#F59E0B" },
  { min: 7500, max: 20000, label: "Good", color: "#10B981" },
];

const activeMinutesRanges = [
  { min: 0, max: 30, label: "Low", color: "#EF4444" },
  { min: 30, max: 60, label: "Moderate", color: "#F59E0B" },
  { min: 60, max: 300, label: "Good", color: "#10B981" },
];

const workoutRanges = [
  { min: 0, max: 2, label: "Low", color: "#F59E0B" },
  { min: 2, max: 4, label: "Moderate", color: "#10B981" },
  { min: 4, max: 10, label: "High", color: "#3B82F6" },
];

// Helper function to get rating based on value and ranges
const getRating = (value: number, ranges: { min: number; max: number; label: string; color: string }[]) => {
  const category = ranges.find(r => value >= r.min && value <= r.max);
  return category || { label: "Unknown", color: "#94A3B8" };
};

export const Fitness = () => {
  // Calculate current values (using the most recent data point)
  const currentData = fitnessData[fitnessData.length - 1];

  // Get ratings for each metric
  const stepRating = getRating(currentData.stepCount, stepRanges);
  const activeMinutesRating = getRating(currentData.activeMinutes, activeMinutesRanges);
  const workoutRating = getRating(currentData.workouts, workoutRanges);

  return (
    <div className="space-y-4">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${stepRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${stepRating.color}10` }}>
              <Footprints className="h-4 w-4" style={{ color: stepRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">5000-10000</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Daily Steps</p>
            <p className="text-2xl font-bold">{currentData.stepCount.toLocaleString()}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stepRating.color }} />
            <span className="text-xs font-medium" style={{ color: stepRating.color }}>{stepRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${activeMinutesRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${activeMinutesRating.color}10` }}>
              <Timer className="h-4 w-4" style={{ color: activeMinutesRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">30-60 min</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Active Minutes</p>
            <p className="text-2xl font-bold">{currentData.activeMinutes} min</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: activeMinutesRating.color }} />
            <span className="text-xs font-medium" style={{ color: activeMinutesRating.color }}>{activeMinutesRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${workoutRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${workoutRating.color}10` }}>
              <Dumbbell className="h-4 w-4" style={{ color: workoutRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">2-7 per week</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Weekly Workouts</p>
            <p className="text-2xl font-bold">{currentData.workouts}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: workoutRating.color }} />
            <span className="text-xs font-medium" style={{ color: workoutRating.color }}>{workoutRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Trend Charts in Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="steps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="steps">Daily Steps</TabsTrigger>
            <TabsTrigger value="active">Active Minutes</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="steps">
            <BarChart {...stepCountConfig} />
          </TabsContent>

          <TabsContent value="active">
            <BarChart {...activeMinutesConfig} />
          </TabsContent>

          <TabsContent value="workouts">
            <BarChart {...workoutsConfig} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
