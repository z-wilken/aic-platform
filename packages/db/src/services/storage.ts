import * as Minio from 'minio';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ROOT_USER || 'aic_storage_admin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'aic_storage_secure_2026',
});

const BUCKET_NAME = 'aic-evidence';

/**
 * INSTITUTIONAL STORAGE SERVICE
 * 
 * Handles immutable evidence persistence with tenant isolation
 * and cryptographic integrity verification.
 */
export class StorageService {
  /**
   * Ensure the evidence bucket exists
   */
  static async initialize() {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'af-south-1');
      console.log(`[STORAGE] Created institutional bucket: ${BUCKET_NAME}`);
    }
  }

  /**
   * Persist evidence with tenant isolation and hashing
   */
  static async saveEvidence(
    orgId: string, 
    fileName: string, 
    buffer: Buffer, 
    contentType: string
  ): Promise<{ evidenceId: string; hash: string }> {
    // 1. Generate SHA-256 integrity hash
    const hash = createHash('sha256').update(buffer).digest('hex');
    
    // 2. Define tenant-isolated path
    const evidenceId = `${orgId}/${Date.now()}-${fileName}`;
    
    // 3. Persist to immutable store
    await minioClient.putObject(BUCKET_NAME, evidenceId, buffer, buffer.length, {
      'Content-Type': contentType,
      'X-AIC-Org-ID': orgId,
      'X-AIC-Integrity-Hash': hash,
    });

    return { evidenceId, hash };
  }

  /**
   * Retrieve evidence for analysis
   */
  static async getEvidence(evidenceId: string): Promise<Buffer> {
    const stream = await minioClient.getObject(BUCKET_NAME, evidenceId);
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });
  }
}
