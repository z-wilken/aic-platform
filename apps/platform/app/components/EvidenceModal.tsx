'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EvidenceModalProps {
    isOpen: boolean;
    onClose: () => void;
    requirement: any;
    onSubmit: (url: string) => void;
}

export default function EvidenceModal({ isOpen, onClose, requirement, onSubmit }: EvidenceModalProps) {
    const [url, setUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        // Simulate a delay for the "upload"
        setTimeout(() => {
            onSubmit(url);
            setUrl('');
            setIsUploading(false);
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-aic-black/60 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-aic-black/5"
                >
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.3em]">Submit Evidence</span>
                                <h3 className="font-serif text-2xl font-medium text-aic-black mt-2">{requirement?.title}</h3>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-aic-black transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 font-serif leading-relaxed mb-8">
                            Please provide a secure URL to the requested evidence. This can be a link to a secure document repository, technical report, or cloud storage.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Evidence URL</label>
                                <input 
                                    type="url" 
                                    required 
                                    placeholder="https://drive.google.com/..." 
                                    className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-mono text-xs transition-colors"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>

                            <div className="bg-aic-paper/50 p-4 rounded-xl border border-aic-black/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-aic-gold animate-pulse" />
                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Secure Transfer Active</p>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isUploading}
                                className="w-full bg-aic-black text-white py-4 font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-aic-gold transition-colors disabled:opacity-50"
                            >
                                {isUploading ? 'TRANSMITTING EVIDENCE...' : 'CONFIRM SUBMISSION'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
