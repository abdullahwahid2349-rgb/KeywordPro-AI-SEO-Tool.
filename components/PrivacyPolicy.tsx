
import React from 'react';
import { ShieldCheck, Lock, EyeOff, Trash2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex items-center gap-6 mb-16 reveal-on-scroll animate-fade-in">
        <div className="bg-blue-600 dark:bg-blue-500 p-5 rounded-3xl shadow-xl shadow-blue-200 dark:shadow-none">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Privacy Guard</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Version 2.5 • Released Jan 2025</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {[
          { icon: <Lock className="text-blue-600 dark:text-blue-400"/>, title: "Zero Data Storage", text: "We explicitly avoid caching or storing your proprietary search queries or results." },
          { icon: <EyeOff className="text-purple-600 dark:text-purple-400"/>, title: "No Analytics Tracking", text: "We do not deploy third-party trackers, pixels, or behavioral analytics software." },
          { icon: <Trash2 className="text-rose-600 dark:text-rose-400"/>, title: "Session Ephemerality", text: "All intelligence data is purged immediately upon session termination or tab closure." },
          { icon: <ShieldCheck className="text-green-600 dark:text-green-400"/>, title: "AES-256 Encryption", text: "Full end-to-end encryption for all data packets moving between your client and our engine." },
        ].map((item, i) => (
          <div key={i} className={`bg-white dark:bg-white/[0.03] p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm flex items-start gap-8 transition-colors reveal-on-scroll animate-slide-up delay-${(i + 1) * 100}`}>
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">{item.icon}</div>
            <div className="space-y-2">
              <h4 className="font-black text-gray-900 dark:text-white text-lg">{item.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-medium space-y-12 reveal-on-scroll animate-slide-up">
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">1. Data Sovereignty</h3>
          <p className="leading-relaxed">KeywordPro operates as a stateless analyzer. We do not require account registration for basic usage, ensuring that your research identity remains decoupled from your search results.</p>
        </section>
        
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">2. Neural Engine Processing</h3>
          <p className="leading-relaxed">We utilize the Gemini-3 Flash platform for high-velocity inference. While keyword strings are transmitted for analysis, no persistent user identifiers are attached to these requests.</p>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">3. Security Compliance</h3>
          <p className="leading-relaxed">Our infrastructure is audited for high-ticket enterprise compliance. We maintain strict separation between inferential processing and user session states.</p>
        </section>
      </div>
    </div>
  );
};
