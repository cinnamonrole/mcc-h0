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
        <CardContent className="py-6 text-center text-slate-500">No recent workouts to display.</CardContent>
      </Card>
    )
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

                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  submitted{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {new Intl.NumberFormat().format(workout.meters)}m
                  </span>
                </p>

                {workout.image && (
                  <div className="relative">
                    <img
                      src={workout.image || "/placeholder.svg"}
                      alt={`${workout.userName}'s workout`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {workout.type.toUpperCase()}
                    </div>
                  </div>
                )}

                {workout.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-1">{workout.notes}</p>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
