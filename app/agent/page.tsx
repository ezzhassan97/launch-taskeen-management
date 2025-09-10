"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Video, MapPin, Plus, Settings, AlertCircle } from "lucide-react"

// Mock data
const mockAgentData = {
  name: "Maria Rodriguez",
  totalSlots: 24,
  bookedSlots: 18,
  availableSlots: 6,
  upcomingBookings: [
    { id: 1, clientName: "John Smith", time: "10:00 AM", date: "2024-01-15", mode: "in-person" },
    { id: 2, clientName: "Sarah Johnson", time: "11:00 AM", date: "2024-01-15", mode: "virtual" },
    { id: 3, clientName: "Ahmed Hassan", time: "2:00 PM", date: "2024-01-15", mode: "in-person" },
  ],
  workingHours: {
    start: "09:00",
    end: "17:00",
    slotDuration: 30,
    bufferTime: 5,
  },
}

export default function AgentCalendar() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [defaultMode, setDefaultMode] = useState("in-person")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your availability and upcoming bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Available</span>
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Block Time
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgentData.totalSlots}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgentData.bookedSlots}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockAgentData.bookedSlots / mockAgentData.totalSlots) * 100)}% utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgentData.availableSlots}</div>
            <p className="text-xs text-muted-foreground">Open slots</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div className={`h-2 w-2 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAvailable ? "Online" : "Offline"}</div>
            <p className="text-xs text-muted-foreground">Booking status</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Availability Settings
            </CardTitle>
            <CardDescription>Configure your working hours and slot preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Time</label>
                <Select defaultValue={mockAgentData.workingHours.start}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">End Time</label>
                <Select defaultValue={mockAgentData.workingHours.end}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Slot Duration</label>
                <Select defaultValue={mockAgentData.workingHours.slotDuration.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Buffer Time</label>
                <Select defaultValue={mockAgentData.workingHours.bufferTime.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No buffer</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Default Meeting Mode</label>
              <Select value={defaultMode} onValueChange={setDefaultMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="both">Both Options</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your upcoming bookings for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAgentData.upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{booking.clientName}</span>
                      <span className="text-xs text-muted-foreground">{booking.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {booking.mode === "in-person" ? (
                        <>
                          <MapPin className="h-3 w-3 mr-1" />
                          In-Person
                        </>
                      ) : (
                        <>
                          <Video className="h-3 w-3 mr-1" />
                          Virtual
                        </>
                      )}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capacity Warning */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-900">Approaching Capacity Limit</h3>
              <p className="text-sm text-orange-700 mt-1">
                You have {mockAgentData.availableSlots} slots remaining this week. Consider extending your hours or
                adjusting slot duration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
