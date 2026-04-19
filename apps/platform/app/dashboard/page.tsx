'use client';

import { useEffect, useState } from 'react';
import {
  Shield,
  FileText,
  UploadCloud,
  CheckCircle2,
  MessageSquare,
  Building,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

const STEP_LABELS = ['Application', 'Evidence Review', 'Proctored Exam', 'Final Certification'];

type Slot = {
  type: string;
  label: string;
  required: boolean;
  uploaded: boolean;
};

type EvidenceData = {
  organization: { name: string; primaryAiOfficer: string | null };
  slots: Slot[];
  certStep: number;
  certificationStatus: string | null;
};

export default function ClientDashboard() {
  const [data, setData] = useState<EvidenceData | null>(null);

  useEffect(() => {
    fetch('/api/evidence')
      .then(r => r.json())
      .then(d => { if (!d.error) setData(d); })
      .catch(() => {});
  }, []);

  const slots = data?.slots ?? [];
  const mandatoryCount = slots.filter(s => s.required).length;
  const mandatoryUploaded = slots.filter(s => s.required && s.uploaded).length;
  const isComplete = mandatoryCount > 0 && mandatoryUploaded === mandatoryCount;
  const certStep = data?.certStep ?? 0;

  const steps = STEP_LABELS.map((label, i) => ({
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    status: i < certStep ? 'completed' : i === certStep ? 'current' : 'upcoming',
  }));

  return (
    <div className="min-h-screen bg-aic-paper">
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#0A1728] mb-2">
              {data ? `Welcome, ${data.organization.name}` : 'Loading…'}
            </h1>
            <p className="text-gray-500">Manage your ISO/IEC 42001 certification lifecycle.</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Evidence Readiness</div>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-[#0A1728]">
                {mandatoryCount > 0 ? Math.round((mandatoryUploaded / mandatoryCount) * 100) : 0}
                <span className="text-[#c36c32]">/100</span>
              </span>
              <div className="w-12 h-12 rounded-full border-4 border-[#c36c32] border-t-transparent animate-spin-slow"></div>
            </div>
          </div>
        </header>

        {/* Status Stepper */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            {steps.map((step, idx) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center bg-gray-50 px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                  step.status === 'completed' ? 'bg-[#0A1728] text-aic-paper' :
                  step.status === 'current'   ? 'bg-[#c36c32] text-aic-paper scale-110 shadow-lg' :
                  'bg-aic-paper border-2 border-gray-200 text-gray-400'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
                </div>
                <span className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-[#0A1728]'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Vault Section */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0A1728] flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#c36c32]" />
                  Secure Audit Vault
                </h2>
                <Badge variant="outline" className="text-[#c36c32] border-[#c36c32]/20">
                  {mandatoryUploaded}/{mandatoryCount} Mandatory Files
                </Badge>
              </div>

              {slots.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-8">Loading vault…</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slots.map(slot => (
                    <Card
                      key={slot.type}
                      className={`p-6 border-2 transition-all ${slot.uploaded ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${slot.uploaded ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        {slot.uploaded ? (
                          <Badge className="bg-emerald-500">Uploaded</Badge>
                        ) : (
                          <Badge variant="secondary">Missing</Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-[#0A1728] mb-1">{slot.label}</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        {slot.required ? 'Mandatory for Submission' : 'Recommended Evidence'}
                      </p>
                      {!slot.uploaded ? (
                        <Button variant="outline" className="w-full border-dashed border-2 hover:bg-gray-50">
                          <UploadCloud className="w-4 h-4 mr-2" /> Upload
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                          <CheckCircle2 className="w-4 h-4" /> Uploaded
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* In-Portal Communication */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#0A1728] mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#c36c32]" />
                Auditor Correspondence
              </h2>
              <div className="text-sm text-gray-400 italic mb-4">
                Correspondence with your assigned auditor will appear here.
              </div>
              <div className="relative">
                <textarea
                  placeholder="Type a message to your auditor…"
                  className="w-full bg-aic-paper border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c36c32]/20 min-h-[100px]"
                />
                <Button className="absolute bottom-3 right-3 bg-[#0A1728] text-aic-paper">Send</Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0A1728] rounded-3xl p-8 text-aic-paper">
              <h3 className="text-xl font-bold mb-4">Completeness Gauge</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-aic-paper/60">Readiness for Audit</span>
                  <span className="font-bold">
                    {mandatoryCount > 0 ? `${Math.round((mandatoryUploaded / mandatoryCount) * 100)}%` : '0%'}
                  </span>
                </div>
                <Progress
                  value={mandatoryCount > 0 ? (mandatoryUploaded / mandatoryCount) * 100 : 0}
                  className="bg-aic-paper/10"
                />
              </div>

              {!isComplete && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
                  <p className="text-xs text-amber-200 leading-relaxed">
                    <strong>Submission Locked:</strong> Upload all mandatory documents to trigger human review.
                  </p>
                </div>
              )}

              <Button
                disabled={!isComplete}
                className={`w-full py-6 rounded-xl font-bold transition-all ${isComplete ? 'bg-[#c36c32] hover:bg-[#c36c32]' : 'bg-aic-paper/5 text-aic-paper/20'}`}
              >
                Submit for AIC Audit
              </Button>
            </div>

            <Card className="p-6">
              <h3 className="font-bold text-[#0A1728] mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#c36c32]" />
                Profile Command
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Company Name</div>
                  <div className="font-medium">{data?.organization.name ?? '—'}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Primary AI Officer</div>
                  <div className="font-medium">{data?.organization.primaryAiOfficer ?? '—'}</div>
                </div>
                <Button variant="outline" className="w-full text-xs">Update Global Metadata</Button>
              </div>
            </Card>

            <div className="p-6 border border-emerald-100 bg-emerald-50/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">IAF Status: Active</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    {data?.certificationStatus ?? 'Certification status loading…'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
