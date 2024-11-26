import React from "react";
import { Card } from "../components/ui/card";
import { AreaChart } from "../components/health/area-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Moon, Timer, Star } from "lucide-react";
import { cn } from "../lib/utils";
import { 
  sleepData,
  sleepDurationConfig,
  recoveryTimeConfig,
  sleepQualityConfig
} from "../data/sleep-data";

// Define ranges for each metric
const sleepDurationRanges = [
  { min: 0, max: 6, label: "Low", color: "#EF4444" },
  { min: 6, max: 7, label: "Moderate", color: "#F59E0B" },
  { min: 7, max: 12, label: "Good", color: "#10B981" },
];

const recoveryRanges = [
  { min: 0, max: 15, label: "Low", color: "#EF4444" },
  { min: 15, max: 30, label: "Moderate", color: "#F59E0B" },
  { min: 30, max: 120, label: "Good", color: "#10B981" },
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

export const Sleep = () => {
  // Calculate current values (using the most recent data point)
  const currentData = sleepData[sleepData.length - 1];

  // Get ratings for each metric
  const durationRating = getRating(currentData.sleepDuration, sleepDurationRanges);
  const recoveryRating = getRating(currentData.recoveryTime, recoveryRanges);
  const qualityRating = getRating(currentData.sleepQualityScore, sleepQualityRanges);

  return (
    <div className="space-y-4">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${durationRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${durationRating.color}10` }}>
              <Moon className="h-4 w-4" style={{ color: durationRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">7-9 hours</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Sleep Duration</p>
            <p className="text-2xl font-bold">{currentData.sleepDuration.toFixed(1)} hrs</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: durationRating.color }} />
            <span className="text-xs font-medium" style={{ color: durationRating.color }}>{durationRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${recoveryRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${recoveryRating.color}10` }}>
              <Timer className="h-4 w-4" style={{ color: recoveryRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">15-60 min</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Recovery Time</p>
            <p className="text-2xl font-bold">{currentData.recoveryTime} min</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: recoveryRating.color }} />
            <span className="text-xs font-medium" style={{ color: recoveryRating.color }}>{recoveryRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${qualityRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${qualityRating.color}10` }}>
              <Star className="h-4 w-4" style={{ color: qualityRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1-5 score</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Sleep Quality</p>
            <p className="text-2xl font-bold">{currentData.sleepQualityScore.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: qualityRating.color }} />
            <span className="text-xs font-medium" style={{ color: qualityRating.color }}>{qualityRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Trend Charts in Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="duration" className="space-y-4">
          <TabsList>
            <TabsTrigger value="duration">Sleep Duration</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Time</TabsTrigger>
            <TabsTrigger value="quality">Sleep Quality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="duration">
            <AreaChart {...sleepDurationConfig} />
          </TabsContent>

          <TabsContent value="recovery">
            <AreaChart {...recoveryTimeConfig} />
          </TabsContent>

          <TabsContent value="quality">
            <AreaChart {...sleepQualityConfig} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
