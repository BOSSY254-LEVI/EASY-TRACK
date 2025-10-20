"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Activity, 
  FileText, 
  MapPin, 
  Users, 
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Clock,
  Filter,
  Search,
  Calendar
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    status: "success",
    details: "pH levels: 7.2, Temperature: 24°C"
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
    status: "warning",
    details: "Immediate investigation required"
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
    status: "success",
    details: "All records validated successfully"
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
    status: "info",
    details: "GPS coordinates: -4.0435° S, 39.6682° E"
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
    status: "info",
    details: "Summary sent to all team leads"
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
    status: "info",
    details: "Noted improvement in water quality metrics"
  },
  {
    id: 7,
    user: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
      role: "Field Agent"
    },
    action: "completed vaccination",
    target: "Northern District Clinic",
    time: "5 hours ago",
    type: "task",
    status: "success",
    details: "47 children vaccinated"
  },
  {
    id: 8,
    user: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      role: "Field Agent"
    },
    action: "uploaded photos",
    target: "Water sampling site B",
    time: "6 hours ago",
    type: "upload",
    status: "success",
    details: "12 photos uploaded"
  }
]

export default function ActivityPage() {
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
      case "task":
        return <CheckCircle className="h-4 w-4" />
      case "upload":
        return <FileText className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
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
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary">
              Activity Feed
            </h1>
            <p className="text-text-secondary">
              Real-time activities and system events
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Today's Activity</p>
                  <p className="text-2xl font-bold text-text-primary">47</p>
                </div>
                <div className="p-2 rounded-lg bg-teal-primary/10">
                  <Activity className="h-5 w-5 text-teal-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Reports Submitted</p>
                  <p className="text-2xl font-bold text-text-primary">23</p>
                </div>
                <div className="p-2 rounded-lg bg-earth-green/10">
                  <FileText className="h-5 w-5 text-earth-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Active Users</p>
                  <p className="text-2xl font-bold text-text-primary">12</p>
                </div>
                <div className="p-2 rounded-lg bg-hope-blue/10">
                  <Users className="h-5 w-5 text-hope-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Alerts Created</p>
                  <p className="text-2xl font-bold text-text-primary">3</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-alert/10">
                  <AlertTriangle className="h-5 w-5 text-amber-alert" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="neumorphic bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    placeholder="Search activities..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="report">Reports</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="validation">Validation</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="field-agents">Field Agents</SelectItem>
                    <SelectItem value="analysts">Data Analysts</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Today" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="neumorphic bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-poppins text-text-primary">
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] lg:h-[700px]">
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
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            {activity.details && (
                              <p className="text-xs text-text-secondary mb-1">
                                {activity.details}
                              </p>
                            )}
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
      </div>
    </AppLayout>
  )
}