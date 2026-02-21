
import React from 'react';
import { Globe, Cpu, Layers, Zap } from 'lucide-react';

export const BuiltWith: React.FC = () => {
  return (
    <section className="relative py-40 px-6 overflow-hidden bg-[#050505]">
      {/* High-End Enterprise Background Architecture */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Glowing World Map Background */}
        <div className="absolute inset-0 opacity-[0.08] flex items-center justify-center pointer-events-none scale-110 lg:scale-100">
          <svg viewBox="0 0 1000 500" className="w-full h-full text-blue-500 fill-current">
            <path d="M150,150 Q200,100 250,150 T350,150 M450,200 Q500,150 550,200 T650,200 M750,250 Q800,200 850,250 T950,250" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-pulse" />
            <circle cx="200" cy="120" r="1.5" className="animate-ping" />
            <circle cx="450" cy="230" r="1.5" className="animate-ping" style={{ animationDelay: '1s' }} />
            <circle cx="700" cy="180" r="1.5" className="animate-ping" style={{ animationDelay: '2s' }} />
            <circle cx="850" cy="350" r="1.5" className="animate-ping" style={{ animationDelay: '1.5s' }} />
            {/* Abstract World Dots Representing Nodes */}
            {Array.from({ length: 40 }).map((_, i) => (
              <circle 
                key={i} 
                cx={Math.random() * 1000} 
                cy={Math.random() * 500} 
                r="0.8" 
                className="opacity-40" 
              />
            ))}
          </svg>
        </div>
        
        {/* Deep Field Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px]"></div>
        
        {/* Animated Grid Floor Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-[#050505] bg-blue-500/20" />)}
            </div>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Engineered for Global Scale</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            High-Performance <br/> <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">Infrastructure</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
            KeywordPro is built on a proprietary stack that marries semantic AI with 
            distributed edge computing, ensuring enterprise-grade speed and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[2000px]">
          {[
            {
              title: "Next.js Architecture",
              description: "Sub-200ms TTFB across our globally distributed static and server-rendered edge network.",
              icon: <Layers className="w-8 h-8" />,
              delay: "0s",
              gradient: "from-blue-500 to-indigo-500"
            },
            {
              title: "Python-Powered Engine",
              description: "Massively parallel backend leveraging advanced FastAPI protocols for deep semantic analysis.",
              icon: <Cpu className="w-8 h-8" />,
              delay: "0.15s",
              gradient: "from-indigo-500 to-purple-500"
            },
            {
              title: "Tailwind UI Core",
              description: "Precision-engineered design system providing hardware-accelerated interfaces for data workflows.",
              icon: <Zap className="w-8 h-8" />,
              delay: "0.3s",
              gradient: "from-cyan-500 to-blue-500"
            },
            {
              title: "Global Edge Network",
              description: "Processing metrics across 200+ points of presence for consistent latency and high uptime.",
              icon: <Globe className="w-8 h-8" />,
              delay: "0.45s",
              gradient: "from-blue-600 to-indigo-600"
            }
          ].map((tech, idx) => (
            <div 
              key={idx}
              style={{ animationDelay: tech.delay }}
              className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/5 p-10 rounded-[3.5rem] transition-all duration-700 hover:scale-[1.02] hover:bg-white/[0.06] flex flex-col items-center text-center cursor-default animate-float-slow hover-tilt"
            >
              {/* Border-Beam Animation (Light ray traveling around border) */}
              <div className="absolute inset-[-1px] rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 rounded-[3.5rem] border border-blue-500/50 [mask-image:conic-gradient(from_var(--beam-angle),transparent_70%,#fff_100%)] animate-border-beam"></div>
              </div>

              {/* Icon Container with Glow */}
              <div className="mb-10 relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-20 h-20 bg-black/60 border border-white/10 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:border-blue-500/40 group-hover:scale-110 group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.3)]">
                  <div className="text-gray-500 group-hover:text-blue-400 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                    {tech.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-blue-50 transition-colors">
                {tech.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors tracking-wide max-w-[200px]">
                {tech.description}
              </p>

              {/* Status Indicator */}
              <div className="mt-10 pt-8 border-t border-white/5 w-full flex items-center justify-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-400">Node Synchronized</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @property --beam-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-beam {
          0% { --beam-angle: 0deg; }
          100% { --beam-angle: 360deg; }
        }

        .animate-border-beam {
          animation: border-beam 4s linear infinite;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
          50% { transform: translateY(-15px) rotateX(1deg) rotateY(1deg); }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .hover-tilt {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .hover-tilt:hover {
          transform: translateY(-20px) rotateX(4deg) rotateY(4deg);
          z-index: 20;
        }
        
        .perspective-2000 {
          perspective: 2000px;
        }
      `}} />
    </section>
  );
};
