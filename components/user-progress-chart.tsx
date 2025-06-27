"use client"

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useUserData } from "@/hooks/use-user-data"

export function UserProgressChart() {
  const { progressData } = useUserData()

  if (!progressData || progressData.length === 0) {
    return <div>Loading chart data...</div>
  }

  const maxMeters = Math.max(...progressData.map((d) => d.meters)) * 1.1

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, maxMeters]} />
          <Tooltip />
          <Bar dataKey="meters" name="Daily Meters" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
