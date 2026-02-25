import Navbar from '../components/Navbar';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Legal & Compliance',
      questions: [
        { q: 'Does AIC Certification guarantee immunity from POPIA Section 71 lawsuits?', a: 'No certification grants immunity. However, AIC Certification provides a defensible legal argument of "Reasonable Care" and "Effective Human Oversight," which is the standard used in liability defense.' },
        { q: 'Is this recognized by the Information Regulator?', a: 'We align strictly with the "Human-in-the-Loop" requirements of the Act. We are currently in the process of lobbying for official recognition as an Industry Code of Conduct.' },
        { q: 'What happens if we fail an audit?', a: 'You receive a confidential "Remediation Report." You have 90 days to fix the identified bias or oversight gaps before a re-audit is required.' }
      ]
    },
    {
      category: 'Technical Integration',
      questions: [
        { q: 'Does AIC need access to our source code?', a: 'No. We audit the *outcomes* and the *processes*. We use "Black Box" testing methods (Disparate Impact Analysis) and interview your oversight team. Your IP remains secure.' },
        { q: 'How do we integrate with the "Kill Switch" API?', a: 'We provide a secure REST API key. Your risk management system polls our endpoint daily. If your Integrity Score drops below 50, the API signals a "STOP" status.' }
      ]
    },
    {
      category: 'The Bounty Program',
      questions: [
        { q: 'Are we inviting hackers to attack us?', a: 'You are inviting "White Hat" researchers to find bias before a plaintiff does. It is controlled, legally protected, and capped. Better to pay a $5k bounty than a $5M settlement.' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-aic-black sm:text-5xl font-serif mb-12">
            Frequently Asked Questions
          </h1>
          
          <div className="space-y-16">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold text-aic-red font-serif mb-6 border-b border-aic-black/10 pb-2">{section.category}</h2>
                <dl className="space-y-8">
                  {section.questions.map((faq) => (
                    <div key={faq.q} className="glass p-6 rounded-lg">
                      <dt className="text-lg font-semibold leading-7 text-aic-black font-serif">{faq.q}</dt>
                      <dd className="mt-2 text-base leading-7 text-gray-700 font-serif">{faq.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
