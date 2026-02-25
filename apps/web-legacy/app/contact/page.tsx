import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AIC | Contact - Connect with our Lead Auditors",
  description: "Get in touch with AIC for general inquiries, partnership proposals, or regulatory compliance support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-aic-bg text-aic-black font-serif">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-aic-gold font-mono uppercase tracking-widest">Connect</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-aic-black sm:text-4xl font-serif">
              The Path to Accountability Begins Here
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              Whether you are a regulator, an insurer, or an organization looking to lead in AI accountability, our team is ready to assist.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <ContactForm />

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="glass-card p-6 border border-gray-100 rounded-xl">
                    <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Office</h4>
                    <p className="font-serif text-gray-600 text-sm leading-relaxed">
                        Rosebank Link, 173 Oxford Rd<br/>
                        Rosebank, Johannesburg<br/>
                        2196, South Africa
                    </p>
                </div>
                <div className="glass-card p-6 border border-gray-100 rounded-xl">
                    <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Direct</h4>
                    <p className="font-serif text-gray-600 text-sm leading-relaxed">
                        hello@aicert.co.za<br/>
                        +27 (0) 11 447 1234
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}