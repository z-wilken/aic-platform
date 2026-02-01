import DashboardShell from '../components/DashboardShell';

export default function VerificationQueue() {
  const tasks = [
    { id: 'DOC-992', org: 'Capitec Bank', type: 'Tech Spec', status: 'PENDING_AI', confidence: 0.89 },
    { id: 'DOC-993', org: 'Santam', type: 'Policy PDF', status: 'FLAGGED', confidence: 0.45 },
  ];

  return (
    <DashboardShell>
      <div className="max-w-5xl">
        <h2 className="text-2xl font-serif font-bold mb-8">KYC Verification Queue (AI-Assist)</h2>
        
        <div className="grid gap-4">
            {tasks.map((task) => (
                <div key={task.id} className="glass-panel p-6 flex justify-between items-center">
                    <div>
                        <p className="font-bold text-lg">{task.org}</p>
                        <p className="text-sm text-gray-500 font-mono">{task.type} • {task.id}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs uppercase text-gray-400">AI Confidence</p>
                            <p className={`font-mono font-bold ${task.confidence > 0.8 ? 'text-green-500' : 'text-red-500'}`}>
                                {(task.confidence * 100).toFixed(0)}%
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-green-900 text-green-300 border border-green-700 px-4 py-2 rounded font-mono text-xs hover:bg-green-800">APPROVE</button>
                            <button className="bg-red-900 text-red-300 border border-red-700 px-4 py-2 rounded font-mono text-xs hover:bg-red-800">REJECT</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </DashboardShell>
  );
}
