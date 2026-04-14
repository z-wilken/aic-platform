'use client';

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Shield,
  Award,
  CheckCircle,
  Mail,
  User,
  Building2,
  Briefcase,
  Globe,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

const heroBg = "https://images.unsplash.com/photo-1756885427018-86c8c5969c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjZXJ0aWZpY2F0aW9uJTIwYWNoaWV2ZW1lbnQlMjBzdWNjZXNzfGVufDF8fHx8MTc3NTU1MDg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const benefits = [
  {
    icon: Award,
    title: "Priority Access",
    description: "Be among the first to register when certification opens",
  },
  {
    icon: Star,
    title: "Early Bird Pricing",
    description: "Exclusive 25% discount for waiting list members",
  },
  {
    icon: Users,
    title: "Exclusive Resources",
    description: "Access to pre-launch study materials and webinars",
  },
  {
    icon: TrendingUp,
    title: "Career Advantage",
    description: "Position yourself as an early adopter in AI governance",
  },
];

const certificationTypes = [
  {
    value: "cael",
    label: "CAEL - Certified AI Ethics Lead",
    description: "Professional certification for AI ethics practitioners",
  },
  {
    value: "corporate",
    label: "ISO/IEC 42001 - Corporate Certification",
    description: "AI Management System certification for organizations",
  },
  {
    value: "both",
    label: "Both Individual & Corporate",
    description: "Interested in both certification pathways",
  },
];

export default function WaitingListPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
    country: "",
    certificationType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0C1B2E] via-[#1a3160] to-[#0C1B2E] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#0C1B2E] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              You're on the List!
            </h2>
            <p className="text-[#6B6458] text-lg mb-6 leading-relaxed">
              Thank you for joining the AIC waiting list, <strong>{formData.firstName}</strong>. We've sent a confirmation email to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#0C1B2E] mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-[#0D0D0D]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>You'll receive exclusive pre-launch updates and study materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>Get notified 48 hours before registration opens to the public</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>Access your exclusive 25% early bird discount code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">4.</span>
                  <span>Join our private pre-certification community forum</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-aic-paper border border-[#DDD3C0] text-[#0D0D0D] hover:bg-[#FAF6EF]"
              >
                Submit Another
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#7A2535] hover:bg-[#7A2535] text-aic-paper"
              >
                Return Home
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aic-paper">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C1B2E]/95 via-[#0C1B2E]/90 to-[#1a3160]/85" />
        
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-[#7A2535]" />
              <span className="text-[#7A2535] text-sm uppercase tracking-widest font-medium">
                Join the Waiting List
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl text-aic-paper mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Be First in Line for AIC Certification
            </h1>
            <p className="text-xl text-aic-paper/70 leading-relaxed max-w-2xl mx-auto">
              Registration opens soon. Join our waiting list to receive priority access, exclusive discounts, and early learning resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#FAF6EF] border-b border-[#DDD3C0]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "2,847", label: "On Waiting List" },
              { value: "48", label: "Countries Represented" },
              { value: "25%", label: "Early Bird Discount" },
              { value: "48hrs", label: "Priority Notice" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-[#7A2535] text-3xl font-bold">{stat.value}</div>
                <div className="text-[#6B6458] text-sm mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#FAF6EF]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-[#0C1B2E] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Why Join the Waiting List?
            </h2>
            <p className="text-[#6B6458] max-w-2xl mx-auto">
              Early access members receive exclusive benefits that position you ahead of the competition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-[#0C1B2E]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#0C1B2E]" />
                    </div>
                    <h3 className="font-semibold text-[#0C1B2E] mb-2">{benefit.title}</h3>
                    <p className="text-[#6B6458] text-sm">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-aic-paper">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-[#0C1B2E] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Reserve Your Spot
            </h2>
            <p className="text-[#6B6458]">
              Complete the form below to join the waiting list. All fields are required.
            </p>
          </motion.div>

          <Card className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A2535]/20 focus:border-[#7A2535]"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A2535]/20 focus:border-[#7A2535]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A2535]/20 focus:border-[#7A2535]"
                  placeholder="john.doe@company.com"
                />
              </div>

              {/* Organization & Role */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A2535]/20 focus:border-[#7A2535]"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A2535]/20 focus:border-[#7A2535]"
                    placeholder="Chief Risk Officer"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#DDD3C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A2535]/20 focus:border-[#7A2535]"
                  placeholder="United States"
                />
              </div>

              {/* Certification Type */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] mb-3">
                  <Award className="w-4 h-4 inline mr-1" />
                  I&apos;m Interested In
                </label>
                <div className="space-y-3">
                  {certificationTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-start gap-3 p-4 border border-[#DDD3C0] rounded-lg cursor-pointer hover:bg-[#FAF6EF] transition-colors"
                    >
                      <input
                        type="radio"
                        name="certificationType"
                        value={type.value}
                        checked={formData.certificationType === type.value}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 text-[#7A2535] focus:ring-[#7A2535]"
                      />
                      <div>
                        <div className="font-medium text-[#0C1B2E]">{type.label}</div>
                        <div className="text-sm text-[#6B6458]">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-[#6B6458]">
                <strong className="text-[#0C1B2E]">Privacy Notice:</strong> Your information will only be used to communicate certification updates and early access opportunities. We never share your data with third parties. See our privacy policy for details.
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7A2535] hover:bg-[#7A2535] text-aic-paper py-4 text-base font-medium disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Join Waiting List'} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
            {submitError && (
              <p className="text-red-500 text-sm mt-2 text-center">{submitError}</p>
            )}
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-br from-[#0C1B2E] to-[#1a3160]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-[#7A2535] mx-auto mb-6" />
            <h2 className="text-3xl text-aic-paper mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Join Thousands of AI Leaders
            </h2>
            <p className="text-aic-paper/70 text-lg leading-relaxed">
              Professionals from Fortune 500 companies, government agencies, and leading research institutions are already on the waiting list. Position yourself at the forefront of AI governance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
