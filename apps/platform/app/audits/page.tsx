'use client';

import { useEffect, useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuditsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRunning, setIsRunning] = useState(false);

    const fetchLogs = () => {
        fetch('/api/audit-logs')
            .then(res => res.json())
            .then(data => {
                setLogs(data.logs || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleRunAudit = async () => {
        setIsRunning(true);
        try {
            // Correct format for API/v1/analyze
            const sampleData = {
                "protected_attribute": "race",
                "outcome_variable": "hired",
                "rows": [
                    {"race": "Group A", "hired": 1},
                    {"race": "Group A", "hired": 1},
                    {"race": "Group B", "hired": 1},
                    {"race": "Group B", "hired": 0}
                ]
            };

            const response = await fetch('/api/audit-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemName: 'Production Loan Engine v2.4',
                    data: sampleData
                })
            });

            if (response.ok) {
                alert("Audit analysis complete. Hash recorded to database.");
                fetchLogs();
            } else {
                const err = await response.json();
                alert(`Audit Failed: ${err.detail}`);
            }
        } catch (err) {
            alert("Connection to Audit Engine failed.");
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto pb-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-aic-black underline decoration-aic-gold underline-offset-8">Technical Audit Logs</h1>
                        <p className="text-gray-500 font-serif mt-4">Immutable verification of your algorithmic outcomes via the AIC Engine.</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleRunAudit}
                            disabled={isRunning}
                            className="bg-aic-black text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold hover:text-black transition-all shadow-xl disabled:opacity-50"
                        >
                            {isRunning ? 'ANALYZING...' : 'RUN BIAS AUDIT'}
                        </button>
                        <button 
                            onClick={async () => {
                                setIsRunning(true);
                                try {
                                    const sampleOddsData = {
                                        "protected_attribute": "gender",
                                        "actual_outcome": "repaid",
                                        "predicted_outcome": "pred_repaid",
                                        "rows": [
                                            {"gender": "M", "repaid": 1, "pred_repaid": 1},
                                            {"gender": "F", "repaid": 1, "pred_repaid": 0}
                                        ]
                                    };
                                    const res = await fetch('/api/audit-logs', {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ systemName: 'Advanced Risk Model', data: sampleOddsData })
                                    });
                                    if (res.ok) { alert("Advanced Equalized Odds audit recorded."); fetchLogs(); }
                                } finally { setIsRunning(false); }
                            }}
                            disabled={isRunning}
                            className="border border-aic-black text-aic-black px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-red hover:text-white transition-all disabled:opacity-50"
                        >
                            RUN ADVANCED ODDS AUDIT
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-aic-black/5 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm font-serif">
                        <thead className="bg-aic-paper/50 border-b border-aic-black/5">
                            <tr>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timestamp</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">System / Version</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Audit Event</th>
                                <th className="p-6 text-right font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Integrity Hash</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-aic-black/5">
                            {loading ? (
                                <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic">Syncing with secure logs...</td></tr>
                            ) : logs.map((log, i) => (
                                <motion.tr 
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-aic-paper/30 transition-colors group"
                                >
                                    <td className="p-6 text-gray-400 font-mono text-[10px]">{new Date(log.created_at).toLocaleString()}</td>
                                    <td className="p-6 font-bold text-aic-black">{log.system_name}</td>
                                    <td className="p-6 font-mono text-xs">{log.event_type}</td>
                                    <td className="p-6 text-right">
                                        <span className="font-mono text-[9px] bg-gray-100 px-2 py-1 rounded text-gray-500 select-all group-hover:text-aic-gold transition-colors">
                                            {log.integrity_hash ? log.integrity_hash.substring(0, 16) : 'PENDING'}...
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                            {!loading && logs.length === 0 && (
                                <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic font-serif">No technical audit logs found. Run a "Live Audit" to generate evidence.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 p-8 bg-aic-black rounded-3xl text-white flex items-center justify-between border border-white/5 shadow-2xl">
                    <div>
                        <h4 className="font-serif text-xl mb-2 italic text-aic-gold">Evidence Hardening</h4>
                        <p className="text-gray-400 text-sm font-serif">Every audit log is cryptographically hashed. This provides tamper-proof evidence for your Lead Auditor during certification review.</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-aic-gold/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-aic-gold animate-ping" />
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
