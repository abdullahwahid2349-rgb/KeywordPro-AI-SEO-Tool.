import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, BarChart3, DollarSign, Download, Loader2, Copy, Check, FileText, Info, Calculator, ShieldCheck, Zap, Users, Star, Bookmark, History, Trash2, Play, ArrowUpDown, MousePointerClick, Globe } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { getKeywordSuggestions } from '../services/geminiService';
import { KeywordSuggestion } from '../types';
import { audio } from '../utils/audioUtils';
import { satisfyingAudio } from '../utils/satisfyingAudioEngine';
import { PromoVideoModal } from './PromoVideoModal';

interface SavedSearch {
  id: string;
  keyword: string;
  timestamp: number;
  results: KeywordSuggestion[];
  relatedTopics?: string[];
  mode?: 'keyword' | 'competitor';
}

export const KeywordTool: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<KeywordSuggestion[]>([]);
  const [relatedTopics, setRelatedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredDifficulty, setHoveredDifficulty] = useState<number | null>(null);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'keyword' | 'competitor'>('keyword');
  const [sortOption, setSortOption] = useState<'default' | 'volume_desc' | 'volume_asc' | 'difficulty_desc' | 'difficulty_asc' | 'cpc_desc' | 'cpc_asc' | 'ctr_desc' | 'ctr_asc'>('default');
  const abortControllerRef = React.useRef<AbortController | null>(null);

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

  const handleSearch = async (e?: React.FormEvent, searchKeyword?: string) => {
    if (e) e.preventDefault();
    const query = searchKeyword || keyword;
    if (!query.trim()) {
      audio.playError();
      return;
    }
    
    audio.playPrimary();
    if (searchKeyword) setKeyword(searchKeyword);
    
    // Check cache first
    const cachedSearch = savedSearches.find(s => s.keyword.toLowerCase() === query.toLowerCase());
    if (cachedSearch) {
      setResults(cachedSearch.results);
      setRelatedTopics(cachedSearch.relatedTopics || []);
      setError(null);
      audio.playSuccess();
      return;
    }

    // Cancel previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      abortController.abort();
    }, 5000);

    setLoading(true);
    setJustSaved(false);
    setError(null);
    try {
      const data = await getKeywordSuggestions(query, searchMode, abortController.signal);
      clearTimeout(timeoutId);
      
      // If request was aborted by a new search, don't update state
      if (abortController.signal.aborted && !isTimeout) return;

      setResults(data.results || []);
      setRelatedTopics(data.relatedTopics || []);
      
      // Automatically save to history
      if (data.results && data.results.length > 0) {
        audio.playSuccess();
        const newSave: SavedSearch = {
          id: Math.random().toString(36).substr(2, 9),
          keyword: query,
          timestamp: Date.now(),
          results: data.results,
          relatedTopics: data.relatedTopics || [],
          mode: searchMode
        };
        
        setSavedSearches(prev => {
          // Remove if already exists to move it to the top
          const filtered = prev.filter(s => s.keyword.toLowerCase() !== query.toLowerCase());
          return [newSave, ...filtered].slice(0, 10);
        });
      } else {
        setError('No Results Found. Try a different keyword.');
        audio.playError();
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        if (isTimeout) {
          setResults([]);
          setRelatedTopics([]);
          setError('Request timed out after 5 seconds. Please try again.');
          audio.playError();
        }
        return;
      }
      console.error(err);
      setError('An error occurred while fetching results.');
      audio.playError();
      setResults([]);
      setRelatedTopics([]);
    } finally {
      if (!abortController.signal.aborted || isTimeout) {
        setLoading(false);
      }
    }
  };

  const loadAnalysis = (save: SavedSearch) => {
    audio.playNav();
    setKeyword(save.keyword);
    setResults(save.results);
    setRelatedTopics(save.relatedTopics || []);
    if (save.mode) setSearchMode(save.mode);
    setJustSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    audio.playHover();
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
    const headers = ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'CTR', 'Trend (12m)'];
    const rows = sortedResults.map(r => [
      r.keyword, 
      r.volume, 
      r.difficulty, 
      r.cpc, 
      r.ctr,
      `"${r.trend ? r.trend.join(',') : ''}"`
    ].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `keywordpro-${keyword.replace(/\s+/g, '-')}.csv`);
    link.click();
  };

  const parseVolume = (vol: string) => {
    const num = parseFloat(vol.replace(/,/g, '').replace(/[Kk]/g, '000').replace(/[Mm]/g, '000000'));
    return isNaN(num) ? 0 : num;
  };

  const parseDifficulty = (diff: string) => {
    if (diff === 'Low') return 1;
    if (diff === 'Medium') return 2;
    if (diff === 'High') return 3;
    return 0;
  };

  const parseCpc = (cpc: string) => {
    const num = parseFloat(cpc.replace(/[^0-9.-]+/g,""));
    return isNaN(num) ? 0 : num;
  };

  const parseCtr = (ctr: string) => {
    if (!ctr) return 0;
    const num = parseFloat(ctr.replace(/[^0-9.-]+/g,""));
    return isNaN(num) ? 0 : num;
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortOption) {
      case 'volume_desc': return parseVolume(b.volume) - parseVolume(a.volume);
      case 'volume_asc': return parseVolume(a.volume) - parseVolume(b.volume);
      case 'difficulty_desc': return parseDifficulty(b.difficulty) - parseDifficulty(a.difficulty);
      case 'difficulty_asc': return parseDifficulty(a.difficulty) - parseDifficulty(b.difficulty);
      case 'cpc_desc': return parseCpc(b.cpc) - parseCpc(a.cpc);
      case 'cpc_asc': return parseCpc(a.cpc) - parseCpc(b.cpc);
      case 'ctr_desc': return parseCtr(b.ctr) - parseCtr(a.ctr);
      case 'ctr_asc': return parseCtr(a.ctr) - parseCtr(b.ctr);
      default: return 0;
    }
  });

  const isHighVolume = (vol: string) => parseVolume(vol) > 10000;

  const getVolumeHighlight = (vol: string) => {
    if (isHighVolume(vol)) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg';
    return '';
  };

  const getDifficultyHighlight = (diff: string) => {
    if (diff === 'Low') return 'ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    return '';
  };

  const getCtrHighlight = (ctr: string) => {
    const num = parseCtr(ctr);
    if (num > 10) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-lg';
    return '';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      <PromoVideoModal isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
      
      {/* Search Header */}
      <div className="bg-white dark:bg-white/[0.03] p-6 sm:p-8 md:p-20 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-blue-50/50 dark:border-white/5 text-center space-y-8 relative overflow-hidden transition-all duration-500 reveal-on-scroll animate-fade-in">
        <div className="absolute -top-12 -right-12 p-8 opacity-5 dark:opacity-10 hidden md:block">
            <Calculator className="w-64 h-64 text-blue-900 dark:text-blue-400" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-blue-100 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Gemini SEO Engine v3.0
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Rank 10x Faster with <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400">AI-Driven Keyword Research</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Analyze keyword authority, velocity, and commercial intent with precision.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 reveal-on-scroll animate-scale-up">
            <button 
              onMouseEnter={audio.playHover}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-black transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-sm"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => { audio.playHover(); setIsPromoOpen(true); }}
              onMouseEnter={audio.playHover}
              className="w-full sm:w-auto bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-8 py-4 rounded-3xl font-black transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Watch Promo
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-12 relative z-10">
          <div className="bg-gray-100 dark:bg-white/5 p-1.5 rounded-full inline-flex border border-gray-200 dark:border-white/10 shadow-inner">
            <button
              onClick={() => { audio.playHover(); setSearchMode('keyword'); }}
              className={`px-6 py-2.5 rounded-full text-sm font-black transition-all uppercase tracking-widest flex items-center gap-2 ${searchMode === 'keyword' ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <Search className="w-4 h-4" />
              Keyword Ideas
            </button>
            <button
              onClick={() => { audio.playHover(); setSearchMode('competitor'); }}
              className={`px-6 py-2.5 rounded-full text-sm font-black transition-all uppercase tracking-widest flex items-center gap-2 ${searchMode === 'competitor' ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <Globe className="w-4 h-4" />
              Competitor Analysis
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto relative z-10 mt-6">
          <div className="relative flex-1">
            {searchMode === 'keyword' ? (
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 w-6 h-6" />
            ) : (
              <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 w-6 h-6" />
            )}
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => satisfyingAudio.playFocusPop()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  satisfyingAudio.playEnter();
                } else if (e.key === 'Backspace') {
                  satisfyingAudio.playBackspace();
                } else if (e.key.length === 1) {
                  satisfyingAudio.playKeyPress();
                }
              }}
              placeholder={searchMode === 'keyword' ? "Enter seed keyword (e.g. 'saas marketing')" : "Enter competitor URL (e.g. 'stripe.com')"}
              className="w-full pl-16 pr-8 py-5 md:py-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 shadow-sm focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] outline-none transition-all duration-200 text-lg md:text-xl font-bold dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={audio.playHover}
            onClick={() => satisfyingAudio.playEnter()}
            className="bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 hover:scale-[1.05] active:scale-[0.95] text-white dark:text-black px-10 md:px-14 py-5 md:py-6 rounded-3xl font-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Analyze'}
          </button>
        </form>
      </div>

      {/* Social Proof */}
      <div className="py-12 text-center space-y-8 reveal-on-scroll animate-slide-up">
        <p className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Trusted by 500+ SEO Experts</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-black text-2xl text-gray-900 dark:text-white"><div className="w-8 h-8 bg-blue-600 rounded-lg"></div> TechFlow</div>
          <div className="flex items-center gap-2 font-black text-2xl text-gray-900 dark:text-white"><div className="w-8 h-8 bg-emerald-500 rounded-full"></div> GrowthMetrics</div>
          <div className="flex items-center gap-2 font-black text-2xl text-gray-900 dark:text-white"><div className="w-8 h-8 bg-rose-500 rotate-45"></div> NexusSEO</div>
          <div className="flex items-center gap-2 font-black text-2xl text-gray-900 dark:text-white"><div className="w-8 h-8 bg-amber-500 rounded-tl-xl rounded-br-xl"></div> RankBoost</div>
        </div>
      </div>

      {/* History Section */}
      {savedSearches.length > 0 && !loading && (
        <div className="space-y-6 reveal-on-scroll animate-slide-up">
           <div className="flex items-center justify-between px-6">
              <h4 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.4em] flex items-center gap-2">
                <History className="w-3.5 h-3.5" /> Recent Discoveries
              </h4>
              <button 
                onClick={() => { audio.playHover(); setSavedSearches([]); }}
                onMouseEnter={audio.playHover}
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
                    <span className="font-black text-gray-900 dark:text-white text-sm tracking-tight flex items-center gap-2">
                      {save.mode === 'competitor' ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <Search className="w-3.5 h-3.5 text-emerald-500" />}
                      {save.keyword}
                    </span>
                    <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter mt-1">
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

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-center font-medium shadow-sm animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5 inline-block mr-2 -mt-0.5" />
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <div className="flex items-center gap-6">
              <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
              <div className="h-8 w-48 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
            </div>
            <div className="h-14 w-40 bg-gray-200 dark:bg-white/10 rounded-3xl animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[2rem] p-6 flex flex-col gap-6">
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
                </div>
                <div className="h-12 w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <div className="flex items-center gap-6">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                Niche Results: {keyword}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="appearance-none bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 py-3 pl-4 pr-10 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer shadow-sm"
                >
                  <option value="default">Default Sort</option>
                  <option value="volume_desc">Volume (High to Low)</option>
                  <option value="volume_asc">Volume (Low to High)</option>
                  <option value="difficulty_asc">Difficulty (Low to High)</option>
                  <option value="difficulty_desc">Difficulty (High to Low)</option>
                  <option value="cpc_desc">CPC (High to Low)</option>
                  <option value="cpc_asc">CPC (Low to High)</option>
                  <option value="ctr_desc">CTR (High to Low)</option>
                  <option value="ctr_asc">CTR (Low to High)</option>
                </select>
                <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-3 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-500">
            {sortedResults.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[2rem] p-6 flex flex-col gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group h-full">
                {/* Header: Keyword + Copy */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xl font-black tracking-tight ${isHighVolume(item.volume) ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400' : 'text-gray-900 dark:text-white'}`}>
                        {item.keyword}
                      </span>
                      {isHighVolume(item.volume) && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-sm animate-pulse">
                          Hot
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(item.keyword, idx)}
                    className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl transition-all text-gray-400 dark:text-gray-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 shrink-0"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Volume */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Volume</span>
                    <div className={`flex items-center gap-2 font-black text-gray-900 dark:text-white text-lg ${getVolumeHighlight(item.volume)}`}>
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span>{item.volume}</span>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex flex-col gap-1 relative">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Difficulty</span>
                    <div 
                      className="relative inline-block cursor-help group/tip w-fit"
                      onMouseEnter={() => setHoveredDifficulty(idx)}
                      onMouseLeave={() => setHoveredDifficulty(null)}
                    >
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-[0.1em] ${getDifficultyColor(item.difficulty)} ${getDifficultyHighlight(item.difficulty)} transition-all hover:scale-105 block`}>
                        {item.difficulty}
                      </span>
                      
                      {hoveredDifficulty === idx && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-4 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl z-50">
                            <p className="text-[9px] text-gray-600 dark:text-gray-400 font-medium leading-tight">
                              Factors: Backlink Age, Domain Authority, and SERP Competition.
                            </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CPC */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Avg CPC</span>
                    <div className="flex items-center gap-2 font-black text-gray-900 dark:text-white text-lg tabular-nums">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span>{item.cpc}</span>
                    </div>
                  </div>

                  {/* CTR */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Est. CTR</span>
                    <div className={`flex items-center gap-2 font-black text-gray-900 dark:text-white text-lg tabular-nums ${getCtrHighlight(item.ctr)}`}>
                      <MousePointerClick className="w-4 h-4 text-gray-400" />
                      <span>{item.ctr || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">12mo Trend</span>
                  <div className="h-12 w-full">
                    {item.trend && item.trend.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={item.trend.map((val, i) => ({ name: i, value: val }))}>
                          <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={item.trend[item.trend.length - 1] >= item.trend[0] ? '#10b981' : '#f43f5e'} 
                            strokeWidth={2} 
                            dot={false} 
                            isAnimationActive={true}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 text-xs font-medium">No Data</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Related Topics */}
          {relatedTopics && relatedTopics.length > 0 && (
            <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h4 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.4em] flex items-center gap-2 mb-6">
                <Search className="w-3.5 h-3.5" /> Explore Related Niches
              </h4>
              <div className="flex flex-wrap gap-3">
                {relatedTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleSearch(e, topic)}
                    className="px-6 py-3 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl text-sm font-black text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all shadow-sm hover:shadow-md"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State & Pricing */}
      {results.length === 0 && !loading && (
        <div className="space-y-24">
          <div className="text-center py-20 bg-white dark:bg-white/[0.03] rounded-[4rem] border border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-500">
            <div className="bg-blue-50 dark:bg-blue-500/10 w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-blue-100 dark:border-blue-500/20 rotate-12 transition-transform duration-500">
              <TrendingUp className="w-14 h-14 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Unlock Your Potential</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-6 text-xl max-w-xl mx-auto leading-relaxed font-medium">Analyze global search volumes and competition instantly.</p>
          </div>

          {/* Pricing Table */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Simple, Transparent Pricing</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Choose the perfect plan for your SEO needs.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[3rem] p-10 shadow-xl flex flex-col">
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Free</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gray-900 dark:text-white">$0</span>
                    <span className="text-gray-500 font-bold">/mo</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Perfect for beginners.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> 10 Searches / day</li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> Basic Difficulty Score</li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> 7-day History</li>
                </ul>
                <button className="w-full py-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-900 dark:bg-black border border-blue-500/30 rounded-[3rem] p-10 shadow-2xl shadow-blue-500/10 flex flex-col relative transform md:-translate-y-4">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black text-white">Pro</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">$19</span>
                    <span className="text-gray-400 font-bold">/mo</span>
                  </div>
                  <p className="text-gray-400 font-medium">For growing startups.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-gray-300 font-medium"><Check className="w-5 h-5 text-blue-400" /> Unlimited Searches</li>
                  <li className="flex items-center gap-3 text-gray-300 font-medium"><Check className="w-5 h-5 text-blue-400" /> Neural Intent Engine</li>
                  <li className="flex items-center gap-3 text-gray-300 font-medium"><Check className="w-5 h-5 text-blue-400" /> CSV Exports</li>
                  <li className="flex items-center gap-3 text-gray-300 font-medium"><Check className="w-5 h-5 text-blue-400" /> Priority Support</li>
                </ul>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-500/20">
                  Get Started
                </button>
              </div>

              {/* Agency Plan */}
              <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[3rem] p-10 shadow-xl flex flex-col">
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Agency</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gray-900 dark:text-white">$49</span>
                    <span className="text-gray-500 font-bold">/mo</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">For power users & teams.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> Everything in Pro</li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> API Access</li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> Custom Reporting</li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"><Check className="w-5 h-5 text-emerald-500" /> 5 Team Members</li>
                </ul>
                <button className="w-full py-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all">
                  Get Started
                </button>
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Secure Checkout</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400"><Zap className="w-5 h-5 text-blue-500" /> Instant Access</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};