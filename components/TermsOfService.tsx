
import React from 'react';
import { FileText, Scale, Gavel, AlertCircle } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex items-center gap-6 mb-16 reveal-on-scroll animate-fade-in">
        <div className="bg-gray-900 dark:bg-white p-5 rounded-3xl shadow-xl">
          <FileText className="w-8 h-8 text-white dark:text-black" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Terms of Utility</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Effective Standard • Q1 2025</p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-10 rounded-[3rem] flex items-start gap-8 mb-20 reveal-on-scroll animate-slide-up">
        <div className="bg-white dark:bg-black p-4 rounded-2xl shadow-sm"><AlertCircle className="text-amber-600 dark:text-amber-400 w-6 h-6"/></div>
        <div className="space-y-3">
          <h4 className="font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest text-[10px]">Commercial Disclosure</h4>
          <p className="text-amber-800 dark:text-amber-300 text-lg leading-relaxed font-bold italic">
            "SEO intelligence metrics are generated via neural estimation. Market conditions are dynamic and volatile. Data is provided as a strategic guide, not a financial guarantee."
          </p>
        </div>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-medium space-y-12 reveal-on-scroll animate-slide-up">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <Scale className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white m-0 tracking-tight">1. Protocol Acceptance</h3>
          </div>
          <p className="leading-relaxed text-lg">By utilizing the KeywordPro interface or API endpoints, you acknowledge full acceptance of these terms. Unauthorized automated high-frequency scraping is strictly prohibited.</p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <Gavel className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white m-0 tracking-tight">2. Commercial Use Rights</h3>
          </div>
          <p className="leading-relaxed text-lg">Pro-tier subscribers are granted a worldwide license to include KeywordPro analysis in commercial client reports and proprietary digital asset audits.</p>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">3. Algorithmic Integrity</h3>
          <p className="leading-relaxed text-lg">Our Difficulty and Trend formulas are the intellectual property of KeywordPro Labs. Reverse engineering of our semantic scoring models is a violation of these terms.</p>
        </section>
      </div>
    </div>
  );
};
