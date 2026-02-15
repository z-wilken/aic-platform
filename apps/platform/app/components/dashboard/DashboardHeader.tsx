import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  pathname: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  onMenuOpen: () => void;
  unreadCount: number;
  showNotifs: boolean;
  setShowNotifs: (show: boolean) => void;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    status: string;
    created_at: string;
  }>;
  markAsRead: (id: string) => void;
}

export function DashboardHeader({ 
  pathname, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  onMenuOpen,
  unreadCount,
  showNotifs,
  setShowNotifs,
  notifications,
  markAsRead
}: DashboardHeaderProps) {
  return (
    <header className="flex justify-between items-center mb-12 glass-panel p-4 md:p-6 rounded-3xl sticky top-6 z-30 shadow-xl shadow-black/[0.02]">
        <div className="flex items-center gap-4">
            <button 
                onClick={onMenuOpen}
                className="md:hidden p-2 text-gray-500 hover:text-aic-black bg-aic-paper rounded-xl border border-aic-black/5"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
                <div className="flex items-center gap-3 text-gray-400 mb-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-widest">Portal</span>
                    <span className="hidden sm:inline text-gray-300">/</span>
                    <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest italic">Live</span>
                </div>
                <h2 className="text-sm md:text-2xl font-serif font-bold text-aic-black tracking-tight line-clamp-1">
                    {pathname === '/' ? 'Intelligence Overview' : pathname.substring(1).split('/').pop()?.replace(/-/g, ' ').toUpperCase()}
                </h2>
            </div>
        </div>
        
        <div className="flex items-center gap-8">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full mr-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] font-mono font-bold text-green-600 uppercase tracking-widest flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Integrity: Secure
                </span>
            </div>

            <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-3 px-4 py-2 bg-aic-paper border border-aic-black/5 rounded-xl text-gray-400 focus-within:border-aic-gold transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                    type="text"
                    placeholder="Query Registry..."
                    className="bg-transparent border-none outline-none font-mono text-[10px] uppercase tracking-widest font-bold placeholder:text-gray-300 text-aic-black w-40"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className="relative">
                <button 
                    onClick={() => setShowNotifs(!showNotifs)}
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
                            <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)}></div>
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
                                    {notifications.map((n) => (
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

            <div className="flex items-center gap-5 border-l border-gray-100 pl-8 text-right hidden sm:flex">
                <div>
                    <p className="text-xs font-bold text-gray-900 font-serif leading-none tracking-tight">Institutional Account</p>
                    <p className="text-[9px] text-aic-gold font-mono uppercase tracking-[0.2em] mt-1.5 font-bold">Principal Officer</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-aic-black border-2 border-white shadow-xl shadow-black/10 flex items-center justify-center text-aic-gold font-serif font-bold">
                    SK
                </div>
            </div>
        </div>
    </header>
  );
}
