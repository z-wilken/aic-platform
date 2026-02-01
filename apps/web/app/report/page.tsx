import Navbar from '../components/Navbar';

export default function ReportAbusePage() {
  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 font-mono mb-4">
                WHISTLEBLOWER SECURE
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-aic-black sm:text-5xl font-serif">
              Report Algorithmic Abuse
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              Did an AI deny your loan? Ignore your CV? Reject your claim?
              We aggregate reports to trigger hostile audits of uncertified systems.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl shadow-xl ring-1 ring-gray-900/5">
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Offending Organization</label>
                    <input type="text" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-aic-red sm:text-sm sm:leading-6" placeholder="e.g. Bank X" />
                </div>
                
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900 font-mono">What happened?</label>
                    <select className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-aic-red sm:text-sm sm:leading-6">
                        <option>Unjust Denial (Loan/Credit)</option>
                        <option>Hiring Discrimination</option>
                        <option>Medical Malpractice (AI)</option>
                        <option>Account Termination</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Description</label>
                    <textarea rows={4} className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-aic-red sm:text-sm sm:leading-6" placeholder="They rejected me instantly at 2am..."></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Evidence (Optional)</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-aic-red focus-within:outline-none focus-within:ring-2 focus-within:ring-aic-red focus-within:ring-offset-2 hover:text-red-500">
                                    <span>Upload a screenshot</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="block w-full rounded-md bg-aic-red px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-red font-mono uppercase tracking-wide">
                    Submit Report
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
