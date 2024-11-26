// Interface for base data point
export interface BaseDataPoint {
  timestamp: string;
  month: string;
  weekNum: number;
}

// Interface for chart configuration
export interface ChartConfig {
  data: BaseDataPoint[];
  series: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  title: string;
  yAxisLabel?: string;
}

// Generate dates for the last N weeks
export const generateDates = (weeks: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  // Start from N weeks ago
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - ((weeks - 1) * 7));
  
  // Generate dates in ascending order
  for (let i = 0; i < weeks; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + (i * 7));
    dates.push(date.toISOString());
  }
  return dates;
};

// Generate random number within a range
export const randomInRange = (min: number, max: number): number => {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

// Generate trend-based random number
export const generateTrendedRandom = (min: number, max: number, index: number, weeks: number): number => {
  // Create a slight trend over time
  const trend = Math.sin((index / weeks) * Math.PI * 2);
  const trendInfluence = 0.3;
  const baseRandom = randomInRange(min, max);
  const trendValue = baseRandom + (trend * (max - min) * trendInfluence);
  
  // Ensure value stays within bounds and has 2 decimal places
  return Math.round(Math.min(Math.max(trendValue, min), max) * 100) / 100;
};

// Function to create base data point
export const createBaseDataPoint = (timestamp: string, index: number): BaseDataPoint => {
  const date = new Date(timestamp);
  return {
    timestamp,
    month: date.toLocaleString('default', { month: 'short' }),
    weekNum: index + 1, // Ensure week numbers are sequential from 1 to 24
  };
};
