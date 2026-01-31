# AIC Platform & Website

## Overview
**AI Integrity Certification (AIC)** provides third-party validation of AI accountability frameworks under POPIA Section 71 compliance. This repository contains the source code for the AIC digital ecosystem.

## Repository Structure
This is a monorepo containing:
- **`apps/web`**: The public-facing marketing website and certification portal (Next.js + Tailwind).
- **`apps/platform`**: (Future) The SaaS monitoring dashboard "AIC Pulse".
- **`packages/ui`**: (Future) Shared UI component library.

## Technology Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript
- **Package Manager**: npm
- **Database**: PostgreSQL (via Docker)

## Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop (for the platform database)
- GitHub CLI (optional, for workflow)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/z-wilken/aic-platform.git
   cd aic-platform
   ```

2. Install dependencies (Root):
   *Note: Currently running independent npm installs per app.*

3. Start the Website (Marketing):
   ```bash
   cd apps/web
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Development Roadmap

### Phase 1: Foundation (Current)
- [x] Repository setup
- [x] Next.js initialization
- [ ] Design system implementation (Crimson Pro / IBM Plex Mono)
- [ ] Homepage hero section

### Phase 2: Core Pages
- Homepage, About, Tier Framework, Certification Process.

### Phase 3: Interactive Features
- Self-assessment tool, Lead capture forms.

## Contributing
See `CHANGELOG.md` for daily updates.

## License
Proprietary - AIC South Africa.
