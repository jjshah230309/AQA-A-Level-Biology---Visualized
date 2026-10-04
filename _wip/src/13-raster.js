/* ===================== 13 RASTER: plates -> halftone -> riso composite -> tile cache ===================== */
const TILE = 512, MARGIN = 24, PW = TILE + 2 * MARGIN, LOD_N = 13;
const lodScale = k => 0.25 * Math.pow(2, k / 2);
const lodFor = s => clamp(Math.ceil(2 * Math.log2(s / 0.25) - 1e-6), 0, LOD_N - 1);
/* per-ink misregistration: [dx, dy] world units, rotation (rad) about sheet centre */
const MISREG = [[0, 0, 0], [0.62, -0.4, 0.00019], [-0.48, 0.52, -0.00023], [0.3, 0.46, 0.00012]];
const SHEET = { x0: 0, y0: 0, x1: 4000, y1: 3000 };
const LAYERS = [];
const KR = INK_ORDER.map(c => INK[c].rgb.map(v => 1 - v / 255));

/* ---------- screens (integer-lattice clustered dots, exactly periodic) ---------- */
const LATSETS = [
  { Y: [4, 0], P: [1, 4], T: [4, 1], B: [3, 3] },
  { Y: [6, 0], P: [2, 7], T: [7, 2], B: [5, 5] },
  { Y: [9, 0], P: [3, 10], T: [10, 3], B: [7, 7] },
];
function makeScreen(m, n) {
  const P = m * m + n * n, N = P * P, f = new Float32Array(N), nz = mulberry32(m * 131 + n * 17 + 7);
  for (let y = 0; y < P; y++) for (let x = 0; x < P; x++) {
    const u = ((x + .5) * m + (y + .5) * n) / P, v = (-(x + .5) * n + (y + .5) * m) / P;
    f[y * P + x] = (2 - (Math.cos(TAU * u) + Math.cos(TAU * v))) / 4 + nz() * 1e-4;
  }
  const order = Array.from({ length: N }, (_, i) => i).sort((a, b) => f[a] - f[b]);
  const t = new Float32Array(N);
  for (let r = 0; r < N; r++) t[order[r]] = (r + 0.5) / N;
  return { P, t };
}
const SCREENS = LATSETS.map(set => INK_ORDER.map(c => makeScreen(set[c][0], set[c][1])));
const JIT = (() => { const a = new Float32Array(97 * 101), r = mulberry32(4242); for (let i = 0; i < a.length; i++) a[i] = (r() - 0.5) * 0.11; return a; })();
/* paper grain 509 x 503 (packed RGB), with fibres */
const PAPER_W = 509, PAPER_H = 503;
const PAPER_PX = (() => {
  const r = mulberry32(99), n = PAPER_W * PAPER_H, f = new Float32Array(n);
  const G = 48, grid = new Float32Array(G * G); for (let i = 0; i < grid.length; i++) grid[i] = r() * 2 - 1;
  for (let y = 0; y < PAPER_H; y++) for (let x = 0; x < PAPER_W; x++) {
    const gx = x / PAPER_W * G, gy = y / PAPER_H * G, ix = gx | 0, iy = gy | 0, fx = gx - ix, fy = gy - iy;
    const a = grid[iy % G * G + ix % G], b = grid[iy % G * G + (ix + 1) % G], c = grid[(iy + 1) % G * G + ix % G], d = grid[(iy + 1) % G * G + (ix + 1) % G];
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    f[y * PAPER_W + x] = (a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy) * 0.012 + (r() - 0.5) * 0.034;
  }
  for (let i = 0; i < 1400; i++) { // fibres
    let x = r() * PAPER_W, y = r() * PAPER_H; const a = r() * TAU, L = 5 + r() * 16, s = (r() - 0.5) * 0.07;
    for (let j = 0; j < L; j++) { const px = (((x + Math.cos(a) * j) | 0) + PAPER_W) % PAPER_W, py = (((y + Math.sin(a) * j) | 0) + PAPER_H) % PAPER_H; f[py * PAPER_W + px] += s; }
  }
  const o = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    const k = 1 + f[i];
    const rr = clamp(PAPER[0] * k, 0, 255) | 0, gg = clamp(PAPER[1] * k, 0, 255) | 0, bb = clamp(PAPER[2] * k, 0, 255) | 0;
    o[i] = (bb << 16) | (gg << 8) | rr;
  }
  return o;
})();
/* ink density maps: roller streaks, starved patches, dropout specks (per ink) */
const DENS = INK_ORDER.map((c, ink) => {
  const r = mulberry32(777 + ink * 101), d = new Uint8Array(256 * 256);
  const rowN = new Float32Array(256), colN = new Float32Array(256);
  const smoothArr = (arr, w) => { for (let p = 0; p < 2; p++) { const t = arr.slice(); for (let i = 0; i < 256; i++) { let s = 0; for (let j = -w; j <= w; j++) s += t[(i + j + 256) % 256]; arr[i] = s / (2 * w + 1); } } };
  for (let i = 0; i < 256; i++) { rowN[i] = r() - 0.5; colN[i] = r() - 0.5; } smoothArr(rowN, 4); smoothArr(colN, 9);
  const f = new Float32Array(65536);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) f[y * 256 + x] = 0.965 + rowN[y] * 0.2 + colN[x] * 0.07 + (r() - 0.5) * 0.04;
  for (let b = 0; b < 7; b++) { // starved patches
    const cx = r() * 256, cy = r() * 256, rr = 18 + r() * 40, dep = 0.12 + r() * 0.18;
    for (let y = -rr * 1.3 | 0; y < rr * 1.3; y++) for (let x = -rr * 1.3 | 0; x < rr * 1.3; x++) {
      const dd = Math.hypot(x, y) / rr; if (dd < 1) f[((cy + y | 0) + 256) % 256 * 256 + ((cx + x | 0) + 256) % 256] -= dep * (1 - dd) * (1 - dd);
    }
  }
  for (let i = 0; i < 90; i++) { // specks / dropouts
    const cx = r() * 256 | 0, cy = r() * 256 | 0, s = 1 + (r() * 3 | 0);
    for (let y = 0; y < s; y++) for (let x = 0; x < s + (r() < 0.4 ? 1 : 0); x++) f[((cy + y) % 256) * 256 + (cx + x) % 256] = 0;
  }
  for (let i = 0; i < 65536; i++) d[i] = clamp(f[i], 0, 1) * 255;
  return d;
});

