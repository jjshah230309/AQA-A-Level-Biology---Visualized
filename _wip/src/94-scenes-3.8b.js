/* ===================== 3.8.2 Gene expression is controlled by a number of features ===================== */
/* embryo ball: blastomere cluster */
function embryo(R, x, y, r, n, ink, ft = 0.3) { for (let k = 0; k < n; k++) { const a = k * 2.4, rr = r * Math.sqrt((k + 0.5) / n); R.circle(x + Math.cos(a) * rr, y + Math.sin(a) * rr, Math.max(2.2, r / Math.sqrt(n) * 0.9), { ink: 'B', w: 0.7, fi: ink, ft, wob: 0.08 }); } }

/* ---------- 3.8.2.1a Totipotent, pluripotent, multipotent and unipotent cells ---------- */
S({
  id: '3.8.2.1a', num: '3.8.2.1', sub: 'Totipotent, pluripotent, multipotent and unipotent cells', title: 'Most of a cell’s DNA is not translated', topic: '3.8', slot: [2, 1], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.8.2.1.s1', '3.8.2.1.s2', '3.8.2.1.s3', '3.8.2.1.s4', '3.8.2.1.s5'],
  card: {
    text: '<b>Totipotent</b> cells can divide and produce <b>any type of body cell</b> (and, in mammals, placental cells); they occur only for a limited time in early mammalian embryos. During development totipotent cells translate only part of their DNA, which results in <b>cell specialisation</b>: different genes are expressed, so different proteins are made. <b>Pluripotent</b> cells are found in embryos and can become any cell type of the body (but not the placenta); <b>multipotent</b> and <b>unipotent</b> cells are found in mature mammals and can divide to form a <b>limited number</b> of cell types. Unipotent cells make only one type, exemplified by the formation of <b>cardiomyocytes</b> (heart muscle cells).',
    terms: ['totipotent', 'pluripotent', 'multipotent', 'unipotent', 'stem cell', 'specialisation', 'cardiomyocyte', 'differentiation'],
    skill: 'AO1: classify stem cells by the range of cells they can form', eq: null,
    q: 'Which type of stem cell can form any body cell but not the placenta?', a: 'Pluripotent cells.'
  },
  draw(R, sc) {
    R.text('how potency falls during development', 332, 14, 4.5, { al: 'c' });
    const lv = [
      [20, 'totipotent', 'any cell type, including placenta', 'early embryo only (few divisions)', 'P', 1],
      [76, 'pluripotent', 'any body cell type, not the placenta', 'embryo', 'Y', 4],
      [132, 'multipotent', 'a limited range of cell types', 'mature mammals, e.g. bone marrow', 'T', 6],
      [188, 'unipotent', 'one cell type only', 'mature mammals, e.g. heart', 'TY', 8],
    ];
    lv.forEach(([y, nm, d, loc, ink, n], i) => {
      R.rrect(8, y, 118, 46, 6, { ink: 'B', w: 0.9, fi: ink, ft: 0.1, wob: 0.3 });
      R.text(nm, 67, y + 14, 4.8, { al: 'c', ink: 'P' }); wrapText(d, 108, 3.4).forEach((ln, k) => R.text(ln, 67, y + 24 + k * 6, 3.4, { al: 'c' })); R.text(loc, 67, y + 40, 3.1, { al: 'c', ink: 'T' });
      if (i < 3) R.arrow([67, y + 47, 67, y + 55], { ink: 'B', w: 1, hs: 2.6 });
    });
    // cell glyphs to the right showing fan of outcomes
    const fan = (y, kinds) => kinds.forEach((k, i) => { const x = 160 + i * 38; R.circle(x, y, 8, { ink: 'B', w: 0.9, fi: k, ft: 0.4 }); if (i === 0) R.circle(x, y, 3, { ink: 'B', w: 0.6, fi: 'B', ft: 0.5 }); });
    fan(43, ['P', 'Y', 'T', 'TY', 'B', 'P', 'Y']); R.text('every body cell type, and the placenta', 310, 62, 3.5, { al: 'c' });
    fan(99, ['P', 'Y', 'T', 'TY', 'B', 'P', 'Y']); R.text('every body cell type (not placenta)', 296, 118, 3.5, { al: 'c' });
    fan(155, ['P', 'Y', 'T']); R.text('a few types, e.g. red and white blood cells', 244, 174, 3.5, { al: 'c' });
    fan(211, ['P']); R.text('one type, e.g. forming cardiomyocytes', 230, 230, 3.5, { al: 'c' });
    R.line(414, 14, 414, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // specialisation
    R.text('specialisation = selective expression', 534, 14, 4.3, { al: 'c' });
    R.helix(440, 38, 630, 38, { amp: 6, turns: 5, w: 0.8 });
    R.text('stem cell: all genes available', 535, 58, 3.6, { al: 'c' });
    R.arrow([480, 64, 480, 80], { ink: 'B', w: 1, hs: 2.4 }); R.arrow([590, 64, 590, 80], { ink: 'B', w: 1, hs: 2.4 });
    const gene = (x, y, w, on, nm) => { R.rect(x, y, w, 12, { ink: 'B', w: 0.7, fi: on ? 'P' : 'B', ft: on ? 0.5 : 0.1 }); R.text(nm, x + w / 2, y + 8.6, 3.2, { al: 'c' }); };
    R.text('red blood cell', 480, 92, 3.8, { al: 'c', ink: 'P' }); R.text('nerve cell', 590, 92, 3.8, { al: 'c', ink: 'T' });
    [['haem', 1], ['neuro', 0], ['myo', 0]].forEach(([n, on], i) => gene(446 + i * 24, 100, 22, on, n)); [['haem', 0], ['neuro', 1], ['myo', 0]].forEach(([n, on], i) => gene(556 + i * 24, 100, 22, on, n));
    R.text('genes switched on (pink) or off (grey)', 535, 124, 3.4, { al: 'c' });
    ['totipotent cells translate only part of their DNA;', 'different parts in different cells give different', 'proteins, so cells specialise into different types'].forEach((t, i) => R.text(t, 535, 144 + i * 8, 3.8, { al: 'c' }));
    R.text('example: cardiomyocytes (heart muscle) are', 535, 182, 3.7, { al: 'c', ink: 'T' }); R.text('formed from unipotent cells', 535, 190, 3.7, { al: 'c', ink: 'T' });
    R.text('totipotent cells exist only briefly', 535, 212, 3.7, { al: 'c', ink: 'P' }); R.text('in early mammalian embryos', 535, 219, 3.7, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); for (let k = 0; k < 4; k++) { const u = (p + k / 4) % 1; A.dot(67, 20 + u * 200, 1.6, 'P', 0.9, k); } },
});

/* ---------- 3.8.2.1b Stem cells in treating disorders ---------- */
S({
  id: '3.8.2.1b', num: '3.8.2.1', sub: 'Pluripotent and induced pluripotent stem cells in treating human disorders', title: 'Most of a cell’s DNA is not translated', topic: '3.8', slot: [0, 2], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.8.2.1.s6', '3.8.2.1.s7', '3.8.2.1.s8'],
  card: {
    text: '<b>Pluripotent stem cells</b> can divide in unlimited numbers and can be used in treating human disorders (for example by replacing damaged tissue). <b>Induced pluripotent stem cells (iPS cells)</b> can be produced from adult <b>somatic cells</b> using appropriate protein <b>transcription factors</b>; because they come from the patient they can avoid rejection and avoid the destruction of embryos. You should be able to <b>evaluate the use of stem cells</b> in treating human disorders: benefits include repairing damaged tissue and saving lives (organs for transplants); issues include the ethics of destroying embryos (embryonic cells), cost, the risk of tumour formation, and that iPS cells are still being researched. Weigh the benefits against the risks and consider different views.',
    terms: ['pluripotent', 'induced pluripotent stem cell', 'somatic cell', 'transcription factor', 'embryonic stem cell', 'adult stem cell', 'ethical issues', 'rejection'],
    skill: 'AO3: evaluate the use of stem cells in treating disorders', eq: null,
    q: 'Give one advantage of using iPS cells rather than embryonic stem cells.', a: 'They are made from the patient’s own adult cells, so no embryo is destroyed and the new tissue is less likely to be rejected.'
  },
  draw(R, sc) {
    R.text('three sources of pluripotent cells', 170, 14, 4.4, { al: 'c' });
    // embryonic
    R.circle(54, 52, 22, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.08 }); embryo(R, 54, 52, 15, 9, 'P', 0.3);
    R.text('embryonic stem cells', 54, 86, 3.7, { al: 'c', ink: 'P' }); R.text('from a 4–5 day embryo', 54, 93, 3.3, { al: 'c' });
    // adult
    R.ellipse(170, 52, 24, 12, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12 }); R.circle(170, 52, 4, { ink: 'B', w: 0.7, fi: 'B', ft: 0.4 });
    R.text('adult stem cells', 170, 86, 3.7, { al: 'c', ink: 'T' }); R.text('multipotent, limited range', 170, 93, 3.3, { al: 'c' });
    // iPS
    R.ellipse(286, 52, 24, 12, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12 }); R.circle(286, 52, 4, { ink: 'B', w: 0.7, fi: 'B', ft: 0.4 });
    R.arrow([286, 68, 286, 82], { ink: 'P', w: 1, hs: 2.6 }); R.text('transcription factors', 278, 77, 3.4, { al: 'r', ink: 'P' });
    R.ellipse(286, 98, 14, 8, { ink: 'B', w: 1.1, fi: 'P', ft: 0.25 }); R.text('iPS cell', 286, 114, 3.7, { al: 'c', ink: 'P' });
    R.text('adult body (somatic) cell', 286, 38, 3.3, { al: 'c' });
    R.line(8, 124, 330, 124, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('pluripotent cells divide in unlimited numbers', 169, 136, 3.8, { al: 'c' });
    R.text('and can form any cell type needed for therapy', 169, 144, 3.8, { al: 'c' });
    // therapy flow
    [['stem cells', 'Y'], ['grown in culture', 'T'], ['made to specialise', 'P'], ['replace damaged tissue', 'TY']].forEach(([t, ink], i) => { const x = 10 + i * 80; R.rrect(x, 158, 72, 28, 4, { ink: 'B', w: 0.8, fi: ink, ft: 0.12, wob: 0.3 }); wrapText(t, 62, 3.6).forEach((ln, k, a) => R.text(ln, x + 36, 174 + (k - (a.length - 1) / 2) * 7 + 1.3, 3.6, { al: 'c' })); if (i < 3) R.arrow([x + 73, 172, x + 79, 172], { ink: 'B', w: 0.8, hs: 2 }); });
    R.text('e.g. replacing damaged heart, eye or blood cells', 169, 204, 3.6, { al: 'c' });
    R.text('with the patient’s own iPS cells, rejection is less likely', 169, 218, 3.6, { al: 'c', ink: 'P' });
    R.line(338, 14, 338, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // evaluation
    R.text('evaluating stem cell therapy', 496, 14, 4.4, { al: 'c' });
    const bx = (x, ttl, ink, items) => { R.rrect(x, 24, 150, 196, 6, { ink: 'B', w: 0.9, fi: ink, ft: 0.07, wob: 0.3 }); R.text(ttl, x + 75, 38, 4.2, { al: 'c', ink: ink === 'T' ? 'T' : 'P' }); items.forEach((t, i) => { wrapText(t, 128, 4.3).forEach((ln, k) => R.text(ln, x + 14, 66 + i * 40 + k * 7.4, 4.3, { al: 'l' })); R.circle(x + 8, 64.4 + i * 40, 1.7, { ink: ink === 'T' ? 'T' : 'P', w: 0.5, fi: ink === 'T' ? 'T' : 'P', ft: 1 }); }); };
    bx(346, 'benefits', 'T', ['replace damaged tissue and cure disorders', 'save lives: organs without waiting for donors', 'iPS cells from the patient avoid rejection', 'improve quality of life (e.g. sight)']);
    bx(504, 'risks and issues', 'P', ['embryo destroyed for embryonic cells (ethics)', 'tumour risk if cells divide uncontrollably', 'high cost and still being researched', 'different views in society: weigh all']);
  },
  anim(A, sc) { const p = A.ph(5); A.dot(286, 68 + p * 14, 2, 'P', 0.9, 1); },
});

