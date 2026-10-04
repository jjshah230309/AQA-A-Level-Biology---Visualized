/* ===================== 15 VIEW: camera, input, flights, tour, press, render loop ===================== */
const cvs = document.getElementById('c'), ctx = cvs.getContext('2d', { alpha: false });
let VW = 1, VH = 1, DPR = 1, CW = 1, CH = 1;
const cam = { x: 2300, y: 2000, z: 0.2 };
let zMin = 0.05, zMax = 20, cardOn = true;
const MAXPX = 8.6e6;
const isMobile = /Android|iPhone|iPad|Mobi/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && innerWidth < 900);
const sheetW = () => SHEET.x1 - SHEET.x0, sheetH = () => SHEET.y1 - SHEET.y0;

function resize() {
  VW = innerWidth; VH = innerHeight;
  DPR = Math.min(window.devicePixelRatio || 1, Math.sqrt(MAXPX / (VW * VH)), 3);
  CW = Math.round(VW * DPR); CH = Math.round(VH * DPR);
  cvs.width = CW; cvs.height = CH; cvs.style.width = VW + 'px'; cvs.style.height = VH + 'px';
  zMin = Math.min(VW / sheetW(), VH / sheetH()) * 0.55;
  zMax = 20 / DPR;
}
const fitView = () => ({ x: (SHEET.x0 + SHEET.x1) / 2, y: (SHEET.y0 + SHEET.y1) / 2, z: Math.min((VW - 30) / sheetW(), (VH - 30) / sheetH()) });

/* ---- card region (css px) ---- */
function availArea() {
  if (!cardOn) return { x: 0, y: 0, w: VW, h: VH };
  if (VW >= 760) { const cw = Math.min(430, VW * 0.34) + 36; return { x: cw, y: 0, w: VW - cw, h: VH }; }
  const ch = Math.min(VH * 0.5, 400); return { x: 0, y: 0, w: VW, h: VH - ch };
}
function viewFor(rect, pad = 1.08) {
  const A = availArea(), w = rect[2] - rect[0], h = rect[3] - rect[1];
  const z = Math.min(A.w / (w * pad), A.h / (h * pad * 1.04));
  const scx = A.x + A.w / 2, scy = A.y + A.h / 2;
  return { x: (rect[0] + rect[2]) / 2 - (scx - VW / 2) / z, y: (rect[1] + rect[3]) / 2 - (scy - VH / 2) / z, z: clamp(z, zMin, zMax) };
}
const sceneRect = sc => [sc.x, sc.y, sc.x + sc.w, sc.y + sc.h];

/* ---- smooth, efficient zoom flights (van Wijk & Nuij) ---- */
let flight = null;
function makePath(a, b) {
  const rho = 1.38, rho2 = rho * rho, dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
  if (d < 1e-3 || Math.abs(Math.log(b.w / a.w)) > 4.5 * Math.min(1, d / (a.w + b.w) * 4) + 3) {
    return { S: Math.abs(Math.log(b.w / a.w)) / rho + d / (a.w + b.w), f: t => ({ x: lerp(a.x, b.x, smooth(t)), y: lerp(a.y, b.y, smooth(t)), w: a.w * Math.pow(b.w / a.w, smooth(t)) }) };
  }
  const b0 = (b.w * b.w - a.w * a.w + rho2 * rho2 * d * d) / (2 * a.w * rho2 * d);
  const b1 = (b.w * b.w - a.w * a.w - rho2 * rho2 * d * d) / (2 * b.w * rho2 * d);
  const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
  const S = (r1 - r0) / rho;
  return {
    S, f: t => {
      const s = smooth(t) * S, u = a.w / rho2 * Math.cosh(r0) * Math.tanh(rho * s + r0) - a.w / rho2 * Math.sinh(r0);
      return { x: a.x + dx * u / d, y: a.y + dy * u / d, w: a.w * Math.cosh(r0) / Math.cosh(rho * s + r0) };
    }
  };
}
function flyTo(to, dur, done) {
  const a = { x: cam.x, y: cam.y, w: VW / cam.z }, b = { x: to.x, y: to.y, w: VW / to.z };
  const p = makePath(a, b);
  flight = { p, t0: NOW, dur: dur || clamp(0.7 + p.S * 0.95, 1.3, 4.6), to, done };
  vel.x = vel.y = 0; zoomT = null;
}
function cancelFlight() { flight = null; }

