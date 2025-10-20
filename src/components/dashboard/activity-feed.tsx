"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  FileText, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  MessageSquare,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      role: "Field Agent"
    },
    action: "submitted water quality report",
    target: "Nairobi Region - Station A",
    time: "2 minutes ago",
    type: "report",
    status: "success"
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
      role: "Team Lead"
    },
    action: "created new alert",
    target: "Water contamination detected",
    time: "15 minutes ago",
    type: "alert",
    status: "warning"
  },
  {
    id: 3,
    user: {
      name: "Emma Davis",
      avatar: "/avatars/emma.jpg",
      role: "Data Analyst"
    },
    action: "completed data validation",
    target: "156 records processed",
    time: "1 hour ago",
    type: "validation",
    status: "success"
  },
  {
    id: 4,
    user: {
      name: "Alex Kumar",
      avatar: "/avatars/alex.jpg",
      role: "Field Agent"
    },
    action: "updated location",
    target: "Mombasa Coastal Area",
    time: "2 hours ago",
    type: "location",
    status: "info"
  },
  {
    id: 5,
    user: {
      name: "System",
      avatar: null,
      role: "Automated"
    },
    action: "generated weekly summary",
    target: "2,847 reports analyzed",
    time: "3 hours ago",
    type: "system",
    status: "info"
  },
  {
    id: 6,
    user: {
      name: "Lisa Wang",
      avatar: "/avatars/lisa.jpg",
      role: "Coordinator"
    },
    action: "commented on report",
    target: "Water quality trends Q2",
    time: "4 hours ago",
    type: "comment",
    status: "info"
  }
]

export function ActivityFeed() {
  const getIcon = (type: string) => {
    switch (type) {
      case "report":
        return <FileText className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "validation":
        return <CheckCircle className="h-4 w-4" />
      case "location":
        return <MapPin className="h-4 w-4" />
      case "system":
        return <Clock className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getIconColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-earth-green bg-earth-green/10"
      case "warning":
        return "text-amber-alert bg-amber-alert/10"
      case "info":
        return "text-hope-blue bg-hope-blue/10"
      default:
        return "text-text-secondary bg-muted"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-earth-green text-white text-xs">Success</Badge>
      case "warning":
        return <Badge className="bg-amber-alert text-white text-xs">Alert</Badge>
      case "info":
        return <Badge className="bg-hope-blue text-white text-xs">Info</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="neumorphic bg-card border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-poppins text-text-primary">
            Activity Feed
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-teal-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-0">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "p-4 hover:bg-muted/50 transition-colors duration-150",
                  index !== activities.length - 1 && "border-b border-border"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {activity.user.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback className="text-xs">
                          {activity.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={cn(
                        "p-2 rounded-lg",
                        getIconColor(activity.status)
                      )}>
                        {getIcon(activity.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">
                          <span className="font-medium">{activity.user.name}</span>
                          <span className="text-text-secondary mx-1">{activity.action}</span>
                        </p>
                        <p className="text-xs text-text-secondary mb-1">
                          {activity.target}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary">
                            {activity.time}
                          </span>
                          {getStatusBadge(activity.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}