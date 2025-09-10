"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
  Lock,
  Unlock,
  MoreHorizontal,
  Users,
  Heart,
  Timer,
  RefreshCw,
  FolderOpen,
  Building2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockInventory = [
  {
    id: 1,
    code: "MH-A-101",
    type: "2 Bedroom",
    area: 1200,
    price: 850000,
    floor: 1,
    view: "Marina View",
    status: "reserved",
    reservedBy: "John Smith",
    reservedAt: "2024-01-15 10:30 AM",
    reservationExpiry: "2024-01-15 11:00 AM",
    agentName: "Maria Rodriguez",
    demandRank: {
      first: 12,
      second: 8,
      third: 5,
    },
    riskLevel: "high",
    project: "Marina Heights",
    projectId: 1,
    phase: "Phase 2 - Tower B",
    phaseId: 2,
    building: "Tower A",
    unitCategory: "Premium Marina View",
  },
  {
    id: 2,
    code: "MH-B-205",
    type: "3 Bedroom",
    area: 1500,
    price: 1200000,
    floor: 2,
    view: "Garden View",
    status: "available",
    demandRank: {
      first: 6,
      second: 9,
      third: 4,
    },
    riskLevel: "medium",
    project: "Marina Heights",
    projectId: 1,
    phase: "Phase 1 - Tower A",
    phaseId: 1,
    building: "Tower B",
    unitCategory: "Standard Units",
  },
  {
    id: 3,
    code: "DT-C-301",
    type: "2 Bedroom",
    area: 1100,
    price: 750000,
    floor: 3,
    view: "City View",
    status: "booked",
    bookedBy: "Sarah Johnson",
    bookedAt: "2024-01-14 2:15 PM",
    agentName: "Ahmed Hassan",
    demandRank: {
      first: 2,
      second: 3,
      third: 8,
    },
    riskLevel: "low",
    project: "Downtown Towers",
    projectId: 2,
    phase: "Phase 1 - Residential",
    phaseId: 4,
    building: "Tower C",
    unitCategory: "Mid-Level Units",
  },
  {
    id: 4,
    code: "MH-A-501",
    type: "3 Bedroom",
    area: 1600,
    price: 1400000,
    floor: 5,
    view: "Marina View",
    status: "available",
    demandRank: {
      first: 15,
      second: 12,
      third: 7,
    },
    riskLevel: "high",
    project: "Marina Heights",
    projectId: 1,
    phase: "Phase 2 - Tower B",
    phaseId: 2,
    building: "Tower A",
    unitCategory: "Premium Marina View",
  },
  {
    id: 5,
    code: "GV-V-102",
    type: "Villa",
    area: 2200,
    price: 1650000,
    floor: 1,
    view: "Garden View",
    status: "reserved",
    reservedBy: "Ahmed Hassan",
    reservedAt: "2024-01-15 11:15 AM",
    reservationExpiry: "2024-01-15 11:45 AM",
    agentName: "Lisa Chen",
    demandRank: {
      first: 8,
      second: 6,
      third: 3,
    },
    riskLevel: "medium",
    project: "Garden Villas",
    projectId: 3,
    phase: "Phase 1 - Villas A-C",
    phaseId: 6,
    building: "Villa Block A",
    unitCategory: "Premium Villas",
  },
  {
    id: 6,
    code: "DT-P-2501",
    type: "Penthouse",
    area: 2800,
    price: 2500000,
    floor: 25,
    view: "Panoramic City View",
    status: "available",
    demandRank: {
      first: 20,
      second: 15,
      third: 10,
    },
    riskLevel: "high",
    project: "Downtown Towers",
    projectId: 2,
    phase: "Phase 1 - Residential",
    phaseId: 4,
    building: "Tower Main",
    unitCategory: "Penthouses & Top Floors",
  },
]

const projects = [
  { id: 1, name: "Marina Heights" },
  { id: 2, name: "Downtown Towers" },
  { id: 3, name: "Garden Villas" },
]

