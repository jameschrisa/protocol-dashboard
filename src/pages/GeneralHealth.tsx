import React from "react";
import { Card } from "../components/ui/card";
import { AreaChart } from "../components/health/area-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Scale, Ruler, Activity, Thermometer } from "lucide-react";
import { BMICategories } from "../types/health-types";
import { cn } from "../lib/utils";
import { 
  generalHealthData, 
  weightChartConfig, 
  bmiChartConfig, 
  bloodPressureChartConfig, 
  bloodGlucoseChartConfig 
} from "../data/general-health-data";

// Helper function to get rating based on value and ranges
const getRating = (value: number, ranges: { min: number; max: number; label: string; color: string }[]) => {
  const category = ranges.find(r => value >= r.min && value <= r.max);
  return category || { label: "Unknown", color: "#94A3B8" };
};

// Define ranges for each metric
const weightRanges = [
  { min: 0, max: 60, label: "Underweight", color: "#F59E0B" },
  { min: 60, max: 75, label: "Normal", color: "#10B981" },
  { min: 75, max: 90, label: "Overweight", color: "#F59E0B" },
  { min: 90, max: 1000, label: "Obese", color: "#EF4444" },
];

const bloodPressureRanges = [
  { min: 0, max: 90, label: "Low", color: "#F59E0B" },
  { min: 90, max: 120, label: "Normal", color: "#10B981" },
  { min: 120, max: 140, label: "Elevated", color: "#F59E0B" },
  { min: 140, max: 300, label: "High", color: "#EF4444" },
];

const bloodGlucoseRanges = [
  { min: 0, max: 70, label: "Low", color: "#F59E0B" },
  { min: 70, max: 100, label: "Normal", color: "#10B981" },
  { min: 100, max: 125, label: "Elevated", color: "#F59E0B" },
  { min: 125, max: 1000, label: "High", color: "#EF4444" },
];

export const GeneralHealth = () => {
  // Calculate current values (using the most recent data point)
  const currentData = generalHealthData[generalHealthData.length - 1];

  // Get ratings for each metric
  const weightRating = getRating(currentData.weight, weightRanges);
  const bmiRating = getRating(currentData.bmi, BMICategories);
  const bpRating = getRating(currentData.bloodPressureSystolic, bloodPressureRanges);
  const glucoseRating = getRating(currentData.bloodGlucose, bloodGlucoseRanges);

  return (
    <div className="space-y-4">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${weightRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${weightRating.color}10` }}>
              <Scale className="h-4 w-4" style={{ color: weightRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">60-90 kg</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Weight</p>
            <p className="text-2xl font-bold">{currentData.weight.toFixed(1)} kg</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: weightRating.color }} />
            <span className="text-xs font-medium" style={{ color: weightRating.color }}>{weightRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${bmiRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${bmiRating.color}10` }}>
              <Ruler className="h-4 w-4" style={{ color: bmiRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">18.5-25</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">BMI</p>
            <p className="text-2xl font-bold">{currentData.bmi.toFixed(1)}</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: bmiRating.color }} />
            <span className="text-xs font-medium" style={{ color: bmiRating.color }}>{bmiRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${bpRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${bpRating.color}10` }}>
              <Activity className="h-4 w-4" style={{ color: bpRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">90-120/60-80</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Blood Pressure</p>
            <p className="text-2xl font-bold">
              {currentData.bloodPressureSystolic}/{currentData.bloodPressureDiastolic}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: bpRating.color }} />
            <span className="text-xs font-medium" style={{ color: bpRating.color }}>{bpRating.label}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-2 rounded-full",
              "ring-2 ring-offset-2",
              `ring-[${glucoseRating.color}]`,
              "ring-offset-background"
            )} style={{ backgroundColor: `${glucoseRating.color}10` }}>
              <Thermometer className="h-4 w-4" style={{ color: glucoseRating.color }} />
            </div>
            <span className="text-xs text-muted-foreground">70-140 mg/dL</span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Blood Glucose</p>
            <p className="text-2xl font-bold">{currentData.bloodGlucose.toFixed(1)} mg/dL</p>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: glucoseRating.color }} />
            <span className="text-xs font-medium" style={{ color: glucoseRating.color }}>{glucoseRating.label}</span>
          </div>
        </Card>
      </div>

      {/* Weight and BMI Trend Charts */}
      <Card className="p-6">
        <Tabs defaultValue="weight" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="bmi">BMI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight">
            <AreaChart {...weightChartConfig} />
          </TabsContent>

          <TabsContent value="bmi">
            <AreaChart {...bmiChartConfig} />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Blood Pressure and Glucose Trend Charts */}
      <Card className="p-6">
        <Tabs defaultValue="bloodPressure" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
            <TabsTrigger value="bloodGlucose">Blood Glucose</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bloodPressure">
            <AreaChart {...bloodPressureChartConfig} />
          </TabsContent>

          <TabsContent value="bloodGlucose">
            <AreaChart {...bloodGlucoseChartConfig} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
