import React, { useState, useEffect } from 'react';
import { X, Play, Loader2, Video, Key, Film, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { audio } from '../utils/audioUtils';
import { satisfyingAudio } from '../utils/satisfyingAudioEngine';

interface PromoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const PromoVideoModal: React.FC<PromoVideoModalProps> = ({ isOpen, onClose }) => {
  const [isApiKeySelected, setIsApiKeySelected] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const [hookVideoUrl, setHookVideoUrl] = useState<string | null>(null);
  const [benefitVideoUrl, setBenefitVideoUrl] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<'hook' | 'benefit'>('hook');

  useEffect(() => {
    if (isOpen && window.aistudio?.hasSelectedApiKey) {
      window.aistudio.hasSelectedApiKey().then(setIsApiKeySelected);
    }
  }, [isOpen]);

  const getApiKey = () => {
    // Try to get the API key from various possible environment variables
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) return process.env.API_KEY;
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
    // @ts-ignore
    return import.meta.env?.VITE_GEMINI_API_KEY || '';
  };

  const fetchVideoBlob = async (uri: string) => {
    const apiKey = getApiKey();
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'x-goog-api-key': apiKey,
      },
    });
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const handleGenerate = async () => {
    satisfyingAudio.playEnter();
    try {
      if (!isApiKeySelected && window.aistudio?.openSelectKey) {
        await window.aistudio.openSelectKey();
        setIsApiKeySelected(true);
      }

      setIsGenerating(true);
      setProgress('Initializing Veo 3.1 Fast Generate Model...');

      const apiKey = getApiKey();
      const ai = new GoogleGenAI({ apiKey });

      // Generate Hook Scene
      setProgress('Generating Scene 1: The Hook (Stressed Business Owner)... This may take a few minutes.');
      let hookOp = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic, high-quality shot of a stressed local business owner in Pakistan/India looking at a laptop screen in a dimly lit room. The screen shows a flat traffic graph. Dark navy and blue tones, professional lighting, 1080p resolution.',
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!hookOp.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        hookOp = await ai.operations.getVideosOperation({ operation: hookOp });
        setProgress('Still generating Scene 1... Veo is rendering high-quality frames.');
      }

      const hookUri = hookOp.response?.generatedVideos?.[0]?.video?.uri;
      if (hookUri) {
        setProgress('Downloading Scene 1...');
        const hookBlobUrl = await fetchVideoBlob(hookUri);
        setHookVideoUrl(hookBlobUrl);
      }

      // Generate Benefit Scene
      setProgress('Generating Scene 2: The Benefit (Happy Business Owner)... Almost there!');
      let benefitOp = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic, high-quality shot of a happy, smiling local business owner in Pakistan/India receiving a phone call from a customer. In the background, a laptop screen shows upward trending data graphs with glowing blue accents. Professional, optimistic, 1080p resolution.',
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!benefitOp.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        benefitOp = await ai.operations.getVideosOperation({ operation: benefitOp });
        setProgress('Still generating Scene 2... Finalizing the cinematic shot.');
      }

      const benefitUri = benefitOp.response?.generatedVideos?.[0]?.video?.uri;
      if (benefitUri) {
        setProgress('Downloading Scene 2...');
        const benefitBlobUrl = await fetchVideoBlob(benefitUri);
        setBenefitVideoUrl(benefitBlobUrl);
      }

      setProgress('Generation Complete!');
      satisfyingAudio.playSuccessChime();
    } catch (error: any) {
      console.error(error);
      setProgress(`Error: ${error.message}`);
      audio.playError();
      
      if (error.message?.includes('Requested entity was not found')) {
        setIsApiKeySelected(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
              <Film className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Keyword Pro Promo Video</h2>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Powered by Veo 3.1</p>
            </div>
          </div>
          <button 
            onClick={() => { audio.playHover(); onClose(); }}
            onMouseEnter={audio.playHover}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {(!hookVideoUrl || !benefitVideoUrl) ? (
            <div className="text-center space-y-8 py-12">
              <div className="w-24 h-24 mx-auto bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/20 mb-6">
                <Video className="w-10 h-10 text-blue-400" />
              </div>
              
              <div className="max-w-xl mx-auto space-y-4">
                <h3 className="text-2xl font-black text-white">Generate Cinematic Promo Clips</h3>
                <p className="text-gray-400 leading-relaxed">
                  We will use Google's state-of-the-art <strong>Veo 3.1 Video Generation Model</strong> to create the "Hook" and "Benefit" scenes for your landing page promo video.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-3 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300"><strong>Scene 1 (Hook):</strong> Stressed local business owner looking at a flat traffic graph.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300"><strong>Scene 2 (Benefit):</strong> Happy business owner receiving calls with upward trending graphs.</p>
                  </div>
                </div>
              </div>

              {isGenerating ? (
                <div className="space-y-6 max-w-md mx-auto pt-8">
                  <div className="flex justify-center">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white animate-pulse">{progress}</p>
                    <p className="text-xs text-gray-500">Please do not close this window. Video generation takes a few minutes.</p>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full w-1/2 animate-[pulse_2s_ease-in-out_infinite] rounded-full"></div>
                  </div>
                </div>
              ) : (
                <div className="pt-8">
                  <button
                    onClick={handleGenerate}
                    onMouseEnter={audio.playHover}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-sm flex items-center gap-3 mx-auto"
                  >
                    {!isApiKeySelected ? <Key className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {!isApiKeySelected ? 'Connect API Key to Generate' : 'Generate Video Clips (Veo 3.1)'}
                  </button>
                  {!isApiKeySelected && (
                    <p className="text-xs text-gray-500 mt-4">
                      Requires a paid Google Cloud project API Key for Veo access.<br/>
                      <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View Billing Docs</a>
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex gap-4 justify-center mb-6">
                <button 
                  onClick={() => { satisfyingAudio.playFocusPop(); setActiveVideo('hook'); }}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeVideo === 'hook' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  Scene 1: The Hook
                </button>
                <button 
                  onClick={() => { satisfyingAudio.playFocusPop(); setActiveVideo('benefit'); }}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeVideo === 'benefit' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  Scene 2: The Benefit
                </button>
              </div>

              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                {activeVideo === 'hook' && hookVideoUrl && (
                  <video 
                    src={hookVideoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                )}
                {activeVideo === 'benefit' && benefitVideoUrl && (
                  <video 
                    src={benefitVideoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  You can right-click the video to save it, or use these clips in your final edit!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
