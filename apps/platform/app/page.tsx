'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, CheckCircle2, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import DashboardShell from './components/DashboardShell';
import { Eyebrow, SectionCard, CopperTag } from './components/ui/Eyebrow';
import { ScoreRing } from './components/ui/ScoreRing';
import { UploadModal } from './components/ui/UploadModal';

const RIGHTS = [
  { id: 1, tag: 'RIGHT 01', label: 'Human Agency', score: 71, flagged: 1 },
  { id: 2, tag: 'RIGHT 02', label: 'Explanation',  score: 88, flagged: 0 },
  { id: 3, tag: 'RIGHT 03', label: 'Empathy',      score: 54, flagged: 1 },
  { id: 4, tag: 'RIGHT 04', label: 'Correction',   score: 79, flagged: 0 },
  { id: 5, tag: 'RIGHT 05', label: 'Truth',        score: 95, flagged: 0 },
];

const MSGS = [
  {
    id: 1, initials: 'AIC', author: 'System Auditor', time: '2 hours ago',
    text: 'Right 3 (Empathy): the batch of 20 decline letters scored 54/100 — below the certification threshold of 60. Please submit revised templates with a clear next-steps section and plain-language appeal instruction before the remediation deadline.',
  },
  {
    id: 2, initials: 'AIC', author: 'System Auditor', time: 'Yesterday',
    text: 'Right 1 (Human Agency): zero override events logged in April across 15,421 decisions. Please provide a written explanation from the Accountable Person before we classify this as a Critical Finding.',
  },
];

const ACTIONS = [
  { label: 'Remediation deadline', date: 'May 2, 2026',  urgent: true  },
  { label: 'Walk-Me-Through call', date: 'May 8, 2026',  urgent: false },
  { label: 'Auditor review begins',date: 'May 12, 2026', urgent: false },
  { label: 'Certificate renewal',  date: 'Apr 12, 2027', urgent: false },
];

function scoreColor(v: number) {
  return v >= 80 ? '#16a34a' : v >= 60 ? '#c9920a' : '#dc2626';
}

const MET = 8;
const TOT = 13;
const OVERALL = Math.round(RIGHTS.reduce((a, r) => a + r.score, 0) / RIGHTS.length);
const FLAGGED = RIGHTS.reduce((a, r) => a + r.flagged, 0);

export default function DashboardPage() {
  const [upload, setUpload] = useState<string | null>(null);

  return (
    <DashboardShell>
      {upload && <UploadModal label={upload} onClose={() => setUpload(null)} />}

      <div>
        <Eyebrow>Certification Overview</Eyebrow>

        {/* 4 stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Integrity Score',    value: `${OVERALL}/100`,           sub: 'Provisional Pass',    icon: Shield,        color: '#c9920a' },
            { label: 'Evidence Met',       value: `${MET}/${TOT}`,            sub: `${Math.round(MET/TOT*100)}% complete`, icon: CheckCircle2, color: '#16a34a' },
            { label: 'Critical Flags',     value: String(FLAGGED),            sub: 'Require resolution',  icon: AlertTriangle, color: '#dc2626' },
            { label: 'Days to Deadline',   value: '14',                       sub: 'Evidence submission', icon: FileText,      color: '#b45309' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <SectionCard key={s.label} className="p-4">
                <div className="flex justify-between items-start mb-2.5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
                    {s.label}
                  </span>
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }} />
                </div>
                <div
                  className="font-mono text-2xl font-bold leading-none mb-1"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-[#6b7280]">{s.sub}</div>
              </SectionCard>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          {/* Left column */}
          <div className="space-y-4">
            {/* Evidence by Algorithmic Right */}
            <SectionCard>
              <div className="flex justify-between items-center mb-3.5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                  Evidence by Algorithmic Right
                </span>
                <Link
                  href="/evidence"
                  className="font-mono text-[9px] font-bold text-[#c9920a] flex items-center gap-1 hover:underline"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {RIGHTS.map((r) => {
                const col = scoreColor(r.score);
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 py-2.5 border-b border-[#f3f4f6] last:border-0"
                  >
                    <CopperTag>{r.tag}</CopperTag>
                    <span className="flex-1 text-xs font-semibold text-[#0f1f3d]">{r.label}</span>
                    {r.flagged > 0 && (
                      <span className="font-mono text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        {r.flagged} FLAGGED
                      </span>
                    )}
                    <div className="w-20 h-1 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${r.score}%`, background: col }}
                      />
                    </div>
                    <span
                      className="font-mono text-[10px] font-bold w-7 text-right"
                      style={{ color: col }}
                    >
                      {r.score}
                    </span>
                  </div>
                );
              })}
            </SectionCard>

            {/* Recent Correspondence */}
            <SectionCard>
              <div className="flex justify-between items-center mb-3.5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                  Recent Correspondence
                </span>
                <Link
                  href="/correspondence"
                  className="font-mono text-[9px] font-bold text-[#c9920a] flex items-center gap-1 hover:underline"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {MSGS.map((m) => (
                <div key={m.id} className="flex gap-2.5 py-3 border-b border-[#f3f4f6] last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-[#0f1f3d] flex items-center justify-center font-mono text-[8px] font-bold text-[#c9920a] flex-shrink-0">
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-semibold text-[#0f1f3d]">{m.author}</span>
                      <span className="font-mono text-[8px] text-[#9ca3af]">{m.time}</span>
                    </div>
                    <p className="text-xs text-[#6b7280] leading-relaxed line-clamp-2">{m.text}</p>
                  </div>
                </div>
              ))}
            </SectionCard>
          </div>

          {/* Right rail */}
          <div className="space-y-3">
            {/* Score ring card */}
            <SectionCard className="text-center p-6">
              <div className="flex justify-center mb-3.5">
                <ScoreRing value={OVERALL} size={100} thickness={6} />
              </div>
              <div className="font-serif text-sm font-bold text-[#0f1f3d] mb-1.5">Provisional Pass</div>
              <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
                Right 3 (Empathy) is the primary risk to full certification.
              </p>
              <button
                onClick={() => setUpload('All Outstanding Evidence')}
                className="w-full inline-flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] bg-[#c9920a] text-white rounded-full py-2.5 hover:bg-[#b07d08] transition-colors"
              >
                Submit Evidence <ArrowRight className="w-3 h-3" />
              </button>
            </SectionCard>

            {/* Upcoming actions */}
            <SectionCard className="p-4">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
                Upcoming Actions
              </div>
              {ACTIONS.map((a) => (
                <div
                  key={a.label}
                  className="flex justify-between items-center py-1.5 border-b border-[#f3f4f6] last:border-0"
                >
                  <span
                    className={`text-xs ${a.urgent ? 'font-semibold text-red-600' : 'text-[#0f1f3d]'}`}
                  >
                    {a.label}
                  </span>
                  <span
                    className={`font-mono text-[9px] ${a.urgent ? 'font-bold text-red-600' : 'text-[#9ca3af]'}`}
                  >
                    {a.date}
                  </span>
                </div>
              ))}
            </SectionCard>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
