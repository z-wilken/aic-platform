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
}

interface ArticlesClientProps {
  initialArticles: Article[];
  heroBg: string;
  categories: string[];
}

export default function ArticlesClient({ initialArticles, heroBg, categories }: ArticlesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

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

  const filteredArticles = initialArticles.filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = initialArticles.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0f1f3d]/90 to-[#1a3160]/85" />
        
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
              <BookOpen className="w-5 h-5 text-[#c9920a]" />
              <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">
                Knowledge Center
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Articles & Insights
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Expert analysis, research findings, and practical guidance on AI governance, certification, and the evolving landscape of algorithmic accountability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-[#0f1f3d] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[#0f1f3d]">Featured Articles</h2>
              <TrendingUp className="w-5 h-5 text-[#c9920a]" />
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
                        <span className="px-3 py-1 bg-[#c9920a] text-white text-xs rounded-full font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
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
                      <h3 className="text-xl font-semibold text-[#0f1f3d] mb-3 group-hover:text-[#c9920a] transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{article.author}</span>
                        </div>
                        <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white text-sm">
                          Read Article <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[#0f1f3d]">
              {selectedCategory === "All Articles" ? "All Articles" : selectedCategory}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          ) : (
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
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Tag className="w-3 h-3" />
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0f1f3d] mb-2 group-hover:text-[#c9920a] transition-colors leading-tight flex-1">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <button className="text-[#0f1f3d] hover:text-[#c9920a] transition-colors text-sm font-medium flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-br from-[#0f1f3d] to-[#1a3160]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-12 h-12 text-[#c9920a] mx-auto mb-6" />
            <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Stay Informed on AI Governance
            </h2>
            <p className="text-white/70 mb-8 text-lg">
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
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9920a]"
              />
              <Button
                type="submit"
                disabled={newsletterLoading || newsletterSuccess}
                className="bg-[#c9920a] hover:bg-[#b07d08] text-white px-6 py-3 disabled:opacity-60"
              >
                {newsletterSuccess ? 'Subscribed ✓' : newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-white/40 text-xs mt-4">
              No spam. Unsubscribe anytime. Read our{" "}
              <Link href="/disclosures" className="underline hover:text-white/60">
                privacy policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources CTA */}
      <section className="py-16 bg-white">
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
                    <div className="w-12 h-12 rounded-xl bg-[#0f1f3d]/5 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0f1f3d]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0f1f3d] mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{resource.description}</p>
                    <Link
                      href={resource.link}
                      className="text-[#c9920a] hover:text-[#b07d08] font-medium text-sm flex items-center gap-1"
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