/* ---------- 3.8.2.2a Transcription factors and oestrogen ---------- */
S({
  id: '3.8.2.2a', num: '3.8.2.2', sub: 'Transcription factors and the steroid hormone oestrogen', title: 'Regulation of transcription and translation', topic: '3.8', slot: [2, 2], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.8.2.2.s1', '3.8.2.2.s2'],
  card: {
    text: 'In eukaryotes, transcription of target genes can be stimulated or inhibited when specific <b>transcription factors</b> move from the cytoplasm into the nucleus and bind to DNA near the target gene. The steroid hormone <b>oestrogen</b> is <b>lipid-soluble</b>, so it passes through the cell-surface membrane and binds to a <b>receptor</b> (a transcription factor) in the cytoplasm. The oestrogen–receptor complex moves into the nucleus, binds to a specific DNA sequence and <b>stimulates transcription</b> of the target gene: RNA polymerase binds and makes mRNA, which is translated into the protein. Only cells with oestrogen receptors respond.',
    terms: ['transcription factor', 'oestrogen', 'steroid hormone', 'receptor', 'target gene', 'RNA polymerase', 'promoter', 'nucleus', 'lipid-soluble'],
    skill: 'AO2: explain how a hormone changes gene expression', eq: null,
    q: 'Why does oestrogen affect only some cells?', a: 'Only target cells have the receptor protein (the transcription factor) that oestrogen binds to; other cells cannot respond.'
  },
  draw(R, sc) {
    R.text('a transcription factor changes the rate of transcription', 330, 14, 4.4, { al: 'c' });
    R.ellipse(170, 132, 156, 96, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.05, wob: 0.7 });
    R.ellipse(232, 130, 76, 64, { ink: 'B', w: 1.3, fi: 'P', ft: 0.07, wob: 0.5 }); R.ellipse(232, 130, 73, 61, { ink: 'B', w: 0.7, wob: 0.4 });
    R.text('cytoplasm', 70, 176, 3.8, { al: 'c' }); R.text('nucleus', 232, 82, 3.9, { al: 'c' });
    tok(R, 30, 24, 'E', { r: 5.5, fi: 'Y', ft: 0.9, size: 4 }); R.text('oestrogen (lipid-soluble)', 42, 26, 3.5, { al: 'l', ink: 'P' });
    R.arrow([34, 31, 52, 92], { ink: 'B', w: 0.9, hs: 2.6 }); R.text('crosses the membrane', 40, 62, 3.3, { al: 'l' });
    R.ellipse(62, 114, 17, 11, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); R.text('receptor', 62, 138, 3.6, { al: 'c' });
    R.arrow([82, 114, 106, 114], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('binds', 94, 108, 3.2, { al: 'c' });
    R.ellipse(124, 114, 17, 11, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); tok(R, 118, 109, 'E', { r: 4.2, fi: 'Y', ft: 0.9, size: 3.2 }); R.text('oestrogen–receptor', 124, 138, 3.4, { al: 'c' }); R.text('complex', 124, 144, 3.4, { al: 'c' });
    R.arrow([144, 114, 178, 114], { ink: 'P', w: 1.2, hs: 3 }); R.text('enters nucleus', 134, 98, 3.2, { al: 'c' });
    R.ellipse(194, 130, 15, 9, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); tok(R, 188, 126, 'E', { r: 3.8, fi: 'Y', ft: 0.9, size: 3 });
    R.arrow([198, 139, 211, 146], { ink: 'B', w: 0.9, hs: 2.4 });
    R.helix(196, 168, 274, 168, { amp: 5, turns: 3, w: 0.8 }); R.rect(206, 160, 26, 16, { ink: 'P', w: 1, fi: 'P', ft: 0.14 });
    R.ellipse(219, 151, 14, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); tok(R, 213, 147, 'E', { r: 3.8, fi: 'Y', ft: 0.9, size: 3 });
    R.ellipse(256, 151, 17, 8, { ink: 'B', w: 1, fi: 'T', ft: 0.3 }); R.text('RNA polymerase', 262, 136, 3.2, { al: 'c' });
    R.text('promoter', 219, 184, 3.3, { al: 'c' }); R.text('target gene', 258, 184, 3.3, { al: 'c' });
    R.stroke([268, 168, 286, 174, 300, 192, 304, 214], { ink: 'T', w: 1.5, smooth: true, taper: 'none' }); R.text('mRNA', 296, 224, 3.8, { al: 'c', ink: 'T' });
    R.line(332, 14, 332, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // steps
    R.text('step by step', 490, 24, 4.2, { al: 'c' });
    ['oestrogen passes through the membrane', 'binds to its receptor (a transcription factor)', 'the complex enters the nucleus', 'binds to DNA near the target gene', 'RNA polymerase binds: transcription starts', 'mRNA is translated to make the protein'].forEach((t, i) => { const y = 36 + i * 24; R.bubble(352, y + 4, 5, String(i + 1), { ft: 0.2 }); R.text(t, 364, y + 6, 3.9, { al: 'l' }); });
    R.line(332, 182, 650, 182, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('activators increase, repressors decrease, the', 490, 194, 3.8, { al: 'c' }); R.text('rate of transcription; only target cells with', 490, 202, 3.8, { al: 'c' });
    R.text('the receptor respond to oestrogen', 490, 210, 3.8, { al: 'c', ink: 'P' });
    R.text('(the complex activates transcription)', 490, 222, 3.5, { al: 'c', ink: 'T' });
  },
  anim(A, sc) { const p = A.ph(6); const k = Math.floor(p * 3), u = p * 3 - k; if (k === 0) A.dot(144 + u * 34, 114, 2.2, 'Y', 0.95, 1); else if (k === 1) A.dot(196 + u * 18, 142 + u * 12, 2.2, 'Y', 0.95, 1); else A.dot(270 + u * 38, 172 + u * 42, 1.8, 'T', 0.95, 2); },
});

/* ---------- 3.8.2.2b Epigenetics: DNA methylation and histone acetylation ---------- */
S({
  id: '3.8.2.2b', num: '3.8.2.2', sub: 'Epigenetic control: increased DNA methylation and decreased histone acetylation', title: 'Regulation of transcription and translation', topic: '3.8', slot: [0, 3], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.8.2.2.s3', '3.8.2.2.s4', '3.8.2.2.s5', '3.8.2.2.s6'],
  card: {
    text: '<b>Epigenetics</b> involves <b>heritable changes in gene function without changes to the base sequence of DNA</b>. The changes are caused by changes in the environment that <b>inhibit transcription</b> by (1) <b>increased methylation</b> of the DNA (methyl groups added to cytosine bases, often at CpG sites, so transcription factors and RNA polymerase cannot bind) or (2) <b>decreased acetylation</b> of the associated <b>histones</b>: with fewer acetyl groups the histones are more positively charged, bind the DNA more tightly, so chromatin is condensed and the gene is not transcribed. Acetylated histones loosen the DNA so genes can be transcribed. Epigenetic changes are relevant to the development and treatment of disease, especially <b>cancer</b>, and may be treated by drugs that reverse them.',
    terms: ['epigenetics', 'heritable', 'methylation', 'acetylation', 'histone', 'chromatin', 'transcription', 'base sequence', 'environment', 'cancer'],
    skill: 'Interpret data on gene expression; genetic and environmental influence on phenotype', eq: null,
    q: 'How does decreased acetylation of histones switch a gene off?', a: 'Fewer acetyl groups make the histones more positively charged, so they bind DNA more tightly; the DNA is more condensed and transcription factors and RNA polymerase cannot access the gene, so transcription is inhibited.'
  },
  draw(R, sc) {
    R.text('DNA wrapped round histones', 108, 14, 4.3, { al: 'c' });
    const nucleosomes = (x0, y, tight, acet, meth) => {
      for (let k = 0; k < 4; k++) {
        const cx = x0 + k * (tight ? 38 : 50), r = 11;
        R.circle(cx, y, r, { ink: 'B', w: 1, fi: 'P', ft: 0.28, wob: 0.15 });
        for (let t = 0; t < 2; t++) R.ellipse(cx, y, r + 3 + t * 2.4, r + 1.4 + t * 2, { ink: 'B', w: 0.8, wob: 0.15, rot: t * 40 });
        if (k < 3) R.line(cx + r + 4.5, y + 1, cx + (tight ? 38 : 50) - r - 4.5, y + 1, { ink: 'B', w: 1, taper: 'none' });
        if (acet) { R.circle(cx - 8, y - 14, 2.6, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.9 }); R.circle(cx + 8, y - 14, 2.6, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.9 }); }
        if (meth) R.circle(cx + (tight ? 19 : 25), y - 7, 2.4, { ink: 'B', w: 0.6, fi: 'T', ft: 0.9 });
      }
    };
    R.text('gene ON: histones acetylated', 108, 30, 3.9, { al: 'c', ink: 'T' });
    nucleosomes(40, 56, false, true, false);
    R.text('acetyl groups (yellow)', 108, 78, 3.3, { al: 'c' }); R.text('DNA loosely bound: accessible', 108, 86, 3.5, { al: 'c' });
    
    R.line(10, 98, 214, 98, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('gene OFF: decreased acetylation', 108, 112, 3.9, { al: 'c', ink: 'P' });
    nucleosomes(46, 138, true, false, false);
    R.text('histones more positively charged:', 108, 160, 3.4, { al: 'c' }); R.text('DNA tightly bound, condensed', 108, 167, 3.4, { al: 'c' });
    R.text('✗', 190, 140, 7, { al: 'c', ink: 'P' });
    R.line(10, 178, 214, 178, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('gene OFF: increased methylation', 108, 192, 3.9, { al: 'c', ink: 'P' });
    R.helix(30, 212, 190, 212, { amp: 5, turns: 6, w: 0.8 });
    [58, 100, 142].forEach(x => { R.circle(x, 202, 3, { ink: 'B', w: 0.8, fi: 'T', ft: 0.9 }); R.text('CH3', x, 196, 2.8, { al: 'c' }); });
    R.text('methyl groups on cytosine bases (CpG sites)', 108, 228, 3.4, { al: 'c' });
    R.line(222, 14, 222, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // definition and inheritance
    R.text('what makes it epigenetic', 332, 14, 4.3, { al: 'c' });
    R.rrect(236, 24, 190, 50, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.12, wob: 0.3 });
    ['heritable changes in gene function', 'without changes to the', 'base sequence of the DNA'].forEach((t, i) => R.text(t, 331, 38 + i * 9, 4.2, { al: 'c', ink: i == 2 ? 'P' : 'B' }));
    R.text('base sequence:  A T G C C A T', 331, 92, 4.2, { al: 'c' }); R.text('stays the same in both cells', 331, 100, 3.5, { al: 'c' });
    R.text('environment changes (e.g. diet, stress, toxins) can alter', 331, 120, 3.7, { al: 'c' }); R.text('the marks, which inhibit transcription', 331, 128, 3.7, { al: 'c' });
    ['environment', 'epigenetic marks added or removed', 'gene expression changes', 'phenotype changes'].forEach((t, i) => { const y = 140 + i * 22; R.rrect(256, y, 150, 16, 4, { ink: 'B', w: 0.8, fi: ['Y', 'Y', 'P', 'T'][i], ft: i === 3 ? 0.06 : 0.1, wob: 0.3 }); R.text(t, 331, y + 10.6, 3.8, { al: 'c' }); if (i < 3) R.arrow([331, y + 16.5, 331, y + 21.5], { ink: 'B', w: 0.8, hs: 1.8 }); });
    R.text('some marks are passed on to offspring', 331, 232, 3.6, { al: 'c', ink: 'T' });
    R.line(436, 14, 436, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // twin data
    R.text('interpreting data: twins', 546, 14, 4.3, { al: 'c' });
    R.text('differences in phenotype and methylation', 546, 24, 3.4, { al: 'c' });
    const g = R.graph(468, 40, 160, 100, { xmin: 0, xmax: 60, ymin: 0, ymax: 12, xl: 'age / years', yl: 'differences in methylation', xt: [[0, '0'], [20, '20'], [40, '40'], [60, '60']], yt: [[0, '0'], [4, '4'], [8, '8'], [12, '12']], fs: 3.3, xly: 10, ylx: 14 }).axes();
    g.curve([3, 1, 15, 3.2, 28, 5.4, 40, 7.4, 52, 9.2], { ink: 'P', w: 1.6 }); g.dots([3, 1, 15, 3.2, 28, 5.4, 40, 7.4, 52, 9.2], { r: 1.6, ink: 'B' });
    R.text('identical twins start alike and diverge', 546, 164, 3.7, { al: 'c' }); R.text('with age as environments differ', 546, 172, 3.7, { al: 'c' });
    R.text('genetic and environmental factors', 546, 188, 3.8, { al: 'c', ink: 'P' }); R.text('both influence the phenotype', 546, 196, 3.8, { al: 'c', ink: 'P' });
    R.text('illustrative example', 546, 214, 3.3, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(40 + (p * 4) * 50 % 150, 56 + Math.sin(p * TAU) * 2, 1.7, 'T', 0.9, 1); },
});

/* ---------- 3.8.2.2c RNA interference and evaluating genetic v environmental influences ---------- */
S({
  id: '3.8.2.2c', num: '3.8.2.2', sub: 'RNA interference, and evaluating genetic and environmental influences on phenotype', title: 'Regulation of transcription and translation', topic: '3.8', slot: [2, 3], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.8.2.2.s7', '3.8.2.2.s8', '3.8.2.2.s9'],
  card: {
    text: 'In eukaryotes and some prokaryotes, <b>translation</b> of the mRNA produced from target genes can be inhibited by <b>RNA interference (RNAi)</b>. Small double-stranded RNA molecules (siRNA, or miRNA) are produced in the cell; one strand joins a protein complex and binds to the <b>complementary base sequence</b> on the target mRNA in the cytoplasm. The mRNA is then cut up and degraded (or blocked), so it <b>cannot be translated</b> and the protein is not made. You should be able to <b>interpret data</b> from investigations into gene expression and <b>evaluate data</b> on the relative influences of genetic and environmental factors on phenotype, for example <b>twin studies</b>: if identical twins (same genes) differ, environment matters; compare with non-identical twins and unrelated people, and consider sample size.',
    terms: ['RNA interference', 'siRNA', 'miRNA', 'complementary', 'mRNA degradation', 'translation', 'twin study', 'genotype', 'environment', 'sample size'],
    skill: 'MS 3.1 / AO3: evaluate twin data for genetic and environmental influences', eq: null,
    q: 'How does RNAi stop a protein being made?', a: 'A small double-stranded RNA binds to the complementary sequence on the mRNA, which is cut up/blocked, so the mRNA cannot be translated.'
  },
  draw(R, sc) {
    R.text('RNA interference (RNAi)', 150, 14, 4.4, { al: 'c' });
    R.rrect(10, 22, 126, 78, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.05, wob: 0.4 }); R.text('nucleus', 28, 32, 3.4, { al: 'l' });
    R.helix(26, 62, 100, 62, { amp: 5, turns: 3, w: 0.8 }); R.stroke([100, 62, 112, 52, 124, 58, 140, 52], { ink: 'T', w: 1.4, smooth: true, taper: 'none' });
    R.text('gene transcribed to mRNA', 72, 84, 3.4, { al: 'c' });
    R.text('cytoplasm', 214, 32, 3.6, { al: 'c' });
    R.stroke([140, 52, 170, 44, 196, 60, 226, 52, 260, 62, 286, 54], { ink: 'T', w: 1.6, smooth: true, taper: 'none' }); R.text('mRNA', 154, 44, 3.5, { al: 'c', ink: 'T' });
    for (let k = 0; k < 8; k++) R.line(226 + k * 7.6, 52 + (k % 2 ? 2 : 6), 226 + k * 7.6, 60 + (k % 2 ? 2 : 6), { ink: 'B', w: 0.4, taper: 'none' });
    // siRNA
    R.rect(236, 76, 52, 6, { ink: 'B', w: 0.7, fi: 'P', ft: 0.5, wob: 0.05 }); R.rect(236, 84, 52, 6, { ink: 'B', w: 0.7, fi: 'P', ft: 0.3, wob: 0.05 }); R.text('small double-stranded RNA', 262, 100, 3.4, { al: 'c', ink: 'P' });
    R.arrow([262, 104, 262, 116], { ink: 'B', w: 0.9, hs: 2.4 });
    R.text('one strand joins a', 262, 124, 3.4, { al: 'c' }); R.text('protein complex', 262, 130, 3.4, { al: 'c' });
    R.stroke([226, 150, 242, 146, 258, 156, 272, 146, 288, 152], { ink: 'T', w: 1.6, smooth: true, taper: 'none' });
    R.stroke([232, 140, 252, 140, 266, 140], { ink: 'P', w: 2, taper: 'none' }); R.ellipse(248, 138, 22, 8, { ink: 'B', w: 0.8, wob: 0.2 });
    R.text('binds complementary', 262, 170, 3.4, { al: 'c' }); R.text('base sequence on mRNA', 262, 176, 3.4, { al: 'c' });
    R.arrow([262, 176, 262, 186], { ink: 'B', w: 0.9, hs: 2.4 });
    [[228, 200], [244, 204], [262, 198], [280, 204]].forEach(([x, y]) => R.stroke([x, y, x + 8, y + 6], { ink: 'T', w: 1.2, taper: 'none' }));
    R.text('mRNA cut up and degraded', 262, 222, 3.5, { al: 'c', ink: 'P' });
    R.text('no translation: protein not made', 70, 218, 3.7, { al: 'c', ink: 'P' });
    R.text('without RNAi', 70, 124, 3.9, { al: 'c', ink: 'T' });
    R.line(20, 166, 126, 166, { ink: 'T', w: 1.4, taper: 'none' }); [34, 62, 90].forEach(x => { R.ribosome(x, 160, 1.5); R.stroke([x, 156, x + 4, 146, x + 8, 134], { ink: 'P', w: 1.4, smooth: true, taper: 'start' }); });
    R.text('ribosomes translate the mRNA:', 70, 182, 3.5, { al: 'c' }); R.text('protein is made', 70, 189, 3.5, { al: 'c' });
    R.text('with RNAi: translation is inhibited', 70, 208, 3.7, { al: 'c', ink: 'P' });
    R.line(300, 14, 300, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // twin study
    R.text('evaluating genetic and environmental influences', 478, 14, 4.3, { al: 'c' });
    R.text('twin study: mean difference in a measurement', 478, 24, 3.5, { al: 'c' });
    const g = R.graph(334, 34, 130, 100, { xmin: 0, xmax: 3, ymin: 0, ymax: 10, yl: 'mean difference', yt: [[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10']], fs: 3.3, ylx: 10 }).axes();
    [[0.2, 1.5, 'T', 'identical twins'], [1.1, 4.5, 'Y', 'non-identical'], [2.0, 8.2, 'P', 'unrelated']].forEach(([x, v, ink, nm]) => { R.rect(g.X(x), g.Y(v), 28, g.Y(0) - g.Y(v), { ink: 'B', w: 0.8, fi: ink, ft: 0.3 }); g.err(x + 0.3, v, 0.7); wrapText(nm, 36, 3.3).forEach((ln, k) => R.text(ln, g.X(x) + 14, g.Y(0) + 8 + k * 5.4, 3.3, { al: 'c' })); });
    R.text('illustrative data', 400, 164, 3.3, { al: 'c' });
    ['identical twins share all their genes: a', 'small difference suggests genes matter', 'but the difference is not zero, so the', 'environment also has an effect', '', 'larger samples (more pairs) give more', 'valid conclusions'].forEach((t, i) => { if (t) R.text(t, 478, 36 + i * 9, 3.7, { al: 'l', ink: i >= 5 ? 'T' : 'B' }); });
    R.text('', 0, 0, 0.01);
    R.text('genotype + environment = phenotype', 478, 214, 4.1, { al: 'c', ink: 'P' });
    R.text('interpret and evaluate data: compare groups,', 478, 225, 3.4, { al: 'c' });
    R.text('look for error bars and sample size', 478, 232, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(140 + p * 140, 54 - Math.sin(p * 9) * 3, 1.6, 'T', 0.9, 1); },
});
