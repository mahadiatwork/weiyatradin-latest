"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, FileText, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart"
import { useRFQ } from "@/hooks/use-rfq"
import { categories, currencies } from "@/lib/mock"
import { useState } from "react"

export function Header() {
  const { getTotalItems } = useCart()
  const { openRFQ } = useRFQ()
  const totalItems = getTotalItems()
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <Image
                src="/favicon.png"
                alt="WeiyaTrading"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold">weiyatrading</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link href={`/catalog?category=${encodeURIComponent(category.toLowerCase())}`}>{category}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/catalog" className="text-sm font-medium hover:text-primary">
              All Products
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{selectedCurrency.code}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currencies.map((currency) => (
                  <DropdownMenuItem key={currency.code} onClick={() => setSelectedCurrency(currency)}>
                    {currency.code} - {currency.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* RFQ Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openRFQ()}
              className="hidden sm:flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Request Quote</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link href="/cart" className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
