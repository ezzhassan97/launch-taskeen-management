import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Eye, MessageSquare, Calendar } from "lucide-react"

export default function BrokerClientsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Oversight</h1>
          <p className="text-gray-600 mt-1">Monitor client interactions across all agents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-gray-600">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">89</div>
            <p className="text-sm text-gray-600">Active EOIs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">34</div>
            <p className="text-sm text-gray-600">Booked Slots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-gray-600">Reservations</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search clients..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="michael">Michael Chen</SelectItem>
                <SelectItem value="emily">Emily Rodriguez</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="eoi-submitted">EOI Submitted</SelectItem>
                <SelectItem value="slot-booked">Slot Booked</SelectItem>
                <SelectItem value="unit-reserved">Unit Reserved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Client Overview</CardTitle>
          <CardDescription>All client interactions across your brokerage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Alex Thompson",
                email: "alex.thompson@email.com",
                phone: "+1 (555) 123-4567",
                agent: "Sarah Johnson",
                status: "unit-reserved",
                eoi: "Yes",
                slotDate: "2024-01-15",
                slotTime: "2:00 PM",
                preferences: ["A-301", "B-205", "C-102"],
                lastActivity: "2 hours ago",
              },
              {
                name: "Maria Garcia",
                email: "maria.garcia@email.com",
                phone: "+1 (555) 234-5678",
                agent: "Michael Chen",
                status: "slot-booked",
                eoi: "Yes",
                slotDate: "2024-01-16",
                slotTime: "10:30 AM",
                preferences: ["B-301", "A-205", "C-301"],
                lastActivity: "1 day ago",
              },
              {
                name: "John Smith",
                email: "john.smith@email.com",
                phone: "+1 (555) 345-6789",
                agent: "Emily Rodriguez",
                status: "eoi-submitted",
                eoi: "Yes",
                slotDate: null,
                slotTime: null,
                preferences: ["A-101", "B-102", "A-201"],
                lastActivity: "3 hours ago",
              },
              {
                name: "Sarah Wilson",
                email: "sarah.wilson@email.com",
                phone: "+1 (555) 456-7890",
                agent: "Sarah Johnson",
                status: "completed",
                eoi: "Yes",
                slotDate: "2024-01-12",
                slotTime: "3:30 PM",
                preferences: ["C-301", "B-205", "A-301"],
                lastActivity: "2 days ago",
              },
            ].map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-cyan-700">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-xs text-gray-500">Agent: {client.agent}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Badge
                      variant={
                        client.status === "unit-reserved"
                          ? "default"
                          : client.status === "slot-booked"
                            ? "secondary"
                            : client.status === "completed"
                              ? "outline"
                              : "outline"
                      }
                      className="mb-1"
                    >
                      {client.status.replace("-", " ")}
                    </Badge>
                    {client.slotDate && (
                      <p className="text-xs text-gray-600">
                        {client.slotDate} at {client.slotTime}
                      </p>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">Top Preferences</p>
                    <p className="text-xs text-gray-600">
                      {client.preferences.slice(0, 2).join(", ")}
                      {client.preferences.length > 2 && ` +${client.preferences.length - 2}`}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">{client.lastActivity}</p>
                    <div className="flex gap-1 mt-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
