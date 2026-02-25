"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
const db_1 = require("../db");
class AuditLogService {
    static async list(orgId, limit = 25, offset = 0) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const logs = await tx
                .select()
                .from(db_1.auditLogs)
                .where((0, db_1.eq)(db_1.auditLogs.orgId, orgId))
                .orderBy((0, db_1.desc)(db_1.auditLogs.createdAt))
                .limit(limit)
                .offset(offset);
            const [count] = await tx.select({ count: (0, db_1.sql) `count(*)` }).from(db_1.auditLogs).where((0, db_1.eq)(db_1.auditLogs.orgId, orgId));
            return { logs, total: Number(count.count) };
        });
    }
    static async getById(orgId, logId) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const [log] = await tx
                .select()
                .from(db_1.auditLogs)
                .where((0, db_1.eq)(db_1.auditLogs.id, logId))
                .limit(1);
            return log;
        });
    }
}
exports.AuditLogService = AuditLogService;
