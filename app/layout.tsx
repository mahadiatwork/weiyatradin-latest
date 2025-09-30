import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { RFQProvider } from "@/components/rfq-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "WeiyaTrading - Wholesale & Bulk Orders",
  description:
    "Your trusted partner for bulk sourcing and wholesale orders. Quality products, competitive prices, global shipping.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <RFQProvider>{children}</RFQProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
