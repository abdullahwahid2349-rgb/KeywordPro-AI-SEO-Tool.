
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
