import type { Product, PriceTier } from "./types"

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getBulkTierForQuantity(product: Product, quantity: number): PriceTier | null {
  if (quantity < product.moq) return null

  // Find the highest tier that the quantity qualifies for
  const applicableTiers = product.bulkTiers
    .filter((tier) => quantity >= tier.minQty)
    .sort((a, b) => b.minQty - a.minQty)

  return applicableTiers[0] || null
}

export function calculatePrice(
  product: Product,
  quantity: number,
  mode: "single" | "bulk",
): {
  unitPrice: number
  totalPrice: number
  savings?: number
} {
  if (mode === "single") {
    const unitPrice = product.singlePrice
    const totalPrice = unitPrice * quantity
    return { unitPrice, totalPrice }
  }

  const bulkTier = getBulkTierForQuantity(product, quantity)
  if (!bulkTier) {
    // Fallback to single price if no bulk tier applies
    const unitPrice = product.singlePrice
    const totalPrice = unitPrice * quantity
    return { unitPrice, totalPrice }
  }

  const unitPrice = bulkTier.unitPrice
  const totalPrice = unitPrice * quantity
  const singleTotal = product.singlePrice * quantity
  const savings = singleTotal - totalPrice

  return { unitPrice, totalPrice, savings }
}

export function getOptimalPriceMode(product: Product, quantity: number): "single" | "bulk" {
  if (quantity >= product.moq) {
    const bulkTier = getBulkTierForQuantity(product, quantity)
    if (bulkTier && bulkTier.unitPrice < product.singlePrice) {
      return "bulk"
    }
  }
  return "single"
}
