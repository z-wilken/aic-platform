import Link from "next/link";
import { Search, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { articles } from "./data";

export default function ArticlesPage() {
  const categories = ["All Articles", "AI Governance", "Certification", "Policy Updates", "Case Studies", "Research", "Best Practices"];
  const featured = articles.filter(a => a.featured);
  const regular = articles.filter(a => !a.featured);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Banner */}
        <div className="bg-aic-navy py-20 relative overflow-hidden mb-16">
          <div className="absolute inset-0 subtle-grid opacity-10" />
          <div className="container max-w-7xl mx-auto px-6 relative z-10">
            <h1 className="text-white text-5xl font-heading font-bold mb-6">AIC Articles</h1>
            <p className="text-white/60 text-xl font-sans max-w-2xl leading-relaxed">
              Research, analysis, and case studies on AI accountability, algorithmic rights, and governance practice in South Africa.
            </p>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-6">
          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 border-b border-aic-navy/10 pb-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((cat, idx) => (
                <button 
                  key={cat} 
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    idx === 0 ? "bg-aic-navy text-white" : "text-aic-navy/40 hover:text-aic-navy"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aic-navy/30" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-3 bg-aic-navy/[0.02] border border-aic-navy/10 font-sans text-sm focus:border-aic-copper outline-none"
              />
            </div>
          </div>

          {/* Featured Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {featured.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="group space-y-8 block">
                <div className="aspect-[16/9] bg-aic-navy-mid relative overflow-hidden">
                   <div className="absolute inset-0 subtle-grid opacity-20" />
                   <div className="absolute top-6 left-6 bg-aic-copper text-aic-navy text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1">
                     Featured
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-aic-navy/40">
                    <span className="text-aic-copper">{article.category}</span>
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-heading font-bold group-hover:text-aic-copper transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-aic-navy/60 font-sans leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="text-aic-navy font-bold uppercase tracking-widest text-xs pt-2 group-hover:translate-x-2 transition-transform inline-block">
                    Read Article →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {regular.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="group space-y-6 block">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-aic-navy text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5">{article.category}</span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-aic-navy/40 uppercase tracking-widest"><Clock className="w-3 h-3" /> {article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold group-hover:text-aic-copper transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-aic-navy/5">
                    <span className="text-[10px] font-mono text-aic-navy/30 uppercase tracking-widest">
                      {article.comingSoon ? "Coming Soon" : article.date}
                    </span>
                    {!article.comingSoon && <span className="text-[10px] font-mono text-aic-navy font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">Read →</span>}
                  </div>
                </div>
                {article.comingSoon && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="bg-aic-navy text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Publishing [Q3 2026]</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
