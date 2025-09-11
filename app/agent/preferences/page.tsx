"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, GripVertical, Building2, Heart, Trash2, TrendingUp, Users, Filter } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const mockUnitsWithDemand = [
  {
    id: "A-101",
    unit: "Unit A-101",
    type: "2BR Marina View",
    price: 850000,
    project: "Marina Heights",
    launch: "Marina Heights Phase 1",
    demandCount: 8,
    interestedLeads: [
      "John Smith",
      "Ahmed Hassan",
      "Lisa Chen",
      "Mike Johnson",
      "Sarah Wilson",
      "David Brown",
      "Emma Davis",
      "Tom Wilson",
    ],
    riskLevel: "high",
  },
  {
    id: "B-205",
    unit: "Unit B-205",
    type: "3BR Garden View",
    price: 1200000,
    project: "Garden Residences",
    launch: "Garden Residences Phase 2",
    demandCount: 6,
    interestedLeads: ["Ahmed Hassan", "Sarah Johnson", "Mike Johnson", "Lisa Chen", "David Brown", "Emma Davis"],
    riskLevel: "high",
  },
  {
    id: "A-102",
    unit: "Unit A-102",
    type: "2BR Marina View",
    price: 860000,
    project: "Marina Heights",
    launch: "Marina Heights Phase 1",
    demandCount: 4,
    interestedLeads: ["John Smith", "Sarah Wilson", "Tom Wilson", "Emma Davis"],
    riskLevel: "medium",
  },
  {
    id: "C-301",
    unit: "Unit C-301",
    type: "1BR City View",
    price: 650000,
    project: "City Heights",
    launch: "City Heights Phase 1",
    demandCount: 3,
    interestedLeads: ["Ahmed Hassan", "Lisa Chen", "Mike Johnson"],
    riskLevel: "medium",
  },
  {
    id: "B-201",
    unit: "Unit B-201",
    type: "3BR Garden View",
    price: 1100000,
    project: "Marina Heights",
    launch: "Marina Heights Phase 1",
    demandCount: 2,
    interestedLeads: ["John Smith", "Sarah Wilson"],
    riskLevel: "low",
  },
  {
    id: "B-206",
    unit: "Unit B-206",
    type: "3BR Garden View",
    price: 1180000,
    project: "Garden Residences",
    launch: "Garden Residences Phase 2",
    demandCount: 2,
    interestedLeads: ["Ahmed Hassan", "David Brown"],
    riskLevel: "low",
  },
]

// Mock data for leads with preferences
const mockLeadsWithPreferences = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john@email.com",
    eoiStatus: "paid",
    eoiAmount: 5000,
    launch: "Marina Heights Phase 1",
    preferences: [
      {
        id: "A-101",
        unit: "Unit A-101",
        type: "2BR Marina View",
        price: 850000,
        rank: 1,
        notes: "Perfect view, good layout",
      },
      { id: "A-102", unit: "Unit A-102", type: "2BR Marina View", price: 860000, rank: 2, notes: "Similar to A-101" },
      { id: "B-201", unit: "Unit B-201", type: "3BR Garden View", price: 1100000, rank: 3, notes: "Backup option" },
    ],
    filterPreferences: {
      maxPrice: 1000000,
      minBedrooms: 2,
      propertyType: "Apartment",
      view: "Marina",
    },
    readinessGate: "approved",
    lastUpdated: "2024-01-10",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah@email.com",
    eoiStatus: "pending",
    eoiAmount: 0,
    launch: null,
    preferences: [],
    filterPreferences: {
      maxPrice: 800000,
      minBedrooms: 1,
      propertyType: "Any",
      view: "Any",
    },
    readinessGate: "pending",
    lastUpdated: null,
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    phone: "+1 (555) 345-6789",
    email: "ahmed@email.com",
    eoiStatus: "paid",
    eoiAmount: 7500,
    launch: "Garden Residences Phase 2",
    preferences: [
      { id: "B-205", unit: "Unit B-205", type: "3BR Garden View", price: 1200000, rank: 1, notes: "Dream unit" },
      { id: "B-206", unit: "Unit B-206", type: "3BR Garden View", price: 1180000, rank: 2, notes: "Good alternative" },
      { id: "C-301", unit: "Unit C-301", type: "1BR City View", price: 650000, rank: 3, notes: "Investment option" },
      { id: "A-101", unit: "Unit A-101", type: "2BR Marina View", price: 850000, rank: 4, notes: "Different project" },
      { id: "B-207", unit: "Unit B-207", type: "3BR Garden View", price: 1190000, rank: 5, notes: "Last choice" },
    ],
    filterPreferences: {
      maxPrice: 1300000,
      minBedrooms: 3,
      propertyType: "Apartment",
      view: "Garden",
    },
    readinessGate: "approved",
    lastUpdated: "2024-01-11",
  },
]

