import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../packages/db/src/schema';
import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function init() {
  console.log('[INDEX_INIT] Starting Public Index initialization...');

  try {
    // 1. Create table manually if push/generate failed to do it reliably
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS public_index_rankings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name VARCHAR(255) NOT NULL,
        industry VARCHAR(100),
        ticker VARCHAR(20),
        maturity_score INTEGER DEFAULT 0,
        board_oversight_score INTEGER DEFAULT 0,
        rights_compliance_score INTEGER DEFAULT 0,
        transparency_score INTEGER DEFAULT 0,
        risk_management_score INTEGER DEFAULT 0,
        trend VARCHAR(10) DEFAULT 'stable',
        is_client BOOLEAN DEFAULT FALSE,
        linked_org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
        last_assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log('[INDEX_INIT] Table ensured.');

    // 2. Seed JSE Top 40 (Demo Data)
    const top40 = [
      { name: 'Naspers Ltd', ticker: 'NPN', industry: 'Technology', score: 88 },
      { name: 'FirstRand Ltd', ticker: 'FSR', industry: 'Financial Services', score: 82 },
      { name: 'Standard Bank Group', ticker: 'SBK', industry: 'Financial Services', score: 85 },
      { name: 'MTN Group', ticker: 'MTN', industry: 'Telecommunications', score: 78 },
      { name: 'Sasol Ltd', ticker: 'SOL', industry: 'Energy', score: 64 },
      { name: 'Vodacom Group', ticker: 'VOD', industry: 'Telecommunications', score: 81 },
      { name: 'Capitec Bank', ticker: 'CPI', industry: 'Financial Services', score: 76 },
      { name: 'Absa Group', ticker: 'ABG', industry: 'Financial Services', score: 79 },
      { name: 'Anglo American Platinum', ticker: 'AMS', industry: 'Mining', score: 58 },
      { name: 'Sanlam Ltd', ticker: 'SLM', industry: 'Insurance', score: 74 },
      { name: 'Shoprite Holdings', ticker: 'SHP', industry: 'Retail', score: 72 },
      { name: 'Nedbank Group', ticker: 'NED', industry: 'Financial Services', score: 83 },
      { name: 'Gold Fields Ltd', ticker: 'GFI', industry: 'Mining', score: 55 },
      { name: 'Impala Platinum', ticker: 'IMP', industry: 'Mining', score: 52 },
      { name: 'Sibanye Stillwater', ticker: 'SSW', industry: 'Mining', score: 48 },
      { name: 'BidCorp Ltd', ticker: 'BID', industry: 'Food Service', score: 61 },
      { name: 'Discovery Ltd', ticker: 'DSY', industry: 'Insurance', score: 89 },
      { name: 'Remgro Ltd', ticker: 'REM', industry: 'Investment', score: 67 },
      { name: 'Woolworths Holdings', ticker: 'WHL', industry: 'Retail', score: 75 },
      { name: 'Old Mutual Ltd', ticker: 'OMU', industry: 'Insurance', score: 77 },
    ];

    console.log(`[INDEX_INIT] Seeding ${top40.length} companies...`);

    for (const company of top40) {
      await db.insert(schema.publicIndexRankings).values({
        companyName: company.name,
        ticker: company.ticker,
        industry: company.industry,
        maturityScore: company.score,
        boardOversightScore: Math.round(company.score * 0.95),
        rightsComplianceScore: Math.round(company.score * 0.9),
        transparencyScore: Math.round(company.score * 0.85),
        riskManagementScore: Math.round(company.score * 0.92),
        trend: 'stable'
      }).onConflictDoNothing();
    }

    console.log('[SUCCESS] Public Index initialized and seeded.');
  } catch (error) {
    console.error('[CRITICAL FAILURE] Init failed:', error);
  } finally {
    await pool.end();
  }
}

init();
