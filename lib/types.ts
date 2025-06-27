export type WorkoutType = "erg" | "run" | "bike" | "swim" | "otw" | "lift" | "other"

export interface Workout {
  id: string
  type: WorkoutType
  meters: number
  date: Date
  image?: string
  notes?: string
}

export interface UserData {
  id: string
  name: string
  profileImage: string
  totalMeters: number
  deficit: number
  dailyRequired: number
  dailyRequiredWithRest: number
  topWorkoutType: WorkoutType
  workouts: Workout[]
}
