'use client';

import { useEffect, useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [resolution, setResolution] = useState<Record<string, string>>({});

    const fetchIncidents = () => {
        fetch('/api/incidents')
            .then(res => res.json())
            .then(data => {
                setIncidents(data.incidents || []);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const handleResolve = async (id: string) => {
        if (!resolution[id]) return alert("Please provide resolution details.");
        
        try {
            const response = await fetch('/api/incidents', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, resolution: resolution[id], status: 'RESOLVED' })
            });

            if (response.ok) {
                alert("Incident resolved. Human oversight logged.");
                fetchIncidents();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto pb-24">
                <div className="mb-12">
                    <h1 className="text-3xl font-serif font-bold text-aic-black underline decoration-aic-red underline-offset-8">Accountability Incidents</h1>
                    <p className="text-gray-500 font-serif mt-4 italic max-w-2xl">
                        Citizen appeals and algorithmic errors requiring meaningful human intervention (POPIA Sec. 71).
                    </p>
                </div>

                <div className="space-y-8">
                    {loading ? (
                        <div className="p-12 text-center text-gray-400 italic">Syncing with justice layer...</div>
                    ) : incidents.length === 0 ? (
                        <div className="p-16 border border-dashed border-aic-black/10 rounded-3xl text-center bg-white">
                            <span className="text-4xl block mb-4">✅</span>
                            <p className="font-serif text-gray-500">Zero active citizen appeals found. Your algorithmic systems are stable.</p>
                        </div>
                    ) : incidents.map((incident, i) => (
                        <motion.div 
                            key={incident.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white border p-8 rounded-[2rem] shadow-sm ${incident.status === 'OPEN' ? 'border-aic-red/20' : 'border-aic-black/5'}`}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded-full border ${
                                        incident.status === 'OPEN' ? 'bg-red-50 text-aic-red border-aic-red/20' : 'bg-green-50 text-green-600 border-green-200'
                                    }`}>
                                        {incident.status}
                                    </span>
                                    <h3 className="text-xl font-serif font-medium text-aic-black mt-4">Appeal from {incident.citizen_email}</h3>
                                    <p className="text-[10px] font-mono text-gray-400 uppercase mt-1">System: {incident.system_name}</p>
                                </div>
                                <span className="text-[10px] font-mono text-gray-400">{new Date(incident.created_at).toLocaleString()}</span>
                            </div>

                            <div className="bg-aic-paper/50 p-6 rounded-2xl mb-8 border border-aic-black/5 italic font-serif text-gray-600">
                                "{incident.description}"
                            </div>

                            {incident.status === 'OPEN' ? (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Human Oversight Resolution</p>
                                    <textarea 
                                        className="w-full bg-transparent border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-serif text-sm transition-colors"
                                        rows={3}
                                        placeholder="Explain the result of the human review and any corrections made..."
                                        value={resolution[incident.id] || ''}
                                        onChange={(e) => setResolution({ ...resolution, [incident.id]: e.target.value })}
                                    />
                                    <button 
                                        onClick={() => handleResolve(incident.id)}
                                        className="bg-aic-black text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-red transition-all"
                                    >
                                        Submit Resolution
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-6 border-t border-aic-black/5">
                                    <p className="text-[10px] font-mono font-bold text-green-600 uppercase tracking-widest mb-2">Resolution Logged</p>
                                    <p className="font-serif text-sm text-gray-500 leading-relaxed italic">"{incident.resolution_details}"</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}
