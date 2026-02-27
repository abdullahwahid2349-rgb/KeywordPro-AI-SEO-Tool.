import React, { useState, useEffect } from 'react';
import { KeywordTool } from './components/KeywordTool';
import { Documentation } from './components/Documentation';
import { BuiltWith } from './components/BuiltWith';
import { Pricing } from './components/Pricing';
import { AboutUs } from './components/AboutUs';
import { Features } from './components/Features';
import { Blog } from './components/Blog';
import { Api } from './components/Api';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Support } from './components/Support';
import { ContactModal } from './components/ContactModal';
import { AuthModal } from './components/AuthModal';
import { Zap, ShieldCheck, Star, Users, Briefcase, Linkedin, X, BookOpen, MessageCircle, Search, Mail, Activity, CheckCircle, Shield, Rocket, Cpu, Database, Globe, Sun, Moon, ChevronRight, Code } from 'lucide-react';

export type Tab = 'TOOL' | 'FEATURES' | 'BLOG' | 'API' | 'DOCS' | 'PRICING' | 'ABOUT' | 'PRIVACY' | 'TERMS' | 'SUPPORT';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('TOOL');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Handle Theme Change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Smooth scroll on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    const content = (() => {
      switch (activeTab) {
        case 'TOOL': return <KeywordTool />;
        case 'FEATURES': return <Features />;
        case 'BLOG': return <Blog />;
        case 'API': return <Api />;
        case 'DOCS': return <Documentation />;
        case 'PRICING': return <Pricing onOpenAuth={() => setIsAuthOpen(true)} onOpenContact={() => setIsContactOpen(true)} />;
        case 'ABOUT': return <AboutUs />;
        case 'PRIVACY': return <PrivacyPolicy />;
        case 'TERMS': return <TermsOfService />;
        case 'SUPPORT': return <Support onOpenContact={() => setIsContactOpen(true)} />;
        default: return <KeywordTool />;
      }
    })();

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {content}
      </div>
    );
  };

  const FooterLink = ({ label, tab }: { label: string; tab: Tab }) => (
    <li>
      <button 
        onClick={() => setActiveTab(tab)}
        className="group flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-out hover:opacity-80"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{label}</span>
      </button>
    </li>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFE] dark:bg-[#0A0A0A] flex flex-col text-gray-900 dark:text-gray-100 pb-32 md:pb-0 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/40 transition-colors duration-500">
      {/* Modals - Passed Theme for proper dark mode integration */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/50 glass-effect border-b border-gray-200 dark:border-white/10 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-6 group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all" 
            onClick={() => setActiveTab('TOOL')}
          >
            <div className="bg-gray-900 dark:bg-white p-2.5 rounded-2xl shadow-xl shadow-gray-200 dark:shadow-none group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-500 animate-logo-pulse">
              <Zap className="w-6 h-6 text-white dark:text-black fill-current" />
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                Keyword<span className="text-blue-600 dark:text-blue-400">Pro</span>
                </span>
                <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[9px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">
                      Engines Live
                    </span>
                </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                {['TOOL', 'FEATURES', 'BLOG', 'DOCS', 'PRICING', 'SUPPORT'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as Tab)}
                        className={`transition-all hover:scale-105 hover:text-gray-900 dark:hover:text-white ${activeTab === tab ? 'text-gray-900 dark:text-white underline decoration-blue-500 decoration-2 underline-offset-8' : ''}`}
                    >
                        {tab === 'TOOL' ? 'Analyzer' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                ))}
            </nav>
            <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:scale-110 active:scale-90 transition-all shadow-sm group"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                )}
              </button>

              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-[11px] font-black tracking-[0.2em] uppercase text-white bg-gray-900 dark:bg-white dark:text-black px-6 py-3.5 rounded-xl hover:bg-black dark:hover:bg-gray-200 hover:scale-[1.05] active:scale-[0.95] transition-all shadow-lg shadow-gray-200 dark:shadow-none"
              >
                Get Premium Key
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-6">
        {renderContent()}

        {activeTab === 'TOOL' && (
            <>
                {/* Trust Badges */}
                <section className="mt-32 py-16 text-center border-y border-gray-100 dark:border-white/5">
                    <p className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-[0.5em] mb-12">Global Authority</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Users className="w-6 h-6" /> GrowRank</div>
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Briefcase className="w-6 h-6" /> SEOFlow</div>
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Star className="w-6 h-6" /> HighPath</div>
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Zap className="w-6 h-6" /> RapidTraffic</div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="max-w-7xl mx-auto mt-32 px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah J.", role: "SEO Expert", text: "Difficulty algorithm is flawless.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", profileUrl: "https://linkedin.com/in/sarah-j" },
                            { name: "Marcello R.", role: "Growth Lead", text: "Gemini-3 speed is unmatched.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcello", profileUrl: "https://linkedin.com/in/marcello-r" },
                            { name: "Elena R.", role: "Consultant", text: "Data integrity you can trust.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena", profileUrl: "https://linkedin.com/in/elena-r" }
                        ].map((t, i) => (
                            <div key={i} className="bg-white dark:bg-white/[0.03] p-10 rounded-[3rem] border border-gray-200 dark:border-white/5 shadow-xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500">
                                <p className="text-gray-900 dark:text-gray-100 text-lg font-medium italic mb-10">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="relative group/avatar">
                                      <a href={t.profileUrl} target="_blank" rel="noreferrer" className="block relative" aria-label={`Visit ${t.name} LinkedIn Profile`}>
                                        <img 
                                            src={t.avatar} 
                                            alt={t.name} 
                                            loading="lazy" 
                                            className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:scale-110 transition-transform duration-300 shadow-sm" 
                                        />
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-y-1 group-hover/avatar:translate-y-0 shadow-xl border border-white/10">
                                          View LinkedIn Profile
                                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                                        </div>
                                      </a>
                                    </div>
                                    <div>
                                        <a href={t.profileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 group/name">
                                          <h4 className="font-black text-gray-900 dark:text-white group-hover/name:text-blue-600 transition-colors">{t.name}</h4>
                                          <Linkedin className="w-3.5 h-3.5 text-[#0077B5] opacity-80 group-hover/name:opacity-100 group-hover/name:scale-110 transition-all" />
                                        </a>
                                        <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>
        )}
      </main>

      {/* Built With (Stable Component) */}
      <BuiltWith />

      {/* Floating Footer - Visible on all screens as a modern navigation pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-2xl bg-white/90 dark:bg-[#121212]/90 glass-effect border border-gray-200 dark:border-white/10 p-3 rounded-[2rem] flex items-center justify-between px-10 z-[100] shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {[
            { id: 'TOOL', icon: Search, label: 'Search' },
            { id: 'FEATURES', icon: Zap, label: 'Features' },
            { id: 'BLOG', icon: BookOpen, label: 'Blog' },
            { id: 'API', icon: Code, label: 'API' },
            { id: 'PRICING', icon: Star, label: 'Pricing' },
            { id: 'SUPPORT', icon: MessageCircle, label: 'Support' }
        ].map((item) => (
            <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-75 group ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                aria-label={`Switch to ${item.label}`}
            >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
        ))}

        <div className="w-px h-8 bg-gray-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

        <button 
            onClick={toggleTheme}
            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:rotate-180 transition-all duration-500 group"
            aria-label="Toggle Theme"
        >
            <div className="group-hover:scale-110 transition-transform">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 py-24 px-6 transition-all duration-500">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 text-center">
            {/* Branding Column */}
            <div className="flex flex-col items-center md:items-start space-y-8">
                <div className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105" onClick={() => setActiveTab('TOOL')}>
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-2xl font-black tracking-tighter dark:text-white">KeywordPro</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-relaxed max-w-xs text-center md:text-left">
                    The next generation of SEO intelligence. Built for agencies and data-driven growth teams looking for an edge.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-600 hover:text-blue-600 transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10" aria-label="Visit Twitter"><X className="w-5 h-5" /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-600 hover:text-blue-600 transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10" aria-label="Visit LinkedIn"><Linkedin className="w-5 h-5" /></a>
                </div>
            </div>

            {/* Product Column */}
            <div className="flex flex-col items-center space-y-8">
                <h5 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.4em] text-[9px]">Product</h5>
                <ul className="flex flex-col items-center space-y-4">
                    <FooterLink label="Keyword Finder" tab="TOOL" />
                    <FooterLink label="Features" tab="FEATURES" />
                    <FooterLink label="Blog" tab="BLOG" />
                    <FooterLink label="Documentation" tab="DOCS" />
                    <FooterLink label="API Access" tab="API" />
                    <FooterLink label="Pricing" tab="PRICING" />
                    <FooterLink label="Roadmap" tab="FEATURES" />
                </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col items-center space-y-8">
                <h5 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.4em] text-[9px]">Company</h5>
                <ul className="flex flex-col items-center space-y-4">
                    <FooterLink label="About Us" tab="ABOUT" />
                    <FooterLink label="Support" tab="SUPPORT" />
                    <FooterLink label="Privacy Policy" tab="PRIVACY" />
                    <FooterLink label="Terms of Service" tab="TERMS" />
                </ul>
            </div>

            {/* Newsletter Column */}
            <div className="flex flex-col items-center md:items-start space-y-8">
                <h5 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.4em] text-[9px] w-full text-center md:text-left">Stay Updated</h5>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                    <input 
                      type="email" 
                      placeholder="Professional Email" 
                      aria-label="Email for Newsletter"
                      className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white outline-none focus:border-blue-500 transition-all font-medium" 
                    />
                    <button className="bg-gray-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                      Subscribe
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                &copy; 2025 KeywordPro Labs Inc.
            </p>
            {/* Social Profile Integration */}
            <div className="flex items-center gap-10">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 active:scale-95" aria-label="GitHub">
                  <Users className="w-5 h-5" />
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Dribbble">
                  <Star className="w-5 h-5" />
                </a>
                <a href="https://behance.net" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Behance">
                  <Briefcase className="w-5 h-5" />
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;