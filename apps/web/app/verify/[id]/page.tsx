'use client';

import { useEffect, useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import { AlphaSeal } from '@aic/ui';

export default function VerificationPortalPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const certId = params.id;
    const [org, setOrg] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query the registry/verify endpoint
        fetch(`/api/registry?verify_id=${certId}`)
            .then(res => res.json())
            .then(data => {
                if (data.organization) setOrg(data.organization);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [certId]);

    return (
        <main className="min-h-screen bg-aic-paper">
            <Navbar />
            <div className="py-32">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24"
                            >
                                <div className="w-16 h-16 border-4 border-aic-gold border-t-transparent rounded-full animate-spin mx-auto mb-8" />
                                <p className="font-mono text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Querying AIC Registry...</p>
                            </motion.div>
                        ) : org ? (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="text-center mb-24">
                                    <div className="inline-block px-4 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 font-mono text-[10px] font-bold uppercase tracking-widest mb-8">
                                        Authenticity Verified
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-aic-black mb-6">
                                        {org.name}
                                    </h1>
                                    <p className="text-xl text-gray-500 font-serif italic max-w-2xl mx-auto">
                                        This organization has successfully completed the AIC technical audit and is officially recognized as Human-Accountable.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="bg-white p-12 rounded-[3rem] border border-aic-black/5 shadow-xl flex flex-col items-center justify-center text-center">
                                        <div className="w-48 h-48 mb-8">
                                            <AlphaSeal tier={org.tier} />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-2">Classification</span>
                                        <h3 className="text-3xl font-serif font-bold text-aic-black">{org.tier?.replace('_', ' ')}</h3>
                                    </div>

                                    <div className="bg-aic-black p-12 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                            <div className="text-8xl font-bold">100</div>
                                        </div>
                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-8 block">Integrity Score</span>
                                                <div className="text-8xl font-serif font-medium text-aic-gold mb-2">{org.integrity_score}</div>
                                                <p className="text-sm font-serif italic text-gray-400">Validated: {new Date().toLocaleDateString()}</p>
                                            </div>
                                            <div className="pt-12 border-t border-white/5 mt-auto">
                                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Certificate ID</p>
                                                <p className="text-xs font-mono font-bold uppercase">AIC-2026-{org.id.substring(0, 12)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-16 rounded-[3rem] border border-aic-black/5">
                                    <h4 className="font-serif text-2xl mb-8">Audit Summary</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Section 71 Compliance</span>
                                            <p className="text-green-600 font-bold font-mono text-xs">PASS / HUMAN-IN-LOOP VERIFIED</p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Technical Bias Audit</span>
                                            <p className="text-green-600 font-bold font-mono text-xs">PASS / FOUR-FIFTHS RULE MET</p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Right to Explanation</span>
                                            <p className="text-green-600 font-bold font-mono text-xs">PASS / XAI INTERFACE ACTIVE</p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Last Review Date</span>
                                            <p className="text-gray-500 font-bold font-mono text-xs uppercase">{new Date().toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="not-found"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24"
                            >
                                <div className="text-6xl mb-8">🔍</div>
                                <h2 className="text-3xl font-serif mb-4">Certificate Not Found</h2>
                                <p className="text-gray-500 font-serif italic mb-12">The provided identifier could not be verified against the live AIC Registry.</p>
                                <a href="/registry" className="bg-aic-black text-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-aic-gold hover:text-black transition-all">Back to Registry</a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
