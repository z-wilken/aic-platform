import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Overview', href: '/', section: 'Monitoring', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { label: 'Pulse Telemetry', href: '/pulse', section: 'Monitoring', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { label: 'Audit Logs', href: '/audits', section: 'Monitoring', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
  { label: 'Compliance Reports', href: '/reports', section: 'Monitoring', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
  { label: 'Roadmap', href: '/roadmap', section: 'Certification', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
  { label: 'Incidents', href: '/incidents', section: 'Certification', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
  { label: 'API Integrations', href: '/settings/keys', section: 'Certification', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg> },
  { label: 'Certificate', href: '/certificate', section: 'Certification', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-8.061 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 8.061 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.946 8.061 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-8.061 3.42 3.42 0 010-4.438z" /></svg> },
];

export function DashboardSidebar({ 
  show, 
  onClose, 
  isActive 
}: { 
  show: boolean; 
  onClose: () => void; 
  isActive: (href: string) => boolean 
}) {
  return (
    <motion.div 
      className={`w-72 glass-sidebar text-white p-8 flex flex-col fixed h-full z-40 shadow-2xl transition-transform duration-300 md:translate-x-0 ${show ? 'translate-x-0' : '-translate-x-full md:flex'}`}
      initial={false}
    >
      <div className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-aic-gold/10 border border-aic-gold/30 flex items-center justify-center text-aic-gold font-serif font-bold text-xl group-hover:bg-aic-gold/20 transition-all">A</div>
              <div>
                  <h1 className="font-serif text-xl font-bold tracking-tight text-white leading-none">AIC PULSE</h1>
                  <p className="text-[8px] font-mono text-aic-gold uppercase tracking-[0.3em] mt-1">Integrity Core</p>
              </div>
          </Link>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
      </div>
      
      <div className="space-y-10 flex-1 overflow-y-auto">
          {['Monitoring', 'Certification'].map((section) => (
            <div key={section}>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-6 px-4">{section}</div>
                <nav className="space-y-2">
                    {navItems.filter(i => i.section === section).map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            onClick={onClose}
                            className={`flex items-center gap-4 py-3 px-4 rounded-xl font-mono text-[10px] font-bold tracking-[0.15em] transition-all group ${
                                isActive(item.href) 
                                ? 'bg-white/10 border border-white/5 text-aic-gold shadow-lg' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span className={isActive(item.href) ? 'text-aic-gold' : 'text-gray-500 group-hover:text-gray-300'}>
                                {item.icon}
                            </span>
                            {item.label.toUpperCase()}
                        </Link>
                    ))}
                </nav>
            </div>
          ))}
      </div>

      <div className="mt-auto pt-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-aic-gold/10 to-transparent border border-aic-gold/20">
              <p className="text-[10px] text-aic-gold font-mono mb-1 uppercase tracking-widest">System Status</p>
              <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-tighter">Live Audit Active</span>
              </div>
          </div>
      </div>
    </motion.div>
  );
}
