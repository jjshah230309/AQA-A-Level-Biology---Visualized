/* ===================== TOPIC 3.2 (cont.): membranes, transport, practicals 3-4, immune system ===================== */
/* membrane helpers: place a protein across a bilayer built by R.bilayer (knocks the lipids out underneath it) */
function protOn(R, bl, u, kind, o = {}) {
  const q = bl.at(u), ang = Math.atan2(q[5], q[4]) * 180 / PI, th = (o.gap || 8.8) + 6, hw = o.hw || 4.6;
  const c = [[-hw, -th / 2 - 0.4], [hw, -th / 2 - 0.4], [hw, th / 2 + 0.4], [-hw, th / 2 + 0.4]].map(([a, b]) => [q[0] + q[4] * a + q[2] * b, q[1] + q[5] * a + q[3] * b]);
  R.knock(c.flat());
  R.memProtein(q[0], q[1], ang, kind, { gap: o.gap || 8.8, s: o.s || 1 });
  return q;
}
/* small labelled ion / molecule tokens */
function tok(R, x, y, label, o = {}) {
  const r = o.r || 4.4;
  R.circle(x, y, r, { ink: 'B', w: 0.7, fi: o.fi || 'T', ft: o.ft === undefined ? 0.4 : o.ft });
  if (label) R.text(label, x, y + r * 0.36, o.size || r * 1.05, { al: 'c' });
}
function glucTok(R, x, y, r = 3.4) { R.tokSugar(x, y, r, { o: false, w: 0.8 }); }
function smallMol(R, x, y, r = 1.5) { R.circle(x, y, r, { ink: 'B', w: 0.55, fi: 'P', ft: 0.85 }); }
function cross(R, x, y, s = 2.6) { R.line(x - s, y - s, x + s, y + s, { ink: 'P', w: 1.1, taper: 'none' }); R.line(x - s, y + s, x + s, y - s, { ink: 'P', w: 1.1, taper: 'none' }); }

