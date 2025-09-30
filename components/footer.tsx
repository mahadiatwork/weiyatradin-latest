import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary" />
              <span className="text-xl font-bold">WeiyaTrading</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for bulk sourcing and wholesale orders. Quality products, competitive prices, global
              shipping.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>sales@bulksource.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Shenzhen, China</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=electronics" className="hover:text-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=accessories" className="hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=home" className="hover:text-primary">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-primary">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rfq" className="hover:text-primary">
                  Request for Quote
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Custom Manufacturing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Quality Inspection
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Logistics Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 WeiyaTrading. All rights reserved. | ICP Registration: 粤ICP备12345678号
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Incoterms: EXW, FOB, CIF, DDP Supported</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
