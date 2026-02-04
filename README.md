# AIC: AI Integrity Certification
**The Accountability Layer for South African AI**

> "We do not regulate AI. We certify that humans remain accountable."

AIC is the first POPIA Section 71 compliant accountability framework for South African AI deployments. This monorepo contains the complete digital ecosystem—from high-end marketing to deep-tech bias audit logic—designed to ensure that when a system makes a decision affecting human dignity, a human remains responsible.

---

## 🏛️ Vision & Mission

AIC exists to bridge the "Trust Gap" in AI adoption. While global standards focus on organizational governance, AIC is purpose-built for the South African legal landscape, specifically addressing the liability created by **Section 71 of the Protection of Personal Information Act (POPIA)**.

Our mission is to provide rigorous, third-party certification that organizations maintain genuine human oversight, can explain algorithmic outcomes, and bear real accountability for the consequences.

---

## 🏗️ Platform Architecture

The AIC ecosystem is composed of four specialized applications designed to scale from lead generation to continuous monitoring:

| Application | Type | Tech Stack | Purpose |
| :--- | :--- | :--- | :--- |
| **[`apps/web`](./apps/web)** | Frontend | Next.js (SSG), Framer Motion | High-end "Gallery" marketing site, lead generation, and interactive Self-Assessment Quiz. |
| **[`apps/platform`](./apps/platform)** | SaaS | Next.js (App Router), Postgres | The **AIC Pulse** dashboard where clients monitor system health, view Integrity Scores, and manage certification. |
| **[`apps/admin`](./apps/admin)** | Internal | Next.js, Tailwind | Internal operations panel for managing Alpha participants, auditing leads, and issuing certifications. |
| **[`apps/engine`](./apps/engine)** | Microservice | Python (FastAPI), Pandas | The **Audit Engine** which executes statistical bias analysis (Four-Fifths Rule) and enforces algorithmic rights. |

---

## 📊 The Three-Tier Framework

AIC uses a risk-based, proportional approach to certification:

1.  **Tier 1: Human-Approved (Critical Risk)**
    *   *Examples:* Cancer diagnosis, parole decisions, major commercial loans.
    *   *Logic:* AI advises, but a qualified human must review and approve 100% of decisions.
2.  **Tier 2: Human-Supervised (Elevated Risk)**
    *   *Examples:* Consumer credit, resume screening, insurance underwriting.
    *   *Logic:* AI executes decisions under real-time human oversight with override capabilities.
3.  **Tier 3: Automated-Permissible (Standard Risk)**
    *   *Examples:* Product recommendations, spam filtering, inventory management.
    *   *Logic:* AI operates autonomously with periodic monitoring and clear user disclosure.

---

## 🧠 The Audit Engine & Algorithmic Rights

The core of AIC's technical value is the enforcement of the **5 Algorithmic Rights**:

*   **Right to Human Agency:** Verified through technical intervention tests.
*   **Right to Explanation:** Local and global feature importance (XAI) validation.
*   **Right to Empathy:** Sentiment analysis of automated communications.
*   **Right to Correction:** Validation of the human-led appeal workflow.
*   **Right to Truth:** Disclosure analysis of AI-user interfaces.

---

## 🚀 Getting Started

### Prerequisites
*   **Node.js 18+** (We use Next.js 16 features)
*   **Python 3.9+** (For the Audit Engine)
*   **PostgreSQL** (Shared database)
*   **Docker** (Optional, for database containerization)

### Quick Start (Development)

**1. Clone the repository and install dependencies:**
```bash
npm install
```

**2. Configure Environment Variables:**
Each app in `apps/` requires a `.env` file. You can find example configurations in each directory. Key variables include:
*   `POSTGRES_URL`: Connection string for the shared database.
*   `NEXTAUTH_SECRET`: Secret for platform authentication.

**3. Run the complete ecosystem:**
```bash
npm run dev
```
*   Marketing Web: `http://localhost:3000`
*   Client Platform: `http://localhost:3001`
*   Admin Dashboard: `http://localhost:3002`
*   Audit Engine: `http://localhost:8000`

---

## 📁 Documentation Structure

Comprehensive strategic and technical documentation is located in the [`/docs`](./docs) folder:
*   **[Founder's Vision](./docs/vision/FOUNDERS_VISION.md):** The 30-year roadmap and moral foundation.
*   **[Product Requirements (PRD)](./docs/product/PRD.md):** Detailed technical and design specifications.
*   **[Strategic Roadmap](./docs/strategy/STRATEGIC_ROADMAP.md):** Unified execution plan.
*   **[Pilot Program Framework](./docs/business/PILOT_PROGRAM.md):** Details on the Alpha recruitment phase.

---

## 🔒 Security & Data Sovereignty
AIC is designed with **South Africa-First** data residency principles. The platform supports immutable audit logging and secure, de-identified technical bias testing to ensure compliance with POPIA's data minimization mandates.

---

**© 2026 AI Integrity Certification (AIC). Proprietary - Johannesburg, South Africa.**