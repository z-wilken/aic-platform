import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  
  const { email, score, tier, answers } = body;

  if (!email || !score || !tier || !answers) {
    return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
  }

  try {
    // 1. Insert into assessments table
    const assessmentResult = await query(
      'INSERT INTO assessments (email, score, tier, answers) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, score, tier, answers]
    );

    // 2. Insert or Update leads table
    await query(
      `INSERT INTO leads (email, score, source, status) 
       VALUES ($1, $2, 'QUIZ', 'NEW') 
       ON CONFLICT (email) DO UPDATE 
       SET score = EXCLUDED.score, status = 'RE-ENGAGED'`,
      [email, score]
    );

    const newId = assessmentResult.rows[0].id;

    console.log('🚀 [AIC-API] Assessment Received and Stored:', {
      id: newId,
      email: body.email,
      score: body.score,
      tier: body.tier,
    });
    
    return NextResponse.json({ 
      success: true, 
      id: newId,
      message: 'Assessment archived securely and lead recorded.' 
    });
  } catch (error) {
    console.error('Error processing assessment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
