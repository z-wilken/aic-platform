"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = void 0;
const db_1 = require("../db");
class IncidentService {
    /**
     * List incidents for an organization
     */
    static async list(orgId, limit = 25, offset = 0) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const results = await tx
                .select()
                .from(db_1.incidents)
                .where((0, db_1.eq)(db_1.incidents.orgId, orgId))
                .orderBy((0, db_1.desc)(db_1.incidents.createdAt))
                .limit(limit)
                .offset(offset);
            const [count] = await tx
                .select({ count: (0, db_1.sql) `count(*)` })
                .from(db_1.incidents)
                .where((0, db_1.eq)(db_1.incidents.orgId, orgId));
            return { incidents: results, total: Number(count.count) };
        });
    }
    /**
     * Get incident by ID
     */
    static async getById(orgId, incidentId) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const [incident] = await tx
                .select()
                .from(db_1.incidents)
                .where((0, db_1.eq)(db_1.incidents.id, incidentId))
                .limit(1);
            return incident;
        });
    }
    /**
     * Update incident status/resolution
     */
    static async update(orgId, incidentId, data) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const [updated] = await tx
                .update(db_1.incidents)
                .set({ ...data, updatedAt: new Date() })
                .where((0, db_1.eq)(db_1.incidents.id, incidentId))
                .returning();
            return updated;
        });
    }
}
exports.IncidentService = IncidentService;
