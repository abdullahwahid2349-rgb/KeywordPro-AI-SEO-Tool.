import React from 'react';
import { Globe, Zap, Shield, Cpu, BarChart3, Search, Target, Rocket, ChevronRight, Activity } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-32 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 reveal-on-scroll animate-fade-in">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-blue-100 dark:border-blue-500/20">
          <Zap className="w-3.5 h-3.5 fill-current" /> Advanced Capabilities
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
          Powerful Features for <br/> 
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Data-Driven Growth.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          Engineered for high-performance teams who demand scientific accuracy and real-time intelligence.
        </p>
        
        {/* Data Accuracy Badge */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl shadow-sm">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-black text-emerald-900 dark:text-emerald-400 uppercase tracking-widest">
              Processing millions of daily queries with 99.9% uptime
            </span>
          </div>
        </div>
      </section>

      {/* Competitor Analysis Module */}
      <section className="px-6 reveal-on-scroll animate-slide-up">
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
            <BarChart3 className="w-96 h-96 text-blue-500" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Competitor Intelligence</h2>
                <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                Uncover the exact keywords driving traffic to your competitors. Our neural engine maps their entire SEO strategy, identifying gaps and high-value opportunities they've missed.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time SERP position tracking",
                  "Backlink profile health analysis",
                  "Content gap identification",
                  "Estimated ad spend & CPC metrics"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900 dark:bg-black p-8 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Competitor Comparison</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Competitor A", share: 45, color: "bg-blue-600" },
                    { name: "Competitor B", share: 28, color: "bg-indigo-600" },
                    { name: "Competitor C", share: 12, color: "bg-purple-600" }
                  ].map((comp, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span>{comp.name}</span>
                        <span>{comp.share}% Market Share</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`${comp.color} h-full rounded-full animate-pulse`} style={{ width: `${comp.share}%`, animationDelay: `${i * 0.2}s` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Top Keyword</p>
                    <p className="text-sm font-black text-white">"SaaS Analytics"</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Growth Rate</p>
                    <p className="text-sm font-black text-emerald-400">+12.4%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="px-6 space-y-16 reveal-on-scroll animate-slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Global Edge Infrastructure</h2>
          <p className="text-gray-500 font-medium">Distributed compute across 200+ nodes for localized accuracy.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
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
          
          <div className="space-y-8">
            <div className="grid gap-6">
              {[
                {
                  title: "Localized SERP Data",
                  desc: "Fetch data from specific cities and regions to understand local search behavior.",
                  icon: <Target className="w-6 h-6 text-blue-500" />
                },
                {
                  title: "High-Throughput API",
                  desc: "Enterprise-grade endpoints capable of handling thousands of requests per second.",
                  icon: <Cpu className="w-6 h-6 text-indigo-500" />
                },
                {
                  title: "Zero-Latency Updates",
                  desc: "Real-time indexing ensures you're always working with the most current search signals.",
                  icon: <Zap className="w-6 h-6 text-amber-500" />
                }
              ].map((feature, i) => (
                <div key={i} className={`flex gap-6 p-6 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-3xl hover:scale-[1.02] transition-all reveal-on-scroll animate-slide-left delay-${(i + 1) * 100}`}>
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{feature.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 reveal-on-scroll animate-scale-up">
        <div className="bg-blue-600 rounded-[4rem] p-16 md:p-24 text-center space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
            <Rocket className="w-96 h-96 text-white" />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Ready to Scale?</h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto font-medium">
              Experience the full power of KeywordPro's feature suite with a premium key.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-8 px-12 py-5 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              Get Premium Access <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
