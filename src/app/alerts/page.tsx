"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User,
  Filter,
  Search,
  X,
  Eye,
  Archive
} from "lucide-react"

const alerts = [
  {
    id: 1,
    title: "Water Quality Alert",
    description: "Contamination detected in water source at Station A-234",
    severity: "critical",
    status: "active",
    location: "Nairobi Region",
    reportedBy: "Sarah Chen",
    reportedAt: "30 minutes ago",
    assignedTo: "Mike Johnson",
    category: "water"
  },
  {
    id: 2,
    title: "Medical Supply Shortage",
    description: "Vaccine supplies running low at Northern District Clinic",
    severity: "high",
    status: "active",
    location: "Northern District",
    reportedBy: "Emma Davis",
    reportedAt: "2 hours ago",
    assignedTo: "Alex Kumar",
    category: "medical"
  },
  {
    id: 3,
    title: "Equipment Malfunction",
    description: "Water testing equipment requires calibration",
    severity: "medium",
    status: "investigating",
    location: "Mombasa Coastal",
    reportedBy: "John Doe",
    reportedAt: "4 hours ago",
    assignedTo: "Lisa Wang",
    category: "equipment"
  },
  {
    id: 4,
    title: "Weather Advisory",
    description: "Heavy rainfall expected in next 48 hours",
    severity: "low",
    status: "resolved",
    location: "Kisumu Region",
    reportedBy: "System",
    reportedAt: "6 hours ago",
    assignedTo: "All Teams",
    category: "weather"
  }
]

export default function AlertsPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-coral-critical text-white"
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-amber-alert text-white"
      case "low":
        return "bg-hope-blue text-white"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-coral-critical text-white"
      case "investigating":
        return "bg-amber-alert text-white"
      case "resolved":
        return "bg-earth-green text-white"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "low":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary">
              Alerts & Incidents
            </h1>
            <p className="text-text-secondary">
              Monitor and respond to field alerts and incidents
            </p>
          </div>
          <Button className="bg-teal-primary hover:bg-teal-primary/90 w-full sm:w-auto">
            <AlertTriangle className="h-4 w-4 mr-2" />
            New Alert
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Active Alerts</p>
                  <p className="text-2xl font-bold text-coral-critical">2</p>
                </div>
                <div className="p-2 rounded-lg bg-coral-critical/10">
                  <AlertTriangle className="h-5 w-5 text-coral-critical" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Investigating</p>
                  <p className="text-2xl font-bold text-amber-alert">1</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-alert/10">
                  <Clock className="h-5 w-5 text-amber-alert" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Resolved Today</p>
                  <p className="text-2xl font-bold text-earth-green">8</p>
                </div>
                <div className="p-2 rounded-lg bg-earth-green/10">
                  <CheckCircle className="h-5 w-5 text-earth-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Avg Response</p>
                  <p className="text-2xl font-bold text-text-primary">1.2h</p>
                </div>
                <div className="p-2 rounded-lg bg-teal-primary/10">
                  <Clock className="h-5 w-5 text-teal-primary" />
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
                    placeholder="Search alerts..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="All Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="weather">Weather</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="neumorphic bg-card border-border hover:shadow-card-hover transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Alert Icon and Severity */}
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-text-secondary">
                          {alert.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Alert Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Location:</span>
                        <span className="text-text-primary font-medium">{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Reported by:</span>
                        <span className="text-text-primary font-medium">{alert.reportedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Time:</span>
                        <span className="text-text-primary font-medium">{alert.reportedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Assigned to:</span>
                        <span className="text-text-primary font-medium">{alert.assignedTo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col lg:flex-row gap-2">
                    <Button variant="outline" size="sm" className="w-full lg:w-auto">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {alert.status === "resolved" ? (
                      <Button variant="outline" size="sm" className="w-full lg:w-auto">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-earth-green hover:bg-earth-green/90 w-full lg:w-auto">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}