import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-aic-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-aic-black">
            AIC<span className="text-aic-gold">.</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link href="#framework" className="font-mono text-sm font-medium text-gray-700 hover:text-aic-black">
            THE FRAMEWORK
          </Link>
          <Link href="#process" className="font-mono text-sm font-medium text-gray-700 hover:text-aic-black">
            PROCESS
          </Link>
          <Link href="#about" className="font-mono text-sm font-medium text-gray-700 hover:text-aic-black">
            ABOUT
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/alpha"
            className="rounded-none border border-aic-black bg-aic-black px-4 py-2 font-mono text-sm font-medium text-white transition hover:bg-transparent hover:text-aic-black"
          >
            JOIN ALPHA
          </Link>
        </div>
      </div>
    </nav>
  );
}
