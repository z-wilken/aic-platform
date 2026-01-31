import DashboardShell from './components/DashboardShell';

export default function PlatformHome() {
  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Integrity Score</h3>
            <div className="flex items-end gap-2">
                <span className="text-5xl font-serif font-bold text-aic-black">94</span>
                <span className="text-sm font-mono text-green-600 mb-2">↑ 2% vs last week</span>
            </div>
        </div>

        {/* Tier Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Classification</h3>
            <div className="flex items-center gap-2 mt-2">
                <div className="h-3 w-3 rounded-full bg-aic-red animate-pulse"></div>
                <span className="text-xl font-serif font-bold text-aic-red">Tier 1: Critical</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">High-stakes decision oversight required.</p>
        </div>

        {/* Pending Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Action Items</h3>
            <div className="flex items-end gap-2">
                <span className="text-5xl font-serif font-bold text-aic-orange">2</span>
                <span className="text-sm font-mono text-gray-500 mb-2">pending reviews</span>
            </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-serif font-bold text-lg">Recent Automated Decisions</h3>
            <button className="text-xs font-mono border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">EXPORT REPORT</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Input Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Outcome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Review Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm font-mono">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">REQ-8392</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">2026-02-01 14:22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">Credit Application</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600 font-bold">DENIED</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Pending Human Audit</span></td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">REQ-8391</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">2026-02-01 14:15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">Credit Application</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">APPROVED</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Auto-Verified</span></td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">REQ-8390</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">2026-02-01 13:45</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">Loan Adjustment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">FLAGGED</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Bias Warning</span></td>
                </tr>
            </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
