import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, posts, desc, eq } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  try {
    const db = getSystemDb();
    const result = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json({ posts: result });
  } catch (error) {
    console.error('HQ Posts API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, content, excerpt, category, status = 'DRAFT' } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and Content are required' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const db = getSystemDb();
    const [newPost] = await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt: excerpt || '',
      category: category || 'General',
      status,
      authorId: session.user.id,
      publishedAt: status === 'PUBLISHED' ? new Date() : null
    }).returning();

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('HQ Post Create Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, status, title, content } = body;

    if (!id) return NextResponse.json({ error: 'Post ID required' }, { status: 400 });

    const db = getSystemDb();
    const [updatedPost] = await db
      .update(posts)
      .set({ 
        status, 
        title, 
        content,
        publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
        updatedAt: new Date()
      })
      .where(eq(posts.id, id))
      .returning();

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('HQ Post Update Error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
