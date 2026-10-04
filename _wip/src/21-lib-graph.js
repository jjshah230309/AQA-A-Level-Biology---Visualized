/* ===================== 21 LIB GRAPH: axes, curves, annotations (hand-drawn data graphics) ===================== */
class Graph {
  constructor(R, x, y, w, h, o = {}) {
    this.R = R; this.x = x; this.y = y; this.w = w; this.h = h; this.o = o;
    this.x0 = o.xmin === undefined ? 0 : o.xmin; this.x1 = o.xmax === undefined ? 1 : o.xmax;
    this.y0 = o.ymin === undefined ? 0 : o.ymin; this.y1 = o.ymax === undefined ? 1 : o.ymax;
    this.fs = o.fs || 4.6;
  }
  X(v) { return this.x + (v - this.x0) / (this.x1 - this.x0) * this.w; }
  Y(v) { return this.y + this.h - (v - this.y0) / (this.y1 - this.y0) * this.h; }
  axes(o = {}) {
    const R = this.R, { x, y, w, h } = this, ink = o.ink || 'B';
    if (this.o.paper) { // graph-paper wash: assessment (analysis) look
      const gx = this.o.paper;
      for (let i = 0; i <= w; i += gx) R.line(x + i, y, x + i, y + h, { ink: 'T', w: 0.28, t: 0.7, wob: 0.1, taper: 'none' });
      for (let j = 0; j <= h; j += gx) R.line(x, y + j, x + w, y + j, { ink: 'T', w: 0.28, t: 0.7, wob: 0.1, taper: 'none' });
    }
    R.arrow([x, y + h, x + w + 3, y + h], { ink, w: 1.05, hs: 3.1, wob: 0.25 });
    R.arrow([x, y + h, x, y - 3], { ink, w: 1.05, hs: 3.1, wob: 0.25 });
    if (this.o.xl) R.text(this.o.xl, x + w / 2, y + h + (this.o.xly || 11), this.fs + 0.4, { ink, al: 'c' });
    if (this.o.yl) R.text(this.o.yl, x - (this.o.ylx || 6), y + h / 2, this.fs + 0.4, { ink, al: 'c', rot: -90 });
    for (const t of (this.o.xt || [])) {
      const v = Array.isArray(t) ? t[0] : t, lab = Array.isArray(t) ? t[1] : String(t);
      R.line(this.X(v), y + h - 1.4, this.X(v), y + h + 1.4, { ink, w: 0.7, wob: 0.05, taper: 'none' });
      if (lab !== '') R.text(lab, this.X(v), y + h + 6.8, this.fs, { ink, al: 'c' });
    }
    for (const t of (this.o.yt || [])) {
      const v = Array.isArray(t) ? t[0] : t, lab = Array.isArray(t) ? t[1] : String(t);
      R.line(x - 1.4, this.Y(v), x + 1.4, this.Y(v), { ink, w: 0.7, wob: 0.05, taper: 'none' });
      if (lab !== '') R.text(lab, x - 3.4, this.Y(v) + this.fs * 0.36, this.fs, { ink, al: 'r' });
    }
    return this;
  }
  curve(f, o = {}) { // f: function(x)->y or flat array of data points [x,y,...]
    const n = o.n || 40, pts = [];
    if (typeof f === 'function') { const a = o.from === undefined ? this.x0 : o.from, b = o.to === undefined ? this.x1 : o.to; for (let i = 0; i <= n; i++) { const xv = a + (b - a) * i / n; const yv = f(xv); if (isFinite(yv)) pts.push(this.X(xv), this.Y(clamp(yv, this.y0, this.y1 * 1.0))); } }
    else for (let i = 0; i < f.length; i += 2) pts.push(this.X(f[i]), this.Y(f[i + 1]));
    this.R.stroke(pts, { ink: o.ink || 'P', w: o.w || 1.5, wob: o.wob === undefined ? 0.3 : o.wob, smooth: true, taper: o.taper || 'none' });
    return this;
  }
  poly(pts, o = {}) { // straight data segments with optional point markers
    const p = []; for (let i = 0; i < pts.length; i += 2) p.push(this.X(pts[i]), this.Y(pts[i + 1]));
    this.R.stroke(p, { ink: o.ink || 'P', w: o.w || 1.4, smooth: false, wob: 0.2, taper: 'none' });
    if (o.dots) for (let i = 0; i < p.length; i += 2) this.R.dot(p[i], p[i + 1], o.dr || 1.4, { ink: o.dink || o.ink || 'P' });
    return this;
  }
  area(f, o = {}) { // filled band under f from..to
    const a = o.from === undefined ? this.x0 : o.from, b = o.to === undefined ? this.x1 : o.to, n = o.n || 30, p = [this.X(a), this.Y(0)];
    for (let i = 0; i <= n; i++) { const xv = a + (b - a) * i / n; p.push(this.X(xv), this.Y(f(xv))); }
    p.push(this.X(b), this.Y(0)); this.R.fill(p, { ink: o.ink || 'Y', t: o.t === undefined ? 0.5 : o.t, wob: 0.2 });
    return this;
  }
  dots(pts, o = {}) { for (let i = 0; i < pts.length; i += 2) this.R.dot(this.X(pts[i]), this.Y(pts[i + 1]), o.r || 1.5, { ink: o.ink || 'B' }); return this; }
  err(xv, yv, e, o = {}) { // error bar
    const R = this.R, X = this.X(xv), a = this.Y(yv + e), b = this.Y(yv - e);
    R.line(X, a, X, b, { ink: o.ink || 'B', w: 0.8, wob: 0.08, taper: 'none' }); R.line(X - 1.6, a, X + 1.6, a, { ink: o.ink || 'B', w: 0.8, wob: 0.05, taper: 'none' }); R.line(X - 1.6, b, X + 1.6, b, { ink: o.ink || 'B', w: 0.8, wob: 0.05, taper: 'none' });
    return this;
  }
  hline(v, o = {}) { this.R.line(this.x, this.Y(v), this.x + this.w, this.Y(v), { ink: o.ink || 'B', w: o.w || 0.8, t: o.t, wob: 0.15, taper: 'none' }); if (o.dash) this._dash(this.x, this.Y(v), this.x + this.w, this.Y(v), o); return this; }
  dashed(x1, y1, x2, y2, o = {}) { this._dash(this.X(x1), this.Y(y1), this.X(x2), this.Y(y2), o); return this; }
  _dash(ax, ay, bx, by, o = {}) {
    const L = Math.hypot(bx - ax, by - ay), d = o.d || 3.4, n = Math.max(1, Math.floor(L / (d * 2)));
    for (let i = 0; i < n; i++) { const u0 = i / n, u1 = u0 + 0.5 / n; this.R.line(ax + (bx - ax) * u0, ay + (by - ay) * u0, ax + (bx - ax) * u1, ay + (by - ay) * u1, { ink: o.ink || 'B', w: o.w || 0.7, wob: 0.08, taper: 'none' }); }
  }
  vdrop(xv, yv, o = {}) { this._dash(this.X(xv), this.Y(yv), this.X(xv), this.Y(this.y0), o); return this; }
  hdrop(xv, yv, o = {}) { this._dash(this.X(xv), this.Y(yv), this.X(this.x0), this.Y(yv), o); return this; }
  label(str, xv, yv, o = {}) { this.R.text(str, this.X(xv) + (o.dx || 0), this.Y(yv) + (o.dy || 0), o.size || this.fs, { ink: o.ink || 'B', al: o.al || 'l' }); return this; }
  tangent(xv, yv, slope, len, o = {}) { // slope in data units; draws a straight line through (xv,yv)
    const sx = this.w / (this.x1 - this.x0), sy = this.h / (this.y1 - this.y0), ang = Math.atan2(-slope * sy, sx), L = len || 40;
    const cx = this.X(xv), cy = this.Y(yv);
    this.R.line(cx - Math.cos(ang) * L, cy - Math.sin(ang) * L, cx + Math.cos(ang) * L, cy + Math.sin(ang) * L, { ink: o.ink || 'B', w: o.w || 0.9, wob: 0.12, taper: 'none' });
    return this;
  }
}
Recorder.prototype.graph = function (x, y, w, h, o) { return new Graph(this, x, y, w, h, o); };

/* simple table with header row: cols=[w...], rows=[[...]] */
Recorder.prototype.table = function (x, y, colW, rowH, rows, o = {}) {
  const R = this, W = colW.reduce((a, b) => a + b, 0), H = rows.length * rowH, size = o.size || 4.6;
  R.fill([x, y, x + W, y, x + W, y + rowH, x, y + rowH], { ink: o.hink || 'T', t: 0.35, wob: 0.15 });
  R.rect(x, y, W, H, { ink: 'B', w: 0.9, wob: 0.2 });
  for (let r = 1; r < rows.length; r++) R.line(x, y + r * rowH, x + W, y + r * rowH, { ink: 'B', w: 0.55, wob: 0.1, taper: 'none' });
  let cx = x; for (let c = 0; c < colW.length - 1; c++) { cx += colW[c]; R.line(cx, y, cx, y + H, { ink: 'B', w: 0.55, wob: 0.1, taper: 'none' }); }
  rows.forEach((row, r) => { let tx = x; row.forEach((cell, c) => { R.text(String(cell), tx + colW[c] / 2, y + r * rowH + rowH / 2 + size * 0.36, size, { ink: 'B', al: 'c' }); tx += colW[c]; }); });
  return this;
};
