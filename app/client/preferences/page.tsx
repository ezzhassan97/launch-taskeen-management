"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Building, MapPin, Maximize, AlertTriangle, Star, GripVertical } from "lucide-react"

// Mock unit data
const mockUnits = [
  {
    id: 1,
    code: "A-101",
    type: "2 Bedroom",
    area: 1200,
    price: 850000,
    floor: 1,
    view: "Marina View",
    status: "available",
    demandLevel: "high",
    image: "/modern-apartment-marina-view.png",
  },
  {
    id: 2,
    code: "B-205",
    type: "3 Bedroom",
    area: 1500,
    price: 1200000,
    floor: 2,
    view: "Garden View",
    status: "available",
    demandLevel: "medium",
    image: "/modern-apartment-garden-view.png",
  },
  {
    id: 3,
    code: "C-301",
    type: "2 Bedroom",
    area: 1100,
    price: 750000,
    floor: 3,
    view: "City View",
    status: "available",
    demandLevel: "low",
    image: "/modern-apartment-city-view.png",
  },
  {
    id: 4,
    code: "A-501",
    type: "3 Bedroom",
    area: 1600,
    price: 1400000,
    floor: 5,
    view: "Marina View",
    status: "available",
    demandLevel: "high",
    image: "/luxury-apartment-marina-view.png",
  },
]

const mockPreferences = [
  { unitId: 1, rank: 1 },
  { unitId: 4, rank: 2 },
  { unitId: 2, rank: 3 },
]

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState(mockPreferences)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewFilter, setViewFilter] = useState("all")

  const filteredUnits = mockUnits.filter((unit) => {
    const matchesSearch =
      unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.view.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || unit.type.includes(typeFilter)
    const matchesView = viewFilter === "all" || unit.view.includes(viewFilter)

    return matchesSearch && matchesType && matchesView
  })

  const addToPreferences = (unitId: number) => {
    const newRank = preferences.length + 1
    setPreferences((prev) => [...prev, { unitId, rank: newRank }])
  }

  const removeFromPreferences = (unitId: number) => {
    setPreferences((prev) => {
      const filtered = prev.filter((p) => p.unitId !== unitId)
      return filtered.map((p, index) => ({ ...p, rank: index + 1 }))
    })
  }

  const isInPreferences = (unitId: number) => {
    return preferences.some((p) => p.unitId === unitId)
  }

  const getPreferenceRank = (unitId: number) => {
    return preferences.find((p) => p.unitId === unitId)?.rank
  }

  const getDemandColor = (level: string) => {
    switch (level) {
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

  const getDemandIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="h-3 w-3" />
      case "medium":
        return <Star className="h-3 w-3" />
      case "low":
        return null
      default:
        return null
    }
  }

  const preferredUnits = preferences
    .sort((a, b) => a.rank - b.rank)
    .map((p) => mockUnits.find((u) => u.id === p.unitId))
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Unit Preferences</h1>
        <p className="text-muted-foreground">Rank your preferred units to help your agent prepare for your meeting</p>
      </div>

      {/* Current Preferences */}
      {preferences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Your Ranked Preferences ({preferences.length}/5)
            </CardTitle>
            <CardDescription>
              Drag to reorder your preferences. Your agent will focus on these units during your meeting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preferredUnits.map((unit, index) => {
                if (!unit) return null
                return (
                  <div
                    key={unit.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <img
                      src={unit.image || "/placeholder.svg"}
                      alt={unit.code}
                      className="w-16 h-12 object-cover rounded"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{unit.code}</h3>
                        <Badge className={getDemandColor(unit.demandLevel)}>
                          {getDemandIcon(unit.demandLevel)}
                          {unit.demandLevel} demand
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {unit.type} • {unit.area} sq ft • {unit.view}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">${unit.price.toLocaleString()}</p>
                      <Button variant="ghost" size="sm" onClick={() => removeFromPreferences(unit.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search units by code, type, or view..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Unit Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={viewFilter} onValueChange={setViewFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="View Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Views</SelectItem>
                <SelectItem value="Marina">Marina View</SelectItem>
                <SelectItem value="Garden">Garden View</SelectItem>
                <SelectItem value="City">City View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Available Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUnits.map((unit) => (
          <Card key={unit.id} className="overflow-hidden">
            <div className="relative">
              <img src={unit.image || "/placeholder.svg"} alt={unit.code} className="w-full h-48 object-cover" />
              <div className="absolute top-3 right-3">
                <Badge className={getDemandColor(unit.demandLevel)}>
                  {getDemandIcon(unit.demandLevel)}
                  {unit.demandLevel}
                </Badge>
              </div>
              {isInPreferences(unit.id) && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground">#{getPreferenceRank(unit.id)}</Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{unit.code}</h3>
                  <p className="text-muted-foreground">{unit.type}</p>
                </div>
                <p className="text-lg font-bold">${unit.price.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Maximize className="h-3 w-3" />
                  {unit.area} sq ft
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  Floor {unit.floor}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {unit.view}
                </div>
              </div>

              {unit.demandLevel === "high" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">High Demand Alert</span>
                  </div>
                  <p className="text-xs text-red-700 mt-1">
                    This unit is highly requested. Consider ranking it high in your preferences.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {isInPreferences(unit.id) ? (
                  <Button variant="outline" onClick={() => removeFromPreferences(unit.id)} className="flex-1">
                    <Heart className="h-4 w-4 mr-2 fill-current text-red-500" />
                    Remove from Preferences
                  </Button>
                ) : (
                  <Button
                    onClick={() => addToPreferences(unit.id)}
                    disabled={preferences.length >= 5}
                    className="flex-1"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Preferences
                  </Button>
                )}
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No units found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setTypeFilter("all")
                setViewFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Save Preferences */}
      {preferences.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to save your preferences?</h3>
                <p className="text-sm text-muted-foreground">Your agent will review these before your meeting</p>
              </div>
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
