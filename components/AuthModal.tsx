import React, { useState } from 'react';
import { X, Mail, Github, Chrome, ArrowRight, Loader2, Zap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    // Simulate auth redirect
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-[#0F0F0F] w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors z-20 bg-gray-50 dark:bg-white/5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          aria-label="Close Authentication"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 pt-12 space-y-8">
          <div className="text-center space-y-3">
            <div className="bg-gray-900 dark:bg-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-gray-200 dark:shadow-none">
              <Zap className="w-6 h-6 text-white dark:text-black fill-current" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Create your account to continue</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handleSocialAuth('Google')}
              disabled={loading}
              className="w-full py-4 px-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 text-red-500" />
              Continue with Google
            </button>
            <button 
              onClick={() => handleSocialAuth('GitHub')}
              disabled={loading}
              className="w-full py-4 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-black dark:hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-gray-200 dark:shadow-none"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-gray-500 dark:text-gray-400">
              <span className="bg-white dark:bg-[#0F0F0F] px-4 italic">Or use work email</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  aria-label="Email Address"
                  className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 transition-all font-bold dark:text-white"
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading || !email}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            By continuing, you agree to KeywordPro's <br/>
            <span className="text-gray-900 dark:text-white font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-gray-900 dark:text-white font-bold hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};