import { NextRequest, NextResponse } from 'next/server'
import { listProducts, getProduct, getProductBySlug } from '@/lib/wc'
import { transformWCProduct, transformWCProducts } from '@/lib/wc-adapter'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')
    
    const cacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    }

    if (id) {
      const wcProduct = await getProduct(id)
      const product = transformWCProduct(wcProduct)
      return NextResponse.json(product, { headers: cacheHeaders })
    }

    if (slug) {
      const wcProduct = await getProductBySlug(slug)
      
      if (!wcProduct) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      
      const product = transformWCProduct(wcProduct)
      return NextResponse.json(product, { headers: cacheHeaders })
    }

    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '20')
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined

    const wcResponse = await listProducts({
      page,
      per_page,
      category,
      search,
    })

    const products = transformWCProducts(wcResponse.data)

    return NextResponse.json({
      products,
      total: wcResponse.total,
      totalPages: wcResponse.totalPages,
      currentPage: page,
      perPage: per_page,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
