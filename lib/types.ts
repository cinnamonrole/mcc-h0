export type WorkoutType = "erg" | "run" | "bike" | "swim" | "otw" | "lift" | "other"

export interface Workout {
  id: string
  type: WorkoutType
  meters: number
  date: Date
  images?: string[]
  notes?: string
}

export interface UserData {
  id: string
  name: string
  profileImage: string
  totalMeters: number
  dailyMeters: number
  weeklyMeters: number
  deficit: number
  dailyRequired: number
  dailyRequiredWithRest: number
  topWorkoutType: WorkoutType
  workouts: Workout[]
  metersByType?: { [key: string]: number }
  dailyMetersByType?: { [key: string]: number }
  weeklyMetersByType?: { [key: string]: number }
  dayStreak: number
}
