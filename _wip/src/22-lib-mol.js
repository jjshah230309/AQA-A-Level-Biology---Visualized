/* ===================== 22 LIB MOLECULES: sugars, lipids, amino acids, nucleotides, ATP, water ===================== */
/* Haworth hexose ring. (cx,cy) centre, r = half-width. Draws ring O at back-right, C1 right ... Returns anchor points. */
Recorder.prototype.hexose = function (cx, cy, r, o = {}) {
  const R = this, beta = !!o.beta, fs = o.fs || Math.max(3.4, r * 0.3), ink = o.ink || 'B', ring = o.ring === undefined ? 'Y' : o.ring;
  const P = {
    O: [cx + 0.55 * r, cy - 0.42 * r], C1: [cx + 1.0 * r, cy + 0.12 * r], C2: [cx + 0.52 * r, cy + 0.62 * r],
    C3: [cx - 0.52 * r, cy + 0.62 * r], C4: [cx - 1.0 * r, cy + 0.12 * r], C5: [cx - 0.5 * r, cy - 0.42 * r],
  };
  const poly = [P.O, P.C1, P.C2, P.C3, P.C4, P.C5];
  if (ring) R.fill(poly.flat(), { ink: ring, t: o.rt === undefined ? 0.45 : o.rt, wob: 0.2 });
  // ring bonds; front edge (C2-C3) bold
  const bond = (a, b, w) => R.line(a[0], a[1], b[0], b[1], { ink, w, wob: 0.18, taper: 'none' });
  bond(P.C5, P.O, 1.1); bond(P.O, P.C1, 1.1); bond(P.C1, P.C2, 1.2); bond(P.C2, P.C3, 2.2); bond(P.C3, P.C4, 1.2); bond(P.C4, P.C5, 1.1);
  const sub = (p, dx, dy, lab, al, bold) => {
    const q = [p[0] + dx * r, p[1] + dy * r];
    R.line(p[0], p[1], q[0], q[1], { ink, w: 0.8, wob: 0.1, taper: 'none' });
    if (lab) R.text(lab, q[0] + (al === 'l' ? 0.35 : al === 'r' ? -0.35 : 0) * fs, q[1] + (dy > 0 ? fs * 0.95 : -fs * 0.25), fs, { ink, al: al || 'c' });
  };
  R.text('O', P.O[0], P.O[1] - fs * 0.25 + 0.2, fs, { ink, al: 'c' });
  R.knock([P.O[0] - fs * 0.5, P.O[1] - fs * 0.9, P.O[0] + fs * 0.5, P.O[1] - fs * 0.9, P.O[0] + fs * 0.5, P.O[1] + fs * 0.2, P.O[0] - fs * 0.5, P.O[1] + fs * 0.2]);
  R.fill([P.O[0] - fs * 0.5, P.O[1] - fs * 0.9, P.O[0] + fs * 0.5, P.O[1] - fs * 0.9, P.O[0] + fs * 0.5, P.O[1] + fs * 0.2, P.O[0] - fs * 0.5, P.O[1] + fs * 0.2], { ink: ring || 'Y', t: o.rt === undefined ? 0.45 : o.rt, wob: 0 });
  R.text('O', P.O[0], P.O[1] + fs * 0.25, fs, { ink, al: 'c' });
  // substituents (D-glucose): C1 OH down(alpha)/up(beta); C2 OH down; C3 OH up; C4 OH down; C5 CH2OH up
  if (!o.noSubs) {
    const c1Down = !beta;
    if (!o.c1bond) {
      sub(P.C1, 0.12, c1Down ? 0.5 : -0.5, 'OH', 'c'); sub(P.C1, 0.12, c1Down ? -0.45 : 0.45, o.hs === false ? '' : 'H', 'c');
    }
    sub(P.C2, 0.02, 0.5, 'OH', 'c'); if (o.hs !== false) sub(P.C2, 0.02, -0.42, 'H', 'c');
    sub(P.C3, -0.02, -0.52, 'OH', 'c'); if (o.hs !== false) sub(P.C3, -0.02, 0.45, 'H', 'c');
    if (!o.c4bond) { sub(P.C4, -0.12, 0.5, 'OH', 'c'); if (o.hs !== false) sub(P.C4, -0.12, -0.45, 'H', 'c'); }
    // C5: CH2OH up
    const c6 = [P.C5[0] - 0.05 * r, P.C5[1] - 0.58 * r];
    R.line(P.C5[0], P.C5[1], c6[0], c6[1], { ink, w: 0.9, wob: 0.1, taper: 'none' });
    R.text('CH_2OH', c6[0], c6[1] - fs * 0.15, fs, { ink, al: 'c' });
    if (o.hs !== false) { R.line(P.C5[0], P.C5[1], P.C5[0] + 0.18 * r, P.C5[1] + 0.4 * r, { ink, w: 0.8, wob: 0.1, taper: 'none' }); }
  }
  return P;
};
/* fructose (furanose) simplified 5-ring */
Recorder.prototype.fructose = function (cx, cy, r, o = {}) {
  const R = this, fs = o.fs || Math.max(3.4, r * 0.3), ink = 'B';
  const P = { O: [cx + 0.0 * r, cy - 0.55 * r], C2: [cx + 0.85 * r, cy - 0.1 * r], C3: [cx + 0.5 * r, cy + 0.55 * r], C4: [cx - 0.5 * r, cy + 0.55 * r], C5: [cx - 0.85 * r, cy - 0.1 * r] };
  const poly = [P.O, P.C2, P.C3, P.C4, P.C5];
  R.fill(poly.flat(), { ink: 'Y', t: 0.45, wob: 0.2 });
  R.poly(poly.flat(), { ink, w: 1.2, wob: 0.2 });
  R.text('O', P.O[0], P.O[1] + fs * 0.35, fs, { ink, al: 'c' });
  return P;
};
/* galactose differs from glucose at C4 (OH up) */
/* glucose chain of n rings joined 1-4 (alpha: all same orientation; beta: alternate flipped) */