/* ---- input ---- */
let NOW = 0;
const vel = { x: 0, y: 0 }; // css px/s
let zoomT = null; // {lz, ax, ay}
const ptrs = new Map(); let drag = null, lastTap = { t: 0, x: 0, y: 0 }, pinch = null;
const keys = new Set();
function userInput() { tour.pause(); if (flight) cancelFlight(); if (press.on) press.skip(); }
function zoomAt(sx, sy, factor) {
  const wx = cam.x + (sx - VW / 2) / cam.z, wy = cam.y + (sy - VH / 2) / cam.z;
  cam.z = clamp(cam.z * factor, zMin, zMax);
  cam.x = wx - (sx - VW / 2) / cam.z; cam.y = wy - (sy - VH / 2) / cam.z;
}
function sceneUnder(sx, sy) { return sceneAt(cam.x + (sx - VW / 2) / cam.z, cam.y + (sy - VH / 2) / cam.z); }
function doubleAction(x, y) {
  const sc = sceneUnder(x, y);
  if (sc && cam.z < viewFor(sceneRect(sc)).z * 0.9) { flyTo(viewFor(sceneRect(sc)), null); }
  else {
    const wx = cam.x + (x - VW / 2) / cam.z, wy = cam.y + (y - VH / 2) / cam.z, nz = clamp(cam.z * 2.4, zMin, zMax);
    flyTo({ x: wx - (x - VW / 2) / nz, y: wy - (y - VH / 2) / nz, z: nz }, 0.9);
  }
}
cvs.addEventListener('pointerdown', e => {
  userInput();
  cvs.setPointerCapture(e.pointerId);
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now() });
  vel.x = vel.y = 0;
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 }; drag = null; }
  else if (ptrs.size === 1) drag = { lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: false };
});
cvs.addEventListener('pointermove', e => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  p.x = e.clientX; p.y = e.clientY;
  if (ptrs.size >= 2 && pinch) {
    const [a, b] = [...ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    cam.x -= (mx - pinch.mx) / cam.z; cam.y -= (my - pinch.my) / cam.z;
    zoomAt(mx, my, d / Math.max(pinch.d, 1));
    pinch.d = d; pinch.mx = mx; pinch.my = my; zoomT = null;
  } else if (drag) {
    const dx = e.clientX - drag.lx, dy = e.clientY - drag.ly, t = performance.now(), dtm = Math.max(1, t - drag.lt);
    if (Math.hypot(e.clientX - p.x0, e.clientY - p.y0) > 5) drag.moved = true;
    cam.x -= dx / cam.z; cam.y -= dy / cam.z;
    vel.x = lerp(vel.x, dx / dtm * 1000, 0.45); vel.y = lerp(vel.y, dy / dtm * 1000, 0.45);
    drag.lx = e.clientX; drag.ly = e.clientY; drag.lt = t;
  }
});
function endPtr(e) {
  const p = ptrs.get(e.pointerId); if (!p) return;
  ptrs.delete(e.pointerId);
  const tap = !(drag && drag.moved) && performance.now() - p.t0 < 320 && ptrs.size === 0;
  if (ptrs.size < 2) pinch = null;
  if (ptrs.size === 1) { const q = [...ptrs.values()][0]; drag = { lx: q.x, ly: q.y, lt: performance.now(), moved: true }; vel.x = vel.y = 0; }
  else if (ptrs.size === 0) {
    if (drag && performance.now() - drag.lt > 90) vel.x = vel.y = 0;
    drag = null;
  }
  if (tap) {
    const t = performance.now();
    if (t - lastTap.t < 380 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 28) { doubleAction(e.clientX, e.clientY); lastTap.t = 0; vel.x = vel.y = 0; }
    else lastTap = { t, x: e.clientX, y: e.clientY };
  }
}
cvs.addEventListener('pointerup', endPtr); cvs.addEventListener('pointercancel', endPtr);
cvs.addEventListener('wheel', e => {
  e.preventDefault(); userInput();
  const d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1), k = e.ctrlKey ? 0.011 : 0.0017;
  const lz = (zoomT ? zoomT.lz : Math.log(cam.z)) - clamp(d, -240, 240) * k;
  zoomT = { lz: clamp(lz, Math.log(zMin), Math.log(zMax)), ax: e.clientX, ay: e.clientY };
}, { passive: false });
cvs.addEventListener('contextmenu', e => e.preventDefault());
addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (k === 'c' || k === 'C') { cardOn = !cardOn; Card.setEnabled(cardOn); e.preventDefault(); return; }
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) {
    userInput(); e.preventDefault();
    if (e.shiftKey && (k === 'ArrowLeft' || k === 'ArrowRight')) { stepScene(k === 'ArrowRight' ? 1 : -1); return; }
    keys.add(k); return;
  }
  if (k === '+' || k === '=') { userInput(); zoomT = { lz: clamp(Math.log(cam.z) + 0.3, Math.log(zMin), Math.log(zMax)), ax: VW / 2, ay: VH / 2 }; e.preventDefault(); }
  else if (k === '-' || k === '_') { userInput(); zoomT = { lz: clamp(Math.log(cam.z) - 0.3, Math.log(zMin), Math.log(zMax)), ax: VW / 2, ay: VH / 2 }; e.preventDefault(); }
  else if (k === '0') { userInput(); flyTo(fitView(), 1.5); e.preventDefault(); }
  else if (k === 'PageDown') { stepScene(1); e.preventDefault(); } else if (k === 'PageUp') { stepScene(-1); e.preventDefault(); }
  else if (k === ' ') { if (tour.state === 'paused' || tour.state === 'off') tour.resume(true); else tour.pause(true); e.preventDefault(); }
});
addEventListener('keyup', e => keys.delete(e.key));
addEventListener('blur', () => keys.clear());
addEventListener('resize', () => { const a = cam.z; resize(); });

