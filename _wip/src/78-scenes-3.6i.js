/* ===================== 3.6.4.2 Control of blood glucose concentration ===================== */
const gaus = (t, c, a, b) => Math.exp(-Math.pow((t - c) / (t < c ? a : b), 2));
const GLC = t => 0.45 + 0.36 * gaus(t, 3, 0.6, 1.1) - 0.24 * gaus(t, 8, 0.8, 1.2);
const INS = t => 0.2 + 0.55 * gaus(t, 3.4, 0.7, 1.2) - 0.12 * gaus(t, 8, 0.9, 0.9);
const GLG = t => 0.25 + 0.45 * gaus(t, 8.2, 0.8, 1.3) - 0.12 * gaus(t, 3.2, 1, 1);

S({
  id: '3.6.4.2a', num: '3.6.4.2', sub: 'Blood glucose: factors, pancreas, liver and the two feedback loops', title: 'Control of blood glucose concentration', topic: '3.6', slot: [2, 7], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.4.2.s1', '3.6.4.2.s2', '3.6.4.2.s3', '3.6.4.2.s4', '3.6.4.2.s5'],
  card: {
    text: 'Blood glucose concentration is raised by <b>carbohydrate in the diet</b>, <b>glycogenolysis</b> and <b>gluconeogenesis</b>, and lowered by <b>respiration</b> and by cells taking glucose up. The <b>liver</b> carries out <b>glycogenesis</b> (glucose → glycogen), <b>glycogenolysis</b> (glycogen → glucose) and <b>gluconeogenesis</b> (making glucose from non-carbohydrates, e.g. glycerol and amino acids). When glucose rises, <b>β cells</b> in the <b>islets of Langerhans</b> secrete <b>insulin</b>; when it falls, <b>α cells</b> secrete <b>glucagon</b>; <b>adrenaline</b> also raises blood glucose. Each hormone binds to <b>receptors</b> on the surface of its target cells and activates enzymes. Two opposing hormones give <b>negative feedback</b> control in both directions.',
    terms: ['blood glucose', 'islets of Langerhans', 'β cell', 'α cell', 'insulin', 'glucagon', 'adrenaline', 'glycogenesis', 'glycogenolysis', 'gluconeogenesis', 'negative feedback'],
    skill: 'MS 3.1: interpret hormone and glucose traces after a meal', eq: null,
    q: 'Name the process that makes glucose from glycerol and amino acids and the hormone that activates it.', a: 'Gluconeogenesis, activated by glucagon.'
  },
  draw(R, sc) {
    const box = (x, y, lines, fi, ft = fi === 'T' ? 0.07 : fi === 'P' ? 0.09 : 0.13) => { R.rrect(x, y, 78, 38, 4, { ink: 'B', w: 0.8, fi, ft, wob: 0.3 }); lines.forEach((t, i) => R.text(t, x + 39, y + 19 - (lines.length - 1) * 3 + 1.2 + i * 6, 3.25, { al: 'c' })); };
    const rows = [
      { y: 22, tag: 'glucose too high (e.g. after a meal)', ink: 'T', b: [[['blood glucose', 'concentration', 'rises'], 'Y'], [['beta cells of the', 'islets of Langerhans', 'detect the rise'], 'P'], [['beta cells secrete', 'insulin'], 'P'], [['liver and muscle:', 'glycogenesis,', 'more glucose uptake'], 'T'], [['blood glucose', 'falls to normal'], 'Y']] },
      { y: 80, tag: 'glucose too low (e.g. exercise, fasting)', ink: 'P', b: [[['blood glucose', 'concentration', 'falls'], 'Y'], [['alpha cells of the', 'islets of Langerhans', 'detect the fall'], 'T'], [['alpha cells secrete', 'glucagon; adrenaline', 'also released'], 'T'], [['liver: glycogenolysis', 'and gluconeogenesis'], 'P'], [['blood glucose', 'rises to normal'], 'Y']] },
    ];
    rows.forEach(r => { R.text(r.tag, 8, r.y - 4, 3.9, { al: 'l', ink: r.ink }); r.b.forEach((b, i) => { box(8 + i * 86, r.y, b[0], b[1]); if (i < 4) R.arrow([8 + i * 86 + 79, r.y + 19, 8 + i * 86 + 85, r.y + 19], { ink: 'B', w: 0.8, hs: 2 }); }); });
    // processes in the liver
    R.table(8, 130, [62, 84, 64, 46], 12.4, [['process', 'converts', 'activated by', 'inhibited by'], ['glycogenesis', 'glucose → glycogen', 'insulin', 'adrenaline'], ['glycogenolysis', 'glycogen → glucose', 'glucagon, adrenaline', 'none'], ['gluconeogenesis', 'glycerol, amino acids → glucose', 'glucagon', 'none']], { size: 3.2, hink: 'Y' });
    R.text('all three happen in the liver;', 132, 190, 3.5, { al: 'c' }); R.text('hormones bind to receptors on target cells', 132, 196.5, 3.5, { al: 'c' });
    // islet of Langerhans
    R.ellipse(375, 168, 54, 30, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12, wob: 0.6 });
    R.stroke([325, 178, 350, 172, 375, 176, 400, 166, 426, 170], { ink: 'B', w: 6, smooth: true, taper: 'none', wob: 0.2, t: 0.0 });
    R.stroke([325, 178, 350, 172, 375, 176, 400, 166, 426, 170], { ink: 'P', w: 4.4, smooth: true, taper: 'none', wob: 0.2, t: 0.5 });
    [[360, 160], [372, 158], [384, 160], [366, 150], [380, 150], [392, 152], [354, 152], [374, 142]].forEach(([x, y]) => R.circle(x, y, 4.2, { ink: 'B', w: 0.7, fi: 'P', ft: 0.55, wob: 0.1 }));
    [[342, 163], [348, 150], [404, 162], [398, 148], [362, 188], [392, 186]].forEach(([x, y]) => R.circle(x, y, 3.8, { ink: 'B', w: 0.7, fi: 'T', ft: 0.7, wob: 0.1 }));
    leader(R, 'beta cells: insulin', 355, 153, 326, 150, { size: 3.4, al: 'r', ink: 'P' }); leader(R, 'alpha cells: glucagon', 362, 188, 372, 214, { size: 3.4, al: 'r', ink: 'T' }); leader(R, 'blood capillary', 421, 169, 426, 224, { size: 3.4, al: 'r' });
    R.text('islet of Langerhans (in the pancreas)', 375, 133, 3.5, { al: 'c' });
    // traces
    R.line(448, 14, 448, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('after a meal, then exercise', 552, 14, 4.2, { al: 'c' });
    const g = R.graph(470, 26, 170, 98, { xmin: 0, xmax: 10, ymin: 0, ymax: 1, xl: 'time', yl: 'concentration (arbitrary)', fs: 3.4, xly: 10, ylx: 6 }).axes();
    g.curve(GLC, { ink: 'P', w: 1.7, n: 70 }); g.curve(INS, { ink: 'T', w: 1.5, n: 70 }); g.curve(GLG, { ink: 'B', w: 1.1, n: 70 });
    R.arrow([g.X(2.2), g.Y(0.99), g.X(2.2), g.Y(0.9)], { ink: 'B', w: 0.8, hs: 2.2 }); R.text('meal', g.X(2.2), g.Y(1.02), 3.4, { al: 'c' });
    R.arrow([g.X(7.2), g.Y(0.99), g.X(7.2), g.Y(0.9)], { ink: 'B', w: 0.8, hs: 2.2 }); R.text('exercise', g.X(7.2), g.Y(1.02), 3.4, { al: 'c' });
    R.line(470, 142, 484, 142, { ink: 'P', w: 1.7, taper: 'none' }); R.text('blood glucose', 489, 143.4, 3.4, { al: 'l' });
    R.line(470, 150, 484, 150, { ink: 'T', w: 1.5, taper: 'none' }); R.text('insulin', 489, 151.4, 3.4, { al: 'l' });
    R.line(470, 158, 484, 158, { ink: 'B', w: 1.1, taper: 'none' }); R.text('glucagon', 489, 159.4, 3.4, { al: 'l' });
    // factors
    R.text('raises blood glucose', 590, 138, 3.7, { al: 'l', ink: 'P' }); R.arrow([583, 145, 583, 134], { ink: 'P', w: 1.3, hs: 3 });
    ['carbohydrate in the diet', 'glycogenolysis', 'gluconeogenesis'].forEach((t, i) => R.text(t, 590, 146 + i * 6.2, 3.4, { al: 'l' }));
    R.text('lowers blood glucose', 590, 172, 3.7, { al: 'l', ink: 'T' }); R.arrow([583, 164, 583, 175], { ink: 'T', w: 1.3, hs: 3 });
    ['respiration', 'glycogenesis', 'uptake of glucose by cells'].forEach((t, i) => R.text(t, 590, 180 + i * 6.2, 3.4, { al: 'l' }));
  },
  anim(A, sc) {
    const p = A.ph(8), x = p * 10; A.dot(470 + x * 17, 26 + 98 - GLC(x) * 98, 2.1, 'P', 0.95, 1);
    for (let i = 0; i < 3; i++) { const u = (p * 2 + i / 3) % 1; A.dot(340 + u * 70, 178 - Math.sin(u * 5 + i) * 1.2 - u * 8 + 4 * u, 1.4, 'P', 0.9, 3 + i); }
  },
});

