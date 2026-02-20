'use client';

import { useEffect, useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ComplianceReport {
    id: string;
    month_year: string;
    integrity_score: number;
    audit_status: string;
    findings_count: number;
    created_at: string;
}

import { generateIntegritySnapshot } from '../../lib/report-generator';

export default function ReportsPage() {
    const [reports, setReports] = useState<ComplianceReport[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/reports');
            const data = await res.json();
            setReports(data.reports || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
        fetch('/api/stats').then(res => res.json()).then(data => setStats(data));
    }, []);

    const handleDownloadCurrent = () => {
        if (!stats) return;
        generateIntegritySnapshot({ name: stats.orgName, id: stats.orgId }, stats);
    };

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch('/api/reports', { method: 'POST' });
            if (res.ok) {
                toast.success("New compliance snapshot generated successfully.");
                fetchReports();
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to generate report");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto pb-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-aic-black underline decoration-aic-gold underline-offset-8">Compliance Archive</h1>
                        <p className="text-gray-500 font-serif mt-4">Official monthly snapshots of your organization's accountability health.</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleGenerateReport}
                            disabled={isGenerating}
                            className="border border-aic-black text-aic-black px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-black hover:text-white transition-all disabled:opacity-50"
                        >
                            {isGenerating ? 'GENERATING...' : 'Generate Snapshot'}
                        </button>
                        <button className="bg-aic-black text-white px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-red transition-colors">
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-aic-black/5 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm font-serif">
                        <thead className="bg-aic-paper/50 border-b border-aic-black/5">
                            <tr>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Period</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Integrity Score</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Findings</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-right font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-aic-black/5">
                            {loading ? (
                                <tr><td colSpan={5} className="p-12 text-center text-gray-400 italic">Retrieving archive...</td></tr>
                            ) : reports.map((report, i) => (
                                <motion.tr 
                                    key={report.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-aic-paper/30 transition-colors group"
                                >
                                    <td className="p-6 font-bold text-aic-black">{report.month_year}</td>
                                    <td className="p-6">
                                        <span className={`font-mono font-bold ${report.integrity_score > 90 ? 'text-green-600' : 'text-aic-gold'}`}>
                                            {report.integrity_score}%
                                        </span>
                                    </td>
                                    <td className="p-6 font-mono text-gray-500">{report.findings_count}</td>
                                    <td className="p-6">
                                        <span className="text-[10px] font-mono font-bold px-2 py-1 bg-green-50 text-green-600 border border-green-100 rounded">
                                            {report.audit_status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="text-aic-gold hover:text-aic-black transition-colors">
                                            <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                            {!loading && reports.length === 0 && (
                                <tr><td colSpan={5} className="p-12 text-center text-gray-400 italic">No historical reports found. Archive begins post-certification.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Trend Placeholder */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-panel p-8 rounded-3xl">
                        <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Integrity Velocity</h4>
                        <div className="h-32 flex items-end gap-2">
                            {[60, 75, 82, 80, 88, 92, 94].map((h, i) => (
                                <div key={i} className="flex-1 bg-aic-black/5 rounded-t group relative">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        className="absolute bottom-0 left-0 w-full bg-aic-gold/20 group-hover:bg-aic-gold/40 transition-colors rounded-t"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 font-mono text-[8px] text-gray-400 uppercase tracking-tighter">
                            <span>Jul 25</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>
                            <span>Jan 26</span>
                        </div>
                    </div>
                    
                    <div className="bg-[#121212] p-8 rounded-3xl text-white">
                        <h4 className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 text-aic-gold">Executive Summary</h4>
                        <p className="font-serif text-sm leading-relaxed text-gray-400">
                            Your Integrity Score has increased by <span className="text-white font-bold">2.4%</span> over the last 6 months. This trend correlates with the implementation of the POPIA Section 71 override interface in December.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-mono font-bold uppercase text-gray-500">Benchmark Rating</span>
                            <span className="text-xs font-mono font-bold text-green-400">ABOVE AVERAGE</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
