import { Card } from "../components/ui/card";
import { cn } from "../lib/utils";
import { 
  Scale, 
  Ruler, 
  Activity, 
  Thermometer,
  Moon,
  Brain,
  Utensils,
  Dumbbell,
  Users,
  Heart
} from "lucide-react";

// Import data from all health pages
import { generalHealthData } from "../data/general-health-data";
import { sleepData } from "../data/sleep-data";
import { mentalHealthData } from "../data/mental-health-data";
import { nutritionData } from "../data/nutrition-data";
import { fitnessData } from "../data/fitness-data";
import { socialData } from "../data/social-data";
import { BMICategories } from "../types/health-types";

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

const sleepDurationRanges = [
  { min: 0, max: 6, label: "Low", color: "#EF4444" },
  { min: 6, max: 7, label: "Moderate", color: "#F59E0B" },
  { min: 7, max: 12, label: "Good", color: "#10B981" },
];

const mentalHealthRanges = [
  { min: 0, max: 5, label: "Low", color: "#EF4444" },
  { min: 5, max: 10, label: "Moderate", color: "#F59E0B" },
  { min: 10, max: 15, label: "Good", color: "#10B981" },
];

const calorieRanges = [
  { min: 0, max: 1800, label: "Low", color: "#F59E0B" },
  { min: 1800, max: 2500, label: "Normal", color: "#10B981" },
  { min: 2500, max: 5000, label: "High", color: "#EF4444" },
];

const stepRanges = [
  { min: 0, max: 5000, label: "Low", color: "#EF4444" },
  { min: 5000, max: 7500, label: "Moderate", color: "#F59E0B" },
  { min: 7500, max: 20000, label: "High", color: "#10B981" },
];

const socialInteractionRanges = [
  { min: 0, max: 3, label: "Low", color: "#EF4444" },
  { min: 3, max: 5, label: "Moderate", color: "#F59E0B" },
  { min: 5, max: 10, label: "High", color: "#10B981" },
];

export default function Home() {
  // Get latest data points
  const generalHealth = generalHealthData[generalHealthData.length - 1];
  const sleep = sleepData[sleepData.length - 1];
  const mentalHealth = mentalHealthData[mentalHealthData.length - 1];
  const nutrition = nutritionData[nutritionData.length - 1];
  const fitness = fitnessData[fitnessData.length - 1];
  const social = socialData[socialData.length - 1];

  // Calculate ratings
  const weightRating = getRating(generalHealth.weight, weightRanges);
  const bmiRating = getRating(generalHealth.bmi, BMICategories);
  const bpRating = getRating(generalHealth.bloodPressureSystolic, bloodPressureRanges);
  const glucoseRating = getRating(generalHealth.bloodGlucose, bloodGlucoseRanges);
  const sleepRating = getRating(sleep.sleepDuration, sleepDurationRanges);
  const mentalRating = getRating(mentalHealth.mentalHealthScore, mentalHealthRanges);
  const calorieRating = getRating(nutrition.dailyCalories, calorieRanges);
  const stepRating = getRating(fitness.stepCount, stepRanges);
  const socialRating = getRating(social.socialInteractions, socialInteractionRanges);

  const kpis = [
    {
      title: "Weight",
      value: `${generalHealth.weight.toFixed(1)} kg`,
      description: "60-90 kg",
      icon: Scale,
      rating: weightRating
    },
    {
      title: "BMI",
      value: generalHealth.bmi.toFixed(1),
      description: "18.5-25",
      icon: Ruler,
      rating: bmiRating
    },
    {
      title: "Blood Pressure",
      value: `${generalHealth.bloodPressureSystolic}/${generalHealth.bloodPressureDiastolic}`,
      description: "90-120/60-80",
      icon: Activity,
      rating: bpRating
    },
    {
      title: "Blood Glucose",
      value: `${generalHealth.bloodGlucose.toFixed(1)} mg/dL`,
      description: "70-140 mg/dL",
      icon: Thermometer,
      rating: glucoseRating
    },
    {
      title: "Sleep Duration",
      value: `${sleep.sleepDuration.toFixed(1)} hrs`,
      description: "7-9 hours",
      icon: Moon,
      rating: sleepRating
    },
    {
      title: "Mental Health",
      value: mentalHealth.mentalHealthScore.toFixed(1),
      description: "0-15 score",
      icon: Brain,
      rating: mentalRating
    },
    {
      title: "Daily Calories",
      value: `${nutrition.dailyCalories.toFixed(0)}`,
      description: "1800-2500 cal",
      icon: Utensils,
      rating: calorieRating
    },
    {
      title: "Daily Steps",
      value: `${fitness.stepCount.toLocaleString()}`,
      description: "5000-10000 steps",
      icon: Dumbbell,
      rating: stepRating
    },
    {
      title: "Social Interactions",
      value: social.socialInteractions.toFixed(0),
      description: "Weekly count",
      icon: Users,
      rating: socialRating
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Heart className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold">Health Overview</h1>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="p-4">
            <div className="flex items-center justify-between">
              <div className={cn(
                "p-2 rounded-full",
                "ring-2 ring-offset-2",
                `ring-[${kpi.rating.color}]`,
                "ring-offset-background"
              )} style={{ backgroundColor: `${kpi.rating.color}10` }}>
                <kpi.icon className="h-4 w-4" style={{ color: kpi.rating.color }} />
              </div>
              <span className="text-xs text-muted-foreground">{kpi.description}</span>
            </div>
            <div className="mt-3">
              <p className="text-base font-semibold text-foreground">{kpi.title}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </div>
            <div className="mt-2 flex items-center justify-end space-x-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: kpi.rating.color }} />
              <span className="text-xs font-medium" style={{ color: kpi.rating.color }}>{kpi.rating.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
