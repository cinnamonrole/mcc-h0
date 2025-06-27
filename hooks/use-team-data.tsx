"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
    const fetchTeamData = async () => {
      try {
        // Fetch all users from Firestore
        const usersRef = collection(db, "users")
        const querySnapshot = await getDocs(usersRef)

        let totalMeters = 0
        let membersCount = 0

        querySnapshot.forEach((doc) => {
          const firestoreData = doc.data()
          const activities = firestoreData.activities || []

          // Calculate total meters from activities for this user
          const userMeters = activities.reduce((sum: number, activity: any) => {
            return sum + (Number(activity.points) || 0)
          }, 0)

          totalMeters += userMeters
          membersCount++
        })

        // Calculate team metrics
        const targetMeters = membersCount * 1000000 // 1M per member
        const deficit = Math.max(0, targetMeters - totalMeters)
        const remainingDays = 70
        const dailyTeamRequired = Math.ceil(deficit / remainingDays)
        const dailyPersonRequired = Math.ceil(dailyTeamRequired / membersCount)

        const realTeamData: TeamData = {
          totalMeters,
          targetMeters,
          membersCount,
          deficit,
          remainingDays,
          dailyTeamRequired,
          dailyPersonRequired,
          daysAheadOrBehind: 0, // Will calculate this later if needed
        }

        setTeamData(realTeamData)

        // For now, keep mock progress data until we implement daily team progress
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

        setProgressData(mockProgressData)

      } catch (error) {
        console.error("Error fetching team data:", error)
        setTeamData(null)
      }
    }

    fetchTeamData()
  }, [])

  return { teamData, progressData }
}
