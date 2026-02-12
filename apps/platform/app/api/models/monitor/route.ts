import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getSession } from '../../../../lib/auth';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    // 1. Fetch registered models for this org
    const modelsResult = await query(
        'SELECT * FROM models WHERE org_id = $1 AND is_active = TRUE',
        [orgId]
    );

    const results = [];

    for (const model of modelsResult.rows) {
        // 2. Fetch latest decisions for this model to analyze drift
        const decisionsResult = await query(
            'SELECT input_params, outcome FROM decision_records WHERE org_id = $1 AND system_name = $2 ORDER BY created_at DESC LIMIT 100',
            [orgId, model.name]
        );

        if (decisionsResult.rows.length < 50) {
            results.push({ model: model.name, status: 'SKIPPED', reason: 'Insufficient data for drift analysis' });
            continue;
        }

        // 3. Prepare data for Engine
        const rows = decisionsResult.rows.map(d => ({
            ...d.input_params,
            outcome: d.outcome.result === 'APPROVED' ? 1 : 0
        }));

        // 4. Call Engine for Drift/Bias Analysis
        try {
            const headers: any = { 'Content-Type': 'application/json' };
            if (ENGINE_API_KEY) headers['X-API-Key'] = ENGINE_API_KEY;

            const engineRes = await fetch(`${ENGINE_URL}/api/v1/analyze/statistical`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    protected_attribute: model.metadata?.protected_attribute || 'group',
                    outcome_variable: 'outcome',
                    data: rows
                })
            });

            if (engineRes.ok) {
                const analysis = await engineRes.json();
                
                // 5. Alert if bias is significant
                if (analysis.is_significant) {
                    await query(
                        'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4)',
                        [
                            orgId,
                            'AUTOMATED DRIFT ALERT',
                            `Model "${model.name}" has drifted beyond acceptable fairness bounds. Statistical significance: ${analysis.p_value}.`,
                            'ALERT'
                        ]
                    );
                }

                results.push({ model: model.name, status: 'SUCCESS', analysis });
            }
        } catch (engineErr) {
            console.error(`Engine Error for model ${model.name}:`, engineErr);
            results.push({ model: model.name, status: 'ERROR', detail: 'Audit engine unreachable' });
        }
    }

    return NextResponse.json({ success: true, monitoring_results: results });

  } catch (error) {
    console.error('Monitoring Job Error:', error);
    return NextResponse.json({ error: 'Failed to execute monitoring' }, { status: 500 });
  }
}
