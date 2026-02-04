'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/', section: 'Monitoring' },
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
      {/* Sidebar - Dark Glass */}
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
      
      {/* Main Content - Pushed over to make room for fixed sidebar */}
      <div className="flex-1 p-8 md:ml-72">
        <header className="flex justify-between items-center mb-10 glass-panel p-4 rounded-2xl sticky top-4 z-10">
            <div>
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {pathname === '/' ? 'Overview' : pathname.substring(1).replace('-', ' ').toUpperCase()}
                </h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900 font-serif leading-none">Dr. Sarah Khumalo</p>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">Compliance Lead</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-aic-black to-gray-700 border-2 border-white shadow-md"></div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
}