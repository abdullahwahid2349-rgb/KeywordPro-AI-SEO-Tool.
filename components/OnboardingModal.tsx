import React, { useState, useEffect } from 'react';
import { X, Search, BarChart3, Target, ChevronRight, ChevronLeft, Zap } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "Welcome to KeywordPro",
    description: "Your AI-powered SEO intelligence engine. Let's take a quick tour to help you rank faster.",
    icon: <Zap className="w-12 h-12 text-blue-500" />,
    color: "blue"
  },
  {
    title: "Discover Niche Keywords",
    description: "Enter a seed keyword and let our neural engine uncover high-volume, low-competition opportunities.",
    icon: <Search className="w-12 h-12 text-emerald-500" />,
    color: "emerald"
  },
  {
    title: "Analyze Difficulty",
    description: "Our proprietary KD score considers backlink velocity, domain age, and semantic depth for true ranking difficulty.",
    icon: <BarChart3 className="w-12 h-12 text-amber-500" />,
    color: "amber"
  },
  {
    title: "Track Competitors",
    description: "Map competitor domains to find their top-performing keywords and steal their traffic.",
    icon: <Target className="w-12 h-12 text-rose-500" />,
    color: "rose"
  }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden relative animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 md:p-12 text-center space-y-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className={`absolute -top-20 -left-20 w-64 h-64 bg-${step.color}-500/10 blur-[80px] rounded-full transition-colors duration-700 pointer-events-none`}></div>
          <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-${step.color}-500/10 blur-[80px] rounded-full transition-colors duration-700 pointer-events-none`}></div>

          <div className="relative z-10">
            <div className={`w-24 h-24 mx-auto bg-${step.color}-50 dark:bg-${step.color}-500/10 rounded-[2rem] flex items-center justify-center mb-8 border border-${step.color}-100 dark:border-${step.color}-500/20 shadow-inner transition-colors duration-500`}>
              {step.icon}
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-4 transition-all duration-300">
              {step.title}
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed transition-all duration-300 min-h-[80px]">
              {step.description}
            </p>
          </div>

          <div className="relative z-10 pt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentStep 
                      ? `w-8 bg-${step.color}-500` 
                      : 'w-2 bg-gray-200 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button 
                  onClick={handlePrev}
                  className="p-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={handleNext}
                className={`px-6 py-3 bg-${step.color}-600 hover:bg-${step.color}-700 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-${step.color}-500/20 flex items-center gap-2`}
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
