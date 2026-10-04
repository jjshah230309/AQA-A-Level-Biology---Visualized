/* ===================== 28 BACKDROPS: one cut-away diorama per topic block (drawn behind the windows) ===================== */
function drift(R, n, W, H, fn) { for (let i = 0; i < n; i++) { const x = 20 + R.rng() * (W - 40), y = 100 + R.rng() * (H - 120); fn(x, y, i); } }
BACKDROPS['3.1'] = (R, L) => {
  const W = L.w, H = L.h;
  R.fill(R.rrectPts(6, 6, W - 12, H - 12, 22), { ink: 'T', t: 0.1, wob: 0.8 });
  blockHeader(R, L, { ink: 'T' });
  // molecules drifting in the gutters of a water droplet: sugars, amino acids, ATP, ions
  drift(R, 46, W, H, (x, y, i) => {
    const k = i % 5;
    if (k === 0) R.poly(hexPts(x, y, 5.5, i), { ink: 'B', w: 0.8, fi: 'Y', ft: 0.35 });
    else if (k === 1) R.circle(x, y, 3.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.3 });
    else if (k === 2) { R.circle(x, y, 2.2, { ink: 'B', w: 0.7, fi: 'T', ft: 0.5 }); R.circle(x + 3.2, y + 1, 1.6, { ink: 'B', w: 0.6, fi: 'T', ft: 0.3 }); }
    else if (k === 3) R.ellipse(x, y, 4, 2.6, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.3, rot: i * 37 });
    else R.dot(x, y, 1.1, { ink: 'B' });
  });
};
