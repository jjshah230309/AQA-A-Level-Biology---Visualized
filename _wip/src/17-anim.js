/* ===================== 17 ANIMATED LAYER (moving parts, redrawn each frame) =====================
   Drawn with multiply blending in solid ink colours, offset by each ink's misregistration. */
const Anim = {
  sc: null, Z: 1, t: 0, v: 0,
  drawAll(now, v) {
    const Z = cam.z * DPR, hw = CW / 2 / Z, hh = CH / 2 / Z;
    for (const sc of SCENES) {
      if (!sc.anim) continue;
      if (sc.x > cam.x + hw || sc.x + sc.w < cam.x - hw || sc.y > cam.y + hh || sc.y + sc.h < cam.y - hh) continue;
      if (sc.w * Z < 170) continue;
      this.sc = sc; this.Z = Z; this.t = now; this.v = v;
      ctx.save();
      ctx.beginPath(); ctx.rect((sc.x - cam.x) * Z + CW / 2, (sc.y - cam.y) * Z + CH / 2, sc.w * Z, sc.h * Z); ctx.clip();
      ctx.globalCompositeOperation = 'multiply';
      sc.anim(this, sc);
      ctx.restore();
    }
  },
  /* world->device for a scene-local point with ink misregistration */
  X(x, ink) { const m = MISREG[INK[ink].idx]; return (this.sc.x + x + m[0] - cam.x) * this.Z + CW / 2; },
  Y(y, ink) { const m = MISREG[INK[ink].idx]; return (this.sc.y + y + m[1] - cam.y) * this.Z + CH / 2; },
  /* repeating phase 0..1 */
  ph(period, off = 0) { return (((this.t / period) + off) % 1 + 1) % 1; },
  /* tiny hand-drawn tremble, different on each of the 3 variants */
  j(i, a = 0.35) { const h = mix2(i * 97 + 13, this.v * 31 + 5); return [((h & 1023) / 1023 - 0.5) * a, (((h >> 10) & 1023) / 1023 - 0.5) * a]; },
  col(ink, a) { const c = INK[ink].rgb; return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a === undefined ? 1 : a) + ')'; },
  dot(x, y, r, ink = 'P', a = 1, i = 0) {
    const jj = this.j(i); ctx.fillStyle = this.col(ink, a);
    ctx.beginPath(); ctx.arc(this.X(x + jj[0], ink), this.Y(y + jj[1], ink), Math.max(0.5, r * this.Z), 0, TAU); ctx.fill();
  },
  ring(x, y, r, ink = 'B', w = 0.9, a = 1, i = 0) {
    const jj = this.j(i); ctx.strokeStyle = this.col(ink, a); ctx.lineWidth = Math.max(1, w * this.Z);
    ctx.beginPath(); ctx.arc(this.X(x + jj[0], ink), this.Y(y + jj[1], ink), Math.max(0.5, r * this.Z), 0, TAU); ctx.stroke();
  },
  line(x1, y1, x2, y2, ink = 'B', w = 0.9, a = 1) {
    ctx.strokeStyle = this.col(ink, a); ctx.lineWidth = Math.max(1, w * this.Z); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(this.X(x1, ink), this.Y(y1, ink)); ctx.lineTo(this.X(x2, ink), this.Y(y2, ink)); ctx.stroke();
  },
  poly(p, ink = 'P', a = 1, closed = true, w = 0) {
    ctx.beginPath();
    for (let i = 0; i < p.length; i += 2) { const X = this.X(p[i], ink), Y = this.Y(p[i + 1], ink); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    if (closed) ctx.closePath();
    if (w) { ctx.strokeStyle = this.col(ink, a); ctx.lineWidth = Math.max(1, w * this.Z); ctx.stroke(); } else { ctx.fillStyle = this.col(ink, a); ctx.fill(); }
  },
  /* position along a polyline (flat array) at u in [0,1]; returns [x,y,angle] */
  along(p, u) {
    const n = p.length / 2; let L = 0; const seg = [];
    for (let i = 1; i < n; i++) { const d = Math.hypot(p[i * 2] - p[i * 2 - 2], p[i * 2 + 1] - p[i * 2 - 1]); seg.push(d); L += d; }
    let s = clamp(u, 0, 1) * L;
    for (let i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { const t = seg[i] ? clamp(s / seg[i], 0, 1) : 0, x0 = p[i * 2], y0 = p[i * 2 + 1], x1 = p[i * 2 + 2], y1 = p[i * 2 + 3]; return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, Math.atan2(y1 - y0, x1 - x0)]; }
      s -= seg[i];
    }
    return [p[0], p[1], 0];
  },
  text(str, x, y, size = 6, ink = 'B', al = 'c') {
    const toks = parseLabel(String(str)), k = size / 7; let width = 0;
    for (const t of toks) width += (glyphStrokes(t.ch).w + 1.1) * k * (t.lvl ? 0.68 : 1);
    width -= 1.1 * k;
    let cx = x - (al === 'c' ? width / 2 : al === 'r' ? width : 0);
    ctx.strokeStyle = this.col(ink); ctx.lineWidth = Math.max(1, size * 0.105 * this.Z); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const t of toks) {
      const g = glyphStrokes(t.ch), ks = k * (t.lvl ? 0.68 : 1), oy = t.lvl === 1 ? -3.4 * k : t.lvl === -1 ? 2.3 * k : 0;
      for (const s of g.strokes) {
        ctx.beginPath();
        for (let i = 0; i < s.pts.length; i += 2) { const X = this.X(cx + s.pts[i] * ks, ink), Y = this.Y(y + (s.pts[i + 1] - 7) * ks + oy, ink); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
        if (s.mode === 2) ctx.closePath(); ctx.stroke();
      }
      cx += (g.w + 1.1) * ks;
    }
  },
  /* ---- small reusable moving sprites ---- */
  ion(x, y, label, ink = 'T', r = 3.2, i = 0) { this.dot(x, y, r, ink, 0.92, i); this.text(label, x, y + r * 0.42, r * 1.25, 'B'); },
  glucose(x, y, r = 3.4, i = 0) { const p = []; for (let k = 0; k < 6; k++) p.push(x + Math.cos(k * TAU / 6 + 0.5) * r, y + Math.sin(k * TAU / 6 + 0.5) * r); this.poly(p, 'Y', 0.95); this.poly(p, 'B', 1, true, 0.55); },
  atp(x, y, r = 3.4, i = 0) { this.dot(x, y, r, 'Y', 0.95, i); this.ring(x, y, r, 'B', 0.5); this.text('ATP', x, y + r * 0.33, r * 0.95, 'B'); },
  photon(x, y, ang = 0, len = 9, i = 0) {
    const p = []; for (let k = 0; k <= 12; k++) { const u = k / 12; p.push(x + Math.cos(ang) * len * u - Math.sin(ang) * Math.sin(u * 14) * 1.7, y + Math.sin(ang) * len * u + Math.cos(ang) * Math.sin(u * 14) * 1.7); }
    this.poly(p, 'Y', 1, false, 1.2);
  },
  electron(x, y, i = 0) { this.dot(x, y, 1.5, 'B', 1, i); this.dot(x, y, 0.75, 'Y', 1, i); },
  rbc(x, y, r = 4, i = 0, a = 0.95) { this.dot(x, y, r, 'P', a, i); this.dot(x, y, r * 0.38, 'Y', 0.3, i); },
};