function nearestSceneIdx() {
  let best = 0, bd = 1e18;
  for (let i = 0; i < SCENES.length; i++) { const s = SCENES[i], d = Math.hypot(s.cx - cam.x, s.cy - cam.y) + Math.abs(Math.log(cam.z / viewFor(sceneRect(s)).z)) * 300; if (d < bd) { bd = d; best = i; } }
  return best;
}
function stepScene(dir) {
  const i = clamp(nearestSceneIdx() + dir, 0, SCENES.length - 1);
  tour.idx = i; flyTo(viewFor(sceneRect(SCENES[i])), null);
}

/* ---- tour ---- */
const DWELL = 7.0;
const tour = {
  state: 'off', idx: -1, t0: 0, resumeAt: 0, cur: null,
  start() { this.idx = 0; this.go(); },
  go() {
    const sc = SCENES[this.idx]; this.cur = sc; this.state = 'fly'; Card.hide();
    prefetchView(viewFor(sceneRect(sc)), 9000);
    flyTo(viewFor(sceneRect(sc)), null, () => { this.state = 'dwell'; this.t0 = NOW; });
  },
  pause(manual) { if (this.state === 'off') return; this.state = 'paused'; this.resumeAt = manual ? 1e9 : NOW + 12; },
  resume(force) { this.idx = clamp(nearestSceneIdx(), 0, SCENES.length - 1); this.go(); },
  update() {
    if (this.state === 'dwell' && NOW - this.t0 > DWELL) {
      this.idx = (this.idx + 1) % SCENES.length;
      this.go();
    } else if (this.state === 'dwell') {
      const nx = SCENES[(this.idx + 1) % SCENES.length];
      if (NOW - this.t0 > 1.2) prefetchView(viewFor(sceneRect(nx)), 4000);
    } else if (this.state === 'paused' && NOW > this.resumeAt && !drag && !ptrs.size && !flight && Math.hypot(vel.x, vel.y) < 5) this.resume();
  },
};

