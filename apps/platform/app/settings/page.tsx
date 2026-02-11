'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion } from 'framer-motion';

export default function OrganizationalSettings() {
    const [settings, setSettings] = useState({
        name: '',
        tier: '',
        contactEmail: '',
        integrityScore: 0,
        isAlpha: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                setSettings({
                    name: data.name || '',
                    tier: data.tier || 'TIER_3',
                    contactEmail: data.contactEmail || '',
                    integrityScore: data.integrityScore || 0,
                    isAlpha: data.isAlpha || false,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            const res = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: settings.name })
            });
            if (res.ok) {
                const data = await res.json();
                setSettings(prev => ({ ...prev, name: data.name }));
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex justify-between items-end border-b border-aic-black/5 pb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-aic-black tracking-tight tracking-tighter">Organizational Standards</h1>
                        <p className="text-gray-500 font-serif mt-4 italic text-lg leading-relaxed">
                            Configure your institutional profile and security protocols.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400 italic font-serif">Loading organizational settings...</div>
                ) : (
                <div className="grid grid-cols-1 gap-12">
                    {/* Institutional Profile */}
                    <section className="bg-white border border-aic-black/5 p-10 rounded-[2.5rem] shadow-xl">
                        <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-10">Institutional Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Entity Name</label>
                                <input
                                    className="w-full bg-aic-paper/50 border border-aic-black/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all"
                                    value={settings.name}
                                    onChange={e => setSettings(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Compliance Tier</label>
                                <div className="px-4 py-3 bg-aic-black text-white font-mono text-[10px] font-bold rounded-xl inline-block">
                                    {settings.tier}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Primary Compliance Email</label>
                                <input
                                    className="w-full bg-aic-paper/50 border border-aic-black/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all"
                                    value={settings.contactEmail}
                                    readOnly
                                />
                            </div>
                        </div>
                    </section>

                    {/* Security Protocol */}
                    <section className="bg-[#080808] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 font-serif italic text-6xl select-none uppercase">Security</div>
                        <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-10 relative z-10">Security Protocol</h3>

                        <div className="space-y-8 relative z-10">
                            <div className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div>
                                    <p className="text-sm font-serif font-bold text-white mb-1">Multi-Factor Authentication (MFA)</p>
                                    <p className="text-[10px] font-mono text-gray-500 uppercase">Mandatory for {settings.tier} Organizations</p>
                                </div>
                                <div className="h-6 w-12 bg-aic-gold rounded-full p-1 flex justify-end items-center">
                                    <div className="h-4 w-4 bg-white rounded-full shadow-lg" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div>
                                    <p className="text-sm font-serif font-bold text-white mb-1">Audit Trail Cryptographic Signing</p>
                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter italic">SHA-256 Chain Verification active</p>
                                </div>
                                <span className="text-[8px] font-mono font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">SECURE</span>
                            </div>
                        </div>
                    </section>

                    {/* Data Residency */}
                    <section className="bg-white border border-aic-black/5 p-10 rounded-[2.5rem] shadow-xl">
                        <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-10">Jurisdiction & Residency</h3>
                        <div className="flex items-center gap-6 p-6 bg-aic-paper/50 rounded-2xl border border-aic-black/5">
                            <div className="w-12 h-12 rounded-xl bg-white border border-aic-black/5 flex items-center justify-center text-2xl font-serif font-bold">ZA</div>
                            <div>
                                <p className="text-sm font-serif font-bold text-aic-black mb-1">Sovereign Data Storage</p>
                                <p className="text-[10px] font-mono text-gray-500 uppercase leading-relaxed italic">
                                    Your institutional data is pinned to South African regional nodes to satisfy POPIA cross-border transfer requirements.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                )}

                <div className="flex justify-end pt-12 gap-4 items-center">
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-mono font-bold text-green-600 uppercase tracking-widest"
                        >
                            Settings saved
                        </motion.span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="bg-aic-black text-white px-12 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-aic-gold hover:text-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
                    >
                        {saving ? 'SAVING...' : 'SAVE_PROTOCOL_CHANGES'}
                    </button>
                </div>
            </div>
        </DashboardShell>
    );
}
