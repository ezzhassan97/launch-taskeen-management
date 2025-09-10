"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Video, CheckCircle, AlertCircle } from "lucide-react"

// Mock data for available slots
const mockAgent = {
  name: "Maria Rodriguez",
  photo: "/professional-woman-diverse.png",
  rating: 4.9,
  totalBookings: 156,
  slotDuration: 30,
  meetingModes: ["in-person", "virtual"],
}

const mockAvailableSlots = [
  { id: 1, date: "2024-01-15", time: "10:00 AM", available: true },
  { id: 2, date: "2024-01-15", time: "10:30 AM", available: true },
  { id: 3, date: "2024-01-15", time: "11:00 AM", available: false },
  { id: 4, date: "2024-01-15", time: "11:30 AM", available: true },
  { id: 5, date: "2024-01-15", time: "2:00 PM", available: true },
  { id: 6, date: "2024-01-15", time: "2:30 PM", available: true },
  { id: 7, date: "2024-01-15", time: "3:00 PM", available: true },
  { id: 8, date: "2024-01-15", time: "3:30 PM", available: false },
]

export default function BookSlotPage() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eoiReference: "",
    meetingMode: "in-person",
  })
  const [step, setStep] = useState<"select" | "form" | "confirm">("select")

  const handleSlotSelect = (slotId: number) => {
    setSelectedSlot(slotId)
    setStep("form")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirm")
  }

  const selectedSlotData = mockAvailableSlots.find((slot) => slot.id === selectedSlot)

  if (step === "confirm") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your appointment has been successfully booked</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Agent</Label>
                <p className="font-medium">{mockAgent.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                <p className="font-medium">
                  {selectedSlotData?.date} at {selectedSlotData?.time}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                <p className="font-medium">{mockAgent.slotDuration} minutes</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Meeting Mode</Label>
                <p className="font-medium capitalize">{formData.meetingMode}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-muted-foreground">Contact Information</Label>
              <div className="mt-2 space-y-1">
                <p>{formData.name}</p>
                <p>{formData.phone}</p>
                <p>{formData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            View My Booking
          </Button>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">What's Next?</h3>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• A reminder will be sent 24 hours before your appointment</li>
                  <li>• You can reschedule or cancel up to 24 hours in advance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Book an Appointment</h1>
        <p className="text-muted-foreground">
          Schedule a meeting with {mockAgent.name} to discuss your property preferences
        </p>
      </div>

      {/* Agent Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <img
              src={mockAgent.photo || "/placeholder.svg"}
              alt={mockAgent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{mockAgent.name}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <span>⭐ {mockAgent.rating}</span>
                </div>
                <div>{mockAgent.totalBookings} bookings completed</div>
                <div>{mockAgent.slotDuration}-minute sessions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {step === "select" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Time Slots */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>Select a convenient time for your appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockAvailableSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={slot.available ? "outline" : "ghost"}
                      disabled={!slot.available}
                      onClick={() => slot.available && handleSlotSelect(slot.id)}
                      className={cn(
                        "h-auto p-3 flex flex-col items-center gap-1",
                        !slot.available && "opacity-50 cursor-not-allowed",
                      )}
                    >
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{slot.time}</span>
                      <span className="text-xs text-muted-foreground">{slot.date}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="font-medium">{mockAgent.slotDuration} minutes</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Meeting Options</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      In-person meeting
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="h-4 w-4" />
                      Virtual meeting
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Policies</Label>
                  <div className="mt-2 text-sm space-y-1">
                    <p>• Free cancellation up to 24 hours</p>
                    <p>• Rescheduling allowed once</p>
                    <p>• Please arrive 5 minutes early</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === "form" && selectedSlotData && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Booking</CardTitle>
              <CardDescription>
                Appointment on {selectedSlotData.date} at {selectedSlotData.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="eoi">EOI Reference (Optional)</Label>
                  <Input
                    id="eoi"
                    placeholder="Enter your EOI reference number"
                    value={formData.eoiReference}
                    onChange={(e) => setFormData((prev) => ({ ...prev, eoiReference: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="mode">Meeting Mode *</Label>
                  <Select
                    value={formData.meetingMode}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, meetingMode: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          In-Person Meeting
                        </div>
                      </SelectItem>
                      <SelectItem value="virtual">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Virtual Meeting
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep("select")} className="flex-1">
                    Back to Slots
                  </Button>
                  <Button type="submit" className="flex-1">
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
