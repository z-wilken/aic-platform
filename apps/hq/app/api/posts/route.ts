import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  // Public-facing part of the API (called from apps/web) could be here too,
  // but for now, we'll keep it internal for HQ management
  try {
    const result = await query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    return NextResponse.json({ posts: result.rows });
  } catch (error) {
    console.error('HQ Posts API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, excerpt, category, status = 'DRAFT' } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and Content are required' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const result = await query(
      `INSERT INTO posts (title, slug, content, excerpt, category, status, author_id, published_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, slug, content, excerpt || '', category || 'General', status, session.user.id, status === 'PUBLISHED' ? new Date() : null]
    );

    return NextResponse.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error('HQ Post Create Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, title, content } = body;

    if (!id) return NextResponse.json({ error: 'Post ID required' }, { status: 400 });

    const result = await query(
      `UPDATE posts 
       SET status = COALESCE($1, status), 
           title = COALESCE($2, title),
           content = COALESCE($3, content),
           published_at = CASE WHEN $1 = 'PUBLISHED' AND published_at IS NULL THEN NOW() ELSE published_at END,
           updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [status, title, content, id]
    );

    return NextResponse.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error('HQ Post Update Error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
