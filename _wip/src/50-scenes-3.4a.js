/* ===================== TOPIC 3.4 Genetic information, variation and relationships between organisms ===================== */
/* nucleosome-style chromatin: DNA wrapped on histone beads along a path */
function chromatin(R, pts, nb, o = {}) {
  const p = catmull(flat(pts), false, 3), n = p.length / 2, S = [0];
  for (let i = 1; i < n; i++) S.push(S[i - 1] + Math.hypot(p[i * 2] - p[i * 2 - 2], p[i * 2 + 1] - p[i * 2 - 1]));
  R.stroke(pts, { ink: 'B', w: o.w || 1.1, smooth: true, taper: 'none', wob: 0.3 });
  for (let k = 0; k < nb; k++) { const s = (k + 0.5) / nb * S[n - 1]; let i = 1; while (i < n - 1 && S[i] < s) i++; const t = (s - S[i - 1]) / ((S[i] - S[i - 1]) || 1), x = lerp(p[i * 2 - 2], p[i * 2], t), y = lerp(p[i * 2 - 1], p[i * 2 + 1], t); R.circle(x, y, o.r || 3.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.75, wob: 0.15 }); R.arc(x, y, (o.r || 3.4) + 0.8, (o.r || 3.4) + 0.8, 0.6, 5.7, { ink: 'T', w: 1.1, taper: 'none' }); }
}
/* X-shaped chromosome of two chromatids with centromere */
function chromosome(R, x, y, len, w, o = {}) {
  const half = len / 2, rot = o.rot || 0; R.push(x, y, rad(rot), 1);
  [-1, 1].forEach(sd => { const cx = sd * w * 0.55; R.rrect(cx - w / 2, -half, w, len, w / 2, { ink: 'B', w: 1.1, fi: o.fi || 'B', ft: o.ft === undefined ? 0.55 : o.ft, wob: 0.2 }); });
  R.circle(0, 0, w * 0.45, { ink: 'B', w: 0.9, fi: 'P', ft: 0.6 });
  if (o.bands) o.bands.forEach(([bu, bc]) => { R.rect(-w * 1.1, -half + bu * len, w * 2.2, 2.2, { ink: bc || 'P', w: 0, fi: bc || 'P', ft: 0.9 }); });
  R.pop();
}

