
import React, { useState } from 'react';
import { Search, Copy, Check, BookOpen, Code, Terminal, HelpCircle, ChevronRight, Rocket, Shield, Zap, Cpu } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('gs-intro');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections: DocSection[] = [
    {
      id: 'gs-intro',
      title: 'Introduction',
      content: (
        <div className="space-y-8">
          <div className="pg-header" id="gs-intro">
            <span className="pg-tag">Documentation</span>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight font-syne">Keyword Pro Docs</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">AI-powered SEO for South Asian teams. Zero bloat. Clean endpoints. Up and running in 5 minutes.</p>
          </div>

          <div className="trust-bar flex flex-wrap gap-3 mb-8">
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> 99.9% Uptime SLA</div>
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> 60-Day Onboarding Support</div>
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> &lt;100ms API Response</div>
            <div className="trust-pill flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><span className="ok text-emerald-500 font-bold">✓</span> GDPR Compliant</div>
          </div>
        </div>
      )
    },
    {
      id: 'gs-setup',
      title: '5-Minute Setup',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight font-syne">⚙️ 5-Minute Setup</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              No complex configurations. No DevOps. Connect your site and start tracking keywords in under 5 minutes.
            </p>
          </div>
          
          <div className="steps space-y-6">
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">1</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Create your account</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Sign up at <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">app.keywordpro.ai</a>. No credit card required for the free tier.</p>
              </div>
            </div>
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">2</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Add your domain</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Enter your website URL. Keyword Pro crawls and indexes your pages automatically in the background.</p>
              </div>
            </div>
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">3</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Connect Google Search Console (optional)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">OAuth one-click integration. Unlocks real impression and click data for your tracked keywords.</p>
              </div>
            </div>
            <div className="step flex gap-4 items-start">
              <div className="step-n w-8 h-8 rounded-full flex-shrink-0 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-syne font-bold text-blue-600 dark:text-blue-400">4</div>
              <div className="step-body">
                <h4 className="font-syne font-bold text-lg text-gray-900 dark:text-white mb-1">Generate your API key</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Go to Settings → API → Generate Key. Use it to automate reports and integrate with your stack.</p>
              </div>
            </div>
          </div>

          <div className="callout c-tip flex gap-3 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl items-start">
            <span className="ico2 text-xl flex-shrink-0 mt-0.5">💡</span>
            <p className="text-sm text-emerald-800 dark:text-emerald-400 m-0"><strong>Pakistan/India teams:</strong> Choose <code className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs">region: ap-south-1</code> during setup for lowest latency. Server costs drop by ~60% vs US regions.</p>
          </div>
        </div>
      )
    },
    {
      id: 'api-auth',
      title: 'API Authentication',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight font-syne">🔑 API Authentication</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              Secure your API requests using Bearer tokens. Learn how to authenticate and handle common errors.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">Authentication Method</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All API requests must include your API key in the <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-sm">Authorization</code> header as a Bearer token.
            </p>
            <div className="code-block bg-[#0a1422] rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-mono text-gray-400">cURL</span>
                <button 
                  onClick={() => handleCopy('curl -H "Authorization: Bearer YOUR_API_KEY" https://api.keywordpro.ai/v1/analyze', 'auth-curl')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copied === 'auth-curl' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                <code>curl -H "Authorization: Bearer YOUR_API_KEY" https://api.keywordpro.ai/v1/analyze</code>
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">Common Authentication Errors</h3>
            
            <div className="grid gap-4">
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-red-500 dark:text-red-400">401 Unauthorized</h4>
                  <span className="text-xs font-mono bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded">invalid_api_key</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">The provided API key is invalid, malformed, or has been revoked.</p>
                <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1 block">Solution</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verify your API key in the dashboard. Ensure there are no extra spaces when copying. If compromised, generate a new key immediately.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-red-500 dark:text-red-400">401 Unauthorized</h4>
                  <span className="text-xs font-mono bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded">missing_auth_header</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">The <code className="font-mono text-xs">Authorization</code> header is missing from your request.</p>
                <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1 block">Solution</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ensure you are sending the <code className="font-mono text-xs">Authorization: Bearer YOUR_KEY</code> header with every API call.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-amber-500 dark:text-amber-400">403 Forbidden</h4>
                  <span className="text-xs font-mono bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded">insufficient_permissions</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Your API key is valid, but your current plan does not allow access to this specific endpoint.</p>
                <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1 block">Solution</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upgrade your plan in the billing dashboard to access premium endpoints (e.g., Competitor Analysis).</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-blue-500 dark:text-blue-400">429 Too Many Requests</h4>
                  <span className="text-xs font-mono bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">rate_limit_exceeded</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">You have exceeded the number of allowed API requests for your current tier.</p>
                <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1 block">Solution</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Implement exponential backoff in your code. Check the <code className="font-mono text-xs">X-RateLimit-Reset</code> header to see when you can make requests again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'api-webhooks',
      title: 'API Webhooks',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight font-syne">🪝 API Webhooks</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              Subscribe to real-time event notifications to keep your system in sync with Keyword Pro without polling.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">Setting Up an Endpoint</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create an HTTPS endpoint on your server that accepts POST requests. Keyword Pro will send a JSON payload to this URL whenever a subscribed event occurs.
            </p>
            <div className="code-block bg-[#0a1422] rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-mono text-gray-400">Node.js / Express</span>
                <button 
                  onClick={() => handleCopy(`app.post('/webhooks/keyword-pro', express.json(), (req, res) => {\n  const event = req.body;\n  console.log('Received event:', event.type);\n  res.status(200).send('OK');\n});`, 'webhook-express')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copied === 'webhook-express' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                <code>{`app.post('/webhooks/keyword-pro', express.json(), (req, res) => {
  const event = req.body;
  
  // Handle the event
  console.log('Received event:', event.type);
  
  // Acknowledge receipt
  res.status(200).send('OK');
});`}</code>
              </pre>
            </div>
            <div className="callout c-tip flex gap-3 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl items-start mt-4">
              <span className="ico2 text-xl flex-shrink-0 mt-0.5">ℹ️</span>
              <p className="text-sm text-blue-800 dark:text-blue-400 m-0"><strong>Acknowledge quickly:</strong> Your endpoint must return a <code className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono text-xs">200 OK</code> status code within 3 seconds. Otherwise, we will retry the delivery.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">Verifying Signatures</h3>
            <p className="text-gray-600 dark:text-gray-400">
              To ensure the webhook was actually sent by Keyword Pro, verify the signature included in the <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-sm">X-KeywordPro-Signature</code> header using your webhook secret.
            </p>
            <div className="code-block bg-[#0a1422] rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-mono text-gray-400">Node.js</span>
                <button 
                  onClick={() => handleCopy(`const crypto = require('crypto');\n\nconst signature = req.headers['x-keywordpro-signature'];\nconst expectedSignature = crypto\n  .createHmac('sha256', process.env.WEBHOOK_SECRET)\n  .update(JSON.stringify(req.body))\n  .digest('hex');\n\nif (signature !== expectedSignature) {\n  return res.status(401).send('Invalid signature');\n}`, 'webhook-verify')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copied === 'webhook-verify' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                <code>{`const crypto = require('crypto');

const signature = req.headers['x-keywordpro-signature'];
const expectedSignature = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex');

if (signature !== expectedSignature) {
  return res.status(401).send('Invalid signature');
}`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">Available Events</h3>
            <div className="grid gap-4">
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-gray-900 dark:text-white">keyword.ranked_up</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Triggered when a tracked keyword moves up in search engine rankings.</p>
              </div>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-gray-900 dark:text-white">report.generated</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Triggered when a scheduled SEO report has finished generating and is ready for download.</p>
              </div>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono font-bold text-gray-900 dark:text-white">competitor.new_keyword</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Triggered when a tracked competitor starts ranking for a new keyword.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'serp-analysis',
      title: 'SERP Analysis',
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight font-syne">🎯 SERP Analysis</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
              Understand what it takes to rank on the first page of Google with our AI-powered SERP Analyzer.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">How it Works</h3>
            <p className="text-gray-600 dark:text-gray-400">
              The SERP Analyzer uses advanced AI models to deconstruct the top 10 search results for any given keyword. It provides actionable insights into competitor content, keyword difficulty, and ranking factors.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">1</span>
                  Enter Target Keyword
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Input the exact phrase you want to rank for. The tool will simulate a search and analyze the current top results.</p>
              </div>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">2</span>
                  Review Difficulty & Intent
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check the overall difficulty score (0-100) and the primary search intent (Informational, Transactional, etc.) to align your content strategy.</p>
              </div>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">3</span>
                  Analyze Competitors
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Examine the top 10 results. Look at their Domain Authority (DA), Page Authority (PA), word count, and estimated traffic.</p>
              </div>
              <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">4</span>
                  Optimize Your Content
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use the "Top Ranking Factors" and "Avg. Word Count" metrics as a blueprint for creating content that outperforms the current leaders.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-syne">Key Metrics Explained</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="font-bold text-gray-900 dark:text-white min-w-[120px]">Overall Difficulty:</span>
                <span>A composite score (0-100) indicating how hard it is to rank in the top 10. Scores above 70 are considered 'Hard'.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-900 dark:text-white min-w-[120px]">Search Intent:</span>
                <span>The primary goal of the user searching this keyword (e.g., learning something, buying a product, finding a specific website).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-900 dark:text-white min-w-[120px]">DA / PA:</span>
                <span>Domain Authority and Page Authority. Higher numbers indicate stronger, more authoritative competitors.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-8 reveal-on-scroll animate-slide-left">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Documentation</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between group ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {section.title}
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6 bg-blue-50 dark:bg-blue-500/10 rounded-[2rem] border border-blue-100 dark:border-blue-500/20">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="text-xs font-black text-blue-900 dark:text-blue-400 uppercase tracking-widest mb-2">Need Help?</h4>
            <p className="text-[10px] text-blue-700 dark:text-blue-300/70 font-medium leading-relaxed">
              Our support engineers are available 24/7 for Enterprise users.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl reveal-on-scroll animate-fade-in">
          {sections.find(s => s.id === activeSection)?.content}
        </main>
      </div>
    </div>
  );
};

