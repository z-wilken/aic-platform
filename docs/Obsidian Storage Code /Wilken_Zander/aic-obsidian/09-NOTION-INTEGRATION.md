# Notion Integration
*How the Notion workspace maps to the AIC platform and operational processes*

*Cross-references: [[01-PLATFORM-OVERVIEW]] | [[02-ARCHITECTURE]] | [[05-FUNCTIONS-TO-BUILD]] | [[06-DATABASE-SCHEMA]] | [[00-INDEX]]*

---

## Overview

The primary Notion database is **"Certify Body"** (`AIC Implementation` data source). It serves as the operational command centre for AIC's internal processes — the equivalent of `apps/hq` but running in Notion until the platform's HQ app is fully built out.

The key insight for new team members: **Notion is the current operational reality; the platform is the target state**. As functions get built in the platform (see [[05-FUNCTIONS-TO-BUILD]]), they replace the equivalent Notion workflows.

---

## Primary Notion Database: AIC Implementation

**URL:** `collection://30caeb71-0683-81f5-ba82-000bcfdb2ada`

This is the master implementation database. Every action, process, strategy, and objective for running AIC lives here.

### Key Properties

| Property | Type | What It Tracks |
|----------|------|----------------|
| **Action** | Title | The name of the task/item |
| **Status** | Status | Inbox → Schedule → On Track / Off Track / In Play → Complete / Missed / Achieved |
| **Core Process** | Select | Which area of the business this belongs to |
| **Type** | Select | Routine, Daily/Weekly/Monthly/Quarterly/Annual Process, Strategy, Objective, Issue, Small Step |
| **Category** | Select | Class, Vision, Action, Process, Strategy, Leave + Birthday |
| **Priority** | Select | P1 (highest) → P8 |
| **Accountable** | Person | Who is responsible |
| **Operator** | Person | Who executes it |
| **Date / Day / Week / Month / Quarter / Year** | Date/Select | When it's scheduled |
| **Duration (Hours)** | Formula | Auto-calculated |
| **Progress** | Rollup | Rolled up from Sub Items |
| **Parent / Sub Items** | Self-relation | Task hierarchy |

### The 8 Core Processes

This is the operational taxonomy of AIC. Everything maps to one of these:

| Core Process | Equivalent in Platform | Equivalent in Notion Views |
|--------------|----------------------|---------------------------|
| **Vision** | Strategy and direction | Vision items, OKR objectives |
| **Leadership** | Founder + team operations | Leadership Report relations |
| **Service Delivery** | `apps/platform` — client experience | Service Delivery Report relations |
| **Customer Relations** | CRM, alpha pilot management | Customer Relations Report relations |
| **Sales and Marketing** | `apps/web`, content, social | Sales and Marketing Report relations |
| **Platform Development** | GitHub repo, engineering | Dev tasks, sprint items |
| **Finance + Human Resources** | Billing, payroll, SARS | Finance Report relations |
| **Growth & Development** | Training, CPD, team growth | Academic Development Report |

---

### Views in the Database

| View | What It Shows |
|------|---------------|
| **Focus** | My "In Play" items on a timeline — personal command view |
| **Calendar** | My "In Play" items by date |
| **Actions** | All non-template items grouped by Core Process (table view) |
| **Issues** | Items categorised as Issues, by Status |
| **Objectives** | Items typed as Objective, by Core Process |
| **Our Team** | Leave and Birthday calendar |
| **Schema** | Full flat table of all items |

---

### Template System

The database has an extensive template library for recurring processes. Key templates:

**Daily Operations:**
- `M → Morning Duties` / `M → Afternoon Duties` — Monday routine
- `T → Morning Duties` / `T → Afternoon Duties` — Tuesday/Thursday
- `W → Morning Duties` / `W → Afternoon Duties` — Wednesday routine
- `F → Morning Duties` / `F → Afternoon Duties` / `F → Weekly Pulse` — Friday

**Content & Marketing:**
- `Create Article` → `Proof Article` → `Article Upload` → `Post → Instagram`
- `M: Social Cleanup` / `T: Social Cleanup` / `W: Social Cleanup` / `F: Social Cleanup`
- `Update SS Bot`, `Update Testimonials`

**Finance:**
- `M → Standard Bank` / `W → Bank Reconciliation`
- `Monthly PAYE`, `Process Salaries`, `Part-time Contributions`, `VAT Payment`
- `AIC PROCESS — Monthly Financial Review`, `AIC PROCESS — Monthly Invoicing`
- `AIC PROCESS — Annual Financial Review`, `AIC PROCESS — Annual CIPC & SARS Returns`

**Platform Development:**
- `Update SS Bot` — social scheduling bot updates

