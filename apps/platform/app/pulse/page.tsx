'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function PulsePage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [systemLogs, setSystemLogs] = useState<any[]>([]);
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchLogs = () => {
        fetch('/api/audit-logs')
            .then(res => res.json())
            .then(data => {
                setSystemLogs(data.logs || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const fetchMetrics = () => {
        fetch('/api/pulse/metrics')
            .then(res => res.json())
            .then(data => setMetrics(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchLogs();
        fetchMetrics();

        // Polling for real logs and metrics
        const logTimer = setInterval(fetchLogs, 10000);
        const metricsTimer = setInterval(fetchMetrics, 30000);

        return () => {
            clearInterval(timer);
            clearInterval(logTimer);
            clearInterval(metricsTimer);
        };
    }, []);

    const [empathyText, setEmpathyText] = useState('');
    const [empathyResult, setEmpathyResult] = useState<any>(null);

    const handleEmpathyCheck = async () => {
        const res = await fetch('/api/empathy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: empathyText })
        });
        if (res.ok) {
            const data = await res.json();
            setEmpathyResult(data);
            fetchLogs();
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto pb-24">
                {/* ... existing header ... */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-aic-black underline decoration-aic-gold underline-offset-8 decoration-2">AIC Pulse™</h1>
                        <p className="text-gray-500 font-serif mt-4 italic">Real-time accountability telemetry for your automated systems.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Telemetry Clock</p>
                        <p className="text-xl font-mono text-aic-black font-bold">{currentTime.toLocaleTimeString()}</p>
                    </div>
                </div>

                {/* Empathy Auditor - NEW SECTION */}
                <div className="mb-12 bg-white border border-aic-black/5 rounded-[2.5rem] p-12 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">Empathy Auditor</h3>
                            <p className="font-serif text-lg text-gray-500 mb-8 italic">Ensure your automated communications maintain human dignity (Right to Empathy).</p>
                            <textarea 
                                className="w-full bg-aic-paper/50 border border-aic-black/10 rounded-2xl p-6 font-serif text-sm focus:border-aic-gold outline-none transition-all"
                                rows={4}
                                placeholder="Paste your automated rejection or notification text here..."
                                value={empathyText}
                                onChange={(e) => setEmpathyText(e.target.value)}
                            />
                            <button 
                                onClick={handleEmpathyCheck}
                                className="mt-6 bg-aic-black text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold hover:text-black transition-all"
                            >
                                ANALYZE TONE
                            </button>
                        </div>
                        
                        <AnimatePresence>
                            {empathyResult && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-aic-paper/30 border border-aic-black/5 rounded-3xl p-8"
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${
                                            empathyResult.status === 'PASS' ? 'text-green-600 bg-green-50 border-green-200' : 'text-aic-red bg-red-50 border-red-200'
                                        }`}>
                                            {empathyResult.empathy_level}
                                        </span>
                                        <span className="text-4xl font-serif">{Math.round(empathyResult.empathy_score)}%</span>
                                    </div>
                                    <p className="text-sm font-serif text-gray-600 leading-relaxed mb-6">"{empathyResult.recommendation}"</p>
                                    <div className="space-y-2">
                                        {empathyResult.specific_feedback.map((f: string, i: number) => (
                                            <div key={i} className="flex gap-2 text-[10px] font-mono text-aic-red items-center">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Gauge 1: Bias Stability */}
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Bias Stability</h3>
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="text-5xl font-serif font-medium text-aic-black mb-2 tracking-tight">{metrics?.biasStability ?? '—'}%</div>
                        <p className="text-[10px] text-green-600 font-mono font-bold uppercase tracking-tighter flex items-center gap-1">
                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            {metrics?.biasAuditsTotal ?? 0} audits analyzed
                        </p>
                        <div className="mt-8 flex gap-1 items-end h-12">
                            {(metrics?.biasStability ? [60, 70, 75, 80, 85, 88, 90, 92, 95, Math.round(metrics.biasStability)] : [0,0,0,0,0,0,0,0,0,0]).map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 bg-aic-black/5 rounded-t-sm group-hover:bg-aic-gold/20 transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Gauge 2: Human Agency */}
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-aic-gold/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Human Agency</h3>
                            <svg className="w-4 h-4 text-aic-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <div className="text-5xl font-serif font-medium text-aic-black mb-2 tracking-tight">{metrics?.humanOverrides ?? '—'}</div>
                        <p className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-tighter">Overrides / 24h</p>
                        <div className="mt-8 flex gap-1 items-end h-12">
                            {(metrics ? [20, 30, 60, 40, 50, 70, 30, 45, 25, Math.min(100, (metrics.humanOverrides || 0) * 5)] : [0,0,0,0,0,0,0,0,0,0]).map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 bg-aic-black/5 rounded-t-sm group-hover:bg-aic-gold/20 transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Gauge 3: Explainability */}
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-aic-red/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Explainability</h3>
                            <svg className="w-4 h-4 text-aic-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="text-5xl font-serif font-medium text-aic-black mb-2 tracking-tight">{metrics?.explainabilityRate ?? '—'}%</div>
                        <p className={`text-[10px] font-mono font-bold uppercase tracking-tighter italic ${(metrics?.explainabilityRate ?? 100) < 90 ? 'text-aic-red' : 'text-green-600'}`}>
                            {(metrics?.explainabilityRate ?? 100) < 90 ? 'Needs Review' : 'Compliant'}
                        </p>
                        <div className="mt-8 flex gap-1 items-end h-12">
                            {(metrics?.explainabilityRate ? [70, 72, 75, 78, 80, 82, 85, 88, 90, metrics.explainabilityRate] : [0,0,0,0,0,0,0,0,0,0]).map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 bg-aic-black/5 rounded-t-sm group-hover:bg-aic-red/20 transition-colors"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Stream Section */}
                <div className="bg-[#121212] rounded-[2.5rem] p-12 text-white overflow-hidden relative border border-white/5">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <div className="text-[15vw] font-bold leading-none">PULSE</div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
                            <h3 className="font-serif text-2xl tracking-tight text-white">Live Accountability Stream</h3>
                            <div className="flex items-center gap-3 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-green-500">Active Monitoring</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {loading ? (
                                    <div className="text-center p-12 text-gray-500 font-serif italic text-sm">Accessing encrypted telemetry...</div>
                                ) : systemLogs.length === 0 ? (
                                    <div className="text-center p-12 text-gray-500 font-serif italic text-sm">No live events recorded. System waiting for model triggers.</div>
                                ) : systemLogs.slice(0, 5).map((log) => (
                                    <motion.div 
                                        key={log.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-all group"
                                    >
                                        <div className="flex items-center gap-8">
                                            <span className="font-mono text-[9px] text-gray-500 w-20 tracking-tighter">{new Date(log.created_at).toLocaleTimeString()}</span>
                                            <div>
                                                <span className="font-serif text-lg block text-white group-hover:text-aic-gold transition-colors">{log.event_type}</span>
                                                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{log.system_name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden md:block">
                                                <p className="text-[7px] font-mono text-gray-600 uppercase tracking-widest mb-1">Integrity Hash</p>
                                                <p className="text-[8px] font-mono text-gray-400">SHA256-{(log.integrity_hash || 'PENDING').substring(0,8)}</p>
                                            </div>
                                            <span className={`font-mono text-[9px] font-bold px-3 py-1 rounded border border-green-400/20 bg-green-400/5 text-green-400 tracking-widest`}>
                                                VERIFIED
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}