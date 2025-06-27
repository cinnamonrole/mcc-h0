"use client"

import { Home, Upload, BarChart2, User, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export default function BottomNavigation() {
  const pathname = usePathname()
  const { isGuest, signOut } = useAuth()

  // Don't show navigation on admin page
  if (pathname === "/admin") {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      allowGuest: true,
    },
    {
      name: "Submit",
      href: "/submit",
      icon: Upload,
      allowGuest: false,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: BarChart2,
      allowGuest: true,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      allowGuest: false,
    },
  ]

  const availableNavItems = navItems.filter((item) => !isGuest || item.allowGuest)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <nav className="flex items-center justify-around bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-16 px-4">
          {availableNavItems.map((item) => {
            const isActive = pathname === item.href
            const isDisabled = isGuest && !item.allowGuest

            return (
              <Link
                key={item.name}
                href={isDisabled ? "#" : item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400",
                  isDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            )
          })}

          {isGuest && (
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="flex flex-col items-center justify-center w-full h-full text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs mt-1">Sign Up</span>
            </Button>
          )}

          {/* Hidden Admin Access - only visible in dev */}
          {process.env.NODE_ENV === "development" && (
            <Link
              href="/admin"
              className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Shield className="h-4 w-4" />
              <span className="text-xs mt-1">Admin</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}
