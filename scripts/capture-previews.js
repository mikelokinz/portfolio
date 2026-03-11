import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  { id: 'movie-app', url: 'https://movie-sigma-bay.vercel.app/' },
  { id: 'samsung-clone', url: 'https://samsung-clone-gules.vercel.app/' },
  { id: 'task-manager', url: 'https://task-manager-opal-ten.vercel.app/' },
  { id: 'weather-app', url: 'https://weather-omega-blue-93.vercel.app/' },
  { id: 'tripadvisor-clone', url: 'https://mikelokinz.github.io/Tripadvisor/html/loading.html' },
  { id: 'udemy-showcase', url: 'https://mikelokinz.github.io/udemy/html/page.html' },
  { id: 'lootish', url: 'https://mikelokinz.github.io/Lootish/' },
  { id: 'juego', url: 'https://mikelokinz.github.io/Juego/' }
];

const PREVIEWS_DIR = path.join(__dirname, '../src/assets/projects/previews');

if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log('Starting screenshot capture for 8 projects...');
  const browser = await puppeteer.launch({ 
      headless: 'new',
      defaultViewport: { width: 1440, height: 900 } 
  });

  for (const project of projects) {
    console.log(`Current project: ${project.id} -> ${project.url}`);
    const page = await browser.newPage();
    try {
      // Go to URL and wait for network to be idle to ensure assets load
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60000 });
      
      // Some extra time for animations/images to settle
      await new Promise(r => setTimeout(r, 2000));
      
      const screenshotPath = path.join(PREVIEWS_DIR, `${project.id}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`✅ Successfully captured ${project.id}.png`);
    } catch (error) {
       console.error(`❌ Failed to capture ${project.id}:`, error.message);
    } finally {
       await page.close();
    }
  }

  await browser.close();
  console.log('Finished capturing screenshots.');
}

captureScreenshots();
