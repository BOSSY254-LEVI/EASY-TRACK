"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  MapPin, 
  TrendingUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    name: "Water Quality Monitoring",
    description: "Comprehensive water quality assessment across Nairobi region",
    status: "active",
    progress: 75,
    team: ["Sarah Chen", "Mike Johnson", "Emma Davis"],
    location: "Nairobi Region",
    deadline: "2024-03-15",
    priority: "high",
    reports: 234,
    lastUpdate: "2 hours ago"
  },
  {
    id: 2,
    name: "Vaccination Campaign",
    description: "Rural vaccination drive for Northern District",
    status: "active",
    progress: 60,
    team: ["Alex Kumar", "Lisa Wang"],
    location: "Northern District",
    deadline: "2024-03-20",
    priority: "medium",
    reports: 156,
    lastUpdate: "5 hours ago"
  },
  {
    id: 3,
    name: "Climate Data Collection",
    description: "Long-term climate pattern analysis",
    status: "planning",
    progress: 25,
    team: ["John Doe", "Sarah Chen"],
    location: "Coastal Region",
    deadline: "2024-04-01",
    priority: "low",
    reports: 45,
    lastUpdate: "1 day ago"
  }
]

export default function ProjectsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-earth-green text-white"
      case "planning":
        return "bg-amber-alert text-white"
      case "completed":
        return "bg-teal-primary text-white"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-coral-critical"
      case "medium":
        return "text-amber-alert"
      case "low":
        return "text-earth-green"
      default:
        return "text-text-secondary"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary">
              Projects
            </h1>
            <p className="text-text-secondary">
              Manage and monitor field projects
            </p>
          </div>
          <Button className="bg-teal-primary hover:bg-teal-primary/90 w-full sm:w-auto">
            <FolderKanban className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Active Projects</p>
                  <p className="text-2xl font-bold text-text-primary">2</p>
                </div>
                <div className="p-2 rounded-lg bg-earth-green/10">
                  <FolderKanban className="h-5 w-5 text-earth-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Reports</p>
                  <p className="text-2xl font-bold text-text-primary">435</p>
                </div>
                <div className="p-2 rounded-lg bg-teal-primary/10">
                  <TrendingUp className="h-5 w-5 text-teal-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Team Members</p>
                  <p className="text-2xl font-bold text-text-primary">7</p>
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
                  <p className="text-sm text-text-secondary">Avg Progress</p>
                  <p className="text-2xl font-bold text-text-primary">53%</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-alert/10">
                  <Calendar className="h-5 w-5 text-amber-alert" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="neumorphic bg-card border-border hover:shadow-card-hover transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-poppins text-text-primary mb-2">
                      {project.name}
                    </CardTitle>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-coral-critical">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status and Priority */}
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-text-secondary">Priority:</span>
                    <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Progress</span>
                    <span className="text-text-primary font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Team Members */}
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">Team Members</p>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-card">
                        <AvatarFallback className="text-xs">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-teal-primary border-2 border-card flex items-center justify-center">
                        <span className="text-white text-xs font-medium">+{project.team.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location and Deadline */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {project.deadline}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">{project.reports}</p>
                    <p className="text-xs text-text-secondary">Reports</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-text-secondary">{project.lastUpdate}</p>
                    <p className="text-xs text-text-secondary">Last Update</p>
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