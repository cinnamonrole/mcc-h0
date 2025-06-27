"use client"

import { useState, useEffect } from "react"
import type { UserData } from "@/lib/types"

export function useLeaderboardData() {
  const [leaderboardData, setLeaderboardData] = useState<UserData[] | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchLeaderboardData = () => {
      // Mock data
      const mockLeaderboardData: UserData[] = [
        {
          id: "1",
          name: "Alex Johnson",
          profileImage: "/placeholder.png",
          totalMeters: 450000,
          deficit: 550000,
          dailyRequired: 9167,
          dailyRequiredWithRest: 10695,
          topWorkoutType: "erg",
          workouts: [],
        },
        {
          id: "2",
          name: "Sam Williams",
          profileImage: "/placeholder.png",
          totalMeters: 420000,
          deficit: 580000,
          dailyRequired: 9667,
          dailyRequiredWithRest: 11278,
          topWorkoutType: "otw",
          workouts: [],
        },
        {
          id: "3",
          name: "Jordan Smith",
          profileImage: "/placeholder.png",
          totalMeters: 380000,
          deficit: 620000,
          dailyRequired: 10333,
          dailyRequiredWithRest: 12056,
          topWorkoutType: "run",
          workouts: [],
        },
        {
          id: "4",
          name: "Taylor Brown",
          profileImage: "/placeholder.png",
          totalMeters: 350000,
          deficit: 650000,
          dailyRequired: 10833,
          dailyRequiredWithRest: 12639,
          topWorkoutType: "erg",
          workouts: [],
        },
        {
          id: "5",
          name: "Morgan Davis",
          profileImage: "/placeholder.png",
          totalMeters: 320000,
          deficit: 680000,
          dailyRequired: 11333,
          dailyRequiredWithRest: 13222,
          topWorkoutType: "bike",
          workouts: [],
        },
        {
          id: "6",
          name: "Casey Miller",
          profileImage: "/placeholder.png",
          totalMeters: 300000,
          deficit: 700000,
          dailyRequired: 11667,
          dailyRequiredWithRest: 13611,
          topWorkoutType: "swim",
          workouts: [],
        },
        {
          id: "7",
          name: "Riley Wilson",
          profileImage: "/placeholder.png",
          totalMeters: 280000,
          deficit: 720000,
          dailyRequired: 12000,
          dailyRequiredWithRest: 14000,
          topWorkoutType: "lift",
          workouts: [],
        },
        {
          id: "8",
          name: "Jamie Garcia",
          profileImage: "/placeholder.png",
          totalMeters: 250000,
          deficit: 750000,
          dailyRequired: 12500,
          dailyRequiredWithRest: 14583,
          topWorkoutType: "erg",
          workouts: [],
        },
        {
          id: "9",
          name: "Avery Martinez",
          profileImage: "/placeholder.png",
          totalMeters: 230000,
          deficit: 770000,
          dailyRequired: 12833,
          dailyRequiredWithRest: 14972,
          topWorkoutType: "run",
          workouts: [],
        },
        {
          id: "10",
          name: "Drew Thompson",
          profileImage: "/placeholder.png",
          totalMeters: 200000,
          deficit: 800000,
          dailyRequired: 13333,
          dailyRequiredWithRest: 15556,
          topWorkoutType: "otw",
          workouts: [],
        },
      ]

      setLeaderboardData(mockLeaderboardData)
    }

    fetchLeaderboardData()
  }, [])

  return { leaderboardData }
}
