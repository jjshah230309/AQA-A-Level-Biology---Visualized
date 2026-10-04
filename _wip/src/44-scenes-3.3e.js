/* ===================== 3.3.4.1 (cont.) blood vessels, tissue fluid, CVD, RP5 ===================== */
/* cross-section of a vessel: lumen r0, wall layers (endothelium, elastic tissue, smooth muscle, collagen) */
function vesselXS(R, x, y, r0, wall, o = {}) {
  const outer = r0 + wall;
  R.circle(x, y, outer, { ink: 'B', w: 1.3, fi: 'P', ft: 0.12, wob: 0.3 });
  if (o.muscle) R.circle(x, y, r0 + wall * 0.62, { ink: 'B', w: 0.5, fi: 'P', ft: o.muscle, wob: 0.2 });
  if (o.elastic) { R.circle(x, y, r0 + wall * 0.3, { ink: 'B', w: 0.9, wob: 0.3 }); R.circle(x, y, r0 + wall * 0.5, { ink: 'B', w: 0.9, wob: 0.3 }); }
  R.circle(x, y, r0, { ink: 'B', w: 1, fi: o.ox === false ? 'B' : 'P', ft: o.ox === false ? 0.3 : 0.5, wob: 0.2 });
  if (o.ox !== false) R.circle(x, y, r0, { ink: 'Y', w: 0, fi: 'Y', ft: 0.45 });
  R.circle(x, y, r0 + 0.8, { ink: 'B', w: 0.8, wob: 0.15 });
}

