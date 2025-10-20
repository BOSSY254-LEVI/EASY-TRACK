"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { TrendingUp, BarChart3, PieChartIcon, Activity } from "lucide-react"

const monthlyData = [
  { month: "Jan", reports: 245, alerts: 12, teams: 8 },
  { month: "Feb", reports: 312, alerts: 18, teams: 10 },
  { month: "Mar", reports: 289, alerts: 15, teams: 9 },
  { month: "Apr", reports: 367, alerts: 22, teams: 11 },
  { month: "May", reports: 423, alerts: 19, teams: 12 },
  { month: "Jun", reports: 456, alerts: 23, teams: 12 },
]

const regionData = [
  { name: "Nairobi", value: 35, color: "#0F5959" },
  { name: "Mombasa", value: 25, color: "#2A9D8F" },
  { name: "Kisumu", value: 20, color: "#4CAF50" },
  { name: "Nakuru", value: 15, color: "#F4A261" },
  { name: "Other", value: 5, color: "#E76F51" },
]

const qualityTrend = [
  { day: "Mon", quality: 92, target: 95 },
  { day: "Tue", quality: 94, target: 95 },
  { day: "Wed", quality: 91, target: 95 },
  { day: "Thu", quality: 93, target: 95 },
  { day: "Fri", quality: 95, target: 95 },
  { day: "Sat", quality: 94, target: 95 },
  { day: "Sun", quality: 96, target: 95 },
]

const activityData = [
  { time: "00:00", activity: 12 },
  { time: "04:00", activity: 8 },
  { time: "08:00", activity: 45 },
  { time: "12:00", activity: 78 },
  { time: "16:00", activity: 65 },
  { time: "20:00", activity: 32 },
  { time: "24:00", activity: 15 },
]

export function ChartGrid() {
  return (
    <div className="space-y-6">
      {/* Monthly Reports Chart */}
      <Card className="neumorphic bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-teal-primary" />
              <CardTitle className="text-lg font-poppins text-text-primary">
                Monthly Reports & Activity
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <TrendingUp className="h-4 w-4 text-earth-green" />
              <span>+18.5%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E6E5" />
              <XAxis dataKey="month" tick={{ fill: "#5A6C6C", fontSize: 12 }} />
              <YAxis tick={{ fill: "#5A6C6C", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E0E6E5",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="reports" fill="#0F5959" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alerts" fill="#E76F51" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="neumorphic bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-hope-blue" />
              <CardTitle className="text-lg font-poppins text-text-primary">
                Regional Distribution
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {regionData.map((region) => (
                <div key={region.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-xs text-text-secondary">
                    {region.name}: {region.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Quality Trend */}
        <Card className="neumorphic bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-earth-green" />
              <CardTitle className="text-lg font-poppins text-text-primary">
                Data Quality Trend
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={qualityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E6E5" />
                <XAxis dataKey="day" tick={{ fill: "#5A6C6C", fontSize: 12 }} />
                <YAxis tick={{ fill: "#5A6C6C", fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FFFFFF", 
                    border: "1px solid #E0E6E5",
                    borderRadius: "8px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="#4CAF50" 
                  strokeWidth={2}
                  dot={{ fill: "#4CAF50", r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#E76F51" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heat Map */}
      <Card className="neumorphic bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-primary" />
            <CardTitle className="text-lg font-poppins text-text-primary">
              Daily Activity Pattern
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E6E5" />
              <XAxis dataKey="time" tick={{ fill: "#5A6C6C", fontSize: 12 }} />
              <YAxis tick={{ fill: "#5A6C6C", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E0E6E5",
                  borderRadius: "8px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="activity" 
                stroke="#2A9D8F" 
                fill="#2A9D8F" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}