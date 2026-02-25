"use client";

import { useState } from "react";
import { 
  Shield, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ChevronRight,
  UserCircle,
  Building,
  AlertCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

const STEPS = [
  { id: 'app', label: 'Application', status: 'completed' },
  { id: 'vault', label: 'Evidence Review', status: 'current' },
  { id: 'exam', label: 'Proctored Exam', status: 'upcoming' },
  { id: 'cert', label: 'Final Certification', status: 'upcoming' },
];

const VAULT_SLOTS = [
  { type: 'model_card', label: 'Model Card (ISO Annex B)', required: true, uploaded: true },
  { type: 'bias_report', label: 'Bias Audit Report', required: true, uploaded: false },
  { type: 'data_summary', label: 'Training Data Summary', required: true, uploaded: false },
  { type: 'oversight_sop', label: 'Human Oversight SOP', required: false, uploaded: false },
];

export default function ClientDashboard() {
  const [activeStep] = useState(1);
  const uploadedCount = VAULT_SLOTS.filter(s => s.uploaded).length;
  const mandatoryCount = VAULT_SLOTS.filter(s => s.required).length;
  const mandatoryUploaded = VAULT_SLOTS.filter(s => s.required && s.uploaded).length;
  const isComplete = mandatoryUploaded === mandatoryCount;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        {/* Header */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#0f1f3d] mb-2">Welcome, Meridian Financial</h1>
            <p className="text-gray-500">Manage your ISO/IEC 42001 certification lifecycle.</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Compliance Health</div>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-[#0f1f3d]">84<span className="text-[#c9920a]">/100</span></span>
              <div className="w-12 h-12 rounded-full border-4 border-[#c9920a] border-t-transparent animate-spin-slow"></div>
            </div>
          </div>
        </header>

        {/* Status Stepper */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center relative">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            {STEPS.map((step, idx) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center bg-gray-50 px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                  step.status === 'completed' ? 'bg-[#0f1f3d] text-white' : 
                  step.status === 'current' ? 'bg-[#c9920a] text-white scale-110 shadow-lg' : 
                  'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
                </div>
                <span className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-[#0f1f3d]'}`}>
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
                <h2 className="text-2xl font-bold text-[#0f1f3d] flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#c9920a]" />
                  Secure Audit Vault
                </h2>
                <Badge variant="outline" className="text-[#c9920a] border-[#c9920a]/20">
                  {mandatoryUploaded}/{mandatoryCount} Mandatory Files
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VAULT_SLOTS.map(slot => (
                  <Card key={slot.type} className={`p-6 border-2 transition-all ${slot.uploaded ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-100 hover:border-gray-300'}`}>
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
                    <h3 className="font-bold text-[#0f1f3d] mb-1">{slot.label}</h3>
                    <p className="text-xs text-gray-500 mb-4">{slot.required ? 'Mandatory for Submission' : 'Recommended Evidence'}</p>
                    
                    {!slot.uploaded ? (
                      <Button variant="outline" className="w-full border-dashed border-2 hover:bg-gray-50">
                        <UploadCloud className="w-4 h-4 mr-2" /> Upload
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> v1.0.4 AI Triaged
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            {/* In-Portal Communication */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#0f1f3d] mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#c9920a]" />
                Auditor Correspondence
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0f1f3d] flex items-center justify-center text-white text-xs font-bold">AIC</div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-[#0f1f3d]">System Auditor</span>
                      <span className="text-[10px] text-gray-400">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">The "Bias Audit Report" is currently empty. Please ensure you upload the full statistical breakdown before submitting.</p>
                  </div>
                </div>
                <div className="relative">
                  <textarea 
                    placeholder="Type a message to your auditor..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 min-h-[100px]"
                  />
                  <Button className="absolute bottom-3 right-3 bg-[#0f1f3d] text-white">Send</Button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Next Actions */}
          <div className="space-y-8">
            <div className="bg-[#0f1f3d] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Completeness Gauge</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Readiness for Audit</span>
                  <span className="font-bold">{Math.round((mandatoryUploaded/mandatoryCount) * 100)}%</span>
                </div>
                <Progress value={(mandatoryUploaded/mandatoryCount) * 100} className="bg-white/10" />
              </div>
              
              {!isComplete && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
                  <p className="text-xs text-amber-200 leading-relaxed">
                    <strong>Submission Locked:</strong> You must upload all mandatory documents before you can trigger a human review.
                  </p>
                </div>
              )}

              <Button 
                disabled={!isComplete}
                className={`w-full py-6 rounded-xl font-bold transition-all ${isComplete ? 'bg-[#c9920a] hover:bg-[#b07d08]' : 'bg-white/5 text-white/20'}`}
              >
                Submit for AIC Audit
              </Button>
            </div>

            <Card className="p-6">
              <h3 className="font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#c9920a]" />
                Profile Command
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Company Name</div>
                  <div className="font-medium">Meridian Financial Group</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Primary AI Officer</div>
                  <div className="font-medium">Dr. Sarah Chen</div>
                </div>
                <Button variant="outline" className="w-full text-xs">Update Global Metadata</Button>
              </div>
            </Card>

            <div className="p-6 border border-emerald-100 bg-emerald-50/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">IAF Status: Active</h4>
                  <p className="text-xs text-emerald-700 mt-1">Your organization is currently meeting all preliminary algorithmic rights thresholds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
