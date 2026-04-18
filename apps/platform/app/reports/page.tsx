'use client';

import { Eye, Download, Info } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import { Eyebrow, SectionCard, CopperTag } from '../components/ui/Eyebrow';
import { ScoreRing } from '../components/ui/ScoreRing';

const REPORTS = [
  { month: 'April 2026',    score: 77, change: -4, flags: ['Zero override rate (Apr)', 'Dignity score 54/100'], current: true  },
  { month: 'March 2026',    score: 81, change: +2, flags: ['Correction pipeline SLA met'],                      current: false },
  { month: 'February 2026', score: 79, change: +4, flags: ['Empathy score improving'],                          current: false },
  { month: 'January 2026',  score: 75, change:  0, flags: ['Baseline assessment'],                              current: false },
];

export default function ReportsPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <Eyebrow>Monthly Compliance Reports</Eyebrow>

        {/* Info banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2.5 items-start">
          <Info className="w-4 h-4 text-[#c9920a] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#0f1f3d] leading-relaxed">
            Monthly reports (DOC-023) are auto-generated from Pulse telemetry on the 1st of each month. They are
            part of the continuous governance evidence chain required for certification maintenance.
          </p>
        </div>

        {/* Report list */}
        <div className="space-y-3">
          {REPORTS.map((r) => {
            const chgCol = r.change > 0 ? '#16a34a' : r.change < 0 ? '#dc2626' : '#6b7280';
            const chgLabel = r.change > 0 ? `↑ +${r.change}` : r.change < 0 ? `↓ ${r.change}` : '—';
            return (
              <SectionCard key={r.month} className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0">
                  <ScoreRing value={r.score} size={52} thickness={4} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-serif text-sm font-bold text-[#0f1f3d]">{r.month}</span>
                    {r.current && <CopperTag>Current</CopperTag>}
                    <span className="font-mono text-[9px] font-bold" style={{ color: chgCol }}>{chgLabel} pts</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {r.flags.map((f) => (
                      <span
                        key={f}
                        className="font-mono text-[8px] text-[#9ca3af] bg-[#f9fafb] border border-[#e5e7eb] rounded px-2 py-0.5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-3 py-1.5 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                    <Eye className="w-3 h-3" /> View
                  </button>
                  <button className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-3 py-1.5 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>
              </SectionCard>
            );
          })}
        </div>

        {/* Footer note */}
        <SectionCard className="bg-[#f9fafb] p-4">
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">
            Report Frequency
          </div>
          <p className="text-xs text-[#6b7280] leading-relaxed">
            Generated automatically on the 1st of each month from Pulse telemetry. If Pulse integration is inactive,
            reports are generated from manually submitted evidence. Certificate renewal is conditional on all 12
            monthly reports being present.
          </p>
        </SectionCard>
      </div>
    </DashboardShell>
  );
}
