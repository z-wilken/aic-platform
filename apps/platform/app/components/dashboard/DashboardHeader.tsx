'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';

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
    status: 'UNREAD' | 'READ';
    created_at: string;
  }>;
  markAsRead: (id: string) => Promise<void> | void;
}

const PAGE_TITLES: Record<string, string> = {
  '/':               'Dashboard',
  '/evidence':       'Evidence Vault',
  '/pulse':          'Pulse Monitor',
  '/findings':       'Auditor Findings',
  '/reports':        'Compliance Reports',
  '/correspondence': 'Correspondence',
  '/certificate':    'My Certificate',
  '/practitioner':   'Practitioner (CAAP)',
  '/settings/keys':  'API & Access Keys',
  '/organisation':   'Organisation Profile',
};

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
  markAsRead,
}: DashboardHeaderProps) {
  const pageTitle = PAGE_TITLES[pathname] ?? pathname.split('/').pop()?.replace(/-/g, ' ') ?? 'Dashboard';

  return (
    <header className="flex justify-between items-center mb-8 bg-white border border-[#e5e7eb] rounded-2xl px-5 py-3 sticky top-4 z-30 shadow-sm">
      {/* Left: breadcrumb + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 text-[#6b7280] hover:text-[#0f1f3d] bg-[#f0f4f8] rounded-lg border border-[#e5e7eb]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] font-mono font-bold text-[#6b7280] uppercase tracking-widest">Portal</span>
            <span className="text-[#e5e7eb]">/</span>
            <span className="text-[9px] font-mono font-bold text-[#c9920a] uppercase tracking-widest">
              {pageTitle}
            </span>
          </div>
          <h2 className="text-base font-serif font-bold text-[#0f1f3d] leading-tight tracking-tight">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* Right: search + notifications + user */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#f0f4f8] border border-[#e5e7eb] rounded-lg text-[#6b7280] focus-within:border-[#c9920a] transition-colors"
        >
          <Search className="w-3.5 h-3.5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search…"
            className="bg-transparent border-none outline-none font-mono text-[10px] uppercase tracking-widest font-semibold placeholder:text-[#9ca3af] text-[#0f1f3d] w-32"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className={`relative p-2 rounded-lg transition-all border ${
              showNotifs
                ? 'bg-[#0f1f3d] text-white border-[#0f1f3d]'
                : 'text-[#6b7280] hover:bg-[#f0f4f8] hover:text-[#0f1f3d] border-[#e5e7eb]'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-white" />
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute right-0 mt-3 w-96 bg-white border border-[#e5e7eb] shadow-2xl rounded-2xl overflow-hidden z-20"
                >
                  <div className="px-5 py-4 border-b border-[#e5e7eb] flex justify-between items-center">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                      Alerts
                    </h4>
                    {unreadCount > 0 && (
                      <span className="text-[9px] font-mono font-bold text-[#c9920a] bg-amber-50 px-2 py-0.5 rounded">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`px-5 py-4 border-b border-[#f3f4f6] cursor-pointer hover:bg-[#f9fafb] transition-colors ${
                          n.status === 'UNREAD' ? 'bg-amber-50/30' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs font-bold text-[#0f1f3d]">{n.title}</p>
                          <p className="text-[9px] font-mono text-[#9ca3af]">
                            {new Date(n.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                        <p className="text-[11px] text-[#6b7280] leading-relaxed line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="p-10 text-center text-[#9ca3af] text-sm font-serif italic">
                        No alerts at this time.
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="hidden sm:flex items-center gap-3 border-l border-[#e5e7eb] pl-4">
          <div className="text-right">
            <p className="text-xs font-semibold text-[#0f1f3d] leading-none">Institutional Account</p>
            <p className="text-[9px] text-[#c9920a] font-mono uppercase tracking-widest mt-1 font-bold">
              Principal Officer
            </p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-[#0f1f3d] flex items-center justify-center text-[#c9920a] font-serif font-bold text-sm">
            SK
          </div>
        </div>
      </div>
    </header>
  );
}
