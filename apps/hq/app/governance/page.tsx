'use client'

import { useEffect, useState } from 'react'
import HQShell from '../components/HQShell'
import { motion, AnimatePresence } from 'framer-motion'

export default function GovernancePage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In production, this would fetch from /api/users
    setUsers([
        { id: '1', name: 'Zander Wilken', email: 'zander@aic.co.za', role: 'ADMIN', is_super_admin: true, permissions: { can_publish: true, can_verify: true } },
        { id: '2', name: 'Sarah Khumalo', email: 'sarah@aic.co.za', role: 'AUDITOR', is_super_admin: false, permissions: { can_publish: false, can_verify: true } },
        { id: '3', name: 'John Doe', email: 'john@aic.co.za', role: 'VIEWER', is_super_admin: false, permissions: { can_publish: true, can_verify: false } },
    ]);
    setLoading(false);
  }, []);

  const handleToggle = (userId: string, permission: string) => {
      setUsers(prev => prev.map(u => {
          if (u.id === userId) {
              return { ...u, permissions: { ...u.permissions, [permission]: !u.permissions[permission] } };
          }
          return u;
      }));
      // In production, this would call a PATCH API
  };

  return (
    <HQShell>
      <div className="max-w-6xl space-y-12">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-serif font-medium tracking-tight underline decoration-aic-gold underline-offset-8">Institutional Control</h1>
                <p className="text-gray-500 font-serif mt-4 italic text-lg max-w-xl">Super-Admin Governance: Managing team access, roles, and functional permissions across the AIC ecosystem.</p>
            </div>
            <button className="bg-white text-black px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors">
                + Provision New Account
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Active Personnel</p>
                    <p className="text-4xl font-serif font-medium text-white">{users.length}</p>
                </div>
                <div className="text-right">
                    <span className="text-[8px] font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">SYSTEM STABLE</span>
                </div>
            </div>
            <div className="bg-aic-red/5 border border-aic-red/20 p-8 rounded-[2rem]">
                <p className="text-[10px] font-mono text-aic-red uppercase tracking-widest mb-2">Security Level</p>
                <p className="text-xl font-serif font-medium text-white italic">"High - Restricted Access Only"</p>
            </div>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-sm font-serif">
                <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">User Details</th>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Assigned Role</th>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Can Publish</th>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Can Verify</th>
                        <th className="p-6 text-right font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {loading ? (
                        <tr><td colSpan={5} className="p-12 text-center text-gray-500 font-serif">Accessing personnel database...</td></tr>
                    ) : users.map((user, i) => (
                        <motion.tr 
                            key={user.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="hover:bg-white/5 transition-colors group"
                        >
                            <td className="p-6">
                                <p className="font-bold text-white text-lg leading-none mb-1">
                                    {user.name} {user.is_super_admin && <span className="text-[8px] text-aic-gold border border-aic-gold/20 px-1 ml-2">SA</span>}
                                </p>
                                <p className="text-[10px] font-mono text-gray-500">{user.email}</p>
                            </td>
                            <td className="p-6">
                                <span className="text-[9px] font-mono uppercase text-white bg-white/10 px-2 py-0.5 rounded">{user.role}</span>
                            </td>
                            <td className="p-6 text-center">
                                <button 
                                    onClick={() => handleToggle(user.id, 'can_publish')}
                                    className={`w-4 h-4 rounded border transition-colors mx-auto ${user.permissions.can_publish ? 'bg-aic-gold border-aic-gold' : 'border-white/20'}`}
                                />
                            </td>
                            <td className="p-6 text-center">
                                <button 
                                    onClick={() => handleToggle(user.id, 'can_verify')}
                                    className={`w-4 h-4 rounded border transition-colors mx-auto ${user.permissions.can_verify ? 'bg-aic-gold border-aic-gold' : 'border-white/20'}`}
                                />
                            </td>
                            <td className="p-6 text-right">
                                <span className="text-[9px] font-mono font-bold text-green-400 uppercase tracking-widest">Active</span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </HQShell>
  )
}
