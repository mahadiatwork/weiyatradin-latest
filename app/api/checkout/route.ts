import { NextRequest, NextResponse } from 'next/server'
import { findOrCreateCustomer, createOrder } from '@/lib/wc'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.customer?.email || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: customer.email and items are required' },
        { status: 400 }
      )
    }

    const customer = await findOrCreateCustomer({
      email: body.customer.email,
      first_name: body.customer.first_name,
      last_name: body.customer.last_name,
      billing: body.customer.billing,
      shipping: body.customer.shipping,
    })

    const order = await createOrder({
      customer_id: customer.id,
      email: customer.email,
      line_items: body.items.map((item: any) => ({
        product_id: item.product_id,
        variation_id: item.variation_id,
        quantity: item.quantity,
      })),
      billing: body.customer.billing,
      shipping: body.customer.shipping,
      payment_method: body.payment?.method,
      payment_method_title: body.payment?.title,
      set_paid: body.payment?.set_paid,
    })

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        number: order.number,
        status: order.status,
        total: order.total,
      },
    })
  } catch (error) {
    console.error('Checkout API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    )
  }
}
