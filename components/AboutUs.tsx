import React from 'react';
import { Target, Users, Globe, Shield, Zap, Award, Cpu, Layers, Rocket, ChevronRight, Linkedin, Twitter } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-32 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 reveal-on-scroll animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-blue-100 dark:border-blue-500/20">
          <Rocket className="w-3.5 h-3.5" /> Our Mission
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
          Redefining <br/> 
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">SEO Intelligence.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          KeywordPro was born from a simple belief: that high-fidelity, data-driven growth should be accessible to every team, not just those with enterprise budgets.
        </p>
      </section>

      {/* The Vision Section */}
      <section className="grid md:grid-cols-2 gap-16 items-center px-6">
        <div className="space-y-8 reveal-on-scroll animate-slide-left">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">The Vision for Scale</h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
            We didn't just build a keyword tool; we engineered a high-throughput data pipeline. By combining a <strong>Python-powered engine</strong> with a <strong>distributed edge architecture</strong>, we've eliminated the latency usually associated with deep SEO analysis.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[2.5rem] space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-black text-lg dark:text-white tracking-tight">Neural Processing</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                Our proprietary LLM-driven engine achieves 99.4% accuracy in intent classification. By analyzing semantic clusters rather than just strings, we uncover the "why" behind every search.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[2.5rem] space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                <Layers className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-black text-lg dark:text-white tracking-tight">Global Edge</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                Leveraging a distributed network of 200+ edge nodes, we process real-time SERP data with sub-100ms latency, ensuring your research is powered by the most current global signals.
              </p>
            </div>
          </div>
        </div>
        <div className="relative group reveal-on-scroll animate-slide-up delay-300">
           <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
           <div className="relative bg-gray-900 dark:bg-black p-2 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="bg-[#121212] rounded-[2.8rem] overflow-hidden p-8 aspect-square flex flex-col justify-center">
                 <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group/node">
                        <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover/node:opacity-100 transition-opacity duration-500"></div>
                        <Globe className="w-8 h-8 text-blue-500/50 group-hover/node:text-blue-400 transition-colors duration-500" />
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" style={{ animationDelay: `${i * 0.2}s` }}></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Global Presence Map */}
      <section className="relative py-32 px-6 bg-gray-900 dark:bg-black rounded-[4rem] border border-white/5 overflow-hidden reveal-on-scroll animate-fade-in">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[9px] font-black tracking-[0.3em] uppercase border border-blue-500/20">
              Live Infrastructure
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Global Intelligence Network</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">Our distributed architecture spans 6 continents, providing hyper-local SEO insights with enterprise-grade reliability.</p>
          </div>
          
          <div className="relative aspect-[2/1] w-full">
            {/* Stylized World Map SVG */}
            <svg viewBox="0 0 1000 500" className="w-full h-full text-blue-500/20 fill-current">
              <path d="M250,150 L260,140 L280,145 L300,130 L320,135 L340,120 L360,125 L380,110 L400,115 L420,100 L440,105 L460,90 L480,95 L500,80 L520,85 L540,70 L560,75 L580,60 L600,65 L620,50 L640,55 L660,40 L680,45 L700,30 L720,35 L740,20 L750,25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
              {/* Map Nodes */}
              {[
                { x: 200, y: 150, label: "San Francisco" },
                { x: 480, y: 180, label: "London" },
                { x: 520, y: 220, label: "Frankfurt" },
                { x: 750, y: 160, label: "Tokyo" },
                { x: 300, y: 350, label: "Sao Paulo" },
                { x: 820, y: 380, label: "Sydney" },
                { x: 650, y: 320, label: "Singapore" },
                { x: 550, y: 120, label: "Stockholm" }
              ].map((node, i) => (
                <g key={i} className="group/node">
                  <circle cx={node.x} cy={node.y} r="4" className="fill-blue-500 animate-pulse" />
                  <circle cx={node.x} cy={node.y} r="12" className="stroke-blue-500/30 fill-none animate-ping" style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} />
                  <text x={node.x} y={node.y + 20} textAnchor="middle" className="text-[10px] font-black fill-gray-500 uppercase tracking-widest opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">{node.label}</text>
                </g>
              ))}
              {/* Connection Lines */}
              <path d="M200,150 Q340,165 480,180 T750,160" fill="none" stroke="url(#grad1)" strokeWidth="1" className="opacity-30" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                  <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
              {[
                { label: "Nodes", value: "200+" },
                { label: "Uptime", value: "99.99%" },
                { label: "Latency", value: "<100ms" },
                { label: "Regions", value: "24" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="px-6 space-y-16 reveal-on-scroll animate-slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Built on Principles</h2>
          <p className="text-gray-500 font-medium">The values that drive our engineering and culture.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              desc: "We don't just follow SEO trends—we build the models that predict them. Constantly evolving our scientific formulas.",
              icon: <Award className="w-10 h-10 text-blue-500" />,
              color: "blue"
            },
            {
              title: "Transparency",
              desc: "Zero black-box metrics. Every difficulty score and volume estimate comes with clear, verifiable data lineage.",
              icon: <Shield className="w-10 h-10 text-emerald-500" />,
              color: "emerald"
            },
            {
              title: "Scale",
              desc: "Engineered for high-throughput velocity. Our distributed architecture provides enterprise-grade results in milliseconds.",
              icon: <Zap className="w-10 h-10 text-amber-500" />,
              color: "amber"
            }
          ].map((v, i) => (
            <div key={i} className={`group p-12 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[3.5rem] shadow-xl hover:scale-[1.05] hover:bg-white/[0.06] transition-all duration-500 reveal-on-scroll animate-slide-up delay-${(i + 1) * 100}`}>
              <div className="mb-8 p-5 bg-gray-50 dark:bg-white/5 rounded-3xl w-fit group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">{v.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Founders Section */}
      <section className="px-6 space-y-16 reveal-on-scroll animate-slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">The Minds Behind Pro</h2>
          <p className="text-gray-500 font-medium">A diverse collective of data scientists and SEO veterans.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: "Alex Chen", role: "Co-Founder & CTO", bio: "Former Infrastructure Lead at HyperScale. Neural architecture expert.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
            { name: "Elena Rossi", role: "Co-Founder & CEO", bio: "15+ years in strategic growth and digital asset management.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
            { name: "Marcus Thorne", role: "Head of Product", bio: "Specializes in high-fidelity data visualization and UX design.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" }
          ].map((member, i) => (
            <div key={i} className={`group text-center space-y-6 bg-white dark:bg-white/[0.02] p-10 rounded-[3.5rem] border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl reveal-on-scroll animate-slide-up delay-${(i + 1) * 100}`}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                <img src={member.avatar} alt={member.name} className="relative w-32 h-32 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 mx-auto border-4 border-white dark:border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-gray-900 dark:text-white">{member.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">{member.role}</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed px-4">{member.bio}</p>
              <div className="flex justify-center gap-4 pt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 reveal-on-scroll animate-scale-up">
        <div className="bg-gray-900 dark:bg-black rounded-[4rem] p-16 md:p-24 text-center space-y-10 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
            <Rocket className="w-96 h-96 text-blue-500" />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Join the Journey</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
              Start building your high-performance growth strategy with KeywordPro today.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-8 px-12 py-5 bg-white text-black hover:bg-blue-50 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              Get Started Free <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};