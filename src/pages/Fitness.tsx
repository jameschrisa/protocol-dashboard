import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Footprints, Timer, Dumbbell, Info } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { 
  fitnessData,
  stepCountConfig,
  activeMinutesConfig,
  workoutsConfig
} from "../data/fitness-data";
import SplitCard from "../components/health/split-card";

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

  const stepsInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Daily Steps</h4>
          <p className="text-sm text-muted-foreground">
            Daily step count is a key indicator of physical activity and overall movement throughout the day. The recommended goal varies by age and fitness level.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Activity Levels:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Good (7,500+): Active lifestyle
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (5,000-7,500): Somewhat active
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (&lt;5,000): Sedentary lifestyle
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Aim to gradually increase your daily steps to improve overall health.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const activeMinutesInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Active Minutes</h4>
          <p className="text-sm text-muted-foreground">
            Active minutes measure time spent in moderate to vigorous physical activity. This includes brisk walking, running, cycling, or any activity that elevates heart rate.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Daily Targets:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Good (60+ min): Meeting recommendations
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (30-60 min): Making progress
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (&lt;30 min): Needs improvement
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            WHO recommends 150+ minutes of moderate activity per week.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const workoutsInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Weekly Workouts</h4>
          <p className="text-sm text-muted-foreground">
            Weekly workouts track structured exercise sessions, including strength training, cardio, or other focused physical activities.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Weekly Frequency:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                High (4+ workouts): Very active
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Moderate (2-4 workouts): Regular exercise
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Low (&lt;2 workouts): Getting started
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Mix of cardio and strength training recommended for optimal health.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      {/* Split Card */}
      <SplitCard healthSpaceKey="fitness" />

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
            <BarChart {...stepCountConfig} titleExtra={stepsInfo} />
          </TabsContent>

          <TabsContent value="active">
            <BarChart {...activeMinutesConfig} titleExtra={activeMinutesInfo} />
          </TabsContent>

          <TabsContent value="workouts">
            <BarChart {...workoutsConfig} titleExtra={workoutsInfo} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
