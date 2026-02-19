import { Queue, Worker, Job } from 'bullmq';
import { getTenantDb, auditLogs, notifications, eq } from '@aic/db';
import { EngineClient } from './engine-client';

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

    if (!taskId) {
      // 1. Initial trigger of Async Engine Task
      let res: Record<string, unknown>;
      switch (type) {
        case 'disparate_impact':
          res = await EngineClient.analyzeDisparateImpact(orgId, payload.data, payload.protected_attribute, payload.outcome_variable, payload.previous_hash);
          break;
        case 'equalized_odds':
          res = await EngineClient.analyzeEqualizedOdds(orgId, payload.data, payload.protected_attribute, payload.actual_outcome, payload.predicted_outcome, payload.threshold, payload.previous_hash);
          break;
        case 'intersectional':
          res = await EngineClient.analyzeIntersectional(orgId, payload.data, payload.protected_attributes, payload.outcome_variable, payload.min_group_size, payload.previous_hash);
          break;
        default:
          throw new Error(`Unknown task type: ${type}`);
      }

      if (res.error) throw new Error(`Engine trigger failed: ${res.error}`);
      
      // Note: The new EngineClient methods currently call sync endpoints.
      // We need to add async trigger methods to EngineClient for true async flow.
      // For now, if the endpoint returns result directly, we can skip polling.
      
      if (res.audit_hash) {
          // Direct sync result
          await processEngineResult(res, auditId, orgId);
          return res;
      }

      const task_id = res.task_id;
      await job.updateData({ ...job.data, taskId: task_id });
      
      // Delay next attempt to give engine time to work
      throw new Error('WAITING_FOR_ENGINE');
    } else {
      // 2. Poll for Status
      // We need a request method in EngineClient for status polling
      const res = await EngineClient.getTaskStatus(taskId, orgId);
      
      const { status, result } = res;
      
      if (status === 'SUCCESS' && result) {
        await processEngineResult(result, auditId, orgId);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function processEngineResult(result: any, auditId: string, orgId: string) {
    const db = getTenantDb(orgId);
    await db.query(async (tx) => {
      // Update Audit Log
      await tx.update(auditLogs)
        .set({
          details: result,
          integrityHash: result.audit_hash as string,
          signature: result.signature as string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resourceUsage: (result.resource_usage || {
            compute_ms: 0,
            memory_mb: 0,
            carbon_estimate_g: 0
          }) as any,
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
}
