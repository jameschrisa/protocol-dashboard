import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Gauge, Clock, Coffee } from "lucide-react";
import { cn } from "../lib/utils";
import { 
  lifestyleData,
  productivityConfig,
  taskTimeConfig,
  leisureTimeConfig
} from "../data/lifestyle-data";

// Define ranges for each metric
const productivityRanges = [
  { min: 1, max: 2, label: "Low", color: "#EF4444" },
  { min: 2, max: 4, label: "Moderate", color: "#F59E0B" },
  { min: 4, max: 5, label: "High", color: "#10B981" },
];

const taskTimeRanges = [
  { min: 0, max: 4, label: "Low", color: "#F59E0B" },
  { min: 4, max: 8, label: "Moderate", color: "#10B981" },
  { min: 8, max: 12, label: "High", color: "#3B82F6" },
];

const leisureRanges = [
  { min: 0, max: 1, label: "Low", color: "#EF4444" },
  { min: 1, max: 3, label: "Moderate", color: "#10B981" },
  { min: 3, max: 6, label: "High", color: "#F59E0B" },
];

// Helper function to get rating based on value and ranges
const getRating = (value: number, ranges: { min: number; max: number; label: string; color: string }[]) => {
  const category = ranges.find(r => value >= r.min && value <= r.max);
  return category || { label: "Unknown", color: "#94A3B8" };
};

export const Lifestyle = () => {
  // Calculate current values (using the most recent data point)
  const currentData = lifestyleData[lifestyleData.length - 1];

  // Get ratings for each metric
  const productivityRating = getRating(currentData.productivityScore, productivityRanges);
  const taskTimeRating = getRating(currentData.taskTime, taskTimeRanges);
  const leisureRating = getRating(currentData.leisureTime, leisureRanges);

  return (
    <div className="space-y-4">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${productivityRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${productivityRating.color}10` }}>
              <Gauge className="h-4 w-4" style={{ color: productivityRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1-5 score</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Productivity Score</p>
            <p className="text-2xl font-bold">{currentData.productivityScore.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: productivityRating.color }} />
            <span className="text-xs font-medium" style={{ color: productivityRating.color }}>{productivityRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${taskTimeRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${taskTimeRating.color}10` }}>
              <Clock className="h-4 w-4" style={{ color: taskTimeRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">4-10 hours</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Task Time</p>
            <p className="text-2xl font-bold">{currentData.taskTime.toFixed(1)} hrs</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: taskTimeRating.color }} />
            <span className="text-xs font-medium" style={{ color: taskTimeRating.color }}>{taskTimeRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${leisureRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${leisureRating.color}10` }}>
              <Coffee className="h-4 w-4" style={{ color: leisureRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1-4 hours</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Leisure Time</p>
            <p className="text-2xl font-bold">{currentData.leisureTime.toFixed(1)} hrs</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: leisureRating.color }} />
            <span className="text-xs font-medium" style={{ color: leisureRating.color }}>{leisureRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Trend Charts in Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="productivity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="taskTime">Task Time</TabsTrigger>
            <TabsTrigger value="leisure">Leisure Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="productivity">
            <BarChart {...productivityConfig} />
          </TabsContent>

          <TabsContent value="taskTime">
            <BarChart {...taskTimeConfig} />
          </TabsContent>

          <TabsContent value="leisure">
            <BarChart {...leisureTimeConfig} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
