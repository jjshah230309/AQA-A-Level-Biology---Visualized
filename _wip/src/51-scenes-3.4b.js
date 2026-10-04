/* ===================== 3.4.2 DNA and protein synthesis ===================== */
/* tRNA cloverleaf: anticodon at the bottom, amino acid at the 3' stem; s = scale; ang rotates the whole molecule */
Recorder.prototype.tRNA = function (x, y, s, o = {}) {
  const R = this; R.push(x, y, rad(o.rot || 0), s);
  // stem (acceptor) at top, anticodon loop at bottom, D loop left, T loop right
  const stem = 28, bp = (cx, cy0, cy1, n, w) => { for (let i = 0; i < n; i++) { const yy = cy0 + (cy1 - cy0) * i / Math.max(1, n - 1); R.line(cx - w / 2, yy, cx + w / 2, yy, { ink: 'B', w: 0.7 / s, taper: 'none' }); } };
  R.stroke([-4, -34, -4, -6, -12, 4, -26, 4, -34, 12, -26, 20, -12, 20, -4, 8, -4, 24, -4, 34], { ink: 'P', w: 2.2 / s, smooth: true, taper: 'none', t: 0.7 });
  R.stroke([4, -34, 4, -6, 12, 4, 26, 4, 34, 12, 26, 20, 12, 20, 4, 8, 4, 24, 4, 34], { ink: 'P', w: 2.2 / s, smooth: true, taper: 'none', t: 0.7 });
  R.stroke([-4, -34, -4, -6, -12, 4, -26, 4, -34, 12, -26, 20, -12, 20, -4, 8, -4, 24, -4, 34], { ink: 'B', w: 0.8 / s, smooth: true, taper: 'none' });
  R.stroke([4, -34, 4, -6, 12, 4, 26, 4, 34, 12, 26, 20, 12, 20, 4, 8, 4, 24, 4, 34], { ink: 'B', w: 0.8 / s, smooth: true, taper: 'none' });
  R.stroke([-4, 34, -9, 42, -9, 50, 0, 54, 9, 50, 9, 42, 4, 34], { ink: 'P', w: 2.2 / s, smooth: true, taper: 'none', t: 0.7 }); R.stroke([-4, 34, -9, 42, -9, 50, 0, 54, 9, 50, 9, 42, 4, 34], { ink: 'B', w: 0.8 / s, smooth: true, taper: 'none' });
  bp(0, -30, -10, 5, 8); bp(0, 10, 30, 4, 8);
  // anticodon
  [-6, 0, 6].forEach((dx, i) => R.rect(dx - 2.6, 56, 5.2, 5.2, { ink: 'B', w: 0.7 / s, fi: ['T', 'P', 'Y'][i], ft: 0.7, wob: 0.05 }));
  // amino acid attached at the top
  if (o.aa !== false) { R.circle(0, -42, 5, { ink: 'B', w: 1 / s, fi: o.aaInk || 'TY', ft: 0.7 }); R.line(0, -37, 0, -34, { ink: 'B', w: 0.9 / s, taper: 'none' }); }
  R.pop();
};

