'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function EnterpriseCRMPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                setLeads(data.leads || []);
                setLoading(false);
            });
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'ALPHA_ENROLLED': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'HIGH_INTENT': return 'bg-aic-gold/10 text-aic-gold border-aic-gold/20';
            default: return 'bg-white/5 text-gray-500 border-white/10';
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-white tracking-tight mb-4 tracking-tighter">Enterprise CRM</h1>
                    <p className="text-gray-500 font-serif italic text-lg leading-relaxed max-w-2xl">
                        Global pipeline management for AI accountability certification.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-[#080808] border border-white/5 px-6 py-3 rounded-2xl text-right">
                        <p className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">Total Pipeline</p>
                        <p className="text-xl font-serif font-bold">R 4.2M</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/5 font-mono text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                        <tr>
                            <th className="p-8">Institutional Entity</th>
                            <th className="p-8">Engagement Source</th>
                            <th className="p-8">Intent Score</th>
                            <th className="p-8">Account Status</th>
                            <th className="p-8 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-serif">
                        {loading ? (
                            <tr><td colSpan={5} className="p-20 text-center text-gray-600 italic">Syncing with growth registry...</td></tr>
                        ) : (
                            leads.map((lead, i) => (
                                <motion.tr 
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="p-8">
                                        <p className="text-lg font-bold text-white tracking-tight">{lead.company || lead.email.split('@')[1]}</p>
                                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter mt-1">{lead.email}</p>
                                    </td>
                                    <td className="p-8">
                                        <span className="font-mono text-[10px] text-gray-400">{lead.source}</span>
                                    </td>
                                    <td className="p-8 text-aic-gold font-mono font-bold text-lg">
                                        {lead.score || 0}%
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-3 py-1 rounded-full border text-[8px] font-mono font-bold uppercase tracking-widest ${getStatusStyle(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button className="text-[10px] font-mono font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest">
                                            Manage Lead →
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}