/* ---------- plates ---------- */
const plates = [], pctx = [];
function initPlates() {
  for (let i = 0; i < 4; i++) {
    const c = document.createElement('canvas'); c.width = c.height = PW;
    plates.push(c); pctx.push(c.getContext('2d', { willReadFrequently: true }));
  }
}

/* ---------- display-list cache ---------- */
const DLC = new Map(); let dlBytes = 0, DL_BUDGET = 120e6, dlTick = 0;
function recordLayer(layer, v, lo) {
  const dl = new DL();
  const R = new Recorder(dl, hashStr(layer.id), v); R.lo = !!lo;
  R.push(layer.ox || 0, layer.oy || 0);
  layer.draw(R, layer);
  return dl.done();
}
function getDL(layer, v, lo) {
  const key = layer.id + '|' + v + (lo ? 'L' : '');
  let e = DLC.get(key);
  if (e) { e.t = ++dlTick; return e.dl; }
  const dl = recordLayer(layer, v, lo);
  DLC.set(key, { dl, t: ++dlTick }); dlBytes += dl.bytes();
  if (dlBytes > DL_BUDGET) {
    const arr = [...DLC.entries()].sort((a, b) => a[1].t - b[1].t);
    for (const [k, en] of arr) { if (dlBytes <= DL_BUDGET * 0.7) break; if (en.t === dlTick) continue; DLC.delete(k); dlBytes -= en.dl.bytes(); }
  }
  return dl;
}
const hasDL = (layer, v, lo) => DLC.has(layer.id + '|' + v + (lo ? 'L' : ''));

