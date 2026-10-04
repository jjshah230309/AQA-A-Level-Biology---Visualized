/* ===================== 12 RECORDER: hand-drawn strokes -> display lists ===================== */
const F_SOLID = 16, F_KNOCK = 32;
class DL {
  constructor() { this.b = new Float32Array(4096); this.n = 0; this.count = 0; this.minx = 1e9; this.miny = 1e9; this.maxx = -1e9; this.maxy = -1e9; }
  _grow(k) {
    if (this.n + k > this.b.length) {
      let nl = this.b.length * 2; while (nl < this.n + k) nl *= 2;
      const nb = new Float32Array(nl); nb.set(this.b.subarray(0, this.n)); this.b = nb;
    }
  }
  poly(flags, alpha, p, x0, y0, x1, y1) {
    const len = p.length; this._grow(8 + len);
    const b = this.b; let n = this.n;
    b[n] = 0; b[n + 1] = flags; b[n + 2] = alpha; b[n + 3] = len >> 1; b[n + 4] = x0; b[n + 5] = y0; b[n + 6] = x1; b[n + 7] = y1;
    for (let i = 0; i < len; i++) b[n + 8 + i] = p[i];
    this.n = n + 8 + len; this.count++;
    if (x0 < this.minx) this.minx = x0; if (y0 < this.miny) this.miny = y0; if (x1 > this.maxx) this.maxx = x1; if (y1 > this.maxy) this.maxy = y1;
  }
  circle(flags, alpha, x, y, r) {
    this._grow(11); const b = this.b; let n = this.n;
    b[n] = 1; b[n + 1] = flags; b[n + 2] = alpha; b[n + 3] = 1; b[n + 4] = x - r; b[n + 5] = y - r; b[n + 6] = x + r; b[n + 7] = y + r;
    b[n + 8] = x; b[n + 9] = y; b[n + 10] = r;
    this.n = n + 11; this.count++;
    if (x - r < this.minx) this.minx = x - r; if (y - r < this.miny) this.miny = y - r; if (x + r > this.maxx) this.maxx = x + r; if (y + r > this.maxy) this.maxy = y + r;
  }
  done() { this.b = this.b.slice(0, this.n); return this; }
  bytes() { return this.b.byteLength; }
}

function flat(p) {
  if (!p.length) return [];
  if (typeof p[0] === 'number') return p;
  const o = new Array(p.length * 2);
  for (let i = 0; i < p.length; i++) { o[i * 2] = p[i][0]; o[i * 2 + 1] = p[i][1]; }
  return o;
}