/* ---------- 3.4.1a DNA in prokaryotes, eukaryotes and organelles ---------- */
S({
  id: '3.4.1a', num: '3.4.1', sub: 'DNA in prokaryotic cells, in the nucleus of eukaryotic cells, and in mitochondria and chloroplasts', title: 'DNA, genes and chromosomes', topic: '3.4', slot: [0, 0], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.4.1.s1', '3.4.1.s2', '3.4.1.s3'],
  card: {
    text: 'In <b>prokaryotic cells</b>, DNA molecules are short, <b>circular</b> and not associated with proteins. In the nucleus of <b>eukaryotic cells</b>, DNA molecules are very long, <b>linear</b> and associated with proteins called <b>histones</b>; a DNA molecule and its associated proteins together form a <b>chromosome</b>. The <b>mitochondria</b> and <b>chloroplasts</b> of eukaryotic cells also contain DNA which, like prokaryotic DNA, is short, circular and not associated with protein.',
    terms: ['circular DNA', 'linear DNA', 'histone', 'chromosome', 'prokaryote', 'eukaryote', 'mitochondrial DNA', 'chloroplast DNA'],
    skill: 'MS 0.3: compare structures', eq: null,
    q: 'Give two ways in which prokaryotic DNA differs from the DNA in a eukaryotic nucleus.', a: 'It is short and circular, and it is not associated with histone proteins; eukaryotic nuclear DNA is long, linear and wound round histones.'
  },
  draw(R, sc) {
    // prokaryote
    R.text('prokaryotic cell', 96, 14, 4.8, { al: 'c' });
    R.rrect(24, 30, 144, 76, 38, { ink: 'B', w: 1.6, fi: 'P', ft: 0.1, wob: 0.4 }); R.rrect(21, 27, 150, 82, 41, { ink: 'B', w: 0.8, wob: 0.4 });
    R.stroke(polyPts(88, 68, 24, 24, 0).concat([]), { ink: 'T', w: 2, closed: true, smooth: true, wob: 0.8, taper: 'none' });
    R.stroke(polyPts(88, 68, 24, 24, 0.2).map((v, i) => v + (i % 2 ? Math.sin(i) * 2 : Math.cos(i) * 2)), { ink: 'B', w: 1, closed: true, smooth: true, wob: 0.8, taper: 'none' });
    R.circle(138, 58, 6, { ink: 'B', w: 1.2 }); R.circle(138, 80, 4.4, { ink: 'B', w: 1.2 }); R.circle(52, 70, 5, { ink: 'B', w: 1.2 });
    leader(R, 'circular DNA', 100, 50, 74, 124, { size: 4.2, al: 'c' }); leader(R, 'plasmid', 138, 80, 148, 124, { size: 4.2, al: 'c' });
    ['short, circular', 'not associated with protein'].forEach((t, i) => R.text(t, 96, 140 + i * 6.6, 4, { al: 'c', ink: i ? 'P' : 'B' }));
    R.line(176, 22, 176, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // eukaryote nucleus and chromosome
    R.text('eukaryotic nucleus', 262, 14, 4.8, { al: 'c' });
    R.ellipse(262, 70, 72, 46, { ink: 'B', w: 1.6, fi: 'P', ft: 0.08, wob: 0.5 }); R.ellipse(262, 70, 68, 42, { ink: 'B', w: 0.8, wob: 0.4 });
    for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + 0.3, px = 262 + Math.cos(a) * 70, py = 70 + Math.sin(a) * 44; R.knock(polyPts(px, py, 2.2, 6)); }
    chromatin(R, [214, 56, 238, 38, 270, 50, 292, 38, 306, 58, 290, 76, 262, 70, 238, 88, 220, 76, 232, 60], 16, { r: 3.4 });
    chromatin(R, [230, 98, 262, 94, 296, 100], 6, { r: 3 });
    leader(R, 'linear DNA wound round histones', 270, 50, 262, 126, { size: 4.2, al: 'c' });
    ['very long, linear', 'associated with histones'].forEach((t, i) => R.text(t, 262, 140 + i * 6.6, 4, { al: 'c', ink: i ? 'P' : 'B' }));
    R.line(350, 22, 350, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // chromosome
    R.text('chromosome = DNA + histones', 448, 14, 4.8, { al: 'c' });
    // DNA -> nucleosomes -> chromatin -> chromosome
    R.helix(372, 36, 372, 100, { amp: 6, turns: 3, w: 0.9 }); R.text('DNA', 372, 112, 4, { al: 'c' });
    R.arrow([386, 70, 402, 70], { ink: 'B', w: 0.9, hs: 2.4 });
    chromatin(R, [412, 50, 420, 70, 412, 90], 4, { r: 3.8 }); R.text('histone', 428, 110, 3.8, { al: 'c', ink: 'P' });
    R.arrow([440, 70, 458, 70], { ink: 'B', w: 0.9, hs: 2.4 });
    chromosome(R, 486, 70, 66, 13, { bands: [[0.25, 'P'], [0.45, 'T'], [0.7, 'P']] });
    leader(R, 'centromere', 486, 70, 548, 70, { size: 4, al: 'l' }); R.text('chromosome', 486, 116, 4, { al: 'c' });
    ['one DNA molecule and its', 'histones form a chromosome'].forEach((t, i) => R.text(t, 448, 140 + i * 6.6, 4, { al: 'c' }));
    R.line(8, 156, 656, 156, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // organelle DNA
    R.text('mitochondria and chloroplasts also contain DNA: short, circular, not associated with protein', 332, 168, 4.4, { al: 'c' });
    R.mito(120, 206, 76, 40, 0, {}); R.stroke(polyPts(112, 208, 9, 16, 0), { ink: 'T', w: 1.6, closed: true, smooth: true, taper: 'none' }); leader(R, 'DNA loop', 112, 208, 52, 238, { size: 4, al: 'c' });
    R.chloroplast(330, 206, 84, 42, 0, { grana: 4 }); R.stroke(polyPts(352, 214, 7, 14, 0), { ink: 'T', w: 1.4, closed: true, smooth: true, taper: 'none' }); leader(R, 'DNA loop', 352, 214, 400, 238, { size: 4, al: 'c' });
    R.text('mitochondrion', 120, 232, 4, { al: 'c' }); R.text('chloroplast', 330, 232, 4, { al: 'c' });
    R.text('same as the DNA of', 536, 204, 4.2, { al: 'c' }); R.text('prokaryotes', 536, 211, 4.2, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(88 + Math.cos(p * TAU) * 24, 68 + Math.sin(p * TAU) * 24, 1.6, 'T', 0.9, 1); A.dot(486 - 3 + Math.sin(p * TAU) * 1.5, 40 + p * 6, 0.8, 'P', 0.8, 2); },
});

/* ---------- 3.4.1b Genes, loci, the genetic code, exons and introns ---------- */
S({
  id: '3.4.1b', num: '3.4.1', sub: 'Genes and loci; the triplet code and its properties', title: 'DNA, genes and chromosomes', topic: '3.4', slot: [2, 0], dna: 'bio', ao: 1,
  covers: ['3.4.1.s4', '3.4.1.s5', '3.4.1.s6'],
  card: {
    text: 'A <b>gene</b> is a base sequence of DNA that codes for the amino acid sequence of a <b>polypeptide</b> or for a <b>functional RNA</b> (including ribosomal RNA and tRNAs). A gene occupies a fixed position, its <b>locus</b>, on a particular DNA molecule. A sequence of three DNA bases, a <b>triplet</b>, codes for a specific amino acid. The genetic code is <b>universal</b>, <b>non-overlapping</b> and <b>degenerate</b>.',
    terms: ['gene', 'locus', 'triplet', 'universal', 'non-overlapping', 'degenerate', 'functional RNA'],
    skill: 'Triplets: 3 bases per amino acid', eq: MATH(mt('bases in gene coding region '), mo('='), mn('3'), mo('×'), mt('amino acids')),
    eqn: 'e.g. a 150 amino acid polypeptide needs at least 450 bases (plus a stop triplet)',
    q: 'Why is the genetic code described as degenerate?', a: 'Most amino acids are coded for by more than one triplet.'
  },
  draw(R, sc) {
    R.text('a gene at its locus', 160, 14, 5, { al: 'c' });
    chromosome(R, 36, 80, 124, 20, { bands: [[0.18, 'P'], [0.34, 'T'], [0.48, 'P'], [0.68, 'T']], ft: 0.35 });
    R.rect(14, 90, 44, 5, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.8 }); leader(R, 'locus of the gene', 60, 92, 112, 52, { size: 4, al: 'c' });
    R.line(62, 92, 100, 118, { ink: 'B', w: 0.6, t: 0.7, taper: 'none' }); R.line(62, 92, 100, 74, { ink: 'B', w: 0.01, taper: 'none' });
    // DNA triplet strip with codons
    const bases = 'TACGGATTCCTA'.split(''), tri = [0, 3, 6, 9];
    R.text('the code is read in triplets', 220, 46, 4.2, { al: 'c' });
    bases.forEach((b, i) => R.baseBox(112 + i * 16, 118, b, { w: 8, h: 8 }));
    [0, 1, 2, 3].forEach(k => { R.arrow([112 + k * 48 + 20, 134, 112 + k * 48 + 20, 142], { ink: 'B', w: 0.7, hs: 1.8 }); R.rrect(110 + k * 48, 112, 46, 22, 3, { ink: 'P', w: 0.9, wob: 0.1 }); R.circle(112 + k * 48 + 20, 150, 4.6, { ink: 'B', w: 0.8, fi: ['P', 'Y', 'T', 'TY'][k], ft: 0.7 }); });
    R.text('triplet = 1 amino acid', 208, 168, 4.2, { al: 'c' });
    // properties
    R.line(8, 176, 312, 176, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    const prop = (x, t1, t2) => { R.text(t1, x, 188, 4.6, { al: 'c', ink: 'P' }); R.text(t2, x, 196, 3.8, { al: 'c' }); };
    prop(54, 'universal', 'same code in all organisms'); prop(160, 'non-overlapping', 'each base read once'); prop(268, 'degenerate', 'several triplets, one amino acid');
    // overlapping vs not
    [0, 1, 2, 3, 4, 5].forEach(i => R.circle(34 + i * 7.4, 214, 2.8, { ink: 'B', w: 0.8, fi: ['T', 'T', 'T', 'Y', 'Y', 'Y'][i], ft: 0.6 })); R.rrect(31, 209.5, 22, 9, 4, { ink: 'P', w: 0.8 }); R.rrect(55, 209.5, 22, 9, 4, { ink: 'P', w: 0.8 }); R.text('123 456', 54, 230, 3.6, { al: 'c' });
    [0, 1, 2, 3, 4, 5].forEach(i => R.circle(140 + i * 7.4, 214, 2.8, { ink: 'B', w: 0.8, fi: ['T', 'T', 'T', 'Y', 'Y', 'Y'][i], ft: 0.6 })); R.rrect(137, 209.5, 22, 9, 4, { ink: 'P', w: 0.8 }); R.rrect(161, 209.5, 22, 9, 4, { ink: 'P', w: 0.8 }); R.text('not 123 234', 160, 230, 3.6, { al: 'c' });
    R.text('GAA', 244, 214, 4.4, { al: 'c' }); R.text('GAG', 272, 214, 4.4, { al: 'c' }); R.arrow([244, 218, 258, 228], { ink: 'B', w: 0.8, hs: 2 }); R.arrow([272, 218, 262, 228], { ink: 'B', w: 0.8, hs: 2 }); R.circle(258, 232, 3.6, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.text('same amino acid', 294, 234, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(116 + (Math.floor(p * 12)) * 16, 122, 1.8, 'P', 0.9, 1); },
});

/* ---------- 3.4.1c Non-coding DNA, exons and introns ---------- */
S({
  id: '3.4.1c', num: '3.4.1', sub: 'Non-coding DNA: multiple repeats, exons and introns', title: 'DNA, genes and chromosomes', topic: '3.4', slot: [3, 0], dna: 'bio', ao: 1,
  covers: ['3.4.1.s7'],
  card: {
    text: 'In eukaryotes much of the nuclear DNA does <b>not code for polypeptides</b>. There are, for example, non-coding <b>multiple repeats</b> of base sequences between genes. Even within a gene only some sequences, called <b>exons</b>, code for amino acid sequences. Within the gene, the exons are separated by one or more non-coding sequences called <b>introns</b>. (Prokaryotic genes have no introns.)',
    terms: ['non-coding DNA', 'multiple repeats', 'exon', 'intron', 'eukaryote', 'prokaryote'],
    skill: 'Identify coding regions', eq: null,
    q: 'What is the difference between an exon and an intron?', a: 'An exon is a sequence of a gene that codes for amino acids; an intron is a non-coding sequence between exons.'
  },
  draw(R, sc) {
    R.text('eukaryotic DNA is mostly non-coding', 160, 14, 4.8, { al: 'c' });
    // DNA line with genes between repeats
    const y = 52;
    R.stroke([10, y, 310, y], { ink: 'B', w: 2.6, taper: 'none', wob: 0.3 });
    const rep = (x0, n) => { for (let i = 0; i < n; i++) { R.rect(x0 + i * 7, y - 6, 5, 12, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.7, wob: 0.05 }); } };
    rep(14, 9); rep(212, 5); rep(274, 4);
    R.knock(R.rrectPts(90, y - 12, 110, 24, 4)); R.rrect(90, y - 12, 110, 24, 4, { ink: 'B', w: 1.3, fi: 'T', ft: 0.2, wob: 0.15 }); R.text('gene', 145, y + 2, 5, { al: 'c' });
    leader(R, 'non-coding multiple repeats', 40, y + 6, 76, 86, { size: 4, al: 'c' }); leader(R, 'repeats between genes', 238, y + 6, 238, 86, { size: 4, al: 'c' }); R.line(112, y - 12, 112, y - 12, { ink: 'B', w: 0.01, taper: 'none' });
    // zoom on the gene: exons and introns
    R.line(90, y + 12, 24, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' }); R.line(200, y + 12, 296, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    const gy = 124, ex = [[24, 60, 'exon 1'], [136, 52, 'exon 2'], [236, 60, 'exon 3']], intr = [[84, 52, 'intron'], [188, 48, 'intron']];
    ex.forEach(([x, w, t]) => { R.rect(x, gy - 10, w, 20, { ink: 'B', w: 1.2, fi: 'T', ft: 0.5, wob: 0.1 }); R.text(t, x + w / 2, gy + 2, 4.4, { al: 'c' }); });
    intr.forEach(([x, w, t]) => { R.rect(x, gy - 6, w, 12, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.1 }); R.text(t, x + w / 2, gy + 2, 3.9, { al: 'c' }); });
    R.text('exons code for amino acids', 160, 150, 4.4, { al: 'c', ink: 'T' }); R.text('introns: non-coding sequences within the gene', 160, 158, 4, { al: 'c' });
    R.line(8, 168, 312, 168, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // transcribed then spliced preview
    R.text('only exons end up in mature mRNA', 160, 180, 4.4, { al: 'c' });
    R.stroke([24, 198, 84, 198, 100, 188, 120, 198, 168, 198, 184, 188, 204, 198, 296, 198], { ink: 'Y', w: 2.2, smooth: false, taper: 'none' });
    R.rect(24, 194, 60, 8, { ink: 'B', w: 0.01, fi: 'T', ft: 0.5 }); R.rect(120, 194, 48, 8, { ink: 'B', w: 0.01, fi: 'T', ft: 0.5 }); R.rect(204, 194, 92, 8, { ink: 'B', w: 0.01, fi: 'T', ft: 0.5 });
    R.arrow([160, 206, 160, 216], { ink: 'B', w: 0.9, hs: 2.4 }); R.rect(60, 218, 200, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.5 }); R.text('exons joined: mRNA (see 3.4.2)', 160, 235, 3.8, { al: 'c' });
    R.text('introns removed', 142, 184, 3.6, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(10 + p * 300, 52, 1.5, 'P', 0.9, 1); },
});
