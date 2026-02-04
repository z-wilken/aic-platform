'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function PulsePage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [systemLogs, setSystemLogs] = useState([
        { id: 1, event: 'Model Deployment', status: 'VERIFIED', time: '10:42:01' },
        { id: 2, event: 'Bias Check (EEOC)', status: 'PASS', time: '10:45:12' },
        { id: 3, event: 'Human Intervention', status: 'LOGGED', time: '10:50:05' },
    ]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Random log simulator
    useEffect(() => {
        const events = [
            'Bias Drift Check', 'Right to Explanation Request', 'Log Integrity Verified', 
            'Model Retraining Detected', 'Human Override Logged', 'SPI Data Check'
        ];
        const logTimer = setInterval(() => {
            const newLog = {
                id: Date.now(),
                event: events[Math.floor(Math.random() * events.length)],
                status: Math.random() > 0.1 ? 'PASS' : 'WARN',
                time: new Date().toLocaleTimeString()
            };
            setSystemLogs(prev => [newLog, ...prev.slice(0, 4)]);
        }, 5000);
        return () => clearInterval(logTimer);
    }, []);

    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto pb-24">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Gauge 1: Bias Stability */}
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-8">Bias Stability</h3>
                        <div className="text-5xl font-serif font-medium text-aic-black mb-2">99.2%</div>
                        <p className="text-xs text-green-600 font-mono">↑ 0.4% vs Baseline</p>
                        <div className="mt-8 flex gap-1 items-end h-12">
                            {[40, 70, 45, 90, 65, 80, 85, 100, 95, 92].map((h, i) => (
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
                        <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-8">Human Agency</h3>
                        <div className="text-5xl font-serif font-medium text-aic-black mb-2">14</div>
                        <p className="text-xs text-gray-400 font-mono">Overrides / 24h</p>
                        <div className="mt-8 flex gap-1 items-end h-12">
                            {[20, 30, 60, 40, 50, 70, 30, 45, 25, 40].map((h, i) => (
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
                        <h3 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-8">Explainability</h3>
                        <div className="text-5xl font-serif font-medium text-aic-black mb-2">88%</div>
                        <p className="text-xs text-aic-red font-mono italic">Needs Review (Model B)</p>
                        <div className="mt-8 flex gap-1 items-end h-12">
                            {[80, 85, 88, 87, 82, 80, 75, 70, 72, 78].map((h, i) => (
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
                            <h3 className="font-serif text-2xl">Live Accountability Stream</h3>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Active Monitoring</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {systemLogs.map((log) => (
                                    <motion.div 
                                        key={log.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="font-mono text-[10px] text-gray-500">{log.time}</span>
                                            <span className="font-serif text-lg">{log.event}</span>
                                        </div>
                                        <span className={`font-mono text-[10px] font-bold px-3 py-1 rounded-full border ${
                                            log.status === 'PASS' || log.status === 'VERIFIED' 
                                            ? 'text-green-400 border-green-400/20 bg-green-400/5' 
                                            : 'text-aic-gold border-aic-gold/20 bg-aic-gold/5'
                                        }`}>
                                            {log.status}
                                        </span>
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
