"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const Minio = __importStar(require("minio"));
const crypto_1 = require("crypto");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ROOT_USER,
    secretKey: process.env.MINIO_ROOT_PASSWORD,
});
const BUCKET_NAME = 'aic-evidence';
/**
 * INSTITUTIONAL STORAGE SERVICE
 *
 * Handles immutable evidence persistence with tenant isolation
 * and cryptographic integrity verification.
 */
class StorageService {
    /**
     * Ensure the evidence bucket exists
     */
    static async initialize() {
        const exists = await minioClient.bucketExists(BUCKET_NAME);
        if (!exists) {
            const region = process.env.MINIO_REGION || 'us-east-1';
            await minioClient.makeBucket(BUCKET_NAME, region);
            console.log(`[STORAGE] Created institutional bucket: ${BUCKET_NAME} in region: ${region}`);
        }
    }
    /**
     * Simple upload and return presigned URL
     */
    static async uploadEvidence(orgId, fileName, buffer, contentType) {
        const { evidenceId } = await this.saveEvidence(orgId, fileName, buffer, contentType);
        return await this.generatePresignedUrl(evidenceId);
    }
    /**
     * Persist evidence with tenant isolation and hashing
     */
    static async saveEvidence(orgId, fileName, buffer, contentType) {
        // 1. Generate SHA-256 integrity hash
        const hash = (0, crypto_1.createHash)('sha256').update(buffer).digest('hex');
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
     * Generate a temporary pre-signed URL for internal model consumption
     */
    static async generatePresignedUrl(evidenceId) {
        return await minioClient.presignedGetObject(BUCKET_NAME, evidenceId, 600); // 10 minutes expiry
    }
    /**
     * Retrieve evidence for analysis
     */
    static async getEvidence(evidenceId) {
        const stream = await minioClient.getObject(BUCKET_NAME, evidenceId);
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', (err) => reject(err));
        });
    }
}
exports.StorageService = StorageService;
