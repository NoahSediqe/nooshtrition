"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", calories: 1800 },
  { name: "Tue", calories: 2000 },
  { name: "Wed", calories: 1900 },
  { name: "Thu", calories: 2200 },
  { name: "Fri", calories: 2100 },
  { name: "Sat", calories: 1700 },
  { name: "Sun", calories: 1600 },
]

export function DailyIntakeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Calorie Intake</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="calories" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

