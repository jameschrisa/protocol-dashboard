import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { SmallBarChart } from "../components/ui/small-bar-chart"
import { SmallLineChart } from "../components/ui/small-line-chart"

const authenticationData = [
  {
    month: "Jan",
    value: 125,
  },
  {
    month: "Feb",
    value: 98,
  },
  {
    month: "Mar",
    value: 156,
  },
  {
    month: "Apr",
    value: 134,
  },
  {
    month: "May",
    value: 167,
  },
]

export default function Authentication() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Authentication</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Login Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SmallBarChart
              title="Failed Login Attempts"
              description="Last 30 days"
              data={authenticationData}
              value={167} // Latest value
              unit="" // No unit for count
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SmallLineChart
              title="Active Sessions"
              description="Real-time monitoring"
              data={authenticationData}
              trend={{
                value: 12,
                direction: "up"
              }}
              color="#10b981"
              valueSuffix=""
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
