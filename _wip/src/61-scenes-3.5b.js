/* ===================== 3.5.1 (cont.): Calvin cycle, limiting factors; RP7, RP8 ===================== */
/* carbon skeleton: a row of n carbon discs */
function cRow(R, x, y, n, ink, r = 3.4, o = {}) { for (let i = 0; i < n; i++) R.circle(x + i * (r * 2 + 0.6), y, r, { ink: 'B', w: 0.8, fi: ink, ft: 0.75, wob: 0.1 }); if (o.label) R.text(o.label, x + (n - 1) * (r + 0.3), y + (o.dy || 11), o.size || 3.8, { al: 'c' }); }

/* ---------- 3.5.1b Light-independent reaction: the Calvin cycle ---------- */
S({
  id: '3.5.1b', num: '3.5.1', sub: 'Photosynthesis: the light-independent reaction (Calvin cycle)', title: 'Photosynthesis', topic: '3.5', slot: [0, 1], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.5.1.s6', '3.5.1.s7', '3.5.1.s8', '3.5.1.s9'],
  card: {
    text: 'The <b>light-independent reaction</b> (in the stroma) uses <b>reduced NADP</b> and <b>ATP</b> from the light-dependent reaction to form a simple sugar; the <b>hydrolysis of ATP</b> provides additional energy. In the <b>Calvin cycle</b>: carbon dioxide reacts with <b>ribulose bisphosphate (RuBP)</b> to form two molecules of <b>glycerate 3-phosphate (GP)**, catalysed by the enzyme <b>rubisco</b>. ATP and reduced NADP reduce GP to <b>triose phosphate</b>. Some triose phosphate is used to regenerate RuBP; some is converted to useful organic substances (e.g. glucose, amino acids, lipids).'.replace('**', ''),
    terms: ['light-independent reaction', 'Calvin cycle', 'ribulose bisphosphate (RuBP)', 'rubisco', 'glycerate 3-phosphate (GP)', 'triose phosphate', 'reduced NADP', 'ATP', 'stroma'],
    skill: 'Follow a cycle', eq: null,
    q: 'Where do the ATP and reduced NADP used in the Calvin cycle come from, and what happens to them?', a: 'From the light-dependent reaction. ATP provides energy and reduced NADP provides hydrogen to reduce GP to triose phosphate; they return as ADP + Pi and NADP.'
  },
  draw(R, sc) {
    R.text('the Calvin cycle (in the stroma)', 330, 14, 5, { al: 'c' });
    const cx = 232, cy = 128, rx = 150, ry = 78, P = a => [cx + Math.cos(rad(a)) * rx, cy + Math.sin(rad(a)) * ry];
    const ringPts = (a0, a1) => { const p = [], n = Math.max(6, Math.round(Math.abs(a1 - a0) / 4)); for (let i = 0; i <= n; i++) p.push(...P(a0 + (a1 - a0) * i / n)); return p; };
    const ringArrow = (a0, a1, ink = 'B') => { const p = ringPts(a0, a1); R.stroke(ringPts(a0, a1 - 2), { ink: 'T', w: 7, t: 0.3, smooth: true, taper: 'none', solid: false }); R.arrow(p, { ink, w: 1.5, hs: 5.2 }); };
    // nodes
    const node = (a, w, h, title, ink) => { const [x, y] = P(a); R.knock(R.rrectPts(x - w / 2, y - h / 2, w, h, 7)); R.rrect(x - w / 2, y - h / 2, w, h, 7, { ink: 'B', w: 1.1, fi: ink, ft: 0.16, wob: 0.2 }); R.text(title, x, y - h / 2 + 8.6, 4.2, { al: 'c' }); return [x, y]; };
    const aR = 190, aG = 300, aT = 56;
    const rp = node(aR, 96, 38, 'RuBP (5C)', 'Y'); cRow(R, rp[0] - 23, rp[1] + 7, 5, 'TY', 3.3);
    const gp = node(aG, 112, 42, 'GP: 2 molecules', 'P'); cRow(R, gp[0] - 40, gp[1] + 6, 3, 'TY', 3.3); cRow(R, gp[0] + 6, gp[1] + 6, 3, 'TY', 3.3); R.text('3C each', gp[0], gp[1] + 18, 3.3, { al: 'c' });
    const tp = node(aT, 122, 42, 'triose phosphate', 'Y'); cRow(R, tp[0] - 40, tp[1] + 6, 3, 'TY', 3.3); cRow(R, tp[0] + 6, tp[1] + 6, 3, 'TY', 3.3); R.text('3C each', tp[0], tp[1] + 18, 3.3, { al: 'c' });
    ringArrow(218, 268); ringArrow(334, 384); ringArrow(98, 160);
    // CO2 joining RuBP -> GP
    const c1 = P(242); R.circle(c1[0] - 46, c1[1] - 30, 3.4, { ink: 'B', w: 0.8, fi: 'T', ft: 0.75 }); R.text('CO_2', c1[0] - 46, c1[1] - 39, 4.2, { al: 'c' }); R.arrow([c1[0] - 42, c1[1] - 27, c1[0] - 4, c1[1] - 4], { ink: 'B', w: 1.1, hs: 2.8 });
    R.text('rubisco', c1[0] + 16, c1[1] + 14, 4, { al: 'l', ink: 'P' }); R.text('(enzyme)', c1[0] + 16, c1[1] + 20, 3.4, { al: 'l' });
    // reduction (GP -> TP)
    const c2 = P(358); R.text('reduction of GP', c2[0] + 36, c2[1] + 6, 4, { al: 'l' });
    R.arrow([c2[0] + 70, c2[1] - 20, c2[0] + 20, c2[1] - 6], { ink: 'Y', w: 1.2, hs: 3 }); R.text('ATP +', c2[0] + 76, c2[1] - 28, 3.9, { al: 'l' }); R.text('reduced NADP', c2[0] + 76, c2[1] - 21, 3.9, { al: 'l' });
    R.arrow([c2[0] + 20, c2[1] + 10, c2[0] + 70, c2[1] + 28], { ink: 'B', w: 1.1, hs: 2.8 }); R.text('ADP + P_i', c2[0] + 76, c2[1] + 30, 3.9, { al: 'l' }); R.text('NADP', c2[0] + 76, c2[1] + 37, 3.9, { al: 'l' });
    // regeneration (TP -> RuBP)
    const c3 = P(130); R.text('some triose phosphate', c3[0] - 20, c3[1] + 24, 3.9, { al: 'c' }); R.text('regenerates RuBP (ATP)', c3[0] - 20, c3[1] + 31, 3.9, { al: 'c' });
    // outputs
    R.arrow([tp[0] + 62, tp[1], tp[0] + 108, tp[1] + 6], { ink: 'P', w: 1.3, hs: 3 });
    R.text('the rest is converted to', tp[0] + 112, tp[1] - 6, 3.8, { al: 'l' }); R.text('useful organic substances', tp[0] + 112, tp[1] + 1, 3.8, { al: 'l' });
    [['glucose', 'Y'], ['amino acids', 'P'], ['lipids', 'TY']].forEach(([t, ink], i) => { R.poly(hexPts(tp[0] + 118, tp[1] + 16 + i * 12, 4.4), { ink: 'B', w: 0.8, fi: ink, ft: 0.65 }); R.text(t, tp[0] + 128, tp[1] + 17.4 + i * 12, 3.7, { al: 'l' }); });
    // right panel
    R.line(540, 22, 540, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('inputs and outputs', 598, 28, 4.6, { al: 'c' });
    ['in: CO_2, ATP, reduced NADP', 'out: ADP + P_i, NADP', '(returned to the light-', 'dependent reaction)', '', 'RuBP is regenerated,', 'so the cycle continues', '', 'rubisco joins CO_2', 'to RuBP: 2 × GP'].forEach((t, i) => { if (t) R.text(t, 598, 46 + i * 9, 3.9, { al: 'c', ink: i > 7 ? 'P' : 'B' }); });
  },
  anim(A, sc) { const p = A.ph(8); for (let k = 0; k < 6; k++) { const a = -PI / 2 + ((p + k / 6) % 1) * TAU; A.dot(232 + Math.cos(a) * 150, 128 + Math.sin(a) * 78, 2.2, 'Y', 0.95, k); } },
});

/* ---------- 3.5.1c Limiting factors ---------- */
S({
  id: '3.5.1c', num: '3.5.1', sub: 'Environmental factors limiting the rate of photosynthesis', title: 'Photosynthesis', topic: '3.5', slot: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.5.1.s10'],
  card: {
    text: 'The rate of photosynthesis is limited by the factor in shortest supply. <b>Light intensity</b>: ATP and reduced NADP production increase with light, so the rate rises until another factor limits it. <b>Carbon dioxide concentration</b>: more CO₂ lets the light-independent reaction go faster. <b>Temperature</b>: the enzymes (such as rubisco) work faster to an optimum, then denature. Water is also needed but is rarely limiting in experiments. At a given point a graph that levels off means a different factor now limits the rate. Chlorophyll concentration and mineral ions (e.g. magnesium) can also limit.',
    terms: ['limiting factor', 'light intensity', 'carbon dioxide concentration', 'temperature', 'optimum', 'enzyme', 'rate of photosynthesis'],
    skill: 'MS 1.3: read plateaux', eq: null,
    q: 'On a graph, the rate stops rising as light intensity increases. What does this tell you?', a: 'Light is no longer limiting; another factor (CO₂, temperature, or chlorophyll) is now limiting the rate.'
  },
  draw(R, sc) {
    R.text('limiting factors', 160, 14, 5, { al: 'c' });
    const gr = (x, y, xl, f, lbl, o = {}) => { const g = R.graph(x, y, 82, 58, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl, yl: 'rate', xt: [], yt: [], fs: 3.4, xly: 9, ylx: 4 }).axes(); g.curve(f, { ink: o.ink || 'P', w: 1.5 }); return g; };
    const g1 = gr(26, 34, 'light intensity', x => 9.2 * (1 - Math.exp(-x / 2.4)));
    g1.dashed(4.5, 0, 4.5, 8, { ink: 'B', w: 0.6 }); R.text('light limiting', g1.X(2.2), g1.Y(2.5), 3.6, { al: 'c' }); R.text('another factor limiting', g1.X(8), g1.Y(8.6) - 10, 3.5, { al: 'r' });
    const g2 = gr(134, 34, 'CO_2 concentration', x => 9.2 * (1 - Math.exp(-x / 2.8)), '', { ink: 'T' });
    R.text('CO_2 limiting', g2.X(2.4), g2.Y(2.5), 3.6, { al: 'c' });
    const g3 = gr(242, 34, 'temperature', x => (x < 6.5 ? 9.2 * Math.pow(x / 6.5, 1.8) : Math.max(0.4, 9.2 * (1 - Math.pow((x - 6.5) / 3.5, 2)))), '', { ink: 'B' });
    R.text('optimum', g3.X(6.4), g3.Y(10.1), 3.6, { al: 'c' }); R.text('enzymes denature', g3.X(9.5), g3.Y(5), 3.4, { al: 'r' });
    // combined: two light curves at different CO2
    R.line(8, 112, 312, 112, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('two factors together', 100, 124, 4.4, { al: 'c' });
    const g4 = R.graph(32, 132, 128, 80, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'light intensity', yl: 'rate', xt: [], yt: [], fs: 3.6, xly: 10, ylx: 4 }).axes();
    g4.curve(x => 9.4 * (1 - Math.exp(-x / 2.4)), { ink: 'P', w: 1.6 }); g4.curve(x => 5 * (1 - Math.exp(-x / 2.4)), { ink: 'T', w: 1.6 });
    R.text('high CO_2', g4.X(6.4), g4.Y(9.8), 3.7, { al: 'l', ink: 'P' }); R.text('low CO_2', g4.X(6.4), g4.Y(4.2), 3.7, { al: 'l', ink: 'T' });
    R.text('plateau: CO_2 is limiting', g4.X(10), g4.Y(2), 3.6, { al: 'r' });
    // greenhouse practice
    R.line(184, 118, 184, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('overcoming limiting factors', 248, 124, 4.4, { al: 'c' });
    R.poly([196, 190, 196, 156, 248, 142, 300, 156, 300, 190], { ink: 'B', w: 1.2, fi: 'T', ft: 0.12 }); R.rect(196, 190, 104, 20, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.2, wob: 0.3 });
    [[212, 182], [236, 182], [262, 182], [286, 182]].forEach(([x, y]) => { R.stroke([x, y + 8, x, y - 4], { ink: 'T', w: 1.4, taper: 'end' }); R.circle(x - 3, y - 6, 3, { ink: 'B', w: 0.7, fi: 'TY', ft: 0.6 }); R.circle(x + 3, y - 6, 3, { ink: 'B', w: 0.7, fi: 'TY', ft: 0.6 }); });
    R.circle(248, 150, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.8 }); [-1, 1].forEach(d => R.line(248 + d * 8, 150, 248 + d * 13, 150, { ink: 'Y', w: 1.2, taper: 'none' }));
    ['heated, lit, CO_2-enriched', 'greenhouse: higher yield', 'but extra cost (evaluate)'].forEach((t, i) => R.text(t, 248, 222 + i * 0, 0.01, { al: 'c' }));
    R.text('extra light, CO_2, warmth', 248, 220, 3.7, { al: 'c' }); R.text('raise yield but cost money:', 248, 227, 3.7, { al: 'c' }); R.text('evaluate benefits against cost', 248, 234, 3.7, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(26 + p * 82, 92 - 9.2 * (1 - Math.exp(-p * 10 / 2.4)) * 5.8, 2, 'P', 0.9, 1); },
});

