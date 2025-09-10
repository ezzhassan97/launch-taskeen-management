import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, TrendingUp, AlertTriangle, Eye, MessageSquare, BarChart3 } from "lucide-react"

export default function BrokerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Broker Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your agents and oversee client relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
            Premium Brokerage
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">347</div>
            <p className="text-xs text-gray-600">+23% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-gray-600">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
            <CardDescription>Based on bookings and conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", bookings: 45, conversion: "72%", status: "excellent" },
                { name: "Michael Chen", bookings: 38, conversion: "68%", status: "good" },
                { name: "Emily Rodriguez", bookings: 32, conversion: "65%", status: "good" },
                { name: "David Kim", bookings: 28, conversion: "58%", status: "average" },
              ].map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-cyan-700">
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{agent.conversion}</p>
                    <Badge
                      variant={
                        agent.status === "excellent" ? "default" : agent.status === "good" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Issues requiring broker attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "High Demand",
                  message: "Unit A-301 has 8 clients ranking it #1",
                  agent: "Sarah Johnson",
                  time: "2 hours ago",
                  severity: "high",
                },
                {
                  type: "Booking Conflict",
                  message: "Double booking detected for tomorrow 2 PM",
                  agent: "Michael Chen",
                  time: "4 hours ago",
                  severity: "medium",
                },
                {
                  type: "Client Complaint",
                  message: "Client reported scheduling issues",
                  agent: "Emily Rodriguez",
                  time: "1 day ago",
                  severity: "low",
                },
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "high"
                        ? "bg-red-500"
                        : alert.severity === "medium"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{alert.type}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">Agent: {alert.agent}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common broker management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Users className="h-6 w-6" />
              <span>Manage Agents</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <MessageSquare className="h-6 w-6" />
              <span>Client Messages</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
