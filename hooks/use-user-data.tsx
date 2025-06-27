"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/use-auth"
import type { UserData, Workout } from "@/lib/types"

interface ProgressDataPoint {
  date: string
  meters: number
}

export function useUserData(userId?: string) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [progressData, setProgressData] = useState<ProgressDataPoint[] | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let targetUserId = userId

        // If no userId provided or it's "current-user", use the logged-in user's ID
        if (!targetUserId || targetUserId === "current-user") {
          if (!user) {
            setUserData(null)
            return
          }
          targetUserId = user.id
        }

        // Fetch user data from Firestore
        const userRef = doc(db, "users", targetUserId)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          console.error("User not found:", targetUserId)
          setUserData(null)
          return
        }

        const firestoreData = userSnap.data()
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

        // Convert activities to workout format
        const workouts: Workout[] = activities.map((activity: any, index: number) => ({
          id: `${targetUserId}-${index}`,
          type: activity.activity?.toLowerCase() || "unknown",
          meters: Number(activity.points) || 0,
          date: activity.date?.toDate() || new Date(),
          image: activity.images?.[0] || activity.image || "/placeholder.png"
        }))

        // Determine top workout type
        const workoutTypeCounts: { [key: string]: number } = {}
        activities.forEach((activity: any) => {
          const type = activity.activity?.toLowerCase() || "unknown"
          workoutTypeCounts[type] = (workoutTypeCounts[type] || 0) + 1
        })
        const topWorkoutType = Object.keys(workoutTypeCounts).reduce((a, b) => 
          workoutTypeCounts[a] > workoutTypeCounts[b] ? a : b, "erg"
        )

        const realUserData: UserData = {
          id: targetUserId,
          name: firestoreData.username || "Unknown User",
          profileImage: "/placeholder.png", // You can add profile image support later
          totalMeters,
          deficit,
          dailyRequired,
          dailyRequiredWithRest,
          topWorkoutType,
          workouts
        }

        setUserData(realUserData)

        // Generate progress data from activities
        const progressDataPoints: ProgressDataPoint[] = []
        const now = new Date()
        
        // Generate last 14 days of data
        for (let i = 13; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          
          // Find activities for this date
          const dayActivities = activities.filter((activity: any) => {
            const activityDate = activity.date?.toDate() || new Date()
            return activityDate.toDateString() === date.toDateString()
          })
          
          const dayMeters = dayActivities.reduce((sum: number, activity: any) => {
            return sum + (Number(activity.points) || 0)
          }, 0)
          
          progressDataPoints.push({
            date: dateStr,
            meters: dayMeters
          })
        }

        setProgressData(progressDataPoints)

      } catch (error) {
        console.error("Error fetching user data:", error)
        setUserData(null)
      }
    }

    fetchUserData()
  }, [userId, user])

  return { userData, progressData }
}