const phases = [
  { id: 1, name: "Phase 1 - Tower A", projectId: 1 },
  { id: 2, name: "Phase 2 - Tower B", projectId: 1 },
  { id: 4, name: "Phase 1 - Residential", projectId: 2 },
  { id: 6, name: "Phase 1 - Villas A-C", projectId: 3 },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const filteredInventory = mockInventory.filter((unit) => {
    const matchesSearch =
      unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.view.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.phase.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || unit.status === statusFilter
    const matchesRisk = riskFilter === "all" || unit.riskLevel === riskFilter
    const matchesType = typeFilter === "all" || unit.type.includes(typeFilter)
    const matchesProject = projectFilter === "all" || unit.projectId.toString() === projectFilter
    const matchesPhase = phaseFilter === "all" || unit.phaseId.toString() === phaseFilter

    return matchesSearch && matchesStatus && matchesRisk && matchesType && matchesProject && matchesPhase
  })

  const stats = {
    total: mockInventory.length,
    available: mockInventory.filter((u) => u.status === "available").length,
    reserved: mockInventory.filter((u) => u.status === "reserved").length,
    booked: mockInventory.filter((u) => u.status === "booked").length,
    highRisk: mockInventory.filter((u) => u.riskLevel === "high").length,
    byProject: projects.map((project) => ({
      ...project,
      total: mockInventory.filter((u) => u.projectId === project.id).length,
      available: mockInventory.filter((u) => u.projectId === project.id && u.status === "available").length,
    })),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "reserved":
        return "bg-yellow-100 text-yellow-800"
      case "booked":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-3 w-3" />
      case "reserved":
        return <Clock className="h-3 w-3" />
      case "booked":
        return <Lock className="h-3 w-3" />
      default:
        return null
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalDemand = (demandRank: any) => {
    return demandRank.first + demandRank.second + demandRank.third
  }

  const refreshData = () => {
    setLastUpdated(new Date())
    // In real implementation, this would fetch fresh data
  }

  const handleAdminOverride = (unitId: number, action: "release" | "extend") => {
    console.log(`Admin override: ${action} for unit ${unitId}`)
    // Implementation would handle reservation management
  }

  const availablePhases =
    phaseFilter === "all" && projectFilter !== "all"
      ? phases.filter((phase) => phase.projectId.toString() === projectFilter)
      : phases

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Real-time unit availability and demand tracking across all projects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards with Project Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Across {projects.length} projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.available / stats.total) * 100)}% of inventory
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.reserved}</div>
            <p className="text-xs text-muted-foreground">Active reservations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <Lock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.booked}</div>
            <p className="text-xs text-muted-foreground">Confirmed bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highRisk}</div>
            <p className="text-xs text-muted-foreground">High demand units</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Project Summary
          </CardTitle>
          <CardDescription>Inventory breakdown by project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.byProject.map((project) => (
              <div key={project.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{project.name}</h4>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Units:</span>
                    <span className="font-medium">{project.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span className="font-medium text-green-600">{project.available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability:</span>
                    <span className="font-medium">{Math.round((project.available / project.total) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search units by code, type, view, project, or phase..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={projectFilter}
              onValueChange={(value) => {
                setProjectFilter(value)
                if (value === "all") setPhaseFilter("all")
              }}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                {availablePhases.map((phase) => (
                  <SelectItem key={phase.id} value={phase.id.toString()}>
                    {phase.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Inventory</CardTitle>
          <CardDescription>Real-time status and demand tracking organized by project and phase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((unit) => (
              <div key={unit.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{unit.code}</h3>
                      <p className="text-sm text-muted-foreground">
                        {unit.project} → {unit.phase}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {unit.building} • Floor {unit.floor} • {unit.view} • {unit.unitCategory}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(unit.status)}>
                        {getStatusIcon(unit.status)}
                        {unit.status}
                      </Badge>
                      <Badge className={getRiskColor(unit.riskLevel)}>{unit.riskLevel} risk</Badge>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {unit.status === "reserved" && (
                        <>
                          <DropdownMenuItem onClick={() => handleAdminOverride(unit.id, "release")}>
                            <Unlock className="h-4 w-4 mr-2" />
                            Release Reservation
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAdminOverride(unit.id, "extend")}>
                            <Timer className="h-4 w-4 mr-2" />
                            Extend Reservation
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Unit Details */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Unit Details</h4>
                    <div className="space-y-1 text-sm">
                      <div>{unit.type}</div>
                      <div>{unit.area.toLocaleString()} sq ft</div>
                      <div className="font-semibold">${unit.price.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Demand Indicators */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Client Demand</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span>1st choice: {unit.demandRank.first}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-3 w-3 text-orange-500" />
                        <span>2nd choice: {unit.demandRank.second}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-3 w-3 text-yellow-500" />
                        <span>3rd choice: {unit.demandRank.third}</span>
                      </div>
                      <div className="font-semibold">Total: {getTotalDemand(unit.demandRank)} clients</div>
                    </div>
                  </div>

                  {/* Status Details */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Status Details</h4>
                    <div className="space-y-1 text-sm">
                      {unit.status === "reserved" && (
                        <>
                          <div>Reserved by: {unit.reservedBy}</div>
                          <div>At: {unit.reservedAt}</div>
                          <div className="text-orange-600 font-medium">Expires: {unit.reservationExpiry}</div>
                          <div>Agent: {unit.agentName}</div>
                        </>
                      )}
                      {unit.status === "booked" && (
                        <>
                          <div>Booked by: {unit.bookedBy}</div>
                          <div>At: {unit.bookedAt}</div>
                          <div>Agent: {unit.agentName}</div>
                        </>
                      )}
                      {unit.status === "available" && <div className="text-green-600">Ready for booking</div>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        View Clients
                      </Button>
                      {unit.status === "reserved" && (
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Timer className="h-4 w-4 mr-2" />
                          Manage Reservation
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reservation Timer */}
                {unit.status === "reserved" && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Reservation expires in 30 minutes</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredInventory.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No units found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setRiskFilter("all")
                setTypeFilter("all")
                setProjectFilter("all")
                setPhaseFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
