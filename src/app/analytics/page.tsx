import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MacroTrendChart } from "@/components/macro-trend-chart"
import { WeightTrendChart } from "@/components/weight-trend-chart"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Macro Nutrient Trends</CardTitle>
          <CardDescription>Your macro intake over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <MacroTrendChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
          <CardDescription>Your weight changes over time</CardDescription>
        </CardHeader>
        <CardContent>
          <WeightTrendChart />
        </CardContent>
      </Card>
    </div>
  )
}

