import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/api/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Admin Login API error:', error);
    return NextResponse.json(
      { message: 'Failed to connect to server' },
      { status: 500 }
    );
  }
}
