"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Link, Copy, QrCode, Settings, Eye, Share, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockLinkData = {
  publicUrl: "https://taskeen.app/book/maria-rodriguez",
  isActive: true,
  totalBookings: 156,
  thisWeekBookings: 12,
  conversionRate: 68,
  settings: {
    requirePhone: true,
    requireEOI: false,
    minPreferences: 3,
    allowReschedule: true,
    rescheduleWindow: 24,
  },
}

export default function BookingLinkPage() {
  const [linkSettings, setLinkSettings] = useState(mockLinkData.settings)
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Booking link has been copied to your clipboard.",
    })
  }

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "QR code has been generated and is ready to download.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Booking Link</h1>
          <p className="text-muted-foreground mt-1">Share your personalized booking link with clients</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={mockLinkData.isActive ? "default" : "secondary"}>
            {mockLinkData.isActive ? "Active" : "Inactive"}
          </Badge>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Link Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLinkData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLinkData.thisWeekBookings}</div>
            <p className="text-xs text-muted-foreground">New bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLinkData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Visits to bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Public Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Your Public Booking Link
          </CardTitle>
          <CardDescription>Share this link with clients to allow them to book appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input value={mockLinkData.publicUrl} readOnly className="flex-1" />
            <Button variant="outline" onClick={() => copyToClipboard(mockLinkData.publicUrl)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={generateQRCode}>
              <QrCode className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Share via WhatsApp
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Share via Email
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Share via SMS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Form Requirements
            </CardTitle>
            <CardDescription>Configure what information clients must provide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Phone Number</label>
                <p className="text-xs text-muted-foreground">Clients must provide phone number</p>
              </div>
              <Switch
                checked={linkSettings.requirePhone}
                onCheckedChange={(checked) => setLinkSettings((prev) => ({ ...prev, requirePhone: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require EOI Reference</label>
                <p className="text-xs text-muted-foreground">Link booking to existing EOI</p>
              </div>
              <Switch
                checked={linkSettings.requireEOI}
                onCheckedChange={(checked) => setLinkSettings((prev) => ({ ...prev, requireEOI: checked }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Preferences Required</label>
              <Input
                type="number"
                value={linkSettings.minPreferences}
                onChange={(e) =>
                  setLinkSettings((prev) => ({ ...prev, minPreferences: Number.parseInt(e.target.value) }))
                }
                min="1"
                max="10"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Clients must rank at least this many units before booking
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Booking Policies
            </CardTitle>
            <CardDescription>Set reschedule and cancellation rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Allow Rescheduling</label>
                <p className="text-xs text-muted-foreground">Clients can reschedule appointments</p>
              </div>
              <Switch
                checked={linkSettings.allowReschedule}
                onCheckedChange={(checked) => setLinkSettings((prev) => ({ ...prev, allowReschedule: checked }))}
              />
            </div>

            {linkSettings.allowReschedule && (
              <div>
                <label className="text-sm font-medium mb-2 block">Reschedule Window (hours)</label>
                <Input
                  type="number"
                  value={linkSettings.rescheduleWindow}
                  onChange={(e) =>
                    setLinkSettings((prev) => ({ ...prev, rescheduleWindow: Number.parseInt(e.target.value) }))
                  }
                  min="1"
                  max="168"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How many hours before appointment can clients reschedule
                </p>
              </div>
            )}

            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Form Preview</CardTitle>
          <CardDescription>This is how your booking form will appear to clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <h3 className="text-lg font-semibold mb-4">Book with Maria Rodriguez</h3>
            <div className="space-y-3 text-sm">
              <div>📅 30-minute slots available</div>
              <div>📍 In-person or virtual meetings</div>
              <div>📞 Phone number required</div>
              {linkSettings.requireEOI && <div>🏠 EOI reference required</div>}
              <div>❤️ Minimum {linkSettings.minPreferences} unit preferences required</div>
              {linkSettings.allowReschedule && (
                <div>🔄 Can reschedule up to {linkSettings.rescheduleWindow} hours before</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
