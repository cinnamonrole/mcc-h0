"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isGuest: boolean
  isAuthenticated: boolean
  signUp: (name: string, email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  continueAsGuest: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing auth state in localStorage
    const savedUser = localStorage.getItem("user")
    const savedIsGuest = localStorage.getItem("isGuest")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    } else if (savedIsGuest === "true") {
      setIsGuest(true)
      setIsAuthenticated(true)
    }
  }, [])

  const signUp = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
    }

    setUser(newUser)
    setIsAuthenticated(true)
    setIsGuest(false)

    localStorage.setItem("user", JSON.stringify(newUser))
    localStorage.removeItem("isGuest")
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = {
      id: "1",
      name: "Alex Johnson",
      email,
    }

    setUser(user)
    setIsAuthenticated(true)
    setIsGuest(false)

    localStorage.setItem("user", JSON.stringify(user))
    localStorage.removeItem("isGuest")
  }

  const signOut = () => {
    setUser(null)
    setIsAuthenticated(false)
    setIsGuest(false)
    localStorage.removeItem("user")
    localStorage.removeItem("isGuest")
  }

  const continueAsGuest = () => {
    setIsGuest(true)
    setIsAuthenticated(true)
    setUser(null)
    localStorage.setItem("isGuest", "true")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
