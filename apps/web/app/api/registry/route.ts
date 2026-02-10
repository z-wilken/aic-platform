import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../platform/lib/db'; // Unified DB access

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verifyId = searchParams.get('verify_id');

    if (!verifyId) {
        // Return active registry list
        const result = await query(`
            SELECT id, name, tier, integrity_score, created_at
            FROM organizations 
            WHERE integrity_score >= 100 
            ORDER BY created_at DESC
        `);
        return NextResponse.json({ registry: result.rows });
    }

    // Single verification
    const result = await query(`
        SELECT id, name, tier, integrity_score, created_at
        FROM organizations 
        WHERE id = $1
    `, [verifyId]);

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ 
        success: true, 
        organization: result.rows[0],
        verified_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Registry API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}