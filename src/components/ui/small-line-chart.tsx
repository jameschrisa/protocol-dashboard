"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface ChartData {
  month: string
  value: number
}

interface SmallLineChartProps {
  title: string
  description: string
  data: ChartData[]
  trend: {
    value: number
    direction: "up" | "down"
  }
  color: string
  valueSuffix?: string
}

export function SmallLineChart({
  title,
  description,
  data,
  trend,
  color,
  valueSuffix = "",
}: SmallLineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <XAxis 
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.month}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                              {valueSuffix}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: color,
                  strokeWidth: 2,
                  stroke: "var(--background)",
                }}
                activeDot={{
                  r: 6,
                  fill: color,
                  strokeWidth: 2,
                  stroke: "var(--background)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center">
          {trend.direction === "up" ? (
            <>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="ml-2 text-sm font-medium">
                Up by {trend.value}% this month
              </span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="ml-2 text-sm font-medium">
                Down by {trend.value}% this month
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
