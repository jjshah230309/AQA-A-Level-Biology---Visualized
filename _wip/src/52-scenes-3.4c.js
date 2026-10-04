/* ===================== 3.4.3 Genetic diversity: mutation and meiosis ===================== */
const CHR_P = 'P', CHR_T = 'T';   // maternal (pink) and paternal (teal) chromosomes
/* a chromosome: single (1 chromatid) or replicated (2 chromatids joined at the centromere). segs = [[from,to,ink]] colour overrides along its length (0..1) */
function chrX(R, x, y, len, ink, rep, o = {}) {
  const w = o.w || 5, rot = o.rot || 0; R.push(x, y, rad(rot), 1);
  const rod = (cx, segs) => { R.rrect(cx - w / 2, -len / 2, w, len, w / 2, { ink: 'B', w: 0.9, fi: ink, ft: o.ft || 0.7, wob: 0.15 }); (segs || []).forEach(([a, b, ik]) => R.rect(cx - w / 2 + 0.4, -len / 2 + a * len, w - 0.8, (b - a) * len, { ink: '', w: 0, fi: ik, ft: o.ft || 0.7, wob: 0.05 })); };
  if (rep) { rod(-w * 0.62, o.segL); rod(w * 0.62, o.segR); } else rod(0, o.segL);
  R.circle(0, (o.cen === undefined ? 0 : o.cen) * len, w * 0.55, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.8 });
  R.pop();
}
function cellO(R, x, y, r, o = {}) { R.circle(x, y, r, { ink: 'B', w: o.w || 1.2, fi: o.fi || 'Y', ft: o.ft === undefined ? 0.1 : o.ft, wob: 0.4 }); }

