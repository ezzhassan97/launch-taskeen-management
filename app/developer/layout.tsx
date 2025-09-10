"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PersonaSwitcher } from "@/components/persona-switcher"
import { BarChart3, Rocket, Settings, Users, Package, FileText, Menu, X, FolderOpen, Building2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/developer", icon: BarChart3 },
  { name: "Projects & Phases", href: "/developer/projects", icon: FolderOpen },
  { name: "Launches", href: "/developer/launches", icon: Rocket },
  { name: "Inventory Management", href: "/developer/inventory", icon: Package },
  { name: "Brokerages", href: "/developer/brokerages", icon: Building2 },
  { name: "Agents View", href: "/developer/agents", icon: Users },
  { name: "Reporting & Logs", href: "/developer/reports", icon: FileText },
  { name: "Settings", href: "/developer/settings", icon: Settings },
]

export default function DeveloperLayout({
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
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Launch Taskeen</h1>
            </Link>
          </div>
          <PersonaSwitcher currentPersona="developer" />
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
                <Link
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
                </Link>
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
