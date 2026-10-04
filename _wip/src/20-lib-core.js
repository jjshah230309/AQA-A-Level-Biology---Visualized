/* ===================== 20 LIB CORE: scene chrome, DNA motif, scale bars, shared marks ===================== */
/* Double helix between (x0,y0)->(x1,y1). o: amp, turns, ink, rung ink, w */
Recorder.prototype.helix = function (x0, y0, x1, y1, o = {}) {
  const amp = o.amp === undefined ? 4 : o.amp, turns = o.turns === undefined ? 2.5 : o.turns, ink = o.ink === undefined ? 'B' : o.ink, w = o.w === undefined ? 1.0 : o.w;
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const N = Math.max(12, Math.round(L / 1.6)), ph = o.phase || 0;
  const pt = (u, s) => { const th = TAU * turns * u + ph + s * PI, off = Math.sin(th) * amp; return [x0 + dx * u + nx * off, y0 + dy * u + ny * off, Math.cos(th)]; };
  // rungs (base pairs): two-colour halves meeting in the middle, drawn where strands are separated
  const rungs = Math.max(5, Math.round(turns * 8));
  for (let r = 0; r < rungs; r++) {
    const u = (r + 0.5) / rungs, a = pt(u, 0), b = pt(u, 1);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < amp * 0.55) continue;
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    if (o.rungInk) { this.line(a[0], a[1], b[0], b[1], { ink: o.rungInk, w: w * 0.75, wob: 0.12, taper: 'none' }); continue; }
    const c1 = (r % 2 ? 'P' : 'T'), c2 = (r % 2 ? 'T' : 'P');
    this.line(a[0], a[1], mid[0], mid[1], { ink: c1, w: w * 1.05, wob: 0.12, taper: 'none' });
    this.line(mid[0], mid[1], b[0], b[1], { ink: c2, w: w * 1.05, wob: 0.12, taper: 'none' });
  }
  for (const front of [false, true]) {
    for (let s = 0; s < 2; s++) {
      let run = [];
      const flush = () => { if (run.length >= 4) this.stroke(run, { ink, w: w * (front ? 1.15 : 0.65), wob: 0.2, tl: 2.5, smooth: true }); run = []; };
      for (let i = 0; i <= N; i++) {
        const p = pt(i / N, s), isFront = p[2] > 0;
        if (isFront === front) run.push(p[0], p[1]); else flush();
      }
      flush();
    }
  }
  return this;
};
Recorder.prototype.scaleBar = function (x, y, len, label, o = {}) {
  const ink = o.ink || 'B';
  this.line(x, y, x + len, y, { ink, w: 1.1, wob: 0.15, taper: 'none' });
  this.line(x, y - 2, x, y + 2, { ink, w: 0.9, wob: 0.1 }); this.line(x + len, y - 2, x + len, y + 2, { ink, w: 0.9, wob: 0.1 });
  this.text(label, x + len / 2, y - 3.2, o.size || 5.2, { ink, al: 'c' });
  return this;
};

/* The frame every scene gets: knock-out window, hand-ruled border, tag with scene number and DNA colophon */
function sceneChrome(R, sc, pre) {
  const w = sc.w, h = sc.h;
  if (pre) {
    R.knockRRect(-2, -2, w + 4, h + 4, 12);
    // faint cream wash so the window reads as a cut-away
    R.fill(R.rrectPts(0, 0, w, h, 10), { ink: sc.wash === undefined ? 'Y' : sc.wash, t: sc.washT === undefined ? 0.07 : sc.washT, wob: 0.2 });
    return;
  }
  // frame by assessment-style grammar
  const k = sc.ao || 1;
  R.rrect(0, 0, w, h, 10, { ink: 'B', w: 1.7, wob: 0.55 });
  if (k === 2) R.rrect(3, 3, w - 6, h - 6, 8, { ink: 'B', w: 0.7, wob: 0.4, st: 0.9 });
  if (k >= 3) { for (const [cx, cy, a] of [[0, 0, 0], [w, 0, 90], [w, h, 180], [0, h, 270]]) R.hatch(rectCorner(cx, cy, a, 14), 45, 2.4, { ink: 'P', w: 0.5 }); }
  // tag
  const tag = sc.rp ? 'RP' + sc.rp : (sc.tag || sc.num || sc.id);
  const tw = labelWidth(tag, 7.2) + 24;
  R.knock(R.rrectPts(8, -7, tw, 15, 4));
  R.rrect(8, -7, tw, 15, 4, { ink: 'B', w: 1.1, fi: sc.rp ? 'P' : 'T', ft: 0.22, wob: 0.3 });
  R.text(tag, 12, 4, 7.2, { ink: 'B' });
  R.helix(8 + tw + 7, 0.5, 8 + tw + 7 + 42, 0.5, { amp: 5.2, turns: 2.4, w: 0.8 });
}
function rectCorner(cx, cy, a, s) {
  const p = [0, 0, s, 0, 0, s].map((v, i) => v);
  const rot = rad(a), c = Math.cos(rot), sn = Math.sin(rot), out = [];
  for (let i = 0; i < 6; i += 2) out.push(cx + p[i] * c - p[i + 1] * sn, cy + p[i] * sn + p[i + 1] * c);
  return out;
}
