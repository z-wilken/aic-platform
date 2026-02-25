'use client';

import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { InstitutionalFooter } from '@aic/ui';

export default function PricingPage() {
    const tiers = [
        {
            name: 'Standard',
            tier: 'TIER 3',
            price: 'R 5,000',
            description: 'For organizations with low-stakes automated systems requiring periodic monitoring.',
            features: [
                'Automated Bias Audits',
                'Monthly Compliance Snapshots',
                'POPIA Section 71 Base Documentation',
                '1 Registered AI System',
                'Standard Email Support'
            ],
            cta: 'Start Assessment',
            href: '/assessment',
            highlight: false
        },
        {
            name: 'Elevated',
            tier: 'TIER 2',
            price: 'R 15,000',
            description: 'For systems with human supervision and potential high-stakes impact on individuals.',
            features: [
                'Everything in Standard',
                'Intersectional Bias Analysis',
                'Real-time Drift Alerting',
                'Incident Management Portal',
                '5 Registered AI Systems',
                'Priority Verification Response'
            ],
            cta: 'Join Alpha',
            href: '/alpha',
            highlight: true
        },
        {
            name: 'Critical',
            tier: 'TIER 1',
            price: 'R 50,000',
            description: 'For high-risk systems requiring mandatory human approval and board-level oversight.',
            features: [
                'Everything in Elevated',
                'Unlimited System Registries',
                'Quarterly Lead Auditor Review',
                'Custom Regulatory Mapping',
                'On-Premise Deployment Support',
                '24/7 Priority Concierge'
            ],
            cta: 'Contact Sales',
            href: '/contact',
            highlight: false
        }
    ];

    return (
        <main className="min-h-screen bg-aic-paper">
            <Navbar />
            
            <section className="py-24 border-b border-aic-black/5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-4 block">Institutional Investment</span>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-aic-black tracking-tighter mb-8">Accountability as a Standard.</h1>
                        <p className="text-xl text-gray-500 font-serif italic max-w-2xl mx-auto leading-relaxed">
                            Phased pricing designed to scale with your institutional risk profile and algorithmic complexity.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {tiers.map((tier, i) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`flex flex-col p-12 rounded-[3rem] border transition-all duration-500 ${
                                    tier.highlight 
                                    ? 'bg-aic-black text-white border-aic-gold shadow-2xl scale-105 z-10' 
                                    : 'bg-white text-aic-black border-aic-black/5 hover:shadow-xl'
                                }`}
                            >
                                <div className="mb-8">
                                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${tier.highlight ? 'text-aic-gold' : 'text-gray-400'}`}>
                                        {tier.tier}
                                    </span>
                                    <h3 className="text-3xl font-serif font-bold mt-2">{tier.name}</h3>
                                </div>

                                <div className="mb-10">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-serif font-bold tracking-tighter">{tier.price}</span>
                                        <span className={`text-xs font-mono uppercase tracking-widest ${tier.highlight ? 'text-gray-500' : 'text-gray-400'}`}>/ month</span>
                                    </div>
                                    <p className={`mt-4 text-sm font-serif italic leading-relaxed ${tier.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="space-y-5 mb-12 flex-1">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <svg className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? 'text-aic-gold' : 'text-aic-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className={`text-sm font-serif ${tier.highlight ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link 
                                    href={tier.href}
                                    className={`w-full py-4 rounded-xl text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                                        tier.highlight 
                                        ? 'bg-aic-gold text-aic-black hover:bg-white' 
                                        : 'bg-aic-black text-white hover:bg-aic-gold hover:text-aic-black'
                                    }`}
                                >
                                    {tier.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white border-y border-aic-black/5">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-3xl font-bold mb-8 italic">"We certify that humans remain accountable."</h2>
                    <p className="font-serif text-lg text-gray-500 leading-relaxed mb-12">
                        Institutional trust isn't a feature—it's a requirement. Join the Alpha Pilot Program to help shape the future of algorithmic accountability in South Africa.
                    </p>
                    <div className="flex flex-wrap justify-center gap-12">
                        <div className="text-center">
                            <p className="text-4xl font-serif font-bold text-aic-black mb-2">5</p>
                            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Algorithmic Rights</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-serif font-bold text-aic-black mb-2">ZA</p>
                            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Sovereign Data</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-serif font-bold text-aic-black mb-2">71</p>
                            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">POPIA Section</p>
                        </div>
                    </div>
                </div>
            </section>

            <InstitutionalFooter />
        </main>
    );
}
