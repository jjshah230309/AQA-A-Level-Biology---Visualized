/* ===================== TOPIC 3.8 The control of gene expression ===================== */
/* a strand of base letters in boxes, each base coloured; used for mutation examples.  seq: string, mark: set of indices to highlight */
function baseRow(R, x, y, seq, o = {}) {
  const cw = o.cw || 8.4, h = o.h || 9, col = { A: 'P', T: 'T', G: 'Y', C: 'TY' }, mark = o.mark || [];
  seq.split('').forEach((b, i) => {
    if (b === ' ') return;
    const cx = x + i * cw; R.rect(cx, y, cw - 0.8, h, { ink: 'B', w: 0.5, fi: col[b] || 'Y', ft: mark.includes(i) ? 0.55 : 0.18, wob: 0.05 });
    R.text(b, cx + (cw - 0.8) / 2, y + h * 0.72, o.size || 4.4, { al: 'c' });
    if (mark.includes(i)) R.rect(cx - 0.6, y - 0.6, cw + 0.4, h + 1.2, { ink: 'P', w: 1.1, wob: 0.05 });
  });
}
/* codon row: triplets grouped with their amino acid underneath */
function tripletRow(R, x, y, seq, aa, o = {}) {
  const cw = o.cw || 8.4, n = Math.floor(seq.length / 3);
  baseRow(R, x, y, seq, o);
  for (let t = 0; t < n; t++) { const cx = x + t * 3 * cw; R.line(cx + 0.4, y + 11.5, cx + 3 * cw - 1.2, y + 11.5, { ink: 'B', w: 0.7, taper: 'none' }); if (aa[t]) R.text(aa[t], cx + 1.5 * cw - 0.4, y + 18, o.asize || 3.7, { al: 'c', ink: o.aink || 'P' }); }
}

/* ---------- 3.8 overview: control of gene expression ---------- */
S({
  id: '3.8', num: '3.8', sub: 'Cells control their activities by regulating transcription and translation', title: 'The control of gene expression', topic: '3.8', slot: [0, 0], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.8.s1', '3.8.s2', '3.8.s3', '3.8.s4'],
  card: {
    text: 'Cells control their metabolic activities by regulating the <b>transcription</b> and <b>translation</b> of their <b>genome</b>. All the cells of an organism carry the same coded genetic information, but each translates only part of it, so cells become specialised and form tissues and organs. Many factors control gene expression and so the <b>phenotype</b>: some are external (environmental), others internal. <b>Epigenetic</b> regulation of transcription is increasingly recognised as important. Humans can now alter the <b>epigenome</b>, genomes and proteomes of organisms, with many medical and technological applications, and breakdown of cellular control (for example <b>cancer</b>) can be diagnosed and treated using DNA technology.',
    terms: ['gene expression', 'transcription', 'translation', 'genome', 'proteome', 'epigenetics', 'phenotype', 'specialisation'],
    skill: 'AO1: relate gene expression to cell specialisation', eq: null,
    q: 'Why do a nerve cell and a red blood cell of the same person look so different if they contain the same genes?', a: 'Each expresses (transcribes and translates) only part of its genome, so different proteins are made and the cells specialise differently.'
  },
  draw(R, sc) {
    R.text('same genes, different expression', 118, 14, 4.5, { al: 'c' });
    R.helix(30, 40, 206, 40, { amp: 6, turns: 5, w: 0.9 }); R.text('the same genome in every cell of the body', 118, 58, 3.7, { al: 'c' });
    [[44, 'P', 'nerve cell'], [118, 'T', 'red blood cell'], [192, 'Y', 'muscle cell']].forEach(([x, ink, nm], i) => {
      R.arrow([x, 62, x, 80], { ink: 'B', w: 1, hs: 2.6 });
      if (i === 0) { R.circle(x, 98, 9, { ink: 'B', w: 1.1, fi: 'P', ft: 0.2 }); for (let k = 0; k < 5; k++) R.stroke([x + Math.cos(k + 3) * 9, 98 + Math.sin(k + 3) * 9, x + Math.cos(k + 3) * 20, 98 + Math.sin(k + 3) * 18], { ink: 'B', w: 0.9, taper: 'end', smooth: true }); }
      if (i === 1) { R.ellipse(x, 98, 12, 6.5, { ink: 'B', w: 1.1, fi: 'P', ft: 0.45 }); R.ellipse(x, 98, 5, 2.6, { ink: 'B', w: 0.7, fi: 'P', ft: 0.12 }); }
      if (i === 2) { R.rrect(x - 20, 92, 40, 12, 5, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.2 }); for (let k = 0; k < 6; k++) R.line(x - 15 + k * 6, 93, x - 15 + k * 6, 103, { ink: 'B', w: 0.6, taper: 'none', t: 0.7 }); }
      R.text(nm, x, 122, 3.8, { al: 'c' });
    });
    R.line(10, 134, 228, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // control points
    R.text('where expression is controlled', 118, 146, 4.1, { al: 'c', ink: 'P' });
    R.rrect(14, 154, 60, 28, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.12, wob: 0.3 }); R.text('DNA', 44, 164, 3.9, { al: 'c' }); R.text('(epigenetics)', 44, 172, 3.4, { al: 'c' });
    R.arrow([76, 168, 86, 168], { ink: 'B', w: 0.9, hs: 2.2 });
    R.rrect(88, 154, 60, 28, 4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.12, wob: 0.3 }); R.text('mRNA', 118, 164, 3.9, { al: 'c' }); R.text('transcription', 118, 172, 3.4, { al: 'c' });
    R.arrow([150, 168, 160, 168], { ink: 'B', w: 0.9, hs: 2.2 });
    R.rrect(162, 154, 60, 28, 4, { ink: 'B', w: 0.8, fi: 'T', ft: 0.1, wob: 0.3 }); R.text('protein', 192, 164, 3.9, { al: 'c' }); R.text('translation', 192, 172, 3.4, { al: 'c' });
    R.text('transcription factors, methylation,', 118, 196, 3.5, { al: 'c' }); R.text('acetylation, RNA interference', 118, 203, 3.5, { al: 'c' });
    R.text('environmental and internal factors', 118, 218, 3.7, { al: 'c', ink: 'T' });
    R.line(238, 14, 238, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // map of the topic
    R.text('3.8 at a glance', 450, 14, 4.5, { al: 'c' });
    const items = [['3.8.1', 'mutations alter the base sequence', 'Y'], ['3.8.2.1', 'stem cells and specialisation', 'P'], ['3.8.2.2', 'transcription factors, epigenetics, RNAi', 'T'], ['3.8.2.3', 'gene expression and cancer', 'P'], ['3.8.3', 'genome projects', 'Y'], ['3.8.4.1', 'recombinant DNA technology', 'T'], ['3.8.4.2', 'DNA probes and screening', 'P'], ['3.8.4.3', 'genetic fingerprinting', 'Y']];
    items.forEach(([n, t, ink], i) => { const y = 24 + i * 25; R.rrect(250, y, 400, 20, 4, { ink: 'B', w: 0.8, fi: ink, ft: 0.1, wob: 0.3 }); R.text(n, 262, y + 13, 4.2, { al: 'l', ink: 'P' }); R.text(t, 318, y + 13, 4.1, { al: 'l' }); });
  },
  anim(A, sc) { const p = A.ph(5); for (let k = 0; k < 3; k++) { const u = (p + k / 3) % 1; A.dot(30 + u * 176, 40 + Math.sin(u * 5 * TAU) * 6, 1.6, 'P', 0.9, k); } },
});

