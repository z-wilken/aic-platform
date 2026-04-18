'use client';

import { useState } from 'react';
import { Download, ExternalLink, Copy, Check } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import { Eyebrow, SectionCard } from '../components/ui/Eyebrow';

const CERT_NUM = 'AIC-2026-MFG-001';

function BrandMark({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 110 180" style={{ height: size, width: 'auto', flexShrink: 0 }}>
      <path d="M36,1 L1,1 L1,179 L36,179" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="square"/>
      <path d="M74,1 L109,1 L109,179 L74,179" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="square"/>
      <text x="55" y="20" fontSize="7" fill="#fff" textAnchor="middle" letterSpacing="2.5" fontFamily="Space Grotesk,sans-serif" fontWeight="700">METHODOLOGY</text>
      <text x="55" y="31" fontSize="7" fill="#fff" textAnchor="middle" letterSpacing="2.5" fontFamily="Space Grotesk,sans-serif" fontWeight="700">ASSESSED</text>
      <line x1="8" y1="41" x2="102" y2="41" stroke="#fff" strokeWidth="1" opacity="0.3"/>
      <text x="55" y="100" fontSize="40" fontWeight="700" fill="#fff" textAnchor="middle" letterSpacing="5" fontFamily="Space Grotesk,sans-serif">AIC</text>
      <line x1="8" y1="122" x2="102" y2="122" stroke="#fff" strokeWidth="1" opacity="0.3"/>
      <text x="55" y="148" fontSize="5" fill="#c9920a" textAnchor="middle" letterSpacing="1.5" fontFamily="Space Grotesk,sans-serif" fontWeight="700">AICCERTIFIED.CLOUD</text>
    </svg>
  );
}

const CERT_FIELDS = [
  { k: 'Division',            v: 'Division 2 — Supervised'   },
  { k: 'Certification Status',v: 'Certified — Provisional'   },
  { k: 'Accountable Person',  v: 'Dr. Sarah Chen, CRO'       },
  { k: 'Certificate No.',     v: CERT_NUM                    },
  { k: 'Date of Issue',       v: 'Apr 12, 2026'              },
  { k: 'Date of Expiry',      v: 'Apr 12, 2027'              },
];

const PERMITTED = [
  'Organisation website (homepage)',
  'Email signatures — Accountable Person',
  'RFP and tender responses',
  'Annual reports and ESG disclosures',
  `Must link to: aiccertified.cloud/registry/${CERT_NUM}`,
];

export default function CertificatePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(CERT_NUM).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <Eyebrow>My Certificate</Eyebrow>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">
          {/* Certificate card */}
          <SectionCard className="p-0 overflow-hidden">
            {/* Dark header */}
            <div className="bg-[#0a1628] px-8 py-8 flex gap-6 items-center">
              <BrandMark size={72} />
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#c9920a] mb-2">
                  Certificate of AI Accountability
                </div>
                <h2 className="font-serif text-xl font-bold text-white leading-snug mb-1">
                  Meridian Financial Group
                </h2>
                <div className="font-mono text-[10px] text-white/50 tracking-[0.1em]">Reg. 2024/102938/07</div>
              </div>
              <div className="ml-auto text-right flex-shrink-0">
                <div className="font-mono text-3xl font-bold text-[#c9920a] leading-none">77</div>
                <div className="font-mono text-[9px] text-white/40 tracking-[0.15em] mt-1">INTEGRITY SCORE</div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              {/* 3×2 grid of cert fields */}
              <div className="grid grid-cols-3 border border-[#e5e7eb] rounded-xl overflow-hidden mb-5">
                {CERT_FIELDS.map((r, i) => (
                  <div
                    key={r.k}
                    className="p-3"
                    style={{
                      borderRight:   i % 3 !== 2 ? '1px solid #e5e7eb' : undefined,
                      borderBottom:  i < 3       ? '1px solid #e5e7eb' : undefined,
                    }}
                  >
                    <div className="font-mono text-[8px] text-[#9ca3af] uppercase tracking-[0.1em] mb-1">{r.k}</div>
                    <div className="text-xs font-semibold text-[#0f1f3d]">{r.v}</div>
                  </div>
                ))}
              </div>

              {/* Provisional notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5">
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Provisional Status:</strong> Certification is active but 3 Critical findings remain open.
                  Full "Certified — Active" status requires all Critical findings to be resolved. The certificate
                  remains valid while you are within the remediation window.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2.5">
                <button className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] bg-[#c9920a] text-white rounded-full px-5 py-2.5 hover:bg-[#b07d08] transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
                <button className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-5 py-2.5 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Public Registry
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-5 py-2.5 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Cert No.'}
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Trust mark rail */}
          <div className="space-y-3">
            <SectionCard className="p-5 text-center">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
                AIC Trust Mark
              </div>
              <div className="bg-[#0a1628] rounded-xl p-5 inline-block mb-3">
                <BrandMark size={60} />
              </div>
              <p className="text-xs text-[#6b7280] leading-relaxed mb-3">
                Display on your website, RFP responses, and annual reports. Must include certificate number and
                link to public registry.
              </p>
              <button className="w-full inline-flex items-center justify-center gap-2 font-mono text-[10px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full py-2.5 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
                <Download className="w-3.5 h-3.5" /> Download SVG
              </button>
            </SectionCard>

            <SectionCard className="p-4">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-3">
                Permitted Usage
              </div>
              <div className="space-y-2">
                {PERMITTED.map((r) => (
                  <div key={r} className="flex gap-2 items-start">
                    <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#6b7280] leading-relaxed">{r}</span>
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
