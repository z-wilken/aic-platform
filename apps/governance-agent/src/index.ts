import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { getSystemDb, organizations, auditRequirements, eq } from "@aic/db";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

/**
 * AIC GOVERNANCE mCP SERVER
 * 
 * Exposes AIC Integrity Intelligence to AI Agents (Claude, GPT, etc.)
 * allows for automated audit reasoning and remediation advice.
 */
const server = new Server(
  {
    name: "aic-governance",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const db = getSystemDb();

// 1. List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
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
      }
    ],
  };
});

// 2. Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const orgId = args?.orgId as string;

  if (!orgId) throw new Error("orgId is required");

  switch (name) {
    case "get_org_integrity_score": {
      const [org] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.id, orgId))
        .limit(1);
      
      if (!org) return { content: [{ type: "text", text: "Organization not found." }] };

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
        .from(auditRequirements)
        .where(eq(auditRequirements.orgId, orgId));

      const text = reqs.map(r => `[${r.status}] ${r.title}: ${r.description}`).join("\n");
      
      return {
        content: [{ type: "text", text: text || "No requirements found." }],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AIC Governance mCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
