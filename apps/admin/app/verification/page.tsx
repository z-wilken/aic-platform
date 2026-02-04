'use client'

import AdminShell from '../components/AdminShell'

export default function VerificationQueue() {
  const tasks = [
    { id: 'DOC-992', org: 'Capitec Bank', type: 'Tech Spec', status: 'PENDING_AI', confidence: 0.89 },
    { id: 'DOC-993', org: 'Santam', type: 'Policy PDF', status: 'FLAGGED', confidence: 0.45 },
  ];

  return (
    <AdminShell>
      <div className="max-w-5xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI-Assisted Verification Queue</h1>
          <div className="flex gap-2">
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              AI Reviewer Active
            </span>
          </div>
        </div>
        
        <div className="grid gap-4">
            {tasks.map((task) => (
                <div key={task.id} className="bg-[#1c1c1c] border border-gray-800 p-6 flex justify-between items-center rounded-xl hover:border-gray-700 transition-colors">
                    <div>
                        <p className="font-bold text-lg">{task.org}</p>
                        <p className="text-sm text-gray-500 font-mono">{task.type} • {task.id}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] uppercase text-gray-500 font-mono tracking-widest">AI Confidence</p>
                            <p className={`font-mono font-bold text-xl ${task.confidence > 0.8 ? 'text-green-500' : 'text-red-500'}`}>
                                {(task.confidence * 100).toFixed(0)}%
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-mono text-xs font-bold transition-colors">APPROVE</button>
                            <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-mono text-xs font-bold transition-colors">REJECT</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="p-8 border border-dashed border-gray-800 rounded-xl text-center">
          <p className="text-gray-500 text-sm italic font-serif">
            The AI Reviewer analyzes uploaded evidence against POPIA Section 71 benchmarks.<br/>
            Final certification decisions always require human verification.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}