"use client"

import { useState, useEffect } from "react"
import type { UserData, Workout } from "@/lib/types"

interface ProgressDataPoint {
  date: string
  meters: number
}

export function useUserData(userId?: string) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [progressData, setProgressData] = useState<ProgressDataPoint[] | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call with the userId
    const fetchUserData = () => {
      // Mock workouts
      const mockWorkouts: Workout[] = [
        {
          id: "1",
          type: "erg",
          meters: 10000,
          date: new Date("2023-06-01"),
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "2",
          type: "run",
          meters: 8000,
          date: new Date("2023-06-03"),
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "3",
          type: "otw",
          meters: 12000,
          date: new Date("2023-06-05"),
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "4",
          type: "erg",
          meters: 9000,
          date: new Date("2023-06-07"),
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "5",
          type: "bike",
          meters: 15000,
          date: new Date("2023-06-09"),
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "6",
          type: "swim",
          meters: 5000,
          date: new Date("2023-06-11"),
          image: "/placeholder.svg?height=300&width=300",
        },
      ]

      // Mock user data
      const mockUserData: UserData = {
        id: userId || "current-user",
        name: "Alex Johnson",
        profileImage: "/placeholder.svg?height=100&width=100",
        totalMeters: 350000,
        deficit: 650000,
        dailyRequired: 10833,
        dailyRequiredWithRest: 12639,
        topWorkoutType: "erg",
        workouts: mockWorkouts,
      }

      // Mock progress data
      const mockProgressData: ProgressDataPoint[] = [
        { date: "Jun 1", meters: 10000 },
        { date: "Jun 2", meters: 8000 },
        { date: "Jun 3", meters: 12000 },
        { date: "Jun 4", meters: 0 },
        { date: "Jun 5", meters: 15000 },
        { date: "Jun 6", meters: 9000 },
        { date: "Jun 7", meters: 11000 },
        { date: "Jun 8", meters: 7000 },
        { date: "Jun 9", meters: 13000 },
        { date: "Jun 10", meters: 0 },
        { date: "Jun 11", meters: 10000 },
        { date: "Jun 12", meters: 12000 },
        { date: "Jun 13", meters: 9000 },
        { date: "Jun 14", meters: 11000 },
      ]

      setUserData(mockUserData)
      setProgressData(mockProgressData)
    }

    fetchUserData()
  }, [userId])

  return { userData, progressData }
}
