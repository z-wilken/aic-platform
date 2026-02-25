"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrganizationIntelligence = calculateOrganizationIntelligence;
const db_1 = require("../db");
/**
 * INSTITUTIONAL BUSINESS LOGIC: Integrity Scoring
 *
 * Calculates the weighted integrity score for an organization.
 * This logic is decoupled from the API layer to ensure it can be
 * called by the Engine, the Platform, or CLI tools with zero drift.
 */
async function calculateOrganizationIntelligence(orgId) {
    const tdb = (0, db_1.getTenantDb)(orgId);
    return await tdb.query(async (tx) => {
        // 1. Fetch requirements (RLS will automatically filter by orgId)
        const requirements = await tx.select().from(db_1.auditRequirements);
        const categories = {
            'DOCUMENTATION': { weight: 0.20, score: 0, total: 0 },
            'OVERSIGHT': { weight: 0.35, score: 0, total: 0 },
            'REPORTS': { weight: 0.25, score: 0, total: 0 },
            'TECHNICAL': { weight: 0.20, score: 0, total: 0 }
        };
        requirements.forEach((req) => {
            const catKey = req.category?.toUpperCase() || '';
            const cat = categories[catKey];
            if (cat) {
                cat.total++;
                if (req.status === 'VERIFIED')
                    cat.score++;
            }
        });
        let calculatedScore = 0;
        Object.values(categories).forEach(cat => {
            if (cat.total > 0) {
                calculatedScore += (cat.score / cat.total) * cat.weight * 100;
            }
        });
        // 2. Fetch Open Incidents (RLS filtered)
        const openIncidentsResult = await tx
            .select({ count: (0, db_1.sql) `count(*)` })
            .from(db_1.incidents)
            .where((0, db_1.eq)(db_1.incidents.status, 'OPEN'));
        const openIncidents = Number(openIncidentsResult[0]?.count || 0);
        const penalty = openIncidents * 5;
        const finalScore = Math.max(0, Math.round(calculatedScore) - penalty);
        // 3. Persist score to organization table (Atomic update)
        await tx
            .update(db_1.organizations)
            .set({ integrityScore: finalScore })
            .where((0, db_1.eq)(db_1.organizations.id, orgId));
        return {
            score: finalScore,
            openIncidents,
            totalRequirements: requirements.length,
            verifiedRequirements: requirements.filter((r) => r.status === 'VERIFIED').length
        };
    });
}
