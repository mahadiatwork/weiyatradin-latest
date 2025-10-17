import { NextRequest, NextResponse } from 'next/server'
import { listCategories, listProducts } from '@/lib/wc'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '50')
    const parent = searchParams.get('parent') ? parseInt(searchParams.get('parent')!) : undefined
    const enrich = searchParams.get('enrich') === 'true'

    const categories = await listCategories({
      page,
      per_page,
      parent,
      hide_empty: false,
    })

    if (!enrich) {
      return NextResponse.json(categories)
    }

    // Enrich categories with accurate product counts
    const enrichedCategories = await Promise.all(
      categories.map(async (category) => {
        try {
          const productsResult = await listProducts({
            category: category.id,
            per_page: 1,
          })
          return {
            ...category,
            count: productsResult.total,
          }
        } catch (error) {
          console.error(`Error fetching count for category ${category.id}:`, error)
          return {
            ...category,
            count: 0,
          }
        }
      })
    )

    // Filter categories:
    // - Show categories with products AND images
    // - Show categories with 5+ products even without images
    // - Hide "Uncategorized" category
    const filteredCategories = enrichedCategories.filter(
      (cat) => 
        cat.count > 0 && 
        cat.slug !== 'uncategorized' &&
        (cat.image !== null || cat.count >= 5)
    )

    return NextResponse.json(filteredCategories)
  } catch (error) {
    console.error('Categories API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
