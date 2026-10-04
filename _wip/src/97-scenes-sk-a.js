/* ===================== SKILLS: assessment objectives, mathematical skills (spec 4.2, 6) ===================== */
/* ---------- SK AO: the three assessment objectives and the frame grammar ---------- */
S({
  id: 'SK.AO', num: 'AO', tag: 'AO 1–3', sub: 'Assessment objectives (spec 4.2) and how this poster shows them', title: 'Assessment objectives', topic: 'SK', slot: [0, 0], span: [2, 1], dna: 'mark', ao: 1,
  covers: ['AO1', 'AO2', 'AO3'],
  card: {
    text: 'Exams measure three <b>assessment objectives</b>. <b>AO1</b>: demonstrate knowledge and understanding of scientific ideas, processes, techniques and procedures. <b>AO2</b>: apply that knowledge and understanding in a theoretical context, in a practical context, when handling qualitative data and when handling quantitative data. <b>AO3</b>: analyse, interpret and evaluate scientific information, ideas and evidence, including in relation to issues, to make judgements and reach conclusions and to develop and refine practical design and procedures. Approximate A-level weightings overall: AO1 30–35 %, AO2 40–45 %, AO3 25–30 %; at least 10 % of marks need mathematical skills and at least 15 % assess practical skills. On this poster the <b>frame</b> round each scene shows the dominant objective: a plain frame for knowledge, a doubled frame for application, and hatched corners for analysis and evaluation.',
    terms: ['AO1', 'AO2', 'AO3', 'knowledge', 'application', 'analysis', 'evaluation', 'extended response'],
    skill: 'Match command words to objectives', eq: null,
    q: 'Which assessment objective is being tested when you are asked to evaluate data and reach a conclusion?', a: 'AO3: analyse, interpret and evaluate scientific information, ideas and evidence.'
  },
  draw(R, sc) {
    R.text('three assessment objectives', 330, 14, 4.6, { al: 'c' });
    const cols = [
      [10, 'AO1', 'knowledge and understanding', ['scientific ideas, processes,', 'techniques and procedures'], 'P', 1],
      [228, 'AO2', 'application', ['in a theoretical context', 'in a practical context', 'with qualitative data', 'with quantitative data'], 'T', 2],
      [446, 'AO3', 'analysis, interpretation, evaluation', ['of information, ideas, evidence', 'to make judgements and reach', 'conclusions; to develop and refine', 'practical design and procedures'], 'Y', 3],
    ];
    cols.forEach(([x, nm, ttl, ls, ink, k], i) => {
      // mini frame per AO
      R.rrect(x, 26, 204, 72, 10, { ink: 'B', w: 1.6, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.5 });
      if (k === 2) R.rrect(x + 3, 29, 198, 66, 8, { ink: 'B', w: 0.7, wob: 0.4 });
      if (k === 3) for (const [cx, cy, a] of [[x, 26, 0], [x + 204, 26, 90], [x + 204, 98, 180], [x, 98, 270]]) R.hatch(rectCorner(cx, cy, a, 14), 45, 2.4, { ink: 'P', w: 0.5 });
      R.text(nm, x + 102, 48, 8, { al: 'c', ink: 'P' }); R.text(ttl, x + 102, 62, 4, { al: 'c' });
      ls.forEach((t, j) => R.text(t, x + 102, 72 + j * 5.8, 3.4, { al: 'c' }));
      R.text(['solid frame', 'double frame', 'hatched corners'][i], x + 102, 112, 3.8, { al: 'c', ink: 'T' });
    });
    R.line(10, 124, 650, 124, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // weightings
    R.text('approximate A-level weighting of marks', 168, 138, 4.1, { al: 'c' });
    [['AO1', 30, 35, 'P'], ['AO2', 40, 45, 'T'], ['AO3', 25, 30, 'Y']].forEach(([nm, a, b, ink], i) => { const y = 150 + i * 20; R.text(nm, 14, y + 9, 4, { al: 'l' }); R.rect(44, y, a * 5.2, 12, { ink: 'B', w: 0.8, fi: ink, ft: 0.4 }); R.rect(44 + a * 5.2, y, (b - a) * 5.2, 12, { ink: 'B', w: 0.5, fi: ink, ft: 0.15, dash: true }); R.text(a + '–' + b + ' %', 44 + b * 5.2 + 6, y + 9.4, 3.8, { al: 'l' }); });
    R.text('at least 10 % of marks use mathematical skills', 168, 218, 3.8, { al: 'c' }); R.text('at least 15 % assess practical skills', 168, 226, 3.8, { al: 'c' });
    R.line(340, 130, 340, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // chains of reasoning, command words
    R.text('extended responses show a chain of reasoning', 498, 138, 4.1, { al: 'c' });
    ['temperature rises', 'more kinetic energy', 'more enzyme–substrate collisions', 'more products per second'].forEach((t, i) => { const x = 354 + (i % 2) * 150, y = 150 + Math.floor(i / 2) * 34; R.rrect(x, y, 134, 22, 4, { ink: 'B', w: 0.8, fi: ['Y', 'P', 'T', 'Y'][i], ft: i === 2 ? 0.04 : 0.08, wob: 0.3 }); R.text(t, x + 67, y + 14, 3.6, { al: 'c' }); if (i % 2 === 0) R.arrow([x + 135, y + 11, x + 149, y + 11], { ink: 'B', w: 0.8, hs: 2 }); });
    R.arrow([488, 172, 488, 184], { ink: 'B', w: 0.001, hs: 0.1 });
    R.text('command words: describe, explain, calculate,', 498, 218, 3.7, { al: 'c' }); R.text('evaluate, suggest, compare', 498, 226, 3.7, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(10 + 204 * 0.5 + (p * 440) % 440, 112, 1.8, 'P', 0.9, 1); },
});

/* ---------- SK MS 0: arithmetic and numerical computation ---------- */
S({
  id: 'SK.MS0', num: 'MS 0', tag: 'MS 6.1', sub: 'Arithmetic: units, standard form, ratios, estimating, calculators (MS 0.1–0.5)', title: 'Arithmetic and numerical computation', topic: 'SK', slot: [2, 0], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['MS 0.1', 'MS 0.2', 'MS 0.3', 'MS 0.4', 'MS 0.5'],
  card: {
    text: '<b>MS 0.1</b> use and convert units (for example mm³ to cm³; the unit of a rate such as breaths per minute). <b>MS 0.2</b> decimal and <b>standard form</b>; keep significant figures when converting (0.0050 mol dm⁻³ = 5.0 × 10⁻³ mol dm⁻³). <b>MS 0.3</b> ratios, fractions and percentages (percentage yield, surface area to volume ratio, scales, phenotypic ratios). <b>MS 0.4</b> estimate to check a calculated value is sensible. <b>MS 0.5</b> use a calculator for powers, exponentials and logarithms (for example the number of bacteria after a given time).',
    terms: ['units', 'conversion', 'standard form', 'significant figures', 'ratio', 'percentage', 'estimate', 'logarithm', 'exponential'],
    skill: 'MS 0.1–0.5', eq: MATH(mi('N'), mo('='), msub(mi('N'), mn(0)), mo('×'), msup(mn(2), mi('n'))),
    q: 'Write 0.0050 mol dm⁻³ in standard form without losing significant figures.', a: '5.0 × 10⁻³ mol dm⁻³ (two significant figures kept).'
  },
  draw(R, sc) {
    const tile = (x, y, w, h, tag, ttl, ink) => { R.rrect(x, y, w, h, 6, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(tag, x + 8, y + 12, 4.2, { al: 'l', ink: 'P' }); R.text(ttl, x + 38, y + 12, 3.9, { al: 'l' }); };
    tile(8, 8, 206, 108, 'MS 0.1', 'units', 'Y');
    ['1 cm³ = 1000 mm³', '1 dm³ = 1000 cm³', '1 g = 1000 mg', 'rate unit: breaths min^{−1}'].forEach((t, i) => R.text(t, 16, 34 + i * 12, 4.2, { al: 'l' }));
    R.text('1000 mm³  →  1 cm³  (÷ 1000)', 16, 92, 4, { al: 'l', ink: 'P' }); R.text('check the unit before you substitute', 16, 106, 3.5, { al: 'l' });
    tile(222, 8, 214, 108, 'MS 0.2', 'decimal and standard form', 'T');
    ['0.0050 mol dm^{−3} = 5.0 × 10^{−3}', '300 000 = 3 × 10^{5}', 'a mitochondrion ≈ 2 × 10^{−6} m', 'keep the significant figures'].forEach((t, i) => R.text(t, 230, 34 + i * 12, 4, { al: 'l' }));
    R.text('same value, same significant figures', 230, 92, 3.6, { al: 'l', ink: 'P' });
    tile(444, 8, 208, 108, 'MS 0.3', 'ratios, fractions, percentages', 'P');
    ['percentage = part ÷ whole × 100', 'surface area : volume', 'Rr × Rr  →  3 : 1', 'scale: 1 cm = 10 µm'].forEach((t, i) => R.text(t, 452, 34 + i * 12, 4, { al: 'l' }));
    R.text('SA : V of a cube of side 2 cm = 24 : 8 = 3 : 1', 452, 92, 3.5, { al: 'l', ink: 'P' });
    tile(8, 124, 300, 108, 'MS 0.4', 'estimate results to sense-check', 'Y');
    R.text('mean of 19, 21, 22, 18 and 20 ≈ 20', 16, 150, 4.2, { al: 'l' });
    R.text('so a calculated mean of 2.0 or 200 is wrong', 16, 162, 4, { al: 'l', ink: 'P' });
    R.text('magnification: image 45 mm, object 0.1 mm', 16, 182, 4, { al: 'l' }); R.text('estimate  45 ÷ 0.1 ≈ 450  (so ×450, not ×45)', 16, 194, 4, { al: 'l', ink: 'P' });
    R.text('round, estimate, then calculate exactly', 16, 218, 3.7, { al: 'l' });
    tile(316, 124, 336, 108, 'MS 0.5', 'power, exponential and log functions', 'T');
    R.text('bacteria double every 20 min: N = N_0 × 2^{n}', 324, 150, 4, { al: 'l' });
    R.text('after 2 h (n = 6) from 100 cells:  100 × 2^{6} = 6400', 324, 162, 3.9, { al: 'l', ink: 'P' });
    R.text('pH = −log_{10}[H^{+}]    [H^{+}] = 10^{−7} mol dm^{−3}: pH 7', 324, 182, 3.8, { al: 'l' });
    R.text('use the x^y, 10^x and log keys on the calculator', 324, 200, 3.6, { al: 'l' }); R.text('log scale: each step is ×10', 324, 212, 3.6, { al: 'l', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(16 + p * 190, 112, 1.5, 'P', 0.8, 1); },
});

/* ---------- SK MS 1a: data handling basics ---------- */
S({
  id: 'SK.MS1a', num: 'MS 1', tag: 'MS 6.2a', sub: 'Handling data: sig figs, mean, tables and charts, probability, sampling (MS 1.1–1.5)', title: 'Handling data', topic: 'SK', slot: [0, 1], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['MS 1.1', 'MS 1.2', 'MS 1.3', 'MS 1.4', 'MS 1.5'],
  card: {
    text: '<b>MS 1.1</b> report calculations to an appropriate number of <b>significant figures</b>: no more than the least accurate measurement. <b>MS 1.2</b> find <b>arithmetic means</b>. <b>MS 1.3</b> construct and interpret <b>frequency tables</b>, <b>bar charts</b> and <b>histograms</b>: clear headings, units and consistent decimal places; interpret traces such as an electrocardiogram. <b>MS 1.4</b> simple <b>probability</b> (genetic inheritance). <b>MS 1.5</b> principles of <b>sampling</b>: random sampling avoids bias, larger samples are more reliable; analyse random data, for example with Simpson’s index of diversity <i>D</i> = 1 − Σ(<i>n</i>/<i>N</i>)².',
    terms: ['significant figures', 'mean', 'frequency table', 'histogram', 'bar chart', 'probability', 'random sampling', 'Simpson’s index of diversity'],
    skill: 'MS 1.1–1.5', eq: MATH(mi('D'), mo('='), mn(1), mo('−'), mo('∑'), msup(mrow(mo('('), mfrac(mi('n'), mi('N')), mo(')')), mn(2))),
    q: 'Three readings are 2.1 cm, 2.30 cm and 2.2 cm. How many significant figures should the mean have?', a: 'Two: the least precise reading (2.1 cm and 2.2 cm) has two significant figures.'
  },
  draw(R, sc) {
    const tile = (x, y, w, h, tag, ttl, ink) => { R.rrect(x, y, w, h, 6, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(tag, x + 8, y + 12, 4.2, { al: 'l', ink: 'P' }); R.text(ttl, x + 38, y + 12, 3.9, { al: 'l' }); };
    tile(8, 8, 210, 108, 'MS 1.1', 'significant figures', 'Y');
    ['2.1 cm × 3.45 cm = 7.245 cm²', 'report  7.2 cm²  (2 s.f.)', 'the answer cannot be more precise', 'than the least precise measurement'].forEach((t, i) => R.text(t, 16, 34 + i * 12, 3.9, { al: 'l', ink: i === 1 ? 'P' : 'B' }));
    R.text('1.0 mm × 0.52 m → 2 s.f.', 16, 90, 3.8, { al: 'l' });
    tile(226, 8, 210, 108, 'MS 1.2', 'arithmetic mean', 'T');
    R.text('stomata per mm²:  22, 25, 21, 24, 23', 234, 34, 3.9, { al: 'l' });
    R.line(250, 56, 340, 56, { ink: 'B', w: 1, taper: 'none' }); R.text('22 + 25 + 21 + 24 + 23', 295, 51, 3.6, { al: 'c' }); R.text('5', 295, 66, 3.9, { al: 'c' }); R.text('= 23', 346, 59, 4.2, { al: 'l', ink: 'P' });
    R.text('mean = Σx ÷ n', 234, 88, 4, { al: 'l' }); R.text('repeat and average to reduce random error', 234, 102, 3.5, { al: 'l' });
    tile(444, 8, 208, 108, 'MS 1.3', 'tables and charts', 'P');
    R.table(452, 28, [40, 52, 52], 12, [['group', 'n', 'mean / mm'], ['A', '12', '4.2'], ['B', '12', '5.8'], ['C', '12', '5.1']], { size: 3.5, hink: 'Y' });
    R.text('headings and units, same decimals', 452, 88, 3.4, { al: 'l' }); R.text('bar chart: categories; histogram: continuous', 452, 98, 3.3, { al: 'l' }); R.text('ECG trace: read heart rate from peaks', 452, 108, 3.3, { al: 'l', ink: 'P' });
    tile(8, 124, 210, 108, 'MS 1.4', 'probability', 'Y');
    R.text('probability = favourable ÷ possible', 16, 150, 3.9, { al: 'l' }); R.text('Rr × Rr: P(rr) = 1/4 = 0.25 = 25 %', 16, 164, 3.9, { al: 'l', ink: 'P' });
    R.text('two independent events multiply:', 16, 184, 3.7, { al: 'l' }); R.text('P(rr and Yy) = 1/4 × 1/2 = 1/8', 16, 196, 3.9, { al: 'l', ink: 'P' }); R.text('chance, not certainty, in each birth', 16, 216, 3.5, { al: 'l' });
    tile(226, 124, 426, 108, 'MS 1.5', 'principles of sampling', 'T');
    for (let k = 0; k < 40; k++) { const h = Math.sin(k * 51.7) * 4375.85, fx = h - Math.floor(h), h2 = Math.sin(k * 19.9) * 9871.3, fy = h2 - Math.floor(h2); R.circle(236 + fx * 90, 148 + fy * 74, 2, { ink: 'B', w: 0.5, fi: fx < 0.3 ? 'P' : 'T', ft: 0.7 }); }
    R.rect(236, 148, 90, 74, { ink: 'B', w: 0.9, wob: 0.2 });
    ['random sampling avoids bias', 'larger sample: more reliable', 'repeat and take a mean'].forEach((t, i) => R.text(t, 344, 150 + i * 10, 3.7, { al: 'l' }));
    R.text('Simpson’s index of diversity', 344, 188, 3.9, { al: 'l', ink: 'P' }); R.text('D = 1 − Σ (n ÷ N)²', 344, 200, 4.2, { al: 'l' }); R.text('10 individuals: 5 + 3 + 2: D = 1 − (0.25 + 0.09 + 0.04) = 0.62', 344, 212, 3.3, { al: 'l' });
    R.text('higher D = greater diversity', 344, 224, 3.4, { al: 'l' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(236 + p * 90, 148 + 37, 1.4, 'P', 0.8, 1); },
});

/* ---------- SK MS 1b: median/mode, scatter, magnification and order of magnitude ---------- */
S({
  id: 'SK.MS1b', num: 'MS 1', tag: 'MS 6.2b', sub: 'Median and mode, scatter diagrams, magnification and order of magnitude (MS 1.6–1.8)', title: 'Handling data', topic: 'SK', slot: [2, 1], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['MS 1.6', 'MS 1.7', 'MS 1.8'],
  card: {
    text: '<b>MS 1.6</b> mean, <b>median</b> (middle value of ordered data) and <b>mode</b> (most frequent value): compare them, for example the height of a group. <b>MS 1.7</b> use a <b>scatter diagram</b> to identify a <b>correlation</b> between two variables: positive, negative or none; correlation does not prove cause. <b>MS 1.8</b> order-of-magnitude calculations and the <b>magnification</b> formula: magnification = size of image ÷ size of real object, which can be rearranged for any of the three quantities (keep the units the same).',
    terms: ['median', 'mode', 'scatter diagram', 'correlation', 'magnification', 'order of magnitude', 'real size', 'image size'],
    skill: 'MS 1.6–1.8', eq: MATH(mt('magnification '), mo('='), mfrac(mt('size of image'), mt('size of real object'))),
    q: 'A cell is 20 µm long and its image is 4 cm long. What is the magnification?', a: '4 cm = 40 000 µm; 40 000 ÷ 20 = ×2000.'
  },
  draw(R, sc) {
    R.text('MS 1.6  mean, median and mode', 110, 14, 4.2, { al: 'c' });
    R.text('leaf lengths / mm:  4, 5, 5, 6, 7, 9, 12', 110, 28, 3.8, { al: 'c' });
    [4, 5, 5, 6, 7, 9, 12].forEach((v, i) => { R.rect(18 + i * 28, 40, 24, v * 4 + 2, { ink: 'B', w: 0.8, fi: 'T', ft: 0.25 }); R.text(String(v), 30 + i * 28, 40 + v * 4 + 11, 3.7, { al: 'c' }); });
    R.line(14, 40, 212, 40, { ink: 'B', w: 0.8, taper: 'none' });
    R.text('mode = 5 (most frequent)', 110, 108, 3.8, { al: 'c', ink: 'P' }); R.text('median = 6 (middle value)', 110, 117, 3.8, { al: 'c', ink: 'P' }); R.text('mean = 48 ÷ 7 ≈ 6.9 (pulled up by 12)', 110, 126, 3.8, { al: 'c', ink: 'P' });
    R.line(220, 14, 220, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('MS 1.7  scatter diagram and correlation', 330, 14, 4.2, { al: 'c' });
    [['positive', 0.9], ['negative', -0.9], ['none', 0]].forEach(([nm, s], i) => {
      const x0 = 232 + i * 64, g = R.graph(x0 + 4, 26, 52, 52, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, fs: 3 }).axes();
      for (let k = 0; k < 12; k++) { const h = Math.sin(k * 37.1 + i * 9) * 4375.85, fx = (h - Math.floor(h)) * 9, h2 = Math.sin(k * 11.3 + i) * 9871.3, e = (h2 - Math.floor(h2) - 0.5) * 3; const y = s === 0 ? (h2 - Math.floor(h2)) * 9 + 0.5 : (s > 0 ? fx : 10 - fx) * 0.85 + e + 0.7; g.dots([fx + 0.5, Math.max(0.3, Math.min(9.5, y))], { r: 1.4, ink: 'P' }); }
      R.text(nm, x0 + 30, 94, 3.5, { al: 'c' });
    });
    R.text('correlation does not prove cause', 330, 114, 3.9, { al: 'c', ink: 'P' });
    R.text('a third factor may cause both variables to change', 330, 123, 3.4, { al: 'c' });
    R.line(224, 134, 436, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('order of magnitude', 330, 146, 4, { al: 'c' });
    [['virus', '10^{−7} m'], ['bacterium', '10^{−6} m'], ['animal cell', '10^{−5} m'], ['egg cell', '10^{−4} m']].forEach(([n, s], i) => { const y = 158 + i * 18; R.rect(240, y, 20 + i * 28, 10, { ink: 'B', w: 0.8, fi: ['TY', 'T', 'P', 'Y'][i], ft: 0.35 }); R.text(n + ' ' + s, 346, y + 8, 3.6, { al: 'l' }); });
    R.text('each step: ×10 (one order of magnitude)', 330, 230, 3.6, { al: 'c' });
    R.line(442, 14, 442, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('MS 1.8  magnification', 548, 14, 4.2, { al: 'c' });
    R.fill([464, 40, 464 + 54, 40 + 0, 464 + 54, 40 + 30, 464, 40 + 30], { ink: 'Y', t: 0.0, wob: 0 });
    R.ellipse(480, 62, 12, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.3 }); R.arrow([506, 62, 534, 62], { ink: 'B', w: 1, hs: 2.6 }); R.ellipse(586, 62, 48, 28, { ink: 'B', w: 1.2, fi: 'P', ft: 0.3 });
    R.line(464, 78, 496, 78, { ink: 'P', w: 1.2, taper: 'none' }); R.text('real size', 480, 88, 3.4, { al: 'c' }); R.line(538, 98, 634, 98, { ink: 'P', w: 1.2, taper: 'none' }); R.text('image size', 586, 108, 3.4, { al: 'c' });
    R.text('magnification  =  image size ÷ real size', 548, 128, 4, { al: 'c' });
    [['image size', '= magnification × real size'], ['real size', '= image size ÷ magnification']].forEach((t, i) => { R.rrect(456, 138 + i * 22, 186, 18, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.1, wob: 0.3 }); R.text(t[0] + '  ' + t[1], 549, 150 + i * 22, 3.7, { al: 'c' }); });
    R.text('worked: image 40 mm, real size 20 µm', 548, 192, 3.8, { al: 'c' }); R.text('40 mm = 40 000 µm', 548, 202, 3.8, { al: 'c' }); R.text('40 000 ÷ 20 = × 2000', 548, 213, 4.2, { al: 'c', ink: 'P' });
    R.text('convert to the same unit first', 548, 227, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(506 + p * 28, 62, 1.8, 'P', 0.9, 1); },
});
