export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8 font-mono">
      <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-widest">AIC INTERNAL OPS <span className="text-blue-500">v1.0</span></h1>
        <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-500">NEW AUDIT</button>
            <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-[#1c1c1c] p-6 rounded border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Pending Applications</p>
            <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Active Certifications</p>
            <p className="text-3xl font-bold text-green-500">84</p>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Revenue (MRR)</p>
            <p className="text-3xl font-bold text-yellow-500">R 420k</p>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Engine Health</p>
            <p className="text-3xl font-bold text-blue-500">100%</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Certification Queue</h2>
      <div className="bg-[#1c1c1c] rounded border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-900 text-gray-500">
                <tr>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Tier</th>
                    <th className="p-4">Audit Status</th>
                    <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/50">
                    <td className="p-4">Capitec Bank</td>
                    <td className="p-4 text-red-400">TIER 1</td>
                    <td className="p-4 text-yellow-500">IN REVIEW</td>
                    <td className="p-4"><button className="text-blue-400 hover:underline">Open Case</button></td>
                </tr>
                <tr className="hover:bg-gray-800/50">
                    <td className="p-4">Takealot Group</td>
                    <td className="p-4 text-orange-400">TIER 2</td>
                    <td className="p-4 text-green-500">APPROVED</td>
                    <td className="p-4"><button className="text-blue-400 hover:underline">View Cert</button></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
