import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      'first-name': firstName, 
      'last-name': lastName, 
      email, 
      company, 
      'use-case': useCase 
    } = body;

    if (!email || !firstName || !lastName || !company) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    // 1. Insert into alpha_applications table
    await query(
      `INSERT INTO alpha_applications (email, first_name, last_name, company, use_case) 
       VALUES ($1, $2, $3, $4, $5)`,
      [email, firstName, lastName, company, useCase]
    );

    // 2. Insert or Update leads table
    await query(
      `INSERT INTO leads (email, company, source, status) 
       VALUES ($1, $2, 'ALPHA_FORM', 'NEW') 
       ON CONFLICT (email) DO UPDATE 
       SET company = EXCLUDED.company, status = 'ALPHA_APPLIED'`,
      [email, company]
    );

    console.log('🚀 [AIC-API] Alpha Application Received:', { email, company });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application received. Our team will contact you shortly.' 
    });
  } catch (error) {
    console.error('Error processing alpha application:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
