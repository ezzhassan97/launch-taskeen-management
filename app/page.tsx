"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Users, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

type Persona = "developer" | "broker" | "agent" | "client"

const personas = [
  {
    id: "developer" as Persona,
    title: "Developer Admin",
    description: "Manage launches, policies, and system oversight",
    icon: Building2,
    color: "bg-primary text-primary-foreground",
    route: "/developer",
  },
  {
    id: "broker" as Persona,
    title: "Broker Admin",
    description: "Oversee agents, quotas, and broker operations",
    icon: Users,
    color: "bg-secondary text-secondary-foreground",
    route: "/broker",
  },
  {
    id: "agent" as Persona,
    title: "Agent",
    description: "Manage calendar, clients, and bookings",
    icon: Calendar,
    color: "bg-accent text-accent-foreground",
    route: "/agent",
  },
  {
    id: "client" as Persona,
    title: "Client",
    description: "Book slots and manage preferences",
    icon: Settings,
    color: "bg-muted text-muted-foreground",
    route: "/client",
  },
]

export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedPersona) {
      const persona = personas.find((p) => p.id === selectedPersona)
      if (persona) {
        router.push(persona.route)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Launch Taskeen</h1>
              <p className="text-muted-foreground mt-1">Professional booking system for real estate launch events</p>
            </div>
            {selectedPersona && (
              <Badge variant="outline" className="text-sm">
                Current: {personas.find((p) => p.id === selectedPersona)?.title}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Choose Your Role</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your role to access the appropriate dashboard and features. Each persona has tailored functionality
              for managing different aspects of the booking system.
            </p>
          </div>

          {/* Persona Selection Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {personas.map((persona) => {
              const Icon = persona.icon
              const isSelected = selectedPersona === persona.id

              return (
                <Card
                  key={persona.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                  onClick={() => setSelectedPersona(persona.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${persona.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{persona.title}</CardTitle>
                        <CardDescription className="text-sm">{persona.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {isSelected ? "Selected" : "Click to select"}
                      </span>
                      {isSelected && <Badge className="bg-primary text-primary-foreground">Active</Badge>}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Action Button */}
          {selectedPersona && (
            <div className="text-center">
              <Button size="lg" className="px-8" onClick={handleContinue}>
                Continue as {personas.find((p) => p.id === selectedPersona)?.title}
              </Button>
            </div>
          )}

          {/* System Overview */}
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">System Overview</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Slot Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cal.com-like booking system with capacity control and real-time availability
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Inventory Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Live unit reservations with preference ranking and conflict resolution
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Multi-Persona Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Role-based interfaces for developers, brokers, agents, and clients
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
