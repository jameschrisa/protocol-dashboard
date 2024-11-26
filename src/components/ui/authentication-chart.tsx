import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AuthenticationChartProps {
  title: string
  data: Array<{
    name: string
    attempts: number
    success: number
  }>
}

export function AuthenticationChart({ title, data }: AuthenticationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attempts"
                stroke="#ef4444"
                name="Failed Attempts"
              />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#10b981"
                name="Successful Logins"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
