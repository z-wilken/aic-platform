import Navbar from '../components/Navbar';

export default function ReportAbusePage() {
  return (
    <main className="min-h-screen bg-aic-black text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <Navbar />
      
      <div className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-aic-red pl-6">
            <h1 className="text-5xl font-bold tracking-tight text-white font-serif mb-4">
              Secure Drop
            </h1>
            <p className="text-lg text-gray-400 font-mono">
              Anonymous reporting of algorithmic harm. <br/>
              Your identity is encrypted. The evidence is immutable.
            </p>
          </div>

          <div className="glass-dark p-8 rounded-none border border-gray-800 shadow-2xl">
            <form className="space-y-8">
                <div>
                    <label className="block text-xs font-bold text-aic-red uppercase tracking-widest font-mono mb-2">Target Organization</label>
                    <input type="text" className="block w-full bg-black/50 border border-gray-700 text-white p-3 font-mono focus:border-aic-red focus:ring-0" placeholder="NAME_OF_ENTITY" />
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest font-mono mb-2">Violation Type</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="border border-gray-700 p-4 text-left hover:bg-aic-red hover:border-aic-red hover:text-white transition-all text-sm font-mono">Unjust Denial</button>
                        <button type="button" className="border border-gray-700 p-4 text-left hover:bg-aic-red hover:border-aic-red hover:text-white transition-all text-sm font-mono">Bias / Racism</button>
                        <button type="button" className="border border-gray-700 p-4 text-left hover:bg-aic-red hover:border-aic-red hover:text-white transition-all text-sm font-mono">No Human Appeal</button>
                        <button type="button" className="border border-gray-700 p-4 text-left hover:bg-aic-red hover:border-aic-red hover:text-white transition-all text-sm font-mono">Opacity</button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest font-mono mb-2">Incident Detail</label>
                    <textarea rows={5} className="block w-full bg-black/50 border border-gray-700 text-white p-3 font-mono focus:border-aic-red focus:ring-0" placeholder="Describe the interaction..."></textarea>
                </div>

                <div className="pt-4 border-t border-gray-800">
                    <button type="submit" className="w-full bg-aic-red text-white py-4 font-mono font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                        Encrypt & Submit
                    </button>
                    <p className="text-center text-[10px] text-gray-600 mt-4 font-mono uppercase">
                        SUBMISSION_CHANNEL: P2P_ENCRYPTED
                    </p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
