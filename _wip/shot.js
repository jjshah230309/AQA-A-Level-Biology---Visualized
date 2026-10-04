// usage: node shot.js out.png [w h dpr waitMs "js to eval before shot" "js2 after wait2" wait2]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const http = require('http'), fs = require('fs'), path = require('path');
(async () => {
  const [out, w = 1280, h = 720, dpr = 1, wait = 4000, pre = '', post = '', wait2 = 0] = process.argv.slice(2);
  const file = process.env.PAGE || path.join(__dirname, 'index.html');
  let reqs = [];
  const srv = http.createServer((q, r) => { reqs.push(q.url); r.setHeader('content-type', 'text/html'); r.end(fs.readFileSync(file)); }).listen(0);
  const port = srv.address().port;
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=swiftshader', '--ignore-gpu-blocklist'] });
  const pg = await br.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
  const logs = [];
  pg.on('console', m => logs.push(m.type() + ': ' + m.text()));
  pg.on('pageerror', e => logs.push('PAGEERROR: ' + e.message + '\n' + (e.stack || '')));
  pg.on('request', r => { if (!r.url().startsWith('http://localhost:' + port + '/')) logs.push('EXTERNAL REQUEST: ' + r.url()); });
  await pg.goto('http://localhost:' + port + '/');
  if (pre) { await pg.waitForTimeout(500); await pg.evaluate(pre); }
  await pg.waitForTimeout(+wait);
  if (post) { await pg.evaluate(post); await pg.waitForTimeout(+wait2 || 1500); }
  await pg.screenshot({ path: out });
  const info = await pg.evaluate(() => window.AQA ? ({ cam: window.AQA.cam, k: window.AQA.k, tiles: window.AQA.TILES.size, jobs: window.AQA.JOBS.size, press: { on: window.AQA.press.on, pass: window.AQA.press.pass, sweep: window.AQA.press.sweep }, tour: window.AQA.tour.state }) : null);
  console.log(JSON.stringify(info));
  console.log('requests:', reqs.length, reqs.join(','));
  logs.slice(0, 30).forEach(l => console.log(l));
  await br.close(); srv.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
