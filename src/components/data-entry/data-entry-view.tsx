"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Save, 
  Send, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  MapPin,
  Camera,
  FileText,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

export function DataEntryView() {
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'pending'>('synced')
  const [formData, setFormData] = useState({
    reportType: '',
    location: '',
    description: '',
    teamMembers: '',
    priority: 'medium',
    attachments: []
  })
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')

  useEffect(() => {
    // Simulate network status changes
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.2)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Auto-save simulation
    const autoSaveInterval = setInterval(() => {
      if (formData.reportType || formData.location || formData.description) {
        setAutoSaveStatus('saving')
        setTimeout(() => {
          setAutoSaveStatus(isOnline ? 'saved' : 'error')
          if (!isOnline) {
            setSyncStatus('pending')
          }
        }, 1000)
      }
    }, 5000)

    return () => clearInterval(autoSaveInterval)
  }, [formData, isOnline])

  const handleSubmit = () => {
    setSyncStatus('syncing')
    setTimeout(() => {
      setSyncStatus(isOnline ? 'synced' : 'pending')
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setAutoSaveStatus('saving')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-text-primary">
            Data Entry
          </h1>
          <p className="text-text-secondary">
            Submit field reports and observations
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg border",
            isOnline 
              ? "bg-earth-green/10 border-earth-green/20 text-earth-green" 
              : "bg-amber-alert/10 border-amber-alert/20 text-amber-alert"
          )}>
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span className="text-sm font-medium">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span className="text-sm font-medium">Offline</span>
              </>
            )}
          </div>

          {/* Sync Status */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg border",
            syncStatus === 'synced' 
              ? "bg-earth-green/10 border-earth-green/20 text-earth-green"
              : syncStatus === 'syncing'
              ? "bg-teal-primary/10 border-teal-primary/20 text-teal-primary"
              : "bg-amber-alert/10 border-amber-alert/20 text-amber-alert"
          )}>
            {syncStatus === 'synced' && <CheckCircle className="h-4 w-4" />}
            {syncStatus === 'syncing' && <div className="h-4 w-4 border-2 border-teal-primary border-t-transparent rounded-full animate-spin" />}
            {syncStatus === 'pending' && <AlertCircle className="h-4 w-4" />}
            <span className="text-sm font-medium">
              {syncStatus === 'synced' && 'Synced'}
              {syncStatus === 'syncing' && 'Syncing...'}
              {syncStatus === 'pending' && 'Pending Sync'}
            </span>
          </div>

          {/* Auto-save Status */}
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            {autoSaveStatus === 'saved' && <CheckCircle className="h-4 w-4 text-earth-green" />}
            {autoSaveStatus === 'saving' && <div className="h-4 w-4 border-2 border-teal-primary border-t-transparent rounded-full animate-spin" />}
            {autoSaveStatus === 'error' && <AlertCircle className="h-4 w-4 text-amber-alert" />}
            <span>
              {autoSaveStatus === 'saved' && 'All changes saved'}
              {autoSaveStatus === 'saving' && 'Saving...'}
              {autoSaveStatus === 'error' && 'Save failed - will retry'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Information */}
          <Card className="neumorphic bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-text-primary flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-primary" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={formData.reportType} onValueChange={(value) => handleInputChange('reportType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water-quality">Water Quality</SelectItem>
                      <SelectItem value="health-survey">Health Survey</SelectItem>
                      <SelectItem value="climate-data">Climate Data</SelectItem>
                      <SelectItem value="field-observation">Field Observation</SelectItem>
                      <SelectItem value="incident-report">Incident Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    id="location"
                    placeholder="Enter location or use GPS"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of your observations..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Team Information */}
          <Card className="neumorphic bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-text-primary flex items-center gap-2">
                <Users className="h-5 w-5 text-hope-blue" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamMembers">Team Members</Label>
                <Input
                  id="teamMembers"
                  placeholder="Enter team member names (comma separated)"
                  value={formData.teamMembers}
                  onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 text-text-secondary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary mb-2">
                    Drop files here or click to upload
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="neumorphic bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-text-primary">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-teal-primary hover:bg-teal-primary/90"
                onClick={handleSubmit}
                disabled={syncStatus === 'syncing'}
              >
                {syncStatus === 'syncing' ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Form Progress</span>
                  <span className="text-text-primary font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Templates */}
          <Card className="neumorphic bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-text-primary">
                Recent Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Water Quality Test", uses: 12 },
                { name: "Health Survey", uses: 8 },
                { name: "Incident Report", uses: 5 }
              ].map((template) => (
                <Button
                  key={template.name}
                  variant="ghost"
                  className="w-full justify-between h-auto p-3"
                >
                  <span className="text-sm">{template.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {template.uses} uses
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Offline Queue */}
          {!isOnline && (
            <Card className="neumorphic bg-card border-card border-amber-alert/20">
              <CardHeader>
                <CardTitle className="text-lg font-poppins text-amber-alert flex items-center gap-2">
                  <WifiOff className="h-5 w-5" />
                  Offline Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Pending reports</span>
                    <Badge variant="secondary" className="bg-amber-alert text-white">
                      3
                    </Badge>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Reports will be automatically synced when connection is restored.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}