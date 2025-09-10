import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Calendar, Users, TrendingUp } from "lucide-react"

export default function BrokerAgentsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Agents</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your agent team</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search agents..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Sarah Johnson",
            email: "sarah.johnson@realty.com",
            phone: "+1 (555) 123-4567",
            status: "active",
            performance: "excellent",
            bookings: 45,
            conversion: 72,
            clients: 28,
            joinDate: "Jan 2023",
          },
          {
            name: "Michael Chen",
            email: "michael.chen@realty.com",
            phone: "+1 (555) 234-5678",
            status: "active",
            performance: "good",
            bookings: 38,
            conversion: 68,
            clients: 24,
            joinDate: "Mar 2023",
          },
          {
            name: "Emily Rodriguez",
            email: "emily.rodriguez@realty.com",
            phone: "+1 (555) 345-6789",
            status: "active",
            performance: "good",
            bookings: 32,
            conversion: 65,
            clients: 19,
            joinDate: "Feb 2023",
          },
          {
            name: "David Kim",
            email: "david.kim@realty.com",
            phone: "+1 (555) 456-7890",
            status: "active",
            performance: "average",
            bookings: 28,
            conversion: 58,
            clients: 16,
            joinDate: "Apr 2023",
          },
          {
            name: "Lisa Wang",
            email: "lisa.wang@realty.com",
            phone: "+1 (555) 567-8901",
            status: "on-leave",
            performance: "good",
            bookings: 22,
            conversion: 63,
            clients: 12,
            joinDate: "May 2023",
          },
          {
            name: "James Wilson",
            email: "james.wilson@realty.com",
            phone: "+1 (555) 678-9012",
            status: "active",
            performance: "needs-improvement",
            bookings: 15,
            conversion: 45,
            clients: 8,
            joinDate: "Jun 2023",
          },
        ].map((agent, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-cyan-700">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription>{agent.email}</CardDescription>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Performance */}
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    agent.status === "active" ? "default" : agent.status === "on-leave" ? "secondary" : "outline"
                  }
                  className="capitalize"
                >
                  {agent.status.replace("-", " ")}
                </Badge>
                <Badge
                  variant={
                    agent.performance === "excellent"
                      ? "default"
                      : agent.performance === "good"
                        ? "secondary"
                        : "outline"
                  }
                  className="capitalize"
                >
                  {agent.performance.replace("-", " ")}
                </Badge>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{agent.bookings}</p>
                  <p className="text-xs text-gray-600">Bookings</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{agent.conversion}%</p>
                  <p className="text-xs text-gray-600">Conversion</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{agent.clients}</p>
                  <p className="text-xs text-gray-600">Clients</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600">{agent.phone}</p>
                <p className="text-xs text-gray-500">Joined {agent.joinDate}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
