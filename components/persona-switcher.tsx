"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Users, Settings, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export type Persona = "developer" | "broker" | "agent" | "client"

const getPersonaIcon = (persona: Persona) => {
  switch (persona) {
    case "developer":
      return Building2
    case "broker":
      return Users
    case "agent":
      return Calendar
    case "client":
      return Settings
    default:
      return Building2
  }
}

const personas = [
  {
    id: "developer" as Persona,
    title: "Developer Admin",
    color: "bg-primary text-primary-foreground",
    href: "/developer",
  },
  {
    id: "broker" as Persona,
    title: "Broker Admin",
    color: "bg-secondary text-secondary-foreground",
    href: "/broker",
  },
  {
    id: "agent" as Persona,
    title: "Agent",
    color: "bg-accent text-accent-foreground",
    href: "/agent",
  },
  {
    id: "client" as Persona,
    title: "Client",
    color: "bg-muted text-muted-foreground",
    href: "/client",
  },
]

interface PersonaSwitcherProps {
  currentPersona: Persona
}

export function PersonaSwitcher({ currentPersona }: PersonaSwitcherProps) {
  const router = useRouter()
  const current = personas.find((p) => p.id === currentPersona)
  const CurrentIcon = getPersonaIcon(currentPersona)

  const handlePersonaChange = (persona: Persona) => {
    const targetPersona = personas.find((p) => p.id === persona)
    if (targetPersona) {
      router.push(targetPersona.href)
    }
  }

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
          const Icon = getPersonaIcon(persona.id)
          const isActive = persona.id === currentPersona

          return (
            <DropdownMenuItem
              key={persona.id}
              onClick={() => handlePersonaChange(persona.id)}
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
