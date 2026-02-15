import { Queue, Worker, Job } from 'bullmq';
import { getTenantDb, auditLogs, notifications, eq } from '@aic/db';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// BullMQ recommends sharing the connection, but to avoid version-mismatch type errors
// between different ioredis installations in the monorepo, we pass the URL string.
// BullMQ will handle the connection internally.
const connectionOptions = {
  connection: {
    url: REDIS_URL,
  }
};

export const engineQueue = new Queue('engine-tasks', {
  ...connectionOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: true,
  },
});

export async function enqueueEngineTask(type: string, payload: Record<string, unknown>, auditId: string, orgId: string) {
  const job = await engineQueue.add(type, { type, payload, auditId, orgId });
  return job.id;
}

export const engineWorker = new Worker(
  'engine-tasks',
  async (job: Job) => {
    const { type, payload, auditId, orgId, taskId } = job.data;
    const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

    if (!taskId) {
      // 1. Initial trigger of Async Engine Task
      const endpoint = getEndpointForTask(type);
      const res = await fetch(`${ENGINE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Engine trigger failed: ${await res.text()}`);
      
      const { task_id } = await res.json();
      await job.updateData({ ...job.data, taskId: task_id });
      
      // Delay next attempt to give engine time to work
      throw new Error('WAITING_FOR_ENGINE');
    } else {
      // 2. Poll for Status
      const res = await fetch(`${ENGINE_URL}/api/v1/tasks/${taskId}`);
      if (!res.ok) throw new Error(`Engine status check failed: ${await res.text()}`);
      
      const { status, result } = await res.json();
      
      if (status === 'SUCCESS') {
        // 3. Institutional Hardening: Update DB with results
        const db = getTenantDb(orgId);
        await db.query(async (tx) => {
          // Update Audit Log
          await tx.update(auditLogs)
            .set({
              details: result,
              integrityHash: result.audit_hash,
              signature: result.signature,
              resourceUsage: result.resource_usage || {
                compute_ms: 0,
                memory_mb: 0,
                carbon_estimate_g: 0
              },
              status: 'VERIFIED'
            })
            .where(eq(auditLogs.id, auditId));

          // Alert if biased
          if (result.status === 'CRITICAL_DRIFT' || result.overall_status === 'BIASED') {
            await tx.insert(notifications).values({
              orgId,
              title: 'CRITICAL ACCOUNTABILITY ALERT',
              message: `Automated analysis detected ${result.status || result.overall_status} for Audit ID: ${auditId.substring(0,8)}`,
              type: 'ALERT'
            });
          }
        });
        
        return result;
      } else if (status === 'FAILURE' || status === 'REVOKED') {
        const db = getTenantDb(orgId);
        await db.query(async (tx) => {
          await tx.update(auditLogs)
            .set({ status: 'FLAGGED' })
            .where(eq(auditLogs.id, auditId));
        });
        throw new Error(`Engine task failed: ${status}`);
      } else {
        // Still processing
        throw new Error('STILL_PROCESSING');
      }
    }
  },
  {
    ...connectionOptions,
    concurrency: 5,
  }
);

function getEndpointForTask(type: string): string {
  switch (type) {
    case 'disparate_impact': return '/api/v1/analyze/async';
    case 'equalized_odds': return '/api/v1/analyze/equalized-odds/async';
    case 'intersectional': return '/api/v1/analyze/intersectional/async';
    case 'explain': return '/api/v1/explain/async';
    default: throw new Error(`Unknown task type: ${type}`);
  }
}