/* ---------- 3.3.4.1g Structure of arteries, arterioles and veins ---------- */
S({
  id: '3.3.4.1g', num: '3.3.4.1', sub: 'Structure of arteries, arterioles and veins in relation to function', title: 'Mass transport in animals', topic: '3.3', slot: [0, 6], span: [2, 1], dna: 'mark', ao: 1,
  covers: ['3.3.4.1.s11'],
  card: {
    text: '<b>Arteries</b> carry blood away from the heart at high pressure: thick walls with <b>elastic tissue</b> to stretch and recoil (smoothing the pulse), <b>smooth muscle</b>, a narrow lumen and folded endothelium. <b>Arterioles</b> branch from arteries, with more smooth muscle that contracts or relaxes to control blood flow into capillaries. <b>Veins</b> carry blood back to the heart at low pressure: thinner walls with little elastic tissue and muscle, a wide lumen, and <b>valves</b> that prevent backflow; contraction of nearby skeletal muscles squeezes blood along them.',
    terms: ['artery', 'arteriole', 'vein', 'elastic tissue', 'smooth muscle', 'endothelium', 'lumen', 'valve', 'collagen'],
    skill: 'MS 1.8: magnification of a section', eq: null,
    q: 'Why do arteries have more elastic tissue than veins?', a: 'Blood leaves the heart in pulses at high pressure; the elastic wall stretches then recoils, maintaining pressure and smoothing blood flow. Veins carry blood at low pressure.'
  },
  draw(R, sc) {
    R.text('arteries, arterioles and veins (cross-sections)', 332, 14, 5, { al: 'c' });
    const cx = [100, 332, 560];
    vesselXS(R, cx[0], 82, 14, 20, { muscle: 0.5, elastic: true }); vesselXS(R, cx[1], 82, 8, 11, { muscle: 0.65 }); vesselXS(R, cx[2], 82, 24, 7, { muscle: 0.3, ox: false });
    [['artery', cx[0]], ['arteriole', cx[1]], ['vein', cx[2]]].forEach(([t, x]) => R.text(t, x, 28, 5.2, { al: 'c' }));
    // labels
    const lab = (t, tx, ty, x, y, al = 'l') => leader(R, t, x, y, tx, ty, { size: 4, al });
    lab('thick wall', 20, 128, cx[0] - 26, 96, 'l'); lab('elastic tissue', 150, 128, cx[0] + 12, 94, 'l'); lab('smooth muscle', 150, 40, cx[0] + 12, 64, 'l'); lab('narrow lumen', 12, 40, cx[0] - 4, 76, 'l');
    lab('endothelium', 262, 128, cx[1] - 4, 79, 'l'); lab('more smooth muscle', 380, 46, cx[1] + 11, 72, 'l');
    lab('thin wall', 440, 128, cx[2] - 28, 95, 'l'); lab('wide lumen', 600, 128, cx[2] + 4, 84, 'l'); lab('little muscle and elastic tissue', 600, 40, cx[2] + 24, 62, 'r');
    // function strips
    R.line(8, 138, 656, 138, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    const txt = (x, lines, ink) => lines.forEach((t, i) => R.text(t, x, 150 + i * 6.8, 4, { al: 'c', ink: i === 0 ? ink || 'P' : 'B' }));
    txt(cx[0], ['away from the heart, high pressure', 'elastic wall stretches and recoils:', 'smooths the pulse of blood', 'muscle: strength']);
    txt(cx[1], ['to capillary beds', 'smooth muscle contracts or relaxes:', 'controls how much blood', 'flows into capillaries']);
    txt(cx[2], ['towards the heart, low pressure', 'valves prevent backflow', 'skeletal muscles squeeze veins', 'to move blood along']);
    // longitudinal sections: pulse and valve
    R.rect(40, 188, 120, 28, { ink: 'B', w: 1.2, fi: 'P', ft: 0.2, wob: 0.3 }); R.rect(40, 194, 120, 16, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.4 });
    R.arrow([54, 202, 150, 202], { ink: 'P', w: 1.1, hs: 2.6 }); R.text('pulse (stretches then recoils)', 100, 226, 3.8, { al: 'c' });
    R.rect(272, 188, 120, 28, { ink: 'B', w: 1.2, fi: 'P', ft: 0.2, wob: 0.3 }); R.rect(272, 194, 120, 16, { ink: 'B', w: 0.8, fi: 'P', ft: 0.4 });
    R.arrow([286, 202, 380, 202], { ink: 'P', w: 1.1, hs: 2.6 }); R.text('blood flows through', 332, 226, 3.8, { al: 'c' });
    R.rect(500, 188, 120, 28, { ink: 'B', w: 1.2, fi: 'P', ft: 0.12, wob: 0.3 }); R.rect(500, 194, 120, 16, { ink: 'B', w: 0.8, fi: 'B', ft: 0.3 });
    R.stroke([560, 194, 572, 202, 560, 210], { ink: 'B', w: 1.4, smooth: false, taper: 'none' }); R.stroke([576, 194, 564, 202, 576, 210], { ink: 'B', w: 0.01, smooth: false, taper: 'none' });
    R.poly([556, 194, 572, 194, 564, 204], { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); R.poly([556, 210, 572, 210, 564, 200], { ink: 'B', w: 1, fi: 'P', ft: 0.7 });
    R.arrow([514, 202, 552, 202], { ink: 'P', w: 1.1, hs: 2.6 }); R.arrow([578, 202, 608, 202], { ink: 'P', w: 1.1, hs: 2.6 }); R.text('valve (pocket) in a vein', 560, 226, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(3); for (let i = 0; i < 4; i++) { const u = (p + i / 4) % 1; A.rbc(54 + u * 96, 202, 3.4 + Math.sin(u * PI) * 0.4, i, 0.9); A.rbc(286 + u * 94, 202, 3, 10 + i, 0.9); A.rbc(514 + u * 94, 202, 3, 20 + i, 0.75); } },
});

/* ---------- 3.3.4.1h Capillaries and tissue fluid ---------- */
S({
  id: '3.3.4.1h', num: '3.3.4.1', sub: 'Capillaries as exchange surfaces; formation and return of tissue fluid', title: 'Mass transport in animals', topic: '3.3', slot: [2, 6], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.3.4.1.s12', '3.3.4.1.s13'],
  card: {
    text: '<b>Capillaries</b> are one cell thick (short diffusion distance), narrow so red blood cells squeeze through slowly, and form dense <b>capillary beds</b> with a very large surface area for exchange. At the arterial end the <b>hydrostatic pressure</b> of blood is high and forces fluid out through gaps in the walls: <b>tissue fluid</b> (plasma without most proteins and no red cells) bathes the cells. As fluid leaves, hydrostatic pressure falls; at the venous end the <b>water potential</b> of the blood is lower than the tissue fluid (plasma proteins remain) so water re-enters by osmosis. Excess tissue fluid drains into <b>lymph vessels</b> and returns to the blood.',
    terms: ['capillary', 'capillary bed', 'tissue fluid', 'hydrostatic pressure', 'water potential', 'plasma proteins', 'lymph', 'arterial end', 'venous end'],
    skill: 'Interpret pressure and ψ data', eq: null,
    q: 'Why does tissue fluid re-enter the capillary at the venous end?', a: 'Hydrostatic pressure has fallen and the plasma proteins (which stay in the blood) give the blood a lower water potential than the tissue fluid, so water enters by osmosis.'
  },
  draw(R, sc) {
    R.text('capillary bed and tissue fluid', 332, 14, 5, { al: 'c' });
    // arteriole -> capillary -> venule (horizontal)
    const y0 = 80;
    R.fill([20, y0 - 22, 640, y0 - 22, 640, y0 + 22, 20, y0 + 22], { ink: 'Y', t: 0.08, wob: 0.3 });
    const cap = [24, y0, 100, y0, 150, y0 - 4, 200, y0 + 2, 250, y0 - 3, 300, y0 + 3, 350, y0 - 2, 400, y0 + 2, 450, y0 - 3, 500, y0, 640, y0];
    R.stroke(cap, { ink: 'P', w: 18, t: 0.3, smooth: true, taper: 'none', solid: false }); R.stroke(cap.map((v, i) => i % 2 ? v - 9 : v), { ink: 'B', w: 1.3, smooth: true, taper: 'none' }); R.stroke(cap.map((v, i) => i % 2 ? v + 9 : v), { ink: 'B', w: 1.3, smooth: true, taper: 'none' });
    for (let i = 0; i < 6; i++) R.ellipse(150 + i * 58, y0 - 1 + (i % 2 ? 3 : -3), 8, 4.4, { ink: 'B', w: 0.9, fi: 'P', ft: 0.9, rot: i * 7 });
    R.text('arteriole', 60, y0 - 30, 4.4, { al: 'c' }); R.text('capillary bed: one cell thick', 330, y0 - 34, 4.4, { al: 'c' }); R.text('venule', 600, y0 - 30, 4.4, { al: 'c' });
    // fluid out / in arrows
    [[170, -1], [220, -1], [270, -1]].forEach(([x, d]) => { R.arrow([x, y0 - 12, x, y0 - 30], { ink: 'T', w: 1.2, hs: 3 }); R.arrow([x + 14, y0 + 12, x + 14, y0 + 30], { ink: 'T', w: 1.2, hs: 3 }); });
    [[420, 1], [470, 1], [520, 1]].forEach(([x, d]) => { R.arrow([x, y0 - 30, x, y0 - 12], { ink: 'T', w: 1.0, hs: 2.6 }); R.arrow([x + 14, y0 + 30, x + 14, y0 + 12], { ink: 'T', w: 1.0, hs: 2.6 }); });
    R.text('high hydrostatic pressure forces fluid out', 220, y0 + 44, 4.2, { al: 'c' }); R.text('plasma proteins stay in: lower ψ draws water back', 468, y0 + 44, 4.2, { al: 'c' });
    R.text('arterial end', 190, y0 - 48, 4.6, { al: 'c', ink: 'P' }); R.text('venous end', 470, y0 - 48, 4.6, { al: 'c', ink: 'P' });
    // pressure bars
    R.line(8, 138, 656, 138, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('forces compared (relative size)', 120, 150, 4.4, { al: 'c' });
    const bars = (x, hyd, osm, lab) => { R.text(lab, x + 38, 162, 4.4, { al: 'c' }); R.rect(x, 170, 30, 56 * hyd, { ink: 'B', w: 1, fi: 'P', ft: 0.6, wob: 0.15 }); R.rect(x + 40, 170, 30, 56 * osm, { ink: 'B', w: 1, fi: 'T', ft: 0.6, wob: 0.15 }); R.text('hydrostatic', x + 15, 234, 3.4, { al: 'c' }); R.text('osmotic', x + 55, 234, 3.4, { al: 'c' }); };
    bars(40, 0.95, 0.5, 'arterial end'); bars(170, 0.35, 0.5, 'venous end');
    R.text('net movement OUT', 75, 164, 0.01, { al: 'c' });
    R.text('hydrostatic > osmotic: fluid out', 108, 248 - 0, 0.01, { al: 'c' });
    // lymph + fate
    R.line(300, 142, 300, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    const cells = [[336, 184], [376, 196], [416, 182]]; cells.forEach(([x, y]) => { R.circle(x, y, 13, { ink: 'B', w: 1, fi: 'P', ft: 0.15, wob: 0.3 }); R.circle(x + 2, y, 5, { ink: 'B', w: 0.7, fi: 'B', ft: 0.35 }); });
    R.fill([320, 166, 440, 166, 440, 220, 320, 220], { ink: 'T', t: 0.07, wob: 0.2 }); R.text('tissue fluid bathes the cells', 380, 232, 4.2, { al: 'c' });
    R.text('delivers oxygen and glucose,', 380, 154, 3.9, { al: 'c' }); R.text('takes away CO_2 and waste', 380, 160, 3.9, { al: 'c' });
    R.stroke([456, 190, 480, 180, 508, 190, 534, 180, 560, 190, 590, 184], { ink: 'T', w: 6, t: 0.4, smooth: true, taper: 'none', solid: false }); R.stroke([456, 190, 480, 180, 508, 190, 534, 180, 560, 190, 590, 184], { ink: 'B', w: 1, smooth: true, taper: 'none' });
    R.arrow([446, 200, 466, 192], { ink: 'T', w: 1, hs: 2.4 }); R.text('lymph vessel: excess', 530, 208, 4, { al: 'c' }); R.text('tissue fluid returns to the blood', 530, 214.5, 4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); for (let i = 0; i < 5; i++) { const u = (p + i / 5) % 1; A.rbc(24 + u * 612, 80 + Math.sin(u * 14 + i) * 2, 3.8, i, 0.9); } A.dot(190, 66 - (p * 18) % 18, 1.3, 'T', 0.8, 9); A.dot(470, 48 + (p * 18) % 18, 1.3, 'T', 0.8, 10); },
});

/* ---------- 3.3.4.1i Cardiovascular disease: risk factors, data and evidence ---------- */
S({
  id: '3.3.4.1i', num: '3.3.4.1', sub: 'Cardiovascular disease: risk-factor data, conflicting evidence, correlation and causation', title: 'Mass transport in animals', topic: '3.3', slot: [0, 7], dna: 'mark', ao: 3,
  covers: ['3.3.4.1.s14', '3.3.4.1.s15', '3.3.4.1.s16'],
  card: {
    text: 'Cardiovascular disease (CVD) is linked to risk factors such as high blood pressure, high blood cholesterol, smoking, a diet high in saturated fat or salt, and inactivity. In <b>atheroma</b>, fatty deposits form under the lining of an artery, narrowing the lumen and raising blood pressure; a blood clot (<b>thrombosis</b>) can block a coronary artery, causing a heart attack. Students must <b>analyse and interpret data</b> on risk factors and CVD, <b>evaluate conflicting evidence</b> (sample size, controls, confounders, error bars) and recognise <b>correlations</b> versus <b>causal relationships</b>.',
    terms: ['cardiovascular disease', 'risk factor', 'atheroma', 'blood pressure', 'cholesterol', 'thrombosis', 'correlation', 'causation', 'conflicting evidence'],
    skill: 'MS 1.7, 1.10: scatter diagrams, dispersion', eq: null,
    q: 'Two studies of salt intake and blood pressure disagree. Give two features you would check to evaluate them.', a: 'Sample size and how participants were chosen, control of confounding variables (age, exercise, other diet), and the spread of the data (error bars / standard deviation overlap).'
  },
  draw(R, sc) {
    R.text('CVD: risk data and evidence', 160, 14, 5, { al: 'c' });
    // atheroma in artery section
    R.text('atheroma narrows an artery', 72, 28, 4.4, { al: 'c' });
    const art = (x, narrowing) => { R.rrect(x, 36, 120, 34, 6, { ink: 'B', w: 1.2, fi: 'P', ft: 0.14, wob: 0.3 }); R.rect(x + 2, 40, 116, 26, { ink: 'B', w: 0.7, fi: 'P', ft: 0.35 }); if (narrowing) { R.poly([x + 30, 40, x + 46, 48, x + 70, 51, x + 90, 47, x + 100, 40], { ink: 'B', w: 0.9, fi: 'Y', ft: 0.7, smooth: true }); R.poly([x + 36, 66, x + 50, 58, x + 70, 56, x + 88, 59, x + 96, 66], { ink: 'B', w: 0.9, fi: 'Y', ft: 0.7, smooth: true }); } };
    art(12, true); R.text('fatty deposit (plaque)', 72, 84, 4, { al: 'c' }); leader(R, 'narrowed lumen', 72, 53, 72, 98, { size: 4, al: 'c' });
    R.line(144, 30, 144, 100, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.circle(176, 52, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.9 }); R.circle(196, 58, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.9 }); R.stroke([166, 46, 186, 54, 206, 50, 226, 60], { ink: 'P', w: 1, taper: 'none' });
    R.text('blood clot (thrombosis)', 212, 84, 3.9, { al: 'c' }); R.text('blocks coronary artery', 212, 90, 3.9, { al: 'c' });
    R.line(8, 106, 312, 106, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // scatter: risk factor vs CVD (correlation)
    R.text('data: cholesterol and deaths from CHD', 80, 116, 4, { al: 'c' });
    const g = R.graph(32, 124, 108, 66, { xmin: 3, xmax: 8, ymin: 0, ymax: 10, xl: 'blood cholesterol / mmol dm^-3', yl: 'CHD deaths', xt: [[4, '4'], [6, '6'], [8, '8']], yt: [], fs: 3.6, xly: 12, ylx: 4 }).axes();
    [[3.6, 1.4], [4.2, 2.6], [4.6, 2.2], [5.0, 3.4], [5.4, 3.8], [5.6, 5.4], [6.0, 5.0], [6.4, 6.4], [6.8, 6.2], [7.2, 8.2], [7.6, 7.4]].forEach(([x, y]) => R.dot(g.X(x), g.Y(y), 1.5, { ink: 'B' }));
    g.curve([3.2, 0.8, 7.8, 8.4], { ink: 'P', w: 1 });
    R.text('positive correlation', 80, 206, 4, { al: 'c', ink: 'P' });
    R.text('does it prove cause?', 80, 214, 4, { al: 'c' });
    R.line(156, 110, 156, 236, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // conflicting evidence: two studies with error bars
    R.text('conflicting evidence', 234, 116, 4.4, { al: 'c' });
    const g2 = R.graph(176, 124, 124, 60, { xmin: 0, xmax: 6, ymin: 0, ymax: 10, xl: '', yl: 'mean systolic BP', xt: [], yt: [], fs: 3.6, ylx: 4 }).axes();
    [[1, 4.6, 0.9, 'A low salt'], [2, 5.6, 1.0, 'A high salt'], [4, 4.8, 2.2, 'B low salt'], [5, 5.4, 2.4, 'B high salt']].forEach(([x, y, e]) => { R.rect(g2.X(x) - 7, g2.Y(y), 14, g2.Y(0) - g2.Y(y), { ink: 'B', w: 0.8, fi: 'P', ft: x < 3 ? 0.6 : 0.3, wob: 0.1 }); g2.err(x, y, e); });
    R.text('study A', g2.X(1.5), g2.Y(0) + 7, 3.8, { al: 'c' }); R.text('study B', g2.X(4.5), g2.Y(0) + 7, 3.8, { al: 'c' });
    R.text('A: small spread, clear difference.', 238, 202, 3.7, { al: 'c' }); R.text('B: large error bars overlap.', 238, 208, 3.7, { al: 'c' });
    ['check: sample size, controls,', 'confounding variables, spread'].forEach((t, i) => R.text(t, 238, 220 + i * 6, 3.8, { al: 'c', ink: 'P' }));
  },
  anim(A, sc) { const p = A.ph(3); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.rbc(20 + u * 96, 53 + (i - 1) * 3, 2.6, i, 0.85); } },
});

/* ---------- RP5: dissection of a mass transport / gas exchange system or organ ---------- */
rpScene({
  id: 'RP5', num: '3.3.4.1', rp: 5, title: 'Mass transport in animals', sub: 'Required practical 5: dissection of a gas exchange or mass transport system, or an organ within it', topic: '3.3', slot: [1, 7],
  covers: ['RP5'], at: ['e', 'h', 'j'], ms: ['MS 1.8', 'MS 0.1'], ps: ['PS 1.2', 'PS 2.2'],
  card: {
    text: 'Dissect an animal or plant gas exchange or mass transport system, or an organ within such a system. The AQA handbook’s example is a <b>sheep’s heart</b>: examine the external features and coronary arteries, cut open the chambers, look for the tendinous cords holding the atrioventricular valves, compare the thickness of the ventricle walls (and atrium walls), and label with pins and flags. Produce a scientific drawing or photograph with annotations, and calculate the magnification of the drawing. Similar approaches work for lungs or a fish head. Schools may choose other organs and methods.',
    terms: ['dissection', 'scientific drawing', 'annotation', 'tendinous cords', 'ventricle wall', 'atrioventricular valve', 'magnification', 'aseptic/safe disposal'],
    skill: 'MS 1.8: magnification of a drawing', eq: MATH(mt('magnification '), mo('='), mfrac(mt('size of drawing'), mt('size of real object'))),
    eqn: 'e.g. wall drawn 36 mm, real wall 12 mm → ×3',
    q: 'What does the thicker wall of the left ventricle tell you about its function?', a: 'It generates higher pressure to pump blood around the whole body, compared with the right ventricle pumping to the nearby lungs.'
  },
  apparatus(R, b) {
    R.text('example: sheep’s heart on a dissecting tray', 92, 21, 4.4, { al: 'c' });
    R.rrect(10, 30, 118, 84, 5, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.2, wob: 0.3 });
    // heart cut open
    const h = [34, 56, 54, 46, 72, 52, 90, 48, 108, 58, 112, 82, 100, 100, 74, 108, 48, 98, 36, 78];
    R.fill(h, { ink: 'P', t: 0.35, smooth: true, wob: 0.4 }); R.poly(h, { ink: 'B', w: 1.3, smooth: true, wob: 0.5 });
    R.stroke([72, 52, 72, 104], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([42, 66, 100, 68], { ink: 'B', w: 1, taper: 'none' });
    [[56, 60], [56, 88], [90, 60], [90, 90]].forEach(([x, y]) => R.ellipse(x, y, 10, 8, { ink: 'B', w: 0.8, fi: 'P', ft: 0.2 }));
    R.line(52, 70, 52, 90, { ink: 'B', w: 0.5, taper: 'none' }); R.line(60, 70, 62, 90, { ink: 'B', w: 0.5, taper: 'none' });
    // pins and flags
    [[44, 52], [96, 50], [102, 82]].forEach(([x, y], i) => { R.line(x, y, x, y - 12, { ink: 'B', w: 0.9, taper: 'none' }); R.rect(x, y - 12, 9, 5, { ink: 'B', w: 0.7, fi: ['T', 'Y', 'P'][i], ft: 0.7, wob: 0.05 }); });
    R.text('labelled pins', 68, 124, 3.8, { al: 'c' });
    // tools
    R.line(140, 38, 168, 38, { ink: 'B', w: 1.2, taper: 'none' }); R.rrect(132, 35, 12, 6, 2, { ink: 'B', w: 0.9, fi: 'P', ft: 0.6 }); R.text('scalpel', 152, 48, 3.7, { al: 'c' });
    R.line(140, 62, 166, 78, { ink: 'B', w: 1, taper: 'none' }); R.line(140, 78, 166, 62, { ink: 'B', w: 1, taper: 'none' }); R.circle(138, 62, 3, { ink: 'B', w: 0.8 }); R.circle(138, 78, 3, { ink: 'B', w: 0.8 }); R.text('scissors', 152, 92, 3.7, { al: 'c' });
    R.line(140, 106, 170, 106, { ink: 'B', w: 1, taper: 'none' }); R.circle(138, 106, 3, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.6 }); R.text('mounted needle', 154, 118, 3.7, { al: 'c' });
    Icons.bio(R, 160, 132, 5);
    // lens/drawing
    R.text('drawing + annotations', 40, 136, 0.01, { al: 'c' });
  },
  results(R, b) {
    R.text('left vs right ventricle wall', b.x + 60, b.y + 12, 4, { al: 'c' });
    // two ventricle cross-sections
    R.circle(b.x + 32, b.y + 52, 24, { ink: 'B', w: 1.3, fi: 'P', ft: 0.5, wob: 0.3 }); R.circle(b.x + 32, b.y + 52, 14, { ink: 'B', w: 1, fi: 'P', ft: 0.15, wob: 0.2 });
    R.circle(b.x + 90, b.y + 52, 20, { ink: 'B', w: 1.3, fi: 'P', ft: 0.5, wob: 0.3 }); R.circle(b.x + 90, b.y + 52, 15.5, { ink: 'B', w: 1, fi: 'P', ft: 0.15, wob: 0.2 });
    R.line(b.x + 32, b.y + 38, b.x + 32, b.y + 28, { ink: 'T', w: 1.2 }); R.text('12 mm', b.x + 32, b.y + 82, 3.8, { al: 'c' }); R.text('left', b.x + 32, b.y + 90, 3.6, { al: 'c' });
    R.text('4 mm', b.x + 90, b.y + 82, 3.8, { al: 'c' }); R.text('right', b.x + 90, b.y + 90, 3.6, { al: 'c' });
    R.text('measure the wall with a ruler', b.x + 60, b.y + 104, 3.7, { al: 'c' });
  },
  vars: { iv: 'which ventricle (left or right)', dv: 'wall thickness / mm', ctl: ['same heart, same level of cut', 'same ruler and reading method'] },
  calc: ['magnification of the drawing', '= size of drawing ÷ real size', '= 36 mm ÷ 12 mm = × 3', 'wall ratio L : R = 12 : 4 = 3 : 1'],
  risks: [['bio', 'raw meat: wash hands, disinfect'], ['warn', 'sharp scalpel and pins'], ['goggles', 'lab coat, eye protection']],
  limits: ['hearts vary with age and size', 'trimmed hearts lose vessels/atria', 'cut position changes the wall thickness', 'drawings depend on the observer'],
  interp: 'thicker left ventricle wall: pumps blood at higher pressure round the body',
  anim(A, sc) { const p = A.ph(4); A.dot(44 + (p * 20) % 20, 142 - 0, 0, 'P', 0, 0); A.dot(62 + Math.sin(p * TAU) * 1.2, 80, 1.2, 'P', 0.7, 1); },
});
