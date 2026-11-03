#!/usr/bin/env node
// Render an HTML page (or a bare SVG) to PNG at one or more sizes with Playwright.
// Local stand-in for design-agent's /workspace/tools/html2png.mjs.
//
//   node html2png.mjs <page.html|file.svg> --out <dir> --name <base> --size 1200x630 [--size 1080x1080]
//        [--scale 2] [--transparent] [--require-font "Press Start 2P"]
//
// Writes <out>/<name>-<W>x<H>.png per size and prints one JSON line.
// Exit 1: page error, failed request or a required font that did not load.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync } from 'node:fs';
// require() resolves a local or globally installed Playwright (NODE_PATH); ESM import would not
const { chromium } = createRequire(import.meta.url)('playwright');
import { resolve, join, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const input = args.shift();
const opt = { sizes: [], fonts: [], scale: 1, transparent: false, out: '.', name: 'render' };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--out') opt.out = args[++i];
  else if (a === '--name') opt.name = args[++i];
  else if (a === '--size') opt.sizes.push(args[++i]);
  else if (a === '--scale') opt.scale = Number(args[++i]);
  else if (a === '--transparent') opt.transparent = true;
  else if (a === '--require-font') opt.fonts.push(args[++i]);
}
if (!input || !opt.sizes.length) {
  console.error('usage: html2png.mjs <page.html|file.svg> --out dir --name base --size WxH [...]');
  process.exit(2);
}
mkdirSync(opt.out, { recursive: true });
const url = pathToFileURL(resolve(input)).href;
const isSvg = extname(input).toLowerCase() === '.svg';

const browser = await chromium.launch();
const written = [];
let failed = null;
try {
  for (const s of opt.sizes) {
    const [width, height] = s.split('x').map(Number);
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: opt.scale });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
    if (isSvg) {
      // Inline as a data URI (an about:blank page may not load file:// URLs);
      // fit to the viewport with pixel edges kept crisp
      const data = `data:image/svg+xml;base64,${readFileSync(resolve(input)).toString('base64')}`;
      await page.setContent(
        `<html><body style="margin:0;background:transparent;display:grid;place-items:center;width:100vw;height:100vh">` +
          `<img src="${data}" style="width:100%;height:100%;object-fit:contain;image-rendering:pixelated"></body></html>`
      );
    } else {
      await page.goto(url, { waitUntil: 'networkidle' });
    }
    await page.evaluate(() => document.fonts.ready);
    for (const f of opt.fonts) {
      const ok = await page.evaluate((fam) => document.fonts.check(`16px "${fam}"`), f);
      if (!ok) errors.push(`font did not load: ${f}`);
    }
    if (errors.length) { failed = { size: s, errors }; await page.close(); break; }
    const file = join(opt.out, `${opt.name}-${width}x${height}.png`);
    await page.screenshot({ path: file, omitBackground: opt.transparent });
    written.push(file);
    await page.close();
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify({ ok: !failed, written, failed }));
process.exit(failed ? 1 : 0);
