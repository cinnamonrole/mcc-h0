import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import BottomNavigation from "@/components/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Million Meters Challenge",
  description: "Track your progress in the Million Meters Rowing Challenge",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 dark:bg-slate-950">
            <main className="flex-1 pb-16">{children}</main>
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
