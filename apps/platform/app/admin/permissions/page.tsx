"use client";

import { useState } from "react";
import { 
  Shield, 
  Plus, 
  Settings, 
  Lock, 
  History, 
  Search,
  ChevronRight,
  AlertTriangle,
  Trash2
} from "lucide-react";

// Mock data for the interface
const defaultRoles = [
  { id: '1', name: 'Super Admin', slug: 'super_admin', capabilities: ['all'], isCustom: false },
  { id: '2', name: 'Corporate Lead', slug: 'corporate_lead', capabilities: ['upload_bias_report', 'view_global_index'], isCustom: false },
  { id: '3', name: 'Governance Auditor', slug: 'governance_auditor', capabilities: ['approve_certification', 'view_global_index'], isCustom: false },
];

const availableCapabilities = [
  { slug: 'upload_bias_report', name: 'Upload Bias Report', category: 'Audit' },
  { slug: 'approve_certification', name: 'Approve Certification', category: 'Compliance' },
  { slug: 'view_global_index', name: 'View Global Index', category: 'Intelligence' },
  { slug: 'edit_user_permissions', name: 'Edit User Permissions', category: 'Admin' },
  { slug: 'delete_audit_logs', name: 'Delete Audit Logs', category: 'Security' },
];

const auditLogs = [
  { id: '1', actor: 'Super Admin', action: 'REVOKE', target: 'Corporate Lead', detail: 'Removed view_global_index', date: '2026-02-25 14:20' },
  { id: '2', actor: 'Super Admin', action: 'GRANT', target: 'Governance Auditor', detail: 'Added edit_user_permissions', date: '2026-02-25 12:05' },
];

export default function AdminPermissions() {
  const [activeTab, setActiveTab] = useState<'roles' | 'capabilities' | 'audit'>('roles');
  const [selectedRole, setSelectedRole] = useState(defaultRoles[1]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-[#c9920a] mb-1">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">System Integrity</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0f1f3d]">God Mode: Permission Engine</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#0f1f3d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3160] transition-all">
              <Plus className="w-4 h-4" /> Create Custom Role
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <button 
              onClick={() => setActiveTab('roles')}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeTab === 'roles' ? 'bg-white shadow-md border-l-4 border-[#c9920a] text-[#0f1f3d]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span className="font-semibold">Role Management</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('capabilities')}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeTab === 'capabilities' ? 'bg-white shadow-md border-l-4 border-[#c9920a] text-[#0f1f3d]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" />
                <span className="font-semibold">Capability Directory</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeTab === 'audit' ? 'bg-white shadow-md border-l-4 border-[#c9920a] text-[#0f1f3d]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <History className="w-5 h-5" />
                <span className="font-semibold">Permission Audit Log</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Main Workspace */}
          <div className="lg:col-span-9 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] overflow-hidden">
            {activeTab === 'roles' && (
              <div className="flex h-full">
                {/* Role List */}
                <div className="w-1/3 border-r border-gray-100 p-6">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search roles..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm" />
                  </div>
                  <div className="space-y-3">
                    {defaultRoles.map(role => (
                      <button 
                        key={role.id}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${selectedRole?.id === role.id ? 'border-[#c9920a] bg-[#c9920a]/5 shadow-sm' : 'border-gray-50 hover:border-gray-200'}`}
                      >
                        <div className="font-bold text-[#0f1f3d]">{role.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-tighter">{role.slug}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Detail/Capability Toggle */}
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0f1f3d]">{selectedRole?.name}</h2>
                      <p className="text-gray-500 text-sm">Configure granular capabilities for this role.</p>
                    </div>
                    {selectedRole?.isCustom && (
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {['Audit', 'Compliance', 'Intelligence', 'Admin', 'Security'].map(category => (
                      <div key={category}>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {availableCapabilities.filter(c => c.category === category).map(cap => {
                            const isEnabled = selectedRole?.capabilities.includes(cap.slug) || selectedRole?.capabilities.includes('all');
                            return (
                              <div key={cap.slug} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div>
                                  <div className="text-sm font-semibold text-[#0f1f3d]">{cap.name}</div>
                                  <div className="text-[10px] text-gray-400 font-mono">{cap.slug}</div>
                                </div>
                                <button 
                                  className={`w-12 h-6 rounded-full relative transition-all ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isEnabled ? 'right-1' : 'left-1'}`} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#0f1f3d]">Permission Audit Logs</h2>
                  <p className="text-gray-500 text-sm">Immutable trail of all role and capability modifications.</p>
                </div>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#0f1f3d] text-white/70 text-[10px] uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">Actor</th>
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Target Role/User</th>
                        <th className="px-6 py-4">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-400 font-mono text-xs">{log.date}</td>
                          <td className="px-6 py-4 font-semibold text-[#0f1f3d]">{log.actor}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.action === 'GRANT' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{log.target}</td>
                          <td className="px-6 py-4 text-gray-500 italic">{log.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <h4 className="font-bold text-amber-800 mb-1">Administrative Critical Path</h4>
            <p className="text-amber-700 text-sm leading-relaxed">
              You are currently in <strong>God Mode</strong>. Changes made here bypass standard approval flows and are logged directly to the Sovereign System Ledger. Ensure all custom role creations align with the AIC Personnel Certification Manual (ISO/IEC 17024).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
