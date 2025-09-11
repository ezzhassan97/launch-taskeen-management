"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Phone,
  Mail,
  User,
  Copy,
  Eye,
  Heart,
  Edit,
  Calendar,
  DollarSign,
  MapPin,
  Filter,
  Star,
  Building,
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const mockLeads = [
  {
    id: "LD001",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john@email.com",
    eois: [
      { id: "EOI001", launch: "Marina Heights Phase 1", amount: 5000, date: "2024-01-05" },
      { id: "EOI002", launch: "Marina Heights Phase 1", amount: 3000, date: "2024-01-08" },
    ],
    bookings: [{ launch: "Marina Heights Phase 1", date: "2024-01-15", time: "10:00 AM", status: "confirmed" }],
    preferences: {
      type: "specific_units",
      project: "Marina Heights Phase 1",
      data: [
        { unit: "Unit A-101", rank: 1, price: "8.5M", bedrooms: 2, type: "Apartment" },
        { unit: "Unit A-102", rank: 2, price: "9.2M", bedrooms: 2, type: "Apartment" },
        { unit: "Unit B-205", rank: 3, price: "12.1M", bedrooms: 3, type: "Apartment" },
      ],
    },
  },
  {
    id: "LD002",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah@email.com",
    eois: [],
    bookings: [],
    preferences: {
      type: "filter",
      project: "Marina Heights Phase 1",
      data: {
        filter: "Any unit below 10M, apartment, 2 bedrooms",
        matchingUnits: [
          { unit: "Unit A-101", price: "8.5M", bedrooms: 2, type: "Apartment" },
          { unit: "Unit A-102", price: "9.2M", bedrooms: 2, type: "Apartment" },
          { unit: "Unit C-301", price: "9.8M", bedrooms: 2, type: "Apartment" },
        ],
        totalMatching: 8,
      },
    },
  },
  {
    id: "LD003",
    name: "Ahmed Hassan",
    phone: "+1 (555) 345-6789",
    email: "ahmed@email.com",
    eois: [
      { id: "EOI003", launch: "Garden Residences Phase 2", amount: 7500, date: "2024-01-06" },
      { id: "EOI004", launch: "Marina Heights Phase 1", amount: 4000, date: "2024-01-10" },
    ],
    bookings: [
      { launch: "Garden Residences Phase 2", date: "2024-01-15", time: "2:00 PM", status: "confirmed" },
      { launch: "Marina Heights Phase 1", date: "2024-01-16", time: "11:00 AM", status: "pending" },
    ],
    preferences: {
      type: "property_type",
      project: "Garden Residences Phase 2",
      data: "Apartments only",
    },
  },
  {
    id: "LD004",
    name: "Lisa Chen",
    phone: "+1 (555) 456-7890",
    email: "lisa@email.com",
    eois: [{ id: "EOI005", launch: "City Center Tower", amount: 2500, date: "2024-01-12" }],
    bookings: [],
    preferences: {
      type: "none",
      data: null,
    },
  },
]

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [eoiFilter, setEoiFilter] = useState("all")
  const [bookingFilter, setBookingFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState(null)
  const [showPreferences, setShowPreferences] = useState(false)

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEoi =
      eoiFilter === "all" ||
      (eoiFilter === "paid" && lead.eois.length > 0) ||
      (eoiFilter === "none" && lead.eois.length === 0)

    const matchesBooking =
      bookingFilter === "all" ||
      (bookingFilter === "booked" && lead.bookings.length > 0) ||
      (bookingFilter === "not_booked" && lead.bookings.length === 0)

    return matchesSearch && matchesEoi && matchesBooking
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getEOIStatusBadge = (lead: any) => {
    if (lead.eois.length === 0) {
      return <Badge variant="outline">No EOI</Badge>
    }
    return (
      <Badge className="bg-green-100 text-green-800">
        {lead.eois.length} EOI{lead.eois.length > 1 ? "s" : ""}
      </Badge>
    )
  }

  const getBookingStatusBadge = (lead: any) => {
    if (lead.bookings.length === 0) {
      return <Badge variant="outline">No Booking</Badge>
    }
    return (
      <Badge className="bg-blue-100 text-blue-800">
        {lead.bookings.length} Booking{lead.bookings.length > 1 ? "s" : ""}
      </Badge>
    )
  }

  const getPreferencesDisplay = (preferences: any) => {
    switch (preferences.type) {
      case "specific_units":
        return `${preferences.data.length} specific units ranked`
      case "filter":
        return preferences.data.filter
      case "property_type":
        return preferences.data
      case "none":
        return "No preferences set"
      default:
        return "Unknown preference type"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">Manage your leads, EOIs, and bookings</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create EOI
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New EOI</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lead-select">Select Lead</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLeads.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="launch-select">Launch</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a launch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marina1">Marina Heights Phase 1</SelectItem>
                      <SelectItem value="garden2">Garden Residences Phase 2</SelectItem>
                      <SelectItem value="city1">City Center Tower</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">EOI Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <Button className="w-full">Create EOI</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <Button className="w-full">Create Lead</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={eoiFilter} onValueChange={setEoiFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="EOI Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All EOI Status</SelectItem>
            <SelectItem value="paid">Has EOI</SelectItem>
            <SelectItem value="none">No EOI</SelectItem>
          </SelectContent>
        </Select>
        <Select value={bookingFilter} onValueChange={setBookingFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Booking Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="booked">Has Booking</SelectItem>
            <SelectItem value="not_booked">No Booking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leads with EOI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockLeads.filter((l) => l.eois.length > 0).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total EOIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockLeads.reduce((sum, lead) => sum + lead.eois.length, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Booked Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockLeads.reduce((sum, lead) => sum + lead.bookings.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{lead.name}</h3>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(lead.id)} className="h-6 px-2">
                        <Copy className="h-3 w-3 mr-1" />
                        {lead.id}
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {lead.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[30vw] sm:w-[30vw] overflow-y-auto p-6">
                      <SheetHeader className="pb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <SheetTitle className="text-2xl">{lead.name}</SheetTitle>
                            <p className="text-sm text-muted-foreground mt-1">Lead ID: {lead.id}</p>
                          </div>
                        </div>
                      </SheetHeader>

                      <div className="space-y-8">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold flex items-center gap-3">
                              <User className="h-5 w-5 text-primary" />
                              Contact Information
                            </h3>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{lead.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{lead.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Copy className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Lead ID: {lead.id}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(lead.id)}
                                className="h-6 px-2"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold">EOI Information</h3>
                            <Badge variant="secondary">
                              {lead.eois.length} EOI{lead.eois.length !== 1 ? "s" : ""}
                            </Badge>
                          </div>

                          {lead.eois.length > 0 ? (
                            <div className="space-y-3">
                              {lead.eois.map((eoi, index) => (
                                <div
                                  key={index}
                                  className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-semibold text-green-800 dark:text-green-200">{eoi.launch}</div>
                                    <Badge className="bg-green-600 text-white">${eoi.amount.toLocaleString()}</Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-green-700 dark:text-green-300">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {eoi.date}
                                    </div>
                                    <div>EOI ID: {eoi.id}</div>
                                  </div>
                                </div>
                              ))}
                              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3">
                                <div className="font-medium text-green-800 dark:text-green-200">
                                  Total EOI Amount: $
                                  {lead.eois.reduce((sum, eoi) => sum + eoi.amount, 0).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                              <DollarSign className="h-8 w-8 mx-auto mb-3 opacity-50" />
                              <p>No EOIs submitted yet</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold">Booked Sessions</h3>
                            <Badge variant="secondary">
                              {lead.bookings.length} Session{lead.bookings.length !== 1 ? "s" : ""}
                            </Badge>
                          </div>

                          {lead.bookings.length > 0 ? (
                            <div className="space-y-3">
                              {lead.bookings.map((booking, index) => (
                                <div
                                  key={index}
                                  className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-semibold text-blue-800 dark:text-blue-200">
                                      {booking.launch}
                                    </div>
                                    <Badge
                                      className={
                                        booking.status === "confirmed"
                                          ? "bg-blue-600 text-white"
                                          : "bg-yellow-600 text-white"
                                      }
                                    >
                                      {booking.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-blue-700 dark:text-blue-300">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {booking.date}
                                    </div>
                                    <div>{booking.time}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                              <Calendar className="h-8 w-8 mx-auto mb-3 opacity-50" />
                              <p>No Taskeen day sessions booked</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Sheet open={showPreferences} onOpenChange={setShowPreferences}>
                    <SheetTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead)
                          setShowPreferences(true)
                        }}
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Preferences
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[30vw] sm:w-[30vw] overflow-y-auto p-6">
                      <SheetHeader className="pb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                            <Heart className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <SheetTitle className="text-2xl">{selectedLead?.name} - Preferences</SheetTitle>
                            <p className="text-muted-foreground mt-1">Unit preferences and requirements</p>
                          </div>
                        </div>
                      </SheetHeader>

                      <div className="space-y-6">
                        {selectedLead?.preferences.type === "specific_units" && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                              <Star className="h-5 w-5 text-purple-600" />
                              <h3 className="text-lg font-semibold">Ranked Unit Preferences</h3>
                              <Badge className="bg-purple-600 text-white">{selectedLead.preferences.project}</Badge>
                            </div>
                            <div className="space-y-4">
                              {selectedLead.preferences.data.map((pref, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-purple-200 dark:border-purple-800"
                                >
                                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {pref.rank}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold">{pref.unit}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                                      <span>{pref.price}</span>
                                      <span>{pref.bedrooms} BR</span>
                                      <span>{pref.type}</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedLead?.preferences.type === "filter" && (
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                              <Filter className="h-5 w-5 text-blue-600" />
                              <h3 className="text-lg font-semibold">Saved Filter Preferences</h3>
                              <Badge className="bg-blue-600 text-white">{selectedLead.preferences.project}</Badge>
                            </div>

                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
                              <div className="font-medium text-blue-800 dark:text-blue-200 mb-2">Filter Criteria:</div>
                              <div className="text-blue-700 dark:text-blue-300">
                                {selectedLead.preferences.data.filter}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold">Matching Units</h4>
                              <Badge variant="outline" className="text-blue-600 border-blue-600">
                                {selectedLead.preferences.data.totalMatching} units match
                              </Badge>
                            </div>

                            <div className="space-y-3 mb-4">
                              {selectedLead.preferences.data.matchingUnits.slice(0, 3).map((unit, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border"
                                >
                                  <div>
                                    <div className="font-medium">{unit.unit}</div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {unit.price} • {unit.bedrooms} BR • {unit.type}
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>

                            {selectedLead.preferences.data.totalMatching > 3 && (
                              <Button variant="outline" className="w-full bg-transparent">
                                See More ({selectedLead.preferences.data.totalMatching - 3} more units)
                              </Button>
                            )}
                          </div>
                        )}

                        {selectedLead?.preferences.type === "property_type" && (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                              <Building className="h-5 w-5 text-green-600" />
                              <h3 className="text-lg font-semibold">Property Type Preference</h3>
                              <Badge className="bg-green-600 text-white">{selectedLead.preferences.project}</Badge>
                            </div>

                            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-6 text-center">
                              <div className="font-medium text-green-800 dark:text-green-200 mb-3">
                                Preferred Property Type:
                              </div>
                              <div className="text-2xl font-semibold text-green-700 dark:text-green-300">
                                {selectedLead.preferences.data}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedLead?.preferences.type === "none" && (
                          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg p-6">
                            <div className="text-center py-12">
                              <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                              <h3 className="text-xl font-semibold mb-4">No Preferences Set</h3>
                              <p className="text-muted-foreground mb-6">
                                This lead hasn't specified any unit preferences yet.
                              </p>
                              <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Preferences
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">EOI Status</h4>
                  {getEOIStatusBadge(lead)}
                  {lead.eois.length > 0 && (
                    <div className="text-sm font-medium mt-1">
                      Total: ${lead.eois.reduce((sum, eoi) => sum + eoi.amount, 0).toLocaleString()}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Booking Status</h4>
                  {getBookingStatusBadge(lead)}
                  {lead.bookings.length > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">Next: {lead.bookings[0].date}</div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Preferences</h4>
                  <div className="text-sm">{getPreferencesDisplay(lead.preferences)}</div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Launches</h4>
                  <div className="text-sm">
                    {lead.eois.length > 0 ? (
                      <div>
                        {Array.from(new Set(lead.eois.map((eoi) => eoi.launch))).map((launch, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            {launch}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Badge variant="outline">No launches</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
