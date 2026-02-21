
export interface KeywordSuggestion {
  keyword: string;
  volume: string;
  difficulty: 'Low' | 'Medium' | 'High';
  trend: number[];
  cpc: string;
}
