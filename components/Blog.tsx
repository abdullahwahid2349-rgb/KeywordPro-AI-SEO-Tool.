import React from 'react';
import { Calendar, User, Clock, ChevronRight, ArrowRight } from 'lucide-react';

export const Blog: React.FC = () => {
  const posts = [
    {
      title: "How AI is Changing Keyword Research in 2026",
      excerpt: "The landscape of SEO is shifting from simple string matching to deep semantic intent analysis. Discover how LLMs are redefining growth.",
      date: "Feb 20, 2026",
      author: "Alex Chen",
      readTime: "8 min read",
      image: "https://picsum.photos/seed/ai-seo/800/600",
      category: "AI & SEO"
    },
    {
      title: "Top 10 SEO Strategies for New Startups",
      excerpt: "Scaling a new domain requires a balance of technical precision and content authority. Here is our scientific roadmap for 2026.",
      date: "Feb 15, 2026",
      author: "Elena Rossi",
      readTime: "12 min read",
      image: "https://picsum.photos/seed/startup-seo/800/600",
      category: "Growth"
    },
    {
      title: "Why Competitor Analysis is Key to Growth",
      excerpt: "Stop guessing and start measuring. Learn how to map your competitors' neural clusters to find untapped market opportunities.",
      date: "Feb 10, 2026",
      author: "Marcus Thorne",
      readTime: "10 min read",
      image: "https://picsum.photos/seed/competitor/800/600",
      category: "Intelligence"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-blue-100 dark:border-blue-500/20">
          KeywordPro Insights
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
          The <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Growth Journal.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          Scientific perspectives on SEO, data intelligence, and the future of search.
        </p>
      </section>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 gap-10 px-6">
        {posts.map((post, idx) => (
          <article 
            key={idx} 
            className="group bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-12"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-white/20">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">{post.author}</span>
                </div>
                <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest group/btn">
                  Read More <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <section className="px-6">
        <div className="bg-gray-900 dark:bg-black rounded-[4rem] p-16 md:p-24 text-center space-y-10 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]"></div>
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Never Miss a Pulse</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
              Join 15,000+ growth leaders receiving our weekly neural SEO reports.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto mt-10">
              <input 
                type="email" 
                placeholder="Enter your professional email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 transition-all font-medium"
              />
              <button className="px-8 py-4 bg-white text-black hover:bg-blue-50 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
