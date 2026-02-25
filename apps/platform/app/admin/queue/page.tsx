"use client";

import { 
  Search, 
  Filter, 
  FileText, 
  AlertCircle, 
  Clock, 
  Eye,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";

const MOCK_QUEUE = [
  { 
    id: 'DOC-001', 
    org: 'Meridian Financial', 
    doc: 'Bias Audit Report', 
    status: 'AI_TRIAGED', 
    flags: 2, 
    risk: 'Medium', 
    date: '10m ago' 
  },
  { 
    id: 'DOC-002', 
    org: 'NovaTech Health', 
    doc: 'Model Card v2.1', 
    status: 'PENDING_TRIAGE', 
    flags: 0, 
    risk: 'Low', 
    date: '45m ago' 
  },
  { 
    id: 'DOC-003', 
    org: 'Apex Logistics', 
    doc: 'Data Lineage Log', 
    status: 'AI_FAILED', 
    flags: 1, 
    risk: 'High', 
    date: '2h ago' 
  },
];

export default function AdminQueue() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Unified Submission Queue</h1>
            <p className="text-sm text-gray-500">Triage and manage certification evidence from all portals.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            <Button className="bg-[#0f1f3d] text-white" size="sm">Export Report</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Pending Triage', value: '12', color: 'blue' },
            { label: 'High Risk Flags', value: '3', color: 'red' },
            { label: 'AI Passed', value: '48', color: 'green' },
            { label: 'Avg Review Time', value: '4.2h', color: 'amber' },
          ].map((stat, i) => (
            <Card key={i} className="p-4 border-none shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by Organization or ID..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm" />
            </div>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Submission ID</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">AI Triage Status</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {MOCK_QUEUE.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{item.org}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" /> {item.doc}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === 'AI_TRIAGED' ? (
                        <Badge className="bg-green-50 text-green-700 border-green-100 gap-1">
                          <Zap className="w-3 h-3" /> AI Scanned
                        </Badge>
                      ) : item.status === 'AI_FAILED' ? (
                        <Badge className="bg-red-50 text-red-700 border-red-100 gap-1">
                          <AlertCircle className="w-3 h-3" /> Flagged
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-50 text-blue-700 border-blue-100 gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </Badge>
                      )}
                      {item.flags > 0 && <span className="text-[10px] font-bold text-red-500">{item.flags} Flags</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-xs font-bold ${
                      item.risk === 'High' ? 'text-red-600' : 
                      item.risk === 'Medium' ? 'text-amber-600' : 'text-green-600'
                    }`}>
                      {item.risk}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                      <Eye className="w-4 h-4 mr-2" /> Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* AI Triage Details Preview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 border-none shadow-sm bg-[#0f1f3d] text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#c9920a]" /> AI Pre-Audit Findings
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm">Meridian Financial: Bias Audit</span>
                  <Badge className="bg-red-500 text-white">Action Required</Badge>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Automated scan detected <strong>missing digital signatures</strong> on page 4. Summary statistics for "Gender Parity" are present but <strong>raw covariance matrix</strong> is missing from Annex C.
                </p>
              </div>
              <Button className="w-full bg-[#c9920a] hover:bg-[#b07d08]">Open Triage Workbench</Button>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#c9920a]" /> System Integrity Monitor
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Blockchain Hashing', status: 'Healthy', time: 'Active' },
                { label: 'Sync Status (On-Prem Agents)', status: 'Lagging', time: '2 nodes' },
                { label: 'Evidence Immutability', status: 'Verified', time: '100%' },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">{m.time}</span>
                    <Badge variant={m.status === 'Healthy' ? 'default' : 'secondary'} className={m.status === 'Healthy' ? 'bg-green-500' : 'bg-amber-500'}>
                      {m.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
