"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Navigation,
  Search,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface TeamLocation {
  id: number
  name: string
  lat: number
  lng: number
  status: "active" | "inactive" | "alert"
  members: number
  lastUpdate: string
  currentTask?: string
}

interface LocationData {
  lat: number
  lng: number
  address: string
}

const teamLocations: TeamLocation[] = [
  {
    id: 1,
    name: "Water Quality Team",
    lat: -1.2864,
    lng: 36.8172,
    status: "active",
    members: 3,
    lastUpdate: "2 hours ago",
    currentTask: "Sampling at River Point A"
  },
  {
    id: 2,
    name: "Vaccination Squad",
    lat: -1.2921,
    lng: 36.8219,
    status: "active",
    members: 2,
    lastUpdate: "1 hour ago",
    currentTask: "Mobile clinic setup"
  },
  {
    id: 3,
    name: "Climate Research Unit",
    lat: -1.2833,
    lng: 36.8167,
    status: "alert",
    members: 1,
    lastUpdate: "30 minutes ago",
    currentTask: "Weather station maintenance"
  },
  {
    id: 4,
    name: "Health Survey Team",
    lat: -1.2864,
    lng: 36.8219,
    status: "active",
    members: 4,
    lastUpdate: "45 minutes ago",
    currentTask: "Household surveys"
  }
]

function MapController({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])

  return null
}

function LocationMarker({ location }: { location: LocationData }) {
  return (
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        <div className="p-2">
          <h3 className="font-medium text-text-primary">{location.address}</h3>
          <p className="text-sm text-text-secondary">
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        </div>
      </Popup>
    </Marker>
  )
}

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  const filteredTeams = teamLocations.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.currentTask?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || team.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-earth-green" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-amber-alert" />
      case "inactive":
        return <Clock className="h-4 w-4 text-text-secondary" />
      default:
        return <MapPin className="h-4 w-4 text-text-secondary" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-earth-green text-white"
      case "alert":
        return "bg-amber-alert text-white"
      case "inactive":
        return "bg-muted text-text-secondary"
      default:
        return "bg-muted text-text-secondary"
    }
  }

  const handleGetCurrentLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
          setSelectedLocation({
            lat: latitude,
            lng: longitude,
            address: "Your Current Location"
          })
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        }
      )
    } else {
      alert("Geolocation is not supported by this browser.")
      setIsLocating(false)
    }
  }

  const center: [number, number] = userLocation || [-1.2864, 36.8172] // Default to Nairobi

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="neumorphic bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-poppins text-text-primary flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search teams or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Button */}
            <Button
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              variant="outline"
              className="whitespace-nowrap"
            >
              <Navigation className="h-4 w-4 mr-2" />
              {isLocating ? "Locating..." : "My Location"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="neumorphic bg-card border-border">
            <CardContent className="p-0">
              <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                  center={center}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapController center={center} />

                  {/* Team Markers */}
                  {filteredTeams.map((team) => (
                    <Marker
                      key={team.id}
                      position={[team.lat, team.lng]}
                      icon={new L.Icon({
                        iconUrl: `data:image/svg+xml;base64,${btoa(`
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${
                              team.status === 'active' ? '#4CAF50' :
                              team.status === 'alert' ? '#F4A261' : '#5A6C6C'
                            }"/>
                          </svg>
                        `)}`,
                        iconSize: [24, 24],
                        iconAnchor: [12, 24],
                        popupAnchor: [0, -24]
                      })}
                    >
                      <Popup>
                        <div className="p-3 min-w-64">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-text-primary">{team.name}</h3>
                            <Badge className={getStatusColor(team.status)}>
                              {team.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              <span>{team.members} members</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>Updated {team.lastUpdate}</span>
                            </div>
                            {team.currentTask && (
                              <div className="flex items-center gap-2">
                                <Target className="h-3 w-3" />
                                <span>{team.currentTask}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* User Location Marker */}
                  {selectedLocation && (
                    <LocationMarker location={selectedLocation} />
                  )}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team List Sidebar */}
        <div className="space-y-4">
          <Card className="neumorphic bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-text-primary">
                Active Teams ({filteredTeams.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredTeams.map((team) => (
                <div
                  key={team.id}
                  className="p-3 bg-muted rounded-lg border border-border hover:shadow-subtle transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    // Could center map on this team
                    console.log(`Center map on ${team.name}`)
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary text-sm">{team.name}</h4>
                    {getStatusIcon(team.status)}
                  </div>
                  <div className="space-y-1 text-xs text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{team.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{team.lastUpdate}</span>
                    </div>
                    {team.currentTask && (
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span className="truncate">{team.currentTask}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredTeams.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">No teams found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="neumorphic bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-text-primary">
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Active Teams</span>
                <Badge className="bg-earth-green text-white">
                  {filteredTeams.filter(t => t.status === 'active').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Alerts</span>
                <Badge className="bg-amber-alert text-white">
                  {filteredTeams.filter(t => t.status === 'alert').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Total Members</span>
                <span className="font-medium text-text-primary">
                  {filteredTeams.reduce((sum, team) => sum + team.members, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