/* ---- amino acid (general structure) ---- */
Recorder.prototype.aminoAcid = function (cx, cy, s, o = {}) {
  const R = this, fs = o.fs || s * 0.34, ink = 'B', rg = o.rlabel || 'R';
  // central C with NH2 left, COOH right, H down, R up
  R.text('C', cx, cy + fs * 0.35, fs * 1.1, { ink, al: 'c' });
  R.line(cx - s * 0.18, cy, cx - s * 0.62, cy, { ink, w: 0.9, taper: 'none', wob: 0.1 });
  R.line(cx + s * 0.18, cy, cx + s * 0.62, cy, { ink, w: 0.9, taper: 'none', wob: 0.1 });
  R.line(cx, cy + s * 0.2, cx, cy + s * 0.55, { ink, w: 0.9, taper: 'none', wob: 0.1 });
  R.line(cx, cy - s * 0.2, cx, cy - s * 0.55, { ink, w: 0.9, taper: 'none', wob: 0.1 });
  R.fill(roundBox(cx - s * 1.13, cy - fs * 0.85, s * 0.5, fs * 1.7), { ink: 'T', t: 0.4, wob: 0.1 });
  R.text('H_2N', cx - s * 0.88, cy + fs * 0.35, fs, { ink, al: 'c' });
  R.fill(roundBox(cx + s * 0.62, cy - fs * 0.85, s * 0.75, fs * 1.7), { ink: 'P', t: 0.4, wob: 0.1 });
  R.text('COOH', cx + s * 1.0, cy + fs * 0.35, fs, { ink, al: 'c' });
  R.text('H', cx, cy + s * 0.55 + fs * 1.0, fs, { ink, al: 'c' });
  R.fill(roundBox(cx - fs * 0.9, cy - s * 0.55 - fs * 1.3, fs * 1.8, fs * 1.3), { ink: 'Y', t: 0.7, wob: 0.1 });
  R.text(rg, cx, cy - s * 0.55 - fs * 0.25, fs * 1.05, { ink, al: 'c' });
};
function roundBox(x, y, w, h) { return [x, y, x + w, y, x + w, y + h, x, y + h]; }

/* ---- nucleotide: phosphate (circle), pentose (pentagon), base (rect) ---- */
Recorder.prototype.nucleotide = function (x, y, o = {}) {
  const R = this, s = o.s || 10, base = o.base || 'A', ang = o.rot || 0, ink = 'B';
  R.push(x, y, rad(ang), 1);
  const bcol = { A: 'P', T: 'T', U: 'T', G: 'Y', C: 'TY' }[base] || 'T';
  // phosphate
  R.circle(-s * 1.15, -s * 0.35, s * 0.42, { ink, w: 1.0, fi: 'Y', ft: 1 }); R.text('P', -s * 1.15, -s * 0.35 + s * 0.22, s * 0.52, { ink, al: 'c' });
  // pentose
  const pent = []; for (let k = 0; k < 5; k++) pent.push(Math.cos(-PI / 2 + k * TAU / 5) * s * 0.52, Math.sin(-PI / 2 + k * TAU / 5) * s * 0.52 - s * 0.05);
  R.poly(pent, { ink, w: 1.1, fi: 'P', ft: 0.22 });
  R.line(-s * 0.46, -s * 0.2, -s * 0.8, -s * 0.33, { ink, w: 0.9, taper: 'none' });
  // base
  const bw = base === 'A' || base === 'G' ? s * 1.15 : s * 0.8;
  R.line(s * 0.5, 0, s * 0.75, 0, { ink, w: 0.9, taper: 'none' });
  R.fill(roundBox(s * 0.75, -s * 0.38, bw, s * 0.76), { ink: bcol, t: 0.7, wob: 0.1 }); R.rect(s * 0.75, -s * 0.38, bw, s * 0.76, { ink, w: 0.9, wob: 0.12 });
  R.text(base, s * 0.75 + bw / 2, s * 0.17, s * 0.62, { ink, al: 'c' });
  R.pop();
};

