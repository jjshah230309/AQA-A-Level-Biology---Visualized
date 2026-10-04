/* ===================== 27 LIB BLOCK: topic header band + connecting conduit art ===================== */
/* Big numeral + title in the header band of every topic block, with a ruled underline and DNA colophon */
function blockHeader(R, L, o = {}) {
  const t = L.topic, W = L.w, H = L.h;
  const num = t.id === 'SK' ? 'MS · AT · PS' : t.id;
  R.text(num, 30, 66, t.id === 'SK' ? 34 : 50, { al: 'l', w: t.id === 'SK' ? 4.2 : 6 });
  const nw = labelWidth(num, t.id === 'SK' ? 34 : 50) + 50;
  // title in up to two lines
  const lines = wrapText(t.name, W - nw - 260, 13);
  lines.slice(0, 2).forEach((s, i) => R.text(s, nw + 8, 48 + i * 17 - (lines.length > 1 ? 6 : -4), 13, { al: 'l' }));
  R.stroke([24, 80, 160, 84, 420, 79, 700, 83, W - 24, 80], { ink: 'B', w: 1.6, wob: 0.6 });
  R.stroke([24, 86, 300, 88, W - 24, 86], { ink: o.ink || 'P', w: 0.8, wob: 0.5, t: 0.9 });
  R.helix(W - 230, 44, W - 30, 44, { amp: 11, turns: 5, w: 1.1 });
}
/* A meandering hand-drawn conduit through the gutter between window rows */
function conduit(R, pts, o = {}) {
  const w = o.w || 7, ink = o.ink || 'T';
  R.stroke(pts, { ink, w, t: o.t || 0.35, smooth: true, taper: 'none', wob: 0.8, solid: false });
  R.stroke(pts, { ink: 'B', w: 0.9, smooth: true, taper: 'none', wob: 0.7, t: 0.8 });
}
