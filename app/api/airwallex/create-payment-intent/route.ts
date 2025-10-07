// Airwallex PaymentIntent creation API route
// Referenced from: Airwallex integration blueprint

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const AIRWALLEX_API_URL = process.env.AIRWALLEX_ENV === 'prod' 
  ? 'https://api.airwallex.com' 
  : 'https://api-demo.airwallex.com'

async function getAuthToken() {
  const clientId = process.env.AIRWALLEX_CLIENT_ID
  const apiKey = process.env.AIRWALLEX_API_KEY

  if (!clientId || !apiKey) {
    throw new Error('Airwallex credentials not configured. Please set AIRWALLEX_CLIENT_ID and AIRWALLEX_API_KEY')
  }

  const response = await fetch(`${AIRWALLEX_API_URL}/api/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': clientId,
      'x-api-key': apiKey,
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
    console.error('Airwallex authentication failed:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      url: AIRWALLEX_API_URL
    })
    throw new Error(`Failed to authenticate with Airwallex: ${response.status} ${errorData.message || response.statusText}`)
  }

  const data = await response.json()
  return data.token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'USD', orderId, customerEmail } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Get authentication token
    const token = await getAuthToken()

    // Create PaymentIntent
    const response = await fetch(`${AIRWALLEX_API_URL}/api/v1/pa/payment_intents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        request_id: `req-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        amount: Number(amount.toFixed(2)),
        currency: currency.toUpperCase(),
        merchant_order_id: orderId || `order-${Date.now()}`,
        metadata: {
          customer_email: customerEmail,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Payment intent creation failed' }))
      console.error('Airwallex PaymentIntent creation failed:', response.status, errorData)
      return NextResponse.json(
        { error: 'Failed to create payment intent' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json({
      intentId: data.id,
      clientSecret: data.client_secret,
      amount: data.amount,
      currency: data.currency,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
