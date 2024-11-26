import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface SmallBarChartProps {
  title: string
  description: string
  data: Array<{ month: string; value: number }>
  value: number
  unit: string
}

export function SmallBarChart({
  title,
  description,
  data,
  value,
  unit,
}: SmallBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            {value}{unit}
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={40}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Bar
                dataKey="value"
                fill={unit === '%' ? "#22c55e" : "#ef4444"}
                barSize={30}
                label={{
                  position: 'top',
                  fill: '#888888',
                  fontSize: 12,
                  formatter: (value: number) => `${value}${unit}`,
                  dy: -10,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
