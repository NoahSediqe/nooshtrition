"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MacroTrackingDashboard() {
  const macros = [
    { name: "Calories", current: 1500, goal: 2000, color: "bg-blue-500" },
    { name: "Protein", current: 75, goal: 120, color: "bg-red-500" },
    { name: "Carbs", current: 150, goal: 250, color: "bg-green-500" },
    { name: "Fats", current: 50, goal: 65, color: "bg-yellow-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Macro Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {macros.map((macro) => (
            <div key={macro.name} className="flex items-center">
              <div className="w-24 font-semibold">{macro.name}</div>
              <div className="flex-1">
                <Progress
                  value={(macro.current / macro.goal) * 100}
                  className={macro.color}
                />
              </div>
              <div className="w-24 text-right">
                {macro.current} / {macro.goal}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

