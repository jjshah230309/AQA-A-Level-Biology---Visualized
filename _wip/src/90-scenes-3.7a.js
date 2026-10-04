/* ===================== TOPIC 3.7 Genetics, populations, evolution and ecosystems ===================== */
/* Punnett square: top = male gamete alleles, side = female gamete alleles, cells[r][c] = [genotype, phenotype, fillInk, fillT] */
function punnett(R, x, y, top, side, cells, o = {}) {
  const cs = o.cs || 24, gs = o.gs || 4.4, n = top.length, m = side.length, hs = o.hs || cs * 0.7;
  R.fill([x + hs, y, x + hs + cs * n, y, x + hs + cs * n, y + hs, x + hs, y + hs], { ink: 'Y', t: 0.18, wob: 0.1 });
  R.fill([x, y + hs, x + hs, y + hs, x + hs, y + hs + cs * m, x, y + hs + cs * m], { ink: 'Y', t: 0.18, wob: 0.1 });
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    const cl = cells[r][c], cx = x + hs + c * cs, cy = y + hs + r * cs;
    if (cl[2]) R.fill([cx, cy, cx + cs, cy, cx + cs, cy + cs, cx, cy + cs], { ink: cl[2], t: cl[3] === undefined ? 0.2 : cl[3], wob: 0.1 });
  }
  R.rect(x, y, hs + cs * n, hs + cs * m, { ink: 'B', w: 1, wob: 0.15 });
  R.line(x + hs, y, x + hs, y + hs + cs * m, { ink: 'B', w: 0.8, taper: 'none' }); R.line(x, y + hs, x + hs + cs * n, y + hs, { ink: 'B', w: 0.8, taper: 'none' });
  for (let c = 1; c < n; c++) R.line(x + hs + c * cs, y + hs, x + hs + c * cs, y + hs + cs * m, { ink: 'B', w: 0.5, taper: 'none' });
  for (let r = 1; r < m; r++) R.line(x + hs, y + hs + r * cs, x + hs + cs * n, y + hs + r * cs, { ink: 'B', w: 0.5, taper: 'none' });
  top.forEach((t, c) => R.text(t, x + hs + c * cs + cs / 2, y + hs / 2 + gs * 0.36, gs, { al: 'c' }));
  side.forEach((t, r) => R.text(t, x + hs / 2, y + hs + r * cs + cs / 2 + gs * 0.36, gs, { al: 'c' }));
  const ps = o.ps || 3.2;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    const cl = cells[r][c], cx = x + hs + c * cs + cs / 2, cy = y + hs + r * cs + cs / 2;
    if (cl[1]) { R.text(cl[0], cx, cy - 1.2, gs, { al: 'c' }); R.text(cl[1], cx, cy + 5.4, ps, { al: 'c' }); } else R.text(cl[0], cx, cy + gs * 0.36, gs, { al: 'c' });
  }
  return { x1: x + hs + cs * n, y1: y + hs + cs * m };
}
/* homologous chromosome pair with a band at the locus; a1/a2 = ink of the allele band ('P' dominant, 'T' recessive) */
function chromPair(R, x, y, h, a1, a2) {
  [[x, a1], [x + 9, a2]].forEach(([cx, ink]) => { R.rrect(cx - 2.6, y, 5.2, h, 2.6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.12, wob: 0.1 }); R.rect(cx - 2.6, y + h * 0.42, 5.2, 4, { ink: 'B', w: 0.7, fi: ink, ft: 0.9, wob: 0.05 }); });
}

