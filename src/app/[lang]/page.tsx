import { GameCard } from "../../components/GameCard";
import { Header } from "../../components/Header";
import { getAllGames } from "../../lib/games";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const games = getAllGames(lang);

  return (
    <>
      <Header currentLang={lang} />
      <main className="flex-1 container mx-auto max-w-4xl p-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          {lang === 'uk' ? 'Всі ігри' : lang === 'ru' ? 'Все игры' : 'All Games'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              players={game.players}
              time={game.time}
              lang={lang}
            />
          ))}
        </div>
      </main>
    </>
  );
}