/* ---------- 3.6.4.2b How the hormones act at the target cell ---------- */
S({
  id: '3.6.4.2b', num: '3.6.4.2', sub: 'Insulin; adrenaline and glucagon with the second messenger cAMP', title: 'Control of blood glucose concentration', topic: '3.6', slot: [0, 8], span: [2, 1], dna: 'mark', ao: 1,
  covers: ['3.6.4.2.s3', '3.6.4.2.s4', '3.6.4.2.s5', '3.6.4.2.s6'],
  card: {
    text: '<b>Insulin</b> attaches to <b>receptors</b> on the surface of target cells. It controls glucose uptake by regulating the inclusion of <b>channel proteins</b> in the surface membrane, and activates <b>enzymes</b> that convert glucose to glycogen. <b>Glucagon</b> attaches to receptors on liver cells and activates enzymes that convert glycogen to glucose and glycerol and amino acids to glucose. <b>Adrenaline</b> attaches to receptors and activates the enzymes that convert glycogen to glucose. In the <b>second messenger model</b>, the hormone (first messenger) binding to its receptor activates <b>adenylate cyclase</b> on the inside of the membrane; this converts <b>ATP</b> to <b>cyclic AMP (cAMP)</b>, the second messenger, which activates <b>protein kinase</b>; protein kinase activates the enzymes that bring about the response.',
    terms: ['receptor', 'channel protein', 'second messenger', 'adenylate cyclase', 'cyclic AMP', 'protein kinase', 'first messenger', 'target cell'],
    skill: 'AO1: describe the sequence of the second messenger model', eq: MATH(mt('ATP '), mo('→'), mt(' cAMP + 2P'), msub(mr(''), mr('i'))),
    q: 'Why does adrenaline, which does not enter the liver cell, still activate enzymes inside it?', a: 'Binding to its receptor activates adenylate cyclase, which makes cAMP; cAMP (the second messenger) activates protein kinase, which activates the enzymes.'
  },
  draw(R, sc) {
    // ---- insulin ----
    R.text('insulin at a liver or muscle cell', 165, 13, 4.5, { al: 'c' });
    const x0 = 12, x1 = 318, my = 100, bl = tMemb(R, x0, x1, my);
    R.text('blood (outside)', 20, 24, 3.4, { al: 'l', ink: 'T' }); R.text('cell (inside)', 20, 174, 3.4, { al: 'l', ink: 'T' });
    tProt(R, bl, x0, x1, 60, 'receptor', { hw: 5 });
    R.poly(polyPts(60, 72, 4.5, 5), { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); R.arrow([60, 78, 60, 86], { ink: 'B', w: 0.8, hs: 2 }); R.text('insulin', 60, 62, 3.5, { al: 'c', ink: 'P' });
    R.poly(polyPts(104, 44, 4.5, 5), { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); R.poly(polyPts(116, 30, 4.5, 5), { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 });
    // vesicle with channel proteins, fusing
    R.circle(142, 140, 11, { ink: 'B', w: 1, fi: 'T', ft: 0.12 }); [[137, 140], [147, 140]].forEach(([x, y]) => { R.rrect(x - 2.5, y - 4, 2, 8, 0.8, { ink: 'B', w: 0.7, fi: 'P', ft: 0.8 }); R.rrect(x + 0.5, y - 4, 2, 8, 0.8, { ink: 'B', w: 0.7, fi: 'P', ft: 0.8 }); });
    R.arrow([150, 128, 178, 112], { ink: 'B', w: 0.9, hs: 2.4 });
    tProt(R, bl, x0, x1, 200, 'channel', { hw: 5.2 }); tProt(R, bl, x0, x1, 262, 'channel', { hw: 5.2 });
    [[200, 56], [262, 62], [232, 38], [290, 44]].forEach(([x, y]) => glucTok(R, x, y, 3.6));
    R.arrow([200, 68, 200, 94], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([262, 74, 262, 94], { ink: 'B', w: 0.9, hs: 2.4 });
    [[200, 126], [262, 122], [232, 132]].forEach(([x, y]) => glucTok(R, x, y, 3.6));
    // enzymes and glycogen
    R.ellipse(222, 164, 15, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.14, wob: 0.3 }); R.text('enzymes', 222, 166, 3.4, { al: 'c' });
    R.arrow([236, 140, 232, 154], { ink: 'B', w: 0.8, hs: 2.2 });
    [[274, 164], [282, 158], [290, 164], [282, 170], [298, 158], [298, 170]].forEach(([x, y]) => R.circle(x, y, 3.6, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.9 })); R.text('glycogen', 288, 184, 3.5, { al: 'c' });
    R.arrow([240, 164, 268, 164], { ink: 'P', w: 1.2, hs: 3 });
    R.bubble(76, 88, 4, '1', {}); R.bubble(166, 122, 4, '2', {}); R.bubble(236, 92, 4, '3', {}); R.bubble(250, 156, 4, '4', {});
    ['1 insulin binds to its receptor on the cell surface', '2 vesicles bring channel proteins to the surface membrane', '3 more glucose enters through the extra channel proteins', '4 enzymes activated: glucose is converted to glycogen'].forEach((t, i) => R.text(t, 14, 198 + i * 8.2, 3.6, { al: 'l' }));
    R.line(326, 14, 326, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // ---- second messenger ----
    R.text('adrenaline and glucagon: second messenger model', 490, 13, 4.5, { al: 'c' });
    const y0 = 340, y1 = 470, my2 = 66, bl2 = tMemb(R, y0, y1, my2);
    R.text('outside', 346, 26, 3.4, { al: 'l', ink: 'T' }); R.text('inside the cell', 346, 83, 3.4, { al: 'l', ink: 'T' });
    tProt(R, bl2, y0, y1, 400, 'receptor', { hw: 5 });
    R.poly(polyPts(400, 42, 4.5, 6), { ink: 'B', w: 0.8, fi: 'Y', ft: 0.9 }); R.arrow([400, 48, 400, 56], { ink: 'B', w: 0.8, hs: 2 });
    R.text('adrenaline or glucagon', 400, 30, 3.4, { al: 'c' });
    R.ellipse(400, 90, 21, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.14, wob: 0.3 }); R.text('adenylate cyclase', 400, 91.4, 3.3, { al: 'c' });
    R.arrow([400, 76, 400, 80], { ink: 'P', w: 0.001, hs: 0.1 });
    tok(R, 366, 112, 'ATP', { r: 6, fi: 'Y', ft: 0.9, size: 3.6 }); R.arrow([373, 106, 387, 98], { ink: 'B', w: 0.8, hs: 2.2 });
    R.poly(hexPts(436, 112, 8.4, 0.5), { ink: 'B', w: 0.9, fi: 'T', ft: 0.1 }); R.text('cAMP', 436, 113.4, 3.6, { al: 'c' }); R.arrow([414, 97, 430, 105], { ink: 'B', w: 0.8, hs: 2.2 });
    R.arrow([436, 120, 436, 138], { ink: 'B', w: 0.9, hs: 2.4 });
    R.ellipse(436, 150, 22, 9, { ink: 'B', w: 1, fi: 'P', ft: 0.14, wob: 0.3 }); R.text('protein kinase', 436, 152, 3.5, { al: 'c' });
    R.arrow([436, 160, 436, 174], { ink: 'B', w: 0.9, hs: 2.4 });
    R.ellipse(436, 184, 22, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.12, wob: 0.3 }); R.text('enzymes', 436, 186, 3.5, { al: 'c' });
    R.arrow([436, 193, 436, 204], { ink: 'B', w: 0.9, hs: 2.4 });
    [[404, 218], [412, 212], [420, 218], [412, 224]].forEach(([x, y]) => R.circle(x, y, 3.4, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.9 })); R.text('glycogen', 412, 233, 3.3, { al: 'c' });
    R.arrow([428, 216, 450, 216], { ink: 'P', w: 1.2, hs: 3 }); glucTok(R, 460, 216, 4); glucTok(R, 472, 216, 4); R.text('glucose', 466, 228, 3.4, { al: 'c' });
    [[388, 50, '1'], [414, 80, '2'], [452, 98, '3'], [466, 150, '4'], [466, 184, '5']].forEach(([x, y, t]) => R.bubble(x, y, 4, t, {}));
    const steps = ['hormone (first messenger) binds to the receptor on the cell surface', 'receptor activates adenylate cyclase on the inside of the membrane', 'adenylate cyclase converts ATP to cAMP, the second messenger', 'cAMP activates protein kinase', 'protein kinase activates the enzymes that convert glycogen to glucose'];
    const sy = [38, 76, 108, 148, 184];
    steps.forEach((t, i) => { wrapText(t, 142, 3.6).forEach((ln, j) => R.text(ln, 502, sy[i] + j * 6.2, 3.6, { al: 'l' })); R.bubble(494, sy[i] - 1.2, 3.4, String(i + 1), {}); });
  },
  anim(A, sc) {
    const p = A.ph(5); for (let k = 0; k < 2; k++) { const u = (p + k / 2) % 1; A.dot(200 + k * 62, 62 + u * 56, 2.9, 'Y', 0.9, k); }
    A.dot(436, 124 + p * 12, 1.8, 'T', 0.95, 5);
  },
});

