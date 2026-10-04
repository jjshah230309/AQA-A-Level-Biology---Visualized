/* ===================== 18 SHEET FURNITURE: crop marks, registration targets, ink swatches ===================== */
const TRIM = 78; // trim line inset from paper edge
function regTarget(R, x, y, s = 1) {
  for (const k of INK_ORDER) {
    R.circle(x, y, 7 * s, { ink: k, w: 0.8, wob: 0.05 });
    R.line(x - 11 * s, y, x + 11 * s, y, { ink: k, w: 0.7, wob: 0.05, taper: 'none' });
    R.line(x, y - 11 * s, x, y + 11 * s, { ink: k, w: 0.7, wob: 0.05, taper: 'none' });
  }
  R.circle(x, y, 2.4 * s, { ink: '', fi: 'B', ft: 1, w: 0 });
}
FURNITURE_DRAW = function (R) {
  const W = SHEET.x1, H = SHEET.y1, t = TRIM, L = 30, g = 9;
  // crop marks (blue, 4 corners x 2) and fold marks
  for (const [cx, cy, sx, sy] of [[t, t, -1, -1], [W - t, t, 1, -1], [t, H - t, -1, 1], [W - t, H - t, 1, 1]]) {
    R.line(cx + sx * g, cy, cx + sx * (g + L), cy, { ink: 'B', w: 0.8, wob: 0.06, taper: 'none' });
    R.line(cx, cy + sy * g, cx, cy + sy * (g + L), { ink: 'B', w: 0.8, wob: 0.06, taper: 'none' });
  }
  // registration targets at mid-edges and corners
  for (const [x, y] of [[W / 2, 34], [W / 2, H - 34], [34, H / 2], [W - 34, H / 2], [34, 34], [W - 34, 34], [34, H - 34], [W - 34, H - 34]]) regTarget(R, x, y);
  // ink swatch strip along the bottom margin
  const sy = H - 150, sh = 28, x0 = 340;
  let x = x0;
  const solid = [['Y'], ['P'], ['T'], ['B']];
  solid.forEach(k => { R.rect(x, sy, sh, sh, { ink: '', fi: k[0], ft: 1, w: 0 }); R.rect(x, sy, sh, sh, { ink: 'B', w: 0.7, wob: 0.1 }); x += sh + 5; });
  x += 14;
  for (const k of INK_ORDER) { // tint ramps 10..100 %
    for (let i = 1; i <= 10; i++) { R.rect(x, sy, 15, sh, { ink: '', fi: k, ft: i / 10, w: 0 }); x += 15; }
    R.rect(x - 150, sy, 150, sh, { ink: 'B', w: 0.6, wob: 0.1 }); x += 12;
  }
  x += 6;
  for (const pr of ['YP', 'YT', 'PT', 'PB', 'TB', 'YB', 'YPT']) { // overprints
    pr.split('').forEach((k, i, a) => R.rect(x + i * (sh / a.length), sy, sh / a.length, sh, { ink: '', fi: k, ft: 1, w: 0 }));
    R.rect(x, sy, sh, sh, { ink: 'B', w: 0.7, wob: 0.1 });
    x += sh + 5;
  }
  // meaning of the inks (glyphs, no words): protein blob / water drop / ATP-energy / keyline
  const kx = 2540, ky = sy + 14;
  R.circle(kx, ky, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.9 }); R.text('protein', kx + 12, ky + 3, 6.5, { ink: 'B' });
  R.circle(kx + 112, ky, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.55 }); R.text('water', kx + 124, ky + 3, 6.5, { ink: 'B' });
  R.circle(kx + 218, ky, 8, { ink: 'B', w: 1, fi: 'Y', ft: 1 }); R.text('energy', kx + 230, ky + 3, 6.5, { ink: 'B' });
  R.line(kx + 340, ky, kx + 366, ky, { ink: 'B', w: 1.4 }); R.text('structure', kx + 374, ky + 3, 6.5, { ink: 'B' });
  // slug line
  R.text('AQA A-LEVEL BIOLOGY 7402  ·  FOUR SPOT INKS  ·  Y  P  T  B', W / 2, H - 70, 8, { ink: 'B', al: 'c' });
  R.helix(W / 2 - 200, H - 52, W / 2 + 200, H - 52, { amp: 4.5, turns: 14, w: 0.9 });
  R.helix(150, 52, 330, 52, { amp: 3.5, turns: 6, w: 0.8 });
};
