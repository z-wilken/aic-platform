import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { isValidEmail, isValidScore, isValidTier, safeParseJSON } from '@/lib/validation';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const { allowed } = checkRateLimit(`assessment:${ip}`, 10, 60_000);
    if (!allowed) {
      return NextResponse.json({ success: false, message: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await safeParseJSON(request);
    if (!body) {
      return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
    }

    const { email, score, tier, answers } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, message: 'Valid email is required.' }, { status: 400 });
    }
    if (!isValidScore(score)) {
      return NextResponse.json({ success: false, message: 'Score must be a number between 0 and 100.' }, { status: 400 });
    }
    if (!isValidTier(tier)) {
      return NextResponse.json({ success: false, message: 'Tier must be TIER_1, TIER_2, or TIER_3.' }, { status: 400 });
    }
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ success: false, message: 'Answers object is required.' }, { status: 400 });
    }

    // 1. Insert into assessments table
    const assessmentResult = await query(
      'INSERT INTO assessments (email, score, tier, answers) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, score, tier, JSON.stringify(answers)]
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
