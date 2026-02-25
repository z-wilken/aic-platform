import Navbar from '../components/Navbar';

export default function BountyPage() {
  return (
    <main className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-900 selection:text-white">
      <Navbar />
      
      <div className="py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="border-b border-green-800 pb-12 mb-12">
            <h1 className="text-6xl font-bold tracking-tighter text-white mb-4">
              BIAS_BOUNTY_PROGRAM
            </h1>
            <p className="text-xl text-green-700">
              // Identify Discrimination. Prove Harm. Get Paid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Target List */}
            <div className="border border-green-900 bg-green-900/5 p-6">
                <h3 className="text-white text-sm uppercase tracking-widest border-b border-green-900 pb-2 mb-4">Active Targets</h3>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center group cursor-pointer">
                        <span className="group-hover:text-white transition-colors">BANK_CHATBOT_V4</span>
                        <span className="bg-green-900 text-green-300 px-2 py-1 text-xs">$5,000</span>
                    </li>
                    <li className="flex justify-between items-center group cursor-pointer">
                        <span className="group-hover:text-white transition-colors">INSURER_RISK_MODEL_A</span>
                        <span className="bg-green-900 text-green-300 px-2 py-1 text-xs">$12,000</span>
                    </li>
                    <li className="flex justify-between items-center group cursor-pointer">
                        <span className="group-hover:text-white transition-colors">HR_FILTER_DELTA</span>
                        <span className="bg-green-900 text-green-300 px-2 py-1 text-xs">$3,500</span>
                    </li>
                </ul>
            </div>

            {/* Leaderboard */}
            <div className="border border-green-900 bg-green-900/5 p-6">
                <h3 className="text-white text-sm uppercase tracking-widest border-b border-green-900 pb-2 mb-4">Top Hunters</h3>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                        <span>0x99...a12</span>
                        <span className="text-gray-500">22 Flags</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span>NullPointer</span>
                        <span className="text-gray-500">18 Flags</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span>BiasBreaker</span>
                        <span className="text-gray-500">14 Flags</span>
                    </li>
                </ul>
            </div>
          </div>

          <div className="mt-12 border border-green-500 p-8 text-center hover:bg-green-500 hover:text-black transition-colors cursor-pointer">
            <h2 className="text-2xl font-bold uppercase">Initialize Hunter Environment</h2>
            <p className="text-sm mt-2 opacity-80">Download the testing kit and access the sandbox.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
