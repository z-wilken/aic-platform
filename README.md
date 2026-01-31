# AIC Platform Ecosystem

## Overview
**AI Integrity Certification (AIC)** is the first POPIA Section 71 compliant accountability framework for South African AI. This monorepo contains the complete digital ecosystem, from public marketing to deep-tech audit logic.

## 🏗️ Architecture
The platform is composed of 4 distinct applications:

| App | Type | Tech Stack | Purpose |
| :--- | :--- | :--- | :--- |
| **`apps/web`** | Frontend | Next.js, Tailwind | Public Marketing & Lead Gen (Quiz) |
| **`apps/platform`** | SaaS | Next.js, Postgres | Client Compliance Dashboard (Glassmorphism UI) |
| **`apps/admin`** | Internal | Next.js, Dark Mode | Internal Operations & Certification Management |
| **`apps/engine`** | Microservice | Python, FastAPI | AI Bias Audit Logic (Four-Fifths Rule) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker Desktop

### Quick Start (Development)

**1. Install Dependencies**
```bash
# In Root
npm install
```

**2. Run the Marketing Site (Port 3000)**
```bash
cd apps/web
npm run dev
```

**3. Run the Client Dashboard (Port 3001)**
```bash
cd apps/platform
npm run dev -- -p 3001
```

**4. Run the Audit Engine (Port 8000)**
```bash
cd apps/engine
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🔒 Security & Compliance
- **Data Sovereignty:** Designed for South African data residency.
- **Audit Trails:** Immutable logging of all AI decisions via Postgres.
- **Bias Detection:** Statistical disparate impact analysis (SCIPY/PANDAS).

## License
Proprietary - AIC South Africa.
