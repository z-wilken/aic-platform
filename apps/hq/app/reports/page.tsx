'use client'

import HQShell from '../components/HQShell'

export default function ReportsPage() {
  const reportCategories = [
    { name: 'Regulatory Submissions', count: 12, lastGenerated: '2026-02-01' },
    { name: 'Bias Audit Summaries', count: 45, lastGenerated: '2026-02-04' },
    { name: 'Financial Growth', count: 3, lastGenerated: '2026-01-15' },
  ];

  return (
    <HQShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Institutional Reporting</h1>
        <p className="text-gray-500 font-serif italic mb-8">System-wide performance and compliance documentation.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportCategories.map((cat) => (
                <div key={cat.name} className="bg-[#1c1c1c] border border-gray-800 p-8 rounded-3xl hover:border-aic-gold transition-colors group">
                    <h3 className="font-serif text-xl mb-4 group-hover:text-aic-gold">{cat.name}</h3>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-3xl font-bold">{cat.count}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-mono">Reports</p>
                        </div>
                        <p className="text-[9px] text-gray-600 uppercase font-mono">Latest: {cat.lastGenerated}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </HQShell>
  )
}