/* ---------- 3.2.3a Membrane structure ---------- */
S({
  id: '3.2.3a', num: '3.2.3', sub: 'Membrane structure: the fluid-mosaic model', title: 'Transport across cell membranes', topic: '3.2', slot: [0, 3], dna: 'mark',
  covers: ['3.2.3.s1', '3.2.3.s2', '3.2.3.s3'],
  card: {
    text: 'The basic structure of <b>all</b> cell membranes, including the cell-surface membrane and the membranes around the organelles of eukaryotes, is the same. In the <b>fluid-mosaic model</b> a <b>phospholipid bilayer</b> is “fluid” because its molecules move, while <b>proteins</b>, <b>glycoproteins</b> (protein + carbohydrate) and <b>glycolipids</b> (lipid + carbohydrate) are scattered through it like the tiles of a mosaic. Where <b>cholesterol</b> is present it fits between the phospholipid tails and restricts the movement of the other molecules.',
    terms: ['phospholipid bilayer', 'fluid-mosaic model', 'protein', 'glycoprotein', 'glycolipid', 'cholesterol', 'hydrophilic head', 'hydrophobic tail'],
    skill: 'MS 1.8: magnification from a scale bar', eq: MATH(mt('magnification '), mo('='), mfrac(mt('size of image'), mt('actual size'))),
    q: 'Why can small non-polar molecules cross a phospholipid bilayer but ions cannot?', a: 'The centre of the bilayer is made of hydrophobic fatty-acid tails, which small non-polar molecules can dissolve in or pass between; charged ions and polar molecules are repelled by it.'
  },
  draw(R, sc) {
    R.text('cell-surface membrane: cross-section', 168, 16, 5.6, { al: 'c' });
    // aqueous sides
    R.fill([10, 24, 310, 24, 310, 90, 10, 90], { ink: 'T', t: 0.09, wob: 0.3 });
    R.fill([10, 126, 310, 126, 310, 182, 10, 182], { ink: 'T', t: 0.09, wob: 0.3 });
    R.text('outside the cell (watery)', 14, 32, 4.4, { al: 'l' });
    R.text('cytoplasm (watery)', 14, 178, 4.4, { al: 'l' });
    const K = 1.45, TX = 16, path = [0, 0, 40, -2, 90, 1, 140, -2, 200, 0];
    R.push(TX, 108, 0, K);
    const bl = R.bilayer(path, { gap: 7, hr: 2.3, sp: 5.4, tail: 3.8 });
    const at = u => bl.at(u), W = q => [TX + K * q[0], 108 + K * q[1]];
    // cholesterol between the phospholipid tails (hydroxyl end towards the head side)
    const chol = (u, sd) => {
      const q = at(u), ang = Math.atan2(q[5], q[4]); R.push(q[0], q[1], ang, 1);
      R.knock(R.rrectPts(-1.4, sd > 0 ? 0.2 : -5.6, 2.8, 5.4, 1));
      R.rrect(-1.15, sd > 0 ? 0.6 : -5, 2.3, 4.4, 1, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.95, wob: 0.1 });
      R.circle(0, sd * 5.3, 0.8, { ink: 'B', w: 0.5, fi: 'P', ft: 0.9 });
      R.pop();
    };
    // proteins (knock the lipids out underneath)
    const gp1 = protOn(R, bl, 0.07, 'gp'), ch = protOn(R, bl, 0.2, 'channel'), car = protOn(R, bl, 0.43, 'carrier'), gp2 = protOn(R, bl, 0.8, 'gp'), ch2 = protOn(R, bl, 0.91, 'channel');
    // glycolipid: carbohydrate chain on an outer-leaflet head
    const glyl = u => {
      const q = at(u), hx = q[0] - q[2] * 5.1, hy = q[1] - q[3] * 5.1, nx = -q[2], ny = -q[3];
      R.circle(hx, hy, 2.3, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.9 });
      R.line(hx, hy, hx + nx * 4.4, hy + ny * 4.4, { ink: 'B', w: 0.6, taper: 'none' });
      [[0, 4.4], [1.9, 7.8], [-1.9, 7.8], [0, 10.6]].forEach(([a, d], i) => { const bx = hx + nx * d + q[4] * a, by = hy + ny * d + q[5] * a; if (i) R.line(hx + nx * 4.4, hy + ny * 4.4, bx, by, { ink: 'B', w: 0.5, taper: 'none' }); R.circle(bx, by, 1.5, { ink: 'B', w: 0.6, fi: 'TY', ft: 0.9 }); });
      return [hx + nx * 11, hy + ny * 11];
    };
    const gl1 = glyl(0.31), gl2 = glyl(0.66);
    [[0.52, 1], [0.58, -1], [0.62, 1], [0.69, -1], [0.55, -1], [0.72, 1]].forEach(([u, sd]) => chol(u, sd));
    // protein on the cytoplasm surface
    const sp = at(0.33), spx = sp[0] + sp[2] * 11.5, spy = sp[1] + sp[3] * 11.5;
    R.ellipse(spx, spy, 6.2, 4.4, { ink: 'B', w: 0.9, fi: 'P', ft: 0.8, wob: 0.2 });
    // sideways movement of lipids
    const tw = (q, d) => [q[0] - q[2] * d, q[1] - q[3] * d];
    
    // thickness bracket
    const b0 = at(0), bx = b0[0] - 4.5;
    R.line(bx, b0[1] - 7.4, bx, b0[1] + 7.4, { ink: 'P', w: 0.7, taper: 'none' }); R.line(bx - 1.4, b0[1] - 7.4, bx + 1.4, b0[1] - 7.4, { ink: 'P', w: 0.7, taper: 'none' }); R.line(bx - 1.4, b0[1] + 7.4, bx + 1.4, b0[1] + 7.4, { ink: 'P', w: 0.7, taper: 'none' });
    const P0 = W([bx, b0[1] + 7.4]), cholW = W(at(0.585)), tailW = W(at(0.66)), headW = W(tw(at(0.43), 5.1)), phW = W(tw(at(0.47), 5.1)), g1 = W(gl1), g2 = W(gl2), gp1W = W([gp1[0], gp1[1] - 10]), gp2W = W([gp2[0], gp2[1] - 10]), chW = W([ch[0], ch[1] + 7.5]), carW = W([car[0], car[1] + 7.5]), spW = W([spx, spy + 4.4]);
    R.pop();
    // ---- labels
    const lab = (s, tx, ty, p, o) => leader(R, s, p[0], p[1], tx, ty, Object.assign({ size: 4.8 }, o));
    lab('glycoprotein', 40, 58, gp1W, { al: 'c' });
    lab('glycolipid', 128, 52, g1, { al: 'c' });
    lab('hydrophilic head', 178, 70, headW, { al: 'c', size: 4.4 });
    lab('glycolipid', 238, 54, g2, { al: 'c' });
    lab('glycoprotein', 288, 70, gp2W, { al: 'c' });
    lab('channel protein', 62, 152, chW, { al: 'c' });
    lab('carrier protein', 152, 138, carW, { al: 'c' });
    lab('protein on surface', 100, 166, spW, { al: 'c', size: 4.4 });
    lab('phospholipid bilayer', 176, 168, W(tw(at(0.49), -5.1)), { al: 'c', size: 4.4 });
    lab('cholesterol: restricts movement', 222, 148, cholW, { al: 'c', size: 4.4 });
    lab('hydrophobic tails', 284, 162, W(at(0.855)), { al: 'c', size: 4.2 });
    R.text('about 7 nm', 4, P0[1] + 9, 3.8, { al: 'l', ink: 'P' });
    R.text('fluid: phospholipids and some proteins move sideways ↔', 14, 44, 4.2, { al: 'l', ink: 'P' });
    // organelles: same basic structure
    R.line(8, 188, 312, 188, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('every membrane has this basic structure', 160, 198, 4.6, { al: 'c' });
    R.nucleus(36, 218, 15, 12, { pores: 6, chromatin: 12 });
    R.mito(96, 218, 36, 18, 0, { plain: true });
    R.chloroplast(160, 218, 36, 18, 0, { grana: 3 });
    R.golgi(216, 211, 28, { n: 4 });
    R.vesicle(268, 214, 7, { ft: 0.35 }); R.vesicle(284, 222, 4.4, { ft: 0.35 });
    [['nuclear envelope', 36], ['mitochondrion', 96], ['chloroplast', 160], ['Golgi', 216], ['vesicles', 276]].forEach(([s, x]) => R.text(s, x, 237, 3.6, { al: 'c' }));
  },
  anim(A, sc) {
    // phospholipid heads drift sideways: fluid
    const p = A.ph(6);
    for (let k = 0; k < 3; k++) A.dot(120 + k * 62 + Math.sin(p * TAU + k) * 5, 108 - 5.1 * 1.45, 2.9, 'Y', 0.75, k + 3);
    for (let k = 0; k < 3; k++) A.dot(100 + k * 62 + Math.sin(p * TAU + k * 2) * 5, 108 + 5.1 * 1.45, 2.9, 'Y', 0.75, k + 7);
  },
});

