'use client'

import { useEffect, useState } from 'react'
import AdminShell from './components/AdminShell'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardData {
  stats: {
    pendingApplications: number;
    activeCertifications: number;
    totalLeads: number;
    auditsTotal: number;
    verificationQueueCount: number;
    integrityVelocity: string;
  };
  activeOrgs: Array<{
    name: string;
    integrity_score: number;
    tier: string;
  }>;
  recentApplications: Array<{
    id: string;
    first_name: string;
    last_name: string;
    company: string;
  }>;
  recentLeads: Array<{
    id: string;
    email: string;
    source: string;
    score: number;
  }>;
  verificationQueueItems: Array<{
    id: string;
    title: string;
    orgName: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
        .then(res => res.json())
        .then((dashData: DashboardData) => {
            setData(dashData);
            setLoading(false);
        });
  }, []);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aic-gold"></div>
        </div>
      </AdminShell>
    );
  }

  const stats = data?.stats || {
    pendingApplications: 0,
    activeCertifications: 0,
    totalLeads: 0,
    auditsTotal: 0,
    verificationQueueCount: 0,
    integrityVelocity: '+0.0%'
  };

  return (
    <AdminShell>
      <div className="space-y-12">
        {/* Welcome Header */}
        <div className="max-w-3xl">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-serif font-medium tracking-tight mb-6"
            >
                Internal Command.
            </motion.h1>
            <p className="text-xl text-gray-400 font-serif leading-relaxed italic">
                Centralized operations for the AIC Alpha Pilot Program. {stats.pendingApplications} participants awaiting review.
            </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { l: 'Alpha Applicants', v: stats.pendingApplications, c: 'text-white' },
                { l: 'Pilot Participants', v: stats.activeCertifications, c: 'text-aic-gold' },
                { l: 'Verification Queue', v: stats.verificationQueueCount, c: 'text-blue-400' },
                { l: 'Integrity Velocity', v: stats.integrityVelocity, c: 'text-green-400' }
            ].map((s, i) => (
                <motion.div 
                    key={s.l}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 border border-white/5 p-8 rounded-3xl"
                >
                    <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">{s.l}</p>
                    <p className={`text-4xl font-serif font-medium ${s.c}`}>{s.v}</p>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
            {/* Certification Pipeline */}
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Alpha Certification Pipeline</h3>
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8">
                    <div className="space-y-8">
                        {(data?.activeOrgs || []).map((org, i: number) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end text-xs font-mono">
                                    <span className="text-white font-bold uppercase tracking-widest">{org.name}</span>
                                    <span className="text-gray-500">{org.tier?.replace('_', ' ')} — {org.integrity_score}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
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

            {/* Verification Alert Feed */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Verification Queue</h3>
                <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <p className="text-xs text-gray-500 font-serif italic mb-4">Pending evidence submissions requiring lead auditor sign-off.</p>
                    <div className="space-y-4">
                        {(data?.verificationQueueItems || []).map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-aic-gold transition-colors cursor-pointer">
                                <p className="text-xs font-bold text-white">{item.title}</p>
                                <div className="flex justify-between mt-1 text-[9px] font-mono text-gray-500">
                                    <span>{item.orgName}</span>
                                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                        {(data?.verificationQueueItems || []).length === 0 && (
                            <p className="text-center text-gray-500 font-mono text-[9px] py-4 uppercase tracking-widest">Queue is currently clear.</p>
                        )}
                    </div>
                    <Link href="/verification" className="block text-center py-4 border-t border-white/5 font-mono text-[9px] font-bold text-aic-gold hover:text-white uppercase tracking-widest transition-colors mt-4">
                        Enter Verification Portal →
                    </Link>
                </div>
            </div>
        </div>

        {/* Lead/Application Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
            <div>
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-6">Recent Alpha Applications</h3>
                <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
                    <table className="w-full text-left text-sm font-serif">
                        <thead className="bg-white/5 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                            <tr>
                                <th className="p-4">Applicant</th>
                                <th className="p-4">Company</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-xs text-white">
                            {(data?.recentApplications || []).map((app) => (
                                <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">{app.first_name} {app.last_name}</td>
                                    <td className="p-4 text-gray-400">{app.company}</td>
                                    <td className="p-4 text-right">
                                        <Link href={`/applications/${app.id}`} className="text-aic-gold hover:underline">Review</Link>
                                    </td>
                                </tr>
                            ))}
                            {(data?.recentApplications || []).length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-500 italic">No pending applications.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div>
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-6">CRM Integration Feed</h3>
                <div className="space-y-4">
                    {(data?.recentLeads || []).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-2xl group hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-white font-serif">{lead.email}</p>
                                    <p className="text-[10px] font-mono text-gray-500 uppercase">{lead.source} • Score: {lead.score}%</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">QUALIFIED</span>
                        </div>
                    ))}
                    {(data?.recentLeads || []).length === 0 && (
                        <div className="p-12 text-center text-gray-500 font-serif italic border border-dashed border-white/5 rounded-2xl">
                            No recent inbound leads.
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </AdminShell>
  )
}