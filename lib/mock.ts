import type { Product, Currency, PaymentMethod } from "./types"

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "premium-baseball-cap-cotton",
    title: "Premium Baseball Cap - Cotton",
    subtitle: "Adjustable Unisex Sports Cap",
    description: `High-quality cotton baseball cap perfect for promotional campaigns and corporate branding. Comfortable fit with adjustable strap.

Features premium cotton construction, reinforced stitching, and customizable embroidery options for bulk orders.

• 100% premium cotton construction
• Adjustable back strap (one size fits most)
• Pre-curved visor for sun protection
• Reinforced stitching for durability
• Available in multiple colors`,
    images: [
      "/premium-baseball-cap-cotton-black.jpg",
      "/baseball-cap-side-view.jpg",
      "/cap-adjustable-strap-detail.jpg",
    ],
    singlePrice: 8.99,
    bulkTiers: [
      { minQty: 50, unitPrice: 6.5 },
      { minQty: 200, unitPrice: 5.2 },
      { minQty: 500, unitPrice: 4.8 },
    ],
    moq: 50,
    category: "Hats & Caps",
    tags: ["baseball cap", "cotton", "adjustable", "promotional"],
    rating: 4.7,
    shipsFrom: "China",
    leadTimeDays: 12,
  },
  {
    id: "2",
    slug: "wireless-power-bank-20000mah",
    title: "Wireless Power Bank 20000mAh",
    subtitle: "Fast Charging with Digital Display",
    description: `High-capacity wireless power bank with digital display and multiple charging ports. Perfect for bulk corporate orders and promotional gifts.

Features include 20000mAh capacity, 22.5W fast charging, wireless charging pad, and LED digital display showing exact battery percentage.

• 20000mAh high-capacity battery
• 22.5W super fast charging
• 15W wireless charging output
• LED digital display
• Multiple safety protections`,
    images: [
      "/wireless-power-bank-20000mah-display.jpg",
      "/power-bank-wireless-charging-phone.jpg",
      "/power-bank-multiple-ports.jpg",
    ],
    singlePrice: 24.99,
    bulkTiers: [
      { minQty: 100, unitPrice: 18.9 },
      { minQty: 300, unitPrice: 16.5 },
      { minQty: 500, unitPrice: 14.8 },
    ],
    moq: 100,
    category: "Power Banks",
    tags: ["power bank", "wireless", "fast charging", "digital display"],
    rating: 4.8,
    shipsFrom: "China",
    leadTimeDays: 14,
  },
  {
    id: "3",
    slug: "noise-cancelling-headphones-bluetooth",
    title: "Noise Cancelling Headphones",
    subtitle: "Bluetooth 5.0 with 40H Battery Life",
    description: `Professional noise-cancelling headphones with superior sound quality and long battery life. Ideal for corporate gifts and bulk orders.

Advanced ANC technology blocks up to 95% of ambient noise, while premium drivers deliver crystal-clear audio for music and calls.

• Active Noise Cancellation (ANC)
• 40-hour battery life
• Bluetooth 5.0 connectivity
• Premium leather ear cushions
• Foldable design with carrying case`,
    images: [
      "/noise-cancelling-headphones-black.jpg",
      "/headphones-wearing-comfort.jpg",
      "/headphones-folded-with-case.jpg",
    ],
    singlePrice: 45.99,
    bulkTiers: [
      { minQty: 50, unitPrice: 35.9 },
      { minQty: 150, unitPrice: 32.5 },
      { minQty: 300, unitPrice: 29.8 },
    ],
    moq: 50,
    category: "Headphones",
    tags: ["headphones", "noise cancelling", "bluetooth", "long battery"],
    rating: 4.6,
    shipsFrom: "China",
    leadTimeDays: 16,
  },
  {
    id: "4",
    slug: "digital-thermometer-infrared",
    title: "Digital Infrared Thermometer",
    subtitle: "Non-Contact Temperature Measurement",
    description: `Professional-grade infrared thermometer for accurate non-contact temperature measurement. Perfect for medical facilities and workplace safety.

Features instant readings, fever alarm, memory storage, and CE/FDA certifications for medical use.

• Non-contact infrared measurement
• ±0.2°C accuracy
• 1-second instant reading
• Fever alarm with color indicators
• CE/FDA certified for medical use`,
    images: [
      "/digital-infrared-thermometer.jpg",
      "/thermometer-measuring-temperature.jpg",
      "/thermometer-display-reading.jpg",
    ],
    singlePrice: 19.99,
    bulkTiers: [
      { minQty: 100, unitPrice: 14.9 },
      { minQty: 300, unitPrice: 12.5 },
      { minQty: 500, unitPrice: 11.2 },
    ],
    moq: 100,
    category: "Medical Items",
    tags: ["thermometer", "infrared", "medical", "non-contact"],
    rating: 4.5,
    shipsFrom: "China",
    leadTimeDays: 10,
  },
  {
    id: "5",
    slug: "laptop-backpack-waterproof",
    title: "Waterproof Laptop Backpack",
    subtitle: '15.6" Laptop Compartment with USB Port',
    description: `Durable waterproof laptop backpack with multiple compartments and built-in USB charging port. Perfect for corporate gifts and employee packages.

Features include padded laptop compartment, anti-theft design, ergonomic straps, and water-resistant materials.

• Fits up to 15.6" laptops
• Waterproof and tear-resistant material
• Built-in USB charging port
• Anti-theft hidden zipper design
• Ergonomic padded shoulder straps`,
    images: [
      "/waterproof-laptop-backpack-black.jpg",
      "/backpack-laptop-compartment.jpg",
      "/backpack-usb-charging-port.jpg",
    ],
    singlePrice: 32.99,
    bulkTiers: [
      { minQty: 50, unitPrice: 24.9 },
      { minQty: 150, unitPrice: 21.5 },
      { minQty: 300, unitPrice: 19.8 },
    ],
    moq: 50,
    category: "Bags",
    tags: ["backpack", "laptop", "waterproof", "USB charging"],
    rating: 4.7,
    shipsFrom: "China",
    leadTimeDays: 14,
  },
  {
    id: "6",
    slug: "snapback-cap-embroidered",
    title: "Snapback Cap - Embroidered",
    subtitle: "Flat Brim with Custom Logo Options",
    description: `Premium snapback cap with flat brim and custom embroidery options. Ideal for promotional campaigns and brand merchandise.

High-quality construction with structured crown, flat visor, and adjustable snapback closure for comfortable fit.

• Structured 6-panel crown
• Flat brim visor
• Adjustable snapback closure
• Custom embroidery available
• Premium wool blend material`,
    images: ["/snapback-cap-embroidered-logo.jpg", "/snapback-flat-brim-side.jpg", "/cap-snapback-closure-detail.jpg"],
    singlePrice: 12.99,
    bulkTiers: [
      { minQty: 50, unitPrice: 9.5 },
      { minQty: 200, unitPrice: 7.8 },
      { minQty: 500, unitPrice: 6.9 },
    ],
    moq: 50,
    category: "Hats & Caps",
    tags: ["snapback", "embroidered", "flat brim", "custom logo"],
    rating: 4.6,
    shipsFrom: "China",
    leadTimeDays: 15,
  },
  {
    id: "7",
    slug: "gaming-headset-rgb-lighting",
    title: "Gaming Headset with RGB Lighting",
    subtitle: "7.1 Surround Sound & Noise-Cancelling Mic",
    description: `Professional gaming headset with RGB lighting and 7.1 surround sound. Perfect for gaming cafes and bulk gaming equipment orders.

Features include crystal-clear microphone, comfortable over-ear design, and customizable RGB lighting effects.

• 7.1 virtual surround sound
• Noise-cancelling microphone
• RGB lighting with multiple effects
• Comfortable over-ear design
• Compatible with PC, PS4, Xbox`,
    images: ["/gaming-headset-rgb-lighting.jpg", "/headset-microphone-detail.jpg", "/gaming-headset-rgb-colors.jpg"],
    singlePrice: 38.99,
    bulkTiers: [
      { minQty: 50, unitPrice: 29.9 },
      { minQty: 150, unitPrice: 26.5 },
      { minQty: 300, unitPrice: 23.8 },
    ],
    moq: 50,
    category: "Headphones",
    tags: ["gaming headset", "RGB", "surround sound", "microphone"],
    rating: 4.4,
    shipsFrom: "China",
    leadTimeDays: 18,
  },
  {
    id: "8",
    slug: "travel-duffel-bag-large",
    title: "Large Travel Duffel Bag",
    subtitle: "60L Capacity with Shoe Compartment",
    description: `Spacious travel duffel bag with separate shoe compartment and multiple pockets. Perfect for corporate travel packages and promotional gifts.

Durable construction with reinforced handles, adjustable shoulder strap, and water-resistant coating.

• 60L large capacity
• Separate shoe compartment
• Water-resistant coating
• Reinforced handles and straps
• Multiple interior and exterior pockets`,
    images: ["/large-travel-duffel-bag.jpg", "/duffel-bag-shoe-compartment.jpg", "/travel-bag-multiple-pockets.jpg"],
    singlePrice: 28.99,
    bulkTiers: [
      { minQty: 50, unitPrice: 21.9 },
      { minQty: 150, unitPrice: 18.5 },
      { minQty: 300, unitPrice: 16.8 },
    ],
    moq: 50,
    category: "Bags",
    tags: ["duffel bag", "travel", "large capacity", "shoe compartment"],
    rating: 4.5,
    shipsFrom: "China",
    leadTimeDays: 16,
  },
]

export const categories = ["Hats & Caps", "Power Banks", "Headphones", "Medical Items", "Bags"]

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1.0 },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", rate: 110.0 },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", rate: 4.7 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "THB", symbol: "฿", name: "Thai Baht", rate: 36.0 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.35 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52 },
]

export const paymentMethods: PaymentMethod[] = [
  { id: "mastercard", name: "MasterCard", icon: "💳", type: "card" },
  { id: "visa", name: "Visa", icon: "💳", type: "card" },
  { id: "unionpay", name: "UnionPay", icon: "💳", type: "card" },
  { id: "alipay", name: "Alipay", icon: "📱", type: "digital_wallet" },
]

export const incoterms = [
  { value: "EXW", label: "EXW - Ex Works" },
  { value: "FOB", label: "FOB - Free on Board" },
  { value: "CIF", label: "CIF - Cost, Insurance & Freight" },
  { value: "DDP", label: "DDP - Delivered Duty Paid" },
] as const
