import DashboardShell from '../components/DashboardShell';

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-serif font-bold mb-8">Organization Settings</h2>

        <div className="glass-panel p-8 rounded-2xl mb-8">
            <h3 className="font-mono text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">General Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                    <input type="text" value="FirstRand Bank (Demo)" disabled className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Contact</label>
                    <input type="email" value="sarah.khumalo@firstrand.co.za" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border" />
                </div>
            </div>
            <div className="mt-6 text-right">
                <button className="bg-aic-black text-white px-4 py-2 rounded-lg text-sm font-mono uppercase">Save Changes</button>
            </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl border-red-200 bg-red-50/10">
            <h3 className="font-mono text-sm font-bold text-aic-red uppercase tracking-widest mb-6">Danger Zone</h3>
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-gray-900">Request Data Deletion</h4>
                    <p className="text-sm text-gray-500">Permanently remove all audit logs in compliance with POPIA.</p>
                </div>
                <button className="border border-aic-red text-aic-red px-4 py-2 rounded-lg text-sm font-mono uppercase hover:bg-aic-red hover:text-white transition-colors">Request Deletion</button>
            </div>
        </div>
      </div>
    </DashboardShell>
  );
}
