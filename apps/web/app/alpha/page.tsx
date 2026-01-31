import Navbar from '../components/Navbar';

export default function AlphaPage() {
  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 sm:py-32">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center rounded-md bg-aic-black/5 px-2 py-1 text-xs font-medium text-aic-black ring-1 ring-inset ring-aic-black/10 font-mono">
                  COHORT 1: OPEN
                </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-aic-black sm:text-6xl font-serif">
              Join the Alpha Program
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              We are selecting 10 South African organizations to pioneer the AIC accountability standard. Participants receive early certification access and direct support.
            </p>
          </div>

          <div className="mt-16 bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">First name</label>
                  <div className="mt-2.5">
                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Last name</label>
                  <div className="mt-2.5">
                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Company</label>
                <div className="mt-2.5">
                  <input type="text" name="company" id="company" autoComplete="organization" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Work Email</label>
                <div className="mt-2.5">
                  <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label htmlFor="use-case" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Briefly describe your AI use case</label>
                <div className="mt-2.5">
                  <textarea name="use-case" id="use-case" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>

              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-aic-black focus:ring-aic-black" />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="candidates" className="font-medium text-gray-900 font-serif">I understand this is a paid pilot program.</label>
                </div>
              </div>

              <div>
                <button type="submit" className="block w-full rounded-md bg-aic-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-wide">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
