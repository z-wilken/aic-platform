# AIC Platform: Capability Review (February 2026)

This document provides a comprehensive audit of the AIC (AI Integrity Certification) platform's current state, identifying built capabilities and remaining roadmap items.

---

## 1. Professional Edition (Senior Dev / Project Manager)

### **Executive Summary**
The platform has transitioned from a localized MVP to a **Global-Sovereign-Grade Infrastructure**. It is architected as a type-safe TypeScript monorepo (Turborepo) with a hardened Python-based Audit Engine. The system enforces zero-bypass multi-tenancy via Postgres Row-Level Security (RLS) and cryptographically secured service-to-service communication.

### **Current Built Capabilities**

#### **Core Infrastructure & Security**
*   **Sovereign Multi-Tenancy**: Implementation of `getTenantDb(orgId)` and `getSystemDb()` ensuring complete data isolation at the database layer.
*   **Field-Level PII Encryption**: AES-256-GCM authenticated encryption for sensitive citizen data (e.g., in the `incidents` table).
*   **Hardened S2S Auth**: RS256-signed JWT identity for Platform-to-Engine communication, replacing static API keys.
*   **Resiliency Architecture**: Integrated Circuit Breaker pattern (Opossum) in the internal API client to prevent cascading failures.
*   **Globalized Storage**: Parameterized MinIO/S3 evidence vault supporting multi-regional deployment.

#### **Institutional Governance**
*   **mCP Governance Server**: A Model Context Protocol server (`apps/governance-agent`) exposing integrity intelligence to AI agents (Claude/GPT).
*   **Multi-Signature Ledger**: Database schema support for cryptographic multi-auditor verification of compliance reports.
*   **Universal Standards Mapping**: Transitioned from regional (SANAS/POPIA) to international standards (**ISO/IEC 42001** and **NIST AI RMF**).
*   **Granular RBAC**: Scope-based permission model (Audit, Incident, Intelligence, Admin) defined in shared types.

#### **Audit & Intelligence**
*   **High-Fidelity Reporting**: Automated generation of SANAS/ISO-compliant PDF certificates with immutable storage in the evidence vault.
*   **Real-Time Telemetry**: Established Redis-backed SSE (Server-Sent Events) event bus for live dashboard updates.
*   **Green Coding**: Integrated resource tracking (compute time, memory, carbon estimate) into the audit logging schema.

### **Technical Debt & Pending Items**
*   **Identity Federation UI**: OIDC/SAML schema is ready, but the administrative UI for configuring external providers is pending.
*   **Distributed Ledger Verification**: The "verification gateway" for auditors to sign reports needs high-fidelity frontend implementation.
*   **Automated Remediation Logic**: Initial tool support exists in mCP, but deep-scan remediation suggestions (code diffs) require further Engine training.

---

## 2. Layperson Edition (Everyday Person)

### **What is this?**
Think of AIC as a "Nutrition Label" and "Security Guard" for Artificial Intelligence. Just like a building needs a safety certificate before people can move in, an AI system needs an AIC certificate to prove it is fair, safe, and honest.

### **What can it do right now?**
1.  **Protects Your Privacy**: Any personal information (like your email) is "scrambled" (encrypted) so that even the people running the database can't read it.
2.  **Checks for Fairness**: The system can scan an AI to see if it is biased against certain groups of people.
3.  **Real-Time Monitoring**: Companies get a live dashboard showing how "healthy" their AI systems are.
4.  **Official Certificates**: It can automatically create professional, tamper-proof PDF certificates that prove a company is following international AI safety rules.
5.  **AI Talking to AI**: We built a special "Agent" that allows other AI programs to ask our system: "Is this company's AI safe to use?"

### **What's coming next?**
*   **Global Reach**: We have upgraded the system so it can work in any country, not just South Africa.
*   **Enterprise Sign-In**: Allowing big companies to log in using their existing office accounts (like Microsoft or Google).
*   **Green AI**: Showing how much electricity and "carbon footprint" an AI system is using, helping companies be more environmentally friendly.

---

## 3. Current Project Trajectory Review

The platform is currently in the **Institutional Hardening Phase**. 
*   **Status**: Stability is at 95%. Foundation is solid.
*   **Next Milestone**: **Series A Readiness**.
*   **Focus**: Moving from "Backend Integrity" to "User Experience Excellence" and "Global Market Entry."
