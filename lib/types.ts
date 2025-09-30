export interface Media {
  type: "image" | "video"
  src: string
  alt?: string
  poster?: string
}

export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number // Exchange rate to USD
}

export interface PriceTier {
  minQty: number
  unitPrice: number
}

export interface Product {
  id: string
  slug: string
  title: string
  subtitle?: string
  description: string
  images: string[]
  media?: Media[]
  singlePrice: number
  bulkTiers: PriceTier[]
  moq: number
  category: string
  categoryId?: number
  tags: string[]
  rating?: number
  shipsFrom: "China"
  leadTimeDays: number
}

export interface CartItem {
  product: Product
  quantity: number
  priceMode: "single" | "bulk"
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  type: "card" | "digital_wallet"
}

export interface RFQFormData {
  companyName: string
  country: string
  targetQuantity: number
  incoterms: "EXW" | "FOB" | "CIF" | "DDP"
  targetUnitPrice?: number
  requiredCertifications: string
  notes: string
  productId?: string
}
