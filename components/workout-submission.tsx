"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, Dumbbell, Bike, Waves, Rows, PersonStanding, ArrowRight } from "lucide-react"
import type { WorkoutType } from "@/lib/types"
import { WorkoutTypeCard } from "@/components/workout-type-card"
import { useToast } from "@/hooks/use-toast"

export default function WorkoutSubmission() {
  const { toast } = useToast()
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<WorkoutType>("erg")
  const [distance, setDistance] = useState("")
  const [notes, setNotes] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [boatType, setBoatType] = useState<"1x" | "2x">("1x")

  const workoutTypes = [
    { id: "erg" as WorkoutType, name: "Erg", icon: Rows, color: "bg-blue-100 text-blue-700" },
    { id: "run" as WorkoutType, name: "Run", icon: PersonStanding, color: "bg-green-100 text-green-700" },
    { id: "bike" as WorkoutType, name: "Bike", icon: Bike, color: "bg-purple-100 text-purple-700" },
    { id: "swim" as WorkoutType, name: "Swim", icon: PersonStanding, color: "bg-cyan-100 text-cyan-700" },
    { id: "otw" as WorkoutType, name: "OTW Row", icon: Waves, color: "bg-indigo-100 text-indigo-700" },
    { id: "lift" as WorkoutType, name: "Lift", icon: Dumbbell, color: "bg-orange-100 text-orange-700" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!distance || Number.parseFloat(distance) <= 0) {
      toast({
        title: "Invalid distance",
        description: "Please enter a valid distance",
        variant: "destructive",
      })
      return
    }

    // Here you would normally submit to your backend
    toast({
      title: "Workout submitted!",
      description: `${distance} meters of ${getWorkoutTypeName(selectedWorkoutType)} recorded.`,
    })

    // Reset form
    setDistance("")
    setNotes("")
    setImagePreview(null)
  }

  const getWorkoutTypeName = (type: WorkoutType): string => {
    return workoutTypes.find((wt) => wt.id === type)?.name || type
  }

  const getDistanceLabel = () => {
    switch (selectedWorkoutType) {
      case "lift":
        return "Number of Lifts"
      case "run":
      case "bike":
        return "Distance (miles)"
      default:
        return "Distance (meters)"
    }
  }

  const getConversionText = () => {
    switch (selectedWorkoutType) {
      case "erg":
        return "1000m = 1000m"
      case "swim":
        return "300m = 1000m"
      case "run":
        return "1 mile = 1000m"
      case "bike":
        return "2 miles = 1000m"
      case "lift":
        return "1 lift = 5000m"
      case "otw":
        return boatType === "1x" ? "1000m = 1000m" : "2000m = 1000m"
      default:
        return ""
    }
  }

  const getConvertedMeters = () => {
    const distanceNum = Number.parseFloat(distance) || 0
    if (distanceNum <= 0) return 0

    switch (selectedWorkoutType) {
      case "erg":
        return distanceNum
      case "swim":
        return Math.round((distanceNum / 300) * 1000)
      case "run":
        return distanceNum * 1000 // 1 mile = 1000m
      case "bike":
        return Math.round((distanceNum / 2) * 1000) // 2 miles = 1000m
      case "lift":
        return distanceNum * 5000 // 1 lift = 5000m
      case "otw":
        return boatType === "1x" ? distanceNum : Math.round((distanceNum / 2) * 1000)
      default:
        return distanceNum
    }
  }

  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">Log Workout</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Workout Details</CardTitle>
            <CardDescription>Log your workout to contribute to the Million Meters Challenge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Workout Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {workoutTypes.map((type) => (
                  <WorkoutTypeCard
                    key={type.id}
                    workoutType={type}
                    isSelected={selectedWorkoutType === type.id}
                    onSelect={() => {
                      setSelectedWorkoutType(type.id)
                      if (type.id !== "otw") {
                        setBoatType("1x") // Reset to default when switching away from OTW
                      }
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-1">Conversion: {getConversionText()}</p>
            </div>

            {selectedWorkoutType === "otw" && (
              <div className="space-y-2">
                <Label>Boat Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`p-3 rounded-lg border transition-colors ${
                      boatType === "1x"
                        ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                    onClick={() => setBoatType("1x")}
                  >
                    <div className="text-center">
                      <div className="font-medium">1x</div>
                      <div className="text-xs text-slate-500">Single</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`p-3 rounded-lg border transition-colors ${
                      boatType === "2x"
                        ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                    onClick={() => setBoatType("2x")}
                  >
                    <div className="text-center">
                      <div className="font-medium">2x</div>
                      <div className="text-xs text-slate-500">Double</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="distance">{getDistanceLabel()}</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="distance"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={selectedWorkoutType === "lift" ? "e.g., 1" : "e.g., 2000"}
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                  className="flex-1"
                />
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  value={`${new Intl.NumberFormat().format(getConvertedMeters())}m`}
                  readOnly
                  className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex-1"
                />
              </div>
              <div className="flex justify-end">
                <p className="text-xs text-slate-500 mt-0px]">Final meters after conversion</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof">Proof of Workout (Optional)</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => {
                    // In a real app, this would open the camera
                    toast({
                      title: "Camera access",
                      description: "Camera functionality would open here",
                    })
                  }}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Camera
                </Button>
              </div>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

              {imagePreview && (
                <div className="mt-2 relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Workout proof"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setImagePreview(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any details about your workout..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Workout
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
