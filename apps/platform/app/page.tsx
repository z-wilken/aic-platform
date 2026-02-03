'use client';

import { useEffect, useState } from 'react';
import DashboardShell from './components/DashboardShell';

interface Log {
    id: string;
    created_at: string;
    input_type: string;
    outcome: string;
    status: string;
}

interface Stats {
    score: number;
    trend?: number;
    tier: string;
    pendingReviews: number;
    logs: Log[];
    mode: string;
}

export default function PlatformHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
      return (
        <DashboardShell>
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aic-gold"></div>
            </div>
        </DashboardShell>
      );
  }

  const currentStats = stats || {
      score: 0,
      tier: 'PENDING',
      pendingReviews: 0,
      logs: [],
      mode: 'ERROR'
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-mono">Integrity Score</h3>
            <div className="flex items-end gap-3">
                <span className="text-6xl font-serif font-bold text-aic-black">{currentStats.score}</span>
                <span className="text-xl font-serif text-gray-400 mb-2">/100</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-mono text-green-700 bg-green-50/50 w-fit px-2 py-1 rounded-md border border-green-200/50">
                <span>{currentStats.mode === 'LIVE' ? 'Live System Data' : 'Sample Data'}</span>
            </div>
        </div>

        {/* Tier Status */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-aic-red/20 to-transparent rounded-full blur-2xl"></div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-mono">Classification</h3>
            <div className="flex items-center gap-3">
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aic-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-aic-red"></span>
                </div>
                <span className="text-xl font-serif font-bold text-aic-red">{currentStats.tier.replace('_', ' ')}</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 font-serif leading-relaxed">
                {currentStats.tier === 'TIER_1' ? 'System handles high-stakes data.' : 'Automated processing active.'} <br/>
                <span className="font-bold">Next Audit:</span> In 14 days.
            </p>
        </div>

        {/* Pending Actions */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-mono">Action Items</h3>
            <div className="flex items-end gap-2">
                <span className="text-6xl font-serif font-bold text-aic-orange">{currentStats.pendingReviews || 0}</span>
                <span className="text-sm font-mono text-gray-500 mb-2">pending reviews</span>
            </div>
            <div className="mt-4 space-y-2">
                <div className="text-xs bg-white/50 p-2 rounded border border-gray-100 flex justify-between items-center cursor-pointer hover:bg-white transition-colors">
                    <span>Audit requirements updated</span>
                    <span className="text-aic-red font-bold">→</span>
                </div>
            </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200/50 flex justify-between items-center bg-white/30 backdrop-blur-sm">
            <h3 className="font-serif font-bold text-lg text-gray-800">Recent Automated Decisions</h3>
            <button className="text-xs font-mono border border-gray-300/50 bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all uppercase tracking-wide">
                Export Report
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Timestamp</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Input Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Outcome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white/40 divide-y divide-gray-200/50 text-sm font-mono">
                    {currentStats.logs.map((log: any) => (
                        <tr key={log.id} className="hover:bg-white/60 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">{log.id.substring(0, 8)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{log.input_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`font-bold px-2 rounded w-fit ${
                                    log.outcome === 'DENIED' ? 'text-aic-red bg-red-50/50' : 
                                    log.outcome === 'APPROVED' ? 'text-aic-green bg-green-50/50' : 
                                    'text-gray-600 bg-gray-100'
                                }`}>
                                    {log.outcome}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                    log.status === 'VERIFIED' ? 'bg-green-50/50 text-green-700 ring-green-600/20' :
                                    log.status === 'FLAGGED' ? 'bg-red-50/50 text-aic-red ring-aic-red/20' :
                                    'bg-aic-gold/10 text-aic-gold ring-aic-gold/20'
                                }`}>
                                    {log.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {currentStats.logs.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic font-serif">
                                No recent decisions found. Ensure your API integration is active.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </DashboardShell>
  );
}