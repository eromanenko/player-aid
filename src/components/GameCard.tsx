"use client";

import Link from 'next/link';
import { useSettings } from '../contexts/SettingsContext';
import { Check } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  players?: string;
  time?: string;
  lang: string;
  thumbnail?: string;
}

export function GameCard({ id, title, players, time, lang, thumbnail }: GameCardProps) {
  const { filterMode, hiddenGames, toggleHiddenGame } = useSettings();
  const isSelected = !hiddenGames.includes(id);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleHiddenGame(id);
  };

  return (
    <Link href={`/${lang}/games/${id}`} className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-2xl relative">
      <div className={`relative aspect-[1200/630] w-full rounded-2xl overflow-hidden shadow-sm border ${filterMode === 'all' && !isSelected ? 'border-border/30 opacity-60 grayscale transition-all' : 'border-border/50 bg-card transition-all duration-300 ease-out group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1'}`}>
        
        {/* Background Image Area */}
        <div className="absolute inset-0 w-full h-full bg-muted">
          {thumbnail ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={thumbnail} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />
              {/* Overlay Gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 to-purple-700/80"></div>
          )}
        </div>
        
        {/* Content Area */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-10">
          <div className="transform transition-transform duration-300 ease-out translate-y-1 group-hover:translate-y-0">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md line-clamp-2">
              {title}
            </h2>
          </div>
        </div>
      </div>
      
      {/* Selection Checkbox overlay */}
      {filterMode === 'all' && (
        <button 
          onClick={handleCheckboxClick}
          className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-primary border-primary text-primary-foreground shadow-md' : 'bg-black/40 border-white/40 text-transparent hover:bg-black/60 hover:border-white/70'}`}
          aria-label={isSelected ? "Remove from selected" : "Add to selected"}
        >
          <Check className="w-5 h-5" />
        </button>
      )}
    </Link>
  );
}