/* ---------- 3.4.2a Genome, proteome, mRNA and tRNA structure ---------- */
S({
  id: '3.4.2a', num: '3.4.2', sub: 'Genome and proteome; structure of mRNA and tRNA', title: 'DNA and protein synthesis', topic: '3.4', slot: [0, 1], dna: 'bio', ao: 1,
  covers: ['3.4.2.s1', '3.4.2.s2'],
  card: {
    text: 'The <b>genome</b> is the complete set of genes in a cell. The <b>proteome</b> is the full range of proteins that a cell is able to produce. <b>Messenger RNA (mRNA)</b> is a single-stranded, linear polynucleotide made in transcription; each group of three bases is a <b>codon</b>. <b>Transfer RNA (tRNA)</b> is a single polynucleotide strand folded into a clover-leaf shape with hydrogen bonds between paired bases; one end carries a specific <b>amino acid</b>, and a three-base <b>anticodon</b> on the opposite loop is complementary to an mRNA codon.',
    terms: ['genome', 'proteome', 'mRNA', 'codon', 'tRNA', 'anticodon', 'amino acid attachment site', 'hydrogen bond', 'single-stranded'],
    skill: 'Complementary base pairing', eq: null,
    q: 'What is the difference between a codon and an anticodon?', a: 'A codon is three bases on mRNA coding for an amino acid; an anticodon is three complementary bases on tRNA that pairs with the codon.'
  },
  draw(R, sc) {
    // genome / proteome
    R.text('genome and proteome', 160, 14, 4.8, { al: 'c' });
    R.circle(66, 50, 26, { ink: 'B', w: 1.3, fi: 'P', ft: 0.08, wob: 0.4 }); R.helix(66, 30, 66, 70, { amp: 7, turns: 2, w: 0.9 });
    R.text('genome', 66, 88, 4.4, { al: 'c' }); R.text('all the genes in a cell', 66, 95, 3.8, { al: 'c' });
    R.arrow([96, 50, 130, 50], { ink: 'B', w: 1, hs: 2.6 });
    for (let i = 0; i < 9; i++) { const x = 150 + (i % 3) * 22, y = 34 + Math.floor(i / 3) * 18; R.poly(i % 3 === 0 ? polyPts(x, y, 6, 6, 0.5) : (i % 3 === 1 ? polyPts(x, y, 6, 5) : polyPts(x, y, 6, 4, 0.8)), { ink: 'B', w: 0.9, fi: ['P', 'T', 'Y'][i % 3], ft: 0.6, wob: 0.15 }); }
    R.text('proteome', 172, 88, 4.4, { al: 'c' }); R.text('all the proteins a cell', 172, 95, 3.8, { al: 'c' }); R.text('can produce', 172, 101, 3.8, { al: 'c' });
    R.line(8, 112, 312, 112, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // mRNA strand with codons
    R.text('mRNA: single-stranded, linear', 80, 124, 4.4, { al: 'c' });
    const mb = 'AUGGCUUCAGGA'.split('');
    mb.forEach((b, i) => R.baseBox(12 + i * 13, 134, b, { w: 7, h: 8 }));
    [0, 1, 2, 3].forEach(k => R.rrect(10 + k * 39, 130, 38, 16, 3, { ink: 'P', w: 0.9, wob: 0.1 })); R.text('codon', 29, 158, 3.9, { al: 'c', ink: 'P' });
    R.stroke([8, 148, 170, 148], { ink: 'B', w: 0.01, taper: 'none' });
    R.text('each codon (3 bases) codes for an amino acid', 90, 172, 3.9, { al: 'c' }); R.text('(the genetic code is degenerate, but never ambiguous)', 90, 179, 3.4, { al: 'c' });
    R.line(200, 120, 200, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // tRNA
    R.text('tRNA: clover-leaf shape', 254, 124, 4.4, { al: 'c' });
    R.tRNA(254, 170, 0.8, {});
    leader(R, 'amino acid attaches here', 254 - 2, 170 - 0.8 * 42, 222, 134, { size: 3.6, al: 'r' });
    leader(R, 'hydrogen bonds between paired bases', 254 + 0.8 * 0, 170 - 0.8 * 20, 292, 146, { size: 3.4, al: 'c' });
    leader(R, 'anticodon', 254, 170 + 0.8 * 60, 292, 232, { size: 3.8, al: 'c' });
    // codon-anticodon pairing mini
    ['A', 'U', 'G'].forEach((b, i) => R.baseBox(28 + i * 13, 196, b, { w: 7, h: 8 })); ['U', 'A', 'C'].forEach((b, i) => R.baseBox(28 + i * 13, 214, b, { w: 7, h: 8 })); [0, 1, 2].forEach(i => R.line(33 + i * 13, 205, 33 + i * 13, 213, { ink: 'B', w: 0.7, taper: 'none' }));
    R.text('mRNA codon', 94, 202, 3.8, { al: 'l' }); R.text('tRNA anticodon', 94, 220, 3.8, { al: 'l' });
    R.text('complementary: A–U, G–C', 80, 236, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(12 + p * 156, 138, 1.6, 'P', 0.8, 1); },
});

/* ---------- 3.4.2b Transcription ---------- */
S({
  id: '3.4.2b', num: '3.4.2', sub: 'Transcription: RNA polymerase; pre-mRNA splicing in eukaryotes', title: 'DNA and protein synthesis', topic: '3.4', slot: [1, 1], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.4.2.s3', '3.4.2.s4', '3.4.2.s5'],
  card: {
    text: '<b>Transcription</b> is the production of mRNA from DNA. The two DNA strands separate by breaking hydrogen bonds; one strand is the <b>template</b>. <b>RNA polymerase</b> joins RNA nucleotides that pair (A–U, G–C, T–A, C–G) with the exposed template bases, forming mRNA. In <b>prokaryotes</b> transcription results directly in mRNA. In <b>eukaryotes</b> it results in <b>pre-mRNA</b>, which is <b>spliced</b> to remove introns and join exons, forming mRNA; this leaves the nucleus through a nuclear pore to reach a ribosome in the cytoplasm.',
    terms: ['transcription', 'template strand', 'RNA polymerase', 'complementary base pairing', 'pre-mRNA', 'splicing', 'mRNA', 'nuclear pore'],
    skill: 'MS 2.5-style sequence conversion', eq: null,
    q: 'A DNA template strand reads TACGGT. Write the mRNA base sequence.', a: 'AUGCCA (A pairs with U, T with A, C with G, G with C).'
  },
  draw(R, sc) {
    R.text('transcription in the nucleus', 160, 14, 5, { al: 'c' });
    // template strand row, coding (non-template) strand above, mRNA being built below; RNA polymerase over three positions
    const tm = 'TACGGTACCGATTC'.split(''), cp = { A: 'T', T: 'A', C: 'G', G: 'C' }, mr = { A: 'U', T: 'A', C: 'G', G: 'C' };
    const x0 = 20, dx = 19.4, X = i => x0 + i * dx, yA = 58, yB = 96, yC = 124, bw = 8.4;
    const inPol = i => i >= 6 && i <= 8;
    // polymerase body first (behind the bases)
    R.rrect(X(5.55), 22, 3.9 * dx, 128, 14, { ink: 'B', w: 1.4, fi: 'P', ft: 0.2, wob: 0.3 });
    R.knock(R.rrectPts(X(5.9), 40, 3.2 * dx, 98, 8)); R.rrect(X(5.9), 40, 3.2 * dx, 98, 8, { ink: 'B', w: 0.7, fi: 'T', ft: 0.06, wob: 0.2 });
    tm.forEach((b, i) => {
      const x = X(i) - bw / 2, lifted = inPol(i);
      R.baseBox(x, yB, b, { w: bw, h: 8 });
      R.baseBox(x, lifted ? yA - 22 : yA, cp[b], { w: bw, h: 8 });
      if (!lifted) R.line(X(i), yA + 8, X(i), yB, { ink: 'B', w: 0.7, taper: 'none' });
      else { R.baseBox(x, yC, mr[b], { w: bw, h: 8 }); R.line(X(i), yB + 8, X(i), yC, { ink: 'B', w: 0.7, taper: 'none' }); }
    });
    // backbones
    R.line(X(0) - 8, yB + 11, X(13) + 8, yB + 11, { ink: 'B', w: 1.6, taper: 'none' });
    R.line(X(0) - 8, yA - 3, X(5) + 4, yA - 3, { ink: 'B', w: 1.6, taper: 'none' }); R.line(X(9) - 4, yA - 3, X(13) + 8, yA - 3, { ink: 'B', w: 1.6, taper: 'none' });
    R.stroke([X(5) + 4, yA - 3, X(5.9), yA - 14, X(6) - 4, yA - 25], { ink: 'B', w: 1.6, smooth: true, taper: 'none' }); R.line(X(6) - 4, yA - 25, X(8) + 4, yA - 25, { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([X(8) + 4, yA - 25, X(8.9), yA - 14, X(9) - 4, yA - 3], { ink: 'B', w: 1.6, smooth: true, taper: 'none' });
    // mRNA exits to the lower left
    R.line(X(6) - 5, yC + 11, X(8) + 5, yC + 11, { ink: 'P', w: 1.8, taper: 'none' });
    R.stroke([X(6) - 5, yC + 11, X(5) - 8, yC + 11, X(4) - 4, yC + 22], { ink: 'P', w: 1.8, smooth: true, taper: 'none' });
    'AUGCCA'.split('').forEach((b, i) => { const k = 5 - i; R.baseBox(X(5.2) - k * 14 - 6, yC + 24 + k * 5, b, { w: 7.4, h: 8 }); });
    R.stroke([X(5.2) - 5 * 14 - 8, yC + 28 + 25, X(5.2) + 8, yC + 24, X(5) + 4, yC + 11], { ink: 'P', w: 1.1, smooth: true, taper: 'none', t: 0.7 });
    R.text('RNA polymerase', X(7), 160 + 0, 0.01, { al: 'c' }); leader(R, 'RNA polymerase', X(8.4), 36, X(10.5), 34, { size: 4, al: 'l' });
    R.text('coding strand', X(1.2), 40, 4, { al: 'l' }); R.text('template strand', X(1.2), 124 - 8, 4, { al: 'l' }); R.text('mRNA', X(2.4), 188, 4, { al: 'c', ink: 'P' });
    R.arrow([X(11), 140, X(13.2), 140], { ink: 'B', w: 1.3, hs: 3 }); R.text('RNA polymerase moves along the gene', X(8.5), 152, 3.9, { al: 'l' });
    ['hydrogen bonds break: DNA unwinds', 'RNA nucleotides pair with the template strand', 'RNA polymerase joins them: mRNA', 'DNA re-forms behind the enzyme'].forEach((t, i) => R.text(t, 20, 198 + i * 8, 4, { al: 'l', ink: i === 2 ? 'P' : 'B' }));
    R.line(300, 22, 300, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // eukaryote vs prokaryote product
        R.text('prokaryotes: mRNA directly', 480, 30, 4.4, { al: 'c' });
    R.rect(330, 40, 300, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.5 }); R.text('mRNA (no introns)', 480, 60, 3.9, { al: 'c' });
    R.line(318, 72, 640, 72, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('eukaryotes: pre-mRNA is spliced', 480, 84, 4.4, { al: 'c' });
    [[330, 60, 'T'], [402, 36, 'Y'], [450, 60, 'T'], [522, 36, 'Y'], [570, 60, 'T']].forEach(([x, w, ink], i) => { R.rect(x, 94, w, 10, { ink: 'B', w: 1, fi: ink, ft: 0.55 }); });
    R.text('pre-mRNA: exons + introns', 480, 112, 3.9, { al: 'c' });
    R.stroke([360, 106, 380, 128, 420, 106], { ink: 'P', w: 1.1, smooth: true, taper: 'none' }); R.stroke([480, 106, 500, 128, 540, 106], { ink: 'P', w: 1.1, smooth: true, taper: 'none' });
    R.text('introns cut out', 480, 140, 3.9, { al: 'c', ink: 'P' });
    R.arrow([480, 146, 480, 156], { ink: 'B', w: 1, hs: 2.4 });
    R.rect(360, 160, 60, 10, { ink: 'B', w: 1, fi: 'T', ft: 0.55 }); R.rect(420, 160, 60, 10, { ink: 'B', w: 1, fi: 'T', ft: 0.55 }); R.rect(480, 160, 60, 10, { ink: 'B', w: 1, fi: 'T', ft: 0.55 });
    R.text('mRNA: exons joined (splicing)', 480, 184, 3.9, { al: 'c' });
    // nuclear pore and ribosome
    R.stroke([330, 214, 640, 214], { ink: 'B', w: 1.3, taper: 'none' }); R.knock([470, 210, 490, 210, 490, 218, 470, 218]); R.text('nuclear envelope with pore', 400, 207, 3.6, { al: 'c' });
    R.arrow([480, 190, 480, 228], { ink: 'P', w: 1.1, hs: 2.6 }); R.text('to a ribosome', 500, 230, 3.8, { al: 'l' }); R.text('nucleus', 336, 200, 3.6, { al: 'l' }); R.text('cytoplasm', 336, 226, 3.6, { al: 'l' });
    R.ribosome(596, 228, 1.6);
  },
  anim(A, sc) { const p = A.ph(7); for (let i = 0; i < 3; i++) A.dot(20 + (6 + i) * 19.4 + ((p * 1) % 1) * 3, 124 + 4, 1.5, 'P', 0.6, i); },
});

/* ---------- 3.4.2c Translation ---------- */
S({
  id: '3.4.2c', num: '3.4.2', sub: 'Translation: ribosomes, tRNA and ATP', title: 'DNA and protein synthesis', topic: '3.4', slot: [3, 1], dna: 'bio', ao: 2,
  covers: ['3.4.2.s6', '3.4.2.s7', '3.4.2.s8'],
  card: {
    text: '<b>Translation</b> is the production of polypeptides from the sequence of codons carried by mRNA. mRNA binds to a <b>ribosome</b>. A tRNA with the complementary <b>anticodon</b> brings a specific amino acid to each codon; the amino acids are joined by <b>peptide bonds</b> (using energy from <b>ATP</b>), and the tRNA is released to collect another amino acid. The ribosome moves along the mRNA to the next codon, building the polypeptide until a stop codon. You can use data about the genetic code to relate base sequence to amino acid sequence; specific codons need not be recalled.',
    terms: ['translation', 'ribosome', 'mRNA', 'codon', 'tRNA', 'anticodon', 'peptide bond', 'ATP', 'polypeptide'],
    skill: 'Base sequence → amino acid sequence', eq: null,
    q: 'What are the roles of tRNA and ATP in translation?', a: 'tRNA carries a specific amino acid and its anticodon pairs with the mRNA codon; ATP provides the energy to join amino acids by peptide bonds (and to attach amino acids to tRNA).'
  },
  draw(R, sc) {
    R.text('translation at the ribosome', 160, 14, 5, { al: 'c' });
    // mRNA along the bottom of the ribosome
    const my = 150, cod = ['AUG', 'GCU', 'UCA', 'GGA'], cx0 = 48;
    cod.forEach((c, k) => c.split('').forEach((b, i) => R.baseBox(cx0 + k * 66 + i * 17 - 5, my, b, { w: 7.4, h: 8 })));
    R.line(cx0 - 14, my + 12, cx0 + 4 * 66 - 14, my + 12, { ink: 'P', w: 1.8, taper: 'none' });
    cod.forEach((c, k) => R.rrect(cx0 + k * 66 - 8, my - 3, 56, 18, 3, { ink: 'P', w: 0.7, wob: 0.1 }));
    R.text('mRNA', 18, my + 6, 4, { al: 'c', ink: 'P' });
    // ribosome: large subunit above, small below, around codons 2 and 3
    const rx = cx0 + 66 - 12, rw = 142;
    R.knock(R.rrectPts(rx, 86, rw, 54, 18)); R.rrect(rx, 86, rw, 54, 18, { ink: 'B', w: 1.4, fi: 'P', ft: 0.25, wob: 0.4 });
    R.rrect(rx + 4, 138, rw - 8, 24, 10, { ink: 'B', w: 1.2, fi: 'T', ft: 0.25, wob: 0.3 });
    R.text('ribosome: large subunit', rx + rw - 6, 94, 3.8, { al: 'r' }); R.text('small subunit', rx + rw + 6, 160, 3.7, { al: 'l' });
    // tRNAs in the P and A sites: anticodons touch codons 2 and 3, amino acids at the top; growing chain leaves above
    const sP = cx0 + 66 + 12, sA = cx0 + 132 + 12, ty = my - 2 - 0.55 * 58;
    R.tRNA(sP, ty, 0.55, { aaInk: 'P' }); R.tRNA(sA, ty, 0.55, { aaInk: 'Y' });
    R.stroke([sP, ty - 0.55 * 42, sP - 14, 60, sP - 40, 52, sP - 62, 40], { ink: 'B', w: 1.6, smooth: true, taper: 'none' });
    [[sP - 28, 55, 'TY'], [sP - 46, 49, 'T'], [sP - 62, 40, 'P']].forEach(([x, y, ink]) => R.circle(x, y, 4.6, { ink: 'B', w: 0.9, fi: ink, ft: 0.7 }));
    R.bondMark(sP - 14, 60 + 0, 3.6); R.text('peptide bond', sP - 30, 74, 3.7, { al: 'c', ink: 'P' });
    R.text('growing polypeptide', sP - 50, 28, 3.8, { al: 'c' });
    // incoming tRNA arriving at the next codon (outside the ribosome, upper right)
    R.tRNA(cx0 + 4 * 66 - 20, 58, 0.55, { aaInk: 'T' }); R.arrow([cx0 + 4 * 66 - 34, 112, cx0 + 4 * 66 - 54, 124], { ink: 'B', w: 0.9, hs: 2.2 }); R.text('next tRNA arrives', cx0 + 4 * 66 - 24, 38, 3.7, { al: 'c' });
    // leaving tRNA
    R.tRNA(cx0 + 4, 108, 0.45, { aa: false, rot: -28 }); R.text('tRNA released', cx0 - 8, 142 - 0, 0.01, { al: 'c' });
    // ATP
    R.circle(sA + 40, 44, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP', sA + 40, 46, 4.6, { al: 'c' }); R.arrow([sA + 34, 48, sP + 12, 62], { ink: 'B', w: 0.8, hs: 2 });
    R.arrow([140, my + 26, 200, my + 26], { ink: 'B', w: 1.2, hs: 3 }); R.text('ribosome moves along mRNA', 170, my + 38, 3.9, { al: 'c' });
    R.line(8, 200, 312, 200, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['each codon is matched by a tRNA whose anticodon is complementary,', 'carrying a specific amino acid', 'amino acids are joined by peptide bonds (energy from ATP)', 'the chain grows until a stop codon'].forEach((t, i) => R.text(t, 160, 211 + i * 7, 3.9, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(6); A.dot(240 - p * 20, 44 + p * 8, 1.4, 'Y', 0.9, 1); },
});
