'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HQShellProps {
  children: ReactNode
}

export default function HQShell({ children }: HQShellProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Command Center', icon: '🏠' },
    { href: '/crm', label: 'Outreach CRM', icon: '🎯' },
    { href: '/cms', label: 'Content CMS', icon: '✍️' },
    { href: '/subscribers', label: 'Subscribers', icon: '📬' },
    { href: '/governance', label: 'Governance', icon: '⚖️' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex">
      {/* Sidebar - Sharp, Minimalist */}
      <aside className="w-64 bg-black border-r border-white/5 p-8 flex flex-col fixed h-full z-20">
        <div className="mb-16">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tighter">
            AIC<span className="text-aic-gold">HQ</span>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aic-gold animate-pulse"></span>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.3em]">Institutional Hub</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
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
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aic-gold to-yellow-700 flex items-center justify-center font-bold text-black text-xs">Z</div>
            <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest">Wilken, Z.</p>
                <p className="text-[8px] font-mono text-gray-500 uppercase">Director</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-black/50 backdrop-blur-xl z-10">
            <h2 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">
                {navItems.find(i => i.href === pathname)?.label || 'Internal'}
            </h2>
            <div className="flex gap-8 items-center">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-gray-500 uppercase">System Time</span>
                    <span className="text-[10px] font-mono text-white">{new Date().toLocaleTimeString()}</span>
                </div>
                <button className="bg-white text-black px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors">
                    Global Search
                </button>
            </div>
        </header>

        <div className="p-12 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
