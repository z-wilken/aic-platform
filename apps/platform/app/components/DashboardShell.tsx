'use client';

import { useDashboardState } from './dashboard/useDashboardState';
import { DashboardSidebar } from './dashboard/DashboardSidebar';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { PhaseTracker } from './ui/PhaseTracker';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const {
    pathname,
    notifications,
    showNotifs,
    setShowNotifs,
    searchQuery,
    setSearchQuery,
    showMobileMenu,
    setShowMobileMenu,
    handleSearch,
    markAsRead,
    isActive,
    unreadCount,
  } = useDashboardState();

  return (
    <div className="min-h-screen flex bg-[#f0f4f8]">
      <DashboardSidebar
        show={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        isActive={isActive}
      />

      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Phase tracker — persistent below header */}
        <PhaseTracker currentPhase={2} />

        <div className="flex-1 px-6 py-4">
          <DashboardHeader
            pathname={pathname}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            onMenuOpen={() => setShowMobileMenu(true)}
            unreadCount={unreadCount}
            showNotifs={showNotifs}
            setShowNotifs={setShowNotifs}
            notifications={notifications}
            markAsRead={markAsRead}
          />
          <main className="fade-up">{children}</main>
        </div>
      </div>
    </div>
  );
}
