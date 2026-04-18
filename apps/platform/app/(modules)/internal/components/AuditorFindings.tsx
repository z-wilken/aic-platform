'use client';

import { Upload, Clock } from 'lucide-react';
import { Eyebrow, SectionCard, CopperTag } from '@/app/components/ui/Eyebrow';
import { StatusChip } from '@/app/components/ui/StatusChip';
import { UploadModal } from '@/app/components/ui/UploadModal';
import { useState } from 'react';

type Severity = 'critical' | 'significant';
type FindingStatus = 'open' | 'partial';

interface Finding {
  id: string;
  severity: Severity;
  right: string;
  title: string;
  found: string;
  needed: string;
  deadline: string;
  status: FindingStatus;
}

const FINDINGS: Finding[] = [
  {
    id: 'CF-01', severity: 'critical', right: 'Right 1 — Human Agency',
    title: 'Override Rate Evidence (Q2)',
    found: 'Zero override events logged in April (15,421 decisions). Evidence submitted consists of Q1 override records only. Q2 evidence meets Tier D — no operational data supplied.',
    needed: 'Written explanation from the Accountable Person + Pulse decision log data (Tier A) showing override events, or a formal attestation explaining why zero overrides occurred.',
    deadline: 'May 2, 2026', status: 'open',
  },
  {
    id: 'CF-02', severity: 'critical', right: 'Right 3 — Empathy',
    title: 'Decline Letter Templates — Below Dignity Threshold',
    found: '20 decline letter samples scored an aggregate dignity score of 54/100 — below the 60-point certification threshold. Failures: no next-steps, legal-first structure, no appeal reference.',
    needed: 'Revised decline letter templates scoring ≥ 60 on the AIC Empathy Engine rubric. Must include: plain-language reason, clear right of appeal, and a human contact name.',
    deadline: 'May 2, 2026', status: 'open',
  },
  {
    id: 'CF-03', severity: 'critical', right: 'Right 1 — Human Agency',
    title: 'Tier 1 Decision SLA Policy — Not Submitted',
    found: 'No SLA policy document was submitted for Tier 1 decisions (those requiring 100% human review). This is a mandatory requirement for Division 2 certification.',
    needed: 'A board-approved or executive-signed SLA policy specifying the maximum time from AI recommendation to human decision for Tier 1 decisions. Acceptable tier: C or above.',
    deadline: 'May 2, 2026', status: 'open',
  },
  {
    id: 'SF-01', severity: 'significant', right: 'Right 4 — Correction',
    title: 'Appeal Mechanism — Missing Tier 1 Escalation Path',
    found: 'The appeal mechanism documentation does not describe an escalation path for Tier 1 decisions. The general correction pipeline is documented but does not cover decisions requiring 100% human oversight.',
    needed: 'Amended appeal mechanism documentation specifying the escalation path for Tier 1 decisions, including who receives the escalation and what the SLA is.',
    deadline: 'May 2, 2026', status: 'open',
  },
  {
    id: 'SF-02', severity: 'significant', right: 'Right 1 — Human Agency',
    title: 'Accountable Person RACI — Partial',
    found: 'RACI submitted but has not yet been assigned a confirmed tier by the auditor. The document requires minor revision before Tier C can be confirmed.',
    needed: 'Clarify which named individuals hold each RACI role and confirm the Accountable Person has authority to override AI decisions directly, not just escalate.',
    deadline: 'May 2, 2026', status: 'partial',
  },
];

const SEV_STYLES: Record<Severity, { border: string; bg: string; color: string }> = {
  critical:    { border: '#dc2626', bg: 'rgba(239,68,68,.08)',  color: '#dc2626' },
  significant: { border: '#b45309', bg: 'rgba(245,158,11,.08)', color: '#b45309' },
};

export default function AuditorFindings() {
  const [uploadLabel, setUploadLabel] = useState<string | null>(null);

  const critical    = FINDINGS.filter((f) => f.severity === 'critical').length;
  const significant = FINDINGS.filter((f) => f.severity === 'significant').length;

  return (
    <>
      {uploadLabel && <UploadModal label={uploadLabel} onClose={() => setUploadLabel(null)} />}

      <div className="space-y-5">
        <Eyebrow>Auditor Findings</Eyebrow>

        {/* Summary bar */}
        <div className="flex flex-wrap gap-3 items-center">
          {[
            { label: 'Critical Findings',    count: critical,    color: '#dc2626', bg: 'rgba(239,68,68,.08)' },
            { label: 'Significant Findings', count: significant, color: '#b45309', bg: 'rgba(245,158,11,.08)' },
            { label: 'Observations',         count: 0,           color: '#6b7280', bg: 'rgba(107,114,128,.08)' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border"
              style={{ background: s.bg, borderColor: `${s.color}30` }}
            >
              <span className="font-mono text-xl font-bold" style={{ color: s.color }}>{s.count}</span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: s.color }}>
                {s.label}
              </span>
            </div>
          ))}
          <div className="ml-auto bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
            <span className="font-mono text-[9px] font-bold text-amber-700 uppercase tracking-[0.1em]">
              Remediation Deadline: May 2, 2026
            </span>
          </div>
        </div>

        {/* Findings list */}
        <div className="space-y-3">
          {FINDINGS.map((f) => {
            const s = SEV_STYLES[f.severity];
            return (
              <div
                key={f.id}
                className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-[0_1px_3px_rgba(10,22,40,0.05)]"
                style={{ borderLeft: `3px solid ${s.border}` }}
              >
                {/* Finding header */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span
                    className="font-mono text-[9px] font-bold px-2 py-1 rounded"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {f.id}
                  </span>
                  <StatusChip status={f.severity} />
                  <span className="font-mono text-[9px] text-[#9ca3af]">{f.right}</span>
                  <div className="ml-auto">
                    <StatusChip status={f.status === 'partial' ? 'partial' : 'flagged'} />
                  </div>
                </div>

                <h3 className="font-serif text-sm font-bold text-[#0f1f3d] mb-4">{f.title}</h3>

                {/* Two-col detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <div className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#9ca3af] mb-2">
                      What AIC Found
                    </div>
                    <p className="text-xs text-[#0f1f3d] leading-relaxed">{f.found}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#9ca3af] mb-2">
                      What Is Needed
                    </div>
                    <p className="text-xs text-[#0f1f3d] leading-relaxed">{f.needed}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#f3f4f6]">
                  <Clock className="w-3.5 h-3.5 text-[#9ca3af]" />
                  <span className="font-mono text-[9px] text-[#9ca3af]">Deadline: {f.deadline}</span>
                  <div className="ml-auto flex gap-2">
                    <button className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-3 py-1.5 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                      Request Extension
                    </button>
                    <button
                      onClick={() => setUploadLabel(f.title)}
                      className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold bg-[#c9920a] text-white rounded-full px-3 py-1.5 hover:bg-[#b07d08] transition-colors"
                    >
                      <Upload className="w-3 h-3" /> Submit Remediation
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
