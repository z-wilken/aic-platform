'use client';

import { useEffect, useState } from 'react';
import DashboardShell from '../../components/DashboardShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function APIKeysPage() {
    const [keys, setKeys] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newKey, setNewKey] = useState<string | null>(null);

    const fetchKeys = () => {
        fetch('/api/keys')
            .then(res => res.json())
            .then(data => {
                setKeys(data.keys || []);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const handleGenerateKey = async () => {
        const label = prompt("Key Label (e.g., CI/CD Production):");
        if (!label) return;

        const res = await fetch('/api/keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label })
        });

        if (res.ok) {
            const data = await res.json();
            setNewKey(data.apiKey);
            fetchKeys();
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto pb-24 space-y-12">
                <div className="flex justify-between items-end border-b border-aic-black/5 pb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-aic-black underline decoration-aic-gold underline-offset-8">Integration Core</h1>
                        <p className="text-gray-500 font-serif mt-4 italic">Automate your bias audits directly via the AIC technical engine.</p>
                    </div>
                    <button 
                        onClick={handleGenerateKey}
                        className="bg-aic-black text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold hover:text-black transition-all shadow-xl"
                    >
                        Generate Integration Key
                    </button>
                </div>

                <AnimatePresence>
                    {newKey && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-aic-gold/10 border-2 border-aic-gold p-8 rounded-3xl"
                        >
                            <p className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest mb-4">CRITICAL: Save this key now</p>
                            <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-aic-gold/20">
                                <code className="flex-1 font-mono text-xs font-bold break-all">{newKey}</code>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(newKey);
                                        alert("Copied to clipboard.");
                                    }}
                                    className="text-[10px] font-mono font-bold uppercase underline"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-[9px] font-mono text-gray-500 mt-4 uppercase">For security, this key will never be shown again.</p>
                            <button onClick={() => setNewKey(null)} className="mt-6 text-xs font-bold underline decoration-aic-gold">I have saved it</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-white border border-aic-black/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm font-serif">
                        <thead className="bg-aic-paper/50 border-b border-aic-black/5">
                            <tr>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Identifier</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prefix</th>
                                <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Last Used</th>
                                <th className="p-6 text-right font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-aic-black/5">
                            {loading ? (
                                <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic">Syncing with secure vault...</td></tr>
                            ) : keys.length === 0 ? (
                                <tr><td colSpan={4} className="p-16 text-center text-gray-500 font-serif italic">No integration keys found. Create one to begin automated auditing.</td></tr>
                            ) : keys.map((k, i) => (
                                <motion.tr 
                                    key={k.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-aic-paper/30 transition-colors group"
                                >
                                    <td className="p-6 font-bold text-aic-black">{k.label}</td>
                                    <td className="p-6"><code className="bg-gray-100 px-2 py-1 rounded font-mono text-[10px]">{k.key_prefix}****</code></td>
                                    <td className="p-6 text-center text-gray-400 font-mono text-[10px]">
                                        {k.last_used_at ? new Date(k.last_used_at).toLocaleString() : 'Never'}
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="text-[10px] font-mono font-bold uppercase text-gray-400 hover:text-aic-red transition-colors">Revoke</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                    <div className="bg-aic-black p-12 rounded-[3rem] text-white">
                        <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-8 block">Developer Documentation</span>
                        <h3 className="font-serif text-3xl mb-6 tracking-tight">Direct Engine API</h3>
                        <p className="text-gray-400 font-serif leading-relaxed mb-12">
                            Integrate our Four-Fifths analysis directly into your CI/CD pipeline. Every API call generates an immutable audit record in your AIC Roadmap.
                        </p>
                        <code className="block bg-white/5 p-4 rounded-xl border border-white/10 text-[10px] font-mono text-aic-gold mb-8">
                            POST /api/audit-logs <br />
                            Authorization: Bearer {'<your_key>'}
                        </code>
                        <a href="#" className="font-mono text-[10px] font-bold uppercase tracking-widest underline decoration-aic-gold">View Technical Docs</a>
                    </div>
                    
                    <div className="p-12 border border-aic-black/5 rounded-[3rem] bg-white flex flex-col justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-aic-gold/10 flex items-center justify-center mx-auto mb-8">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h4 className="font-serif text-2xl mb-4">Pioneer Performance</h4>
                        <p className="text-gray-500 font-serif text-sm">Automated audits reduce certification time by up to 60%. Establish continuous trust through programmatic verification.</p>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
