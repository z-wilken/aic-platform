"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementService = void 0;
const db_1 = require("../db");
class RequirementService {
    /**
     * List requirements for an organization
     */
    static async list(orgId) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            return await tx
                .select()
                .from(db_1.auditRequirements)
                .where((0, db_1.eq)(db_1.auditRequirements.orgId, orgId))
                .orderBy((0, db_1.asc)(db_1.auditRequirements.createdAt));
        });
    }
    /**
     * Update a requirement (System/Auditor level)
     */
    static async systemUpdate(id, data) {
        const db = (0, db_1.getSystemDb)();
        const [updated] = await db
            .update(db_1.auditRequirements)
            .set({ ...data, updatedAt: new Date() })
            .where((0, db_1.eq)(db_1.auditRequirements.id, id))
            .returning();
        return updated;
    }
}
exports.RequirementService = RequirementService;