**Training:**


---

## Connected Report Databases

The AIC Implementation database has relations to several report databases. These are the monthly/quarterly reporting infrastructure:

| Relation                        | Collection URL              | Purpose                                     |
| ------------------------------- | --------------------------- | ------------------------------------------- |
| **Leadership Report**           | `collection://269d968d-...` | Monthly leadership metrics and decisions    |
| **Service Delivery Report**     | `collection://2cbe1b0f-...` | Client delivery quality and outcomes        |
| **Customer Relations Report**   | `collection://eda90ef0-...` | CRM and client relationship data            |
| **Sales and Marketing Report**  | `collection://df98bfc8-...` | Pipeline, conversion, marketing performance |
| **Finance Report**              | `collection://b1604f58-...` | Revenue, expenses, financial position       |
| **Academic Report**             | `collection://bf14fc6b-...` | Training content and delivery metrics       |
| **Academic Development Report** | `collection://469fad11-...` | Team development and CPD progress           |
| **Class Register**              | `collection://d584917e-...` | Training session attendance                 |
| **Initiative**                  | `collection://75d48240-...` | Strategic initiative tracking               |
| **Recruit Process**             | `collection://379ae51d-...` | Hiring pipeline                             |

---

## Second Data Source: Documentation of Plans, Processes and Vision

**Collection:** `collection://311aeb71-0683-805b-a79e-000bb2961375`

A gallery-view database for long-form documentation. Status: Not started / In progress / Done. This is where process documentation, vision documents, and plans are stored in Notion — mirroring the `docs/` folder in the GitHub repo.

---

## How Notion Maps to Platform Features

| Notion Process | Platform Equivalent | Status |
|----------------|--------------------|----|
| Focus view — daily "In Play" items | `apps/platform/workspace` + `apps/hq` dashboard | Notion is current; platform being built |
| Finance Report relations | `apps/hq/growth/revenue` + billing tables | HQ page partially built, hardcoded |
| Customer Relations Report | `apps/admin/leads` + `apps/hq/crm` | Admin has real data; HQ partially built |
| Service Delivery Report | `apps/admin/audits` + `apps/platform/workspace` | Both have real data |
| Class Register | `apps/hq/training` | HQ training pages being built |
| Academic Development Report | `apps/admin/practitioner` + `apps/platform/practitioner` | Both partially built |
| Template system for daily duties | Operations → becomes team task management | Not yet in platform |
| Finance templates (PAYE, VAT) | `apps/hq/people/hr` + future finance module | HQ shells exist |

---

## The Integration Database ID Fields

In the AIC Implementation database, two fields exist specifically for platform integration:

| Field | Purpose |
|-------|---------|
| `Integration Database ID` | Links a Notion record to a platform database table ID |
| `Integration Page ID` | Links a Notion record to a specific platform record |
| `Template URL` | URL of the Notion page this action uses as template |
| `Template Link` | Formula that generates clickable link |

These fields suggest that the original vision was to sync Notion and the platform database bidirectionally. This integration is not yet built — it represents a future development opportunity.

---

## Operational Workflow for New Team Members

When you join AIC and need to understand what's happening operationally:

1. **Start in Notion → AIC Implementation → Focus view** — see what's "In Play" for today
2. **Check the Actions view grouped by Core Process** — understand which areas have active work
3. **For platform work → check GitHub** `main` branch and the `docs/` folder
4. **For client work → `apps/platform`** is the client's source of truth
5. **For pipeline → `apps/admin` → `/leads`** is the CRM
6. **For finances → Notion Finance templates** (the platform equivalent is being built)

---

## Transition Plan: Notion → Platform

The goal is for `apps/hq` to replace the Notion operational command centre. As each HQ section is built with real data (see [[05-FUNCTIONS-TO-BUILD]] P1-5), the equivalent Notion process can be sunsetted.

**Order of transition (suggested):**
1. Revenue velocity chart → build P2-5, then `apps/hq/growth/revenue` replaces Finance Report
2. Pipeline/CRM → build P1-5, then `apps/hq/crm` replaces Customer Relations workflow
3. Incident tracking → `apps/platform/incidents` is already functional
4. Audit workflow → `apps/admin/audits` is already functional
5. Training → `apps/hq/training` being built — will replace Class Register + Academic Report

Notion will remain for:
- Long-form documentation (it's a better writing tool)
- Personal task management (Focus view)
- Meeting notes and async communication
- Finance process templates (until accounting integration is built)

---

*This document is a living reference — update it as the Notion workspace evolves or as platform features replace Notion workflows.*

*See [[05-FUNCTIONS-TO-BUILD]] for the build priorities that drive this transition.*
