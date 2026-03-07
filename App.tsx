import React, { useState, useEffect } from 'react';
import { KeywordTool } from './components/KeywordTool';
import { SerpAnalyzer } from './components/SerpAnalyzer';
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
import { FeedbackModal } from './components/FeedbackModal';
import { OnboardingModal } from './components/OnboardingModal';
import { Zap, ShieldCheck, Star, Users, Briefcase, Linkedin, X, BookOpen, MessageCircle, Search, Mail, Activity, CheckCircle, Shield, Rocket, Cpu, Database, Globe, Sun, Moon, ChevronRight, Code, Menu, Volume2, VolumeX, MessageSquare } from 'lucide-react';
import { audio } from './utils/audioUtils';
import { typingAudio } from './utils/typingSoundUtils';
import { satisfyingAudio } from './utils/satisfyingAudioEngine';
import { useScrollReveal } from './utils/useScrollReveal';

export const runtime = 'edge';
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export type Tab = 'TOOL' | 'SERP' | 'FEATURES' | 'BLOG' | 'API' | 'DOCS' | 'PRICING' | 'ABOUT' | 'PRIVACY' | 'TERMS' | 'SUPPORT';

const App: React.FC = () => {
  useScrollReveal();
  const [activeTab, setActiveTab] = useState<Tab>('TOOL');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Handle Audio Initialization on first interaction
  useEffect(() => {
    // Check if onboarding has been shown
    const hasSeenOnboarding = localStorage.getItem('keywordpro_onboarding_seen');
    if (!hasSeenOnboarding) {
      setIsOnboardingOpen(true);
      localStorage.setItem('keywordpro_onboarding_seen', 'true');
    }

    setIsMuted(audio.getMuteState());

    const handleInteraction = () => {
      audio.init();
      typingAudio.init();
      satisfyingAudio.init();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const toggleMute = () => {
    const newMuteState = audio.toggleMute();
    setIsMuted(newMuteState);
  };

  const handleTabChange = (tab: Tab) => {
    audio.playNav();
    setActiveTab(tab);
  };

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

  const toggleTheme = () => {
    audio.playHover();
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Smooth scroll on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu on tab switch
  }, [activeTab]);

  const renderContent = () => {
    const content = (() => {
      switch (activeTab) {
        case 'TOOL': return <KeywordTool />;
        case 'SERP': return <SerpAnalyzer />;
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
        onClick={() => handleTabChange(tab)}
        onMouseEnter={audio.playHover}
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
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/50 glass-effect border-b border-gray-200 dark:border-white/10 transition-all duration-500">
        <div className="w-full px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 md:gap-6 group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all" 
            onClick={() => handleTabChange('TOOL')}
            onMouseEnter={audio.playHover}
          >
            <div className="bg-gray-900 dark:bg-white p-2 md:p-2.5 rounded-2xl shadow-xl shadow-gray-200 dark:shadow-none group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-500 animate-logo-pulse">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white dark:text-black fill-current" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                Keyword<span className="text-blue-600 dark:text-blue-400">Pro</span>
                </span>
                <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[8px] md:text-[9px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">
                      Engines Live
                    </span>
                </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                {['TOOL', 'SERP', 'FEATURES', 'BLOG', 'DOCS', 'PRICING', 'SUPPORT'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => handleTabChange(tab as Tab)}
                        onMouseEnter={audio.playHover}
                        className={`transition-all hover:scale-105 hover:text-gray-900 dark:hover:text-white ${activeTab === tab ? 'text-gray-900 dark:text-white underline decoration-blue-500 decoration-2 underline-offset-8' : ''}`}
                    >
                        {tab === 'TOOL' ? 'Analyzer' : tab === 'SERP' ? 'SERP' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                ))}
            </nav>
            <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMute}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:scale-110 active:scale-90 transition-all shadow-sm group"
                aria-label="Toggle Sound"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
                ) : (
                  <Volume2 className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
                )}
              </button>

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
                onClick={() => { audio.playHover(); setIsAuthOpen(true); }}
                onMouseEnter={audio.playHover}
                className="text-[11px] font-black tracking-[0.2em] uppercase text-white bg-gray-900 dark:bg-white dark:text-black px-6 py-3.5 rounded-xl hover:bg-black dark:hover:bg-gray-200 hover:scale-[1.05] active:scale-[0.95] transition-all shadow-lg shadow-gray-200 dark:shadow-none"
              >
                Get Premium Key
              </button>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={toggleMute}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm"
              aria-label="Toggle Sound"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-blue-500" />
              )}
            </button>
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>
            <button 
              onClick={() => { audio.playHover(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black transition-all shadow-sm"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col p-4 space-y-2">
              {['TOOL', 'SERP', 'FEATURES', 'BLOG', 'DOCS', 'PRICING', 'SUPPORT'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => handleTabChange(tab as Tab)}
                  className={`p-4 text-left rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === tab ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  {tab === 'TOOL' ? 'Analyzer' : tab === 'SERP' ? 'SERP' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100 dark:border-white/10">
                <button 
                  onClick={() => {
                    audio.playHover();
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full text-xs font-black tracking-[0.2em] uppercase text-white bg-gray-900 dark:bg-white dark:text-black px-6 py-4 rounded-xl hover:bg-black dark:hover:bg-gray-200 transition-all"
                >
                  Get Premium Key
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 md:px-12">
        {renderContent()}

        {activeTab === 'TOOL' && (
            <>
                {/* Trust Badges */}
                <section className="mt-32 py-16 text-center border-y border-gray-100 dark:border-white/5 reveal-on-scroll animate-fade-in">
                    <p className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-[0.5em] mb-12">Global Authority</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Users className="w-6 h-6" /> GrowRank</div>
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Briefcase className="w-6 h-6" /> SEOFlow</div>
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Star className="w-6 h-6" /> HighPath</div>
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter"><Zap className="w-6 h-6" /> RapidTraffic</div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="max-w-7xl mx-auto mt-32 px-6 reveal-on-scroll animate-slide-up">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah J.", role: "SEO Expert", text: "Difficulty algorithm is flawless.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", profileUrl: "https://linkedin.com/in/sarah-j" },
                            { name: "Marcello R.", role: "Growth Lead", text: "Gemini-3 speed is unmatched.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcello", profileUrl: "https://linkedin.com/in/marcello-r" },
                            { name: "Elena R.", role: "Consultant", text: "Data integrity you can trust.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena", profileUrl: "https://linkedin.com/in/elena-r" }
                        ].map((t, i) => (
                            <div key={i} className={`bg-white dark:bg-white/[0.03] p-10 rounded-[3rem] border border-gray-200 dark:border-white/5 shadow-xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 reveal-on-scroll animate-slide-up delay-${(i + 1) * 100}`}>
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

      {/* --- Bottom Navigation Bar --- */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] max-w-5xl bg-black/80 backdrop-blur-lg border border-white/10 rounded-full py-3 px-6 md:px-12 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60] nav-bar-refresh">
        <button onClick={() => handleTabChange('TOOL')} className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-200 ${activeTab === 'TOOL' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
          <Search size={20} className={activeTab === 'TOOL' ? 'text-blue-400' : 'text-white'} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === 'TOOL' ? 'text-blue-400' : 'text-white'}`}>Search</span>
        </button>
        <button onClick={() => handleTabChange('FEATURES')} className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-200 ${activeTab === 'FEATURES' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
          <Zap size={20} className={activeTab === 'FEATURES' ? 'text-blue-400' : 'text-white'} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === 'FEATURES' ? 'text-blue-400' : 'text-white'}`}>Features</span>
        </button>
        <button onClick={() => handleTabChange('BLOG')} className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-200 ${activeTab === 'BLOG' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
          <BookOpen size={20} className={activeTab === 'BLOG' ? 'text-blue-400' : 'text-white'} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === 'BLOG' ? 'text-blue-400' : 'text-white'}`}>Blog</span>
        </button>
        <button onClick={() => setIsFeedbackOpen(true)} className="relative z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-all duration-200">
          <MessageSquare size={20} className="text-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">Feedback</span>
        </button>
        <button onClick={toggleTheme} className="relative z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-all duration-200">
          {theme === 'light' ? <Moon size={20} className="text-white" /> : <Sun size={20} className="text-yellow-400" />}
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      {/* --- Main Footer Links --- */}
      <footer className="bg-black py-20 px-6 border-t border-white/5 text-center pb-28">
        <div className="space-y-8 max-w-md mx-auto">
          <div className="grid grid-cols-1 gap-4 text-white/60 font-medium uppercase tracking-widest text-sm">
            <button onClick={() => handleTabChange('FEATURES')} className="hover:text-blue-400 transition-colors">Features</button>
            <button onClick={() => handleTabChange('BLOG')} className="hover:text-blue-400 transition-colors">Blog</button>
            <button onClick={() => handleTabChange('DOCS')} className="hover:text-blue-400 transition-colors">Documentation</button>
            <button onClick={() => handleTabChange('API')} className="hover:text-blue-400 transition-colors">API Access</button>
            <button onClick={() => handleTabChange('PRICING')} className="hover:text-blue-400 transition-colors">Pricing</button>
          </div>
          <div className="pt-8 border-t border-white/5 space-y-4">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Company</p>
            <div className="flex flex-col gap-3 text-white/60 text-sm font-medium uppercase tracking-widest">
              <button onClick={() => handleTabChange('ABOUT')} className="hover:text-blue-400 transition-colors">About Us</button>
              <button onClick={() => handleTabChange('SUPPORT')} className="hover:text-blue-400 transition-colors">Support</button>
              <button onClick={() => handleTabChange('PRIVACY')} className="hover:text-blue-400 transition-colors">Privacy Policy</button>
              <button onClick={() => handleTabChange('TERMS')} className="hover:text-blue-400 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;