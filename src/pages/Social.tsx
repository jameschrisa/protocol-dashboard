import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Users, Heart, Network } from "lucide-react";
import { cn } from "../lib/utils";
import { 
  socialData,
  socialInteractionsConfig,
  relationshipSatisfactionConfig,
  supportNetworkConfig
} from "../data/social-data";

// Define ranges for each metric
const interactionRanges = [
  { min: 0, max: 2, label: "Low", color: "#EF4444" },
  { min: 2, max: 5, label: "Moderate", color: "#F59E0B" },
  { min: 5, max: 10, label: "Good", color: "#10B981" },
];

const satisfactionRanges = [
  { min: 1, max: 2, label: "Low", color: "#EF4444" },
  { min: 2, max: 4, label: "Moderate", color: "#F59E0B" },
  { min: 4, max: 5, label: "High", color: "#10B981" },
];

const networkRanges = [
  { min: 0, max: 5, label: "Small", color: "#F59E0B" },
  { min: 5, max: 10, label: "Medium", color: "#10B981" },
  { min: 10, max: 20, label: "Large", color: "#3B82F6" },
];

// Helper function to get rating based on value and ranges
const getRating = (value: number, ranges: { min: number; max: number; label: string; color: string }[]) => {
  const category = ranges.find(r => value >= r.min && value <= r.max);
  return category || { label: "Unknown", color: "#94A3B8" };
};

export const Social = () => {
  // Calculate current values (using the most recent data point)
  const currentData = socialData[socialData.length - 1];

  // Get ratings for each metric
  const interactionRating = getRating(currentData.socialInteractions, interactionRanges);
  const satisfactionRating = getRating(currentData.relationshipSatisfaction, satisfactionRanges);
  const networkRating = getRating(currentData.supportNetworkSize, networkRanges);

  return (
    <div className="space-y-4">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${interactionRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${interactionRating.color}10` }}>
              <Users className="h-4 w-4" style={{ color: interactionRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">2-8 per week</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Social Interactions</p>
            <p className="text-2xl font-bold">{currentData.socialInteractions}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: interactionRating.color }} />
            <span className="text-xs font-medium" style={{ color: interactionRating.color }}>{interactionRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${satisfactionRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${satisfactionRating.color}10` }}>
              <Heart className="h-4 w-4" style={{ color: satisfactionRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">1-5 score</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Relationship Satisfaction</p>
            <p className="text-2xl font-bold">{currentData.relationshipSatisfaction.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: satisfactionRating.color }} />
            <span className="text-xs font-medium" style={{ color: satisfactionRating.color }}>{satisfactionRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${networkRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${networkRating.color}10` }}>
              <Network className="h-4 w-4" style={{ color: networkRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">5-15 people</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Support Network</p>
            <p className="text-2xl font-bold">{currentData.supportNetworkSize}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: networkRating.color }} />
            <span className="text-xs font-medium" style={{ color: networkRating.color }}>{networkRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Trend Charts in Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="interactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="interactions">Social Interactions</TabsTrigger>
            <TabsTrigger value="satisfaction">Relationship Satisfaction</TabsTrigger>
            <TabsTrigger value="network">Support Network</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interactions">
            <BarChart {...socialInteractionsConfig} />
          </TabsContent>

          <TabsContent value="satisfaction">
            <BarChart {...relationshipSatisfactionConfig} />
          </TabsContent>

          <TabsContent value="network">
            <BarChart {...supportNetworkConfig} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
