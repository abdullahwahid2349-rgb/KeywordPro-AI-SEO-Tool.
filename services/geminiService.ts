
import { GoogleGenAI, Type } from "@google/genai";
import { KeywordSuggestion } from "../types";

export const getKeywordSuggestions = async (seedKeyword: string): Promise<KeywordSuggestion[]> => {
  // Create a fresh instance for every call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a comprehensive list of 10-15 high-potential keywords related to "${seedKeyword}".`,
      config: {
        systemInstruction: "Act as an SEO expert. Provide realistic metrics including monthly search volume, SEO difficulty (Low, Medium, or High), estimated CPC in USD, and a 12-month search trend (relative interest 0-100). Return ONLY raw JSON data.",
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster/more stable response in this context
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              keyword: { type: Type.STRING },
              volume: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              trend: { 
                type: Type.ARRAY, 
                items: { type: Type.NUMBER },
                description: '12 data points representing monthly search trend'
              },
              cpc: { type: Type.STRING }
            },
            required: ["keyword", "volume", "difficulty", "trend", "cpc"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Clean potential markdown wrapping if the model ignores the responseMimeType
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to fetch keyword suggestions:", e);
    // Fail gracefully with an empty array
    return [];
  }
};

export const editImageWithPrompt = async (base64DataUrl: string, mimeType: string, prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
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
