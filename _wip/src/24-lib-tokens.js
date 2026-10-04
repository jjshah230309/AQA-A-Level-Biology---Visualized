/* ===================== 24 LIB TOKENS: compact monomer glyphs, reaction helpers ===================== */
const hexPts = (x, y, r, rot = 0.5) => { const p = []; for (let k = 0; k < 6; k++) p.push(x + Math.cos(k * TAU / 6 + rot) * r, y + Math.sin(k * TAU / 6 + rot) * r); return p; };
const polyPts = (x, y, r, n, rot = -PI / 2) => { const p = []; for (let k = 0; k < n; k++) p.push(x + Math.cos(k * TAU / n + rot) * r, y + Math.sin(k * TAU / n + rot) * r); return p; };
/* monosaccharide hexagon token */
Recorder.prototype.tokSugar = function (x, y, r, o = {}) {
  const ink = o.fi || 'Y';
  this.poly(hexPts(x, y, r), { ink: 'B', w: o.w || 1.1, fi: ink, ft: o.ft === undefined ? 0.75 : o.ft, wob: 0.18 });
  if (o.o !== false) this.circle(x + r * 0.35, y - r * 0.35, r * 0.17, { ink: 'B', w: 0.7, fi: 'T', ft: 0.9 });
  return this;
};
/* amino-acid token: disc (backbone) + R-group lobe in colour rc ('T','Y','P','TY') on side */
Recorder.prototype.tokAmino = function (x, y, r, o = {}) {
  const rc = o.rc || 'T', up = o.up === undefined ? -1 : o.up;
  this.circle(x, y + up * r * 1.45, r * 0.62, { ink: 'B', w: 0.9, fi: rc, ft: 0.85 });
  this.line(x, y + up * r * 0.85, x, y + up * r * 1.0, { ink: 'B', w: 0.8, taper: 'none' });
  this.circle(x, y, r, { ink: 'B', w: o.w || 1.1, fi: 'P', ft: 0.6 });
  this.text('N-C', x, y + r * 0.28, r * 0.68, { ink: 'B', al: 'c' });
  return this;
};
Recorder.prototype.tokNT = function (x, y, s, o = {}) {
  const bc = { A: 'P', T: 'T', U: 'T', G: 'Y', C: 'TY' }[o.base || 'A'];
  this.circle(x, y - s * 0.95, s * 0.36, { ink: 'B', w: 0.9, fi: 'Y', ft: 1 });
  this.line(x, y - s * 0.6, x, y - s * 0.4, { ink: 'B', w: 0.8, taper: 'none' });
  this.poly(polyPts(x, y, s * 0.46, 5), { ink: 'B', w: 1.0, fi: 'P', ft: 0.25 });
  this.line(x + s * 0.4, y, x + s * 0.62, y, { ink: 'B', w: 0.8, taper: 'none' });
  this.rect(x + s * 0.62, y - s * 0.3, s * 0.7, s * 0.6, { ink: 'B', w: 0.9, fi: bc, ft: 0.8, wob: 0.1 });
  return this;
};
/* bond highlight: pink ring around a covalent bond site */
Recorder.prototype.bondMark = function (x, y, r = 3.4, o = {}) { this.circle(x, y, r, { ink: o.ink || 'P', w: o.w || 1.3, wob: 0.12 }); return this; };
/* small water droplet token */
Recorder.prototype.drop = function (x, y, s, o = {}) {
  const p = [x, y - s * 1.1, x + s * 0.55, y - s * 0.1, x + s * 0.5, y + s * 0.45, x, y + s * 0.8, x - s * 0.5, y + s * 0.45, x - s * 0.55, y - s * 0.1];
  this.poly(p, { ink: 'B', w: o.w || 0.9, fi: 'T', ft: o.ft || 0.7, smooth: true });
  if (o.label !== false) this.text(o.label || 'H_2O', x, y + s * 0.38, s * 0.62, { ink: 'B', al: 'c' });
  return this;
};
/* chain of tokens along a line; fn(R,x,y,i) draws each, bonds drawn between */
Recorder.prototype.chain = function (x, y, n, dx, dy, fn, o = {}) {
  for (let i = 0; i < n - 1; i++) this.line(x + dx * i, y + dy * i, x + dx * (i + 1), y + dy * (i + 1), { ink: 'B', w: o.w || 1.2, taper: 'none', wob: 0.15 });
  const kr = o.kr === undefined ? 8 : o.kr;
  for (let i = 0; i < n; i++) { if (kr > 0) this.knock(polyPts(x + dx * i, y + dy * i, kr, 10)); fn(this, x + dx * i, y + dy * i, i); }
  if (o.bonds) for (let i = 0; i < n - 1; i++) this.bondMark(x + dx * (i + 0.5), y + dy * (i + 0.5), o.br || 2.6);
  return this;
};
/* simple card-style callout number bubble */
Recorder.prototype.bubble = function (x, y, r, str, o = {}) { this.circle(x, y, r, { ink: 'B', w: 1.0, fi: o.fi || 'P', ft: o.ft || 0.35 }); this.text(str, x, y + r * 0.34, r * 0.95, { ink: 'B', al: 'c' }); return this; };
