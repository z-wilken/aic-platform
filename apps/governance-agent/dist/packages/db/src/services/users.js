"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../db");
/**
 * INSTITUTIONAL USER SERVICE
 *
 * Facade for user management, ensuring RLS and role-based access control.
 */
class UserService {
    /**
     * Fetch a user by ID within their organization context
     */
    static async getById(userId, orgId) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            const [user] = await tx
                .select()
                .from(db_1.users)
                .where((0, db_1.eq)(db_1.users.id, userId))
                .limit(1);
            return user;
        });
    }
    /**
     * Fetch a user by email (System-wide, usually for Auth)
     */
    static async getByEmail(email) {
        const db = (0, db_1.getSystemDb)();
        const [user] = await db
            .select()
            .from(db_1.users)
            .where((0, db_1.eq)(db_1.users.email, email.toLowerCase()))
            .limit(1);
        return user;
    }
    /**
     * List all users in an organization
     */
    static async listByOrg(orgId) {
        const db = (0, db_1.getTenantDb)(orgId);
        return await db.query(async (tx) => {
            return await tx
                .select()
                .from(db_1.users)
                .where((0, db_1.eq)(db_1.users.orgId, orgId));
        });
    }
}
exports.UserService = UserService;