/* ---------- RP7: chromatography of leaf pigments ---------- */
rpScene({
  id: 'RP7', num: '3.5.1', rp: 7, title: 'Photosynthesis', sub: 'Required practical 7: chromatography to investigate leaf pigments', topic: '3.5', slot: [0, 2],
  covers: ['RP7'], at: ['g', 'b'], ms: ['MS 0.3', 'MS 1.3', 'MS 1.2'], ps: ['PS 2.2', 'PS 3.1'],
  card: {
    text: 'Use <b>chromatography</b> to investigate the pigments isolated from leaves of different plants (e.g. shade-tolerant and shade-intolerant plants, or leaves of different colours). In the AQA handbook’s example a leaf disc is crushed onto chromatography paper on a pencil <b>origin</b> line, the paper hangs in a solvent (propanone : petroleum ether, 1 : 9) in a stoppered tube, and pigments rise at different rates. Mark the <b>solvent front</b>, then calculate each pigment’s <b>R<sub>f</sub> value</b> = distance moved by the pigment ÷ distance moved by the solvent. Other methods (e.g. thin-layer) are possible.',
    terms: ['chromatography', 'origin', 'solvent front', 'Rf value', 'pigment', 'chlorophyll', 'carotene', 'solubility', 'affinity for the paper'],
    skill: 'MS 0.3: R_f ratio (no units)', eq: MATH(msub(mi('R'), mi('f')), mo('='), mfrac(mt('distance moved by pigment'), mt('distance moved by solvent front'))),
    eqn: 'e.g. 45 mm ÷ 90 mm = 0.50 (no units)',
    q: 'Why do different pigments travel different distances up the paper?', a: 'They differ in solubility in the solvent and in how strongly they are attracted to the paper, so some are carried further.'
  },
  apparatus(R, b) {
    R.text('pencil origin → run in solvent → mark the front', 92, 21, 4.2, { al: 'c' });
    // boiling tubes with paper strips
    const strip = (x, label, spots) => {
      R.tube(x, 30, 26, 100, { level: 0.14, ink: 'Y', t: 0.25 });
      R.rect(x + 9, 32, 8, 80, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.12, wob: 0.1 });
      R.line(x + 8, 102, x + 18, 102, { ink: 'B', w: 0.8, taper: 'none' }); R.text('origin', x + 31, 104, 3.3, { al: 'l' });
      spots.forEach(([yy, ink, t]) => R.ellipse(x + 13, yy, 3.4, 2.2, { ink: 'B', w: 0.5, fi: ink, ft: t, wob: 0.05 }));
      R.text(label, x + 13, 140, 4.2, { al: 'c' });
    };
    strip(28, 'leaf A', [[102, 'T', 0.4], [90, 'TY', 0.8], [66, 'T', 0.9], [46, 'PY', 0.9]]);
    // chromatogram with Rf annotation
    R.rect(112, 32, 40, 100, { ink: 'B', w: 1, fi: 'Y', ft: 0.1, wob: 0.15 });
    R.line(108, 112, 156, 112, { ink: 'B', w: 0.8, taper: 'none' }); R.text('origin', 160, 114, 3.4, { al: 'l' });
    R.line(108, 40, 156, 40, { ink: 'P', w: 0.8, taper: 'none' }); R.text('solvent front', 160, 42, 3.4, { al: 'l', ink: 'P' });
    [[112, 'T', 0.4], [98, 'TY', 0.85], [72, 'T', 0.95], [46, 'PY', 0.95], [58, 'Y', 0.95]].forEach(([yy, ink, t], i) => R.ellipse(132, yy, 8, 3.8, { ink: 'B', w: 0.5, fi: ink, ft: t, wob: 0.05 }));
    R.arrow([102, 112, 102, 76], { ink: 'T', w: 1, hs: 2.6 }); R.text('d', 98, 94, 3.8, { al: 'r', ink: 'T' }); R.arrow([96, 112, 96, 40], { ink: 'P', w: 1, hs: 2.6 }); R.text('D', 92, 76, 3.8, { al: 'r', ink: 'P' });
    R.text('R_f = d ÷ D', 70, 70, 4.4, { al: 'c' }); R.text('(no units)', 70, 77, 3.6, { al: 'c' });
    R.text('chromatogram', 132, 26, 3.8, { al: 'c' });
  },
  results(R, b) {
    R.text('example Rf values', b.x + 60, b.y + 10, 4.2, { al: 'c' });
    R.table(b.x + 4, b.y + 18, [44, 36, 36], 10, [['pigment', 'leaf A', 'leaf B'], ['carotene', '0.95', '0.95'], ['xanthophyll', '0.71', '0.70'], ['chlorophyll a', '0.50', '0.51'], ['chlorophyll b', '0.35', '0.00']], { size: 3.7, hink: 'Y' });
    R.text('leaf B lacks chlorophyll b', b.x + 60, b.y + 82, 3.7, { al: 'c', ink: 'P' });
    R.text('(illustrative values)', b.x + 60, b.y + 92, 3.4, { al: 'c' });
  },
  vars: { iv: 'type of leaf', dv: 'R_f of each pigment', ctl: ['same solvent and run', 'size of leaf disc', 'same paper'] },
  calc: ['R_f = d ÷ D', 'd: pigment moved, D: solvent', '= 45 mm ÷ 90 mm', '= 0.50 (no units)'],
  risks: [['flame', 'flammable solvent'], ['goggles', 'eye protection, ventilation'], ['warn', 'sharp cork borer']],
  limits: ['spots fade: mark at once', 'overloading blurs spots', 'solvent front hard to mark'],
  interp: 'same R_f = same pigment; compare pigments in each leaf',
  anim(A, sc) { const p = A.ph(6); A.dot(41, 102 - p * 28, 1.3, 'T', 0.7, 1); A.dot(132, 112 - p * 22, 1.3, 'T', 0.7, 2); },
});

