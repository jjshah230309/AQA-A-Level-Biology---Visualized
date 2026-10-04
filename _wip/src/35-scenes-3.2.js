/* ===================== TOPIC 3.2 CELLS ===================== */
/* leader label: text at (tx,ty), line to target (x,y) */
function leader(R, str, x, y, tx, ty, o = {}) {
  const size = o.size || 5.6, al = o.al || 'c', w = labelWidth(str, size);
  const ax = al === 'l' ? tx : al === 'r' ? tx - w : tx - w / 2, ex = clamp(x, ax - 1, ax + w + 1), ey = ty + (y > ty ? 2 : -size - 1);
  R.text(str, tx, ty, size, { al, ink: o.ink });
  R.line(ex, ey, x, y, { ink: 'B', w: 0.6, taper: 'end', wob: 0.15, t: 0.9 }); R.dot(x, y, 1, { ink: 'B' });
}

/* ---------- 3.2.1.1 Structure of eukaryotic cells (hero) ---------- */
S({
  id: '3.2.1.1', num: '3.2.1.1', title: 'Structure of eukaryotic cells', topic: '3.2', slot: [0, 0], span: [2, 2], dna: 'bio',
  covers: ['3.2.1.1.s1', '3.2.1.1.s2', '3.2.1.1.s3', '3.2.1.1.s4', '3.2.1.1.s5', '3.2.1.1.s6', '3.2.1.1.s7', '3.2.1.1.s8', '3.2.1.1.s9', '3.2.1.1.s10', '3.2.1.1.s11'],
  card: {
    text: 'Eukaryotic cells have a <b>cell-surface membrane</b>; a <b>nucleus</b> containing chromosomes (protein-bound, linear DNA) and one or more nucleoli; <b>mitochondria</b>; <b>chloroplasts</b> (plants and algae); <b>Golgi apparatus</b> and vesicles; <b>lysosomes</b> (membrane-bound organelles that release hydrolytic enzymes); <b>ribosomes</b>; <b>rough and smooth endoplasmic reticulum</b>; a <b>cell wall</b> (plants, algae and fungi); and a <b>vacuole</b> (plants). In complex multicellular organisms, cells become specialised; specialised cells are organised into tissues, tissues into organs and organs into systems. You should be able to explain adaptations of eukaryotic cells using these features.',
    terms: ['cell-surface membrane', 'nucleus', 'nucleolus', 'chromosome', 'mitochondrion', 'chloroplast', 'Golgi apparatus', 'lysosome', 'ribosome', 'RER', 'SER', 'cell wall', 'vacuole', 'tissue', 'organ', 'system'],
    skill: 'MS 1.8: magnification', eq: MATH(mt('magnification '), mo('='), mfrac(mt('size of image'), mt('size of real object'))),
    q: 'Which organelles would you expect to be abundant in a cell that secretes large amounts of protein?', a: 'Rough ER (ribosomes make the protein), Golgi apparatus and vesicles (modify, package, transport), and mitochondria (ATP).'
  },
  draw(R, sc) {
    const AX = 22, PX = 358;
    // ================= ANIMAL CELL =================
    const SA = 0.88, TA = (x, y) => [170 + (x - 174) * SA, 175 + (y - 175) * SA];
    R.text('animal cell', 170, 22, 9, { al: 'c' });
    R.push(170 - 174 * SA, 175 - 175 * SA, 0, SA);
    const cell = [60, 90, 120, 44, 190, 38, 262, 56, 314, 110, 322, 180, 296, 250, 230, 300, 150, 312, 78, 290, 36, 230, 28, 150];
    R.fill(cell, { ink: 'P', t: 0.1, smooth: true, wob: 0.8 });
    R.poly(cell, { ink: 'B', w: 2.1, smooth: true, wob: 0.9 });
    R.poly(cell.map((v, i) => { const cx = 174, cy = 175; return i % 2 ? cy + (v - cy) * 0.985 : cx + (v - cx) * 0.985; }), { ink: 'B', w: 0.7, smooth: true, wob: 0.7 });
    // RER wrapped near nucleus, SER, Golgi
    R.rer(62, 212, 70, 4, { rot: -22 });
    R.ser(196, 236, 70, 42, { rot: 8 });
    R.golgi(256, 126, 56);
    // nucleus with chromatin and unwinding DNA
    R.nucleus(150, 134, 56, 52, { pores: 9, chromatin: 30 });
    R.helix(138, 150, 168, 118, { amp: 4.5, turns: 2.5, w: 0.85 });
    // mitochondria, lysosomes, ribosomes, vesicles
    R.mito(72, 108, 38, 17, 25); R.mito(250, 196, 36, 16, -35); R.mito(150, 262, 38, 17, 8);
    R.lysosome(236, 82, 7); R.lysosome(104, 262, 6); R.lysosome(290, 160, 5.5);
    R.scatter(174, 190, 120, 80, 38, 1.1, { ink: 'P' });
    [[212, 126], [226, 150], [276, 90], [296, 128]].forEach(([x, y], i) => R.vesicle(x, y, 3.4 - i * 0.2, { fi: 'P', ft: 0.5 }));
    R.pop();
    const L1 = (str, p, tx, ty, al) => { const q = TA(p[0], p[1]); leader(R, str, q[0], q[1], tx, ty, { al: al || 'l', size: 5.4 }); };
    L1('nucleus', [112, 118], 2, 120); L1('chromosome', [142, 150], 2, 140); L1('nucleolus', [170, 128], 130, 40, 'c');
    L1('ribosomes', [88, 196], 2, 196); L1('RER', [84, 206], 2, 232);
    L1('Golgi apparatus', [262, 128], 306, 100); L1('lysosome', [292, 160], 306, 136); L1('mitochondrion', [262, 202], 306, 172);
    L1('SER', [230, 252], 306, 208); L1('cell-surface membrane', [312, 190], 306, 244);
    R.scaleBar(60, 336, 132, '10 \u00B5m');
    // ================= PLANT CELL =================
    const SP = 0.86, TP = (x, y) => [505 + (x - (PX + 145)) * SP, 175 + (y - 175) * SP];
    R.text('plant cell', 505, 22, 9, { al: 'c' });
    R.push(505 - (PX + 145) * SP, 175 - 175 * SP, 0, SP);
    const wall = R.rrectPts(PX, 40, 290, 270, 26);
    R.fill(wall, { ink: 'TY', t: 0.2, wob: 0.6 }); R.poly(wall, { ink: 'B', w: 2.6, wob: 0.8 });
    const inner = R.rrectPts(PX + 11, 51, 268, 248, 20);
    R.fill(inner, { ink: 'Y', t: 0.1, wob: 0.4 }); R.poly(inner, { ink: 'B', w: 1.0, wob: 0.6 });
    for (let i = 0; i < 18; i++) R.line(PX + 4 + i * 15.8, 42, PX + 5 + i * 15.8, 49, { ink: 'B', w: 0.5, wob: 0.15, t: 0.8, taper: 'none' });
    // vacuole (tonoplast)
    const vac = [PX + 78, 112, PX + 150, 82, PX + 230, 108, PX + 254, 190, PX + 220, 262, PX + 140, 280, PX + 76, 252, PX + 56, 180];
    R.fill(vac, { ink: 'T', t: 0.22, smooth: true, wob: 0.6 }); R.poly(vac, { ink: 'B', w: 1.3, smooth: true, wob: 0.7 });
    R.poly(vac.map((v, i) => i % 2 ? 190 + (v - 190) * 0.97 : PX + 155 + (v - PX - 155) * 0.97), { ink: 'B', w: 0.6, smooth: true, wob: 0.5, st: 0.8 });
    R.nucleus(PX + 44, 100, 30, 28, { pores: 7, chromatin: 14 });
    R.chloroplast(PX + 118, 66, 50, 20, 0); R.chloroplast(PX + 214, 70, 46, 19, 8); R.chloroplast(PX + 258, 168, 44, 18, 90); R.chloroplast(PX + 40, 214, 44, 18, 70);
    R.mito(PX + 32, 160, 28, 12, -30); R.mito(PX + 150, 292, 28, 12, 0);
    R.rer(PX + 20, 256, 38, 3, { rot: -10 }); R.golgi(PX + 258, 252, 30, { n: 4 });
    R.scatter(PX + 150, 180, 100, 50, 16, 1, { ink: 'P' });
    R.pop();
    const L2 = (str, p, tx, ty, al) => { const q = TP(p[0], p[1]); leader(R, str, q[0], q[1], tx, ty, { al: al || 'r', size: 5.4 }); };
    L2('cell wall', [PX + 3, 150], 374, 118); L2('nucleus', [PX + 24, 96], 374, 154); L2('cell-surface membrane', [PX + 11, 230], 374, 262);
    L2('tonoplast', [PX + 58, 200], 374, 226); L2('vacuole', [PX + 150, 190], 506, 190, 'c');
    L2('chloroplast', [PX + 126, 62], 470, 42, 'c'); L2('mitochondrion', [PX + 150, 292], 560, 330, 'c');
    R.scaleBar(560, 344, 86, '10 \u00B5m');
    // ================= LEVELS OF ORGANISATION =================
    R.line(14, 358, 650, 358, { ink: 'B', w: 0.6, t: 0.6, taper: 'none' });
    const lv = (y0, tint, cellFn, tissFn, orgFn, sysFn, lab) => {
      cellFn(R, 70, y0); R.arrow([116, y0, 168, y0], { ink: 'B', w: 1.3, hs: 7 });
      tissFn(R, 234, y0); R.arrow([298, y0, 350, y0], { ink: 'B', w: 1.3, hs: 7 });
      orgFn(R, 410, y0); R.arrow([470, y0, 520, y0], { ink: 'B', w: 1.3, hs: 7 });
      sysFn(R, 586, y0);
    };
    // animal: specialised muscle cell -> cardiac muscle tissue -> heart -> circulatory system
    const ep = (r, x, y) => { r.rrect(x - 8, y - 22, 16, 44, 7, { ink: 'B', w: 1.2, fi: 'P', ft: 0.2 }); for (let k = 0; k < 6; k++) r.line(x - 8, y - 15 + k * 6.2, x + 8, y - 15 + k * 6.2, { ink: 'B', w: 0.6, t: 0.9, taper: 'none' }); r.ellipse(x, y, 3.4, 5, { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); };
    const epT = (r, x, y) => { for (let k = 0; k < 5; k++) { r.rrect(x - 40 + k * 17, y - 20 + (k % 2) * 3, 14, 38, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.2 }); for (let j = 0; j < 4; j++) r.line(x - 40 + k * 17, y - 12 + (k % 2) * 3 + j * 8, x - 26 + k * 17, y - 12 + (k % 2) * 3 + j * 8, { ink: 'B', w: 0.5, t: 0.9, taper: 'none' }); } };
    const heartPts = (x, y, s) => [x, y + 22 * s, x - 22 * s, y + 2 * s, x - 22 * s, y - 14 * s, x - 10 * s, y - 22 * s, x, y - 12 * s, x + 10 * s, y - 22 * s, x + 22 * s, y - 14 * s, x + 22 * s, y + 2 * s];
    const gut = (r, x, y) => { const p = heartPts(x, y, 1.05); r.fill(p, { ink: 'P', t: 0.35, smooth: true, wob: 0.4 }); r.poly(p, { ink: 'B', w: 1.4, smooth: true, wob: 0.5 }); r.stroke([x - 6, y - 24, x - 8, y - 34, x - 18, y - 36], { ink: 'B', w: 2.4, smooth: true, taper: 'none' }); r.stroke([x + 6, y - 24, x + 8, y - 34, x + 18, y - 36], { ink: 'B', w: 2.4, smooth: true, taper: 'none' }); };
    const sys = (r, x, y) => { const p = heartPts(x, y - 4, 0.55); r.fill(p, { ink: 'P', t: 0.4, smooth: true, wob: 0.3 }); r.poly(p, { ink: 'B', w: 1, smooth: true }); r.ellipse(x, y - 4, 30, 24, { ink: 'P', w: 2.2, t: 0.8, rot: 0 }); r.stroke([x - 24, y + 10, x - 36, y + 26, x - 10, y + 34, x + 10, y + 34, x + 36, y + 26, x + 24, y + 10], { ink: 'T', w: 2.2, smooth: true, taper: 'none' }); };
    lv(398, 'P', ep, epT, gut, sys);
    R.text('cell', 70, 438, 5.2, { al: 'c' }); R.text('tissue', 234, 438, 5.2, { al: 'c' }); R.text('organ', 410, 438, 5.2, { al: 'c' }); R.text('system', 586, 438, 5.2, { al: 'c' });
    // plant: palisade cell -> palisade layer -> leaf -> shoot system
    const pal = (r, x, y) => { r.rrect(x - 11, y - 20, 22, 40, 5, { ink: 'B', w: 1.2, fi: 'TY', ft: 0.15 }); for (let k = 0; k < 5; k++) r.ellipse(x - 5 + (k % 2) * 8, y - 12 + k * 7, 3.2, 2.2, { ink: 'B', w: 0.6, fi: 'TY', ft: 0.8 }); };
    const palT = (r, x, y) => { for (let k = 0; k < 5; k++) { r.rrect(x - 40 + k * 17, y - 20, 16, 40, 4, { ink: 'B', w: 1, fi: 'TY', ft: 0.15 }); r.ellipse(x - 32 + k * 17, y - 10, 3, 2.2, { ink: 'B', w: 0.5, fi: 'TY', ft: 0.8 }); r.ellipse(x - 32 + k * 17, y + 6, 3, 2.2, { ink: 'B', w: 0.5, fi: 'TY', ft: 0.8 }); } };
    const leaf = (r, x, y) => { const p = [x - 46, y, x - 20, y - 22, x + 20, y - 24, x + 50, y, x + 20, y + 22, x - 20, y + 24]; r.fill(p, { ink: 'TY', t: 0.4, smooth: true, wob: 0.4 }); r.poly(p, { ink: 'B', w: 1.3, smooth: true }); r.line(x - 46, y, x + 40, y, { ink: 'B', w: 0.9, taper: 'none' }); for (let k = 0; k < 4; k++) { r.line(x - 28 + k * 18, y, x - 18 + k * 18, y - 14, { ink: 'B', w: 0.6, taper: 'none' }); r.line(x - 28 + k * 18, y, x - 18 + k * 18, y + 14, { ink: 'B', w: 0.6, taper: 'none' }); } };
    const shoot = (r, x, y) => { r.line(x, y + 26, x, y - 18, { ink: 'B', w: 1.6, taper: 'none' }); [[-14, -2], [14, -10], [-12, 12], [12, 8]].forEach(([dx, dy]) => { r.ellipse(x + dx * 1.2, y + dy, 11, 5, { ink: 'B', w: 1, fi: 'TY', ft: 0.45, rot: dx < 0 ? 25 : -25 }); }); r.stroke([x - 14, y + 28, x, y + 22, x + 14, y + 28], { ink: 'B', w: 1.2, smooth: true }); };
    lv(468, 'TY', pal, palT, leaf, shoot);
  },
  anim(A, sc) {
    const SA = 0.88, T = (x, y) => [170 + (x - 174) * SA, 175 + (y - 175) * SA];
    const pa = [88, 196, 120, 168, 190, 122, 250, 120].map((v, i, arr) => i % 2 ? 0 : v), P1 = [], P2 = [];
    [[88, 196], [120, 168], [190, 122], [250, 120]].forEach(p => P1.push(...T(p[0], p[1]))); [[262, 124], [290, 110], [316, 112]].forEach(p => P2.push(...T(p[0], p[1])));
    for (let i = 0; i < 3; i++) { const p = A.ph(6, i / 3); if (p < 0.6) { const q = A.along(P1, p / 0.6); A.dot(q[0], q[1], 2.4, 'P', 0.9, i); } else { const q = A.along(P2, (p - 0.6) / 0.4); A.dot(q[0], q[1], 2.0, 'P', 0.9 * (1 - (p - 0.6) / 0.4 * 0.4), i); } }
    const c = A.ph(4); const cq = [505 + (358 + 118 - 503) * 0.86, 175 + (66 - 175) * 0.86]; A.ring(cq[0], cq[1], 11 + 2 * Math.sin(c * TAU), 'Y', 0.7, 0.4);
  },
});

