import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      `SELECT id, title, slug, excerpt, category, published_at 
       FROM posts 
       WHERE status = 'PUBLISHED' 
       ORDER BY published_at DESC`
    );

    return NextResponse.json({ posts: result.rows });
  } catch (error) {
    console.error('Public Blog API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}
