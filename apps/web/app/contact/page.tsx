'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Clock,
  Award,
  Globe,
  Users,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    country: "",
    certificationType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const certificationTypes = [
    { value: "SAIGS", label: "SAIGS", description: "Senior AI Governance Specialist" },
    { value: "CAEL", label: "CAEL", description: "Certified AI Ethics Lead" },
    { value: "AIGA", label: "AIGA", description: "AI Governance Auditor" },
    { value: "other", label: "Other Inquiry", description: "General partnership or corporate inquiry" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] pt-24 pb-16 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-[#c9920a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#c9920a]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              You&apos;re on the List!
            </h2>
            <p className="text-[#6b7280] text-lg mb-6 leading-relaxed">
              Thank you for joining the AIC waiting list, <strong>{formData.firstName}</strong>. We&apos;ve received your application.
            </p>
            <div className="bg-[#f0f4f8] border border-[#e5e7eb] rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#0f1f3d] mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#c9920a]" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-[#0f1f3d]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9920a] font-bold">1.</span>
                  <span>You&apos;ll receive exclusive pre-launch updates and study materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9920a] font-bold">2.</span>
                  <span>Get notified 48 hours before registration opens to the public</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9920a] font-bold">3.</span>
                  <span>Access your exclusive 25% early bird discount code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9920a] font-bold">4.</span>
                  <span>Join our private pre-certification community forum</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-[#c9920a] hover:bg-[#b07d08] text-white px-8"
              >
                Back to Portal
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aic-paper">
      {/* Header */}
      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl text-aic-paper mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Join the <span className="text-[#c9920a]">AIC Waiting List</span>
            </h1>
            <p className="text-aic-paper/70 text-lg max-w-2xl mx-auto">
              Secure your place in the upcoming certification cohort. Professionals who join the waiting list receive early access, exclusive study materials, and a 25% discount.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0f1f3d] mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f0f4f8] rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#c9920a]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#0f1f3d] uppercase tracking-wider font-bold opacity-70">General Enquiries</div>
                      <div className="text-[#0f1f3d] font-medium">albert@ztoaholdings.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f0f4f8] rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-[#c9920a]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#0f1f3d] uppercase tracking-wider font-bold opacity-70">Strategic Partnerships</div>
                      <div className="text-[#0f1f3d] font-medium">zander@ztoaholdings.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f0f4f8] rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#c9920a]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#0f1f3d] uppercase tracking-wider font-bold opacity-70">Headquarters</div>
                      <div className="text-[#0f1f3d] font-medium">Johannesburg, South Africa<br />15 Smit Street, Johannesburg,<br />Gauteng, 2000</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#f0f4f8] rounded-xl border border-[#e5e7eb]">
                <h3 className="font-semibold text-[#0f1f3d] mb-4">Enterprise Solutions</h3>
                <p className="text-sm text-[#0f1f3d] opacity-80 mb-4 font-medium">
                  Interested in certifying your entire team or organization? We offer enterprise-wide conformity assessment and bulk certification packages.
                </p>
                <a href="mailto:albert@ztoaholdings.com" className="text-[#c9920a] text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-10 shadow-xl border-[#e5e7eb] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f0f4f8] rounded-bl-full -mr-10 -mt-10 opacity-50" />
                
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-[#0f1f3d]">First Name</label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-[#0f1f3d]">Last Name</label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#0f1f3d]">Professional Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-[#0f1f3d]">Company / Organization</label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Organization Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="jobTitle" className="text-sm font-medium text-[#0f1f3d]">Job Title</label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Chief Risk Officer"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                        className="bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium text-[#0f1f3d]">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]/60" />
                      <Input
                        id="country"
                        name="country"
                        placeholder="United Kingdom"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="pl-10 bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="text-sm font-medium text-[#0f1f3d] block flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#c9920a]" />
                      I&apos;m Interested In
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {certificationTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                            formData.certificationType === type.value
                              ? "border-[#c9920a] bg-[#c9920a]/5 ring-1 ring-[#c9920a]"
                              : "border-[#e5e7eb] hover:border-[#e5e7eb] hover:bg-[#f0f4f8]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="certificationType"
                            value={type.value}
                            checked={formData.certificationType === type.value}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-[#c9920a] border-[#e5e7eb] focus:ring-[#c9920a]"
                            required
                          />
                          <div>
                            <div className="font-semibold text-[#0f1f3d] text-sm">{type.label}</div>
                            <div className="text-xs text-[#6b7280] leading-snug mt-0.5">{type.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#0f1f3d]">Message (Optional)</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your background or specific requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-aic-paper border-[#e5e7eb] focus:ring-[#c9920a]/20 focus:border-[#c9920a] min-h-[120px]"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-[#c9920a] hover:bg-[#b07d08] text-white py-6 text-lg font-bold shadow-lg shadow-[#c9920a]/20 transition-all"
                    >
                      Join the Waiting List
                    </Button>
                    <p className="text-center text-xs text-[#6b7280]/60 mt-4">
                      By submitting this form, you agree to our privacy policy and terms of service. We will only contact you regarding AIC certification updates.
                    </p>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white border-t border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-[#c9920a] mx-auto mb-6" />
            <h2 className="text-3xl text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Join Thousands of AI Leaders
            </h2>
            <p className="text-[#6b7280] text-lg leading-relaxed max-w-2xl mx-auto">
              Professionals from Fortune 500 companies, government agencies, and leading research institutions are already on the waiting list. Position yourself at the forefront of AI governance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
