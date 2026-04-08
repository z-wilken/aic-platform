'use client';

import { useState } from "react";
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

export default function ContactPage() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            organization: formData.organization,
            role: formData.role,
            country: formData.country,
            certificationType: formData.certificationType,
            source: "contact-waiting-list",
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1f3d] via-[#1a3160] to-[#0a1628] flex items-center justify-center px-4">
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
            <h2 className="text-3xl font-bold text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              You're on the List!
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Thank you for joining the AIC waiting list, <strong>{formData.firstName}</strong>. We've received your application.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#0f1f3d] mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
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
                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Submit Another
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#c9920a] hover:bg-[#b07d08] text-white"
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0f1f3d]/90 to-[#1a3160]/85" />
        
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
              <Shield className="w-5 h-5 text-[#c9920a]" />
              <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">
                Join the Waiting List
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Be First in Line for AIC Certification
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Registration opens soon. Join our waiting list to receive priority access, exclusive discounts, and early learning resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0f1f3d] border-b border-white/10">
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
                <div className="text-white text-3xl font-bold">{stat.value}</div>
                <div className="text-white/50 text-sm mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Why Join the Waiting List?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
                    <div className="w-12 h-12 bg-[#0f1f3d]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#0f1f3d]" />
                    </div>
                    <h3 className="font-semibold text-[#0f1f3d] mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Reserve Your Spot
            </h2>
            <p className="text-gray-600">
              Complete the form below to join the waiting list. All fields are required.
            </p>
          </motion.div>

          <Card className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                  placeholder="john.doe@company.com"
                />
              </div>

              {/* Organization & Role */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    Job Title / Role
                  </label>
                  <input
                    id="role"
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                    placeholder="Chief Risk Officer"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9920a]/20 focus:border-[#c9920a]"
                  placeholder="United States"
                />
              </div>

              {/* Certification Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Award className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  I'm Interested In
                </label>
                <div className="space-y-3">
                  {certificationTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="certificationType"
                        value={type.value}
                        checked={formData.certificationType === type.value}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 text-[#c9920a] focus:ring-[#c9920a]"
                      />
                      <div>
                        <div className="font-medium text-[#0f1f3d]">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-gray-600">
                <strong className="text-[#0f1f3d]">Privacy Notice:</strong> Your information will only be used to communicate certification updates and early access opportunities. We never share your data with third parties. See our privacy policy for details.
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c9920a] hover:bg-[#b07d08] text-white py-4 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Join Waiting List"}
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-br from-[#0f1f3d] to-[#1a3160]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-[#c9920a] mx-auto mb-6" />
            <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Join Thousands of AI Leaders
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Professionals from Fortune 500 companies, government agencies, and leading research institutions are already on the waiting list. Position yourself at the forefront of AI governance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
