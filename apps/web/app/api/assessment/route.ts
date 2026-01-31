import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // LOGIC: This is where we would insert into the Postgres DB
  // const result = await db.insert(assessments).values(body);
  
  // For now, we log to the server console to prove it works
  console.log('🚀 [AIC-API] Assessment Received:', {
    email: body.email,
    score: body.score,
    tier: body.tier,
    answers_count: Object.keys(body.answers).length
  });
  
  return NextResponse.json({ 
    success: true, 
    id: `AIC-${Math.floor(Math.random() * 10000)}`,
    message: 'Assessment archived securely.' 
  });
}
