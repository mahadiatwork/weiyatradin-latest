import Link from "next/link"
import { CheckCircle, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CheckoutSuccessPage() {
  const orderNumber = "BO-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We've received your request and will process it shortly.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-blue-600 font-medium">Processing</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 border rounded-lg">
                <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium mb-1">Email Confirmation</h3>
                <p className="text-muted-foreground">You'll receive an order confirmation email within 5 minutes.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium mb-1">Order Processing</h3>
                <p className="text-muted-foreground">We'll review and confirm your order within 24 hours.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Download className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium mb-1">Production & Shipping</h3>
                <p className="text-muted-foreground">
                  Your order will be produced and shipped according to lead times.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/catalog">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Questions about your order? Contact us at{" "}
              <a href="mailto:orders@bulksource.com" className="text-primary hover:underline">
                orders@bulksource.com
              </a>{" "}
              or call{" "}
              <a href="tel:+15551234567" className="text-primary hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