/* ---------- RP8: dehydrogenase activity in chloroplast extracts (DCPIP) ---------- */
rpScene({
  id: 'RP8', num: '3.5.1', rp: 8, title: 'Photosynthesis', sub: 'Required practical 8: effect of a named factor on dehydrogenase activity in chloroplast extracts', topic: '3.5', slot: [1, 2],
  covers: ['RP8'], at: ['a', 'b', 'c'], ms: ['MS 3.1', 'MS 3.2', 'MS 1.3'], ps: ['PS 2.3', 'PS 3.1'],
  card: {
    text: 'Investigate the effect of a named factor on the rate of <b>dehydrogenase activity</b> in extracts of chloroplasts. In the AQA handbook’s example, chloroplasts from blended spinach (kept cold in isolation medium) are mixed with the blue redox dye <b>DCPIP</b>. In the light, electrons released from chlorophyll reduce DCPIP and it turns from blue to colourless (green). Measure the time taken (or use a colorimeter to measure absorbance) with and without the named factor (e.g. ammonium hydroxide, light intensity). Controls: a foil-wrapped tube (no light) and a tube without chloroplasts. Schools may use other factors and methods.',
    terms: ['dehydrogenase', 'DCPIP', 'redox indicator', 'isolation medium', 'chloroplast suspension', 'colorimeter', 'control tube', 'rate'],
    skill: 'MS 3.1: rate = 1 ÷ time', eq: MATH(mt('rate '), mo('='), mfrac(mn('1'), mt('time to decolourise')), mt('   (s'), msup(mrow(), mo('−')), mt('1)')),
    eqn: 'e.g. 60 s → rate = 1 ÷ 60 = 0.017 s⁻¹',
    q: 'Why is the isolation medium ice-cold and of the same water potential as the chloroplasts?', a: 'Cold slows enzyme action that would damage the chloroplasts; a similar water potential stops them bursting or shrinking by osmosis.'
  },
  apparatus(R, b) {
    R.text('chloroplasts + DCPIP in light: blue → colourless', 92, 21, 4.2, { al: 'c' });
    // ice bath with tubes
    R.rect(10, 70, 112, 56, { ink: 'B', w: 1.3, fi: 'T', ft: 0.12, wob: 0.3 }); for (let i = 0; i < 7; i++) R.rect(14 + i * 15, 72 + (i % 2) * 5, 9, 9, { ink: 'B', w: 0.7, fi: 'T', ft: 0.3, wob: 0.1 }); R.text('ice', 66, 122, 3.8, { al: 'c' });
    [['X', 'B', 0.5], ['Y', 'B', 0.5], ['A', 'B', 0.75], ['C', 'TY', 0.4]].forEach(([n, ink, t], i) => { const x = 28 + i * 24; R.tube(x, 40, 11, 62, { level: 0.7, ink, t: n === 'C' ? 0.3 : 0.45, ink2: n === 'C' ? 'T' : undefined, t2: 0.25 }); R.text(n, x, 36, 4, { al: 'c' }); if (n === 'A') { R.rect(x - 6.6, 52, 13.2, 52, { ink: 'B', w: 0.9, fi: 'B', ft: 0.18, wob: 0.1 }); } });
    R.text('tube A in foil (no light)', 76, 134, 3.6, { al: 'c' });
    // lamp
    R.circle(150, 60, 8, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.8 }); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; R.line(150 + Math.cos(a) * 11, 60 + Math.sin(a) * 11, 150 + Math.cos(a) * 17, 60 + Math.sin(a) * 17, { ink: 'Y', w: 1.2, taper: 'none' }); } R.rect(148, 70, 4, 18, { ink: 'B', w: 1, fi: 'B', ft: 0.5 }); R.rect(136, 88, 28, 5, { ink: 'B', w: 1, fi: 'B', ft: 0.4 });
    R.arrow([138, 66, 104, 72], { ink: 'Y', w: 1.4, hs: 3 }); R.text('10 cm', 126, 80, 3.6, { al: 'c' });
    // chloroplast suspension steps
  },
  results(R, b) {
    const g = R.graph(b.x + 22, b.y + 8, 92, 82, { xmin: 0, xmax: 5, ymin: 0, ymax: 100, xl: '', yl: 'time to decolourise / s', xt: [], yt: [[0, '0'], [50, '50'], [100, '100']], fs: 3.7, xly: 10, ylx: 13 }).axes();
    [['no factor', 42, 5], ['+ NH_4OH', 96, 8]].forEach(([n, h, e], i) => { const x = g.X(i * 2 + 0.8); R.rect(x, g.Y(h), 16, g.Y(0) - g.Y(h), { ink: 'B', w: 0.9, fi: i ? 'P' : 'T', ft: 0.5, wob: 0.1 }); g.err(i * 2 + 0.8 + 0.8, h, e); R.text(n, x + 8, g.Y(0) + 8, 3.5, { al: 'c' }); });
    R.text('(illustrative)', b.x + 70, b.y + 104, 3.4, { al: 'c' });
  },
  vars: { iv: 'named factor, e.g. NH_4OH or light', dv: 'time for DCPIP to decolourise', ctl: ['volume of suspension and DCPIP', 'temperature (ice), light intensity', 'same extraction'] },
  calc: ['rate = 1 ÷ time', '= 1 ÷ 42 s = 0.024 s^-1', 'with NH_4OH: 1 ÷ 96', '= 0.010 s^-1'],
  risks: [['goggles', 'alkali: eye protection'], ['hot', 'bright, hot lamp'], ['warn', 'blender blades, electrics near water']],
  limits: ['colour change hard to judge by eye', 'use a colorimeter instead', 'extract quality varies: repeat', 'chloroplasts degrade with time'],
  interp: 'slower decolourising = less dehydrogenase activity (lower rate)',
  anim(A, sc) { const p = A.ph(6); A.dot(40 + 0, 50 + p * 2, 0, 'B', 0, 0); A.photon(138 - p * 12, 66 + p * 3, 2.9, 10, 1); A.dot(40, 64 + p * 20, 1.2, 'B', 0.5, 2); },
});
