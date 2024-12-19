"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "2023-06-01", weight: 70 },
  { date: "2023-06-08", weight: 69.5 },
  { date: "2023-06-15", weight: 69 },
  { date: "2023-06-22", weight: 68.7 },
  { date: "2023-06-29", weight: 68.3 },
  { date: "2023-07-06", weight: 68 },
  { date: "2023-07-13", weight: 67.8 },
]

export function WeightTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

