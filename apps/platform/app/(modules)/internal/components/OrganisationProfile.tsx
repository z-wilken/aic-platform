'use client';

import { useSession } from 'next-auth/react';
import { Building2, User, Mail, Phone, Globe, MapPin, Edit2 } from 'lucide-react';
import { Eyebrow, SectionCard, CopperTag } from '@/app/components/ui/Eyebrow';
import { StatusChip } from '@/app/components/ui/StatusChip';

const ORG = {
  name: 'Manufacturing Co (Pty) Ltd',
  registration: '2018/473821/07',
  division: '2 — Supervised AI',
  sector: 'Financial Services',
  employees: '1,200–5,000',
  website: 'mfg.co.za',
  address: '27 Innovation Drive, Sandton, Johannesburg, 2196',
  accountablePerson: {
    name: 'Dr. Sarah Chen',
    title: 'Chief AI Officer',
    email: 'sarah.chen@mfg.co.za',
    phone: '+27 11 555 0194',
  },
  agreements: [
    { label: 'Service Agreement (DOC-001)',         status: 'signed',  date: 'Jan 14, 2026' },
    { label: 'Data Processing Agreement (DOC-003)', status: 'signed',  date: 'Jan 14, 2026' },
    { label: 'Accountable Person Declaration',      status: 'signed',  date: 'Jan 18, 2026' },
    { label: 'Non-Disclosure Agreement',            status: 'signed',  date: 'Jan 14, 2026' },
  ],
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b border-[#f3f4f6] last:border-0">
      <div className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#9ca3af] mb-1">{label}</div>
      <div className="text-xs font-medium text-[#0f1f3d]">{value}</div>
    </div>
  );
}

export default function OrganisationProfile() {
  return (
    <div className="space-y-5">
      <Eyebrow>Organisation Profile</Eyebrow>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        {/* Organisation details */}
        <SectionCard>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-[#c9920a]" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-[#0f1f3d]">{ORG.name}</h3>
                <span className="font-mono text-[9px] text-[#9ca3af]">Reg: {ORG.registration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CopperTag>DIV {ORG.division.split(' ')[0]}</CopperTag>
              <StatusChip status="active" />
            </div>
          </div>

          <div>
            <Field label="Division Classification" value={ORG.division} />
            <Field label="Sector" value={ORG.sector} />
            <Field label="Employees" value={ORG.employees} />
            <Field label="Website" value={ORG.website} />
            <Field label="Registered Address" value={ORG.address} />
          </div>

          <button className="mt-4 w-full inline-flex items-center justify-center gap-2 font-mono text-[9px] font-bold text-[#6b7280] border border-[#e5e7eb] rounded-full px-4 py-2 hover:border-[#c9920a] hover:text-[#c9920a] transition-colors">
            <Edit2 className="w-3 h-3" /> Request Profile Update
          </button>
        </SectionCard>

        {/* Accountable Person */}
        <div className="space-y-5">
          <SectionCard>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-4">
              Accountable Person
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f0f4f8] border border-[#e5e7eb] flex items-center justify-center text-sm font-bold text-[#0f1f3d] flex-shrink-0 font-serif">
                SC
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f1f3d]">{ORG.accountablePerson.name}</div>
                <div className="font-mono text-[9px] text-[#c9920a]">{ORG.accountablePerson.title}</div>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-[#6b7280]">
                <Mail className="w-3.5 h-3.5 text-[#9ca3af]" />
                <span>{ORG.accountablePerson.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#6b7280]">
                <Phone className="w-3.5 h-3.5 text-[#9ca3af]" />
                <span>{ORG.accountablePerson.phone}</span>
              </div>
            </div>
          </SectionCard>

          {/* Agreements */}
          <SectionCard>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-4">
              Signed Agreements
            </div>
            <div className="space-y-3">
              {ORG.agreements.map((a) => (
                <div key={a.label} className="flex items-center gap-3">
                  <StatusChip status={a.status as 'signed'} />
                  <span className="flex-1 text-xs text-[#0f1f3d]">{a.label}</span>
                  <span className="font-mono text-[8px] text-[#9ca3af]">{a.date}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
