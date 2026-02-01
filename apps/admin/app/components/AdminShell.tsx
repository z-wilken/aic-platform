'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface AdminShellProps {
  children: ReactNode
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/applications', label: 'Applications', icon: '📝' },
    { href: '/certifications', label: 'Certifications', icon: '🏆' },
    { href: '/audits', label: 'Audits', icon: '🔍' },
    { href: '/organizations', label: 'Organizations', icon: '🏢' },
    { href: '/verification', label: 'Verification', icon: '✅' },
    { href: '/reports', label: 'Reports', icon: '📈' },
  ]

  return (
    <div className="min-h-screen bg-[#111111] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-gray-800 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-widest">
            AIC <span className="text-blue-500">ADMIN</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Internal Operations v2.0</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">AIC Staff</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-[#111111]/80 backdrop-blur-xl border-b border-gray-800 px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">AIC Internal</p>
                <h2 className="font-bold">{navItems.find(i => i.href === pathname)?.label || 'Admin'}</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-gray-400">Engine Online</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
                + New Audit
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
