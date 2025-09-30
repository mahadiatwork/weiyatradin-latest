import { NextRequest, NextResponse } from 'next/server'
import { listCategories } from '@/lib/wc'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '50')
    const parent = searchParams.get('parent') ? parseInt(searchParams.get('parent')!) : undefined

    const categories = await listCategories({
      page,
      per_page,
      parent,
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Categories API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
