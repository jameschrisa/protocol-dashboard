import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip, Legend } from 'recharts'

const data = [
  {
    name: 'Flare Efficiency',
    value: 96,
    target: 98,
    fill: '#3b82f6',
    description: 'Measures the completeness of combustion in the flare system'
  },
  {
    name: 'Flare Uptime',
    value: 98,
    target: 99,
    fill: '#10b981',
    description: 'Percentage of time the flare system is operational and available'
  },
  {
    name: 'Emissions Compliance',
    value: 94,
    target: 95,
    fill: '#6366f1',
    description: 'Adherence to environmental emissions standards and regulations'
  },
  {
    name: 'Flow Rate Utilization',
    value: 92,
    target: 95,
    fill: '#8b5cf6',
    description: 'Efficiency of gas flow management through the flare system'
  },
  {
    name: 'Flare Availability',
    value: 97,
    target: 98,
    fill: '#ec4899',
    description: 'System readiness for emergency and routine flaring operations'
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

export function FlareAnalysisRadial() {
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
