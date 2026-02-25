'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function RegistryPage() {
    const [orgs, setOrgs] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/registry')
            .then(res => res.json())
            .then(data => {
                setOrgs(data.organizations || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filtered = orgs.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className="min-h-screen bg-aic-paper">
            <Navbar />
            <div className="py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mb-24"
                    >
                        <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">Transparency</h2>
                        <p className="font-serif text-5xl font-medium tracking-tight text-aic-black leading-tight">
                            The Certified <br />Registry.
                        </p>
                        <p className="mt-8 text-lg text-gray-500 font-serif leading-relaxed">
                            A public, searchable database of organizations that have verified their commitment to human accountability in AI.
                        </p>
                    </motion.div>

                    <div className="mb-12">
                        <input 
                            type="text" 
                            placeholder="Search Organization Name..." 
                            className="w-full max-w-md bg-white border-b-2 border-aic-black/10 py-4 font-mono text-sm focus:border-aic-black outline-none transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="bg-white border border-aic-black/5 rounded-3xl overflow-hidden shadow-sm">
                        <table className="w-full text-left text-sm font-serif">
                            <thead className="bg-aic-paper/50 border-b border-aic-black/5">
                                <tr>
                                    <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Organization</th>
                                    <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Classification</th>
                                    <th className="p-6 font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Integrity Score</th>
                                    <th className="p-6 text-right font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-aic-black/5">
                                {loading ? (
                                    <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic font-serif">Accessing the encrypted registry...</td></tr>
                                ) : filtered.map((org, i) => (
                                    <motion.tr 
                                        key={org.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-aic-paper/30 transition-colors"
                                    >
                                        <td className="p-6 font-bold text-aic-black font-serif text-lg">{org.name}</td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                                                org.tier === 'TIER_1' ? 'text-aic-red bg-red-50 border-red-100' : 'text-aic-gold bg-yellow-50 border-yellow-100'
                                            }`}>
                                                {org.tier?.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-aic-black" style={{ width: `${org.integrity_score}%` }} />
                                                </div>
                                                <span className="font-mono text-xs font-bold">{org.integrity_score}%</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <span className="text-[10px] font-mono font-bold text-green-600 uppercase tracking-tighter flex items-center justify-end gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                VERIFIED
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                                {!loading && filtered.length === 0 && (
                                    <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic">No matching certified organizations found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
