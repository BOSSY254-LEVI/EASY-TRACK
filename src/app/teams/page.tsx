"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  MapPin,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  UserPlus,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const initialTeams = [
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

interface TeamMember {
  id: number
  name: string
  email: string
  role: string
  phone?: string
  joinDate: string
  avatar?: string
  status: "active" | "inactive"
}

const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@easytrack.org",
    role: "Team Lead",
    phone: "+254 712 345 678",
    joinDate: "2023-01-15",
    avatar: "/sarah.jpg",
    status: "active"
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@easytrack.org",
    role: "Field Agent",
    phone: "+254 723 456 789",
    joinDate: "2023-02-20",
    avatar: "/mike.jpg",
    status: "active"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@easytrack.org",
    role: "Data Analyst",
    phone: "+254 734 567 890",
    joinDate: "2023-03-10",
    avatar: "/emma.jpg",
    status: "active"
  },
  {
    id: 4,
    name: "Alex Kumar",
    email: "alex.kumar@easytrack.org",
    role: "Field Agent",
    phone: "+254 745 678 901",
    joinDate: "2023-04-05",
    avatar: "/alex.jpg",
    status: "active"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@easytrack.org",
    role: "Coordinator",
    phone: "+254 756 789 012",
    joinDate: "2023-05-12",
    avatar: "/lisa.jpg",
    status: "active"
  },
  {
    id: 6,
    name: "John Doe",
    email: "john.doe@easytrack.org",
    role: "Research Lead",
    phone: "+254 767 890 123",
    joinDate: "2023-06-18",
    avatar: "/john.jpg",
    status: "active"
  }
]

export default function TeamsPage() {
  const [teams, setTeams] = useState(initialTeams)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

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

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || member.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleAddMember = (newMember: Omit<TeamMember, 'id'>) => {
    const member: TeamMember = {
      ...newMember,
      id: Math.max(...teamMembers.map(m => m.id)) + 1
    }
    setTeamMembers([...teamMembers, member])
    setIsAddMemberOpen(false)
  }

  const handleEditMember = (updatedMember: TeamMember) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    ))
    setEditingMember(null)
  }

  const handleDeleteMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const AddMemberDialog = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      role: "",
      phone: "",
      status: "active" as const
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      handleAddMember({
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      })
      setFormData({ name: "", email: "", role: "", phone: "", status: "active" })
    }

    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="Field Agent">Field Agent</SelectItem>
                  <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Research Lead">Research Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddMemberOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </div>
        </form>
      </DialogContent>
    )
  }

  const EditMemberDialog = ({ member }: { member: TeamMember }) => {
    const [formData, setFormData] = useState(member)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      handleEditMember(formData)
    }

    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="Field Agent">Field Agent</SelectItem>
                  <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Research Lead">Research Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setEditingMember(null)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    )
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
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-primary hover:bg-teal-primary/90 w-full sm:w-auto">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <AddMemberDialog />
            </Dialog>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
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

        {/* Team Members Section */}
        <Card className="neumorphic bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-poppins text-text-primary">
                  Team Members ({filteredMembers.length})
                </CardTitle>
                <p className="text-sm text-text-secondary">
                  Manage and track all team members
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="Field Agent">Field Agent</SelectItem>
                  <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Research Lead">Research Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Members List */}
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border hover:shadow-subtle transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-text-primary">{member.name}</h3>
                      <p className="text-sm text-text-secondary">{member.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {member.role}
                        </Badge>
                        <span className="text-xs text-text-secondary">
                          Joined {new Date(member.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      {member.phone && (
                        <p className="text-sm text-text-secondary">{member.phone}</p>
                      )}
                      <div className="flex items-center gap-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          member.status === "active" ? "bg-earth-green" : "bg-text-secondary"
                        )} />
                        <span className="text-xs text-text-secondary capitalize">
                          {member.status}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingMember(member)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-coral-critical"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">No team members found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Teams Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Teams Cards */}
          {teams.map((team) => (
            <Card key={team.id} className="neumorphic bg-card border-border hover:shadow-card-hover transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-poppins text-text-primary">
                    {team.name}
                  </CardTitle>
                  <Badge className={getStatusColor(team.status)}>
                    {team.status}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary">
                  Led by {team.leader}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Members */}
                <div>
                  <p className="text-sm text-text-secondary mb-2">
                    Team Members ({team.members.length})
                  </p>
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-card">
                        <AvatarFallback className="text-xs">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members.length > 4 && (
                      <div className="h-6 w-6 rounded-full bg-teal-primary border-2 border-card flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          +{team.members.length - 4}
                        </span>
                      </div>
                    )}
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

        {/* Edit Member Dialog */}
        {editingMember && (
          <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
            <EditMemberDialog member={editingMember} />
          </Dialog>
        )}
      </div>
    </AppLayout>
  )
}