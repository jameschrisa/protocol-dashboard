export interface HealthCategory {
  label: string;
  min: number;
  max: number;
  color: string;
}

export interface HealthMetrics {
  timestamp: string;
  month: string;
  weekNum: number;
  
  // General Health
  weight: number;
  height: number;
  bmi: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodGlucose: number;

  // Mental Health
  mentalHealthScore: number;
  stressLevel: number;
  sleepQualityScore: number;

  // Nutrition
  dailyCalories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  fruitsAndVegetables: number;

  // Fitness
  stepCount: number;
  activeMinutes: number;
  workouts: number;

  // Sleep and Recovery
  sleepDuration: number;
  recoveryTime: number;

  // Social Connections
  socialInteractions: number;
  relationshipSatisfaction: number;
  supportNetworkSize: number;

  // Lifestyle
  productivityScore: number;
  taskTime: number;
  leisureTime: number;
}

// Categories for BMI
export const BMICategories: HealthCategory[] = [
  { label: "Underweight", min: 0, max: 18.5, color: "#F59E0B" },
  { label: "Normal", min: 18.5, max: 25, color: "#10B981" },
  { label: "Overweight", min: 25, max: 30, color: "#F59E0B" },
  { label: "Obese", min: 30, max: 100, color: "#EF4444" },
];

// Categories for Mental Health Score
export const MentalHealthCategories: HealthCategory[] = [
  { label: "Severe", min: 0, max: 5, color: "#EF4444" },
  { label: "Moderate", min: 5, max: 10, color: "#F59E0B" },
  { label: "Mild", min: 10, max: 15, color: "#10B981" },
];

// Categories for Activity Level
export const ActivityLevelCategories: HealthCategory[] = [
  { label: "Sedentary", min: 0, max: 30, color: "#EF4444" },
  { label: "Light", min: 30, max: 60, color: "#F59E0B" },
  { label: "Moderate", min: 60, max: 150, color: "#10B981" },
  { label: "Vigorous", min: 150, max: 300, color: "#3B82F6" },
];

// Categories for Sleep Quality
export const SleepQualityCategories: HealthCategory[] = [
  { label: "Poor", min: 0, max: 2, color: "#EF4444" },
  { label: "Fair", min: 2, max: 3.5, color: "#F59E0B" },
  { label: "Good", min: 3.5, max: 5, color: "#10B981" },
];

// Categories for Relationship Satisfaction
export const RelationshipSatisfactionCategories: HealthCategory[] = [
  { label: "Low", min: 0, max: 2, color: "#EF4444" },
  { label: "Moderate", min: 2, max: 3.5, color: "#F59E0B" },
  { label: "High", min: 3.5, max: 5, color: "#10B981" },
];
