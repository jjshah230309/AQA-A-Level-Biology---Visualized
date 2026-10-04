/* base colours used everywhere: A pink, T teal, G yellow, C green(teal+yellow), U teal-light */
const BASE_INK = { A: 'P', T: 'T', U: 'T', G: 'Y', C: 'TY' };
Recorder.prototype.baseBox = function (x, y, base, o = {}) { // purine (A,G) larger than pyrimidine (C,T,U)
  const big = base === 'A' || base === 'G', w = (o.w || 9) * (big ? 1.25 : 0.9), h = o.h || 7;
  this.fill(roundBox(x, y, w, h), { ink: BASE_INK[base], t: base === 'U' ? 0.45 : 0.8, wob: 0.1 }); this.rect(x, y, w, h, { ink: 'B', w: 0.9, wob: 0.12 });
  this.text(base, x + w / 2, y + h * 0.72, h * 0.8, { ink: 'B', al: 'c' });
  return w;
};
/* pentose with O at top; labelled carbons optional; c2: 'H' (deoxyribose) or 'OH' (ribose) */
Recorder.prototype.pentose = function (cx, cy, r, c2, o = {}) {
  const R = this, p = polyPts(cx, cy, r, 5), fs = r * 0.5;
  R.poly(p, { ink: 'B', w: 1.1, fi: 'P', ft: 0.28 });
  R.text('O', p[0], p[1] + fs * 0.35, fs, { al: 'c' });
  // 2' carbon is the lower-left vertex (index 3), 3' lower-right? use p[6],p[7] as C2'
  const c2p = [p[6], p[7]];
  R.line(c2p[0], c2p[1], c2p[0] - r * 0.1, c2p[1] + r * 0.55, { ink: 'B', w: 0.9, taper: 'none' });
  R.text(c2, c2p[0] - r * 0.1, c2p[1] + r * 0.55 + fs * 1.05, fs, { al: 'c' });
  if (c2 === 'OH' && o.ring !== false) R.ellipse(c2p[0] - r * 0.1, c2p[1] + r * 0.55 + fs * 0.7, fs * 1.35, fs * 0.85, { ink: 'P', w: 1, wob: 0.1 });
  return { p, c2p };
};

