"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import {
  Search,
  Bell,
  Settings,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'pending'>('synced')
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    // Simulate network status changes
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const activeUsers = [
    { id: 1, name: "Sarah Chen", avatar: "/avatars/sarah.jpg", status: "online" },
    { id: 2, name: "Mike Johnson", avatar: "/avatars/mike.jpg", status: "online" },
    { id: 3, name: "Emma Davis", avatar: "/avatars/emma.jpg", status: "online" },
    { id: 4, name: "Alex Kumar", avatar: "/avatars/alex.jpg", status: "online" },
  ]

  return (
    <header className="h-16 bg-card border-b border-border px-4 lg:px-6 flex items-center justify-between">
      {/* Mobile Search Toggle */}
      <div className="lg:hidden flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSearch(!showSearch)}
          className="h-8 w-8 p-0"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Bar - Desktop */}
      <div className="hidden lg:flex flex-1 max-w-xl mr-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            placeholder="Search projects, data, or team members..."
            className="pl-10 bg-muted border-border focus:border-teal-primary focus:ring-teal-primary"
          />
        </div>
      </div>

      {/* Mobile Search - Overlay */}
      {showSearch && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-card border-b border-border p-4 z-30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search projects, data, or team members..."
              className="pl-10 bg-muted border-border focus:border-teal-primary focus:ring-teal-primary"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Connection Status - Desktop Only */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4 text-earth-green" />
              <span className="text-sm text-text-secondary">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-amber-alert" />
              <span className="text-sm text-text-secondary">Offline</span>
            </>
          )}
        </div>

        {/* Sync Status - Desktop Only */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
          {syncStatus === 'synced' && (
            <>
              <CheckCircle className="h-4 w-4 text-earth-green" />
              <span className="text-sm text-text-secondary">Synced</span>
            </>
          )}
          {syncStatus === 'syncing' && (
            <>
              <div className="h-4 w-4 border-2 border-teal-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-text-secondary">Syncing...</span>
            </>
          )}
          {syncStatus === 'pending' && (
            <>
              <AlertCircle className="h-4 w-4 text-amber-alert" />
              <span className="text-sm text-text-secondary">Pending</span>
            </>
          )}
        </div>

        {/* Active Users - Desktop Only */}
        <div className="hidden lg:flex items-center">
          <div className="flex -space-x-2">
            {activeUsers.slice(0, 3).map((user) => (
              <Avatar key={user.id} className="h-8 w-8 border-2 border-card">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {activeUsers.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-teal-primary border-2 border-card flex items-center justify-center">
                <span className="text-white text-xs font-medium">+{activeUsers.length - 3}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-coral-critical text-white text-xs rounded-full">
            3
          </Badge>
        </Button>

        {/* Theme Controls */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 p-0"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Menu */}
        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}