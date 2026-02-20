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

    if (loading) return <DashboardShell><div className="p-12 text-center text-gray-500 italic">Initializing intelligence core...</div></DashboardShell>;

    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex justify-between items-end border-b border-aic-black/5 pb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-aic-black tracking-tight underline decoration-aic-gold underline-offset-8">Intelligence Center</h1>
                        <p className="text-gray-500 font-serif mt-4 italic text-lg">{stats?.orgName} • {stats?.tier?.replace('_', ' ')} Status</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-2">Live Integrity Score</span>
                        <div className="text-6xl font-serif font-medium">{stats?.score}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Primary Graph: Integrity Velocity */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-aic-black/5 shadow-xl">
                        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-8">Integrity Velocity (Telemetry)</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.velocityData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontFamily: 'monospace'}} />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="score" stroke="#D4AF37" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Secondary Graph: Radar Framework Mapping */}
                    <div className="bg-aic-black p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col">
                        <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-8">Framework Distribution</h3>
                        <div className="h-[300px] w-full mt-auto">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats?.radarData}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="subject" tick={{fill: '#999', fontSize: 8, fontFamily: 'monospace'}} />
                                    <Radar name="Compliance" dataKey="A" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { l: 'Verification Ratio', v: `${stats?.verifiedRequirements}/${stats?.totalRequirements}`, c: 'text-aic-black' },
                        { l: 'Open Incidents', v: stats?.openIncidents || 0, c: (stats?.openIncidents || 0) > 0 ? 'text-aic-red font-bold' : 'text-green-600' },
                        { l: 'Last Audit', v: stats?.lastAuditAt || 'Pending', c: 'text-gray-500' },
                        { l: 'Next Renewal', v: stats?.nextRenewalDate || 'TBD', c: 'text-gray-500' }
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-8 border border-aic-black/5 rounded-3xl shadow-sm group hover:border-aic-gold transition-colors">
                            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">{s.l}</p>
                            <p className={`text-2xl font-serif font-medium ${s.c}`}>{s.v}</p>
                        </div>
                    ))}
                </div>

                <div className="p-12 border border-dashed border-aic-black/10 rounded-[3rem] text-center bg-aic-paper/30">
                    <span className="text-2xl block mb-4">🛡️</span>
                    <p className="text-gray-500 font-serif italic text-sm">
                        Enterprise Analytics Engine v3.1 <br />
                        Data verified against the AIC Immutable Trust Registry.
                    </p>
                </div>
            </div>
        </DashboardShell>
    );
}
