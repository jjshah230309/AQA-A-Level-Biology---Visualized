/* ---------- 3.1.4.1 Proteins: general properties ---------- */
S({
  id: '3.1.4.1', num: '3.1.4.1', title: 'General properties of proteins', topic: '3.1', slot: [1, 1], dna: 'mark',
  covers: ['3.1.4.1.s1', '3.1.4.1.s2', '3.1.4.1.s3', '3.1.4.1.s4', '3.1.4.1.s5', '3.1.4.1.s6', '3.1.4.1.s7', '3.1.4.1.s8'],
  card: {
    text: 'Amino acids are the monomers of proteins. Each has an amine group (NH₂), a carboxyl group (COOH) and a side chain R; the twenty amino acids common to all organisms differ only in R. A condensation reaction between two amino acids forms a <b>peptide bond</b> (dipeptide; polypeptide = many). A functional protein may contain one or more polypeptides. <b>Primary</b> structure = amino-acid sequence; <b>secondary</b> = α-helix / β-pleated sheet held by hydrogen bonds; <b>tertiary</b> = 3-D folding held by hydrogen bonds, ionic bonds and disulfide bridges; <b>quaternary</b> = more than one polypeptide. Biuret test: blue → lilac/purple.',
    terms: ['amino acid', 'peptide bond', 'dipeptide', 'polypeptide', 'primary', 'secondary', 'tertiary', 'quaternary', 'hydrogen bond', 'ionic bond', 'disulfide bridge', 'biuret test'],
    skill: 'AT f: biuret test for protein', eq: null,
    q: 'Which bonds hold the tertiary structure of a protein together, and what happens to them in a denatured enzyme?', a: 'Hydrogen bonds, ionic bonds and disulfide bridges. In denaturation these (except disulfide) break, so the tertiary structure and active site change shape.'
  },
  draw(R, sc) {
    // general amino acid
    R.text('amino acid', 40, 20, 5.8, { al: 'c' });
    R.aminoAcid(42, 54, 19, { fs: 5.2 });
    R.text('amine', 14, 70, 4.2, { al: 'c' }); R.text('carboxyl', 72, 70, 4.2, { al: 'c' }); R.text('side chain', 66, 30, 4.2, { al: 'l' });
    // dipeptide by condensation
    R.line(100, 12, 100, 90, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('peptide bond', 206, 20, 5.8, { al: 'c' });
    const pp = R.peptide(114, 52, 2, 15, { fs: 4.6, rc: ['T', 'Y'] });
    R.drop(160, 28, 5, { label: false }); R.text('−H_2O', 178, 28, 4.8, { al: 'l' });
    R.text('dipeptide', 206, 84, 4.8, { al: 'c' }); R.text('many amino acids = polypeptide', 206, 91, 4.4, { al: 'c' });
    R.line(8, 98, 312, 98, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // four levels
    const lv = (x, n, t) => { R.bubble(x + 8, 108, 6.2, n); R.text(t, x + 40, 112, 4.8, { al: 'c' }); };
    lv(10, '1°', 'sequence'); lv(70, '2°', 'H bonds'); lv(130, '3°', 'folding'); lv(190, '4°', '2+ chains');
    // 1: bead chain
    const cols = ['T', 'Y', 'P', 'TY', 'T', 'Y', 'P'];
    const bp = [[14, 160], [26, 146], [38, 164], [26, 178], [14, 192], [28, 206], [42, 196]];
    R.stroke(bp.flat(), { ink: 'B', w: 1, smooth: true, taper: 'none' });
    bp.forEach((p, i) => R.circle(p[0], p[1], 5.2, { ink: 'B', w: 0.9, fi: cols[i], ft: 0.8 }));
    R.text('peptide bonds', 36, 226, 4.4, { al: 'c' });
    // 2: alpha helix and beta sheet
    const cp = t => [76 + 6 * Math.cos(t * TAU * 4.5), 134 + t * 56];
    const hp = []; for (let i = 0; i <= 60; i++) { const q = cp(i / 60); hp.push(q[0], q[1] + 4 * Math.sin(i / 60 * TAU * 4.5)); }
    R.stroke(hp, { ink: 'P', w: 1.5, smooth: true, taper: 'none' });
    for (let i = 0; i < 4; i++) R.dashedLine(92, 146 + i * 12, 92, 152 + i * 12, { ink: 'B', w: 0.7, d: 1.1 });
    R.text('α-helix', 92, 204, 4.6, { al: 'c' });
    for (let s = 0; s < 3; s++) { const y = 150 + s * 14; R.stroke([98, y, 104, y - 4, 110, y + 4, 116, y - 4, 122, y + 4, 128, y], { ink: 'P', w: 1.3, smooth: false, taper: 'none' }); R.fill([128, y - 2.4, 134, y, 128, y + 2.4], { ink: 'P', t: 1, wob: 0 }); }
    for (let i = 0; i < 4; i++) { R.dashedLine(114 + i * 6, 154, 114 + i * 6, 158, { ink: 'B', w: 0.6, d: 0.9 }); R.dashedLine(114 + i * 6, 168, 114 + i * 6, 172, { ink: 'B', w: 0.6, d: 0.9 }); }
    R.text('β-pleated sheet', 125, 198, 4.6, { al: 'c' });
    // 3: tertiary fold
    const tf = [[160, 150], [178, 144], [196, 152], [198, 170], [186, 180], [168, 176], [160, 190], [172, 204], [190, 202]];
    R.fill(tf.flat(), { ink: 'Y', t: 0.2, smooth: true, wob: 0.2 });
    R.stroke(tf.flat(), { ink: 'P', w: 2.1, smooth: true, taper: 'both' });
    R.circle(188, 176, 2.6, { ink: 'B', w: 0.9, fi: 'Y', ft: 1 }); R.circle(168, 160, 2.6, { ink: 'B', w: 0.9, fi: 'Y', ft: 1 }); R.line(168, 160, 188, 176, { ink: 'B', w: 1.6, taper: 'none' });
    R.text('S–S', 175, 172, 4, { al: 'c' });
    R.dashedLine(176, 148, 190, 156, { ink: 'B', w: 0.7, d: 1.1 });
    R.text('+', 182, 192, 5, { al: 'c', ink: 'P' }); R.text('−', 192, 190, 5, { al: 'c', ink: 'T' }); R.circle(182, 190.5, 3, { ink: 'P', w: 0.7 }); R.circle(192, 190.5, 3, { ink: 'T', w: 0.7 });
    R.text('H, ionic, S–S', 178, 218, 4.2, { al: 'c' });
    // 4: quaternary
    [[222, 152, 'P'], [248, 152, 'T'], [222, 182, 'T'], [248, 182, 'P']].forEach(([x, y, c]) => { R.ellipse(x, y, 11, 12, { ink: 'B', w: 1.1, fi: c, ft: 0.6 }); R.circle(x + (c === 'P' ? 2 : -2), y, 2.6, { ink: 'B', w: 0.8, fi: 'Y', ft: 1 }); });
    R.text('haemoglobin:', 235, 204, 4.4, { al: 'c' }); R.text('4 polypeptides', 235, 211, 4.4, { al: 'c' });
    // biuret
    R.line(268, 100, 268, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('biuret test', 292, 112, 5.4, { al: 'c' });
    R.tube(276, 122, 9, 56, { ink: 'T', t: 0.4, level: 0.55 }); R.tube(298, 122, 9, 56, { ink: 'PB', t: 0.4, level: 0.55 });
    R.arrow([285, 150, 296, 150], { ink: 'B', w: 1, hs: 2.4 }); R.text('blue', 280, 190, 4.4, { al: 'c' }); R.text('lilac', 303, 190, 4.4, { al: 'c' }); R.text('protein', 303, 198, 4.4, { al: 'c' }); R.text('present', 303, 205, 4.4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(3.5); A.dot(160 + p * 30, 28 - p * 8, 3.2, 'T', (1 - p) * 0.8);
    const q = A.ph(5); A.dot(168 + 20 * Math.sin(q * TAU), 168 + 4 * Math.cos(q * TAU * 2), 1.0, 'Y', 0.9);
  },
});

/* ---------- 3.1.4.2 Enzymes: mechanism ---------- */
S({
  id: '3.1.4.2a', num: '3.1.4.2', sub: 'How enzymes work', title: 'Many proteins are enzymes', topic: '3.1', slot: [2, 1], dna: 'mark',
  covers: ['3.1.4.2.s1', '3.1.4.2.s2', '3.1.4.2.s3', '3.1.4.2.s4', '3.1.4.2.s8', '3.1.4.2.s9'],
  card: {
    text: 'Each enzyme lowers the <b>activation energy</b> of the reaction it catalyses. The active site is a region of tertiary structure complementary to its substrate; binding forms an <b>enzyme–substrate complex</b>. In the <b>induced-fit</b> model the active site changes shape slightly as the substrate binds, which strains bonds and lowers activation energy; products are released and the enzyme is unchanged. Enzymes are specific because only a complementary substrate fits. Models of enzyme action have changed over time (rigid lock-and-key → induced fit). Enzymes catalyse intracellular and extracellular reactions that determine structures and functions from cellular to whole-organism level.',
    terms: ['activation energy', 'active site', 'enzyme–substrate complex', 'induced fit', 'specificity', 'complementary', 'tertiary structure'],
    skill: 'Reading an energy profile', eq: MATH(msub(mi('E'), mt('a, catalysed')), mo('<'), msub(mi('E'), mt('a, uncatalysed'))),
    q: 'Why can only one substrate bind to a given enzyme?', a: 'The active site has a specific tertiary structure (shape and charge) complementary to only that substrate; this is determined by the primary structure.'
  },
  draw(R, sc) {
    const enz = (x, y, open, tint = 'P') => { // enzyme blob with a cleft; open 1 = wide, 0 = closed (induced fit)
      const g = 6 + open * 3.2;
      const p = [x - 30, y - 8, x - 25, y - 22, x - 9, y - 26, x - g, y - 12, x - g * 0.55, y - 2, x + g * 0.55, y - 2, x + g, y - 12, x + 9, y - 26, x + 26, y - 22, x + 31, y - 4, x + 28, y + 16, x + 8, y + 26, x - 14, y + 26, x - 30, y + 14];
      R.fill(p, { ink: tint, t: 0.6, smooth: true, wob: 0.25 }); R.poly(p, { ink: 'B', w: 1.5, smooth: true, wob: 0.3 }); return p;
    };
    const sub1 = (x, y, a = 0) => { R.push(x, y, rad(a), 1); R.fill([-6.5, -6, 0, -6, 0, 6, -6.5, 6], { ink: 'Y', t: 0.95, wob: 0.1 }); R.fill([1, -6, 6.5, -4, 6.5, 4, 1, 6], { ink: 'T', t: 0.85, wob: 0.1 }); R.pop(); };
    R.text('induced fit', 160, 15, 6.2, { al: 'c' });
    enz(52, 62, 1); sub1(52, 27, 0); R.arrow([52, 36, 52, 47], { ink: 'B', w: 1, hs: 2.6 }); R.text('substrate', 76, 28, 4.4, { al: 'l' });
    R.arrow([88, 62, 122, 62], { ink: 'B', w: 1.1, hs: 3 });
    enz(160, 62, 0);
    R.arrow([198, 62, 232, 62], { ink: 'B', w: 1.1, hs: 3 });
    enz(268, 62, 1); sub1(255, 26, -28); sub1(282, 28, 34);
    R.text('active site', 52, 98, 4.6, { al: 'c' }); R.text('enzyme\u2013substrate complex', 160, 98, 4.6, { al: 'c' }); R.text('products released', 268, 98, 4.6, { al: 'c' });
    R.line(8, 104, 312, 104, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // activation energy profile
    const g = R.graph(30, 122, 150, 90, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'progress of reaction', yl: 'energy', fs: 4.6 }).axes();
    const prof = (h, w) => x => 3.4 + (x < 3 ? 0 : 0) + h * Math.exp(-Math.pow((x - 4.4) / w, 2)) - (x > 5 ? (x - 5) * 0.36 : 0);
    g.curve(prof(5.6, 1.3), { ink: 'B', w: 1.4 }); g.curve(prof(2.9, 1.4), { ink: 'P', w: 1.6 });
    g.dashed(0, 3.4, 10, 3.4, { ink: 'B', w: 0.5 });
    R.arrow([g.X(4.4), g.Y(3.4)], { w: 0 });
    R.arrow([g.X(4.4), g.Y(3.5), g.X(4.4), g.Y(8.8)], { ink: 'B', w: 1, hs: 2.6, both: true }); R.text('E_a', g.X(4.9), g.Y(6.4), 5, { al: 'l' });
    R.arrow([g.X(7.0), g.Y(3.5), g.X(7.0), g.Y(6.3)], { ink: 'P', w: 1, hs: 2.6, both: true }); R.text('E_a', g.X(7.5), g.Y(4.9), 5, { al: 'l', ink: 'P' });
    R.text('uncatalysed', g.X(2.5), g.Y(9.4), 4.6, { al: 'c' }); R.text('catalysed', g.X(8.3), g.Y(7.4), 4.6, { al: 'c', ink: 'P' });
    R.text('substrate', g.X(0.7), g.Y(2.6), 4.2, { al: 'l' }); R.text('products', g.X(9.0), g.Y(1.0), 4.2, { al: 'c' });
    // specificity and models
    R.line(196, 104, 196, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('specificity', 254, 116, 5.4, { al: 'c' });
    enzS(R, 232, 144, 0.6); R.poly([222, 128, 242, 128, 244, 138, 222, 138], { ink: 'B', w: 0 });
    R.fill([226, 118, 238, 118, 238, 126, 232, 130, 226, 126], { ink: 'T', t: 0.9, wob: 0.1 });
    R.text('✗', 258, 132, 8, { al: 'c', ink: 'P' });
    R.text('models', 254, 172, 5.4, { al: 'c' });
    R.rect(208, 186, 26, 24, { ink: 'B', w: 1.1, fi: 'P', ft: 0.5 }); R.rect(216, 186, 10, 8, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 });
    R.text('lock and key', 221, 220, 4.4, { al: 'c' });
    R.arrow([238, 198, 256, 198], { ink: 'B', w: 1, hs: 2.6 });
    R.fill([262, 186, 296, 186, 296, 210, 262, 210], { ink: 'P', t: 0.5, wob: 0.4 }); R.poly([262, 186, 276, 186, 279, 196, 283, 186, 296, 186, 296, 210, 262, 210], { ink: 'B', w: 1.1, smooth: true });
    R.text('induced fit', 279, 220, 4.4, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(6);
    // substrate slides into the cleft, is held, then products leave upward
    let sy = 27, a = 1, step = 0;
    if (p < 0.35) { sy = 27 + 19 * (p / 0.35); a = 1; step = 1; }
    else if (p < 0.65) { sy = 46; a = 1; step = 2; }
    if (p < 0.65) { const x = 160; A.poly([x - 6.5, sy - 6, x, sy - 6, x, sy + 6, x - 6.5, sy + 6], 'Y', 0.9); A.poly([x + 1, sy - 6, x + 6.5, sy - 4, x + 6.5, sy + 4, x + 1, sy + 6], 'T', 0.85); }
    else { const u = (p - 0.65) / 0.35; A.poly([160 - 6.5 - 14 * u, 46 - 6 - 22 * u, 160 - 14 * u, 40 - 22 * u, 160 - 14 * u, 52 - 22 * u, 160 - 6.5 - 14 * u, 52 - 22 * u], 'Y', 0.9 * (1 - u * 0.4)); A.poly([161 + 14 * u, 40 - 22 * u, 166.5 + 14 * u, 42 - 22 * u, 166.5 + 14 * u, 50 - 22 * u, 161 + 14 * u, 52 - 22 * u], 'T', 0.85 * (1 - u * 0.4)); }
    if (p > 0.3 && p < 0.7) A.ring(160, 50, 9 + 5 * Math.sin((p - 0.3) / 0.4 * PI), 'Y', 0.9, 0.6);
  },
});
function enzS(R, x, y, o) { const p = [x - 22, y - 8, x - 16, y - 16, x - 6, y - 18, x - 4, y - 6, x, y - 2, x + 4, y - 6, x + 6, y - 18, x + 18, y - 16, x + 24, y, x + 18, y + 14, x, y + 18, x - 18, y + 14]; R.fill(p, { ink: 'P', t: 0.55, smooth: true, wob: 0.2 }); R.poly(p, { ink: 'B', w: 1.3, smooth: true }); }

/* ---------- 3.1.4.2 Enzymes: factors affecting rate ---------- */
S({
  id: '3.1.4.2b', num: '3.1.4.2', sub: 'Factors affecting the rate of enzyme-controlled reactions', title: 'Many proteins are enzymes', topic: '3.1', slot: [3, 1], dna: 'mark', ao: 3,
  covers: ['3.1.4.2.s5', '3.1.4.2.s6', '3.1.4.2.s7', '3.1.4.2.s10', '3.1.4.2.s11'],
  card: {
    text: 'The properties of an enzyme relate to the tertiary structure of its active site. Rate rises with <b>temperature</b> as molecules gain kinetic energy (more frequent, more energetic collisions, more enzyme–substrate complexes) until the optimum; above it hydrogen and ionic bonds break, the active site changes shape and the enzyme is <b>denatured</b>. Extreme <b>pH</b> also disrupts these bonds. Rate rises with <b>enzyme</b> and <b>substrate</b> concentration until another factor limits. <b>Competitive inhibitors</b> bind the active site (effect reduced by more substrate); <b>non-competitive inhibitors</b> bind elsewhere, changing the active site (lower maximum rate).',
    terms: ['denatured', 'optimum', 'kinetic energy', 'competitive inhibitor', 'non-competitive inhibitor', 'limiting factor', 'buffer'],
    skill: 'MS 0.5: pH from hydrogen ion concentration', eq: MATH(mt('pH '), mo('='), mo('−'), msub(mt('log'), mn(10)), mo('['), msup(mr('H'), mo('+')), mo(']')),
    eqn: 'e.g. [H⁺] = 1 × 10⁻⁷ mol dm⁻³ gives pH 7',
    q: 'Explain why the rate of an enzyme-controlled reaction falls above the optimum temperature.', a: 'Hydrogen/ionic bonds break, the tertiary structure and active site change shape, substrate no longer fits: fewer enzyme–substrate complexes (denatured).'
  },
  draw(R, sc) {
    const cells = [
      { t: 'temperature', xl: '\u00B0C', f: x => x < 38 ? 10 * Math.pow(x / 38, 2.4) : 10 * Math.exp(-Math.pow((x - 38) / 7, 1.8)), xmax: 60, xt: [0, 20, 40, 60], note: 'optimum, then denatured' },
      { t: 'pH', xl: 'pH', f: x => 10 * Math.exp(-Math.pow((x - 7) / 1.9, 2)), xmax: 14, xt: [0, 7, 14], note: 'optimum pH' },
      { t: 'enzyme concentration', xl: '[E]', f: x => 2.3 * x, xmax: 4, xt: [], note: 'substrate in excess' },
      { t: 'substrate concentration', xl: '[S]', f: x => 10 * x / (1.6 + x), xmax: 10, xt: [], note: 'active sites saturated' },
      { t: 'competitive inhibitor', xl: '[S]', f: x => 10 * x / (1.6 + x), g: x => 10 * x / (1.6 * 3.6 + x), xmax: 30, xt: [], note: 'more substrate overcomes it' },
      { t: 'non-competitive inhibitor', xl: '[S]', f: x => 10 * x / (1.6 + x), g: x => 5.4 * x / (1.6 + x), xmax: 10, xt: [], note: 'lower maximum rate' },
    ];
    const mini = (x, y, kind) => {
      const p = [x - 12, y - 4, x - 10, y - 10, x - 3, y - 12, x - 2.5, y - 5, x, y - 3, x + 2.5, y - 5, x + 3, y - 12, x + 10, y - 10, x + 13, y, x + 9, y + 8, x - 8, y + 9, x - 13, y + 3];
      R.fill(p, { ink: 'P', t: 0.55, smooth: true, wob: 0.15 }); R.poly(p, { ink: 'B', w: 1, smooth: true });
      if (kind === 'c') { R.fill([x - 2.5, y - 13, x + 2.5, y - 13, x + 2.5, y - 6, x, y - 4, x - 2.5, y - 6], { ink: 'T', t: 0.95, wob: 0.05 }); R.text('inhibitor in active site', x + 16, y + 16, 3.9, { al: 'c' }); }
      else { R.fill([x + 10, y - 3, x + 17, y - 6, x + 18, y + 2, x + 11, y + 4], { ink: 'T', t: 0.95, wob: 0.05 }); R.fill([x - 2.5, y - 12, x + 2.5, y - 12, x + 2.5, y - 6, x - 2.5, y - 6], { ink: 'Y', t: 0.9, wob: 0.05 }); R.text('inhibitor elsewhere', x + 14, y + 16, 3.9, { al: 'c' }); }
    };
    cells.forEach((c, i) => {
      const col = i % 3, row = (i / 3) | 0, x0 = 8 + col * 104, y0 = 12 + row * 92;
      R.text(c.t, x0 + 48, y0 + 5, 4.9, { al: 'c' });
      const g = R.graph(x0 + 17, y0 + 12, 72, 42, { xmin: 0, xmax: c.xmax, ymin: 0, ymax: 10.5, xl: c.xl, yl: 'rate', xt: c.xt, fs: 3.9, xly: c.xt.length ? 13 : 10, ylx: 4 }).axes();
      g.curve(c.f, { ink: 'P', w: 1.4, n: 36 });
      if (c.g) g.curve(c.g, { ink: 'T', w: 1.4, n: 36 });
      if (i === 0) g.vdrop(38, 10, { ink: 'B', w: 0.5 });
      if (i === 3) g.hline(10, { ink: 'B', w: 0.45 });
      R.text(c.note, x0 + 48, y0 + 71, 4.2, { al: 'c' });
      if (i >= 4) mini(x0 + 44, y0 + 84, i === 4 ? 'c' : 'n');
    });
    // pH formula strip
    R.line(8, 204, 312, 204, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('pH = \u2212log_{10}[H^+]', 70, 219, 7, { al: 'c' });
    R.text('1\u00D710^{\u22127} mol dm^{\u22123} \u2192 pH 7', 70, 229, 4.8, { al: 'c' });
    R.text('buffer holds pH constant', 150, 222, 4.8, { al: 'l' });
  },
  anim(A, sc) {
    const u = A.ph(6), xv = u * 60, yv = xv < 38 ? 10 * Math.pow(xv / 38, 2.4) : 10 * Math.exp(-Math.pow((xv - 38) / 7, 1.8));
    A.dot(25 + xv / 60 * 72, 24 + 42 - yv / 10.5 * 42, 2.0, 'B', 1);
    const v = A.ph(5), sx = v * 10, sy = 10 * sx / (1.6 + sx);
    A.dot(25 + sx / 10 * 72, 12 + 92 + 12 + 42 - sy / 10.5 * 42, 2.0, 'B', 1);
  },
});
