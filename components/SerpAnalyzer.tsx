import React, { useState, useEffect } from 'react';
import { Search, Loader2, BarChart3, Target, FileText, TrendingUp, AlertCircle, Globe, Award, Zap } from 'lucide-react';
import { analyzeSerp } from '../services/geminiService';
import { SerpAnalysisResponse } from '../types';
import { audio } from '../utils/audioUtils';
import { satisfyingAudio } from '../utils/satisfyingAudioEngine';

export const SerpAnalyzer: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SerpAnalysisResponse | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      audio.playError();
      return;
    }

    audio.playPrimary();
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const data = await analyzeSerp(keyword, abortController.signal);
      if (abortController.signal.aborted) return;

      if (data) {
        setAnalysis(data);
        audio.playSuccess();
      } else {
        setError('Failed to analyze SERP. Please try again.');
        audio.playError();
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError('An error occurred during analysis.');
      audio.playError();
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const getDifficultyColor = (diff: number) => {
    if (diff < 30) return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10';
    if (diff < 70) return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10';
    return 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      {/* Header */}
      <div className="bg-white dark:bg-white/[0.03] p-6 sm:p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-blue-50/50 dark:border-white/5 text-center space-y-8 relative overflow-hidden transition-all duration-500">
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-50 dark:bg-purple-500/10 text-purple-800 dark:text-purple-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-purple-100 dark:border-purple-500/20">
            <Target className="w-3.5 h-3.5 fill-current" />
            SERP Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Analyze the <span className="text-purple-600 dark:text-purple-400">First Page</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Deconstruct top-ranking pages to understand what it takes to rank for your target keywords.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto relative z-10 mt-8">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 w-6 h-6" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => satisfyingAudio.playFocusPop()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') satisfyingAudio.playEnter();
                else if (e.key === 'Backspace') satisfyingAudio.playBackspace();
                else if (e.key.length === 1) satisfyingAudio.playKeyPress();
              }}
              placeholder="Enter target keyword (e.g. 'best crm software')"
              className="w-full pl-16 pr-8 py-5 md:py-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 shadow-sm outline-none transition-all duration-200 text-lg md:text-xl font-bold dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={audio.playHover}
            onClick={() => satisfyingAudio.playEnter()}
            className="bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black px-10 md:px-14 py-5 md:py-6 rounded-3xl font-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Analyze SERP'}
          </button>
        </form>
      </div>

      {error && !loading && (
        <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-center font-medium shadow-sm">
          <AlertCircle className="w-5 h-5 inline-block mr-2 -mt-0.5" />
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-white/10 rounded-[2rem]"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 dark:bg-white/10 rounded-[2rem]"></div>
        </div>
      )}

      {analysis && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 p-8 rounded-[2rem] shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest text-xs">
                <BarChart3 className="w-5 h-5" /> Overall Difficulty
              </div>
              <div className="text-5xl font-black text-gray-900 dark:text-white flex items-end gap-2">
                {analysis.overallDifficulty} <span className="text-lg text-gray-400 mb-1">/ 100</span>
              </div>
              <div className={`mt-auto inline-block px-3 py-1 rounded-lg text-xs font-bold w-fit ${getDifficultyColor(analysis.overallDifficulty)}`}>
                {analysis.overallDifficulty > 70 ? 'Hard' : analysis.overallDifficulty > 30 ? 'Moderate' : 'Easy'} to Rank
              </div>
            </div>

            <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 p-8 rounded-[2rem] shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest text-xs">
                <Target className="w-5 h-5" /> Search Intent
              </div>
              <div className="text-3xl font-black text-gray-900 dark:text-white">
                {analysis.searchIntent}
              </div>
              <div className="mt-auto text-sm font-medium text-gray-500">
                Align your content with this intent to rank.
              </div>
            </div>

            <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 p-8 rounded-[2rem] shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest text-xs">
                <FileText className="w-5 h-5" /> Avg. Word Count
              </div>
              <div className="text-4xl font-black text-gray-900 dark:text-white">
                {analysis.averageWordCount.toLocaleString()}
              </div>
              <div className="mt-auto text-sm font-medium text-gray-500">
                Target length for competitive content.
              </div>
            </div>
          </div>

          {/* Ranking Factors */}
          <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 p-8 rounded-[2rem] shadow-xl">
            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-500" /> Top Ranking Factors
            </h3>
            <div className="flex flex-wrap gap-4">
              {analysis.topRankingFactors.map((factor, idx) => (
                <div key={idx} className="bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-xl font-bold text-sm border border-purple-100 dark:border-purple-500/20">
                  {factor}
                </div>
              ))}
            </div>
          </div>

          {/* SERP Results Table */}
          <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[2rem] shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-500" /> Top 10 Results
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest font-black">
                    <th className="p-4 pl-6">Pos</th>
                    <th className="p-4">Title & URL</th>
                    <th className="p-4">DA / PA</th>
                    <th className="p-4">Words</th>
                    <th className="p-4">Density</th>
                    <th className="p-4 pr-6">Traffic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {analysis.results.map((result) => (
                    <tr key={result.position} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-black text-sm ${result.position <= 3 ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400'}`}>
                          {result.position}
                        </span>
                      </td>
                      <td className="p-4 max-w-md">
                        <div className="font-bold text-gray-900 dark:text-white truncate" title={result.title}>{result.title}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 truncate mt-1" title={result.url}>{result.url}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 font-bold text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-600 dark:text-emerald-400">{result.domainAuthority}</span>
                          <span className="text-gray-300 dark:text-gray-600">/</span>
                          <span className="text-blue-600 dark:text-blue-400">{result.pageAuthority}</span>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-600 dark:text-gray-400 text-sm">
                        {result.wordCount.toLocaleString()}
                      </td>
                      <td className="p-4 font-medium text-gray-600 dark:text-gray-400 text-sm">
                        {result.keywordDensity}
                      </td>
                      <td className="p-4 pr-6 font-bold text-gray-900 dark:text-white text-sm">
                        {result.estimatedTraffic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