/* ---------- 3.6.4.2c Diabetes, and evaluating the responses to type II ---------- */
S({
  id: '3.6.4.2c', num: '3.6.4.2', sub: 'Type I and type II diabetes; health advisers and the food industry', title: 'Control of blood glucose concentration', topic: '3.6', slot: [2, 8], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.6.4.2.s7', '3.6.4.2.s8'],
  card: {
    text: 'In <b>type I diabetes</b> the immune system destroys the <b>β cells</b>, so little or no insulin is made; blood glucose stays high and is controlled by <b>insulin injections</b> and by managing the diet. In <b>type II diabetes</b> the target cells respond poorly to insulin (their receptors respond less) and/or too little insulin is made; it is linked to <b>obesity</b>, a diet high in sugar and fat, inactivity, age and family history, and is controlled by <b>diet</b>, exercise and weight loss, sometimes with medication or insulin. You should be able to <b>evaluate</b> the positions of <b>health advisers</b> (educate, regulate labelling and advertising) and the <b>food industry</b> (reformulate products, but profit and consumer demand matter) in relation to the rising incidence of type II diabetes.',
    terms: ['type I diabetes', 'type II diabetes', 'insulin injection', 'obesity', 'diet', 'hyperglycaemia', 'health adviser', 'food industry'],
    skill: 'MS 3.1: interpret a glucose tolerance curve; correlation is not causation', eq: null,
    q: 'Why is insulin injection a treatment for type I diabetes but often not the first choice for type II?', a: 'Type I has too little insulin, so insulin replaces it. In type II the cells respond poorly, so diet, exercise and weight loss are used first to restore the response.'
  },
  draw(R, sc) {
    R.text('type I', 110, 14, 4.8, { al: 'c', ink: 'P' }); R.text('type II', 242, 14, 4.8, { al: 'c', ink: 'T' });
    // type I: islet attacked by lymphocytes
    R.ellipse(98, 58, 40, 24, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12, wob: 0.6 });
    [[84, 52], [96, 48], [108, 52], [90, 64], [104, 64], [118, 60]].forEach(([x, y], i) => { R.circle(x, y, 4.4, { ink: 'B', w: 0.7, fi: 'P', ft: i < 4 ? 0.55 : 0.2, wob: 0.1 }); if (i < 4) cross(R, x, y, 2.4); });
    R.lymphocyte(36, 40, 8.4, {}); R.lymphocyte(42, 72, 8, {}); R.arrow([46, 44, 62, 50], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([50, 70, 66, 64], { ink: 'B', w: 0.9, hs: 2.4 });
    R.text('immune system', 36, 88, 3.4, { al: 'c' }); R.text('attacks beta cells', 40, 94, 3.4, { al: 'c' });
    R.text('islet of Langerhans', 98, 90, 3.4, { al: 'c' });
    // type II: cells with poorly responding receptors
    const x0 = 172, x1 = 312, my = 62, bl = tMemb(R, x0, x1, my);
    [196, 242, 288].forEach(x => { tProt(R, bl, x0, x1, x, 'receptor', { hw: 5 }); });
    [196, 242].forEach((x, i) => { R.poly(polyPts(x + (i ? 8 : 0), 40, 4, 5), { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); cross(R, x, 52, 2.4); });
    [[214, 32], [262, 36], [276, 28], [300, 44]].forEach(([x, y]) => glucTok(R, x, y, 3.3));
    R.text('insulin present, but', 242, 92, 3.4, { al: 'c' }); R.text('cells respond poorly', 242, 98, 3.4, { al: 'c' });
    R.text('glucose stays high', 242, 80, 3.4, { al: 'c', ink: 'P' });
    R.line(166, 22, 166, 168, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('cause', 14, 114, 3.8, { al: 'l', ink: 'P' });
    ['immune system destroys the', 'beta cells: little or no insulin'].forEach((t, i) => R.text(t, 14, 121 + i * 6.2, 3.4, { al: 'l' }));
    R.text('control', 14, 148, 3.8, { al: 'l', ink: 'T' });
    ['insulin injections', 'regular meals, control sugar intake'].forEach((t, i) => R.text(t, 14, 155 + i * 6.2, 3.4, { al: 'l' }));
    R.text('cause', 172, 114, 3.8, { al: 'l', ink: 'P' });
    ['cells respond poorly to insulin and/or', 'too little insulin; linked to obesity,', 'poor diet, inactivity, age'].forEach((t, i) => R.text(t, 172, 121 + i * 6.2, 3.4, { al: 'l' }));
    R.text('control', 172, 148, 3.8, { al: 'l', ink: 'T' });
    ['healthy diet, exercise, weight loss;', 'medication; insulin if needed'].forEach((t, i) => R.text(t, 172, 155 + i * 6.2, 3.4, { al: 'l' }));
    R.line(8, 176, 322, 176, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('glucose in the urine when blood glucose is too high for the kidney to reabsorb it', 165, 186, 3.4, { al: 'c' });
    R.text('too much insulin: blood glucose falls too low (hypoglycaemia)', 165, 194, 3.4, { al: 'c' });
    R.text('hyperglycaemia = high blood glucose', 165, 202, 3.4, { al: 'c' });
    // glucose tolerance
    R.line(330, 14, 330, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('after a glucose drink', 408, 14, 4.4, { al: 'c' });
    const g = R.graph(354, 26, 132, 108, { xmin: 0, xmax: 4, ymin: 0, ymax: 1, xl: 'time / h', yl: 'blood glucose', xt: [0, 1, 2, 3, 4], fs: 3.4, xly: 13, ylx: 6 }).axes();
    g.curve(t => 0.42 + 0.3 * gaus(t, 0.8, 0.45, 0.7), { ink: 'T', w: 1.6, n: 50 }); g.curve(t => 0.62 + 0.34 * gaus(t, 1.3, 0.7, 1.7), { ink: 'P', w: 1.6, n: 50 });
    g.hline(0.45, { dash: true, t: 0.6 });
    R.text('with diabetes', g.X(3.1), g.Y(0.95), 3.5, { al: 'c', ink: 'P' }); R.text('without diabetes', g.X(3.0), g.Y(0.3), 3.5, { al: 'c', ink: 'T' });
    R.text('slower return', g.X(3.0), g.Y(0.6), 3.3, { al: 'c' }); R.text('to normal', g.X(3.0), g.Y(0.54), 3.3, { al: 'c' });
    // rising incidence
    R.text('incidence of type II diabetes', 408, 168, 3.8, { al: 'c' });
    [8, 11, 15, 21, 29].forEach((h, i) => R.rect(358 + i * 24, 214 - h * 1.35, 16, h * 1.35, { ink: 'B', w: 0.8, fi: 'P', ft: 0.2 + i * 0.12 }));
    R.arrow([356, 176, 470, 176], { ink: 'B', w: 0, hs: 0.1, noHead: true }); R.text('time', 414, 222, 3.4, { al: 'c' });
    R.text('rising, with obesity, poor diet, inactivity', 408, 230, 3.3, { al: 'c' });
    // evaluating the positions
    R.line(496, 14, 496, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('evaluate the positions', 576, 14, 4.4, { al: 'c' });
    R.line(576, 24, 576, 40, { ink: 'B', w: 1.2, taper: 'none' }); R.line(540, 24, 612, 24, { ink: 'B', w: 1.4, taper: 'none' }); R.line(540, 24, 534, 36, { ink: 'B', w: 0.7, taper: 'none' }); R.line(540, 24, 546, 36, { ink: 'B', w: 0.7, taper: 'none' }); R.line(612, 24, 606, 36, { ink: 'B', w: 0.7, taper: 'none' }); R.line(612, 24, 618, 36, { ink: 'B', w: 0.7, taper: 'none' });
    R.ellipse(540, 37, 8, 2.4, { ink: 'B', w: 0.8, fi: 'T', ft: 0.4 }); R.ellipse(612, 37, 8, 2.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.4 });
    R.text('health advisers', 536, 50, 3.9, { al: 'c', ink: 'T' }); R.text('food industry', 616, 50, 3.9, { al: 'c', ink: 'P' });
    ['educate: diet low in fat,', 'sugar and salt; exercise;', 'weight loss', 'press for clearer', 'labelling, less advertising', 'of junk food to children', 'aim: fewer people', 'develop type II diabetes'].forEach((t, i) => R.text(t, 502, 62 + i * 6.4, 3.3, { al: 'l' }));
    ['reduce sugar, fat and', 'salt; use sweeteners;', 'clearer labels', 'but profit matters, and', 'unhealthy products still', 'sell: change may follow', 'consumer demand slowly'].forEach((t, i) => R.text(t, 574, 62 + i * 6.4, 3.3, { al: 'l' }));
    R.line(570, 54, 570, 150, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.rrect(502, 164, 150, 60, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.12, wob: 0.3 });
    R.text('weigh up:', 577, 174, 3.9, { al: 'c', ink: 'P' });
    ['evidence for each claim', 'who gains (health, profit)', 'short and long term effects', 'correlation is not causation'].forEach((t, i) => R.text(t, 577, 183 + i * 7.6, 3.5, { al: 'c' }));
  },
  anim(A, sc) {
    const p = A.ph(4); A.dot(36 + 16 * p + 4, 44 + 6 * p, 1.6, 'P', 0.9, 1); A.dot(42 + 20 * p, 72 - 8 * p, 1.6, 'P', 0.9, 2);
    const x = p * 4; A.dot(354 + x * 33, 26 + 108 - (0.62 + 0.34 * gaus(x, 1.3, 0.7, 1.7)) * 108, 2.1, 'P', 0.95, 3);
  },
});
