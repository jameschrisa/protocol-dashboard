import { HealthMetrics } from "../types/health-types";

// Generate dates for the last 24 weeks
const generateDates = (weeks: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - (i * 7)); // Move back by weeks
    dates.push(date.toISOString());
  }
  return dates;
};

// Generate random number within a range
const randomInRange = (min: number, max: number): number => {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

// Generate trend-based random number
const generateTrendedRandom = (min: number, max: number, index: number, weeks: number): number => {
  // Create a slight trend over time
  const trend = Math.sin((index / weeks) * Math.PI * 2); // Creates a wave pattern
  const trendInfluence = 0.3; // How much the trend affects the random value
  const baseRandom = randomInRange(min, max);
  const trendValue = baseRandom + (trend * (max - min) * trendInfluence);
  
  // Ensure value stays within bounds and has 2 decimal places
  return Math.round(Math.min(Math.max(trendValue, min), max) * 100) / 100;
};

// Get week number of the month
const getWeekOfMonth = (date: Date): number => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7);
};

// Generate 24 weeks of mock health data
export const mockHealthData: HealthMetrics[] = generateDates(24).map((timestamp, index) => {
  const date = new Date(timestamp);
  const month = date.toLocaleString('default', { month: 'short' });
  const weekNum = getWeekOfMonth(date);

  return {
    timestamp,
    month,
    weekNum,
    
    // General Health
    weight: generateTrendedRandom(70, 75, index, 24), // kg
    height: 1.75, // meters (constant)
    bmi: generateTrendedRandom(22, 24, index, 24),
    bloodPressureSystolic: generateTrendedRandom(110, 130, index, 24),
    bloodPressureDiastolic: generateTrendedRandom(70, 85, index, 24),
    bloodGlucose: generateTrendedRandom(80, 120, index, 24),

    // Mental Health
    mentalHealthScore: generateTrendedRandom(0, 15, index, 24),
    stressLevel: generateTrendedRandom(1, 5, index, 24),
    sleepQualityScore: generateTrendedRandom(1, 5, index, 24),

    // Nutrition
    dailyCalories: generateTrendedRandom(1800, 2500, index, 24),
    carbohydrates: generateTrendedRandom(45, 65, index, 24), // percentage
    protein: generateTrendedRandom(20, 35, index, 24), // percentage
    fat: generateTrendedRandom(20, 35, index, 24), // percentage
    fruitsAndVegetables: generateTrendedRandom(2, 8, index, 24), // servings

    // Fitness
    stepCount: generateTrendedRandom(5000, 12000, index, 24),
    activeMinutes: generateTrendedRandom(30, 180, index, 24),
    workouts: generateTrendedRandom(0, 2, index, 24),

    // Sleep and Recovery
    sleepDuration: generateTrendedRandom(6, 9, index, 24),
    recoveryTime: generateTrendedRandom(15, 60, index, 24),

    // Social Connections
    socialInteractions: generateTrendedRandom(2, 8, index, 24),
    relationshipSatisfaction: generateTrendedRandom(1, 5, index, 24),
    supportNetworkSize: generateTrendedRandom(5, 15, index, 24),

    // Lifestyle
    productivityScore: generateTrendedRandom(1, 5, index, 24),
    taskTime: generateTrendedRandom(4, 10, index, 24), // hours
    leisureTime: generateTrendedRandom(1, 4, index, 24), // hours
  };
});

// Calculate averages for KPIs
export const calculateAverages = (data: HealthMetrics[]) => ({
  // General Health
  avgBMI: data.reduce((sum, d) => sum + d.bmi, 0) / data.length,
  avgBloodPressureSystolic: data.reduce((sum, d) => sum + d.bloodPressureSystolic, 0) / data.length,
  avgBloodPressureDiastolic: data.reduce((sum, d) => sum + d.bloodPressureDiastolic, 0) / data.length,
  avgBloodGlucose: data.reduce((sum, d) => sum + d.bloodGlucose, 0) / data.length,
  
  // Mental Health
  avgMentalHealthScore: data.reduce((sum, d) => sum + d.mentalHealthScore, 0) / data.length,
  avgStressLevel: data.reduce((sum, d) => sum + d.stressLevel, 0) / data.length,
  avgSleepQuality: data.reduce((sum, d) => sum + d.sleepQualityScore, 0) / data.length,
  
  // Nutrition
  avgDailyCalories: data.reduce((sum, d) => sum + d.dailyCalories, 0) / data.length,
  avgCarbohydrates: data.reduce((sum, d) => sum + d.carbohydrates, 0) / data.length,
  avgProtein: data.reduce((sum, d) => sum + d.protein, 0) / data.length,
  avgFat: data.reduce((sum, d) => sum + d.fat, 0) / data.length,
  avgFruitsAndVegetables: data.reduce((sum, d) => sum + d.fruitsAndVegetables, 0) / data.length,
  
  // Fitness
  avgStepCount: data.reduce((sum, d) => sum + d.stepCount, 0) / data.length,
  avgActiveMinutes: data.reduce((sum, d) => sum + d.activeMinutes, 0) / data.length,
  avgWorkouts: data.reduce((sum, d) => sum + d.workouts, 0) / data.length,
  
  // Sleep and Recovery
  avgSleepDuration: data.reduce((sum, d) => sum + d.sleepDuration, 0) / data.length,
  avgRecoveryTime: data.reduce((sum, d) => sum + d.recoveryTime, 0) / data.length,
  
  // Social
  avgSocialInteractions: data.reduce((sum, d) => sum + d.socialInteractions, 0) / data.length,
  avgRelationshipSatisfaction: data.reduce((sum, d) => sum + d.relationshipSatisfaction, 0) / data.length,
  avgSupportNetworkSize: data.reduce((sum, d) => sum + d.supportNetworkSize, 0) / data.length,
  
  // Lifestyle
  avgProductivityScore: data.reduce((sum, d) => sum + d.productivityScore, 0) / data.length,
  avgTaskTime: data.reduce((sum, d) => sum + d.taskTime, 0) / data.length,
  avgLeisureTime: data.reduce((sum, d) => sum + d.leisureTime, 0) / data.length,
});

// Export the calculated averages
export const healthMetricsAverages = calculateAverages(mockHealthData);
