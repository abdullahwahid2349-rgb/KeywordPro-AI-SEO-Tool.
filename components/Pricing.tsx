import React from 'react';
import { Check, Zap, Star, Shield, Rocket, ChevronRight } from 'lucide-react';

interface PricingProps {
  onOpenAuth: () => void;
  onOpenContact: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenAuth, onOpenContact }) => {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for testing the waters.",
      features: ["Basic keyword search", "Scientific KD Analysis", "Trend Visualization", "Limited daily reports"],
      cta: "Get Started Free",
      highlighted: false,
      icon: <Zap className="w-6 h-6 text-gray-400" />,
      action: onOpenAuth
    },
    {
      name: "Pro",
      price: "$29",
      description: "For high-performance growth teams.",
      features: ["1,000+ searches / day", "Competitor Analysis", "Neural Intent Engine", "Priority API Access", "Scientific KD Engine"],
      cta: "Unlock Pro Power",
      highlighted: true,
      badge: "Most Popular",
      icon: <Star className="w-6 h-6 text-blue-500 fill-current" />,
      action: onOpenAuth
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "Full-scale SEO infrastructure.",
      features: ["Unlimited API access", "24/7 Priority Support", "Dedicated Infrastructure", "White-label Reporting", "Custom Data Nodes"],
      cta: "Go Enterprise",
      highlighted: false,
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      action: onOpenContact
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-blue-100 dark:border-blue-500/20">
          <Rocket className="w-3.5 h-3.5" /> Pricing Plans
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
          Simple. <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Transparent.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          Professional-grade research tools without the enterprise markup. Choose the plan that fits your growth stage.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 px-6">
        {tiers.map((tier, idx) => (
          <div 
            key={idx} 
            className={`relative p-10 rounded-[3.5rem] border transition-all duration-700 hover:scale-[1.03] hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-12 group ${
              tier.highlighted 
                ? 'bg-gray-900 dark:bg-white/[0.05] text-white border-blue-500/50 shadow-2xl shadow-blue-500/20' 
                : 'bg-white dark:bg-white/[0.02] border-gray-100 dark:border-white/5 shadow-xl'
            }`}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {tier.badge && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg animate-pulse border border-blue-400/50">
                {tier.badge}
              </div>
            )}
            
            <div className="mb-10">
              <div className={`p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 duration-500 ${tier.highlighted ? 'bg-white/10' : 'bg-gray-50 dark:bg-white/5'}`}>
                {tier.icon}
              </div>
              <h3 className={`text-3xl font-black ${tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{tier.name}</h3>
              <p className={`mt-2 text-sm font-medium ${tier.highlighted ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {tier.description}
              </p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className={`text-6xl font-black tracking-tighter ${tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{tier.price}</span>
                <span className={`text-sm font-bold uppercase tracking-widest ${tier.highlighted ? 'text-gray-500' : 'text-gray-400'}`}>/mo</span>
              </div>
            </div>

            <ul className="space-y-5 mb-12">
              {tier.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-center gap-4 font-bold text-sm tracking-wide">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${tier.highlighted ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
                    <Check className={`w-3 h-3 ${tier.highlighted ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <span className={tier.highlighted ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={tier.action}
              className={`w-full py-5 rounded-2xl font-black transition-all hover:scale-[1.05] active:scale-[0.95] uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 ${
                tier.highlighted 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20' 
                  : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200 shadow-lg'
              }`}
            >
              {tier.cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <section className="text-center space-y-8 animate-in fade-in duration-1000 delay-500">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Trusted by High-Performance Teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
          <div className="font-black text-xl tracking-tighter">GROWTH.CO</div>
          <div className="font-black text-xl tracking-tighter">SEO.LABS</div>
          <div className="font-black text-xl tracking-tighter">DATA.FLOW</div>
          <div className="font-black text-xl tracking-tighter">HYPER.SCALE</div>
        </div>
      </section>
    </div>
  );
};
