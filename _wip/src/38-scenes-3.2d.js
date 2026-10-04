/* ===================== 3.2.4 Cell recognition and the immune system ===================== */
/* cell (or virus) with antigens spaced around its edge; shapes cycle through the list */
function agCell(R, x, y, r, shapes, o = {}) {
  if (o.virus) { R.circle(x, y, r, { ink: 'B', w: 1.2, fi: o.fi || 'TY', ft: o.ft === undefined ? 0.35 : o.ft, wob: 0.15 }); R.scatter(x, y, r * 0.5, r * 0.5, 4, 0.7, { ink: 'B' }); }
  else { R.circle(x, y, r, { ink: 'B', w: 1.3, fi: o.fi || 'P', ft: o.ft === undefined ? 0.16 : o.ft, wob: 0.3 }); if (o.nucleus !== false) R.circle(x + r * 0.06, y, r * 0.42, { ink: 'B', w: 0.9, fi: 'B', ft: 0.3, wob: 0.2 }); }
  const n = o.n || Math.round(r * 0.7);
  for (let i = 0; i < n; i++) { const a = o.a0 + i * TAU / n || i * TAU / n; if (o.skip && o.skip(a)) continue; R.antigen(x + Math.cos(a) * r, y + Math.sin(a) * r, a, shapes[i % shapes.length], { n: o.an || 2, d: o.ad || 2.4, len: o.len === undefined ? 1.6 : o.len }); }
}

