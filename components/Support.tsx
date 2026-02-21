
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, BookOpen, Mail, Phone, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface SupportProps {
  onOpenContact: () => void;
}

export const Support: React.FC<SupportProps> = ({ onOpenContact }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const faqs = [
    {
      q: "What defines the Scientific Difficulty Score?",
      a: "Our Gemini-powered KD (Keyword Difficulty) score is calculated using a multi-factor neural analysis of top SERP entities, domain age, backlink velocity, and content semantic depth. It is significantly more accurate than basic keyword density models."
    },
    {
      q: "How fresh is the search trend data?",
      a: "Trends are updated via live edge signals every 24 hours. Our global POPS (Points of Presence) aggregate search velocity data to ensure you see real-time shifts in consumer interest before they appear in traditional tools."
    },
    {
      q: "Can I use the data for commercial client reports?",
      a: "Absolutely. Pro and Enterprise tiers include rights for commercial redistribution. We provide clean, audit-ready CSV exports specifically designed for high-end stakeholder presentations."
    },
    {
      q: "What is your commitment to data privacy?",
      a: "KeywordPro is built on a stateless zero-persistence architecture. We do not maintain databases of user queries. Once you close your browser tab, your search history is permanently wiped from our server's temporary RAM."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-24 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="text-center space-y-6">
        <div className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto border border-blue-100 dark:border-blue-500/20 mb-4">
          Priority Support Gateway
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">How can we <span className="text-blue-600 dark:text-blue-400">help today?</span></h2>
        <p className="text-gray-500 dark:text-gray-400 text-xl font-medium max-w-2xl mx-auto">Instant technical answers and dedicated success engineering for your team.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <MessageSquare className="w-6 h-6"/>, title: "Technical Chat", text: "Direct line to our data engineers.", color: "blue" },
          { icon: <BookOpen className="w-6 h-6"/>, title: "API Docs", text: "Integrate intelligence into your apps.", color: "purple" },
          { icon: <Zap className="w-6 h-6"/>, title: "Niche Strategy", text: "Enterprise-only consulting sessions.", color: "amber" }
        ].map((item, i) => (
          <button key={i} className="p-10 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[3rem] shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-all group text-left space-y-6">
            <div className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-500/10 text-${item.color}-600 dark:text-${item.color}-400 rounded-2xl w-fit group-hover:bg-${item.color}-600 group-hover:text-white transition-colors`}>
              {item.icon}
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black dark:text-white">{item.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{item.text}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div className="space-y-2">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                Common Questions
              </h3>
              <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-[10px]">Real-time Updates</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-7 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-lg">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 dark:bg-black rounded-[3.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Mail className="w-48 h-48" />
            </div>
            
            {!submitted ? (
                <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black">Open a Ticket</h3>
                      <p className="text-gray-400 font-medium">Average response time for Pro users: <span className="text-blue-400">12 minutes</span>.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <input required type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-sm" />
                          <input required type="email" placeholder="Email" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-sm" />
                        </div>
                        <textarea required rows={4} placeholder="Your message..." className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-sm resize-none"></textarea>
                        <button type="submit" disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[11px]">
                          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Dispatch Request</>}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center py-12 space-y-8 animate-in fade-in zoom-in-95 duration-500 relative z-10">
                    <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black">Request Synced</h3>
                        <p className="text-gray-400 font-medium">Our engineers have received your inquiry. Monitoring systems are active.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="text-blue-400 font-black text-xs uppercase tracking-widest hover:underline">
                      Send New Inquiry
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
