'use client';

import { useState } from 'react';
import DashboardShell from '../components/DashboardShell';

export default function AuditsPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const runDemoAudit = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/audit-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    test_mode: true,
                    protected_attribute: 'gender',
                    outcome_variable: 'approved',
                    data: [
                        { gender: 'male', approved: 1 },
                        { gender: 'male', approved: 1 },
                        { gender: 'female', approved: 0 },
                        { gender: 'female', approved: 1 },
                        { gender: 'male', approved: 1 },
                    ]
                })
            });
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            alert("Audit failed. Ensure engine is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-aic-black">Audit Management</h1>
                    <button 
                        onClick={runDemoAudit}
                        disabled={loading}
                        className="bg-aic-black text-white px-6 py-2 font-mono text-sm hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? 'RUNNING ENGINE...' : 'RUN NEW BIAS AUDIT (DEMO)'}
                    </button>
                </div>

                {result && (
                    <div className="glass-panel p-8 rounded-2xl animate-in fade-in slide-in-from-top-4">
                        <h2 className="text-xl font-serif font-bold mb-4">Audit Result: {result.analysis?.overall_status || 'COMPLETE'}</h2>
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="bg-white/50 p-4 rounded-xl border">
                                <p className="text-xs font-mono text-gray-500 uppercase mb-1">Impact Ratio</p>
                                <p className="text-2xl font-bold">{result.analysis?.detailed_analysis?.female?.disparate_impact_ratio * 100}%</p>
                            </div>
                            <div className="bg-white/50 p-4 rounded-xl border">
                                <p className="text-xs font-mono text-gray-500 uppercase mb-1">Status</p>
                                <p className={`text-2xl font-bold ${result.analysis?.overall_status === 'BIASED' ? 'text-aic-red' : 'text-aic-green'}`}>
                                    {result.analysis?.overall_status}
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-bold font-serif">Recommendations</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 font-serif">
                                {result.analysis?.recommendations.map((rec: string, i: number) => (
                                    <li key={i}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="mt-12 bg-white/30 backdrop-blur-sm border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                    <p className="text-gray-400 font-serif italic">
                        In production, this interface connects to your Model Registry.<br/>
                        Audits are triggered automatically on every model deployment.
                    </p>
                </div>
            </div>
        </DashboardShell>
    );
}