/* ---------- 3.2.1.2 Prokaryotic cells and viruses ---------- */
S({
  id: '3.2.1.2', num: '3.2.1.2', title: 'Structure of prokaryotic cells and of viruses', topic: '3.2', slot: [2, 0], span: [2, 1], dna: 'bio',
  covers: ['3.2.1.2.s1', '3.2.1.2.s2', '3.2.1.2.s3', '3.2.1.2.s4', '3.2.1.2.s5', '3.2.1.2.s6', '3.2.1.2.s7'],
  card: {
    text: 'Prokaryotic cells are much smaller than eukaryotic cells. They have cytoplasm lacking membrane-bound organelles, smaller ribosomes, no nucleus (a single circular DNA molecule free in the cytoplasm, not associated with proteins) and a cell wall containing <b>murein</b>, a glycoprotein. Many also have one or more <b>plasmids</b>, a <b>capsule</b> and one or more <b>flagella</b>. <b>Viruses</b> are acellular and non-living; a virus particle has genetic material, a <b>capsid</b> and an <b>attachment protein</b>.',
    terms: ['murein', 'circular DNA', 'plasmid', 'capsule', 'flagellum', 'smaller ribosomes', 'virus', 'capsid', 'attachment protein', 'acellular'],
    skill: 'Order of magnitude', eq: null,
    q: 'Give two structural differences between a prokaryotic cell and a eukaryotic cell.', a: 'Prokaryote: no nucleus (free, circular, protein-free DNA), no membrane-bound organelles, smaller ribosomes, murein cell wall, much smaller.'
  },
  draw(R, sc) {
    // ---- bacterium (rod, longitudinal cut-away) ----
    R.text('prokaryotic cell', 150, 22, 8, { al: 'c' });
    const body = R.rrectPts(30, 60, 240, 112, 56);
    const caps = R.rrectPts(22, 52, 256, 128, 64);
    R.fill(caps, { ink: 'Y', t: 0.14, wob: 0.6 }); R.poly(caps, { ink: 'B', w: 1.0, wob: 0.8, st: 0.7 });
    R.fill(body, { ink: 'P', t: 0.1, wob: 0.5 }); R.poly(body, { ink: 'B', w: 2.4, wob: 0.8 });
    R.poly(R.rrectPts(34, 64, 232, 104, 52), { ink: 'B', w: 0.8, wob: 0.5 });
    // circular DNA loop free in cytoplasm (nucleoid) with supercoils
    const lp = a => [150 + Math.cos(a) * (50 + Math.sin(a * 3 + 0.5) * 7), 118 + Math.sin(a) * (25 + Math.sin(a * 2 + 1) * 4)];
    const loop = []; for (let i = 0; i < 48; i++) loop.push(...lp(i / 48 * TAU));
    R.stroke(loop, { ink: 'B', w: 1.3, closed: true, smooth: true, wob: 0.6 });
    for (let i = 0; i < 20; i++) { const q = lp(i / 20 * TAU); R.dot(q[0], q[1], 1.0, { ink: 'T' }); }
    // plasmids
    [[88, 96], [220, 140], [214, 92]].forEach(([x, y]) => { R.circle(x, y, 9, { ink: 'B', w: 1.2, wob: 0.4 }); R.circle(x, y, 9, { ink: 'T', w: 1.2, t: 0.7 }); });
    R.scatter(150, 118, 100, 40, 26, 1.0, { ink: 'P' });
    // flagellum
    R.stroke([278, 116, 296, 108, 316, 124, 336, 108, 356, 122], { ink: 'B', w: 1.8, smooth: true, taper: 'end' });
    R.circle(278, 116, 3, { ink: 'B', w: 1, fi: 'P', ft: 0.8 });
    // labels
    leader(R, 'capsule', 26, 100, 8, 40, { al: 'l', size: 5.6 }); leader(R, 'cell wall (murein)', 38, 130, 8, 200, { al: 'l', size: 5.6 });
    leader(R, 'circular DNA', 150, 94, 150, 44, { size: 5.6 }); leader(R, 'plasmid', 88, 90, 52, 52, { size: 5.6 });
    leader(R, 'ribosomes (70S)', 170, 140, 188, 206, { size: 5.6 }); leader(R, 'flagellum', 320, 124, 312, 150, { size: 5.6 });
    leader(R, 'no nucleus, no organelles', 230, 146, 250, 226, { size: 5.2 });
    R.scaleBar(30, 226, 24, '1 µm'); R.text('0.5–5 µm long', 130, 226, 5, { al: 'l' });
    // ---- virus ----
    R.line(372, 14, 372, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('virus particle', 520, 22, 8, { al: 'c' });
    R.push(520, 112, 0, 1);
    const cap = polyPts(0, 0, 66, 6, PI / 6);
    R.fill(cap, { ink: 'P', t: 0.3, wob: 0.4 }); R.poly(cap, { ink: 'B', w: 2, wob: 0.5 });
    for (let k = 0; k < 6; k++) { const a = k * TAU / 6 + PI / 6; R.line(0, 0, Math.cos(a) * 66, Math.sin(a) * 66, { ink: 'B', w: 0.6, t: 0.8, taper: 'none' }); }
    for (let k = 0; k < 6; k++) { const a = k * TAU / 6 + PI / 6, ax = Math.cos(a) * 66, ay = Math.sin(a) * 66; R.line(ax, ay, ax * 1.2, ay * 1.2, { ink: 'B', w: 1.4, taper: 'none' }); R.fill([ax * 1.2 - 4, ay * 1.2 - 4, ax * 1.2 + 4, ay * 1.2 - 4, ax * 1.2, ay * 1.2 + 4], { ink: 'T', t: 0.9, wob: 0.05 }); }
    // genetic material (nucleic acid) inside capsid
    R.stroke([-24, -10, -8, -30, 12, -6, 26, -26, 30, 8, 8, 22, -14, 10, -30, 24], { ink: 'T', w: 2.2, smooth: true, taper: 'none', wob: 0.4 });
    R.helix(-22, 0, 22, 0, { amp: 7, turns: 2.5, w: 0.9 });
    R.pop();
    leader(R, 'capsid', 566, 86, 578, 50, { al: 'l', size: 5.6 }); leader(R, 'attachment protein', 586, 150, 584, 206, { al: 'l', size: 5.6 });
    leader(R, 'genetic material', 508, 108, 420, 200, { al: 'l', size: 5.6 });
    R.text('acellular, non-living', 520, 228, 5.4, { al: 'c' });
    R.scaleBar(396, 226, 20, '100 nm');
  },
  anim(A, sc) {
    const p = A.ph(2.2);
    const pts = [278, 116, 296, 108, 316, 124, 336, 108, 356, 122];
    for (let i = 0; i < 5; i++) { const x = 278 + i * 20, y = (i % 2 ? 108 : 122) + Math.sin(p * TAU + i) * 3; A.dot(x, y, 1.4, 'B', 0.9); }
    const s = A.ph(5); for (let i = 0; i < 3; i++) { const a = s * TAU + i * 2.1; A.dot(150 + Math.cos(a) * 60, 118 + Math.sin(a) * 30, 1.2, 'P', 0.8); }
  },
});

/* ---------- 3.2.1.3 Methods of studying cells (i) microscopy ---------- */
S({
  id: '3.2.1.3a', num: '3.2.1.3', sub: 'Microscopy: magnification and resolution', title: 'Methods of studying cells', topic: '3.2', slot: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.2.1.3.s1', '3.2.1.3.s2', '3.2.1.3.s3', '3.2.1.3.s4'],
  card: {
    text: 'You need the principles and limitations of <b>optical microscopes</b>, <b>transmission electron microscopes</b> (TEM) and <b>scanning electron microscopes</b> (SEM). Magnification is how many times larger the image is than the real object; <b>resolution</b> is the ability to distinguish two close points as separate, and is limited by the wavelength of the radiation (electrons have a much shorter wavelength than light). The size of an object viewed with an optical microscope can be measured using an eyepiece graticule calibrated with a stage micrometer. The scientific community took time to distinguish artefacts from true organelles.',
    terms: ['magnification', 'resolution', 'optical microscope', 'TEM', 'SEM', 'graticule', 'stage micrometer', 'artefact'],
    skill: 'MS 1.8 and MS 2.2: magnification', eq: MATH(mt('magnification '), mo('='), mfrac(mt('size of image'), mt('size of real object'))),
    eqn: 'Rearranged: real size = image size ÷ magnification.  Worked example: image 30 mm, ×3000 → 10 µm',
    q: 'Why can a TEM show ribosomes but an optical microscope cannot?', a: 'Electrons have a much shorter wavelength than light, so the TEM has a much higher resolution (it can distinguish points that are much closer together).'
  },
  draw(R, sc) {
    // three instrument schematics
    const col = (cx, title, parts) => { R.text(title, cx, 18, 5.4, { al: 'c' }); parts(cx); };
    col(54, 'optical', cx => {
      R.circle(cx, 36, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 }); R.line(cx, 42, cx, 60, { ink: 'Y', w: 3, t: 0.7, solid: false, taper: 'none' });
      R.ellipse(cx, 66, 12, 3, { ink: 'B', w: 1, fi: 'T', ft: 0.35 }); R.rect(cx - 14, 74, 28, 3, { ink: 'B', w: 1, fi: 'P', ft: 0.5 });
      R.ellipse(cx, 88, 10, 3, { ink: 'B', w: 1, fi: 'T', ft: 0.35 }); R.rect(cx - 5, 94, 10, 12, { ink: 'B', w: 1 }); R.ellipse(cx, 110, 6, 2.5, { ink: 'B', w: 1, fi: 'T', ft: 0.35 });
      R.text('light', cx + 12, 38, 3.9, { al: 'l' }); R.text('specimen', cx + 17, 77, 3.9, { al: 'l' }); R.text('eyepiece', cx + 9, 112, 3.9, { al: 'l' });
    });
    col(160, 'TEM', cx => {
      R.rect(cx - 6, 24, 12, 8, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 }); R.line(cx, 32, cx, 96, { ink: 'Y', w: 3, t: 0.7, solid: false, taper: 'none' });
      for (const y of [48, 82]) { R.rect(cx - 16, y, 7, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); R.rect(cx + 9, y, 7, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); }
      R.rect(cx - 12, 66, 24, 2.5, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); R.rect(cx - 16, 100, 32, 5, { ink: 'B', w: 1, fi: 'TY', ft: 0.7 });
      R.text('electrons pass', cx + 18, 60, 3.9, { al: 'l' }); R.text('through', cx + 18, 65, 3.9, { al: 'l' }); R.text('thin specimen', cx + 17, 72, 3.9, { al: 'l' }); R.text('screen', cx + 19, 106, 3.9, { al: 'l' });
    });
    col(266, 'SEM', cx => {
      R.rect(cx - 6, 24, 12, 8, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 }); R.line(cx, 32, cx, 78, { ink: 'Y', w: 3, t: 0.7, solid: false, taper: 'none' });
      R.rect(cx - 14, 46, 6, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); R.rect(cx + 8, 46, 6, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.7 });
      R.stroke([cx - 28, 100, cx - 18, 86, cx - 6, 92, cx + 8, 84, cx + 22, 94, cx + 34, 90], { ink: 'B', w: 1.3, smooth: true }); R.fill([cx - 28, 100, cx - 18, 86, cx - 6, 92, cx + 8, 84, cx + 22, 94, cx + 34, 90, cx + 34, 106, cx - 28, 106], { ink: 'P', t: 0.5, wob: 0.2 });
      R.line(cx, 78, cx, 90, { ink: 'Y', w: 3, t: 0.7, solid: false, taper: 'none' }); R.rect(cx + 18, 70, 8, 6, { ink: 'B', w: 1, fi: 'T', ft: 0.8 });
      R.text('beam scans', cx + 20, 52, 3.9, { al: 'l' }); R.text('surface', cx + 20, 57, 3.9, { al: 'l' }); R.text('detector', cx + 14, 82, 3.9, { al: 'l' });
    });
    R.line(8, 120, 312, 120, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // resolution vs magnification
    R.text('resolution', 76, 132, 5.4, { al: 'c' });
    R.circle(36, 152, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); R.circle(52, 152, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); R.text('resolved', 44, 172, 4.4, { al: 'c' });
    R.circle(98, 152, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); R.circle(104, 152, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.5, st: 0.6 }); R.text('not resolved', 102, 172, 4.4, { al: 'c' });
    R.text('electron beam: shorter wavelength,', 76, 184, 4, { al: 'c' }); R.text('higher resolution than light', 76, 190, 4, { al: 'c' });
    R.line(144, 124, 144, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // approximate resolving power bars (log scale, TEM best)
    R.text('smallest separable distance', 228, 132, 4.6, { al: 'c' });
    [['optical', 90, 'Y'], ['SEM', 54, 'P'], ['TEM', 30, 'T']].forEach(([n, w, c], i) => { const y = 142 + i * 14; R.text(n, 160, y + 6, 4.6, { al: 'l' }); R.rect(186, y, w, 8, { ink: 'B', w: 0.9, fi: c, ft: 0.8 }); });
    R.text('shorter bar = higher resolution', 228, 188, 4, { al: 'c' });
    // formula and graticule
    R.line(8, 196, 312, 196, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('M = I ÷ A', 34, 214, 7, { al: 'c' });
    R.text('30 mm ÷ 3000', 34, 226, 4.6, { al: 'c' });
    R.text('= 10 µm', 90, 226, 4.6, { al: 'c' });
    R.rect(130, 204, 90, 11, { ink: 'B', w: 1, fi: 'Y', ft: 0.25 }); for (let i = 0; i <= 18; i++) R.line(130 + i * 5, 204, 130 + i * 5, 204 + (i % 5 === 0 ? 7 : 4), { ink: 'B', w: 0.6, taper: 'none', wob: 0.05 });
    R.rect(130, 220, 90, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.25 }); for (let i = 0; i <= 18; i++) R.line(130 + i * 5, 220, 130 + i * 5, 220 + (i % 5 === 0 ? 6 : 3), { ink: 'B', w: 0.6, taper: 'none', wob: 0.05 });
    R.text('eyepiece graticule', 225, 212, 4, { al: 'l' }); R.text('stage micrometer', 225, 226, 4, { al: 'l' });
  },
  anim(A, sc) {
    const p = A.ph(3);
    for (let i = 0; i < 5; i++) { const q = (p + i / 5) % 1; A.dot(54, 42 + q * 20, 1.2, 'Y', 1 - q); A.dot(160, 34 + q * 62, 1.3, 'B', 0.9); A.dot(266 + (q - 0.5) * 14, 34 + q * 52, 1.3, 'B', 0.9); }
  },
});

