/* ===================== 3.6.4.3 Control of blood water potential ===================== */
const ADH_PATH = [112, 141, 112, 156, 138, 168, 190, 176];
S({
  id: '3.6.4.3a', num: '3.6.4.3', sub: 'Osmoregulation: hypothalamus, posterior pituitary and ADH', title: 'Control of blood water potential', topic: '3.6', slot: [1, 9], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.4.3.s1', '3.6.4.3.s2'],
  card: {
    text: '<b>Osmoregulation</b> is the control of the <b>water potential</b> of the blood. <b>Osmoreceptors</b> in the <b>hypothalamus</b> detect changes in blood water potential. If it falls (dehydration), the osmoreceptor cells lose water by osmosis, the <b>posterior pituitary</b> releases more <b>antidiuretic hormone (ADH)</b> into the blood, and ADH makes the walls of the <b>distal convoluted tubule</b> and <b>collecting duct</b> more permeable to water (<b>aquaporins</b> are inserted into the membrane). More water is reabsorbed by osmosis, producing a small volume of concentrated urine. If water potential rises, less ADH is released, the walls are less permeable, and a large volume of dilute urine is produced. This is <b>negative feedback</b>.',
    terms: ['osmoregulation', 'hypothalamus', 'osmoreceptor', 'posterior pituitary', 'ADH', 'aquaporin', 'distal convoluted tubule', 'collecting duct', 'concentrated urine'],
    skill: 'AO2: apply negative feedback to unfamiliar data on urine volume', eq: null,
    q: 'Explain why a person who has sweated heavily produces a small volume of concentrated urine.', a: 'Blood water potential falls; osmoreceptors detect it; the posterior pituitary releases more ADH; the DCT and collecting duct become more permeable to water, so more water is reabsorbed by osmosis.'
  },
  draw(R, sc) {
    // head and brain
    R.ellipse(112, 74, 70, 44, { ink: 'B', w: 1.3, fi: 'P', ft: 0.06, wob: 0.7 });
    [[62, 56, 80, 44, 100, 48], [96, 42, 120, 40, 140, 46], [72, 80, 90, 72, 108, 78], [118, 68, 140, 62, 156, 72]].forEach(p => R.stroke(p, { ink: 'B', w: 0.7, smooth: true, taper: 'both', wob: 0.3, t: 0.6 }));
    R.ellipse(112, 92, 15, 9, { ink: 'B', w: 1, fi: 'P', ft: 0.5, wob: 0.3 });
    [[106, 91], [112, 94], [118, 91]].forEach(([x, y]) => R.circle(x, y, 2.4, { ink: 'B', w: 0.6, fi: 'T', ft: 0.6 }));
    R.line(112, 101, 112, 122, { ink: 'B', w: 2.6, taper: 'none', t: 0.5 }); R.line(112, 101, 112, 122, { ink: 'B', w: 0.9, taper: 'none' });
    R.ellipse(112, 130, 11, 8, { ink: 'B', w: 1, fi: 'Y', ft: 0.7, wob: 0.3 });
    leader(R, 'hypothalamus (osmoreceptors)', 104, 90, 20, 22, { size: 3.6, al: 'l' });
    leader(R, 'posterior pituitary', 122, 130, 150, 120, { size: 3.6, al: 'l' });
    R.chain2(ADH_PATH, 3.4, 'P', 0.6, { smooth: true });
    [[112, 154], [126, 164], [158, 172]].forEach(([x, y]) => tok(R, x, y - 6, 'ADH', { r: 6, fi: 'T', ft: 0.1, size: 3.4 }));
    R.text('ADH travels in the blood', 112, 196, 3.7, { al: 'c', ink: 'T' });
    R.ellipse(216, 180, 20, 28, { ink: 'B', w: 1.2, fi: 'P', ft: 0.2, rot: 20, wob: 0.4 }); R.circle(198, 176, 7, { ink: 'B', w: 0.9, wob: 0.3 });
    R.text('kidney: DCT and', 176, 218, 3.7, { al: 'l' }); R.text('collecting duct respond', 176, 225, 3.7, { al: 'l' });
    // two cases
    R.line(252, 14, 252, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    const boxes = (x0, ink, head, list) => {
      R.text(head, x0 + 93, 14, 4.1, { al: 'c', ink });
      list.forEach((t, i) => {
        const y = 22 + i * 41; R.rrect(x0, y, 186, 34, 4, { ink: 'B', w: 0.8, fi: i === 4 ? ink : 'Y', ft: i === 4 ? (ink === 'T' ? 0.05 : 0.1) : i === 2 ? 0.2 : 0.09, wob: 0.3 });
        const ls = wrapText(t, 176, 3.9); ls.forEach((ln, j) => R.text(ln, x0 + 93, y + 17 - (ls.length - 1) * 3.6 + 1.4 + j * 7.2, 3.9, { al: 'c' }));
        if (i < 4) R.arrow([x0 + 93, y + 35, x0 + 93, y + 41], { ink: 'B', w: 0.8, hs: 2 });
      });
    };
    boxes(262, 'P', 'blood water potential falls (dehydrated)', ['water potential of the blood falls (e.g. sweating, not drinking)', 'osmoreceptors in the hypothalamus detect it: they lose water by osmosis', 'posterior pituitary releases more ADH into the blood', 'DCT and collecting duct walls more permeable to water (aquaporins)', 'more water reabsorbed: a little concentrated urine; water potential back to normal']);
    boxes(466, 'T', 'blood water potential rises (hydrated)', ['water potential of the blood rises (e.g. drinking a lot)', 'osmoreceptors in the hypothalamus detect it', 'posterior pituitary releases less ADH', 'DCT and collecting duct walls less permeable to water', 'less water reabsorbed: a lot of dilute urine; water potential back to normal']);
  },
  anim(A, sc) {
    const p = A.ph(5); for (let k = 0; k < 3; k++) { const u = (p + k / 3) % 1, seg = u * 3, i = Math.min(2, Math.floor(seg)), t = seg - i; const P = ADH_PATH; A.dot(P[i * 2] + (P[i * 2 + 2] - P[i * 2]) * t, P[i * 2 + 1] + (P[i * 2 + 3] - P[i * 2 + 1]) * t - 5, 2.2, 'T', 0.85, k); }
  },
});

/* ---------- 3.6.4.3c The nephron: structure and function by region (big scene) ---------- */
const NEPH = {
  prox: [100, 118, 118, 126, 104, 138, 124, 146, 110, 158, 134, 164, 152, 154, 168, 168, 176, 190],
  desc: [176, 190, 176, 300, 176, 400, 182, 416, 190, 420],
  asc: [190, 420, 198, 416, 204, 400, 204, 300, 204, 200],
  dct: [204, 200, 220, 186, 236, 198, 252, 176, 272, 186, 288, 160, 306, 150, 340, 150],
  cd: [340, 112, 340, 300, 340, 462],
};
S({
  id: '3.6.4.3c', num: '3.6.4.3', sub: 'The nephron: filtration, reabsorption and the loop of Henle', title: 'Control of blood water potential', topic: '3.6', slot: [0, 10], span: [2, 2], dna: 'mark', ao: 1,
  covers: ['3.6.4.3.s3', '3.6.4.3.s4', '3.6.4.3.s5', '3.6.4.3.s6', '3.6.4.3.s7'],
  card: {
    text: 'Each <b>nephron</b> begins in the <b>cortex</b> with the <b>glomerulus</b> (a knot of capillaries) inside the <b>Bowman’s capsule</b>. High blood pressure forces water and small molecules through the capillary wall, the basement membrane and the capsule lining to form the <b>glomerular filtrate</b>; proteins and blood cells stay in the blood. In the <b>proximal convoluted tubule (PCT)</b> glucose is reabsorbed (and much water). The <b>loop of Henle</b> dips into the <b>medulla</b>: the ascending limb is impermeable to water and actively transports Na⁺ out, maintaining a <b>gradient of sodium ions</b> (low water potential) in the medulla; the descending limb is permeable to water, which leaves by osmosis. The <b>distal convoluted tubule (DCT)</b> and the <b>collecting duct</b> reabsorb water by osmosis, the amount depending on <b>ADH</b>. Urine passes to the ureter.',
    terms: ['nephron', 'glomerulus', 'Bowman’s capsule', 'glomerular filtrate', 'proximal convoluted tubule', 'loop of Henle', 'distal convoluted tubule', 'collecting duct', 'cortex', 'medulla', 'sodium ion gradient'],
    skill: 'AO1/AO2: relate each region’s structure to its function', eq: null,
    q: 'Why does a long loop of Henle help an animal that lives in a desert to produce very concentrated urine?', a: 'A longer loop sets up a steeper sodium ion gradient in the medulla (lower water potential), so more water leaves the collecting duct by osmosis and is reabsorbed.'
  },
  draw(R, sc) {
    // kidney section: cortex and medulla
    R.rrect(8, 22, 414, 466, 46, { ink: 'B', w: 1.6, fi: 'P', ft: 0.05, wob: 0.8 });
    R.fill([10, 200, 420, 200, 420, 60, 380, 28, 50, 28, 10, 60], { ink: 'Y', t: 0.1, wob: 0.3 });
    for (let k = 0; k < 6; k++) R.scatter(215, 228 + k * 42, 190, 18, 22 + k * 18, 0.5, { ink: 'P', t: 0.7 });
    R.line(10, 200, 420, 200, { ink: 'B', w: 0.8, t: 0.7, taper: 'none' }); 
    R.text('cortex', 396, 190, 4.4, { al: 'r' }); R.text('medulla', 396, 216, 4.4, { al: 'r' });
    R.arrow([398, 236, 398, 450], { ink: 'P', w: 1.2, hs: 3.4 }); R.text('Na^+ concentration rises, water potential falls', 408, 340, 3.6, { al: 'c', rot: -90 });
    // blood supply
    R.chain2([10, 60, 40, 70, 62, 80], 5, 'P', 0.55, { smooth: true }); R.text('afferent', 14, 50, 4, { al: 'l' });
    R.chain2([90, 82, 112, 62, 134, 48, 160, 52], 3.2, 'P', 0.35, { smooth: true }); R.text('efferent', 118, 38, 4, { al: 'l' });
    // capsule and glomerulus
    R.circle(76, 96, 28, { ink: 'B', w: 1.4, fi: 'T', ft: 0.1, wob: 0.4 });
    R.circle(76, 96, 18, { ink: 'B', w: 0.9, fi: 'P', ft: 0.45, wob: 0.4 });
    for (let k = 0; k < 4; k++) R.stroke([62 + k * 6, 84, 70 + k * 4, 94, 62 + k * 6, 104, 72 + k * 4, 112], { ink: 'B', w: 0.6, smooth: true, taper: 'both', t: 0.8 });
    // tubules
    R.chain2(NEPH.prox, 8, 'Y', 0.5, { smooth: true }); R.chain2(NEPH.desc, 8, 'T', 0.4, { smooth: true }); R.chain2(NEPH.asc, 8, 'P', 0.38, { smooth: true });
    R.chain2(NEPH.dct, 7, 'Y', 0.4, { smooth: true }); R.chain2(NEPH.cd, 10, 'T', 0.22, { smooth: true });
    // peritubular capillaries and vasa recta
    [[96, 128, 90, 150, 100, 170, 140, 176, 158, 190], [140, 150, 150, 170, 162, 188], [214, 206, 226, 212, 246, 202, 262, 186], [312, 160, 322, 170]].forEach(p => R.stroke(p, { ink: 'P', w: 1.1, smooth: true, taper: 'both', wob: 0.3, t: 0.8 }));
    R.stroke([146, 204, 146, 330, 146, 410, 190, 442, 240, 410, 240, 330, 240, 214], { ink: 'P', w: 1.3, smooth: true, taper: 'both', wob: 0.3, t: 0.8 }); R.text('capillaries', 190, 456, 4, { al: 'c', ink: 'P' });
    // flow arrows
    R.arrow([176, 250, 176, 262], { ink: 'B', w: 1, hs: 3 }); R.arrow([204, 262, 204, 250], { ink: 'B', w: 1, hs: 3 }); R.arrow([340, 380, 340, 392], { ink: 'B', w: 1, hs: 3 });
    R.text('to ureter', 340, 480, 4.2, { al: 'c' });
    // water out of descending limb, Na+ out of ascending, water out of collecting duct
    [240, 300, 360].forEach(y => R.arrow([170, y, 154, y], { ink: 'T', w: 1, hs: 2.4 }));
    [250, 310, 370].forEach(y => R.arrow([210, y, 228, y], { ink: 'P', w: 1, hs: 2.4 }));
    [250, 330, 410].forEach(y => R.arrow([334, y, 316, y], { ink: 'T', w: 1, hs: 2.4 }));
    R.text('H_2O', 150, 234, 3.8, { al: 'r', ink: 'T' }); R.text('Na^+', 232, 304, 3.8, { al: 'l', ink: 'P' }); R.text('H_2O', 312, 332, 3.8, { al: 'r', ink: 'T' });
    // ADH
    tok(R, 300, 112, 'ADH', { r: 6.4, fi: 'T', ft: 0.1, size: 3.6 }); R.arrow([296, 119, 288, 148], { ink: 'B', w: 0.8, hs: 2.4 }); R.arrow([307, 112, 330, 112], { ink: 'B', w: 0.8, hs: 2.4 });
    // number callouts
    [[42, 98], [86, 160], [160, 310], [228, 360], [250, 166], [360, 300]].forEach(([x, y], i) => R.bubble(x, y, 5, String(i + 1), { ft: 0.28 }));
    R.text('glomerulus', 76, 134, 4, { al: 'c' }); R.text('Bowman’s capsule', 80, 141, 4, { al: 'c' });
    // legend list
    R.line(442, 22, 442, 488, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    const items = [
      ['glomerulus and Bowman’s capsule', 'high blood pressure forces water and small molecules out of the blood into the capsule: glomerular filtrate. Proteins and blood cells stay in the blood.'],
      ['proximal convoluted tubule', 'reabsorbs all the glucose, and much of the water, back into the blood. Microvilli give a large surface area.'],
      ['descending limb of the loop of Henle', 'permeable to water: water leaves by osmosis into the medulla, where the water potential is low.'],
      ['ascending limb of the loop of Henle', 'impermeable to water; Na^+ ions are transported out, maintaining the Na^+ gradient in the medulla.'],
      ['distal convoluted tubule', 'water is reabsorbed by osmosis; more when ADH is present.'],
      ['collecting duct', 'water leaves by osmosis down the water potential gradient of the medulla (more with ADH). Urine passes to the ureter.'],
    ];
    let y = 34;
    items.forEach((it, i) => {
      R.bubble(454, y - 1.5, 4.4, String(i + 1), { ft: 0.28 });
      R.text(it[0], 464, y, 4.5, { al: 'l', ink: 'P' });
      const ls = wrapText(it[1], 190, 4.3); ls.forEach((ln, j) => R.text(ln, 464, y + 8.4 + j * 7.2, 4.3, { al: 'l' }));
      y += 14 + ls.length * 7.2 + 8;
    });
    // formation of glomerular filtrate: the three-layer barrier
    R.line(446, 282 - 6, 656, 282 - 6, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('ultrafiltration: the filtration barrier', 548, 288, 4.3, { al: 'c', ink: 'P' });
    R.rect(452, 296, 124, 28, { ink: 'B', w: 0.8, fi: 'P', ft: 0.1, wob: 0.2 });
    R.circle(472, 310, 8, { ink: 'B', w: 0.8, fi: 'P', ft: 0.6 }); R.circle(472, 310, 3, { ink: 'P', w: 0.7 }); R.circle(558, 304, 7.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.6 });
    [[500, 306], [514, 316], [530, 306]].forEach(([x, y]) => R.circle(x, y, 3, { ink: 'B', w: 0.7, fi: 'B', ft: 0.7 }));
    [[492, 316], [524, 300], [544, 318], [504, 298]].forEach(([x, y]) => R.circle(x, y, 1.2, { ink: 'B', w: 0.5, fi: 'Y', ft: 1 }));
    R.line(452, 330, 576, 330, { ink: 'B', w: 1.4, taper: 'none' }); [472, 500, 530, 556].forEach(x => R.rect(x - 3, 328, 6, 4, { ink: '', fi: 'Y', ft: 0.1, w: 0, solid: false }));
    R.rect(452, 334, 124, 7, { ink: 'B', w: 0.8, fi: 'T', ft: 0.3, wob: 0.15 });
    [458, 486, 514, 542, 568].forEach(x => { R.rrect(x - 6, 346, 12, 8, 2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.3, wob: 0.1 }); });
    R.rect(452, 362, 124, 30, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.08, wob: 0.2 });
    [[496, 372], [516, 380], [538, 370], [480, 382]].forEach(([x, y]) => R.circle(x, y, 1.2, { ink: 'B', w: 0.5, fi: 'Y', ft: 1 }));
    [[492, 318, 492, 366], [524, 318, 524, 366], [544, 318, 544, 366]].forEach(p => R.arrow(p, { ink: 'B', w: 0.7, hs: 2.2 }));
    R.text('blood in the glomerulus', 584, 306, 3.8, { al: 'l' }); R.text('capillary endothelium', 584, 331, 3.8, { al: 'l' }); R.text('(pores)', 584, 337, 3.4, { al: 'l' });
    R.text('basement membrane', 584, 345, 3.8, { al: 'l' }); R.text('podocytes (slits)', 584, 354, 3.8, { al: 'l' }); R.text('inside Bowman’s capsule', 584, 380, 3.8, { al: 'l' });
    ['small molecules pass through:', 'water, glucose, ions, urea.', 'blood cells and proteins stay in the blood.'].forEach((t, k) => R.text(t, 452, 408 + k * 7.4, 4, { al: 'l' }));
    R.text('afferent arteriole is wider than the efferent,', 452, 436, 3.9, { al: 'l' }); R.text('so the pressure in the glomerulus is high.', 452, 443.5, 3.9, { al: 'l' });
    R.text('filtrate flows 1 → 6', 552, 484, 4.4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(7), P = [NEPH.prox, NEPH.desc, NEPH.asc, NEPH.dct, NEPH.cd].flatMap(a => a);
    const path = [[100, 118, 176, 190], [176, 190, 176, 400], [190, 420, 204, 400], [204, 400, 204, 200], [204, 200, 340, 150], [340, 112, 340, 460]];
    const lens = path.map(s => Math.hypot(s[2] - s[0], s[3] - s[1])), tot = lens.reduce((a, b) => a + b, 0);
    for (let k = 0; k < 5; k++) { let d = ((p + k / 5) % 1) * tot, i = 0; while (i < 5 && d > lens[i]) { d -= lens[i]; i++; } const s = path[i], u = d / lens[i]; A.dot(s[0] + (s[2] - s[0]) * u, s[1] + (s[3] - s[1]) * u, 2.2, 'P', 0.85, k); }
  },
});

/* ---------- 3.6.4.3d Loop of Henle gradient, ADH at the collecting duct, loop length (big scene) ---------- */
S({
  id: '3.6.4.3d', num: '3.6.4.3', sub: 'Sodium ion gradient, ADH and aquaporins, and loop length', title: 'Control of blood water potential', topic: '3.6', slot: [2, 10], span: [2, 2], dna: 'mark', ao: 2,
  covers: ['3.6.4.3.s5', '3.6.4.3.s6', '3.6.4.3.s7'],
  card: {
    text: 'The <b>loop of Henle</b> maintains a <b>gradient of sodium ions</b> in the medulla: the ascending limb is impermeable to water and actively transports Na⁺ out, so the medulla has a low water potential; the descending limb is permeable to water, which leaves by osmosis. Filtrate then reaches the <b>DCT</b> and <b>collecting duct</b>, where water is reabsorbed by osmosis down the water potential gradient into the medulla and the blood. <b>ADH</b> binds to receptors on the cells of the DCT and collecting duct, and <b>aquaporins</b> are inserted into their membranes, so more water is reabsorbed. Without ADH the walls are far less permeable and dilute urine is produced. Animals with a <b>longer loop of Henle</b> (e.g. those living in dry habitats) set up a steeper gradient and can produce more concentrated urine.',
    terms: ['sodium ion gradient', 'water potential', 'osmosis', 'ADH', 'aquaporin', 'collecting duct', 'loop length', 'concentrated urine'],
    skill: 'AO2 and MS 3.1: relate loop length to urine concentration', eq: null,
    q: 'Predict the effect on urine of a mammal if the ascending limb of its loop of Henle stopped transporting sodium ions out.', a: 'The medulla would no longer have a low water potential, so less water would leave the descending limb and collecting duct; more water would stay in the filtrate and the urine would be less concentrated.'
  },
  draw(R, sc) {
    // ---- A: the gradient, schematic ----
    R.text('the loop of Henle sets up a sodium ion gradient', 164, 16, 4.6, { al: 'c' });
    R.rrect(14, 28, 300, 208, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.05, wob: 0.5 });
    for (let k = 0; k < 7; k++) R.scatter(164, 44 + k * 27, 134, 10, 8 + k * 14, 0.6, { ink: 'P', t: 0.8 });
    R.chain2([96, 34, 96, 200, 104, 218, 116, 218, 124, 200, 124, 34], 9, 'T', 0.2, { smooth: false });
    R.chain2([262, 34, 262, 230], 11, 'T', 0.2, { smooth: false });
    R.arrow([96, 38, 96, 56], { ink: 'B', w: 1, hs: 2.8 }); R.arrow([124, 56, 124, 38], { ink: 'B', w: 1, hs: 2.8 }); R.arrow([262, 38, 262, 56], { ink: 'B', w: 1, hs: 2.8 });
    [120, 150, 180].forEach(y => R.arrow([88, y, 62, y], { ink: 'T', w: 1.2, hs: 3 })); [120, 150, 180].forEach(y => R.arrow([132, y, 158, y], { ink: 'P', w: 1.2, hs: 3 })); [120, 150, 180].forEach(y => R.arrow([254, y, 228, y], { ink: 'T', w: 1.2, hs: 3 }));
    R.arrow([28, 44, 28, 214], { ink: 'P', w: 1.3, hs: 3.4 }); R.text('more Na^+, lower water potential', 22, 130, 3.8, { al: 'c', rot: -90 });
    [['descending limb', 36, 66], ['permeable to water:', 36, 73], ['water leaves by', 36, 80], ['osmosis', 36, 87]].forEach(([t, x, y], i) => R.text(t, x, y, 3.8, { al: 'l', ink: i === 0 ? 'P' : 'B' }));
    [['ascending limb', 134, 66], ['impermeable to water:', 134, 73], ['Na^+ transported out', 134, 80], ['(active transport)', 134, 87]].forEach(([t, x, y], i) => R.text(t, x, y, 3.8, { al: 'l', ink: i === 0 ? 'P' : 'B' }));
    [['collecting duct', 196, 66], ['water leaves by', 196, 73], ['osmosis (more', 196, 80], ['with ADH)', 196, 87]].forEach(([t, x, y], i) => R.text(t, x, y, 3.8, { al: 'l', ink: i === 0 ? 'P' : 'B' }));
    // ---- B: ADH at a collecting-duct cell ----
    R.line(322, 14, 322, 488, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('ADH and a collecting duct cell', 490, 16, 4.6, { al: 'c' });
    const cell = (y0, adh) => {
      const x0 = 336, W = 308;
      R.text(adh ? 'with ADH' : 'little ADH', x0, y0 - 4, 4.4, { al: 'l', ink: adh ? 'P' : 'T' });
      R.rect(x0, y0, W, 16, { ink: 'B', w: 0, fi: 'T', ft: 0.14, solid: false }); R.text('filtrate in the collecting duct', x0 + W / 2, y0 + 10.5, 3.9, { al: 'c' });
      R.rrect(x0, y0 + 18, W, 84, 8, { ink: 'B', w: 1.2, fi: 'P', ft: 0.05, wob: 0.4 });
      R.rect(x0, y0 + 104, W, 16, { ink: 'B', w: 0, fi: 'P', ft: 0.18, solid: false }); R.text('medulla: low water potential', x0 + W / 2, y0 + 114.5, 3.9, { al: 'c' });
      R.ellipse(x0 + 70, y0 + 70, 22, 14, { ink: 'B', w: 0.9, fi: 'B', ft: 0.12, wob: 0.3 });
      if (adh) {
        for (let k = 0; k < 6; k++) { const ax = x0 + 100 + k * 34; R.rrect(ax - 3.4, y0 + 15.5, 2.4, 6, 0.8, { ink: 'B', w: 0.6, fi: 'P', ft: 0.9 }); R.rrect(ax + 1, y0 + 15.5, 2.4, 6, 0.8, { ink: 'B', w: 0.6, fi: 'P', ft: 0.9 }); R.arrow([ax, y0 + 8, ax, y0 + 30], { ink: 'T', w: 1.2, hs: 2.8 }); R.arrow([ax, y0 + 38, ax, y0 + 100], { ink: 'T', w: 1.2, hs: 2.8 }); }
        R.vesicle(x0 + 130, y0 + 60, 7.5, { dots: 3, dink: 'P' }); R.arrow([x0 + 130, y0 + 52, x0 + 130, y0 + 40], { ink: 'B', w: 0.9, hs: 2.4 });
        R.memProtein(x0 + 282, y0 + 102, 0, 'receptor', { gap: 2, s: 0.9 }); tok(R, x0 + 282, y0 + 136, 'ADH', { r: 6, fi: 'T', ft: 0.1, size: 3.4 }); R.arrow([x0 + 282, y0 + 129, x0 + 282, y0 + 118], { ink: 'B', w: 0.9, hs: 2.4 });
        R.text('ADH binds to a receptor;', x0 + 270, y0 + 130, 3.7, { al: 'r' }); R.text('vesicles carry aquaporins', x0 + 270, y0 + 50, 3.7, { al: 'r' });
        R.text('to the membrane', x0 + 270, y0 + 56, 3.7, { al: 'r' });
        R.text('more water leaves by osmosis: small volume of concentrated urine', x0, y0 + 140, 3.9, { al: 'l', ink: 'P' });
      } else {
        R.text('few water channels (aquaporins) in the membrane:', x0 + 170, y0 + 54, 3.9, { al: 'c' }); R.text('little water leaves by osmosis', x0 + 170, y0 + 62, 3.9, { al: 'c' });
        R.text('large volume of dilute urine', x0, y0 + 140, 3.9, { al: 'l', ink: 'T' });
      }
    };
    cell(48, false); cell(236, true);
    // summary chain
    R.line(332, 396, 646, 396, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('negative feedback in the kidney', 490, 410, 4.4, { al: 'c' });
    [['water potential', 'of blood falls'], ['more ADH', 'released'], ['more', 'aquaporins'], ['more water', 'reabsorbed']].forEach((b, i) => { const x = 336 + i * 78; R.rrect(x, 420, 70, 34, 4, { ink: 'B', w: 0.8, fi: i === 3 ? 'T' : 'Y', ft: i === 3 ? 0.08 : 0.14, wob: 0.3 }); b.forEach((t, j) => R.text(t, x + 35, 434 + j * 7, 3.8, { al: 'c' })); if (i < 3) R.arrow([x + 71, 437, x + 77, 437], { ink: 'B', w: 0.8, hs: 2 }); });
    R.text('water potential of the blood rises back towards normal', 490, 470, 3.9, { al: 'c', ink: 'P' });
    // ---- C: loop length and urine concentration ----
    R.line(14, 244, 314, 244, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('different loop lengths, different urine', 164, 258, 4.4, { al: 'c' });
    [[40, 36, 'short', 0.25], [128, 80, 'medium', 0.5], [216, 140, 'long', 0.9]].forEach(([x, L, name, bar]) => {
      R.chain2([x, 270, x, 270 + L, x + 10, 270 + L + 6, x + 20, 270 + L, x + 20, 270], 4.6, 'T', 0.25, { smooth: false });
      R.text(name + ' loop', x + 10, 270 + L + 18, 3.8, { al: 'c' });
      R.rect(x + 34, 456 - bar * 100, 18, bar * 100, { ink: 'B', w: 0.8, fi: 'P', ft: 0.15 + bar * 0.5, wob: 0.15 });
    });
    R.text('maximum urine concentration (relative)', 164, 472, 3.9, { al: 'c' });
    R.line(18, 458, 310, 458, { ink: 'B', w: 0.8, taper: 'none' });
  },
  anim(A, sc) { const p = A.ph(4); for (let k = 0; k < 3; k++) { const u = (p + k / 3) % 1; A.dot(436 + k * 34, 290 + u * 60, 1.8, 'T', 0.9, k); } },
});

/* ---------- 3.6.4.3e Proximal convoluted tubule cell: structure and reabsorption ---------- */
S({
  id: '3.6.4.3e', num: '3.6.4.3', sub: 'Proximal convoluted tubule: reabsorption of glucose and water', title: 'Control of blood water potential', topic: '3.6', slot: [3, 9], dna: 'mark', ao: 2,
  covers: ['3.6.4.3.s5'],
  card: {
    text: 'The wall of the <b>proximal convoluted tubule</b> is a single layer of epithelial cells with <b>microvilli</b> (a large surface area) facing the filtrate and many <b>mitochondria</b> to supply ATP. Sodium ions are actively transported out of the cell into the blood, giving a low Na⁺ concentration inside the cell. Glucose then enters from the filtrate by <b>co-transport</b> with sodium ions and leaves into the blood by facilitated diffusion. The lowered water potential of the cell and blood draws water in by <b>osmosis</b>. All the glucose is normally reabsorbed here, so none appears in the urine.',
    terms: ['proximal convoluted tubule', 'microvilli', 'mitochondria', 'co-transport', 'active transport', 'facilitated diffusion', 'osmosis', 'reabsorption'],
    skill: 'AO2: explain adaptations of a cell to its function', eq: null,
    q: 'Why does the glucose concentration of urine normally stay at zero?', a: 'All the glucose in the filtrate is reabsorbed by co-transport and facilitated diffusion in the proximal convoluted tubule.'
  },
  draw(R, sc) {
    R.text('wall of the proximal convoluted tubule', 160, 14, 4.2, { al: 'c' });
    R.rect(12, 24, 296, 30, { ink: 'B', w: 0, fi: 'Y', ft: 0.12, solid: false }); R.text('filtrate (tubule lumen)', 160, 34, 3.8, { al: 'c' });
    // epithelial cell
    R.rrect(48, 56, 224, 104, 10, { ink: 'B', w: 1.3, fi: 'P', ft: 0.05, wob: 0.5 });
    for (let k = 0; k < 12; k++) { const x = 58 + k * 17.4; R.stroke([x, 56, x, 48, x + 3, 42], { ink: 'B', w: 1.2, taper: 'end', wob: 0.15 }); R.rrect(x - 2, 44, 4, 12, 2, { ink: 'B', w: 0.7, fi: 'P', ft: 0.2, wob: 0.1 }); }
    R.nucleus(172, 118, 24, 18, { pores: 4, chromatin: 12 });
    [[84, 126], [96, 100], [236, 100], [244, 132]].forEach(([x, y]) => R.mito(x, y, 18, 8, 0));
    R.rect(12, 164, 296, 22, { ink: 'B', w: 0, fi: 'P', ft: 0.2, solid: false }); R.text('blood capillary', 18, 178, 3.8, { al: 'l' });
    // membrane proteins
    const bl = R.bilayer([48, 57, 272, 57], { gap: 0, hr: 0.01, sp: 99, tail: 0.1, core: false, noHeads: true });
    // apical co-transporters
    [[88, 57], [150, 57], [212, 57]].forEach(([x]) => { R.memProtein(x, 57, 0, 'carrier', { gap: 2, s: 0.9 }); });
    // basal Na/K pump and glucose carrier
    R.memProtein(104, 160, 0, 'pump', { gap: 2, s: 0.9 }); R.memProtein(206, 160, 0, 'carrier', { gap: 2, s: 0.9 });
    // tokens
    glucTok(R, 88, 38, 3.4); tok(R, 100, 40, 'Na^+', { r: 4.2, fi: 'T', ft: 0.3, size: 3 }); R.arrow([90, 44, 90, 64], { ink: 'B', w: 0.9, hs: 2.4 });
    glucTok(R, 150, 38, 3.4); tok(R, 162, 40, 'Na^+', { r: 4.2, fi: 'T', ft: 0.3, size: 3 }); R.arrow([152, 44, 152, 64], { ink: 'B', w: 0.9, hs: 2.4 });
    R.text('co-transport', 120, 72, 3.6, { al: 'c', ink: 'P' });
    tok(R, 104, 150, 'Na^+', { r: 4.2, fi: 'T', ft: 0.3, size: 3 }); R.arrow([104, 146, 104, 178], { ink: 'P', w: 1, hs: 2.6 }); R.text('Na^+ pumped out', 112, 180, 3.6, { al: 'l' });
    glucTok(R, 206, 148, 3.4); R.arrow([206, 154, 206, 176], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('facilitated diffusion', 214, 180, 3.6, { al: 'l' });
    R.drop(246, 70, 3, { label: false }); R.drop(258, 82, 3, { label: false }); R.arrow([250, 90, 250, 150], { ink: 'T', w: 1, hs: 2.6 }); R.text('H_2O', 264, 118, 3.6, { al: 'l', ink: 'T' });
    leader(R, 'microvilli', 72, 46, 28, 30, { size: 3.8, al: 'l' }); leader(R, 'mitochondria', 96, 100, 40, 90, { size: 3.8, al: 'l' });
    R.line(12, 196, 308, 196, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['large surface area (microvilli); water follows by osmosis', 'many mitochondria: ATP for the Na^+ pumps', 'all glucose reabsorbed: none in the urine'].forEach((t, i) => R.text(t, 160, 208 + i * 9, 3.9, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(4); for (let k = 0; k < 2; k++) { const u = (p + k / 2) % 1; A.dot(88 + k * 62, 38 + u * 100, 1.6, 'Y', 0.95, k); } },
});
