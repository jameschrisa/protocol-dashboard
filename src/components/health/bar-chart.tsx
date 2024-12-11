import * as React from "react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis, Tooltip, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { ChartConfig, ChartRange, ChartSeries } from "../../types/chart-types"

interface BarChartProps extends ChartConfig {
  titleExtra?: React.ReactNode;
}

interface DataPoint {
  [key: string]: any;
  weekNum: number;
  month: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium mb-1">Week {dataPoint.weekNum}, {dataPoint.month}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.name}: {item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const getBarColor = (value: number, ranges?: ChartRange[], defaultColor?: string): string => {
  if (!ranges) return defaultColor || '#000000';
  const range = ranges.find(r => value >= r.min && value <= r.max);
  return range?.color || defaultColor || '#000000';
};

export function BarChart({ data, series, title, description, yAxisLabel, titleExtra, domain }: BarChartProps) {
  const [activeChart, setActiveChart] = 
    React.useState<string>(series[0]?.key || '')

  // Convert series to config format
  const config = React.useMemo(() => {
    const chartConfig: { [key: string]: ChartSeries } = {}
    series.forEach((s) => {
      chartConfig[s.key] = s
    })
    return chartConfig
  }, [series])

  const total = React.useMemo(
    () => {
      const totals: { [key: string]: number } = {}
      series.forEach(({ key }) => {
        totals[key] = data.reduce((acc, curr) => acc + (curr[key] || 0), 0)
      })
      return totals
    },
    [data, series]
  )

  // Calculate Y-axis domain if not provided
  const yDomain = React.useMemo(() => {
    if (domain) return domain;
    const values = data.map(d => d[activeChart]).filter(Boolean)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const padding = (max - min) * 0.1
    return [Math.floor(min - padding), Math.ceil(max + padding)]
  }, [data, activeChart, domain])

  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <div className="flex items-center gap-2">
            <CardTitle>{title}</CardTitle>
            {titleExtra}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-800">
          {series.map(({ key, name }) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative flex flex-1 flex-col justify-center gap-1 border-l first:border-l-0 px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 data-[active=true]:bg-gray-50 dark:data-[active=true]:bg-gray-800/50 transition-colors sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {name}
              </span>
              <span className="text-lg font-bold leading-none tracking-tight sm:text-2xl">
                {Math.round(total[key] / data.length).toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: yAxisLabel ? 60 : 40,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3"
                vertical
                horizontal 
                stroke="#E5E7EB"
                strokeOpacity={1}
                strokeWidth={1}
              />
              <XAxis
                dataKey="weekNum"
                tickLine={true}
                axisLine={true}
                tickMargin={12}
                interval={0}
                stroke="#9CA3AF"
                strokeWidth={1}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                height={40}
                domain={[1, 24]}
                ticks={Array.from({ length: 24 }, (_, i) => i + 1)}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                stroke="#9CA3AF"
                strokeWidth={1}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                label={yAxisLabel ? { 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft', 
                  offset: -20,
                  style: { 
                    fontSize: 12,
                    fill: '#6B7280',
                  }
                } : undefined}
                domain={yDomain}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                name={config[activeChart]?.name}
                dataKey={activeChart} 
                radius={[4, 4, 0, 0]}
                maxBarSize={16}
              >
                {data.map((entry: DataPoint, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(
                      entry[activeChart],
                      config[activeChart]?.ranges,
                      config[activeChart]?.color
                    )}
                  />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
