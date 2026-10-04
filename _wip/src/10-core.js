/* ===================== 10 CORE: maths, PRNG, noise, inks ===================== */
const TAU = Math.PI * 2, PI = Math.PI;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);
const sat = v => v < 0 ? 0 : v > 1 ? 1 : v;
const rad = d => d * PI / 180;

function hashStr(s) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909);
  return (h ^ h >>> 16) >>> 0;
}
const mix2 = (a, b) => { let h = Math.imul(a ^ 0x9E3779B9, 0x85EBCA6B) ^ Math.imul(b + 0x7F4A7C15, 0xC2B2AE35); h ^= h >>> 15; h = Math.imul(h, 0x2C1B3C6D); h ^= h >>> 12; return h >>> 0; };
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* 4 spot inks, print order Y,P,T,B.  Colours are the multiply (transmittance) colour of a solid ink on paper. */
const INK = {
  Y: { bit: 1, idx: 0, name: 'Yellow', hex: '#FFE800', rgb: [255, 232, 0] },
  P: { bit: 2, idx: 1, name: 'Fluorescent Pink', hex: '#FF48B0', rgb: [255, 72, 176] },
  T: { bit: 4, idx: 2, name: 'Teal', hex: '#00838A', rgb: [0, 131, 138] },
  B: { bit: 8, idx: 3, name: 'Federal Blue', hex: '#3D5588', rgb: [61, 85, 136] },
};
const INK_ORDER = ['Y', 'P', 'T', 'B'];
const PAPER = [242, 232, 210];
function inkMask(s) { let m = 0; for (let i = 0; i < s.length; i++) { const k = INK[s[i]]; if (k) m |= k.bit; } return m; }

/* 1-D value-noise lattice, cubic-smoothed. Fills Float32Array `a` with values in [-1,1]. */
function fillLattice(rng, n, closed) {
  const a = new Float32Array(n + 3);
  for (let i = 0; i < n; i++) a[i] = rng() * 2 - 1;
  if (closed) { a[n] = a[0]; a[n + 1] = a[1]; a[n + 2] = a[2]; }
  else { a[n] = rng() * 2 - 1; a[n + 1] = rng() * 2 - 1; a[n + 2] = rng() * 2 - 1; }
  return a;
}
function lat(a, x) {
  const i = x | 0, f = x - i, t = f * f * (3 - 2 * f);
  return a[i] + (a[i + 1] - a[i]) * t;
}

/* Poly utilities */
function polyArea(p) { let a = 0; for (let i = 0, n = p.length; i < n; i += 2) { const j = (i + 2) % n; a += p[i] * p[j + 1] - p[j] * p[i + 1]; } return a / 2; }
function pointInPoly(x, y, p) {
  let c = false;
  for (let i = 0, n = p.length, j = n - 2; i < n; j = i, i += 2) {
    const xi = p[i], yi = p[i + 1], xj = p[j], yj = p[j + 1];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
/* Catmull-Rom resample. pts flat [x,y,...]; returns flat array with ~`sp` spacing */
function catmull(p, closed, sp) {
  const n = p.length / 2;
  if (n < 2) return p.slice();
  const out = [];
  const get = (i) => {
    if (closed) { i = ((i % n) + n) % n; } else { i = i < 0 ? 0 : i >= n ? n - 1 : i; }
    return [p[i * 2], p[i * 2 + 1]];
  };
  const segs = closed ? n : n - 1;
  for (let s = 0; s < segs; s++) {
    const p0 = get(s - 1), p1 = get(s), p2 = get(s + 1), p3 = get(s + 2);
    const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const k = Math.max(1, Math.ceil(L / sp));
    for (let j = 0; j < k; j++) {
      const t = j / k, t2 = t * t, t3 = t2 * t;
      out.push(
        0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3));
    }
  }
  if (!closed) out.push(p[(n - 1) * 2], p[(n - 1) * 2 + 1]);
  return out;
}
/* straight-segment densify */
function densify(p, closed, sp) {
  const n = p.length / 2, out = [];
  const segs = closed ? n : n - 1;
  for (let s = 0; s < segs; s++) {
    const a = s * 2, b = ((s + 1) % n) * 2;
    const L = Math.hypot(p[b] - p[a], p[b + 1] - p[a + 1]);
    const k = Math.max(1, Math.ceil(L / sp));
    for (let j = 0; j < k; j++) { const t = j / k; out.push(p[a] + (p[b] - p[a]) * t, p[a + 1] + (p[b + 1] - p[a + 1]) * t); }
  }
  if (!closed) out.push(p[(n - 1) * 2], p[(n - 1) * 2 + 1]);
  return out;
}
