"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, MapPin, Activity, Zap, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface Insight {
  id: number
  type: "warning" | "success" | "info"
  title: string
  description: string
  action: string
  priority: "high" | "medium" | "low"
}

const fallbackInsights: Insight[] = [
  {
    id: 1,
    type: "warning",
    title: "Water quality dropped 12% in Region X",
    description: "Recent samples show concerning trends in water quality metrics. Immediate investigation recommended.",
    action: "Review Data",
    priority: "high"
  },
  {
    id: 2,
    type: "success",
    title: "Vaccination campaign exceeding targets",
    description: "Team Alpha has achieved 118% of their weekly vaccination goal in Northern District.",
    action: "View Details",
    priority: "medium"
  },
  {
    id: 3,
    type: "info",
    title: "New climate data patterns detected",
    description: "AI analysis has identified unusual weather patterns that may affect upcoming field operations.",
    action: "Analyze",
    priority: "low"
  }
]

export function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>(fallbackInsights)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInsights = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/insights')
      const data = await response.json()
      
      if (data.success) {
        // Parse the AI response and convert to our format
        const aiInsights = parseAIResponse(data.insights)
        setInsights(aiInsights)
      } else {
        setError(data.error || 'Failed to fetch insights')
      }
    } catch (err) {
      setError('Network error - using fallback insights')
      console.error('Failed to fetch insights:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const parseAIResponse = (aiResponse: string): Insight[] => {
    // Simple parsing logic - in a real app, this would be more sophisticated
    const lines = aiResponse.split('\n').filter(line => line.trim())
    const parsedInsights: Insight[] = []
    
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes('water') || line.toLowerCase().includes('quality')) {
        parsedInsights.push({
          id: Date.now() + index,
          type: "warning",
          title: "Water Quality Alert",
          description: line.trim(),
          action: "Review Data",
          priority: "high"
        })
      } else if (line.toLowerCase().includes('vaccination') || line.toLowerCase().includes('campaign')) {
        parsedInsights.push({
          id: Date.now() + index,
          type: "success",
          title: "Campaign Success",
          description: line.trim(),
          action: "View Details",
          priority: "medium"
        })
      } else if (line.toLowerCase().includes('climate') || line.toLowerCase().includes('weather')) {
        parsedInsights.push({
          id: Date.now() + index,
          type: "info",
          title: "Climate Data",
          description: line.trim(),
          action: "Analyze",
          priority: "low"
        })
      }
    })

    return parsedInsights.length > 0 ? parsedInsights : fallbackInsights
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <Activity className="h-4 w-4" />
      case "info":
        return <Zap className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-amber-alert"
      case "success":
        return "text-earth-green"
      case "info":
        return "text-hope-blue"
      default:
        return "text-text-secondary"
    }
  }

  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-coral-critical text-white"
      case "medium":
        return "bg-amber-alert text-white"
      case "low":
        return "bg-hope-blue text-white"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  return (
    <Card className="neumorphic bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-teal-primary to-hope-blue">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-poppins font-semibold text-text-primary">
                AI-Generated Insights
              </h2>
              <p className="text-sm text-text-secondary">
                Real-time analysis of your field data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-teal-primary text-white">
              {insights.length} Active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchInsights}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-amber-alert/10 border border-amber-alert/20 rounded-lg">
            <p className="text-sm text-amber-alert">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border hover:shadow-subtle transition-all duration-200"
            >
              <div className={cn("p-2 rounded-lg bg-background", getIconColor(insight.type))}>
                {getIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-text-primary text-sm">
                    {insight.title}
                  </h3>
                  <Badge className={cn("text-xs", getBadgeColor(insight.priority))}>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-xs text-text-secondary mb-2">
                  {insight.description}
                </p>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-teal-primary hover:text-teal-primary/90">
                  {insight.action} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}