"use client"

import { Home, Upload, BarChart2, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  // Don't show navigation on admin page
  if (pathname === "/admin") {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Submit",
      href: "/submit",
      icon: Upload,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: BarChart2,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <nav className="flex items-center justify-around bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-16 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
