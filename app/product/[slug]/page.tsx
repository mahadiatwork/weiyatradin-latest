"use client"

import { useState, useMemo, useEffect } from "react"
import { notFound } from "next/navigation"
import { Star, Package, Clock, MapPin, Shield, FileText, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MediaGallery } from "@/components/media-gallery"
import { PriceToggle } from "@/components/price-toggle"
import { QuantityStepper } from "@/components/quantity-stepper"
import { BulkBadge } from "@/components/bulk-badge"
import { MOQHint } from "@/components/moq-hint"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
import { formatCurrency, calculatePrice } from "@/lib/price"
import { useRFQ } from "@/hooks/use-rfq"
import { useCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { openRFQ } = useRFQ()
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [priceMode, setPriceMode] = useState<"single" | "bulk">("single")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        
        const productResponse = await fetch(`/api/products?slug=${params.slug}`)
        
        if (!productResponse.ok) {
          if (productResponse.status === 404) {
            console.error('Product not found:', params.slug)
          } else if (productResponse.status === 401 || productResponse.status === 403) {
            console.error('Authentication error - check WooCommerce credentials')
          } else {
            console.error('Failed to fetch product')
          }
          setIsLoading(false)
          return
        }
        
        const product = await productResponse.json()
        setProduct(product)
        
        if (product.categoryId) {
          const recommendedResponse = await fetch(`/api/products?per_page=20&category=${product.categoryId}`)
          if (recommendedResponse.ok) {
            const products = await recommendedResponse.json()
            const recommended = products
              .filter((p: Product) => p.id !== product.id)
              .slice(0, 4)
            setRecommendedProducts(recommended)
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  const pricing = useMemo(() => {
    if (!product) return { unitPrice: 0, totalPrice: 0, savings: null, tier: null }
    return calculatePrice(product, quantity, priceMode)
  }, [product, quantity, priceMode])

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, quantity, priceMode)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.title} added to your cart.`,
    })
  }

  const handleRequestQuote = () => {
    if (!product) return
    openRFQ(product.id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Product not found</h3>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.location.href = '/catalog'}>Browse Products</Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <MediaGallery images={product.images} media={product.media} title={product.title} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <BulkBadge moq={product.moq} />
              </div>
              <h1 className="text-3xl font-bold text-balance">{product.title}</h1>
              {product.subtitle && <p className="text-lg text-muted-foreground text-pretty">{product.subtitle}</p>}
            </div>

            {/* Rating and Shipping Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span>(124 reviews)</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Ships from {product.shipsFrom}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{product.leadTimeDays} days lead time</span>
              </div>
            </div>

            <Separator />

            {/* Pricing Section */}
            <div className="space-y-4">
              <PriceToggle value={priceMode} onValueChange={setPriceMode} />

              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Unit Price:</span>
                  <span className="text-2xl font-bold">{formatCurrency(pricing.unitPrice)}</span>
                </div>

                {priceMode === "bulk" && pricing.savings && (
                  <div className="flex items-baseline justify-between text-green-600">
                    <span className="text-sm">You save:</span>
                    <span className="font-semibold">{formatCurrency(pricing.savings)}</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between border-t pt-3">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-xl font-bold">{formatCurrency(pricing.totalPrice)}</span>
                </div>
              </div>

              {/* Bulk Pricing Tiers */}
              {product.bulkTiers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Bulk Pricing Tiers</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {product.bulkTiers.map((tier, index) => (
                      <div key={index} className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>{tier.minQty}+ units</span>
                        <span className="font-medium">{formatCurrency(tier.unitPrice)}/unit</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={10000} />
              </div>

              <MOQHint currentQuantity={quantity} moq={product.moq} priceMode={priceMode} />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={handleRequestQuote} className="flex-1 bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Quote
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>Secure Packaging</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>On-time Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Category</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Minimum Order</span>
                      <span>{product.moq} units</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Lead Time</span>
                      <span>{product.leadTimeDays} days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Origin</span>
                      <span>{product.shipsFrom}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Tags</span>
                      <div className="flex flex-wrap gap-1">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Available Incoterms</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• EXW (Ex Works) - Factory pickup</li>
                      <li>• FOB (Free on Board) - Port of origin</li>
                      <li>• CIF (Cost, Insurance & Freight) - Port of destination</li>
                      <li>• DDP (Delivered Duty Paid) - Door to door</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shipping Notes</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Lead time: {product.leadTimeDays} business days</li>
                      <li>• Bulk orders may qualify for expedited shipping</li>
                      <li>• Custom packaging available for large orders</li>
                      <li>• Tracking provided for all shipments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Certifications & Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Standard Certifications</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• CE Marking (European Conformity)</li>
                      <li>• FCC Certification (US)</li>
                      <li>• RoHS Compliance</li>
                      <li>• ISO 9001 Quality Management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Additional Certifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Additional certifications may be available upon request for bulk orders. Contact us for specific
                      requirements.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
