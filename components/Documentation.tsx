
import React, { useState } from 'react';
import { Search, Copy, Check, BookOpen, Code, Terminal, HelpCircle, ChevronRight, Rocket, Shield, Zap, Cpu } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections: DocSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              KeywordPro is a high-fidelity SEO intelligence platform. We provide data-driven insights to help growth teams dominate search results with scientific precision.
            </p>
          </div>
          
          <div className="grid gap-6">
            <div className="p-8 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[2.5rem] space-y-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-black text-xl dark:text-white">Our Mission</h4>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                To democratize enterprise-grade SEO data, making high-throughput analysis accessible to every ambitious marketing team.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'api-keys',
      title: 'API Keys',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">API Keys</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              Your API key is your gateway to our neural intelligence engine. Keep it secure and never share it in client-side code.
            </p>
          </div>
          
          <div className="bg-gray-900 dark:bg-black rounded-[2.5rem] p-10 border border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-emerald-500" />
              <h4 className="text-xl font-black text-white uppercase tracking-tighter">Security Best Practices</h4>
            </div>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Store keys in environment variables.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Rotate keys every 90 days for maximum security.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Use restricted IP access for production keys.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'usage-guide',
      title: 'Usage Guide',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Usage Guide</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              Master the KeywordPro interface to unlock deep competitive insights.
            </p>
          </div>
          
          <div className="grid gap-6">
            {[
              { title: "Keyword Analysis", desc: "Enter any seed keyword to get difficulty, volume, and trend data.", icon: <Search className="w-5 h-5" /> },
              { title: "Competitor Mapping", desc: "Analyze competitor domains to uncover their top-performing keywords.", icon: <Zap className="w-5 h-5" /> },
              { title: "Data Export", desc: "Download your research in CSV or JSON format for external reporting.", icon: <BookOpen className="w-5 h-5" /> }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-3xl">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-8">
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
        <main className="flex-1 max-w-3xl animate-in fade-in slide-in-from-right-8 duration-700">
          {sections.find(s => s.id === activeSection)?.content}
        </main>
      </div>
    </div>
  );
};

