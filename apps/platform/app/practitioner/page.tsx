'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import { CPDProgressBar } from './components/CPDProgressBar';
import { motion } from 'framer-motion';
import { 
  Shield, 
  BookOpen, 
  GraduationCap, 
  Lock, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Loader2, 
  Download,
  Fingerprint
} from 'lucide-react';
import { SovereignButton, ButtonState } from '../components/SovereignButton';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function PractitionerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloadState, setDownloadState] = useState<ButtonState>('idle');

  useEffect(() => {
    fetch('/api/practitioner')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDownloadLicense = async () => {
    setDownloadState('loading');
    try {
      const response = await fetch('/api/practitioner/certificate');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AIC-Practitioner-License.pdf`;
        a.click();
        setDownloadState('success');
        setTimeout(() => setDownloadState('idle'), 2000);
      } else {
        setDownloadState('error');
      }
    } catch {
      setDownloadState('error');
    }
  };

  if (loading) return (
    <DashboardShell>
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-aic-cyan" />
        <p className="italic text-aic-slate font-serif">Syncing with global professional registry...</p>
      </div>
    </DashboardShell>
  );

  const exams = data?.exams || [];

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-aic-cyan font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
              <Award className="w-4 h-4" />
              Certified Practitioner Portal
            </div>
            <h1 className="text-6xl font-serif font-bold text-white tracking-tighter leading-none">
              Professional Identity<span className="text-aic-cyan">.</span>
            </h1>
            <p className="text-xl text-aic-slate font-serif leading-relaxed italic max-w-2xl">
              ISO/IEC 17024 compliant professional development tracking. This is your Sovereign cryptographic proof of ethical competency.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl min-w-[260px] text-center group hover:border-aic-cyan transition-all">
            <span className="text-[9px] font-mono font-bold text-aic-cyan uppercase tracking-widest block mb-3 opacity-60">Identity Status</span>
            <div className="text-2xl font-serif font-bold text-white tracking-tight">{data?.identity?.level || 'CANDIDATE'}</div>
            <div className="mt-4 flex justify-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
              {[...Array(5)].map((_, i) => <div key={i} className="h-1 w-4 bg-aic-cyan rounded-full" />)}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* CPD Column */}
          <div className="lg:col-span-2 space-y-12">
            <CPDProgressBar 
              progress={data?.cpd?.progress || 0} 
              label={data?.cpd?.label || "Annual Certification Cycle"} 
              sublabel={`Reporting Period: ${data?.cpd?.cycle || '2026'}`}
            />

            <div className="space-y-8">
              <h3 className="text-[10px] font-mono font-bold text-aic-slate uppercase tracking-[0.4em] px-2 flex items-center gap-3">
                <BookOpen className="w-3 h-3 text-aic-cyan" />
                Knowledge Repository (Item Bank)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exams.map((exam: any) => (
                  <motion.div 
                    key={exam.id}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className={cn(
                      "p-8 rounded-[2.5rem] border transition-all duration-500",
                      exam.status === 'COMPLETED' 
                        ? "bg-aic-cyan/5 border-aic-cyan/20" 
                        : "bg-white/[0.02] border-white/5 shadow-sm"
                    )}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn(
                        "p-4 rounded-2xl",
                        exam.status === 'LOCKED' ? "bg-white/5 text-aic-slate" : "bg-aic-cyan/10 text-aic-cyan"
                      )}>
                        {exam.status === 'LOCKED' ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      {exam.status === 'COMPLETED' && (
                        <span className="px-3 py-1 bg-aic-cyan text-black text-[8px] font-bold font-mono rounded uppercase tracking-widest">Verified</span>
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-2 text-white">{exam.name}</h4>
                    <p className="text-[9px] text-aic-slate font-mono uppercase tracking-widest leading-relaxed">
                      {exam.status === 'LOCKED' ? `Prerequisite: ${exam.requirement}` : exam.status === 'COMPLETED' ? `Earned: ${exam.date}` : 'Examination Session Ready'}
                    </p>
                    
                    {exam.status === 'AVAILABLE' && (
                      <button className="mt-8 flex items-center gap-2 text-[10px] font-mono font-bold text-aic-cyan hover:text-white transition-all uppercase tracking-widest group">
                        Enter Secure Gateway <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Sidebar */}
          <div className="space-y-10">
            <div className="bg-aic-cyan/10 border border-aic-cyan/20 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 font-serif italic text-7xl select-none uppercase pointer-events-none group-hover:opacity-10 transition-opacity">Proof</div>
              <h3 className="text-[10px] font-mono font-bold text-aic-cyan uppercase tracking-[0.4em] mb-10 relative z-10">Institutional Shield</h3>
              <div className="space-y-8 relative z-10">
                {[
                  "ISO 17024 Accredited Exam Proctoring",
                  "Biometric Identity Verification",
                  "Encrypted Item Bank Protection"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="p-1.5 rounded-full bg-aic-cyan shadow-[0_0_10px_#00F5FF]">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-xs font-serif italic text-aic-slate">{item}</span>
                  </div>
                ))}
              </div>
              
              <SovereignButton 
                variant="primary"
                state={downloadState}
                onClick={handleDownloadLicense}
                className="w-full mt-12 py-5"
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download License
              </SovereignButton>
            </div>

            <div className="p-10 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] text-center group hover:border-aic-cyan/30 transition-all">
              <Fingerprint className="w-10 h-10 text-aic-slate mx-auto mb-6 group-hover:text-aic-cyan transition-colors" />
              <p className="text-xs text-aic-slate font-serif italic leading-relaxed">
                Your CPD telemetry is linked to the Sovereign Professional Registry. 
                <br /><br />
                Last synchronized: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
