"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart"
import { formatCurrency, calculatePrice } from "@/lib/price"
import { incoterms } from "@/lib/mock"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [incoterm, setIncoterm] = useState("FOB")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const cartTotals = items.reduce(
    (acc, item) => {
      const pricing = calculatePrice(item.product, item.quantity, item.priceMode)
      acc.subtotal += pricing.totalPrice
      acc.savings += pricing.savings || 0
      return acc
    },
    { subtotal: 0, savings: 0 },
  )

  const estimatedShipping = 150 // Placeholder
  const estimatedTax = cartTotals.subtotal * 0.08 // 8% tax placeholder
  const total = cartTotals.subtotal + estimatedShipping + estimatedTax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shipping-firstName">First Name *</Label>
                      <Input
                        id="shipping-firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-lastName">Last Name *</Label>
                      <Input
                        id="shipping-lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shipping-company">Company Name *</Label>
                    <Input
                      id="shipping-company"
                      value={shippingInfo.company}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, company: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shipping-email">Email *</Label>
                      <Input
                        id="shipping-email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-phone">Phone *</Label>
                      <Input
                        id="shipping-phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shipping-address">Address *</Label>
                    <Input
                      id="shipping-address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shipping-city">City *</Label>
                      <Input
                        id="shipping-city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-state">State/Province</Label>
                      <Input
                        id="shipping-state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="shipping-zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shipping-country">Country *</Label>
                    <Select
                      value={shippingInfo.country}
                      onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="same-as-shipping"
                      checked={sameAsShipping}
                      onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                    />
                    <Label htmlFor="same-as-shipping">Same as shipping address</Label>
                  </div>

                  {!sameAsShipping && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing-firstName">First Name *</Label>
                          <Input
                            id="billing-firstName"
                            value={billingInfo.firstName}
                            onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                            required={!sameAsShipping}
                          />
                        </div>
                        <div>
                          <Label htmlFor="billing-lastName">Last Name *</Label>
                          <Input
                            id="billing-lastName"
                            value={billingInfo.lastName}
                            onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                            required={!sameAsShipping}
                          />
                        </div>
                      </div>
                      {/* Additional billing fields would go here */}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Shipping Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="incoterm">Incoterms *</Label>
                    <Select value={incoterm} onValueChange={setIncoterm}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {incoterms.map((term) => (
                          <SelectItem key={term.value} value={term.value}>
                            {term.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="special-instructions">Special Instructions</Label>
                    <Textarea
                      id="special-instructions"
                      placeholder="Any special handling or delivery instructions..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer">Bank Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="letter-of-credit" id="letter-of-credit" />
                      <Label htmlFor="letter-of-credit">Letter of Credit</Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Payment details will be collected after order confirmation. For bulk orders, we offer flexible
                      payment terms including NET 30 for qualified businesses.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => {
                      const pricing = calculatePrice(item.product, item.quantity, item.priceMode)
                      return (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <div className="font-medium line-clamp-1">{item.product.title}</div>
                            <div className="text-muted-foreground">
                              {item.quantity} × {formatCurrency(pricing.unitPrice)} ({item.priceMode})
                            </div>
                          </div>
                          <div className="font-medium">{formatCurrency(pricing.totalPrice)}</div>
                        </div>
                      )
                    })}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(cartTotals.subtotal)}</span>
                    </div>
                    {cartTotals.savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Bulk Savings</span>
                        <span>-{formatCurrency(cartTotals.savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping (est.)</span>
                      <span>{formatCurrency(estimatedShipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (est.)</span>
                      <span>{formatCurrency(estimatedTax)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure SSL Encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
