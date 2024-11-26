import React from "react";
import { Card } from "../ui/card";
import { HealthCategory } from "../../types/health-types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface GaugeChartProps {
  value: number;
  categories: HealthCategory[];
  title: string;
  unit?: string;
  decimals?: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  categories,
  title,
  unit = "",
  decimals = 1,
}) => {
  const min = categories[0].min;
  const max = categories[categories.length - 1].max;
  const range = max - min;

  // Find the current category based on the value
  const currentCategory = categories.find(
    (cat) => value >= cat.min && value <= cat.max
  );

  // Calculate percentage for the gauge
  const percentage = ((value - min) / range) * 100;

  // Format the display value
  const formattedValue = value.toFixed(decimals);

  // Create data for the semi-circle gauge
  const gaugeData = [
    { value: percentage },
    { value: 100 - percentage }, // Background
  ];

  return (
    <Card className="p-3 h-[240px] flex flex-col bg-white dark:bg-gray-900">
      <div className="text-center mb-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formattedValue}
          </span>
          {unit && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {unit}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentCategory?.label || ""}
        </span>
      </div>
      
      <div className="flex-1 flex items-end justify-center">
        <div className="w-[200px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="90%"
                startAngle={180}
                endAngle={0}
                innerRadius={55}
                outerRadius={85}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={currentCategory?.color || "#94A3B8"} />
                <Cell className="fill-gray-100 dark:fill-gray-800" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
