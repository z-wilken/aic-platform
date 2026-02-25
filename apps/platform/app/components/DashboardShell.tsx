'use client';

import { useDashboardState } from './dashboard/useDashboardState';
import { DashboardSidebar } from './dashboard/DashboardSidebar';
import { DashboardHeader } from './dashboard/DashboardHeader';

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
    unreadCount
  } = useDashboardState();

  return (
    <div className="min-h-screen flex bg-aic-navy">
      <DashboardSidebar 
        show={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)} 
        isActive={isActive} 
      />

      {showMobileMenu && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setShowMobileMenu(false)}
        />
      )}
      
      <div className="flex-1 p-4 md:p-8 md:ml-72 min-h-screen">
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
        {children}
      </div>
    </div>
  );
}
