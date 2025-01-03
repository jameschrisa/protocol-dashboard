import { useMemo } from "react";
import { Card } from "../components/ui/card";
import { GaugeChart } from "../components/health/gauge-chart";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { healthMetricsAverages } from "../data/health-data";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

// Blue Zone score categories
const blueZoneCategories = [
  { min: 0, max: 40, label: "Needs Improvement", color: "#ef4444" },
  { min: 40, max: 60, label: "Fair", color: "#f97316" },
  { min: 60, max: 80, label: "Good", color: "#22c55e" },
  { min: 80, max: 100, label: "Excellent", color: "#3b82f6" },
];

// Biological age categories
const bioAgeCategories = [
  { min: -20, max: -10, label: "Much Younger", color: "#3b82f6" },
  { min: -10, max: -5, label: "Younger", color: "#22c55e" },
  { min: -5, max: 0, label: "Slightly Younger", color: "#84cc16" },
  { min: 0, max: 5, label: "Slightly Older", color: "#f97316" },
  { min: 5, max: 20, label: "Older", color: "#ef4444" },
];

// Wellness score categories
const wellnessCategories = [
  { min: 0, max: 40, label: "Low", color: "#ef4444" },
  { min: 40, max: 60, label: "Moderate", color: "#f97316" },
  { min: 60, max: 80, label: "High", color: "#22c55e" },
  { min: 80, max: 100, label: "Optimal", color: "#3b82f6" },
];

export const LongevityIndex = () => {
  // Calculate Blue Zone scores for each domain
  const blueZoneScores = useMemo(() => {
    const dietScore = (
      (healthMetricsAverages.avgFruitsAndVegetables / 8) * 100 * 0.4 +
      (1 - Math.abs(0.5 - healthMetricsAverages.avgProtein / 100)) * 100 * 0.3 +
      (1 - Math.abs(0.3 - healthMetricsAverages.avgFat / 100)) * 100 * 0.3
    );

    const physicalScore = (
      (healthMetricsAverages.avgStepCount / 10000) * 100 * 0.4 +
      (healthMetricsAverages.avgActiveMinutes / 150) * 100 * 0.6
    );

    const socialScore = (
      (healthMetricsAverages.avgSocialInteractions / 7) * 100 * 0.4 +
      (healthMetricsAverages.avgRelationshipSatisfaction / 5) * 100 * 0.3 +
      (healthMetricsAverages.avgSupportNetworkSize / 12) * 100 * 0.3
    );

    const mentalScore = (
      (1 - healthMetricsAverages.avgStressLevel / 5) * 100 * 0.5 +
      (healthMetricsAverages.avgProductivityScore / 5) * 100 * 0.5
    );

    const sleepScore = (
      (healthMetricsAverages.avgSleepDuration / 8) * 100 * 0.6 +
      (healthMetricsAverages.avgSleepQuality / 5) * 100 * 0.4
    );

    return {
      diet: Math.min(100, Math.max(0, dietScore)),
      physical: Math.min(100, Math.max(0, physicalScore)),
      social: Math.min(100, Math.max(0, socialScore)),
      mental: Math.min(100, Math.max(0, mentalScore)),
      sleep: Math.min(100, Math.max(0, sleepScore))
    };
  }, []);

  // Calculate overall Blue Zone score
  const overallScore = useMemo(() => {
    return Math.round(
      (blueZoneScores.diet * 0.25 +
      blueZoneScores.physical * 0.25 +
      blueZoneScores.social * 0.2 +
      blueZoneScores.mental * 0.15 +
      blueZoneScores.sleep * 0.15)
    );
  }, [blueZoneScores]);

  // Calculate Wellness Score
  const wellnessScore = useMemo(() => {
    return Math.round(
      (blueZoneScores.physical * 0.3 + // Physical activity
      blueZoneScores.diet * 0.3 +     // Nutrition
      blueZoneScores.sleep * 0.2 +    // Sleep
      blueZoneScores.mental * 0.2)    // Stress management (from mental score)
    );
  }, [blueZoneScores]);

  // Calculate biological age difference based on overall score
  const bioAgeDiff = useMemo(() => {
    const healthFactor = (overallScore - 50) / 10;
    return Math.round(-healthFactor * 2); // Convert score to years difference
  }, [overallScore]);

  // Prepare radar chart data
  const radarData = [
    { metric: "Diet & Nutrition", value: blueZoneScores.diet, fullMark: 100 },
    { metric: "Physical Activity", value: blueZoneScores.physical, fullMark: 100 },
    { metric: "Social Connections", value: blueZoneScores.social, fullMark: 100 },
    { metric: "Mental Wellbeing", value: blueZoneScores.mental, fullMark: 100 },
    { metric: "Sleep Quality", value: blueZoneScores.sleep, fullMark: 100 },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Longevity Index</h1>
          <Popover>
            <PopoverTrigger>
              <Info className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">About Longevity Index</h4>
                <p className="text-sm text-muted-foreground">
                  The Longevity Index is a comprehensive measure of your overall health and lifestyle factors that contribute to longevity. It's inspired by the principles of <a href="https://protocolhealthmed.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Blue Zones</a>, regions where people live the longest, healthiest lives.
                </p>
                <p className="text-sm text-muted-foreground">
                  Your score is calculated based on five key factors:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Diet & Nutrition (25%)</li>
                  <li>Physical Activity (25%)</li>
                  <li>Social Connections (20%)</li>
                  <li>Mental Wellbeing (15%)</li>
                  <li>Sleep Quality (15%)</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GaugeChart
          value={overallScore}
          categories={blueZoneCategories}
          title="Blue Zone Score"
          unit="%"
        />
        <GaugeChart
          value={bioAgeDiff}
          categories={bioAgeCategories}
          title="Biological Age Difference"
          unit=" years"
        />
        <GaugeChart
          value={wellnessScore}
          categories={wellnessCategories}
          title="Wellness Score"
          unit="%"
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Blue Zone Factors Analysis</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: '#94a3b8' }}
              />
              <Radar
                name="Your Score"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Object.entries(blueZoneScores).map(([key, value]) => (
          <Card key={key} className="p-4">
            <h3 className="text-lg font-semibold capitalize mb-2">{key} Score</h3>
            <div className="flex items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium">{Math.round(value)}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LongevityIndex;
