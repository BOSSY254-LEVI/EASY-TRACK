"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Database, 
  Search, 
  Download, 
  Upload, 
  Filter,
  Table,
  FileText,
  Calendar,
  TrendingUp
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const datasets = [
  {
    id: 1,
    name: "Water Quality Reports",
    description: "Comprehensive water quality data from all monitoring stations",
    records: 2847,
    size: "124 MB",
    lastUpdated: "2 hours ago",
    category: "water",
    status: "active"
  },
  {
    id: 2,
    name: "Health Survey Results",
    description: "Community health assessments and vaccination records",
    records: 1563,
    size: "89 MB",
    lastUpdated: "1 day ago",
    category: "health",
    status: "active"
  },
  {
    id: 3,
    name: "Climate Data Logs",
    description: "Weather patterns and environmental measurements",
    records: 3421,
    size: "256 MB",
    lastUpdated: "3 hours ago",
    category: "climate",
    status: "syncing"
  },
  {
    id: 4,
    name: "Field Team Activities",
    description: "Team locations, activities, and performance metrics",
    records: 892,
    size: "45 MB",
    lastUpdated: "30 minutes ago",
    category: "operations",
    status: "active"
  }
]

export default function DatabasePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-earth-green text-white"
      case "syncing":
        return "bg-amber-alert text-white"
      case "error":
        return "bg-coral-critical text-white"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "water":
        return "text-teal-primary"
      case "health":
        return "text-earth-green"
      case "climate":
        return "text-hope-blue"
      case "operations":
        return "text-amber-alert"
      default:
        return "text-text-secondary"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary">
              Database
            </h1>
            <p className="text-text-secondary">
              Manage and analyze field data collections
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button className="bg-teal-primary hover:bg-teal-primary/90 w-full sm:w-auto">
              <Database className="h-4 w-4 mr-2" />
              New Dataset
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Records</p>
                  <p className="text-2xl font-bold text-text-primary">8.7K</p>
                </div>
                <div className="p-2 rounded-lg bg-teal-primary/10">
                  <Database className="h-5 w-5 text-teal-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Datasets</p>
                  <p className="text-2xl font-bold text-text-primary">4</p>
                </div>
                <div className="p-2 rounded-lg bg-earth-green/10">
                  <Table className="h-5 w-5 text-earth-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Storage Used</p>
                  <p className="text-2xl font-bold text-text-primary">514 MB</p>
                </div>
                <div className="p-2 rounded-lg bg-hope-blue/10">
                  <TrendingUp className="h-5 w-5 text-hope-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Last Sync</p>
                  <p className="text-2xl font-bold text-text-primary">2h</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-alert/10">
                  <Calendar className="h-5 w-5 text-amber-alert" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="neumorphic bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    placeholder="Search datasets, records, or categories..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="climate">Climate</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="syncing">Syncing</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
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

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {datasets.map((dataset) => (
            <Card key={dataset.id} className="neumorphic bg-card border-border hover:shadow-card-hover transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-poppins text-text-primary mb-2">
                      {dataset.name}
                    </CardTitle>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {dataset.description}
                    </p>
                  </div>
                  <Badge className={getStatusColor(dataset.status)}>
                    {dataset.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dataset Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">{dataset.records.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary">Records</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">{dataset.size}</p>
                    <p className="text-xs text-text-secondary">Size</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-text-primary">{dataset.lastUpdated}</p>
                    <p className="text-xs text-text-secondary">Updated</p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center gap-2">
                  <FileText className={`h-4 w-4 ${getCategoryColor(dataset.category)}`} />
                  <span className="text-sm text-text-secondary capitalize">{dataset.category}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Table className="h-4 w-4 mr-2" />
                    View Data
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
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