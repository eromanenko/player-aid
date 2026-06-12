import { getGameData, getAllGameIds } from "../../../../lib/games";
import { MarkdownRenderer } from "../../../../components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Header } from "../../../../components/Header";

export async function generateStaticParams() {
  const games = getAllGameIds();
  const locales = ['uk', 'en', 'ru'];
  
  const params = [];
  for (const locale of locales) {
    for (const game of games) {
      params.push({ lang: locale, id: game.id });
    }
  }
  return params;
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const gameData = getGameData(id, lang);

  if (!gameData) {
    notFound();
  }

  return (
    <>
      <Header currentLang={lang} title={gameData.title} />
      <main className="flex-1 container mx-auto max-w-4xl p-4 py-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {lang === 'uk' ? 'Назад до списку' : lang === 'ru' ? 'Назад к списку' : 'Back to list'}
        </Link>
        
        <div className="flex gap-4 text-sm text-muted-foreground mb-8">
          {gameData.players && <span>👥 {gameData.players}</span>}
          {gameData.time && <span>⏳ {gameData.time} min</span>}
        </div>

        <div className="bg-card text-card-foreground rounded-xl border p-6 md:p-8 shadow-sm">
          <MarkdownRenderer content={gameData.content} />
        </div>
      </main>
    </>
  );
}
