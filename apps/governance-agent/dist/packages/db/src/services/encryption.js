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
exports.EncryptionService = void 0;
const crypto_1 = require("crypto");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
const ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
    ? (0, crypto_1.scryptSync)(process.env.ENCRYPTION_KEY, 'salt', 32)
    : Buffer.alloc(32, 0); // FALLBACK FOR DEV ONLY
/**
 * INSTITUTIONAL ENCRYPTION SERVICE
 *
 * Provides field-level encryption for PII (Personally Identifiable Information).
 * Uses AES-256-GCM for authenticated encryption.
 */
class EncryptionService {
    /**
     * Encrypt a sensitive string
     */
    static encrypt(text) {
        if (!process.env.ENCRYPTION_KEY && process.env.NODE_ENV === 'production') {
            throw new Error("[SECURITY] ENCRYPTION_KEY missing in production");
        }
        const iv = (0, crypto_1.randomBytes)(16);
        const cipher = (0, crypto_1.createCipheriv)(ALGORITHM, ENCRYPTION_KEY, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');
        // Format: iv:authTag:encryptedData
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }
    /**
     * Decrypt a sensitive string
     */
    static decrypt(encryptedData) {
        try {
            const [ivHex, authTagHex, encryptedText] = encryptedData.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const authTag = Buffer.from(authTagHex, 'hex');
            const decipher = (0, crypto_1.createDecipheriv)(ALGORITHM, ENCRYPTION_KEY, iv);
            decipher.setAuthTag(authTag);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (err) {
            console.error('[SECURITY] Decryption failed. Possible key mismatch or data corruption.');
            return '[ENCRYPTED_DATA_UNREADABLE]';
        }
    }
}
exports.EncryptionService = EncryptionService;
