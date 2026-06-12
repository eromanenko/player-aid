"use client"
import { useState } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { GameExpansion } from '../lib/games';

interface GameContentProps {
  content: string;
  expansions?: GameExpansion[];
}

export function GameContent({ content, expansions }: GameContentProps) {
  const [activeExpansions, setActiveExpansions] = useState<string[]>([]);

  const toggleExpansion = (id: string) => {
    setActiveExpansions(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {expansions && expansions.length > 0 && (
        <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Доповнення:</h3>
          <div className="flex flex-wrap gap-2">
            {expansions.map(exp => (
              <button
                key={exp.id}
                onClick={() => toggleExpansion(exp.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeExpansions.includes(exp.id)
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-foreground hover:bg-muted border-border'
                }`}
              >
                {activeExpansions.includes(exp.id) ? '✓ ' : '+ '}
                {exp.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="bg-card text-card-foreground rounded-xl border p-6 md:p-8 shadow-sm">
        <MarkdownRenderer content={content} activeExpansions={activeExpansions} />
      </div>
    </div>
  );
}
