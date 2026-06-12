const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const games = [
  { id: 'dnup', bggId: 432456 },
  { id: 'sea-salt-paper', bggId: 367220 },
  { id: '7-wonders', bggId: 316377 },
  { id: '7-wonders-architects', bggId: 346703 },
  { id: 'azul', bggId: 230802 },
  { id: 'azul-duel', bggId: 431038 },
  { id: 'azul-summer-pavilion', bggId: 287954 },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // set user agent to avoid basic blocks
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  for (const game of games) {
    console.log(`Processing ${game.id}...`);
    try {
      await page.goto(`https://boardgamegeek.com/boardgame/${game.bggId}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // wait for og:image to be present
      await page.waitForSelector('meta[property="og:image"]', { timeout: 15000 });
      
      const imageUrl = await page.evaluate(() => {
        const meta = document.querySelector('meta[property="og:image"]');
        return meta ? meta.content : null;
      });

      if (imageUrl) {
        console.log(`Found image for ${game.id}: ${imageUrl}`);
        const destDir = path.join(__dirname, 'src/content/games', game.id);
        const destPath = path.join(destDir, 'cover.jpg');
        
        // Also save to public folder so Next.js can serve it statically
        const publicDir = path.join(__dirname, 'public/games', game.id);
        const publicPath = path.join(publicDir, 'cover.jpg');
        
        // Ensure directories exist
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
        
        await download(imageUrl, publicPath);
        fs.copyFileSync(publicPath, destPath);
        console.log(`Downloaded to ${destPath} and ${publicPath}`);

        // Update markdown files to include thumbnail: /images/games/[id]/cover.jpg? Wait, we can just use the public folder!
        // Actually, the user asked to save it "в кожну папку гри". So src/content/games/[game-id]/cover.jpg is what they asked for.
        // We will need to adjust our code to serve or import these images.
      } else {
        console.log(`No image found for ${game.id}`);
      }
    } catch (e) {
      console.error(`Error processing ${game.id}:`, e.message);
    }
  }

  await browser.close();
}

run();
