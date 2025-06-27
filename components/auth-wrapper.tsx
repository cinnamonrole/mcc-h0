"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"
import SignupPage from "@/components/signup-page"
import BottomNavigation from "@/components/bottom-navigation"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  // If not authenticated and not on signup page, show signup
  if (!isAuthenticated && pathname !== "/signup") {
    return <SignupPage />
  }

  // If authenticated, show the app with navigation
  if (isAuthenticated) {
    return (
      <>
        <main className="flex-1 pb-16">{children}</main>
        <BottomNavigation />
      </>
    )
  }

  // For signup page when not authenticated
  return <>{children}</>
}
