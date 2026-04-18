'use client';

import { useState } from 'react';
import { Send, Info, Check } from 'lucide-react';
import { Eyebrow, SectionCard } from '@/app/components/ui/Eyebrow';
import { StatusChip } from '@/app/components/ui/StatusChip';

const MSGS = [
  {
    id: 1, author: 'System Auditor', initials: 'AIC', time: '2 hours ago', unread: true,
    text: 'Right 3 (Empathy): the batch of 20 decline letters scored 54/100 — below the certification threshold of 60. Please submit revised templates with a clear next-steps section and plain-language appeal instruction before the remediation deadline.',
  },
  {
    id: 2, author: 'System Auditor', initials: 'AIC', time: 'Yesterday', unread: false,
    text: 'Right 1 (Human Agency): zero override events logged in April across 15,421 decisions. Please provide a written explanation from the Accountable Person before we classify this as a Critical Finding.',
  },
  {
    id: 3, author: 'System Auditor', initials: 'AIC', time: '3 days ago', unread: false,
    text: 'Evidence receipt confirmed (DOC-011): SHAP Feature Importance Report received and logged. Tier A classification applied. This satisfies requirement EX-1 in full.',
  },
];

const RULES = [
  'All correspondence is logged and forms part of the audit record (DOC-015)',
  'Do not share personal information of affected individuals in messages',
  'Remediation evidence must be uploaded via Evidence Vault, not sent in messages',
];

export default function Correspondence() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5 items-start">
      {/* Main thread */}
      <div className="space-y-4">
        <Eyebrow>Auditor Correspondence</Eyebrow>

        {/* Thread */}
        <SectionCard>
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              Thread — AIC-2026-MFG-001
            </span>
            <StatusChip status="partial" />
          </div>

          <div className="divide-y divide-[#f3f4f6]">
            {MSGS.map((m) => (
              <div key={m.id} className="flex gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#f0f4f8] flex items-center justify-center font-mono text-[9px] font-bold text-[#c9920a] flex-shrink-0">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-[#0f1f3d]">{m.author}</span>
                    <div className="flex items-center gap-2">
                      {m.unread && (
                        <span className="font-mono text-[8px] font-bold text-[#c9920a] bg-amber-50 px-1.5 py-0.5 rounded">
                          UNREAD
                        </span>
                      )}
                      <span className="font-mono text-[8px] text-[#9ca3af]">{m.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6b7280] leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {sent && (
            <div className="mt-3 px-3 py-2.5 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-green-700 font-medium">Message sent to your auditor.</span>
            </div>
          )}
        </SectionCard>

        {/* Compose */}
        <SectionCard>
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
            Reply to Auditor
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message…"
            className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-[#0f1f3d] text-xs px-3 py-2.5 resize-y min-h-[96px] outline-none leading-relaxed focus:border-[#c9920a] transition-colors placeholder:text-[#9ca3af]"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] bg-[#c9920a] text-white rounded-full px-5 py-2.5 hover:bg-[#b07d08] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3 h-3" /> Send Message
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Info rail */}
      <div className="space-y-4">
        <SectionCard className="p-4">
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
            Your Auditor
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] flex items-center justify-center font-mono text-xs font-bold text-[#c9920a] flex-shrink-0">
              AIC
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0f1f3d]">System Auditor</div>
              <div className="font-mono text-[9px] text-[#c9920a]">AI Integrity Certification</div>
            </div>
          </div>
          <p className="text-xs text-[#6b7280] leading-relaxed mb-3">
            Your assigned auditor will respond within 2 business days. For urgent matters, email your account manager directly.
          </p>
          <div className="font-mono text-[8px] text-[#9ca3af] tracking-wide">REF: AIC-2026-MFG-001</div>
        </SectionCard>

        <SectionCard className="p-4">
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
            Communication Rules
          </div>
          <div className="space-y-3">
            {RULES.map((rule) => (
              <div key={rule} className="flex gap-2 items-start">
                <Info className="w-3.5 h-3.5 text-[#c9920a] flex-shrink-0 mt-0.5" />
                <span className="text-xs text-[#6b7280] leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
