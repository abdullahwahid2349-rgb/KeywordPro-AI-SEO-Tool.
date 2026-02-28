import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, Cpu, Zap, Shield } from 'lucide-react';

export const Api: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `// KeywordPro API v1.0
const response = await fetch('https://api.keywordpro.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_PREMIUM_KEY'
  },
  body: JSON.stringify({
    keyword: 'scientific seo',
    region: 'us-east'
  })
});

const data = await response.json();
console.log(data.difficulty); // Output: 42`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-24 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 reveal-on-scroll animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-blue-100 dark:border-blue-500/20">
          <Code className="w-3.5 h-3.5" /> Developer Hub
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
          Build with <br/> 
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Scientific Precision.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          Integrate our neural keyword intelligence directly into your own applications with our high-throughput API.
        </p>
      </section>

      {/* Code Snippet Section */}
      <section className="px-6 reveal-on-scroll animate-slide-up">
        <div className="bg-gray-900 dark:bg-black rounded-[3.5rem] p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Terminal className="w-64 h-64 text-blue-500" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-4 text-xs font-black text-gray-500 uppercase tracking-widest">JavaScript Example</span>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-xs font-black text-white uppercase tracking-widest border border-white/5"
              >
                {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
              </button>
            </div>
            
            <pre className="font-mono text-sm md:text-base text-blue-300 overflow-x-auto leading-relaxed">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* API Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 px-6">
        {[
          {
            title: "Ultra-Low Latency",
            desc: "Average response time under 150ms globally via our distributed edge network.",
            icon: <Zap className="w-8 h-8 text-amber-500" />
          },
          {
            title: "Neural Accuracy",
            desc: "Access the same Gemini-powered difficulty metrics used in our main dashboard.",
            icon: <Cpu className="w-8 h-8 text-blue-500" />
          },
          {
            title: "Enterprise Security",
            desc: "Stateless processing and AES-256 encryption for all data transmissions.",
            icon: <Shield className="w-8 h-8 text-emerald-500" />
          }
        ].map((item, i) => (
          <div key={i} className={`bg-white dark:bg-white/[0.02] p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-xl hover:scale-[1.05] transition-all duration-500 reveal-on-scroll animate-slide-up delay-${(i + 1) * 100}`}>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl w-fit">
              {item.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
