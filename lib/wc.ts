export interface WCProduct {
  id: number
  name: string
  slug: string
  permalink: string
  price: string
  regular_price: string
  sale_price: string
  description: string
  short_description: string
  images: Array<{
    id: number
    src: string
    name: string
    alt: string
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  stock_status: string
  stock_quantity: number | null
  meta_data: Array<{
    key: string
    value: any
  }>
}

export interface WCCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  image: {
    id: number
    src: string
    name: string
    alt: string
  } | null
  count: number
}

export interface WCCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  billing: any
  shipping: any
}

export interface WCOrder {
  id: number
  status: string
  number: string
  total: string
  line_items: any[]
  billing: any
  shipping: any
}

const WC_BASE_URL = process.env.WC_BASE_URL || ''
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || ''
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || ''

function buildAuthHeader(): string {
  const credentials = `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`
  return `Basic ${Buffer.from(credentials).toString('base64')}`
}

export interface WCResponse<T> {
  data: T
  total: number
  totalPages: number
}

export async function wcFetch(
  path: string,
  init?: RequestInit,
  search?: Record<string, string | number | boolean>
): Promise<any> {
  if (!WC_BASE_URL) {
    throw new Error('WC_BASE_URL environment variable is not configured. Please set it in your deployment environment.')
  }
  
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    throw new Error('WooCommerce API credentials (WC_CONSUMER_KEY and WC_CONSUMER_SECRET) are not configured. Please set them in your deployment environment.')
  }

  if (!WC_BASE_URL.startsWith('http://') && !WC_BASE_URL.startsWith('https://')) {
    throw new Error(`WC_BASE_URL must start with http:// or https://. Current value: ${WC_BASE_URL}`)
  }
  
  let url: URL
  try {
    url = new URL(`${WC_BASE_URL}/wp-json/wc/v3${path}`)
  } catch (error) {
    throw new Error(`Invalid WC_BASE_URL format: ${WC_BASE_URL}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
  
  if (search) {
    Object.entries(search).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  const headers: HeadersInit = {
    'Authorization': buildAuthHeader(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...init?.headers,
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WooCommerce API Error (${response.status}): ${errorText}`)
  }

  return response.json()
}

export async function wcFetchWithMeta(
  path: string,
  init?: RequestInit,
  search?: Record<string, string | number | boolean>
): Promise<{ data: any; total: number; totalPages: number }> {
  if (!WC_BASE_URL) {
    throw new Error('WC_BASE_URL environment variable is not configured.')
  }
  
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    throw new Error('WooCommerce API credentials are not configured.')
  }

  if (!WC_BASE_URL.startsWith('http://') && !WC_BASE_URL.startsWith('https://')) {
    throw new Error(`WC_BASE_URL must start with http:// or https://`)
  }
  
  let url: URL
  try {
    url = new URL(`${WC_BASE_URL}/wp-json/wc/v3${path}`)
  } catch (error) {
    throw new Error(`Invalid WC_BASE_URL format: ${WC_BASE_URL}`)
  }
  
  if (search) {
    Object.entries(search).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  const headers: HeadersInit = {
    'Authorization': buildAuthHeader(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...init?.headers,
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WooCommerce API Error (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const total = parseInt(response.headers.get('X-WP-Total') || '0', 10)
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10)

  return { data, total, totalPages }
}

export async function listProducts(params?: {
  page?: number
  per_page?: number
  category?: number | string
  search?: string
}): Promise<WCResponse<WCProduct[]>> {
  const searchParams: Record<string, string | number> = {
    page: params?.page || 1,
    per_page: params?.per_page || 20,
    status: 'publish',
    _fields: 'id,name,slug,permalink,price,regular_price,sale_price,images,short_description,categories,stock_status,stock_quantity,meta_data',
  }

  if (params?.category) {
    searchParams.category = params.category
  }

  if (params?.search) {
    searchParams.search = params.search
  }

  const result = await wcFetchWithMeta('/products', {}, searchParams)
  return {
    data: result.data,
    total: result.total,
    totalPages: result.totalPages,
  }
}

export async function getProduct(id: number | string): Promise<WCProduct> {
  return wcFetch(`/products/${id}`)
}

export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const products = await wcFetch('/products', {}, { slug })
  return products && products.length > 0 ? products[0] : null
}

export async function listCategories(params?: {
  page?: number
  per_page?: number
  parent?: number
  hide_empty?: boolean
}): Promise<WCCategory[]> {
  const searchParams: Record<string, string | number> = {
    page: params?.page || 1,
    per_page: params?.per_page || 50,
    hide_empty: params?.hide_empty !== undefined ? (params.hide_empty ? 1 : 0) : 0,
    _fields: 'id,name,slug,parent,description,image,count',
  }

  if (params?.parent !== undefined) {
    searchParams.parent = params.parent
  }

  return wcFetch('/products/categories', {}, searchParams)
}

export async function findOrCreateCustomer(data: {
  email: string
  first_name?: string
  last_name?: string
  billing?: any
  shipping?: any
}): Promise<WCCustomer> {
  const existing = await wcFetch('/customers', {}, { email: data.email, _fields: 'id,email,first_name,last_name' })
  
  if (existing && existing.length > 0) {
    return existing[0]
  }

  return wcFetch('/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function createOrder(data: {
  customer_id?: number
  email?: string
  line_items: Array<{
    product_id: number
    variation_id?: number
    quantity: number
  }>
  billing?: any
  shipping?: any
  payment_method?: string
  payment_method_title?: string
  set_paid?: boolean
}): Promise<WCOrder> {
  const orderData = {
    ...data,
    payment_method: data.payment_method || 'bacs',
    payment_method_title: data.payment_method_title || 'Bank Transfer',
    set_paid: data.set_paid || false,
  }

  return wcFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })
}
