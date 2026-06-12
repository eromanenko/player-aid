const fs = require('fs');
const path = require('path');

const newGames = [
  { id: 'faraway', bggId: 385761, title: 'Faraway', players: '2-6', time: '15' },
  { id: 'gubs', bggId: 31808, title: 'GUBS', players: '2-6', time: '20' },
  { id: 'the-isle-of-cats', bggId: 281259, title: 'The Isle of Cats', players: '1-4', time: '60' },
  { id: 'half-and-seek', bggId: 424581, title: 'Half and Seek', players: '2-5', time: '20' },
  { id: 'quacks', bggId: 244521, title: 'The Quacks of Quedlinburg', players: '2-4', time: '45' },
  { id: 'splendor', bggId: 148228, title: 'Splendor', players: '2-4', time: '30' },
  { id: 'alices-garden', bggId: 298635, title: "Alice's Garden", players: '1-4', time: '30' },
  { id: 'celestia', bggId: 175117, title: 'Celestia', players: '2-6', time: '30' },
  { id: 'celestia-a-little-initiative', bggId: 255137, title: 'Celestia: A Little Initiative', players: '2-6', time: '15' },
  { id: 'medieval-academy', bggId: 154386, title: 'Medieval Academy', players: '2-5', time: '30' },
  { id: 'timeline-inventions', bggId: 85256, title: 'Timeline: Inventions', players: '2-8', time: '15' },
  { id: 'top-ten', bggId: 300905, title: 'Top Ten', players: '4-9', time: '30' },
  { id: 'trio', bggId: 352515, title: 'Trio', players: '3-6', time: '15' },
  { id: 'hadara', bggId: 269144, title: 'Hadara', players: '2-5', time: '45' },
  { id: 'ribbit', bggId: 9441, title: 'Ribbit', players: '2-4', time: '15' },
];

const langs = ['uk', 'ru', 'en'];

newGames.forEach(game => {
  const dir = path.join(__dirname, 'src/content/games', game.id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  langs.forEach(lang => {
    const filePath = path.join(dir, `rules.${lang}.md`);
    
    let titleStr = game.title;
    let emptyRules = "Опис правил з'явиться тут незабаром...";
    if (lang === 'ru') emptyRules = "Описание правил появится здесь скоро...";
    if (lang === 'en') emptyRules = "Rules description will appear here soon...";

    // Customize title per language if known (optional, using English for now as default)
    
    const content = `---
title: "${titleStr}"
players: "${game.players}"
time: "${game.time}"
bggId: ${game.bggId}
---

${emptyRules}
`;
    
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(`Created ${filePath}`);
    } else {
      console.log(`Skipped ${filePath} (already exists)`);
    }
  });
});
