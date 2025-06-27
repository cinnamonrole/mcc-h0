"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useRecentWorkouts } from "@/hooks/use-recent-workouts"
import { formatDate } from "@/lib/utils"

export function RecentWorkoutsGallery() {
  const { recentWorkouts } = useRecentWorkouts()

  if (!recentWorkouts || recentWorkouts.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-slate-500">
          No recent workouts to display.
        </CardContent>
      </Card>
    )
  }

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case "erg":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "otw":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
      case "run":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "bike":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "swim":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
      case "lift":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Recent Workouts</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {recentWorkouts.map((workout) => (
          <div key={workout.id} className="flex-shrink-0 w-48">
            <Card className="h-full">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={workout.userProfileImage || "/placeholder.svg"} alt={workout.userName} />
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                      {workout.userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{workout.userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(workout.date)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getWorkoutTypeColor(workout.type)}`}>
                    {workout.type.toUpperCase()}
                  </span>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {new Intl.NumberFormat().format(workout.meters)}m
                  </p>
                </div>

                {workout.image && (
                  <div className="relative mb-2">
                    <img
                      src={workout.image}
                      alt={`${workout.userName}'s workout`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                )}

                {workout.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{workout.notes}</p>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
