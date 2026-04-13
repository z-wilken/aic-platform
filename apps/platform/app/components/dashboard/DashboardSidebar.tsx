import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layout,
  GraduationCap,
  Globe,
  Activity,
  ShieldCheck,
  ScrollText,
  Key,
  FileCheck,
  LayoutDashboard,
  Server,
} from 'lucide-react';
import { AICLogo } from '../../../../web/app/components/AICLogo';

const navItems = [
  { label: 'Overview',          href: '/',               section: 'Command',      icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Workspace',         href: '/workspace',       section: 'Governance',   icon: <Layout className="w-4 h-4" /> },
  { label: 'Practitioner',      href: '/practitioner',    section: 'Governance',   icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Global Index',      href: '/leaderboard',     section: 'Governance',   icon: <Globe className="w-4 h-4" /> },
  { label: 'Pulse Telemetry',   href: '/pulse',           section: 'Monitoring',   icon: <Activity className="w-4 h-4" /> },
  { label: 'Audit Logs',        href: '/audits',          section: 'Monitoring',   icon: <ScrollText className="w-4 h-4" /> },
  { label: 'Compliance Reports',href: '/reports',         section: 'Monitoring',   icon: <FileCheck className="w-4 h-4" /> },
  {
    label: 'Roadmap', href: '/roadmap', section: 'Certification',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  },
  {
    label: 'Incidents', href: '/incidents', section: 'Certification',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  },
  { label: 'Access Control',    href: '/settings/keys',  section: 'Admin',        icon: <Key className="w-4 h-4" /> },
  { label: 'Certificate',       href: '/certificate',    section: 'Certification', icon: <ShieldCheck className="w-4 h-4" /> },
];

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
      className={`w-72 bg-aic-navy border-r border-aic-paper/6 text-aic-paper p-6 flex flex-col fixed h-full z-40 transition-transform duration-300 md:translate-x-0 ${show ? 'translate-x-0' : '-translate-x-full md:flex'}`}
      initial={false}
    >
      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center mb-10 px-2">
        <Link href="/" className="flex items-center gap-3 group">
          <AICLogo variant="full" scheme="dark" size="sm" className="group-hover:opacity-80 transition-opacity" />
        </Link>
        <button onClick={onClose} className="md:hidden text-aic-paper/30 hover:text-aic-paper">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <div className="space-y-7 flex-1 overflow-y-auto pr-2">
        {['Command', 'Governance', 'Monitoring', 'Certification', 'Admin'].map((section) => (
          <div key={section}>
            <div className="text-[9px] font-mono text-aic-paper/20 uppercase tracking-widest mb-3 px-3">
              {section}
            </div>
            <nav className="space-y-0.5">
              {navItems
                .filter((i) => i.section === section)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded font-sans text-xs font-medium transition-all group relative overflow-hidden ${
                      isActive(item.href)
                        ? 'text-aic-paper bg-aic-paper/5 border border-aic-paper/6'
                        : 'text-aic-paper/35 hover:text-aic-paper hover:bg-aic-paper/4'
                    }`}
                  >
                    {isActive(item.href) && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-aic-copper" />
                    )}
                    <span
                      className={
                        isActive(item.href)
                          ? 'text-aic-copper'
                          : 'text-aic-paper/25 group-hover:text-aic-paper/50'
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>
        ))}
      </div>

      {/* ── Status bar ───────────────────────────────────────────── */}
      <div className="mt-auto pt-6 border-t border-aic-paper/5">
        <div className="p-3 rounded bg-aic-paper/3 border border-aic-paper/5 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-aic-copper animate-pulse" />
          <div className="flex-1">
            <p className="text-[9px] text-aic-paper/30 font-mono uppercase tracking-widest">Network Status</p>
            <span className="text-[10px] font-bold text-aic-paper uppercase tracking-wide">Secure Link</span>
          </div>
          <Server className="w-3 h-3 text-aic-paper/20" />
        </div>
      </div>
    </motion.div>
  );
}
