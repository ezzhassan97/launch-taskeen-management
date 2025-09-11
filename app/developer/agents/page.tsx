"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Users,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Activity,
  Target,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Mock data for agents analytics
const mockAgentsData = [
  {
    id: "AGT001",
    name: "Sarah Johnson",
    email: "sarah.johnson@realty.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalLeads: 45,
    totalEOIs: 28,
    totalSessions: 67,
    activeSessions: 8,
    upcomingSessions: 12,
    passedSessions: 47,
    reservations: 23,
    noShows: 8,
    cancelled: 16,
    launches: {
      "New Capital Gardens": { eois: 15, amount: 450000 },
      "Madinaty Residences": { eois: 13, amount: 390000 },
    },
    performance: 85,
    status: "active",
  },
  {
    id: "AGT002",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@realty.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalLeads: 38,
    totalEOIs: 22,
    totalSessions: 54,
    activeSessions: 6,
    upcomingSessions: 9,
    passedSessions: 39,
    reservations: 18,
    noShows: 6,
    cancelled: 15,
    launches: {
      "Compound Sheikh Zayed": { eois: 12, amount: 360000 },
      "Palm Hills October": { eois: 10, amount: 300000 },
    },
    performance: 78,
    status: "active",
  },
  {
    id: "AGT003",
    name: "Lisa Chen",
    email: "lisa.chen@realty.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalLeads: 52,
    totalEOIs: 31,
    totalSessions: 78,
    activeSessions: 11,
    upcomingSessions: 15,
    passedSessions: 52,
    reservations: 28,
    noShows: 9,
    cancelled: 15,
    launches: {
      "Sodic West": { eois: 18, amount: 540000 },
      "Mountain View Hyde Park": { eois: 13, amount: 390000 },
    },
    performance: 92,
    status: "active",
  },
  {
    id: "AGT004",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@realty.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalLeads: 29,
    totalEOIs: 16,
    totalSessions: 41,
    activeSessions: 4,
    upcomingSessions: 7,
    passedSessions: 30,
    reservations: 14,
    noShows: 5,
    cancelled: 11,
    launches: {
      "Emaar Mivida": { eois: 9, amount: 270000 },
      "Sabbour Eastown": { eois: 7, amount: 210000 },
    },
    performance: 72,
    status: "active",
  },
]

const mockLiveData = {
  totalAgents: 4,
  totalEOIsToday: 12,
  totalSessionsToday: 23,
  activeSessionsNow: 6,
  upcomingToday: 18,
  totalReservationsToday: 8,
}

