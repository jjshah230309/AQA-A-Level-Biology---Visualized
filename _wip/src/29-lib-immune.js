/* ===================== 29 LIB IMMUNE: antigens, receptors, antibodies, immune cells =====================
   Lock-and-key shapes: an antigen is a convex bump (tri | sq | circ | trap), a receptor / antibody binding site
   is a block with the matching notch.  Antigens print yellow, antibodies and receptors pink.                    */
const AG = {
  tri: (n, d) => [-n, 0, 0, -d, n, 0],
  sq: (n, d) => [-n * 0.7, 0, -n * 0.7, -d, n * 0.7, -d, n * 0.7, 0],
  trap: (n, d) => [-n, 0, -n * 0.55, -d, n * 0.55, -d, n, 0],
  circ: (n, d) => { const p = []; for (let i = 0; i <= 8; i++) { const a = PI * i / 8; p.push(-Math.cos(a) * n * 0.8, -Math.sin(a) * d * 0.95); } return p; },
};
/* antigen: stalk from (x,y) outward at angle a (radians), then the shape */
Recorder.prototype.antigen = function (x, y, a, shape, o = {}) {
  const n = o.n || 2.2, d = o.d || 2.6, L = o.len === undefined ? 2.4 : o.len;
  this.push(x, y, a + PI / 2, 1);
  if (L > 0) this.line(0, 0, 0, -L, { ink: 'B', w: 0.6, taper: 'none', wob: 0.1 });
  this.push(0, -L, 0, 1);
  const p = AG[shape](n, d);
  this.fill(p, { ink: o.ink || 'Y', t: o.t === undefined ? 0.95 : o.t, wob: 0.06 }); this.poly(p, { ink: 'B', w: o.w || 0.6, wob: 0.06 });
  this.pop(); this.pop();
  return this;
};
/* a block with a notch at the top: receptors and antibody binding sites.  Opens along angle a. */
Recorder.prototype.recept = function (x, y, a, shape, o = {}) {
  const w = o.w || 6.4, h = o.h || 4.6, n = o.n || 2.2, d = o.d || 2.6, L = o.len === undefined ? 0 : o.len;
  this.push(x, y, a + PI / 2, 1);
  if (L > 0) this.line(0, 0, 0, -L, { ink: 'B', w: 0.9, taper: 'none', wob: 0.1 });
  const y0 = -L, y1 = -L - h, nt = AG[shape](n, d), top = [];
  for (let i = 0; i < nt.length; i += 2) top.push(nt[i], y1 - nt[i + 1]);   // same outline, dipping into the block
  const p = [-w / 2, y0, -w / 2, y1, ...top, w / 2, y1, w / 2, y0];
  this.fill(p, { ink: o.ink || 'P', t: o.t === undefined ? 0.85 : o.t, wob: 0.06 }); this.poly(p, { ink: 'B', w: o.w2 || 0.7, wob: 0.06 });
  this.pop();
  return this;
};
/* thick outlined chain (keyline, knocked centre, ink fill) */
Recorder.prototype.chain2 = function (pts, w, ink, t, o = {}) {
  this.stroke(pts, { ink: 'B', w: w + (o.kl === undefined ? 1.3 : o.kl), smooth: o.smooth !== undefined ? o.smooth : false, taper: 'none', wob: 0.1 });
  this.stroke(pts, { ink: 'B', w, smooth: o.smooth !== undefined ? o.smooth : false, taper: 'none', wob: 0.1, knock: true, t: 1 });
  this.stroke(pts, { ink, w, smooth: o.smooth !== undefined ? o.smooth : false, taper: 'none', wob: 0.1, t });
  return this;
};
/* antibody: base of the stem at (x,y), arms point along angle a (radians).  s = scale. */
Recorder.prototype.antibody = function (x, y, a, shape, o = {}) {
  const s = o.s || 1, R = this, W = w => Math.max(0.45, w * s), kl = W(1.3);
  R.push(x, y, a + PI / 2, s);          // local -y = along the stem towards the arms
  const hy = -15, ax = 12.5, ay = -33;
  R.chain2([-2.3, 0, -2.3, hy, -ax, ay], W(2.1), 'P', 0.9, { kl });                      // heavy chains
  R.chain2([2.3, 0, 2.3, hy, ax, ay], W(2.1), 'P', 0.9, { kl });
  const armP = (sg, u, off) => { const bx = sg * 2.3, dx = sg * ax - bx, dy = ay - hy, L = Math.hypot(dx, dy); return [bx + dx * u + sg * (-dy) / L * off, hy + dy * u + sg * dx / L * off]; };
  const off = Math.max(2.5, (W(2.1) / s + W(1.8) / s) / 2 + 0.8 / Math.max(s, 0.5) * 0.4);
  for (const sg of [-1, 1]) {
    const p0 = armP(sg, 0.88, off), p1 = armP(sg, 0.3, off);
    R.chain2([p0[0], p0[1], p1[0], p1[1]], W(1.8), 'P', 0.45, { kl });                      // light chains
    const q0 = armP(sg, 0.62, 1.0), q1 = armP(sg, 0.62, off - 0.9);
    R.line(q0[0], q0[1], q1[0], q1[1], { ink: 'B', w: W(0.6), taper: 'none' });    // disulfide bridge light-heavy
    // variable region: binding site at each tip
    const ang = Math.atan2(ay - hy, sg * ax - sg * 2.3);
    R.recept(sg * ax, ay, ang, shape, { ink: 'Y', t: 0.9, w: 6.6, h: 5, w2: W(0.7) });
  }
  R.line(-2.3, hy + 3, 2.3, hy + 3, { ink: 'B', w: W(0.7), taper: 'none' }); R.line(-2.3, hy + 6.5, 2.3, hy + 6.5, { ink: 'B', w: W(0.7), taper: 'none' });   // disulfide bridges at the hinge
  R.pop();
  return this;
};
/* bacterium (rod): centre, length, width, rotation (deg); ag = list of antigen shapes around it */
Recorder.prototype.bacterium = function (x, y, len, wid, rot, o = {}) {
  const R = this; R.push(x, y, rad(rot), 1);
  const hl = len / 2, hw = wid / 2;
  R.rrect(-hl - 1.2, -hw - 1.2, len + 2.4, wid + 2.4, hw + 1.2, { ink: 'B', w: 0.8, wob: 0.15 });
  R.rrect(-hl, -hw, len, wid, hw, { ink: 'B', w: 1.2, fi: o.fi || 'TY', ft: o.ft === undefined ? 0.3 : o.ft, wob: 0.2 });
  R.stroke([-hl * 0.55, 0, -hl * 0.3, -hw * 0.5, -hl * 0.05, hw * 0.4, hl * 0.2, -hw * 0.3, hl * 0.5, hw * 0.2], { ink: 'T', w: 0.9, smooth: true, taper: 'none', wob: 0.1 });
  if (o.flag) R.stroke([hl, 0, hl + 5, 3, hl + 9, -3, hl + 14, 2, hl + 18, -2], { ink: 'B', w: 0.7, smooth: true, wob: 0.15 });
  if (o.ag) {
    const n = o.ag.length;
    for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n, top = i % 2 === 0, px = -hl * 0.8 + u * len * 1.6 - len * 0.3 * 0, py = top ? -hw - 1.2 : hw + 1.2;
      R.antigen(clamp(-hl * 0.7 + u * len * 0.9, -hl * 0.8, hl * 0.8), py, top ? -PI / 2 : PI / 2, o.ag[i], { n: o.an || 1.7, d: o.ad || 2, len: 1.4 });
    }
  }
  R.pop();
  return this;
};
/* lymphocyte: big nucleus, thin cytoplasm. o.ink = tint ink of cytoplasm */
Recorder.prototype.lymphocyte = function (x, y, r, o = {}) {
  this.circle(x, y, r, { ink: 'B', w: 1.3, fi: o.fi || 'P', ft: o.ft === undefined ? 0.16 : o.ft, wob: 0.4 });
  this.circle(x - r * 0.05, y + r * 0.04, r * 0.7, { ink: 'B', w: 0.9, fi: o.nfi || 'B', ft: 0.38, wob: 0.3 });
  this.scatter(x - r * 0.05, y + r * 0.04, r * 0.5, r * 0.5, Math.round(r * 1.2), 0.5, { ink: 'B', t: 0.8 });
  return this;
};
/* phagocyte: irregular outline, lobed nucleus, lysosome granules */
Recorder.prototype.phagocyte = function (x, y, r, o = {}) {
  const R = this, p = [];
  for (let i = 0; i < 18; i++) { const a = i * TAU / 18, rr = r * (1 + 0.1 * Math.sin(a * 3 + 0.5) + 0.06 * Math.sin(a * 5 + 1.7)); p.push(x + Math.cos(a) * rr, y + Math.sin(a) * rr * (o.sy || 1)); }
  R.fill(p, { ink: 'P', t: 0.14, smooth: true, wob: 0.5 }); R.poly(p, { ink: 'B', w: 1.4, smooth: true, wob: 0.6 });
  if (o.nucleus !== false) {
    const nx = x + (o.nx || 0), ny = y + (o.ny || 0);
    [[-0.28, -0.2], [0.22, -0.3], [0.05, 0.25]].forEach(([dx, dy]) => R.circle(nx + dx * r, ny + dy * r, r * 0.26, { ink: 'B', w: 0.9, fi: 'B', ft: 0.38, wob: 0.2 }));
    R.stroke([nx - 0.28 * r, ny - 0.2 * r, nx + 0.22 * r, ny - 0.3 * r, nx + 0.05 * r, ny + 0.25 * r], { ink: 'B', w: 0.7, smooth: true, taper: 'none' });
  }
  return this;
};
/* small cluster of people for herd-immunity grids: state 'v' vaccinated, 'u' unvaccinated, 'i' infected */
Recorder.prototype.person = function (x, y, s, state) {
  const fill = { v: 'T', u: null, i: 'P' }[state], ft = state === 'i' ? 0.85 : 0.6;
  this.circle(x, y - s * 0.62, s * 0.34, { ink: 'B', w: 0.8, fi: fill, ft, wob: 0.1 });
  this.poly([x - s * 0.5, y + s * 0.8, x - s * 0.34, y - s * 0.2, x + s * 0.34, y - s * 0.2, x + s * 0.5, y + s * 0.8], { ink: 'B', w: 0.8, fi: fill, ft, wob: 0.1 });
  return this;
};

/* antibody with its right (side 1) or left (-1) binding site engaged with an antigen bump at (px,py) whose outward direction is o (radians) */
Recorder.prototype.abBind = function (px, py, o, shape, s, opt = {}) {
  const side = opt.side || 1, hy = -15, ax = 12.5, ay = -33, h = 5;
  const tl = Math.atan2(ay - hy, side * ax - side * 2.3), a = o + PI / 2 - tl, uw = o + PI;
  const Tx = px - Math.cos(uw) * h * s, Ty = py - Math.sin(uw) * h * s, rot = a + PI / 2, cr = Math.cos(rot), sr = Math.sin(rot);
  const tipx = side * ax * s, tipy = ay * s;
  const X = Tx - (tipx * cr - tipy * sr), Y = Ty - (tipx * sr + tipy * cr);
  this.antibody(X, Y, a, shape, { s });
  this.antigen(px, py, o, shape, { n: 2.2 * s, d: 2.6 * s, len: 0, w: 0.5 * s + 0.2 });
  return [X, Y, a];
};