function drawDL(dl, S, cx0, cy0, cx1, cy1) {
  const b = dl.b, N = dl.n, ctx = pctx;
  let n = 0; const minPx = 0.28 / S;
  for (let i = 0; i < N;) {
    const kind = b[i], np = b[i + 3], len = kind === 0 ? 8 + np * 2 : 11;
    const bx0 = b[i + 4], by0 = b[i + 5], bx1 = b[i + 6], by1 = b[i + 7];
    if (bx1 < cx0 || bx0 > cx1 || by1 < cy0 || by0 > cy1 || (bx1 - bx0 < minPx && by1 - by0 < minPx)) { i += len; continue; }
    const fl = b[i + 1] | 0, al = b[i + 2], solid = (fl & F_SOLID) !== 0;
    if (fl & F_KNOCK) {
      for (let k = 0; k < 4; k++) {
        const c = ctx[k]; c.globalCompositeOperation = 'destination-out'; c.globalAlpha = al; c.fillStyle = '#000';
        c.beginPath(); c.moveTo(b[i + 8], b[i + 9]); for (let j = 1; j < np; j++) c.lineTo(b[i + 8 + j * 2], b[i + 9 + j * 2]); c.closePath(); c.fill();
        c.globalCompositeOperation = 'source-over';
      }
    } else {
      for (let k = 0; k < 4; k++) {
        if (!(fl & (1 << k))) continue;
        const c = ctx[k]; c.globalAlpha = al; c.fillStyle = solid ? '#fff' : '#000';
        c.beginPath();
        if (kind === 0) { c.moveTo(b[i + 8], b[i + 9]); for (let j = 1; j < np; j++) c.lineTo(b[i + 8 + j * 2], b[i + 9 + j * 2]); c.closePath(); }
        else c.arc(b[i + 8], b[i + 9], b[i + 10], 0, TAU);
        c.fill();
      }
    }
    i += len; if ((++n & 1023) === 0) { /* caller may yield between layers only */ }
  }
}

