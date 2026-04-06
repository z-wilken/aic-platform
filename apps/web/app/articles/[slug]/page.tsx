import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { articles } from "../data";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article || article.comingSoon) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <article className="container max-w-4xl mx-auto px-6">
          <Link href="/articles" className="inline-flex items-center gap-2 text-aic-navy/40 hover:text-aic-navy text-xs font-mono uppercase tracking-widest mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
          </Link>

          <header className="space-y-8 mb-16">
            <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-[0.2em]">
              <span className="text-aic-copper font-bold">{article.category}</span>
              <span className="text-aic-navy/30">{article.date}</span>
              <span className="flex items-center gap-1 text-aic-navy/30"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-aic-navy leading-tight">
              {article.title}
            </h1>
            <div className="w-20 h-1 bg-aic-copper" />
          </header>

          <div className="prose prose-lg max-w-none font-sans text-aic-navy/80 leading-relaxed space-y-8">
            <p className="text-2xl text-aic-navy/90 font-medium leading-relaxed italic border-l-4 border-aic-navy/5 pl-8 py-2">
              {article.excerpt}
            </p>
            
            {/* Split content by newlines to render paragraphs */}
            {article.content.split('\n').map((para, idx) => {
              if (para.startsWith('##')) {
                return <h2 key={idx} className="text-3xl font-heading font-bold text-aic-navy pt-8">{para.replace('## ', '')}</h2>;
              }
              if (para.startsWith('###')) {
                return <h3 key={idx} className="text-2xl font-heading font-bold text-aic-navy pt-4">{para.replace('### ', '')}</h3>;
              }
              if (para.trim() === '') return null;
              return <p key={idx}>{para}</p>;
            })}
          </div>

          <footer className="mt-24 pt-16 border-t border-aic-navy/10">
            <div className="bg-aic-navy text-white p-12 text-center space-y-8 relative overflow-hidden">
               <div className="absolute inset-0 subtle-grid opacity-10" />
               <div className="relative z-10 space-y-6">
                 <h2 className="text-3xl font-heading font-bold">Govern your AI.</h2>
                 <p className="text-white/60 font-sans max-w-md mx-auto">
                   AIC Pulse is now in early access. Join the waitlist to secure your organisation&apos;s accountability trail.
                 </p>
                 <div className="pt-4">
                   <Link href="/waitlist" className="inline-block bg-aic-copper text-aic-navy px-10 py-4 font-bold uppercase tracking-widest hover:bg-aic-copper/90 transition-all">
                     Join the Waitlist
                   </Link>
                 </div>
               </div>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
