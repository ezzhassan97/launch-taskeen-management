"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Phone, Mail, User, Calendar, CreditCard, Building, Clock, Copy } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockEOIs = [
  {
    id: "EOI-001",
    leadId: "LEAD-001",
    leadName: "John Smith",
    leadPhone: "+1 (555) 123-4567",
    leadEmail: "john@email.com",
    amount: 5000,
    paymentMethod: "Bank Transfer",
    launch: "Marina Bay Phase 1",
    eoiType: "Property Type",
    propertyType: "2BR Apartment",
    timestamp: "2024-01-15T10:30:00Z",
    status: "confirmed",
  },
  {
    id: "EOI-002",
    leadId: "LEAD-002",
    leadName: "Sarah Johnson",
    leadPhone: "+1 (555) 234-5678",
    leadEmail: "sarah@email.com",
    amount: 7500,
    paymentMethod: "Cheque",
    launch: "Downtown Tower Phase 2",
    eoiType: "Generic",
    propertyType: null,
    timestamp: "2024-01-14T14:15:00Z",
    status: "confirmed",
  },
  {
    id: "EOI-003",
    leadId: "LEAD-003",
    leadName: "Ahmed Hassan",
    leadPhone: "+1 (555) 345-6789",
    leadEmail: "ahmed@email.com",
    amount: 10000,
    paymentMethod: "Payment Online",
    launch: "Marina Bay Phase 1",
    eoiType: "Property Type",
    propertyType: "3BR Penthouse",
    timestamp: "2024-01-13T09:45:00Z",
    status: "confirmed",
  },
  {
    id: "EOI-004",
    leadId: "LEAD-001",
    leadName: "John Smith",
    leadPhone: "+1 (555) 123-4567",
    leadEmail: "john@email.com",
    amount: 3000,
    paymentMethod: "Payment Online",
    launch: "Downtown Tower Phase 2",
    eoiType: "Generic",
    propertyType: null,
    timestamp: "2024-01-12T16:20:00Z",
    status: "confirmed",
  },
  {
    id: "EOI-005",
    leadId: "LEAD-004",
    leadName: "Lisa Chen",
    leadPhone: "+1 (555) 456-7890",
    leadEmail: "lisa@email.com",
    amount: 6000,
    paymentMethod: "Bank Transfer",
    launch: "Skyline Heights Phase 1",
    eoiType: "Property Type",
    propertyType: "1BR Studio",
    timestamp: "2024-01-11T11:30:00Z",
    status: "pending",
  },
]

export default function EOIsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [launchFilter, setLaunchFilter] = useState("all")
  const [eoiTypeFilter, setEOITypeFilter] = useState("all")

  const filteredEOIs = mockEOIs.filter((eoi) => {
    const matchesSearch =
      eoi.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eoi.leadEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eoi.leadPhone.includes(searchTerm) ||
      eoi.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPaymentMethod = paymentMethodFilter === "all" || eoi.paymentMethod === paymentMethodFilter
    const matchesLaunch = launchFilter === "all" || eoi.launch === launchFilter
    const matchesEOIType = eoiTypeFilter === "all" || eoi.eoiType === eoiTypeFilter

    return matchesSearch && matchesPaymentMethod && matchesLaunch && matchesEOIType
  })

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return "bg-blue-100 text-blue-800"
      case "Cheque":
        return "bg-orange-100 text-orange-800"
      case "Payment Online":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEOITypeColor = (type: string) => {
    switch (type) {
      case "Property Type":
        return "bg-purple-100 text-purple-800"
      case "Generic":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const uniqueLaunches = [...new Set(mockEOIs.map((eoi) => eoi.launch))]
  const uniquePaymentMethods = [...new Set(mockEOIs.map((eoi) => eoi.paymentMethod))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EOIs</h1>
          <p className="text-muted-foreground mt-1">Manage all collected Expression of Interest payments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add EOI
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search EOIs, leads, or EOI ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment Methods</SelectItem>
              {uniquePaymentMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={launchFilter} onValueChange={setLaunchFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Launch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Launches</SelectItem>
              {uniqueLaunches.map((launch) => (
                <SelectItem key={launch} value={launch}>
                  {launch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={eoiTypeFilter} onValueChange={setEOITypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="EOI Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Property Type">Property Type</SelectItem>
              <SelectItem value="Generic">Generic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-6 text-sm">
          <div className="text-center">
            <div className="font-semibold text-lg">{mockEOIs.length}</div>
            <div className="text-muted-foreground">Total EOIs</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">
              ${mockEOIs.reduce((sum, eoi) => sum + eoi.amount, 0).toLocaleString()}
            </div>
            <div className="text-muted-foreground">Total Amount</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{uniqueLaunches.length}</div>
            <div className="text-muted-foreground">Active Launches</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{new Set(mockEOIs.map((eoi) => eoi.leadId)).size}</div>
            <div className="text-muted-foreground">Unique Leads</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEOIs.map((eoi) => {
          const timestamp = formatTimestamp(eoi.timestamp)
          return (
            <Card key={eoi.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{eoi.id}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(eoi.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {eoi.leadName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {eoi.leadPhone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {eoi.leadEmail}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${eoi.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">EOI Amount</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Payment Method */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Payment Method</h4>
                    <Badge className={getPaymentMethodColor(eoi.paymentMethod)}>{eoi.paymentMethod}</Badge>
                  </div>

                  {/* Launch */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Launch</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Building className="h-3 w-3" />
                      <span className="font-medium">{eoi.launch}</span>
                    </div>
                  </div>

                  {/* EOI Type */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">EOI Type</h4>
                    <div className="space-y-1">
                      <Badge className={getEOITypeColor(eoi.eoiType)}>{eoi.eoiType}</Badge>
                      {eoi.propertyType && <div className="text-xs text-muted-foreground">{eoi.propertyType}</div>}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Collected</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {timestamp.date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {timestamp.time}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Actions</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        View Lead
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEOIs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No EOIs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms or filters." : "No EOI payments have been collected yet."}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add EOI
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
