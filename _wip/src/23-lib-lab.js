/* ===================== 23 LIB LAB: glassware, instruments, hazard pictograms ===================== */
/* test tube: top-centre (x,y), width w, height h; liquid ink + level (0..1) */
Recorder.prototype.tube = function (x, y, w, h, o = {}) {
  const R = this, r = w / 2, bot = y + h - r, lvl = o.level === undefined ? 0.6 : o.level, ink = o.ink === undefined ? 'T' : o.ink;
  const ang = o.rot || 0;
  R.push(x, y, rad(ang), 1);
  const gx = 0, gy = 0;
  const shape = [];
  shape.push(-r, 0, -r, h - r);
  for (let i = 0; i <= 8; i++) { const a = PI - PI * i / 8; shape.push(Math.cos(a) * r, h - r + Math.sin(a) * r); }
  shape.push(r, 0);
  if (ink && lvl > 0) {
    const ly = h * (1 - lvl) , liq = [-r, ly];
    liq.push(-r, h - r); for (let i = 0; i <= 8; i++) { const a = PI - PI * i / 8; liq.push(Math.cos(a) * r, h - r + Math.sin(a) * r); } liq.push(r, ly);
    R.fill(liq, { ink, t: o.t === undefined ? 0.55 : o.t, wob: 0.12 });
    if (o.ink2) R.fill(liq, { ink: o.ink2, t: o.t2 === undefined ? 0.4 : o.t2, wob: 0.12 });
    R.line(-r, ly, r, ly, { ink: 'B', w: 0.7, wob: 0.08, taper: 'none' });
  }
  R.stroke(shape, { ink: 'B', w: o.w || 1.1, wob: 0.18, smooth: false, taper: 'none' });
  R.line(-r - 0.8, 0, r + 0.8, 0, { ink: 'B', w: 1.0, wob: 0.1, taper: 'none' });
  R.pop();
  return this;
};
Recorder.prototype.beaker = function (x, y, w, h, o = {}) {
  const R = this, lvl = o.level === undefined ? 0.6 : o.level, ink = o.ink === undefined ? 'T' : o.ink;
  if (ink && lvl > 0) R.fill([x + 0.5, y + h * (1 - lvl), x + w - 0.5, y + h * (1 - lvl), x + w - 1, y + h - 1, x + 1, y + h - 1], { ink, t: o.t === undefined ? 0.5 : o.t, wob: 0.1 });
  if (o.ink2 && lvl > 0) R.fill([x + 0.5, y + h * (1 - lvl), x + w - 0.5, y + h * (1 - lvl), x + w - 1, y + h - 1, x + 1, y + h - 1], { ink: o.ink2, t: o.t2 === undefined ? 0.35 : o.t2, wob: 0.1 });
  R.stroke([x - 1.5, y - 1.2, x, y, x + 1, y + h - 1.5, x + 3, y + h, x + w - 3, y + h, x + w - 1, y + h - 1.5, x + w, y, x + w + 1.5, y - 1.2], { ink: 'B', w: o.w || 1.2, wob: 0.18, smooth: false, taper: 'none' });
  for (let i = 1; i <= 4; i++) R.line(x + 1.2, y + h * 0.2 * (i + 0.5), x + 1.2 + (i % 2 ? 4 : 2.6), y + h * 0.2 * (i + 0.5), { ink: 'B', w: 0.5, wob: 0.05, taper: 'none' });
  return this;
};
Recorder.prototype.thermometer = function (x, y, len, o = {}) {
  const R = this, w = 3.2, r = 2.8;
  R.rrect(x - w / 2, y, w, len, 1.5, { ink: 'B', w: 0.9, wob: 0.1 });
  R.circle(x, y + len + r * 0.9, r, { ink: 'B', w: 0.9, fi: 'P', ft: 1 });
  R.line(x, y + len, x, y + len * (1 - (o.level === undefined ? 0.5 : o.level)), { ink: 'P', w: 1.5, taper: 'none', wob: 0.05 });
  for (let i = 1; i < 6; i++) R.line(x + w / 2, y + len * i / 6, x + w / 2 + 1.4, y + len * i / 6, { ink: 'B', w: 0.4, wob: 0, taper: 'none' });
  return this;
};
Recorder.prototype.stopwatch = function (x, y, r, o = {}) {
  const R = this;
  R.circle(x, y, r, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.25 }); R.circle(x, y, r * 0.82, { ink: 'B', w: 0.6 });
  R.rect(x - r * 0.18, y - r * 1.35, r * 0.36, r * 0.3, { ink: 'B', w: 0.9, fi: 'B', ft: 0.5 });
  R.line(x + r * 0.7, y - r * 0.8, x + r * 0.95, y - r * 1.05, { ink: 'B', w: 1.1, taper: 'none' });
  for (let i = 0; i < 12; i++) { const a = i * TAU / 12; R.line(x + Math.cos(a) * r * 0.66, y + Math.sin(a) * r * 0.66, x + Math.cos(a) * r * 0.78, y + Math.sin(a) * r * 0.78, { ink: 'B', w: 0.5, wob: 0, taper: 'none' }); }
  const a = o.ang === undefined ? -0.6 : o.ang;
  R.line(x, y, x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62, { ink: 'P', w: 1.1, taper: 'end', wob: 0.05 });
  return this;
};
Recorder.prototype.waterBath = function (x, y, w, h, o = {}) {
  const R = this;
  R.fill([x + 1, y + h * 0.28, x + w - 1, y + h * 0.28, x + w - 2, y + h - 1, x + 2, y + h - 1], { ink: 'T', t: 0.38, wob: 0.15 });
  R.rrect(x, y, w, h, 3, { ink: 'B', w: 1.4, wob: 0.25 });
  R.line(x + 1, y + h * 0.28, x + w - 1, y + h * 0.28, { ink: 'B', w: 0.6, wob: 0.1, taper: 'none' });
  if (o.heat) for (let i = 0; i < 3; i++) R.stroke([x + w * (0.25 + i * 0.25), y + h + 2, x + w * (0.25 + i * 0.25) + 2, y + h + 5, x + w * (0.25 + i * 0.25) - 2, y + h + 8], { ink: 'P', w: 0.9, wob: 0.1 });
  return this;
};
Recorder.prototype.cuvette = function (x, y, w, h, o = {}) {
  const R = this; R.fill([x + 0.6, y + h * 0.3, x + w - 0.6, y + h * 0.3, x + w - 0.6, y + h - 0.6, x + 0.6, y + h - 0.6], { ink: o.ink || 'T', t: o.t || 0.5, wob: 0.08 });
  R.rect(x, y, w, h, { ink: 'B', w: 0.9, wob: 0.1 });
  return this;
};
/* pipette / syringe (vertical or horizontal via rot) */
Recorder.prototype.syringe = function (x, y, len, o = {}) {
  const R = this, rot = o.rot || 0, w = o.w || 6;
  R.push(x, y, rad(rot), 1);
  R.rect(0, -w / 2, len, w, { ink: 'B', w: 1.0, fi: o.ink || 'T', ft: o.t || 0.35, wob: 0.12 });
  R.line(len, 0, len + 6, 0, { ink: 'B', w: 1.0, taper: 'none' });
  R.line(-5, 0, 0, 0, { ink: 'B', w: 1.5, taper: 'none' }); R.line(-5, -w * 0.8, -5, w * 0.8, { ink: 'B', w: 1.6, taper: 'none' });
  R.pop();
  return this;
};
Recorder.prototype.rack = function (x, y, w, h, n) {
  const R = this; R.rect(x, y, w, 3, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.15 });
  R.line(x + 2, y + 3, x + 2, y + h, { ink: 'B', w: 1, taper: 'none' }); R.line(x + w - 2, y + 3, x + w - 2, y + h, { ink: 'B', w: 1, taper: 'none' });
  return this;
};

