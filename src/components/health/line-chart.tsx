import React from "react";
import { Card } from "../ui/card";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  timestamp: string;
  [key: string]: number | string;
}

interface LineSeriesConfig {
  key: string;
  color: string;
  name: string;
}

interface LineChartProps {
  data: DataPoint[];
  series: LineSeriesConfig[];
  title: string;
  yAxisLabel?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  title,
  yAxisLabel,
}) => {
  // Format date for x-axis
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <Card className="p-4 h-[300px]">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              interval="preserveEnd"
            />
            <YAxis label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} />
            <Tooltip
              labelFormatter={(label) => formatDate(label as string)}
            />
            <Legend />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                dot={false}
                activeDot={{ r: 8 }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
