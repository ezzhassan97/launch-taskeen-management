"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, Phone, Mail, MessageSquare, MapPin, Clock, FileText, Users } from "lucide-react"

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Click on 'Book a Slot' in the navigation menu, select an available time slot, fill in your details, and confirm your booking. You'll receive a confirmation email immediately.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Yes, you can reschedule your appointment up to 24 hours before the scheduled time. Go to 'My Booking' and click the 'Reschedule' button to select a new time.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Please bring a valid ID, any relevant financial documents, and come prepared with questions about the units you're interested in. Having your unit preferences ready will help make the meeting more productive.",
  },
  {
    question: "How do I set my unit preferences?",
    answer:
      "Visit the 'Preferences' page to browse available units and rank up to 5 units in order of preference. This helps your agent prepare for your meeting and focus on units that interest you most.",
  },
  {
    question: "What if I need to cancel my appointment?",
    answer:
      "You can cancel your appointment up to 24 hours in advance without any penalty. Go to 'My Booking' and click the 'Cancel' button. You can always book a new appointment later.",
  },
  {
    question: "Can I have a virtual meeting instead of in-person?",
    answer:
      "Yes, most agents offer both in-person and virtual meeting options. You can select your preferred meeting mode when booking your appointment.",
  },
]

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions or get in touch with our support team</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Call Support</h3>
            <p className="text-sm text-muted-foreground mb-3">Speak with our support team</p>
            <Button variant="outline" size="sm">
              +1 (555) 123-HELP
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">Send us your questions</p>
            <Button variant="outline" size="sm">
              support@taskeen.com
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">Chat with us in real-time</p>
            <Button variant="outline" size="sm">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find quick answers to the most common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Can't find what you're looking for? Send us a message and we'll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input placeholder="What can we help you with?" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea placeholder="Please describe your question or issue in detail..." rows={5} />
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>

      {/* Office Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Visit Our Office
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Marina Heights Sales Office</h4>
                <p className="text-sm text-muted-foreground">
                  123 Harbor View Drive
                  <br />
                  Marina District, City 12345
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Sat-Sun: 10:00 AM - 4:00 PM</span>
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Helpful Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Booking Guide (PDF)
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Meet Our Agents
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Property Floor Plans
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Video Tutorials
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