class Recorder {
  constructor(dl, seed, variant) {
    this.dl = dl; this.seed = seed; this.variant = variant; this.v = variant;
    this.rng = mulberry32(seed ^ 0x51ED270B);          // structural: identical in every variant
    this.vr = mulberry32(mix2(seed, 977 + variant * 31)); // variant-dependent
    this.pc = 0;
    this.m = [1, 0, 0, 1, 0, 0]; this.stack = [];
    this.wobK = 1; this.lo = false;
  }
  /* ---- transforms ---- */
  push(tx = 0, ty = 0, rot = 0, sc = 1, sy) {
    this.stack.push(this.m.slice());
    const m = this.m, c = Math.cos(rot) * sc, s = Math.sin(rot) * sc, sy2 = sy === undefined ? 1 : sy;
    // M' = M * [c -s*sy2 ; s c*sy2]
    const a = m[0] * c + m[2] * s, b = m[1] * c + m[3] * s;
    const cc = (m[0] * -s + m[2] * c) * sy2, d = (m[1] * -s + m[3] * c) * sy2;
    const e = m[0] * tx + m[2] * ty + m[4], f = m[1] * tx + m[3] * ty + m[5];
    this.m = [a, b, cc, d, e, f];
    return this;
  }
  pop() { this.m = this.stack.pop(); return this; }
  get scale() { return Math.hypot(this.m[0], this.m[1]); }
  tp(p) { // transform flat pts -> new flat array
    const m = this.m, n = p.length, o = new Array(n);
    for (let i = 0; i < n; i += 2) { const x = p[i], y = p[i + 1]; o[i] = m[0] * x + m[2] * y + m[4]; o[i + 1] = m[1] * x + m[3] * y + m[5]; }
    return o;
  }
  pt(x, y) { const m = this.m; return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]; }
  prng() { this.pc++; return mulberry32(mix2(mix2(this.seed, this.pc * 2654435761 >>> 0), this.variant * 7919 + 13)); }

  /* ---- core stroke ---- */
  stroke(pts, o = {}) {
    let p = flat(pts);
    if (p.length < 4) return this;
    const ink = inkMask(o.ink === undefined ? 'B' : o.ink); if (!ink) return this;
    const closed = !!o.closed;
    p = this.tp(p);
    const sc = this.scale;
    let q;
    const smoothOn = o.smooth !== undefined ? o.smooth : (p.length > 4 && !o.sharp);
    q = smoothOn ? catmull(p, closed, 2.6) : densify(p, closed, 3.2);
    const n = q.length / 2;
    if (n < 2) return this;
    const w = (o.w === undefined ? 1.1 : o.w);
    const amp = (o.wob === undefined ? 0.5 : o.wob) * this.wobK;
    const rng = this.prng();
    // cumulative length
    const S = new Float32Array(n);
    let L = 0;
    for (let i = 1; i < n; i++) { L += Math.hypot(q[i * 2] - q[i * 2 - 2], q[i * 2 + 1] - q[i * 2 - 1]); S[i] = L; }
    if (closed) L += Math.hypot(q[0] - q[n * 2 - 2], q[1] - q[n * 2 - 1]);
    if (L < 0.05) return this;
    const K1 = closed ? Math.max(2, Math.round(L / 15)) : Math.ceil(L / 15) + 1;
    const K2 = closed ? Math.max(3, Math.round(L / 5.5)) : Math.ceil(L / 5.5) + 1;
    const K3 = closed ? Math.max(2, Math.round(L / 9)) : Math.ceil(L / 9) + 1;
    const A = fillLattice(rng, K1, closed), B = fillLattice(rng, K2, closed), W = fillLattice(rng, K3, closed);
    const invL = 1 / L;
    const taper = closed ? 'none' : (o.taper || 'both');
    const tl = Math.min(o.tl === undefined ? 7 : o.tl, L * 0.45);
    const L1 = new Array(n * 2), R1 = new Array(n * 2);
    for (let i = 0; i < n; i++) {
      const i0 = closed ? (i - 1 + n) % n : Math.max(0, i - 1), i1 = closed ? (i + 1) % n : Math.min(n - 1, i + 1);
      let tx = q[i1 * 2] - q[i0 * 2], ty = q[i1 * 2 + 1] - q[i0 * 2 + 1];
      const tn = Math.hypot(tx, ty) || 1; tx /= tn; ty /= tn;
      const nx = -ty, ny = tx;
      const u = S[i] * invL;
      const d = amp * (lat(A, u * (closed ? K1 : K1 - 1)) + 0.45 * lat(B, u * (closed ? K2 : K2 - 1)));
      let wi = w * (1 + 0.17 * lat(W, u * (closed ? K3 : K3 - 1)));
      if (taper !== 'none') {
        const s = S[i];
        if ((taper === 'both' || taper === 'start') && s < tl) wi *= 0.25 + 0.75 * smooth(s / tl);
        if ((taper === 'both' || taper === 'end') && L - s < tl) wi *= 0.25 + 0.75 * smooth((L - s) / tl);
      }
      const px = q[i * 2] + nx * d, py = q[i * 2 + 1] + ny * d, h = wi * 0.5;
      L1[i * 2] = px + nx * h; L1[i * 2 + 1] = py + ny * h;
      R1[i * 2] = px - nx * h; R1[i * 2 + 1] = py - ny * h;
    }
    const out = [];
    for (let i = 0; i < n; i++) out.push(L1[i * 2], L1[i * 2 + 1]);
    if (closed) out.push(L1[0], L1[1], R1[0], R1[1]);
    for (let i = n - 1; i >= 0; i--) out.push(R1[i * 2], R1[i * 2 + 1]);
    this._emit(out, ink, o.t === undefined ? 1 : o.t, o.solid === undefined ? true : o.solid, o.knock);
    return this;
  }
  _emit(out, ink, alpha, solid, knock) {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (let i = 0; i < out.length; i += 2) { const x = out[i], y = out[i + 1]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    this.dl.poly(ink | (solid ? F_SOLID : 0) | (knock ? F_KNOCK : 0), alpha, out, x0, y0, x1, y1);
  }
  /* ---- filled polygon (wobbly edges) ---- */
  fill(pts, o = {}) {
    let p = flat(pts);
    if (p.length < 6) return this;
    const ink = inkMask(o.ink === undefined ? 'B' : o.ink); if (!ink && !o.knock) return this;
    p = this.tp(p);
    const smoothOn = o.smooth !== undefined ? o.smooth : false;
    const q = smoothOn ? catmull(p, true, 3) : densify(p, true, 4);
    const n = q.length / 2;
    const amp = (o.wob === undefined ? 0.45 : o.wob) * this.wobK;
    const rng = this.prng();
    let L = 0; const S = new Float32Array(n);
    for (let i = 1; i < n; i++) { L += Math.hypot(q[i * 2] - q[i * 2 - 2], q[i * 2 + 1] - q[i * 2 - 1]); S[i] = L; }
    L += Math.hypot(q[0] - q[n * 2 - 2], q[1] - q[n * 2 - 1]);
    const K1 = Math.max(2, Math.round(L / 14)), K2 = Math.max(3, Math.round(L / 5));
    const A = fillLattice(rng, K1, true), B = fillLattice(rng, K2, true);
    const out = new Array(n * 2);
    for (let i = 0; i < n; i++) {
      const i0 = (i - 1 + n) % n, i1 = (i + 1) % n;
      let tx = q[i1 * 2] - q[i0 * 2], ty = q[i1 * 2 + 1] - q[i0 * 2 + 1];
      const tn = Math.hypot(tx, ty) || 1; tx /= tn; ty /= tn;
      const u = S[i] / L;
      const d = amp * (lat(A, u * K1) + 0.45 * lat(B, u * K2));
      out[i * 2] = q[i * 2] - ty * d; out[i * 2 + 1] = q[i * 2 + 1] + tx * d;
    }
    const t = o.t === undefined ? 1 : o.t;
    this._emit(out, ink, t, o.solid === undefined ? t >= 0.999 : o.solid, o.knock);
    return this;
  }
  knock(pts, o = {}) { return this.fill(pts, Object.assign({}, o, { knock: true, ink: 'B', t: 1, wob: o.wob === undefined ? 0 : o.wob })); }
  dot(x, y, r, o = {}) {
    const ink = inkMask(o.ink === undefined ? 'B' : o.ink); if (!ink) return this;
    const [wx, wy] = this.pt(x, y);
    const t = o.t === undefined ? 1 : o.t;
    this.dl.circle(ink | ((o.solid === undefined ? t >= 0.999 : o.solid) ? F_SOLID : 0), t, wx, wy, r * this.scale);
    return this;
  }
  /* ---- shapes. Fill options: fi (ink), ft (tint). Stroke options: ink, w ---- */
  _shape(pts, o, closedSmooth) {
    if (o.fi) this.fill(pts, { ink: o.fi, t: o.ft === undefined ? 1 : o.ft, smooth: closedSmooth, wob: o.fwob });
    if (o.fi2) this.fill(pts, { ink: o.fi2, t: o.ft2 === undefined ? 1 : o.ft2, smooth: closedSmooth, wob: o.fwob });
    if (o.ink !== '' && o.ink !== null && o.w !== 0) this.stroke(pts, { ink: o.ink === undefined ? 'B' : o.ink, w: o.w === undefined ? 1.1 : o.w, closed: true, smooth: closedSmooth, wob: o.wob, t: o.st });
    return this;
  }
  ellipse(cx, cy, rx, ry, o = {}) {
    const per = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
    const n = clamp(Math.round(per / 3.2), 10, 96), rot = o.rot ? rad(o.rot) : 0, cr = Math.cos(rot), sr = Math.sin(rot);
    const a0 = o.a0 === undefined ? 0 : o.a0;
    const p = [];
    for (let i = 0; i < n; i++) {
      const a = a0 + TAU * i / n, x = Math.cos(a) * rx, y = Math.sin(a) * ry;
      p.push(cx + x * cr - y * sr, cy + x * sr + y * cr);
    }
    return this._shape(p, o, true);
  }
  circle(cx, cy, r, o) { return this.ellipse(cx, cy, r, r, o); }
  rect(x, y, w, h, o = {}) { return this._shape([x, y, x + w, y, x + w, y + h, x, y + h], o, false); }
  rrectPts(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    const p = [], seg = 5;
    const corner = (cx, cy, a0) => { for (let i = 0; i <= seg; i++) { const a = a0 + (PI / 2) * i / seg; p.push(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } };
    corner(x + w - r, y + r, -PI / 2); corner(x + w - r, y + h - r, 0); corner(x + r, y + h - r, PI / 2); corner(x + r, y + r, PI);
    return p;
  }
  rrect(x, y, w, h, r, o = {}) { return this._shape(this.rrectPts(x, y, w, h, r), o, false); }
  knockRRect(x, y, w, h, r) { return this.knock(this.rrectPts(x, y, w, h, r)); }
  poly(pts, o = {}) { return this._shape(flat(pts), o, o.smooth === true); }
  line(x1, y1, x2, y2, o = {}) { return this.stroke([x1, y1, x2, y2], Object.assign({ smooth: false }, o)); }
  curve(pts, o = {}) { return this.stroke(pts, Object.assign({ smooth: true }, o)); }
  arc(cx, cy, rx, ry, a0, a1, o = {}) {
    const n = Math.max(6, Math.ceil(Math.abs(a1 - a0) * Math.max(rx, ry) / 3.5)), p = [];
    const rot = o.rot ? rad(o.rot) : 0, cr = Math.cos(rot), sr = Math.sin(rot);
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n, x = Math.cos(a) * rx, y = Math.sin(a) * ry; p.push(cx + x * cr - y * sr, cy + x * sr + y * cr); }
    return this.stroke(p, Object.assign({ smooth: false }, o));
  }
  bez(p0, p1, p2, p3, o = {}) {
    const L = Math.hypot(p3[0] - p0[0], p3[1] - p0[1]) + Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) + Math.hypot(p3[0] - p2[0], p3[1] - p2[1]);
    const n = Math.max(6, Math.ceil(L / 5)), p = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
      p.push(a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]);
    }
    return this.stroke(p, Object.assign({ smooth: false }, o));
  }
  /* arrow along pts (curve); head at end (and start if both) */
  arrow(pts, o = {}) {
    const p = flat(pts); const n = p.length / 2;
    const w = o.w === undefined ? 1.1 : o.w, hs = o.hs === undefined ? 3.4 + w * 2.2 : o.hs;
    const pp = p.slice();
    const head =(ex, ey, bx, by) => {
      const dx = ex - bx, dy = ey - by, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
      const tri = [ex, ey, ex - ux * hs - uy * hs * 0.5, ey - uy * hs + ux * hs * 0.5, ex - ux * hs * 0.45, ey - uy * hs * 0.45, ex - ux * hs + uy * hs * 0.5, ey - uy * hs - ux * hs * 0.5];
      this.fill(tri, { ink: o.ink === undefined ? 'B' : o.ink, wob: 0.12, solid: true });
    };
    const back = (idx, dir) => { let j = idx; const ex = p[idx * 2], ey = p[idx * 2 + 1]; while (j + dir >= 0 && j + dir < n && Math.hypot(p[j * 2] - ex, p[j * 2 + 1] - ey) < hs * 0.9) j += dir; return [p[j * 2], p[j * 2 + 1]]; };
    if (o.noHead !== true) {
      const e = [p[(n - 1) * 2], p[(n - 1) * 2 + 1]], b = back(n - 1, -1);
      head(e[0], e[1], b[0], b[1]);
      const dx = e[0] - b[0], dy = e[1] - b[1], d = Math.hypot(dx, dy) || 1;
      pp[(n - 1) * 2] = e[0] - dx / d * hs * 0.5; pp[(n - 1) * 2 + 1] = e[1] - dy / d * hs * 0.5;
      if (o.both) {
        const s = [p[0], p[1]], b2 = back(0, 1);
        head(s[0], s[1], b2[0], b2[1]);
        const dx2 = s[0] - b2[0], dy2 = s[1] - b2[1], d2 = Math.hypot(dx2, dy2) || 1;
        pp[0] = s[0] - dx2 / d2 * hs * 0.5; pp[1] = s[1] - dy2 / d2 * hs * 0.5;
      }
    }
    return this.stroke(pp, Object.assign({ smooth: n > 2 && o.smooth !== false, taper: 'start' }, o));
  }
  /* ---- hatching and stippling ---- */
  hatch(pts, ang, sp, o = {}) {
    const p = flat(pts), a = rad(ang), ca = Math.cos(-a), sa = Math.sin(-a), cb = Math.cos(a), sb = Math.sin(a);
    const r = []; let ymin = 1e9, ymax = -1e9;
    for (let i = 0; i < p.length; i += 2) { const x = p[i] * ca - p[i + 1] * sa, y = p[i] * sa + p[i + 1] * ca; r.push(x, y); if (y < ymin) ymin = y; if (y > ymax) ymax = y; }
    const inset = o.inset || 0, skip = o.skip || 0;
    if (this.lo) sp *= 2.2;
    for (let y = ymin + sp * 0.5 + (o.off || 0); y < ymax; y += sp) {
      const xs = [];
      for (let i = 0, n = r.length, j = n - 2; i < n; j = i, i += 2) {
        const yi = r[i + 1], yj = r[j + 1];
        if ((yi <= y && yj > y) || (yj <= y && yi > y)) xs.push(r[i] + (y - yi) / (yj - yi) * (r[j] - r[i]));
      }
      xs.sort((u, v) => u - v);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const x0 = xs[k] + inset, x1 = xs[k + 1] - inset; if (x1 - x0 < 0.6) continue;
        if (skip && this.rng() < skip) continue;
        this.stroke([x0 * cb - y * sb, x0 * sb + y * cb, x1 * cb - y * sb, x1 * sb + y * cb], { ink: o.ink === undefined ? 'B' : o.ink, w: o.w === undefined ? 0.5 : o.w, wob: o.wob === undefined ? 0.35 : o.wob, smooth: false, t: o.t, tl: 3 });
      }
    }
    return this;
  }
  stipple(pts, dens, r, o = {}) { // dens = dots per 100 u^2
    const p = flat(pts); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); y0 = Math.min(y0, p[i + 1]); y1 = Math.max(y1, p[i + 1]); }
    const area = Math.abs(polyArea(p)), cnt = Math.min(4000, Math.round(area * dens / 100));
    const vj = o.jit === undefined ? 0.35 : o.jit;
    let made = 0, tries = 0;
    while (made < cnt && tries < cnt * 12) {
      tries++;
      const x = x0 + this.rng() * (x1 - x0), y = y0 + this.rng() * (y1 - y0);
      const rr = r * (0.6 + this.rng() * 0.8);
      if (pointInPoly(x, y, p)) { const jx = (this.vr() - 0.5) * vj, jy = (this.vr() - 0.5) * vj; if (!this.lo) this.dot(x + jx, y + jy, rr, { ink: o.ink === undefined ? 'B' : o.ink, t: o.t }); made++; }
    }
    return this;
  }
  /* scatter dots randomly in an ellipse/rect region using structural rng */
  scatter(cx, cy, rx, ry, n, r, o = {}) {
    for (let i = 0; i < n; i++) {
      const a = this.rng() * TAU, d = Math.sqrt(this.rng());
      const px = cx + Math.cos(a) * rx * d + (this.vr() - 0.5) * 0.3, py = cy + Math.sin(a) * ry * d + (this.vr() - 0.5) * 0.3, rr = r * (0.7 + this.rng() * 0.6);
      if (!this.lo) this.dot(px, py, rr, o);
    }
    return this;
  }
  /* ---- text ---- */
  text(str, x, y, size = 8, o = {}) {
    if (this.lo && size < 12) return this;
    const toks = parseLabel(String(str)), k = size / 7;
    let width = 0;
    for (const t of toks) { const g = glyphStrokes(t.ch); width += (g.w + 1.1) * k * (t.lvl ? 0.68 : 1); }
    width -= 1.1 * k;
    let cx = o.al === 'c' ? -width / 2 : o.al === 'r' ? -width : 0;
    const ink = o.ink === undefined ? 'B' : o.ink;
    const w = o.w === undefined ? Math.max(0.5, size * 0.13 + 0.08) : o.w;
    this.push(x, y, o.rot ? rad(o.rot) : 0, 1);
    const wk = this.wobK; this.wobK *= 0.55;
    for (const t of toks) {
      const g = glyphStrokes(t.ch), ks = k * (t.lvl ? 0.68 : 1), oy = t.lvl === 1 ? -3.4 * k : t.lvl === -1 ? 2.3 * k : 0;
      for (const s of g.strokes) {
        const pts = new Array(s.pts.length);
        for (let i = 0; i < s.pts.length; i += 2) { pts[i] = cx + s.pts[i] * ks; pts[i + 1] = (s.pts[i + 1] - 7) * ks + oy; }
        if (s.pts.length === 4 && Math.hypot(s.pts[2] - s.pts[0], s.pts[3] - s.pts[1]) < 0.8) {
          this.dot((pts[0] + pts[2]) / 2, (pts[1] + pts[3]) / 2, w * 0.62, { ink });
        } else this.stroke(pts, { ink, w: w * (t.lvl ? 0.85 : 1), wob: 0.2, smooth: s.mode > 0, closed: s.mode === 2, tl: size * 0.22, taper: 'both' });
      }
      cx += (g.w + 1.1) * ks;
    }
    this.wobK = wk;
    this.pop();
    return this;
  }
}
