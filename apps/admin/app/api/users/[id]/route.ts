import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, users, eq, and } from '@aic/db';
import { auth } from '@aic/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { role, is_active, name } = await request.json();

    const db = getSystemDb();

    const [updatedUser] = await db
      .update(users)
      .set({ 
        role, 
        isActive: is_active, 
        name,
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning({ 
        id: users.id, 
        email: users.email, 
        name: users.name, 
        role: users.role, 
        isActive: users.isActive 
      });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('User Patch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const org_id = searchParams.get('org_id');
    
    // Don't allow deleting yourself
    if (id === session.user.id) {
        return NextResponse.json({ error: 'Cannot delete self' }, { status: 400 });
    }

    const db = getSystemDb();

    // Task M7: org_id validation if provided
    const whereClause = eq(users.id, id);
    if (org_id) {
        const [deletedUser] = await db.delete(users).where(and(eq(users.id, id), eq(users.orgId, org_id))).returning({ id: users.id });
        if (!deletedUser) {
          return NextResponse.json({ error: 'User not found or org_id mismatch' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'User removed from registry' });
    }

    const [deletedUser] = await db
      .delete(users)
      .where(whereClause)
      .returning({ id: users.id });

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found or org_id mismatch' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User removed from registry' });
  } catch (error) {
    console.error('User Delete Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
