"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", protein: 120, carbs: 240, fat: 60 },
  { name: "Tue", protein: 130, carbs: 220, fat: 70 },
  { name: "Wed", protein: 110, carbs: 250, fat: 65 },
  { name: "Thu", protein: 140, carbs: 230, fat: 55 },
  { name: "Fri", protein: 125, carbs: 210, fat: 75 },
  { name: "Sat", protein: 105, carbs: 260, fat: 50 },
  { name: "Sun", protein: 135, carbs: 200, fat: 80 },
]

export function MacroTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="protein" stroke="#8884d8" />
        <Line type="monotone" dataKey="carbs" stroke="#82ca9d" />
        <Line type="monotone" dataKey="fat" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}

