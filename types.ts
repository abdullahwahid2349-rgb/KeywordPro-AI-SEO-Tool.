
export interface KeywordSuggestion {
  keyword: string;
  volume: string;
  difficulty: 'Low' | 'Medium' | 'High';
  cpc: string;
}

export interface KeywordResponse {
  results: KeywordSuggestion[];
  relatedTopics: string[];
}
