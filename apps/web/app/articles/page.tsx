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

const heroBg = "https://images.unsplash.com/photo-1764087957302-ef0756ed8e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VudGFpbiUyMHBlbiUyMHBhcGVyJTIwd3JpdGluZyUyMG5vdGVib29rfGVufDF8fHx8MTc3NTUwODgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const categories = [
  "All Articles",
  "AI Governance",
  "Certification",
  "Policy Updates",
  "Case Studies",
  "Research",
  "Best Practices",
];

// TODO: Replace with CMS API call (WordPress REST API or Contentful)
// Each article needs: id, title, excerpt, category, date, readTime, author, slug
// On "Read Article" click, navigate to /articles/[slug] — dynamic route needed
const featuredArticles = [
  {
    id: 1,
    title: "The Rise of Algorithmic Accountability: Why Human Certification Matters in 2026",
    excerpt: "As AI systems permeate every sector, organizations face mounting pressure to demonstrate human oversight. This comprehensive analysis explores why certifying the professionals behind AI—not just the algorithms—has become the cornerstone of responsible deployment.",
    image: "https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWxzJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU0ODExMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "AI Governance",
    author: "Dr. Sarah Chen",
    date: "April 1, 2026",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: 2,
    title: "ISO/IEC 42001 Implementation Guide: From Gap Analysis to Full Compliance",
    excerpt: "A step-by-step roadmap for Chief Risk Officers navigating the complexities of ISO/IEC 42001 certification. Includes real-world case studies from Fortune 500 implementations and common pitfalls to avoid.",
    image: "https://images.unsplash.com/photo-1770681381576-f1fdceb2ea01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljcyUyMHNjcmVlbnxlbnwxfHx8fDE3NzU1MDgzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Certification",
    author: "Michael Torres, CAEL",
    date: "March 28, 2026",
    readTime: "18 min read",
    featured: true,
  },
  {
    id: 3,
    title: "EU AI Act Enforcement Begins: What AIC-Certified Professionals Need to Know",
    excerpt: "With the EU AI Act entering its enforcement phase, certified AI Ethics Leads face new compliance obligations. This analysis breaks down key requirements and how AIC certification aligns with regulatory expectations.",
    image: "https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBjaXJjdWl0JTIwYm9hcmQlMjBkaWdpdGFsfGVufDF8fHx8MTc3NTUwODM1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Policy Updates",
    author: "Elena Popescu, LL.M.",
    date: "March 25, 2026",
    readTime: "10 min read",
    featured: false,
  },
];

const recentArticles = [
  {
    id: 4,
    title: "Five Algorithmic Rights Every Board Director Should Understand",
    excerpt: "Board oversight of AI systems requires fluency in the fundamental rights framework. We break down AIC's Declaration of Algorithmic Rights for C-suite leaders.",
    category: "Best Practices",
    author: "James Liu",
    date: "March 20, 2026",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Case Study: How a Healthcare System Achieved ISO/IEC 42001 in 8 Months",
    excerpt: "Memorial Health Network's journey from initial gap analysis to full certification, including budget allocations, stakeholder buy-in strategies, and lessons learned.",
    category: "Case Studies",
    author: "Dr. Priya Sharma",
    date: "March 15, 2026",
    readTime: "14 min read",
  },
  {
    id: 6,
    title: "NIST AI RMF 2.0: What Changed and Why It Matters for AIC Candidates",
    excerpt: "The updated NIST AI Risk Management Framework introduces new Govern functions. Here's how it impacts the CAEL exam competency matrix.",
    category: "Research",
    author: "Dr. Marcus Johnson",
    date: "March 12, 2026",
    readTime: "9 min read",
  },
  {
    id: 7,
    title: "The Global State of AI Governance: 2026 AIC Index Report",
    excerpt: "Our annual ranking of Fortune 500 companies reveals significant progress in board-level AI oversight, but persistent gaps in explainability frameworks.",
    category: "Research",
    author: "AIC Research Team",
    date: "March 8, 2026",
    readTime: "22 min read",
  },
  {
    id: 8,
    title: "Preparing for Your CAEL Exam: Study Tips from Recent Pass Holders",
    excerpt: "Twenty certified professionals share their exam preparation strategies, recommended resources, and time management techniques.",
    category: "Certification",
    author: "Amanda Foster, CAEL",
    date: "March 5, 2026",
    readTime: "11 min read",
  },
  {
    id: 9,
    title: "AI Explainability vs. Transparency: Clearing Up Common Misconceptions",
    excerpt: "These terms are often used interchangeably, but they represent distinct obligations under the Declaration of Algorithmic Rights. Here's the difference.",
    category: "AI Governance",
    author: "Dr. Wei Zhang",
    date: "February 28, 2026",
    readTime: "6 min read",
  },
  {
    id: 10,
    title: "New IAF MLA Guidance on AI Auditing Competence Requirements",
    excerpt: "The International Accreditation Forum releases updated guidance for auditors assessing AI management systems under ISO/IEC 42001.",
    category: "Policy Updates",
    author: "Robert Williams",
    date: "February 25, 2026",
    readTime: "8 min read",
  },
  {
    id: 11,
    title: "Building an AI Ethics Committee: Governance Structures That Actually Work",
    excerpt: "Analysis of 50 Fortune 500 companies reveals best practices for committee composition, reporting lines, and decision-making authority.",
    category: "Best Practices",
    author: "Jessica Park",
    date: "February 20, 2026",
    readTime: "13 min read",
  },
  {
    id: 12,
    title: "How to Conduct an Algorithmic Impact Assessment: A Practitioner's Guide",
    excerpt: "Step-by-step methodology for evaluating AI systems against the five Algorithmic Rights, with downloadable templates and checklists.",
    category: "Best Practices",
    author: "Carlos Mendes, CAEL",
    date: "February 15, 2026",
    readTime: "16 min read",
  },
];

export default function ArticlesPage() {
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

  const filteredArticles = [...featuredArticles, ...recentArticles].filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                      src={article.image}
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
