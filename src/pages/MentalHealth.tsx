import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Brain, Activity, Moon, Info } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { mentalHealthData, mentalHealthScoreConfig, stressLevelConfig, sleepQualityConfig } from "../data/mental-health-data";
import SplitCard from "../components/health/split-card";

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

  const mentalHealthInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Mental Health Score</h4>
          <p className="text-sm text-muted-foreground">
            The Mental Health Score is a comprehensive measure (0-15) that evaluates your overall mental wellbeing based on multiple factors:
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Score Ranges:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Mild (10-15): Good mental health
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (5-10): Some concerns
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Severe (0-5): Needs attention
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            The score considers factors such as stress levels, sleep quality, mood patterns, and daily productivity to provide a holistic view of your mental wellbeing.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const stressLevelInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Stress Level</h4>
          <p className="text-sm text-muted-foreground">
            The Stress Level indicator measures your daily stress on a scale of 1-5, taking into account various factors that affect your mental load:
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Level Ranges:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Low (1-2): Manageable stress levels
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (2-4): Elevated stress
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                High (4-5): High stress, needs attention
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Factors include work pressure, personal responsibilities, emotional state, and physical tension. Regular monitoring helps identify stress patterns and triggers.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const sleepQualityInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Sleep Quality</h4>
          <p className="text-sm text-muted-foreground">
            Sleep Quality is measured on a scale of 1-5, evaluating how well you sleep and how refreshed you feel upon waking:
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Quality Ranges:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Good (4-5): Restful, refreshing sleep
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Fair (2-4): Some sleep disruption
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Poor (1-2): Significant sleep issues
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Factors include sleep duration, number of disruptions, time to fall asleep, and how refreshed you feel in the morning.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      {/* Split Card */}
      <SplitCard healthSpaceKey="mentalHealth" />

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
            <BarChart {...mentalHealthScoreConfig} titleExtra={mentalHealthInfo} />
          </TabsContent>

          <TabsContent value="stress">
            <BarChart {...stressLevelConfig} titleExtra={stressLevelInfo} />
          </TabsContent>

          <TabsContent value="sleepQuality">
            <BarChart {...sleepQualityConfig} titleExtra={sleepQualityInfo} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
