"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Calendar,
  Users,
  Building,
  Settings,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockLaunches = [
  {
    id: 1,
    name: "Marina Heights Phase 2 Launch",
    project: "Marina Heights",
    projectId: 1,
    phase: "Phase 2 - Tower B",
    phaseId: 2,
    eoiStartDate: "2024-01-01",
    eoiEndDate: "2024-01-14",
    taskeenDays: [
      {
        id: 1,
        name: "Day 1 - Premium Units",
        date: "2024-01-15",
        startTime: "09:00",
        endTime: "18:00",
        targetUnits: "Premium Marina View",
        status: "active",
      },
      {
        id: 2,
        name: "Day 2 - Standard Units",
        date: "2024-01-16",
        startTime: "09:00",
        endTime: "17:00",
        targetUnits: "Standard Units",
        status: "upcoming",
      },
      {
        id: 3,
        name: "Day 3 - Remaining Inventory",
        date: "2024-01-17",
        startTime: "10:00",
        endTime: "16:00",
        targetUnits: "All Remaining",
        status: "upcoming",
      },
    ],
    slotMinutes: 30,
    bufferMinutes: 5,
    minRankChoices: 3,
    status: "active",
    totalEOIs: 456,
    bookedSlots: 234,
    agents: 12,
    unitsAvailable: 170,
  },
  {
    id: 2,
    name: "Downtown Towers Residential Launch",
    project: "Downtown Towers",
    projectId: 2,
    phase: "Phase 1 - Residential",
    phaseId: 4,
    eoiStartDate: "2024-01-08",
    eoiEndDate: "2024-01-21",
    taskeenDays: [
      {
        id: 4,
        name: "Day 1 - Penthouses",
        date: "2024-01-22",
        startTime: "09:00",
        endTime: "15:00",
        targetUnits: "Penthouses & Top Floors",
        status: "upcoming",
      },
      {
        id: 5,
        name: "Day 2 - Mid-Level Units",
        date: "2024-01-23",
        startTime: "09:00",
        endTime: "18:00",
        targetUnits: "Floors 10-25",
        status: "upcoming",
      },
    ],
    slotMinutes: 45,
    bufferMinutes: 10,
    minRankChoices: 5,
    status: "upcoming",
    totalEOIs: 789,
    bookedSlots: 123,
    agents: 18,
    unitsAvailable: 220,
  },
  {
    id: 3,
    name: "Garden Villas Premium Launch",
    project: "Garden Villas",
    projectId: 3,
    phase: "Phase 1 - Villas A-C",
    phaseId: 6,
    eoiStartDate: "2024-01-20",
    eoiEndDate: "2024-02-04",
    taskeenDays: [
      {
        id: 6,
        name: "Single Day Launch",
        date: "2024-02-05",
        startTime: "09:00",
        endTime: "17:00",
        targetUnits: "All Villa Types",
        status: "planning",
      },
    ],
    slotMinutes: 60,
    bufferMinutes: 15,
    minRankChoices: 3,
    status: "planning",
    totalEOIs: 234,
    bookedSlots: 0,
    agents: 8,
    unitsAvailable: 45,
  },
]

export default function LaunchesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLaunches = mockLaunches.filter(
    (launch) =>
      launch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      launch.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      launch.phase.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "upcoming":
        return "bg-secondary text-secondary-foreground"
      case "planning":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTaskeenDayStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-3 w-3 text-primary" />
      case "completed":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "upcoming":
        return <AlertCircle className="h-3 w-3 text-secondary" />
      default:
        return <Calendar className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Launches</h1>
          <p className="text-muted-foreground mt-1">
            Manage launch events with EOI collection and multiple Taskeen days
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Launch
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search launches, projects, or phases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filter by Status</Button>
        <Button variant="outline">Filter by Project</Button>
      </div>

      {/* Launches Grid */}
      <div className="grid gap-6">
        {filteredLaunches.map((launch) => (
          <Card key={launch.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{launch.name}</CardTitle>
                  <CardDescription className="mt-1 space-y-1">
                    <div>
                      {launch.project} → {launch.phase}
                    </div>
                    <div className="text-xs">
                      EOI Collection: {launch.eoiStartDate} to {launch.eoiEndDate} • {launch.unitsAvailable} units
                      available
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(launch.status)}>{launch.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Launch
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Taskeen Days section */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">Taskeen Days Schedule</h4>
                  <div className="grid gap-3">
                    {launch.taskeenDays.map((day) => (
                      <div key={day.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {getTaskeenDayStatusIcon(day.status)}
                          <div>
                            <div className="font-medium text-sm">{day.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {day.date} • {day.startTime} - {day.endTime} • {day.targetUnits}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {day.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Configuration */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Configuration</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {launch.slotMinutes}min slots
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-3 w-3" />
                        {launch.bufferMinutes}min buffer
                      </div>
                      <div>Min choices: {launch.minRankChoices}</div>
                    </div>
                  </div>

                  {/* EOI Collection Period */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">EOI Collection</h4>
                    <div className="space-y-1 text-sm">
                      <div>Starts: {launch.eoiStartDate}</div>
                      <div>Ends: {launch.eoiEndDate}</div>
                      <div className="text-xs text-muted-foreground">
                        {launch.taskeenDays.length} Taskeen day{launch.taskeenDays.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Statistics</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {launch.totalEOIs} EOIs
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {launch.bookedSlots} booked
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        {launch.agents} agents
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Manage Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLaunches.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No launches found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first launch."}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Launch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
