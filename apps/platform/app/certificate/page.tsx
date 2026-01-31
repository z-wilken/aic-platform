import DashboardShell from '../components/DashboardShell';

export default function CertificatePage() {
  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-bold">Compliance Certificate</h2>
            <button className="bg-aic-black text-white px-4 py-2 rounded-lg font-mono text-sm uppercase">Download PDF</button>
        </div>

        <div className="bg-white p-12 shadow-2xl relative overflow-hidden border border-gray-200">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <h1 className="text-9xl font-serif font-bold text-gray-900 -rotate-45">OFFICIAL</h1>
            </div>

            <div className="border-4 border-double border-aic-gold p-8 h-full">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold text-aic-black mb-2">AI INTEGRITY CERTIFICATION</h1>
                    <p className="font-mono text-sm text-gray-500 uppercase tracking-[0.2em]">Compliance Validation • POPIA Section 71</p>
                </div>

                <div className="mb-12 text-center">
                    <p className="font-serif text-xl text-gray-600 italic mb-4">This certifies that the Artificial Intelligence System operated by</p>
                    <h2 className="font-serif text-3xl font-bold text-aic-black border-b border-gray-300 inline-block pb-2 px-8 mb-4">FirstRand Bank (Demo)</h2>
                    <p className="font-serif text-xl text-gray-600 italic">has met the requirements for</p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="bg-aic-red/10 border border-aic-red px-8 py-4 rounded-lg text-center">
                        <p className="text-aic-red font-mono font-bold text-2xl">TIER 1: CRITICAL</p>
                        <p className="text-aic-red text-xs uppercase tracking-widest mt-1">Human Oversight Verified</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-sm font-mono text-gray-500 border-t border-gray-200 pt-8">
                    <div>
                        <p className="mb-1">CERTIFICATE ID</p>
                        <p className="text-gray-900 font-bold">AIC-2026-8821</p>
                    </div>
                    <div className="text-right">
                        <p className="mb-1">VALID UNTIL</p>
                        <p className="text-gray-900 font-bold">01 FEB 2027</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardShell>
  );
}
