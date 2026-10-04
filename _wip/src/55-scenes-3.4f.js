/* ===================== 3.4.6 Biodiversity within a community; 3.4.7 Investigating diversity ===================== */
function flowerSp(R, x, y, ink, s = 1) { R.push(x, y, 0, s); R.line(0, 0, 0, 9, { ink: 'T', w: 1.1, taper: 'end' }); for (let i = 0; i < 5; i++) { const a = i * TAU / 5 - PI / 2; R.circle(Math.cos(a) * 3.2, Math.sin(a) * 3.2, 2.5, { ink: 'B', w: 0.7, fi: ink, ft: ink === 'B' ? 0.55 : 0.8, wob: 0.1 }); } R.circle(0, 0, 1.6, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.9 }); R.pop(); }

/* ---------- 3.4.6a Species richness and index of diversity ---------- */
S({
  id: '3.4.6a', num: '3.4.6', sub: 'Biodiversity in a community: species richness and index of diversity', title: 'Biodiversity within a community', topic: '3.4', slot: [2, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.4.6.s1', '3.4.6.s2', '3.4.6.s3', '3.4.6.s4'],
  card: {
    text: 'Biodiversity can relate to a range of habitats, from a small local habitat to the whole Earth. <b>Species richness</b> is the number of different species in a community. An <b>index of diversity</b> describes the relationship between the number of species and the number of individuals in each species, so a community dominated by one species has a low index. Calculate it using <b>d = N(N − 1) ÷ Σn(n − 1)</b> where N = total number of organisms of all species and n = total number of organisms of each species. A higher value means a more diverse community.',
    terms: ['biodiversity', 'habitat', 'community', 'species richness', 'index of diversity', 'N', 'n', 'sum (Σ)'],
    skill: 'MS 2.3 / 1.5: index of diversity', eq: MATH(mi('d'), mo('='), mfrac(mi('N') + mpar(mi('N') + mo('−') + mn('1')), mo('∑') + mi('n') + mpar(mi('n') + mo('−') + mn('1')))),
    eqn: 'Field: 3 red, 5 white, 3 blue. N = 11; d = 11 × 10 ÷ (3×2 + 5×4 + 3×2) = 110 ÷ 32 = 3.44',
    q: 'A habitat has 20 organisms of one species only. What is its index of diversity?', a: 'd = 20 × 19 ÷ (20 × 19) = 1: the lowest possible value, as there is no diversity.'
  },
  draw(R, sc) {
    R.text('measuring biodiversity', 332, 14, 5, { al: 'c' });
    // field with 3 species
    R.rrect(14, 28, 160, 98, 6, { ink: 'B', w: 1.2, fi: 'T', ft: 0.12, wob: 0.4 });
    const rng = mulberry32(31), flowers = [['P', 3], ['Y', 5], ['B', 3]];
    flowers.forEach(([ink, n], si) => { for (let i = 0; i < n; i++) flowerSp(R, 30 + rng() * 128, 40 + rng() * 72, ink, 1.2); });
    R.text('a field: 11 organisms in 3 species', 94, 138, 4, { al: 'c' });
    R.text('species richness = 3', 94, 146, 4.2, { al: 'c', ink: 'P' });
    // key
    [['P', 'red species'], ['Y', 'white (yellow) species'], ['B', 'blue species']].forEach(([ink, t], i) => { flowerSp(R, 24, 162 + i * 14, ink, 0.9); R.text(t, 34, 165 + i * 14, 3.8, { al: 'l' }); });
    R.line(190, 22, 190, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // calculation table
    R.text('index of diversity d = N(N − 1) ÷ Σ n(n − 1)', 330, 28, 5, { al: 'c' });
    R.table(206, 36, [46, 46, 46, 56], 12, [['species', 'n', 'n − 1', 'n(n − 1)'], ['red', '3', '2', '6'], ['white', '5', '4', '20'], ['blue', '3', '2', '6'], ['total', 'N = 11', '', 'Σ = 32']], { size: 4.2, hink: 'Y' });
    R.text('d = 11 × 10 ÷ 32 = 110 ÷ 32 = 3.44', 330, 112, 5, { al: 'c', ink: 'P' });
    R.line(198, 122, 466, 122, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // same species richness, different evenness
    R.text('same species richness (3), different index', 332, 134, 4.4, { al: 'c' });
    const pop = (x, counts, d) => { let k = 0; counts.forEach((c, si) => { for (let i = 0; i < c; i++) { R.circle(x + (k % 8) * 7.4, 150 + Math.floor(k / 8) * 8, 2.8, { ink: 'B', w: 0.7, fi: ['P', 'Y', 'B'][si], ft: 0.7, wob: 0.1 }); k++; } }); R.text(d, x + 26, 190, 4.2, { al: 'c' }); };
    pop(220, [4, 4, 4], 'even: d = 3.7'); pop(332, [10, 1, 1], 'one dominant: d = 1.5');
    R.text('(12 × 11 ÷ 36 = 3.7 and 12 × 11 ÷ 90 = 1.5)', 332, 202, 3.4, { al: 'c' });
    R.text('a higher index = more diverse', 332, 214, 4.2, { al: 'c' }); R.text('all one species: d = 1', 332, 222, 4, { al: 'c' });
    R.line(480, 22, 480, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // scales
    R.text('biodiversity at all scales', 568, 28, 4.6, { al: 'c' });
    R.circle(532, 112, 14, { ink: 'B', w: 1, fi: 'T', ft: 0.2 }); R.circle(532, 112, 28, { ink: 'B', w: 1, fi: 'Y', ft: 0.1 }); R.circle(532, 112, 44, { ink: 'B', w: 1, fi: 'P', ft: 0.06 });
    R.text('local', 532, 114, 3.6, { al: 'c' }); R.text('region', 532, 94, 3.6, { al: 'c' }); R.text('Earth', 532, 78, 3.6, { al: 'c' });
    ['local habitat to', 'the whole Earth'].forEach((t, i) => R.text(t, 590, 108 + i * 7, 3.9, { al: 'l' }));
    ['higher index of diversity', 'may indicate a stable,', 'healthy community'].forEach((t, i) => R.text(t, 568, 180 + i * 7, 3.9, { al: 'c' }));
  },
  anim(A, sc) { const p = A.ph(5); A.dot(94 + Math.cos(p * TAU) * 40, 80 + Math.sin(p * TAU * 1.3) * 20, 1.3, 'Y', 0.7, 1); },
});

/* ---------- 3.4.6b Farming and conservation ---------- */
S({
  id: '3.4.6b', num: '3.4.6', sub: 'Farming techniques reduce biodiversity; the balance between conservation and farming', title: 'Biodiversity within a community', topic: '3.4', slot: [0, 6], dna: 'mark', ao: 3,
  covers: ['3.4.6.s5'],
  card: {
    text: 'Farming techniques reduce biodiversity: <b>monoculture</b> (growing one crop), removing hedgerows and woodland to make bigger fields, draining wetlands, using <b>herbicides and pesticides</b> to kill weeds and pests, and <b>fertilisers</b> that cause eutrophication. There is a balance to be struck between <b>conservation</b> and <b>farming</b>, which provides food for people: e.g. maintaining hedgerows and field margins, reduced pesticide use, rotating crops, and leaving some land uncultivated.',
    terms: ['biodiversity', 'monoculture', 'hedgerow', 'herbicide', 'pesticide', 'fertiliser', 'conservation', 'balance'],
    skill: 'Evaluate competing needs', eq: null,
    q: 'Give two ways in which a farming technique reduces biodiversity.', a: 'Removing hedgerows destroys habitats; herbicides and pesticides kill species other than the crop and their food supply.'
  },
  draw(R, sc) {
    R.text('farming and biodiversity', 160, 14, 5, { al: 'c' });
    // two fields
    const field = (x, y, w, h, mono) => {
      R.rect(x, y, w, h, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.12, wob: 0.4 });
      for (let i = 0; i < 6; i++) R.line(x + 6, y + 8 + i * (h - 14) / 5, x + w - 6, y + 8 + i * (h - 14) / 5, { ink: 'T', w: 2.2, t: 0.5, taper: 'none' });
      if (!mono) { R.stroke([x - 2, y + h + 3, x + w + 2, y + h + 3], { ink: 'T', w: 6, t: 0.7, taper: 'none', solid: false }); for (let i = 0; i < 10; i++) R.circle(x + 6 + i * (w - 12) / 9, y + h + 3 + (i % 2 ? 1.5 : -1.5), 2.8, { ink: 'B', w: 0.8, fi: 'TY', ft: 0.7, wob: 0.2 }); }
    };
    field(14, 30, 130, 52, true); R.text('large monoculture field, no hedgerow', 79, 100, 3.9, { al: 'c' });
    field(172, 30, 130, 52, false); R.text('smaller fields, hedgerow kept', 237, 100, 3.9, { al: 'c' });
    [['monoculture', 14], ['herbicides, pesticides', 14], ['hedgerows removed', 14]].forEach(() => {});
    R.line(8, 110, 312, 110, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('techniques that reduce biodiversity', 80, 122, 4.2, { al: 'c', ink: 'P' }); R.text('conservation measures', 244, 122, 4.2, { al: 'c', ink: 'T' });
    ['one crop only (monoculture)', 'hedgerows and woodland removed', 'herbicides remove weeds and the food', 'of insects; pesticides kill non-pests', 'fertilisers cause eutrophication', 'wetlands drained'].forEach((t, i) => R.text(t, 14, 134 + i * 8, 3.9, { al: 'l' }));
    ['keep or restore hedgerows', 'leave field margins uncultivated', 'rotate crops', 'reduce chemical use', 'protect wetlands and woodland'].forEach((t, i) => R.text(t, 176, 134 + i * 8, 3.9, { al: 'l' }));
    R.line(166, 112, 166, 182, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.line(8, 192, 312, 192, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // balance
    R.text('a balance: food for people and a diverse environment', 160, 204, 4.4, { al: 'c' });
    R.line(160, 212, 160, 226, { ink: 'B', w: 1.3, taper: 'none' }); R.line(150, 226, 170, 226, { ink: 'B', w: 1.3, taper: 'none' }); R.line(120, 214, 200, 212, { ink: 'B', w: 1.3, taper: 'none' });
    R.stroke([114, 220, 120, 228, 138, 228, 144, 220], { ink: 'B', w: 1, smooth: true, taper: 'none' }); R.stroke([176, 218, 182, 226, 198, 226, 204, 218], { ink: 'B', w: 1, smooth: true, taper: 'none' });
    R.text('farming', 129, 236, 3.8, { al: 'c' }); R.text('conservation', 190, 236, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 3; i++) A.dot(176 + ((p + i / 3) % 1) * 122, 86, 1.1, 'Y', 0.7, i); },
});

/* ---------- 3.4.7a Investigating diversity: DNA, mRNA and protein comparisons ---------- */
S({
  id: '3.4.7a', num: '3.4.7', sub: 'Investigating diversity: observable characteristics, DNA, mRNA and amino acid sequences', title: 'Investigating diversity', topic: '3.4', slot: [1, 6], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.4.7.s1', '3.4.7.s2', '3.4.7.s3'],
  card: {
    text: 'Genetic diversity within or between species can be compared using: the frequency of measurable or observable <b>characteristics</b>; the <b>base sequence of DNA</b>; the <b>base sequence of mRNA</b>; and the <b>amino acid sequence</b> of the proteins encoded by DNA and mRNA. Students interpret data on similarities and differences in base or amino acid sequences to suggest relationships within and between species: more differences suggest a more distant relationship. <b>Gene technology</b> has changed the methods: inferring DNA differences from observable characteristics has been replaced by direct investigation of DNA sequences. (Knowledge of the gene technologies themselves is not tested.)',
    terms: ['observable characteristics', 'DNA base sequence', 'mRNA base sequence', 'amino acid sequence', 'similarities', 'differences', 'relationship', 'gene technology'],
    skill: 'MS 0.3: percentage similarity', eq: MATH(mt('% similarity '), mo('='), mfrac(mt('matching bases'), mt('total bases compared')), mo('×'), mn('100')),
    eqn: 'e.g. 18 of 20 bases match = 90 % similar',
    q: 'Species A and B differ at 2 of 20 amino acid positions; A and C differ at 9 of 20. Which pair is more closely related?', a: 'A and B: fewer differences suggest a more recent common ancestor.'
  },
  draw(R, sc) {
    R.text('comparing sequences to infer relationships', 332, 14, 5, { al: 'c' });
    // DNA base sequences aligned for 3 species
    const seqs = [['species A', 'TACGGATTCCAGTCA'], ['species B', 'TACGGATTCGAGTCA'], ['species C', 'TCCGAATTGCTGACA']], X0 = 112, dx = 13.6;
    R.text('DNA base sequence', 14, 36, 4.4, { al: 'l' });
    seqs.forEach(([n, sq], r) => { const y = 46 + r * 20; R.text(n, 12, y + 6, 4, { al: 'l' }); sq.split('').forEach((b, i) => R.baseBox(X0 + i * dx, y, b, { w: 7, h: 8 })); });
    seqs[1][1].split('').forEach((b, i) => { if (b !== seqs[0][1][i]) R.circle(X0 + i * dx + 3.5, 46 + 20 + 4, 6, { ink: 'P', w: 1.3, wob: 0.12 }); });
    seqs[2][1].split('').forEach((b, i) => { if (b !== seqs[0][1][i]) R.circle(X0 + i * dx + 3.5, 46 + 40 + 4, 6, { ink: 'P', w: 1.3, wob: 0.12 }); });
    R.text('A and B differ at 1 of 15 bases', 320, 108, 4, { al: 'c' }); R.text('A and C differ at 5 of 15 bases', 320, 116, 4, { al: 'c' });
    R.text('→ A and B more closely related', 320, 125, 4.2, { al: 'c', ink: 'P' });
    R.line(8, 134, 656, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // amino acid sequences of the same protein
    R.text('amino acid sequence of the same protein', 14, 148, 4.4, { al: 'l' });
    const aa = [['A', ['P', 'Y', 'T', 'TY', 'P', 'Y', 'T', 'P', 'Y', 'T']], ['B', ['P', 'Y', 'T', 'TY', 'P', 'Y', 'T', 'P', 'Y', 'T']], ['C', ['P', 'T', 'T', 'TY', 'Y', 'Y', 'T', 'B', 'Y', 'P']]];
    aa.forEach(([n, a], r) => { const y = 164 + r * 16; R.text('species ' + n, 12, y + 1.4, 4, { al: 'l' }); a.forEach((ink, i) => { R.circle(X0 + i * 17, y, 5, { ink: 'B', w: 0.8, fi: ink, ft: 0.65 }); if (i) R.line(X0 + (i - 1) * 17 + 5, y, X0 + i * 17 - 5, y, { ink: 'B', w: 0.7, taper: 'none' }); if (r === 2 && ink !== aa[0][1][i]) R.circle(X0 + i * 17, y, 7.6, { ink: 'P', w: 1.2, wob: 0.1 }); }); });
    R.text('C has 4 differences from A: A and C are more distantly related', 14, 216, 4, { al: 'l', ink: 'P' });
    R.text('mRNA base sequences can be compared in the same way', 14, 226, 3.9, { al: 'l' });
    R.line(372, 142, 372, 236, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // gene technology changed the methods
    R.text('how the methods have changed', 516, 148, 4.5, { al: 'c' });
    R.rrect(388, 158, 118, 56, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.25 }); R.text('before', 447, 168, 4, { al: 'c' });
    ['compare observable', 'characteristics, e.g.', 'beak shape, colour:', 'infer DNA differences'].forEach((t, i) => R.text(t, 447, 177 + i * 7, 3.8, { al: 'c' }));
    R.arrow([508, 186, 524, 186], { ink: 'P', w: 1.2, hs: 3 });
    R.rrect(530, 158, 118, 56, 6, { ink: 'B', w: 1, fi: 'T', ft: 0.12, wob: 0.25 }); R.text('now', 589, 168, 4, { al: 'c' });
    R.helix(550, 172, 550, 206, { amp: 4, turns: 1.4, w: 0.8 });
    ['direct investigation', 'of DNA base', 'sequences'].forEach((t, i) => R.text(t, 600, 180 + i * 7, 3.8, { al: 'c' }));
    R.text('(knowledge of the technologies is not tested)', 516, 228, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(112 + Math.floor(p * 15) * 13.6 + 3.5, 38, 1.6, 'P', 0.9, 1); },
});

/* ---------- 3.4.7b Quantitative investigations of variation within a species ---------- */
S({
  id: '3.4.7b', num: '3.4.7', sub: 'Quantitative variation within a species: random samples, mean and standard deviation', title: 'Investigating diversity', topic: '3.4', slot: [3, 6], dna: 'mark', ao: 3,
  covers: ['3.4.7.s4', '3.4.7.s5', '3.4.7.s6'],
  card: {
    text: 'Quantitative investigations of variation within a species involve collecting data from <b>random samples</b> (so the sample is representative and unbiased), calculating a <b>mean</b> value, and calculating the <b>standard deviation</b> of that mean, then interpreting mean values and their standard deviations. A larger standard deviation means more spread in the data. Overlap of the ranges (mean ± SD) of two samples suggests the difference between the means may not be significant. (Students are not required to calculate standard deviations in written papers; they may be asked to interpret them.)',
    terms: ['random sample', 'mean', 'standard deviation', 'variation', 'spread', 'sample size', 'bias', 'error bar'],
    skill: 'MS 1.2, 1.10: mean ± SD', eq: MATH(mt('mean '), mo('='), mfrac(mo('∑') + mi('x'), mi('n'))),
    eqn: 'values: 4, 5, 6, 5, 5 → mean = 25 ÷ 5 = 5.0',
    q: 'Two samples have the same mean but different standard deviations. What does this tell you?', a: 'The sample with the larger SD has more spread: its individuals are more variable around the mean.'
  },
  draw(R, sc) {
    R.text('variation within a species', 160, 14, 5, { al: 'c' });
    // random sampling grid
    R.rect(14, 26, 120, 76, { ink: 'B', w: 1.1, fi: 'T', ft: 0.1, wob: 0.3 });
    for (let i = 1; i < 6; i++) R.line(14 + i * 20, 26, 14 + i * 20, 102, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' }); for (let j = 1; j < 4; j++) R.line(14, 26 + j * 19, 134, 26 + j * 19, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    [[2, 1], [4, 2], [0, 3], [5, 0], [3, 3]].forEach(([c, r]) => R.rect(14 + c * 20 + 3, 26 + r * 19 + 3, 14, 13, { ink: 'P', w: 1.2, fi: 'P', ft: 0.25 }));
    R.text('random numbers pick the quadrats', 74, 114, 3.8, { al: 'c' });
    // two distributions
    R.line(146, 22, 146, 120, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    const g = R.graph(172, 32, 130, 66, { xmin: 0, xmax: 10, ymin: 0, ymax: 11, xl: 'leaf length / mm', yl: 'frequency', xt: [], yt: [], fs: 3.7, xly: 10, ylx: 5 }).axes();
    g.curve(x => 10 * Math.exp(-0.5 * Math.pow((x - 4.6) / 0.9, 2)), { ink: 'T', w: 1.5 }); g.curve(x => 5.5 * Math.exp(-0.5 * Math.pow((x - 5.4) / 2, 2)), { ink: 'P', w: 1.5 });
    R.text('small SD', g.X(2.4), g.Y(9), 3.8, { al: 'r', ink: 'T' }); R.text('large SD', g.X(8.2), g.Y(4.2), 3.8, { al: 'l', ink: 'P' });
    R.line(8, 128, 312, 128, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // mean ± SD bars for two samples
    R.text('interpreting means and standard deviations', 160, 140, 4.4, { al: 'c' });
    const g2 = R.graph(40, 150, 120, 72, { xmin: 0, xmax: 3, ymin: 0, ymax: 12, xl: '', yl: 'mean leaf length / mm', xt: [], yt: [[0, '0'], [4, '4'], [8, '8'], [12, '12']], fs: 3.7, ylx: 12 }).axes();
    [[1, 7.2, 1.0, 'sample 1'], [2, 8.2, 1.2, 'sample 2']].forEach(([x, y, e, n]) => { R.rect(g2.X(x) - 10, g2.Y(y), 20, g2.Y(0) - g2.Y(y), { ink: 'B', w: 0.9, fi: 'P', ft: 0.5, wob: 0.1 }); g2.err(x, y, e); R.text(n, g2.X(x), g2.Y(0) + 8, 3.8, { al: 'c' }); });
    ['ranges (mean ± SD)', 'overlap: the difference', 'may not be significant', '', 'no overlap: more likely', 'a real difference'].forEach((t, i) => { if (t) R.text(t, 232, 160 + i * 8, 3.9, { al: 'c', ink: i > 3 ? 'T' : 'B' }); });
    R.text('mean = Σx ÷ n', 232, 214, 4.6, { al: 'c', ink: 'P' }); R.text('SD: spread of the data', 232, 224, 4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(14 + (Math.floor(p * 5)) * 20 + 10, 26 + ((Math.floor(p * 7)) % 4) * 19 + 10, 1.8, 'P', 0.9, 1); },
});
