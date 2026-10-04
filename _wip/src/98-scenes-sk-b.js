/* ===================== SKILLS (cont.): statistical tests, dispersion, uncertainty, algebra, graphs, geometry ===================== */
/* ---------- SK MS 1.9: choosing and using a statistical test ---------- */
S({
  id: 'SK.MS1c', num: 'MS 1.9', tag: 'MS 6.2c', sub: 'Statistical tests: chi-squared, Student’s t-test and the correlation coefficient (MS 1.9)', title: 'Statistical tests', topic: 'SK', slot: [0, 2], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['MS 1.9'],
  card: {
    text: '<b>MS 1.9</b> select and use a statistical test. Use the <b>chi-squared test</b> to test the significance of the difference between observed and expected results (categories, counts). Use the <b>Student’s t-test</b> to compare the means of two sets of continuous data (for example two samples). Use a <b>correlation coefficient</b> (for example Spearman’s rank) to test the strength of a relationship between two variables. State a <b>null hypothesis</b>, calculate the test statistic, find the <b>degrees of freedom</b> and compare with the critical value at p = 0.05: if the statistic is larger than the critical value, reject the null hypothesis (the probability that the difference or correlation is due to chance is less than 5 %).',
    terms: ['null hypothesis', 'chi-squared test', 'Student’s t-test', 'correlation coefficient', 'Spearman’s rank', 'degrees of freedom', 'critical value', 'p = 0.05', 'significant'],
    skill: 'MS 1.9', eq: MATH(mi('t'), mo('='), mfrac(mrow(MM.over(mi('x'), mo('¯')), mo('−'), MM.over(mi('y'), mo('¯'))), msqrt(mrow(mfrac(msup(msub(mi('s'), mn(1)), mn(2)), msub(mi('n'), mn(1))), mo('+'), mfrac(msup(msub(mi('s'), mn(2)), mn(2)), msub(mi('n'), mn(2))))))),
    q: 'A calculated t value is smaller than the critical value at p = 0.05. What do you conclude?', a: 'There is no significant difference between the means; any difference could be due to chance, so the null hypothesis is accepted.'
  },
  draw(R, sc) {
    R.text('which test?', 100, 14, 4.4, { al: 'c' });
    const dec = (x, y, w, t, ink = 'Y') => { R.rrect(x, y, w, 24, 4, { ink: 'B', w: 0.8, fi: ink, ft: 0.1, wob: 0.3 }); wrapText(t, w - 8, 3.5).forEach((ln, k, a) => R.text(ln, x + w / 2, y + 12 - (a.length - 1) * 3.2 + k * 6.4 + 1.4, 3.5, { al: 'c' })); };
    dec(10, 24, 180, 'count categories: compare observed with expected?', 'Y');
    R.arrow([100, 49, 100, 60], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('yes', 108, 58, 3.4, { al: 'l' });
    R.rrect(40, 62, 120, 20, 4, { ink: 'B', w: 1.1, fi: 'P', ft: 0.2, wob: 0.3 }); R.text('chi-squared test', 100, 75, 4.2, { al: 'c' });
    dec(10, 94, 180, 'compare the means of two samples of continuous data?', 'T');
    R.arrow([100, 119, 100, 130], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('yes', 108, 128, 3.4, { al: 'l' });
    R.rrect(40, 132, 120, 20, 4, { ink: 'B', w: 1.1, fi: 'P', ft: 0.2, wob: 0.3 }); R.text('Student’s t-test', 100, 145, 4.2, { al: 'c' });
    dec(10, 164, 180, 'relationship between two measured variables?', 'Y');
    R.arrow([100, 189, 100, 200], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('yes', 108, 198, 3.4, { al: 'l' });
    R.rrect(30, 202, 140, 20, 4, { ink: 'B', w: 1.1, fi: 'P', ft: 0.2, wob: 0.3 }); R.text('correlation coefficient', 100, 215, 4.2, { al: 'c' });
    R.line(200, 14, 200, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // t-test worked
    R.text('t-test worked example', 326, 14, 4.2, { al: 'c' });
    R.text('H_0: no significant difference between the means', 326, 26, 3.5, { al: 'c' });
    R.table(210, 34, [70, 50, 50], 11.5, [['', 'sample A', 'sample B'], ['n', '10', '10'], ['mean', '12.4', '10.6'], ['standard deviation', '1.6', '1.8']], { size: 3.5, hink: 'Y' });
    R.text('t = (12.4 − 10.6) ÷ √(1.6²/10 + 1.8²/10)', 326, 98, 3.9, { al: 'c' });
    R.text('= 1.8 ÷ √(0.256 + 0.324) = 1.8 ÷ 0.762 = 2.36', 326, 108, 3.9, { al: 'c', ink: 'P' });
    R.text('degrees of freedom = (10 + 10) − 2 = 18', 326, 122, 3.7, { al: 'c' });
    R.text('critical value (p = 0.05) = 2.10', 326, 132, 3.7, { al: 'c' });
    R.rrect(222, 140, 208, 36, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.12, wob: 0.3 }); R.text('2.36 is greater than 2.10: reject the null hypothesis;', 326, 154, 3.7, { al: 'c' }); R.text('the difference between the means is significant', 326, 163, 3.7, { al: 'c' }); R.text('(probability due to chance < 5 %)', 326, 171, 3.4, { al: 'c', ink: 'P' });
    R.text('chi-squared: see Inheritance (3.7.1)', 326, 192, 3.7, { al: 'c' }); R.text('χ² = Σ (O − E)² ÷ E,  df = categories − 1', 326, 202, 3.7, { al: 'c' });
    R.text('larger samples and less overlap give', 326, 218, 3.6, { al: 'c' }); R.text('a more reliable test', 326, 226, 3.6, { al: 'c' });
    R.line(438, 14, 438, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // Spearman
    R.text('correlation coefficient: Spearman’s rank', 548, 14, 4.2, { al: 'c' });
    R.text('r_s = 1 − (6 Σ d²) ÷ (n (n² − 1))', 548, 26, 4.4, { al: 'c', ink: 'P' });
    R.table(452, 34, [38, 38, 38, 30, 38], 11, [['site', 'x rank', 'y rank', 'd', 'd²', ''], ['1', '1', '2', '−1', '1', ''], ['2', '2', '1', '1', '1', ''], ['3', '3', '3', '0', '0', ''], ['4', '4', '5', '−1', '1', ''], ['…', '…', '…', '…', '…', '']].map(r => r.slice(0, 5)), { size: 3.3, hink: 'Y' });
    R.text('n = 8 sites, Σ d² = 6', 548, 108, 3.7, { al: 'c' });
    R.text('r_s = 1 − (6 × 6) ÷ (8 × 63) = 1 − 0.071 = 0.93', 548, 120, 3.9, { al: 'c', ink: 'P' });
    R.text('critical value (n = 8, p = 0.05) = 0.74', 548, 132, 3.7, { al: 'c' });
    R.rrect(450, 140, 196, 30, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.12, wob: 0.3 }); R.text('0.93 > 0.74: a significant positive correlation;', 548, 152, 3.6, { al: 'c' }); R.text('reject the null hypothesis', 548, 161, 3.6, { al: 'c' });
    const g = R.graph(488, 178, 70, 44, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'x', yl: 'y', fs: 3.1, xly: 8, ylx: 4 }).axes(); g.dots([1, 1.5, 2, 2.2, 3, 3.4, 4, 5, 5, 4.4, 6, 6.2, 7, 7.8, 8, 7.6], { r: 1.3, ink: 'P' });
    R.text('+1 perfect positive, 0 none, −1 negative', 604, 192, 3.2, { al: 'c' }); R.text('correlation is not cause', 604, 202, 3.4, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(100, 49 + p * 100, 1.7, 'P', 0.9, 1); },
});

/* ---------- SK MS 1.10–1.11: dispersion and uncertainty ---------- */
S({
  id: 'SK.MS1d', num: 'MS 1.10', tag: 'MS 6.2d', sub: 'Dispersion (range, standard deviation) and uncertainty (MS 1.10–1.11)', title: 'Dispersion and uncertainty', topic: 'SK', slot: [2, 2], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['MS 1.10', 'MS 1.11'],
  card: {
    text: '<b>MS 1.10</b> measures of dispersion: the <b>range</b> (largest − smallest) and the <b>standard deviation</b> (<i>s</i>), which shows how spread out data are around the mean; standard deviation is more useful when there is an outlying result. s = √[Σ(x − x̄)² ÷ (n − 1)]. Overlap of error bars (±1 standard deviation) suggests the difference may not be significant, but a test is needed. <b>MS 1.11</b> identify <b>uncertainties</b> in measurements: calculate <b>percentage error</b> = (uncertainty ÷ measured value) × 100; when measurements are added or subtracted, add the absolute uncertainties; a larger measurement gives a smaller percentage error.',
    terms: ['range', 'standard deviation', 'mean', 'outlier', 'error bar', 'uncertainty', 'percentage error', 'precision', 'accuracy'],
    skill: 'MS 1.10–1.11', eq: MATH(mt('percentage error '), mo('='), mfrac(mt('uncertainty'), mt('measured value')), mo('×'), mn(100)),
    q: 'A 10 cm³ volume is measured with an uncertainty of ±0.5 cm³. What is the percentage error?', a: '0.5 ÷ 10 × 100 = 5 %.'
  },
  draw(R, sc) {
    R.text('MS 1.10  range and standard deviation', 160, 14, 4.2, { al: 'c' });
    R.text('data: 4, 6, 7, 8, 10', 160, 26, 3.9, { al: 'c' });
    R.table(10, 34, [34, 44, 56], 11.5, [['x', 'x − mean', '(x − mean)²'], ['4', '−3', '9'], ['6', '−1', '1'], ['7', '0', '0'], ['8', '1', '1'], ['10', '3', '9']], { size: 3.4, hink: 'Y' });
    R.text('mean = 35 ÷ 5 = 7', 160, 50, 3.9, { al: 'l' }); R.text('range = 10 − 4 = 6', 160, 64, 3.9, { al: 'l' });
    R.text('Σ(x − mean)² = 20', 160, 78, 3.9, { al: 'l' }); R.text('n − 1 = 4', 160, 92, 3.9, { al: 'l' });
    R.rrect(8, 118, 304, 22, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.12, wob: 0.3 }); R.text('s = √[Σ(x − mean)² ÷ (n − 1)] = √(20 ÷ 4) = 2.2', 160, 132, 4, { al: 'c', ink: 'P' });
    // bars with error bars
    R.text('error bars show spread (mean ± s)', 160, 154, 3.9, { al: 'c' });
    [[40, 7, 2.2, 'T'], [110, 7.4, 0.6, 'P']].forEach(([x, m, e, ink], i) => { R.rect(x, 218 - m * 7, 36, m * 7, { ink: 'B', w: 0.8, fi: ink, ft: 0.25 }); R.line(x + 18, 218 - (m + e) * 7, x + 18, 218 - (m - e) * 7, { ink: 'B', w: 1, taper: 'none' }); R.line(x + 12, 218 - (m + e) * 7, x + 24, 218 - (m + e) * 7, { ink: 'B', w: 1, taper: 'none' }); R.line(x + 12, 218 - (m - e) * 7, x + 24, 218 - (m - e) * 7, { ink: 'B', w: 1, taper: 'none' }); R.text(i ? 'B  s = 0.6' : 'A  s = 2.2', x + 18, 228, 3.4, { al: 'c' }); });
    R.line(30, 218, 180, 218, { ink: 'B', w: 0.8, taper: 'none' });
    R.text('same mean, different spread:', 248, 190, 3.5, { al: 'c' }); R.text('B is more consistent', 248, 198, 3.5, { al: 'c', ink: 'P' }); R.text('large overlap of bars:', 248, 212, 3.5, { al: 'c' }); R.text('may not be significant', 248, 220, 3.5, { al: 'c' });
    R.line(320, 14, 320, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('MS 1.11  uncertainty', 486, 14, 4.2, { al: 'c' });
    R.text('every measurement has an uncertainty', 486, 26, 3.8, { al: 'c' });
    // burette/measuring cylinder reading
    R.tube(344, 40, 14, 64, { level: 0.55, ink: 'T', t: 0.25 }); [0, 1, 2, 3, 4].forEach(k => { R.line(358, 46 + k * 12, 362, 46 + k * 12, { ink: 'B', w: 0.6, taper: 'none' }); });
    R.text('reads 10.0 cm³', 372, 74, 3.8, { al: 'l' }); R.text('uncertainty ± 0.5 cm³', 372, 84, 3.8, { al: 'l', ink: 'P' });
    R.rrect(336, 118, 296, 22, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.12, wob: 0.3 }); R.text('percentage error = 0.5 ÷ 10.0 × 100 = 5 %', 484, 132, 4.1, { al: 'c', ink: 'P' });
    R.text('a bigger reading has a smaller percentage error:', 484, 156, 3.8, { al: 'c' }); R.text('0.5 ÷ 50.0 × 100 = 1 %', 484, 167, 3.9, { al: 'c' });
    R.line(332, 180, 640, 180, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('combining uncertainties', 486, 192, 4, { al: 'c' });
    R.text('start 2.0 ± 0.05 cm³ and end 9.0 ± 0.05 cm³', 486, 204, 3.7, { al: 'c' }); R.text('volume = 7.0 ± 0.1 cm³   (absolute uncertainties add)', 486, 214, 3.8, { al: 'c', ink: 'P' });
    R.text('0.1 ÷ 7.0 × 100 = 1.4 % error', 486, 225, 3.7, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(150 + p * 20, 130, 1.5, 'P', 0.8, 1); },
});

/* ---------- SK MS 2: algebra ---------- */
S({
  id: 'SK.MS2', num: 'MS 2', tag: 'MS 6.3', sub: 'Algebra: symbols, rearranging, substituting, solving, logarithms (MS 2.1–2.5)', title: 'Algebra', topic: 'SK', slot: [0, 3], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['MS 2.1', 'MS 2.2', 'MS 2.3', 'MS 2.4', 'MS 2.5'],
  card: {
    text: '<b>MS 2.1</b> symbols: =, <, ≪, ≫, >, ∝, ≈. <b>MS 2.2</b> change the subject of an equation (for example the magnification formula). <b>MS 2.3</b> substitute numerical values into equations using appropriate units (for example Simpson’s index of diversity). <b>MS 2.4</b> solve algebraic equations in a biological context, for example cardiac output = stroke volume × heart rate. <b>MS 2.5</b> use <b>logarithms</b> for quantities that range over several orders of magnitude, for example a log scale for the growth of a microorganism such as yeast.',
    terms: ['symbols', 'rearrange', 'substitute', 'solve', 'logarithm', 'log scale', 'proportional', 'cardiac output'],
    skill: 'MS 2.1–2.5', eq: MATH(mt('CO '), mo('='), mt('SV '), mo('×'), mt('HR')),
    q: 'Cardiac output is 5000 cm³ min⁻¹ and heart rate is 70 beats per minute. Find the stroke volume.', a: '5000 ÷ 70 = 71 cm³ (to 2 significant figures).'
  },
  draw(R, sc) {
    const tile = (x, y, w, h, tag, ttl, ink) => { R.rrect(x, y, w, h, 6, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(tag, x + 8, y + 12, 4.2, { al: 'l', ink: 'P' }); R.text(ttl, x + 38, y + 12, 3.9, { al: 'l' }); };
    tile(8, 8, 206, 108, 'MS 2.1', 'symbols', 'Y');
    [['=', 'equal to'], ['<  >', 'less than, greater than'], ['≪  ≫', 'much less, much greater'], ['∝', 'proportional to'], ['≈', 'approximately equal']].forEach(([s, t], i) => { R.text(s, 22, 40 + i * 14, 6.4, { al: 'l', ink: 'B' }); R.text(t, 76, 38 + i * 14, 3.9, { al: 'l' }); });
    tile(222, 8, 214, 108, 'MS 2.2', 'change the subject', 'T');
    R.text('M = I ÷ A', 230, 36, 5.4, { al: 'l', ink: 'P' });
    [['I = M × A', 'image size'], ['A = I ÷ M', 'actual size']].forEach(([a, b], i) => { R.text(a, 230, 58 + i * 16, 4.4, { al: 'l' }); R.text(b, 310, 58 + i * 16, 3.7, { al: 'l' }); });
    R.text('do the same to both sides', 230, 98, 3.7, { al: 'l', ink: 'P' });
    tile(444, 8, 208, 108, 'MS 2.3', 'substitute values', 'P');
    R.text('D = 1 − Σ(n ÷ N)²', 452, 36, 4.4, { al: 'l' });
    R.text('n = 5, 3, 2; N = 10', 452, 52, 3.9, { al: 'l' }); R.text('D = 1 − (0.5² + 0.3² + 0.2²)', 452, 64, 3.9, { al: 'l' }); R.text('D = 1 − (0.25 + 0.09 + 0.04) = 0.62', 452, 76, 3.9, { al: 'l', ink: 'P' });
    R.text('write the unit with every quantity', 452, 98, 3.6, { al: 'l' });
    tile(8, 124, 300, 108, 'MS 2.4', 'solve equations in biology', 'Y');
    R.text('cardiac output = stroke volume × heart rate', 16, 150, 4.3, { al: 'l' });
    R.text('CO = 70 cm³ × 72 min⁻¹ = 5040 cm³ min⁻¹', 16, 164, 4.1, { al: 'l', ink: 'P' });
    R.text('rearranged: SV = CO ÷ HR', 16, 184, 4.1, { al: 'l' });
    R.text('also: rate = change ÷ time;  % change =', 16, 202, 3.8, { al: 'l' }); R.text('(final − initial) ÷ initial × 100', 16, 213, 3.9, { al: 'l', ink: 'P' });
    tile(316, 124, 336, 108, 'MS 2.5', 'logarithms and log scales', 'T');
    const g = R.graph(344, 150, 130, 62, { xmin: 0, xmax: 10, ymin: 0, ymax: 5, xl: 'time / h', yl: 'log_{10} (cells)', xt: [0, 5, 10], yt: [[0, '0'], [2, '2'], [4, '4']], fs: 3.1, xly: 9, ylx: 10 }).axes();
    g.curve(x => 0.4 + 0.4 * x, { ink: 'P', w: 1.4, n: 2 });
    R.text('exponential growth is a straight line', 560, 156, 3.4, { al: 'c' }); R.text('on a log scale', 560, 164, 3.4, { al: 'c' });
    R.text('log_{10} 1000 = 3', 560, 180, 3.9, { al: 'c', ink: 'P' }); R.text('log_{10} 1 000 000 = 6', 560, 190, 3.9, { al: 'c' }); R.text('one unit = ×10', 560, 202, 3.8, { al: 'c' });
    R.text('e.g. yeast growth rate', 560, 215, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(344 + p * 130, 150 + 62 - (0.4 + 0.4 * p * 10) / 5 * 62, 1.8, 'P', 0.9, 1); },
});

/* ---------- SK MS 3: graphs ---------- */
S({
  id: 'SK.MS3', num: 'MS 3', tag: 'MS 6.4', sub: 'Graphs: translating, plotting, y = mx + c, intercept, rate and the tangent (MS 3.1–3.6)', title: 'Graphs', topic: 'SK', slot: [2, 3], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['MS 3.1', 'MS 3.2', 'MS 3.3', 'MS 3.4', 'MS 3.5', 'MS 3.6'],
  card: {
    text: '<b>MS 3.1</b> translate information between graphical, numerical and algebraic forms (for example dissociation curves). <b>MS 3.2</b> plot two variables from data, choosing the format: bar chart, histogram, line graph or scattergram. <b>MS 3.3</b> y = mx + c represents a <b>linear relationship</b> (m the gradient, c the intercept). <b>MS 3.4</b> determine the <b>intercept</b> of a graph (for example the compensation point in plants, or the concentration at which tissue neither gains nor loses mass). <b>MS 3.5</b> calculate the <b>rate of change</b> from a straight line: gradient = Δy ÷ Δx. <b>MS 3.6</b> draw and use the slope of a <b>tangent</b> to a curve as a measure of rate of change at a point (for example product formed against time).',
    terms: ['graph', 'gradient', 'intercept', 'linear relationship', 'tangent', 'rate of change', 'line of best fit', 'axes', 'units'],
    skill: 'MS 3.1–3.6', eq: MATH(mt('gradient '), mo('='), mfrac(mrow(mi('Δ'), mi('y')), mrow(mi('Δ'), mi('x')))),
    q: 'How do you find the rate of reaction at 30 s from a curve of product against time?', a: 'Draw a tangent to the curve at 30 s and calculate its gradient (Δy ÷ Δx).'
  },
  draw(R, sc) {
    R.text('MS 3.2  choose the right graph', 110, 14, 4.1, { al: 'c' });
    [['bar chart', 'categories'], ['histogram', 'continuous classes'], ['line graph', 'two continuous variables'], ['scattergram', 'correlation']].forEach(([n, d], i) => { const x = 14 + (i % 2) * 104, y = 24 + Math.floor(i / 2) * 58; R.rrect(x, y, 98, 50, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.08, wob: 0.3 });
      if (i === 0) [8, 14, 6].forEach((h, k) => R.rect(x + 14 + k * 24, y + 38 - h * 2, 16, h * 2, { ink: 'B', w: 0.6, fi: 'T', ft: 0.3 }));
      if (i === 1) [4, 8, 11, 7, 3].forEach((h, k) => R.rect(x + 10 + k * 15.6, y + 38 - h * 2.2, 15.6, h * 2.2, { ink: 'B', w: 0.6, fi: 'T', ft: 0.3 }));
      if (i === 2) R.stroke([x + 12, y + 34, x + 36, y + 24, x + 60, y + 20, x + 86, y + 10], { ink: 'P', w: 1.3, smooth: true, taper: 'none' });
      if (i === 3) [[14, 32], [26, 28], [38, 24], [52, 20], [66, 15], [78, 12]].forEach(([dx, dy]) => R.dot(x + dx, y + dy, 1.5, { ink: 'P' }));
      R.text(n, x + 49, y + 46, 3.4, { al: 'c' }); });
    R.text('axes: independent variable (x),', 110, 142, 3.5, { al: 'c' }); R.text('dependent variable (y); label with units', 110, 150, 3.5, { al: 'c' });
    R.line(10, 160, 210, 160, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('MS 3.3  y = mx + c', 110, 172, 4.1, { al: 'c' });
    const g = R.graph(36, 180, 120, 50, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'x', yl: 'y', fs: 3.1, xly: 8, ylx: 5 }).axes(); g.curve(x => 2 + 0.7 * x, { ink: 'P', w: 1.4, n: 2 }); g.dots([1, 2.5, 3, 4, 5, 5.6, 7, 6.8, 9, 8.1], { r: 1.2, ink: 'B' });
    R.text('m = gradient', 172, 192, 3.6, { al: 'l' }); R.text('c = intercept', 172, 202, 3.6, { al: 'l' }); R.text('on the y axis', 172, 210, 3.3, { al: 'l' }); R.text('c = 2 here', 172, 220, 3.4, { al: 'l', ink: 'P' });
    R.line(218, 14, 218, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('MS 3.4  intercept', 316, 14, 4.1, { al: 'c' });
    const gi = R.graph(240, 26, 150, 76, { xmin: 0, xmax: 0.5, ymin: -10, ymax: 10, xl: 'sucrose / mol dm^{−3}', yl: '% change in mass', xt: [[0, '0'], [0.2, '0.2'], [0.4, '0.4']], yt: [[-10, '-10'], [0, '0'], [10, '10']], fs: 3.1, xly: 12, ylx: 12 }).axes(); gi.curve(x => 10 - 55 * x, { ink: 'P', w: 1.4, n: 2 }); R.circle(gi.X(0.182), gi.Y(0), 2.6, { ink: 'T', w: 1.1 });
    R.text('intercept 0.18:', gi.X(0.22), gi.Y(0) - 16, 3.4, { al: 'l', ink: 'T' }); R.text('no net water movement', gi.X(0.22), gi.Y(0) - 10, 3.2, { al: 'l', ink: 'T' });
    R.text('(a plant’s compensation point is found the same way)', 316, 128, 3.4, { al: 'c' });
    R.line(224, 134, 410, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('MS 3.5  rate from a straight line', 316, 146, 4, { al: 'c' });
    const gr = R.graph(240, 156, 120, 50, { xmin: 0, xmax: 10, ymin: 0, ymax: 20, xl: 'time / min', yl: 'volume / cm³', xt: [0, 5, 10], yt: [[0, '0'], [10, '10'], [20, '20']], fs: 3, xly: 11, ylx: 10 }).axes(); gr.curve(x => 1.6 * x + 1, { ink: 'P', w: 1.4, n: 2 });
    gr.dashed(2, 4.2, 8, 4.2, { ink: 'B', w: 0.7 }); gr.dashed(8, 4.2, 8, 13.8, { ink: 'B', w: 0.7 });
    R.text('gradient = (13.8 − 4.2) ÷ (8 − 2)', 316, 226, 3.5, { al: 'c' }); R.text('= 1.6 cm³ min^{−1}', 370, 186, 3.7, { al: 'l', ink: 'P' });
    R.line(424, 14, 424, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('MS 3.6  tangent to a curve', 540, 14, 4.1, { al: 'c' });
    const gt = R.graph(456, 34, 158, 106, { xmin: 0, xmax: 60, ymin: 0, ymax: 10, xl: 'time / s', yl: 'product / cm³', xt: [0, 20, 40, 60], yt: [[0, '0'], [5, '5'], [10, '10']], fs: 3.2, xly: 10, ylx: 12 }).axes(); gt.curve(t => 10 * (1 - Math.exp(-t / 22)), { ink: 'P', w: 1.6 });
    const t0 = 15, y0 = 10 * (1 - Math.exp(-t0 / 22)), sl = 10 / 22 * Math.exp(-t0 / 22); gt.tangent(t0, y0, sl, 70, { ink: 'T', w: 1.2 });
    gt.dots([t0, y0], { r: 1.8, ink: 'B' });
    R.text('tangent at 15 s', gt.X(t0) + 22, gt.Y(y0) + 22, 3.4, { al: 'l', ink: 'T' });
    R.text('rate = gradient of the tangent = Δy ÷ Δx', 540, 158, 3.8, { al: 'c' }); R.text('read two far-apart points on the tangent', 540, 168, 3.5, { al: 'c' });
    R.text('steeper tangent: faster rate', 540, 182, 3.6, { al: 'c' }); R.text('at the plateau the gradient is zero', 540, 191, 3.6, { al: 'c' });
    R.text('MS 3.1: move between a table, a graph and an equation', 540, 212, 3.5, { al: 'c', ink: 'P' }); R.text('(for example dissociation curves)', 540, 221, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5), t = p * 60; A.dot(452 + t / 60 * 164, 28 + 112 - 10 * (1 - Math.exp(-t / 22)) / 10 * 112, 2, 'P', 0.9, 1); },
});

/* ---------- SK MS 4: geometry ---------- */
S({
  id: 'SK.MS4', num: 'MS 4', tag: 'MS 6.5', sub: 'Geometry: circumference, area, surface area and volume (MS 4.1)', title: 'Geometry and trigonometry', topic: 'SK', slot: [0, 4], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['MS 4.1'],
  card: {
    text: '<b>MS 4.1</b> calculate the <b>circumference</b> and <b>area of a circle</b> (circumference = 2πr = πd; area = πr²); the <b>surface area and volume</b> of rectangular prisms, cylindrical prisms and <b>spheres</b> (sphere: surface area 4πr², volume ⁴⁄₃πr³; cylinder: volume πr²h). Biological examples: the surface area or volume of a cell; the area of an inhibition zone (π r²); the <b>surface area to volume ratio</b>, which falls as a cell or organism gets bigger and explains the need for gas exchange surfaces and transport systems.',
    terms: ['circumference', 'area', 'volume', 'surface area', 'sphere', 'cylinder', 'prism', 'surface area to volume ratio'],
    skill: 'MS 4.1', eq: MATH(mt('area of a circle '), mo('='), mi('π'), msup(mi('r'), mn(2))),
    q: 'A sphere has radius 5 µm. Calculate its surface area.', a: '4 × π × 5² = 314 µm² (3 significant figures: 314 µm²).'
  },
  draw(R, sc) {
    R.text('regular shapes and their formulas', 160, 14, 4.3, { al: 'c' });
    // circle
    R.circle(50, 64, 28, { ink: 'B', w: 1.2, fi: 'T', ft: 0.12 }); R.line(50, 64, 78, 64, { ink: 'P', w: 1.2, taper: 'none' }); R.text('r', 64, 60, 3.8, { al: 'c', ink: 'P' });
    R.text('circle', 50, 102, 3.9, { al: 'c', ink: 'P' }); R.text('circumference = 2πr', 50, 112, 3.4, { al: 'c' }); R.text('area = πr²', 50, 121, 3.5, { al: 'c' });
    // sphere
    R.circle(152, 64, 28, { ink: 'B', w: 1.2, fi: 'P', ft: 0.12 }); R.ellipse(152, 64, 28, 9, { ink: 'B', w: 0.6, wob: 0.2 }); R.line(152, 64, 180, 64, { ink: 'P', w: 1.2, taper: 'none' });
    R.text('sphere', 152, 102, 3.9, { al: 'c', ink: 'P' }); R.text('surface area = 4πr²', 152, 112, 3.4, { al: 'c' }); R.text('volume = 4/3 πr³', 152, 121, 3.5, { al: 'c' });
    // cylinder
    R.ellipse(254, 44, 20, 7, { ink: 'B', w: 1, fi: 'Y', ft: 0.2 }); R.line(234, 44, 234, 84, { ink: 'B', w: 1.2, taper: 'none' }); R.line(274, 44, 274, 84, { ink: 'B', w: 1.2, taper: 'none' }); R.ellipse(254, 84, 20, 7, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.1 });
    R.text('cylinder', 254, 102, 3.9, { al: 'c', ink: 'P' }); R.text('volume = πr²h', 254, 112, 3.5, { al: 'c' }); R.text('curved area = 2πrh', 254, 121, 3.4, { al: 'c' });
    // cuboid
    R.poly([320, 56, 360, 56, 380, 42, 340, 42], { ink: 'B', w: 1.1, fi: 'T', ft: 0.12 }); R.poly([320, 56, 360, 56, 360, 88, 320, 88], { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12 }); R.poly([360, 56, 380, 42, 380, 74, 360, 88], { ink: 'B', w: 1.1, fi: 'P', ft: 0.1 });
    R.text('cuboid', 350, 102, 3.9, { al: 'c', ink: 'P' }); R.text('volume = l × w × h', 350, 112, 3.4, { al: 'c' }); R.text('surface area = sum of faces', 350, 121, 3.3, { al: 'c' });
    R.line(10, 134, 400, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('surface area to volume ratio falls as size increases', 205, 148, 4.1, { al: 'c' });
    [[1, 'T'], [2, 'P'], [3, 'Y']].forEach(([a, ink], i) => { const s = 10 + a * 8, x = 30 + i * 96; R.rect(x, 210 - s, s, s, { ink: 'B', w: 1, fi: ink, ft: 0.25 }); R.text('side ' + a + ' cm', x + s / 2, 222, 3.4, { al: 'c' }); R.text('SA : V = ' + (6 / a) + ' : 1', x + s / 2, 210 - s - 6, 3.6, { al: 'c', ink: 'P' }); });
    R.line(410, 14, 410, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // worked examples
    R.text('worked examples', 532, 14, 4.2, { al: 'c' });
    R.rrect(420, 24, 224, 62, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.1, wob: 0.3 });
    R.text('spherical cell, radius 5 µm', 532, 36, 3.9, { al: 'c' }); R.text('surface area = 4π × 5² = 314 µm²', 532, 48, 3.9, { al: 'c', ink: 'P' }); R.text('volume = 4/3 π × 5³ = 524 µm³', 532, 60, 3.9, { al: 'c', ink: 'P' }); R.text('SA : V = 0.60 : 1', 532, 74, 3.9, { al: 'c' });
    R.rrect(420, 94, 224, 52, 5, { ink: 'B', w: 0.9, fi: 'T', ft: 0.05, wob: 0.3 });
    R.text('inhibition zone, diameter 20 mm', 532, 106, 3.9, { al: 'c' }); R.text('area = π × 10² = 314 mm²', 532, 118, 3.9, { al: 'c', ink: 'P' }); R.text('(radius = diameter ÷ 2)', 532, 132, 3.4, { al: 'c' });
    R.rrect(420, 154, 224, 58, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.08, wob: 0.3 });
    R.text('bigger organism, smaller SA : V', 532, 166, 3.9, { al: 'c' }); R.text('so large animals need a specialised gas', 532, 178, 3.6, { al: 'c' }); R.text('exchange surface and a transport system', 532, 187, 3.6, { al: 'c' }); R.text('(see 3.3.1)', 532, 202, 3.4, { al: 'c', ink: 'P' });
    R.text('use the same units throughout', 532, 226, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(50 + Math.cos(p * TAU) * 28, 64 + Math.sin(p * TAU) * 28, 1.8, 'P', 0.9, 1); },
});
