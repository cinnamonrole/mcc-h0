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
      // Mock workouts for different users
      const getMockWorkouts = (userId: string): Workout[] => {
        const baseWorkouts = [
          { id: "1", type: "erg", meters: 10000, date: new Date("2023-06-01"), image: "/placeholder.png" },
          { id: "2", type: "run", meters: 8000, date: new Date("2023-06-03"), image: "/placeholder.png" },
          { id: "3", type: "otw", meters: 12000, date: new Date("2023-06-05"), image: "/placeholder.png" },
          { id: "4", type: "erg", meters: 9000, date: new Date("2023-06-07"), image: "/placeholder.png" },
          { id: "5", type: "bike", meters: 15000, date: new Date("2023-06-09"), image: "/placeholder.png" },
          { id: "6", type: "swim", meters: 5000, date: new Date("2023-06-11"), image: "/placeholder.png" },
        ]

        // Modify workouts based on userId to make them unique
        return baseWorkouts.map((workout) => ({
          ...workout,
          id: `${userId}-${workout.id}`,
          meters: workout.meters + Number.parseInt(userId) * 100, // Vary meters slightly
        }))
      }

      // Get user data from leaderboard or create default
      let mockUserData: UserData

      if (userId && userId !== "current-user") {
        // Find user in leaderboard data
        const leaderboardUsers = [
          { id: "1", name: "Alex Johnson", totalMeters: 450000, deficit: 550000, topWorkoutType: "erg" },
          { id: "2", name: "Sam Williams", totalMeters: 420000, deficit: 580000, topWorkoutType: "otw" },
          { id: "3", name: "Jordan Smith", totalMeters: 380000, deficit: 620000, topWorkoutType: "run" },
          { id: "4", name: "Taylor Brown", totalMeters: 350000, deficit: 650000, topWorkoutType: "erg" },
          { id: "5", name: "Morgan Davis", totalMeters: 320000, deficit: 680000, topWorkoutType: "bike" },
          { id: "6", name: "Casey Miller", totalMeters: 300000, deficit: 700000, topWorkoutType: "swim" },
          { id: "7", name: "Riley Wilson", totalMeters: 280000, deficit: 720000, topWorkoutType: "lift" },
          { id: "8", name: "Jamie Garcia", totalMeters: 250000, deficit: 750000, topWorkoutType: "erg" },
          { id: "9", name: "Avery Martinez", totalMeters: 230000, deficit: 770000, topWorkoutType: "run" },
          { id: "10", name: "Drew Thompson", totalMeters: 200000, deficit: 800000, topWorkoutType: "otw" },
        ]

        const user = leaderboardUsers.find((u) => u.id === userId)
        if (user) {
          mockUserData = {
            id: user.id,
            name: user.name,
            profileImage: "/placeholder.png",
            totalMeters: user.totalMeters,
            deficit: user.deficit,
            dailyRequired: Math.ceil(user.deficit / 60),
            dailyRequiredWithRest: Math.ceil((user.deficit / 60) * 1.17),
            topWorkoutType: user.topWorkoutType,
            workouts: getMockWorkouts(user.id),
          }
        } else {
          // Fallback for unknown user
          mockUserData = {
            id: userId,
            name: "Unknown User",
            profileImage: "/placeholder.png",
            totalMeters: 100000,
            deficit: 900000,
            dailyRequired: 15000,
            dailyRequiredWithRest: 17500,
            topWorkoutType: "erg",
            workouts: getMockWorkouts(userId),
          }
        }
      } else {
        // Current user data
        mockUserData = {
          id: "current-user",
          name: "Alex Johnson",
          profileImage: "/placeholder.png",
          totalMeters: 350000,
          deficit: 650000,
          dailyRequired: 10833,
          dailyRequiredWithRest: 12639,
          topWorkoutType: "erg",
          workouts: getMockWorkouts("current-user"),
        }
      }

      // Mock progress data - vary based on user
      const mockProgressData: ProgressDataPoint[] = [
        { date: "Jun 1", meters: 10000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 2", meters: 8000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 3", meters: 12000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 4", meters: 0 },
        { date: "Jun 5", meters: 15000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 6", meters: 9000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 7", meters: 11000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 8", meters: 7000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 9", meters: 13000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 10", meters: 0 },
        { date: "Jun 11", meters: 10000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 12", meters: 12000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 13", meters: 9000 + Number.parseInt(userId || "0") * 50 },
        { date: "Jun 14", meters: 11000 + Number.parseInt(userId || "0") * 50 },
      ]

      setUserData(mockUserData)
      setProgressData(mockProgressData)
    }

    fetchUserData()
  }, [userId])

  return { userData, progressData }
}
