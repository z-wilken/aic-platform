'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminShell from '../../components/AdminShell';

export default function AdminAuditPage() {
    const { id } = useParams();
    const [requirements, setRequirements] = useState<any[]>([]);
    const [org, setOrg] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        // Fetch requirements
        fetch(`/api/requirements?org_id=${id}`)
            .then(res => res.json())
            .then(data => {
                setRequirements(data.requirements);
                // Fetch org details (simplified for demo)
                fetch(`/api/dashboard`) // Using dashboard API to get org list
                    .then(res => res.json())
                    .then(dashData => {
                        const currentOrg = dashData.activeOrgs.find((o: any) => o.id === id);
                        setOrg(currentOrg || { name: 'Organization', integrity_score: 0 });
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (reqId: string, status: string) => {
        const findings = status === 'REJECTED' ? prompt("Reason for rejection:") : "Requirement met.";
        if (status === 'REJECTED' && !findings) return;

        try {
            const response = await fetch('/api/requirements', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: reqId, status, findings, org_id: id })
            });

            if (response.ok) {
                alert(`Status updated to ${status}`);
                fetchData();
            }
        } catch (err) {
            console.error(err);
            alert("Update failed.");
        }
    };

    if (loading) return <AdminShell><div className="p-12 text-center text-gray-500">Loading audit data...</div></AdminShell>;

    return (
        <AdminShell>
            <div className="space-y-8">
                <div className="flex justify-between items-center bg-[#1c1c1c] p-8 rounded-xl border border-gray-800">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{org?.name}</h1>
                        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Certification Audit ID: {id?.toString().substring(0,8)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-xs uppercase mb-1 font-mono">Real-time Score</p>
                        <p className="text-5xl font-bold text-aic-gold">{org?.integrity_score}%</p>
                    </div>
                </div>

                <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800 bg-gray-900/30">
                        <h2 className="font-bold">Audit Requirements Management</h2>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="p-4">Requirement</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Evidence</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 font-mono">
                            {requirements.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-800/30">
                                    <td className="p-4">
                                        <p className="font-bold text-white">{req.title}</p>
                                        <p className="text-xs text-gray-500 mt-1 max-w-md">{req.description}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                                            req.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' :
                                            req.status === 'SUBMITTED' ? 'bg-blue-500/20 text-blue-400' :
                                            req.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {req.evidence_url ? (
                                            <a href={req.evidence_url} target="_blank" className="text-aic-gold hover:underline text-xs">View Document</a>
                                        ) : (
                                            <span className="text-gray-600 text-xs">None</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        {req.status === 'SUBMITTED' && (
                                            <>
                                                <button 
                                                    onClick={() => handleUpdateStatus(req.id, 'VERIFIED')}
                                                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs font-bold"
                                                >
                                                    VERIFY
                                                </button>
                                                <button 
                                                    onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                                                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs font-bold"
                                                >
                                                    REJECT
                                                </button>
                                            </>
                                        )}
                                        {req.status === 'VERIFIED' && (
                                            <span className="text-green-500 text-xs">Complete</span>
                                        )}
                                        {(req.status === 'PENDING' || req.status === 'REJECTED') && (
                                            <span className="text-gray-500 text-xs italic tracking-normal">Awaiting Submission</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminShell>
    );
}