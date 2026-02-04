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
    { label: 'Overview', href: '/', section: 'Monitoring' },
    { label: 'Pulse Telemetry', href: '/pulse', section: 'Monitoring' },
    { label: 'Audit Logs', href: '/audits', section: 'Monitoring' },
    { label: 'Roadmap', href: '/roadmap', section: 'Certification' },
    { label: 'Certificate', href: '/certificate', section: 'Certification' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-aic-paper">
      {/* Sidebar */}
      <div className="w-72 glass-sidebar text-white p-6 hidden md:flex flex-col fixed h-full z-20">
        <div className="mb-12 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-aic-gold/20 border border-aic-gold/50 flex items-center justify-center text-aic-gold font-serif font-bold">A</div>
                <h1 className="font-serif text-xl font-bold tracking-wide">AIC PULSE</h1>
            </Link>
        </div>
        
        <div className="space-y-8 flex-1">
            <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-4">Monitoring</div>
                <nav className="space-y-1">
                    {navItems.filter(i => i.section === 'Monitoring').map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`block py-3 px-4 rounded-xl font-mono text-xs tracking-widest transition-all ${
                                isActive(item.href) 
                                ? 'bg-white/10 border border-white/5 text-white shadow-lg shadow-black/20' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {item.label.toUpperCase()}
                        </Link>
                    ))}
                </nav>
            </div>

            <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-4">Certification</div>
                <nav className="space-y-1">
                    {navItems.filter(i => i.section === 'Certification').map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`block py-3 px-4 rounded-xl font-mono text-xs tracking-widest transition-all ${
                                isActive(item.href) 
                                ? 'bg-white/10 border border-white/5 text-white shadow-lg shadow-black/20' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
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
      <div className="flex-1 p-8 md:ml-72">
        <header className="flex justify-between items-center mb-10 glass-panel p-4 rounded-2xl sticky top-4 z-30">
            <div>
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {pathname === '/' ? 'Overview' : pathname.substring(1).replace('-', ' ').toUpperCase()}
                </h2>
            </div>
            <div className="flex items-center gap-6">
                {/* Notifications Bell */}
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifs)}
                        className="relative p-2 text-gray-400 hover:text-aic-black transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-aic-red ring-2 ring-white"></span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifs && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-4 w-80 bg-white border border-aic-black/5 shadow-2xl rounded-2xl overflow-hidden z-20"
                                >
                                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-aic-paper/30">
                                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest">System Alerts</h4>
                                        <span className="text-[9px] font-mono text-gray-400">{unreadCount} New</span>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map(n => (
                                            <div 
                                                key={n.id} 
                                                onClick={() => markAsRead(n.id)}
                                                className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-aic-paper/50 transition-colors ${n.status === 'UNREAD' ? 'bg-aic-gold/5' : ''}`}
                                            >
                                                <p className="text-[10px] font-bold text-aic-black mb-1">{n.title}</p>
                                                <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{n.message}</p>
                                                <p className="text-[8px] font-mono text-gray-300 mt-2 uppercase">{new Date(n.created_at).toLocaleTimeString()}</p>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <div className="p-12 text-center text-gray-400 font-serif italic text-xs">
                                                No notifications at this time.
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-gray-900 font-serif leading-none">Dr. Sarah Khumalo</p>
                        <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mt-1">Compliance Lead</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-aic-black to-gray-700 border-2 border-white shadow-md"></div>
                </div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
}
