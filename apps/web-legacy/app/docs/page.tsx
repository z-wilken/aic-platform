import Navbar from '../components/Navbar';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 hidden lg:block fixed h-screen overflow-y-auto border-r border-gray-200 bg-white pt-24 pb-10 pl-6">
            <h5 className="font-mono text-xs font-bold text-gray-500 uppercase mb-4">Getting Started</h5>
            <ul className="space-y-3 font-serif text-sm text-gray-700">
                <li>Introduction</li>
                <li>Quick Start Guide</li>
                <li>Authentication</li>
            </ul>
            <h5 className="font-mono text-xs font-bold text-gray-500 uppercase mb-4 mt-8">API Reference</h5>
            <ul className="space-y-3 font-serif text-sm text-gray-700">
                <li>GET /risk-score</li>
                <li>POST /audit-log</li>
                <li>WEBHOOKS</li>
            </ul>
        </div>

        {/* Content */}
        <div className="flex-1 lg:pl-64 pt-24 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <span className="font-mono text-xs text-aic-red font-bold">API VERSION 1.0</span>
                <h1 className="text-4xl font-bold font-serif mb-6 mt-2">Integration Guide</h1>
                <p className="text-lg text-gray-600 font-serif mb-8">
                    The AIC Platform exposes a RESTful API that allows your systems to report audit logs and query your real-time integrity score.
                </p>

                <div className="prose prose-lg">
                    <h3>Authentication</h3>
                    <p>All requests must include your API Key in the header:</p>
                    <pre className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
Authorization: Bearer AIC_sk_live_...
                    </pre>

                    <h3>Rate Limits</h3>
                    <p>Standard Tier accounts are limited to 1,000 requests per minute. Enterprise accounts have dedicated throughput.</p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
