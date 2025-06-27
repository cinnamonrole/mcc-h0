"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Activity, Calendar, Flame, Calculator, Plus } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { UserProgressChart } from "@/components/user-progress-chart"
import { WorkoutGallery } from "@/components/workout-gallery"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

interface ProfilePageProps {
  userId?: string
}

export default function ProfilePage({ userId }: ProfilePageProps) {
  const [selectedUserId, setSelectedUserId] = useState(userId || "current-user")
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<string>("all")
  const { leaderboardData } = useLeaderboardData()
  const { userData } = useUserData(selectedUserId === "current-user" ? undefined : selectedUserId)
  const { user } = useAuth()
  const [metersPerDay, setMetersPerDay] = useState("5000")
  const [calculatedDays, setCalculatedDays] = useState<number | null>(null)
  const [isMoreStatsOpen, setIsMoreStatsOpen] = useState(false)

  if (!userData) {
    return (
      <div className="container px-4 py-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile data...</p>
        </div>
      </div>
    )
  }

  const { name, profileImage, totalMeters, deficit, dailyRequired, dailyRequiredWithRest, workouts, dayStreak } = userData

  const percentComplete = Math.min(100, (totalMeters / 1000000) * 100)
  const workoutCount = workouts.length
  const daysLeft = 70 // Mock data - in real app this would be calculated

  const calculateDays = () => {
    const metersPerDayNum = Number.parseFloat(metersPerDay)
    if (isNaN(metersPerDayNum) || metersPerDayNum <= 0) return

    const days = Math.ceil(deficit / metersPerDayNum)
    setCalculatedDays(days)
  }

  // Check if this is the current user and they have no workouts
  const isCurrentUser = selectedUserId === "current-user" || selectedUserId === user?.id
  const hasNoWorkouts = workoutCount === 0

  return (
    <div className="container px-4 py-6">
      {/* Profile Selector */}
      <div className="mb-6">
        <Select defaultValue={selectedUserId} onValueChange={(value) => setSelectedUserId(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-user">Your Profile</SelectItem>
            {leaderboardData?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Profile Header */}
      <div className="flex items-center mb-6">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
          <AvatarFallback className="bg-blue-100 text-blue-800">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{name}</h1>
          <p className="text-slate-600 dark:text-slate-400">Rower</p>
        </div>
      </div>

      {/* Main Progress Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-blue-700 dark:text-blue-300">
              {new Intl.NumberFormat().format(totalMeters)}
            </span>
            <span className="text-lg text-slate-500 dark:text-slate-400 ml-2">meters</span>
          </div>
          <Progress value={percentComplete} className="h-4 mb-2" />
          <div className="text-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {percentComplete.toFixed(1)}% of 1,000,000m goal
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{workoutCount}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Workouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{daysLeft}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Days Left</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{dayStreak}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* More Statistics - Collapsible */}
      <Collapsible open={isMoreStatsOpen} onOpenChange={setIsMoreStatsOpen} className="mb-6">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-transparent">
            More Statistics
            {isMoreStatsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Personal Deficit</p>
                <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                  {new Intl.NumberFormat().format(deficit)}m
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Daily Required</p>
                <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {new Intl.NumberFormat().format(dailyRequired)}m
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">per day to reach goal</p>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">With 1 Rest Day/Week</p>
                <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                  {new Intl.NumberFormat().format(dailyRequiredWithRest)}m
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">per active day (6 days/week)</p>
              </CardContent>
            </Card>
          </div>

          {/* Calculator */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Completion Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 mb-4">
                <div className="flex-1">
                  <Label htmlFor="meters-per-day" className="text-sm">
                    If I row this many meters per day:
                  </Label>
                  <Input
                    id="meters-per-day"
                    type="number"
                    min="1"
                    value={metersPerDay}
                    onChange={(e) => setMetersPerDay(e.target.value)}
                  />
                </div>
                <Button onClick={calculateDays} className="mb-[2px]">
                  Calculate
                </Button>
              </div>

              {calculatedDays !== null && (
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">You will complete the challenge in:</p>
                  <p className="text-xl font-semibold text-blue-800 dark:text-blue-200">{calculatedDays} days</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Charts and Gallery */}
      <Tabs defaultValue="progress" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="gallery">Workout Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Meters Per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <UserProgressChart 
                userId={selectedUserId === "current-user" ? undefined : selectedUserId}
                workoutType={selectedWorkoutType}
              />

              <div className="mt-4">
                <Tabs value={selectedWorkoutType} onValueChange={setSelectedWorkoutType}>
                  <TabsList className="grid grid-cols-7 gap-1">
                    <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                    <TabsTrigger value="erg" className="text-xs px-2">Erg</TabsTrigger>
                    <TabsTrigger value="run" className="text-xs px-2">Run</TabsTrigger>
                    <TabsTrigger value="swim" className="text-xs px-2">Swim</TabsTrigger>
                    <TabsTrigger value="otw" className="text-xs px-2">OTW</TabsTrigger>
                    <TabsTrigger value="lift" className="text-xs px-2">Lift</TabsTrigger>
                    <TabsTrigger value="bike" className="text-xs px-2">Bike</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          {hasNoWorkouts && isCurrentUser ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4">
                  <Plus className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">No workouts yet</h3>
                  <p className="text-slate-600 dark:text-slate-400">Start your journey by adding your first workout!</p>
                </div>
                <Link href="/submit">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Workout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : hasNoWorkouts ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-600 dark:text-slate-400">No workouts recorded yet.</p>
              </CardContent>
            </Card>
          ) : (
            <WorkoutGallery workouts={workouts} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