/* ---------- halftone + composite for a block of rows ---------- */
function amtFor(dd, idx, tab, P, gx, gy, dn, dsh) {
  const a = dd[idx * 4 + 3];
  if (a === 0) return 0;
  let amt;
  if (dd[idx * 4] >= 128) { amt = a * (1.3 / 255); if (amt > 1) amt = 1; }
  else {
    const t = tab[(gy % P) * P + (gx % P)] + JIT[(gy % 101) * 97 + (gx % 97)];
    amt = (a / 255 - t) * 7 + 0.5;
    if (amt <= 0) return 0; if (amt > 1) amt = 1;
  }
  return amt * dn[(((gy >> dsh) & 255) << 8) | ((gx >> dsh) & 255)] * (1 / 255);
}
function htChunk(H, ya, yb) {
  const d0 = H.d[0], d1 = H.d[1], d2 = H.d[2], d3 = H.d[3], u0 = H.u[0], u1 = H.u[1], u2 = H.u[2], u3 = H.u[3];
  const out = H.out, st = H.st, scr = H.scr, dsh = H.dsh;
  const s0 = scr[0], s1 = scr[1], s2 = scr[2], s3 = scr[3];
  const dn0 = DENS[0], dn1 = DENS[1], dn2 = DENS[2], dn3 = DENS[3];
  const gx0 = H.tx * TILE, gy0 = H.ty * TILE;
  const k00 = KR[0][0], k01 = KR[0][1], k02 = KR[0][2], k10 = KR[1][0], k11 = KR[1][1], k12 = KR[1][2];
  const k20 = KR[2][0], k21 = KR[2][1], k22 = KR[2][2], k30 = KR[3][0], k31 = KR[3][1], k32 = KR[3][2];
  const st0 = st ? st[0] : null, st1 = st ? st[1] : null, st2 = st ? st[2] : null;
  for (let y = ya; y < yb; y++) {
    const gy = gy0 + y, ro = y * TILE, ri = (y + MARGIN) * PW + MARGIN, pyo = (gy % PAPER_H) * PAPER_W;
    const inY = gy >= H.sy0 && gy < H.sy1;
    for (let x = 0; x < TILE; x++) {
      const gx = gx0 + x;
      if (!inY || gx < H.sx0 || gx >= H.sx1) { out[ro + x] = 0; if (st) { st0[ro + x] = 0; st1[ro + x] = 0; st2[ro + x] = 0; } continue; }
      const pc = PAPER_PX[pyo + (gx % PAPER_W)];
      let r = pc & 255, g = (pc >> 8) & 255, b = (pc >> 16) & 255;
      const idx = ri + x;
      if ((u0[idx] | u1[idx] | u2[idx] | u3[idx]) !== 0) {
        let a;
        if (u0[idx] !== 0 && (a = amtFor(d0, idx, s0.t, s0.P, gx, gy, dn0, dsh)) > 0.002) { r *= 1 - a * k00; g *= 1 - a * k01; b *= 1 - a * k02; }
        if (st) st0[ro + x] = 0xFF000000 | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0);
        if (u1[idx] !== 0 && (a = amtFor(d1, idx, s1.t, s1.P, gx, gy, dn1, dsh)) > 0.002) { r *= 1 - a * k10; g *= 1 - a * k11; b *= 1 - a * k12; }
        if (st) st1[ro + x] = 0xFF000000 | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0);
        if (u2[idx] !== 0 && (a = amtFor(d2, idx, s2.t, s2.P, gx, gy, dn2, dsh)) > 0.002) { r *= 1 - a * k20; g *= 1 - a * k21; b *= 1 - a * k22; }
        if (st) st2[ro + x] = 0xFF000000 | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0);
        if (u3[idx] !== 0 && (a = amtFor(d3, idx, s3.t, s3.P, gx, gy, dn3, dsh)) > 0.002) { r *= 1 - a * k30; g *= 1 - a * k31; b *= 1 - a * k32; }
      } else if (st) { const pp = 0xFF000000 | (b << 16) | (g << 8) | r; st0[ro + x] = pp; st1[ro + x] = pp; st2[ro + x] = pp; }
      out[ro + x] = 0xFF000000 | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0);
    }
  }
}