/* ---------------- hazard / skill pictograms (all drawn, no words) ---------------- */
const Icons = {
  goggles(R, x, y, s = 7) {
    R.ellipse(x - s * 0.55, y, s * 0.5, s * 0.38, { ink: 'B', w: 0.9, fi: 'T', ft: 0.3 }); R.ellipse(x + s * 0.55, y, s * 0.5, s * 0.38, { ink: 'B', w: 0.9, fi: 'T', ft: 0.3 });
    R.line(x - s * 0.05, y, x + s * 0.05, y, { ink: 'B', w: 0.9, taper: 'none' }); R.line(x - s * 1.05, y, x - s * 1.35, y + s * 0.15, { ink: 'B', w: 0.9 }); R.line(x + s * 1.05, y, x + s * 1.35, y + s * 0.15, { ink: 'B', w: 0.9 });
  },
  hot(R, x, y, s = 7) { // scald: steam over water
    for (let i = -1; i <= 1; i++) R.stroke([x + i * s * 0.5, y + s * 0.2, x + i * s * 0.5 + s * 0.2, y - s * 0.2, x + i * s * 0.5 - s * 0.2, y - s * 0.6, x + i * s * 0.5, y - s * 1.0], { ink: 'P', w: 1.0, wob: 0.1 });
    R.stroke([x - s * 0.9, y + s * 0.45, x - s * 0.8, y + s * 0.9, x + s * 0.8, y + s * 0.9, x + s * 0.9, y + s * 0.45], { ink: 'B', w: 1.0, smooth: false, taper: 'none' });
    R.line(x - s * 0.95, y + s * 0.45, x + s * 0.95, y + s * 0.45, { ink: 'B', w: 1.0, taper: 'none' });
  },
  flame(R, x, y, s = 7) { R.fill([x, y - s, x + s * 0.55, y - s * 0.2, x + s * 0.45, y + s * 0.6, x, y + s * 0.9, x - s * 0.45, y + s * 0.6, x - s * 0.5, y - s * 0.1, x - s * 0.1, y - s * 0.35], { ink: 'P', t: 0.9, wob: 0.15, smooth: true }); R.fill([x, y - s * 0.1, x + s * 0.22, y + s * 0.35, x, y + s * 0.7, x - s * 0.22, y + s * 0.35], { ink: 'Y', t: 1, wob: 0.1 }); },
  bio(R, x, y, s = 7) { // biohazard (three crescents + ring)
    R.circle(x, y, s * 0.18, { ink: 'B', w: 0.9 });
    for (let i = 0; i < 3; i++) { const a = -PI / 2 + i * TAU / 3; R.arc(x + Math.cos(a) * s * 0.55, y + Math.sin(a) * s * 0.55, s * 0.55, s * 0.55, a - 2.0 + PI, a + 2.0 + PI, { ink: 'B', w: 1.0, wob: 0.08, taper: 'none' }); }
  },
  corrosive(R, x, y, s = 7) { // drop onto hand/bar
    R.fill([x - s * 0.5, y - s * 0.9, x - s * 0.3, y - s * 0.3, x - s * 0.7, y - s * 0.3], { ink: 'P', t: 1, wob: 0.05 });
    R.fill([x + s * 0.5, y - s * 0.9, x + s * 0.7, y - s * 0.3, x + s * 0.3, y - s * 0.3], { ink: 'P', t: 1, wob: 0.05 });
    R.rect(x - s * 0.9, y + s * 0.1, s * 1.8, s * 0.5, { ink: 'B', w: 1, fi: 'Y', ft: 0.5 });
    R.stroke([x - s * 0.9, y + s * 0.7, x - s * 0.5, y + s * 1.0, x, y + s * 0.8, x + s * 0.5, y + s * 1.0, x + s * 0.9, y + s * 0.7], { ink: 'B', w: 0.8, wob: 0.1 });
  },
  warn(R, x, y, s = 7) { R.poly([x, y - s, x + s * 0.95, y + s * 0.7, x - s * 0.95, y + s * 0.7], { ink: 'B', w: 1.1, fi: 'Y', ft: 1 }); R.line(x, y - s * 0.4, x, y + s * 0.2, { ink: 'B', w: 1.2, taper: 'none' }); R.dot(x, y + s * 0.5, 0.7, { ink: 'B' }); },
  ethics(R, x, y, s = 7) { // heart + paw dots
    R.poly([x, y + s * 0.8, x - s * 0.9, y - s * 0.1, x - s * 0.7, y - s * 0.7, x - s * 0.2, y - s * 0.6, x, y - s * 0.2, x + s * 0.2, y - s * 0.6, x + s * 0.7, y - s * 0.7, x + s * 0.9, y - s * 0.1], { ink: 'B', w: 1.0, fi: 'P', ft: 0.8, smooth: true });
  },
  knob(R, x, y, s = 7) { R.circle(x, y, s * 0.7, { ink: 'B', w: 1.0, fi: 'Y', ft: 0.5 }); R.line(x, y, x + s * 0.5, y - s * 0.5, { ink: 'B', w: 1.2 }); R.arc(x, y, s * 1.05, s * 1.05, -2.4, -0.2, { ink: 'B', w: 0.7, taper: 'end' }); },
  gauge(R, x, y, s = 7) { R.arc(x, y + s * 0.2, s, s, PI, TAU, { ink: 'B', w: 1.1 }); R.line(x - s, y + s * 0.2, x + s, y + s * 0.2, { ink: 'B', w: 1.1, taper: 'none' }); R.line(x, y + s * 0.2, x + s * 0.6, y - s * 0.4, { ink: 'P', w: 1.3, taper: 'end' }); R.dot(x, y + s * 0.2, 0.8, { ink: 'B' }); },
  lock(R, x, y, s = 7) { R.arc(x, y - s * 0.15, s * 0.45, s * 0.5, PI, TAU, { ink: 'B', w: 1.1, taper: 'none' }); R.rect(x - s * 0.7, y - s * 0.15, s * 1.4, s * 0.95, { ink: 'B', w: 1.0, fi: 'T', ft: 0.5 }); R.dot(x, y + s * 0.3, 0.8, { ink: 'B' }); },
  errbar(R, x, y, s = 7) { R.dot(x, y, 1.2, { ink: 'P' }); R.line(x, y - s * 0.8, x, y + s * 0.8, { ink: 'B', w: 0.9, taper: 'none' }); R.line(x - s * 0.4, y - s * 0.8, x + s * 0.4, y - s * 0.8, { ink: 'B', w: 0.9, taper: 'none' }); R.line(x - s * 0.4, y + s * 0.8, x + s * 0.4, y + s * 0.8, { ink: 'B', w: 0.9, taper: 'none' }); },
  eye(R, x, y, s = 7) { R.stroke([x - s, y, x - s * 0.4, y - s * 0.55, x + s * 0.4, y - s * 0.55, x + s, y, x + s * 0.4, y + s * 0.55, x - s * 0.4, y + s * 0.55, x - s, y], { ink: 'B', w: 1.0, smooth: true, closed: false, taper: 'none' }); R.circle(x, y, s * 0.32, { ink: 'B', w: 0.9, fi: 'T', ft: 0.9 }); },
  repeat(R, x, y, s = 7) { R.arc(x, y, s * 0.8, s * 0.8, 0.3, 4.4, { ink: 'B', w: 1.0, taper: 'start' }); R.arc(x, y, s * 0.8, s * 0.8, 3.4, 7.5, { ink: 'B', w: 0.01, taper: 'none' }); R.fill([x + s * 0.55, y - s * 0.95, x + s * 1.0, y - s * 0.45, x + s * 0.3, y - s * 0.5], { ink: 'B', t: 1, wob: 0.05 }); },
};
