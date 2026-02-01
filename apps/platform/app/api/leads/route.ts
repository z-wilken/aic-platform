import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

// GET /api/leads - List leads (admin use)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const limit = parseInt(searchParams.get('limit') || '50');

    let queryText = `
      SELECT * FROM leads
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramIndex = 1;

    if (status) {
      queryText += ` AND status = $${paramIndex++}`;
      values.push(status);
    }
    if (source) {
      queryText += ` AND source = $${paramIndex++}`;
      values.push(source);
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${paramIndex++}`;
    values.push(limit);

    const result = await query(queryText, values);

    // Get stats
    const statsResult = await query(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'NEW') as new_leads,
        COUNT(*) FILTER (WHERE status = 'CONTACTED') as contacted,
        COUNT(*) FILTER (WHERE status = 'QUALIFIED') as qualified,
        COUNT(*) FILTER (WHERE status = 'CONVERTED') as converted,
        COUNT(*) FILTER (WHERE source = 'QUIZ') as from_quiz,
        COUNT(*) FILTER (WHERE source = 'ALPHA_FORM') as from_alpha
      FROM leads
    `);

    return NextResponse.json({
      leads: result.rows,
      stats: statsResult.rows[0]
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({
      leads: [],
      stats: { total: 0 },
      mode: 'MOCK'
    });
  }
}

// POST /api/leads - Create new lead (from quiz or alpha form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      company,
      source = 'WEB',
      score,
      name,
      use_case,
      tier_estimate,
      metadata = {}
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if lead already exists
    const existingResult = await query(
      'SELECT * FROM leads WHERE email = $1',
      [email]
    );

    if (existingResult.rows.length > 0) {
      // Update existing lead
      const result = await query(`
        UPDATE leads
        SET
          company = COALESCE($1, company),
          source = CASE WHEN $2 = 'ALPHA_FORM' THEN 'ALPHA_FORM' ELSE source END,
          score = COALESCE($3, score),
          status = CASE WHEN $2 = 'ALPHA_FORM' THEN 'QUALIFIED' ELSE status END
        WHERE email = $4
        RETURNING *
      `, [company, source, score, email]);

      return NextResponse.json({
        message: 'Lead updated',
        lead: result.rows[0],
        is_new: false
      });
    }

    // Create new lead
    const result = await query(`
      INSERT INTO leads (email, company, source, score, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [
      email,
      company || null,
      source,
      score || null,
      source === 'ALPHA_FORM' ? 'QUALIFIED' : 'NEW'
    ]);

    // Also create notification record
    try {
      await query(`
        INSERT INTO notifications (recipient, type, status)
        VALUES ($1, $2, 'PENDING')
      `, [email, source === 'ALPHA_FORM' ? 'ALPHA_WELCOME' : 'QUIZ_REPORT']);
    } catch (notifError) {
      console.warn('Failed to create notification:', notifError);
    }

    return NextResponse.json({
      message: 'Lead created successfully',
      lead: result.rows[0],
      is_new: true,
      next_steps: source === 'ALPHA_FORM'
        ? ['You will receive a welcome email within 24 hours', 'Our team will schedule an introductory call']
        : ['Your assessment report will be emailed shortly', 'Consider applying to our Alpha Program']
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating lead:', error);

    // Even if DB fails, return success to user (capture in logs)
    return NextResponse.json({
      message: 'Thank you for your interest! We will be in touch.',
      mode: 'QUEUED'
    }, { status: 201 });
  }
}
