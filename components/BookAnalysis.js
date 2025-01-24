'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Users, BookOpen, Smile, Layers } from 'lucide-react';

export const BookAnalysis = ({ bookContent }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [analysis, setAnalysis] = useState({
    characters: null,
    summary: null,
    sentiment: null,
    themes: null,
  });
  const [loading, setLoading] = useState(false);

  const analyzeContent = async (type) => {
    if (!bookContent) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: bookContent, 
          analysisType: type 
        }),
      });

      const { result } = await response.json();
      setAnalysis(prev => ({
        ...prev,
        [type]: result.split('\n').filter(line => line.trim())
      }));
      setActiveTab(type);
    } finally {
      setLoading(false);
    }
  };

  const AnalysisTab = ({ type, icon, label }) => (
    <Button
      variant={activeTab === type ? 'secondary' : 'ghost'}
      onClick={() => analyzeContent(type)}
      disabled={loading}
      className="flex-col h-auto py-3 px-4 gap-2 text-sm"
    >
      {icon}
      {label}
    </Button>
  );

  return (
    <div className="bg-background rounded-xl shadow-sm border border-border p-6">
      <div className="flex gap-2 pb-4 mb-4 overflow-x-auto scrollbar-hide">
        <AnalysisTab
          type="summary"
          icon={<BookOpen className="w-5 h-5" />}
          label="Summary"
        />
        <AnalysisTab
          type="characters"
          icon={<Users className="w-5 h-5" />}
          label="Key Figures"
        />
        <AnalysisTab
          type="sentiment"
          icon={<Smile className="w-5 h-5" />}
          label="Sentiment"
        />
        <AnalysisTab
          type="themes"
          icon={<Layers className="w-5 h-5" />}
          label="Themes"
        />
      </div>

      <div className="min-h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          </div>
        ) : analysis[activeTab] ? (
          <div className="prose prose-sm dark:prose-invert">
            {analysis[activeTab].map((line, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {line.replace(/^\d+\.\s*/, '')} 
              </p>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>Select an analysis type to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};