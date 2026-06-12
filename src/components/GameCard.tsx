import Link from 'next/link';

interface GameCardProps {
  id: string;
  title: string;
  players?: string;
  time?: string;
  lang: string;
  thumbnail?: string;
}

export function GameCard({ id, title, players, time, lang, thumbnail }: GameCardProps) {
  return (
    <Link href={`/${lang}/games/${id}`} className="block group h-full">
      <div className="bg-card text-card-foreground rounded-xl border border-border p-6 shadow-sm transition-all hover:shadow-md hover:border-primary flex flex-col h-full overflow-hidden relative">
        {thumbnail && (
          <div className="absolute top-6 right-6 w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0 shadow-sm border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className={`flex-1 flex flex-col ${thumbnail ? 'pr-16' : ''}`}>
          <h2 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">{title}</h2>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-auto">
            {players && <span className="flex items-center gap-1">👥 {players}</span>}
            {time && <span className="flex items-center gap-1">⏳ {time}m</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
