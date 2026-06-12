"use client"

import { useState } from 'react';
import { GameCard } from './GameCard';
import { GameMetadata } from '../lib/games';

interface GameListProps {
  games: GameMetadata[];
  lang: string;
}

export function GameList({ games, lang }: GameListProps) {
  const [query, setQuery] = useState('');

  const filteredGames = games.filter(game => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      game.title.toLowerCase().includes(lowerQuery) || 
      (game.searchTerms && game.searchTerms.includes(lowerQuery))
    );
  });

  return (
    <div>
      <div className="mb-8">
        <input 
          type="search" 
          placeholder={lang === 'uk' ? 'Пошук ігор...' : lang === 'ru' ? 'Поиск игр...' : 'Search games...'}
          className="w-full px-5 py-4 rounded-xl border border-input bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              players={game.players}
              time={game.time}
              lang={lang}
              thumbnail={game.thumbnail}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground text-lg">
            {lang === 'uk' ? 'Ігор не знайдено 😕' : lang === 'ru' ? 'Игры не найдены 😕' : 'No games found 😕'}
          </div>
        )}
      </div>
    </div>
  );
}
