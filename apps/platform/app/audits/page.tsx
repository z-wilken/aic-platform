'use client';

import { useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuditsPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [inputData, setInputData] = useState('');

    const runLiveAudit = async () => {
        if (!inputData) {
            alert("Please provide dataset for analysis.");
            return;
        }

        setLoading(true);
        try {
            // Attempt to parse JSON input
            const parsedData = JSON.parse(inputData);

            const response = await fetch('/api/audit-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    test_mode: true,
                    protected_attribute: 'gender',
                    outcome_variable: 'approved',
                    data: parsedData
                })
            });
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            alert("Audit failed. Ensure data is valid JSON and engine is running.");
        } finally {
            setLoading(false);
        }
    };

    const sampleJson = `[
  {"gender": "male", "approved": 1},
  {"gender": "male", "approved": 1},
  {"gender": "female", "approved": 0},
  {"gender": "female", "approved": 1},
  {"gender": "male", "approved": 1}
]`;

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto pb-24">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-aic-black">Technical Bias Audit</h1>
                        <p className="text-gray-500 font-serif mt-2">Upload or paste model outcomes to verify disparate impact.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-mono font-bold border border-green-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            ENGINE ONLINE
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Input Area */}
                    <div className="space-y-6">
                        <div className="bg-white border border-aic-black/5 p-8 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dataset Input (JSON)</h3>
                                <button 
                                    onClick={() => setInputData(sampleJson)}
                                    className="text-[10px] font-mono text-aic-gold hover:underline"
                                >
                                    Load Sample
                                </button>
                            </div>
                            <textarea 
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                placeholder="Paste your model outcomes here..."
                                className="w-full h-64 bg-aic-paper/50 border-0 rounded-xl p-4 font-mono text-xs focus:ring-1 focus:ring-aic-gold outline-none transition-all"
                            />
                            <button 
                                onClick={runLiveAudit}
                                disabled={loading}
                                className="w-full mt-8 bg-aic-black text-white py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-aic-red transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Analyzing with AIC Engine...' : 'Run Bias Analysis'}
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div 
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-white border border-aic-black/5 p-8 rounded-2xl shadow-xl h-full"
                                >
                                    <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-100">
                                        <h3 className="font-serif text-2xl">Audit Summary</h3>
                                        <span className={`px-3 py-1 rounded text-[10px] font-mono font-bold border ${
                                            result.analysis?.overall_status === 'FAIR' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                                        }`}>
                                            {result.analysis?.overall_status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 mb-12">
                                        <div>
                                            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Impact Ratio</p>
                                            <p className="text-4xl font-serif font-bold text-aic-black">
                                                {Math.round(result.analysis?.detailed_analysis?.female?.disparate_impact_ratio * 100 || 0)}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Reference Group</p>
                                            <p className="text-lg font-serif text-gray-600">Male (100%)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Engine Recommendations</h4>
                                        <ul className="space-y-4">
                                            {result.analysis?.recommendations.map((rec: string, i: number) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-serif leading-relaxed">
                                                    <span className="text-aic-gold">✦</span>
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-100">
                                        <p className="text-[9px] font-mono text-gray-300 uppercase leading-relaxed">
                                            Audit Hash: {result.immutable_hash?.substring(0, 32)}...
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-2 border-dashed border-aic-black/5 rounded-2xl h-full flex items-center justify-center p-12 text-center"
                                >
                                    <div>
                                        <span className="text-4xl block mb-4 grayscale">🔬</span>
                                        <p className="text-gray-400 font-serif italic text-sm">
                                            Provide outcome data on the left <br />to see real-time engine analysis.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}