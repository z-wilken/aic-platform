import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || '';

function engineHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (ENGINE_API_KEY) headers['X-API-Key'] = ENGINE_API_KEY;
    return headers;
}

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;
    
    const body = await request.json();
    const { systemName, data } = body;

    // 1. Fetch the last hash for this organization to maintain the chain
    const lastLog = await query(
        'SELECT integrity_hash FROM audit_logs WHERE org_id = $1 ORDER BY created_at DESC LIMIT 1',
        [orgId]
    );
    const previousHash = lastLog.rows[0]?.integrity_hash || null;

    // 2. Forward to Python Engine for Rigorous Bias Audit
    const engineResponse = await fetch(`${ENGINE_URL}/api/v1/analyze`, {
        method: 'POST',
        headers: engineHeaders(),
        body: JSON.stringify({
            protected_attribute: data.protected_attribute || 'group',
            outcome_variable: data.outcome_variable || 'hired',
            data: data.rows || [],
            previous_hash: previousHash
        })
    });

    if (!engineResponse.ok) {
        const errorDetail = await engineResponse.text();
        throw new Error(`Engine analysis failed: ${errorDetail}`);
    }

    const analysisResult = await engineResponse.json();

    // 3. Automated Alerting for Critical Drift or Bias
    if (analysisResult.status === 'CRITICAL_DRIFT' || analysisResult.overall_status === 'BIASED') {
        await query(
            'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4)',
            [
                orgId, 
                'CRITICAL ACCOUNTABILITY ALERT', 
                `Automated analysis detected ${analysisResult.status || analysisResult.overall_status} in system: ${systemName}. Immediate remediation roadmap updated.`,
                'ALERT'
            ]
        );
    }

    // 4. Save Audit Log to Database with linking
    const logResult = await query(
        `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash, previous_hash) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [
            orgId, 
            systemName, 
            'BIAS_AUDIT', 
            JSON.stringify(analysisResult),
            analysisResult.audit_hash,
            previousHash
        ]
    );

    return NextResponse.json({ 
        success: true, 
        auditId: logResult.rows[0].id,
        analysis: analysisResult 
    });

  } catch (error: any) {
    console.error('Audit Engine Integration Error:', error.message);
    return NextResponse.json({ 
        error: 'Technical validation failed', 
        detail: error.message 
    }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
    try {
      const session: any = await getSession();
      if (!session || !session.user?.orgId) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const orgId = session.user.orgId;
      
      const body = await request.json();
      const { systemName, data, type = 'EQUALIZED_ODDS' } = body;

      // 1. Fetch the last hash for this organization to maintain the chain
      const lastLog = await query(
          'SELECT integrity_hash FROM audit_logs WHERE org_id = $1 ORDER BY created_at DESC LIMIT 1',
          [orgId]
      );
      const previousHash = lastLog.rows[0]?.integrity_hash || null;
  
      let engineEndpoint = '';
      let payload: any = { previous_hash: previousHash };
      let eventType = '';

      if (type === 'EQUALIZED_ODDS') {
          engineEndpoint = `${ENGINE_URL}/api/v1/analyze/equalized-odds`;
          payload = {
              ...payload,
              protected_attribute: data.protected_attribute || 'group',
              actual_outcome: data.actual_outcome || 'actual',
              predicted_outcome: data.predicted_outcome || 'predicted',
              data: data.rows || []
          };
          eventType = 'ADVANCED_BIAS_AUDIT';
      } else if (type === 'INTERSECTIONAL') {
          engineEndpoint = `${ENGINE_URL}/api/v1/analyze/intersectional`;
          payload = {
              ...payload,
              protected_attributes: data.protected_attributes || ['race', 'gender'],
              outcome_variable: data.outcome_variable || 'hired',
              min_group_size: data.min_group_size || 1,
              data: data.rows || []
          };
          eventType = 'INTERSECTIONAL_BIAS_AUDIT';
      } else {
          return NextResponse.json({ error: 'Unsupported audit type' }, { status: 400 });
      }
  
      const engineResponse = await fetch(engineEndpoint, {
          method: 'POST',
          headers: engineHeaders(),
          body: JSON.stringify(payload)
      });
  
      if (!engineResponse.ok) {
          const errorMsg = await engineResponse.text();
          throw new Error(`Engine advanced analysis failed: ${errorMsg}`);
      }
  
      const analysisResult = await engineResponse.json();
  
      await query(
          `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash, previous_hash) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [orgId, systemName, eventType, JSON.stringify(analysisResult), analysisResult.audit_hash, previousHash]
      );
  
      return NextResponse.json({ success: true, analysis: analysisResult });
  
    } catch (error: any) {
      return NextResponse.json({ error: 'Advanced validation failed' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const session: any = await getSession();
        if (!session || !session.user?.orgId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const orgId = session.user.orgId;

        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q');
        const limit = parseInt(searchParams.get('limit') || '25');
        const page = parseInt(searchParams.get('page') || '1');
        const offset = (page - 1) * limit;

        let sql = 'SELECT * FROM audit_logs WHERE org_id = $1';
        let countSql = 'SELECT COUNT(*) FROM audit_logs WHERE org_id = $1';
        const params: any[] = [orgId];

        if (q) {
            const searchParam = `%${q}%`;
            sql += ' AND (system_name ILIKE $2 OR event_type ILIKE $2)';
            countSql += ' AND (system_name ILIKE $2 OR event_type ILIKE $2)';
            params.push(searchParam);
        }

        sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        const finalParams = [...params, limit, offset];

        const [result, countResult] = await Promise.all([
            query(sql, finalParams),
            query(countSql, params)
        ]);

        const total = parseInt(countResult.rows[0].count);

        return NextResponse.json({ 
            logs: result.rows,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Audit Logs Retrieval Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve logs' }, { status: 500 });
    }
}