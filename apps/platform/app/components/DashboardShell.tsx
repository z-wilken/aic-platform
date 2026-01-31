export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Dark Glass */}
      <div className="w-72 glass-sidebar text-white p-6 hidden md:flex flex-col fixed h-full z-20">
        <div className="mb-12 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-aic-gold/20 border border-aic-gold/50 flex items-center justify-center text-aic-gold font-serif font-bold">A</div>
            <h1 className="font-serif text-xl font-bold tracking-wide">AIC PULSE</h1>
        </div>
        
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Monitoring</div>
        <nav className="space-y-2 flex-1">
            <a href="#" className="block py-3 px-4 bg-white/10 border border-white/5 rounded-xl font-mono text-sm text-white shadow-lg shadow-black/20">
                Overview
            </a>
            <a href="#" className="block py-3 px-4 hover:bg-white/5 rounded-xl font-mono text-sm text-gray-400 hover:text-white transition-colors">
                Audit Logs
            </a>
            <a href="#" className="block py-3 px-4 hover:bg-white/5 rounded-xl font-mono text-sm text-gray-400 hover:text-white transition-colors">
                Incidents <span className="ml-2 inline-flex items-center rounded-full bg-aic-red/20 px-1.5 py-0.5 text-xs font-medium text-aic-red ring-1 ring-inset ring-aic-red/50">1</span>
            </a>
        </nav>

        <div className="mt-auto">
            <div className="p-4 rounded-xl bg-gradient-to-br from-aic-gold/10 to-transparent border border-aic-gold/20">
                <p className="text-xs text-aic-gold font-mono mb-1">STATUS</p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-white">System Active</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Main Content - Pushed over to make room for fixed sidebar */}
      <div className="flex-1 p-8 md:ml-72">
        <header className="flex justify-between items-center mb-10 glass-panel p-4 rounded-2xl sticky top-4 z-10">
            <div>
                <h2 className="text-xl font-serif font-bold text-gray-900">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">Dr. Sarah Khumalo</p>
                    <p className="text-xs text-gray-500 font-mono">Compliance Lead</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-aic-black to-gray-700 border-2 border-white shadow-md"></div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
}
