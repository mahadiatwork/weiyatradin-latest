"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PriceToggle } from "@/components/price-toggle"
import { MOQHint } from "@/components/moq-hint"
import { useCart } from "@/lib/cart"
import { formatCurrency, calculatePrice } from "@/lib/price"

export default function CartPage() {
  const { items, updateQuantity, updatePriceMode, removeItem, clearCart } = useCart()

  const cartTotals = items.reduce(
    (acc, item) => {
      const pricing = calculatePrice(item.product, item.quantity, item.priceMode)
      acc.subtotal += pricing.totalPrice
      acc.savings += pricing.savings || 0
      return acc
    },
    { subtotal: 0, savings: 0 },
  )

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start browsing our catalog to find great
              deals.
            </p>
            <Button asChild size="lg">
              <Link href="/catalog">
                Browse Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-destructive hover:text-destructive bg-transparent"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const pricing = calculatePrice(item.product, item.quantity, item.priceMode)

              return (
                <Card key={item.product.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative aspect-square w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="font-semibold hover:text-primary transition-colors"
                            >
                              {item.product.title}
                            </Link>
                            {item.product.subtitle && (
                              <p className="text-sm text-muted-foreground">{item.product.subtitle}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {item.product.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                MOQ: {item.product.moq}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price Mode Toggle */}
                        <div className="max-w-xs">
                          <PriceToggle
                            value={item.priceMode}
                            onValueChange={(mode) => updatePriceMode(item.product.id, mode)}
                          />
                        </div>

                        {/* MOQ Hint */}
                        <MOQHint currentQuantity={item.quantity} moq={item.product.moq} priceMode={item.priceMode} />

                        {/* Quantity and Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {formatCurrency(pricing.unitPrice)} × {item.quantity}
                            </div>
                            <div className="font-semibold">{formatCurrency(pricing.totalPrice)}</div>
                            {pricing.savings && pricing.savings > 0 && (
                              <div className="text-sm text-green-600">Save {formatCurrency(pricing.savings)}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>{formatCurrency(cartTotals.subtotal)}</span>
                  </div>
                  {cartTotals.savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Bulk Savings</span>
                      <span>-{formatCurrency(cartTotals.savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotals.subtotal)}</span>
                </div>

                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>

                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/catalog">Continue Shopping</Link>
                </Button>

                {/* Trust Badges */}
                <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center space-x-4">
                    <span>🔒 Secure Checkout</span>
                    <span>📦 Fast Shipping</span>
                  </div>
                  <div className="text-center">
                    <span>💳 Multiple Payment Options</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
