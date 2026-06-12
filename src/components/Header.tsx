"use client";

import Link from "next/link";
import { Settings, Search } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";
import { useSettings } from "../contexts/SettingsContext";
import { MeepleIcon } from "./MeepleIcon";

interface HeaderProps {
  currentLang: string;
  title?: string;
  showSearch?: boolean;
}

export function Header({ currentLang, title, showSearch }: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSettings();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-4xl flex h-14 items-center justify-between px-4 gap-4">
          <Link href={`/${currentLang}`} className="flex items-center space-x-2 truncate shrink-0 group">
            <MeepleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-primary shrink-0 transition-transform group-hover:scale-110" />
            <span className="font-bold text-lg sm:text-xl tracking-tight text-primary truncate">
              {title || "Player Aid"}
            </span>
          </Link>
          
          {showSearch && (
            <div className="flex-1 max-w-sm relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={currentLang === 'uk' ? 'Пошук ігор...' : currentLang === 'ru' ? 'Поиск игр...' : 'Search games...'}
                className="w-full bg-muted/50 rounded-full border-none pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile search bar if we want it visible always */}
        {showSearch && (
          <div className="sm:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={currentLang === 'uk' ? 'Пошук ігор...' : currentLang === 'ru' ? 'Поиск игр...' : 'Search games...'}
                className="w-full bg-muted/50 rounded-full border-none pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentLang={currentLang} 
      />
    </>
  );
}
