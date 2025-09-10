"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { LiveReservationManager } from "@/components/live-reservation-manager"
import { Handshake, User, Clock, Building, CheckCircle, AlertTriangle, Lock, Phone, Mail } from "lucide-react"

// Mock client data for active slot
const mockActiveClient = {
  name: "John Smith",
  phone: "+1 (555) 123-4567",
  email: "john@email.com",
  eoiReference: "EOI-2024-456",
  slotTime: "10:00 AM - 10:30 AM",
  preferences: [
    { rank: 1, unitCode: "A-101", type: "2 Bedroom", price: 850000, status: "available", demandLevel: "high" },
    { rank: 2, unitCode: "A-501", type: "3 Bedroom", price: 1400000, status: "available", demandLevel: "high" },
    { rank: 3, unitCode: "B-205", type: "3 Bedroom", price: 1200000, status: "available", demandLevel: "medium" },
  ],
  notes: "Interested in marina view units. Budget up to $1.5M. Prefers higher floors.",
}

export default function LiveSettlementPage() {
  const [activeSlot, setActiveSlot] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [reservationStatus, setReservationStatus] = useState<"idle" | "reserving" | "reserved" | "failed">("idle")
  const [meetingNotes, setMeetingNotes] = useState("")
  const [outcome, setOutcome] = useState<"pending" | "booked" | "no-show" | "follow-up">("pending")

  const startMeeting = () => {
    setActiveSlot(true)
  }

  const attemptReservation = async (unitCode: string) => {
    setSelectedUnit(unitCode)
    setReservationStatus("reserving")

    // Simulate reservation attempt
    setTimeout(() => {
      // Simulate success/failure based on unit availability
      const success = Math.random() > 0.3 // 70% success rate
      setReservationStatus(success ? "reserved" : "failed")
    }, 2000)
  }

  const confirmBooking = () => {
    if (selectedUnit && reservationStatus === "reserved") {
      setOutcome("booked")
      // In real implementation, this would finalize the booking
    }
  }

  const completeMeeting = () => {
    setActiveSlot(false)
    setSelectedUnit(null)
    setReservationStatus("idle")
    setMeetingNotes("")
    setOutcome("pending")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Settlement</h1>
          <p className="text-muted-foreground mt-1">Manage client meetings and unit reservations in real-time</p>
        </div>
        {!activeSlot && (
          <Button onClick={startMeeting}>
            <Handshake className="h-4 w-4 mr-2" />
            Start Meeting
          </Button>
        )}
      </div>

      {!activeSlot ? (
        /* Pre-Meeting State */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Next Appointment
              </CardTitle>
              <CardDescription>Your upcoming client meeting details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{mockActiveClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{mockActiveClient.slotTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {mockActiveClient.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {mockActiveClient.email}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">EOI Reference</label>
                <p className="font-medium">{mockActiveClient.eoiReference}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Notes</label>
                <p className="text-sm">{mockActiveClient.notes}</p>
              </div>
            </CardContent>
          </Card>

          <LiveReservationManager />
        </div>
      ) : (
        /* Active Meeting State */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Context Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{mockActiveClient.name}</h3>
                <p className="text-sm text-muted-foreground">{mockActiveClient.eoiReference}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Ranked Preferences</h4>
                <div className="space-y-2">
                  {mockActiveClient.preferences.map((pref) => (
                    <div
                      key={pref.unitCode}
                      className="flex items-center justify-between p-2 border border-border rounded"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {pref.rank}
                          </span>
                          <span className="font-medium">{pref.unitCode}</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-8">
                          {pref.type} • ${pref.price.toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={pref.demandLevel === "high" ? "destructive" : "secondary"} className="text-xs">
                        {pref.demandLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Meeting Notes</label>
                <Textarea
                  placeholder="Add notes about the client discussion..."
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Unit Reservation Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Unit Reservation
              </CardTitle>
              <CardDescription>Reserve units based on client preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActiveClient.preferences.map((pref) => (
                <div key={pref.unitCode} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{pref.unitCode}</h4>
                      <p className="text-sm text-muted-foreground">
                        #{pref.rank} choice • {pref.type}
                      </p>
                    </div>
                    <Badge variant={pref.status === "available" ? "default" : "secondary"}>{pref.status}</Badge>
                  </div>

                  <div className="flex gap-2">
                    {selectedUnit === pref.unitCode ? (
                      <div className="flex-1">
                        {reservationStatus === "reserving" && (
                          <Button disabled className="w-full">
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Reserving...
                          </Button>
                        )}
                        {reservationStatus === "reserved" && (
                          <div className="space-y-2">
                            <Button className="w-full" onClick={confirmBooking}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm Booking
                            </Button>
                            <p className="text-xs text-green-600 text-center">Reserved successfully! 30min timeout.</p>
                          </div>
                        )}
                        {reservationStatus === "failed" && (
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full bg-transparent" disabled>
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Reservation Failed
                            </Button>
                            <p className="text-xs text-red-600 text-center">Unit was reserved by another agent</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="flex-1"
                        onClick={() => attemptReservation(pref.unitCode)}
                        disabled={pref.status !== "available" || reservationStatus === "reserving"}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Reserve Unit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Meeting Outcome */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Meeting Outcome
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={outcome === "booked" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutcome("booked")}
                    disabled={reservationStatus !== "reserved"}
                  >
                    Booked
                  </Button>
                  <Button
                    variant={outcome === "follow-up" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutcome("follow-up")}
                  >
                    Follow-up
                  </Button>
                  <Button
                    variant={outcome === "no-show" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutcome("no-show")}
                  >
                    No-show
                  </Button>
                  <Button
                    variant={outcome === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutcome("pending")}
                  >
                    Pending
                  </Button>
                </div>
              </div>

              {outcome === "booked" && selectedUnit && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Unit {selectedUnit} Booked!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">Booking confirmed for {mockActiveClient.name}</p>
                </div>
              )}

              <Button className="w-full" onClick={completeMeeting} disabled={outcome === "pending"}>
                Complete Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
