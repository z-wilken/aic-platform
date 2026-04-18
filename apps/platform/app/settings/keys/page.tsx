'use client';

import { useState } from 'react';
import { Plus, Copy, Check, ExternalLink, Lock } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import { Eyebrow, SectionCard } from '../../components/ui/Eyebrow';
import { StatusChip } from '../../components/ui/StatusChip';

const PROD_KEY = 'AIC-SDK-PROD-a7f3c9e2-b1d4-4e8a-9c2f-3d6e8f1a2b3c';

const KEYS = [
  { name: 'Pulse SDK — Production', created: 'Apr 1, 2026',  used: 'Today',      status: 'active'  as const },
  { name: 'Pulse SDK — Staging',    created: 'Mar 15, 2026', used: '2 days ago', status: 'active'  as const },
  { name: 'Legacy Integration v1',  created: 'Jan 2, 2026',  used: '60 days ago',status: 'expired' as const },
];

const SYSTEMS = [
  { name: 'Credit Scoring v2', status: 'active'  as const },
  { name: 'HR Screening',      status: 'active'  as const },
  { name: 'Insurance Risk',    status: 'partial' as const },
];

const SECURITY_RULES = [
  'Keys are scoped to your organisation only',
  'Rotate keys immediately if compromised',
  'Never expose keys in client-side code',
  'Keys can be revoked instantly from this panel',
];

const SDK_SNIPPET = `{
  "decision_id":           "unique-id",
  "system_name":           "credit-scoring-v2",
  "decision_type":         "loan-approval",
  "outcome":               "declined",
  "affected_person_ref":   "anonymised-hash",
  "timestamp":             "2026-04-19T10:00:00Z",
  "human_review_required":  true,
  "human_review_completed": false,
  "human_reviewer_id":     null,
  "override_applied":      false,
  "correction_requested":  false
}`;

export default function KeysPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(SDK_SNIPPET).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <Eyebrow>API & Access Keys</Eyebrow>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">
          {/* Left */}
          <div className="space-y-4">
            {/* Keys table */}
            <SectionCard>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-4">
                Active Keys
              </div>
              <div className="border border-[#e5e7eb] rounded-xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_100px_100px_110px] px-4 py-2.5 bg-[#f9fafb] border-b border-[#e5e7eb]">
                  {['Key / Name', 'Created', 'Last Used', 'Status'].map((h) => (
                    <span key={h} className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#9ca3af]">{h}</span>
                  ))}
                </div>
                {KEYS.map((k) => (
                  <div
                    key={k.name}
                    className="grid grid-cols-[1fr_100px_100px_110px] px-4 py-3 border-b border-[#f3f4f6] last:border-0 items-center"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#0f1f3d] mb-0.5">{k.name}</div>
                      <div className="font-mono text-[9px] text-[#9ca3af]">
                        {k.status === 'active' ? `••••••••••••${PROD_KEY.slice(-6)}` : 'Revoked'}
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-[#9ca3af]">{k.created}</span>
                    <span className="font-mono text-[9px] text-[#9ca3af]">{k.used}</span>
                    <StatusChip status={k.status} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="inline-flex items-center gap-2 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-4 py-2 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Generate New Key
                </button>
              </div>
            </SectionCard>

            {/* SDK snippet */}
            <SectionCard>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
                Pulse SDK — Minimum Viable Event
              </div>
              <div className="bg-[#0a1628] rounded-xl p-4 overflow-x-auto mb-3">
                <pre className="font-mono text-xs text-white/80 leading-relaxed m-0">{SDK_SNIPPET}</pre>
              </div>
              <div className="flex gap-2.5">
                <button className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-4 py-2 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                  <ExternalLink className="w-3 h-3" /> SDK Documentation
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-4 py-2 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy Schema'}
                </button>
              </div>
            </SectionCard>
          </div>

          {/* Right rail */}
          <div className="space-y-3">
            <SectionCard className="p-4">
              <Lock className="w-5 h-5 text-[#c9920a] mb-2.5" />
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
                Key Security
              </div>
              <div className="space-y-2">
                {SECURITY_RULES.map((r) => (
                  <div key={r} className="flex gap-2 items-start">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#6b7280] leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard className="p-4">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
                Integration Status
              </div>
              <div className="divide-y divide-[#f3f4f6]">
                {SYSTEMS.map((s) => (
                  <div key={s.name} className="flex justify-between items-center py-2">
                    <span className="text-xs text-[#0f1f3d]">{s.name}</span>
                    <StatusChip status={s.status} />
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
