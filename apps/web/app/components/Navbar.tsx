import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl glass rounded-2xl flex h-16 items-center justify-between px-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-aic-black">
            AIC<span className="text-aic-gold">.</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link href="#framework" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            THE FRAMEWORK
          </Link>
          <Link href="#about" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            ABOUT
          </Link>
          {/* External Link to Dashboard */}
          <a href="http://localhost:3001/login" className="font-mono text-sm font-medium text-gray-600 hover:text-aic-black transition-colors">
            CLIENT LOGIN
          </a>
        </div>
        <div className="flex items-center">
          <Link
            href="/alpha"
            className="rounded-xl bg-aic-black px-4 py-2 font-mono text-sm font-medium text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95"
          >
            JOIN ALPHA
          </Link>
        </div>
      </div>
    </nav>
  );
}
