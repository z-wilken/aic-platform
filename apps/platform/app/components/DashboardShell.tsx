export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-aic-black text-white p-6 hidden md:block">
        <div className="mb-12">
            <h1 className="font-serif text-2xl font-bold">AIC PULSE<span className="text-aic-gold">.</span></h1>
        </div>
        <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 bg-gray-800 rounded-md font-mono text-sm">Overview</a>
            <a href="#" className="block py-2 px-4 text-gray-400 hover:text-white font-mono text-sm">Audits</a>
            <a href="#" className="block py-2 px-4 text-gray-400 hover:text-white font-mono text-sm">Incidents</a>
            <a href="#" className="block py-2 px-4 text-gray-400 hover:text-white font-mono text-sm">Settings</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500 text-sm">Welcome back, Compliance Officer.</p>
            </div>
            <div className="flex items-center gap-4">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    System Operational
                </span>
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
}
