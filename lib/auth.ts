export type Persona = "developer" | "broker" | "agent" | "client"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  persona: Persona
  brokerId?: string // For agents
  agentId?: string // For clients
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  currentPersona: Persona
}

// Mock authentication - replace with real auth later
export const mockUsers: Record<Persona, User> = {
  developer: {
    id: "dev-1",
    name: "Sarah Chen",
    email: "sarah@taskeen.com",
    persona: "developer",
  },
  broker: {
    id: "broker-1",
    name: "Ahmed Hassan",
    email: "ahmed@realestate.com",
    persona: "broker",
  },
  agent: {
    id: "agent-1",
    name: "Maria Rodriguez",
    email: "maria@realestate.com",
    persona: "agent",
    brokerId: "broker-1",
  },
  client: {
    id: "client-1",
    name: "John Smith",
    email: "john@email.com",
    phone: "+1234567890",
    persona: "client",
    agentId: "agent-1",
  },
}

export function getPersonaNavigation(persona: Persona) {
  const navigation = {
    developer: [
      { name: "Dashboard", href: "/dashboard", icon: "BarChart3" },
      { name: "Launches", href: "/launches", icon: "Rocket" },
      { name: "Scheduling Policies", href: "/policies", icon: "Settings" },
      { name: "Brokers & Agents", href: "/users", icon: "Users" },
      { name: "Inventory View", href: "/inventory", icon: "Package" },
      { name: "Reporting & Logs", href: "/reports", icon: "FileText" },
    ],
    broker: [
      { name: "Overview", href: "/overview", icon: "BarChart3" },
      { name: "Agents", href: "/agents", icon: "Users" },
      { name: "Quota & Capacity", href: "/quota", icon: "Target" },
      { name: "Bookings", href: "/bookings", icon: "Calendar" },
      { name: "Clients", href: "/clients", icon: "UserCheck" },
    ],
    agent: [
      { name: "My Calendar", href: "/calendar", icon: "Calendar" },
      { name: "My Link", href: "/booking-link", icon: "Link" },
      { name: "Clients & EOIs", href: "/my-clients", icon: "Users" },
      { name: "Preferences", href: "/preferences", icon: "Heart" },
      { name: "Live Settlement", href: "/settlement", icon: "Handshake" },
    ],
    client: [
      { name: "Book a Slot", href: "/book", icon: "Calendar" },
      { name: "My Booking", href: "/my-booking", icon: "Clock" },
      { name: "Preferences", href: "/my-preferences", icon: "Heart" },
      { name: "Help", href: "/help", icon: "HelpCircle" },
    ],
  }

  return navigation[persona] || []
}
