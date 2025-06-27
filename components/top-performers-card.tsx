"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { Trophy, Calendar, Clock } from "lucide-react"

export default function TopPerformersCard() {
  const { leaderboardData } = useLeaderboardData()

  if (!leaderboardData) {
    return <div>Loading top performers...</div>
  }

  // Mock data for weekly and daily - in real app this would come from API
  const weeklyTop = leaderboardData[1] // Sam Williams
  const overallTop = leaderboardData[0] // Alex Johnson
  const dailyTop = leaderboardData[2] // Jordan Smith

  const performers = [
    {
      title: "Weekly Top",
      icon: Calendar,
      user: weeklyTop,
      meters: 45000, // Mock weekly meters
      iconColor: "text-green-600",
    },
    {
      title: "Top",
      icon: Trophy,
      user: overallTop,
      meters: overallTop.totalMeters,
      iconColor: "text-yellow-600",
    },
    {
      title: "Daily Top",
      icon: Clock,
      user: dailyTop,
      meters: 12000, // Mock daily meters
      iconColor: "text-blue-600",
    },
  ]

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {performers.map((performer, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <performer.icon className={`h-4 w-4 mr-1 ${performer.iconColor}`} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{performer.title}</span>
              </div>

              <div className="flex flex-col items-center">
                <Avatar className="h-10 w-10 mb-2">
                  <AvatarImage src={performer.user.profileImage || "/placeholder.svg"} alt={performer.user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                    {performer.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 truncate w-full">
                  {performer.user.name}
                </p>

                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {new Intl.NumberFormat().format(performer.meters)}m
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
