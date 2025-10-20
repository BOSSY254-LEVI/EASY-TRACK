"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  MoreHorizontal,
  UserPlus,
  Filter,
  Search
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const teams = [
  {
    id: 1,
    name: "Water Quality Team",
    leader: "Sarah Chen",
    members: ["Sarah Chen", "Mike Johnson", "Emma Davis"],
    location: "Nairobi Region",
    activeProjects: 3,
    completedTasks: 45,
    totalTasks: 60,
    status: "active",
    efficiency: 75,
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Vaccination Squad",
    leader: "Alex Kumar",
    members: ["Alex Kumar", "Lisa Wang"],
    location: "Northern District",
    activeProjects: 2,
    completedTasks: 28,
    totalTasks: 35,
    status: "active",
    efficiency: 80,
    lastActive: "1 hour ago"
  },
  {
    id: 3,
    name: "Climate Research Unit",
    leader: "John Doe",
    members: ["John Doe", "Sarah Chen"],
    location: "Coastal Region",
    activeProjects: 1,
    completedTasks: 12,
    totalTasks: 20,
    status: "busy",
    efficiency: 60,
    lastActive: "30 minutes ago"
  }
]

export default function TeamsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-earth-green text-white"
      case "busy":
        return "bg-amber-alert text-white"
      case "offline":
        return "bg-muted text-text-secondary"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary">
              Teams
            </h1>
            <p className="text-text-secondary">
              Manage field teams and track performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-teal-primary hover:bg-teal-primary/90 w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Teams</p>
                  <p className="text-2xl font-bold text-text-primary">3</p>
                </div>
                <div className="p-2 rounded-lg bg-teal-primary/10">
                  <Users className="h-5 w-5 text-teal-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Active Members</p>
                  <p className="text-2xl font-bold text-text-primary">7</p>
                </div>
                <div className="p-2 rounded-lg bg-earth-green/10">
                  <Users className="h-5 w-5 text-earth-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-text-primary">72%</p>
                </div>
                <div className="p-2 rounded-lg bg-hope-blue/10">
                  <Calendar className="h-5 w-5 text-hope-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Tasks Today</p>
                  <p className="text-2xl font-bold text-text-primary">85</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-alert/10">
                  <Calendar className="h-5 w-5 text-amber-alert" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="neumorphic bg-card border-border">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                placeholder="Search teams, members, or locations..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card key={team.id} className="neumorphic bg-card border-border hover:shadow-card-hover transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-poppins text-text-primary mb-2">
                      {team.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(team.status)}>
                        {team.status}
                      </Badge>
                      <span className="text-xs text-text-secondary">
                        Last active: {team.lastActive}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Team</DropdownMenuItem>
                      <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Leader */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {team.leader.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{team.leader}</p>
                    <p className="text-xs text-text-secondary">Team Leader</p>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">Team Members ({team.members.length})</p>
                  <div className="flex -space-x-2">
                    {team.members.map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-card">
                        <AvatarFallback className="text-xs">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="h-4 w-4" />
                  <span>{team.location}</span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Task Progress</span>
                    <span className="text-text-primary font-medium">
                      {team.completedTasks}/{team.totalTasks}
                    </span>
                  </div>
                  <Progress 
                    value={(team.completedTasks / team.totalTasks) * 100} 
                    className="h-2" 
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">{team.activeProjects}</p>
                    <p className="text-xs text-text-secondary">Active Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">{team.efficiency}%</p>
                    <p className="text-xs text-text-secondary">Efficiency</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-teal-primary hover:bg-teal-primary/90">
                    Contact Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}