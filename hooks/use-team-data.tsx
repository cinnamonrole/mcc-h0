"use client"

import { useState, useEffect } from "react"

interface TeamData {
  totalMeters: number
  targetMeters: number
  membersCount: number
  deficit: number
  remainingDays: number
  dailyTeamRequired: number
  dailyPersonRequired: number
  daysAheadOrBehind: number
}

interface ProgressDataPoint {
  date: string
  meters: number
  target: number
}

export function useTeamData() {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [progressData, setProgressData] = useState<ProgressDataPoint[] | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTeamData = () => {
      // Mock data
      const mockTeamData: TeamData = {
        totalMeters: 3250000,
        targetMeters: 10000000, // 10 members x 1M meters
        membersCount: 10,
        deficit: 6750000,
        remainingDays: 60,
        dailyTeamRequired: 112500,
        dailyPersonRequired: 11250,
        daysAheadOrBehind: 4,
      }

      const mockProgressData: ProgressDataPoint[] = [
        { date: "Jun 1", meters: 45000, target: 100000 },
        { date: "Jun 2", meters: 62000, target: 100000 },
        { date: "Jun 3", meters: 58000, target: 100000 },
        { date: "Jun 4", meters: 71000, target: 100000 },
        { date: "Jun 5", meters: 49000, target: 100000 },
        { date: "Jun 6", meters: 82000, target: 100000 },
        { date: "Jun 7", meters: 75000, target: 100000 },
        { date: "Jun 8", meters: 68000, target: 100000 },
        { date: "Jun 9", meters: 90000, target: 100000 },
        { date: "Jun 10", meters: 110000, target: 100000 },
        { date: "Jun 11", meters: 95000, target: 100000 },
        { date: "Jun 12", meters: 105000, target: 100000 },
        { date: "Jun 13", meters: 120000, target: 100000 },
        { date: "Jun 14", meters: 115000, target: 100000 },
      ]

      setTeamData(mockTeamData)
      setProgressData(mockProgressData)
    }

    fetchTeamData()
  }, [])

  return { teamData, progressData }
}
