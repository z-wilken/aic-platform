'use client';

import { useEffect, useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { AlphaSeal } from '@aic/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificatePDF } from '@/lib/cert-generator';

export default function CertificatePage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getCertDates = () => {
    const issued = stats?.lastAuditAt ? new Date(stats.lastAuditAt) : new Date();
    const expiry = new Date(issued);
    expiry.setFullYear(expiry.getFullYear() + 1);
    return {
        issuedDate: issued.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
        expiryDate: expiry.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
        expiryShort: expiry.toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' }).toUpperCase()
    };
  };

  const handleDownloadCert = async () => {
    if (!stats) return;
    setIsGenerating(true);
    const dates = getCertDates();
    await generateCertificatePDF({
        orgName: stats.orgName || 'Your Organization',
        tier: stats.tier || 'TIER_1',
        orgId: stats.orgId || '0000',
        issuedDate: dates.issuedDate,
        expiryDate: dates.expiryDate
    });
    setIsGenerating(false);
  };

  if (loading) return <DashboardShell><div className="p-12 text-center text-gray-500">Retrieving credentials...</div></DashboardShell>;

  const isCertified = stats?.score === 100;

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto pb-24">
        <div className="mb-12 flex justify-between items-end border-b border-aic-black/5 pb-8">
            <div>
                <h2 className="text-3xl font-serif font-bold">Certification Status</h2>
                <p className="text-gray-500 font-serif mt-2 italic">Official credentials generated via POPIA Sec. 71 Audit.</p>
            </div>
            {isCertified && (
                <button 
                    onClick={handleDownloadCert}
                    disabled={isGenerating}
                    className="bg-aic-black text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-red transition-colors disabled:opacity-50"
                >
                    {isGenerating ? 'PREPARING DOCUMENT...' : 'Download Official PDF'}
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* The Certificate / Placeholder */}
            <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                    {isCertified ? (
                        <motion.div 
                            key="cert"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-16 shadow-2xl relative overflow-hidden border border-gray-100 aspect-[1/1.414]"
                        >
                            <div className="border-4 border-double border-aic-gold p-12 h-full flex flex-col">
                                <div className="text-center mb-16">
                                    <h1 className="font-serif text-5xl font-medium text-aic-black mb-4">AIC.</h1>
                                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.4em]">AI Integrity Certification</p>
                                </div>

                                <div className="text-center space-y-8 mb-16">
                                    <p className="font-serif text-xl text-gray-500 italic">This document certifies that the automated systems of</p>
                                    <h2 className="font-serif text-4xl font-bold text-aic-black border-b-2 border-aic-black/5 inline-block pb-4 px-12">
                                        {stats?.orgName || 'Your Organization'}
                                    </h2>
                                    <p className="font-serif text-xl text-gray-500 italic">have been rigorously audited and verified as</p>
                                </div>

                                <div className="flex justify-center mb-16">
                                    <div className="text-center">
                                        <div className={`text-2xl font-mono font-bold uppercase tracking-widest mb-2 ${stats?.tier === 'TIER_1' ? 'text-aic-red' : 'text-aic-gold'}`}>
                                            {stats?.tier?.replace('_', ' ')}: HUMAN-ACCOUNTABLE
                                        </div>
                                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Verification ID: AIC-2026-{stats?.orgId?.substring(0,4)}</p>
                                    </div>
                                </div>

                                <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-12">
                                    <div className="text-left font-mono text-[9px] text-gray-400 space-y-1">
                                        <p>VALID UNTIL: {getCertDates().expiryShort}</p>
                                        <p>LOCATION: JOHANNESBURG, SA</p>
                                    </div>
                                    <div className="w-24 h-24 grayscale opacity-80">
                                        <AlphaSeal tier={stats?.tier === 'TIER_1' ? 1 : 2} variant="detailed" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="pending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-aic-paper/50 border-2 border-dashed border-aic-black/10 rounded-3xl p-24 text-center flex flex-col items-center justify-center min-h-[600px]"
                        >
                            <span className="text-6xl mb-8 grayscale opacity-20">🏆</span>
                            <h3 className="font-serif text-2xl text-gray-400">Certification Pending</h3>
                            <p className="text-gray-500 font-serif mt-4 max-w-sm mx-auto leading-relaxed">
                                Complete all remediation steps in your <a href="/roadmap" className="text-aic-gold underline decoration-aic-gold/30">Roadmap</a> to unlock your official Integrity Certificate.
                            </p>
                            <div className="mt-12 w-full max-w-xs space-y-4">
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-aic-black/20" style={{ width: `${stats?.score || 0}%` }} />
                                </div>
                                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                                    Current Audit Score: {stats?.score || 0}%
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-8">
                <div className="glass-panel p-8 rounded-2xl">
                    <h4 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-widest mb-6 border-b border-aic-gold/10 pb-4">Digital Seal</h4>
                    <div className="flex justify-center mb-8 bg-aic-paper/50 p-8 rounded-xl border border-aic-black/5">
                        <AlphaSeal tier={stats?.tier === 'TIER_1' ? 1 : 2} variant="shield" className="opacity-50" />
                    </div>
                    <p className="text-xs text-gray-500 font-serif leading-relaxed italic">
                        The AIC Alpha Seal is a cryptographic badge proof of your commitment to POPIA Sec. 71. It can be embedded in your website or application UI once 100% compliance is achieved.
                    </p>
                </div>

                <div className="bg-aic-black p-8 rounded-2xl text-white">
                    <h4 className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Upcoming Milestones</h4>
                    <div className="space-y-6">
                        {[
                            { t: 'Bi-Annual Audit', d: 'Aug 2026' },
                            { t: 'SANAS Review', d: 'Jan 2027' }
                        ].map(m => (
                            <div key={m.t} className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-xs font-serif">{m.t}</span>
                                <span className="text-[10px] font-mono text-aic-gold">{m.d}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardShell>
  );
}