/* ---------- 3.2.4a Cell recognition, antigens and antigen variability ---------- */
S({
  id: '3.2.4a', num: '3.2.4', sub: 'Cell recognition: antigens and antigen variability', title: 'Cell recognition and the immune system', topic: '3.2', slot: [3, 4], dna: 'mark', ao: 1,
  covers: ['3.2.4.s1', '3.2.4.s2'],
  card: {
    text: 'Each type of cell has specific molecules on its surface that identify it. These molecules include <b>proteins</b>, and they let the immune system identify <b>pathogens</b>, <b>cells from other organisms of the same species</b> (e.g. transplants), <b>abnormal body cells</b> (e.g. cancer cells) and <b>toxins</b>. An <b>antigen</b> is a molecule (usually a protein) that triggers an immune response. <b>Antigen variability</b> (e.g. in influenza or HIV) means antibodies and vaccines for one strain may not work against another, so disease prevention is harder.',
    terms: ['antigen', 'pathogen', 'toxin', 'abnormal body cell', 'transplant', 'antigen variability', 'mutation', 'immune response'],
    skill: 'Specificity', eq: null,
    q: 'Why might a vaccine against one strain of influenza not protect you against another?', a: 'The surface antigens of the new strain are different (variability due to mutation), so memory cells and antibodies for the first do not recognise the second.'
  },
  draw(R, sc) {
    R.text('antigens identify cells and molecules', 160, 14, 5.6, { al: 'c' });
    const px = [42, 116, 196, 272], cy = 62;
    // 1 pathogen
    R.bacterium(px[0] - 2, cy, 44, 20, -20, { ag: ['tri', 'tri', 'tri', 'tri', 'tri'], flag: true, an: 2.2, ad: 2.8 });
    // 2 cell from another organism of the same species: foreign antigens next to a body cell
    agCell(R, px[1] - 15, cy - 4, 15, ['sq'], { n: 9, an: 1.7, ad: 2.2, len: 1 }); agCell(R, px[1] + 21, cy + 2, 14, ['trap'], { n: 9, an: 1.7, ad: 2.2, len: 1 });
    R.text('own', px[1] - 15, cy + 22, 3.8, { al: 'c' }); R.text('other', px[1] + 21, cy + 22, 3.8, { al: 'c' });
    // 3 abnormal body cell
    agCell(R, px[2], cy, 21, ['sq', 'sq', 'circ', 'sq', 'sq', 'tri'], { n: 13, an: 2, ad: 2.5, len: 1.2 });
    // 4 toxin molecules
    [[0, -14, 0.3], [-17, 4, -0.5], [12, 17, 0.9], [20, -4, -0.2], [-6, 24, 0.5]].forEach(([dx, dy, r]) => {
      R.push(px[3] + dx, cy + dy, r, 1.25); R.circle(0, 0, 3.4, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5 }); R.antigen(0, -3.4, -PI / 2, 'circ', { n: 1.8, d: 2, len: 0.6 }); R.pop(); });
    [['pathogen', px[0]], ['abnormal body cell', px[2]], ['toxin', px[3]]].forEach(([t, x]) => R.text(t, x, 100, 4.6, { al: 'c' }));
    R.text('(infected or cancerous)', px[2], 106.5, 3.9, { al: 'c' });
    R.text('cell from another', px[1], 100, 4.6, { al: 'c' }); R.text('organism of the same', px[1], 106.5, 3.9, { al: 'c' }); R.text('species, e.g. a transplant', px[1], 112.5, 3.9, { al: 'c' });
    R.line(8, 120, 312, 120, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // antigen definition with key
    R.antigen(26, 140, -PI / 2, 'tri', { n: 3, d: 3.6, len: 2.6 }); R.antigen(38, 140, -PI / 2, 'sq', { n: 3, d: 3.6, len: 2.6 }); R.antigen(50, 140, -PI / 2, 'circ', { n: 3, d: 3.6, len: 2.6 });
    R.text('antigen: a molecule (usually a protein)', 66, 136, 4.8, { al: 'l' }); R.text('that triggers an immune response', 66, 143.5, 4.8, { al: 'l' });
    R.line(8, 152, 312, 152, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // antigen variability
    R.text('antigen variability: a new strain has different antigens,', 160, 162, 4.6, { al: 'c' });
    R.text('so antibodies and vaccines for strain 1 do not fit it', 160, 168.5, 4.6, { al: 'c' });
    [[56, 'tri'], [160, 'sq'], [264, 'circ']].forEach(([x, sh], i) => {
      agCell(R, x, 202, 15, [sh], { virus: true, n: 11, an: 2, ad: 2.5, len: 1.5 });
      R.text('strain ' + (i + 1), x - 8, 234, 4.6, { al: 'c' });
      const a = 0.62, gap = i === 0 ? 1 : 7, s = 0.62, bd = 15 + 1.5 + 2.5 + gap + 33 * s;
      R.antibody(x + Math.cos(a) * bd, 202 + Math.sin(a) * bd, a + PI, 'tri', { s });
      if (i) cross(R, x + Math.cos(a) * (15 + 10), 202 + Math.sin(a) * (15 + 10), 3);
    });
    R.text('✓', 56 + 20, 207, 7, { al: 'c', ink: 'T' });
  },
  anim(A, sc) {
    const p = A.ph(6); A.ring(56 + 15 + Math.sin(p * TAU) * 1.2, 210, 3 + p * 5, 'P', 0.6, 1 - p);
    for (let i = 0; i < 4; i++) A.dot(271 + Math.cos(p * TAU + i * 1.7) * (16 + i), 62 + Math.sin(p * TAU * 1.3 + i * 2.1) * (14 + i), 1.4, 'Y', 0.7, i);
  },
});

/* ---------- 3.2.4b Phagocytosis and lysozymes ---------- */
/* phagocyte body; o.dir = angle towards the pathogen (adds a dent with two pseudopod lobes), o.nuc = side of nucleus */
function phagBody(R, x, y, r, o = {}) {
  const pts = [], N = 44, ph = o.ph || 0;
  for (let i = 0; i < N; i++) {
    const a = i * TAU / N; let rr = r * (1 + 0.05 * Math.sin(a * 3 + ph));
    if (o.dent !== undefined) { const d = Math.atan2(Math.sin(a - o.dir), Math.cos(a - o.dir)); rr -= o.dent * Math.exp(-Math.pow(d / 0.42, 2)); rr += (o.lobe || 0) * Math.exp(-Math.pow((Math.abs(d) - 0.8) / 0.26, 2)); }
    pts.push(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  R.fill(pts, { ink: 'P', t: 0.14, smooth: true, wob: 0.5 }); R.poly(pts, { ink: 'B', w: 1.3, smooth: true, wob: 0.5 });
  if (o.nucleus !== false) {
    const na = (o.nucAng === undefined ? (o.dir === undefined ? -1 : o.dir + PI) : o.nucAng), nx = x + Math.cos(na) * r * 0.45, ny = y + Math.sin(na) * r * 0.45;
    [[-0.22, -0.16], [0.2, -0.2], [0.02, 0.22]].forEach(([dx, dy]) => R.circle(nx + dx * r, ny + dy * r, r * 0.2, { ink: 'B', w: 0.9, fi: 'B', ft: 0.38, wob: 0.2 }));
    R.stroke([nx - 0.22 * r, ny - 0.16 * r, nx + 0.2 * r, ny - 0.2 * r, nx + 0.02 * r, ny + 0.22 * r], { ink: 'B', w: 0.7, smooth: true, taper: 'none' });
  }
}
S({
  id: '3.2.4b', num: '3.2.4', sub: 'Phagocytosis of pathogens and destruction by lysozymes', title: 'Cell recognition and the immune system', topic: '3.2', slot: [0, 5], dna: 'mark', ao: 1,
  covers: ['3.2.4.s3'],
  card: {
    text: 'A <b>phagocyte</b> (e.g. a neutrophil or macrophage) recognises the antigens on a pathogen. Its cytoplasm moves round the pathogen and <b>engulfs</b> it, enclosing it in a vesicle called a <b>phagosome</b>. <b>Lysosomes</b> fuse with the phagosome and release <b>lysozymes</b>, hydrolytic enzymes that destroy the ingested pathogen. The phagocyte can then display the pathogen’s antigens on its own surface, becoming an <b>antigen-presenting cell</b> that activates T lymphocytes.',
    terms: ['phagocyte', 'phagocytosis', 'phagosome', 'lysosome', 'lysozyme', 'hydrolytic enzyme', 'antigen-presenting cell'],
    skill: 'Sequence of events', eq: null,
    q: 'What is the difference between a lysosome and a lysozyme?', a: 'A lysosome is a membrane-bound organelle; lysozymes are the hydrolytic enzymes it contains and releases into the phagosome.'
  },
  draw(R, sc) {
    R.text('phagocytosis', 160, 14, 5.6, { al: 'c' });
    const cx = [56, 160, 264], cy = [64, 168];
    const bub = (i, x, y) => R.bubble(x, y, 4.8, String(i));
    const cap = (x, y, t) => wrapText(t, 94, 4).forEach((ln, k) => R.text(ln, x, y + k * 5.2, 4, { al: 'c' }));
    // 1 recognition
    phagBody(R, cx[0] + 18, cy[0], 24, { dir: PI, dent: 0, lobe: 0 });
    R.bacterium(cx[0] - 28, cy[0], 26, 12, 90, { ag: ['tri', 'tri', 'tri'], an: 1.7, ad: 2 });
    [-0.5, 0, 0.5].forEach(d => { const a = PI + d, bx = cx[0] + 18 + Math.cos(a) * 24, by = cy[0] + Math.sin(a) * 24; R.recept(bx, by, a, 'tri', { w: 5, h: 3.4, n: 1.7, d: 2, len: 1.5 }); });
    bub(1, cx[0] - 40, 28); cap(cx[0], 112, 'phagocyte recognises the antigens on the pathogen');
    // 2 engulfing
    phagBody(R, cx[1] + 16, cy[0], 25, { dir: PI, dent: 10, lobe: 9 });
    R.bacterium(cx[1] - 8, cy[0], 26, 12, 90, { ag: ['tri', 'tri', 'tri'], an: 1.7, ad: 2 });
    bub(2, cx[1] - 40, 28); cap(cx[1], 112, 'its cytoplasm moves round and engulfs the pathogen');
    // 3 phagosome
    phagBody(R, cx[2] + 4, cy[0], 31, { dir: PI, nucAng: -0.7 });
    R.ellipse(cx[2] - 8, cy[0] + 4, 14, 10, { ink: 'B', w: 1, fi: 'T', ft: 0.2, wob: 0.2 }); R.bacterium(cx[2] - 8, cy[0] + 4, 18, 8.4, -20, { ag: ['tri', 'tri'], an: 1.4, ad: 1.6 });
    R.text('phagosome', cx[2] + 6, cy[0] + 25, 3.8, { al: 'c' }); R.arrow([cx[2] - 2, cy[0] + 21.5, cx[2] - 6, cy[0] + 15], { ink: 'B', w: 0.7, hs: 1.8 });
    bub(3, cx[2] - 40, 28); cap(cx[2], 112, 'the pathogen is now inside a vesicle: a phagosome');
    R.line(8, 120, 312, 120, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 4 lysosomes fuse
    phagBody(R, cx[0] + 2, cy[1], 32, { nucAng: -0.6 });
    R.ellipse(cx[0] - 4, cy[1] + 2, 14, 10, { ink: 'B', w: 1, fi: 'T', ft: 0.2, wob: 0.2 }); R.bacterium(cx[0] - 4, cy[1] + 2, 18, 8.4, -20, { ag: ['tri', 'tri'], an: 1.4, ad: 1.6 });
    R.lysosome(cx[0] + 20, cy[1] + 12, 5.2); R.lysosome(cx[0] - 12, cy[1] + 21, 5.2); R.lysosome(cx[0] + 8, cy[1] + 22, 5.2);
    R.arrow([cx[0] + 17, cy[1] + 10, cx[0] + 10, cy[1] + 6], { ink: 'P', w: 0.9, hs: 2 });
    bub(4, cx[0] - 40, 134); cap(cx[0], 214, 'lysosomes fuse with the phagosome');
    // 5 lysozymes digest
    phagBody(R, cx[1] + 2, cy[1], 32, { nucAng: -0.6 });
    R.ellipse(cx[1] - 4, cy[1] + 2, 15, 11, { ink: 'B', w: 1, fi: 'T', ft: 0.2, wob: 0.2 });
    [[-10, 0, 10], [-3, 5, -30], [3, -1, 50], [-8, 6, 80], [5, 6, 0]].forEach(([dx, dy, r]) => { R.push(cx[1] - 4 + dx, cy[1] + 2 + dy, rad(r), 1); R.stroke([-3, 0, 3, 0], { ink: 'B', w: 1.2, taper: 'none', wob: 0.15 }); R.pop(); });
    for (let i = 0; i < 10; i++) { const a = i * 2.4, d = 3 + (i % 4) * 2.2; R.dot(cx[1] - 4 + Math.cos(a) * d * 1.5, cy[1] + 2 + Math.sin(a) * d, 0.9, { ink: 'P' }); }
    R.text('lysozymes', cx[1] - 2, cy[1] + 26, 3.8, { al: 'c' }); R.arrow([cx[1] - 2, cy[1] + 21, cx[1] - 4, cy[1] + 14], { ink: 'B', w: 0.7, hs: 1.8 });
    bub(5, cx[1] - 40, 134); cap(cx[1], 214, 'lysozymes (hydrolytic enzymes) break down the pathogen');
    // 6 antigen presentation
    phagBody(R, cx[2] - 4, cy[1], 32, { nucAng: PI - 0.5 });
    for (let i = 0; i < 6; i++) { const a = -0.9 + i * 0.36; R.antigen(cx[2] - 4 + Math.cos(a) * 32, cy[1] + Math.sin(a) * 32, a, 'tri', { n: 2.2, d: 2.8, len: 3 }); }
    bub(6, cx[2] - 40, 134); cap(cx[2], 214, 'the antigens are displayed on its surface: an antigen-presenting cell');
  },
  anim(A, sc) {
    const p = A.ph(6); A.dot(160 + 14 - p * 8, 64 + 0, 0, 'P', 0, 0);
    const q = A.ph(5); for (let i = 0; i < 4; i++) A.dot(160 + Math.cos(q * TAU + i * 1.6) * (8 + i), 170 + Math.sin(q * TAU + i * 1.6) * (6 + i), 1, 'P', 0.8, i);
    A.dot(34 + 20 * Math.min(1, p * 1.3), 64, 2, 'Y', 0.8, 5);
  },
});

/* ---------- 3.2.4c Cellular response: T lymphocytes ---------- */
S({
  id: '3.2.4c', num: '3.2.4', sub: 'The cellular response: antigen-presenting cells and T lymphocytes', title: 'Cell recognition and the immune system', topic: '3.2', slot: [1, 5], dna: 'mark', ao: 1,
  covers: ['3.2.4.s4', '3.2.4.s5', '3.2.4.s6'],
  card: {
    text: 'In the <b>cellular response</b>, T lymphocytes respond to a foreign antigen. An <b>antigen-presenting cell</b> displays the antigen. A <b>helper T cell (T<sub>H</sub>)</b> with a complementary receptor binds to it and is activated; it divides by mitosis to form a clone. Active T<sub>H</sub> cells release substances that stimulate <b>cytotoxic T cells (T<sub>C</sub>)</b> to destroy infected or abnormal body cells, stimulate <b>B cells</b> to divide and secrete antibodies, and stimulate <b>phagocytes</b>. The role of other T cells is not required.',
    terms: ['T lymphocyte', 'antigen-presenting cell', 'helper T cell', 'cytotoxic T cell', 'receptor', 'clone', 'B cell', 'phagocyte'],
    skill: 'Cause and effect chain', eq: null,
    q: 'Name the three cell types that helper T cells stimulate.', a: 'Cytotoxic T cells, B cells (to make antibodies) and phagocytes.'
  },
  draw(R, sc) {
    R.text('cellular response: T lymphocytes', 160, 14, 5.6, { al: 'c' });
    // 1 APC presents antigen; TH cell receptor binds
    phagBody(R, 46, 62, 26, { nucAng: PI - 0.5 });
    [-0.5, -0.25, 0, 0.25, 0.5].forEach(d => R.antigen(46 + Math.cos(d) * 26, 62 + Math.sin(d) * 26, d, 'tri', { n: 2.2, d: 2.8, len: 3 }));
    R.lymphocyte(101, 62, 14); R.recept(88, 62, PI, 'tri', { w: 5.6, h: 3.4, n: 1.9, d: 2.4, len: 1.2 });
    R.text('antigen-presenting cell', 46, 98, 3.9, { al: 'c' }); R.text('helper T cell (T_H)', 104, 86, 3.9, { al: 'c' });
    R.bubble(20, 32, 4.8, '1'); R.bubble(112, 32, 4.8, '2');
    // 2 TH cell divides: clone
    R.arrow([120, 62, 146, 62], { ink: 'B', w: 1, hs: 2.8 }); R.text('divides', 133, 54, 3.8, { al: 'c' });
    [[168, 40], [180, 66], [166, 90]].forEach(([x, y]) => { R.lymphocyte(x, y, 9.5); R.recept(x - 9.5, y, PI, 'tri', { w: 4.2, h: 2.6, n: 1.4, d: 1.8, len: 0.8 }); });
    R.text('clone of T_H cells', 206, 94, 3.9, { al: 'l' });
    for (let i = 0; i < 7; i++) { const a = -0.8 + i * 0.28; R.dot(196 + Math.cos(a) * 8, 66 + Math.sin(a) * 18, 1, { ink: 'Y' }); }
    R.text('release signals that stimulate:', 258, 38, 4.4, { al: 'c' });
    // outcomes
    R.line(8, 118, 312, 118, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.line(196, 78, 196, 106, { ink: 'P', w: 1, taper: 'none' }); R.line(58, 106, 264, 106, { ink: 'P', w: 1, taper: 'none' });
    [58, 164, 264].forEach(x => R.arrow([x, 106, x, 128], { ink: 'P', w: 1, hs: 2.8 }));
    // TC kills infected cell
    agCell(R, 78, 182, 20, ['tri'], { n: 12, an: 1.8, ad: 2.2, len: 1.2, fi: 'P', ft: 0.22 });
    [[-17, -10], [-10, 17], [16, -12]].forEach(([dx, dy]) => { R.knock(polyPts(78 + dx, 182 + dy, 2.2, 8)); R.dot(78 + dx * 1.15, 182 + dy * 1.15, 0.9, { ink: 'P' }); });
    R.lymphocyte(34, 182, 11, { nfi: 'B' }); R.recept(45, 182, 0, 'tri', { w: 5, h: 3, n: 1.7, d: 2.2, len: 0.6 });
    R.text('T_C', 34, 197, 4, { al: 'c' }); R.text('TC cell destroys infected', 58, 214, 4.2, { al: 'c' }); R.text('or abnormal body cells', 58, 220, 4.2, { al: 'c' });
    R.bubble(20, 134, 4.8, '3');
    // B cells
    R.lymphocyte(164, 180, 20); for (let i = 0; i < 9; i++) { const a = i * TAU / 9; R.antibody(164 + Math.cos(a) * 20, 180 + Math.sin(a) * 20, a, 'tri', { s: 0.26 }); }
    R.text('B cell divides and makes antibodies', 164, 214, 4.2, { al: 'c' }); R.text('(humoral response)', 164, 220, 4.2, { al: 'c' });
    R.bubble(116, 134, 4.8, '3');
    // phagocytes
    phagBody(R, 266, 178, 25, { dir: PI, dent: 9, lobe: 8 }); R.bacterium(240, 178, 24, 11, 90, { ag: ['tri', 'tri', 'tri'], an: 1.6, ad: 1.9 });
    R.text('phagocytes engulf', 264, 214, 4.2, { al: 'c' }); R.text('more pathogens', 264, 220, 4.2, { al: 'c' });
    R.bubble(220, 134, 4.8, '3');
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 5; i++) A.dot(196 + ((p + i / 5) % 1) * 22, 66 + Math.sin(i * 2.3) * 14, 1.1, 'Y', 0.85, i);
    A.dot(34 + 16 * Math.abs(Math.sin(p * PI)), 182, 0, 'P', 0, 0);
  },
});

/* ---------- 3.2.4d Humoral response: clonal selection, plasma and memory cells ---------- */
S({
  id: '3.2.4d', num: '3.2.4', sub: 'The humoral response: B lymphocytes, clonal selection, plasma and memory cells', title: 'Cell recognition and the immune system', topic: '3.2', slot: [2, 5], dna: 'mark', ao: 1,
  covers: ['3.2.4.s7', '3.2.4.s11'],
  card: {
    text: 'In the <b>humoral response</b> each B lymphocyte carries antibody-like receptors specific to one antigen. The B cell whose receptor is complementary to the antigen is selected (<b>clonal selection</b>) and, stimulated by helper T cells, divides by mitosis to form a <b>clone</b>. Most of the clone become <b>plasma cells</b>, which secrete large quantities of the antibody (monoclonal antibodies, all identical). Some become <b>memory cells</b> that remain in the blood and give a faster, larger <b>secondary response</b> on re-exposure.',
    terms: ['B lymphocyte', 'clonal selection', 'clone', 'plasma cell', 'memory cell', 'antibody', 'primary response', 'secondary response', 'humoral response'],
    skill: 'Mitosis and growth of a clone', eq: MATH(mi('N'), mo('='), mn('2'), msup(mrow(), mi('n'))),
    eqn: 'number of cells after n divisions = 2ⁿ (e.g. 3 divisions: 8 cells)',
    q: 'Why does a second exposure to the same pathogen produce antibodies faster?', a: 'Memory cells from the first exposure are already present and divide rapidly into plasma cells.'
  },
  draw(R, sc) {
    R.text('humoral response: B lymphocytes', 160, 14, 5.6, { al: 'c' });
    const sh = ['sq', 'circ', 'trap', 'tri'], bx = [30, 76, 122, 168], by = 60;
    sh.forEach((s, i) => { R.lymphocyte(bx[i], by, 13, { fi: i === 3 ? 'P' : 'P', ft: i === 3 ? 0.3 : 0.1 }); [PI * 0.85, PI * 1.5, PI * 1.15].forEach(a => R.recept(bx[i] + Math.cos(a) * 13, by + Math.sin(a) * 13, a, s, { w: 4.8, h: 3.2, n: 1.6, d: 2, len: 2 })); });
    R.text('each B cell has its own receptor', 99, 96, 4.2, { al: 'c' });
    cross(R, bx[0], by + 24, 2.4); cross(R, bx[1], by + 24, 2.4); cross(R, bx[2], by + 24, 2.4); R.text('✓', bx[3], by + 27, 6.5, { al: 'c', ink: 'T' });
    R.bacterium(bx[3] + 44, 40, 26, 12, 90, { ag: ['tri', 'tri', 'tri'], an: 1.7, ad: 2 }); R.arrow([bx[3] + 36, 44, bx[3] + 15, 54], { ink: 'B', w: 0.8, hs: 2.2 });
    R.lymphocyte(bx[3] + 36, 78, 9); R.text('T_H', bx[3] + 36, 96, 3.8, { al: 'c' });
    R.text('1 clonal selection', 250, 28, 4.4, { al: 'l' }); R.text('only the B cell with a', 250, 56, 3.9, { al: 'l' }); R.text('complementary receptor', 250, 62, 3.9, { al: 'l' }); R.text('is selected', 250, 68, 3.9, { al: 'l' });
    R.line(8, 104, 312, 104, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // 2 clone
    R.text('2 divides by mitosis: a clone', 80, 116, 4.4, { al: 'c' });
    R.lymphocyte(26, 150, 11, { ft: 0.3 }); R.arrow([40, 150, 58, 150], { ink: 'B', w: 1, hs: 2.6 });
    [[76, 138], [100, 138], [76, 162], [100, 162]].forEach(([x, y]) => R.lymphocyte(x, y, 9.5, { ft: 0.3 }));
    R.arrow([116, 150, 140, 150], { ink: 'B', w: 1, hs: 2.6 }); R.text('differentiate', 128, 142, 3.6, { al: 'c' });
    // 3 plasma cell
    R.text('3 plasma cells', 218, 116, 4.4, { al: 'c' });
    R.ellipse(204, 160, 36, 30, { ink: 'B', w: 1.4, fi: 'P', ft: 0.14, wob: 0.5 });
    R.circle(184, 156, 9, { ink: 'B', w: 1, fi: 'B', ft: 0.38, wob: 0.2 });
    R.rer(192, 168, 36, 3, { rot: -14 });
    R.golgi(220, 142, 14, { n: 3 });
    for (let i = 0; i < 3; i++) { R.antibody(246 + i * 6, 156 + (i - 1) * 14, -0.1 + (i - 1) * 0.3, 'tri', { s: 0.34 }); R.arrow([241 + i * 2, 156 + (i - 1) * 14, 248 + i * 2, 156 + (i - 1) * 14], { ink: 'P', w: 0.6, hs: 1.4 }); }
    R.text('secrete large amounts', 282, 126, 3.9, { al: 'c' }); R.text('of antibody', 282, 132, 3.9, { al: 'c' });
    R.line(8, 198, 312, 198, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // memory cells
    R.text('3 memory cells', 60, 210, 4.4, { al: 'c' });
    R.lymphocyte(30, 226, 8, { ft: 0.3 }); R.lymphocyte(52, 226, 8, { ft: 0.3 }); R.lymphocyte(74, 226, 8, { ft: 0.3 });
    R.text('stay in the blood, ready for', 124, 212, 4.2, { al: 'l' }); R.text('a faster, larger response', 124, 218.5, 4.2, { al: 'l' }); R.text('if the antigen returns', 124, 225, 4.2, { al: 'l' });
    R.arrow([94, 224, 116, 224], { ink: 'B', w: 0.9, hs: 2.4 });
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(246 + u * 38, 156 + (i - 1) * 14 * (1 + u * 0.4), 1.3, 'P', 1 - u, i); }
    const q = A.ph(6); A.ring(26, 150, 11 + q * 3, 'P', 0.7, 1 - q);
  },
});

/* ---------- 3.2.4e Antibody structure and the antigen-antibody complex ---------- */
S({
  id: '3.2.4e', num: '3.2.4', sub: 'Antibody structure; antigen-antibody complex, agglutination and phagocytosis', title: 'Cell recognition and the immune system', topic: '3.2', slot: [3, 5], dna: 'mark', ao: 1,
  covers: ['3.2.4.s8', '3.2.4.s9', '3.2.4.s10'],
  card: {
    text: 'An <b>antibody</b> is a protein made by plasma cells that binds specifically to one antigen. It has four polypeptide chains: <b>two heavy and two light</b>, held by <b>disulfide bridges</b>. The <b>variable regions</b> form two identical antigen-binding sites, complementary to one antigen; the rest is the <b>constant region</b>, with a flexible <b>hinge</b>. An <b>antigen–antibody complex</b> forms when antibodies bind antigens on bacterial cells; the antibodies link bacteria together (<b>agglutination</b>) so that <b>phagocytes</b> can engulf them.',
    terms: ['antibody', 'heavy chain', 'light chain', 'variable region', 'constant region', 'hinge', 'disulfide bridge', 'antigen–antibody complex', 'agglutination', 'phagocytosis'],
    skill: 'Specificity: shape complementarity', eq: null,
    q: 'Which part of the antibody gives it specificity?', a: 'The variable regions: their shape (a tertiary structure) is complementary to one antigen only.'
  },
  draw(R, sc) {
    const X = 70, Y = 200, k = 2.7, W = (lx, ly) => [X + lx * k, Y + ly * k];
    R.text('antibody: a protein made by plasma cells', 100, 14, 4.6, { al: 'c' });
    R.antibody(X, Y, -PI / 2, 'tri', { s: k });
    const lab = (s, p, tx, ty, al) => leader(R, s, p[0], p[1], tx, ty, { size: 4.2, al });
    lab('heavy chain', W(-2.3, -8), 24, 214, 'c');
    lab('light chain', [X + 10.42 * k, Y - 24.67 * k], 118, 176, 'l');
    lab('disulfide bridges', W(0, -9), 104, 204, 'l');
    lab('hinge', W(0, -15), 18, 168, 'l');
    lab('constant region', W(2.3, -5), 108, 226, 'l');
    lab('variable region', W(12.5, -35), 124, 98, 'l');
    R.text('antigen-binding', 124, 104, 3.8, { al: 'l' });
    R.text('site (two)', 124, 110, 3.8, { al: 'l' });
    ['four polypeptide chains:', '2 heavy + 2 light,', 'joined by disulfide bridges', '', 'variable regions differ from', 'one antibody to the next;', 'the shape of the binding site', 'is complementary to one antigen'].forEach((t, i) => { if (t) R.text(t, 14, 36 + i * 7.2, 4.4, { al: 'l' }); });
    R.line(166, 22, 166, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // right: antigen-antibody complex (lock and key) and agglutination
    R.text('antigen-antibody complex', 206, 28, 4.4, { al: 'c' });
    R.rrect(174, 108, 68, 34, 16, { ink: 'B', w: 1.3, fi: 'TY', ft: 0.3, wob: 0.3 });
    R.antigen(186, 108, -PI / 2, 'tri', { n: 2.2, d: 2.6, len: 2.4 }); R.antigen(228, 108, -PI / 2, 'sq', { n: 2.2, d: 2.6, len: 2.4 });
    R.abBind(206, 104, -PI / 2, 'tri', 1.0, { side: -1 });
    R.text('bacterium', 208, 128, 3.9, { al: 'c' }); leader(R, 'antigen', 228, 106, 238, 96, { size: 3.9, al: 'c' }); R.text('binding site fits one antigen', 206, 38, 3.8, { al: 'c' });
    R.line(250, 22, 250, 134, { ink: 'B', w: 0.5, t: 0.4, taper: 'none' });
    R.text('agglutination', 282, 28, 4.4, { al: 'c' });
    [[270, 56, 30], [296, 80, -50], [272, 104, 70]].forEach(([x, y, r]) => R.bacterium(x, y, 26, 12, r, { fi: 'TY', ft: 0.3 }));
    [[282, 66, 0.6], [284, 92, -0.4], [262, 80, 0.2]].forEach(([x, y, a]) => R.antibody(x, y, a, 'tri', { s: 0.34 }));
    R.text('antibodies link', 282, 124, 3.8, { al: 'c' }); R.text('bacteria together', 282, 130, 3.8, { al: 'c' });
    R.line(172, 140, 312, 140, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // phagocytosis of the clump
    phagBody(R, 258, 184, 34, { dir: PI, dent: 10, lobe: 9, nucAng: -0.4 });
    [[221, 176, 20], [226, 192, -30]].forEach(([x, y, r]) => R.bacterium(x, y, 24, 11, r, { fi: 'TY', ft: 0.3 }));
    R.antibody(220, 184, 0.1, 'tri', { s: 0.24 });
    R.text('phagocytes engulf the clumped', 240, 226, 4.2, { al: 'c' }); R.text('bacteria and destroy them', 240, 232.5, 4.2, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(5); A.ring(206, 106, 3 + p * 7, 'Y', 0.7, 1 - p);
    const q = A.ph(6); A.dot(280 + Math.sin(q * TAU) * 6, 80 + Math.cos(q * TAU) * 4, 1.6, 'P', 0.7, 3);
  },
});

/* ---------- 3.2.4f Primary and secondary immune responses; memory ---------- */
S({
  id: '3.2.4f', num: '3.2.4', sub: 'Primary and secondary immune responses: plasma and memory cells', title: 'Cell recognition and the immune system', topic: '3.2', slot: [0, 6], dna: 'mark', ao: 3,
  covers: ['3.2.4.s11'],
  card: {
    text: 'On first exposure to an antigen there is a <b>primary response</b>: B cells must be selected and divide, so antibody concentration rises slowly to a low peak. <b>Plasma cells</b> secrete the antibody; <b>memory cells</b> remain. On a second exposure to the same antigen the memory cells divide rapidly into plasma cells, giving a <b>secondary response</b> that is faster, larger and longer-lasting, often before symptoms appear. A different antigen gives a primary response again, because immunity is specific.',
    terms: ['primary response', 'secondary response', 'plasma cell', 'memory cell', 'antibody concentration', 'specificity', 'immunity'],
    skill: 'MS 1.3: interpret a graph', eq: null, eqn: 'compare: lag time before the rise, height of the peak, how long it lasts',
    q: 'Why is the secondary response faster and larger than the primary response?', a: 'Memory cells for that antigen already exist, so many more B cells divide and become plasma cells almost immediately.'
  },
  draw(R, sc) {
    R.text('antibody concentration after exposure to antigens', 106, 14, 4.8, { al: 'c' });
    const g = R.graph(30, 36, 160, 168, { xmin: 0, xmax: 1, ymin: 0, ymax: 10, xl: 'time', yl: 'antibody concentration in blood', xt: [], yt: [], fs: 4.4, xly: 10, ylx: 6, paper: 8 }).axes();
    g.curve([0, 0, 0.06, 0.05, 0.12, 0.35, 0.18, 1.2, 0.24, 2, 0.31, 1.6, 0.4, 1, 0.5, 0.65], { ink: 'P', w: 1.7 });
    g.curve([0.5, 0.65, 0.54, 2.2, 0.58, 6, 0.63, 8.6, 0.7, 7.4, 0.8, 5.2, 0.95, 3.4], { ink: 'P', w: 1.7 });
    g.curve([0.5, 0, 0.58, 0.05, 0.64, 0.4, 0.7, 1.4, 0.76, 2, 0.84, 1.5, 0.95, 0.8], { ink: 'T', w: 1.7 });
    // exposure markers
    [0, 0.5].forEach(x => g.dashed(x, 0, x, 10, { ink: 'B', w: 0.7 }));
    R.antigen(g.X(0), g.Y(10) - 5, -PI / 2, 'tri', { n: 2.4, d: 3, len: 0 }); R.antigen(g.X(0.5) - 3, g.Y(10) - 5, -PI / 2, 'tri', { n: 2.4, d: 3, len: 0 }); R.antigen(g.X(0.5) + 4, g.Y(10) - 5, -PI / 2, 'sq', { n: 2.4, d: 3, len: 0, ink: 'T' });
    R.text('1st exposure', g.X(0) + 3, g.Y(9.4), 3.9, { al: 'l' }); R.text('to A', g.X(0) + 3, g.Y(9.4) + 5, 3.9, { al: 'l' });
    R.text('2nd exposure to A,', g.X(0.5) - 3, g.Y(9.4) + 11, 3.9, { al: 'r' }); R.text('1st exposure to B', g.X(0.5) - 3, g.Y(9.4) + 16, 3.9, { al: 'r' });
    R.text('primary response:', g.X(0.12), g.Y(3.6), 3.9, { al: 'l' }); R.text('slower, lower', g.X(0.12), g.Y(3.6) + 5, 3.9, { al: 'l' });
    R.text('secondary response:', g.X(0.69), g.Y(9.1), 3.9, { al: 'l' }); R.text('faster, higher', g.X(0.69), g.Y(9.1) + 5, 3.9, { al: 'l' });
    R.text('B: primary response', g.X(0.78), g.Y(2.9), 3.9, { al: 'l', ink: 'T' });
    // right: cells
    R.line(204, 24, 204, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('1st exposure', 258, 28, 4.6, { al: 'c' });
    R.lymphocyte(222, 48, 6); R.arrow([231, 48, 243, 48], { ink: 'B', w: 0.9, hs: 2.2 });
    [[254, 40], [266, 44], [262, 54]].forEach(([x, y]) => { R.circle(x, y, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); R.circle(x - 1.5, y, 2.4, { ink: 'B', w: 0.6, fi: 'B', ft: 0.35 }); });
    R.lymphocyte(284, 48, 5.4, { ft: 0.3 });
    R.text('few plasma cells', 250, 66, 3.8, { al: 'c' }); R.text('memory cell', 297, 66, 3.8, { al: 'c' });
    R.text('slow: B cell selection', 258, 74, 3.8, { al: 'c' }); R.text('and division first', 258, 79.5, 3.8, { al: 'c' });
    R.line(210, 88, 308, 88, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('2nd exposure', 258, 100, 4.6, { al: 'c' });
    [[216, 120], [224, 132], [216, 140]].forEach(([x, y]) => R.lymphocyte(x, y, 5.4, { ft: 0.3 }));
    R.arrow([232, 130, 244, 130], { ink: 'B', w: 0.9, hs: 2.2 });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 252 + c * 12, y = 114 + r * 12; R.circle(x, y, 4.8, { ink: 'B', w: 0.8, fi: 'P', ft: 0.2 }); R.circle(x - 1.4, y, 2.2, { ink: 'B', w: 0.5, fi: 'B', ft: 0.35 }); }
    R.text('many memory cells', 258, 156, 3.8, { al: 'c' }); R.text('become many plasma', 258, 162, 3.8, { al: 'c' }); R.text('cells, quickly', 258, 167.5, 3.8, { al: 'c' });
    R.line(210, 178, 308, 178, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('memory cells make the', 258, 192, 4, { al: 'c' }); R.text('response to the same', 258, 198, 4, { al: 'c' }); R.text('antigen faster, larger', 258, 204, 4, { al: 'c' }); R.text('and longer-lasting', 258, 210, 4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(8); const gx = 30 + p * 160; // moving dot along the curve is overkill; pulse at exposures
    A.ring(30, 31, 3 + (p * 3 % 1) * 5, 'Y', 0.7, 1 - (p * 3 % 1)); A.ring(110, 31, 3 + (p * 3 % 1) * 5, 'Y', 0.7, 1 - (p * 3 % 1));
  },
});

/* ---------- 3.2.4g Vaccination, active and passive immunity, herd immunity ---------- */
S({
  id: '3.2.4g', num: '3.2.4', sub: 'Vaccines, active and passive immunity, herd immunity', title: 'Cell recognition and the immune system', topic: '3.2', slot: [1, 6], dna: 'mark', ao: 3,
  covers: ['3.2.4.s12', '3.2.4.s13', '3.2.4.s20', '3.2.4.s21'],
  card: {
    text: '<b>Vaccines</b> contain antigens (e.g. from dead or weakened pathogens). They stimulate a primary response and produce <b>memory cells</b>, protecting the individual without them suffering the disease. When a high proportion of a population is vaccinated, the pathogen is unlikely to spread, so unvaccinated people are also protected: <b>herd immunity</b>. <b>Active immunity</b> means your own immune system makes antibodies and memory cells (after infection or vaccination): long-lasting. <b>Passive immunity</b> is antibodies from another source (e.g. across the placenta, in breast milk): immediate, but short-lived with no memory cells.',
    terms: ['vaccine', 'memory cell', 'herd immunity', 'active immunity', 'passive immunity', 'placenta', 'breast milk', 'primary response'],
    skill: 'Evaluate vaccination data', eq: null, eqn: 'incidence of disease falls as the percentage vaccinated rises',
    q: 'Why does a passive immunity not last as long as active immunity?', a: 'The antibodies are broken down and no memory cells are made, so the body cannot produce more antibody on re-exposure.'
  },
  draw(R, sc) {
    R.text('vaccines protect individuals and populations', 160, 14, 5.2, { al: 'c' });
    // 1 vaccine syringe with pathogen antigens
    R.syringe(18, 52, 44, { w: 11, ink: 'T', t: 0.25 }); R.line(66, 52, 80, 52, { ink: 'B', w: 1, taper: 'none' });
    R.bacterium(36, 52, 16, 6.6, 0, { fi: 'TY', ft: 0.2, ag: ['tri', 'tri'], an: 1.3, ad: 1.5 });
    R.text('vaccine:', 50, 76, 4.2, { al: 'c' }); R.text('antigens of dead or', 50, 82, 3.9, { al: 'c' }); R.text('weakened pathogen', 50, 88, 3.9, { al: 'c' });
    R.arrow([84, 52, 98, 52], { ink: 'B', w: 1, hs: 2.6 });
    // 2 body responds: primary response, memory cells
    R.lymphocyte(116, 52, 10, { ft: 0.25 }); R.arrow([127, 52, 141, 52], { ink: 'B', w: 0.9, hs: 2.4 });
    R.circle(156, 42, 7, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); R.circle(154, 42, 3.4, { ink: 'B', w: 0.6, fi: 'B', ft: 0.35 }); R.lymphocyte(158, 64, 6, { ft: 0.3 });
    R.text('memory cells made', 140, 82, 3.9, { al: 'c' }); R.text('no disease', 140, 88, 3.9, { al: 'c' });
    R.arrow([170, 52, 184, 52], { ink: 'B', w: 0.9, hs: 2.4 });
    // 3 later real infection
    R.lymphocyte(198, 62, 6, { ft: 0.3 }); R.lymphocyte(212, 50, 6, { ft: 0.3 }); R.bacterium(244, 52, 22, 9, -20, { ag: ['tri', 'tri', 'tri'], an: 1.5, ad: 1.8 });
    R.antibody(224, 62, 0.4, 'tri', { s: 0.28 }); R.antibody(228, 42, -0.2, 'tri', { s: 0.28 });
    R.text('pathogen meets memory', 238, 76, 3.9, { al: 'c' }); R.text('cells: fast secondary', 238, 82, 3.9, { al: 'c' }); R.text('response', 238, 88, 3.9, { al: 'c' });
    R.line(8, 98, 312, 98, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // active vs passive
    R.text('active immunity', 82, 109, 4.8, { al: 'c' }); R.text('passive immunity', 238, 109, 4.8, { al: 'c' });
    R.lymphocyte(24, 134, 8, { ft: 0.3 }); R.antibody(46, 140, -PI / 2 + 0.2, 'tri', { s: 0.34 }); R.antibody(60, 138, -PI / 2 - 0.3, 'tri', { s: 0.34 });
    ['your own immune system', 'makes antibodies and', 'memory cells', 'slower to start, long-lasting', 'after infection or vaccination'].forEach((t, i) => R.text(t, 76, 124 + i * 6.4, 3.9, { al: 'l' }));
    R.line(160, 104, 160, 158, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.circle(176, 130, 7, { ink: 'B', w: 1, fi: 'P', ft: 0.18 }); R.circle(176, 130, 3, { ink: 'B', w: 0.6, fi: 'P', ft: 0.5 }); R.arrow([184, 134, 192, 140], { ink: 'P', w: 0.9, hs: 2.2 });
    R.antibody(200, 144, -PI / 2 + 0.4, 'tri', { s: 0.34 }); R.antibody(214, 142, -PI / 2 - 0.2, 'tri', { s: 0.34 });
    ['antibodies from another', 'source: placenta, breast', 'milk or injection', 'immediate but short-lived,', 'no memory cells'].forEach((t, i) => R.text(t, 228, 124 + i * 6.4, 3.9, { al: 'l' }));
    R.line(8, 162, 312, 162, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // herd immunity
    R.text('herd immunity', 160, 172, 5.2, { al: 'c' });
    const gx = (x0, i) => x0 + (i % 5) * 15, gy = (y0, i) => y0 + Math.floor(i / 5) * 15;
    const low = ['u', 'i', 'u', 'v', 'u', 'u', 'u', 'i', 'u', 'v', 'i', 'u', 'u', 'u', 'v'], high = ['v', 'v', 'v', 'v', 'v', 'u', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'i'];
    low.forEach((st, i) => R.person(gx(26, i), gy(190, i), 7, st)); high.forEach((st, i) => R.person(gx(176, i), gy(190, i), 7, st));
    [[1, 0], [1, 2], [7, 6], [7, 8], [10, 11]].forEach(([a, b]) => R.arrow([gx(26, a) + (b > a ? 5 : -5), gy(190, a) + 1, gx(26, b) + (b > a ? -5 : 5), gy(190, b) + 1], { ink: 'P', w: 0.9, hs: 2 }));
    [[14, 13], [14, 9]].forEach(([a, b]) => { const ax = gx(176, a), ay = gy(190, a), bx = gx(176, b), by = gy(190, b); R.line(ax + (bx - ax) * 0.3, ay + (by - ay) * 0.3, ax + (bx - ax) * 0.7, ay + (by - ay) * 0.7, { ink: 'P', w: 0.9, taper: 'none' }); cross(R, ax + (bx - ax) * 0.55, ay + (by - ay) * 0.55 + 1, 2); });
    R.text('few vaccinated: infection spreads', 56, 226, 4, { al: 'c' });
    R.text('most vaccinated: spread is blocked,', 206, 226, 4, { al: 'c' }); R.text('unvaccinated people protected too', 206, 232, 4, { al: 'c' });
    R.line(116, 176, 116, 222, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.person(268, 186, 6, 'v'); R.text('vaccinated', 277, 188, 3.8, { al: 'l' });
    R.person(268, 200, 6, 'u'); R.text('not vaccinated', 277, 202, 3.8, { al: 'l' });
    R.person(268, 214, 6, 'i'); R.text('infected', 277, 216, 3.8, { al: 'l' });
  },
  anim(A, sc) {
    const p = A.ph(6); A.dot(66 + p * 14, 52, 1.6, 'T', 0.8, 1);
    const q = A.ph(4); for (let i = 0; i < 3; i++) A.dot(41 + ((q + i / 3) % 1) * 30, 190 + (i % 2) * 15, 1.3, 'P', 0.8, i);
  },
});

/* ---------- 3.2.4h HIV: structure, replication, AIDS; why antibiotics fail against viruses ---------- */
S({
  id: '3.2.4h', num: '3.2.4', sub: 'HIV: structure, replication in helper T cells, AIDS; antibiotics and viruses', title: 'Cell recognition and the immune system', topic: '3.2', slot: [2, 6], dna: 'bio', ao: 1,
  covers: ['3.2.4.s14', '3.2.4.s15'],
  card: {
    text: '<b>HIV</b> has a lipid <b>envelope</b> with <b>attachment proteins</b>, a protein <b>capsid</b>, two strands of <b>RNA</b> and the enzyme <b>reverse transcriptase</b>. Its attachment proteins bind to receptors on <b>helper T cells</b>; the RNA enters, reverse transcriptase makes DNA from it, the DNA is inserted into the host DNA, and the host cell makes new viral proteins and particles. As helper T cells are destroyed, the immune system fails to stimulate other immune cells and <b>AIDS</b> develops, so infections and cancers take hold. <b>Antibiotics</b> are ineffective against viruses, which have no bacterial enzymes or ribosomes of their own to target; they use the host cell’s.',
    terms: ['HIV', 'AIDS', 'helper T cell', 'attachment protein', 'capsid', 'envelope', 'reverse transcriptase', 'RNA', 'antibiotic'],
    skill: 'Sequence of replication events', eq: null,
    q: 'Why does HIV lower the effectiveness of the immune response?', a: 'It infects and destroys helper T cells, which are needed to stimulate cytotoxic T cells, B cells and phagocytes.'
  },
  draw(R, sc) {
    R.text('HIV', 79, 16, 5.6, { al: 'c' }); R.text('replication in a helper T cell', 232, 16, 5.2, { al: 'c' });
    // ---- A structure
    const cx = 80, cy = 72, r = 35;
    R.bilayer(polyPts(cx, cy, r, 28, 0), { closed: true, gap: 3.4, hr: 1.5, sp: 3.4, tail: 2, coreT: 0.3 });
    for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + 0.15; R.antigen(cx + Math.cos(a) * (r + 3.4), cy + Math.sin(a) * (r + 3.4), a, 'tri', { n: 2.8, d: 3.4, len: 3.4 }); }
    const cap = [cx - 18, cy - 20, cx + 20, cy - 16, cx + 16, cy + 8, cx + 4, cy + 22, cx - 10, cy + 12, cx - 20, cy - 4];
    R.fill(cap, { ink: 'P', t: 0.3, smooth: true, wob: 0.3 }); R.poly(cap, { ink: 'B', w: 1.3, smooth: true, wob: 0.4 });
    R.poly(cap.map((v, i) => i % 2 ? cy + (v - cy) * 0.84 : cx + (v - cx) * 0.84), { ink: 'B', w: 0.5, smooth: true, wob: 0.3 });
    R.stroke([cx - 10, cy - 12, cx - 2, cy - 6, cx - 8, cy + 2, cx + 2, cy + 8, cx - 2, cy + 14], { ink: 'T', w: 1.5, smooth: true, taper: 'none' });
    R.stroke([cx + 4, cy - 12, cx + 10, cy - 4, cx + 2, cy + 2, cx + 10, cy + 8], { ink: 'T', w: 1.5, smooth: true, taper: 'none' });
    [[cx + 8, cy - 1], [cx - 6, cy + 6], [cx + 12, cy + 10]].forEach(([x, y]) => R.ellipse(x, y, 3.2, 2.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.85, wob: 0.1 }));
    const lab = (s2, tx, ty, x, y, al) => leader(R, s2, x, y, tx, ty, { size: 4.2, al });
    const sa = 3.6, spk = [cx + Math.cos(sa) * (r + 9), cy + Math.sin(sa) * (r + 9)];
    lab('attachment protein', 8, 30, cx + Math.cos(-2.15) * (r + 8), cy + Math.sin(-2.15) * (r + 8), 'l');
    lab('lipid envelope', 8, 122, cx + Math.cos(2.3) * r, cy + Math.sin(2.3) * r, 'l');
    lab('capsid', 120, 40, cx + 17, cy - 10, 'l');
    lab('RNA', 120, 60, cx + 8, cy - 4, 'l');
    lab('reverse', 120, 104, cx + 12, cy + 10, 'l'); R.text('transcriptase', 120, 110, 4.2, { al: 'l' });
    R.line(152, 22, 152, 138, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- B replication
    const hx = 232, hy = 72, hr = 38;
    R.circle(hx, hy, hr, { ink: 'B', w: 1.5, fi: 'P', ft: 0.12, wob: 0.5 });
    R.circle(hx + 6, hy - 8, 16, { ink: 'B', w: 1.1, fi: 'B', ft: 0.2, wob: 0.3 });
    const ra = Math.atan2(50 - hy, 0 + 0), rx = hx - Math.sqrt(hr * hr - 22 * 22), rang = Math.atan2(50 - hy, rx - hx);
    R.circle(rx - 14, 50, 8, { ink: 'B', w: 1, fi: 'TY', ft: 0.3 }); R.antigen(rx - 6, 50, 0, 'tri', { n: 1.9, d: 2.4, len: 1.6 });
    R.recept(rx, 50, rang, 'tri', { w: 5.6, h: 3.4, n: 1.9, d: 2.4, len: 1.0 });
    R.stroke([rx + 8, 56, rx + 14, 62, rx + 8, 68, rx + 16, 74], { ink: 'T', w: 1.4, smooth: true, taper: 'none' });
    R.helix(rx + 14, 84, rx + 32, 70, { amp: 2.2, turns: 1.6, w: 0.7 });
    R.helix(rx + 30, 66, 244, 56, { amp: 3, turns: 2.4, w: 0.8 });
    for (let i = 0; i < 5; i++) R.ribosome(222 + i * 6, 96 - (i % 2) * 3, 0.9);
    [[268, 48, 0.5], [273, 72, 0], [268, 96, -0.5]].forEach(([x, y, a]) => { R.circle(x + 6, y, 6, { ink: 'B', w: 0.9, fi: 'TY', ft: 0.3 }); R.antigen(x + 12, y, a, 'tri', { n: 1.6, d: 2, len: 1 }); });
    [[rx - 22, 36, 1], [rx + 16, 50, 2], [rx + 12, 94, 3], [252, 44, 4], [236, 106, 5], [296, 72, 6]].forEach(([x, y, n]) => R.bubble(x, y, 4, String(n)));
    // legend (two columns)
    const L = ['attachment protein binds', 'RNA enters the cell', 'reverse transcriptase: RNA to DNA', 'DNA inserted into host DNA', 'host makes viral proteins', 'new viruses bud off'];
    [0, 1, 2].forEach(rw => { R.bubble(163, 120.4 + rw * 6.6, 2.8, String(rw + 1)); R.text(L[rw], 169, 121.6 + rw * 6.6, 3.5, { al: 'l' }); R.bubble(239, 120.4 + rw * 6.6, 2.8, String(rw + 4)); R.text(L[rw + 3], 245, 121.6 + rw * 6.6, 3.5, { al: 'l' }); });
    R.line(8, 140, 312, 140, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- C AIDS graph
    R.text('HIV infection over time', 82, 150, 4.4, { al: 'c' });
    const g = R.graph(24, 158, 120, 54, { xmin: 0, xmax: 1, ymin: 0, ymax: 10, xl: '', yl: 'numbers', xt: [], yt: [], fs: 3.9, ylx: 5 }).axes();
    g.curve([0, 9, 0.08, 6.4, 0.2, 7.2, 0.5, 6, 0.75, 4.2, 0.9, 1.4, 1, 0.6], { ink: 'B', w: 1.4 }); g.curve([0, 0.6, 0.06, 7.4, 0.14, 1.6, 0.5, 1.5, 0.8, 3, 1, 8.5], { ink: 'P', w: 1.4 });
    g.dashed(0, 2, 1, 2, { ink: 'B', w: 0.5 });
    R.text('helper T cells', 72, 168, 3.8, { al: 'c' }); R.text('HIV', 142, 168, 3.8, { al: 'r', ink: 'P' });
    R.text('initial', 32, 222, 3.6, { al: 'c' }); R.text('latent period (years)', 78, 222, 3.6, { al: 'c' }); R.text('AIDS', 132, 222, 3.6, { al: 'c' });
    R.arrow([24, 230, 146, 230], { ink: 'B', w: 0.8, hs: 2 }); R.text('time', 85, 237, 3.8, { al: 'c' });
    R.line(152, 142, 152, 238, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- D antibiotics
    R.text('why antibiotics do not work on viruses', 232, 150, 4.4, { al: 'c' });
    R.bacterium(190, 184, 44, 20, 0, { fi: 'TY', ft: 0.3 }); [[178, 182], [190, 188], [202, 181], [196, 192]].forEach(([x, y]) => R.ribosome(x, y, 0.8)); R.ellipse(210, 184, 4, 2.6, { ink: 'B', w: 0.7, fi: 'P', ft: 0.85 });
    R.circle(276, 184, 15, { ink: 'B', w: 1.2, fi: 'TY', ft: 0.3 }); for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + 0.2; R.antigen(276 + Math.cos(a) * 15, 184 + Math.sin(a) * 15, a, 'tri', { n: 1.8, d: 2.2, len: 1.4 }); }
    R.stroke([268, 180, 272, 186, 278, 180, 284, 188], { ink: 'T', w: 1.2, smooth: true, taper: 'none' });
    [[168, 160], [180, 160], [192, 160]].forEach(([x, y]) => { R.rrect(x - 4, y - 2.4, 8, 4.8, 2.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.6, wob: 0.1 }); });
    R.arrow([186, 164, 186, 172], { ink: 'P', w: 0.9, hs: 2.2 }); R.text('✓', 220, 168, 7, { al: 'c', ink: 'T' });
    [[266, 160], [278, 160]].forEach(([x, y]) => { R.rrect(x - 4, y - 2.4, 8, 4.8, 2.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.6, wob: 0.1 }); }); cross(R, 272, 170, 3);
    wrapText('bacteria have their own enzymes and ribosomes: antibiotics target them', 66, 3.8).forEach((t, i) => R.text(t, 190, 208 + i * 5.6, 3.8, { al: 'c' }));
    ['viruses use the host', 'cell’s: no target'].forEach((t, i) => R.text(t, 276, 208 + i * 5.6, 3.8, { al: 'c' }));
    R.text('(virus-specific enzymes such as reverse transcriptase', 232, 226, 3.5, { al: 'c' }); R.text('can be targeted by antiviral drugs)', 232, 232, 3.5, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(6); A.dot(176 + 12 * Math.min(1, p * 2), 52, 0, 'P', 0, 0);
    A.dot(284 + p * 6, 76, 1.2, 'Y', 0.8, 1); A.dot(206 + Math.sin(p * TAU) * 2, 74, 1.1, 'T', 0.9, 2);
  },
});

/* ---------- 3.2.4i Monoclonal antibodies, ELISA, ethical issues ---------- */
S({
  id: '3.2.4i', num: '3.2.4', sub: 'Monoclonal antibodies in medicine, the ELISA test, ethical issues', title: 'Cell recognition and the immune system', topic: '3.2', slot: [3, 6], dna: 'mark', ao: 3,
  covers: ['3.2.4.s16', '3.2.4.s17', '3.2.4.s18', '3.2.4.s19', '3.2.4.s20', '3.2.4.s21'],
  card: {
    text: '<b>Monoclonal antibodies</b> are identical antibodies, all specific to one antigen. They can <b>target medication</b>: a drug attached to an antibody is carried to cells carrying the matching antigen (e.g. tumour markers), reducing side effects. They are used in <b>medical diagnosis</b>, e.g. pregnancy tests. In the <b>ELISA test</b> an antibody with an attached <b>enzyme</b> binds the antigen (or antibody) being tested for; after washing, adding the substrate gives a colour change that shows the target is present. Ethical issues include the use of animals, safety of trials, consent, cost and fair access, for vaccines as well as monoclonal antibodies. (Production details are not required.)',
    terms: ['monoclonal antibody', 'targeting medication', 'tumour marker', 'medical diagnosis', 'ELISA', 'enzyme', 'substrate', 'ethical issues'],
    skill: 'Evaluate methodology and data', eq: null, eqn: 'colour intensity can be compared with standards to estimate concentration',
    q: 'In an ELISA, why must the wells be washed before the substrate is added?', a: 'To remove unbound enzyme-linked antibody; otherwise it would give a colour change (false positive) even when the target is absent.'
  },
  draw(R, sc) {
    R.text('monoclonal antibodies', 80, 14, 5.2, { al: 'c' });
    // plasma clone -> identical antibodies
    [[26, 40], [48, 34], [70, 42]].forEach(([x, y]) => { R.circle(x, y, 8, { ink: 'B', w: 1, fi: 'P', ft: 0.2 }); R.circle(x - 2, y, 3.4, { ink: 'B', w: 0.6, fi: 'B', ft: 0.35 }); });
    for (let i = 0; i < 5; i++) R.antibody(96 + (i % 3) * 14, 50 + Math.floor(i / 3) * 18, -PI / 2 + (i - 2) * 0.12, 'tri', { s: 0.34 });
    R.text('one clone of plasma cells:', 80, 70, 4.2, { al: 'c' }); R.text('identical antibodies, specific', 80, 76, 4.2, { al: 'c' }); R.text('to one antigen', 80, 82, 4.2, { al: 'c' });
    R.line(152, 22, 152, 98, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // targeting medication
    R.text('targeting medication', 232, 14, 5.2, { al: 'c' });
    agCell(R, 266, 54, 20, ['tri'], { n: 11, an: 2, ad: 2.5, len: 1.2, fi: 'P', ft: 0.22 }); agCell(R, 188, 66, 14, ['sq'], { n: 9, an: 1.8, ad: 2.2, len: 1 });
    const ab = R.abBind(266 - 20 - 3.8, 54 - 2, PI, 'tri', 0.75, { side: -1 });
    { const rot = ab[2] + PI / 2, hx = ab[0] + Math.cos(rot + PI / 2) * 5, hy = ab[1] + Math.sin(rot + PI / 2) * 5; R.poly(hexPts(hx, hy, 4.2), { ink: 'B', w: 0.9, fi: 'T', ft: 0.7 }); leader(R, 'drug', hx, hy, 214, 90, { size: 3.9, al: 'c' }); }
    R.text('cancer cell', 266, 84, 4, { al: 'c' }); R.text('normal cell', 188, 86, 4, { al: 'c' });
    R.text('the antibody carries the drug to tumour markers', 232, 95, 3.7, { al: 'c' });
    R.line(8, 100, 312, 100, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ELISA
    R.text('ELISA test (indirect)', 112, 110, 5, { al: 'c' });
    const wx = [34, 94, 154, 214], wy = 124;
    const well = (x, liquid) => { if (liquid) R.fill([x - 20, wy + 12, x + 20, wy + 12, x + 18, wy + 36, x - 18, wy + 36], { ink: liquid, t: 0.45, wob: 0.2 }); R.stroke([x - 22, wy, x - 19, wy + 32, x - 14, wy + 38, x + 14, wy + 38, x + 19, wy + 32, x + 22, wy], { ink: 'B', w: 1.3, smooth: false, taper: 'none', wob: 0.2 }); };
    for (let i = 0; i < 4; i++) well(wx[i], i === 0 ? null : (i === 3 ? 'P' : 'T'));
    // 1 antigen stuck on the bottom
    [-14, -4, 6, 16].forEach(d => R.antigen(wx[0] + d, wy + 37, -PI / 2, 'tri', { n: 2.2, d: 2.6, len: 0.5 }));
    // 2 patient antibodies: specific ones bind
    [-14, -4, 6, 16].forEach((d, k) => { R.antigen(wx[1] + d, wy + 37, -PI / 2, 'tri', { n: 2.2, d: 2.6, len: 0.5 }); if (k !== 1) R.antibody(wx[1] + d, wy + 24, -PI / 2, 'tri', { s: 0.3 }); });
    R.antibody(wx[1] - 4, wy + 10, 0.8, 'sq', { s: 0.26 });
    // 3 secondary antibody with enzyme
    [-14, 6, 16].forEach(d => { R.antigen(wx[2] + d, wy + 37, -PI / 2, 'tri', { n: 2.2, d: 2.6, len: 0.5 }); R.antibody(wx[2] + d, wy + 26, -PI / 2, 'tri', { s: 0.3 }); R.antibody(wx[2] + d, wy + 18, -PI / 2, 'trap', { s: 0.2 }); R.ellipse(wx[2] + d, wy + 8, 2, 1.6, { ink: 'B', w: 0.6, fi: 'T', ft: 0.9 }); });
    // 4 substrate: colour change
    [-14, 6, 16].forEach(d => { R.antigen(wx[3] + d, wy + 37, -PI / 2, 'tri', { n: 2.2, d: 2.6, len: 0.5 }); R.antibody(wx[3] + d, wy + 26, -PI / 2, 'tri', { s: 0.3 }); });
    for (let k = 0; k < 9; k++) R.dot(wx[3] - 16 + k * 4, wy + 14 + (k % 3) * 5, 0.9, { ink: 'P' });
    ['1 antigen is stuck to the well', '2 patient sample added: specific antibodies bind', '3 wash; antibody with an enzyme attached binds', '4 wash; add substrate: colour change = positive'].forEach((t, i) => wrapText(t, 52, 3.6).forEach((ln, k) => R.text(ln, wx[i], 170 + k * 5, 3.6, { al: 'c' })));
    [0, 1, 2].forEach(i => R.arrow([wx[i] + 24, wy + 20, wx[i + 1] - 24, wy + 20], { ink: 'B', w: 0.8, hs: 2 }));
    R.line(8, 190, 244, 190, { ink: 'B', w: 0.5, t: 0.4, taper: 'none' });
    // diagnosis
    R.text('diagnosis: antibodies find their antigen', 126, 200, 4.4, { al: 'c' });
    R.rrect(20, 210, 84, 16, 3, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.12 }); R.rect(60, 212, 6, 12, { ink: 'B', w: 0.7, fi: 'T', ft: 0.7 }); R.rect(80, 212, 6, 12, { ink: 'B', w: 0.7, fi: 'T', ft: 0.7 }); R.circle(32, 218, 3.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.5 }); R.text('test', 63, 233, 3.5, { al: 'c' }); R.text('control', 83, 233, 3.5, { al: 'c' }); R.text('sample', 32, 233, 3.5, { al: 'c' });
    R.text('test strip, e.g. a pregnancy test:', 116, 216, 3.9, { al: 'l' }); R.text('antibodies detect the hormone hCG', 116, 222, 3.9, { al: 'l' });
    R.line(250, 22, 250, 238, { ink: 'B', w: 0.5, t: 0.4, taper: 'none' });
    // ethical issues
    R.text('ethical issues', 281, 110, 4.6, { al: 'c' });
    [['use of animals in production', 126], ['safety of clinical trials', 148], ['consent to vaccines', 170], ['cost and fair access', 192]].forEach(([t, y]) => { Icons.ethics(R, 258, y, 4.6); wrapText(t, 40, 3.6).forEach((ln, k) => R.text(ln, 266, y - 1.5 + k * 4.8, 3.6, { al: 'l' })); });
  },
  anim(A, sc) {
    const p = A.ph(6); A.dot(214 - 16 + ((p * 9) % 9) * 4, 138 + (p % 0.33) * 12, 1, 'P', 0.7, 1);
    A.ring(266 - 24, 52, 3 + p * 5, 'Y', 0.7, 1 - p);
  },
});
