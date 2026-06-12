import { Header } from "../../components/Header";
import { GameList } from "@/components/GameList";
import { getAllGames } from "@/lib/games";

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'uk' }, { lang: 'ru' }];
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const games = await getAllGames(lang);
  
  return (
    <>
      <Header currentLang={lang} showSearch={true} />
      <main className="flex-1 container mx-auto max-w-4xl p-4 py-8">
        <GameList games={games} lang={lang} />
      </main>
    </>
  );
}
