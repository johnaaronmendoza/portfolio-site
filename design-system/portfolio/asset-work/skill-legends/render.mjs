// node render.mjs <svg-dir> <png-dir> <size> [<size> ...]  -> <png-dir>/<key>-<size>.png (transparent)
import { createRequire } from 'node:module';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = createRequire(import.meta.url)('playwright');
const [dir, out, ...sizes] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage();
for (const f of readdirSync(dir).filter(f => f.endsWith('.svg')).sort()) {
  for (const s of sizes.map(Number)) {
    await p.setViewportSize({ width: s, height: s });
    await p.goto(pathToFileURL(resolve(join(dir, f))).href);
    await p.screenshot({ path: join(out, `${f.replace('.svg', '')}-${s}.png`), omitBackground: true });
  }
}
await b.close();
