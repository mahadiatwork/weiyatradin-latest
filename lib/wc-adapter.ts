import type { Product, PriceTier } from './types'
import type { WCProduct } from './wc'

function buildMetaIndex(metaData: Array<{ key: string; value: any }>): Map<string, any> {
  const index = new Map<string, any>()
  metaData.forEach(item => {
    index.set(item.key, item.value)
  })
  return index
}

function parseBulkTiers(value: any): PriceTier[] {
  if (!value) return []
  
  try {
    let tiers: any[] = []
    
    if (typeof value === 'string') {
      tiers = JSON.parse(value)
    } else if (Array.isArray(value)) {
      tiers = value
    } else {
      return []
    }

    return tiers
      .map(tier => ({
        minQty: Number(tier.minQty || tier.min_qty || tier.quantity || 0),
        unitPrice: Number(tier.unitPrice || tier.unit_price || tier.price || 0),
      }))
      .filter(tier => !isNaN(tier.minQty) && !isNaN(tier.unitPrice) && tier.minQty > 0 && tier.unitPrice > 0)
      .sort((a, b) => a.minQty - b.minQty)
  } catch (error) {
    console.error('Error parsing bulk tiers:', error)
    return []
  }
}

function safeNumber(value: any, defaultValue: number = 0): number {
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}

export function transformWCProduct(wcProduct: WCProduct): Product {
  const meta = buildMetaIndex(wcProduct.meta_data || [] as any)
  
  const moq = safeNumber(meta.get('moq') || meta.get('_moq') || meta.get('minimum_order_quantity'), 1)
  const leadTimeDays = safeNumber(meta.get('lead_time_days') || meta.get('_lead_time_days') || meta.get('leadTimeDays'), 14)
  const shipsFrom = (meta.get('ships_from') || meta.get('_ships_from') || 'China') as 'China'
  const bulkTiers = parseBulkTiers(meta.get('bulk_tiers') || meta.get('_bulk_tiers') || meta.get('bulkTiers'))
  const subtitle = meta.get('subtitle') || meta.get('_subtitle') || ''
  
  const singlePrice = safeNumber(wcProduct.price || wcProduct.regular_price, 0)
  
  const images = wcProduct.images && wcProduct.images.length > 0
    ? wcProduct.images.map(img => img.src)
    : ['/placeholder.svg']
  
  const category = wcProduct.categories && wcProduct.categories.length > 0
    ? wcProduct.categories[0].name
    : 'Uncategorized'
  
  const categoryId = wcProduct.categories && wcProduct.categories.length > 0
    ? wcProduct.categories[0].id
    : undefined
  
  const tags = wcProduct.categories
    ? wcProduct.categories.slice(1).map(cat => cat.name)
    : []

  return {
    id: String(wcProduct.id),
    slug: wcProduct.slug,
    title: wcProduct.name,
    subtitle: subtitle || wcProduct.short_description || '',
    description: wcProduct.description || wcProduct.short_description || '',
    images,
    singlePrice,
    bulkTiers,
    moq,
    category,
    categoryId,
    tags,
    shipsFrom,
    leadTimeDays,
  }
}

export function transformWCProducts(wcProducts: WCProduct[]): Product[] {
  return wcProducts.map(transformWCProduct)
}