// Available inventory for adding preferences
const availableUnits = [
  { id: "A-101", unit: "Unit A-101", type: "2BR Marina View", price: 850000, project: "Marina Heights" },
  { id: "A-102", unit: "Unit A-102", type: "2BR Marina View", price: 860000, project: "Marina Heights" },
  { id: "B-201", unit: "Unit B-201", type: "3BR Garden View", price: 1100000, project: "Marina Heights" },
  { id: "B-205", unit: "Unit B-205", type: "3BR Garden View", price: 1200000, project: "Garden Residences" },
  { id: "B-206", unit: "Unit B-206", type: "3BR Garden View", price: 1180000, project: "Garden Residences" },
  { id: "C-301", unit: "Unit C-301", type: "1BR City View", price: 650000, project: "City Heights" },
]

export default function PreferencesPage() {
  const [activeTab, setActiveTab] = useState("units")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [isAddingPreference, setIsAddingPreference] = useState(false)
  const [isAddingUnitsDrawer, setIsAddingUnitsDrawer] = useState(false)
  const [leads, setLeads] = useState(mockLeadsWithPreferences)
  const [selectedLaunch, setSelectedLaunch] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")

  const filteredUnits = mockUnitsWithDemand
    .filter((unit) => {
      const matchesLaunch = selectedLaunch === "all" || unit.launch === selectedLaunch
      const matchesRisk = selectedRiskLevel === "all" || unit.riskLevel === selectedRiskLevel
      const matchesSearch =
        unit.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.project.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesLaunch && matchesRisk && matchesSearch
    })
    .sort((a, b) => b.demandCount - a.demandCount)

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const launches = [...new Set(mockUnitsWithDemand.map((unit) => unit.launch))]

  const handleDragEnd = (result: any) => {
    if (!result.destination || !selectedLead) return

    const items = Array.from(selectedLead.preferences)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update ranks
    const updatedItems = items.map((item, index) => ({
      ...item,
      rank: index + 1,
    }))

    const updatedLead = {
      ...selectedLead,
      preferences: updatedItems,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setSelectedLead(updatedLead)
    setLeads(leads.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead)))
  }

  const addPreference = (unit: any, notes: string) => {
    if (!selectedLead) return

    const newPreference = {
      ...unit,
      rank: selectedLead.preferences.length + 1,
      notes,
    }

    const updatedLead = {
      ...selectedLead,
      preferences: [...selectedLead.preferences, newPreference],
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setSelectedLead(updatedLead)
    setLeads(leads.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead)))
    setIsAddingPreference(false)
  }

  const removePreference = (preferenceId: string) => {
    if (!selectedLead) return

    const updatedPreferences = selectedLead.preferences
      .filter((pref: any) => pref.id !== preferenceId)
      .map((pref: any, index: number) => ({ ...pref, rank: index + 1 }))

    const updatedLead = {
      ...selectedLead,
      preferences: updatedPreferences,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setSelectedLead(updatedLead)
    setLeads(leads.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead)))
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getReadinessColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Preferences</h1>
          <p className="text-muted-foreground mt-1">Manage unit demand and lead preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="units" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Units by Demand
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lead Preferences
          </TabsTrigger>
        </TabsList>

        {/* Units View */}
        <TabsContent value="units" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search units, types, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLaunch} onValueChange={setSelectedLaunch}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by launch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Launches</SelectItem>
                {launches.map((launch) => (
                  <SelectItem key={launch} value={launch}>
                    {launch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredUnits.map((unit) => (
              <Card
                key={unit.id}
                className={`border-l-4 ${unit.riskLevel === "high" ? "border-l-red-500" : unit.riskLevel === "medium" ? "border-l-yellow-500" : "border-l-green-500"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{unit.unit}</h3>
                        <Badge className={getRiskColor(unit.riskLevel)}>{unit.riskLevel} risk</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {unit.demandCount} interested
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {unit.type} • {unit.project}
                      </p>
                      <p className="text-sm text-muted-foreground">{unit.launch}</p>
                      <p className="text-lg font-semibold">${unit.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{unit.demandCount}</div>
                      <div className="text-xs text-muted-foreground">leads interested</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Interested Leads:</p>
                    <div className="flex flex-wrap gap-1">
                      {unit.interestedLeads.slice(0, 5).map((leadName, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {leadName}
                        </Badge>
                      ))}
                      {unit.interestedLeads.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{unit.interestedLeads.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Leads View */}
        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leads List */}
            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedLead?.id === lead.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{lead.name}</h3>
                        <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        {lead.launch && <p className="text-xs text-muted-foreground mt-1">{lead.launch}</p>}
                      </div>
                      <div className="text-right">
                        <Badge className={getReadinessColor(lead.readinessGate)}>{lead.readinessGate}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">{lead.preferences.length} preferences</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Preferences Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedLead ? `${selectedLead.name}'s Preferences` : "Select a Lead"}</CardTitle>
                  {selectedLead && (
                    <div className="flex gap-2">
                      <Sheet open={isAddingUnitsDrawer} onOpenChange={setIsAddingUnitsDrawer}>
                        <SheetTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Units
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[30vw] sm:max-w-none">
                          <SheetHeader>
                            <SheetTitle>Add Units for {selectedLead.name}</SheetTitle>
                          </SheetHeader>
                          <AddUnitsDrawer
                            availableUnits={availableUnits.filter(
                              (unit) => !selectedLead.preferences.some((pref: any) => pref.id === unit.id),
                            )}
                            onAdd={addPreference}
                            onClose={() => setIsAddingUnitsDrawer(false)}
                          />
                        </SheetContent>
                      </Sheet>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Set Filter Preferences for {selectedLead.name}</DialogTitle>
                          </DialogHeader>
                          <FilterPreferencesForm
                            lead={selectedLead}
                            onUpdate={(updatedLead) => {
                              setSelectedLead(updatedLead)
                              setLeads(leads.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead)))
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {selectedLead ? (
                  <div className="space-y-6">
                    {/* Filter Preferences */}
                    {selectedLead.filterPreferences && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filter Preferences
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Max Price:</span>
                            <span className="ml-2 font-medium">
                              ${selectedLead.filterPreferences.maxPrice?.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Min Bedrooms:</span>
                            <span className="ml-2 font-medium">{selectedLead.filterPreferences.minBedrooms}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Property Type:</span>
                            <span className="ml-2 font-medium">{selectedLead.filterPreferences.propertyType}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">View:</span>
                            <span className="ml-2 font-medium">{selectedLead.filterPreferences.view}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Specific Unit Preferences */}
                    {selectedLead.preferences.length > 0 ? (
                      <div>
                        <h4 className="font-medium mb-3">Ranked Unit Preferences</h4>
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="preferences">
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                {selectedLead.preferences.map((preference: any, index: number) => (
                                  <Draggable key={preference.id} draggableId={preference.id} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="p-4 border rounded-lg bg-card"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div {...provided.dragHandleProps} className="mt-1">
                                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                              <div>
                                                <div className="flex items-center gap-2">
                                                  <Badge variant="outline">#{preference.rank}</Badge>
                                                  <h4 className="font-medium">{preference.unit}</h4>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{preference.type}</p>
                                                <p className="text-sm font-medium">
                                                  ${preference.price.toLocaleString()}
                                                </p>
                                                {preference.notes && (
                                                  <p className="text-xs text-muted-foreground mt-1">
                                                    {preference.notes}
                                                  </p>
                                                )}
                                              </div>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removePreference(preference.id)}
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No specific unit preferences</h3>
                        <p className="text-muted-foreground mb-4">Add specific unit preferences for this lead</p>
                        <Button onClick={() => setIsAddingUnitsDrawer(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Preference
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a lead</h3>
                    <p className="text-muted-foreground">Choose a lead from the list to manage their preferences</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddUnitsDrawer({
  availableUnits,
  onAdd,
  onClose,
}: {
  availableUnits: any[]
  onAdd: (unit: any, notes: string) => void
  onClose: () => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set())

  const projects = [...new Set(availableUnits.map((unit) => unit.project))]
  const types = [...new Set(availableUnits.map((unit) => unit.type))]

  const filteredUnits = availableUnits.filter((unit) => {
    const matchesSearch =
      unit.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = selectedProject === "all" || unit.project === selectedProject
    const matchesType = selectedType === "all" || unit.type === selectedType
    const matchesPrice = !maxPrice || unit.price <= Number.parseInt(maxPrice)

    return matchesSearch && matchesProject && matchesType && matchesPrice
  })

  const handleUnitToggle = (unitId: string) => {
    const newSelected = new Set(selectedUnits)
    if (newSelected.has(unitId)) {
      newSelected.delete(unitId)
    } else {
      newSelected.add(unitId)
    }
    setSelectedUnits(newSelected)
  }

  const handleAddSelected = () => {
    selectedUnits.forEach((unitId) => {
      const unit = availableUnits.find((u) => u.id === unitId)
      if (unit) {
        onAdd(unit, "")
      }
    })
    setSelectedUnits(new Set())
    onClose()
  }

  return (
    <div className="space-y-6 py-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input placeholder="Max price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredUnits.map((unit) => (
          <div
            key={unit.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedUnits.has(unit.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => handleUnitToggle(unit.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{unit.unit}</h4>
                <p className="text-sm text-muted-foreground">{unit.type}</p>
                <p className="text-sm text-muted-foreground">{unit.project}</p>
                <p className="text-sm font-medium">${unit.price.toLocaleString()}</p>
              </div>
              <div
                className={`w-4 h-4 rounded border-2 ${
                  selectedUnits.has(unit.id) ? "bg-primary border-primary" : "border-muted-foreground"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={handleAddSelected} disabled={selectedUnits.size === 0} className="flex-1">
          Add {selectedUnits.size} Selected Units
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

function FilterPreferencesForm({
  lead,
  onUpdate,
}: {
  lead: any
  onUpdate: (updatedLead: any) => void
}) {
  const [maxPrice, setMaxPrice] = useState(lead.filterPreferences?.maxPrice?.toString() || "")
  const [minBedrooms, setMinBedrooms] = useState(lead.filterPreferences?.minBedrooms?.toString() || "")
  const [propertyType, setPropertyType] = useState(lead.filterPreferences?.propertyType || "Any")
  const [view, setView] = useState(lead.filterPreferences?.view || "Any")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedLead = {
      ...lead,
      filterPreferences: {
        maxPrice: maxPrice ? Number.parseInt(maxPrice) : null,
        minBedrooms: minBedrooms ? Number.parseInt(minBedrooms) : null,
        propertyType,
        view,
      },
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    onUpdate(updatedLead)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="e.g. 1000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="minBedrooms">Min Bedrooms</Label>
          <Select value={minBedrooms} onValueChange={setMinBedrooms}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="view">View Preference</Label>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Marina">Marina</SelectItem>
              <SelectItem value="Garden">Garden</SelectItem>
              <SelectItem value="City">City</SelectItem>
              <SelectItem value="Sea">Sea</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Update Filter Preferences
        </Button>
      </div>
    </form>
  )
}
