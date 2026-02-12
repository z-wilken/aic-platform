'use client';

import { useEffect, useState, use } from 'react';
import AdminShell from '../../components/AdminShell';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';

interface Organization {
    id: string;
    name: string;
    tier: string;
    integrity_score: number;
    created_at: string;
}

interface Requirement {
    id: string;
    title: string;
    status: string;
    category: string;
}

interface AuditLog {
    id: string;
    system_name: string;
    event_type: string;
    status: string;
    created_at: string;
}

export default function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [org, setOrg] = useState<Organization | null>(null);
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [audits, setAudits] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [orgRes, reqRes, audRes] = await Promise.all([
                    fetch(`/api/organizations/${id}`),
                    fetch(`/api/requirements?org_id=${id}`),
                    fetch(`/api/audit-logs?org_id=${id}`) // I might need to update this API to support filtering
                ]);

                if (orgRes.ok) {
                    const orgData = await orgRes.json();
                    setOrg(orgData.organization);
                }
                
                if (reqRes.ok) {
                    const reqData = await reqRes.json();
                    setRequirements(reqData.requirements || []);
                }

                if (audRes.ok) {
                    const audData = await audRes.json();
                    setAudits(audData.logs || []);
                }
            } catch (err) {
                toast.error('Failed to load organization intelligence.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return (
        <AdminShell>
            <div className="py-20 text-center text-gray-500 font-serif italic">Decoding institutional dataset...</div>
        </AdminShell>
    );

    if (!org) return (
        <AdminShell>
            <div className="py-20 text-center text-red-500 font-serif">Organization not found.</div>
        </AdminShell>
    );

    return (
        <AdminShell>
            <div className="max-w-6xl mx-auto space-y-12 pb-24">
                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <Link href="/organizations" className="text-[10px] font-mono font-bold text-gray-500 hover:text-aic-gold transition-colors uppercase tracking-widest">
                                ← Back to Registry
                            </Link>
                            <span className="h-1 w-1 bg-gray-700 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest">Institutional Detail</span>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-white tracking-tighter">{org.name}</h1>
                        <p className="text-gray-500 font-serif mt-2 italic text-lg">ID: {org.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">Integrity Score</p>
                        <p className={`text-5xl font-mono font-bold ${org.integrity_score > 90 ? 'text-green-500' : 'text-aic-gold'}`}>{org.integrity_score}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Metadata & Settings */}
                    <div className="space-y-12">
                        <section className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
                            <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-8">Profile Metadata</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Compliance Tier</p>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold rounded-lg uppercase tracking-widest">
                                        {org.tier}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Onboarded</p>
                                    <p className="text-white font-serif">{new Date(org.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
                            <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-8">Quick Actions</h3>
                            <div className="flex flex-col gap-4">
                                <button className="w-full py-3 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-all">
                                    MANAGE AUDITORS
                                </button>
                                <button className="w-full py-3 border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                                    ISSUE CERTIFICATE
                                </button>
                                <button className="w-full py-3 border border-white/10 text-red-500 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all">
                                    REVOKE ACCESS
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Middle/Right Column: Lists */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Requirements Progress */}
                        <section>
                            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-8">Compliance Roadmap</h3>
                            <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                        <tr>
                                            <th className="p-6">Requirement</th>
                                            <th className="p-6">Category</th>
                                            <th className="p-6">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {requirements.map(req => (
                                            <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-6 font-bold text-white">{req.title}</td>
                                                <td className="p-6 text-gray-400 font-mono text-[10px]">{req.category}</td>
                                                <td className="p-6">
                                                    <span className={`text-[9px] font-bold font-mono ${
                                                        req.status === 'VERIFIED' ? 'text-green-500' : 'text-aic-gold'
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Recent Audits */}
                        <section>
                            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-8">Real-time Audit Stream</h3>
                            <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                        <tr>
                                            <th className="p-6">System</th>
                                            <th className="p-6">Event</th>
                                            <th className="p-6">Outcome</th>
                                            <th className="p-6 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {audits.map(log => (
                                            <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-6 font-bold text-white">{log.system_name}</td>
                                                <td className="p-6 text-gray-400 font-mono text-[10px]">{log.event_type}</td>
                                                <td className="p-6">
                                                    <span className={`text-[9px] font-bold font-mono ${
                                                        log.status === 'FLAGGED' ? 'text-red-500' : 'text-green-500'
                                                    }`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right text-gray-500 font-mono text-[10px]">
                                                    {new Date(log.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {audits.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="p-12 text-center text-gray-600 italic">No telemetry data received from this institution.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
