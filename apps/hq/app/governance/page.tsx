'use client'

import { useEffect, useState } from 'react'
import HQShell from '../components/HQShell'
import { motion, AnimatePresence } from 'framer-motion'

export default function GovernancePage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || [])
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleProvision = async () => {
    const name = prompt("Full Name:");
    if (!name) return;
    const email = prompt("Email:");
    if (!email) return;
    const password = prompt("Temporary Password:");
    if (!password) return;
    const role = prompt("Role (ADMIN, AUDITOR, VIEWER):", "AUDITOR");
    if (!role) return;

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        if (response.ok) {
            alert("Personnel provisioned successfully.");
            fetchUsers();
        }
    } catch (err) {
        console.error(err);
        alert("Provisioning failed.");
    }
  }

  const handleToggle = (userId: string, permission: string) => {
      // In production, this would call a PATCH /api/users
      alert("Permission PATCH logic required for this row.");
  };

  return (
    <HQShell>
      <div className="max-w-6xl space-y-12">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-serif font-medium tracking-tight underline decoration-aic-gold underline-offset-8">Institutional Control</h1>
                <p className="text-gray-500 font-serif mt-4 italic text-lg max-w-xl">Super-Admin Governance: Managing team access, roles, and functional permissions across the AIC ecosystem.</p>
            </div>
            <button 
                onClick={handleProvision}
                className="bg-white text-black px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors"
            >
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
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Permissions</th>
                        <th className="p-6 text-right font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Last Access</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {loading ? (
                        <tr><td colSpan={4} className="p-12 text-center text-gray-500 font-serif">Accessing personnel database...</td></tr>
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
                                    {user.name} {user.is_super_admin && <span className="text-[8px] text-aic-gold border border-aic-gold/20 px-1 ml-2 font-mono">SUPER</span>}
                                </p>
                                <p className="text-[10px] font-mono text-gray-500">{user.email}</p>
                            </td>
                            <td className="p-6">
                                <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                                    user.role === 'ADMIN' ? 'border-aic-gold text-aic-gold bg-aic-gold/5' : 'border-white/10 text-gray-400'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-6 text-center">
                                <div className="flex justify-center gap-2">
                                    {Object.entries(user.permissions || {}).map(([key, val]) => (
                                        <span key={key} className={`text-[7px] font-mono px-1 border ${val ? 'border-green-500/20 text-green-500' : 'border-red-500/20 text-red-500'}`}>
                                            {key.replace('can_', '')}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="p-6 text-right">
                                <span className="text-[9px] font-mono text-gray-500 uppercase">
                                    {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                                </span>
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