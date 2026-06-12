import Link from "next/link";
import { Users, Clock } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  players?: string;
  time?: string;
  lang: string;
}

export function GameCard({ id, title, players, time, lang }: GameCardProps) {
  return (
    <Link href={`/${lang}/games/${id}`} className="block group">
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {players && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{players}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{time} min</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