/* ---------- 3.4.3a Gene mutations ---------- */
S({
  id: '3.4.3a', num: '3.4.3', sub: 'Gene mutations: base substitution and deletion; mutagenic agents', title: 'Genetic diversity: mutation and meiosis', topic: '3.4', slot: [0, 2], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.4.3.s1', '3.4.3.s2', '3.4.3.s3'],
  card: {
    text: 'Gene mutations involve a change in the base sequence of DNA. They can arise <b>spontaneously during DNA replication</b> and include base <b>deletion</b> and base <b>substitution</b>. Because the genetic code is <b>degenerate</b>, not all substitutions change the encoded amino acids (a <b>silent</b> change). A substitution can change one amino acid. A deletion shifts the reading frame (<b>frameshift</b>), changing every triplet after it. <b>Mutagenic agents</b> (e.g. ionising radiation, UV light, some chemicals) increase the rate of gene mutation.',
    terms: ['gene mutation', 'base substitution', 'base deletion', 'frameshift', 'degenerate code', 'mutagenic agent', 'DNA replication', 'new allele'],
    skill: 'Relate base sequence to amino acids', eq: null,
    q: 'Why may a substitution mutation have no effect on the polypeptide?', a: 'The genetic code is degenerate: the new triplet may code for the same amino acid.'
  },
  draw(R, sc) {
    R.text('what happens to the triplets and the polypeptide?', 220, 14, 5, { al: 'c' });
    const rows = [
      { lab: 'original sequence', dna: 'TACCTTGGATCA', aa: ['P', 'Y', 'T', 'TY'], note: 'reference polypeptide' },
      { lab: 'substitution: no change to the polypeptide', dna: 'TACCTCGGATCA', aa: ['P', 'Y', 'T', 'TY'], hi: [5], note: 'degenerate code: same amino acid' },
      { lab: 'substitution: one amino acid changes', dna: 'TACCTTGGATCT', aa: ['P', 'Y', 'T', 'B'], hi: [11], note: 'a different amino acid' },
      { lab: 'deletion: frameshift', dna: 'TACTTGGATCA', aa: ['P', 'T', 'TY', '?'], hi: [3], del: true, note: 'every triplet after the deletion changes' },
    ];
    rows.forEach((r, ri) => {
      const y = 36 + ri * 47;
      R.text(r.lab, 12, y, 4.2, { al: 'l', ink: ri ? 'P' : 'B' });
      r.dna.split('').forEach((b, i) => R.baseBox(14 + i * 12.6, y + 6, b, { w: 6.8, h: 7.4 }));
      const nt = Math.ceil(r.dna.length / 3); for (let k = 0; k < nt; k++) R.rrect(12 + k * 37.8, y + 3.4, Math.min(37.8, (r.dna.length - k * 3) * 12.6) - 1.4, 13, 3, { ink: 'B', w: 0.7, wob: 0.1, t: 0.5 });
      (r.hi || []).forEach(i => R.circle(14 + i * 12.6 + 3.4, y + 10, 6.4, { ink: 'P', w: 1.4, wob: 0.12 }));
      if (r.del) { R.text('✗', 14 + 3 * 12.6 + 3.4, y + 31, 6, { al: 'c', ink: 'P' }); R.text('deleted base', 14 + 3 * 12.6 + 3.4, y + 38, 3.5, { al: 'c', ink: 'P' }); }
      r.aa.forEach((a, k) => { const bx = 190 + k * 18, by = y + 26; if (a === '?') { R.text('…', bx, by + 2, 6, { al: 'c' }); return; } R.circle(bx - 120, by, 4.6, { ink: 'B', w: 0.9, fi: a, ft: 0.7 }); if (k) R.line(bx - 120 - 13.4, by, bx - 120 - 4.6, by, { ink: 'B', w: 0.8, taper: 'none' }); });
      R.text(r.note, 150, y + 28, 3.9, { al: 'l' });
    });
    R.line(318, 22, 318, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // causes
    R.text('where mutations come from', 388, 28, 4.6, { al: 'c' });
    R.helix(344, 46, 344, 100, { amp: 7, turns: 2.4, w: 0.9 }); R.cross = null;
    R.text('spontaneous errors', 410, 62, 4.2, { al: 'c' }); R.text('during DNA replication', 410, 69, 4.2, { al: 'c' });
    R.line(332, 112, 460, 112, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('mutagenic agents increase the rate', 396, 126, 4.2, { al: 'c' });
    [['UV', 346], ['X-rays', 396], ['chemicals', 448]].forEach(([t, x]) => { for (let i = 0; i < 3; i++) R.stroke([x - 8, 144 + i * 7, x - 3, 140 + i * 7, x + 2, 148 + i * 7, x + 8, 144 + i * 7], { ink: 'Y', w: 1.2, smooth: true, taper: 'none' }); R.text(t, x, 174, 3.9, { al: 'c' }); });
    R.arrow([396, 184, 396, 200], { ink: 'P', w: 1.2, hs: 3 }); R.text('new allele of the gene', 396, 212, 4.4, { al: 'c', ink: 'P' });
    R.text('many harmful; some neutral;', 396, 223, 3.8, { al: 'c' }); R.text('a few advantageous', 396, 229, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.ring(14 + 5 * 12.6 + 3.4, 36 + 47 + 16, 3 + p * 6, 'P', 0.7, 1 - p); A.dot(346 + Math.sin(p * TAU) * 2, 46 + p * 54, 1.4, 'Y', 0.9, 2); },
});

/* ---------- 3.4.3b Chromosome mutation: non-disjunction ---------- */
S({
  id: '3.4.3b', num: '3.4.3', sub: 'Mutations in chromosome number: non-disjunction during meiosis', title: 'Genetic diversity: mutation and meiosis', topic: '3.4', slot: [2, 2], dna: 'bio', ao: 2,
  covers: ['3.4.3.s4'],
  card: {
    text: 'Mutations in the <b>number of chromosomes</b> can arise spontaneously by <b>non-disjunction</b> during meiosis: a pair of homologous chromosomes (or chromatids) fails to separate. Two of the gametes then have an extra chromosome (n + 1) and two lack one (n − 1). When one of these fuses with a normal gamete, the zygote has 2n + 1 (e.g. three copies of one chromosome) or 2n − 1 chromosomes.',
    terms: ['non-disjunction', 'meiosis', 'gamete', 'homologous chromosomes', 'chromosome mutation', 'n + 1', 'n − 1'],
    skill: 'MS 0.1: count chromosomes', eq: null,
    q: 'What is non-disjunction and what is its effect on the gametes?', a: 'Failure of a pair of homologous chromosomes (or sister chromatids) to separate in meiosis; gametes end up with one extra or one fewer chromosome.'
  },
  draw(R, sc) {
    R.text('non-disjunction in meiosis I', 100, 14, 5, { al: 'c' });
    const LG = 20, SH = 12; R.push(0, 14, 0, 1);
    // parent: long pair + short pair, all replicated
    cellO(R, 40, 60, 30); chrX(R, 29, 54, LG, CHR_P, true, { w: 3.6 }); chrX(R, 45, 54, LG, CHR_T, true, { w: 3.6 }); chrX(R, 31, 78, SH, CHR_P, true, { w: 3.2 }); chrX(R, 47, 78, SH, CHR_T, true, { w: 3.2 });
    R.text('parent cell 2n = 4', 40, 100, 3.8, { al: 'c' });
    R.arrow([74, 60, 96, 60], { ink: 'B', w: 1, hs: 2.6 }); R.text('meiosis I', 85, 52, 3.5, { al: 'c' });
    // after meiosis I: long pair fails to separate
    cellO(R, 124, 34, 26); chrX(R, 114, 30, LG, CHR_P, true, { w: 3.6 }); chrX(R, 130, 30, LG, CHR_T, true, { w: 3.6 }); chrX(R, 126, 52, SH, CHR_P, true, { w: 3.2 });
    cellO(R, 124, 92, 18); chrX(R, 124, 92, SH, CHR_T, true, { w: 3.2 });
    R.text('both long chromosomes in one cell', 124, 122, 3.5, { al: 'c', ink: 'P' });
    R.arrow([154, 34, 176, 20], { ink: 'B', w: 1, hs: 2.4 }); R.arrow([154, 38, 176, 52], { ink: 'B', w: 1, hs: 2.4 }); R.arrow([146, 92, 176, 92], { ink: 'B', w: 1, hs: 2.4 }); R.text('meiosis II', 162, 106, 3.5, { al: 'c' });
    // gametes
    const gam = (y, n3) => { cellO(R, 204, y, 14.5); if (n3) { chrX(R, 196, y - 3, LG - 4, CHR_P, false, { w: 3.2 }); chrX(R, 204, y - 3, LG - 4, CHR_T, false, { w: 3.2 }); chrX(R, 212, y + 1, SH - 2, CHR_P, false, { w: 3 }); } else chrX(R, 204, y, SH - 2, CHR_T, false, { w: 3 }); };
    gam(18, true); gam(50, true); gam(92, false); gam(122, false);
    R.text('n + 1', 232, 22, 3.9, { al: 'l', ink: 'P' }); R.text('(3 chromosomes)', 232, 29, 3.4, { al: 'l' }); R.text('n + 1', 232, 54, 3.9, { al: 'l', ink: 'P' });
    R.text('n − 1', 232, 96, 3.9, { al: 'l', ink: 'P' }); R.text('(1 chromosome)', 232, 103, 3.4, { al: 'l' }); R.text('n − 1', 232, 126, 3.9, { al: 'l', ink: 'P' });
    R.text('gametes', 204, -8, 3.5, { al: 'c' });
    R.pop();
    R.line(8, 150, 312, 150, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // fertilisation with a normal gamete (yellow = other parent): n + (n+1) and n + (n-1)
    R.text('fertilisation with a normal gamete (n = 2)', 160, 161, 4.2, { al: 'c' }); R.text('yellow = chromosomes from the normal gamete', 160, 168, 3.5, { al: 'c' });
    const zyg = (cx, nl, ns, lab) => { cellO(R, cx, 198, 26, { fi: 'P', ft: 0.08 }); for (let i = 0; i < nl; i++) chrX(R, cx - 6 * (nl - 1) + i * 12, 192, LG - 2, i === nl - 1 ? 'Y' : (i ? CHR_T : CHR_P), false, { w: 3.4 }); for (let i = 0; i < ns; i++) chrX(R, cx - 6 * (ns - 1) + i * 12, 211, SH, i === ns - 1 ? 'Y' : (i ? CHR_T : CHR_P), false, { w: 3.2 }); R.text(lab, cx, 235, 4.4, { al: 'c', ink: 'P' }); };
    zyg(66, 3, 2, '2n + 1 = 5'); zyg(206, 1, 2, '2n − 1 = 3');
    R.text('extra copy of', 130, 192, 3.7, { al: 'c' }); R.text('one chromosome', 130, 198, 3.7, { al: 'c' }); R.text('missing one copy', 270, 194, 3.7, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(74 + p * 20, 74, 1.5, 'Y', 0.9, 1); A.dot(154 + p * 22, 50 - p * 16, 1.5, 'Y', 0.9, 2); },
});

/* ---------- 3.4.3c Meiosis: two nuclear divisions; crossing over; independent segregation ---------- */
S({
  id: '3.4.3c', num: '3.4.3', sub: 'Meiosis: two divisions, independent segregation, crossing over', title: 'Genetic diversity: mutation and meiosis', topic: '3.4', slot: [3, 2], dna: 'bio', ao: 1,
  covers: ['3.4.3.s5', '3.4.3.s6', '3.4.3.s7'],
  card: {
    text: '<b>Meiosis</b> produces daughter cells that are genetically different from each other. Two nuclear divisions result, usually, in four <b>haploid</b> cells from one diploid parent cell. In prophase I the homologous chromosomes pair and <b>crossing over</b> between chromatids exchanges alleles (further genetic variation). In metaphase I the pairs line up at random, so <b>independent segregation</b> of homologous chromosomes gives different combinations of maternal and paternal chromosomes in the daughter cells. Meiosis II separates the chromatids.',
    terms: ['meiosis', 'haploid', 'diploid', 'homologous chromosomes', 'crossing over', 'independent segregation', 'chiasma', 'genetic variation'],
    skill: 'Complete chromosome diagrams', eq: null,
    q: 'Explain two ways meiosis produces genetically different gametes.', a: 'Crossing over exchanges alleles between non-sister chromatids of homologous chromosomes; independent segregation of homologous pairs gives random combinations of maternal and paternal chromosomes.'
  },
  draw(R, sc) {
    R.text('meiosis (2n = 4)', 160, 14, 5, { al: 'c' });
    // prophase I with crossing over
    cellO(R, 48, 56, 32); 
    chrX(R, 36, 50, 30, CHR_P, true, { w: 4.4, segR: [[0.55, 1, CHR_T]] }); chrX(R, 50, 50, 30, CHR_T, true, { w: 4.4, segL: [[0.55, 1, CHR_P]] }); chrX(R, 38, 78, 14, CHR_P, true, { w: 3.6 }); chrX(R, 53, 78, 14, CHR_T, true, { w: 3.6 });
    R.circle(43, 56, 3.4, { ink: 'P', w: 1.1 }); R.text('chiasma', 48, 98, 3.6, { al: 'c', ink: 'P' });
    R.text('1 prophase I: pairs form;', 48, 108, 3.6, { al: 'c' }); R.text('crossing over', 48, 114, 3.6, { al: 'c' });
    R.arrow([84, 56, 108, 56], { ink: 'B', w: 1, hs: 2.4 });
    // metaphase I: pairs on the equator, two arrangements (shown as one)
    cellO(R, 140, 56, 32); R.line(140, 28, 140, 84, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    chrX(R, 124, 50, 28, CHR_P, true, { w: 4, segR: [[0.55, 1, CHR_T]] }); chrX(R, 156, 50, 28, CHR_T, true, { w: 4, segL: [[0.55, 1, CHR_P]] }); chrX(R, 126, 74, 13, CHR_T, true, { w: 3.4 }); chrX(R, 154, 74, 13, CHR_P, true, { w: 3.4 });
    R.text('2 metaphase I: pairs line up', 140, 100, 3.6, { al: 'c' }); R.text('at random: independent', 140, 106, 3.6, { al: 'c' }); R.text('segregation', 140, 112, 3.6, { al: 'c' });
    R.arrow([176, 56, 200, 56], { ink: 'B', w: 1, hs: 2.4 });
    // after meiosis I: two haploid cells (chromosomes still of two chromatids)
    cellO(R, 232, 26, 20); chrX(R, 226, 24, 20, CHR_P, true, { w: 3.6, segR: [[0.55, 1, CHR_T]] }); chrX(R, 238, 28, 11, CHR_T, true, { w: 3 });
    cellO(R, 232, 80, 20); chrX(R, 226, 78, 20, CHR_T, true, { w: 3.6, segL: [[0.55, 1, CHR_P]] }); chrX(R, 238, 82, 11, CHR_P, true, { w: 3 });
    R.text('3 end of meiosis I:', 284, 46, 3.5, { al: 'c' }); R.text('2 haploid cells', 284, 52, 3.5, { al: 'c' });
    R.line(8, 124, 312, 124, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // meiosis II -> four cells
    R.text('4 meiosis II: chromatids separate', 160, 136, 4.2, { al: 'c' });
    R.arrow([234, 106, 234, 128], { ink: 'B', w: 0.8, hs: 2 });
    const g4 = [[44, CHR_P, CHR_P, 'P', 'T'], [112, CHR_P, CHR_T, 'T', 'T'], [180, CHR_T, CHR_P, 'P', 'P'], [248, CHR_T, CHR_T, 'T', 'P']];
    g4.forEach(([x, a, b], k) => {
      cellO(R, x, 182, 28);
      const lg = [[CHR_P, [[0.55, 1, CHR_T]]], [CHR_P, []], [CHR_T, []], [CHR_T, [[0.55, 1, CHR_P]]]][k], sh = [CHR_T, CHR_T, CHR_P, CHR_P][k];
      chrX(R, x - 7, 180, 24, lg[0], false, { w: 4, segL: lg[1] }); chrX(R, x + 8, 184, 12, sh, false, { w: 3.4 });
    });
    R.text('4 haploid cells', 160, 226, 4.4, { al: 'c' }); R.text('genetically different from each other', 160, 234, 3.9, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(84 + p * 24, 56, 1.4, 'Y', 0.9, 1); A.dot(176 + p * 24, 56, 1.4, 'Y', 0.9, 2); },
});

/* ---------- 3.4.3d Meiosis outcomes: 2^n combinations; mitosis vs meiosis; random fertilisation ---------- */
S({
  id: '3.4.3d', num: '3.4.3', sub: 'Mitosis and meiosis compared; combinations of chromosomes: 2ⁿ; random fertilisation', title: 'Genetic diversity: mutation and meiosis', topic: '3.4', slot: [0, 3], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.4.3.s8', '3.4.3.s9', '3.4.3.s10', '3.4.3.s11'],
  card: {
    text: '<b>Mitosis</b>: one nuclear division, two diploid cells genetically identical to the parent and to each other (growth, repair, asexual reproduction). <b>Meiosis</b>: two nuclear divisions, usually four haploid cells that are genetically different from each other (gamete production; crossing over and independent segregation). Without crossing over, the number of possible chromosome combinations in gametes from one individual is <b>2ⁿ</b> where n is the number of homologous pairs; with <b>random fertilisation</b> of two gametes the number of possible combinations is (2ⁿ)². Meiosis is recognised in unfamiliar life cycles where haploid cells are formed from diploid ones. Random fertilisation further increases genetic variation within a species.',
    terms: ['mitosis', 'meiosis', 'haploid', 'diploid', 'genetically identical', 'genetically different', '2^n', 'random fertilisation', 'life cycle'],
    skill: 'MS 0.5: 2ⁿ and (2ⁿ)²', eq: MATH(mt('combinations in gametes '), mo('='), msup(mn('2'), mi('n')), mt('      after random fertilisation '), mo('='), msup(mpar(msup(mn('2'), mi('n'))), mn('2'))),
    eqn: 'Humans: n = 23, so 2²³ = 8 388 608 gametes; (2²³)² ≈ 7.0 × 10¹³',
    q: 'A species has 2n = 6. How many different chromosome combinations are possible in the gametes from one individual (without crossing over)?', a: '2³ = 8 (n = 3 homologous pairs).'
  },
  draw(R, sc) {
    // mitosis vs meiosis
    R.text('mitosis', 90, 14, 5, { al: 'c' }); R.text('meiosis', 270, 14, 5, { al: 'c' });
    cellO(R, 90, 52, 24); chrX(R, 82, 50, 22, CHR_P, true, { w: 3.6 }); chrX(R, 96, 50, 22, CHR_T, true, { w: 3.6 });
    R.arrow([90, 78, 90, 96], { ink: 'B', w: 1, hs: 2.6 });
    cellO(R, 62, 118, 17); chrX(R, 58, 116, 18, CHR_P, false, { w: 3.2 }); chrX(R, 68, 116, 18, CHR_T, false, { w: 3.2 });
    cellO(R, 118, 118, 17); chrX(R, 114, 116, 18, CHR_P, false, { w: 3.2 }); chrX(R, 124, 116, 18, CHR_T, false, { w: 3.2 });
    ['1 division', '2 cells, diploid', 'genetically identical', 'growth, repair'].forEach((t, i) => R.text(t, 90, 148 + i * 7, 3.9, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
    R.line(180, 22, 180, 176, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    cellO(R, 270, 52, 24); chrX(R, 262, 50, 22, CHR_P, true, { w: 3.6, segR: [[0.55, 1, CHR_T]] }); chrX(R, 276, 50, 22, CHR_T, true, { w: 3.6, segL: [[0.55, 1, CHR_P]] });
    R.arrow([270, 78, 270, 92], { ink: 'B', w: 1, hs: 2.6 });
    [[238, CHR_P], [260, CHR_P], [282, CHR_T], [304, CHR_T]].forEach(([x, ink], i) => { cellO(R, x, 118, 10.5); chrX(R, x, 117, 14, ink, false, { w: 3, segL: i === 0 ? [[0.55, 1, CHR_T]] : (i === 3 ? [[0.55, 1, CHR_P]] : []) }); });
    ['2 divisions', '4 cells, haploid', 'genetically different', 'gametes'].forEach((t, i) => R.text(t, 270, 148 + i * 7, 3.9, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
    R.line(8, 184, 332, 184, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 2^n table
    R.text('possible combinations of chromosomes', 170, 192, 4.4, { al: 'c' });
    R.table(24, 198, [38, 60, 100, 100], 9, [['pairs, n', '2^n', 'in one individual’s gametes', 'after random fertilisation'], ['2', '4', '4 types of gamete', '4^2 = 16'], ['3', '8', '8 types of gamete', '8^2 = 64'], ['23', '8 388 608', 'about 8.4 million', 'about 7 × 10^{13}']], { size: 3.9, hink: 'Y' });
    R.line(340, 22, 340, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // independent segregation illustration for n = 3 -> 8
    R.text('n = 3: independent segregation gives 2^3 = 8', 498, 14, 4.6, { al: 'c' });
    const cols = [[CHR_P, CHR_T]];
    for (let k = 0; k < 8; k++) {
      const cx = 372 + (k % 4) * 66, cy = 60 + Math.floor(k / 4) * 54;
      cellO(R, cx, cy, 21);
      [0, 1, 2].forEach(j => { const pick = (k >> (2 - j)) & 1; chrX(R, cx - 10 + j * 10, cy + (j % 2 ? 2 : -1), [20, 15, 11][j], pick ? CHR_T : CHR_P, false, { w: 3.4 }); });
    }
    R.text('8 different gametes from one individual', 498, 170, 4.2, { al: 'c' });
    R.line(352, 182, 644, 182, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('random fertilisation', 498, 196, 4.6, { al: 'c' });
    cellO(R, 396, 216, 15); chrX(R, 392, 216, 16, CHR_P, false, { w: 3 }); chrX(R, 400, 216, 16, CHR_T, false, { w: 3 }); R.text('+', 424, 220, 8, { al: 'c' }); cellO(R, 452, 216, 15); chrX(R, 448, 216, 16, CHR_T, false, { w: 3 }); chrX(R, 456, 216, 16, CHR_P, false, { w: 3 });
    R.arrow([472, 216, 492, 216], { ink: 'B', w: 1, hs: 2.4 }); cellO(R, 516, 216, 15, { fi: 'P', ft: 0.08 }); [-6, 0, 6].forEach((dx, i) => chrX(R, 516 + dx * 1.2, 215, 14, [CHR_P, CHR_T, CHR_P][i], false, { w: 2.8 })); R.text('zygote', 516, 238, 3.6, { al: 'c' });
    wrapText('any male gamete may fuse with any female gamete: more variation', 96, 3.8).forEach((t, i) => R.text(t, 544, 208 + i * 6.2, 3.8, { al: 'l', ink: i > 1 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(5); A.dot(90, 78 + p * 18, 1.5, 'Y', 0.9, 1); A.dot(270, 78 + p * 14, 1.5, 'Y', 0.9, 2); },
});
