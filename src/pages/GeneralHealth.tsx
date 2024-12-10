import React, { useState, useMemo } from "react";
import { Card } from "../components/ui/card";
import { AreaChart } from "../components/health/area-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Scale, Ruler, Activity, Thermometer, Info } from "lucide-react";
import { BMICategories } from "../types/health-types";
import { cn } from "../lib/utils";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import SplitCard from "../components/health/split-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { 
  generalHealthData, 
  weightChartConfig, 
  bmiChartConfig, 
  bloodPressureChartConfig, 
  bloodGlucoseChartConfig,
  type ChartConfig
} from "../data/general-health-data";

// Conversion functions
const kgToLbs = (kg: number) => kg * 2.20462;
const lbsToKg = (lbs: number) => lbs / 2.20462;

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
  const [useMetric, setUseMetric] = useState(true);
  
  // Calculate current values (using the most recent data point)
  const currentData = generalHealthData[generalHealthData.length - 1];

  // Get ratings for each metric
  const weightRating = getRating(currentData.weight, weightRanges);
  const bmiRating = getRating(currentData.bmi, BMICategories);
  const bpRating = getRating(currentData.bloodPressureSystolic, bloodPressureRanges);
  const glucoseRating = getRating(currentData.bloodGlucose, bloodGlucoseRanges);

  // Convert weight data based on selected unit
  const convertedWeightChartConfig = useMemo((): ChartConfig => {
    if (useMetric) return weightChartConfig;

    return {
      ...weightChartConfig,
      data: weightChartConfig.data.map(point => ({
        ...point,
        weight: kgToLbs(point.weight)
      })),
      series: [{ key: "weight", name: "Weight (lbs)", color: "#3B82F6" }],
      yAxisLabel: "lbs"
    };
  }, [useMetric]);

  // Get current weight in selected unit
  const displayWeight = useMetric ? 
    currentData.weight.toFixed(1) : 
    kgToLbs(currentData.weight).toFixed(1);

  const weightInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Weight Tracking</h4>
          <p className="text-sm text-muted-foreground">
            Weight is tracked over time to monitor overall health and identify trends. Available in both metric (kg) and imperial (lbs) units.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Weight Ranges:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Normal (60-75 kg / 132-165 lbs)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Under/Overweight
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Needs Attention
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const bmiInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About BMI</h4>
          <p className="text-sm text-muted-foreground">
            Body Mass Index (BMI) is a measure of body fat based on height and weight. It helps assess if someone is at a healthy weight for their height.
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">BMI Categories:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Underweight: &lt; 18.5
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Normal: 18.5-24.9
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Overweight: 25-29.9
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Obese: ≥ 30
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const bloodPressureInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Blood Pressure</h4>
          <p className="text-sm text-muted-foreground">
            Blood pressure is measured in millimeters of mercury (mmHg) and shown as two numbers: systolic (top) and diastolic (bottom).
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Categories:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Normal: &lt;120/80 mmHg
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Elevated: 120-129/&lt;80 mmHg
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                High: ≥130/80 mmHg
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Regular monitoring helps identify hypertension risks and track treatment effectiveness.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  const glucoseInfo = (
    <Popover>
      <PopoverTrigger>
        <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">About Blood Glucose</h4>
          <p className="text-sm text-muted-foreground">
            Blood glucose levels indicate the amount of sugar in your blood. Measured in milligrams per deciliter (mg/dL).
          </p>
          <div className="space-y-1">
            <h5 className="text-sm font-medium">Target Ranges:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                Normal: 70-100 mg/dL
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Pre-diabetes: 100-125 mg/dL
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Diabetes: ≥126 mg/dL
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Regular monitoring is crucial for diabetes management and prevention.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      {/* Split Card */}
      <SplitCard healthSpaceKey="generalHealth" />

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
            <span className="text-xs text-muted-foreground">
              {useMetric ? "60-90 kg" : "132-198 lbs"}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-base font-semibold text-foreground">Weight</p>
            <p className="text-2xl font-bold">{displayWeight} {useMetric ? "kg" : "lbs"}</p>
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
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="bmi">BMI</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="unit-toggle" className="text-sm">kg</Label>
              <Switch
                id="unit-toggle"
                checked={!useMetric}
                onCheckedChange={(checked) => setUseMetric(!checked)}
              />
              <Label htmlFor="unit-toggle" className="text-sm">lbs</Label>
            </div>
          </div>
          
          <TabsContent value="weight">
            <AreaChart {...convertedWeightChartConfig} titleExtra={weightInfo} />
          </TabsContent>

          <TabsContent value="bmi">
            <AreaChart {...bmiChartConfig} titleExtra={bmiInfo} />
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
            <AreaChart {...bloodPressureChartConfig} titleExtra={bloodPressureInfo} />
          </TabsContent>

          <TabsContent value="bloodGlucose">
            <AreaChart {...bloodGlucoseChartConfig} titleExtra={glucoseInfo} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