/* ---------- tile store + jobs ---------- */
const TILES = new Map(), JOBS = new Map();
let frameNo = 0, curJob = null, curGen = null, MAX_TILES = 360;
const PIN = new Set();
const tkey = (k, tx, ty, v) => k + ',' + tx + ',' + ty + ',' + v;
const STAGE = new Map(); // `${k},${tx},${ty},s${i}` -> canvas
function tileExists(k, tx, ty) {
  const s = lodScale(k);
  return !((tx + 1) * TILE < SHEET.x0 * s || tx * TILE > SHEET.x1 * s || (ty + 1) * TILE < SHEET.y0 * s || ty * TILE > SHEET.y1 * s);
}
function want(k, tx, ty, v, prio, stages) {
  const key = tkey(k, tx, ty, v);
  const t = TILES.get(key);
  if (t) { t.used = frameNo; return t; }
  let j = JOBS.get(key);
  if (!j) { j = { k, tx, ty, v, prio, seen: frameNo, stages: !!stages, key }; JOBS.set(key, j); }
  else { j.seen = frameNo; if (prio > j.prio) j.prio = prio; if (stages) j.stages = true; }
  return null;
}
function makeCanvasFrom(buf32) {
  const c = document.createElement('canvas'); c.width = c.height = TILE;
  const id = new ImageData(new Uint8ClampedArray(buf32.buffer), TILE, TILE);
  c.getContext('2d').putImageData(id, 0, 0);
  return c;
}
function* bakeJob(job) {
  const { k, tx, ty, v } = job, S = lodScale(k);
  const cull = [(tx * TILE - MARGIN) / S - 4, (ty * TILE - MARGIN) / S - 4, ((tx + 1) * TILE + MARGIN) / S + 4, ((ty + 1) * TILE + MARGIN) / S + 4];
  const ccx = (SHEET.x0 + SHEET.x1) / 2, ccy = (SHEET.y0 + SHEET.y1) / 2;
  for (let i = 0; i < 4; i++) {
    const c = pctx[i]; c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1; c.clearRect(0, 0, PW, PW);
    const m = MISREG[i], co = Math.cos(m[2]), si = Math.sin(m[2]);
    c.setTransform(S * co, S * si, -S * si, S * co, S * (ccx - ccx * co + ccy * si + m[0]) - tx * TILE + MARGIN, S * (ccy - ccx * si - ccy * co + m[1]) - ty * TILE + MARGIN);
  }
  yield;
  for (const layer of LAYERS) {
    const r = layer.rect;
    if (r[2] < cull[0] || r[0] > cull[2] || r[3] < cull[1] || r[1] > cull[3]) continue;
    const lo = k <= 3;
    if (!hasDL(layer, v, lo)) yield;
    const dl = getDL(layer, v, lo);
    drawDL(dl, S, cull[0], cull[1], cull[2], cull[3]);
    yield;
  }
  const H = { d: [], u: [], out: new Uint32Array(TILE * TILE), st: null, tx, ty, scr: SCREENS[k <= 9 ? 0 : k <= 11 ? 1 : 2], dsh: k < 8 ? 0 : k < 11 ? 1 : 2,
    sx0: SHEET.x0 * S, sx1: SHEET.x1 * S, sy0: SHEET.y0 * S, sy1: SHEET.y1 * S };
  if (job.stages) H.st = [new Uint32Array(TILE * TILE), new Uint32Array(TILE * TILE), new Uint32Array(TILE * TILE)];
  for (let i = 0; i < 4; i++) {
    const id = pctx[i].getImageData(0, 0, PW, PW);
    H.d.push(id.data); H.u.push(new Uint32Array(id.data.buffer));
    yield;
  }
  for (let y = 0; y < TILE; y += 64) { htChunk(H, y, Math.min(TILE, y + 64)); yield; }
  const c = makeCanvasFrom(H.out);
  const ent = { c, used: frameNo, k };
  TILES.set(job.key, ent);
  if (H.st) {
    for (let i = 0; i < 3; i++) STAGE.set(k + ',' + tx + ',' + ty + ',s' + i, makeCanvasFrom(H.st[i]));
    STAGE.set(k + ',' + tx + ',' + ty + ',s3', c);
  }
  yield;
  // evict
  if (TILES.size > MAX_TILES) {
    const arr = [...TILES.entries()].filter(e => !PIN.has(e[1].k) && e[1].used < frameNo - 2).sort((a, b) => a[1].used - b[1].used);
    for (let i = 0; i < arr.length && TILES.size > MAX_TILES * 0.85; i++) TILES.delete(arr[i][0]);
  }
}
function runJobs(budget) {
  const t0 = performance.now();
  while (performance.now() - t0 < budget) {
    if (!curGen) {
      let best = null;
      for (const j of JOBS.values()) {
        if (j.seen < frameNo - 24 && !j.keep) { JOBS.delete(j.key); continue; }
        if (!best || j.prio > best.prio) best = j;
      }
      if (!best) return false;
      JOBS.delete(best.key); curJob = best; curGen = bakeJob(best);
    }
    const r = curGen.next();
    if (r.done) { curGen = null; curJob = null; }
  }
  return true;
}
