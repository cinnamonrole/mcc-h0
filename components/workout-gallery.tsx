import { Card, CardContent } from "@/components/ui/card"
import type { Workout } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface WorkoutGalleryProps {
  workouts: Workout[]
}

export function WorkoutGallery({ workouts }: WorkoutGalleryProps) {
  const workoutsWithImages = workouts.filter((workout) => workout.image)

  if (workoutsWithImages.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-slate-500">No workout images to display yet.</CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {workoutsWithImages.map((workout) => (
        <div key={workout.id} className="relative group overflow-hidden rounded-md">
          <img
            src={workout.image || "/placeholder.png"}
            alt={`Workout on ${formatDate(workout.date)}`}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
            <p className="text-white text-xs font-medium">
              {workout.type} - {workout.meters}m
            </p>
            <p className="text-white/80 text-xs">{formatDate(workout.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