/* ---- tile drawing ---- */
function prefetchView(v, prio) {
  const Z = v.z * DPR, k = lodFor(Z), s = lodScale(k), hw = VW / v.z / 2, hh = VH / v.z / 2;
  const tx0 = Math.floor((v.x - hw) * s / TILE), tx1 = Math.floor((v.x + hw) * s / TILE), ty0 = Math.floor((v.y - hh) * s / TILE), ty1 = Math.floor((v.y + hh) * s / TILE);
  for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
    if (!tileExists(k, tx, ty)) continue;
    const d = Math.hypot((tx + .5) * TILE / s - v.x, (ty + .5) * TILE / s - v.y);
    for (let vv = 0; vv < 3; vv++) want(k, tx, ty, vv, prio - d * 0.5 - vv * 400);
  }
}
let PAPER_PATTERN = null;
function paperPattern() {
  if (PAPER_PATTERN) return PAPER_PATTERN;
  const c = document.createElement('canvas'); c.width = PAPER_W; c.height = PAPER_H;
  const id = new ImageData(new Uint8ClampedArray(new Uint32Array(PAPER_PX.map(p => 0xFF000000 | p)).buffer), PAPER_W, PAPER_H);
  c.getContext('2d').putImageData(id, 0, 0);
  return PAPER_PATTERN = ctx.createPattern(c, 'repeat');
}
function drawCanvasTile(c, wx0, wy0, ww, Z, ox, oy) {
  const dx = (wx0 - cam.x) * Z + CW / 2 + ox, dy = (wy0 - cam.y) * Z + CH / 2 + oy, dw = ww * Z;
  ctx.drawImage(c, Math.floor(dx), Math.floor(dy), Math.ceil(dw + (dx - Math.floor(dx))) + 1, Math.ceil(dw + (dy - Math.floor(dy))) + 1);
}
function drawTiles(v) {
  const Z = cam.z * DPR, k = lodFor(Z), s = lodScale(k), tw = TILE / s;
  const hw = CW / 2 / Z, hh = CH / 2 / Z;
  const tx0 = Math.floor((cam.x - hw) * s / TILE), tx1 = Math.floor((cam.x + hw) * s / TILE), ty0 = Math.floor((cam.y - hh) * s / TILE), ty1 = Math.floor((cam.y + hh) * s / TILE);
  const moving = !!flight || Math.hypot(vel.x, vel.y) > 40 || !!zoomT;
  const miss = [];
  for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
    if (!tileExists(k, tx, ty)) continue;
    const d = Math.hypot((tx + .5) * tw - cam.x, (ty + .5) * tw - cam.y);
    let e = want(k, tx, ty, v, 10000 - d * 0.4);
    for (let o = 1; o < 3; o++) { const e2 = want(k, tx, ty, (v + o) % 3, 6000 - d * 0.4 - o * 100); if (!e && e2) e = e2; }
    if (e) drawCanvasTile(e.c, tx * tw, ty * tw, tw, Z, 0, 0); else miss.push([tx, ty, k]);
  }
  // fallbacks from coarser levels
  for (const [tx, ty] of miss) {
    const x0 = tx * tw, y0 = ty * tw, dx = (x0 - cam.x) * Z + CW / 2, dy = (y0 - cam.y) * Z + CH / 2, dw = tw * Z;
    ctx.save(); ctx.beginPath(); ctx.rect(dx, dy, dw + 1, dw + 1); ctx.clip();
    for (let j = k - 1; j >= 0; j--) {
      const sj = lodScale(j), twj = TILE / sj, a0 = Math.floor(x0 / twj), a1 = Math.floor((x0 + tw) / twj), b0 = Math.floor(y0 / twj), b1 = Math.floor((y0 + tw) / twj);
      let found = 0;
      for (let b = b0; b <= b1; b++) for (let a = a0; a <= a1; a++) {
        for (let vv = 0; vv < 3; vv++) { const e = TILES.get(tkey(j, a, b, (v + vv) % 3)); if (e) { drawCanvasTile(e.c, a * twj, b * twj, twj, Z, 0, 0); found++; break; } }
      }
      if (found === (a1 - a0 + 1) * (b1 - b0 + 1)) break;
    }
    ctx.restore();
  }
  // prefetch ring (idle)
  if (!moving) for (let ty = ty0 - 1; ty <= ty1 + 1; ty++) for (let tx = tx0 - 1; tx <= tx1 + 1; tx++) {
    if (tx >= tx0 && tx <= tx1 && ty >= ty0 && ty <= ty1) continue;
    if (!tileExists(k, tx, ty)) continue;
    const d = Math.hypot((tx + .5) * tw - cam.x, (ty + .5) * tw - cam.y);
    want(k, tx, ty, v, 3000 - d * 0.4); want(k, tx, ty, (v + 1) % 3, 2000 - d * 0.4);
  }
  return k;
}
function drawShadow() {
  const Z = cam.z * DPR, x0 = (SHEET.x0 - cam.x) * Z + CW / 2, y0 = (SHEET.y0 - cam.y) * Z + CH / 2, w = sheetW() * Z, h = sheetH() * Z;
  for (let i = 7; i >= 1; i--) { ctx.fillStyle = 'rgba(0,0,0,0.075)'; const g = i * 3.2 * DPR; ctx.fillRect(x0 - g + 4 * DPR, y0 - g * 0.5 + 9 * DPR, w + 2 * g, h + 2 * g); }
}

