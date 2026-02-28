import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'issue'>('suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">Feedback</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Help us improve KeywordPro.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('suggestion')}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                      feedbackType === 'suggestion' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    Suggestion
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('issue')}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                      feedbackType === 'issue' 
                        ? 'bg-rose-600 text-white shadow-md' 
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    Report Issue
                  </button>
                </div>

                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={feedbackType === 'suggestion' ? "I would love to see a feature that..." : "I encountered a bug where..."}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-medium resize-none h-32 text-gray-900 dark:text-white"
                />

                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-sm uppercase tracking-widest hover:bg-black dark:hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Thank You!</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Your feedback has been received and will help us improve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
