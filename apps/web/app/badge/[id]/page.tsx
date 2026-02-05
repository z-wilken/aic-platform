'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';

export default function TrustBadgePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const orgId = params.id;
    const [org, setOrg] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/registry?verify_id=${orgId}`)
            .then(res => res.json())
            .then(data => {
                setOrg(data.organization);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [orgId]);

    if (loading || !org) return null;

    return (
        <main className="h-screen w-full flex items-center justify-center bg-transparent overflow-hidden">
            <a 
                href={`http://localhost:3000/verify/${org.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block relative"
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-aic-black border border-aic-gold/30 p-4 rounded-xl shadow-2xl flex items-center gap-4 hover:border-aic-gold transition-colors min-w-[240px]"
                >
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full border border-aic-gold/50 flex items-center justify-center bg-black">
                            <span className="text-aic-gold font-serif text-lg font-bold">A</span>
                        </div>
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-aic-black animate-pulse" />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <p className="text-[8px] font-mono font-bold text-aic-gold uppercase tracking-widest leading-none mb-1">AIC Certified</p>
                            <span className="text-[10px] font-mono text-white font-bold">{org.integrity_score}%</span>
                        </div>
                        <h4 className="text-white font-serif text-xs font-medium truncate max-w-[140px] mb-1">{org.name}</h4>
                        <p className="text-[7px] font-mono text-gray-500 uppercase tracking-tighter">
                            {org.tier?.replace('_', ' ')} • Human-Accountable
                        </p>
                    </div>

                    <div className="pl-2 border-l border-white/10 group-hover:pl-3 transition-all">
                        <span className="text-white text-xs">→</span>
                    </div>
                </motion.div>
                
                {/* Institutional Shine Effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg]"
                    />
                </div>
            </a>
        </main>
    );
}
