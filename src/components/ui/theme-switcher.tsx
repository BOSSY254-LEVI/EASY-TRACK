"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const themes = [
  {
    id: "default",
    name: "Easy Track",
    description: "Original teal and blue theme",
    colors: ["#0F5959", "#2A9D8F", "#4CAF50"],
    class: ""
  },
  {
    id: "ocean",
    name: "Ocean Deep",
    description: "Deep blue professional theme",
    colors: ["#1E3A8A", "#3B82F6", "#60A5FA"],
    class: "theme-ocean"
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    description: "Warm orange and red theme",
    colors: ["#EA580C", "#F97316", "#FB923C"],
    class: "theme-sunset"
  },
  {
    id: "forest",
    name: "Forest Green",
    description: "Natural green theme",
    colors: ["#166534", "#22C55E", "#4ADE80"],
    class: "theme-forest"
  },
  {
    id: "purple",
    name: "Royal Purple",
    description: "Elegant purple theme",
    colors: ["#7C3AED", "#A855F7", "#C084FC"],
    class: "theme-purple"
  },
  {
    id: "rose",
    name: "Rose Pink",
    description: "Soft pink theme",
    colors: ["#BE185D", "#EC4899", "#F472B6"],
    class: "theme-rose"
  },
  {
    id: "slate",
    name: "Modern Slate",
    description: "Contemporary gray theme",
    colors: ["#334155", "#64748B", "#94A3B8"],
    class: "theme-slate"
  }
]

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState("default")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("easy-track-theme") || "default"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (!theme) return

    // Remove all theme classes
    themes.forEach(t => {
      if (t.class) document.documentElement.classList.remove(t.class)
    })

    // Apply new theme class
    if (theme.class) {
      document.documentElement.classList.add(theme.class)
    }

    // Save to localStorage
    localStorage.setItem("easy-track-theme", themeId)
  }

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Palette className="h-4 w-4" />
        Theme
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Theme Selector */}
          <Card className="absolute top-full mt-2 right-0 w-80 z-50 glass-card animate-slide-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-poppins text-text-primary flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Choose Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={cn(
                    "w-full p-3 rounded-lg border transition-all duration-200 hover:shadow-card-hover",
                    currentTheme === theme.id
                      ? "border-teal-primary bg-teal-primary/10"
                      : "border-border bg-card hover:bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Color Preview */}
                      <div className="flex gap-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div className="text-left">
                        <h4 className="font-medium text-text-primary">
                          {theme.name}
                        </h4>
                        <p className="text-xs text-text-secondary">
                          {theme.description}
                        </p>
                      </div>
                    </div>

                    {currentTheme === theme.id && (
                      <Check className="h-4 w-4 text-teal-primary" />
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
