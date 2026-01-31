import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <p className="text-base font-semibold leading-7 text-aic-gold font-mono uppercase tracking-widest">Our Mission</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-aic-black sm:text-6xl font-serif">
                    The Trust Gap
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-600 font-serif">
                    AI adoption is stalling not because of technology, but because of liability. AIC bridges the gap between innovation and regulation.
                </p>
                
                <div className="mt-10 max-w-2xl">
                    <div className="glass-card p-8 rounded-2xl mb-12">
                        <p className="font-serif text-lg italic text-gray-700">
                            "Section 71 of POPIA creates a unique challenge: automated decisions have legal consequences. The question isn't 'does the AI work?', but 'who is responsible when it fails?'"
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-aic-black font-serif mt-16">Why AIC Exists</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
                        Most global standards (like ISO 42001) focus on organizational governance. While valuable, they don't solve the specific legal exposure created by South African law.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
                        AIC was built to be the "Accountability Layer." We don't just audit your code; we validate your <span className="font-bold text-aic-black">Human-in-the-Loop</span> processes. We certify that when a machine makes a decision, a human has verified the criteria.
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight text-aic-black font-serif mt-16">The 3-Tier Philosophy</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
                        We believe in proportional regulation. A chatbot recommending a playlist (Tier 3) should not face the same scrutiny as an algorithm denying a home loan (Tier 1).
                    </p>
                    <ul className="mt-8 space-y-8 font-serif text-gray-600">
                        <li className="flex gap-x-3">
                            <span className="mt-1 h-5 w-5 flex-none text-aic-red font-bold">01.</span>
                            <span><strong className="font-semibold text-aic-black">Critical Impact.</strong> For life-altering decisions, we require proof of explainability and active human review.</span>
                        </li>
                        <li className="flex gap-x-3">
                            <span className="mt-1 h-5 w-5 flex-none text-aic-orange font-bold">02.</span>
                            <span><strong className="font-semibold text-aic-black">Elevated Risk.</strong> For high-volume automated decisions, we mandate statistical bias auditing.</span>
                        </li>
                        <li className="flex gap-x-3">
                            <span className="mt-1 h-5 w-5 flex-none text-aic-green font-bold">03.</span>
                            <span><strong className="font-semibold text-aic-black">Standard Automation.</strong> For low-risk tasks, transparency is the only requirement.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
