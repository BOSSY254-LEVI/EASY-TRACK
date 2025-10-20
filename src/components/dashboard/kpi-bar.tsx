"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, TrendingDown, FileText, AlertTriangle, Users, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const kpiData = [
  {
    title: "Total Reports",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    color: "text-teal-primary"
  },
  {
    title: "Open Alerts",
    value: "23",
    change: "-8.2%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-amber-alert"
  },
  {
    title: "Active Teams",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Users,
    color: "text-earth-green"
  },
  {
    title: "Completed Tasks",
    value: "156",
    change: "+18.7%",
    trend: "up",
    icon: CheckCircle,
    color: "text-hope-blue"
  },
  {
    title: "Data Quality",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-teal-primary"
  },
  {
    title: "Response Time",
    value: "2.4h",
    change: "-15.3%",
    trend: "down",
    icon: TrendingDown,
    color: "text-earth-green"
  }
]

export function KPIBar() {
  return (
    <Card className="neumorphic bg-card border-border">
      <CardContent className="p-4">
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-2">
            {kpiData.map((kpi, index) => (
              <div
                key={kpi.title}
                className="flex-shrink-0 w-48 p-4 bg-muted rounded-lg border border-border hover:shadow-card-hover transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={cn("p-2 rounded-lg bg-background", kpi.color)}>
                    <kpi.icon className="h-4 w-4" />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    kpi.trend === "up" ? "text-earth-green" : "text-amber-alert"
                  )}>
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
                  <p className="text-xs text-text-secondary">{kpi.title}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}