export default function AgentsViewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLaunch, setSelectedLaunch] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [liveData, setLiveData] = useState(mockLiveData)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        ...prev,
        totalEOIsToday: prev.totalEOIsToday + Math.floor(Math.random() * 2),
        activeSessionsNow: Math.max(0, prev.activeSessionsNow + (Math.random() > 0.5 ? 1 : -1)),
        totalReservationsToday: prev.totalReservationsToday + Math.floor(Math.random() * 2),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const filteredAgents = mockAgentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || agent.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalStats = mockAgentsData.reduce(
    (acc, agent) => ({
      totalLeads: acc.totalLeads + agent.totalLeads,
      totalEOIs: acc.totalEOIs + agent.totalEOIs,
      totalSessions: acc.totalSessions + agent.totalSessions,
      totalReservations: acc.totalReservations + agent.reservations,
      activeSessions: acc.activeSessions + agent.activeSessions,
      upcomingSessions: acc.upcomingSessions + agent.upcomingSessions,
    }),
    { totalLeads: 0, totalEOIs: 0, totalSessions: 0, totalReservations: 0, activeSessions: 0, upcomingSessions: 0 },
  )

  const toggleCardExpansion = (agentId: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(agentId)) {
      newExpanded.delete(agentId)
    } else {
      newExpanded.add(agentId)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agents Analytics</h1>
          <p className="text-muted-foreground">Real-time overview of agent performance and activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">{liveData.totalAgents}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">EOIs Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-900">{liveData.totalEOIsToday}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Sessions Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-900">{liveData.totalSessionsToday}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-900">{liveData.activeSessionsNow}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700">Upcoming Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="text-2xl font-bold text-indigo-900">{liveData.upcomingToday}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-teal-700">Reservations Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-600" />
              <span className="text-2xl font-bold text-teal-900">{liveData.totalReservationsToday}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Agent Performance Overview</CardTitle>
          <CardDescription>Monitor and analyze individual agent metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLaunch} onValueChange={setSelectedLaunch}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by launch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Launches</SelectItem>
                <SelectItem value="New Capital Gardens">New Capital Gardens</SelectItem>
                <SelectItem value="Madinaty Residences">Madinaty Residences</SelectItem>
                <SelectItem value="Compound Sheikh Zayed">Compound Sheikh Zayed</SelectItem>
                <SelectItem value="Palm Hills October">Palm Hills October</SelectItem>
                <SelectItem value="Sodic West">Sodic West</SelectItem>
                <SelectItem value="Mountain View Hyde Park">Mountain View Hyde Park</SelectItem>
                <SelectItem value="Emaar Mivida">Emaar Mivida</SelectItem>
                <SelectItem value="Sabbour Eastown">Sabbour Eastown</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agents Grid */}
          <div className="space-y-6">
            {filteredAgents.map((agent) => {
              const isExpanded = expandedCards.has(agent.id)
              return (
                <Card key={agent.id} className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback>
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>{agent.email}</CardDescription>
                          <Badge variant="outline" className="text-xs mt-1">
                            {agent.id}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{agent.performance}%</span>
                          </div>
                          <Progress value={agent.performance} className="w-20 h-2" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardExpansion(agent.id)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{agent.totalLeads}</div>
                        <div className="text-xs text-blue-600">Total Leads</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">{agent.totalEOIs}</div>
                        <div className="text-xs text-green-600">EOIs Collected</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">{agent.totalSessions}</div>
                        <div className="text-xs text-purple-600">Total Sessions</div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="space-y-6 pt-4 border-t">
                        {/* Session Status Breakdown */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-muted-foreground">Session Status Breakdown</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                              <Activity className="h-4 w-4 text-orange-600" />
                              <div>
                                <div className="font-medium text-orange-700">{agent.activeSessions}</div>
                                <div className="text-xs text-orange-600">Active Sessions</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg">
                              <Clock className="h-4 w-4 text-indigo-600" />
                              <div>
                                <div className="font-medium text-indigo-700">{agent.upcomingSessions}</div>
                                <div className="text-xs text-indigo-600">Upcoming Sessions</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-gray-600" />
                              <div>
                                <div className="font-medium text-gray-700">{agent.passedSessions}</div>
                                <div className="text-xs text-gray-600">Passed Sessions</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Session Outcomes Breakdown */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-muted-foreground">Session Outcomes</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="flex items-center gap-2 p-3 bg-teal-50 rounded-lg">
                              <Target className="h-4 w-4 text-teal-600" />
                              <div>
                                <div className="font-medium text-teal-700">{agent.reservations}</div>
                                <div className="text-xs text-teal-600">Properties Reserved</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <div>
                                <div className="font-medium text-red-700">{agent.noShows}</div>
                                <div className="text-xs text-red-600">No Shows</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <div>
                                <div className="font-medium text-yellow-700">{agent.cancelled}</div>
                                <div className="text-xs text-yellow-600">Cancelled</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Launch Performance Breakdown */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-muted-foreground">Launch Performance Details</h4>
                          <div className="space-y-3">
                            {Object.entries(agent.launches).map(([launch, data]) => (
                              <div key={launch} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-900">{launch}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {data.eois} EOIs
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <div className="text-xs text-muted-foreground">Total Amount</div>
                                    <div className="font-semibold text-green-700">
                                      EGP {data.amount.toLocaleString()}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Average per EOI</div>
                                    <div className="font-semibold text-blue-700">
                                      EGP {Math.round(data.amount / data.eois).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {!isExpanded && (
                      <div className="pt-2">
                        <div className="text-center text-sm text-muted-foreground">
                          Click to expand for detailed breakdown
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Performance Summary</CardTitle>
          <CardDescription>Aggregated metrics across all agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-700">{totalStats.totalLeads}</div>
              <div className="text-sm text-blue-600">Total Leads</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-700">{totalStats.totalEOIs}</div>
              <div className="text-sm text-green-600">Total EOIs</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-700">{totalStats.totalSessions}</div>
              <div className="text-sm text-purple-600">Total Sessions</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-3xl font-bold text-teal-700">{totalStats.totalReservations}</div>
              <div className="text-sm text-teal-600">Total Reservations</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-700">{totalStats.activeSessions}</div>
              <div className="text-sm text-orange-600">Active Sessions</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-700">{totalStats.upcomingSessions}</div>
              <div className="text-sm text-indigo-600">Upcoming Sessions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