/* ---------- 3.7 overview: common ancestry, populations, gene pools, isolation, communities ---------- */
S({
  id: '3.7', num: '3.7', sub: 'Evolution, common ancestry, populations and communities', title: 'Genetics, populations, evolution and ecosystems', topic: '3.7', slot: [0, 0], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.7.s1', '3.7.s2', '3.7.s3', '3.7.s4', '3.7.s5', '3.7.s6'],
  card: {
    text: 'The <b>theory of evolution</b> underpins modern biology: all new species arise from existing species, so species share <b>common ancestry</b>, shown in <b>phylogenetic classification</b>. This explains shared chemistry (the same 20 or so amino acids), physiological pathways such as anaerobic respiration, cell structure, <b>DNA</b> as the genetic material and the near-<b>universal genetic code</b>. Individuals of a species share the same genes but usually different <b>alleles</b>. A species exists as one or more <b>populations</b>; phenotypes vary because of genetic and environmental factors. <b>Genetic drift</b> (important in small populations) and <b>natural selection</b> change <b>allele frequencies</b>; a change in allele frequency is <b>evolution</b>. If a population is isolated there is no <b>gene flow</b>, differences accumulate and <b>reproductive isolation</b> means a new species has evolved. Populations of different species form <b>communities</b>, affected by <b>biotic</b> and <b>abiotic</b> factors.',
    terms: ['evolution', 'common ancestry', 'phylogenetic classification', 'universal genetic code', 'allele', 'population', 'genetic drift', 'natural selection', 'gene flow', 'reproductive isolation', 'community', 'biotic factor', 'abiotic factor'],
    skill: 'AO1: link evidence for common ancestry to a phylogenetic tree', eq: null,
    q: 'Give two pieces of evidence from cells and molecules that all living things share a common ancestor.', a: 'Any two of: DNA as the genetic material, a (nearly) universal genetic code, the same 20 or so amino acids, shared cell structure, shared pathways such as anaerobic respiration.'
  },
  draw(R, sc) {
    // ---- A: tree ----
    R.text('common ancestry', 108, 14, 4.6, { al: 'c' });
    const nd = (x, y, r = 2.2) => R.circle(x, y, r, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 });
    const br = (a, b) => R.stroke([a[0], a[1], a[0], b[1] + 6, b[0], b[1] + 6, b[0], b[1]], { ink: 'B', w: 1.2, smooth: false, taper: 'none', wob: 0.2 });
    const root = [108, 146], n1 = [62, 112], n2 = [148, 112], l = [[30, 48], [54, 48], [88, 48], [132, 48], [160, 48], [186, 48]];
    R.line(108, 160, 108, 146, { ink: 'B', w: 1.3, taper: 'none' });
    br(root, n1); br(root, n2);
    const m1 = [42, 80], m2 = [80, 80], m3 = [146, 80], m4 = [174, 80];
    br(n1, m1); br(n1, m2); br(n2, m3); br(n2, m4);
    br(m1, l[0]); br(m1, l[1]); br(m2, l[2]); br(m3, l[3]); br(m3, l[4]); br(m4, l[5]);
    [root, n1, n2, m1, m2, m3, m4].forEach(p => nd(p[0], p[1]));
    l.forEach((p, i) => { R.circle(p[0], p[1], 3.2, { ink: 'B', w: 0.9, fi: ['Y', 'P', 'T', 'Y', 'P', 'T'][i], ft: 0.5 }); R.text('ABCDEF'[i], p[0], p[1] - 6, 3.8, { al: 'c' }); });
    R.text('common ancestor', 108, 172, 3.8, { al: 'c', ink: 'P' });
    R.text('species that share a recent', 108, 100, 0.01, { al: 'c' });
    R.line(10, 180, 206, 180, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['the same 20 or so amino acids', 'DNA as the genetic material and a', 'near-universal genetic code', 'shared cell structure and pathways'].forEach((t, i) => R.text(t, 12, 191 + i * 7, 3.7, { al: 'l' }));
    R.text('(e.g. anaerobic respiration)', 12, 219, 3.5, { al: 'l', ink: 'P' });
    R.line(216, 14, 216, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // ---- B: genes, alleles, populations ----
    R.text('genes, alleles and populations', 330, 14, 4.6, { al: 'c' });
    [[236, 'same gene,', 'same alleles'], [284, 'same gene,', 'different alleles']].forEach(([x, a, b], i) => { chromPair(R, x + 10, 30, 36, 'P', i ? 'T' : 'P'); R.text(a, x + 14, 76, 3.4, { al: 'c' }); R.text(b, x + 14, 82, 3.4, { al: 'c' }); });
    R.text('individuals of a species share the same genes', 330, 96, 3.7, { al: 'c' }); R.text('but usually different combinations of alleles', 330, 103, 3.7, { al: 'c' });
    R.ellipse(330, 144, 86, 24, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.08, wob: 0.6, dash: true });
    for (let k = 0; k < 14; k++) { const a = k * 1.7, rr = 10 + (k * 13 % 48); R.circle(330 + Math.cos(a) * rr * 1.5, 144 + Math.sin(a) * rr * 0.36, 3.4, { ink: 'B', w: 0.7, fi: ['P', 'T', 'Y'][k % 3], ft: 0.55 }); }
    R.text('population: same species, same place and time,', 330, 180, 3.7, { al: 'c' }); R.text('able to interbreed. Its alleles make up the gene pool.', 330, 187, 3.7, { al: 'c' });
    R.text('genetic drift and natural selection', 330, 206, 3.9, { al: 'c', ink: 'P' }); R.text('change allele frequencies: that is evolution', 330, 213.5, 3.9, { al: 'c', ink: 'P' });
    R.line(436, 14, 436, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // ---- C: isolation and communities ----
    R.text('isolation and speciation', 548, 14, 4.6, { al: 'c' });
    R.ellipse(486, 52, 26, 14, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.4 }); R.ellipse(610, 52, 26, 14, { ink: 'B', w: 1, fi: 'T', ft: 0.12, wob: 0.4 });
    R.line(548, 28, 548, 76, { ink: 'B', w: 1.6, taper: 'none', t: 0.8 }); R.text('barrier', 548, 86, 3.6, { al: 'c' });
    R.arrow([520, 52, 540, 52], { ink: 'P', w: 0.8, hs: 2.2, both: true }); R.line(530, 44, 530, 60, { ink: 'P', w: 1.1, taper: 'none' }); R.text('no gene flow', 512, 34, 3.5, { al: 'c', ink: 'P' });
    ['differences accumulate in each gene pool;', 'if members can no longer interbreed and', 'produce fertile offspring: a new species'].forEach((t, i) => R.text(t, 548, 100 + i * 7, 3.7, { al: 'c' }));
    R.line(446, 126, 656, 126, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('communities and ecosystems', 548, 138, 4.6, { al: 'c' });
    [[470, 160, 'Y'], [500, 172, 'P'], [532, 160, 'T'], [562, 174, 'Y'], [594, 160, 'P']].forEach(([x, y, c], i) => { R.ellipse(x, y, 12, 8, { ink: 'B', w: 0.9, fi: c, ft: 0.5, wob: 0.3 }); });
    R.rrect(452, 148, 192, 38, 10, { ink: 'B', w: 0.8, wob: 0.4, dash: true });
    ['populations of different species form a community;', 'with the non-living (abiotic) factors it forms an ecosystem.', 'biotic factors: other populations. abiotic: physicochemical.'].forEach((t, i) => R.text(t, 548, 200 + i * 7, 3.6, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(6); for (let k = 0; k < 4; k++) { const a = p * TAU + k * 1.6; A.dot(330 + Math.cos(a) * (30 + k * 12), 134 + Math.sin(a) * 9, 1.8, ['P', 'T', 'Y', 'P'][k], 0.9, k); } },
});

/* ---------- 3.7.1a Key terms, monohybrid crosses, codominance, multiple alleles ---------- */
S({
  id: '3.7.1a', num: '3.7.1', sub: 'Genotype and phenotype; monohybrid crosses with dominant, recessive, codominant and multiple alleles', title: 'Inheritance', topic: '3.7', slot: [2, 0], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.7.1.s1', '3.7.1.s2', '3.7.1.s3', '3.7.1.s4', '3.7.1.s5', '3.7.1.s6'],
  card: {
    text: 'The <b>genotype</b> is the genetic constitution of an organism; the <b>phenotype</b> is its expression and its interaction with the environment. There may be many <b>alleles</b> of a gene (<b>multiple alleles</b>); alleles may be <b>dominant</b>, <b>recessive</b> or <b>codominant</b>. In a diploid organism the alleles at a <b>locus</b> are <b>homozygous</b> (identical) or <b>heterozygous</b> (different). A <b>fully labelled genetic diagram</b> shows parental phenotypes and genotypes, gametes, offspring genotypes and phenotypes, and the ratio. Crossing two heterozygotes for a dominant/recessive pair gives 3 : 1; two heterozygotes with codominant alleles give 1 : 2 : 1; with three alleles (e.g. blood groups A, B, O) a cross can give four phenotypes.',
    terms: ['genotype', 'phenotype', 'allele', 'locus', 'dominant', 'recessive', 'codominant', 'homozygous', 'heterozygous', 'multiple alleles', 'genetic diagram', 'gamete'],
    skill: 'MS 0.3: represent phenotypic ratios; MS 1.4: probability in inheritance', eq: MATH(mt('probability '), mo('='), mfrac(mt('number of ways the outcome can occur'), mt('total number of possible outcomes'))),
    q: 'Two heterozygous round-seeded plants are crossed. What is the probability that an offspring has wrinkled seeds?', a: '1 in 4 (¼ or 25 %): only the genotype rr is wrinkled.'
  },
  draw(R, sc) {
    // key terms
    R.text('key terms', 118, 14, 4.6, { al: 'c' });
    [[34, 'P', 'P', 'homozygous', 'dominant'], [100, 'P', 'T', 'heterozygous', ''], [166, 'T', 'T', 'homozygous', 'recessive']].forEach(([x, a, b, l1, l2], i) => { chromPair(R, x, 24, 36, a, b); R.text(['A A', 'A a', 'a a'][i], x + 4.5, 72, 4.4, { al: 'c' }); R.text(l1, x + 4.5, 80, 3.3, { al: 'c' }); if (l2) R.text(l2, x + 4.5, 86, 3.3, { al: 'c' }); });
    R.arrow([60, 44, 52, 42], { ink: 'B', w: 0.7, hs: 1.8 }); R.text('locus', 74, 46, 3.4, { al: 'l' });
    const defs = [['genotype', 'the alleles an organism has'], ['phenotype', 'expression of the genotype and its', 'interaction with the environment'], ['dominant', 'allele expressed with one copy'], ['recessive', 'expressed only with two copies'], ['codominant', 'both alleles expressed together'], ['multiple alleles', 'more than two alleles of a gene']];
    let y = 100; defs.forEach(d => { R.text(d[0], 12, y, 4, { al: 'l', ink: 'P' }); d.slice(1).forEach((t, k) => R.text(t, 68, y + k * 6.4, 3.8, { al: 'l' })); y += 7 + (d.length - 1) * 6.4 + 7; });
    R.text('diploid: two alleles of each gene; gametes (haploid): one', 118, 226, 3.7, { al: 'c', ink: 'B' });
    R.line(238, 14, 238, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // monohybrid
    R.text('monohybrid: heterozygous × heterozygous', 330, 14, 4.2, { al: 'c' });
    R.text('key: R round, r wrinkled', 330, 22, 3.4, { al: 'c' });
    const rows = [['parental phenotypes', 'round × round'], ['parental genotypes', 'Rr × Rr'], ['gametes', 'R  r   ×   R  r']];
    rows.forEach((r, i) => { R.text(r[0], 244, 34 + i * 9, 3.2, { al: 'l', ink: 'P' }); R.text(r[1], 330, 34 + i * 9, 4, { al: 'l' }); });
    punnett(R, 262, 64, ['R', 'r'], ['R', 'r'], [[['RR', 'round', 'Y', 0.3], ['Rr', 'round', 'Y', 0.3]], [['Rr', 'round', 'Y', 0.3], ['rr', 'wrinkled', 'T', 0.1]]], { cs: 30, hs: 16, gs: 4.4, ps: 3.2 });
    R.text('offspring genotypes and phenotypes', 330, 148, 3.2, { al: 'c', ink: 'P' });
    R.text('ratio  3 round : 1 wrinkled', 330, 158, 4.2, { al: 'c' });
    R.text('probability of wrinkled = 1/4', 330, 168, 3.7, { al: 'c' });
    R.text('capital letter: dominant allele', 330, 190, 3.5, { al: 'c' }); R.text('lower case letter: recessive allele', 330, 197, 3.5, { al: 'c' }); R.text('superscripts show codominant alleles', 330, 204, 3.5, { al: 'c' });
    R.text('always give a key for the letters used', 330, 214, 3.5, { al: 'c', ink: 'P' });
    R.line(426, 14, 426, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // codominance
    R.text('codominant alleles', 478, 14, 4.2, { al: 'c' });
    R.text('C^{R} red  C^{W} white', 478, 22, 3.4, { al: 'c' });
    R.text('roan × roan: C^{R}C^{W} × C^{R}C^{W}', 478, 32, 3.7, { al: 'c' });
    punnett(R, 436, 40, ['C^{R}', 'C^{W}'], ['C^{R}', 'C^{W}'], [[['C^{R}C^{R}', 'red', 'P', 0.3], ['C^{R}C^{W}', 'roan', 'Y', 0.3]], [['C^{R}C^{W}', 'roan', 'Y', 0.3], ['C^{W}C^{W}', 'white', null]]], { cs: 28, hs: 16, gs: 3.6, ps: 3 });
    R.text('1 red : 2 roan : 1 white', 478, 120, 4, { al: 'c' });
    // multiple alleles
    R.line(436, 130, 650, 130, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('multiple alleles: three alleles of one gene', 540, 140, 4, { al: 'c' });
    R.text('I^{A}I^{O} (group A) × I^{B}I^{O} (group B)', 540, 149, 3.6, { al: 'c' });
    punnett(R, 510, 154, ['I^{A}', 'I^{O}'], ['I^{B}', 'I^{O}'], [[['I^{A}I^{B}', 'AB', 'P', 0.25], ['I^{B}I^{O}', 'B', 'T', 0.1]], [['I^{A}I^{O}', 'A', 'Y', 0.3], ['I^{O}I^{O}', 'O', null]]], { cs: 25, hs: 15, gs: 3.5, ps: 3 });
    R.text('1 : 1 : 1 : 1', 540, 228, 3.8, { al: 'c' });
    R.text('I^{A} and I^{B} codominant,', 610, 178, 3.4, { al: 'c' }); R.text('both dominant to I^{O}', 610, 185, 3.4, { al: 'c' });
    R.text('four phenotypes', 610, 194, 3.4, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); for (let k = 0; k < 4; k++) { const a = p * TAU + k * 1.57; A.dot(104 + Math.cos(a) * 3, 44 + Math.sin(a) * 3, 0.8, k % 2 ? 'P' : 'T', 0.6, k); } },
});

/* ---------- 3.7.1b Dihybrid crosses ---------- */
S({
  id: '3.7.1b', num: '3.7.1', sub: 'Dihybrid crosses: 9 : 3 : 3 : 1 and the test cross', title: 'Inheritance', topic: '3.7', slot: [0, 1], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.7.1.s7'],
  card: {
    text: 'A <b>dihybrid cross</b> follows two genes at once. Each parent produces four types of gamete in equal numbers when the genes assort independently. Crossing two double heterozygotes (RrYy × RrYy) gives the phenotypic ratio <b>9 : 3 : 3 : 1</b> (round yellow : round green : wrinkled yellow : wrinkled green). Crossing a double heterozygote with a double homozygous recessive (a <b>test cross</b>) gives <b>1 : 1 : 1 : 1</b>. The ratios can also be found by multiplying probabilities: ¾ × ¾ = 9/16. Observed ratios differ from expected ones by chance, so a <b>chi-squared</b> test is used to decide whether the difference is significant.',
    terms: ['dihybrid cross', 'independent assortment', 'test cross', 'phenotypic ratio', 'gamete', 'double heterozygote', '9 : 3 : 3 : 1'],
    skill: 'MS 1.4: multiply probabilities for independent events', eq: MATH(mt('P(round and yellow) '), mo('='), mfrac(mn(3), mn(4)), mo('×'), mfrac(mn(3), mn(4)), mo('='), mfrac(mn(9), mn(16))),
    q: 'What fraction of the offspring of RrYy × RrYy are wrinkled and green?', a: '1/16 (rr, probability ¼, and yy, probability ¼).'
  },
  draw(R, sc) {
    R.text('key: R round, r wrinkled. Y yellow, y green', 150, 14, 3.8, { al: 'c' });
    [['parental phenotypes', 'round yellow × round yellow'], ['parental genotypes', 'RrYy × RrYy'], ['gametes', 'RY  Ry  rY  ry  ×  RY  Ry  rY  ry']].forEach((r, i) => { R.text(r[0], 12, 28 + i * 9, 3.2, { al: 'l', ink: 'P' }); R.text(r[1], 70, 28 + i * 9, 3.9, { al: 'l' }); });
    const g = ['RY', 'Ry', 'rY', 'ry'], ph = (a, b) => { const rd = a.includes('R') || b.includes('R'), yl = a.includes('Y') || b.includes('Y'); return [rd, yl]; };
    const gen = (m, f) => { const a = g[m], b = g[f]; return [a[0] + b[0], a[1] + b[1]].map((x) => x); };
    const cells = [];
    for (let r = 0; r < 4; r++) { cells.push([]); for (let c = 0; c < 4; c++) { const a = g[c], b = g[r], al1 = [a[0], b[0]].sort((x, y) => x < y ? -1 : 1).join('').replace(/^rR$/, 'Rr'), al2 = [a[1], b[1]].sort((x, y) => x < y ? -1 : 1).join('').replace(/^yY$/, 'Yy'); const gt = ((al1 === 'Rr' || al1 === 'rR') ? 'Rr' : al1) + ((al2 === 'Yy' || al2 === 'yY') ? 'Yy' : al2); const [rd, yl] = ph(al1, al2); cells[r].push([gt, null, yl ? 'Y' : 'TY', yl ? 0.3 : 0.16, !rd]); } }
    const px = 16, py = 62, cs = 24, hs = 16;
    const pr = punnett(R, px, py, g, g, cells.map(rw => rw.map(c => [c[0], null, c[2], c[3]])), { cs, hs, gs: 3.8 });
    cells.forEach((rw, r) => rw.forEach((c, cc) => { if (c[4]) R.hatch([px + hs + cc * cs, py + hs + r * cs, px + hs + cc * cs + cs, py + hs + r * cs, px + hs + cc * cs + cs, py + hs + r * cs + cs, px + hs + cc * cs, py + hs + r * cs + cs], 45, 3.4, { ink: 'B', w: 0.35, t: 0.8 }); }));
    R.text('offspring genotypes (phenotype by colour)', px + (hs + cs * 4) / 2, 188, 3.3, { al: 'c', ink: 'P' });
    // legend and ratio
    const lx = 138;
    [['Y', false, '9 round yellow'], ['TY', false, '3 round green'], ['Y', true, '3 wrinkled yellow'], ['TY', true, '1 wrinkled green']].forEach(([ink, wr, t], i) => { const y = 76 + i * 14; R.rect(lx, y - 4, 14, 10, { ink: 'B', w: 0.8, fi: ink, ft: ink === 'Y' ? 0.3 : 0.16 }); if (wr) R.hatch([lx, y - 4, lx + 14, y - 4, lx + 14, y + 6, lx, y + 6], 45, 3, { ink: 'B', w: 0.35, t: 0.8 }); R.text(t, lx + 20, y + 3, 4, { al: 'l' }); });
    R.text('ratio 9 : 3 : 3 : 1', 188, 140, 4.6, { al: 'c', ink: 'P' });
    R.text('hatched = wrinkled', 188, 150, 3.4, { al: 'c' });
    R.text('9/16 = 3/4 × 3/4', 188, 166, 3.8, { al: 'c' }); R.text('3/16 = 3/4 × 1/4', 188, 174, 3.8, { al: 'c' }); R.text('1/16 = 1/4 × 1/4', 188, 182, 3.8, { al: 'c' });
    R.line(268, 14, 268, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // observed vs expected
    R.text('what the ratio tells you', 450, 14, 4.4, { al: 'c' });
    R.text('test cross: RrYy × rryy', 380, 28, 4, { al: 'c' });
    punnett(R, 286, 36, ['RY', 'Ry', 'rY', 'ry'], ['ry'], [[['RrYy', null, 'Y', 0.3], ['Rryy', null, 'TY', 0.16], ['rrYy', null, 'Y', 0.3], ['rryy', null, 'TY', 0.16]]], { cs: 40, hs: 18, gs: 3.9 });
    [2, 3].forEach(c => { const x = 286 + 18 + c * 40; R.hatch([x, 54, x + 40, 54, x + 40, 94, x, 94], 45, 3.4, { ink: 'B', w: 0.35, t: 0.8 }); });
    ['round yellow', 'round green', 'wrinkled yellow', 'wrinkled green'].forEach((t, i) => R.text(t, 286 + 18 + i * 40 + 20, 104, 3.2, { al: 'c' }));
    R.text('1 : 1 : 1 : 1  shows the double heterozygote makes', 380, 120, 3.8, { al: 'c' }); R.text('four types of gamete in equal numbers', 380, 127, 3.8, { al: 'c' });
    // probability tree
    R.text('multiply probabilities', 570, 28, 4, { al: 'c' });
    const T0 = [492, 74];
    [['round', 3 / 4, 50], ['wrinkled', 1 / 4, 98]].forEach(([nm, pr, y], i) => { R.stroke([T0[0], T0[1], 520, y], { ink: 'B', w: 1, taper: 'none', wob: 0.2 }); R.text(nm + ' ' + (i ? '1/4' : '3/4'), 524, y + 1.5, 3.5, { al: 'l' }); [['yellow', '3/4', -8], ['green', '1/4', 8]].forEach(([n2, p2, dy], k) => { R.stroke([558, y, 586, y + dy], { ink: 'B', w: 0.9, taper: 'none', wob: 0.2 }); R.text(n2 + ' ' + p2, 590, y + dy + 1.4, 3.4, { al: 'l' }); const num = i === 0 ? (k === 0 ? 9 : 3) : (k === 0 ? 3 : 1); R.text(num + '/16', 636, y + dy + 1.4, 3.6, { al: 'l', ink: 'P' }); }); });
    R.line(280, 138, 656, 138, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('observed results never match exactly: use the chi-squared test', 468, 150, 3.8, { al: 'c' });
    R.text('to see if the difference from the expected ratio is due to chance', 468, 157, 3.8, { al: 'c' });
    [[330, 9], [366, 3], [402, 3], [438, 1]].forEach(([x, h], i) => { R.rect(x, 208 - h * 3.6, 16, h * 3.6, { ink: 'B', w: 0.8, fi: 'P', ft: 0.2 }); R.text(String(h), x + 8, 215, 3.6, { al: 'c' }); });
    R.text('expected', 392, 226, 3.7, { al: 'c' });
    [[520, 8], [550, 4], [580, 3], [610, 1]].forEach(([x, h], i) => { R.rect(x, 208 - h * 3.6, 14, h * 3.6, { ink: 'B', w: 0.8, fi: 'T', ft: 0.2 }); R.text(String(h), x + 7, 215, 3.6, { al: 'c' }); });
    R.text('observed (a sample of 16)', 568, 226, 3.7, { al: 'c', ink: 'T' });
    R.line(318, 208, 460, 208, { ink: 'B', w: 0.6, taper: 'none' }); R.line(508, 208, 636, 208, { ink: 'B', w: 0.6, taper: 'none' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(16 + 16 + ((p * 4) % 4) * 24 + 12, 62 + 16 + 12 + Math.floor(p * 4) * 24, 1.6, 'P', 0.8, 1); },
});

/* pedigree symbol: sex 'm' square / 'f' circle; st 'n' normal, 'a' affected (filled), 'c' carrier (half filled) */
function ped(R, x, y, sex, st, r = 6) {
  if (sex === 'm') { R.rect(x - r, y - r, 2 * r, 2 * r, { ink: 'B', w: 1, fi: st === 'a' ? 'P' : null, ft: 0.85, wob: 0.1 }); }
  else { R.circle(x, y, r, { ink: 'B', w: 1, fi: st === 'a' ? 'P' : null, ft: 0.85, wob: 0.1 }); if (st === 'c') { const p = []; for (let i = 0; i <= 8; i++) { const a = PI / 2 + PI * i / 8; p.push(x + Math.cos(a) * r * 0.96, y + Math.sin(a) * r * 0.96); } R.fill(p, { ink: 'P', t: 0.85, wob: 0.05 }); } }
}

/* ---------- 3.7.1c Sex linkage ---------- */
S({
  id: '3.7.1c', num: '3.7.1', sub: 'Sex-linked inheritance: X-linked recessive conditions', title: 'Inheritance', topic: '3.7', slot: [2, 1], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.7.1.s8'],
  card: {
    text: 'In humans females are XX and males are XY. The X chromosome carries many genes that are absent from the much smaller Y chromosome, so a male has only one allele of an <b>X-linked</b> gene and a recessive allele is always expressed in him. A female needs two copies. A <b>carrier</b> female (X<sup>H</sup>X<sup>h</sup>) is unaffected but passes the allele to half her gametes. Crossing a carrier mother with an unaffected father gives, on average, unaffected daughters (half of them carriers), unaffected sons and affected sons. A <b>sex-linked</b> condition is therefore more common in males and is never passed from father to son.',
    terms: ['sex linkage', 'X chromosome', 'Y chromosome', 'carrier', 'pedigree', 'recessive allele', 'genetic diagram'],
    skill: 'MS 1.4: probability of inheriting an X-linked allele', eq: null,
    q: 'Why can an unaffected father not pass an X-linked allele on to his son?', a: 'Sons receive their Y chromosome from their father and their X chromosome from their mother.'
  },
  draw(R, sc) {
    R.text('X-linked recessive condition', 150, 14, 4.4, { al: 'c' });
    R.text('key: X^{H} normal, X^{h} condition', 150, 22, 3.5, { al: 'c' });
    [['parental phenotypes', 'carrier female × normal male'], ['parental genotypes', 'X^{H}X^{h} × X^{H}Y'], ['gametes', 'X^{H}  X^{h}  ×  X^{H}  Y']].forEach((r, i) => { R.text(r[0], 12, 34 + i * 9, 3.2, { al: 'l', ink: 'P' }); R.text(r[1], 74, 34 + i * 9, 3.8, { al: 'l' }); });
    punnett(R, 40, 64, ['X^{H}', 'Y'], ['X^{H}', 'X^{h}'], [[['X^{H}X^{H}', 'female', null], ['X^{H}Y', 'male', null]], [['X^{H}X^{h}', 'carrier', 'P', 0.18], ['X^{h}Y', 'affected', 'P', 0.4]]], { cs: 40, hs: 18, gs: 3.8, ps: 3.2 });
    R.text('offspring genotypes and phenotypes', 98, 176, 3.2, { al: 'c', ink: 'P' });
    R.text('daughters: all unaffected, half carriers', 150, 190, 3.7, { al: 'c' }); R.text('sons: half unaffected, half affected', 150, 198, 3.7, { al: 'c' });
    R.text('1 : 1 : 1 : 1  (probability a son is affected = 1/2)', 150, 210, 3.7, { al: 'c', ink: 'P' });
    R.line(226, 14, 226, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // X and Y chromosomes
    R.text('why males are affected more often', 330, 14, 4.2, { al: 'c' });
    R.rrect(262, 28, 12, 54, 5, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.15 }); R.rect(262, 52, 12, 4, { ink: 'B', w: 0.7, fi: 'P', ft: 0.9, wob: 0.05 }); R.rrect(298, 50, 8, 32, 3.5, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.15 });
    R.text('X', 268, 92, 4.4, { al: 'c' }); R.text('Y', 302, 92, 4.4, { al: 'c' }); R.text('gene on X only', 268, 100, 3.4, { al: 'c', ink: 'P' }); R.arrow([284, 54, 276, 54], { ink: 'B', w: 0.8, hs: 2 });
    ['a male has one X: a recessive', 'allele on it is always expressed', '', 'a female needs two copies', '', 'father to son: never (the son', 'receives the father’s Y)'].forEach((t, i) => { if (t) R.text(t, 322, 36 + i * 8.4, 3.7, { al: 'l', ink: i >= 5 ? 'P' : 'B' }); });
    R.line(232, 108, 442, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('affected father × normal mother', 330, 120, 4, { al: 'c' }); R.text('X^{h}Y × X^{H}X^{H}', 330, 130, 3.8, { al: 'c' });
    punnett(R, 290, 138, ['X^{h}', 'Y'], ['X^{H}', 'X^{H}'], [[['X^{H}X^{h}', 'carrier', 'P', 0.18], ['X^{H}Y', 'normal', null]], [['X^{H}X^{h}', 'carrier', 'P', 0.18], ['X^{H}Y', 'normal', null]]], { cs: 34, hs: 15, gs: 3.4, ps: 3 });
    R.text('all daughters carriers, all sons unaffected', 330, 228, 3.7, { al: 'c' });
    R.line(442, 14, 442, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // pedigree
    R.text('pedigree of the first cross', 548, 14, 4.2, { al: 'c' });
    ped(R, 520, 40, 'f', 'c'); ped(R, 578, 40, 'm', 'n'); R.line(526, 40, 572, 40, { ink: 'B', w: 1, taper: 'none' });
    R.line(549, 40, 549, 62, { ink: 'B', w: 1, taper: 'none' }); R.line(484, 62, 614, 62, { ink: 'B', w: 1, taper: 'none' });
    [[484, 'm', 'a'], [524, 'm', 'n'], [574, 'f', 'c'], [614, 'f', 'n']].forEach(([x, sx, st]) => { R.line(x, 62, x, 76, { ink: 'B', w: 1, taper: 'none' }); ped(R, x, 84, sx, st); });
    R.text('I', 456, 42, 3.8, { al: 'c' }); R.text('II', 456, 86, 3.8, { al: 'c' });
    ped(R, 468, 128, 'm', 'n', 5); R.text('unaffected male', 478, 130, 3.4, { al: 'l' }); ped(R, 468, 140, 'f', 'n', 5); R.text('unaffected female', 478, 142, 3.4, { al: 'l' });
    ped(R, 468, 152, 'm', 'a', 5); R.text('affected male', 478, 154, 3.4, { al: 'l' }); ped(R, 468, 164, 'f', 'c', 5); R.text('carrier female', 478, 166, 3.4, { al: 'l' });
    R.text('a carrier mother passes the allele to', 548, 190, 3.6, { al: 'c' }); R.text('half of her sons (affected) and half of', 548, 197, 3.6, { al: 'c' }); R.text('her daughters (carriers)', 548, 204, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(268, 54 + Math.sin(p * TAU) * 1.2, 1.5, 'P', 0.8, 1); },
});

/* ---------- 3.7.1d Autosomal linkage ---------- */
S({
  id: '3.7.1d', num: '3.7.1', sub: 'Autosomal linkage and crossing over', title: 'Inheritance', topic: '3.7', slot: [0, 2], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.7.1.s8'],
  card: {
    text: '<b>Autosomal linkage</b> means two genes lie on the same chromosome (an autosome, not a sex chromosome), so their alleles tend to be inherited together and do not assort independently. Without crossing over, a double heterozygote with R and Y on one chromosome and r and y on the homologue makes only two types of gamete (RY and ry), so a test cross gives 1 : 1 instead of 1 : 1 : 1 : 1. <b>Crossing over</b> in meiosis I swaps alleles between homologous chromosomes and produces a few <b>recombinant</b> gametes (Ry and rY), giving small numbers of offspring with new combinations. Ratios that differ from the expected 9 : 3 : 3 : 1 or 1 : 1 : 1 : 1 can be a sign of linkage (or epistasis).',
    terms: ['autosomal linkage', 'crossing over', 'recombinant', 'parental type', 'homologous chromosomes', 'test cross', 'meiosis'],
    skill: 'MS 1.9 / AO3: compare observed with expected offspring ratios', eq: null,
    q: 'A test cross gives 47 round yellow, 46 wrinkled green, 4 round green and 3 wrinkled yellow. Suggest an explanation.', a: 'The two genes are linked on the same chromosome: most offspring are parental types; the few recombinants (round green, wrinkled yellow) are produced by crossing over.'
  },
  draw(R, sc) {
    R.text('genes on the same chromosome', 162, 14, 4.4, { al: 'c' });
    // homologous pair in a double heterozygote
    const chr = (x, a, b, ink1, ink2) => { R.rrect(x, 32, 14, 78, 6, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12, wob: 0.15 }); R.rect(x, 50, 14, 5, { ink: 'B', w: 0.7, fi: ink1, ft: 0.9, wob: 0.05 }); R.rect(x, 80, 14, 5, { ink: 'B', w: 0.7, fi: ink2, ft: 0.9, wob: 0.05 }); R.text(a, x - 4, 54, 3.6, { al: x < 80 ? 'r' : 'l' }); R.text(b, x - 4, 84, 3.6, { al: x < 80 ? 'r' : 'l' }); };
    chr(70, 'R', 'Y', 'P', 'P'); chr(94, 'r', 'y', 'T', 'T');
    ['R and Y on one chromosome,', 'r and y on its homologue:', 'genotype RrYy, genes linked'].forEach((t, i) => R.text(t, 84, 122 + i * 6.6, 3.7, { al: 'c' }));
    R.text('parental gametes', 84, 154, 3.9, { al: 'c', ink: 'P' }); R.text('RY   ry', 84, 162, 4.2, { al: 'c' }); R.text('(no crossing over)', 84, 169, 3.4, { al: 'c' });
    // crossing over
    R.text('crossing over (meiosis I)', 250, 36, 3.9, { al: 'c' });
    R.rrect(222, 42, 12, 62, 5, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.1 }); R.rrect(246, 42, 12, 62, 5, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.1 });
    R.rect(222, 52, 12, 4, { ink: 'B', w: 0.6, fi: 'P', ft: 0.9, wob: 0.05 }); R.rect(246, 52, 12, 4, { ink: 'B', w: 0.6, fi: 'T', ft: 0.9, wob: 0.05 }); R.rect(222, 88, 12, 4, { ink: 'B', w: 0.6, fi: 'P', ft: 0.9, wob: 0.05 }); R.rect(246, 88, 12, 4, { ink: 'B', w: 0.6, fi: 'T', ft: 0.9, wob: 0.05 });
    R.stroke([234, 72, 240, 66, 246, 78], { ink: 'P', w: 1.4, smooth: true, taper: 'none' }); R.stroke([234, 78, 240, 84, 246, 72], { ink: 'T', w: 1.4, smooth: true, taper: 'none' });
    R.arrow([250, 108, 250, 122], { ink: 'B', w: 1, hs: 2.8 });
    R.text('recombinant gametes', 262, 136, 3.8, { al: 'c', ink: 'P' }); R.text('Ry   rY', 262, 144, 4, { al: 'c' }); R.text('(new combinations, fewer)', 262, 151, 3.3, { al: 'c' });
    R.line(10, 178, 330, 178, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['test cross RrYy × rryy', 'if genes assorted independently: 1 : 1 : 1 : 1', 'if completely linked: only RY and ry gametes, 1 : 1', 'linked with crossing over: mostly parental types,', 'a few recombinants'].forEach((t, i) => R.text(t, 170, 190 + i * 7.6, 3.7, { al: 'c', ink: i === 0 ? 'P' : 'B' }));
    R.line(340, 14, 340, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // offspring comparison
    R.text('test cross offspring (out of 100)', 498, 14, 4.2, { al: 'c' });
    const cats = ['round yellow', 'wrinkled green', 'round green', 'wrinkled yellow'];
    const sets = [['independent assortment', [25, 25, 25, 25], 'T'], ['complete linkage', [50, 50, 0, 0], 'Y'], ['linked, with crossing over', [46, 46, 4, 4], 'P']];
    sets.forEach(([nm, vals, ink], si) => {
      const y0 = 30 + si * 66;
      R.text(nm, 360, y0 + 5, 3.9, { al: 'l', ink: si === 2 ? 'P' : 'B' });
      vals.forEach((v, i) => { const x = 376 + i * 70, h = v * 0.7; R.rect(x, y0 + 56 - h, 18, h, { ink: 'B', w: 0.8, fi: ink, ft: 0.3 }); R.text(String(v), x + 9, y0 + 54 - h - 2, 3.6, { al: 'c' }); if (si === 2) R.text(cats[i], x + 9, y0 + 64, 3.1, { al: 'c' }); });
      R.line(366, y0 + 56, 650, y0 + 56, { ink: 'B', w: 0.6, taper: 'none' });
    });
    R.text('first two bars: parental types. last two: recombinants', 498, 24, 3.5, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(240 + Math.sin(p * TAU) * 5, 72 + Math.cos(p * TAU) * 6, 1.6, 'P', 0.9, 1); },
});

/* ---------- 3.7.1e Epistasis ---------- */
S({
  id: '3.7.1e', num: '3.7.1', sub: 'Epistasis: recessive (9 : 3 : 4) and dominant (12 : 3 : 1)', title: 'Inheritance', topic: '3.7', slot: [2, 2], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.7.1.s8'],
  card: {
    text: '<b>Epistasis</b> occurs when an allele of one gene masks (blocks) the expression of the alleles of another gene at a different locus, often because the genes act in the same biochemical pathway. It changes the 9 : 3 : 3 : 1 ratio of a dihybrid cross. If the epistatic allele is <b>recessive</b> (e.g. yy blocks pigment production), crossing two double heterozygotes gives <b>9 : 3 : 4</b>. If the epistatic allele is <b>dominant</b> (e.g. W masks colour), the F2 ratio is <b>12 : 3 : 1</b>. Other epistatic ratios exist, such as 13 : 3. A ratio that is not 9 : 3 : 3 : 1 may therefore suggest epistasis (or linkage).',
    terms: ['epistasis', 'epistatic allele', 'masking', 'biochemical pathway', 'enzyme', '9 : 3 : 4', '12 : 3 : 1', 'phenotypic ratio'],
    skill: 'MS 0.3 / MS 1.9: interpret modified phenotypic ratios', eq: null,
    q: 'Two double heterozygotes give offspring in the ratio 9 : 3 : 4. What does this suggest?', a: 'Recessive epistasis: homozygous recessive alleles of one gene mask the expression of the other gene, so two of the four classes (3 + 1) look the same.'
  },
  draw(R, sc) {
    R.text('recessive epistasis: flower colour', 120, 14, 4.3, { al: 'c' });
    const bx = (x, y, t, fi) => { R.rrect(x, y, 70, 18, 4, { ink: 'B', w: 0.9, fi, ft: 0.25, wob: 0.2 }); R.text(t, x + 35, y + 11.2, 3.6, { al: 'c' }); };
    bx(12, 26, 'colourless', null); bx(12, 70, 'yellow pigment', 'Y'); bx(12, 114, 'orange pigment', 'P');
    R.arrow([47, 45, 47, 69], { ink: 'B', w: 1, hs: 2.6 }); R.arrow([47, 89, 47, 113], { ink: 'B', w: 1, hs: 2.6 });
    R.text('gene Y: enzyme 1', 88, 58, 3.6, { al: 'l' }); R.text('(needs Y)', 88, 64, 3.4, { al: 'l', ink: 'P' }); R.text('gene R: enzyme 2', 88, 102, 3.6, { al: 'l' }); R.text('(needs R)', 88, 108, 3.4, { al: 'l', ink: 'P' });
    ['yy: no yellow pigment is made, so', 'the flower is colourless whatever', 'the R alleles: yy is epistatic to R'].forEach((t, i) => R.text(t, 12, 148 + i * 7, 3.7, { al: 'l', ink: i === 2 ? 'P' : 'B' }));
    ['key: Y yellow pigment, y none', 'R orange pigment, r none'].forEach((t, i) => R.text(t, 12, 178 + i * 6.6, 3.5, { al: 'l' }));
    R.text('F1 YyRr × YyRr', 12, 204, 3.9, { al: 'l' }); R.text('F2 ratio 9 orange : 3 yellow : 4 white', 12, 213, 3.9, { al: 'l', ink: 'P' });
    R.line(222, 14, 222, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // Punnett
    const g = ['YR', 'Yr', 'yR', 'yr'], cells = [];
    for (let r = 0; r < 4; r++) { cells.push([]); for (let c = 0; c < 4; c++) { const a = g[c], b = g[r], y = [a[0], b[0]].sort().join(''), rr = [a[1], b[1]].sort().join(''); const Yp = y === 'Yy' || y === 'YY' || y === 'yY', gt = (y === 'yY' ? 'Yy' : y) + (rr === 'Rr' ? 'Rr' : rr); const white = y === 'yy', orange = !white && rr.indexOf('R') >= 0; cells[r].push([gt, null, white ? null : orange ? 'P' : 'Y', orange ? 0.25 : 0.35]); } }
    R.text('F2 genotypes', 336, 24, 3.6, { al: 'c', ink: 'P' });
    punnett(R, 262, 30, g, g, cells, { cs: 24, hs: 16, gs: 3.6 });
    [['P', 0.25, '9 orange'], ['Y', 0.35, '3 yellow'], [null, 0, '4 white']].forEach(([ink, t, l], i) => { R.rect(250 + i * 58, 156, 12, 8, { ink: 'B', w: 0.8, fi: ink, ft: t }); R.text(l, 250 + i * 58 + 16, 163, 3.6, { al: 'l' }); });
    R.text('YYRR YYRr YyRR YyRr = orange', 336, 180, 3.4, { al: 'c' }); R.text('YYrr Yyrr = yellow', 336, 187, 3.4, { al: 'c' }); R.text('yyRR yyRr yyrr = white', 336, 194, 3.4, { al: 'c' });
    R.text('9 : 3 : 4', 336, 214, 5, { al: 'c', ink: 'P' });
    R.line(436, 14, 436, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // dominant
    R.text('dominant epistasis: fruit colour', 546, 14, 4.3, { al: 'c' });
    R.text('W (white) masks colour; w coloured. Y yellow, y green', 546, 23, 3.4, { al: 'c' });
    R.rect(448, 32, 190, 56, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.06, wob: 0.15 });
    [['W_ _ _  (WWYY, WWYy, WWyy, WwYY, WwYy, Wwyy)', 'white'], ['wwY_  (wwYY, wwYy)', 'yellow'], ['wwyy', 'green']].forEach(([gt, ph], i) => { R.text(gt, 454, 44 + i * 16, 3.6, { al: 'l' }); R.text(ph, 632, 44 + i * 16, 3.8, { al: 'r', ink: 'P' }); if (i) R.line(448, 36 + i * 16, 638, 36 + i * 16, { ink: 'B', w: 0.4, taper: 'none' }); });
    [[470, 12, 'white', null, 0], [534, 3, 'yellow', 'Y', 0.35], [598, 1, 'green', 'TY', 0.3]].forEach(([x, n, l, ink, t]) => { R.rect(x, 168 - n * 4.6, 34, n * 4.6, { ink: 'B', w: 0.8, fi: ink, ft: t }); R.text(String(n), x + 17, 166 - n * 4.6, 4, { al: 'c' }); R.text(l, x + 17, 178, 3.6, { al: 'c' }); });
    R.line(456, 168, 640, 168, { ink: 'B', w: 0.6, taper: 'none' });
    R.text('F2 ratio 12 : 3 : 1', 546, 98, 4.6, { al: 'c', ink: 'P' });
    R.text('other epistatic ratios occur, e.g. 13 : 3', 546, 196, 3.7, { al: 'c' });
    R.text('a ratio other than 9 : 3 : 3 : 1 can mean', 546, 207, 3.7, { al: 'c' }); R.text('epistasis (or linkage)', 546, 214, 3.7, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(47, 47 + p * 20, 1.8, 'P', 0.9, 1); A.dot(47, 91 + p * 20, 1.8, 'P', 0.9, 2); },
});

/* ---------- 3.7.1f Chi-squared test on phenotypic ratios ---------- */
S({
  id: '3.7.1f', num: '3.7.1', sub: 'Chi-squared test for goodness of fit of phenotypic ratios', title: 'Inheritance', topic: '3.7', slot: [0, 3], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.7.1.s9'],
  card: {
    text: 'The <b>chi-squared (χ²) test</b> compares observed with expected numbers to decide whether a difference could be due to chance. State the <b>null hypothesis</b> (there is no significant difference between observed and expected results). Calculate the expected numbers from the ratio, then χ² = Σ (O − E)² ÷ E. The <b>degrees of freedom</b> are the number of categories minus 1. Compare χ² with the <b>critical value</b> at p = 0.05. If χ² is smaller than the critical value, the difference is not significant (it could be due to chance) and the null hypothesis is accepted. If χ² is larger, the probability that the difference is due to chance is less than 5 %, so the null hypothesis is rejected.',
    terms: ['chi-squared test', 'null hypothesis', 'observed', 'expected', 'degrees of freedom', 'critical value', 'p = 0.05', 'significant'],
    skill: 'MS 1.9: chi-squared test', eq: MATH(msup(mi('χ'), mn(2)), mo('='), msub(mo('∑'), mr('')), mfrac(msup(mrow(mo('('), mi('O'), mo('−'), mi('E'), mo(')')), mn(2)), mi('E'))),
    q: 'A chi-squared value of 9.1 is found with 3 degrees of freedom. What do you conclude?', a: 'The critical value for 3 degrees of freedom at p = 0.05 is 7.82. 9.1 is larger, so the difference is significant: reject the null hypothesis (the probability it is due to chance is less than 5 %).'
  },
  draw(R, sc) {
    R.text('worked example: seed shape and colour, expected ratio 9 : 3 : 3 : 1', 230, 14, 4.2, { al: 'c' });
    R.text('1  null hypothesis: no significant difference between observed and expected', 12, 28, 3.8, { al: 'l', ink: 'P' });
    R.table(12, 36, [88, 42, 56, 50, 66], 15, [['phenotype', 'O', 'E (9:3:3:1)', 'O − E', '(O − E)² ÷ E'], ['round yellow', '315', '312.75', '2.25', '0.016'], ['round green', '108', '104.25', '3.75', '0.135'], ['wrinkled yellow', '101', '104.25', '−3.25', '0.101'], ['wrinkled green', '32', '34.75', '−2.75', '0.218'], ['total', '556', '556', '', 'χ² = 0.470']], { size: 3.8, hink: 'Y' });
    R.text('E = 556 × 9/16 = 312.75, 556 × 3/16 = 104.25, 556 × 1/16 = 34.75', 12, 136, 3.5, { al: 'l' });
    R.text('2  χ² = Σ (O − E)² ÷ E = 0.016 + 0.135 + 0.101 + 0.218 = 0.470', 12, 150, 3.8, { al: 'l', ink: 'P' });
    R.text('3  degrees of freedom = categories − 1 = 4 − 1 = 3', 12, 162, 3.8, { al: 'l', ink: 'P' });
    R.text('4  critical value at p = 0.05 for 3 degrees of freedom = 7.82', 12, 174, 3.8, { al: 'l', ink: 'P' });
    R.rrect(12, 186, 300, 44, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.14, wob: 0.3 });
    R.text('5  0.470 is less than 7.82: the difference is not significant.', 162, 198, 4, { al: 'c' });
    R.text('Accept the null hypothesis: any difference is due to chance.', 162, 208, 4, { al: 'c' });
    R.text('(if χ² were greater, the probability of chance would be < 5 %: reject)', 162, 220, 3.5, { al: 'c', ink: 'P' });
    R.line(326, 14, 326, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // critical values and number line
    R.text('critical values at p = 0.05', 490, 14, 4.3, { al: 'c' });
    R.table(380, 24, [110, 110], 15, [['degrees of freedom', 'critical value'], ['1', '3.84'], ['2', '5.99'], ['3', '7.82'], ['4', '9.49']], { size: 3.9, hink: 'Y' });
    R.fill([380, 69, 600, 69, 600, 84, 380, 84], { ink: 'P', t: 0.18, wob: 0.1 }); 
    // number line
    R.text('where χ² falls', 490, 130, 4.2, { al: 'c' });
    R.arrow([372, 182, 628, 182], { ink: 'B', w: 1.1, hs: 3 });
    const X = v => 372 + v * 24;
    R.rect(X(0), 172, X(7.82) - X(0), 10, { ink: 'B', w: 0, fi: 'T', ft: 0.15, solid: false }); R.rect(X(7.82), 172, 628 - X(7.82), 10, { ink: 'B', w: 0, fi: 'P', ft: 0.25, solid: false });
    [0, 2, 4, 6, 8, 10].forEach(v => { R.line(X(v), 182, X(v), 186, { ink: 'B', w: 0.7, taper: 'none' }); R.text(String(v), X(v), 193, 3.5, { al: 'c' }); });
    R.line(X(7.82), 164, X(7.82), 186, { ink: 'P', w: 1.3, taper: 'none' }); R.text('critical value 7.82', X(7.82) - 4, 158, 3.6, { al: 'r', ink: 'P' });
    R.circle(X(0.47), 177, 2.6, { ink: 'B', w: 1, fi: 'T', ft: 0.9 }); R.text('0.47', X(0.47), 166, 3.8, { al: 'c' });
    R.text('not significant: due to chance', X(3.4), 210, 3.7, { al: 'c', ink: 'T' }); R.text('significant: reject H_0', X(9), 210, 3.7, { al: 'c', ink: 'P' });
    R.text('p < 0.05: the probability that the difference is due to chance is less than 5 %', 490, 226, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6), v = 0.47 + (0.5 - 0.5 * Math.cos(p * TAU)) * 8.5; A.dot(372 + v * 24, 177, 2.4, v > 7.82 ? 'P' : 'T', 0.95, 1); },
});

/* ---------- 3.7.2 Populations, gene pools and the Hardy-Weinberg principle ---------- */
S({
  id: '3.7.2', num: '3.7.2', sub: 'Gene pool, allele frequency and the Hardy–Weinberg equation', title: 'Populations', topic: '3.7', slot: [2, 3], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.7.2.s1', '3.7.2.s2', '3.7.2.s3', '3.7.2.s4'],
  card: {
    text: 'A <b>population</b> is a group of organisms of the same species occupying a particular space at a particular time that can potentially interbreed. The <b>gene pool</b> is all the alleles of all the genes in the population; <b>allele frequency</b> is how often an allele occurs. The <b>Hardy–Weinberg principle</b> is a mathematical model that predicts allele frequencies will not change from generation to generation, provided: the population is large; mating is random; there is no mutation, no selection and no migration (gene flow). If p is the frequency of the dominant allele and q of the recessive allele, then <b>p + q = 1</b> and <b>p² + 2pq + q² = 1</b>, where p² and q² are the frequencies of the homozygous genotypes and 2pq is the frequency of heterozygotes.',
    terms: ['population', 'gene pool', 'allele frequency', 'Hardy–Weinberg principle', 'dominant allele', 'recessive allele', 'heterozygote', 'genotype frequency'],
    skill: 'MS 2.4: Hardy–Weinberg calculations', eq: MATH(msup(mi('p'), mn(2)), mo('+'), mn(2), mi('p'), mi('q'), mo('+'), msup(mi('q'), mn(2)), mo('='), mn(1)),
    q: '4 % of a population have a recessive condition. What is the frequency of carriers?', a: 'q² = 0.04 so q = 0.2 and p = 0.8. Carriers = 2pq = 2 × 0.8 × 0.2 = 0.32, or 32 %.'
  },
  draw(R, sc) {
    R.text('p + q = 1', 118, 24, 5.4, { al: 'c', ink: 'P' });
    R.text('p^{2} + 2pq + q^{2} = 1', 118, 40, 6.4, { al: 'c' });
    [['p', 'frequency of the dominant allele'], ['q', 'frequency of the recessive allele'], ['p^{2}', 'homozygous dominant'], ['2pq', 'heterozygous'], ['q^{2}', 'homozygous recessive']].forEach((t, i) => { R.text(t[0], 22, 60 + i * 10, 4.4, { al: 'l', ink: 'P' }); R.text(t[1], 52, 60 + i * 10, 3.7, { al: 'l' }); });
    R.text('genotype frequencies when p = 0.8, q = 0.2', 118, 126, 3.8, { al: 'c' });
    const bw = 200, bx0 = 18; [['p²  0.64', 0.64, 'Y', 0.4], ['2pq  0.32', 0.32, 'P', 0.35], ['q²', 0.04, 'T', 0.5]].reduce((x, [l, f, ink, t]) => { R.rect(x, 134, bw * f, 24, { ink: 'B', w: 0.9, fi: ink, ft: t, wob: 0.1 }); R.text(l, x + bw * f / 2, 149, f > 0.1 ? 3.8 : 3.2, { al: 'c' }); return x + bw * f; }, bx0);
    R.text('q² 0.04', bx0 + bw * 0.98, 168, 3.4, { al: 'c', ink: 'T' });
    R.text('a gene pool: all the alleles', 118, 184, 3.7, { al: 'c' }); R.text('of all genes in a population', 118, 191, 3.7, { al: 'c' });
    for (let k = 0; k < 20; k++) R.circle(24 + (k % 10) * 20, 206 + Math.floor(k / 10) * 12, 3.6, { ink: 'B', w: 0.7, fi: k < 16 ? 'Y' : 'T', ft: 0.6 });
    R.text('p = 16/20 = 0.8     q = 4/20 = 0.2', 118, 232, 3.6, { al: 'c' });
    R.line(238, 14, 238, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // worked example
    R.text('worked example', 340, 14, 4.4, { al: 'c' });
    R.text('a recessive condition affects 4 % of a population', 340, 26, 3.8, { al: 'c' });
    ['q^{2} = 0.04', 'q = √0.04 = 0.2', 'p = 1 − q = 1 − 0.2 = 0.8', '2pq = 2 × 0.8 × 0.2 = 0.32', 'p^{2} = 0.8 × 0.8 = 0.64'].forEach((t, i) => { R.rrect(264, 36 + i * 24, 152, 18, 4, { ink: 'B', w: 0.8, fi: i === 3 ? 'P' : 'Y', ft: i === 3 ? 0.2 : 0.1, wob: 0.2 }); R.text(t, 340, 36 + i * 24 + 12, 4.2, { al: 'c' }); if (i < 4) R.arrow([340, 36 + i * 24 + 19, 340, 36 + i * 24 + 23], { ink: 'B', w: 0.7, hs: 1.8 }); });
    R.text('32 % of the population are carriers', 340, 168, 4.2, { al: 'c', ink: 'P' });
    R.text('check: 0.64 + 0.32 + 0.04 = 1', 340, 180, 3.8, { al: 'c' });
    R.text('allele frequencies stay constant from', 340, 202, 3.8, { al: 'c' }); R.text('generation to generation if the', 340, 209, 3.8, { al: 'c' }); R.text('conditions below are met', 340, 216, 3.8, { al: 'c' });
    R.line(440, 14, 440, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // conditions
    R.text('conditions for Hardy–Weinberg', 548, 14, 4.3, { al: 'c' });
    ['large population', 'random mating', 'no mutation', 'no selection', 'no migration (no gene flow)'].forEach((t, i) => { R.circle(460, 36 + i * 16, 4, { ink: 'B', w: 0.9, fi: 'T', ft: 0.08 }); R.line(457.6, 36 + i * 16, 459.4, 38.4 + i * 16, { ink: 'B', w: 1, taper: 'none' }); R.line(459.4, 38.4 + i * 16, 463, 33.4 + i * 16, { ink: 'B', w: 1, taper: 'none' }); R.text(t, 470, 37.4 + i * 16, 4.1, { al: 'l' }); });
    const g = R.graph(480, 130, 150, 66, { xmin: 0, xmax: 10, ymin: 0, ymax: 1, xl: 'generation', yl: 'p', fs: 3.4, xly: 10, ylx: 6 }).axes();
    g.curve(x => 0.8, { ink: 'T', w: 1.5 }); g.curve(x => 0.8 - 0.05 * x + 0.04 * Math.sin(x * 2), { ink: 'P', w: 1.2 });
    R.text('conditions met', 580, 135, 3.5, { al: 'l', ink: 'T' }); R.text('selection or small population:', 590, 184, 3.4, { al: 'c', ink: 'P' }); R.text('p changes', 590, 190.5, 3.4, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(480 + p * 150, 130 + 66 - 0.8 * 66, 2, 'T', 0.9, 1); },
});
