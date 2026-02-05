import { NextRequest, NextResponse } from 'next/server';

const HQ_URL = 'http://localhost:3004';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Proxy the request to the internal HQ API which has DB access
    const response = await fetch(`${HQ_URL}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('HQ API failed to process subscription');
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Web Subscribe Error:', error);
    return NextResponse.json({ error: 'Failed to join the pulse' }, { status: 500 });
  }
}
