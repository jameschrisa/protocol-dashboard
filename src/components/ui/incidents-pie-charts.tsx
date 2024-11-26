import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Label, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { useState, useMemo } from "react"
import { IncidentRecord } from "../../data/incidents-data"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { Props } from "recharts/types/component/Label"

interface IncidentsPieChartsProps {
  data: IncidentRecord[]
}

export function IncidentsPieCharts({ data }: IncidentsPieChartsProps) {
  // Calculate incident type distribution
  const typeData = [
    {
      name: "Operational",
      value: data.filter(i => i.type === 'operational').length,
      fill: "hsl(var(--chart-1))"
    },
    {
      name: "Mechanical",
      value: data.filter(i => i.type === 'mechanical').length,
      fill: "hsl(var(--chart-2))"
    },
    {
      name: "Control",
      value: data.filter(i => i.type === 'control').length,
      fill: "hsl(var(--chart-3))"
    },
    {
      name: "Environmental",
      value: data.filter(i => i.type === 'environmental').length,
      fill: "hsl(var(--chart-4))"
    }
  ].map(item => ({
    ...item,
    count: item.value,
    percentage: Math.round((item.value / data.length) * 100)
  }))

  // Calculate severity distribution
  const severityData = [
    {
      name: "Critical",
      value: data.filter(i => i.severity === 'critical').length,
      fill: "hsl(var(--critical))"
    },
    {
      name: "High",
      value: data.filter(i => i.severity === 'high').length,
      fill: "hsl(var(--high))"
    },
    {
      name: "Medium",
      value: data.filter(i => i.severity === 'medium').length,
      fill: "hsl(var(--medium))"
    },
    {
      name: "Low",
      value: data.filter(i => i.severity === 'low').length,
      fill: "hsl(var(--low))"
    }
  ].map(item => ({
    ...item,
    count: item.value,
    percentage: Math.round((item.value / data.length) * 100)
  }))

  // Calculate downtime causes distribution
  const totalDowntimeMinutes = data.reduce((sum, incident) => sum + incident.duration, 0)
  const downtimeData = [
    {
      name: "Maintenance",
      value: data.filter(i => i.downtimeCause === 'maintenance')
        .reduce((sum, incident) => sum + incident.duration, 0),
      fill: "hsl(var(--chart-5))"
    },
    {
      name: "Mechanical Failure",
      value: data.filter(i => i.downtimeCause === 'mechanical failure')
        .reduce((sum, incident) => sum + incident.duration, 0),
      fill: "hsl(var(--chart-6))"
    },
    {
      name: "Electrical Issue",
      value: data.filter(i => i.downtimeCause === 'electrical issue')
        .reduce((sum, incident) => sum + incident.duration, 0),
      fill: "hsl(var(--chart-7))"
    }
  ].map(item => ({
    ...item,
    count: Math.round(item.value / 60), // Convert minutes to hours
    percentage: Math.round((item.value / totalDowntimeMinutes) * 100)
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: data.fill }}
              />
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Count: {data.count} {data.count === 1 ? 'hour' : 'hours'}
              </span>
              <span className="text-sm text-muted-foreground">
                Percentage: {data.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  function PieChartCard({
    title,
    description,
    data,
    valueLabel,
  }: {
    title: string
    description: string
    data: Array<{ name: string; value: number; count: number; fill: string; percentage: number }>
    valueLabel: string
  }) {
    const [activeItem, setActiveItem] = useState(data[0].name)

    const activeIndex = useMemo(
      () => data.findIndex((item) => item.name === activeItem),
      [activeItem, data]
    )

    return (
      <Card>
        <CardHeader className="space-y-0 pb-2">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="pt-2">
            <Select value={activeItem} onValueChange={setActiveItem}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem
                    key={item.name}
                    value={item.name}
                    className="relative flex items-center px-2 py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  stroke="none"
                  activeIndex={activeIndex}
                  activeShape={({
                    cx,
                    cy,
                    innerRadius,
                    outerRadius = 0,
                    startAngle,
                    endAngle,
                    fill,
                  }: PieSectorDataItem) => (
                    <g>
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius + 8}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                      />
                      <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 10}
                        outerRadius={outerRadius + 15}
                        fill={fill}
                      />
                    </g>
                  )}
                >
                  <Label
                    content={(props: Props) => {
                      if (!props.viewBox) return null
                      const { cx = 0, cy = 0 } = props.viewBox as { cx: number; cy: number }
                      const activeData = data[activeIndex]

                      return (
                        <g>
                          <text
                            x={cx}
                            y={cy - 10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-foreground font-bold"
                            style={{ fontSize: 24 }}
                          >
                            {activeData.percentage}%
                          </text>
                          <text
                            x={cx}
                            y={cy + 15}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-muted-foreground"
                            style={{ fontSize: 14 }}
                          >
                            {activeData.count} {valueLabel}
                          </text>
                        </g>
                      )
                    }}
                  />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <PieChartCard
        title="Incident Type Distribution"
        description="Distribution of incidents by category"
        data={typeData}
        valueLabel="incidents"
      />
      <PieChartCard
        title="Incident Severity Distribution"
        description="Distribution of incidents by severity level"
        data={severityData}
        valueLabel="incidents"
      />
      <PieChartCard
        title="Downtime Causes"
        description="Percentage of downtime hours by cause"
        data={downtimeData}
        valueLabel="hours"
      />
    </div>
  )
}
