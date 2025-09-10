import type React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Users, BarChart3, Settings, Home, UserCheck, TrendingUp } from "lucide-react"

const brokerNavigation = [
  { name: "Dashboard", href: "/broker", icon: Home },
  { name: "My Agents", href: "/broker/agents", icon: Users },
  { name: "Client Oversight", href: "/broker/clients", icon: UserCheck },
  { name: "Performance", href: "/broker/performance", icon: TrendingUp },
  { name: "Analytics", href: "/broker/analytics", icon: BarChart3 },
  { name: "Settings", href: "/broker/settings", icon: Settings },
]

export default function BrokerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navigation={brokerNavigation} title="Broker Admin" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
