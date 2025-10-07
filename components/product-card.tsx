"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Package, FileText, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/price"
import { useRFQ } from "@/hooks/use-rfq"
import { useCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { openRFQ } = useRFQ()
  const { addItem } = useCart()
  const { toast } = useToast()
  const lowestBulkTier = product.bulkTiers[product.bulkTiers.length - 1]

  const handleAddToCart = () => {
    addItem(product, product.moq, 'bulk')
    
    toast({
      title: "Added to cart",
      description: `${product.title} (${product.moq} units) added to cart`,
    })
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            MOQ: {product.moq}
          </Badge>
        </div>
        {product.rating && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-background/90 rounded px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">{product.title}</h3>
          </Link>
          {product.subtitle && <p className="text-xs text-muted-foreground line-clamp-1">{product.subtitle}</p>}

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Package className="h-3 w-3" />
            <span>Ships from {product.shipsFrom}</span>
            <span>•</span>
            <span>{product.leadTimeDays} days</span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Single:</span>
              <span className="ml-1 font-semibold">{formatCurrency(product.singlePrice)}</span>
            </div>
            {lowestBulkTier && (
              <div className="text-right">
                <span className="text-xs text-muted-foreground">Bulk from:</span>
                <div className="font-semibold text-primary">{formatCurrency(lowestBulkTier.unitPrice)}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex-col space-y-2">
        <Button onClick={handleAddToCart} size="sm" className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <div className="flex w-full space-x-2">
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link href={`/product/${product.slug}`}>View Details</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openRFQ(product.id)}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Quote
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
