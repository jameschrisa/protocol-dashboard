import React from "react";
import { Card } from "../components/ui/card";
import { BarChart } from "../components/health/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Users, Heart, Network, Info } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { 
  socialData,
  socialInteractionsConfig,
  relationshipSatisfactionConfig,
  supportNetworkConfig
} from "../data/social-data";
import SplitCard from "../components/health/split-card";

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

  const interactionsInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Social Interactions</h4>
          <p className="text-sm text-muted-foreground">
            Social interactions track meaningful social engagements per week, including in-person meetings, video calls, or significant conversations that contribute to social wellbeing.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Interaction Levels:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Good (5+ per week): Active social life
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (2-5 per week): Regular contact
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (&lt;2 per week): Limited interaction
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Regular social interaction is crucial for mental health and longevity.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const satisfactionInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Relationship Satisfaction</h4>
          <p className="text-sm text-muted-foreground">
            Relationship satisfaction measures the quality and fulfillment derived from your close relationships, rated on a scale of 1-5.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Satisfaction Levels:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                High (4-5): Strong, fulfilling relationships
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Moderate (2-4): Room for improvement
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Low (1-2): Relationship challenges
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Quality of relationships often matters more than quantity.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const networkInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Support Network</h4>
          <p className="text-sm text-muted-foreground">
            Support network size represents the number of close friends and family members you can rely on for emotional or practical support when needed.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Network Size:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                Large (10+ people): Extensive support
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Medium (5-10 people): Good support
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Small (&lt;5 people): Limited support
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            A diverse support network provides different types of social support.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      {/* Split Card */}
      <SplitCard healthSpaceKey="socialConnections" />

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
            <BarChart {...socialInteractionsConfig} titleExtra={interactionsInfo} />
          </TabsContent>

          <TabsContent value="satisfaction">
            <BarChart {...relationshipSatisfactionConfig} titleExtra={satisfactionInfo} />
          </TabsContent>

          <TabsContent value="network">
            <BarChart {...supportNetworkConfig} titleExtra={networkInfo} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
