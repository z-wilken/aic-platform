import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-aic-black">
            AIC<span className="text-aic-gold">.</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link href="#framework" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            THE FRAMEWORK
          </Link>
          <Link href="/about" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            ABOUT
          </Link>
          <Link href="/contact" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            CONTACT
          </Link>
          {/* External Link to Dashboard */}
          <a href="http://localhost:3001/login" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            CLIENT LOGIN
          </a>
        </div>
        <div className="flex items-center">
          <Link
            href="/alpha"
            className="rounded-none bg-aic-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-wide"
          >
            JOIN ALPHA
          </Link>
        </div>
      </div>
    </nav>
  );
}