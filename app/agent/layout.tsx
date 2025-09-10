"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PersonaSwitcher } from "@/components/persona-switcher"
import { Calendar, Users, Heart, Handshake, Settings, Menu, X } from "lucide-react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "My Calendar", href: "/agent", icon: Calendar },
  { name: "My Link", href: "/agent/booking-link", icon: Calendar }, // Updated icon to avoid redeclaration
  { name: "Clients & EOIs", href: "/agent/clients", icon: Users },
  { name: "Preferences", href: "/agent/preferences", icon: Heart },
  { name: "Live Settlement", href: "/agent/settlement", icon: Handshake },
  { name: "Settings", href: "/agent/settings", icon: Settings },
]

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <NextLink href="/" className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Launch Taskeen</h1>
            </NextLink>
          </div>
          <PersonaSwitcher
            currentPersona="agent"
            onPersonaChange={(persona) => {
              console.log("Switching to:", persona)
            }}
          />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 ease-in-out",
            "md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <NextLink
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </NextLink>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
