"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Phone, Mail, MessageSquare, User, Calendar, Heart, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const mockClients = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john@email.com",
    eoiStatus: "paid",
    eoiAmount: 5000,
    hasBooking: true,
    bookingDate: "2024-01-15",
    bookingTime: "10:00 AM",
    preferencesCount: 3,
    lastContact: "2024-01-10",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah@email.com",
    eoiStatus: "pending",
    eoiAmount: 0,
    hasBooking: false,
    preferencesCount: 0,
    lastContact: "2024-01-12",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    phone: "+1 (555) 345-6789",
    email: "ahmed@email.com",
    eoiStatus: "paid",
    eoiAmount: 7500,
    hasBooking: true,
    bookingDate: "2024-01-15",
    bookingTime: "2:00 PM",
    preferencesCount: 5,
    lastContact: "2024-01-11",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEOIStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients & EOIs</h1>
          <p className="text-muted-foreground mt-1">Manage your client relationships and EOI records</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{mockClients.length}</div>
            <div className="text-muted-foreground">Total Clients</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{mockClients.filter((c) => c.eoiStatus === "paid").length}</div>
            <div className="text-muted-foreground">Paid EOIs</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{mockClients.filter((c) => c.hasBooking).length}</div>
            <div className="text-muted-foreground">Booked</div>
          </div>
        </div>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* EOI Status */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">EOI Status</h4>
                  <div className="space-y-1">
                    <Badge className={getEOIStatusColor(client.eoiStatus)}>{client.eoiStatus}</Badge>
                    {client.eoiAmount > 0 && (
                      <div className="text-sm font-medium">${client.eoiAmount.toLocaleString()}</div>
                    )}
                  </div>
                </div>

                {/* Booking Status */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Booking</h4>
                  {client.hasBooking ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {client.bookingDate}
                      </div>
                      <div className="text-sm font-medium">{client.bookingTime}</div>
                    </div>
                  ) : (
                    <Badge variant="outline">No booking</Badge>
                  )}
                </div>

                {/* Preferences */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Preferences</h4>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span className="text-sm">{client.preferencesCount} units ranked</span>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Actions</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {!client.hasBooking && <Button size="sm">Invite to Book</Button>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No clients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms." : "Start by adding your first client."}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
