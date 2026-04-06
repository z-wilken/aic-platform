import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClassificationForm from "./ClassificationForm";

export default function ClassifyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <h1 className="text-aic-navy text-5xl md:text-6xl font-heading font-bold leading-tight">
                Find Your Division
              </h1>
              <p className="text-aic-navy/70 text-xl font-sans leading-relaxed">
                Answer 5 questions. We&apos;ll tell you which AIC Division you fall into and what certification looks like for your organisation.
              </p>
              
              <div className="space-y-6 pt-8">
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-aic-copper shrink-0 mt-2" />
                  <p className="text-sm font-sans text-aic-navy/60">Determine your regulatory exposure under POPIA Section 71.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-aic-copper shrink-0 mt-2" />
                  <p className="text-sm font-sans text-aic-navy/60">Identify the specific audit requirements for your AI autonomy level.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-aic-copper shrink-0 mt-2" />
                  <p className="text-sm font-sans text-aic-navy/60">Get a preliminary pricing range for your certification pathway.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ClassificationForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