/* membrane + panel helpers shared by the transport scenes */
const T_MEMP = { gap: 7, hr: 2.3, sp: 5.4, tail: 3.8 }, T_PG = 8.8;
function tMemb(R, x0, x1, y) { return R.bilayer([x0, y, x1, y], T_MEMP); }
function tProt(R, bl, x0, x1, x, kind, o = {}) { return protOn(R, bl, (x - x0) / (x1 - x0), kind, Object.assign({ gap: T_PG, hw: 4.8 }, o)); }
function wedge(R, x, y0, y1, big) { const wt = big ? 6 : 1.6, wb = big ? 1.6 : 6, p = [x - wt, y0, x + wt, y0, x + wb, y1, x - wb, y1]; R.fill(p, { ink: 'T', t: 0.35, wob: 0.15 }); R.poly(p, { ink: 'B', w: 0.6, wob: 0.1 }); }
function caption(R, cx, y, lines, w, size = 4.4) { lines.forEach(t => wrapText(t, w, size).forEach(ln => { R.text(ln, cx, y, size, { al: 'c' }); y += size + 2.4; })); return y; }

/* ---------- 3.2.3b Transport across membranes: four mechanisms ---------- */
S({
  id: '3.2.3b', num: '3.2.3', sub: 'Simple and facilitated diffusion, osmosis, active transport', title: 'Transport across cell membranes', topic: '3.2', slot: [1, 3], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.2.3.s4', '3.2.3.s5', '3.2.3.s6', '3.2.3.s7'],
  card: {
    text: '<b>Simple diffusion</b> is limited by the hydrophobic centre of the bilayer: small non-polar molecules cross; ions and large polar molecules do not. <b>Facilitated diffusion</b> uses <b>channel proteins</b> and <b>carrier proteins</b>, down a gradient, with no ATP. <b>Osmosis</b> is the net movement of water from a region of higher to a region of lower <b>water potential</b> (ψ) through a partially permeable membrane; pure water has ψ = 0 and solutes make ψ more negative. <b>Active transport</b> moves substances against a gradient using carrier proteins and energy from the <b>hydrolysis of ATP</b>.',
    terms: ['simple diffusion', 'facilitated diffusion', 'channel protein', 'carrier protein', 'osmosis', 'water potential', 'partially permeable membrane', 'active transport', 'hydrolysis of ATP', 'concentration gradient'],
    skill: 'Water potential (ψ) in kPa', eq: MATH(mi('ψ'), mo('='), mi('ψ'), mo('+'), mi('ψ')),
    eqn: 'ψ of pure water = 0 kPa; solutes make ψ negative; water moves to the lower (more negative) ψ',
    q: 'Why can oxygen diffuse across a bilayer without a protein, while sodium ions need a channel?', a: 'Oxygen is small and non-polar so it passes through the hydrophobic centre; sodium ions are charged and are repelled by it.'
  },
  draw(R, sc) {
    const vr = x => R.line(x, 24, x, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    vr(168); vr(332); vr(496);
    const title = (x, s) => R.text(s, x, 16, 5.6, { al: 'c' });
    const MY = 108, hi = (x, y) => R.text('high', x, y, 3.8, { al: 'c' });
    // 1 simple diffusion
    { const x0 = 22, x1 = 160; title(88, 'simple diffusion'); tMemb(R, x0, x1, MY);
      wedge(R, 11, 30, 190, true); R.text('high', 11, 26, 3.6, { al: 'c' }); R.text('low', 11, 198, 3.6, { al: 'c' });
      [[34, 38], [52, 54], [66, 36], [44, 72], [78, 62], [58, 86], [94, 42], [104, 70], [122, 52], [136, 76], [148, 40], [114, 88], [90, 80], [32, 94]].forEach(([x, y]) => smallMol(R, x, y, 1.8));
      [[46, 150], [96, 166], [132, 148]].forEach(([x, y]) => smallMol(R, x, y, 1.8));
      R.arrow([50, 92, 50, 138], { ink: 'P', w: 1.2, hs: 3 }); smallMol(R, 50, 108, 1.9);
      R.arrow([76, 94, 76, 138], { ink: 'P', w: 1.2, hs: 3 });
      tok(R, 112, 44, 'Na^+', { r: 4.8 }); R.arrow([112, 52, 112, 86], { ink: 'P', w: 1, hs: 2.6 }); cross(R, 112, 93, 3);
      glucTok(R, 140, 48, 4.4); R.arrow([140, 57, 140, 86], { ink: 'P', w: 1, hs: 2.6 }); cross(R, 140, 93, 3);
      caption(R, 88, 206, ['small non-polar molecules, e.g. O_2 and CO_2, pass through the bilayer', 'ions and large polar molecules cannot'], 150, 4.4);
    }
    // 2 facilitated diffusion
    { const x0 = 186, x1 = 324; title(255, 'facilitated diffusion'); const bl = tMemb(R, x0, x1, MY);
      wedge(R, 177, 30, 190, true);
      tProt(R, bl, x0, x1, 216, 'channel', { hw: 5.2 }); tProt(R, bl, x0, x1, 288, 'carrier', { hw: 6 });
      [[200, 40], [226, 52], [206, 70], [232, 36]].forEach(([x, y]) => tok(R, x, y, 'Na^+', { r: 4.6 })); tok(R, 216, 108, 'Na^+', { r: 4.8 }); tok(R, 216, 160, 'Na^+', { r: 4.6 });
      R.arrow([216, 80, 216, 98], { ink: 'P', w: 1.1, hs: 2.8 }); R.arrow([216, 118, 216, 148], { ink: 'P', w: 1.1, hs: 2.8 });
      [[262, 44], [300, 38], [316, 66], [280, 60]].forEach(([x, y]) => glucTok(R, x, y, 4)); glucTok(R, 288, 108, 3.6); glucTok(R, 288, 164, 4);
      R.arrow([288, 80, 288, 98], { ink: 'P', w: 1.1, hs: 2.8 }); R.arrow([288, 118, 288, 150], { ink: 'P', w: 1.1, hs: 2.8 });
      R.text('channel', 216, 128, 3.8, { al: 'c' }); R.text('carrier', 288, 128, 3.8, { al: 'c' });
      caption(R, 255, 206, ['channel and carrier proteins move substances down a gradient; no ATP', 'carrier changes shape'], 140, 4.4);
    }
    // 3 osmosis
    { const x0 = 350, x1 = 488; title(419, 'osmosis'); tMemb(R, x0, x1, MY);
      const water = (x, y) => R.circle(x, y, 1.9, { ink: 'B', w: 0.5, fi: 'T', ft: 0.8 });
      [[364, 36], [382, 48], [400, 34], [418, 52], [436, 38], [454, 56], [472, 40], [376, 66], [398, 74], [430, 70], [462, 76], [484, 62], [412, 88], [446, 90], [372, 90], [480, 88]].forEach(([x, y]) => water(x, y));
      [[392, 56], [468, 50]].forEach(([x, y]) => glucTok(R, x, y, 3.4));
      [[366, 140], [384, 158], [404, 142], [424, 162], [444, 144], [464, 160], [480, 142], [392, 178], [436, 180], [472, 178]].forEach(([x, y]) => glucTok(R, x, y, 3.6));
      [[376, 124], [414, 128], [452, 126], [482, 124], [400, 172]].forEach(([x, y]) => water(x, y));
      [[392, 90], [430, 92], [466, 90]].forEach(([x, y]) => R.arrow([x, y, x, y + 40], { ink: 'P', w: 1.2, hs: 3 }));
      R.text('higher water potential', 486, 28, 4, { al: 'r' }); R.text('(less negative)', 486, 33.5, 3.6, { al: 'r' });
      R.text('lower water potential', 486, 190, 4, { al: 'r' }); R.text('(more negative)', 486, 195.5, 3.6, { al: 'r' });
      caption(R, 419, 208, ['water moves from higher to lower ψ through a partially permeable membrane'], 140, 4.4);
    }
    // 4 active transport
    { const x0 = 514, x1 = 652; title(583, 'active transport'); const bl = tMemb(R, x0, x1, MY);
      wedge(R, 505, 30, 190, false);
      tProt(R, bl, x0, x1, 566, 'pump', { hw: 5.8 });
      [[534, 44], [596, 40], [566, 62]].forEach(([x, y]) => tok(R, x, y, 'Na^+', { r: 4.6 }));
      [[528, 150], [548, 172], [636, 150], [630, 182], [570, 190], [530, 192], [596, 178], [654, 170]].forEach(([x, y]) => tok(R, x, y, 'Na^+', { r: 4.6 }));
      R.arrow([566, 78, 566, 98], { ink: 'P', w: 1.2, hs: 3 }); R.arrow([566, 120, 566, 140], { ink: 'P', w: 1.2, hs: 3 });
      R.circle(606, 160, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP', 606, 162, 5.2, { al: 'c' });
      R.arrow([606, 153, 606, 143], { ink: 'B', w: 0.9, hs: 2.6 }); R.text('ADP + P_i', 606, 137, 4.4, { al: 'c' });
      caption(R, 583, 208, ['carrier protein uses energy from the hydrolysis of ATP to move ions against the gradient'], 140, 4.4);
    }
  },
  anim(A, sc) {
    const p = A.ph(5), q = A.ph(5, 0.5);
    A.dot(50, 92 + 46 * p, 1.8, 'P', 0.9, 1); A.dot(76, 92 + 46 * q, 1.8, 'P', 0.9, 2);
    A.ion(216, 80 + 70 * p, 'Na^+', 'T', 3.2, 3); A.glucose(288, 80 + 70 * q, 3.6, 4);
    for (let k = 0; k < 3; k++) { const u = A.ph(6, k / 3); A.dot(392 + k * 38, 70 + 90 * u, 1.9, 'T', 0.85, 5 + k); }
    A.ion(566, 70 + 74 * p, 'Na^+', 'T', 3.4, 9);
  },
});

/* ---------- 3.2.3c Co-transport and rate ---------- */
S({
  id: '3.2.3c', num: '3.2.3', sub: 'Co-transport in the ileum; what affects the rate of transport', title: 'Transport across cell membranes', topic: '3.2', slot: [0, 4], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.2.3.s8', '3.2.3.s9', '3.2.3.s10', '3.2.3.s11'],
  card: {
    text: '<b>Co-transport</b> is illustrated by the absorption of sodium ions and glucose by cells lining the mammalian ileum. Sodium ions are actively transported out of the cell into the blood, giving a low concentration inside. Sodium ions then diffuse in from the lumen through a <b>co-transporter protein</b>, bringing glucose with them. Glucose builds up and then diffuses into the blood by facilitated diffusion. Cells are adapted for rapid transport by a large <b>surface area</b> (e.g. microvilli) or more <b>channel and carrier proteins</b>; a steeper concentration or water potential gradient also speeds movement.',
    terms: ['co-transport', 'ileum', 'sodium ion', 'glucose', 'microvilli', 'surface area', 'channel protein', 'carrier protein', 'concentration gradient', 'water potential gradient'],
    skill: 'MS 3.1–3.2: interpret a rate graph', eq: MATH(mt('rate of diffusion '), mo('∝'), mfrac(mt('surface area × difference in concentration'), mt('thickness of exchange surface'))),
    q: 'Why does the rate of facilitated diffusion level off as the concentration gradient increases?', a: 'There is a limited number of channel or carrier proteins; once all are in use the rate cannot rise further.'
  },
  draw(R, sc) {
    R.text('co-transport: absorption of sodium ions and glucose in the ileum', 170, 16, 5.6, { al: 'c' });
    { const x0 = 16, x1 = 230, YT = 84, YB = 168;
      R.fill([10, 26, 236, 26, 236, YT - 10, 10, YT - 10], { ink: 'T', t: 0.1, wob: 0.2 });
      R.fill([10, YB + 10, 236, YB + 10, 236, 234, 10, 234], { ink: 'P', t: 0.12, wob: 0.2 });
      R.text('lumen of ileum', 14, 32, 4.4, { al: 'l' }); R.text('epithelial cell', 22, 100, 4.4, { al: 'l' }); R.text('blood', 14, 229, 4.4, { al: 'l' });
      const t = tMemb(R, x0, x1, YT), b = tMemb(R, x0, x1, YB);
      R.line(x0, YT + 8, x0, YB - 8, { ink: 'B', w: 1.0, wob: 0.3, taper: 'none' }); R.line(x1, YT + 8, x1, YB - 8, { ink: 'B', w: 1.0, wob: 0.3, taper: 'none' });
      tProt(R, t, x0, x1, 100, 'carrier', { hw: 6 }); tProt(R, b, x0, x1, 60, 'pump', { hw: 6 }); tProt(R, b, x0, x1, 170, 'carrier', { hw: 6 });
      [[34, 44], [52, 60], [132, 46], [150, 62], [176, 44], [204, 58], [220, 42]].forEach(([x, y]) => tok(R, x, y, 'Na^+', { r: 4.6 }));
      [[40, 36], [124, 60], [166, 62], [190, 40], [214, 66], [70, 56]].forEach(([x, y]) => glucTok(R, x, y, 3.8));
      tok(R, 91, 70, 'Na^+', { r: 4.2 }); glucTok(R, 109, 70, 3.4); R.arrow([100, 74, 100, 94], { ink: 'P', w: 1.1, hs: 2.8 });
      tok(R, 52, 114, 'Na^+', { r: 4.2 }); [[130, 118], [160, 130], [196, 120], [212, 142], [136, 146], [180, 150]].forEach(([x, y]) => glucTok(R, x, y, 3.8));
      R.arrow([60, 142, 60, 160], { ink: 'P', w: 1.1, hs: 2.8 }); tok(R, 60, 134, 'Na^+', { r: 4.2 }); R.arrow([60, 176, 60, 192], { ink: 'P', w: 1.1, hs: 2.8 });
      tok(R, 40, 206, 'Na^+', { r: 4.4 }); tok(R, 82, 208, 'K^+', { r: 3.4, fi: 'P' }); R.arrow([82, 198, 82, 178], { ink: 'P', w: 1.1, hs: 2.8 });
      R.circle(32, 136, 5.4, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP', 32, 138, 4.8, { al: 'c' }); R.arrow([32, 143, 32, 148], { ink: 'B', w: 0.8, hs: 2 }); R.text('ADP + P_i', 32, 156, 3.8, { al: 'c' });
      glucTok(R, 170, 144, 3.6); R.arrow([170, 152, 170, 162], { ink: 'P', w: 1.1, hs: 2.6 }); R.arrow([170, 176, 170, 204], { ink: 'P', w: 1.1, hs: 2.8 }); glucTok(R, 170, 212, 3.8); glucTok(R, 206, 218, 3.8);
      R.bubble(128, 64, 5.4, '2'); R.bubble(92, 150, 5.4, '1'); R.bubble(214, 108, 5.4, '3'); R.bubble(196, 190, 5.4, '4');
    }
    { const L = ['1 the sodium-potassium pump actively transports Na^+ out of the cell into the blood (ATP): [Na^+] is low inside', '2 Na^+ diffuses in through a co-transporter protein and brings glucose with it', '3 glucose builds up in the cell', '4 glucose diffuses out into the blood through a carrier (facilitated diffusion)'];
      let y = 44; L.forEach(t => { wrapText(t, 94, 4.2).forEach(ln => { R.text(ln, 246, y, 4.2, { al: 'l' }); y += 5.6; }); y += 4; }); }
    { // key
      const ky = 168; R.text('key', 246, ky, 4.2, { al: 'l' });
      tok(R, 252, ky + 11, 'Na^+', { r: 4.2 }); R.text('sodium ion', 262, ky + 12.4, 4, { al: 'l' });
      tok(R, 252, ky + 24, 'K^+', { r: 4.2, fi: 'P' }); R.text('potassium ion', 262, ky + 25.4, 4, { al: 'l' });
      glucTok(R, 252, ky + 37, 4.2); R.text('glucose', 262, ky + 38.4, 4, { al: 'l' });
      R.rrect(249.5, ky + 46, 5, 13, 1.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); R.text('membrane protein', 262, ky + 54, 4, { al: 'l' });
    }
    R.line(344, 28, 344, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // rate graph
    R.text('rate and the concentration gradient', 424, 28, 4.6, { al: 'c' });
    { const g = R.graph(372, 46, 118, 120, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'concentration gradient', yl: 'rate of movement', xt: [], yt: [], fs: 4.4, xly: 10, ylx: 5 }).axes();
      g.curve(x => x, { ink: 'T', w: 1.6 }); g.curve(x => 8.4 * x / (1.6 + x), { ink: 'P', w: 1.6 });
      g.dashed(0, 7.1, 10, 7.1, { ink: 'B', w: 0.5 });
      R.text('simple diffusion', 488, 118, 4.2, { al: 'r', ink: 'T' }); R.text('facilitated diffusion', 380, 62, 4.2, { al: 'l', ink: 'P' });
      caption(R, 424, 196, ['facilitated diffusion levels off: every channel or carrier is in use'], 118, 4.2); }
    R.line(498, 28, 498, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // adaptations
    R.text('adaptations for faster transport', 580, 28, 4.6, { al: 'c' });
    const row = (y, a, b, txt) => { a(y); R.arrow([548, y, 566, y], { ink: 'B', w: 0.9, hs: 2.6 }); b(y); wrapText(txt, 140, 4.4).forEach((ln, i) => R.text(ln, 580, y + 26 + i * 5.6, 4.4, { al: 'c' })); };
    row(70, y => { R.line(506, y + 4, 542, y + 4, { ink: 'B', w: 1.4, taper: 'none' }); R.text('flat', 524, y - 8, 4, { al: 'c' }); },
      y => { const p = [570, y + 4]; for (let k = 0; k < 5; k++) p.push(574 + k * 15, y + 4, 576 + k * 15, y - 14, 584 + k * 15, y - 14, 586 + k * 15, y + 4); p.push(650, y + 4); R.stroke(p, { ink: 'B', w: 1.3, smooth: false, taper: 'none' }); R.text('microvilli', 610, y - 20, 4, { al: 'c' }); },
      'larger surface area: more of the membrane for transport');
    row(146, y => { R.line(506, y + 4, 542, y + 4, { ink: 'B', w: 1.4, taper: 'none' }); R.rrect(521, y - 8, 5, 18, 1.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); },
      y => { R.line(570, y + 4, 650, y + 4, { ink: 'B', w: 1.4, taper: 'none' }); [578, 592, 606, 620, 634].forEach(x => R.rrect(x - 2.5, y - 8, 5, 18, 1.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 })); },
      'more channel or carrier proteins: more routes across');
    { const y = 214; wedge(R, 524, y - 24, y + 2, false); R.arrow([548, y - 10, 564, y - 10], { ink: 'B', w: 0.9, hs: 2.6 }); wedge(R, 600, y - 24, y + 2, true);
      caption(R, 580, y + 10, ['steeper concentration or water potential gradient: faster'], 140, 4.4); }
  },
  anim(A, sc) {
    const w = A.ph(6); A.ion(91, 76 + 20 * w, 'Na^+', 'T', 3.2, 10); A.glucose(109, 76 + 20 * w, 3.4, 11);
    const w2 = A.ph(6, 0.4); A.ion(60, 134 + 54 * w2, 'Na^+', 'T', 3.2, 12);
    const w3 = A.ph(6, 0.7); A.glucose(170, 144 + 64 * w3, 3.6, 13);
  },
});
