"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { Shield, Minus, RotateCcw, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminPage() {
  const { toast } = useToast()
  const { leaderboardData } = useLeaderboardData()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRower, setSelectedRower] = useState("")
  const [metersToSubtract, setMetersToSubtract] = useState("")
  const [resetClickCount, setResetClickCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_PASSWORD = "diddyparty"
  const RESET_CLICKS_REQUIRED = 20

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin panel",
      })
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive",
      })
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
    setPassword("")
    setResetClickCount(0)
    toast({
      title: "Logged Out",
      description: "Admin session ended",
    })
  }

  const handleSubtractMeters = async () => {
    if (!selectedRower || !metersToSubtract) {
      toast({
        title: "Missing Information",
        description: "Please select a rower and enter meters to subtract",
        variant: "destructive",
      })
      return
    }

    const meters = Number.parseInt(metersToSubtract)
    if (isNaN(meters) || meters <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid number of meters",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const rowerName = leaderboardData?.find((user) => user.id === selectedRower)?.name || "Unknown"

    toast({
      title: "Meters Subtracted",
      description: `Removed ${new Intl.NumberFormat().format(meters)}m from ${rowerName}`,
    })

    // Reset form
    setSelectedRower("")
    setMetersToSubtract("")
    setIsLoading(false)
  }

  const handleResetClick = () => {
    const newCount = resetClickCount + 1
    setResetClickCount(newCount)

    if (newCount === RESET_CLICKS_REQUIRED) {
      // Reset all scores
      toast({
        title: "🚨 ALL SCORES RESET! 🚨",
        description: "All rower scores have been reset to zero",
        variant: "destructive",
      })
      setResetClickCount(0)
    } else {
      const remaining = RESET_CLICKS_REQUIRED - newCount
      toast({
        title: `Reset Progress: ${newCount}/${RESET_CLICKS_REQUIRED}`,
        description: `${remaining} more clicks to reset all scores`,
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-red-900 dark:text-red-100">Admin Access</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Enter admin password to continue</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">🔒 Restricted Area</CardTitle>
              <CardDescription>This area is for administrators only</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Shield className="mr-2 h-4 w-4" />
                  Access Admin Panel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-red-900 dark:text-red-100">Admin Panel</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage rower scores and data</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          Logout
        </Button>
      </div>

      <div className="space-y-6">
        {/* Subtract Meters Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Minus className="h-5 w-5 text-orange-600" />
              Subtract Meters
            </CardTitle>
            <CardDescription>Remove meters from a rower's total score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Rower</Label>
                <Select value={selectedRower} onValueChange={setSelectedRower}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a rower" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaderboardData?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {new Intl.NumberFormat().format(user.totalMeters)}m
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meters">Meters to Subtract</Label>
                <Input
                  id="meters"
                  type="number"
                  min="1"
                  placeholder="e.g., 5000"
                  value={metersToSubtract}
                  onChange={(e) => setMetersToSubtract(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleSubtractMeters}
              disabled={isLoading || !selectedRower || !metersToSubtract}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? "Processing..." : "Subtract Meters"}
            </Button>
          </CardContent>
        </Card>

        {/* Reset All Scores Card */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions that affect all data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Reset All Scores</h4>
              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                This will permanently reset all rower scores to zero. Click the button below {RESET_CLICKS_REQUIRED}{" "}
                times to confirm.
              </p>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleResetClick}
                  variant="destructive"
                  className={cn("transition-all duration-200", resetClickCount > 0 && "animate-pulse")}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset All Scores ({resetClickCount}/{RESET_CLICKS_REQUIRED})
                </Button>

                {resetClickCount > 0 && (
                  <div className="flex-1">
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(resetClickCount / RESET_CLICKS_REQUIRED) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      {RESET_CLICKS_REQUIRED - resetClickCount} clicks remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Leaderboard Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Leaderboard</CardTitle>
            <CardDescription>Preview of current rower standings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData?.slice(0, 5).map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm w-6">#{index + 1}</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {new Intl.NumberFormat().format(user.totalMeters)}m
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
