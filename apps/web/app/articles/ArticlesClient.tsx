'use client';

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  Filter,
  TrendingUp,
  Award,
  Shield,
  FileText,
  Globe,
  ArrowRight,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

interface Article {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  slug: string;
}

interface ArticlesClientProps {
  initialArticles: Article[];
  initialNextCursor: string | null;
  heroBg: string;
  categories: string[];
}

export default function ArticlesClient({ initialArticles, initialNextCursor, heroBg, categories }: ArticlesClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const res = await fetch(`/api/notion/articles?cursor=${nextCursor}`);
      const data = await res.json();
      setArticles(prev => [...prev, ...data.results]);
      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error("Failed to load more articles:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) throw new Error('Failed');
      setNewsletterSuccess(true);
    } catch {
      // silent fail — keep button enabled for retry
    } finally {
      setNewsletterLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-aic-paper">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2632]/80 via-[#1B2632]/75 to-[#2C3B4D]/70" />
        
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[#A35139]" />
              <span className="text-[#A35139] text-sm uppercase tracking-widest font-medium">
                Knowledge Center
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl text-aic-paper mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Articles & Insights
            </h1>
            <p className="text-xl text-aic-paper/70 leading-relaxed">
              Expert analysis, research findings, and practical guidance on AI governance, certification, and the evolving landscape of algorithmic accountability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-0 z-30 bg-aic-paper border-b border-[#DDD3C0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6458]/60" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A35139]/20 focus:border-[#A35139]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-4 h-4 text-[#6B6458]/60 shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-[#A35139] text-white"
                      : "bg-[#DDD3C0] text-[#6B6458] hover:bg-[#A35139]/20 hover:text-[#1B2632]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && selectedCategory === "All Articles" && searchQuery === "" && (
        <section className="py-16 bg-[#FAF6EF]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[#1B2632]">Featured Articles</h2>
              <TrendingUp className="w-5 h-5 text-[#A35139]" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow group h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={article.image || heroBg}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#A35139] text-aic-paper text-xs rounded-full font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-[#6B6458] mb-3">
                        <span className="px-2 py-1 bg-[#A35139]/10 text-[#A35139] rounded font-medium">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#1B2632] mb-3 group-hover:text-[#A35139] transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-[#6B6458] text-sm leading-relaxed mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#DDD3C0]">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#6B6458]/60" />
                          <span className="text-sm text-[#6B6458]">{article.author}</span>
                        </div>
                        <Link href={`/articles/${article.slug}`}>
                          <Button className="bg-[#A35139] hover:bg-[#8B422E] text-white text-sm">
                            Read Article <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Articles Grid */}
      <section className="py-16 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[#1B2632]">
              {selectedCategory === "All Articles" ? "All Articles" : selectedCategory}
            </h2>
            <span className="text-sm text-[#6B6458]">
              {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-[#DDD3C0] mx-auto mb-4" />
              <p className="text-[#6B6458]">No articles found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.05 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow group h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-[#6B6458] mb-3">
                        <Tag className="w-3 h-3" />
                        <span className="px-2 py-0.5 bg-[#DDD3C0]/30 text-[#6B6458] rounded font-medium">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#1B2632] mb-2 group-hover:text-[#A35139] transition-colors leading-tight flex-1">
                        {article.title}
                      </h3>
                      <p className="text-[#6B6458] text-sm leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#DDD3C0]">
                        <span className="text-xs text-[#6B6458]">{article.date}</span>
                        <Link 
                          href={`/articles/${article.slug}`}
                          className="text-[#1B2632] hover:text-[#A35139] transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          Read <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </Card>
                  </motion.article>
                ))}
              </div>

              {nextCursor && selectedCategory === "All Articles" && searchQuery === "" && (
                <div className="mt-12 flex justify-center">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="bg-aic-paper border border-[#DDD3C0] text-[#1B2632] hover:bg-[#FAF6EF] px-8 py-6 h-auto text-base"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More Articles"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-br from-[#1B2632] to-[#2C3B4D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-12 h-12 text-[#A35139] mx-auto mb-6" />
            <h2 className="text-3xl text-aic-paper mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Stay Informed on AI Governance
            </h2>
            <p className="text-aic-paper/70 mb-8 text-lg">
              Subscribe to receive monthly insights on certification trends, policy updates, and best practices from AIC experts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-aic-paper text-[#1B2632] placeholder-[#6B6458]/60 focus:outline-none focus:ring-2 focus:ring-[#A35139]"
              />
              <Button
                type="submit"
                disabled={newsletterLoading || newsletterSuccess}
                className="bg-[#A35139] hover:bg-[#A35139] text-aic-paper px-6 py-3 disabled:opacity-60"
              >
                {newsletterSuccess ? 'Subscribed ✓' : newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-aic-paper/40 text-xs mt-4 text-center w-full">
              No spam. Unsubscribe anytime. Read our{" "}
              <Link href="/disclosures" className="underline hover:text-aic-paper/60">
                privacy policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources CTA */}
      <section className="py-16 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Certification Resources",
                description: "Exam guides, study materials, and preparation tips for CAEL candidates.",
                link: "/professional-portal",
                linkText: "Explore Resources",
              },
              {
                icon: Globe,
                title: "Policy Map",
                description: "Interactive tracker of global AI regulations and governance frameworks.",
                link: "/governance-hub",
                linkText: "View Policy Map",
              },
              {
                icon: TrendingUp,
                title: "Governance Index",
                description: "Annual rankings of Fortune 500 companies on AI accountability metrics.",
                link: "/ai-governance-index",
                linkText: "See Rankings",
              },
            ].map((resource, i) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-[#1B2632]/5 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1B2632]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1B2632] mb-2">{resource.title}</h3>
                    <p className="text-[#6B6458] text-sm mb-4 flex-1">{resource.description}</p>
                    <Link
                      href={resource.link}
                      className="text-[#A35139] hover:text-[#A35139] font-medium text-sm flex items-center gap-1"
                    >
                      {resource.linkText} <ExternalLink className="w-3 h-3" />
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
