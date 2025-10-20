"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Map, 
  Bell, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Database,
  Menu,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Data Entry", href: "/data-entry", icon: FileText },
  { name: "Maps", href: "/maps", icon: Map },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Database", href: "/database", icon: Database },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setCollapsed(false)
        setMobileOpen(false)
      } else {
        setMobileOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMobileToggle}
            className="bg-card/80 backdrop-blur border-border"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={handleMobileToggle}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ET</span>
                </div>
                <div>
                  <h1 className="font-poppins font-semibold text-text-primary">Easy Track</h1>
                  <p className="text-xs text-text-secondary">Data for Life</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileToggle}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 p-4">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href} onClick={handleNavClick}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 transition-all duration-200",
                          isActive 
                            ? "bg-teal-primary text-white hover:bg-teal-primary/90" 
                            : "text-text-secondary hover:text-text-primary hover:bg-accent"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </ScrollArea>

            {/* User Profile */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                  <p className="text-xs text-text-secondary truncate">Field Agent</p>
                </div>
                <Badge variant="secondary" className="bg-earth-green text-white text-xs">
                  Online
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={cn(
      "relative flex flex-col bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ET</span>
            </div>
            <div>
              <h1 className="font-poppins font-semibold text-text-primary">Easy Track</h1>
              <p className="text-xs text-text-secondary">Data for Life</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-200",
                    collapsed ? "px-2" : "px-3",
                    isActive 
                      ? "bg-teal-primary text-white hover:bg-teal-primary/90" 
                      : "text-text-secondary hover:text-text-primary hover:bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3",
          collapsed ? "justify-center" : ""
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
              <p className="text-xs text-text-secondary truncate">Field Agent</p>
            </div>
          )}
          {!collapsed && (
            <Badge variant="secondary" className="bg-earth-green text-white text-xs">
              Online
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}