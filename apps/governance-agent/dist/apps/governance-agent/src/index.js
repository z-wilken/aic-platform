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
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const db_1 = require("@aic/db");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
/**
 * AIC GOVERNANCE mCP SERVER
 *
 * Exposes AIC Integrity Intelligence to AI Agents (Claude, GPT, etc.)
 * allows for automated audit reasoning and remediation advice.
 */
const server = new index_js_1.Server({
    name: "aic-governance",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
const db = (0, db_1.getSystemDb)();
// 1. List available tools
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_org_integrity_score",
                description: "Retrieve the real-time integrity score and tier for an organization.",
                inputSchema: {
                    type: "object",
                    properties: {
                        orgId: { type: "string", description: "The UUID of the organization" },
                    },
                    required: ["orgId"],
                },
            },
            {
                name: "list_audit_requirements",
                description: "List all pending and verified audit requirements for an organization.",
                inputSchema: {
                    type: "object",
                    properties: {
                        orgId: { type: "string", description: "The UUID of the organization" },
                    },
                    required: ["orgId"],
                },
            },
            {
                name: "get_remediation_advice",
                description: "Get specific, actionable advice to resolve failing audit requirements.",
                inputSchema: {
                    type: "object",
                    properties: {
                        requirementId: { type: "string", description: "The ID of the failing requirement" },
                    },
                    required: ["requirementId"],
                },
            }
        ],
    };
});
// 2. Handle tool execution
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const orgId = args?.orgId;
    if (!orgId)
        throw new Error("orgId is required");
    switch (name) {
        case "get_org_integrity_score": {
            const [org] = await db
                .select()
                .from(db_1.organizations)
                .where((0, db_1.eq)(db_1.organizations.id, orgId))
                .limit(1);
            if (!org)
                return { content: [{ type: "text", text: "Organization not found." }] };
            return {
                content: [{
                        type: "text",
                        text: `Organization: ${org.name}\nScore: ${org.integrityScore}\nTier: ${org.tier}\nStatus: ${org.isAlpha ? "ALPHA_PARTNER" : "STANDARD"}`
                    }],
            };
        }
        case "list_audit_requirements": {
            const reqs = await db
                .select()
                .from(db_1.auditRequirements)
                .where((0, db_1.eq)(db_1.auditRequirements.orgId, orgId));
            const text = reqs.map((r) => `[${r.status}] ${r.title}: ${r.description}`).join("\n");
            return {
                content: [{ type: "text", text: text || "No requirements found." }],
            };
        }
        case "get_remediation_advice": {
            const requirementId = args?.requirementId;
            const [req] = await db
                .select()
                .from(db_1.auditRequirements)
                .where((0, db_1.eq)(db_1.auditRequirements.id, requirementId))
                .limit(1);
            if (!req)
                return { content: [{ type: "text", text: "Requirement not found." }] };
            let advice = "No specific remediation found.";
            if (req.title.toLowerCase().includes("bias")) {
                advice = "ACTION: Perform a disparate impact analysis on protected classes. Re-weight features using the Reweighing preprocessing technique.";
            }
            else if (req.title.toLowerCase().includes("privacy")) {
                advice = "ACTION: Implement k-anonymity (k=5) on all training sets. Enable PII scrubbing in the data ingestion pipeline.";
            }
            else if (req.title.toLowerCase().includes("explainability")) {
                advice = "ACTION: Generate SHAP values for the top 1000 outlier predictions. Document feature importance in the Model Card.";
            }
            return {
                content: [{ type: "text", text: `Requirement: ${req.title}\nStatus: ${req.status}\n\n${advice}` }],
            };
        }
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("AIC Governance mCP Server running on stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
