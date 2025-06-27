"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { UserData } from "@/lib/types"

export function useLeaderboardData() {
  const [leaderboardData, setLeaderboardData] = useState<UserData[] | null>(null)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Fetch all users from Firestore
        const usersRef = collection(db, "users")
        const querySnapshot = await getDocs(usersRef)

        const users: UserData[] = []

        querySnapshot.forEach((doc) => {
          const firestoreData = doc.data()
          const activities = firestoreData.activities || []

          // Calculate total meters from activities
          const totalMeters = activities.reduce((sum: number, activity: any) => {
            return sum + (Number(activity.points) || 0)
          }, 0)

          // Calculate deficit (assuming 1M goal)
          const deficit = Math.max(0, 1000000 - totalMeters)

          // Calculate daily requirements
          const daysLeft = 60 // You can make this dynamic based on challenge end date
          const dailyRequired = Math.ceil(deficit / daysLeft)
          const dailyRequiredWithRest = Math.ceil((deficit / daysLeft) * 1.17) // With 1 rest day per week

          // Determine top workout type
          const workoutTypeCounts: { [key: string]: number } = {}
          activities.forEach((activity: any) => {
            const type = activity.activity?.toLowerCase() || "unknown"
            workoutTypeCounts[type] = (workoutTypeCounts[type] || 0) + 1
          })
          const topWorkoutType = Object.keys(workoutTypeCounts).reduce((a, b) => 
            workoutTypeCounts[a] > workoutTypeCounts[b] ? a : b, "erg"
          )

          const userData: UserData = {
            id: doc.id,
            name: firestoreData.username || "Unknown User",
            profileImage: "/placeholder.png", // You can add profile image support later
            totalMeters,
            deficit,
            dailyRequired,
            dailyRequiredWithRest,
            topWorkoutType,
            workouts: [] // We don't need full workout data for leaderboard
          }

          users.push(userData)
        })

        // Sort by total meters (descending)
        users.sort((a, b) => b.totalMeters - a.totalMeters)

        setLeaderboardData(users)

      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        setLeaderboardData(null)
      }
    }

    fetchLeaderboardData()
  }, [])

  return { leaderboardData }
}
