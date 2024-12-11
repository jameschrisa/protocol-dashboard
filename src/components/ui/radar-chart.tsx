import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function FlareAnalysisRadar() {
  const data = [
    {
      metric: "Flare Efficiency",
      value: 96,
      target: 98,
      fullMark: 100,
    },
    {
      metric: "Flare Uptime",
      value: 98,
      target: 99,
      fullMark: 100,
    },
    {
      metric: "Emissions Compliance",
      value: 94,
      target: 95,
      fullMark: 100,
    },
    {
      metric: "Flow Rate Utilization",
      value: 92,
      target: 95,
      fullMark: 100,
    },
    {
      metric: "Flare Availability",
      value: 97,
      target: 98,
      fullMark: 100,
    },
  ]

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#94a3b8' }}
          />
          <Radar
            name="Current Performance"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Radar
            name="Target Performance"
            dataKey="target"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
