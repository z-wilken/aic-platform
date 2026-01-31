import Navbar from '../components/Navbar';

export default function ResourcesPage() {
  const posts = [
    {
      id: 1,
      title: 'Understanding POPIA Section 71',
      excerpt: 'Why "Automated Decision Making" is the hidden liability in your tech stack.',
      date: 'Jan 30, 2026',
      category: 'Regulation',
    },
    {
      id: 2,
      title: 'The Workday Lawsuit: A Warning for SA',
      excerpt: 'What the US class action means for South African recruitment platforms.',
      date: 'Jan 28, 2026',
      category: 'Case Study',
    },
    {
      id: 3,
      title: 'Tier 1 vs Tier 2: Which are you?',
      excerpt: 'A practical guide to classifying your AI risk under the new framework.',
      date: 'Jan 15, 2026',
      category: 'Guide',
    },
  ];

  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aic-black sm:text-4xl font-serif">Latest Intelligence</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 font-serif">
              Analysis on the intersection of AI, Law, and Ethics in Africa.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between glass-card p-8 rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-gray-500 font-mono">{post.date}</time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 font-mono uppercase tracking-wider text-[10px]">{post.category}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-aic-gold font-serif">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 font-serif">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