/* ---- press (print-in) ---- */
const press = {
  on: false, phase: 0, t0: 0, pass: 0, sweep: 0, kS: 0, ready: false, slide: 0, rows: 0, cols: 0, tx0: 0, ty0: 0, done: false,
  begin() {
    this.on = true; this.t0 = NOW; this.pass = -1; this.sweep = 0;
    const fv = fitView(); cam.x = fv.x; cam.y = fv.y; cam.z = fv.z;
    this.kS = Math.min(lodFor(cam.z * DPR), 3); PIN.add(this.kS);
    const s = lodScale(this.kS);
    this.tx0 = Math.floor(SHEET.x0 * s / TILE); this.ty0 = Math.floor(SHEET.y0 * s / TILE);
    this.cols = Math.floor(SHEET.x1 * s / TILE) - this.tx0 + 1; this.rows = Math.floor(SHEET.y1 * s / TILE) - this.ty0 + 1;
    for (let ty = 0; ty < this.rows; ty++) for (let tx = 0; tx < this.cols; tx++) {
      const j = want(this.kS, this.tx0 + tx, this.ty0 + ty, 0, 1e6 - ty * 1000 - tx, true);
      if (!j) { const q = JOBS.get(tkey(this.kS, this.tx0 + tx, this.ty0 + ty, 0)); if (q) q.keep = true; }
    }
    prefetchView(viewFor(sceneRect(SCENES[0])), 5e5);
  },
  rowsReady() {
    let r = 0;
    for (; r < this.rows; r++) { for (let tx = 0; tx < this.cols; tx++) if (!STAGE.has(this.kS + ',' + (this.tx0 + tx) + ',' + (this.ty0 + r) + ',s3')) return r; }
    return r;
  },
  skip() { this.on = false; this.done = true; cam.z = Math.max(cam.z, zMin); },
  update(dt) {
    const el = NOW - this.t0;
    this.slide = 1 - Math.pow(1 - clamp(el / 1.5, 0, 1), 3);
    const rr = this.rowsReady();
    if (this.pass < 0 && el > 1.6) { this.pass = 0; this.sweep = 0; }
    if (this.pass >= 0 && this.pass < 4) {
      const lim = rr >= this.rows ? 1.02 : Math.max(0, (rr - 0.3) / this.rows);
      this.sweep = Math.min(lim, this.sweep + dt / (this.pass === 0 ? 2.1 : 1.35));
      if (this.sweep >= 1.015) { this.pass++; this.sweep = 0; if (this.pass === 4) this.endT = NOW; }
    } else if (this.pass === 4 && NOW - this.endT > 0.7) {
      this.on = false; this.done = true; Card.hide();
      tour.idx = 0; tour.cur = SCENES[0]; tour.state = 'fly';
      const tv = viewFor(sceneRect(SCENES[0]));
      flyTo(tv, 4.2, () => { tour.state = 'dwell'; tour.t0 = NOW; });
    }
  },
  draw() {
    const Z = cam.z * DPR, s = lodScale(this.kS), tw = TILE / s;
    const off = (1 - this.slide) * CH * 0.9;
    const x0 = (SHEET.x0 - cam.x) * Z + CW / 2, y0 = (SHEET.y0 - cam.y) * Z + CH / 2 + off, w = sheetW() * Z, h = sheetH() * Z;
    for (let i = 7; i >= 1; i--) { ctx.fillStyle = 'rgba(0,0,0,0.075)'; const g = i * 3.2 * DPR; ctx.fillRect(x0 - g + 4 * DPR, y0 - g * 0.5 + 9 * DPR, w + 2 * g, h + 2 * g); }
    ctx.save(); ctx.translate(0, off);
    ctx.fillStyle = paperPattern(); ctx.fillRect(x0, y0 - off, w, h);
    const sy = y0 - off + this.sweep * h;
    const drawStage = (stage, cy0, cy1) => {
      if (stage < 0 || cy1 <= cy0) return;
      ctx.save(); ctx.beginPath(); ctx.rect(0, cy0, CW, cy1 - cy0); ctx.clip();
      for (let ty = 0; ty < this.rows; ty++) for (let tx = 0; tx < this.cols; tx++) {
        const c = STAGE.get(this.kS + ',' + (this.tx0 + tx) + ',' + (this.ty0 + ty) + ',s' + stage);
        if (c) drawCanvasTile(c, (this.tx0 + tx) * tw, (this.ty0 + ty) * tw, tw, Z, 0, 0);
      }
      ctx.restore();
    };
    if (this.pass >= 0 && this.pass < 4) {
      drawStage(this.pass - 1, sy, y0 - off + h + 4);
      drawStage(this.pass, y0 - off - 4, sy);
    } else if (this.pass >= 4) drawStage(3, y0 - off - 4, y0 - off + h + 4);
    // roller
    if (this.pass >= 0 && this.pass < 4) {
      const rh = 26 * DPR, g = ctx.createLinearGradient(0, sy - rh / 2, 0, sy + rh / 2);
      g.addColorStop(0, '#2b2724'); g.addColorStop(0.25, '#8a8077'); g.addColorStop(0.5, '#cfc6bb'); g.addColorStop(0.75, '#6a625b'); g.addColorStop(1, '#1d1a18');
      const wet = ctx.createLinearGradient(0, sy - 90 * DPR, 0, sy);
      wet.addColorStop(0, 'rgba(255,255,255,0)'); wet.addColorStop(1, 'rgba(255,255,255,0.22)');
      ctx.fillStyle = wet; ctx.fillRect(x0, Math.max(y0 - off, sy - 90 * DPR), w, Math.min(90 * DPR, sy - (y0 - off)));
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x0 - 30 * DPR, sy + rh / 2, w + 60 * DPR, 7 * DPR);
      ctx.fillStyle = g; ctx.fillRect(x0 - 30 * DPR, sy - rh / 2, w + 60 * DPR, rh);
      ctx.fillStyle = INK[INK_ORDER[this.pass]].hex; ctx.globalAlpha = 0.85; ctx.fillRect(x0 - 30 * DPR, sy - 2 * DPR, w + 60 * DPR, 4 * DPR); ctx.globalAlpha = 1;
    }
    ctx.restore();
  },
};

