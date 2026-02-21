import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, BarChart3, DollarSign, Download, Loader2, Copy, Check, FileText, Info, Calculator, ShieldCheck, Zap, Users, Star, Bookmark, History, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getKeywordSuggestions } from '../services/geminiService';
import { KeywordSuggestion } from '../types';

const LOADING_MESSAGES = [
  "Analyzing Search Intent...",
  "Fetching Global Data...",
  "Parsing SERP Signals...",
  "Calculating Difficulty Metrics...",
  "Neural Intent Mapping...",
  "Finalizing Keywords..."
];

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-gray-100 dark:border-white/5">
    <td className="px-12 py-8">
      <div className="flex items-center gap-6">
        <div className="h-7 w-48 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
      </div>
    </td>
    <td className="px-12 py-8">
      <div className="h-6 w-20 bg-gray-100 dark:bg-white/5 rounded-lg"></div>
    </td>
    <td className="px-12 py-8">
      <div className="h-8 w-24 bg-gray-100 dark:bg-white/5 rounded-2xl"></div>
    </td>
    <td className="px-12 py-8">
      <div className="h-6 w-16 bg-gray-100 dark:bg-white/5 rounded-lg"></div>
    </td>
  </tr>
);

export const KeywordTool: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<KeywordSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredDifficulty, setHoveredDifficulty] = useState<number | null>(null);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Rotating loading messages
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 600);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Loading bar progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + (100 - prev) * 0.1;
        });
      }, 200);
    } else {
      setLoadingProgress(100);
      const timeout = setTimeout(() => setLoadingProgress(0), 500);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Load saved searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('keywordpro_history');
    if (stored) {
      try {
        setSavedSearches(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved searches", e);
      }
    }
  }, []);

  // Sync saved searches to localStorage
  useEffect(() => {
    localStorage.setItem('keywordpro_history', JSON.stringify(savedSearches));
  }, [savedSearches]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    setLoading(true);
    setJustSaved(false);
    
    // Artificial delay to ensure 3s experience as requested
    const startTime = Date.now();
    
    try {
      const data = await getKeywordSuggestions(keyword);
      
      // Ensure at least 2.5s delay for the animation
      const elapsed = Date.now() - startTime;
      if (elapsed < 2500) {
        await new Promise(resolve => setTimeout(resolve, 2500 - elapsed));
      }
      
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveAnalysis = () => {
    if (!keyword || results.length === 0) return;
    
    const newSave: SavedSearch = {
      id: Math.random().toString(36).substr(2, 9),
      keyword: keyword,
      timestamp: Date.now(),
      results: results
    };

    if (savedSearches.some(s => s.keyword.toLowerCase() === keyword.toLowerCase() && s.results.length === results.length)) {
        setJustSaved(true);
        return;
    }

    setSavedSearches(prev => [newSave, ...prev].slice(0, 10)); 
    setJustSaved(true);
  };

  const loadAnalysis = (save: SavedSearch) => {
    setKeyword(save.keyword);
    setResults(save.results);
    setJustSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Low': return 'text-green-700 bg-green-50 border-green-100 dark:text-green-400 dark:bg-green-500/10 dark:border-green-500/20';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20';
      case 'High': return 'text-rose-700 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20';
      default: return 'text-gray-700 bg-gray-50 border-gray-100 dark:text-gray-400 dark:bg-gray-500/10 dark:border-gray-500/20';
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportToCSV = () => {
    const headers = ['Keyword', 'Search Volume', 'Difficulty', 'CPC'];
    const rows = results.map(r => [r.keyword, r.volume, r.difficulty, r.cpc].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `keywordpro-${keyword.replace(/\s+/g, '-')}.csv`);
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 relative">
      {/* Top Loading Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 dark:bg-blue-500 z-[200] transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{ width: `${loadingProgress}%`, opacity: loadingProgress > 0 && loadingProgress < 100 ? 1 : 0 }}
      />

      {/* Search Header */}
      <div className="bg-white dark:bg-white/[0.03] p-8 md:p-20 rounded-[4rem] shadow-2xl border border-blue-50/50 dark:border-white/5 text-center space-y-8 relative overflow-hidden transition-all duration-500">
        <div className="absolute -top-12 -right-12 p-8 opacity-5 dark:opacity-10">
            <Calculator className="w-64 h-64 text-blue-900 dark:text-blue-400" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-blue-100 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Gemini SEO Engine v3.0
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Scientific <span className="text-blue-600 dark:text-blue-400">SEO Research</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Analyze keyword authority, velocity, and commercial intent with precision.
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto relative z-10">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 w-6 h-6" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter seed keyword (e.g. 'saas marketing')"
              className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-xl font-bold dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 hover:scale-[1.05] active:scale-[0.95] text-white dark:text-black px-14 py-6 rounded-3xl font-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Analyze'}
          </button>
        </form>
      </div>

      {/* History Section */}
      {savedSearches.length > 0 && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center justify-between px-6">
              <h4 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.4em] flex items-center gap-2">
                <History className="w-3.5 h-3.5" /> Recent Discoveries
              </h4>
              <button 
                onClick={() => setSavedSearches([])}
                className="text-[9px] font-black text-gray-500 hover:text-rose-600 transition-colors uppercase tracking-widest"
              >
                Clear History
              </button>
           </div>
           <div className="flex flex-wrap gap-4 px-2">
              {savedSearches.map((save) => (
                <div 
                  key={save.id}
                  onClick={() => loadAnalysis(save)}
                  className="group relative bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 px-6 py-4 rounded-2xl cursor-pointer hover:border-blue-500/30 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all flex items-center gap-4 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col">
                    <span className="font-black text-gray-900 dark:text-white text-sm tracking-tight">{save.keyword}</span>
                    <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                      {new Date(save.timestamp).toLocaleDateString()} • {save.results.length} results
                    </span>
                  </div>
                  <button 
                    onClick={(e) => deleteSave(e, save.id)}
                    className="p-1.5 text-gray-400 dark:text-gray-600 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Loading Box */}
      {loading && (
        <div className="bg-gray-900 dark:bg-white/[0.02] text-white p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 border border-white/10 relative overflow-hidden">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 font-mono text-2xl md:text-3xl relative z-10">
                KD = (BA + DA) × <span className="text-blue-500 dark:text-blue-400 font-black">log(C)</span>
            </div>
            <div className="space-y-3 relative z-10 flex-1">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  <AnimatePresence mode="wait">
                    <motion.h4 
                      key={loadingMessageIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-black text-2xl tracking-tight"
                    >
                      {LOADING_MESSAGES[loadingMessageIndex]}
                    </motion.h4>
                  </AnimatePresence>
                </div>
                <p className="text-gray-300 dark:text-gray-400 text-sm font-medium">Aggregating signals for 99.8% precision metrics.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent animate-pulse pointer-events-none"></div>
        </div>
      )}

      {/* Results Section */}
      <AnimatePresence>
        {(results.length > 0 || loading) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
              <div className="flex items-center gap-6">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
                  <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  {loading ? 'Analyzing Niche...' : `Niche Results: ${keyword}`}
                </h3>
                {!loading && (
                  <button 
                    onClick={saveAnalysis}
                    disabled={justSaved}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      justSaved 
                      ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20' 
                      : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-100 dark:border-white/10'
                    }`}
                  >
                    {justSaved ? <><Check className="w-3 h-3" /> Saved</> : <><Bookmark className="w-3 h-3" /> Save Analysis</>}
                  </button>
                )}
              </div>
              {!loading && (
                <button 
                  onClick={exportToCSV}
                  className="flex items-center gap-3 px-8 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Export CSV
                </button>
              )}
            </div>

            <div className="bg-white dark:bg-white/[0.03] rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                      <th className="px-12 py-8 text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-[0.4em]">Keyword Prospect</th>
                      <th className="px-12 py-8 text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-[0.4em]">Volume</th>
                      <th className="px-12 py-8 text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-[0.4em]">Difficulty</th>
                      <th className="px-12 py-8 text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-[0.4em]">Avg CPC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {loading ? (
                      <>
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                      </>
                    ) : (
                      results.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all group">
                          <td className="px-12 py-8">
                            <div className="flex items-center gap-6">
                              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{item.keyword}</span>
                              <button 
                                onClick={() => copyToClipboard(item.keyword, idx)}
                                className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl transition-all text-gray-400 dark:text-gray-500 hover:text-blue-600 opacity-0 group-hover:opacity-100"
                              >
                                {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                          <td className="px-12 py-8">
                            <div className="flex items-center gap-3 font-black text-gray-900 dark:text-white text-lg">
                              <BarChart3 className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                              <span>{item.volume}</span>
                            </div>
                          </td>
                          <td className="px-12 py-8 relative">
                            <div 
                              className="relative inline-block cursor-help group/tip"
                              onMouseEnter={() => setHoveredDifficulty(idx)}
                              onMouseLeave={() => setHoveredDifficulty(null)}
                            >
                              <span className={`px-5 py-2 rounded-2xl text-[10px] font-black border uppercase tracking-[0.1em] ${getDifficultyColor(item.difficulty)} transition-all hover:scale-110`}>
                                {item.difficulty}
                              </span>
                              
                              {hoveredDifficulty === idx && (
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-64 p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-2">
                                        <Calculator className="w-4 h-4 text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Difficulty Model</span>
                                      </div>
                                      <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                                        <code className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-black">KD = (BA + DA) × log(C)</code>
                                      </div>
                                      <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-tight">
                                        Factors: Backlink Age, Domain Authority, and SERP Competition.
                                      </p>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#121212] border-r border-b border-gray-200 dark:border-white/10 rotate-45"></div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-12 py-8">
                            <div className="flex items-center gap-2 font-black text-gray-900 dark:text-white text-lg tabular-nums">
                              <DollarSign className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-green-600 transition-colors" />
                              <span>{item.cpc}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {results.length === 0 && !loading && (
        <div className="text-center py-40 bg-white dark:bg-white/[0.03] rounded-[4rem] border border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-500">
          <div className="bg-blue-50 dark:bg-blue-500/10 w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-blue-100 dark:border-blue-500/20 rotate-12 transition-transform duration-500">
            <TrendingUp className="w-14 h-14 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Unlock Your Potential</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-xl max-w-xl mx-auto leading-relaxed font-medium">Analyze global search volumes and competition instantly.</p>
        </div>
      )}
    </div>
  );
};