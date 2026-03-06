
import React, { useState } from 'react';
import { Search, Copy, Check, BookOpen, Code, Terminal, HelpCircle, ChevronRight, Rocket, Shield, Zap, Cpu } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('gs-intro');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections: DocSection[] = [
    {
      id: 'gs-intro',
      title: 'Introduction',
      content: (
        <div className="space-y-8">
          <div className="pg-header" id="gs-intro">
            <span className="pg-tag">Documentation</span>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight font-syne">Keyword Pro Docs</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">AI-powered SEO for South Asian teams. Zero bloat. Clean endpoints. Up and running in 5 minutes.</p>
          </div>

          <div className="trust-bar flex flex-wrap gap-3 mb-8">
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> 99.9% Uptime SLA</div>
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> 60-Day Onboarding Support</div>
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> &lt;100ms API Response</div>
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> GDPR Compliant</div>
          </div>
        </div>
      )
    },
    {
      id: 'gs-setup',
      title: '5-Minute Setup',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight font-syne">⚙️ 5-Minute Setup</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              No complex configurations. No DevOps. Connect your site and start tracking keywords in under 5 minutes.
            </p>
          </div>
          
          <div className="steps space-y-6">
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">1</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Create your account</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Sign up at <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">app.keywordpro.ai</a>. No credit card required for the free tier.</p>
              </div>
            </div>
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">2</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Add your domain</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Enter your website URL. Keyword Pro crawls and indexes your pages automatically in the background.</p>
              </div>
            </div>
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">3</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Connect Google Search Console (optional)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">OAuth one-click integration. Unlocks real impression and click data for your tracked keywords.</p>
              </div>
            </div>
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">4</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Generate your API key</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Go to Settings → API → Generate Key. Use it to automate reports and integrate with your stack.</p>
              </div>
            </div>
          </div>

          <div className="callout c-tip flex gap-3 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl items-start">
            <span className="ico2 text-xl flex-shrink-0 mt-0.5">💡</span>
            <p className="text-sm text-emerald-800 dark:text-emerald-400 m-0"><strong>Pakistan/India teams:</strong> Choose <code className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs">region: ap-south-1</code> during setup for lowest latency. Server costs drop by ~60% vs US regions.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-8 reveal-on-scroll animate-slide-left">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Documentation</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between group ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {section.title}
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6 bg-blue-50 dark:bg-blue-500/10 rounded-[2rem] border border-blue-100 dark:border-blue-500/20">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="text-xs font-black text-blue-900 dark:text-blue-400 uppercase tracking-widest mb-2">Need Help?</h4>
            <p className="text-[10px] text-blue-700 dark:text-blue-300/70 font-medium leading-relaxed">
              Our support engineers are available 24/7 for Enterprise users.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl reveal-on-scroll animate-fade-in">
          {sections.find(s => s.id === activeSection)?.content}
        </main>
      </div>
    </div>
  );
};

