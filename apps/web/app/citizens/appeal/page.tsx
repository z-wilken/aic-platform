'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';

export default function CitizenAppealPage() {
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/registry')
            .then(res => res.json())
            .then(data => setOrganizations(data.organizations || []));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/appeal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error(error);
            alert("Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-aic-paper text-aic-black">
                <Navbar />
                <div className="py-32 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl text-center p-12 bg-white border border-aic-black/5 rounded-[3rem] shadow-2xl"
                    >
                        <div className="text-6xl mb-8">⚖️</div>
                        <h2 className="font-serif text-4xl font-medium mb-6">Appeal Registered</h2>
                        <p className="font-serif text-lg text-gray-500 leading-relaxed italic mb-12">
                            Your concern has been securely transmitted to the relevant organization and AIC Lead Auditors. POPIA Section 71 mandates a human-led review of your case.
                        </p>
                        <div className="bg-aic-gold/10 p-4 rounded-xl border border-aic-gold/20 inline-block mb-12">
                            <p className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest mb-1">REFERENCE</p>
                            <p className="text-xl font-mono font-bold">AIC-APL-{Math.floor(Math.random() * 10000)}</p>
                        </div>
                        <br />
                        <a href="/" className="font-mono text-[10px] font-bold uppercase tracking-widest text-aic-black border-b-2 border-aic-black pb-1">Return Home</a>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-aic-paper">
            <Navbar />
            <div className="py-32">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24"
                    >
                        <h2 className="font-mono text-[10px] font-bold text-aic-red uppercase tracking-[0.4em] mb-6">Right to Correction</h2>
                        <p className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-aic-black leading-tight">
                            Appeal a <br />Decision.
                        </p>
                        <p className="mt-12 text-xl text-gray-500 font-serif leading-relaxed italic max-w-2xl mx-auto">
                            If you believe an automated system has made an error or treated you unfairly, you have the legal right to a human review.
                        </p>
                    </motion.div>

                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="bg-white p-12 md:p-16 rounded-[3rem] border border-aic-black/5 shadow-2xl space-y-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Target Organization</label>
                                <select name="orgId" required className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-serif text-lg bg-transparent transition-colors">
                                    <option value="">Select Organization...</option>
                                    {organizations.map(org => (
                                        <option key={org.id} value={org.id}>{org.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Your Contact Email</label>
                                <input type="email" name="citizen_email" required placeholder="name@example.com" className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-serif text-lg bg-transparent transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Affected System (If Known)</label>
                            <input type="text" name="system_name" placeholder="e.g. Credit Approval Model, Recruitment Bot" className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-serif text-lg bg-transparent transition-colors" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Description of Concern</label>
                            <textarea name="description" required rows={5} placeholder="Please explain why you are contesting this automated decision..." className="w-full border border-aic-black/10 p-6 rounded-2xl focus:border-aic-gold outline-none font-serif text-lg bg-aic-paper/30 transition-colors"></textarea>
                        </div>

                        <div className="p-8 bg-aic-paper rounded-2xl border border-aic-black/5">
                            <div className="flex gap-4">
                                <div className="text-2xl">🛡️</div>
                                <p className="text-sm text-gray-500 font-serif leading-relaxed italic">
                                    AIC serves as an independent intermediary. Your appeal will be logged in the organization’s accountability dashboard, and our auditors will track the resolution process.
                                </p>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-aic-black text-white py-6 font-mono font-bold text-xs uppercase tracking-[0.3em] hover:bg-aic-red transition-all shadow-xl disabled:opacity-50"
                        >
                            {loading ? 'TRANSMITTING APPEAL...' : 'SUBMIT OFFICIAL APPEAL'}
                        </button>
                    </motion.form>
                </div>
            </div>
        </main>
    );
}
