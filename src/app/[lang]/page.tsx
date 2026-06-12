import { Header } from "../../components/Header";
import { GameList } from "@/components/GameList";
import { getAllGames } from "@/lib/games";

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const games = await getAllGames(lang);
  
  return (
    <>
      <Header currentLang={lang} />
      <main className="flex-1 container mx-auto max-w-4xl p-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          {lang === 'uk' ? 'Всі ігри' : lang === 'ru' ? 'Все игры' : 'All Games'}
        </h1>
        
        <GameList games={games} lang={lang} />
      </main>
    </>
  );
}
