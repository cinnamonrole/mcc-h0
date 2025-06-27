"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BottomNavigation from "@/components/bottom-navigation"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isGuest, user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state for auth check
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If not authenticated and not on auth pages, redirect to signin
  if (!isAuthenticated && pathname !== "/signup" && pathname !== "/signin") {
    router.push("/signin")
    return null
  }

  // If authenticated (including guest), show the app with navigation
  if (isAuthenticated) {
    return (
      <>
        <main className="flex-1 pb-16">{children}</main>
        <BottomNavigation />
      </>
    )
  }

  // For auth pages when not authenticated
  return <>{children}</>
}
