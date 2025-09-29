import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team for any questions about products, orders, or partnerships. We're here to help
              your business succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">sales@bulksource.com</p>
                      <p className="text-muted-foreground">support@bulksource.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+86 755 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        BulkSource International
                        <br />
                        Room 1501, Building A
                        <br />
                        Shenzhen Bay Science Park
                        <br />
                        Shenzhen, Guangdong 518000
                        <br />
                        China
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM (EST)
                        <br />
                        Saturday: 10:00 AM - 4:00 PM (EST)
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Offices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">North America</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Business Ave, Suite 100
                      <br />
                      New York, NY 10001, USA
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Europe</h3>
                    <p className="text-sm text-muted-foreground">
                      45 Commerce Street
                      <br />
                      London EC1A 1BB, UK
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Asia Pacific</h3>
                    <p className="text-sm text-muted-foreground">
                      Marina Bay Financial Centre
                      <br />
                      Singapore 018989
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Request a Quote</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get competitive pricing for your bulk order requirements.
                    </p>
                    <a href="/rfq" className="text-primary hover:underline text-sm font-medium">
                      Submit RFQ →
                    </a>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Browse Products</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Explore our catalog of quality products with bulk pricing.
                    </p>
                    <a href="/catalog" className="text-primary hover:underline text-sm font-medium">
                      View Catalog →
                    </a>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Partnership Inquiries</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Interested in becoming a supplier or distribution partner?
                    </p>
                    <a
                      href="mailto:partnerships@bulksource.com"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Contact Partnerships →
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Center</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                    <p className="text-sm text-muted-foreground">
                      Find answers to common questions about ordering, shipping, and our services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Order Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your orders and get real-time updates on shipment status.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Quality Issues</h3>
                    <p className="text-sm text-muted-foreground">
                      Report quality concerns or request product inspections.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
