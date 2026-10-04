/* ===================== 3.5.1 (cont.) agriculture; 3.5.2 Respiration ===================== */
/* ---------- 3.5.1d Agricultural practices: evaluating data ---------- */
S({
  id: '3.5.1d', num: '3.5.1', sub: 'Agricultural practices that overcome limiting factors: evaluating data', title: 'Photosynthesis', topic: '3.5', slot: [3, 1], dna: 'mark', ao: 3,
  covers: ['3.5.1.s11'],
  card: {
    text: 'Common agricultural practices overcome the effect of limiting factors: <b>glasshouses</b> or polytunnels with heating (temperature), artificial lighting (light intensity) and <b>carbon dioxide enrichment</b> (e.g. burning paraffin or adding CO₂) allow photosynthesis to continue at a higher rate, giving higher crop yields. Students should <b>evaluate data</b> on these practices: compare yields, check that only one factor was changed and other factors were controlled, and weigh the extra yield against the extra cost (energy, equipment) to see whether the practice is economically worthwhile.',
    terms: ['limiting factor', 'glasshouse', 'artificial light', 'carbon dioxide enrichment', 'heating', 'crop yield', 'cost-benefit', 'evaluate'],
    skill: 'MS 0.3: percentage increase in yield', eq: MATH(mt('% increase '), mo('='), mfrac(mt('new yield − old yield'), mt('old yield')), mo('×'), mn('100')),
    eqn: '(5.6 − 4.1) ÷ 4.1 × 100 ≈ 37 %',
    q: 'A grower adds CO₂ to a glasshouse. Give two things you should check when judging whether it is worthwhile.', a: 'That the extra yield (percentage increase, with replicates and controlled other factors) is worth the extra cost of the CO₂ and its delivery.'
  },
  draw(R, sc) {
    R.text('evaluating agricultural practices (illustrative data)', 160, 14, 4.8, { al: 'c' });
    const g = R.graph(34, 32, 130, 80, { xmin: 0, xmax: 4, ymin: 0, ymax: 8, xl: '', yl: 'tomato yield / kg per plant', xt: [], yt: [[0, '0'], [4, '4'], [8, '8']], fs: 3.7, ylx: 14 }).axes();
    [['ambient', 4.1, 'T'], ['+ CO_2', 5.6, 'P'], ['+ CO_2, light', 6.9, 'Y']].forEach(([n, h, ink], i) => { const x = g.X(i + 0.9); R.rect(x, g.Y(h), 18, g.Y(0) - g.Y(h), { ink: 'B', w: 0.9, fi: ink, ft: 0.6, wob: 0.1 }); g.err(i + 0.9 + 0.35, h, 0.3); R.text(n, x + 9, g.Y(0) + 8, 3.5, { al: 'c' }); R.text(String(h), x + 9, g.Y(h) - 6, 3.6, { al: 'c' }); });
    R.text('conditions in the glasshouse', 99, 128, 3.7, { al: 'c' });
    R.line(182, 22, 182, 140, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('practices', 248, 28, 4.6, { al: 'c' });
    ['heating: warmer for enzymes', 'artificial light: longer days', 'CO_2 enrichment: more substrate', 'fertilisers, water, irrigation'].forEach((t, i) => { R.circle(196, 44 + i * 14, 2, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.8 }); R.text(t, 202, 45.4 + i * 14, 3.9, { al: 'l' }); });
    R.text('all raise the rate of photosynthesis', 248, 108, 3.9, { al: 'c', ink: 'P' }); R.text('only if they overcome the factor', 248, 115, 3.9, { al: 'c' }); R.text('that is actually limiting', 248, 122, 3.9, { al: 'c' });
    R.line(8, 144, 312, 144, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('evaluation checklist', 160, 156, 4.6, { al: 'c' });
    const L = [['yield change', '(5.6 − 4.1) ÷ 4.1 × 100 = 37 %'], ['valid test?', 'only one factor changed, others controlled'], ['reliable?', 'replicates and error bars'], ['cost vs benefit', 'extra income > extra fuel, light, CO_2']];
    L.forEach(([a, b], i) => { const y = 170 + i * 16; R.rrect(18, y - 7, 80, 12, 5, { ink: 'B', w: 0.9, fi: ['Y', 'T', 'P', 'Y'][i], ft: 0.2, wob: 0.15 }); R.text(a, 58, y + 1.4, 4, { al: 'c' }); R.text(b, 106, y + 1.4, 3.9, { al: 'l' }); });
    R.text('ticks in each row → a justified conclusion', 160, 238, 3.8, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.photon(206 + 0, 44 - 0, 0, 0, 0); A.dot(34 + 18 + (p % 1) * 0, 112 - 80 * p * 0.5, 1.3, 'T', 0.7, 1); },
});

/* ---------- 3.5.2a Respiration overview and glycolysis ---------- */
S({
  id: '3.5.2a', num: '3.5.2', sub: 'Respiration produces ATP: glycolysis in the cytoplasm', title: 'Respiration', topic: '3.5', slot: [2, 2], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.5.2.s1', '3.5.2.s2', '3.5.2.s3'],
  card: {
    text: 'Respiration produces <b>ATP</b>. <b>Glycolysis</b> is the first stage of both anaerobic and aerobic respiration. It occurs in the <b>cytoplasm</b> and is an <b>anaerobic</b> process (it needs no oxygen). Stages: (1) <b>phosphorylation</b> of glucose to glucose phosphate (then hexose bisphosphate) using <b>ATP</b>; (2) production of <b>triose phosphate</b>; (3) <b>oxidation</b> of triose phosphate to <b>pyruvate</b>, with a <b>net gain of ATP</b> and <b>reduced NAD</b>. Two ATP are used and four are made (substrate-level phosphorylation), a net gain of two; two reduced NAD are formed per glucose.',
    terms: ['glycolysis', 'cytoplasm', 'phosphorylation', 'glucose phosphate', 'triose phosphate', 'pyruvate', 'reduced NAD', 'net gain of ATP', 'oxidation'],
    skill: 'ATP accounting', eq: MATH(mt('net ATP '), mo('='), mt('4 made'), mo('−'), mt('2 used'), mo('='), mn('2')),
    q: 'Why is glycolysis described as an anaerobic process?', a: 'It does not require oxygen, so it occurs in both aerobic and anaerobic respiration.'
  },
  draw(R, sc) {
    R.text('glycolysis (in the cytoplasm)', 332, 14, 5, { al: 'c' });
    const y = 76, X = [48, 150, 262, 380, 502];
    const hexMol = (x, n, ink) => { R.poly(hexPts(x, y, 14, 0.5), { ink: 'B', w: 1.2, fi: ink, ft: 0.55 }); R.circle(x + 5, y - 5, 2.4, { ink: 'B', w: 0.7, fi: 'T', ft: 0.9 }); R.text('6C', x - 2, y + 2, 5, { al: 'c' }); };
    // glucose
    hexMol(X[0], 6, 'Y'); R.text('glucose', X[0], y + 28, 4.2, { al: 'c' });
    // + ATP -> glucose phosphate (hexose bisphosphate)
    R.arrow([X[0] + 20, y, X[1] - 22, y], { ink: 'B', w: 1.2, hs: 3 });
    R.circle(X[0] + 44, y - 26, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP', X[0] + 44, y - 24.6, 4.2, { al: 'c' }); R.arrow([X[0] + 44, y - 18, X[0] + 44, y - 8], { ink: 'B', w: 0.8, hs: 2 }); R.text('ADP', X[0] + 70, y - 22, 3.8, { al: 'c' });
    R.text('phosphorylation', X[0] + 52, y + 22, 3.9, { al: 'c', ink: 'P' }); R.text('(uses 2 ATP)', X[0] + 52, y + 29, 3.6, { al: 'c' });
    hexMol(X[1], 6, 'P'); [-1, 1].forEach(d => { R.circle(X[1] + d * 16, y + 14, 4.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.9 }); R.text('P', X[1] + d * 16, y + 15.6, 4, { al: 'c' }); }); R.text('hexose bisphosphate', X[1], y + 38, 3.9, { al: 'c' });
    // splitting into two triose phosphate
    R.arrow([X[1] + 24, y, X[2] - 30, y], { ink: 'B', w: 1.2, hs: 3 }); R.text('split', X[1] + 50, y - 8, 3.8, { al: 'c' });
    [-1, 1].forEach(d => { const xx = X[2] + d * 22; R.poly(polyPts(xx, y, 9, 5, -PI / 2), { ink: 'B', w: 1.1, fi: 'TY', ft: 0.5 }); R.text('3C', xx, y + 2, 4, { al: 'c' }); R.circle(xx + 9, y + 10, 3.6, { ink: 'B', w: 0.7, fi: 'P', ft: 0.9 }); R.text('P', xx + 9, y + 11.4, 3.2, { al: 'c' }); });
    R.text('2 triose phosphate', X[2], y + 30, 4.2, { al: 'c' });
    // oxidation to pyruvate
    R.arrow([X[2] + 38, y, X[3] - 30, y], { ink: 'B', w: 1.2, hs: 3 });
    R.text('oxidation', X[2] + 62, y - 20, 3.9, { al: 'c', ink: 'P' });
    R.circle(X[2] + 62, y - 36, 5, { ink: 'B', w: 0.9, fi: 'B', ft: 0.3 }); R.text('NAD', X[2] + 62, y - 34.8, 3.8, { al: 'c' }); R.arrow([X[2] + 62, y - 30, X[2] + 62, y - 24], { ink: 'B', w: 0.8, hs: 1.8 });
    R.text('reduced NAD (×2)', X[2] + 100, y - 36, 3.8, { al: 'l', ink: 'P' });
    R.circle(X[2] + 62, y + 22, 4.6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP (×4)', X[2] + 70, y + 24, 3.8, { al: 'l' });
    [-1, 1].forEach(d => { const xx = X[3] + d * 22; R.poly(polyPts(xx, y, 9, 5, -PI / 2), { ink: 'B', w: 1.1, fi: 'Y', ft: 0.6 }); R.text('3C', xx, y + 2, 4, { al: 'c' }); });
    R.text('2 pyruvate', X[3], y + 30, 4.2, { al: 'c' });
    // fate arrows
    R.arrow([X[3] + 40, y - 6, X[4] - 10, y - 24], { ink: 'T', w: 1.1, hs: 3 }); R.text('oxygen present: mitochondrion', X[4] + 30, y - 32, 3.9, { al: 'c', ink: 'T' });
    R.arrow([X[3] + 40, y + 6, X[4] - 10, y + 24], { ink: 'P', w: 1.1, hs: 3 }); R.text('no oxygen: lactate or ethanol', X[4] + 30, y + 40, 3.9, { al: 'c', ink: 'P' });
    R.line(8, 136, 656, 136, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // accounting table
    R.text('ATP and reduced NAD accounting per glucose', 160, 148, 4.4, { al: 'c' });
    R.table(24, 156, [120, 70, 70], 12, [['stage', 'ATP', 'reduced NAD'], ['phosphorylation of glucose', '− 2', '0'], ['oxidation of triose phosphate', '+ 4', '+ 2'], ['net', '+ 2', '+ 2']], { size: 4.2, hink: 'Y' });
    R.line(332, 142, 332, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('key points', 490, 148, 4.4, { al: 'c' });
    ['occurs in the cytoplasm', 'needs no oxygen: an anaerobic process', 'the first stage of anaerobic and', 'of aerobic respiration', 'ATP is made by substrate-level', 'phosphorylation'].forEach((t, i) => R.text(t, 490, 164 + i * 9, 4, { al: 'c' }));
  },
  anim(A, sc) { const p = A.ph(6); A.dot(48 + p * 70, 76, 3, 'Y', 0.9, 1); A.dot(262 + p * 100, 76, 2.4, 'Y', 0.9, 2); A.dot(324 + (p % 0.5) * 20, 40, 2, 'P', 0.8, 3); },
});

/* ---------- 3.5.2b Anaerobic respiration ---------- */
S({
  id: '3.5.2b', num: '3.5.2', sub: 'Anaerobic respiration: lactate and ethanol; regenerating NAD', title: 'Respiration', topic: '3.5', slot: [0, 3], dna: 'mark', ao: 2,
  covers: ['3.5.2.s4'],
  card: {
    text: 'If respiration is only <b>anaerobic</b>, pyruvate can be converted to <b>lactate</b> (in animals) or <b>ethanol</b> (in yeast and plants) using <b>reduced NAD</b>. The <b>oxidised NAD</b> produced in this way can be used in further <b>glycolysis</b>, so glycolysis (and its small yield of ATP) can continue without oxygen. In the ethanol pathway pyruvate loses CO₂ (becoming ethanal), which then accepts hydrogen from reduced NAD to form ethanol.',
    terms: ['anaerobic respiration', 'lactate', 'ethanol', 'reduced NAD', 'oxidised NAD', 'glycolysis', 'fermentation', 'pyruvate'],
    skill: 'Identify products', eq: null,
    q: 'Why does anaerobic respiration convert pyruvate to lactate or ethanol?', a: 'It uses reduced NAD to regenerate NAD, which is needed for glycolysis to continue and produce a little ATP.'
  },
  draw(R, sc) {
    R.text('without oxygen: glycolysis must keep going', 160, 14, 4.6, { al: 'c' });
    R.rrect(14, 24, 292, 20, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.2, wob: 0.2 }); R.text('glucose → glycolysis → pyruvate  (net 2 ATP, 2 reduced NAD)', 160, 36.4, 4.2, { al: 'c' });
    R.arrow([88, 46, 62, 70], { ink: 'B', w: 1.1, hs: 3 }); R.arrow([232, 46, 258, 70], { ink: 'B', w: 1.1, hs: 3 });
    // animals: lactate
    R.text('animals', 62, 76, 4.6, { al: 'c' });
    R.poly(polyPts(36, 100, 9, 5, -PI / 2), { ink: 'B', w: 1.1, fi: 'Y', ft: 0.6 }); R.text('3C', 36, 102, 4, { al: 'c' }); R.text('pyruvate', 36, 120, 3.9, { al: 'c' });
    R.arrow([48, 100, 84, 100], { ink: 'P', w: 1.2, hs: 3 }); R.poly(polyPts(104, 100, 9, 5, -PI / 2), { ink: 'B', w: 1.1, fi: 'P', ft: 0.5 }); R.text('3C', 104, 102, 4, { al: 'c' }); R.text('lactate', 104, 120, 3.9, { al: 'c', ink: 'P' });
    // yeast: ethanol
    R.text('yeast and plants', 252, 76, 4.6, { al: 'c' });
    R.poly(polyPts(196, 100, 9, 5, -PI / 2), { ink: 'B', w: 1.1, fi: 'Y', ft: 0.6 }); R.text('3C', 196, 102, 4, { al: 'c' }); R.text('pyruvate', 196, 120, 3.9, { al: 'c' });
    R.arrow([208, 100, 232, 100], { ink: 'B', w: 1, hs: 2.6 }); R.poly(polyPts(248, 100, 8, 4, -PI / 2), { ink: 'B', w: 1.1, fi: 'TY', ft: 0.6 }); R.text('2C', 248, 102, 3.8, { al: 'c' }); R.text('ethanal', 248, 120, 3.8, { al: 'c' });
    R.text('CO_2', 232, 84, 4, { al: 'c' }); R.arrow([240, 88, 240, 94], { ink: 'B', w: 0.8, hs: 1.8 });
    R.arrow([260, 100, 284, 100], { ink: 'P', w: 1.2, hs: 3 }); R.poly(polyPts(300, 100, 8, 4, -PI / 2), { ink: 'B', w: 1.1, fi: 'P', ft: 0.5 }); R.text('2C', 300, 102, 3.8, { al: 'c' }); R.text('ethanol', 300, 120, 3.9, { al: 'c', ink: 'P' });
    // NAD cycling
    R.text('reduced NAD', 70, 142, 4.2, { al: 'c', ink: 'P' }); R.arrow([70, 146, 70, 158], { ink: 'P', w: 1, hs: 2.4 }); R.circle(70, 166, 6, { ink: 'B', w: 0.9, fi: 'B', ft: 0.3 }); R.text('NAD', 70, 167.4, 4.4, { al: 'c' });
    R.text('reduced NAD', 270, 142, 4.2, { al: 'c', ink: 'P' }); R.arrow([270, 146, 270, 158], { ink: 'P', w: 1, hs: 2.4 }); R.circle(270, 166, 6, { ink: 'B', w: 0.9, fi: 'B', ft: 0.3 }); R.text('NAD', 270, 167.4, 4.4, { al: 'c' });
    R.arrow([60, 172, 20, 150, 20, 60, 14, 38], { ink: 'B', w: 1.2, hs: 3, smooth: true }); R.arrow([280, 172, 308, 150, 308, 60, 306, 40], { ink: 'B', w: 1.2, hs: 3, smooth: true });
    R.text('NAD', 20, 100, 3.8, { al: 'l', rot: -90 });
    R.text('back to glycolysis', 70, 186, 3.9, { al: 'c' }); R.text('back to glycolysis', 270, 186, 3.9, { al: 'c' });
    R.text('oxidised NAD is used again in glycolysis', 160, 206, 4.2, { al: 'c', ink: 'P' });
    R.text('so glycolysis continues without oxygen', 160, 216, 4, { al: 'c' }); R.text('(a small amount of ATP is still made)', 160, 224, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(48 + p * 36, 100, 1.5, 'P', 0.9, 1); A.dot(260 + p * 24, 100, 1.5, 'P', 0.9, 2); A.dot(80 + p * 160, 176 + Math.sin(p * PI) * 14, 2.4, 'B', 0.8, 3); },
});

/* ---------- 3.5.2c Link reaction and Krebs cycle ---------- */
S({
  id: '3.5.2c', num: '3.5.2', sub: 'Aerobic respiration in the mitochondrial matrix: link reaction and Krebs cycle', title: 'Respiration', topic: '3.5', slot: [1, 3], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.5.2.s5', '3.5.2.s6', '3.5.2.s7', '3.5.2.s8'],
  card: {
    text: 'If respiration is <b>aerobic</b>, pyruvate from glycolysis enters the mitochondrial matrix by <b>active transport</b>. In the <b>link reaction</b> pyruvate is oxidised to <b>acetate</b>, producing <b>reduced NAD</b> (and CO₂); acetate combines with <b>coenzyme A</b> to form <b>acetylcoenzyme A</b>. In the <b>Krebs cycle</b> acetylcoenzyme A reacts with a <b>four-carbon</b> molecule, releasing coenzyme A and producing a <b>six-carbon</b> molecule. In a series of oxidation–reduction reactions the cycle generates <b>reduced coenzymes</b> (reduced NAD and reduced FAD) and <b>ATP by substrate-level phosphorylation</b>, and <b>carbon dioxide</b> is lost.',
    terms: ['mitochondrial matrix', 'active transport', 'link reaction', 'acetate', 'coenzyme A', 'acetylcoenzyme A', 'Krebs cycle', 'reduced NAD', 'reduced FAD', 'substrate-level phosphorylation', 'carbon dioxide'],
    skill: 'Count carbons through the cycle', eq: null,
    q: 'Where is carbon dioxide released in aerobic respiration?', a: 'In the link reaction and in the Krebs cycle (decarboxylation steps).'
  },
  draw(R, sc) {
    R.text('inside the mitochondrial matrix', 332, 14, 5, { al: 'c' });
    // mitochondrion outline (matrix)
    R.rrect(8, 22, 648, 216, 40, { ink: 'B', w: 1.4, fi: 'PY', ft: 0.1, wob: 0.5 });
    // pyruvate entering by active transport (carrier on the membrane)
    R.knock(R.rrectPts(8, 100, 14, 34, 3)); R.rrect(5, 104, 16, 26, 3, { ink: 'B', w: 1, fi: 'P', ft: 0.8, wob: 0.1 });
    R.poly(polyPts(-4, 118, 0.01, 3), { ink: 'B' });
    R.poly(polyPts(32, 118, 9, 5, -PI / 2), { ink: 'B', w: 1.1, fi: 'Y', ft: 0.6 }); R.text('3C', 32, 120, 4, { al: 'c' }); R.text('pyruvate', 34, 134, 3.8, { al: 'c' });
    R.arrow([16, 118, 24, 118], { ink: 'P', w: 1, hs: 2.4 }); R.text('active transport', 36, 80, 3.8, { al: 'c', ink: 'P' }); R.arrow([36, 84, 22, 108], { ink: 'P', w: 0.8, hs: 2 });
    R.arrow([48, 118, 104, 118], { ink: 'B', w: 1.2, hs: 3 }); R.text('link reaction', 76, 106, 4.2, { al: 'c' });
    R.arrow([70, 114, 70, 92], { ink: 'B', w: 0.9, hs: 2.4 }); R.circle(70, 86, 4.6, { ink: 'B', w: 0.9, fi: 'T', ft: 0.75 }); R.text('CO_2', 70, 76, 3.8, { al: 'c' });
    R.circle(62, 156, 5.4, { ink: 'B', w: 0.9, fi: 'B', ft: 0.3 }); R.text('NAD', 62, 157.4, 3.6, { al: 'c' }); R.arrow([62, 150, 62, 124], { ink: 'B', w: 0.8, hs: 2 });
    R.arrow([88, 124, 88, 146], { ink: 'P', w: 0.9, hs: 2.4 }); R.text('reduced', 100, 152, 3.7, { al: 'c', ink: 'P' }); R.text('NAD', 100, 158, 3.7, { al: 'c', ink: 'P' });
    R.poly(polyPts(124, 118, 8, 4, -PI / 4), { ink: 'B', w: 1.1, fi: 'TY', ft: 0.6 }); R.text('2C', 124, 120, 4, { al: 'c' }); R.text('acetate', 124, 138, 3.8, { al: 'c' });
    R.text('+ coenzyme A', 128, 100, 3.6, { al: 'c' }); R.arrow([136, 118, 160, 118], { ink: 'B', w: 1, hs: 2.6 });
    R.rrect(162, 108, 60, 20, 8, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.5, wob: 0.15 }); R.text('acetyl-CoA', 192, 121, 4.2, { al: 'c' }); R.text('(2C)', 192, 134, 3.6, { al: 'c' });
    // Krebs cycle ring
    const kx = 380, ky = 130, kr = 78;
    const ring = []; for (let i = 0; i <= 40; i++) { const a = -PI / 2 + i * TAU / 40; ring.push(kx + Math.cos(a) * kr, ky + Math.sin(a) * kr * 0.9); }
    R.stroke(ring, { ink: 'T', w: 8, t: 0.3, smooth: true, taper: 'none', solid: false }); R.stroke(ring, { ink: 'B', w: 1.2, smooth: true, taper: 'none' });
    const nd = (a, w, h, t, ink) => { const x = kx + Math.cos(rad(a)) * kr, y = ky + Math.sin(rad(a)) * kr * 0.9; R.knock(R.rrectPts(x - w / 2, y - h / 2, w, h, 6)); R.rrect(x - w / 2, y - h / 2, w, h, 6, { ink: 'B', w: 1, fi: ink, ft: 0.2, wob: 0.15 }); R.text(t, x, y + 1.6, 4.2, { al: 'c' }); return [x, y]; };
    const n4 = nd(150, 40, 16, '4C', 'Y'), n6 = nd(-90, 40, 16, '6C', 'P'), n5 = nd(30, 40, 16, '5C', 'TY'), n4b = nd(90, 40, 16, '4C', 'Y');
    for (let k = 0; k < 4; k++) { const a = -PI / 2 + (k * 0.5 + 0.28) * PI + 0.2; const x = kx + Math.cos(a) * kr, y = ky + Math.sin(a) * kr * 0.9, tx = -Math.sin(a) * kr, ty = Math.cos(a) * kr * 0.9, tl = Math.hypot(tx, ty); R.arrow([x - tx / tl * 7, y - ty / tl * 7, x + tx / tl * 7, y + ty / tl * 7], { ink: 'B', w: 1.5, hs: 6 }); }
    R.arrow([224, 128, n4[0] - 22, n4[1] - 4], { ink: 'B', w: 1.2, hs: 3 }); R.text('acetyl-CoA joins a 4C', 270, 176, 3.8, { al: 'c' }); R.text('molecule → 6C', 270, 183, 3.8, { al: 'c' });
    R.arrow([n6[0] - 8, n6[1] - 12, n6[0] - 8, n6[1] - 26], { ink: 'P', w: 1, hs: 2.4 }); R.text('CoA released', n6[0] - 14, n6[1] - 30, 3.7, { al: 'r' }); R.arrow([n6[0] - 8, n6[1] - 12, n6[0] - 8, n6[1] - 12], { ink: 'B', w: 0.001, hs: 0.1 });
    R.text('Krebs cycle', kx, ky + 2, 5, { al: 'c' });
    // products
    const prod = (x, y, t, ink, a, b) => { R.arrow([x, y, x + a, y + b], { ink: 'B', w: 1, hs: 2.6 }); R.text(t, x + a + (a > 0 ? 4 : -4), y + b + 1.4, 3.9, { al: a > 0 ? 'l' : 'r', ink }); };
    prod(kx + 56, ky - 46, 'CO_2', 'B', 26, -14); prod(kx + 72, ky - 8, 'CO_2 and reduced NAD', 'P', 28, 4); prod(kx + 56, ky + 56, 'ATP (substrate-level)', 'P', 26, 12);
    prod(kx - 66, ky + 56, 'reduced NAD, reduced FAD', 'P', -22, 14);
    R.text('oxidation–reduction reactions', kx, 232, 3.9, { al: 'c' });
    // right side summary
    R.line(528, 36, 528, 222, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('products go to the next stage', 590, 40, 4.2, { al: 'c' });
    ['reduced NAD', 'reduced FAD', '→ electron transfer chain', '(oxidative phosphorylation)', '', 'ATP: substrate-level', 'phosphorylation', '', 'CO_2 is lost as waste'].forEach((t, i) => { if (t) R.text(t, 590, 58 + i * 9, 3.9, { al: 'c', ink: i < 2 || i === 5 ? 'P' : 'B' }); });
  },
  anim(A, sc) { const p = A.ph(8); for (let k = 0; k < 6; k++) { const a = -PI / 2 + ((p + k / 6) % 1) * TAU; A.dot(380 + Math.cos(a) * 78, 130 + Math.sin(a) * 70, 2.2, 'Y', 0.95, k); } A.dot(48 + p * 56, 118, 1.8, 'Y', 0.9, 8); },
});

/* ---------- 3.5.2d Oxidative phosphorylation and other respiratory substrates ---------- */
S({
  id: '3.5.2d', num: '3.5.2', sub: 'Oxidative phosphorylation: electron transfer chain and ATP synthase; other respiratory substrates', title: 'Respiration', topic: '3.5', slot: [3, 3], dna: 'bio', ao: 2,
  covers: ['3.5.2.s9', '3.5.2.s10'],
  card: {
    text: 'Synthesis of ATP by <b>oxidative phosphorylation</b> is associated with the transfer of electrons down the <b>electron transfer chain</b> (on the inner mitochondrial membrane) and the passage of protons across the inner mitochondrial membrane; it is catalysed by <b>ATP synthase</b> (chemiosmotic theory). Reduced coenzymes supply electrons; the energy released pumps protons into the intermembrane space; protons flow back through ATP synthase into the matrix. At the end of the chain electrons, protons and <b>oxygen</b> combine to form water. Other respiratory substrates: breakdown products of <b>lipids</b> and <b>amino acids</b> can enter the Krebs cycle.',
    terms: ['oxidative phosphorylation', 'electron transfer chain', 'inner mitochondrial membrane', 'ATP synthase', 'chemiosmotic theory', 'oxygen', 'water', 'lipids', 'amino acids'],
    skill: 'Trace electrons and protons', eq: null,
    q: 'What is the role of oxygen in aerobic respiration?', a: 'It is the final electron acceptor at the end of the electron transfer chain, combining with electrons and protons to form water.'
  },
  draw(R, sc) {
    R.text('oxidative phosphorylation', 160, 14, 4.8, { al: 'c' });
    const ym = 96;
    R.fill([8, 22, 312, 22, 312, ym - 8, 8, ym - 8], { ink: 'P', t: 0.07, wob: 0.3 }); R.fill([8, ym + 8, 312, ym + 8, 312, 168, 8, 168], { ink: 'Y', t: 0.12, wob: 0.3 });
    R.bilayer([8, ym, 312, ym], { gap: 8, hr: 2.4, sp: 5.2, tail: 3.6 });
    R.text('intermembrane space', 14, 32, 3.8, { al: 'l' }); R.text('matrix', 14, 160, 3.8, { al: 'l' });
    const slot = (x, w) => R.knock([x - w / 2, ym - 13, x + w / 2, ym - 13, x + w / 2, ym + 13, x - w / 2, ym + 13]);
    [60, 100, 140].forEach(x => { slot(x, 26); R.rrect(x - 10, ym - 12, 20, 24, 5, { ink: 'B', w: 1, fi: 'P', ft: 0.6, wob: 0.15 }); });
    R.text('electron transfer chain', 100, ym + 26, 3.7, { al: 'c' });
    // electrons from reduced NAD/FAD
    R.text('reduced NAD,', 24, ym + 52, 3.7, { al: 'c', ink: 'P' }); R.text('reduced FAD', 24, ym + 58, 3.7, { al: 'c', ink: 'P' }); R.arrow([24, ym + 44, 50, ym + 14], { ink: 'P', w: 1, hs: 2.6 });
    R.stroke([60, ym - 16, 100, ym - 22, 140, ym - 16, 164, ym - 8], { ink: 'Y', w: 1.4, smooth: true, taper: 'end' }); R.text('e^-', 100, ym - 28, 3.8, { al: 'c' });
    [60, 100].forEach(x => R.arrow([x, ym + 14, x, ym - 36], { ink: 'P', w: 1.1, hs: 2.6 }));
    R.text('H^+ pumped out', 80, 44, 3.7, { al: 'c', ink: 'P' });
    // O2 + H+ + e- -> H2O at the end
    R.text('O_2 + H^+ + e^- → H_2O', 150, ym + 58, 3.8, { al: 'c' }); R.drop(166, ym + 40, 4.4, { label: 'H_2O' }); R.arrow([150, ym + 14, 160, ym + 32], { ink: 'B', w: 0.9, hs: 2.4 });
    // ATP synthase
    slot(246, 32); R.atpSynthase(246, ym, 1.2, { dir: 1 });
    [196, 216, 276, 296].forEach((x, i) => R.text('H^+', x, 40 + (i % 2) * 8, 3.8, { al: 'c', ink: 'P' }));
    R.arrow([246, 50, 246, ym - 12], { ink: 'P', w: 1.3, hs: 3 }); R.text('H^+ flow back', 276, 66, 3.8, { al: 'c', ink: 'P' }); R.text('ATP synthase', 276, 72, 3.8, { al: 'c', ink: 'P' });
    R.circle(246, ym + 56, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP', 246, ym + 57.4, 3.6, { al: 'c' }); R.text('ADP + P_i', 282, ym + 56, 3.7, { al: 'l' }); R.arrow([262, ym + 56, 256, ym + 56], { ink: 'B', w: 0.001, hs: 0.1 });
    R.line(8, 170, 312, 170, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // other substrates
    R.text('other respiratory substrates enter the Krebs cycle', 160, 182, 4.2, { al: 'c' });
    R.rrect(112, 196, 96, 20, 8, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.3, wob: 0.2 }); R.text('Krebs cycle', 160, 209, 4.4, { al: 'c' });
    [['lipids', 'breakdown products', 40, 'Y'], ['amino acids', 'breakdown products', 280, 'P']].forEach(([a, b, x, ink]) => { R.rrect(x - 36, 196, 72, 20, 8, { ink: 'B', w: 1, fi: ink, ft: 0.3, wob: 0.2 }); R.text(a, x, 206, 4.2, { al: 'c' }); R.text(b, x, 224, 3.4, { al: 'c' }); R.arrow([x + (x < 160 ? 38 : -38), 206, x < 160 ? 108 : 212, 206], { ink: 'B', w: 1, hs: 2.6 }); });
    R.text('carbohydrate (glucose) via glycolysis', 160, 232, 3.7, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.electron(60 + u * 100, 80 - Math.sin(u * PI) * 4, i); A.ion(246, 50 + u * 38, 'H^+', 'P', 3, 5 + i); } },
});
