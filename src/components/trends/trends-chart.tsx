import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

const dates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)
  return date.toISOString().split('T')[0]
}).reverse()

const data = {
  healthMetrics: dates.map(date => ({
    date,
    value: Math.floor(Math.random() * 20) + 80
  })),
  wellnessScore: dates.map(date => ({
    date,
    value: Math.floor(Math.random() * 15) + 85
  }))
}

const chartConfig = {
  healthMetrics: {
    label: "Health Metrics Score",
    color: "#3b82f6"
  },
  wellnessScore: {
    label: "Wellness Index",
    color: "#10b981"
  }
}

export function TrendsChart() {
  const [activeMetric, setActiveMetric] = React.useState<"healthMetrics" | "wellnessScore">("healthMetrics")

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h2 className="text-lg font-semibold">Health Trends Analysis</h2>
          <div className="flex gap-2">
            {[
              { key: "healthMetrics", label: "Health Metrics Score" },
              { key: "wellnessScore", label: "Wellness Index" },
            ].map(metric => (
              <Button
                key={metric.key}
                variant={activeMetric === metric.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMetric(metric.key as typeof activeMetric)}
              >
                {metric.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data[activeMetric]}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [`${value}%`, chartConfig[activeMetric].label]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartConfig[activeMetric].color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
