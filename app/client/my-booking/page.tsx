"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Video, User, Phone, Mail, Edit, X, CheckCircle } from "lucide-react"

// Mock booking data
const mockBooking = {
  id: "BK-2024-001",
  agentName: "Maria Rodriguez",
  agentPhoto: "/professional-woman-diverse.png",
  date: "2024-01-15",
  time: "10:00 AM",
  duration: 30,
  mode: "in-person",
  status: "confirmed",
  location: "Marina Heights Sales Office, 123 Harbor View Drive",
  clientName: "John Smith",
  clientPhone: "+1 (555) 123-4567",
  clientEmail: "john@email.com",
  eoiReference: "EOI-2024-456",
  canReschedule: true,
  canCancel: true,
  rescheduleDeadline: "2024-01-14 10:00 AM",
  cancelDeadline: "2024-01-14 10:00 AM",
}

export default function MyBookingPage() {
  const [showReschedule, setShowReschedule] = useState(false)
  const [showCancel, setShowCancel] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Booking</h1>
        <p className="text-muted-foreground">View and manage your upcoming appointment</p>
      </div>

      {/* Booking Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h2 className="text-xl font-semibold">Booking Confirmed</h2>
                <p className="text-muted-foreground">Reference: {mockBooking.id}</p>
              </div>
            </div>
            <Badge className={getStatusColor(mockBooking.status)}>{mockBooking.status}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={mockBooking.agentPhoto || "/placeholder.svg"}
                alt={mockBooking.agentName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{mockBooking.agentName}</h3>
                <p className="text-sm text-muted-foreground">Property Agent</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date</label>
                <p className="font-medium">{mockBooking.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Time</label>
                <p className="font-medium">{mockBooking.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                <p className="font-medium">{mockBooking.duration} minutes</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mode</label>
                <div className="flex items-center gap-1">
                  {mockBooking.mode === "in-person" ? (
                    <>
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{mockBooking.mode}</span>
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4" />
                      <span className="capitalize">{mockBooking.mode}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {mockBooking.mode === "in-person" && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="font-medium">{mockBooking.location}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="font-medium">{mockBooking.clientName}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <p className="font-medium">{mockBooking.clientPhone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <p className="font-medium">{mockBooking.clientEmail}</p>
                </div>
              </div>
            </div>

            {mockBooking.eoiReference && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">EOI Reference</label>
                <p className="font-medium">{mockBooking.eoiReference}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Booking</CardTitle>
          <CardDescription>You can reschedule or cancel your appointment up to 24 hours in advance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline" disabled={!mockBooking.canReschedule} onClick={() => setShowReschedule(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Reschedule
            </Button>
            <Button variant="outline" disabled={!mockBooking.canCancel} onClick={() => setShowCancel(true)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Reschedule deadline: {mockBooking.rescheduleDeadline}</p>
            <p>Cancellation deadline: {mockBooking.cancelDeadline}</p>
          </div>
        </CardContent>
      </Card>

      {/* Preparation Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Prepare for Your Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Review available units and prepare your questions</li>
            <li>• Bring valid ID and any required documents</li>
            <li>• Arrive 5 minutes early for in-person meetings</li>
            <li>• Have your unit preferences ready to discuss</li>
            <li>• Prepare your budget and financing information</li>
          </ul>
        </CardContent>
      </Card>

      {/* Reschedule Modal Placeholder */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reschedule Appointment</CardTitle>
              <CardDescription>Select a new time for your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reschedule functionality would be implemented here with available time slots.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowReschedule(false)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Confirm</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cancel Modal Placeholder */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Cancel Appointment</CardTitle>
              <CardDescription>Are you sure you want to cancel this appointment?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This action cannot be undone. You'll need to book a new appointment if you change your mind.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCancel(false)} className="flex-1">
                  Keep Booking
                </Button>
                <Button variant="destructive" className="flex-1">
                  Cancel Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
