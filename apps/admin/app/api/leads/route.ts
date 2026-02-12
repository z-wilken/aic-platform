import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {

  const session: any = await getSession();



  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  }



  try {

    const result = await query('SELECT * FROM leads ORDER BY created_at DESC');

    return NextResponse.json({ leads: result.rows });

  } catch (error) {

    console.error('Admin Leads API Error:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  }

}



export async function POST(request: Request) {

  const session: any = await getSession();



  if (!session || session.user.role !== 'ADMIN') {

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  }



  try {

    const body = await request.json();

    const { email, company, status = 'PROSPECT' } = body;



    if (!email) {

      return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    }



    const result = await query(
      "INSERT INTO leads (email, company, source, status) VALUES ($1, $2, 'MANUAL', $3) RETURNING *",
      [email.toLowerCase(), company || '', status]
    );



    return NextResponse.json({ success: true, lead: result.rows[0] });

  } catch (error) {

    console.error('Admin Lead Create Error:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  }

}