/* ---------- 3.2.1.3 Methods of studying cells (ii) cell fractionation ---------- */
S({
  id: '3.2.1.3b', num: '3.2.1.3', sub: 'Cell fractionation and ultracentrifugation', title: 'Methods of studying cells', topic: '3.2', slot: [3, 1], dna: 'mark',
  covers: ['3.2.1.3.s5', '3.2.1.3.s6'],
  card: {
    text: 'Cell fractionation separates organelles. Tissue is <b>homogenised</b> in a cold, isotonic, buffered solution (cold slows enzyme activity; isotonic prevents osmotic damage; buffer keeps pH constant), the homogenate is <b>filtered</b> to remove debris, then <b>ultracentrifuged</b> in stages at increasing speed. The densest organelles form a pellet first (nuclei), the supernatant is spun faster to pellet the next fraction (e.g. chloroplasts, mitochondria, lysosomes, endoplasmic reticulum, ribosomes).',
    terms: ['homogenise', 'isotonic', 'buffer', 'filter', 'ultracentrifuge', 'pellet', 'supernatant', 'fraction'],
    skill: 'Sequence reasoning', eq: null,
    q: 'Why is the homogenising solution cold, isotonic and buffered?', a: 'Cold: reduces enzyme (e.g. hydrolytic) activity that would damage organelles. Isotonic: no net osmosis so organelles do not burst or shrivel. Buffer: keeps pH constant so proteins/enzymes are not denatured.'
  },
  draw(R, sc) {
    // 1 homogenise
    R.text('1  homogenise', 50, 18, 5, { al: 'c' });
    R.beaker(20, 28, 60, 56, { level: 0.65, ink: 'T', t: 0.3 }); R.scatter(50, 62, 22, 14, 14, 1.3, { ink: 'P' });
    R.stroke([40, 18, 48, 40, 58, 22, 66, 44], { ink: 'B', w: 1.6, smooth: false, taper: 'both' });
    R.text('cold, isotonic,', 50, 98, 4.2, { al: 'c' }); R.text('buffered solution', 50, 104, 4.2, { al: 'c' });
    Icons.eye; R.text('filter debris', 50, 118, 4.4, { al: 'c' });
    R.line(96, 14, 96, 122, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 2 ultracentrifuge schematic
    R.text('2  ultracentrifuge', 205, 18, 5, { al: 'c' });
    R.circle(205, 70, 50, { ink: 'B', w: 1.4, fi: 'Y', ft: 0.14 });
    R.push(205, 70, rad(-30), 1); R.tube(-5, 6, 10, 38, { ink: 'T', t: 0.3, level: 0.8 }); R.pop(); R.push(205, 70, rad(150), 1); R.tube(-5, 6, 10, 38, { ink: 'T', t: 0.3, level: 0.8 }); R.pop();
    R.circle(205, 70, 6, { ink: 'B', w: 1.2, fi: 'P', ft: 0.7 }); R.arc(205, 70, 57, 57, -0.4, 1.0, { ink: 'B', w: 1, taper: 'end' });
    R.text('spin at increasing speed', 205, 124, 4.6, { al: 'c' });
    R.line(8, 130, 312, 130, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 3 successive pellets
    const stages = [
      { sp: 'low speed', pel: [['P', 0.9, 7, 'nuclei']], },
      { sp: 'faster', pel: [['PY', 0.8, 5, 'chloroplasts / mitochondria']] },
      { sp: 'faster still', pel: [['P', 0.5, 3.4, 'lysosomes']] },
      { sp: 'fastest', pel: [['T', 0.8, 2.2, 'ER, ribosomes']] },
    ];
    stages.forEach((st, i) => {
      const x = 28 + i * 74;
      R.text(st.sp, x + 4, 144, 4.2, { al: 'c' });
      R.tube(x, 150, 14, 62, { ink: 'T', t: 0.12, level: 0.85 });
      const [ink, t, r, name] = st.pel[0];
      for (let k = 0; k < 6; k++) R.circle(x - 3.5 + (k % 3) * 3.5, 205 - ((k / 3) | 0) * 3.6, r * 0.45, { ink: 'B', w: 0.5, fi: ink, ft: t });
      R.text(name.split(' / ')[0], x + 4, 224, 3.9, { al: 'c' }); if (name.includes(' / ')) R.text(name.split(' / ')[1], x + 4, 229.5, 3.9, { al: 'c' });
      if (i < 3) { R.arrow([x + 22, 176, x + 52, 176], { ink: 'B', w: 1, hs: 3 }); R.text('supernatant', x + 37, 171, 3.6, { al: 'c' }); }
    });
    R.text('densest organelles pellet first', 160, 242, 4.4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(1.6);
    for (let i = 0; i < 3; i++) { const a = p * TAU * 2 + i * 2.09; A.dot(205 + Math.cos(a) * 36, 70 + Math.sin(a) * 36, 1.8, 'P', 0.9); }
  },
});

/* ---------- 3.2.2 All cells arise from other cells (i) cell cycle & mitosis ---------- */
/* mini animal cell for mitosis stage s (0..5) centred (cx,cy) radius r; chromosomes: 2 pairs (long/short), maternal (P) paternal (T) */
function mitoCell(R, cx, cy, r, stage) {
  const ink = { B: 'B' };
  R.circle(cx, cy, r, { ink: 'B', w: 1.4, fi: 'Y', ft: 0.12, wob: 0.4 });
  const chrom = (x, y, ang, len, col, doubled) => { // X (two chromatids) or single rod
    R.push(x, y, rad(ang), 1);
    if (doubled) { R.stroke([-len / 2, -len * 0.42, 0, 0, len / 2, len * 0.42], { ink: col, w: 2.1, taper: 'none', wob: 0.15 }); R.stroke([-len / 2, len * 0.42, 0, 0, len / 2, -len * 0.42], { ink: col, w: 2.1, taper: 'none', wob: 0.15 }); R.dot(0, 0, 1.5, { ink: 'B' }); }
    else { R.stroke([-len / 2, 0, 0, 0, len / 2, 0], { ink: col, w: 2.1, taper: 'none', wob: 0.12 }); R.dot(0, 0, 1.2, { ink: 'B' }); }
    R.pop();
  };
  if (stage === 0) { // interphase: nucleus with diffuse chromatin, nucleolus
    R.circle(cx, cy, r * 0.58, { ink: 'B', w: 1, fi: 'P', ft: 0.14 }); R.circle(cx + r * 0.1, cy - r * 0.05, r * 0.14, { ink: 'B', w: 0.8, fi: 'P', ft: 0.9 });
    for (let k = 0; k < 5; k++) R.stroke([cx - r * 0.4 + k * 5, cy - r * 0.2, cx - r * 0.3 + k * 5, cy + r * 0.2, cx - r * 0.2 + k * 5, cy - r * 0.1], { ink: k % 2 ? 'P' : 'T', w: 0.7, smooth: true, wob: 0.2 });
    R.dot(cx - r * 0.1, cy + r * 0.62, 1.4, { ink: 'B' });
  } else if (stage === 1) { // prophase: condensed X chromosomes, nuclear envelope breaking, spindle forming
    R.poly(polyPts(cx, cy, r * 0.6, 10), { ink: 'B', w: 0.7, smooth: true, st: 0.6 });
    chrom(cx - r * 0.2, cy - r * 0.15, 25, r * 0.5, 'P', true); chrom(cx + r * 0.2, cy - r * 0.2, -60, r * 0.36, 'T', true); chrom(cx - r * 0.1, cy + r * 0.25, 70, r * 0.5, 'T', true); chrom(cx + r * 0.25, cy + r * 0.22, 10, r * 0.36, 'P', true);
    R.line(cx, cy - r * 0.95, cx - r * 0.45, cy - r * 0.45, { ink: 'B', w: 0.5, t: 0.8, taper: 'none' }); R.line(cx, cy + r * 0.95, cx + r * 0.4, cy + r * 0.5, { ink: 'B', w: 0.5, t: 0.8, taper: 'none' });
  } else if (stage === 2) { // metaphase: chromosomes on equator, spindle to centromeres
    R.line(cx, cy - r * 0.92, cx, cy - r * 0.55, { ink: 'B', w: 0.01, taper: 'none' });
    const xs = [-0.36, -0.12, 0.12, 0.36], cols = ['P', 'T', 'T', 'P'], lens = [0.5, 0.36, 0.36, 0.5];
    xs.forEach((u, i) => { chrom(cx + u * r * 1.05, cy, 90, r * lens[i] * 1.25, cols[i], true); R.line(cx + u * r * 1.05, cy, cx + (u * 0.3) * r, cy - r * 0.9, { ink: 'B', w: 0.45, t: 0.75, taper: 'none' }); R.line(cx + u * r * 1.05, cy, cx + (u * 0.3) * r, cy + r * 0.9, { ink: 'B', w: 0.45, t: 0.75, taper: 'none' }); });
    R.dot(cx, cy - r * 0.9, 1.3, { ink: 'B' }); R.dot(cx, cy + r * 0.9, 1.3, { ink: 'B' });
  } else if (stage === 3) { // anaphase: chromatids to poles
    [-1, 1].forEach(sg => { const yy = cy + sg * r * 0.5;
      [[-0.36, 'P', 0.5], [-0.12, 'T', 0.36], [0.12, 'T', 0.36], [0.36, 'P', 0.5]].forEach(([u, col, l], i) => { R.stroke([cx + u * r * 1.05, yy + sg * -r * l * 0.5, cx + u * r * 1.05, yy + sg * r * l * 0.35 * 0], { ink: col, w: 2.1, taper: 'none', wob: 0.12 }); R.line(cx + u * r * 1.05, yy - sg * r * 0.0, cx + u * 0.5 * r, cy + sg * r * 0.92, { ink: 'B', w: 0.45, t: 0.75, taper: 'none' }); });
    });
  } else if (stage === 4) { // telophase: two nuclei, cleavage
    R.stroke([cx - r * 0.95, cy - 1, cx - r * 0.2, cy + 2, cx, cy + 6], { ink: 'B', w: 1.2, taper: 'end', smooth: true }); R.stroke([cx + r * 0.95, cy - 1, cx + r * 0.2, cy + 2, cx, cy + 6], { ink: 'B', w: 1.2, taper: 'end', smooth: true });
    [-1, 1].forEach(sg => { R.circle(cx, cy + sg * r * 0.5, r * 0.3, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); for (let k = 0; k < 4; k++) R.stroke([cx - r * 0.18 + k * 4, cy + sg * r * 0.5 - 3, cx - r * 0.1 + k * 4, cy + sg * r * 0.5 + 3], { ink: k % 2 ? 'P' : 'T', w: 1.1, wob: 0.15, taper: 'none' }); });
  } else { // two daughter cells
    R.circle(cx, cy, r, { ink: 'Y', t: 0.0, w: 0 });
  }
}
S({
  id: '3.2.2a', num: '3.2.2', sub: 'The cell cycle and the stages of mitosis', title: 'All cells arise from other cells', topic: '3.2', slot: [0, 2], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.2.2.s1', '3.2.2.s2', '3.2.2.s3', '3.2.2.s4', '3.2.2.s5', '3.2.2.s6', '3.2.2.s7'],
  card: {
    text: 'Within multicellular organisms not all cells retain the ability to divide. Those that do show a <b>cell cycle</b>: DNA replicates during <b>interphase</b>; <b>mitosis</b> produces two daughter cells each with identical copies of the DNA. Chromosomes behave as follows. <b>Prophase</b>: chromosomes condense (two sister chromatids joined at a centromere). <b>Metaphase</b>: chromosomes line up at the equator, spindle fibres attached to the centromeres. <b>Anaphase</b>: the spindle shortens and separates the chromatids to opposite poles. <b>Telophase</b>: nuclear envelopes reform and chromosomes decondense. Cytokinesis (division of the cytoplasm) usually follows. Mitosis is controlled; uncontrolled division can form tumours and cancers, and many cancer treatments target the rate of cell division. Meiosis is in 3.4.3.',
    terms: ['cell cycle', 'interphase', 'mitosis', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis', 'chromatid', 'centromere', 'spindle fibre', 'tumour'],
    skill: 'Recognising stages', eq: null,
    q: 'Describe what happens to the chromosomes in anaphase and why.', a: 'Spindle fibres attached to the centromeres shorten and pull the sister chromatids (now separate chromosomes) to opposite poles, so each pole receives an identical set.'
  },
  draw(R, sc) {
    // cell cycle ring
    R.text('cell cycle', 80, 18, 6.2, { al: 'c' });
    const cx = 80, cy = 100, ro = 54, ri = 34;
    const seg = (a0, a1, ink, t) => { const p = []; for (let i = 0; i <= 18; i++) { const a = a0 + (a1 - a0) * i / 18; p.push(cx + Math.cos(a) * ro, cy + Math.sin(a) * ro); } for (let i = 18; i >= 0; i--) { const a = a0 + (a1 - a0) * i / 18; p.push(cx + Math.cos(a) * ri, cy + Math.sin(a) * ri); } R.fill(p, { ink, t, wob: 0.15 }); R.poly(p, { ink: 'B', w: 1, wob: 0.15 }); };
    seg(-PI / 2, -PI / 2 + TAU * 0.24, 'T', 0.4);      // G1 (24 %)
    seg(-PI / 2 + TAU * 0.24, -PI / 2 + TAU * 0.56, 'Y', 0.7); // S 
    seg(-PI / 2 + TAU * 0.56, -PI / 2 + TAU * 0.86, 'T', 0.25); // G2
    seg(-PI / 2 + TAU * 0.86, -PI / 2 + TAU, 'P', 0.7);   // mitosis
    R.text('DNA replicates', 80, 124, 4.2, { al: 'c' }); R.text('in interphase', 80, 130, 4.2, { al: 'c' });
    [['T', 0.4, 'G1  growth'], ['Y', 0.7, 'S  DNA replication'], ['T', 0.25, 'G2  growth, checks'], ['P', 0.7, 'M  mitosis']].forEach(([c, t, l], i) => { R.rect(14, 176 + i * 13, 9, 8, { ink: 'B', w: 0.8, fi: c, ft: t }); R.text(l, 28, 183 + i * 13, 4.8, { al: 'l' }); });
    R.text('mitosis', 98, 36, 4.8, { al: 'l' });
    R.helix(cx - 14, cy - 8, cx + 14, cy - 8, { amp: 3.6, turns: 2, w: 0.7 });
    R.line(150, 14, 150, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // stages
    const names = ['interphase', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis'];
    names.forEach((n, i) => {
      const x = 192 + i * 80, y = 92;
      if (i < 5) mitoCell(R, x, y, 32, i);
      else { R.circle(x - 16, y, 22, { ink: 'B', w: 1.4, fi: 'Y', ft: 0.12 }); R.circle(x + 16, y, 22, { ink: 'B', w: 1.4, fi: 'Y', ft: 0.12 }); [-16, 16].forEach(dx => { R.circle(x + dx, y, 9, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); for (let k = 0; k < 3; k++) R.stroke([x + dx - 4 + k * 3.5, y - 3, x + dx - 2 + k * 3.5, y + 3], { ink: k % 2 ? 'P' : 'T', w: 1, wob: 0.1, taper: 'none' }); }); }
      R.text(n, x, y + 48, 5, { al: 'c' });
      if (i < 5) R.arrow([x + 34, y, x + 46, y], { ink: 'B', w: 0.9, hs: 3 });
    });
    R.line(156, 160, 660, 160, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // outcomes
    R.text('chromosome behaviour', 270, 174, 5.2, { al: 'c' });
    R.text('condense: 2 sister chromatids joined at a centromere', 160, 188, 4.4, { al: 'l' });
    R.text('line up on the equator; spindle fibres attach to centromeres', 160, 198, 4.4, { al: 'l' });
    R.text('spindle shortens: chromatids pulled to opposite poles', 160, 208, 4.4, { al: 'l' });
    R.text('nuclear envelopes reform; chromosomes decondense', 160, 218, 4.4, { al: 'l' });
    R.line(436, 166, 436, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('2 genetically identical', 556, 186, 5.2, { al: 'c' }); R.text('diploid daughter cells', 556, 194, 5.2, { al: 'c' });
    R.circle(520, 216, 11, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.12 }); R.circle(520, 216, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.3 }); R.circle(592, 216, 11, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.12 }); R.circle(592, 216, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.3 });
    R.text('=', 556, 220, 8, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(8), ang = -PI / 2 + p * TAU;
    A.dot(80 + Math.cos(ang) * 44, 100 + Math.sin(ang) * 44, 3.2, 'B', 1);
    // anaphase: chromatids move apart
    const q = A.ph(3.4), d = 6 + q * 14; for (const u of [-0.36, -0.12, 0.12, 0.36]) { A.dot(192 + 3 * 80 + u * 33.6, 92 - d, 1.2, 'B', 0.8); A.dot(192 + 3 * 80 + u * 33.6, 92 + d, 1.2, 'B', 0.8); }
  },
});

/* ---------- 3.2.2 (ii) binary fission, viral replication, cancer ---------- */
S({
  id: '3.2.2b', num: '3.2.2', sub: 'Binary fission, virus replication and uncontrolled division', title: 'All cells arise from other cells', topic: '3.2', slot: [2, 2], dna: 'bio',
  covers: ['3.2.2.s8', '3.2.2.s9', '3.2.2.s10'],
  card: {
    text: '<b>Binary fission</b> in prokaryotic cells involves replication of the circular DNA and of the plasmids, then division of the cytoplasm to produce two daughter cells, each with a single copy of the circular DNA and a variable number of plasmid copies. Being non-living, <b>viruses</b> do not undergo cell division: after injection of its nucleic acid, the infected host cell replicates the virus particles. <b>Uncontrolled</b> mitosis forms a tumour; many cancer treatments are directed at controlling the rate of cell division.',
    terms: ['binary fission', 'plasmid', 'circular DNA', 'virus replication', 'host cell', 'tumour', 'cancer'],
    skill: 'Doubling population', eq: null,
    q: 'Why is a virus said not to undergo cell division?', a: 'It is non-living and acellular; it injects its nucleic acid and the host cell’s machinery makes new virus particles.'
  },
  draw(R, sc) {
    // binary fission (top strip)
    R.text('binary fission', 160, 15, 5.4, { al: 'c' });
    const cellB = (x, y, w, h) => R.rrect(x - w / 2, y - h / 2, w, h, h / 2, { ink: 'B', w: 1.4, fi: 'P', ft: 0.12 });
    const loop = (x, y, r) => { R.circle(x, y, r, { ink: 'T', w: 1.2, t: 0.7 }); R.circle(x, y, r, { ink: 'B', w: 0.9 }); };
    const plas = (x, y) => R.circle(x, y, 2.3, { ink: 'B', w: 0.9 });
    cellB(44, 46, 52, 26); loop(34, 46, 8); plas(55, 41); plas(56, 51);
    R.arrow([76, 46, 100, 46], { ink: 'B', w: 1, hs: 3 });
    cellB(148, 46, 76, 26); loop(130, 46, 8); loop(166, 46, 8); plas(144, 40); plas(148, 52); plas(158, 40); plas(156, 53);
    R.arrow([194, 46, 214, 46], { ink: 'B', w: 1, hs: 3 });
    cellB(240, 46, 42, 26); loop(232, 46, 8); plas(250, 46);
    cellB(288, 46, 42, 26); loop(298, 46, 8); plas(276, 41); plas(278, 52); plas(289, 36);
    R.text('1 circular DNA', 44, 70, 4, { al: 'c' }); R.text('and plasmids', 44, 75.5, 4, { al: 'c' });
    R.text('2 DNA and plasmids', 148, 70, 4, { al: 'c' }); R.text('replicate', 148, 75.5, 4, { al: 'c' });
    R.text('3 cytoplasm divides', 264, 70, 4, { al: 'c' }); R.text('each: 1 copy of DNA,', 264, 75.5, 4, { al: 'c' }); R.text('variable plasmids', 264, 81, 4, { al: 'c' });
    loop(24, 94, 4); R.text('circular DNA', 31, 95.4, 3.8, { al: 'l' }); plas(86, 94); R.text('plasmid', 90, 95.4, 3.8, { al: 'l' });
    R.line(8, 104, 312, 104, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // virus replication
    R.text('virus replication in a host cell', 160, 116, 5.4, { al: 'c' });
    R.circle(120, 170, 40, { ink: 'B', w: 1.6, fi: 'Y', ft: 0.12 }); R.circle(120, 170, 14, { ink: 'B', w: 1, fi: 'P', ft: 0.25 });
    R.polyline = null;
    R.poly(polyPts(48, 170, 10, 6, PI / 6), { ink: 'B', w: 1.3, fi: 'P', ft: 0.35 }); R.line(58, 170, 80, 170, { ink: 'B', w: 1.2, taper: 'none' });
    R.stroke([84, 170, 96, 164, 108, 176], { ink: 'T', w: 1.8, smooth: true, taper: 'none' });
    R.text('1 attach, inject', 52, 198, 4, { al: 'c' });
    for (let i = 0; i < 4; i++) { const a = i * 1.7; R.poly(polyPts(104 + Math.cos(a) * 20, 176 + Math.sin(a) * 16, 4.6, 6, PI / 6), { ink: 'B', w: 0.9, fi: 'P', ft: 0.4 }); }
    R.text('2 host cell makes copies', 120, 220, 4, { al: 'c' });
    R.arrow([164, 170, 194, 170], { ink: 'B', w: 1, hs: 3 });
    R.text('3 released', 218, 124, 4, { al: 'c' });
    [[212, 150], [236, 160], [220, 182], [248, 186], [200, 210], [240, 214]].forEach(([x, y]) => R.poly(polyPts(x, y, 5, 6, PI / 6), { ink: 'B', w: 0.9, fi: 'P', ft: 0.4 }));
    R.line(262, 108, 262, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // tumour
    R.text('uncontrolled', 292, 116, 4.6, { al: 'c' }); R.text('division', 292, 123, 4.6, { al: 'c' });
    const tum = [[290, 160, 12], [274, 172, 9], [304, 178, 10], [288, 190, 9], [272, 192, 7], [304, 200, 8], [292, 210, 7]];
    tum.forEach(([x, y, r], i) => { R.circle(x, y, r, { ink: 'B', w: 1.1, fi: 'P', ft: 0.25 + (i % 3) * 0.1 }); R.circle(x + 1, y, r * 0.38, { ink: 'B', w: 0.7, fi: 'P', ft: 0.7 }); });
    R.text('tumour', 292, 230, 4.6, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(5);
    // virus approaches, injects, copies appear
    A.line(58 + 0 * p, 170, 58 + 22 * Math.min(1, p * 2), 170, 'B', 1.1, 0.9);
    for (let i = 0; i < 4; i++) { const t = Math.max(0, p - 0.5) * 2; A.dot(104 + Math.cos(i * 1.7) * 20, 176 + Math.sin(i * 1.7) * 16, 3.4 * t, 'P', 0.8 * t); }
    const q = A.ph(6); A.ring(264, 46, 3 + q * 8, 'T', 0.8, 1 - q);
  },
});

/* ---------- RP2: root-tip squash and mitotic index ---------- */
rpScene({
  id: 'RP2', num: '3.2.2', rp: 2, title: 'All cells arise from other cells', sub: 'Required practical 2: stained root-tip squash, microscope, mitotic index', topic: '3.2', slot: [3, 2],
  covers: ['RP2'], at: ['d', 'e', 'f'], ms: ['MS 0.3', 'MS 1.8', 'MS 1.3'], ps: ['PS 2.4'],
  card: {
    text: 'Prepare a stained squash of plant root tips, set up and use an optical microscope to identify the stages of mitosis, and calculate a <b>mitotic index</b>. The AQA handbook’s example method: soak the root tip in hot dilute hydrochloric acid to separate the cells, stain the chromosomes (toluidine blue), then squash firmly under a cover slip so the cells form a single layer. Count cells in each stage and the total, then calculate the mitotic index. Measure the apparent size of cells and calculate actual size from the magnification. Schools may use other plant material, stains and methods.',
    terms: ['squash', 'meristem', 'stain', 'mitotic index', 'optical microscope', 'graticule', 'magnification'],
    skill: 'Mitotic index', eq: MATH(mt('mitotic index '), mo('='), mfrac(mt('cells in mitosis'), mt('total cells observed'))),
    eqn: 'Actual size = size of image ÷ magnification (MS 1.8)',
    q: 'Why is the root tip squashed, and why is acid used?', a: 'The acid breaks the links between cells (and fixes/softens tissue); squashing spreads the cells into a thin single layer so light passes through and chromosomes are visible.'
  },
  apparatus(R, b) {
    R.text('root tip → acid → stain → squash → view', 92, 21, 4.6, { al: 'c' });
    // onion root tip
    R.stroke([22, 36, 24, 62, 20, 84, 24, 104], { ink: 'B', w: 1.6, smooth: true, taper: 'end' }); R.fill([20, 90, 28, 90, 26, 108, 22, 108], { ink: 'Y', t: 0.5, wob: 0.1 });
    R.line(18, 62, 30, 62, { ink: 'P', w: 0.8, taper: 'none' }); R.text('cut', 34, 63, 3.8, { al: 'l' }); R.text('1 mm', 34, 68.5, 3.8, { al: 'l' });
    R.beaker(52, 52, 26, 38, { level: 0.6, ink: 'P', t: 0.15 }); R.text('HCl', 65, 100, 4, { al: 'c' }); Icons.hot(R, 65, 112, 4.2);
    // slide, stain, squash
    R.rect(80, 74, 40, 12, { ink: 'B', w: 1, fi: 'T', ft: 0.2 }); R.circle(100, 80, 5, { ink: 'B', w: 0.9, fi: 'B', ft: 0.7 }); R.rect(92, 70, 16, 12, { ink: 'B', w: 0.8, wob: 0.1 });
    R.arrow([100, 54, 100, 66], { ink: 'B', w: 1.2, hs: 3 }); R.text('press', 106, 58, 4, { al: 'l' }); R.text('stain + squash', 100, 98, 4, { al: 'c' });
    // microscope field of view
    R.circle(150, 70, 24, { ink: 'B', w: 1.4, fi: 'T', ft: 0.12 });
    const cells = [[-11, -13, 0], [4, -15, 1], [-15, 0, 0], [0, 0, 2], [13, -6, 0], [-8, 13, 3], [10, 13, 0], [16, 7, 0], [-2, 8, 0], [-14, -8, 4]];
    cells.forEach(([dx, dy, st], i) => { R.rect(150 + dx - 5, 70 + dy - 4.4, 10, 8.8, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.15, wob: 0.08 }); if (st === 0) R.dot(150 + dx, 70 + dy, 1.7, { ink: 'B', t: 0.9 }); else R.line(150 + dx - 2.4, 70 + dy, 150 + dx + 2.4, 70 + dy, { ink: 'B', w: 1.5, taper: 'none' }); });
    R.text('field of view', 150, 104, 4, { al: 'c' }); R.text('count stages', 150, 110, 4, { al: 'c' });
    R.text('all cells small and square: meristem', 92, 126, 3.8, { al: 'c' });
  },
  results(R, b) {
    const g = R.graph(b.x + 16, b.y + 6, 98, 70, { xmin: 0, xmax: 5, ymin: 0, ymax: 40, xl: 'stage', yl: 'cells counted', xt: [], yt: [0, 20, 40], fs: 3.9, xly: 15, ylx: 14, paper: 7 }).axes();
    const names = ['I', 'P', 'M', 'A', 'T'], v = [36, 14, 5, 3, 6];
    v.forEach((h, i) => { const x = g.X(i + 0.18), y = g.Y(h); R.fill([x, y, g.X(i + 0.82), y, g.X(i + 0.82), g.Y(0), x, g.Y(0)], { ink: i === 0 ? 'T' : 'P', t: i === 0 ? 0.5 : 0.8, wob: 0.15 }); R.rect(x, y, g.X(i + 0.82) - x, g.Y(0) - y, { ink: 'B', w: 0.8, wob: 0.12 }); R.text(names[i], (x + g.X(i + 0.82)) / 2, g.Y(0) + 7, 4.2, { al: 'c' }); });
    R.text('interphase, prophase, metaphase,', b.x + 64, b.y + 96, 3.6, { al: 'c' }); R.text('anaphase, telophase', b.x + 64, b.y + 101, 3.6, { al: 'c' });
  },
  vars: { iv: 'region of root tip (meristem)', dv: 'number of cells in each stage', ctl: ['acid time and temperature', 'stain, squash pressure', 'magnification used'] },
  calc: ['mitotic index', '= cells in mitosis ÷ total', '= (14+5+3+6) ÷ 64', '= 28 ÷ 64 = 0.44', 'actual size = image ÷ M'],
  risks: [['corrosive', 'hot acid: corrosive'], ['goggles', 'eye protection'], ['warn', 'sharp blade']],
  limits: ['stage seen is a snapshot of a dynamic process', 'count many fields, repeat', 'squashing can distort cells'],
  interp: 'a higher mitotic index = a larger proportion of cells dividing',
  anim(A, sc) {
    const p = A.ph(4); A.dot(100, 56 + p * 12, 1.6, 'B', 1 - p * 0.3);
    const f = A.ph(3); for (let i = 0; i < 3; i++) A.dot(150 + Math.cos(f * TAU + i * 2.1) * 13, 70 + Math.sin(f * TAU + i * 2.1) * 10, 0.9, 'P', 0.5);
  },
});
