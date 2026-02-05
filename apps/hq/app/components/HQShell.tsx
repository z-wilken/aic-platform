'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

interface HQShellProps {
  children: ReactNode
}

export default function HQShell({ children }: HQShellProps) {
  const pathname = usePathname()
  const { data: session }: any = useSession()

  const permissions = session?.user?.permissions || {}
  const isSuperAdmin = session?.user?.isSuperAdmin

  const navGroups = [
    {
        label: 'Intelligence',
        items: [
            { href: '/', label: 'Command Center', icon: '🏠', permission: 'view_dashboard' },
        ]
    },
    {
        label: 'Growth HQ',
        items: [
            { href: '/crm', label: 'Outreach CRM', icon: '🎯', permission: 'view_crm' },
            { href: '/cms', label: 'Content CMS', icon: '✍️', permission: 'view_cms' },
            { href: '/subscribers', label: 'Subscribers', icon: '📬', permission: 'view_cms' },
        ]
    },
    {
        label: 'Audit Factory',
        items: [
            { href: '/organizations', label: 'Managed Orgs', icon: '🏢', permission: 'view_audits' },
            { href: '/audits', label: 'Audit Pipeline', icon: '🔍', permission: 'view_audits' },
            { href: '/verification', label: 'Queue', icon: '✅', permission: 'verify_evidence' },
        ]
    },
    {
        label: 'Institutional',
        items: [
            { href: '/training', label: 'Academy', icon: '🎓', permission: 'view_academy' },
            { href: '/governance', label: 'Governance', icon: '⚖️', superOnly: true },
            { href: '/settings', label: 'Settings', icon: '⚙️', permission: 'view_dashboard' },
        ]
    }
  ]

  const canSee = (item: any) => {
      if (isSuperAdmin) return true;
      if (item.superOnly) return false;
      if (!item.permission) return true;
      return permissions[item.permission] === true;
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-8 pb-4">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tighter">
            AIC<span className="text-aic-gold">HQ</span>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aic-gold animate-pulse"></span>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.3em]">Unified Command</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
          {navGroups.map((group) => {
              const visibleItems = group.items.filter(canSee);
              if (visibleItems.length === 0) return null;

              return (
                  <div key={group.label} className="space-y-2">
                      <h3 className="px-4 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-[0.4em] mb-4">{group.label}</h3>
                      {visibleItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-4 px-4 py-3 transition-all rounded-lg group ${
                            pathname === item.href
                              ? 'bg-aic-gold text-black'
                              : 'text-gray-500 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{item.label}</span>
                        </Link>
                      ))}
                  </div>
              )
          })}
        </nav>

        <div className="p-8 border-t border-white/5 bg-black flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aic-gold to-yellow-700 flex items-center justify-center font-bold text-black text-xs uppercase">
                {session?.user?.name?.substring(0, 1)}
            </div>
            <div className="overflow-hidden">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest truncate">{session?.user?.name || 'Loading...'}</p>
                <p className="text-[8px] font-mono text-gray-500 uppercase">{isSuperAdmin ? 'Super Admin' : session?.user?.role}</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-black/50 backdrop-blur-xl z-10">
            <h2 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">
                System Operational
            </h2>
            <div className="flex gap-8 items-center">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-gray-500 uppercase">Latency</span>
                    <span className="text-[10px] font-mono text-green-400">14ms</span>
                </div>
                <button className="bg-white text-black px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors">
                    Search Registry
                </button>
            </div>
        </header>

        <div className="p-12 flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.02),_transparent)]">
          {children}
        </div>
      </main>
    </div>
  )
}