
import { GoogleGenAI, Type } from "@google/genai";
import { KeywordSuggestion, KeywordResponse } from "../types";

export const getKeywordSuggestions = async (query: string, mode: 'keyword' | 'competitor' = 'keyword', signal?: AbortSignal): Promise<KeywordResponse> => {
  // Create a fresh instance for every call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  
  const prompt = mode === 'competitor' 
    ? `Analyze the competitor website or URL "${query}". Identify and list 8 primary keywords that this competitor is likely ranking for or targeting. Also provide 3 related broad topics or niches.`
    : `Generate a comprehensive list of 8 high-potential keywords related to "${query}". Also provide 3 related broad topics or niches.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Act as an SEO expert. Provide realistic metrics including monthly search volume, SEO difficulty (Low, Medium, or High), estimated CPC in USD, estimated CTR (e.g., '15.2%'), and a 12-month historical search trend array (12 integers representing relative search volume from 0 to 100). Return ONLY raw JSON data.",
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster/more stable response in this context
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            results: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  volume: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  cpc: { type: Type.STRING },
                  ctr: { type: Type.STRING },
                  trend: { 
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                    description: "12 integers representing relative search volume from 0 to 100 over the last 12 months"
                  }
                },
                required: ["keyword", "volume", "difficulty", "cpc", "ctr", "trend"]
              }
            },
            relatedTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 related broad topics or niches'
            }
          },
          required: ["results", "relatedTopics"]
        }
      }
    });

    const text = response.text;
    if (!text) return { results: [], relatedTopics: [] };
    
    // Clean potential markdown wrapping if the model ignores the responseMimeType
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e: any) {
    if (e.name === 'AbortError') {
      console.log('Request aborted');
      throw e;
    }
    console.error("Failed to fetch keyword suggestions:", e);
    // Fail gracefully with an empty array
    return { results: [], relatedTopics: [] };
  }
};

export const editImageWithPrompt = async (base64DataUrl: string, mimeType: string, prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  
  const base64Data = base64DataUrl.includes(',') ? base64DataUrl.split(',')[1] : base64DataUrl;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (candidate && candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (e) {
    console.error("Failed to edit image:", e);
  }

  return null;
};
