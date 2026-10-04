/* ===================== 26 LIB CELL: membranes, proteins, organelles (grows as scenes need it) ===================== */
/* ATP synthase embedded in a membrane at (x,y) (centre of the membrane). s = scale. dir: 1 head below the membrane, -1 above */
Recorder.prototype.atpSynthase = function (x, y, s = 1, o = {}) {
  const R = this, d = o.dir === undefined ? 1 : o.dir;
  R.rrect(x - 5 * s, y - 6 * s, 10 * s, 12 * s, 2.5 * s, { ink: 'B', w: 1.1, fi: 'P', ft: 0.7, wob: 0.15 });      // F0 rotor/channel in membrane
  R.line(x, y + d * 6 * s, x, y + d * 11 * s, { ink: 'B', w: 1.6 * s, taper: 'none', wob: 0.1 });                  // stalk
  R.circle(x, y + d * 17 * s, 6.4 * s, { ink: 'B', w: 1.2, fi: 'T', ft: 0.55 });                                    // F1 head
  R.line(x - 2.2 * s, y + d * 15 * s, x + 2.2 * s, y + d * 19 * s, { ink: 'B', w: 0.7, taper: 'none' });
  return { top: [x, y - d * 6 * s], head: [x, y + d * 17 * s] };
};

/* ---------- membranes ---------- */
/* phospholipid bilayer along a polyline path (flat pts). o: gap (core thickness), hr (head radius), sp (spacing), tail (length), closed */
Recorder.prototype.bilayer = function (pts, o = {}) {
  const R = this, gap = o.gap || 5, hr = o.hr || 1.9, sp = o.sp || 4.6, tail = o.tail || 3.6, closed = !!o.closed;
  let p = catmull(flat(pts), closed, 2); if (closed) p = p.concat([p[0], p[1]]);
  const n = p.length / 2, S = [0];
  for (let i = 1; i < n; i++) S.push(S[i - 1] + Math.hypot(p[i * 2] - p[i * 2 - 2], p[i * 2 + 1] - p[i * 2 - 1]));
  const L = S[n - 1], cnt = Math.max(2, Math.floor(L / sp));
  const at = u => { // position, unit normal, unit tangent at fraction u
    const s = clamp(u, 0, 1) * L; let i = 1; while (i < n - 1 && S[i] < s) i++;
    const t = (s - S[i - 1]) / ((S[i] - S[i - 1]) || 1), x = lerp(p[i * 2 - 2], p[i * 2], t), y = lerp(p[i * 2 - 1], p[i * 2 + 1], t);
    let tx = p[i * 2] - p[i * 2 - 2], ty = p[i * 2 + 1] - p[i * 2 - 1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
    return [x, y, -ty, tx, tx, ty];
  };
  if (o.core !== false) {
    if (closed) R.stroke(p, { ink: 'Y', w: gap, t: o.coreT || 0.3, solid: false, closed: true, smooth: false, taper: 'none', wob: 0 });
    else {
      const A = [], Bq = [];
      for (let k = 0; k <= cnt; k++) { const q = at(k / cnt); A.push(q[0] + q[2] * gap / 2, q[1] + q[3] * gap / 2); Bq.push([q[0] - q[2] * gap / 2, q[1] - q[3] * gap / 2]); }
      const poly = A.slice(); for (let i = Bq.length - 1; i >= 0; i--) poly.push(Bq[i][0], Bq[i][1]);
      R.fill(poly, { ink: 'Y', t: o.coreT || 0.3, wob: 0.15 });
    }
  }
  for (let k = 0; k < cnt; k++) {
    const q = at((k + 0.5) / cnt);
    for (const sd of [1, -1]) {
      const hx = q[0] + q[2] * (gap / 2 + hr * 0.7) * sd, hy = q[1] + q[3] * (gap / 2 + hr * 0.7) * sd;
      if (!o.noHeads) R.circle(hx, hy, hr, { ink: 'B', w: 0.7, fi: o.head || 'T', ft: 0.9, wob: 0.1 });
      for (const off of [-0.8, 0.8]) {
        const bx = hx - q[2] * hr * 0.8 * sd + q[4] * off, by = hy - q[3] * hr * 0.8 * sd + q[5] * off;
        R.line(bx, by, bx - q[2] * tail * sd + q[4] * off * 0.25, by - q[3] * tail * sd + q[5] * off * 0.25, { ink: 'B', w: 0.55, wob: 0.1, taper: 'none' });
      }
    }
  }
  return { at, L, cnt };
};
/* membrane protein spanning a path position: kind 'channel' | 'carrier' | 'pump' | 'receptor' | 'gp' (glycoprotein) */
Recorder.prototype.memProtein = function (x, y, ang, kind, o = {}) {
  const R = this, s = o.s || 1, th = (o.gap || 5) + 6;
  R.push(x, y, rad(ang), 1);
  if (kind === 'channel') { R.rrect(-3.2 * s, -th / 2, 2.6 * s, th, 1, { ink: 'B', w: 0.9, fi: 'P', ft: 0.8 }); R.rrect(0.6 * s, -th / 2, 2.6 * s, th, 1, { ink: 'B', w: 0.9, fi: 'P', ft: 0.8 }); }
  else if (kind === 'carrier') { const p = [-3.6 * s, -th / 2, 3.6 * s, -th / 2, 3.4 * s, -1.4 * s, 4.2 * s, 0, 3.4 * s, 1.4 * s, 3.6 * s, th / 2, -3.6 * s, th / 2, -3.2 * s, 1.4 * s, -4 * s, 0, -3.2 * s, -1.4 * s]; R.fill(p, { ink: 'P', t: 0.8, wob: 0.15 }); R.poly(p, { ink: 'B', w: 0.9, wob: 0.15 }); }
  else if (kind === 'pump') { R.rrect(-4.2 * s, -th / 2, 8.4 * s, th, 2, { ink: 'B', w: 1, fi: 'P', ft: 0.8 }); R.stroke([-2 * s, -th / 2 + 1, 0, -1, 2 * s, -th / 2 + 1], { ink: 'B', w: 0.7, wob: 0.1 }); }
  else if (kind === 'receptor') { R.rrect(-2.2 * s, -th / 2, 4.4 * s, th, 1.5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.8 }); R.fill([-4 * s, -th / 2 - 5 * s, 0, -th / 2 - 1, 4 * s, -th / 2 - 5 * s, 2 * s, -th / 2 - 5 * s, 0, -th / 2 - 3, -2 * s, -th / 2 - 5 * s], { ink: 'P', t: 0.9, wob: 0.05 }); }
  else if (kind === 'gp') { R.rrect(-2 * s, -th / 2, 4 * s, th, 1.5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.8 }); const bp = [0, -th / 2, -2 * s, -th / 2 - 4 * s, 0, -th / 2 - 6 * s, 2 * s, -th / 2 - 4 * s]; R.stroke(bp, { ink: 'B', w: 0.7, wob: 0.1 }); for (let i = 0; i < 3; i++) R.circle((i - 1) * 2.2 * s, -th / 2 - (5 + (i % 2) * 2.5) * s, 1.3 * s, { ink: 'B', w: 0.6, fi: 'TY', ft: 0.9 }); }
  R.pop();
};
/* ---------- small organelles ---------- */
Recorder.prototype.ribosome = function (x, y, s = 1, o = {}) {
  this.ellipse(x, y, 2.6 * s, 2.2 * s, { ink: 'B', w: 0.6, fi: o.fi || 'P', ft: 0.9, wob: 0.05 }); this.ellipse(x + 0.6 * s, y - 2.3 * s, 1.8 * s, 1.4 * s, { ink: 'B', w: 0.6, fi: o.fi || 'P', ft: 0.6, wob: 0.05 });
};
Recorder.prototype.vesicle = function (x, y, r, o = {}) { this.circle(x, y, r, { ink: 'B', w: o.w || 0.9, fi: o.fi || 'T', ft: o.ft === undefined ? 0.35 : o.ft }); if (o.dots) this.scatter(x, y, r * 0.55, r * 0.55, o.dots, 0.55, { ink: o.dink || 'P' }); };
Recorder.prototype.lysosome = function (x, y, r) { this.circle(x, y, r, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); this.scatter(x, y, r * 0.6, r * 0.6, 7, 0.7, { ink: 'B' }); };
/* nucleus: double envelope with pores, chromatin and nucleolus */
Recorder.prototype.nucleus = function (x, y, rx, ry, o = {}) {
  const R = this;
  R.ellipse(x, y, rx, ry, { ink: 'B', w: 1.5, fi: 'P', ft: 0.14, wob: 0.5 });
  R.ellipse(x, y, rx - 2.4, ry - 2.4, { ink: 'B', w: 0.9, wob: 0.4 });
  const np = o.pores === undefined ? 8 : o.pores;
  for (let i = 0; i < np; i++) { const a = i * TAU / np + 0.4, px = x + Math.cos(a) * (rx - 1.2), py = y + Math.sin(a) * (ry - 1.2); R.knock(polyPts(px, py, 1.5, 6)); R.circle(px, py, 1.2, { ink: 'B', w: 0.6 }); }
  R.scatter(x, y, rx * 0.7, ry * 0.7, o.chromatin === undefined ? 36 : o.chromatin, 0.7, { ink: 'B', t: 0.8 });
  for (let k = 0; k < 4; k++) R.stroke([x - rx * 0.5 + k * 6, y + ry * 0.2, x - rx * 0.3 + k * 5, y - ry * 0.1, x - rx * 0.1 + k * 4, y + ry * 0.3], { ink: 'P', w: 0.6, wob: 0.3, t: 0.9 });
  if (o.nucleolus !== false) { R.circle(x + rx * 0.22, y - ry * 0.05, Math.min(rx, ry) * 0.3, { ink: 'B', w: 0.9, fi: 'P', ft: 0.9 }); }
};
Recorder.prototype.mito = function (x, y, len, wid, rot = 0, o = {}) {
  const R = this; R.push(x, y, rad(rot), 1);
  const hl = len / 2, hw = wid / 2;
  R.rrect(-hl, -hw, len, wid, hw, { ink: 'B', w: 1.3, fi: 'PY', ft: 0.22, wob: 0.3 });
  // inner membrane with cristae
  const ip = [], m = 6, il = hl - 2.2, iw = hw - 2.2;
  ip.push(-il, 0);
  for (let k = 0; k < m; k++) { const u = -il + (k + 0.5) * (2 * il) / m, up = k % 2 ? 1 : -1; ip.push(u - 2, up * iw, u, up * (iw * 0.15), u + 2, up * iw); }
  R.stroke([-il + 1, -iw, ...ip.slice(2), il - 1, iw], { ink: 'B', w: 0.8, smooth: true, taper: 'none', wob: 0.3 });
  R.rrect(-il, -iw, 2 * il, 2 * iw, iw, { ink: 'B', w: 0.7, wob: 0.3, st: 0.8 });
  if (!o.plain) { R.circle(il * 0.45, -iw * 0.15, 1.8, { ink: 'B', w: 0.6 }); R.ribosome(-il * 0.2, iw * 0.2, 0.5); R.ribosome(il * 0.1, iw * 0.35, 0.5); }
  R.pop();
};
Recorder.prototype.chloroplast = function (x, y, len, wid, rot = 0, o = {}) {
  const R = this; R.push(x, y, rad(rot), 1);
  const hl = len / 2, hw = wid / 2;
  R.rrect(-hl, -hw, len, wid, hw * 0.9, { ink: 'B', w: 1.3, fi: 'TY', ft: 0.28, wob: 0.3 });
  R.rrect(-hl + 2, -hw + 2, len - 4, wid - 4, hw * 0.8, { ink: 'B', w: 0.7, wob: 0.3 });
  const ng = o.grana || 4;
  for (let g = 0; g < ng; g++) {
    const gx = -hl * 0.6 + g * (len * 0.75 / Math.max(1, ng - 1)), gy = (g % 2 ? 1 : -1) * hw * 0.28;
    for (let d = 0; d < 4; d++) R.rrect(gx - 3.3, gy - 3 + d * 1.9, 6.6, 1.5, 0.7, { ink: 'B', w: 0.55, fi: 'T', ft: 0.9, wob: 0.05 });
    if (g < ng - 1) R.stroke([gx + 3.3, gy, gx + len * 0.75 / (ng - 1) - 3.3, (g % 2 ? -1 : 1) * hw * 0.28], { ink: 'B', w: 0.5, wob: 0.2, taper: 'none' });
  }
  R.ellipse(hl * 0.55, hw * 0.4, 3.2, 2.2, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.9 });
  R.circle(-hl * 0.5, hw * 0.42, 1.8, { ink: 'B', w: 0.6 }); R.ribosome(hl * 0.15, hw * 0.45, 0.45);
  R.pop();
};
/* rough ER stack (n cisternae) laid along a gently curved path; smooth ER tubes */
Recorder.prototype.rer = function (x, y, w, n, o = {}) {
  const R = this; R.push(x, y, rad(o.rot || 0), 1);
  for (let c = 0; c < n; c++) {
    const yy = c * 7.2, top = [], bot = [];
    for (let i = 0; i <= 8; i++) { const u = i / 8; top.push(u * w, yy + Math.sin(u * 5 + c) * 1.4 - 2.2); bot.push(u * w, yy + Math.sin(u * 5 + c) * 1.4 + 2.2); }
    const rb = []; for (let i = bot.length - 2; i >= 0; i -= 2) rb.push(bot[i], bot[i + 1]); const poly = top.concat(rb);
    R.fill(poly, { ink: 'T', t: 0.3, smooth: true, wob: 0.2 }); R.poly(poly, { ink: 'B', w: 0.9, smooth: true, wob: 0.3 });
    for (let k = 0; k < Math.floor(w / 5.5); k++) { const u = (k + 0.5) / Math.floor(w / 5.5); R.dot(u * w, yy + Math.sin(u * 5 + c) * 1.4 - 3.2, 0.85, { ink: 'P' }); R.dot(u * w + 1.2, yy + Math.sin(u * 5 + c) * 1.4 + 3.3, 0.85, { ink: 'P' }); }
  }
  R.pop();
};
Recorder.prototype.ser = function (x, y, w, h, o = {}) {
  const R = this; R.push(x, y, rad(o.rot || 0), 1);
  const rr = this.rng;
  const tube = pts => { R.stroke(pts, { ink: 'T', w: 3.4, t: 0.3, solid: false, smooth: true, taper: 'none' }); R.stroke(pts, { ink: 'B', w: 0.8, smooth: true, taper: 'none', wob: 0.3 }); };
  tube([0, h * 0.3, w * 0.25, h * 0.1, w * 0.5, h * 0.35, w * 0.75, h * 0.15, w, h * 0.3]);
  tube([0, h * 0.7, w * 0.3, h * 0.9, w * 0.55, h * 0.65, w * 0.8, h * 0.85, w, h * 0.7]);
  tube([w * 0.25, h * 0.1, w * 0.3, h * 0.5, w * 0.3, h * 0.9]); tube([w * 0.75, h * 0.15, w * 0.6, h * 0.5, w * 0.55, h * 0.65]);
  R.pop();
};
Recorder.prototype.golgi = function (x, y, w, o = {}) {
  const R = this, n = o.n || 5;
  for (let c = 0; c < n; c++) {
    const cw = w * (1 - Math.abs(c - (n - 1) / 2) * 0.12), yy = y + c * 4.6;
    const top = [], bot = [];
    for (let i = 0; i <= 10; i++) { const u = i / 10, curv = Math.sin(u * PI) * -2; top.push(x + (u - 0.5) * cw, yy + curv - 1.5 + (1 - Math.sin(u * PI)) * 2); }
    R.stroke(top, { ink: 'B', w: 1.2, smooth: true, taper: 'both', wob: 0.25 }); R.stroke(top.map((v, i) => i % 2 ? v + 2.4 : v), { ink: 'Y', w: 2.4, smooth: true, taper: 'both', t: 0.7, solid: false });
  }
  R.vesicle(x - w * 0.6, y + 2, 2.8, { fi: 'P', ft: 0.5 }); R.vesicle(x + w * 0.6, y + 12, 2.6, { fi: 'P', ft: 0.5 }); R.vesicle(x + w * 0.66, y + 4, 2, { fi: 'P', ft: 0.5 });
};
