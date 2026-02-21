import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Mail, Globe, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-[#0F0F0F] w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-20"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar info */}
            <div className="bg-gray-900 dark:bg-black p-12 text-white md:w-5/12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black">Get in Touch</h3>
                <p className="text-gray-400 text-sm font-medium">Have a question about the platform or interested in a custom enterprise plan?</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Email Us</p>
                    <p className="text-sm font-bold">hello@keywordpro.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Global HQ</p>
                    <p className="text-sm font-bold">San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Sales</p>
                    <p className="text-sm font-bold">+1 (800) KEY-PRO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-12 md:w-7/12 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all font-medium dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Business Email</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all font-medium dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Subject</label>
                  <select className="w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all font-medium appearance-none dark:text-white">
                    <option className="dark:bg-black">General Support</option>
                    <option className="dark:bg-black">Sales Inquiry</option>
                    <option className="dark:bg-black">Feature Request</option>
                    <option className="dark:bg-black">Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="Tell us how we can help..."
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all font-medium resize-none dark:text-white"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-5 h-5" /> Send Message</>}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-20 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-100 dark:border-green-500/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium max-w-xs mx-auto">Thank you for reaching out. A KeywordPro specialist will contact you within 1 business hour.</p>
            </div>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black hover:bg-black dark:hover:bg-gray-200 transition-all shadow-xl shadow-gray-200 dark:shadow-none"
            >
              Back to App
            </button>
          </div>
        )}
      </div>
    </div>
  );
};