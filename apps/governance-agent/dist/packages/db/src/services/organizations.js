"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const db_1 = require("../db");
/**
 * INSTITUTIONAL ORGANIZATION SERVICE
 *
 * Provides a type-safe facade for all organization-related database operations.
 * Enforces RLS and institutional business rules.
 */
class OrganizationService {
    /**
     * Fetch an organization by ID (with RLS)
     */
    static async getById(orgId) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const [org] = await tx
                .select()
                .from(db_1.organizations)
                .where((0, db_1.eq)(db_1.organizations.id, orgId))
                .limit(1);
            return org;
        });
    }
    /**
     * Update organization metadata
     */
    static async update(orgId, data) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const [updated] = await tx
                .update(db_1.organizations)
                .set({ ...data })
                .where((0, db_1.eq)(db_1.organizations.id, orgId))
                .returning();
            return updated;
        });
    }
    /**
     * System-level lookup (SuperAdmin only)
     */
    static async systemGetById(orgId) {
        const db = (0, db_1.getSystemDb)();
        const [org] = await db
            .select()
            .from(db_1.organizations)
            .where((0, db_1.eq)(db_1.organizations.id, orgId))
            .limit(1);
        return org;
    }
}
exports.OrganizationService = OrganizationService;
