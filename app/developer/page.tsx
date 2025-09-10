"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  Calendar,
  Building,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Rocket,
  Settings,
} from "lucide-react"

// Mock data - replace with real data later
const mockData = {
  totalEOIs: 1247,
  totalSlots: 892,
  attendanceProjection: 756,
  reservedUnits: 234,
  launches: [
    { id: 1, name: "Marina Heights Phase 2", date: "2024-01-15", status: "active" },
    { id: 2, name: "Downtown Towers", date: "2024-01-22", status: "upcoming" },
    { id: 3, name: "Garden Villas", date: "2024-02-05", status: "planning" },
  ],
}

export default function DeveloperDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Developer Dashboard</h1>
          <p className="text-muted-foreground mt-1">System overview and launch management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Open Booking Window
          </Button>
          <Button>
            <Building className="h-4 w-4 mr-2" />
            New Launch
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total EOIs Collected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalEOIs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last launch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slots Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalSlots.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockData.totalSlots / mockData.totalEOIs) * 100)}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Projection</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.attendanceProjection.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockData.attendanceProjection / mockData.totalSlots) * 100)}% expected attendance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Units</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.reservedUnits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Live reservations</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Slot Utilization by Hour
            </CardTitle>
            <CardDescription>Booking distribution across Taskeen day hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Chart visualization will be implemented</p>
                <p className="text-sm">Peak hours: 10 AM - 2 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unit Demand Heat Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Unit Demand Heat Map
            </CardTitle>
            <CardDescription>Most requested units from client preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Marina View - Unit A-101</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-destructive rounded-full" />
                  <Badge variant="destructive" className="text-xs">
                    High Risk
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Garden View - Unit B-205</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-secondary rounded-full" />
                  <Badge variant="secondary" className="text-xs">
                    Medium
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">City View - Unit C-301</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-muted rounded-full" />
                  <Badge variant="outline" className="text-xs">
                    Low
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Launches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Active Launches
          </CardTitle>
          <CardDescription>Current and upcoming launch events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.launches.map((launch) => (
              <div key={launch.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">{launch.name}</h4>
                  <p className="text-sm text-muted-foreground">Launch Date: {launch.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      launch.status === "active" ? "default" : launch.status === "upcoming" ? "secondary" : "outline"
                    }
                  >
                    {launch.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <h3 className="font-medium mb-1">Risk Alerts</h3>
            <p className="text-sm text-muted-foreground">3 units at high demand risk</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium mb-1">Agent Performance</h3>
            <p className="text-sm text-muted-foreground">View utilization reports</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <h3 className="font-medium mb-1">System Settings</h3>
            <p className="text-sm text-muted-foreground">Configure policies & rules</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
