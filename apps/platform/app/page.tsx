'use client';

import { useEffect, useState } from 'react';
import DashboardShell from './components/DashboardShell';
import { motion } from 'framer-motion';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    AreaChart, Area
} from 'recharts';
import { StatsResponse } from '@aic/types';
import { Layout, GraduationCap, Globe, Zap, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';
import { SovereignButton } from './components/SovereignButton';

export default function PlatformDashboard() {
    const [stats, setStats] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <DashboardShell>
            <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
                <div className="h-12 w-12 border-4 border-aic-cyan border-t-transparent rounded-full animate-spin" />
                <p className="font-serif italic text-aic-slate text-xl">Initializing Sovereign Intelligence Core...</p>
            </div>
        </DashboardShell>
    );

    const quickActions = [
        { title: 'Governance Workspace', desc: 'Manage your living audit trail and AI systems.', href: '/workspace', icon: Layout, color: 'text-aic-cyan' },
        { title: 'Practitioner Portal', desc: 'Track your professional ethical certification.', href: '/practitioner', icon: GraduationCap, color: 'text-aic-gold' },
        { title: 'Global Index', desc: 'View institutional accountability rankings.', href: '/leaderboard', icon: Globe, color: 'text-aic-cyan' },
    ];

    return (
        <DashboardShell>
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-5 h-5 text-aic-cyan fill-aic-cyan" />
                            <span className="text-[10px] font-mono font-bold text-aic-slate uppercase tracking-[0.4em]">Intelligence Center v4.0</span>
                        </div>
                        <h1 className="text-6xl font-serif font-bold text-white tracking-tighter">Sovereign Command<span className="text-aic-cyan">.</span></h1>
                        <p className="text-xl text-aic-slate font-serif mt-4 italic">{stats?.orgName} • {stats?.tier?.replace('_', ' ')} Institutional Status</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] text-right min-w-[240px] backdrop-blur-xl">
                        <span className="text-xs font-mono font-bold text-aic-cyan uppercase tracking-widest block mb-2">Aggregate Integrity</span>
                        <div className="text-7xl font-serif font-bold text-white tracking-tighter">{stats?.score}</div>
                    </div>
                </div>

                {/* Quick Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {quickActions.map((action, i) => (
                        <Link href={action.href} key={i}>
                            <motion.div 
                                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] h-full flex flex-col group transition-all duration-500"
                            >
                                <div className={`p-4 bg-white/5 rounded-2xl w-fit mb-8 group-hover:bg-aic-cyan/10 transition-colors ${action.color}`}>
                                    <action.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-white mb-3">{action.title}</h3>
                                <p className="text-aic-slate text-sm leading-relaxed mb-8">{action.desc}</p>
                                <div className="mt-auto flex items-center gap-2 text-[10px] font-mono font-bold text-aic-cyan uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Initialize <ArrowRight className="w-3 h-3" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Main Data Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white/[0.02] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] font-serif italic text-8xl pointer-events-none select-none">Velocity</div>
                        <h3 className="text-[10px] font-mono font-bold text-aic-slate uppercase tracking-widest mb-10 flex items-center gap-3">
                            <BarChart3 className="w-4 h-4 text-aic-cyan" /> Integrity Telemetry (Live)
                        </h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.velocityData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B', fontFamily: 'monospace'}} />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip contentStyle={{backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}} />
                                    <Area type="monotone" dataKey="score" stroke="#00F5FF" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-aic-obsidian p-10 rounded-[3.5rem] border border-white/10 shadow-2xl flex flex-col relative overflow-hidden group">
                        <div className="absolute inset-0 bg-aic-cyan/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-[10px] font-mono font-bold text-aic-slate uppercase tracking-widest mb-10 relative z-10">Framework Distribution</h3>
                        <div className="h-[350px] w-full mt-auto relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats?.radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis dataKey="subject" tick={{fill: '#64748B', fontSize: 9, fontFamily: 'monospace'}} />
                                    <Radar name="Compliance" dataKey="A" stroke="#00F5FF" fill="#00F5FF" fillOpacity={0.5} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { l: 'Verification Ratio', v: `${stats?.verifiedRequirements}/${stats?.totalRequirements}`, c: 'text-white' },
                        { l: 'Open Incidents', v: stats?.openIncidents || 0, c: (stats?.openIncidents || 0) > 0 ? 'text-aic-red font-bold' : 'text-green-500' },
                        { l: 'Ledger Health', v: '100% Cryptographic', c: 'text-aic-cyan' },
                        { l: 'AIMS Readiness', v: 'Level 3/4', c: 'text-aic-gold' }
                    ].map((s, i) => (
                        <div key={i} className="bg-white/[0.02] p-8 border border-white/5 rounded-3xl group hover:border-aic-cyan/30 transition-all duration-500">
                            <p className="text-[9px] font-mono font-bold text-aic-slate uppercase tracking-widest mb-4">{s.l}</p>
                            <p className={`text-3xl font-serif font-bold ${s.c}`}>{s.v}</p>
                        </div>
                    ))}
                </div>

                <div className="p-16 border border-dashed border-white/10 rounded-[4rem] text-center bg-white/[0.01] relative overflow-hidden group">
                    <ShieldCheck className="w-12 h-12 text-aic-slate mx-auto mb-6 group-hover:text-aic-cyan transition-colors" />
                    <p className="text-aic-slate font-serif italic text-lg leading-relaxed">
                        Sovereign Governance Engine v4.2 <br />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] mt-2 block opacity-50">Data verified against the AIC Immutable Trust Registry.</span>
                    </p>
                </div>
            </div>
        </DashboardShell>
    );
}

import { BarChart3 } from 'lucide-react';