/* ---- frame ---- */
let lastTS = 0, vIndex = 0, renderMs = 8, currentK = 0;
function update(dt) {
  // flight
  if (flight) {
    const t = clamp((NOW - flight.t0) / flight.dur, 0, 1), st = flight.p.f(t);
    cam.x = st.x; cam.y = st.y; cam.z = VW / st.w;
    if (t >= 1) { const f = flight; flight = null; cam.x = f.to.x; cam.y = f.to.y; cam.z = f.to.z; if (f.done) f.done(); }
  } else {
    // keyboard pan
    let kx = 0, ky = 0;
    if (keys.has('ArrowLeft')) kx -= 1; if (keys.has('ArrowRight')) kx += 1; if (keys.has('ArrowUp')) ky -= 1; if (keys.has('ArrowDown')) ky += 1;
    if (kx || ky) { const sp = Math.min(VW, VH) * 0.95; vel.x = lerp(vel.x, -kx * sp, 1 - Math.exp(-dt * 10)); vel.y = lerp(vel.y, -ky * sp, 1 - Math.exp(-dt * 10)); }
    if (!drag && !pinch) {
      cam.x -= vel.x * dt / cam.z; cam.y -= vel.y * dt / cam.z;
      const f = Math.exp(-dt * 3.4); if (!(kx || ky)) { vel.x *= f; vel.y *= f; }
      if (Math.hypot(vel.x, vel.y) < 2) { vel.x = 0; vel.y = 0; }
    }
    if (zoomT) {
      const lz = Math.log(cam.z), nl = lz + (zoomT.lz - lz) * (1 - Math.exp(-dt * 13));
      zoomAt(zoomT.ax, zoomT.ay, Math.exp(nl - lz));
      if (Math.abs(zoomT.lz - nl) < 0.0015) zoomT = null;
    }
  }
  // clamp to sheet surroundings
  const mx = sheetW() * 0.6, my = sheetH() * 0.6;
  cam.x = clamp(cam.x, SHEET.x0 - mx * 0.2, SHEET.x1 + mx * 0.2); cam.y = clamp(cam.y, SHEET.y0 - my * 0.2, SHEET.y1 + my * 0.2);
  if (press.on) press.update(dt); else tour.update();
}
function isMoving() { return !!flight || !!zoomT || Math.hypot(vel.x, vel.y) > 25 || !!drag || !!pinch || keys.size > 0; }
function frame(ts) {
  const dt = Math.min(0.05, Math.max(0.001, (ts - lastTS) / 1000)); lastTS = ts; NOW = ts / 1000;
  const t0 = performance.now();
  update(dt);
  vIndex = Math.floor(NOW * 9) % 3;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#26211d'; ctx.fillRect(0, 0, CW, CH);
  if (press.on) press.draw();
  else {
    drawShadow();
    currentK = drawTiles(vIndex);
    Anim.drawAll(NOW, vIndex);
  }
  Card.update(NOW, isMoving());
  renderMs = lerp(renderMs, performance.now() - t0, 0.1);
  // bake budget
  const hurry = press.on || (NOW < 8);
  const budget = hurry ? 22 : isMoving() ? clamp(13 - renderMs, 3, 7) : clamp(15 - renderMs, 5, 12);
  runJobs(budget);
  requestAnimationFrame(frame);
}
