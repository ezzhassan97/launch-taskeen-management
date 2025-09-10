"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FolderOpen,
  Plus,
  Search,
  Building,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"

// Mock data for projects and phases
const mockProjects = [
  {
    id: 1,
    name: "Marina Heights",
    location: "Dubai Marina",
    totalUnits: 450,
    status: "active",
    createdDate: "2024-01-15",
    phases: [
      {
        id: 1,
        name: "Phase 1 - Tower A",
        units: 180,
        status: "completed",
        startDate: "2024-01-15",
        endDate: "2024-03-15",
      },
      {
        id: 2,
        name: "Phase 2 - Tower B",
        units: 170,
        status: "active",
        startDate: "2024-03-01",
        endDate: "2024-06-01",
      },
      {
        id: 3,
        name: "Phase 3 - Amenities",
        units: 100,
        status: "planning",
        startDate: "2024-06-01",
        endDate: "2024-09-01",
      },
    ],
  },
  {
    id: 2,
    name: "Downtown Towers",
    location: "Downtown Dubai",
    totalUnits: 320,
    status: "planning",
    createdDate: "2024-02-01",
    phases: [
      {
        id: 4,
        name: "Phase 1 - Residential",
        units: 220,
        status: "planning",
        startDate: "2024-04-01",
        endDate: "2024-08-01",
      },
      {
        id: 5,
        name: "Phase 2 - Commercial",
        units: 100,
        status: "planning",
        startDate: "2024-08-01",
        endDate: "2024-12-01",
      },
    ],
  },
  {
    id: 3,
    name: "Garden Villas",
    location: "Arabian Ranches",
    totalUnits: 85,
    status: "active",
    createdDate: "2024-01-20",
    phases: [
      {
        id: 6,
        name: "Phase 1 - Villas A-C",
        units: 45,
        status: "active",
        startDate: "2024-02-01",
        endDate: "2024-05-01",
      },
      {
        id: 7,
        name: "Phase 2 - Villas D-F",
        units: 40,
        status: "upcoming",
        startDate: "2024-05-01",
        endDate: "2024-08-01",
      },
    ],
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedProjects, setExpandedProjects] = useState<number[]>([1])

  const toggleProject = (projectId: number) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "planning":
        return "outline"
      case "upcoming":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects & Phases</h1>
          <p className="text-muted-foreground mt-1">Manage your development projects and their phases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderOpen className="h-4 w-4 mr-2" />
            Import Project
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Sort by Date</Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => toggleProject(project.id)} className="p-1">
                    {expandedProjects.includes(project.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {project.totalUnits} units
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Created {project.createdDate}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedProjects.includes(project.id) && (
              <CardContent className="pt-0">
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">Project Phases</h4>
                    <Button size="sm" variant="outline">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Phase
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    {project.phases.map((phase) => (
                      <div key={phase.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div>
                            <h5 className="font-medium text-sm">{phase.name}</h5>
                            <p className="text-xs text-muted-foreground">
                              {phase.units} units • {phase.startDate} - {phase.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(phase.status)} className="text-xs">
                            {phase.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-sm text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">7</div>
            <p className="text-sm text-muted-foreground">Total Phases</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">855</div>
            <p className="text-sm text-muted-foreground">Total Units</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">4</div>
            <p className="text-sm text-muted-foreground">Completed Phases</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
