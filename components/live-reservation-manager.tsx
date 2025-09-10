"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertTriangle, CheckCircle, X, Timer, User } from "lucide-react"

interface Reservation {
  id: string
  unitCode: string
  clientName: string
  agentName: string
  startTime: Date
  expiryTime: Date
  status: "active" | "expiring" | "expired"
}

// Mock active reservations
const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    unitCode: "A-101",
    clientName: "John Smith",
    agentName: "Maria Rodriguez",
    startTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    expiryTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    status: "active",
  },
  {
    id: "RES-002",
    unitCode: "B-102",
    clientName: "Ahmed Hassan",
    agentName: "Lisa Chen",
    startTime: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    expiryTime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    status: "expiring",
  },
]

export function LiveReservationManager() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())

      // Update reservation statuses
      setReservations((prev) =>
        prev.map((res) => {
          const timeLeft = res.expiryTime.getTime() - Date.now()
          if (timeLeft <= 0) {
            return { ...res, status: "expired" }
          } else if (timeLeft <= 5 * 60 * 1000) {
            // 5 minutes
            return { ...res, status: "expiring" }
          }
          return { ...res, status: "active" }
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeRemaining = (expiryTime: Date) => {
    const timeLeft = expiryTime.getTime() - currentTime.getTime()
    if (timeLeft <= 0) return "Expired"

    const minutes = Math.floor(timeLeft / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = (startTime: Date, expiryTime: Date) => {
    const totalTime = expiryTime.getTime() - startTime.getTime()
    const elapsed = currentTime.getTime() - startTime.getTime()
    return Math.min(100, Math.max(0, (elapsed / totalTime) * 100))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleExtendReservation = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId
          ? { ...res, expiryTime: new Date(Date.now() + 30 * 60 * 1000), status: "active" }
          : res,
      ),
    )
  }

  const handleReleaseReservation = (reservationId: string) => {
    setReservations((prev) => prev.filter((res) => res.id !== reservationId))
  }

  const activeReservations = reservations.filter((res) => res.status !== "expired")
  const expiringReservations = reservations.filter((res) => res.status === "expiring")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Live Reservations ({activeReservations.length})
        </CardTitle>
        <CardDescription>Active unit reservations with real-time countdown</CardDescription>
      </CardHeader>
      <CardContent>
        {expiringReservations.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">{expiringReservations.length} reservation(s) expiring soon</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {activeReservations.map((reservation) => (
            <div key={reservation.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Unit {reservation.unitCode}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {reservation.clientName}
                    </div>
                    <div>Agent: {reservation.agentName}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(reservation.status)}>
                  {reservation.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {reservation.status === "expiring" && <Clock className="h-3 w-3 mr-1" />}
                  {reservation.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Time Remaining</span>
                    <span
                      className={`font-mono font-medium ${
                        reservation.status === "expiring" ? "text-yellow-600" : "text-foreground"
                      }`}
                    >
                      {getTimeRemaining(reservation.expiryTime)}
                    </span>
                  </div>
                  <Progress
                    value={getProgressPercentage(reservation.startTime, reservation.expiryTime)}
                    className="h-2"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExtendReservation(reservation.id)}>
                    <Timer className="h-4 w-4 mr-2" />
                    Extend (+30min)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleReleaseReservation(reservation.id)}>
                    <X className="h-4 w-4 mr-2" />
                    Release
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeReservations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Timer className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active reservations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
