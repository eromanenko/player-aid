"use client"

import { GameCard } from './GameCard';
import { GameMetadata } from '../lib/games';
import { useSettings } from '../contexts/SettingsContext';

interface GameListProps {
  games: GameMetadata[];
  lang: string;
}

export function GameList({ games, lang }: GameListProps) {
  const { searchQuery, filterMode, hiddenGames } = useSettings();

  const filteredGames = games.filter(game => {
    // Check if game should be hidden in 'selected' mode
    if (filterMode === 'selected' && hiddenGames.includes(game.id)) {
      return false;
    }

    // Apply search filter
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      game.title.toLowerCase().includes(lowerQuery) || 
      (game.searchTerms && game.searchTerms.includes(lowerQuery))
    );
  });

  return (
    <div>
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
