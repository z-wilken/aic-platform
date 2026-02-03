import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  
  const { email, score, tier, answers } = body;

  if (!email || !score || !tier || !answers) {
    return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      'INSERT INTO assessments (email, score, tier, answers) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, score, tier, answers]
    );

    const newId = result.rows[0].id;

    console.log('🚀 [AIC-API] Assessment Received and Stored:', {
      id: newId,
      email: body.email,
      score: body.score,
      tier: body.tier,
    });
    
    return NextResponse.json({ 
      success: true, 
      id: newId,
      message: 'Assessment archived securely.' 
    });
  } catch (error) {
    console.error('Error inserting assessment into database:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
