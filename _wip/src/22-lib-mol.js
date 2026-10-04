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

/* ---- ATP molecule symbol: adenine box, ribose pentagon, n phosphates; (x,y) = left end centre line ---- */
Recorder.prototype.atpMol = function (x, y, s, o = {}) {
  const R = this, ink = 'B', n = o.phos === undefined ? 3 : o.phos, fs = Math.max(3.6, s * 0.27);
  const bw = s * 1.5, bh = s * 1.1, px = x + bw + s * 0.3 + s * 0.62;
  R.fill(roundBox(x, y - bh / 2, bw, bh), { ink: 'T', t: 0.7, wob: 0.1 }); R.rect(x, y - bh / 2, bw, bh, { ink, w: 1.1, wob: 0.12 });
  R.line(x + bw, y, x + bw + s * 0.3, y, { ink, w: 1, taper: 'none' });
  R.poly(polyPts(px, y, s * 0.62, 5), { ink, w: 1.2, fi: 'P', ft: 0.45 });
  if (o.labels !== false) { R.text('adenine', x + bw / 2, y - bh / 2 - 3, fs, { al: 'c' }); R.text('ribose', px + 2, y - s * 0.62 - 3, fs, { al: 'c' }); }
  let cx = px + s * 0.62;
  for (let i = 0; i < n; i++) {
    R.line(cx, y, cx + s * 0.34, y, { ink, w: 1, taper: 'none' }); cx += s * 0.34 + s * 0.45;
    R.circle(cx, y, s * 0.45, { ink, w: 1.1, fi: 'Y', ft: 1 }); R.text('P', cx, y + s * 0.17, s * 0.5, { ink, al: 'c' }); cx += s * 0.45;
  }
  if (o.labels !== false) {
    const x0 = px + s * 0.62 + s * 0.34 - s * 0.4, x1 = cx + 1;
    R.stroke([x0, y - s * 0.78, x0, y - s * 0.95, x1, y - s * 0.95, x1, y - s * 0.78], { ink, w: 0.8, smooth: false, taper: 'none' });
    R.text(n === 3 ? '3 phosphate groups' : n + ' phosphate', (x0 + x1) / 2, y - s * 0.95 - 3, fs, { al: 'c' });
    R.stroke([x, y + bh / 2 + 3, x, y + bh / 2 + 5, px + s * 0.62, y + bh / 2 + 5, px + s * 0.62, y + bh / 2 + 3], { ink, w: 0.8, smooth: false, taper: 'none' });
    R.text('adenosine', (x + px + s * 0.62) / 2, y + bh / 2 + 5 + fs + 1, fs, { al: 'c' });
  }
  return { end: cx, px };
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

/* fatty-acid chain (skeletal): turtle zig-zag from (x,y) heading `ang` deg; n bonds of length `step`.
   o.db = index of bond that is C=C (cis: chain bends after it). Returns vertex list. */
Recorder.prototype.fa = function (x, y, ang, n, step, o = {}) {
  const R = this, ink = o.ink || 'B', pts = [[x, y]];
  let h = rad(ang), px = x, py = y;
  for (let i = 1; i <= n; i++) {
    const dir = (i % 2 ? 1 : -1) * rad(30) * (o.flip ? -1 : 1);
    if (o.db !== undefined && i === o.db + 2) h += rad(o.bend === undefined ? 62 : o.bend) * (o.flip ? -1 : 1);
    px += Math.cos(h + dir) * step; py += Math.sin(h + dir) * step; pts.push([px, py]);
  }
  R.stroke(pts.flat(), { ink, w: o.w || 1.05, smooth: false, wob: 0.14, taper: 'none' });
  if (o.db !== undefined) {
    const a = pts[o.db], b = pts[o.db + 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * 1.5, ny = dx / L * 1.5;
    R.line(a[0] + nx, a[1] + ny, b[0] + nx, b[1] + ny, { ink, w: 0.9, wob: 0.08, taper: 'none' });
  }
  return pts;
};

/* polypeptide backbone N-Ca-C(=O)-N-... with R groups; n residues; peptide bonds highlighted. returns centres of peptide bonds */
Recorder.prototype.peptide = function (x, y, n, step, o = {}) {
  const R = this, fs = o.fs || 4.6, ink = 'B', rs = o.rs || ['R₁', 'R₂', 'R₃', 'R₄'], bonds = [];
  const atoms = [];
  for (let i = 0; i < n; i++) { atoms.push({ t: 'N', i }); atoms.push({ t: 'C', i }); atoms.push({ t: 'K', i }); } // N, Calpha, C(=O)
  const pos = atoms.map((a, k) => [x + k * step, y + (k % 2 ? -1 : 1) * step * 0.26]);
  for (let k = 0; k < atoms.length - 1; k++) R.line(pos[k][0], pos[k][1], pos[k + 1][0], pos[k + 1][1], { ink, w: 1.1, taper: 'none', wob: 0.12 });
  atoms.forEach((a, k) => {
    const [px, py] = pos[k], up = k % 2 ? -1 : 1;
    if (a.t === 'N') { R.knock(polyPts(px, py, fs * 0.8, 8)); R.text('N', px, py + fs * 0.36, fs, { al: 'c' }); R.line(px, py + up * fs * 0.8, px, py + up * (fs * 0.8 + step * 0.35), { ink, w: 0.9, taper: 'none' }); R.text('H', px, py + up * (fs * 0.8 + step * 0.35 + (up > 0 ? fs * 0.95 : -0.2)), fs * 0.9, { al: 'c' }); }
    else if (a.t === 'K') {
      R.line(px, py, px, py - step * 0.5 * (up > 0 ? 1 : 1) * -up * -1, { ink, w: 0.9, taper: 'none' });
      const oy = py + up * step * 0.5; R.line(px - 0.9, py, px - 0.9, oy, { ink, w: 0.8, taper: 'none' }); R.line(px + 0.9, py, px + 0.9, oy, { ink, w: 0.8, taper: 'none' }); R.text('O', px, oy + (up > 0 ? fs * 0.95 : -0.1), fs, { al: 'c' });
      if (k < atoms.length - 1) bonds.push([(px + pos[k + 1][0]) / 2, (py + pos[k + 1][1]) / 2]);
    } else {
      const ry = py + up * step * 0.55; R.line(px, py, px, ry, { ink, w: 0.95, taper: 'none' });
      const rb = roundBox(px - fs * 0.95, up > 0 ? ry : ry - fs * 1.35, fs * 1.9, fs * 1.35); R.fill(rb, { ink: o.rc ? o.rc[a.i % o.rc.length] : 'Y', t: 0.7, wob: 0.1 });
      R.text(rs[a.i % rs.length], px, (up > 0 ? ry + fs * 1.0 : ry - fs * 0.3), fs * 0.95, { al: 'c' });
      R.line(px - step * 0.28, py, px - step * 0.28, py + up * -fs * 0.0, { ink, w: 0.01 });
    }
  });
  if (o.ends) { // free ends: H on the amino terminus, OH on the carboxyl terminus
    const f0 = pos[0], fl = pos[pos.length - 1];
    R.line(f0[0], f0[1], f0[0] - step * 0.45, f0[1] + step * 0.2, { ink, w: 0.9, taper: 'none' }); R.text('H', f0[0] - step * 0.45 - fs * 0.5, f0[1] + step * 0.2 + fs * 0.4, fs, { al: 'c' });
    const up2 = (atoms.length - 1) % 2 ? -1 : 1; R.line(fl[0], fl[1], fl[0] + step * 0.45, fl[1] - up2 * step * 0.1, { ink, w: 0.9, taper: 'none' }); R.text('OH', fl[0] + step * 0.45 + fs * 0.9, fl[1] - up2 * step * 0.1 + fs * 0.4, fs, { al: 'c' });
  }
  if (o.mark !== false) bonds.forEach(b => R.bondMark(b[0], b[1], step * 0.34, { w: 1.3 }));
  return { pos, bonds };
};
