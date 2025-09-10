"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Users, Settings, ChevronDown } from "lucide-react"

export type Persona = "developer" | "broker" | "agent" | "client"

const personas = [
  {
    id: "developer" as Persona,
    title: "Developer Admin",
    icon: Building2,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "broker" as Persona,
    title: "Broker Admin",
    icon: Users,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "agent" as Persona,
    title: "Agent",
    icon: Calendar,
    color: "bg-accent text-accent-foreground",
  },
  {
    id: "client" as Persona,
    title: "Client",
    icon: Settings,
    color: "bg-muted text-muted-foreground",
  },
]

interface PersonaSwitcherProps {
  currentPersona: Persona
  onPersonaChange: (persona: Persona) => void
}

export function PersonaSwitcher({ currentPersona, onPersonaChange }: PersonaSwitcherProps) {
  const current = personas.find((p) => p.id === currentPersona)
  const CurrentIcon = current?.icon || Building2

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <div className={`p-1 rounded ${current?.color}`}>
            <CurrentIcon className="h-4 w-4" />
          </div>
          <span className="font-medium">{current?.title}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {personas.map((persona) => {
          const Icon = persona.icon
          const isActive = persona.id === currentPersona

          return (
            <DropdownMenuItem
              key={persona.id}
              onClick={() => onPersonaChange(persona.id)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className={`p-1 rounded ${persona.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span>{persona.title}</span>
              {isActive && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
