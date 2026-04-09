import { getPolicyUpdates } from "@/lib/notion";
import GovernanceHubClient from "./GovernanceHubClient";
import {
  Eye,
  MessageSquare,
  Bell,
  RefreshCw,
  UserCheck,
} from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

const heroBg = "https://images.unsplash.com/photo-1585417239901-f3a4085218b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBkaWdpdGFsJTIwbmV0d29yayUyMGRhdGElMjBjb21wbGlhbmNlfGVufDF8fHx8MTc3MTk2MjY5MXww&ixlib=rb-4.1.0&q=80&w=1080";

const rights = [
  {
    article: "Article I",
    icon: Eye,
    title: "Algorithmic Transparency",
    colorClass: "bg-blue-50 border-blue-200 text-blue-800",
    iconClass: "bg-blue-100 text-blue-700",
    scope: "All automated decision systems affecting natural persons",
    obligations: [
      "Disclose the existence of automated decision-making systems",
      "Publish the general logic and parameters used in decisions",
      "Maintain accessible records of AI system objectives",
      "Notify relevant authorities of high-risk system deployments",
    ],
    exceptions: "Exemptions available for national security systems under verified governmental review.",
  },
  {
    article: "Article II",
    icon: MessageSquare,
    title: "Algorithmic Explainability",
    colorClass: "bg-amber-50 border-amber-200 text-amber-800",
    iconClass: "bg-amber-100 text-amber-700",
    scope: "Decisions with material impact on individual rights, welfare, or opportunities",
    obligations: [
      "Provide plain-language explanations upon individual request",
      "Explain the key factors influencing any automated outcome",
      "Offer explanations within 30 days of a decision being made",
      "Maintain explanation logs for minimum 3 years",
    ],
    exceptions: "Proprietary algorithm details may be withheld where trade secrets apply, provided a functional explanation is still offered.",
  },
  {
    article: "Article III",
    icon: Bell,
    title: "Right to be Informed",
    colorClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
    iconClass: "bg-emerald-100 text-emerald-700",
    scope: "All consumer-facing and employment-context AI interactions",
    obligations: [
      "Disclose AI interaction prior to engagement, not retrospectively",
      "Use plain and accessible language in disclosure notices",
      "Update notifications when AI systems are materially modified",
      "Maintain audit trails of disclosure delivery",
    ],
    exceptions: "Real-time fraud detection systems may operate without prior notice under monitored conditions.",
  },
  {
    article: "Article IV",
    icon: RefreshCw,
    title: "Decision Recourse",
    colorClass: "bg-purple-50 border-purple-200 text-purple-800",
    iconClass: "bg-purple-100 text-purple-700",
    scope: "All high-stakes automated decisions (credit, employment, healthcare, legal)",
    obligations: [
      "Provide a human review pathway for all consequential AI decisions",
      "Establish and publish a formal appeals process",
      "Guarantee timely review — within 30 days for most decisions",
      "Document all overrides and maintain accountability records",
    ],
    exceptions: "Low-risk routine automated transactions (e.g., email filtering) may be exempt.",
  },
  {
    article: "Article V",
    icon: UserCheck,
    title: "Human Interaction Choice",
    colorClass: "bg-rose-50 border-rose-200 text-rose-800",
    iconClass: "bg-rose-100 text-rose-700",
    scope: "All service providers offering AI-mediated customer or citizen interactions",
    obligations: [
      "Offer a human service alternative at no additional cost",
      "Process opt-out requests within a reasonable time frame",
      "Maintain sufficient human staffing to fulfill opt-out requests",
      "Prohibit penalization for choosing human service",
    ],
    exceptions: "Fully automated critical infrastructure (e.g., power grid management) is exempt where no practical alternative exists.",
  },
];

const globalStandards = [
  { region: "European Union", framework: "EU AI Act", status: "Enacted", level: "High", year: "2024", alignment: 95 },
  { region: "United States", framework: "NIST AI RMF + EO 14110", status: "Active", level: "Moderate", year: "2023", alignment: 82 },
  { region: "United Kingdom", framework: "UK Pro-Innovation AI Framework", status: "Active", level: "Moderate", year: "2023", alignment: 74 },
  { region: "Canada", framework: "AIDA (Bill C-27)", status: "Pending", level: "High", year: "2024", alignment: 88 },
  { region: "China", framework: "Generative AI Regulations", status: "Enacted", level: "High", year: "2023", alignment: 61 },
  { region: "Brazil", framework: "AI Bill (PL 2338/2023)", status: "Pending", level: "High", year: "2024", alignment: 79 },
  { region: "Singapore", framework: "Model AI Governance Framework", status: "Active", level: "Voluntary", year: "2023", alignment: 85 },
  { region: "Japan", framework: "AI Strategy & Guidelines", status: "Active", level: "Voluntary", year: "2024", alignment: 72 },
];

const fallbackPolicyUpdates = [
  {
    id: 1,
    date: "Feb 2026",
    tag: "Regulatory",
    title: "EU AI Act High-Risk System Compliance Deadline Approaches",
    summary: "Organizations deploying high-risk AI systems under Annex III must achieve ISO/IEC 42001 compliance by August 2026. AIC has expanded its conformity assessment capacity.",
  },
  {
    id: 2,
    date: "Jan 2026",
    tag: "Standards",
    title: "ISO/IEC 42001:2023 Amendment Published for Generative AI",
    summary: "The International Organization for Standardization has published Technical Corrigendum 1 addressing generative AI and large language model deployment requirements.",
  },
];

export default async function GovernanceHubPage() {
  let policyUpdatesData = { results: [], nextCursor: null };
  try {
    policyUpdatesData = await getPolicyUpdates(4);
  } catch (error) {
    console.error("Failed to fetch policy updates from Notion:", error);
  }

  const displayPolicyUpdates = policyUpdatesData.results.length > 0 ? policyUpdatesData.results : fallbackPolicyUpdates;

  return (
    <GovernanceHubClient 
      heroBg={heroBg}
      rights={rights}
      globalStandards={globalStandards}
      initialPolicyUpdates={displayPolicyUpdates}
      initialNextCursor={policyUpdatesData.nextCursor}
    />
  );
}
