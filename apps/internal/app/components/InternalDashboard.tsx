'use client';

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { UserRole } from '@aic/types'

interface InternalStats {
  pendingApplications: number;
  activeCertifications: number;
  totalLeads: number;
  auditsTotal: number;
}

interface DashboardData {
  stats: InternalStats;
  activeOrgs: Array<{
    name: string;
    integrity_score: number;
    tier: string;
  }>;
}

interface InternalLinkCardProps {
  title: string;
  desc: string;
  href: string;
  allowedRoles: UserRole[];
  currentRole: UserRole;
}

export default function InternalDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Ported from admin logic
    fetch('/api/dashboard')
        .then(res => res.json())
        .then((dashData: DashboardData) => {
            setData(dashData);
            setLoading(false);
        })
        .catch(() => setLoading(false));
  }, []);

  if (!mounted || loading) {
    return <div className="flex items-center justify-center h-screen italic text-gray-500">Syncing with institutional registry...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session?.user as any)?.role as UserRole || 'VIEWER';

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12 space-y-12">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-5xl font-serif font-bold text-white tracking-tighter mb-4">Internal Command.</h1>
          <p className="text-gray-500 font-serif italic text-lg">Logged in as {session?.user?.name || 'Administrator'} ({role})</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest block mb-2">Registry Status</span>
          <div className="text-2xl font-serif text-green-500">CONNECTED</div>
        </div>
      </header>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { l: 'Pending Apps', v: data?.stats?.pendingApplications || 0, c: 'text-white' },
          { l: 'Active Certs', v: data?.stats?.activeCertifications || 0, c: 'text-aic-gold' },
          { l: 'Total Leads', v: data?.stats?.totalLeads || 0, c: 'text-blue-400' },
          { l: 'Audits Ran', v: data?.stats?.auditsTotal || 0, c: 'text-green-400' }
        ].map((s, i) => (
          <motion.div 
            key={s.l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#080808] border border-white/5 p-8 rounded-3xl"
          >
            <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">{s.l}</p>
            <p className={`text-4xl font-serif font-medium ${s.c}`}>{s.v}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Certification Pipeline (Visible to AUDITOR and ADMIN) */}
        {(role === 'ADMIN' || role === 'AUDITOR' || role === 'COMPLIANCE_OFFICER') && (
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Certification Pipeline</h3>
            <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-8">
              <div className="space-y-8">
                {(data?.activeOrgs || []).map((org, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end text-xs font-mono">
                      <span className="text-white font-bold uppercase tracking-widest">{org.name}</span>
                      <span className="text-gray-500">{org.tier} — {org.integrity_score}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${org.integrity_score}%` }}
                        className={`h-full ${org.integrity_score === 100 ? 'bg-green-500' : 'bg-aic-gold'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Verification Queue (AUDITOR specific) */}
        {((role as string) === 'AUDITOR' || (role as string) === 'ADMIN') && (
          <div className="space-y-6">
            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Verification Feed</h3>
            <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-8">
              <p className="text-xs text-gray-500 font-serif italic mb-8">Pending auditor sign-off on technical evidence.</p>
              <div className="space-y-4">
                {/* Simulated alerts */}
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl border-l-aic-gold border-l-2">
                  <p className="text-xs font-bold text-white uppercase tracking-tighter">Bias Audit Verification</p>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">STANDARD BANK • 2H AGO</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl border-l-aic-gold border-l-2">
                  <p className="text-xs font-bold text-white uppercase tracking-tighter">POPIA Section 71 Review</p>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">INVESTEC • 5H AGO</p>
                </div>
              </div>
              <Link href="/verification" className="block text-center mt-8 text-[10px] font-mono font-bold text-aic-gold hover:text-white transition-colors uppercase tracking-widest">
                Access Gateway →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Internal Routing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        <InternalLinkCard 
          title="Growth & CRM" 
          desc="Pipeline and lead management." 
          href="/crm" 
          allowedRoles={['ADMIN', 'COMPLIANCE_OFFICER']} 
          currentRole={role}
        />
        <InternalLinkCard 
          title="Audit Factory" 
          desc="Evidence and certification management." 
          href="/audits" 
          allowedRoles={['ADMIN', 'AUDITOR', 'COMPLIANCE_OFFICER']} 
          currentRole={role}
        />
        <InternalLinkCard 
          title="Intelligence" 
          desc="Engine telemetry and performance." 
          href="/intelligence/engine" 
          allowedRoles={['ADMIN']} 
          currentRole={role}
        />
      </div>
    </div>
  )
}

function InternalLinkCard({ title, desc, href, allowedRoles, currentRole }: InternalLinkCardProps) {
  const isAllowed = allowedRoles.includes(currentRole);
  
  if (!isAllowed) return null;

  return (
    <Link href={href} className="group">
      <div className="bg-[#080808] border border-white/5 p-8 rounded-3xl group-hover:border-aic-gold transition-all">
        <h4 className="font-serif text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-500 font-serif italic">{desc}</p>
      </div>
    </Link>
  )
}
