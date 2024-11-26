import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Chart } from "../ui/chart"
import type { EChartsOption } from 'echarts'

// Generate 20 dates from current date backwards
const generateDates = () => {
  const dates = []
  const today = new Date()
  for (let i = 19; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
}

const dates = generateDates()

const data = {
  flareVolume: dates.map(date => ({
    date,
    value: Math.floor(Math.random() * (1800 - 1200) + 1200) // Random between 1200-1800
  })),
  gasRecovery: dates.map(date => ({
    date,
    value: Math.floor(Math.random() * (98 - 88) + 88) // Random between 88-98
  }))
}

const chartConfig = {
  flareVolume: {
    label: "Total Flare Gas Volume",
    color: "#ef4444",
    unit: "MMSCFD"
  },
  gasRecovery: {
    label: "Gas Recovery Performance",
    color: "#22c55e",
    unit: "%"
  }
}

export function TrendsChart() {
  const [activeMetric, setActiveMetric] = React.useState<"flareVolume" | "gasRecovery">("flareVolume")

  const chartData = data[activeMetric]

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const date = params[0].name
        const value = params[0].value
        return `
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm">${date}</span>
              <span class="text-sm font-bold">${value}${chartConfig[activeMetric].unit}</span>
            </div>
          </div>
        `
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.date),
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: 45,
        formatter: (value: string) => {
          const date = new Date(value)
          return `${date.getMonth() + 1}/${date.getDate()}`
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      }
    },
    series: [
      {
        name: chartConfig[activeMetric].label,
        type: 'bar',
        data: chartData.map(item => item.value),
        itemStyle: {
          color: chartConfig[activeMetric].color
        },
        barWidth: '60%',
        label: {
          show: false
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>
              Flare system performance metrics over time
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            {[
              { key: "flareVolume", label: "Total Flare Gas Volume" },
              { key: "gasRecovery", label: "Gas Recovery Performance" },
            ].map((metric) => (
              <Button
                key={metric.key}
                variant={activeMetric === metric.key ? "default" : "outline"}
                onClick={() => setActiveMetric(metric.key as typeof activeMetric)}
                className="min-w-[200px] whitespace-nowrap"
              >
                {metric.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <Chart
            option={option}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
