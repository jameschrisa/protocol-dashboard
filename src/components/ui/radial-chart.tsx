import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip, Legend } from 'recharts'

const data = [
  {
    name: 'Overall Health',
    value: 92,
    target: 95,
    fill: '#3b82f6',
    description: 'Composite score of all health metrics and vitals'
  },
  {
    name: 'Physical Activity',
    value: 88,
    target: 90,
    fill: '#10b981',
    description: 'Daily physical activity and exercise goals achievement'
  },
  {
    name: 'Sleep Quality',
    value: 85,
    target: 90,
    fill: '#6366f1',
    description: 'Quality and duration of sleep patterns'
  },
  {
    name: 'Nutrition',
    value: 83,
    target: 85,
    fill: '#8b5cf6',
    description: 'Dietary habits and nutritional balance'
  },
  {
    name: 'Mental Wellness',
    value: 87,
    target: 90,
    fill: '#ec4899',
    description: 'Mental health and stress management indicators'
  }
].sort((a, b) => b.value - a.value)

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border bg-card p-3 shadow-sm">
        <div className="font-medium">{data.name}</div>
        <div className="text-sm text-muted-foreground mt-1">{data.description}</div>
        <div className="mt-2 space-y-1">
          <div className="text-sm">
            Current: <span className="font-medium">{data.value}%</span>
          </div>
          <div className="text-sm">
            Target: <span className="font-medium">{data.target}%</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const style = {
  top: 0,
  right: 0,
  lineHeight: '24px',
}

export function HealthMetricsRadial() {
  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="90%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar
            background={{ fill: '#1e293b' }}
            dataKey="value"
            cornerRadius={30}
            label={{
              position: 'insideStart',
              fill: '#fff',
              formatter: (value: number) => `${value}%`,
            }}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
