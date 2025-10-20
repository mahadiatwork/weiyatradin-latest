"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Shield, Truck, Users, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { TeamSection } from "@/components/team-section"
import { EventsGallery } from "@/components/events-gallery"
import { useRFQ } from "@/hooks/use-rfq"
import type { Product } from "@/lib/types"

interface Category {
  id: number
  name: string
  slug: string
  count: number
  image: {
    id: number
    src: string
    name: string
    alt: string
  } | null
}

export default function HomePage() {
  const { openRFQ } = useRFQ()
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories?enrich=true', { cache: 'no-store' }),
          fetch('/api/products?per_page=4', { cache: 'no-store' })
        ])

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData.slice(0, 6))
        } else {
          const errorData = await categoriesRes.json().catch(() => ({ error: 'Unknown error' }))
          console.error('Categories API failed:', categoriesRes.status, errorData)
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json()
          setFeaturedProducts(productsData.products || productsData)
        } else {
          const errorData = await productsRes.json().catch(() => ({ error: 'Unknown error' }))
          console.error('Products API failed:', productsRes.status, errorData)
        }
      } catch (error) {
        console.error('Error fetching home page data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background to-muted/50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="w-fit">
                    Trusted by 10,000+ Businesses
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                    Source at Scale,{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Ship Globally
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                    Your trusted partner for bulk sourcing and wholesale orders. Quality products, competitive prices,
                    and reliable global shipping.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link href="/catalog">
                      Browse Catalog
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => openRFQ()} className="text-lg px-8 bg-transparent">
                    Request Bulk Quote
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Global Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>B2B Specialists</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <Image
                    src="/modern-warehouse-with-products-and-logistics.jpg"
                    alt="WeiyaTrading warehouse and logistics"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-background border rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-background border rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold">50M+</div>
                  <div className="text-sm text-muted-foreground">Products Shipped</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple, transparent process from inquiry to delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">1. Browse & Quote</h3>
                <p className="text-muted-foreground">
                  Explore our catalog or submit an RFQ for custom requirements. Get competitive pricing instantly.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">2. Order & Confirm</h3>
                <p className="text-muted-foreground">
                  Place your order with flexible payment terms. We handle quality control and production oversight.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">3. Ship Globally</h3>
                <p className="text-muted-foreground">
                  Choose from EXW, FOB, CIF, or DDP terms. Track your shipment from factory to your door.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-lg text-muted-foreground">Discover products across our most popular categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative aspect-[4/3] bg-muted animate-pulse" />
                    <CardContent className="p-6">
                      <div className="h-10 bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))
              ) : categories.length > 0 ? (
                categories.map((category) => {
                  return (
                    <Card key={category.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {category.image?.src ? (
                          <Image
                            src={category.image.src}
                            alt={category.image.alt || `${category.name} products`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Package className="h-16 w-16" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                          <p className="text-sm opacity-90">{category.count} products</p>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <Button asChild variant="outline" className="w-full bg-transparent">
                          <Link href={`/catalog?category=${category.slug}`}>
                            Explore {category.name}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No categories available yet</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
                <p className="text-lg text-muted-foreground">Popular items with competitive bulk pricing</p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex bg-transparent">
                <Link href="/catalog">
                  View All Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                        <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-4 text-center py-12">
                  <p className="text-muted-foreground">No products available yet</p>
                </div>
              )}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/catalog">
                  View All Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust & Shipping */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose WeiyaTrading?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by businesses worldwide for reliable sourcing and logistics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  Rigorous quality control and inspection processes ensure product excellence.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold">Global Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  EXW, FOB, CIF, and DDP terms available with worldwide delivery options.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold">B2B Experts</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated account managers and bulk order specialists for your business.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold">Competitive Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Direct factory pricing with transparent bulk discounts and no hidden fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Gallery */}
        <EventsGallery />

        {/* Team Section */}
        <TeamSection />

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold">Ready to Source at Scale?</h2>
              <p className="text-lg opacity-90">
                Join thousands of businesses who trust WeiyaTrading for their wholesale and bulk order needs. Get started
                with a custom quote today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => openRFQ()}
                  className="text-lg px-8 bg-background text-foreground hover:bg-background/90"
                >
                  Request Bulk Quote
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  <Link href="/catalog">Browse Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
