'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifications] = useState(false);

  const fetchNotifs = () => {
    fetch('/api/notifications')
        .then(res => res.json())
        .then(data => setNotifications(data.notifications || []))
        .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: string) => {
    await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
    fetchNotifs();
  };

  const unreadCount = notifications.filter(n => n.status === 'UNREAD').length;

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

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-aic-paper">
      {/* Sidebar */}
      <div className="w-72 glass-sidebar text-white p-8 hidden md:flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="mb-12">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-xl bg-aic-gold/10 border border-aic-gold/30 flex items-center justify-center text-aic-gold font-serif font-bold text-xl group-hover:bg-aic-gold/20 transition-all">A</div>
                <div>
                    <h1 className="font-serif text-xl font-bold tracking-tight text-white leading-none">AIC PULSE</h1>
                    <p className="text-[8px] font-mono text-aic-gold uppercase tracking-[0.3em] mt-1">Integrity Core</p>
                </div>
            </Link>
        </div>
        
        <div className="space-y-10 flex-1">
            <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-6 px-4">Monitoring</div>
                <nav className="space-y-2">
                    {navItems.filter(i => i.section === 'Monitoring').map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
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

            <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-6 px-4">Certification</div>
                <nav className="space-y-2">
                    {navItems.filter(i => i.section === 'Certification').map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
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
        </div>

        <div className="mt-auto">
            <div className="p-4 rounded-xl bg-gradient-to-br from-aic-gold/10 to-transparent border border-aic-gold/20">
                <p className="text-[10px] text-aic-gold font-mono mb-1 uppercase tracking-widest">System Status</p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-white uppercase tracking-tighter">Live Audit Active</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 md:ml-72 min-h-screen">
        <header className="flex justify-between items-center mb-12 glass-panel p-6 rounded-3xl sticky top-6 z-30 shadow-xl shadow-black/[0.02]">
            <div>
                <div className="flex items-center gap-3 text-gray-400 mb-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Portal</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest italic">Live</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-aic-black tracking-tight">
                    {pathname === '/' ? 'Intelligence Overview' : pathname.substring(1).split('/').pop()?.replace(/-/g, ' ').toUpperCase()}
                </h2>
            </div>
            <div className="flex items-center gap-8">
                {/* Search Simulation */}
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-aic-paper border border-aic-black/5 rounded-xl text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Query Registry...</span>
                </div>

                {/* Notifications Bell */}
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifs)}
                        className={`relative p-2.5 rounded-xl transition-all ${showNotifs ? 'bg-aic-black text-white' : 'text-gray-400 hover:bg-aic-paper hover:text-aic-black'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-aic-red ring-4 ring-white"></span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifs && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                                <motion.div 
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                    className="absolute right-0 mt-6 w-96 bg-white border border-aic-black/5 shadow-2xl rounded-[2rem] overflow-hidden z-20"
                                >
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-aic-paper/30">
                                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Registry Alerts</h4>
                                        <span className="text-[10px] font-mono font-bold text-aic-gold bg-aic-gold/10 px-2 py-0.5 rounded-full">{unreadCount} Critical</span>
                                    </div>
                                    <div className="max-h-[32rem] overflow-y-auto">
                                        {notifications.map(n => (
                                            <div 
                                                key={n.id} 
                                                onClick={() => markAsRead(n.id)}
                                                className={`p-6 border-b border-gray-50 cursor-pointer hover:bg-aic-paper/50 transition-colors ${n.status === 'UNREAD' ? 'bg-aic-gold/[0.02]' : ''} group`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <p className="text-xs font-bold text-aic-black font-serif group-hover:text-aic-gold transition-colors">{n.title}</p>
                                                    <p className="text-[8px] font-mono text-gray-300 uppercase tracking-tighter">{new Date(n.created_at).toLocaleTimeString()}</p>
                                                </div>
                                                <p className="text-[11px] text-gray-500 leading-relaxed font-serif italic line-clamp-2">"{n.message}"</p>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <div className="p-16 text-center text-gray-400 font-serif italic text-sm">
                                                No intelligence updates at this time.
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-5 border-l border-gray-100 pl-8">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-gray-900 font-serif leading-none tracking-tight">Dr. Sarah Khumalo</p>
                        <p className="text-[9px] text-aic-gold font-mono uppercase tracking-[0.2em] mt-1.5 font-bold">Principal Officer</p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-aic-black border-2 border-white shadow-xl shadow-black/10 overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-tr from-aic-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="h-full w-full flex items-center justify-center text-aic-gold font-serif font-bold">SK</div>
                    </div>
                </div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
}
