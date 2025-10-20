import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-40 w-80">
                <Image
                  src="/weiya-logo.png"
                  alt="WeiyaTrading - Your China Sourcing Partner"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for bulk sourcing and wholesale orders. Quality products, competitive prices, global
              shipping.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>lizhenhua991121@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+86 15138088555</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>No. 1096 Yuxi Road, Jiaozuo Science and Technology Headquarters New City (East District), Building 1, Room 201, Jiaozuo Demonstration Zone, Henan Province</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=gadgets" className="hover:text-primary">
                  Gadgets
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=hats-caps" className="hover:text-primary">
                  Hats and Caps
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=medical-devices" className="hover:text-primary">
                  Medical Devices
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
