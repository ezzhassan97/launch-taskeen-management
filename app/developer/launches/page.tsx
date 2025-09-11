"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
  X,
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
  const [createLaunchOpen, setCreateLaunchOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedPhase, setSelectedPhase] = useState("")
  const [taskeenDays, setTaskeenDays] = useState([
    {
      id: 1,
      name: "",
      date: "",
      startTime: "09:00",
      endTime: "17:00",
      scope: "all",
      targetUnits: "",
    },
  ])

  const mockProjects = [
    {
      id: 1,
      name: "New Capital Gardens",
      phases: [
        { id: 1, name: "Phase 1 - Villas" },
        { id: 2, name: "Phase 2 - Apartments" },
        { id: 3, name: "Phase 3 - Townhouses" },
      ],
    },
    {
      id: 2,
      name: "Madinaty Residences",
      phases: [
        { id: 4, name: "Phase A - Premium" },
        { id: 5, name: "Phase B - Standard" },
      ],
    },
    {
      id: 3,
      name: "Sodic West",
      phases: [
        { id: 6, name: "Phase 1 - Villas" },
        { id: 7, name: "Phase 2 - Duplexes" },
      ],
    },
  ]

  const selectedProjectData = mockProjects.find((p) => p.id.toString() === selectedProject)

  const addTaskeenDay = () => {
    setTaskeenDays([
      ...taskeenDays,
      {
        id: taskeenDays.length + 1,
        name: "",
        date: "",
        startTime: "09:00",
        endTime: "17:00",
        scope: "all",
        targetUnits: "",
      },
    ])
  }

  const removeTaskeenDay = (id: number) => {
    setTaskeenDays(taskeenDays.filter((day) => day.id !== id))
  }

  const updateTaskeenDay = (id: number, field: string, value: string) => {
    setTaskeenDays(taskeenDays.map((day) => (day.id === id ? { ...day, [field]: value } : day)))
  }

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
        <Dialog open={createLaunchOpen} onOpenChange={setCreateLaunchOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Launch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Launch</DialogTitle>
              <DialogDescription>
                Set up a new launch with EOI collection period and Taskeen day configurations
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="eoi">EOI Settings</TabsTrigger>
                <TabsTrigger value="taskeen">Taskeen Days</TabsTrigger>
                <TabsTrigger value="slots">Slot Config</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="launch-name">Launch Name</Label>
                      <Input id="launch-name" placeholder="e.g., Marina Heights Phase 2 Launch" />
                    </div>

                    <div>
                      <Label htmlFor="project">Project</Label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProjects.map((project) => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phase">Phase</Label>
                      <Select value={selectedPhase} onValueChange={setSelectedPhase} disabled={!selectedProject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select phase" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedProjectData?.phases.map((phase) => (
                            <SelectItem key={phase.id} value={phase.id.toString()}>
                              {phase.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="start-date">EOI Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>

                    <div>
                      <Label htmlFor="end-date">EOI End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Launch description and details..." />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="eoi" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">EOI Type</Label>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="overall-eoi" name="eoi-type" value="overall" className="w-4 h-4" />
                        <Label htmlFor="overall-eoi" className="font-normal">
                          Overall EOI (Single EOI for entire launch)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="property-eoi" name="eoi-type" value="property" className="w-4 h-4" />
                        <Label htmlFor="property-eoi" className="font-normal">
                          EOI per Property Type
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="eoi-amount">EOI Amount (EGP)</Label>
                      <Input id="eoi-amount" type="number" placeholder="50000" />
                    </div>
                    <div>
                      <Label htmlFor="min-choices">Minimum Rank Choices</Label>
                      <Input id="min-choices" type="number" placeholder="3" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="payment-methods">Accepted Payment Methods</Label>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="bank-transfer" className="w-4 h-4" />
                        <Label htmlFor="bank-transfer" className="font-normal">
                          Bank Transfer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="cheque" className="w-4 h-4" />
                        <Label htmlFor="cheque" className="font-normal">
                          Cheque
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="online-payment" className="w-4 h-4" />
                        <Label htmlFor="online-payment" className="font-normal">
                          Online Payment
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="taskeen" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Taskeen Days Configuration</Label>
                    <Button onClick={addTaskeenDay} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Day
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {taskeenDays.map((day, index) => (
                      <Card key={day.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">Day {index + 1}</CardTitle>
                            {taskeenDays.length > 1 && (
                              <Button onClick={() => removeTaskeenDay(day.id)} variant="ghost" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`day-name-${day.id}`}>Day Name</Label>
                              <Input
                                id={`day-name-${day.id}`}
                                value={day.name}
                                onChange={(e) => updateTaskeenDay(day.id, "name", e.target.value)}
                                placeholder="e.g., Premium Units Day"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`day-date-${day.id}`}>Date</Label>
                              <Input
                                id={`day-date-${day.id}`}
                                type="date"
                                value={day.date}
                                onChange={(e) => updateTaskeenDay(day.id, "date", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`start-time-${day.id}`}>Start Time</Label>
                              <Input
                                id={`start-time-${day.id}`}
                                type="time"
                                value={day.startTime}
                                onChange={(e) => updateTaskeenDay(day.id, "startTime", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`end-time-${day.id}`}>End Time</Label>
                              <Input
                                id={`end-time-${day.id}`}
                                type="time"
                                value={day.endTime}
                                onChange={(e) => updateTaskeenDay(day.id, "endTime", e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor={`scope-${day.id}`}>Scope</Label>
                            <Select
                              value={day.scope}
                              onValueChange={(value) => updateTaskeenDay(day.id, "scope", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Units</SelectItem>
                                <SelectItem value="property-type">Specific Property Type</SelectItem>
                                <SelectItem value="floor-range">Floor Range</SelectItem>
                                <SelectItem value="custom">Custom Selection</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor={`target-units-${day.id}`}>Target Units Description</Label>
                            <Input
                              id={`target-units-${day.id}`}
                              value={day.targetUnits}
                              onChange={(e) => updateTaskeenDay(day.id, "targetUnits", e.target.value)}
                              placeholder="e.g., Premium Marina View Units, Floors 15-25"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="slots" className="space-y-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="slot-duration">Slot Duration (minutes)</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="buffer-time">Buffer Time (minutes)</Label>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No buffer</SelectItem>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Advanced Settings</Label>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allow-reschedule">Allow Rescheduling</Label>
                          <p className="text-sm text-muted-foreground">Allow clients to reschedule their slots</p>
                        </div>
                        <Switch id="allow-reschedule" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-confirm">Auto-confirm Bookings</Label>
                          <p className="text-sm text-muted-foreground">Automatically confirm slot bookings</p>
                        </div>
                        <Switch id="auto-confirm" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="send-reminders">Send Reminders</Label>
                          <p className="text-sm text-muted-foreground">Send automated reminders before slots</p>
                        </div>
                        <Switch id="send-reminders" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="max-concurrent">Maximum Concurrent Slots</Label>
                    <Input id="max-concurrent" type="number" placeholder="10" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Maximum number of clients that can be served simultaneously
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={() => setCreateLaunchOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setCreateLaunchOpen(false)}>Create Launch</Button>
            </div>
          </DialogContent>
        </Dialog>
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
            <Button onClick={() => setCreateLaunchOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Launch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
