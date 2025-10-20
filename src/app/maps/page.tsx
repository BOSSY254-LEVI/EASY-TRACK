"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MapPin, 
  Filter, 
  Layers, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Search,
  Maximize2,
  Download
} from "lucide-react"

export default function MapsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary">
              Live Maps
            </h1>
            <p className="text-text-secondary">
              Real-time geographic visualization of field activities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-teal-primary hover:bg-teal-primary/90 w-full sm:w-auto">
              <Maximize2 className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <Card className="neumorphic bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    placeholder="Search locations, teams, or activities..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Activities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                    <SelectItem value="alerts">Alerts</SelectItem>
                    <SelectItem value="teams">Teams</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="nairobi">Nairobi</SelectItem>
                    <SelectItem value="mombasa">Mombasa</SelectItem>
                    <SelectItem value="kisumu">Kisumu</SelectItem>
                    <SelectItem value="nakuru">Nakuru</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Container */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Map */}
          <div className="xl:col-span-3">
            <Card className="neumorphic bg-card border-border h-[600px] lg:h-[700px]">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full bg-gradient-to-br from-teal-primary/5 to-hope-blue/5 rounded-lg overflow-hidden">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-teal-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="h-8 w-8 text-teal-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-poppins font-semibold text-text-primary">
                          Interactive Map View
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Real-time field activities and team locations
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge className="bg-earth-green text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          12 Active Teams
                        </Badge>
                        <Badge className="bg-amber-alert text-white">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          3 Alerts
                        </Badge>
                        <Badge className="bg-teal-primary text-white">
                          <Activity className="h-3 w-3 mr-1" />
                          45 Reports Today
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur">
                      <Layers className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur">
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur rounded-lg p-3 border border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Legend</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-earth-green rounded-full"></div>
                        <span className="text-xs text-text-secondary">Active Teams</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-alert rounded-full"></div>
                        <span className="text-xs text-text-secondary">Alerts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-teal-primary rounded-full"></div>
                        <span className="text-xs text-text-secondary">Reports</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <Card className="neumorphic bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-poppins text-text-primary">
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { time: "2 min ago", activity: "New report submitted", location: "Nairobi", type: "report" },
                  { time: "5 min ago", activity: "Team location updated", location: "Mombasa", type: "team" },
                  { time: "12 min ago", activity: "Water quality alert", location: "Kisumu", type: "alert" },
                  { time: "18 min ago", activity: "Vaccination completed", location: "Nakuru", type: "success" },
                  { time: "25 min ago", activity: "New team deployed", location: "Nairobi", type: "team" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      item.type === 'alert' ? 'bg-amber-alert' :
                      item.type === 'success' ? 'bg-earth-green' :
                      item.type === 'team' ? 'bg-hope-blue' : 'bg-teal-primary'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary">{item.activity}</p>
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="neumorphic bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-poppins text-text-primary">
                  Regional Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { region: "Nairobi", teams: 5, reports: 23, status: "active" },
                  { region: "Mombasa", teams: 3, reports: 15, status: "active" },
                  { region: "Kisumu", teams: 2, reports: 8, status: "warning" },
                  { region: "Nakuru", teams: 2, reports: 12, status: "active" },
                ].map((region) => (
                  <div key={region.region} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{region.region}</p>
                      <p className="text-xs text-text-secondary">
                        {region.teams} teams • {region.reports} reports
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      region.status === 'active' ? 'bg-earth-green' : 'bg-amber-alert'
                    }`}></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}