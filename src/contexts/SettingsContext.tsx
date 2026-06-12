"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FilterMode = 'all' | 'selected';

interface SettingsContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
  hiddenGames: string[];
  toggleHiddenGame: (id: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('selected');
  const [hiddenGames, setHiddenGames] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const storedMode = localStorage.getItem('games_filter_mode');
      if (storedMode === 'all' || storedMode === 'selected') {
        setFilterMode(storedMode);
      }
      const storedHidden = localStorage.getItem('disabled_games');
      if (storedHidden) {
        setHiddenGames(JSON.parse(storedHidden));
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('games_filter_mode', filterMode);
  }, [filterMode, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('disabled_games', JSON.stringify(hiddenGames));
  }, [hiddenGames, mounted]);

  const toggleHiddenGame = (id: string) => {
    setHiddenGames(prev => {
      if (prev.includes(id)) {
        return prev.filter(gameId => gameId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <SettingsContext.Provider value={{
      searchQuery,
      setSearchQuery,
      filterMode,
      setFilterMode,
      hiddenGames,
      toggleHiddenGame
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
