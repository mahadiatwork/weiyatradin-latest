// Airwallex authentication API route
// Referenced from: Airwallex integration blueprint

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const AIRWALLEX_API_URL = process.env.AIRWALLEX_ENV === 'prod' 
  ? 'https://api.airwallex.com' 
  : 'https://api-demo.airwallex.com'

export async function POST() {
  try {
    const clientId = process.env.AIRWALLEX_CLIENT_ID
    const apiKey = process.env.AIRWALLEX_API_KEY

    if (!clientId || !apiKey) {
      return NextResponse.json(
        { error: 'Airwallex credentials not configured' },
        { status: 500 }
      )
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
      const errorData = await response.json().catch(() => ({ error: 'Authentication failed' }))
      console.error('Airwallex auth failed:', response.status, errorData)
      return NextResponse.json(
        { error: 'Failed to authenticate with Airwallex' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ token: data.token, expires_at: data.expires_at })
  } catch (error) {
    console.error('Airwallex authentication error:', error)
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    )
  }
}
