"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { TopThreeUsers } from "@/components/top-three-users"
import { UserLeaderboardCard } from "@/components/user-leaderboard-card"
import type { WorkoutType } from "@/lib/types"

export default function LeaderboardPage() {
  const { leaderboardData } = useLeaderboardData()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<WorkoutType | "all">("all")

  if (!leaderboardData) {
    return <div>Loading leaderboard data...</div>
  }

  const filteredUsers = leaderboardData
    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((user) => (activeTab === "all" ? true : user.topWorkoutType === activeTab))
    .sort((a, b) => b.totalMeters - a.totalMeters)

  const topThree = filteredUsers.slice(0, 3)
  const restOfUsers = filteredUsers.slice(3)

  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">Leaderboard</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder="Search rowers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value as WorkoutType | "all")}>
        <TabsList className="grid grid-cols-4 mb-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="erg">Erging</TabsTrigger>
          <TabsTrigger value="run">Running</TabsTrigger>
          <TabsTrigger value="bike">Biking</TabsTrigger>
        </TabsList>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="swim">Swimming</TabsTrigger>
          <TabsTrigger value="otw">OTW</TabsTrigger>
          <TabsTrigger value="lift">Lifting</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
      </Tabs>

      {topThree.length > 0 && (
        <div className="mb-4">
          <TopThreeUsers users={topThree} />
        </div>
      )}

      <div className="space-y-3">
        {restOfUsers.map((user, index) => (
          <UserLeaderboardCard key={user.id} user={user} rank={index + 4} />
        ))}

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="py-6 text-center text-slate-500">
              No users found matching your search criteria.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
