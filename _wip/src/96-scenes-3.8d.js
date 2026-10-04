/* ===================== 3.8.3 Genome projects; 3.8.4 Gene technologies ===================== */
/* ---------- 3.8.3 Using genome projects ---------- */
S({
  id: '3.8.3', num: '3.8.3', sub: 'Genome projects, the proteome and automated sequencing', title: 'Using genome projects', topic: '3.8', slot: [0, 5], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.8.3.s1', '3.8.3.s2', '3.8.3.s3', '3.8.3.s4'],
  card: {
    text: 'Sequencing projects have read the <b>genomes</b> of a wide range of organisms, including humans. In <b>simpler organisms</b> (for example bacteria) determining the genome allows the sequences of the proteins coded for (the <b>proteome</b>) to be determined, because most of the DNA is coding. This has many applications, including identifying <b>potential antigens</b> for use in <b>vaccine production</b>. In <b>more complex organisms</b>, the presence of <b>non-coding DNA</b> and of <b>regulatory genes</b> means knowledge of the genome cannot easily be translated into the proteome. Sequencing methods are continuously updated and have become <b>automated</b>, so whole genomes can be read quickly and cheaply.',
    terms: ['genome', 'proteome', 'sequencing', 'non-coding DNA', 'regulatory gene', 'antigen', 'vaccine', 'automated sequencing'],
    skill: 'AO2: explain why genome does not equal proteome in complex organisms', eq: null,
    q: 'Why can the proteome of a bacterium be worked out from its genome more easily than that of a human?', a: 'A bacterium has little non-coding DNA and few regulatory genes, so most of the sequence codes for proteins; a human genome contains lots of non-coding DNA and regulatory genes, so the coding regions are hard to find.'
  },
  draw(R, sc) {
    R.text('genome and proteome', 112, 14, 4.4, { al: 'c' });
    R.text('genome: all the DNA of an organism', 112, 26, 3.8, { al: 'c', ink: 'T' }); R.text('proteome: all the proteins it can make', 112, 34, 3.8, { al: 'c', ink: 'P' });
    // simple organism
    R.text('simpler organism, e.g. a bacterium', 112, 52, 3.9, { al: 'c' });
    R.rect(14, 60, 196, 12, { ink: 'B', w: 0.9, fi: 'T', ft: 0.12 }); [[20, 60], [70, 40], [128, 52]].forEach(([x, w], i) => R.rect(x, 60, w, 12, { ink: 'B', w: 0.7, fi: 'P', ft: 0.4 })); R.rect(190, 60, 20, 12, { ink: 'B', w: 0.7, fi: 'P', ft: 0.4 });
    R.text('mostly coding genes', 112, 84, 3.5, { al: 'c' }); R.arrow([112, 88, 112, 100], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('proteome can be worked out', 112, 110, 3.7, { al: 'c', ink: 'P' });
    R.line(10, 120, 214, 120, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('more complex organism, e.g. a human', 112, 132, 3.9, { al: 'c' });
    R.rect(14, 140, 196, 12, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.1 }); [[34, 14], [88, 10], [150, 20]].forEach(([x, w]) => R.rect(x, 140, w, 12, { ink: 'B', w: 0.7, fi: 'P', ft: 0.4 })); [[60, 12], [112, 16], [176, 14]].forEach(([x, w]) => R.rect(x, 140, w, 12, { ink: 'B', w: 0.7, fi: 'T', ft: 0.35 }));
    R.rect(14, 160, 10, 6, { ink: 'B', w: 0.6, fi: 'P', ft: 0.4 }); R.text('coding', 28, 165.4, 3.2, { al: 'l' }); R.rect(66, 160, 10, 6, { ink: 'B', w: 0.6, fi: 'T', ft: 0.35 }); R.text('regulatory', 80, 165.4, 3.2, { al: 'l' }); R.rect(126, 160, 10, 6, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.1 }); R.text('non-coding', 140, 165.4, 3.2, { al: 'l' });
    R.text('lots of non-coding DNA and regulatory genes', 112, 180, 3.6, { al: 'c' });
    R.arrow([112, 184, 112, 196], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('genome cannot easily be', 112, 206, 3.7, { al: 'c', ink: 'P' }); R.text('translated into the proteome', 112, 213, 3.7, { al: 'c', ink: 'P' });
    R.line(222, 14, 222, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // applications
    R.text('applications of genome sequences', 332, 14, 4.3, { al: 'c' });
    R.rrect(236, 24, 190, 62, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.07, wob: 0.3 });
    R.text('identify antigens for vaccines', 331, 38, 4, { al: 'c', ink: 'P' });
    R.bacterium(268, 62, 34, 14, 0, { ag: ['tri', 'sq', 'circ', 'trap'] });
    ['sequence the pathogen’s genome', 'work out its proteins (proteome)', 'choose antigens to make a vaccine'].forEach((t, i) => R.text(t, 296, 56 + i * 8, 3.4, { al: 'l' }));
    ['compare genomes of different species', '(relationships, evolution)', 'find genes linked to disease alleles', 'personalised medicine and screening'].forEach((t, i) => { R.circle(244, 104 + i * 14, 2.4, { ink: 'B', w: 0.7, fi: 'T', ft: 0.7 }); R.text(t, 252, 105.4 + i * 14, 3.7, { al: 'l' }); });
    R.text('and many other uses', 331, 168, 3.6, { al: 'c' });
    R.line(436, 14, 436, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // sequencing methods
    R.text('sequencing methods are updated and automated', 546, 14, 4.1, { al: 'c' });
    const g = R.graph(468, 34, 150, 100, { xmin: 0, xmax: 30, ymin: 0, ymax: 10, xl: 'time', yl: 'cost per genome (log scale)', xt: [[0, 'first'], [30, 'now']], yt: [], fs: 3.4, xly: 11, ylx: 6 }).axes();
    g.curve(x => 9.2 * Math.exp(-0.28 * x) + 0.6, { ink: 'P', w: 1.7 });
    R.text('very high', g.X(2), g.Y(9.4), 3.4, { al: 'l' }); R.text('much lower', g.X(30), g.Y(1.3), 3.4, { al: 'r' });
    ['early methods: slow, expensive, small scale', 'now: automated, cost-effective, large scale', '', 'whole genomes can be read quickly'].forEach((t, i) => { if (t) R.text(t, 546, 160 + i * 8.6, 3.8, { al: 'c', ink: i == 3 ? 'P' : 'B' }); });
    R.helix(466, 216, 626, 216, { amp: 5, turns: 6, w: 0.8 });
    R.text('illustrative trend', 546, 230, 3.3, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(14 + p * 196, 66, 1.8, 'P', 0.9, 1); A.dot(14 + p * 196, 146, 1.8, 'T', 0.9, 2); },
});

/* ---------- 3.8.4.1a Producing DNA fragments ---------- */
S({
  id: '3.8.4.1a', num: '3.8.4.1', sub: 'Recombinant DNA: making fragments with reverse transcriptase, restriction enzymes and a gene machine', title: 'Recombinant DNA technology', topic: '3.8', slot: [2, 5], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.8.4.1.s1', '3.8.4.1.s2', '3.8.4.1.s3', '3.8.4.1.s4'],
  card: {
    text: '<b>Recombinant DNA technology</b> transfers fragments of DNA from one organism or species to another. Because the genetic code is <b>universal</b> (and transcription and translation mechanisms are similar), the transferred DNA can be translated in cells of the recipient (<b>transgenic</b>) organism. Fragments can be produced by: (1) converting <b>mRNA</b> to <b>complementary DNA (cDNA)</b> using <b>reverse transcriptase</b> (the cell that makes the protein contains many copies of the mRNA); (2) using <b>restriction enzymes</b> that cut DNA at specific recognition sequences, often leaving <b>sticky ends</b>, to cut out the fragment containing the desired gene; (3) creating the gene in a <b>gene machine</b> from the known base sequence.',
    terms: ['recombinant DNA', 'universal genetic code', 'transgenic', 'reverse transcriptase', 'cDNA', 'restriction enzyme', 'recognition sequence', 'sticky ends', 'gene machine'],
    skill: 'AO1: describe three ways of making a DNA fragment', eq: null,
    q: 'Why is the gene for insulin easier to get as mRNA than as DNA from a pancreatic cell?', a: 'Each cell has only two copies of the gene but makes many copies of the mRNA in cells that produce insulin; reverse transcriptase turns mRNA into cDNA.'
  },
  draw(R, sc) {
    const col = (x, ttl) => R.text(ttl, x, 14, 4.2, { al: 'c', ink: 'P' });
    // 1 cDNA
    col(110, '1  reverse transcriptase');
    R.text('cell that makes the protein: many mRNA copies', 110, 26, 3.4, { al: 'c' });
    for (let k = 0; k < 3; k++) R.stroke([20, 40 + k * 8, 40, 36 + k * 8, 60, 42 + k * 8, 80, 38 + k * 8, 100, 42 + k * 8], { ink: 'T', w: 1.4, smooth: true, taper: 'none' });
    R.text('mRNA', 108, 54, 3.5, { al: 'l', ink: 'T' });
    R.arrow([60, 66, 60, 80], { ink: 'B', w: 1, hs: 2.6 }); R.text('reverse transcriptase', 66, 76, 3.3, { al: 'l', ink: 'P' });
    R.stroke([20, 88, 40, 84, 60, 90, 80, 86, 100, 90], { ink: 'T', w: 1.4, smooth: true, taper: 'none' }); R.stroke([20, 94, 40, 90, 60, 96, 80, 92, 100, 96], { ink: 'P', w: 1.4, smooth: true, taper: 'none' });
    R.text('cDNA (complementary DNA)', 110, 108, 3.5, { al: 'c', ink: 'P' }); R.text('single-stranded copy of the gene', 110, 115, 3.3, { al: 'c' });
    R.text('free DNA nucleotides used', 110, 127, 3.3, { al: 'c' });
    R.line(220, 14, 220, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // 2 restriction enzyme
    col(330, '2  restriction enzyme');
    R.text('GAATTC is a recognition sequence', 330, 26, 3.4, { al: 'c' });
    const dna = (x, y, seq1, seq2) => { baseRow(R, x, y, seq1, { cw: 9, h: 10, size: 4.2 }); baseRow(R, x, y + 11, seq2, { cw: 9, h: 10, size: 4.2 }); };
    dna(232, 36, 'CGAATTCGATGGAGAATTCGA', 'GCTTAAGCTACCTCTTAAGCT');
    R.rect(241, 33, 60, 27, { ink: 'P', w: 1, wob: 0.15 }); R.rect(331, 33, 60, 27, { ink: 'P', w: 1, wob: 0.15 });
    R.text('recognition sequences', 330, 74, 3.4, { al: 'c', ink: 'P' });
    R.arrow([330, 78, 330, 90], { ink: 'B', w: 1, hs: 2.6 }); R.text('enzyme cuts both (hydrolysis)', 330, 98, 3.4, { al: 'c' });
    baseRow(R, 250, 108, 'AATTCGATGGAG', { cw: 9, h: 10, size: 4.2 }); baseRow(R, 241, 119, 'GCTACCTCTTAA', { cw: 9, h: 10, size: 4.2 });
    R.text('sticky ends: unpaired bases', 330, 146, 3.5, { al: 'c', ink: 'P' }); R.text('can join to complementary sticky ends', 330, 153, 3.4, { al: 'c' });
    R.text('the fragment contains the wanted gene', 330, 166, 3.5, { al: 'c' });
    R.line(440, 14, 440, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // 3 gene machine
    col(546, '3  gene machine');
    R.rrect(470, 28, 76, 50, 5, { ink: 'B', w: 1.1, fi: 'B', ft: 0.08, wob: 0.3 }); R.text('gene machine', 508, 50, 3.6, { al: 'c' }); R.rect(480, 58, 56, 12, { ink: 'B', w: 0.7, fi: 'T', ft: 0.3 }); R.text('A T G C …', 508, 66, 3.5, { al: 'c' });
    R.text('sequence typed in', 508, 88, 3.3, { al: 'c' });
    R.arrow([548, 52, 566, 52], { ink: 'B', w: 1, hs: 2.6 });
    R.helix(574, 52, 640, 52, { amp: 6, turns: 3, w: 0.9 }); R.text('synthetic gene', 607, 72, 3.5, { al: 'c', ink: 'P' });
    ['made from the known base sequence of', 'the wanted gene (or protein)', 'no mRNA or original DNA needed', 'can leave out introns'].forEach((t, i) => R.text(t, 546, 108 + i * 8.5, 3.6, { al: 'c' }));
    R.line(446, 158, 650, 158, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('universal genetic code', 546, 170, 4, { al: 'c', ink: 'P' });
    ['the same triplets code for the same amino', 'acids in all organisms, so DNA from one', 'species can be translated in another: a', 'transgenic organism'].forEach((t, i) => R.text(t, 546, 182 + i * 8, 3.6, { al: 'c' }));
    R.line(8, 176, 214, 176, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['recombinant DNA technology:', 'transfer of DNA fragments', 'from one organism or species to another'].forEach((t, i) => R.text(t, 110, 192 + i * 8.5, 3.7, { al: 'c', ink: i == 0 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(5); A.dot(20 + p * 80, 88 + Math.sin(p * 10) * 2, 1.7, 'P', 0.9, 1); A.dot(548 + p * 18, 52, 1.7, 'P', 0.9, 2); },
});

/* ---------- 3.8.4.1b Amplifying DNA in vitro: PCR ---------- */
S({
  id: '3.8.4.1b', num: '3.8.4.1', sub: 'In vitro amplification: the polymerase chain reaction (PCR)', title: 'Recombinant DNA technology', topic: '3.8', slot: [0, 6], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.8.4.1.s5', '3.8.4.1.s6'],
  card: {
    text: 'Fragments of DNA can be amplified by <b>in vitro</b> and <b>in vivo</b> techniques. The <b>polymerase chain reaction (PCR)</b> is an in vitro method. The reaction mixture contains the DNA fragment, <b>DNA polymerase</b> (a heat-stable enzyme), <b>primers</b> (short single strands that bind to the ends of the target), and free <b>nucleotides</b>. Each cycle: (1) heat to about <b>95 °C</b>: hydrogen bonds break and the strands separate; (2) cool to about <b>50–60 °C</b>: primers anneal (bind by complementary base pairing); (3) heat to about <b>72 °C</b>: DNA polymerase adds nucleotides to the primers, building new strands. The number of copies doubles each cycle, so after n cycles there are 2ⁿ copies of the starting fragment.',
    terms: ['PCR', 'in vitro', 'primer', 'DNA polymerase', 'denature', 'anneal', 'hydrogen bonds', 'nucleotides', 'cycle'],
    skill: 'MS 0.? / MS 2.5: exponential growth, 2ⁿ copies', eq: MATH(mt('copies '), mo('='), msup(mn(2), mi('n')), mo('×'), mt('starting copies')),
    q: 'One DNA fragment is amplified for 5 cycles of PCR. How many copies are there?', a: '2⁵ = 32 copies.'
  },
  draw(R, sc) {
    R.text('one PCR cycle', 150, 14, 4.4, { al: 'c' });
    const strand = (x0, x1, y, ink, ft = 0.5) => R.line(x0, y, x1, y, { ink, w: 1.7, taper: 'none', t: ft });
    // start
    R.text('start', 32, 28, 3.6, { al: 'c' }); strand(12, 52, 44, 'T'); strand(12, 52, 49, 'P');
    for (let k = 0; k < 7; k++) R.line(14 + k * 6, 44, 14 + k * 6, 49, { ink: 'B', w: 0.4, taper: 'none' });
    R.arrow([60, 46, 74, 46], { ink: 'B', w: 1, hs: 2.6 });
    // 95
    R.text('95 °C', 108, 28, 4, { al: 'c', ink: 'P' }); strand(82, 134, 32, 'T'); strand(82, 134, 58, 'P'); R.arrow([108, 44, 108, 40], { ink: 'P', w: 0.001, hs: 0.1 }); R.text('strands separate', 108, 70, 3.3, { al: 'c' }); R.text('(H bonds break)', 108, 76, 3.2, { al: 'c' });
    R.arrow([142, 46, 156, 46], { ink: 'B', w: 1, hs: 2.6 });
    // 55
    R.text('50–60 °C', 190, 28, 4, { al: 'c', ink: 'T' }); strand(164, 218, 32, 'T'); strand(164, 218, 58, 'P'); R.rect(166, 34, 12, 3, { ink: 'B', w: 0.5, fi: 'Y', ft: 0.9 }); R.rect(204, 53, 12, 3, { ink: 'B', w: 0.5, fi: 'Y', ft: 0.9 });
    R.text('primers anneal', 190, 70, 3.3, { al: 'c' }); R.text('(complementary bases)', 190, 76, 3.2, { al: 'c' });
    R.arrow([226, 46, 240, 46], { ink: 'B', w: 1, hs: 2.6 });
    // 72
    R.text('72 °C', 272, 28, 4, { al: 'c', ink: 'P' }); strand(246, 300, 32, 'T'); strand(246, 300, 58, 'P'); strand(248, 296, 36, 'P', 0.9); strand(250, 298, 54, 'T', 0.9);
    R.ellipse(262, 44, 8, 5, { ink: 'B', w: 0.8, fi: 'B', ft: 0.5 }); R.text('DNA polymerase', 272, 70, 3.3, { al: 'c' }); R.text('adds nucleotides', 272, 76, 3.2, { al: 'c' });
    R.line(8, 88, 316, 88, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('result: two double-stranded copies', 162, 100, 3.9, { al: 'c', ink: 'P' });
    strand(100, 148, 112, 'T'); strand(100, 148, 117, 'P'); strand(180, 228, 112, 'T'); strand(180, 228, 117, 'P');
    // doubling graph
    R.text('copies double every cycle', 162, 138, 4, { al: 'c' });
    const g = R.graph(40, 148, 120, 66, { xmin: 0, xmax: 6, ymin: 0, ymax: 64, xl: 'cycle number n', yl: 'copies', xt: [0, 1, 2, 3, 4, 5, 6], yt: [[0, '0'], [32, '32'], [64, '64']], fs: 3.3, xly: 13, ylx: 12 }).axes();
    g.curve(x => Math.pow(2, x), { ink: 'P', w: 1.6 }); g.dots([0, 1, 1, 2, 2, 4, 3, 8, 4, 16, 5, 32, 6, 64], { r: 1.4, ink: 'B' });
    R.text('after n cycles:', 236, 164, 3.9, { al: 'c' }); R.text('2^{n} copies', 236, 177, 5, { al: 'c', ink: 'P' }); R.text('e.g. n = 5: 2^{5} = 32', 236, 192, 3.9, { al: 'c' }); R.text('(from one starting fragment)', 236, 200, 3.4, { al: 'c' });
    R.text('in vitro: in a tube, not in a living cell', 162, 231, 3.5, { al: 'c', ink: 'T' });
    R.line(330, 14, 330, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // thermal cycler graph + ingredients
    R.text('temperature cycling', 488, 14, 4.3, { al: 'c' });
    const gt = R.graph(364, 30, 270, 96, { xmin: 0, xmax: 12, ymin: 20, ymax: 100, xl: 'time', yl: 'temperature / °C', xt: [], yt: [[50, '50'], [72, '72'], [95, '95']], fs: 3.4, xly: 10, ylx: 16 }).axes();
    const pts = []; for (let c = 0; c < 3; c++) { const x = c * 4; pts.push(x + 0.1, 95, x + 1.1, 95, x + 1.5, 55, x + 2.4, 55, x + 2.8, 72, x + 3.8, 72, x + 4.0, 95); }
    gt.poly(pts, { ink: 'P', w: 1.5 }); [[0.6, 95, 'denature'], [2, 55, 'anneal'], [3.3, 72, 'extend']].forEach(([x, y, t]) => R.text(t, gt.X(x), gt.Y(y) + (y === 95 ? -5 : y === 55 ? 8 : -5), 3.3, { al: 'c' }));
    R.text('three cycles shown', 488, 142, 3.3, { al: 'c' });
    R.line(340, 148, 650, 148, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('the reaction mixture contains', 488, 160, 4, { al: 'c' });
    [['DNA fragment', 'T'], ['primers', 'Y'], ['DNA polymerase', 'P'], ['free nucleotides', 'TY']].forEach(([t, ink], i) => { R.rrect(356 + (i % 2) * 150, 168 + Math.floor(i / 2) * 22, 138, 16, 4, { ink: 'B', w: 0.8, fi: ink, ft: 0.12, wob: 0.3 }); R.text(t, 425 + (i % 2) * 150, 178.4 + Math.floor(i / 2) * 22, 3.8, { al: 'c' }); });
    R.text('the DNA polymerase is heat-stable, so it is not denatured at 95 °C', 488, 220, 3.5, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(364 + p * 270, 30 + 96 - (((p * 12) % 4 < 1) ? 75 : ((p * 12) % 4 < 2.4 ? 36 : 56)) / 80 * 96 + 0, 2.2, 'P', 0.95, 1); },
});

/* ---------- 3.8.4.1c Amplifying DNA in vivo: vectors, promoter/terminator, transformation, markers ---------- */
function plasmid(R, cx, cy, r, o = {}) {
  R.circle(cx, cy, r, { ink: 'B', w: 2.2, wob: 0.15 }); R.circle(cx, cy, r, { ink: o.ink || 'T', w: 1.2, wob: 0.15 });
  (o.sites || []).forEach(a => R.line(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4), cx + Math.cos(a) * (r + 4), cy + Math.sin(a) * (r + 4), { ink: 'B', w: 0.9, taper: 'none' }));
}
S({
  id: '3.8.4.1c', num: '3.8.4.1', sub: 'In vivo amplification: vectors, ligase, transformation and marker genes', title: 'Recombinant DNA technology', topic: '3.8', slot: [2, 6], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.8.4.1.s7', '3.8.4.1.s8', '3.8.4.1.s9', '3.8.4.1.s10'],
  card: {
    text: 'In the <b>in vivo</b> method, a DNA fragment is inserted into a <b>vector</b> (for example a <b>plasmid</b>) and taken up by host cells, which are cultured so they copy it. <b>Promoter</b> and <b>terminator</b> regions are added to the fragment so that it is transcribed in the host. The same <b>restriction endonuclease</b> cuts the vector and the fragment, leaving complementary <b>sticky ends</b>; <b>DNA ligase</b> joins them (forming phosphodiester bonds) to make <b>recombinant DNA</b>. <b>Transformation</b>: host cells (for example bacteria) take up the vector. Few cells take it up, so <b>marker genes</b> (for example antibiotic resistance or fluorescence) detect which cells are transformed (<b>genetically modified</b>) so they can be selected and cultured. (You do not need to recall specific marker genes.)',
    terms: ['in vivo', 'vector', 'plasmid', 'promoter', 'terminator', 'restriction endonuclease', 'DNA ligase', 'transformation', 'marker gene', 'genetically modified', 'host cell'],
    skill: 'AO2: sequence the steps of making a genetically modified organism', eq: null,
    q: 'Why are marker genes needed after transformation?', a: 'Only a few host cells take up the vector with the new gene; the marker gene (e.g. antibiotic resistance or fluorescence) identifies the cells that have, so they can be selected.'
  },
  draw(R, sc) {
    R.text('making a transformed (genetically modified) cell', 330, 14, 4.4, { al: 'c' });
    const step = (x, n, ttl, y = 32) => { R.bubble(x + 8, y, 5.5, String(n), { ft: 0.22 }); R.text(ttl, x + 18, y + 2, 3.7, { al: 'l', ink: 'P' }); };
    // 1 fragment
    step(8, 1, 'fragment with promoter and terminator');
    R.rect(14, 46, 120, 14, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.12 }); R.rect(14, 46, 22, 14, { ink: 'B', w: 0.7, fi: 'T', ft: 0.5 }); R.text('promoter', 25, 56, 3.1, { al: 'c' }); R.rect(36, 46, 66, 14, { ink: 'B', w: 0.7, fi: 'P', ft: 0.35 }); R.text('gene', 69, 56, 3.5, { al: 'c' }); R.rect(102, 46, 32, 14, { ink: 'B', w: 0.7, fi: 'T', ft: 0.5 }); R.text('terminator', 118, 56, 3.1, { al: 'c' });
    R.text('so the host transcribes the gene', 74, 72, 3.3, { al: 'c' });
    // 2 plasmid cut
    step(150, 2, 'cut the vector (plasmid)');
    plasmid(R, 206, 70, 17, { sites: [-PI / 2 - 0.14, -PI / 2 + 0.14] }); R.text('same enzyme cuts the plasmid:', 206, 98, 3.2, { al: 'c' }); R.text('complementary sticky ends', 206, 104, 3.2, { al: 'c' });
    R.line(8, 114, 316, 114, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 3 ligase
    step(8, 3, 'DNA ligase joins them', 128);
    plasmid(R, 60, 164, 17, { ink: 'T' }); R.rect(44, 142, 32, 8, { ink: 'B', w: 0.8, fi: 'P', ft: 0.4 }); R.text('gene', 60, 148.4, 3, { al: 'c' });
    R.text('recombinant plasmid', 60, 194, 3.5, { al: 'c', ink: 'P' }); R.text('(ligase forms', 60, 201, 3.2, { al: 'c' }); R.text('phosphodiester bonds)', 60, 207, 3.2, { al: 'c' });
    // 4 transformation
    step(150, 4, 'host cells take up the vector', 128);
    R.rrect(160, 144, 54, 24, 10, { ink: 'B', w: 1.1, fi: 'T', ft: 0.12, wob: 0.3 }); plasmid(R, 180, 156, 7, { ink: 'P' }); R.circle(168, 150, 2, { ink: 'P', w: 0.5, fi: 'P', ft: 0.9 });
    R.arrow([220, 156, 234, 156], { ink: 'B', w: 1, hs: 2.4 }); R.rrect(240, 144, 54, 24, 10, { ink: 'B', w: 1.1, fi: 'T', ft: 0.12, wob: 0.3 }); R.rrect(240, 174, 54, 24, 10, { ink: 'B', w: 1.1, fi: 'T', ft: 0.12, wob: 0.3 }); plasmid(R, 266, 156, 7, { ink: 'P' });
    R.text('transformation: few cells', 232, 210, 3.3, { al: 'c' }); R.text('take up the vector', 232, 217, 3.3, { al: 'c' });
    R.text('5  culture transformed cells: many copies of the gene', 162, 229, 3.7, { al: 'c', ink: 'T' });
    R.line(322, 14, 322, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // marker genes
    R.text('marker genes find the transformed cells', 490, 28, 4.3, { al: 'c' });
    R.circle(404, 86, 46, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.07, wob: 0.5 });
    for (let k = 0; k < 28; k++) { const h = Math.sin(k * 71.3) * 4375.85, a = (h - Math.floor(h)) * TAU, h2 = Math.sin(k * 29.1) * 9871.3, rr = Math.sqrt(h2 - Math.floor(h2)) * 38, tr = [3, 9, 15, 21].includes(k); R.circle(404 + Math.cos(a) * rr, 86 + Math.sin(a) * rr, 2.6, { ink: 'B', w: 0.5, fi: tr ? 'P' : 'T', ft: tr ? 0.9 : 0.25 }); }
    R.text('culture: only a few cells', 404, 142, 3.4, { al: 'c' }); R.text('are transformed (pink)', 404, 149, 3.4, { al: 'c' });
    R.text('plate of cells', 404, 40, 3.3, { al: 'c' });
    R.arrow([456, 86, 472, 86], { ink: 'B', w: 1, hs: 2.4 });
    ['the marker gene (e.g. antibiotic', 'resistance, or a gene for a fluorescent', 'protein) is on the same vector,', 'so transformed cells show it', 'and can be selected'].forEach((t, i) => R.text(t, 480, 72 + i * 9, 3.6, { al: 'l', ink: i === 4 ? 'P' : 'B' }));
    R.line(332, 158, 650, 158, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('in vivo and in vitro compared', 490, 170, 4.1, { al: 'c' });
    R.table(342, 176, [66, 120, 120], 12, [['', 'in vitro (PCR)', 'in vivo (cloning)'], ['where', 'in a tube', 'inside living cells'], ['needs', 'primers, polymerase', 'vector, ligase, host'], ['speed', 'fast', 'slower']], { size: 3.4, hink: 'Y' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(226 + p * 14, 142, 2.2, 'P', 0.9, 1); },
});

/* ---------- 3.8.4.1d Uses of recombinant DNA technology; gene therapy; the debate ---------- */
S({
  id: '3.8.4.1d', num: '3.8.4.1', sub: 'Applications, gene therapy and the ethical, financial and social issues', title: 'Recombinant DNA technology', topic: '3.8', slot: [0, 7], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.8.4.1.s11', '3.8.4.1.s12', '3.8.4.1.s13', '3.8.4.1.s14'],
  card: {
    text: 'Genetically modified (transgenic) organisms are used in <b>agriculture</b> (crops with higher yield, extra nutrients, or resistance to pests or herbicides), in <b>industry</b> (microorganisms making enzymes) and in <b>medicine</b> (bacteria making human proteins such as insulin; <b>gene therapy</b>). In <b>gene therapy</b> a working copy of an allele is delivered into a patient’s cells using a <b>vector</b> (for example a modified virus) to treat a genetic disorder; this is recombinant DNA technology applied to people. You should be able to <b>evaluate the ethical, financial and social issues</b> of use and <b>ownership</b> (patents, cost, access) in agriculture, industry and medicine, and <b>balance</b> the <b>humanitarian</b> benefits (feeding people, treating disease) against opposition from <b>environmentalists</b> (effects on biodiversity, gene transfer to wild plants) and <b>anti-globalisation activists</b> (control by large companies, cost to poorer farmers).',
    terms: ['transgenic', 'genetically modified', 'gene therapy', 'vector', 'patent', 'ownership', 'humanitarian', 'environmentalist', 'anti-globalisation', 'biodiversity', 'ethical issue'],
    skill: 'AO3: balance benefits against concerns in an extended answer', eq: null,
    q: 'Give one argument for and one against the use of a genetically modified crop.', a: 'For: higher yield or added nutrients can reduce hunger. Against: possible effects on biodiversity, spread of genes to wild plants, and ownership by large companies making seed costly for farmers.'
  },
  draw(R, sc) {
    R.text('what GM organisms are used for', 118, 14, 4.3, { al: 'c' });
    [['agriculture', 'Y', ['crops with higher yield, extra', 'nutrients, or pest resistance']], ['industry', 'T', ['microorganisms make enzymes', 'in large quantities, cheaply']], ['medicine', 'P', ['bacteria make human proteins', '(e.g. insulin); gene therapy']]].forEach(([t, ink, ls], i) => { const y = 24 + i * 48; R.rrect(10, y, 216, 42, 5, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(t, 118, y + 12, 4.3, { al: 'c', ink: 'P' }); ls.forEach((l, k) => R.text(l, 118, y + 23 + k * 7.6, 3.7, { al: 'c' })); });
    R.line(10, 174, 226, 174, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('gene therapy', 118, 186, 4.2, { al: 'c', ink: 'P' });
    R.circle(30, 208, 12, { ink: 'B', w: 1, fi: 'P', ft: 0.2 }); R.circle(30, 208, 5, { ink: 'B', w: 0.7, fi: 'B', ft: 0.5 }); R.text('patient cell', 30, 228, 3.1, { al: 'c' }); R.text('faulty allele', 30, 233, 3.1, { al: 'c' });
    R.arrow([46, 208, 82, 208], { ink: 'P', w: 1.2, hs: 3 }); R.circle(96, 208, 8, { ink: 'B', w: 1, fi: 'Y', ft: 0.2 }); R.rect(90, 206, 12, 4, { ink: 'B', w: 0.5, fi: 'P', ft: 0.9 }); R.text('vector carrying', 116, 205, 3.2, { al: 'l' }); R.text('working allele', 116, 211, 3.2, { al: 'l' });
    R.text('gene therapy: a working allele is delivered', 118, 223, 3.4, { al: 'c' }); R.text('into the patient’s cells', 118, 230, 3.4, { al: 'c' });
    R.line(234, 14, 234, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // debate
    R.text('balancing the benefits and the concerns', 442, 14, 4.3, { al: 'c' });
    R.line(442, 40, 442, 128, { ink: 'B', w: 1.6, taper: 'none' }); R.line(354, 48, 530, 48, { ink: 'B', w: 1.6, taper: 'none' });
    [[354, 'T'], [530, 'P']].forEach(([x, ink]) => { R.line(x, 48, x - 12, 70, { ink: 'B', w: 0.7, taper: 'none' }); R.line(x, 48, x + 12, 70, { ink: 'B', w: 0.7, taper: 'none' }); R.ellipse(x, 71, 22, 4.4, { ink: 'B', w: 0.9, fi: ink, ft: 0.35 }); });
    R.rect(410, 128, 64, 7, { ink: 'B', w: 0.8, fi: 'B', ft: 0.2 });
    R.text('humanitarian benefits', 354, 38, 3.8, { al: 'c', ink: 'T' }); R.text('opposing views', 530, 38, 3.8, { al: 'c', ink: 'P' });
    ['feed more people', 'more nutritious food', 'cheaper medicines', 'treat genetic disease'].forEach((t, i) => R.text(t, 354, 86 + i * 9, 3.6, { al: 'c' }));
    ['environmentalists: effects on', 'biodiversity, gene spread', 'anti-globalisation: control by', 'large companies, costs to farmers'].forEach((t, i) => R.text(t, 530, 86 + i * 9, 3.4, { al: 'c' }));
    R.line(240, 144, 650, 144, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('issues to evaluate', 442, 156, 4.1, { al: 'c' });
    [['ethical', 'is it right to alter organisms, or', 'to use genes from other species?', 'T'], ['financial', 'cost of development; patents and', 'who owns the technology', 'Y'], ['social', 'access and fairness; effect on', 'farmers and local communities', 'P']].forEach(([h, a, b, ink], i) => { const x = 246 + i * 136; R.rrect(x, 160, 130, 58, 5, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(h, x + 65, 174, 4, { al: 'c', ink: 'P' }); R.text(a, x + 65, 188, 3.4, { al: 'c' }); R.text(b, x + 65, 195, 3.4, { al: 'c' }); });
    R.text('including use and ownership of the technology', 442, 230, 3.6, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(46 + p * 36, 208, 2, 'P', 0.9, 1); },
});

/* ---------- 3.8.4.2 DNA probes and screening ---------- */
S({
  id: '3.8.4.2', num: '3.8.4.2', sub: 'Labelled DNA probes, hybridisation and screening', title: 'Differences in DNA between individuals can be exploited for identification and diagnosis of heritable conditions', topic: '3.8', slot: [2, 7], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.8.4.2.s1', '3.8.4.2.s2', '3.8.4.2.s3', '3.8.4.2.s4'],
  card: {
    text: 'A <b>DNA probe</b> is a short single-stranded piece of DNA with a base sequence <b>complementary</b> to part of a target allele and a <b>label</b> (radioactive or fluorescent) so it can be detected. DNA is cut into fragments with restriction enzymes, separated by <b>gel electrophoresis</b>, made single-stranded and transferred to a membrane; the probe is added and <b>hybridises</b> (binds by complementary base pairing) only to the fragment containing the target allele, which then shows up (X-ray film or UV light). A <b>DNA microarray</b> carries thousands of different probes to screen for many alleles at once. Labelled probes can screen patients for <b>heritable conditions</b>, <b>drug responses</b> and <b>health risks</b>; the information is used in <b>genetic counselling</b> and <b>personalised medicine</b>. You should be able to <b>evaluate</b> information about screening (accuracy, anxiety, insurance, privacy, cost, treatment available).',
    terms: ['DNA probe', 'hybridisation', 'label', 'fluorescent', 'gel electrophoresis', 'microarray', 'heritable condition', 'genetic counselling', 'personalised medicine', 'screening'],
    skill: 'AO3: evaluate information about screening individuals', eq: null,
    q: 'Why does a DNA probe bind only to its target allele?', a: 'The probe has a base sequence complementary to part of that allele, so it can only form hydrogen bonds (hybridise) with the matching sequence.'
  },
  draw(R, sc) {
    R.text('how a labelled DNA probe finds an allele', 330, 14, 4.4, { al: 'c' });
    // probe and target
    R.text('target allele (single-stranded)', 100, 28, 3.6, { al: 'c' });
    baseRow(R, 26, 32, 'TAGCATGACGCAA', { cw: 10, h: 10, size: 4.6 });
    R.text('DNA probe', 160, 62, 3.6, { al: 'l', ink: 'P' }); R.text('(complementary to the allele)', 160, 69, 3.3, { al: 'l', ink: 'P' });
    baseRow(R, 66, 76, 'CGTACTGC', { cw: 10, h: 10, size: 4.6 });
    R.circle(60, 81, 4.4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.9 }); R.text('label', 60, 95, 3.2, { al: 'c' });
    for (let k = 0; k < 8; k++) R.line(66 + k * 10 + 4.6, 43, 66 + k * 10 + 4.6, 76, { ink: 'B', w: 0.3, t: 0.5, taper: 'none' });
    R.text('the probe hybridises with the matching sequence', 140, 108, 3.5, { al: 'c' });
    R.line(10, 116, 322, 116, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // steps
    const st = [['1', 'cut DNA into fragments with restriction enzymes'], ['2', 'separate by gel electrophoresis'], ['3', 'transfer to a membrane, add the labelled probe'], ['4', 'wash; detect the label (UV light or X-ray film)']];
    st.forEach(([n, t], i) => { R.bubble(20, 132 + i * 20, 5, n, { ft: 0.22 }); R.text(t, 32, 134 + i * 20, 3.8, { al: 'l' }); });
    R.text('only the fragment with the target allele', 166, 218, 3.7, { al: 'c', ink: 'P' }); R.text('shows a band', 166, 226, 3.7, { al: 'c', ink: 'P' });
    R.line(330, 14, 330, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // gel and membrane
    R.rect(346, 32, 130, 90, { ink: 'B', w: 1, fi: 'T', ft: 0.1, wob: 0.2 }); R.text('membrane under UV light', 411, 28, 3.5, { al: 'c' });
    [0, 1, 2].forEach(c => { const x = 366 + c * 40; R.rect(x - 8, 40, 16, 5, { ink: 'B', w: 0.6, fi: 'B', ft: 0.2 }); [[60, 6], [80, 8], [100, 6]].forEach(([y, h], k) => R.rect(x - 8, y, 16, 3, { ink: 'B', w: 0.5, fi: (c === 1 && k === 1) || (c === 2 && k === 1) ? 'Y' : 'B', ft: (c === 1 && k === 1) || (c === 2 && k === 1) ? 0.95 : 0.12 })); });
    R.text('1', 366, 132, 3.6, { al: 'c' }); R.text('2', 406, 132, 3.6, { al: 'c' }); R.text('3', 446, 132, 3.6, { al: 'c' });
    R.text('persons 1–3: persons 2 and 3 have the allele', 411, 144, 3.5, { al: 'c' });
    R.text('fluorescent band = allele present', 411, 152, 3.5, { al: 'c', ink: 'P' });
    // microarray
    R.text('DNA microarray', 570, 28, 3.9, { al: 'c' });
    R.rect(498, 34, 144, 88, { ink: 'B', w: 1, fi: 'Y', ft: 0.05, wob: 0.2 });
    for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) { const lit = (r * 9 + c) % 7 === 2 || (r * 3 + c) % 11 === 5; R.circle(508 + c * 15.5, 44 + r * 13.6, 3.2, { ink: 'B', w: 0.5, fi: lit ? 'P' : 'B', ft: lit ? 0.9 : 0.12 }); }
    R.text('thousands of probes: many alleles', 570, 132, 3.5, { al: 'c' }); R.text('screened at once', 570, 140, 3.5, { al: 'c' });
    R.line(340, 164, 650, 164, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('uses of screening', 495, 176, 4.1, { al: 'c' });
    [['heritable conditions', 'T'], ['drug responses', 'Y'], ['health risks', 'P']].forEach(([t, ink], i) => { R.rrect(346 + i * 104, 184, 98, 18, 4, { ink: 'B', w: 0.8, fi: ink, ft: ink === 'T' ? 0.05 : 0.1, wob: 0.3 }); R.text(t, 395 + i * 104, 195.6, 3.6, { al: 'c' }); });
    R.text('used in genetic counselling and personalised medicine', 495, 214, 3.7, { al: 'c', ink: 'P' });
    R.text('evaluate: accuracy, anxiety, privacy, cost, and treatment', 495, 225, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(66 + p * 80, 62, 1.8, 'P', 0.9, 1); },
});

/* ---------- 3.8.4.3 Genetic fingerprinting ---------- */
S({
  id: '3.8.4.3', num: '3.8.4.3', sub: 'VNTRs, PCR and gel electrophoresis: genetic fingerprinting', title: 'Genetic fingerprinting', topic: '3.8', slot: [0, 8], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.8.4.3.s1', '3.8.4.3.s2', '3.8.4.3.s3', '3.8.4.3.s4'],
  card: {
    text: 'An organism’s genome contains many <b>variable number tandem repeats (VNTRs)</b>: short sequences repeated one after another in non-coding DNA; the number of repeats differs between individuals, so the probability that two people have the same VNTRs is very low. Genetic fingerprinting: (1) extract the DNA; (2) <b>amplify</b> the regions by <b>PCR</b>; (3) cut (restriction enzymes) and separate the fragments by <b>gel electrophoresis</b>; the negatively charged DNA moves towards the <b>positive</b> electrode, <b>smaller fragments travelling further</b>; (4) the pattern of bands is the fingerprint (made visible with a labelled probe or stain). It is used to determine <b>genetic relationships</b> (a child’s bands match those of its parents) and <b>genetic variability within a population</b>, and in <b>forensic science</b>, <b>medical diagnosis</b> and <b>animal and plant breeding</b>.',
    terms: ['VNTR', 'genetic fingerprinting', 'gel electrophoresis', 'PCR', 'restriction enzyme', 'fragment size', 'forensic science', 'genetic relationship', 'plant and animal breeding'],
    skill: 'AO3: interpret data from gel electrophoresis of DNA fragments', eq: null,
    q: 'In electrophoresis of DNA, which fragments travel furthest and towards which electrode?', a: 'The smallest fragments travel furthest, towards the positive electrode (DNA is negatively charged).'
  },
  draw(R, sc) {
    R.text('variable number tandem repeats', 110, 14, 4.3, { al: 'c' });
    const vntr = (y, n, lbl) => { R.line(12, y + 6, 208, y + 6, { ink: 'B', w: 1.2, taper: 'none' }); for (let k = 0; k < n; k++) R.rect(70 + k * 12, y, 10, 12, { ink: 'B', w: 0.7, fi: ['P', 'T', 'Y'][k % 3], ft: 0.4 }); R.text(lbl, 12, y - 3, 3.5, { al: 'l', ink: 'P' }); R.text(n + ' repeats', 214, y + 9.6, 3.4, { al: 'r' }); };
    vntr(40, 3, 'person A'); vntr(66, 6, 'person B'); vntr(92, 4, 'person C');
    R.text('short sequence repeated; the number of', 110, 124, 3.6, { al: 'c' }); R.text('repeats differs between people (non-coding DNA)', 110, 131, 3.6, { al: 'c' });
    R.text('probability of two people having the same VNTRs', 110, 146, 3.6, { al: 'c', ink: 'P' }); R.text('is very low', 110, 153, 3.6, { al: 'c', ink: 'P' });
    R.line(10, 164, 214, 164, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['1  extract DNA', '2  amplify VNTR regions by PCR', '3  cut with restriction enzymes', '4  separate by gel electrophoresis', '5  compare band patterns'].forEach((t, i) => R.text(t, 14, 176 + i * 11, 3.9, { al: 'l', ink: i === 4 ? 'P' : 'B' }));
    R.line(222, 14, 222, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // gel
    R.text('gel electrophoresis', 336, 14, 4.3, { al: 'c' });
    R.rect(240, 40, 190, 150, { ink: 'B', w: 1, fi: 'T', ft: 0.08, wob: 0.2 });
    R.text('negative electrode (−)', 335, 32, 3.5, { al: 'c', ink: 'P' }); R.text('positive electrode (+)', 335, 202, 3.5, { al: 'c', ink: 'T' });
    const lanes = ['size marker', 'crime scene', 'suspect 1', 'suspect 2', 'mother', 'father', 'child'];
    const bands = [[30, 48, 68, 90, 114], [60, 88, 122], [60, 88, 122], [72, 98, 114], [60, 88, 122], [72, 98, 114], [60, 98, 122]];
    lanes.forEach((nm, c) => { const x = 258 + c * 26; R.rect(x - 8, 44, 16, 5, { ink: 'B', w: 0.6, fi: 'B', ft: 0.2 }); bands[c].forEach(y => R.rect(x - 8, 50 + y, 16, 3.2, { ink: 'B', w: 0.5, fi: c === 0 ? 'B' : 'P', ft: c === 0 ? 0.5 : 0.8 })); R.text(nm.split(' ')[0], x, 210, 3, { al: 'c' }); if (nm.includes(' ')) R.text(nm.split(' ').slice(1).join(' '), x, 216, 3, { al: 'c' }); });
    R.arrow([436, 56, 436, 176], { ink: 'T', w: 1.2, hs: 3 });
    R.line(442, 14, 442, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // reading
    R.text('reading the bands', 548, 28, 4.3, { al: 'c' });
    ['DNA is negatively charged, so it', 'moves towards the positive electrode', '', 'smaller fragments move further', '', 'crime scene = suspect 1: same bands', '(suspect 2 differs: excluded)', '', 'every band of the child matches', 'its mother or its father'].forEach((t, i) => { if (t) R.text(t, 548, 44 + i * 9.8, 3.5, { al: 'c', ink: i === 3 ? 'P' : 'B' }); });
    R.line(450, 148, 650, 148, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('uses', 548, 160, 4.2, { al: 'c' });
    [['forensic science', 'Y'], ['relationships', 'T'], ['medical diagnosis', 'P'], ['plant, animal breeding', 'TY']].forEach(([t, ink], i) => { R.rrect(458 + (i % 2) * 96, 168 + Math.floor(i / 2) * 26, 92, 20, 4, { ink: 'B', w: 0.8, fi: ink, ft: ink === 'T' ? 0.05 : 0.1, wob: 0.3 }); R.text(t, 504 + (i % 2) * 96, 181 + Math.floor(i / 2) * 26, 3.4, { al: 'c' }); });
    R.text('also shows genetic variability in a population', 548, 228, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let c = 1; c < 6; c++) A.dot(258 + c * 29, 52 + p * 90, 0.0, 'P', 0, c); A.dot(258 + 2 * 29, 44 + 62 + p * 3, 1.2, 'P', 0.9, 7); A.dot(436, 56 + p * 120, 2, 'T', 0.9, 8); },
});
