"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Plus,
  Search,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockBrokerages = [
  {
    id: 1,
    name: "Premium Real Estate Group",
    contactPerson: "Sarah Johnson",
    email: "sarah@premiumre.com",
    phone: "+971-50-123-4567",
    location: "Dubai Marina",
    status: "active",
    joinedDate: "2023-06-15",
    totalAgents: 24,
    activeAgents: 22,
    totalEOIs: 1247,
    totalBookings: 892,
    conversionRate: 71.5,
    projects: ["Marina Heights", "Downtown Towers"],
    performance: {
      thisMonth: { eois: 156, bookings: 112 },
      lastMonth: { eois: 134, bookings: 98 },
    },
  },
  {
    id: 2,
    name: "Elite Properties Dubai",
    contactPerson: "Ahmed Al-Rashid",
    email: "ahmed@eliteproperties.ae",
    phone: "+971-50-987-6543",
    location: "Business Bay",
    status: "active",
    joinedDate: "2023-08-20",
    totalAgents: 18,
    activeAgents: 16,
    totalEOIs: 892,
    totalBookings: 634,
    conversionRate: 71.1,
    projects: ["Garden Villas", "Marina Heights"],
    performance: {
      thisMonth: { eois: 98, bookings: 72 },
      lastMonth: { eois: 87, bookings: 65 },
    },
  },
  {
    id: 3,
    name: "Metropolitan Realty",
    contactPerson: "Lisa Chen",
    email: "lisa@metropolitan.com",
    phone: "+971-50-456-7890",
    location: "DIFC",
    status: "pending",
    joinedDate: "2024-01-10",
    totalAgents: 12,
    activeAgents: 8,
    totalEOIs: 234,
    totalBookings: 156,
    conversionRate: 66.7,
    projects: ["Downtown Towers"],
    performance: {
      thisMonth: { eois: 45, bookings: 28 },
      lastMonth: { eois: 32, bookings: 21 },
    },
  },
]

export default function BrokeragesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBrokerages = mockBrokerages.filter((brokerage) => {
    const matchesSearch =
      brokerage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brokerage.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brokerage.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || brokerage.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const totalStats = {
    totalBrokerages: mockBrokerages.length,
    activeBrokerages: mockBrokerages.filter((b) => b.status === "active").length,
    totalAgents: mockBrokerages.reduce((sum, b) => sum + b.totalAgents, 0),
    totalEOIs: mockBrokerages.reduce((sum, b) => sum + b.totalEOIs, 0),
    avgConversion: mockBrokerages.reduce((sum, b) => sum + b.conversionRate, 0) / mockBrokerages.length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Brokerages Management</h1>
          <p className="text-muted-foreground mt-1">Manage partner brokerages and their performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Building2 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Brokerage
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brokerages</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalBrokerages}</div>
            <p className="text-xs text-muted-foreground">{totalStats.activeBrokerages} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">Across all brokerages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total EOIs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalEOIs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.avgConversion.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">EOI to booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBrokerages.reduce((sum, b) => sum + b.performance.thisMonth.eois, 0)}
            </div>
            <p className="text-xs text-muted-foreground">New EOIs</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search brokerages by name, contact, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Filter by Performance</Button>
          </div>
        </CardContent>
      </Card>

      {/* Brokerages List */}
      <div className="space-y-4">
        {filteredBrokerages.map((brokerage) => (
          <Card key={brokerage.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{brokerage.name}</CardTitle>
                  <CardDescription className="mt-1 space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {brokerage.contactPerson}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {brokerage.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {brokerage.joinedDate}
                      </span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(brokerage.status)}>{brokerage.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Brokerage
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Manage Agents
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{brokerage.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{brokerage.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Team Statistics */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Team Statistics</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Agents:</span>
                      <span className="font-medium">{brokerage.totalAgents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Agents:</span>
                      <span className="font-medium text-green-600">{brokerage.activeAgents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-medium">{brokerage.projects.length}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Performance</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total EOIs:</span>
                      <span className="font-medium">{brokerage.totalEOIs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Bookings:</span>
                      <span className="font-medium">{brokerage.totalBookings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate:</span>
                      <span className="font-medium text-primary">{brokerage.conversionRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Performance */}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">This Month</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>EOIs:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{brokerage.performance.thisMonth.eois}</span>
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-green-600 text-xs">
                          +
                          {calculateGrowth(
                            brokerage.performance.thisMonth.eois,
                            brokerage.performance.lastMonth.eois,
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Bookings:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{brokerage.performance.thisMonth.bookings}</span>
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-green-600 text-xs">
                          +
                          {calculateGrowth(
                            brokerage.performance.thisMonth.bookings,
                            brokerage.performance.lastMonth.bookings,
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Active Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {brokerage.projects.map((project, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBrokerages.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No brokerages found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first brokerage partner."}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Brokerage
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
