"use client";

import Link from 'next/link';
import Image from 'next/image';
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

  // Prepend basePath for Github Pages since unoptimized Image ignores it
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const imageSrc = thumbnail ? (thumbnail.startsWith('/') ? `${basePath}${thumbnail}` : thumbnail) : undefined;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleHiddenGame(id);
  };

  return (
    <div className="relative block group">
      <Link href={`/${lang}/games/${id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-[12px] relative">
        <div 
          className={`relative aspect-[1200/630] w-full overflow-hidden shadow-sm transition-all duration-300 ease-out ${filterMode === 'all' && !isSelected ? 'opacity-60 grayscale' : 'bg-card group-hover:shadow-xl group-hover:-translate-y-1'}`}
          style={{ border: '2px solid', borderRadius: '12px' }}
        >
          
          {/* Background Image Area */}
          <div className="absolute inset-0 w-full h-full bg-muted">
            {imageSrc ? (
              <>
                <Image 
                  src={imageSrc} 
                  alt={title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                {/* Overlay Gradients for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent transition-opacity duration-300 group-hover:opacity-95"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent dark:from-black/50 dark:to-transparent"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-indigo-500/80 dark:to-purple-700/80"></div>
            )}
          </div>
          
          {/* Content Area */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-10">
            <div className="transform transition-transform duration-300 ease-out translate-y-1 group-hover:translate-y-0">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight drop-shadow-sm dark:drop-shadow-md line-clamp-2">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </Link>
      
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
    </div>
  );
}