/* ---- ATP molecule symbol: adenine box, ribose pentagon, 3 phosphates ---- */
Recorder.prototype.atpMol = function (x, y, s, o = {}) {
  const R = this, ink = 'B', n = o.phos === undefined ? 3 : o.phos;
  const pent = []; for (let k = 0; k < 5; k++) pent.push(x + Math.cos(-PI / 2 + k * TAU / 5) * s * 0.5, y + Math.sin(-PI / 2 + k * TAU / 5) * s * 0.5);
  R.fill(roundBox(x - s * 1.8, y - s * 0.4, s * 1.1, s * 0.8), { ink: 'T', t: 0.7, wob: 0.1 }); R.rect(x - s * 1.8, y - s * 0.4, s * 1.1, s * 0.8, { ink, w: 1, wob: 0.1 });
  R.text('adenine', x - s * 1.25, y + s * 0.15, s * 0.42, { ink, al: 'c' });
  R.line(x - s * 0.7, y, x - s * 0.45, y, { ink, w: 0.9, taper: 'none' });
  R.poly(pent, { ink, w: 1.1, fi: 'P', ft: 0.45 }); R.text('ribose', x, y + s * 0.15, s * 0.36, { ink, al: 'c' });
  for (let i = 0; i < n; i++) {
    const px = x + s * (0.95 + i * 0.95); R.line(px - s * 0.45, y, px - s * 0.18, y, { ink, w: 0.9, taper: 'none' });
    R.circle(px, y, s * 0.36, { ink, w: 1.0, fi: 'Y', ft: 1 }); R.text('P', px, y + s * 0.2, s * 0.5, { ink, al: 'c' });
  }
};

/* ---- water molecule (bent) with partial charges: returns H positions ---- */
Recorder.prototype.water = function (x, y, s, rot = 0, o = {}) {
  const R = this; R.push(x, y, rad(rot), 1);
  const hx = s * 0.78, hy = s * 0.62;
  R.line(0, 0, -hx, hy, { ink: 'B', w: 0.9, taper: 'none' }); R.line(0, 0, hx, hy, { ink: 'B', w: 0.9, taper: 'none' });
  R.circle(0, 0, s * 0.48, { ink: 'B', w: 0.9, fi: 'T', ft: 0.9 }); R.text('O', 0, s * 0.18, s * 0.58, { ink: 'B', al: 'c' });
  for (const sx of [-1, 1]) { R.circle(sx * hx, hy, s * 0.3, { ink: 'B', w: 0.8, fi: 'T', ft: 0.25 }); R.text('H', sx * hx, hy + s * 0.12, s * 0.38, { ink: 'B', al: 'c' }); }
  if (o.charges) { R.text('δ−', -s * 0.05, -s * 0.78, s * 0.5, { ink: 'P', al: 'c' }); R.text('δ+', -hx, hy + s * 0.82, s * 0.45, { ink: 'P', al: 'c' }); R.text('δ+', hx, hy + s * 0.82, s * 0.45, { ink: 'P', al: 'c' }); }
  R.pop();
};
Recorder.prototype.dashedLine = function (x1, y1, x2, y2, o = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1), d = o.d || 2.2, n = Math.max(1, Math.floor(L / (d * 2)));
  for (let i = 0; i < n; i++) { const u0 = i / n, u1 = u0 + 0.5 / n; this.line(x1 + (x2 - x1) * u0, y1 + (y2 - y1) * u0, x1 + (x2 - x1) * u1, y1 + (y2 - y1) * u1, { ink: o.ink || 'B', w: o.w || 0.8, wob: 0.06, taper: 'none' }); }
};
/* ---- fatty-acid zig-zag chain from (x,y) heading along ang(deg) with n carbons; db = indices of C=C ---- */
Recorder.prototype.zigzag = function (x, y, ang, n, step, o = {}) {
  const R = this, a = rad(ang), p = [x, y], ink = o.ink || 'B', dbs = o.db || [];
  const nx = -Math.sin(a), ny = Math.cos(a), pts = [[x, y]];
  for (let i = 1; i <= n; i++) { const t = i * step, off = (i % 2 ? 1 : -1) * step * 0.28 * (o.kinkAt && o.kinkAt.includes(i) ? 0 : 1); pts.push([x + Math.cos(a) * t + nx * off, y + Math.sin(a) * t + ny * off]); }
  R.stroke(pts.flat(), { ink, w: o.w || 1.0, smooth: false, wob: 0.15, taper: 'none' });
  for (const d of dbs) { const a1 = pts[d], b1 = pts[d + 1], mx = (b1[1] - a1[1]), my = -(b1[0] - a1[0]), L = Math.hypot(mx, my) || 1; R.line(a1[0] + mx / L * 1.3, a1[1] + my / L * 1.3, b1[0] + mx / L * 1.3, b1[1] + my / L * 1.3, { ink, w: 0.8, wob: 0.08, taper: 'none' }); }
  return pts;
};
