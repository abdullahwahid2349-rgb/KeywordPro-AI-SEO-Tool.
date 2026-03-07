
export interface KeywordSuggestion {
  keyword: string;
  volume: string;
  difficulty: 'Low' | 'Medium' | 'High';
  cpc: string;
  ctr: string;
  trend: number[];
}

export interface KeywordResponse {
  results: KeywordSuggestion[];
  relatedTopics: string[];
}

export interface SerpResult {
  position: number;
  title: string;
  url: string;
  domainAuthority: number;
  pageAuthority: number;
  wordCount: number;
  keywordDensity: string;
  estimatedTraffic: string;
}

export interface SerpAnalysisResponse {
  keyword: string;
  overallDifficulty: number;
  searchIntent: string;
  averageWordCount: number;
  topRankingFactors: string[];
  results: SerpResult[];
}
