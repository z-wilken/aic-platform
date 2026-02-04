'use client'

import { useEffect, useState } from 'react'
import HQShell from '../components/HQShell'
import { motion, AnimatePresence } from 'framer-motion'

export default function CMSPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = () => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    const title = prompt("Post Title:");
    if (!title) return;
    const content = prompt("Post Content (Markdown/Text):");
    if (!content) return;

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, status: 'DRAFT' })
        });

        if (response.ok) {
            alert("Draft saved.");
            fetchPosts();
        }
    } catch (err) {
        console.error(err);
        alert("Failed to save draft.");
    }
  }

  return (
    <HQShell>
      <div className="max-w-5xl space-y-12">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-serif font-medium tracking-tight">Public Insights</h1>
                <p className="text-gray-500 font-serif mt-2 italic text-lg">Managing the "Public Voice" of AI Integrity Certification.</p>
            </div>
            <button 
                onClick={handleCreatePost}
                className="bg-aic-gold text-black px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
                + Draft New Post
            </button>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active Articles</span>
                <div className="flex gap-4">
                    <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">
                        {posts.filter(p => p.status === 'PUBLISHED').length} Published
                    </span>
                    <span className="text-[10px] font-mono text-aic-gold uppercase tracking-widest">
                        {posts.filter(p => p.status === 'DRAFT').length} Drafts
                    </span>
                </div>
            </div>
            
            <div className="divide-y divide-white/5">
                <AnimatePresence>
                    {loading ? (
                        <tr><td className="p-12 text-center text-gray-500 font-serif italic">Syncing with content core...</td></tr>
                    ) : posts.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">No posts found. Create your first insight.</div>
                    ) : posts.map((post, i) => (
                        <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-8 hover:bg-white/5 transition-all group flex justify-between items-center"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border ${
                                        post.status === 'PUBLISHED' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-aic-gold/20 text-aic-gold bg-aic-gold/5'
                                    }`}>
                                        {post.status}
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{post.category}</span>
                                </div>
                                <h3 className="text-xl font-serif text-white group-hover:text-aic-gold transition-colors">{post.title}</h3>
                                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Modified: {new Date(post.updated_at).toLocaleDateString()}</p>
                            </div>
                            
                            <div className="flex gap-4">
                                <button className="text-[10px] font-mono font-bold uppercase text-gray-500 hover:text-white transition-colors tracking-widest">Edit</button>
                                <button className="text-[10px] font-mono font-bold uppercase text-gray-500 hover:text-white transition-colors tracking-widest">Preview</button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

        <div className="p-12 border border-dashed border-white/10 rounded-3xl text-center">
            <span className="text-2xl block mb-4">🛡️</span>
            <p className="text-gray-500 font-serif italic text-sm">
                Custom Content Core v1.0 <br />
                Direct Markdown-to-DB interface active. Zero third-party dependencies.
            </p>
        </div>
      </div>
    </HQShell>
  )
}