'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShieldCheck,
  Activity,
  AlertTriangle,
  FileCheck,
  MessageSquare,
  Award,
  GraduationCap,
  Key,
  Building2,
} from 'lucide-react';

/* ── Nav structure matching the design's mental map ─────────────── */
const NAV_GROUPS = [
  {
    section: 'My Certification',
    items: [
      { label: 'Dashboard',          href: '/',               icon: LayoutDashboard },
      { label: 'Evidence Vault',     href: '/evidence',       icon: ShieldCheck, badge: null },
      { label: 'Pulse Monitor',      href: '/pulse',          icon: Activity },
    ],
  },
  {
    section: 'Review & Findings',
    items: [
      { label: 'Auditor Findings',   href: '/findings',       icon: AlertTriangle, badge: 3 },
      { label: 'Compliance Reports', href: '/reports',        icon: FileCheck },
      { label: 'Correspondence',     href: '/correspondence', icon: MessageSquare, dot: true },
    ],
  },
  {
    section: 'Certification',
    items: [
      { label: 'My Certificate',     href: '/certificate',   icon: Award },
      { label: 'Practitioner (CAAP)',href: '/practitioner',  icon: GraduationCap },
    ],
  },
  {
    section: 'Account',
    items: [
      { label: 'API & Access Keys',  href: '/settings/keys', icon: Key },
      { label: 'Organisation Profile', href: '/organisation', icon: Building2 },
    ],
  },
];

/* ── Brand mark SVG (from design) ───────────────────────────────── */
function BrandMark() {
  return (
    <svg viewBox="0 0 110 180" className="h-10 w-auto">
      <path d="M36,1 L1,1 L1,179 L36,179"   fill="none" stroke="#0f1f3d" strokeWidth="2.5" strokeLinecap="square"/>
      <path d="M74,1 L109,1 L109,179 L74,179" fill="none" stroke="#0f1f3d" strokeWidth="2.5" strokeLinecap="square"/>
      <text x="55" y="20"  fontSize="7"  fill="#0f1f3d" textAnchor="middle" letterSpacing="2.5" fontFamily="Space Grotesk,sans-serif" fontWeight="700">METHODOLOGY</text>
      <text x="55" y="31"  fontSize="7"  fill="#0f1f3d" textAnchor="middle" letterSpacing="2.5" fontFamily="Space Grotesk,sans-serif" fontWeight="700">ASSESSED</text>
      <line x1="8" y1="41" x2="102" y2="41" stroke="#0f1f3d" strokeWidth="1" opacity="0.2"/>
      <text x="55" y="100" fontSize="40" fontWeight="700" fill="#0f1f3d" textAnchor="middle" letterSpacing="5" fontFamily="Space Grotesk,sans-serif">AIC</text>
      <line x1="8" y1="122" x2="102" y2="122" stroke="#0f1f3d" strokeWidth="1" opacity="0.2"/>
      <text x="55" y="148" fontSize="5" fill="#c9920a" textAnchor="middle" letterSpacing="1.5" fontFamily="Space Grotesk,sans-serif" fontWeight="700">AICCERTIFIED.CLOUD</text>
    </svg>
  );
}

export function DashboardSidebar({
  show,
  onClose,
  isActive,
}: {
  show: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <motion.div
      className={`w-64 bg-white border-r border-[#e5e7eb] text-[#0f1f3d] p-5 flex flex-col fixed h-full z-40 transition-transform duration-300 md:translate-x-0 ${
        show ? 'translate-x-0' : '-translate-x-full md:flex'
      }`}
      initial={false}
    >
      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center mb-8 px-2">
        <Link href="/" className="flex items-center gap-3 group">
          <BrandMark />
        </Link>
        <button
          onClick={onClose}
          className="md:hidden text-[#6b7280] hover:text-[#0f1f3d] p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.section}>
            {/* Section label */}
            <div className="text-[9px] font-mono font-bold text-[#6b7280]/60 uppercase tracking-[0.3em] mb-2 px-3">
              {group.section}
            </div>
            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium transition-all relative ${
                      active
                        ? 'bg-[#f0f4f8] text-[#0f1f3d] font-semibold'
                        : 'text-[#6b7280] hover:bg-[#f0f4f8] hover:text-[#0f1f3d]'
                    }`}
                  >
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#c9920a] rounded-r" />
                    )}
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        active ? 'text-[#c9920a]' : 'text-[#6b7280]/60 group-hover:text-[#6b7280]'
                      }`}
                    />
                    <span className="flex-1">{item.label}</span>
                    {/* Badge */}
                    {'badge' in item && item.badge != null && (
                      <span className="ml-auto bg-red-50 text-red-600 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                    {/* Unread dot */}
                    {'dot' in item && item.dot && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#c9920a]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* ── Status bar ───────────────────────────────────────────── */}
      <div className="mt-auto pt-5 border-t border-[#e5e7eb]">
        <div className="p-3 rounded-lg bg-[#f0f4f8] border border-[#e5e7eb] flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#c9920a] animate-pulse flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest">Certification Status</p>
            <span className="text-[10px] font-bold text-[#0f1f3d] uppercase tracking-wide truncate">Phase 2 Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