/* ---------- 3.8.1a Types of gene mutation ---------- */
S({
  id: '3.8.1a', num: '3.8.1', sub: 'Gene mutations: addition, deletion, substitution, inversion, duplication, translocation', title: 'Alteration of the sequence of bases in DNA can alter the structure of proteins', topic: '3.8', slot: [2, 0], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.8.1.s1', '3.8.1.s2'],
  card: {
    text: 'Gene <b>mutations</b> might arise during <b>DNA replication</b>. They include <b>addition</b> (a base inserted), <b>deletion</b> (a base lost), <b>substitution</b> (one base replaced by another), <b>inversion</b> (a section of bases is reversed), <b>duplication</b> (a base or section is repeated) and <b>translocation</b> (a section of DNA moves to another chromosome, a non-homologous one). Gene mutations occur <b>spontaneously</b>, but the mutation rate is increased by <b>mutagenic agents</b> (such as UV light, ionising radiation, some chemicals and some viruses).',
    terms: ['mutation', 'addition', 'deletion', 'substitution', 'inversion', 'duplication', 'translocation', 'spontaneous', 'mutagenic agent'],
    skill: 'AO1: identify the type of mutation from sequences', eq: null,
    q: 'The sequence TATAGTCTT becomes TATGTCTT. Name the mutation.', a: 'A deletion (the A of AGT has been lost).'
  },
  draw(R, sc) {
    R.text('original gene (coding strand)', 120, 14, 4.2, { al: 'c' });
    const cw = 12.4;
    baseRow(R, 12, 20, 'TATAGTCTT', { cw, h: 12, size: 5.6 });
    const muts = [
      ['substitution', 'one base replaced', 'TACAGTCTT', [2]],
      ['addition', 'a base inserted', 'TATGAGTCTT', [3]],
      ['deletion', 'a base lost', 'TATGTCTT', [3]],
      ['inversion', 'a section is reversed', 'TATGATCTT', [3, 4]],
      ['duplication', 'a section is repeated', 'TATAGAGTCTT', [5, 6]],
    ];
    muts.forEach(([nm, d, seq, mk], i) => {
      const y = 62 + i * 31; R.text(nm, 12, y - 3, 4.4, { al: 'l', ink: 'P' }); R.text(d, 82, y - 3, 3.6, { al: 'l' });
      baseRow(R, 12, y + 1, seq, { mark: mk, cw, h: 12, size: 5.6 });
    });
    R.text('pink boxes show the changed bases', 120, 222, 3.7, { al: 'c', ink: 'T' });
    R.line(238, 14, 238, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // translocation + mutagens
    R.text('translocation', 346, 14, 4.2, { al: 'c', ink: 'P' });
    const chrom = (x, y, ink) => { R.rrect(x, y, 14, 70, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.1 }); R.rect(x + 1, y + 6, 12, 14, { ink, w: 0.6, fi: ink, ft: 0.8, wob: 0.05 }); };
    chrom(266, 24, 'P'); chrom(296, 24, 'T');
    R.arrow([318, 58, 342, 58], { ink: 'B', w: 1, hs: 2.6 });
    chrom(352, 24, 'T'); chrom(382, 24, 'P');
    R.arrow([369, 38, 379, 38], { ink: 'B', w: 0.8, hs: 2, both: true });
    R.text('two different chromosomes', 346, 106, 3.6, { al: 'c' });
    R.text('a section of one moves to a different', 346, 116, 3.6, { al: 'c' }); R.text('(non-homologous) chromosome', 346, 123, 3.6, { al: 'c' });
    R.line(246, 134, 442, 134, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('mutations occur spontaneously', 346, 148, 4, { al: 'c' });
    R.text('mutagenic agents increase the rate:', 346, 162, 3.9, { al: 'c', ink: 'P' });
    ['ultraviolet light', 'ionising radiation', 'some chemicals', 'some viruses'].forEach((t, i) => { R.circle(278, 177 + i * 12, 3, { ink: 'B', w: 0.8, fi: ['Y', 'P', 'T', 'TY'][i], ft: 0.5 }); R.text(t, 288, 178.4 + i * 12, 3.9, { al: 'l' }); });
    R.line(442, 14, 442, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // replication slip
    R.text('how a mutation can arise', 548, 14, 4.2, { al: 'c' });
    R.helix(462, 56, 640, 56, { amp: 7, turns: 4, w: 0.9 });
    R.circle(552, 56, 8, { ink: 'P', w: 1.3 });
    R.arrow([552, 76, 552, 92], { ink: 'B', w: 1, hs: 2.8 });
    ['a base is copied wrongly (or', 'altered by a mutagenic agent)', 'during DNA replication'].forEach((t, i) => R.text(t, 552, 106 + i * 8, 3.8, { al: 'c' }));
    R.arrow([552, 132, 552, 148], { ink: 'B', w: 1, hs: 2.8 });
    R.text('the new strand has a changed', 552, 162, 3.8, { al: 'c' }); R.text('base sequence: a gene mutation', 552, 170, 3.8, { al: 'c', ink: 'P' });
    R.text('which may change the', 552, 190, 3.8, { al: 'c' }); R.text('amino acid sequence', 552, 198, 3.8, { al: 'c' }); R.text('(see next scene)', 552, 210, 3.5, { al: 'c', ink: 'T' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(12 + 6 + (Math.floor(p * 9)) * 12.4, 26, 1.9, 'P', 0.95, 1); },
});

/* ---------- 3.8.1b Effects of mutations on the polypeptide ---------- */
S({
  id: '3.8.1b', num: '3.8.1', sub: 'Effects on the polypeptide: silent mutations and frame shifts', title: 'Alteration of the sequence of bases in DNA can alter the structure of proteins', topic: '3.8', slot: [0, 1], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.8.1.s3', '3.8.1.s4', '3.8.1.s5'],
  card: {
    text: 'Mutations can result in a different amino acid sequence in the encoded polypeptide. Some gene mutations change only <b>one triplet</b> of the code. Because the genetic code is <b>degenerate</b> (most amino acids are coded for by more than one triplet), not all such mutations change the amino acid: for example substituting TAT by TAC still codes for tyrosine (a <b>silent</b> mutation). Some mutations (additions, deletions and duplications of bases) change <b>all the base triplets downstream</b> of the mutation: a <b>frame shift</b>, which usually changes many amino acids and so the tertiary structure and function of the protein. You should be able to relate the nature of a gene mutation to its effect on the encoded polypeptide, using the table of triplets supplied in the question.',
    terms: ['degenerate code', 'silent mutation', 'frame shift', 'triplet', 'downstream', 'amino acid sequence', 'polypeptide', 'tertiary structure'],
    skill: 'AO2/AO3: predict the effect of a mutation from a codon table', eq: null,
    q: 'Why does a deletion usually have a bigger effect on a polypeptide than a substitution?', a: 'A deletion shifts the reading frame, changing every triplet downstream (many amino acids); a substitution changes at most one triplet and, because of degeneracy, may change no amino acid.'
  },
  draw(R, sc) {
    // triplet table
    R.text('triplets supplied (coding strand)', 60, 14, 3.9, { al: 'c' });
    R.table(12, 20, [34, 62], 11.4, [['triplet', 'amino acid'], ['TAT, TAC', 'tyrosine (Tyr)'], ['AGT, TCT', 'serine (Ser)'], ['CTT, CTG', 'leucine (Leu)'], ['GTC, GTT', 'valine (Val)'], ['GAG', 'glutamic acid (Glu)'], ['AGA', 'arginine (Arg)']], { size: 3.3, hink: 'Y' });
    R.text('different triplets can code for', 60, 108, 3.4, { al: 'c' }); R.text('the same amino acid: degenerate', 60, 114.5, 3.4, { al: 'c', ink: 'P' });
    R.text('no need to recall the code:', 60, 130, 3.4, { al: 'c' }); R.text('the table is given', 60, 136.5, 3.4, { al: 'c' });
    R.line(116, 14, 116, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // rows
    const cw = 10.2, x0 = 128, rows = [
      ['original', 'TATAGTCTT', ['Tyr', 'Ser', 'Leu'], [], 'reference: Tyr Ser Leu', 'T'],
      ['substitution (TAT → TAC)', 'TACAGTCTT', ['Tyr', 'Ser', 'Leu'], [2], 'unchanged: a silent mutation (degenerate code)', 'T'],
      ['addition (G after TAT)', 'TATGAGTCTT', ['Tyr', 'Glu', 'Ser'], [3], 'frame shift: all triplets downstream change', 'P'],
      ['deletion (A lost)', 'TATGTCTT', ['Tyr', 'Val'], [3], 'frame shift: Tyr Val, a shorter chain', 'P'],
      ['inversion (AG → GA)', 'TATGATCTT', ['Tyr', 'Asp', 'Leu'], [3, 4], 'one triplet altered, so one amino acid changes', 'Y'],
      ['duplication (AG repeated)', 'TATAGAGTCTT', ['Tyr', 'Arg', 'Val'], [5, 6], 'frame shift: downstream triplets change', 'P'],
    ];
    rows.forEach(([nm, seq, aa, mk, res, ink], i) => {
      const y = 24 + i * 36; R.text(nm, x0, y - 1, 3.9, { al: 'l', ink: i ? 'P' : 'B' });
      tripletRow(R, x0, y + 3, seq, aa, { cw, h: 10, size: 4.8, mark: mk, asize: 4 });
      wrapText(res, 70, 3.5).forEach((ln, k) => R.text(ln, x0 + 11 * cw + 6, y + 12 + k * 6.4, 3.5, { al: 'l', ink: ink === 'P' ? 'P' : 'T' }));
    });
    R.line(380, 14, 380, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // right: frame shift illustration
    R.text('why a frame shift matters', 520, 14, 4.3, { al: 'c' });
    R.text('TAT AGT CTT AGC', 520, 34, 5, { al: 'c' });
    R.text('delete the first A of AGT:', 520, 50, 3.7, { al: 'c', ink: 'P' });
    R.text('TAT GTC TTA GC', 520, 64, 5, { al: 'c' });
    R.text('every triplet after the deletion is read differently', 520, 80, 3.6, { al: 'c' });
    R.line(386, 92, 654, 92, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('from base sequence to protein', 520, 104, 4.1, { al: 'c' });
    ['changed DNA base sequence', 'different mRNA', 'different amino acid sequence', 'different tertiary structure', 'protein may not function'].forEach((t, i) => { const y = 112 + i * 21; R.rrect(430, y, 180, 15, 4, { ink: 'B', w: 0.8, fi: ['Y', 'P', 'T', 'TY', 'P'][i], ft: 0.1, wob: 0.3 }); R.text(t, 520, y + 10.2, 3.8, { al: 'c' }); if (i < 4) R.arrow([520, y + 15.5, 520, y + 20], { ink: 'B', w: 0.8, hs: 1.8 }); });
    R.text('a silent mutation has no effect on the polypeptide', 520, 224, 3.7, { al: 'c', ink: 'T' });
  },
  anim(A, sc) { const p = A.ph(6); for (let k = 0; k < 3; k++) A.dot(128 + 18 + k * 30.6 + (p > 0.5 ? 0 : 0), 22 + 3 + 5 + (k * 0), 0, 'P', 0, k); A.dot(128 + ((p * 9) % 9) * 10.2 + 5, 22 + 3 + 5, 1.6, 'P', 0.9, 4); },
});
