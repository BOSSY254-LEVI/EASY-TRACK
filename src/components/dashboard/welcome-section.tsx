"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export function WelcomeSection() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <Card className="neumorphic bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-poppins font-bold text-text-primary">
              Welcome back, John! 👋
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your field teams today.
            </p>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Nairobi Region</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>12 teams active</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Badge className="bg-earth-green text-white px-3 py-1">
              All Systems Operational
            </Badge>
            <Button className="bg-teal-primary hover:bg-teal-primary/90">
              Quick Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}