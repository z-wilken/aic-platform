'use client';

import { useEffect, useState } from 'react';
import AdminShell from '../components/AdminShell';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'VIEWER',
        org_id: ''
    });

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            toast.error('Failed to sync institutional users.');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrgs = async () => {
        try {
            const res = await fetch('/api/organizations');
            const data = await res.json();
            setOrganizations(data.organizations || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchOrgs();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (res.ok) {
                toast.success('User registered in registry.');
                setIsAdding(false);
                setNewUser({ name: '', email: '', password: '', role: 'VIEWER', org_id: '' });
                fetchUsers();
            } else {
                const err = await res.json();
                toast.error(err.error || 'Registration failed.');
            }
        } catch (err) {
            toast.error('Network error during registration.');
        }
    };

    const toggleUserStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_active: !currentStatus })
            });
            if (res.ok) {
                toast.success(`User access ${!currentStatus ? 'restored' : 'suspended'}.`);
                fetchUsers();
            }
        } catch (err) {
            toast.error('Status update failed.');
        }
    };

    const changeRole = async (id: string, role: string) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role })
            });
            if (res.ok) {
                toast.success(`Role updated to ${role}.`);
                fetchUsers();
            }
        } catch (err) {
            toast.error('Role update failed.');
        }
    };

    return (
        <AdminShell>
            <div className="max-w-6xl mx-auto pb-24 space-y-12">
                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tighter">Institutional Registry</h1>
                        <p className="text-gray-500 font-serif mt-2 italic text-lg leading-relaxed">
                            Global user management and identity provisioning for the AIC ecosystem.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="bg-white text-black px-8 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-all shadow-xl"
                    >
                        + Register User
                    </button>
                </div>

                {isAdding && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl"
                    >
                        <h3 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-10">User Registration</h3>
                        <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">Full Name</label>
                                    <input 
                                        className="w-full bg-black border border-white/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all text-white"
                                        value={newUser.name}
                                        onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">Compliance Email</label>
                                    <input 
                                        type="email"
                                        className="w-full bg-black border border-white/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all text-white"
                                        value={newUser.email}
                                        onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">Initial Access Key</label>
                                    <input 
                                        type="password"
                                        className="w-full bg-black border border-white/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all text-white"
                                        value={newUser.password}
                                        onChange={e => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">Role</label>
                                        <select 
                                            className="w-full bg-black border border-white/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all text-white appearance-none"
                                            value={newUser.role}
                                            onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                                        >
                                            <option value="VIEWER">VIEWER</option>
                                            <option value="AUDITOR">AUDITOR</option>
                                            <option value="COMPLIANCE_OFFICER">OFFICER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">Organization</label>
                                        <select 
                                            className="w-full bg-black border border-white/10 rounded-xl p-4 font-serif text-sm focus:border-aic-gold outline-none transition-all text-white appearance-none"
                                            value={newUser.org_id}
                                            onChange={e => setNewUser(prev => ({ ...prev, org_id: e.target.value }))}
                                        >
                                            <option value="">Global/None</option>
                                            {organizations.map(o => (
                                                <option key={o.id} value={o.id}>{o.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                                <button type="button" onClick={() => setIsAdding(false)} className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest px-6 py-3">Cancel</button>
                                <button type="submit" className="bg-aic-gold text-black px-10 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                                    PROVISION_USER
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden">
                    <table className="w-full text-left text-sm font-serif">
                        <thead className="bg-white/5 font-mono text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                            <tr>
                                <th className="p-8">Identity</th>
                                <th className="p-8">Institutional Scope</th>
                                <th className="p-8">Status</th>
                                <th className="p-8">Access Level</th>
                                <th className="p-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={5} className="p-20 text-center text-gray-600 italic">Decoding institutional directory...</td></tr>
                            ) : users.map((user, i) => (
                                <motion.tr 
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="p-8">
                                        <p className={`text-lg font-bold tracking-tight ${user.is_active ? 'text-white' : 'text-gray-600 line-through'}`}>{user.name}</p>
                                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter mt-1">{user.email}</p>
                                    </td>
                                    <td className="p-8">
                                        <p className="text-sm font-medium text-gray-400">{user.org_name || 'AIC GLOBAL'}</p>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-3">
                                            <span className={`h-2 w-2 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                                                {user.is_active ? 'ACTIVE' : 'SUSPENDED'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <select 
                                            value={user.role}
                                            onChange={(e) => changeRole(user.id, e.target.value)}
                                            className="bg-zinc-800 border border-white/10 text-white font-mono text-[10px] font-bold p-2 rounded outline-none focus:border-aic-gold uppercase tracking-widest"
                                        >
                                            <option value="VIEWER">VIEWER</option>
                                            <option value="AUDITOR">AUDITOR</option>
                                            <option value="COMPLIANCE_OFFICER">OFFICER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button 
                                            onClick={() => toggleUserStatus(user.id, user.is_active)}
                                            className={`text-[10px] font-mono font-bold uppercase tracking-widest ${user.is_active ? 'text-red-500 hover:text-red-400' : 'text-green-500 hover:text-green-400'}`}
                                        >
                                            {user.is_active ? 'SUSPEND' : 'RESTORE'}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminShell>
    );
}
