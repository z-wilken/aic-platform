'use client';

import { Check, X, AlertTriangle } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import { Eyebrow, SectionCard } from '../components/ui/Eyebrow';

export const dynamic = 'force-dynamic';

const RIGHTS = [
  { label: 'Human Agency', score: 71 },
  { label: 'Explanation',  score: 88 },
  { label: 'Empathy',      score: 54 },
  { label: 'Correction',   score: 79 },
  { label: 'Truth',        score: 95 },
];

const BARS = [
  { month: 'Nov', v: 12400 },
  { month: 'Dec', v: 13100 },
  { month: 'Jan', v: 14200 },
  { month: 'Feb', v: 13800 },
  { month: 'Mar', v: 14900 },
  { month: 'Apr', v: 15421 },
];

const LOG = [
  { id: 'DEC-4821', sys: 'Credit Scoring v2', type: 'Loan Application',  outcome: 'Declined',     reviewed: true,  overridden: false, time: '10:42:11' },
  { id: 'DEC-4820', sys: 'Credit Scoring v2', type: 'Loan Application',  outcome: 'Approved',     reviewed: true,  overridden: false, time: '10:39:04' },
  { id: 'DEC-4819', sys: 'HR Screening',      type: 'Job Application',   outcome: 'Screened Out', reviewed: false, overridden: false, time: '10:35:22' },
  { id: 'DEC-4818', sys: 'Credit Scoring v2', type: 'Loan Application',  outcome: 'Declined',     reviewed: true,  overridden: true,  time: '10:31:58' },
  { id: 'DEC-4817', sys: 'Insurance Risk',    type: 'Risk Assessment',   outcome: 'High Risk',    reviewed: false, overridden: false, time: '10:28:14' },
];

const maxV = Math.max(...BARS.map((b) => b.v));

function scoreColor(v: number) {
  return v >= 80 ? '#16a34a' : v >= 60 ? '#c9920a' : '#dc2626';
}

export default function PulsePage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <Eyebrow>Live Pulse Telemetry</Eyebrow>

        {/* Override rate alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 font-medium leading-relaxed">
            <strong>Override Rate Alert:</strong> Zero human overrides logged in April across 15,421 decisions.
            Explanation required from Accountable Person before May 2.
          </p>
        </div>

        {/* 5 stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { l: 'Decisions (Apr)',   v: '15,421', col: '#0f1f3d' },
            { l: 'Requiring Review',  v: '2,108',  col: '#0f1f3d' },
            { l: 'Reviews Completed', v: '2,108',  col: '#16a34a' },
            { l: 'Override Rate',     v: '0.00%',  col: '#dc2626' },
            { l: 'Dignity Score',     v: '54/100', col: '#dc2626' },
          ].map((s) => (
            <SectionCard key={s.l} className="p-3.5">
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#6b7280] mb-1.5">{s.l}</div>
              <div className="font-mono text-xl font-bold" style={{ color: s.col }}>{s.v}</div>
            </SectionCard>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bar chart — Decision Volume */}
          <SectionCard>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-4">
              Decision Volume — Last 6 Months
            </div>
            <div className="flex items-end gap-2" style={{ height: 120 }}>
              {BARS.map((b, i) => {
                const h = Math.round((b.v / maxV) * 100);
                const isLast = i === BARS.length - 1;
                return (
                  <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`font-mono text-[8px] ${isLast ? 'text-[#c9920a]' : 'text-[#9ca3af]'}`}>
                      {b.v.toLocaleString()}
                    </span>
                    <div className="w-full flex items-end flex-1">
                      <div
                        className="w-full rounded-t-sm transition-all"
                        style={{
                          height: `${h}%`,
                          background: isLast ? '#c9920a' : '#e5e7eb',
                        }}
                      />
                    </div>
                    <span className={`font-mono text-[8px] ${isLast ? 'text-[#c9920a]' : 'text-[#9ca3af]'}`}>
                      {b.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Score breakdown by Right */}
          <SectionCard>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-4">
              Integrity Score — By Right
            </div>
            <div className="space-y-3">
              {RIGHTS.map((r) => {
                const col = scoreColor(r.score);
                return (
                  <div key={r.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-[#0f1f3d]">{r.label}</span>
                      <span className="font-mono text-xs font-bold" style={{ color: col }}>{r.score}</span>
                    </div>
                    <div className="h-1 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${r.score}%`, background: col }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Decision log */}
        <SectionCard>
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-4">
            Recent Decision Log
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  {['Decision ID','System','Type','Outcome','Reviewed','Overridden','Time'].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#9ca3af] pb-2 px-2 first:pl-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOG.map((row) => (
                  <tr key={row.id} className="border-b border-[#f3f4f6]">
                    <td className="py-2.5 px-2 first:pl-0 font-mono text-[10px] font-bold text-[#c9920a]">
                      {row.id}
                    </td>
                    <td className="py-2.5 px-2 text-xs text-[#0f1f3d]">{row.sys}</td>
                    <td className="py-2.5 px-2 text-xs text-[#6b7280]">{row.type}</td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`font-mono text-[9px] font-bold ${
                          row.outcome === 'Approved' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {row.outcome}
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      {row.reviewed
                        ? <Check className="w-3.5 h-3.5 text-green-600" />
                        : <X className="w-3.5 h-3.5 text-red-600" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {row.overridden
                        ? <Check className="w-3.5 h-3.5 text-[#c9920a]" />
                        : <span className="font-mono text-[9px] text-[#9ca3af]">—</span>}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[9px] text-[#9ca3af]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[9px] text-[#9ca3af] text-center">
            Showing 5 of 15,421 decisions this month · Connected via Pulse SDK v2.1
          </p>
        </SectionCard>
      </div>
    </DashboardShell>
  );
}
