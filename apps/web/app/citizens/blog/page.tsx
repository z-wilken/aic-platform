'use client';

import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CitizensBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
        .then(res => res.json())
        .then(data => {
            setPosts(data.posts || []);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (response.ok) {
            setIsSubscribed(true);
        }
    } catch (err) {
        console.error(err);
        alert("Subscription failed.");
    }
  };

  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      
      <div className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-32"
          >
            <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">The Public Voice</h2>
            <p className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-aic-black leading-tight">
              Insights for the <br />Algorithmic Age.
            </p>
            <p className="mt-12 text-xl text-gray-500 font-serif leading-relaxed italic">
              Empowering South Africans with knowledge, rights, and regulatory updates on automated decision making.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Blog List */}
            <div className="lg:col-span-8 space-y-24">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 font-serif italic">Accessing archive...</div>
                ) : posts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 font-serif">No public insights published yet. Check back soon.</div>
                ) : posts.map((post, i) => (
                    <motion.article 
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[9px] font-mono font-bold text-aic-gold uppercase tracking-widest bg-aic-gold/5 px-2 py-1 rounded">{post.category}</span>
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{new Date(post.published_at).toLocaleDateString()}</span>
                        </div>
                        <Link href={`/citizens/blog/${post.slug}`} className="block">
                            <h3 className="font-serif text-4xl font-medium text-aic-black group-hover:text-aic-red transition-colors mb-6 leading-tight">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="font-serif text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl italic">
                            {post.excerpt || 'Read our latest analysis on AI integrity and human accountability.'}
                        </p>
                        <Link href={`/citizens/blog/${post.slug}`} className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] border-b border-aic-black/10 pb-1 group-hover:border-aic-black transition-all">
                            Read Full Article →
                        </Link>
                    </motion.article>
                ))}
            </div>

            {/* Sidebar / Newsletter */}
            <aside className="lg:col-span-4">
                <div className="sticky top-32">
                    {!isSubscribed ? (
                        <div className="bg-white p-12 border border-aic-black/5 shadow-xl rounded-[2.5rem]">
                            <h4 className="font-serif text-2xl mb-6">The Accountability Alert.</h4>
                            <p className="text-gray-500 font-serif text-sm leading-relaxed mb-8">
                                Weekly updates on algorithmic rights, bias alerts, and new AIC-Certified organizations.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="your@email.com" 
                                    className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-mono text-xs transition-colors bg-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit" className="w-full bg-aic-black text-white py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors">
                                    Join the Pulse
                                </button>
                            </form>
                            <p className="text-[8px] font-mono text-gray-400 mt-6 uppercase tracking-tighter">
                                By subscribing you agree to our POPIA Privacy Policy.
                            </p>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-aic-gold p-12 text-aic-black rounded-[2.5rem] text-center"
                        >
                            <span className="text-4xl block mb-6">📬</span>
                            <h4 className="font-serif text-2xl font-bold mb-4">You're on the Pulse.</h4>
                            <p className="font-serif italic text-sm">Welcome to the forefront of algorithmic accountability in South Africa.</p>
                        </motion.div>
                    )}

                    <div className="mt-12 p-8 border border-aic-black/5 rounded-[2rem] bg-white/30 backdrop-blur-sm">
                        <h5 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Public Hotlines</h5>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-mono text-aic-red uppercase font-bold tracking-tighter italic">Bias Emergency</span>
                                <span className="text-sm font-serif text-aic-black">+27 11 447 1234</span>
                            </div>
                            <div className="flex flex-col gap-1 pt-4 border-t border-aic-black/5">
                                <span className="text-[9px] font-mono text-gray-400 uppercase font-bold tracking-tighter">General Rights</span>
                                <span className="text-sm font-serif text-aic-black font-medium leading-none">hello@aicert.co.za</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}