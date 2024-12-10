import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Gauge, Clock, Coffee, Info } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { 
  lifestyleData,
  productivityConfig,
  taskTimeConfig,
  leisureTimeConfig
} from "../data/lifestyle-data";
import SplitCard from "../components/health/split-card";

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

  const productivityInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Productivity Score</h4>
          <p className="text-sm text-muted-foreground">
            The Productivity Score (1-5) measures your daily task completion efficiency and work quality. It considers focus, task management, and goal achievement.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Productivity Levels:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                High (4-5): Excellent efficiency
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (2-4): Average performance
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (1-2): Needs improvement
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Focus on quality over quantity for sustainable productivity.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const taskTimeInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Task Time</h4>
          <p className="text-sm text-muted-foreground">
            Task Time tracks the hours spent on focused work activities daily. This includes professional tasks, studying, or any structured productive activities.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Daily Hours:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                High (8+ hours): Intense focus
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Moderate (4-8 hours): Balanced
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Low (&lt;4 hours): Light workload
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Regular breaks improve long-term productivity.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const leisureInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Leisure Time</h4>
          <p className="text-sm text-muted-foreground">
            Leisure Time measures hours spent on enjoyable, non-work activities. This includes hobbies, entertainment, and relaxation time essential for work-life balance.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Daily Balance:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Moderate (1-3 hours): Balanced
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                High (3+ hours): Relaxed schedule
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (&lt;1 hour): Limited downtime
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Quality leisure time is essential for mental wellbeing.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      {/* Split Card */}
      <SplitCard healthSpaceKey="lifestyle" />

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
            <BarChart {...productivityConfig} titleExtra={productivityInfo} />
          </TabsContent>

          <TabsContent value="taskTime">
            <BarChart {...taskTimeConfig} titleExtra={taskTimeInfo} />
          </TabsContent>

          <TabsContent value="leisure">
            <BarChart {...leisureTimeConfig} titleExtra={leisureInfo} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
