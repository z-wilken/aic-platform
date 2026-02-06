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
    { href: '/', label: 'Dashboard', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg> },
    { href: '/leads', label: 'Leads', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { href: '/applications', label: 'Applications', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { href: '/certifications', label: 'Certifications', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-8.061 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 8.061 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.946 8.061 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-8.061 3.42 3.42 0 010-4.438z" /></svg> },
    { href: '/audits', label: 'Audits', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
    { href: '/organizations', label: 'Organizations', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { href: '/verification', label: 'Verification', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    { href: '/reports', label: 'Reports', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-mono uppercase tracking-widest text-[10px]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050505] border-r border-white/5 p-8 flex flex-col fixed h-full z-20">
        <div className="mb-12">
          <h1 className="text-lg font-bold tracking-[0.3em] text-white">
            AIC <span className="text-blue-500">OPS</span>
          </h1>
          <p className="text-[8px] text-gray-600 mt-2 tracking-[0.4em]">Registry Control v3.1</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                pathname === item.href
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={pathname === item.href ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'}>
                {item.icon}
              </span>
              <span className="font-bold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="flex items-center gap-4 p-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-bold text-blue-500">
              A
            </div>
            <div>
              <p className="text-[9px] font-bold text-white">Z. WILKEN</p>
              <p className="text-[7px] text-gray-600 tracking-[0.2em]">SUPER_ADMIN</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-[#0a0a0a]">
        <header className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-10 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <div>
                    <p className="text-[8px] text-gray-600 uppercase tracking-[0.4em] mb-1">Authenticated Command</p>
                    <h2 className="text-xs font-bold text-white tracking-[0.2em]">{navItems.find(i => i.href === pathname)?.label.toUpperCase() || 'CONSOLE'}</h2>
                </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[8px] text-green-500 font-bold">ENGINE_SYNC_ACTIVE</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-[9px] font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                EXECUTE NEW AUDIT
              </button>
            </div>
          </div>
        </header>

        <div className="p-10 text-white">
          {children}
        </div>
      </main>
    </div>
  )
}

