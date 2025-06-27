"use client"

import { useState, useEffect } from "react"
import type { WorkoutType } from "@/lib/types"

interface RecentWorkout {
  id: string
  userName: string
  userProfileImage: string
  type: WorkoutType
  meters: number
  date: Date
  image?: string
  notes?: string
}

export function useRecentWorkouts() {
  const [recentWorkouts, setRecentWorkouts] = useState<RecentWorkout[] | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRecentWorkouts = () => {
      // Mock data for recent workouts
      const mockRecentWorkouts: RecentWorkout[] = [
        {
          id: "1",
          userName: "Sean Murphy",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "erg",
          meters: 5000,
          date: new Date("2024-06-23T08:30:00"),
          image: "/placeholder.svg?height=200&width=300",
          notes: "Great morning session! Felt strong throughout.",
        },
        {
          id: "2",
          userName: "Alex Johnson",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "run",
          meters: 8000,
          date: new Date("2024-06-23T07:15:00"),
          image: "/placeholder.svg?height=200&width=300",
          notes: "Beautiful sunrise run along the river.",
        },
        {
          id: "3",
          userName: "Jordan Smith",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "otw",
          meters: 12000,
          date: new Date("2024-06-22T18:45:00"),
          image: "/placeholder.svg?height=200&width=300",
          notes: "Perfect conditions on the water today!",
        },
        {
          id: "4",
          userName: "Taylor Brown",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "bike",
          meters: 15000,
          date: new Date("2024-06-22T16:20:00"),
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "5",
          userName: "Morgan Davis",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "swim",
          meters: 3000,
          date: new Date("2024-06-22T14:10:00"),
          image: "/placeholder.svg?height=200&width=300",
          notes: "Pool session - working on technique.",
        },
        {
          id: "6",
          userName: "Casey Miller",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "lift",
          meters: 25000,
          date: new Date("2024-06-22T12:00:00"),
          image: "/placeholder.svg?height=200&width=300",
          notes: "Strength training day - 5 lifts completed.",
        },
        {
          id: "7",
          userName: "Riley Wilson",
          userProfileImage: "/placeholder.svg?height=100&width=100",
          type: "erg",
          meters: 7500,
          date: new Date("2024-06-22T09:30:00"),
          image: "/placeholder.svg?height=200&width=300",
        },
      ]

      setRecentWorkouts(mockRecentWorkouts)
    }

    fetchRecentWorkouts()
  }, [])

  return { recentWorkouts }
}
