import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function useDashboardState() {
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await fetch('/api/notifications');
        const data = await res.json();
        setNotifications(data.notifications || []);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/audits?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAsRead = async (id: string) => {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchNotifs();
  };

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  return {
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
    unreadCount: notifications.filter(n => n.status === 'UNREAD').length
  };
}