/* ---------- 3.1.5.1 Structure of DNA and RNA ---------- */
S({
  id: '3.1.5.1', num: '3.1.5.1', title: 'Structure of DNA and RNA', topic: '3.1', slot: [1, 2], dna: 'bio',
  covers: ['3.1.5.1.s1', '3.1.5.1.s2', '3.1.5.1.s3', '3.1.5.1.s4', '3.1.5.1.s5', '3.1.5.1.s6', '3.1.5.1.s7', '3.1.5.1.s8'],
  card: {
    text: 'DNA and RNA are information-carrying polymers of <b>nucleotides</b>. In all living cells DNA holds genetic information and RNA transfers it from DNA to the ribosomes; ribosomes are made of RNA and protein. A nucleotide = a pentose, a nitrogen-containing organic base and a phosphate group. DNA: deoxyribose and A, C, G or T. RNA: ribose and A, C, G or U. A condensation reaction between nucleotides forms a <b>phosphodiester bond</b>. DNA is a double helix: two polynucleotide chains held by hydrogen bonds between specific complementary base pairs. RNA is a relatively short single chain. DNA’s simplicity led many scientists to doubt that it carried the genetic code.',
    terms: ['nucleotide', 'pentose', 'base', 'phosphate', 'deoxyribose', 'ribose', 'phosphodiester bond', 'double helix', 'complementary base pairing', 'hydrogen bond', 'ribosome'],
    skill: 'MS 0.3: base percentages', eq: MATH(mt('A = T, C = G;  if C = 28 % then G = 28 % and A = T = '), mfrac(mn(100) + mo('−') + mn(56), mn(2)), mt(' = 22 %')),
    q: 'Which bases pair, and what holds the two polynucleotide chains of DNA together?', a: 'A with T, C with G (complementary base pairs), joined by hydrogen bonds between the chains.'
  },
  draw(R, sc) {
    // double helix (vertical)
    R.helix(40, 22, 40, 168, { amp: 17, turns: 2.4, w: 1.3 });
    R.text('double helix', 40, 184, 5.2, { al: 'c' });
    R.text('sugar\u2013phosphate', 70, 46, 3.9, { al: 'l' }); R.text('backbone', 70, 52, 3.9, { al: 'l' }); R.arrow([69, 49, 53, 51], { ink: 'P', w: 0.8, hs: 2.2 });
    R.text('hydrogen bonds', 62, 112, 3.9, { al: 'l' }); R.text('between bases', 62, 118, 3.9, { al: 'l' }); R.arrow([61, 112, 44, 108], { ink: 'P', w: 0.8, hs: 2.2 });
    R.text('2 antiparallel', 40, 200, 4, { al: 'c' }); R.text('polynucleotide chains', 40, 206, 4, { al: 'c' });
    R.line(108, 14, 108, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // nucleotides: phosphate - pentose - base
    const nt = (x, y, deox, bases, name, note) => {
      R.text(name, x + 46, y - 20, 5.4, { al: 'c' });
      R.text('phosphate', x + 4, y - 10, 3.9, { al: 'c' }); R.text(deox ? 'deoxyribose' : 'ribose', x + 40, y - 16, 3.9, { al: 'c' }); R.text('base', x + 76, y - 10, 3.9, { al: 'c' });
      R.circle(x + 6, y + 2, 7, { ink: 'B', w: 1.1, fi: 'Y', ft: 1 }); R.text('P', x + 6, y + 4.6, 6, { al: 'c' });
      R.line(x + 13, y + 2, x + 22, y + 2, { ink: 'B', w: 1, taper: 'none' });
      R.pentose(x + 36, y + 2, 10, deox ? 'H' : 'OH');
      R.line(x + 46, y + 2, x + 62, y + 2, { ink: 'B', w: 1, taper: 'none' });
      R.fill(roundBox(x + 62, y - 5, 28, 14), { ink: 'T', t: 0.16, wob: 0.1 }); R.rect(x + 62, y - 5, 28, 14, { ink: 'B', w: 1, wob: 0.12 }); R.text(bases, x + 76, y + 4.4, 4.6, { al: 'c' });
      R.text(note, x + 36, y + 28, 3.9, { al: 'c' });
    };
    nt(116, 48, true, 'A C G T', 'DNA nucleotide', 'C2: H (deoxyribose)');
    nt(116, 104, false, 'A C G U', 'RNA nucleotide', 'C2: OH (ribose); U replaces T');
    R.text('three components:', 262, 52, 4.1, { al: 'l' }); R.text('phosphate group', 262, 59, 4.1, { al: 'l' }); R.text('pentose sugar', 262, 66, 4.1, { al: 'l' }); R.text('organic base', 262, 73, 4.1, { al: 'l' });
    R.line(112, 134, 312, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // polynucleotide chain with phosphodiester bonds
    const bs = ['A', 'T', 'G', 'C'];
    for (let i = 0; i < 4; i++) {
      const x = 122 + i * 46;
      R.circle(x, 152, 5.4, { ink: 'B', w: 1, fi: 'Y', ft: 1 }); R.text('P', x, 154, 4.8, { al: 'c' });
      R.line(x + 5.4, 152, x + 14, 152, { ink: 'B', w: 1, taper: 'none' });
      R.poly(polyPts(x + 21, 152, 6.8, 5), { ink: 'B', w: 1, fi: 'P', ft: 0.28 });
      R.line(x + 21, 158.8, x + 21, 165, { ink: 'B', w: 0.9, taper: 'none' }); R.baseBox(x + 21 - 5.5, 165, bs[i], { w: 9, h: 7 });
      if (i < 3) { R.line(x + 28, 152, x + 40.6, 152, { ink: 'B', w: 1, taper: 'none' }); R.bondMark(x + 34, 152, 3.4, { w: 1.2 }); }
    }
    R.text('phosphodiester bond', 172, 143, 4.6, { al: 'c' }); R.text('(condensation, \u2212H_2O)', 270, 143, 4, { al: 'c' });
    R.line(112, 182, 312, 182, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // complementary base pairs
    const pair = (x, y, a, b, n) => {
      const wa = R.baseBox(x, y, a, { w: 9, h: 8 }); const gx = x + wa + 6; R.baseBox(gx, y, b, { w: 9, h: 8 });
      for (let k = 0; k < n; k++) R.dashedLine(x + wa, y + 1.6 + k * 2.6, gx, y + 1.6 + k * 2.6, { ink: 'P', w: 0.8, d: 0.9 });
      R.text(n + ' hydrogen bonds', x + 14, y + 17, 3.9, { al: 'c' });
    };
    pair(122, 194, 'A', 'T', 2); pair(180, 194, 'G', 'C', 3);
    // short single-stranded RNA and ribosome
    R.text('RNA: short, single strand', 262, 190, 3.9, { al: 'c' });
    ['A', 'U', 'G', 'C'].forEach((b, i) => { R.circle(244 + i * 11, 200, 2.4, { ink: 'B', w: 0.8, fi: 'Y', ft: 1 }); R.baseBox(244 + i * 11 - 3.8, 204, b, { w: 7.6, h: 6.4 }); });
    R.line(244, 200, 277, 200, { ink: 'B', w: 0.9, taper: 'none' });
    R.ellipse(290, 214, 11, 6, { ink: 'B', w: 0.9, fi: 'P', ft: 0.5 }); R.ellipse(290, 208, 8, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.3 }); R.text('ribosome:', 288, 226, 3.8, { al: 'c' }); R.text('RNA + protein', 288, 231, 3.8, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(6);
    for (let k = 0; k < 6; k++) { const u = (p + k / 6) % 1; const y = 22 + u * 146, side = (k % 2) ? -1 : 1; A.dot(40 + Math.sin(u * TAU * 2.4 + (k % 2) * PI) * 17, y, 1.7, 'B', 0.9); }
  },
});

/* ---------- 3.1.5.2 DNA replication ---------- */
S({
  id: '3.1.5.2', num: '3.1.5.2', title: 'DNA replication', topic: '3.1', slot: [2, 2], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.1.5.2.s1', '3.1.5.2.s2', '3.1.5.2.s3', '3.1.5.2.s4', '3.1.5.2.s5', '3.1.5.2.s6'],
  card: {
    text: 'Semi-conservative replication ensures genetic continuity between generations of cells. The double helix <b>unwinds</b> and <b>DNA helicase</b> breaks the hydrogen bonds between complementary bases; each polynucleotide strand acts as a template. Free DNA nucleotides are attracted to exposed bases by complementary base pairing, and <b>DNA polymerase</b> catalyses the condensation reaction joining adjacent nucleotides. Each new molecule has one original and one new strand. Meselson and Stahl’s ¹⁵N/¹⁴N density-gradient experiment supported the Watson–Crick semi-conservative model over conservative replication.',
    terms: ['semi-conservative', 'DNA helicase', 'DNA polymerase', 'template strand', 'complementary base pairing', 'hydrogen bond', 'genetic continuity'],
    skill: 'Evaluating Meselson–Stahl', eq: null,
    q: 'After two generations in ¹⁴N, which DNA bands would semi-conservative replication predict?', a: 'Generation 1: all intermediate (one ¹⁵N strand, one ¹⁴N). Generation 2: half intermediate, half light (¹⁴N only).'
  },
  draw(R, sc) {
    // replication fork: parent duplex enters from left, forks at x~150
    const old = 'B', neu = 'P';
    const bases = ['A', 'T', 'G', 'C', 'T', 'A', 'C', 'G', 'A', 'T', 'G', 'C'];
    const comp = { A: 'T', T: 'A', G: 'C', C: 'G' };
    R.text('replication fork', 130, 18, 6, { al: 'c' });
    // parent duplex (x 14..150)
    for (let i = 0; i < 8; i++) {
      const x = 16 + i * 17;
      R.line(x, 116, x, 134, { ink: BASE_INK[bases[i]], w: 3.2, taper: 'none', wob: 0.1, t: 0.85 }); R.line(x + 0.0, 116, x, 126, { ink: 'B', w: 0.01, taper: 'none' });
    }
    R.stroke([12, 114, 152, 114], { ink: old, w: 1.5, taper: 'none' }); R.stroke([12, 136, 152, 136], { ink: old, w: 1.5, taper: 'none' });
    // opened strands
    R.stroke([152, 114, 176, 100, 214, 66, 262, 50, 310, 46], { ink: old, w: 1.5, smooth: true, taper: 'none' });
    R.stroke([152, 136, 176, 150, 214, 184, 262, 200, 310, 204], { ink: old, w: 1.5, smooth: true, taper: 'none' });
    // exposed bases on template strands + new nucleotides
    const upper = [[184, 94], [200, 78], [218, 66], [238, 56], [258, 51], [278, 49]], lower = [[184, 157], [200, 172], [218, 184], [238, 194], [258, 199], [278, 202]];
    upper.forEach((p, i) => {
      const b = bases[i + 2]; R.line(p[0], p[1], p[0] + 2, p[1] + 10, { ink: BASE_INK[b], w: 2.8, taper: 'none', t: 0.85 });
      if (i < 4) { R.line(p[0] + 2, p[1] + 13, p[0] + 3, p[1] + 21, { ink: BASE_INK[comp[b]], w: 2.8, taper: 'none', t: 0.85 }); R.dashedLine(p[0] + 2, p[1] + 10, p[0] + 2, p[1] + 13, { ink: 'P', w: 0.7, d: 0.6 }); }
    });
    lower.forEach((p, i) => {
      const b = bases[i + 8 > 11 ? i - 4 : i + 8]; R.line(p[0], p[1], p[0] - 2, p[1] - 10, { ink: BASE_INK[b], w: 2.8, taper: 'none', t: 0.85 });
      if (i < 4) { R.line(p[0] - 2, p[1] - 13, p[0] - 3, p[1] - 21, { ink: BASE_INK[comp[b]], w: 2.8, taper: 'none', t: 0.85 }); R.dashedLine(p[0] - 2, p[1] - 10, p[0] - 2, p[1] - 13, { ink: 'P', w: 0.7, d: 0.6 }); }
    });
    // new strands (pink) running behind the forks
    R.stroke([184, 115, 200, 99, 218, 87, 238, 77, 258 - 4, 70], { ink: neu, w: 1.6, smooth: true, taper: 'start' });
    R.stroke([184, 136, 200, 150, 218, 163, 238, 173, 258 - 4, 179], { ink: neu, w: 1.6, smooth: true, taper: 'start' });
    // enzymes
    const hel = [150, 106, 160, 100, 170, 108, 170, 142, 160, 150, 150, 144];
    R.fill(hel, { ink: 'T', t: 0.6, smooth: true, wob: 0.2 }); R.poly(hel, { ink: 'B', w: 1.3, smooth: true }); R.text('helicase', 136, 100, 4.4, { al: 'c' });
    R.ellipse(240, 94, 15, 9, { ink: 'B', w: 1.2, fi: 'T', ft: 0.5, rot: -42 }); R.text('DNA polymerase', 290, 86, 4.4, { al: 'c' });
    R.ellipse(240, 160, 15, 9, { ink: 'B', w: 1.2, fi: 'T', ft: 0.5, rot: 42 });
    R.text('H bonds broken', 168, 126, 4, { al: 'l' });
    // free nucleotides
    [[210, 28, 'T'], [236, 36, 'A'], [212, 220, 'C'], [238, 228, 'G']].forEach(([x, y, b]) => { R.circle(x, y, 3.2, { ink: 'B', w: 0.8, fi: 'Y', ft: 1 }); R.baseBox(x + 3.4, y - 3, b, { w: 6.4, h: 6 }); });
    R.text('free nucleotides', 232, 16, 4, { al: 'l' });
    R.text('old strand', 40, 107, 4.2, { al: 'c', ink: 'B' }); R.stroke([20, 98, 60, 98], { ink: old, w: 1.4, taper: 'none' });
    R.text('new strand', 40, 220, 4.2, { al: 'c', ink: 'P' }); R.stroke([20, 210, 60, 210], { ink: neu, w: 1.6, taper: 'none' });
    // ---- right: semi-conservative outcome + Meselson-Stahl ----
    R.line(334, 14, 334, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('semi-conservative', 408, 20, 5.6, { al: 'c' });
    const duplex = (x, y, a, b) => { R.stroke([x, y, x, y + 34], { ink: a, w: 1.8, taper: 'none' }); R.stroke([x + 8, y, x + 8, y + 34], { ink: b, w: 1.8, taper: 'none' }); for (let i = 0; i < 5; i++) R.line(x, y + 3 + i * 7, x + 8, y + 3 + i * 7, { ink: i % 2 ? 'T' : 'Y', w: 1.1, taper: 'none', t: 0.8 }); };
    duplex(396, 36, 'B', 'B');
    R.arrow([400, 74, 372, 92], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([400, 74, 430, 92], { ink: 'B', w: 0.9, hs: 2.4 });
    duplex(362, 96, 'B', 'P'); duplex(424, 96, 'B', 'P');
    R.arrow([366, 134, 350, 150], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([374, 134, 392, 150], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([428, 134, 414, 150], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([434, 134, 452, 150], { ink: 'B', w: 0.9, hs: 2.4 });
    duplex(336, 154, 'B', 'P'); duplex(382, 154, 'P', 'P'); duplex(414, 154, 'B', 'P'); duplex(446, 154, 'P', 'P');
    R.text('each new molecule: one old + one new strand', 408, 206, 4.1, { al: 'c' });
    R.text('parent', 430, 52, 4.2, { al: 'l' }); R.text('generation 1', 468, 112, 4.2, { al: 'l' }); R.text('generation 2', 468, 172, 4.2, { al: 'l' });
    // Meselson-Stahl tubes
    R.text('Meselson–Stahl', 568, 20, 5.6, { al: 'c' });
    const tubeAt = (x, bands, lab) => { R.tube(x, 30, 16, 110, { ink: 'T', t: 0.12, level: 0.9 }); bands.forEach(b => R.fill(roundBox(x - 6.5, 30 + b[0], 13, 4), { ink: 'B', t: b[1], wob: 0.1 })); R.text(lab, x, 154, 4.2, { al: 'c' }); };
    tubeAt(512, [[96, 1]], 'start (¹⁵N)'); tubeAt(560, [[78, 1]], 'gen 1'); tubeAt(608, [[78, 0.9], [96, 0.0]], '');
    tubeAt(608, [[78, 0.55], [60, 0.55]], 'gen 2');
    R.text('heavy', 640, 128, 3.8, { al: 'l' }); R.text('light', 640, 62, 3.8, { al: 'l' }); R.arrow([636, 66, 636, 124], { ink: 'B', w: 0.8, hs: 2, both: true });
    R.text('✓ semi-conservative', 568, 176, 5, { al: 'c', ink: 'T' });
    R.text('✗ conservative', 568, 186, 4.4, { al: 'c', ink: 'P' });
    R.text('single band after 1 generation,', 568, 204, 3.9, { al: 'c' }); R.text('half intermediate, half light after 2', 568, 210, 3.9, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(5), q = A.ph(5, 0.5);
    A.dot(210 + 8 * p, 28 + 38 * p, 2.0, 'Y', 1 - p * 0.3); A.dot(212 + 8 * q, 220 - 36 * q, 2.0, 'Y', 1 - q * 0.3);
    const h = A.ph(4); A.ring(160, 125, 9 + Math.sin(h * TAU) * 1.2, 'T', 0.8, 0.6);
  },
});

/* ---------- 3.1.6 ATP ---------- */
S({
  id: '3.1.6', num: '3.1.6', title: 'ATP', topic: '3.1', slot: [0, 3], dna: 'mark',
  covers: ['3.1.6.s1', '3.1.6.s2', '3.1.6.s3', '3.1.6.s4', '3.1.6.s5'],
  card: {
    text: 'A single molecule of <b>adenosine triphosphate</b> (ATP) is a nucleotide derivative: ribose, adenine and three phosphate groups. Hydrolysis of ATP to ADP and an inorganic phosphate group (Pi) is catalysed by <b>ATP hydrolase</b>. The hydrolysis can be coupled to energy-requiring reactions within cells, and the Pi released can phosphorylate other compounds, often making them more reactive. ATP is resynthesised by the condensation of ADP and Pi, catalysed by <b>ATP synthase</b> during photosynthesis or respiration.',
    terms: ['ATP', 'ADP', 'inorganic phosphate (Pi)', 'ATP hydrolase', 'ATP synthase', 'phosphorylate', 'coupled reaction'],
    skill: 'ATP cycle', eq: MATH(mt('ATP + '), H2O, mo('⇌'), mt('ADP + '), msub(mr('P'), mr('i'))),
    eqn: 'hydrolysis (ATP hydrolase) →  ·  ← condensation (ATP synthase)',
    q: 'How can ATP hydrolysis make a reaction happen that would not occur on its own?', a: 'Hydrolysis is coupled to the energy-requiring reaction, and the released Pi can phosphorylate a compound, making it more reactive.'
  },
  draw(R, sc) {
    // ---- the molecule ----
    R.atpMol(18, 46, 17);
    R.text('a nucleotide derivative', 224, 30, 4.6, { al: 'c' });
    R.line(8, 78, 312, 78, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- the ATP / ADP cycle ----
    R.rrect(52, 86, 64, 20, 6, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.55 }); R.text('ATP', 84, 100.6, 8.5, { al: 'c' });
    R.rrect(12, 142, 52, 20, 6, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.25 }); R.text('ADP', 38, 156.6, 8.5, { al: 'c' });
    R.text('+', 82, 156, 9, { al: 'c' }); R.circle(104, 152, 9, { ink: 'B', w: 1.3, fi: 'Y', ft: 1 }); R.text('P_i', 104, 155.5, 7, { al: 'c' });
    R.arrow([62, 110, 40, 138], { ink: 'B', w: 1.4, smooth: true, hs: 4.4 }); R.text('+H_2O', 34, 119, 5.4, { al: 'c' }); R.text('ATP hydrolase', 34, 126.5, 4.2, { al: 'c' });
    R.arrow([106, 140, 98, 112], { ink: 'B', w: 1.4, smooth: true, hs: 4.4 }); R.text('\u2212H_2O', 130, 122, 5.4, { al: 'c' }); R.text('ATP synthase', 134, 129.5, 4.2, { al: 'c' });
    R.text('hydrolysis', 38, 176, 4.8, { al: 'c' }); R.text('condensation', 112, 176, 4.8, { al: 'c' });
    R.line(160, 82, 160, 182, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- energy coupling ----
    R.text('energy-requiring reaction', 236, 92, 4.8, { al: 'c' });
    R.circle(196, 128, 7, { ink: 'B', w: 1, fi: 'T', ft: 0.6 }); R.text('+', 211, 131, 7, { al: 'c' }); R.circle(226, 128, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.5 });
    R.arrow([236, 128, 258, 128], { ink: 'B', w: 1.2, hs: 3.4 }); R.circle(276, 128, 11, { ink: 'B', w: 1.1, fi: 'TY', ft: 0.7 }); R.bondMark(276, 128, 12.5, { w: 1.1 });
    R.fill([238, 100, 246, 100, 246, 108, 238, 108], { ink: 'Y', t: 1, wob: 0.05 }); R.arrow([246, 110, 247, 121], { ink: 'Y', w: 2, hs: 4 }); R.text('energy from ATP', 262, 107, 4.3, { al: 'c' });
    // ---- phosphorylation ----
    R.text('Pi phosphorylates other compounds', 236, 160, 4.4, { al: 'c' });
    R.circle(196, 174, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.35 }); R.circle(214, 174, 4.5, { ink: 'B', w: 1, fi: 'Y', ft: 1 }); R.text('P', 214, 176, 4.4, { al: 'c' });
    R.arrow([224, 174, 246, 174], { ink: 'B', w: 1.1, hs: 3 });
    R.circle(266, 174, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.35 }); R.circle(277, 168, 4.5, { ink: 'B', w: 1, fi: 'Y', ft: 1 }); R.text('P', 277, 170, 4.4, { al: 'c' });
    R.text('more reactive', 270, 190, 4.4, { al: 'c' });
    R.line(8, 194, 312, 194, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- resynthesis by ATP synthase in a membrane ----
    R.fill([20, 206, 220, 206, 220, 216, 20, 216], { ink: 'Y', t: 0.4, wob: 0.1 }); R.line(20, 206, 220, 206, { ink: 'B', w: 1.1, taper: 'none' }); R.line(20, 216, 220, 216, { ink: 'B', w: 1.1, taper: 'none' });
    const as = R.atpSynthase(120, 211, 0.9, { dir: 1 });
    for (let i = 0; i < 5; i++) R.text('H^+', 70 + i * 18, 200, 4, { al: 'c' });
    R.text('ADP + P_i \u2192 ATP', 176, 232, 5, { al: 'c' });
    R.text('respiration and photosynthesis', 260, 214, 4.4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(4);
    const u = p < 0.5 ? p * 2 : 1 - (p - 0.5) * 2;
    A.dot(104 - 6 * u, 152 - 54 * u, 3.0, 'Y', 1); A.text('P', 104 - 6 * u, 153.2 - 54 * u, 3.8, 'B');
    const e = A.ph(2.6); A.dot(246 + 0, 108 + e * 14, 2.0, 'Y', 1 - e * 0.5);
    for (let i = 0; i < 4; i++) { const q = (A.ph(3, i * 0.25)); A.dot(96 + i * 16 + (1 - q) * 8, 198 + q * 24, 1.6, 'P', 1 - q * 0.3, i); }
  },
});

/* ---------- 3.1.7 Water ---------- */
S({
  id: '3.1.7', num: '3.1.7', title: 'Water', topic: '3.1', slot: [1, 3], dna: 'mark',
  covers: ['3.1.7.s1', '3.1.7.s2', '3.1.7.s3', '3.1.7.s4', '3.1.7.s5', '3.1.7.s6'],
  card: {
    text: 'Water is a major component of cells and has properties important in biology. It is a <b>metabolite</b> in many metabolic reactions, including condensation and hydrolysis; an important <b>solvent</b> in which metabolic reactions occur; it has a relatively high <b>heat capacity</b>, buffering changes in temperature; a relatively large <b>latent heat of vaporisation</b>, giving a cooling effect with little loss of water; and strong <b>cohesion</b> between molecules, which supports columns of water in the tube-like transport cells of plants and produces surface tension where water meets air.',
    terms: ['metabolite', 'solvent', 'heat capacity', 'latent heat of vaporisation', 'cohesion', 'surface tension', 'hydrogen bond', 'polar'],
    skill: 'Hydrogen bonding in water', eq: null,
    q: 'Which property of water allows sweating to cool the body with little loss of water?', a: 'Its large latent heat of vaporisation: a lot of heat energy is taken from the skin to evaporate a little water.'
  },
  draw(R, sc) {
    // polar molecule and hydrogen-bond network (top-left)
    R.text('polar molecule', 52, 18, 5, { al: 'c' });
    R.water(26, 38, 8.5, 0, { charges: true }); R.water(76, 36, 8.5, 10, {}); R.water(46, 78, 8.5, -20, {}); R.water(82, 80, 8.5, 15, {});
    R.dashedLine(36, 41, 66, 38, { ink: 'P', w: 1, d: 1.3 }); R.dashedLine(30, 50, 42, 68, { ink: 'P', w: 1, d: 1.3 }); R.dashedLine(76, 46, 80, 70, { ink: 'P', w: 1, d: 1.3 }); R.dashedLine(56, 80, 72, 80, { ink: 'P', w: 1, d: 1.3 });
    R.text('hydrogen bonds', 52, 102, 4, { al: 'c' });
    // 1 metabolite
    R.line(104, 14, 104, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('metabolite', 154, 18, 5, { al: 'c' });
    R.circle(130, 48, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.6 }); R.circle(148, 48, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); R.bondMark(139, 48, 3.4);
    R.arrow([156, 40, 176, 30], { ink: 'B', w: 0.9, hs: 2.4 }); R.drop(188, 28, 5);
    R.arrow([188, 62, 150, 56], { ink: 'B', w: 0.9, hs: 2.4 }); R.drop(194, 66, 5); R.text('condensation, hydrolysis', 154, 90, 4, { al: 'c' });
    // 2 solvent
    R.line(212, 14, 212, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('solvent', 262, 18, 5, { al: 'c' });
    R.circle(262, 56, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.7 }); R.text('Na^+', 262, 58, 4, { al: 'c' }); R.circle(284, 70, 6, { ink: 'B', w: 1, fi: 'T', ft: 0.7 }); R.text('Cl^−', 284, 72, 4, { al: 'c' });
    for (let k = 0; k < 5; k++) { const a = k * TAU / 5 + 0.4; R.water(262 + Math.cos(a) * 17, 56 + Math.sin(a) * 17, 4.2, a * 57.3 + 90, {}); }
    for (let k = 0; k < 5; k++) { const a = k * TAU / 5 + 1.1; R.water(284 + Math.cos(a) * 17, 70 + Math.sin(a) * 17, 4.2, a * 57.3 - 90, {}); }
    R.text('ions and polar molecules dissolve', 262, 100, 3.9, { al: 'c' });
    R.line(8, 112, 312, 112, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 3 heat capacity
    R.text('high heat capacity', 54, 124, 5, { al: 'c' });
    R.beaker(26, 138, 40, 40, { level: 0.7, ink: 'T', t: 0.5 }); R.thermometer(86, 138, 34, { level: 0.45 });
    Icons.flame(R, 46, 192, 6); R.text('small temperature rise', 58, 222, 3.9, { al: 'c' });
    // 4 latent heat of vaporisation
    R.line(112, 118, 112, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('latent heat of vaporisation', 164, 124, 5, { al: 'c' });
    R.fill([122, 188, 206, 188, 206, 204, 122, 204], { ink: 'P', t: 0.28, wob: 0.15 }); R.text('skin', 164, 201, 4.2, { al: 'c' });
    [[134, 184], [154, 184], [176, 184], [196, 184]].forEach(([x, y]) => R.drop(x, y, 4, { label: false }));
    for (let i = 0; i < 4; i++) R.stroke([134 + i * 20, 176, 138 + i * 20, 160, 130 + i * 20, 148], { ink: 'Y', w: 1.3, wob: 0.15 });
    R.text('cooling with little water lost', 164, 222, 3.9, { al: 'c' });
    // 5 cohesion
    R.line(212, 118, 212, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('cohesion', 262, 124, 5, { al: 'c' });
    R.rect(228, 132, 14, 80, { ink: 'B', w: 1.1, fi: 'T', ft: 0.45 }); for (let i = 0; i < 5; i++) R.dashedLine(235, 138 + i * 14, 235, 146 + i * 14, { ink: 'P', w: 0.8, d: 0.9 });
    R.text('xylem', 235, 224, 4, { al: 'c' });
    R.fill([252, 182, 312, 182, 312, 212, 252, 212], { ink: 'T', t: 0.4, wob: 0.15 }); R.line(252, 182, 312, 182, { ink: 'B', w: 1.2, taper: 'none' });
    R.circle(282, 174, 3, { ink: 'B', w: 1, fi: 'P', ft: 0.8 }); [[276, 178], [288, 178], [270, 181], [294, 181]].forEach(p => R.line(282, 174, p[0], p[1], { ink: 'B', w: 0.7, taper: 'none' }));
    R.text('surface tension', 282, 224, 4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(4);
    for (let i = 0; i < 4; i++) { const q = (p + i * 0.25) % 1; A.dot(140 + i * 20 + Math.sin(q * 8 + i) * 3, 176 - q * 28, 1.6, 'T', (1 - q) * 0.9, i); }
    for (let i = 0; i < 4; i++) A.dot(235 + (i % 2 ? 2 : -2), 212 - ((p * 74 + i * 18) % 76), 1.4, 'T', 0.9, i);
  },
});

/* ---------- 3.1.8 Inorganic ions ---------- */
S({
  id: '3.1.8', num: '3.1.8', title: 'Inorganic ions', topic: '3.1', slot: [2, 3], dna: 'bio',
  covers: ['3.1.8.s1', '3.1.8.s2', '3.1.8.s3', '3.1.8.s4', '3.1.8.s5', '3.1.8.s6'],
  card: {
    text: 'Inorganic ions occur in solution in the cytoplasm and body fluids of organisms, some in high concentrations and others in very low concentrations. Each type has a specific role depending on its properties. You should recognise the role of: <b>hydrogen ions</b> and pH; <b>iron ions</b> as a component of haemoglobin; <b>sodium ions</b> in the co-transport of glucose and amino acids; and <b>phosphate ions</b> as components of DNA and of ATP.',
    terms: ['hydrogen ion', 'pH', 'iron ion (Fe²⁺)', 'haemoglobin', 'sodium ion', 'co-transport', 'phosphate ion'],
    skill: 'pH and hydrogen ion concentration', eq: MATH(mt('pH '), mo('='), mo('−'), msub(mt('log'), mn(10)), mo('['), msup(mr('H'), mo('+')), mo(']')),
    q: 'Name the ion needed for the co-transport of glucose into cells, and the ion found in haemoglobin.', a: 'Sodium ions (Na⁺); iron(II) ions (Fe²⁺).'
  },
  draw(R, sc) {
    // 1. hydrogen ions and pH
    R.text('H^+ and pH', 76, 18, 5.6, { al: 'c' });
    for (let i = 0; i < 12; i++) R.rect(14 + i * 10.5, 28, 10.5, 14, { ink: '', fi: i < 5 ? 'P' : i < 7 ? 'Y' : 'T', ft: i < 5 ? 0.85 - i * 0.1 : i < 7 ? 0.5 : 0.25 + (i - 7) * 0.12, w: 0 });
    R.rect(14, 28, 126, 14, { ink: 'B', w: 1, wob: 0.15 });
    R.text('acid', 24, 52, 4.4, { al: 'c' }); R.text('pH 7', 77, 52, 4.4, { al: 'c' }); R.text('alkaline', 128, 52, 4.4, { al: 'c' });
    for (let i = 0; i < 9; i++) R.dot(22 + (i % 5) * 5.2 + (i * 7 % 3), 62 + ((i / 5) | 0) * 6 + (i % 2), 1.6, { ink: 'P' });
    R.text('more H^+  =  lower pH', 76, 86, 4.4, { al: 'c' });
    R.text('pH = −log_{10}[H^+]', 76, 100, 5.6, { al: 'c' });
    R.line(146, 14, 146, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 2. iron in haemoglobin (haem group)
    R.text('Fe^{2+} in haemoglobin', 230, 18, 5.2, { al: 'c' });
    R.ellipse(222, 62, 24, 24, { ink: 'B', w: 1.1, fi: 'P', ft: 0.28 });
    R.rect(208, 48, 28, 28, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.15 }); R.circle(222, 62, 7, { ink: 'B', w: 1.2, fi: 'P', ft: 1 }); R.text('Fe', 222, 64.6, 5.6, { al: 'c' });
    R.text('haem', 222, 90, 4.4, { al: 'c' });
    R.circle(262, 62, 5, { ink: 'B', w: 1, fi: 'PY', ft: 0.9 }); R.text('O_2', 262, 64, 4, { al: 'c' }); R.dashedLine(250, 62, 258, 62, { ink: 'B', w: 0.9, d: 1 });
    R.text('binds O_2', 262, 78, 4, { al: 'c' });
    R.line(8, 112, 312, 112, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 3. sodium ions in co-transport (membrane)
    R.text('Na^+ in co-transport', 100, 124, 5.2, { al: 'c' });
    R.fill([14, 168, 186, 168, 186, 180, 14, 180], { ink: 'Y', t: 0.35, wob: 0.1 }); R.line(14, 168, 186, 168, { ink: 'B', w: 1, taper: 'none' }); R.line(14, 180, 186, 180, { ink: 'B', w: 1, taper: 'none' });
    R.text('gut lumen: [Na^+] high', 18, 140, 4.2, { al: 'l' }); R.text('cell: [Na^+] low', 18, 206, 4.2, { al: 'l' });
    R.rrect(82, 160, 26, 28, 6, { ink: 'B', w: 1.3, fi: 'P', ft: 0.7 });
    for (let i = 0; i < 7; i++) R.circle(18 + (i * 23) % 120, 146 + (i * 11) % 14, 2.6, { ink: 'B', w: 0.7, fi: 'T', ft: 0.8 });
    R.circle(94, 140, 5.4, { ink: 'B', w: 1, fi: 'T', ft: 0.8 }); R.text('Na^+', 94, 142, 3.8, { al: 'c' }); R.poly(hexPts(110, 138, 5), { ink: 'B', w: 0.9, fi: 'Y', ft: 0.85 });
    R.arrow([94, 147, 94, 160], { ink: 'B', w: 1, hs: 2.6 }); R.arrow([104, 147, 100, 160], { ink: 'B', w: 1, hs: 2.6 });
    R.circle(88, 200, 5.4, { ink: 'B', w: 1, fi: 'T', ft: 0.8 }); R.text('Na^+', 88, 202, 3.8, { al: 'c' }); R.poly(hexPts(106, 200, 5), { ink: 'B', w: 0.9, fi: 'Y', ft: 0.85 });
    R.arrow([94, 188, 90, 195], { ink: 'B', w: 1, hs: 2.4 }); R.arrow([100, 188, 104, 195], { ink: 'B', w: 1, hs: 2.4 });
    R.text('glucose or amino acid', 140, 134, 4, { al: 'l' }); R.text('carried in with Na^+', 140, 140, 4, { al: 'l' });
    R.line(196, 118, 196, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 4. phosphate ions in DNA and ATP
    R.text('phosphate ions', 254, 124, 5.2, { al: 'c' });
    R.helix(222, 140, 222, 214, { amp: 10, turns: 1.6, w: 0.9 }); R.text('DNA', 222, 228, 4.6, { al: 'c' });
    for (let i = 0; i < 3; i++) { R.circle(212 + (i % 2) * 20, 152 + i * 20, 4.4, { ink: 'P', w: 1.1 }); }
    R.atpMol(252, 160, 9, { labels: false }); R.text('ATP', 282, 184, 5, { al: 'c' });
    R.circle(274, 160, 6, { ink: 'P', w: 1.1 }); R.circle(284, 160, 6, { ink: 'P', w: 1.1 }); R.circle(294, 160, 6, { ink: 'P', w: 1.1 });
    R.text('PO_4^{3\u2212} is part of both', 254, 216, 4.2, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(3.2);
    A.dot(94 + 0 * p, 147 + 40 * p, 3.4, 'T', 1 - p * 0.2); A.dot(110 - 4 * p, 138 + 40 * p, 3.0, 'Y', 1 - p * 0.2);
    for (let i = 0; i < 4; i++) { const q = (A.ph(5, i * 0.25)); A.dot(20 + ((q * 110 + i * 22) % 118), 68 + Math.sin(q * 10 + i) * 4, 1.4, 'P', 0.9, i); }
  },
});
