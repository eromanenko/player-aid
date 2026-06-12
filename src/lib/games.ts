import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const gamesDirectory = path.join(process.cwd(), 'src/content/games');

export interface GameMetadata {
  id: string;
  title: string;
  players?: string;
  time?: string;
}

export function getAllGames(lang: string): GameMetadata[] {
  const gameIds = fs.readdirSync(gamesDirectory);
  const allGames = gameIds.map((id) => {
    const fullPath = path.join(gamesDirectory, id, `rules.${lang}.md`);
    
    // Fallback to english if language doesn't exist
    const fallbackPath = path.join(gamesDirectory, id, `rules.en.md`);
    const targetPath = fs.existsSync(fullPath) ? fullPath : fallbackPath;

    if (!fs.existsSync(targetPath)) return null;

    const fileContents = fs.readFileSync(targetPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title || id,
      players: matterResult.data.players,
      time: matterResult.data.time,
    };
  }).filter(Boolean) as GameMetadata[];

  return allGames;
}

export function getGameData(id: string, lang: string) {
  const fullPath = path.join(gamesDirectory, id, `rules.${lang}.md`);
  const fallbackPath = path.join(gamesDirectory, id, `rules.en.md`);
  const targetPath = fs.existsSync(fullPath) ? fullPath : fallbackPath;

  if (!fs.existsSync(targetPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(targetPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as Omit<GameMetadata, 'id'>),
  };
}

export function getAllGameIds() {
  if (!fs.existsSync(gamesDirectory)) return [];
  const gameIds = fs.readdirSync(gamesDirectory);
  return gameIds.map((id) => ({ id }));
}
