/* ===================== TOPIC 3.1 BIOLOGICAL MOLECULES ===================== */
const { m: MATH, i: mi, r: mr, n: mn, o: mo, t: mt, sub: msub, sup: msup, frac: mfrac, sqrt: msqrt, row: mrow, paren: mpar } = MM;
const H2O = msub(mr('H'), mn(2)) + mr('O');

/* ---------- 3.1.1 Monomers and polymers ---------- */
S({
  id: '3.1.1', num: '3.1.1', title: 'Monomers and polymers', topic: '3.1', slot: [0, 0], dna: 'mark',
  covers: ['3.1.1.s1', '3.1.1.s2', '3.1.1.s3', '3.1.1.s4', '3.1.1.s5', '3.1.1.s6'],
  card: {
    text: 'The biochemical basis of life is similar for all living things. <b>Monomers</b> are the smaller units from which larger molecules are made; <b>polymers</b> are molecules made from a large number of monomers joined together. Monosaccharides, amino acids and nucleotides are examples of monomers. A <b>condensation</b> reaction joins two molecules with a chemical bond and eliminates a molecule of water; a <b>hydrolysis</b> reaction breaks a chemical bond between two molecules and uses a water molecule.',
    terms: ['monomer', 'polymer', 'monosaccharide', 'amino acid', 'nucleotide', 'condensation', 'hydrolysis'],
    skill: 'Linear polymer of n monomers', eq: MATH(mi('n'), mt(' monomers '), mo('→'), mt(' polymer '), mo('+'), mpar(mi('n') + mo('−') + mn(1)), H2O),
    q: 'What happens to water when two monomers are joined, and when the bond between them is broken?', a: 'Condensation eliminates (releases) a water molecule; hydrolysis uses a water molecule.'
  },
  draw(R, sc) {
    // Row A: three kinds of monomer
    R.tokSugar(52, 40, 15); R.text('monosaccharide', 52, 68, 5, { al: 'c' });
    R.tokAmino(160, 44, 11, { rc: 'T' }); R.text('amino acid', 160, 68, 5, { al: 'c' });
    R.tokNT(262, 42, 17); R.text('nucleotide', 270, 68, 5, { al: 'c' });
    R.line(14, 78, 306, 78, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // Row B: condensation <-> hydrolysis
    R.circle(36, 112, 10, { ink: 'B', w: 1.1, fi: 'T', ft: 0.6 }); R.circle(76, 112, 10, { ink: 'B', w: 1.1, fi: 'P', ft: 0.45 });
    R.line(46, 112, 52, 112, { ink: 'B', w: 0.9, taper: 'none' }); R.text('OH', 56, 115, 5.2, { al: 'c' });
    R.text('H', 62, 106, 4.6, { al: 'c' }); R.line(66, 112, 70, 112, { ink: 'B', w: 0.9, taper: 'none' });
    R.arrow([112, 104, 168, 104], { ink: 'B', w: 1.3 }); R.text('−H_2O', 140, 98, 5.8, { al: 'c' }); R.text('condensation', 140, 91, 4.8, { al: 'c', ink: 'B' });
    R.arrow([168, 124, 112, 124], { ink: 'B', w: 1.3 }); R.text('+H_2O', 140, 136, 5.8, { al: 'c' }); R.text('hydrolysis', 140, 143, 4.8, { al: 'c' });
    R.circle(208, 112, 10, { ink: 'B', w: 1.1, fi: 'T', ft: 0.6 }); R.circle(228, 112, 10, { ink: 'B', w: 1.1, fi: 'P', ft: 0.45 }); R.bondMark(218, 112, 3.6);
    R.drop(272, 98, 7);
    R.line(14, 152, 306, 152, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // Row C: three polymers
    R.chain(26, 172, 6, 24, 0, (r, x, y) => r.tokSugar(x, y, 8.5, { o: false }), { bonds: true, br: 2.2 });
    R.text('polysaccharide', 200, 175, 5.2, { al: 'l' }); R.text('glycosidic bonds', 200, 167, 4.4, { al: 'l' });
    const rcs = ['T', 'Y', 'P', 'TY', 'T', 'Y'];
    R.chain(26, 204, 6, 24, 0, (r, x, y, i) => r.tokAmino(x, y + 3, 6.6, { rc: rcs[i] }), { bonds: true, br: 2.2 });
    R.text('polypeptide', 200, 207, 5.2, { al: 'l' }); R.text('peptide bonds', 200, 199, 4.4, { al: 'l' });
    const bs = ['A', 'G', 'T', 'C', 'A', 'T'];
    R.chain(26, 228, 6, 24, 0, (r, x, y, i) => r.tokNT(x - 4, y - 1, 7.5, { base: bs[i] }), { bonds: false });
    R.text('polynucleotide', 200, 231, 5.2, { al: 'l' }); R.text('phosphodiester bonds', 200, 223, 4.4, { al: 'l' });
  },
  anim(A, sc) {
    const p = A.ph(3.6);
    // condensation: water leaves the new bond
    A.dot(218 + 56 * p, 112 - 20 * Math.sin(p * PI), 4.4, 'T', (1 - p) * 0.9);
    // hydrolysis: water arrives at the bond
    const q = A.ph(3.6, 0.5);
    A.dot(300 - 80 * q, 138 - 20 * q, 4.4, 'T', Math.sin(q * PI) * 0.9);
    A.ring(218, 112, 3.6 + Math.sin(p * TAU) * 0.6, 'P', 0.9);
  },
});

/* ---------- 3.1.2 Carbohydrates (i) monosaccharides & the glycosidic bond ---------- */
S({
  id: '3.1.2a', num: '3.1.2', sub: 'Monosaccharides, disaccharides and the glycosidic bond', title: 'Carbohydrates', topic: '3.1', slot: [1, 0], dna: 'mark',
  covers: ['3.1.2.s1', '3.1.2.s2', '3.1.2.s3', '3.1.2.s4', '3.1.2.s5'],
  card: {
    text: 'Monosaccharides are the monomers from which larger carbohydrates are made; glucose, galactose and fructose are common ones. A condensation reaction between two monosaccharides forms a <b>glycosidic bond</b>. Maltose = glucose + glucose; sucrose = glucose + fructose; lactose = glucose + galactose. Glucose has two isomers, <b>α-glucose</b> and <b>β-glucose</b>, which differ in the position of the –OH on carbon 1 (below the ring in α, above it in β).',
    terms: ['monosaccharide', 'glycosidic bond', 'maltose', 'sucrose', 'lactose', 'α-glucose', 'β-glucose', 'isomer'],
    skill: 'Condensation of two monosaccharides', eq: MATH(mt('monosaccharide + monosaccharide '), mo('→'), mt(' disaccharide + '), H2O),
    q: 'Which two monosaccharides condense to form lactose, and which bond joins them?', a: 'Glucose and galactose, joined by a glycosidic bond (with loss of water).'
  },
  draw(R, sc) {
    // isomers
    R.hexose(58, 52, 21, { beta: false }); R.text('α-glucose', 58, 98, 6.2, { al: 'c' });
    R.hexose(150, 52, 21, { beta: true }); R.text('β-glucose', 150, 98, 6.2, { al: 'c' });
    R.bondMark(82, 66, 5.2); R.bondMark(175, 41, 5.2);
    // other monosaccharides
    R.tokSugar(242, 34, 11, { fi: 'Y' }); R.text('glucose', 242, 55, 4.8, { al: 'c' });
    R.tokSugar(284, 34, 11, { fi: 'T', ft: 0.7 }); R.text('galactose', 284, 55, 4.8, { al: 'c' });
    R.poly(polyPts(263, 78, 10, 5), { ink: 'B', w: 1.1, fi: 'P', ft: 0.55 }); R.text('fructose', 263, 99, 4.8, { al: 'c' });
    R.line(14, 108, 306, 108, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // condensation: glucose (C1-OH) + glucose (C4-OH) -> maltose + water
    R.hexose(36, 148, 12, { hs: false });
    R.text('+', 66, 152, 8, { al: 'c' });
    R.hexose(96, 148, 12, { hs: false });
    R.arrow([128, 148, 154, 148], { ink: 'B', w: 1.3 }); R.text('−H_2O', 141, 140, 5, { al: 'c' });
    const a = R.hexose(190, 148, 12, { c1bond: true, hs: false }), b = R.hexose(246, 148, 12, { c4bond: true, hs: false });
    const mx = (a.C1[0] + b.C4[0]) / 2, my = a.C1[1] + 7;
    R.line(a.C1[0], a.C1[1], mx - 1.5, my - 1, { ink: 'B', w: 1.1, taper: 'none' }); R.line(mx + 1.5, my - 1, b.C4[0], b.C4[1], { ink: 'B', w: 1.1, taper: 'none' });
    R.text('O', mx, my + 2.2, 5.6, { al: 'c' }); R.bondMark(mx, my, 5.4, { w: 1.5 });
    R.drop(290, 130, 7);
    R.text('glycosidic bond', mx + 14, my + 22, 5.2, { al: 'c' }); R.arrow([mx + 6, my + 15, mx + 1, my + 7], { ink: 'P', w: 0.9, hs: 2.6 });
    R.line(14, 183, 306, 183, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // disaccharide equations
    const eq = (x, y, A, B, name, ca, cb) => {
      A(x, y); R.text('+', x + 15, y + 3, 8, { al: 'c' }); B(x + 30, y); R.text('=', x + 46, y + 3, 8, { al: 'c' });
      A(x + 62, y); B(x + 80, y); R.bondMark(x + 71, y, 2.2); R.text(name, x + 71, y + 19, 6.4, { al: 'c' });
    };
    const g = (x, y) => R.tokSugar(x, y, 7.5, { o: false }), ga = (x, y) => R.tokSugar(x, y, 7.5, { o: false, fi: 'T', ft: 0.7 }), fr = (x, y) => R.poly(polyPts(x, y, 7, 5), { ink: 'B', w: 1.0, fi: 'P', ft: 0.55 });
    eq(12, 205, g, g, 'maltose'); eq(116, 205, g, fr, 'sucrose'); eq(214, 205, g, ga, 'lactose');
  },
  anim(A, sc) {
    const p = A.ph(3.2);
    A.dot(290 + Math.sin(p * TAU) * 1.5, 130 + p * 0, 0.01, 'T', 0);
    A.ring(218, 155, 5.4 + Math.sin(p * TAU) * 0.7, 'P', 0.8, 0.9);
    A.dot(281 - 22 * p, 138 + 30 * p, 3.2, 'T', (1 - p) * 0.8);
  },
});

/* ---------- 3.1.2 Carbohydrates (ii) polysaccharides + tests ---------- */
S({
  id: '3.1.2b', num: '3.1.2', sub: 'Polysaccharides, structure and function, and food tests', title: 'Carbohydrates', topic: '3.1', slot: [2, 0], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.1.2.s6', '3.1.2.s7', '3.1.2.s8', '3.1.2.s9', '3.1.2.s10'],
  card: {
    text: 'Polysaccharides are formed by the condensation of many glucose units. <b>Starch</b> (plants) and <b>glycogen</b> (animals) are formed from α-glucose: compact and insoluble, so good stores that do not affect water potential; glycogen is more branched, with more ends for rapid hydrolysis. <b>Cellulose</b> is formed from β-glucose: alternate units are inverted, giving straight chains that hydrogen-bond into strong microfibrils in plant cell walls. Benedict’s solution detects reducing sugars (blue → green → yellow → orange → brick-red); non-reducing sugars are first hydrolysed with acid, then neutralised. Iodine in potassium iodide turns blue-black with starch.',
    terms: ['starch', 'glycogen', 'cellulose', 'α-glucose', 'β-glucose', 'microfibril', 'Benedict’s solution', 'reducing sugar', 'iodine/potassium iodide'],
    skill: 'AT f: biochemical tests', eq: null,
    q: 'Why is cellulose strong while starch is a good energy store, although both are polymers of glucose?', a: 'Cellulose has β-glucose units with alternate inversion: straight chains cross-linked by hydrogen bonds into microfibrils. Starch/glycogen use α-glucose: compact, branched, insoluble stores.'
  },
  draw(R, sc) {
    const W = sc.w;
    const gluc = (x, y, r = 4.6, col = 'Y', ft = 0.8) => R.tokSugar(x, y, r, { o: false, fi: col, ft, w: 0.85 });
    R.line(227, 14, 227, 96, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' }); R.line(443, 14, 443, 96, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- starch: amylose (helix, alpha-1,4) and amylopectin (alpha-1,6 branches) ----
    R.text('starch', 120, 18, 7, { al: 'c' });
    const cp = t => [24 + t * 84 + 5.5 * Math.cos(t * TAU * 5), 52 + 13 * Math.sin(t * TAU * 5)];
    const hp = []; for (let i = 0; i <= 80; i++) { const q = cp(i / 80); hp.push(q[0], q[1]); }
    R.stroke(hp, { ink: 'B', w: 1.0, smooth: true, taper: 'none' });
    for (let i = 0; i < 20; i++) { const q = cp(i / 19); gluc(q[0], q[1], 3.8); }
    R.text('amylose', 68, 84, 5.2, { al: 'c' }); R.text('coiled, unbranched', 68, 91, 4.2, { al: 'c' });
    const trunk = [[128, 66], [146, 58], [164, 56], [182, 58], [200, 66]];
    R.stroke(trunk.flat(), { ink: 'B', w: 1, smooth: true, taper: 'none' });
    const br = [[146, 58, [[140, 44], [134, 32]]], [[164, 56][0] && 164, 56, [[166, 42], [168, 30]]], [182, 58, [[188, 72], [192, 84]]], [200, 66, [[210, 54], [216, 44]]]];
    br.forEach(b => { let px = b[0], py = b[1]; b[2].forEach(q => { R.line(px, py, q[0], q[1], { ink: 'B', w: 0.9, taper: 'none' }); px = q[0]; py = q[1]; }); R.dot((b[0] + b[2][0][0]) / 2, (b[1] + b[2][0][1]) / 2, 1.5, { ink: 'P' }); b[2].forEach(q => gluc(q[0], q[1], 3.8)); });
    trunk.forEach(p => gluc(p[0], p[1], 4.2));
    R.text('amylopectin', 170, 91, 5.2, { al: 'c' });
    // ---- glycogen: more branched ----
    R.text('glycogen', 335, 18, 7, { al: 'c' });
    const gl = (x, y, ang, depth) => { if (depth > 3) return; const L = [11, 8.5, 7, 6][depth], nx = x + Math.cos(ang) * L, ny = y + Math.sin(ang) * L; R.line(x, y, nx, ny, { ink: 'B', w: 0.75, taper: 'none' }); gluc(nx, ny, 3.0 - depth * 0.15); if (depth > 0) R.dot((x + nx) / 2, (y + ny) / 2, 0.8, { ink: 'P' }); gl(nx, ny, ang - 0.6, depth + 1); gl(nx, ny, ang + 0.6, depth + 1); };
    for (let k = 0; k < 7; k++) gl(335, 57, k * TAU / 7 + 0.2, 0);
    R.circle(335, 57, 4.6, { ink: 'B', w: 0.9, fi: 'P', ft: 0.8 });
    // ---- cellulose: beta chains, alternate units inverted, H-bonds, microfibril ----
    R.text('cellulose', 548, 18, 7, { al: 'c' });
    for (let c = 0; c < 3; c++) {
      const y = 32 + c * 20;
      R.line(462, y, 596, y, { ink: 'B', w: 0.9, taper: 'none' });
      for (let i = 0; i < 8; i++) { const x = 464 + i * 18, flip = (i % 2) ? 1 : -1; R.poly(hexPts(x, y, 6.2, i % 2 ? 0.5 : 0.5 + PI), { ink: 'B', w: 0.85, fi: 'T', ft: 0.5 }); R.line(x, y + flip * 6, x, y + flip * 9, { ink: 'B', w: 0.8, taper: 'none' }); }
    }
    for (let c = 0; c < 2; c++) for (let i = 0; i < 8; i++) R.dashedLine(464 + i * 18, 32 + c * 20 + 7.5, 464 + i * 18, 32 + c * 20 + 12.5, { ink: 'P', w: 0.8, d: 1.0 });
    R.text('\u03B2 chains: alternate units inverted; H bonds between chains', 530, 93, 4.4, { al: 'c' });
    R.ellipse(628, 52, 14, 14, { ink: 'B', w: 1.1, fi: 'T', ft: 0.3 });
    [[0, 0]].concat([0, 1, 2, 3, 4, 5].map(k => [Math.cos(k * TAU / 6) * 6, Math.sin(k * TAU / 6) * 6])).forEach(p => R.dot(628 + p[0], 52 + p[1], 2.2, { ink: 'B' }));
    R.text('microfibril', 628, 78, 4.8, { al: 'c' });
    R.line(14, 99, W - 14, 99, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- Benedict's reagent ----
    R.text('Benedict\u2019s: reducing sugar', 112, 114, 6.2, { al: 'c' });
    const cols = [['T', 0.45, 'B', 0.3], ['TY', 0.55, '', 0], ['Y', 0.7, '', 0], ['YP', 0.55, '', 0], ['P', 0.95, 'Y', 0.5]];
    cols.forEach((c, i) => R.tube(30 + i * 26, 122, 11, 76, { ink: c[0], t: c[1], level: 0.6, ink2: c[2] || undefined, t2: c[3] }));
    R.arrow([24, 214, 150, 214], { ink: 'B', w: 1.1 }); R.text('more reducing sugar', 88, 226, 4.8, { al: 'c' });
    R.waterBath(166, 160, 38, 38, { heat: true }); R.tube(178, 140, 9, 54, { ink: 'T', t: 0.5, level: 0.6 });
    R.line(212, 104, 212, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- non-reducing sugars: negative, hydrolyse with acid, neutralise, then positive ----
    R.text('non-reducing sugar', 326, 114, 6.2, { al: 'c' });
    R.tube(240, 124, 11, 66, { ink: 'T', t: 0.5, level: 0.6, ink2: 'B', t2: 0.3 }); R.text('+ Benedict\u2019s:', 245, 204, 4.4, { al: 'c' }); R.text('stays blue', 245, 211, 4.4, { al: 'c' });
    R.arrow([262, 156, 288, 156], { ink: 'B', w: 1, hs: 3 }); R.text('HCl, boil', 275, 148, 4.2, { al: 'c' });
    R.tube(302, 124, 11, 66, { ink: 'T', t: 0.14, level: 0.6 }); R.text('hydrolysed', 307, 204, 4.4, { al: 'c' });
    R.arrow([324, 156, 350, 156], { ink: 'B', w: 1, hs: 3 }); R.text('neutralise', 337, 148, 4.2, { al: 'c' });
    R.tube(364, 124, 11, 66, { ink: 'T', t: 0.14, level: 0.6 }); R.text('+ alkali', 369, 204, 4.4, { al: 'c' });
    R.arrow([386, 156, 410, 156], { ink: 'B', w: 1, hs: 3 }); R.text('Benedict\u2019s', 398, 148, 4.2, { al: 'c' });
    R.tube(422, 124, 11, 66, { ink: 'P', t: 0.9, level: 0.6, ink2: 'Y', t2: 0.5 }); R.text('brick-red', 427, 204, 4.4, { al: 'c' });
    R.line(438, 104, 438, 232, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- iodine/potassium iodide ----
    R.text('iodine in potassium iodide', 552, 114, 6.2, { al: 'c' });
    R.tube(484, 140, 11, 62, { ink: 'YP', t: 0.45, level: 0.6 }); R.text('no starch:', 489, 214, 4.6, { al: 'c' }); R.text('orange-brown', 489, 221, 4.4, { al: 'c' });
    R.tube(594, 140, 11, 62, { ink: 'B', t: 1, level: 0.6, ink2: 'B', t2: 0.75 }); R.text('starch:', 599, 214, 4.6, { al: 'c' }); R.text('blue-black', 599, 221, 4.4, { al: 'c' });
    R.arrow([506, 170, 580, 170], { ink: 'B', w: 1.1 }); R.text('starch present?', 543, 162, 4.6, { al: 'c' });
    R.stroke([540, 122, 541, 136], { ink: 'B', w: 1.2, taper: 'both' }); R.ellipse(540.5, 123, 2.4, 3.2, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 });
  },
  anim(A, sc) {
    for (let i = 0; i < 4; i++) { const u = A.ph(4.5, i * 0.25); A.dot(185 + Math.sin(u * 12 + i) * 2.4, 154 - 26 * u, 1.5 + u, 'P', 0.7 * (1 - u), i); }
    const d = A.ph(3.4); A.dot(540.5, 136 + 26 * Math.min(1, d * 1.3), 1.5, 'B', d < 0.78 ? 0.9 : 0);
  },
});

/* ---------- 3.1.3 Lipids ---------- */
S({
  id: '3.1.3', num: '3.1.3', title: 'Lipids', topic: '3.1', slot: [0, 1], dna: 'mark',
  covers: ['3.1.3.s1', '3.1.3.s2', '3.1.3.s3', '3.1.3.s4', '3.1.3.s5', '3.1.3.s6', '3.1.3.s7'],
  card: {
    text: 'Triglycerides and phospholipids are two groups of lipid. A triglyceride is formed by condensation of one <b>glycerol</b> and three <b>fatty acids</b> (RCOOH); each condensation forms an <b>ester bond</b>. The R-group of a fatty acid is <b>saturated</b> (no C=C double bonds) or <b>unsaturated</b> (one or more C=C). In a <b>phospholipid</b> one fatty acid is substituted by a phosphate-containing group, so the molecule has a hydrophilic head and hydrophobic tails. Emulsion test: dissolve in ethanol, add to water: a cloudy white emulsion shows lipid.',
    terms: ['triglyceride', 'phospholipid', 'glycerol', 'fatty acid', 'ester bond', 'saturated', 'unsaturated', 'emulsion test'],
    skill: 'Triglyceride formation', eq: MATH(mt('glycerol + 3 fatty acids '), mo('→'), mt(' triglyceride + 3 '), H2O),
    q: 'Explain how the different structures of triglycerides and phospholipids lead to different properties.', a: 'Triglycerides have three hydrophobic fatty-acid tails (insoluble, energy store); phospholipids have a hydrophilic phosphate head and two hydrophobic tails, so form bilayers in water.'
  },
  draw(R, sc) {
    // ---- triglyceride (skeletal): glycerol + 3 fatty acids joined by ester bonds ----
    const gx = 26, ys = [36, 66, 96];
    R.text('glycerol', gx - 4, 22, 5.4, { al: 'c' });
    R.fill(roundBox(gx - 5, 28, 10, 76), { ink: 'T', t: 0.3, wob: 0.15 });
    R.line(gx, ys[0], gx, ys[2], { ink: 'B', w: 1.1, taper: 'none' });
    ['CH_2', 'CH', 'CH_2'].forEach((t, i) => R.text(t, gx - 8, ys[i] + 1.8, 4.2, { al: 'r' }));
    const spec = [{ db: undefined, lab: 'saturated' }, { db: 4, lab: 'unsaturated' }, { db: undefined, lab: 'saturated' }];
    ys.forEach((y, i) => {
      R.line(gx + 1.5, y, gx + 6, y, { ink: 'B', w: 1, taper: 'none' }); R.text('O', gx + 9.4, y + 1.8, 4.8, { al: 'c' });
      R.line(gx + 13, y, gx + 20, y, { ink: 'B', w: 1, taper: 'none' });
      R.line(gx + 19.2, y, gx + 19.2, y - 8, { ink: 'B', w: 0.9, taper: 'none' }); R.line(gx + 21, y, gx + 21, y - 8, { ink: 'B', w: 0.9, taper: 'none' });
      R.text('O', gx + 20, y - 9.6, 4.8, { al: 'c' });
      R.ellipse(gx + 13.5, y - 3.6, 12, 8.6, { ink: 'P', w: 1.1, wob: 0.15 });
      const pts = R.fa(gx + 20, y, 0, 8, 9.2, { db: spec[i].db, bend: 42 });
      R.text(spec[i].lab, 124, y + 2, 4.8, { al: 'l' });
      if (spec[i].db !== undefined) { const m = pts[spec[i].db + 1]; R.ellipse((pts[spec[i].db][0] + m[0]) / 2, (pts[spec[i].db][1] + m[1]) / 2, 7, 5.5, { ink: 'P', w: 1, wob: 0.1 }); R.text('C=C', (pts[spec[i].db][0] + m[0]) / 2, (pts[spec[i].db][1] + m[1]) / 2 - 8, 4.4, { al: 'c' }); }
    });
    R.text('ester bonds', 74, 114, 5, { al: 'c' }); R.arrow([58, 108, 46, 103], { ink: 'P', w: 0.8, hs: 2.4 });
    R.drop(182, 50, 5.2, { label: false }); R.drop(182, 66, 5.2, { label: false }); R.drop(182, 82, 5.2, { label: false }); R.text('3H_2O', 182, 99, 4.8, { al: 'c' });
    // ---- phospholipid ----
    R.line(204, 12, 204, 116, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('phospholipid', 258, 20, 6, { al: 'c' });
    R.circle(224, 38, 8.5, { ink: 'B', w: 1.2, fi: 'T', ft: 0.8 }); R.text('P', 224, 41.2, 7, { al: 'c' });
    R.line(224, 46.5, 224, 56, { ink: 'B', w: 1.1, taper: 'none' });
    R.line(218, 56, 231, 56, { ink: 'B', w: 1.1, taper: 'none' });
    R.fa(218, 56, 90, 8, 6.2, { w: 1 }); R.fa(231, 56, 90, 8, 6.2, { w: 1, db: 3, bend: -30, flip: true });
    R.text('hydrophilic', 236, 32, 4.4, { al: 'l' }); R.text('head', 236, 38, 4.4, { al: 'l' });
    R.text('hydrophobic tails', 246, 112, 4.4, { al: 'c' });
    // bilayer (phospholipids in water)
    for (let i = 0; i < 5; i++) { const x = 268 + i * 9.5;
      R.circle(x, 50, 3.6, { ink: 'B', w: 0.9, fi: 'T', ft: 0.8 }); R.line(x - 1.1, 54, x - 1.4, 66, { ink: 'B', w: 0.8, taper: 'none' }); R.line(x + 1.1, 54, x + 1.4, 66, { ink: 'B', w: 0.8, taper: 'none' });
      R.circle(x, 82, 3.6, { ink: 'B', w: 0.9, fi: 'T', ft: 0.8 }); R.line(x - 1.1, 78, x - 1.4, 66, { ink: 'B', w: 0.8, taper: 'none' }); R.line(x + 1.1, 78, x + 1.4, 66, { ink: 'B', w: 0.8, taper: 'none' }); }
    R.fill(roundBox(262, 56, 48, 20), { ink: 'Y', t: 0.3, wob: 0.1 });
    R.text('water', 288, 42, 4.4, { al: 'c' }); R.text('water', 288, 98, 4.4, { al: 'c' });
    R.line(14, 122, 306, 122, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // ---- emulsion test ----
    R.text('emulsion test', 82, 134, 6, { al: 'c' });
    R.tube(26, 142, 11, 62, { ink: 'Y', t: 0.35, level: 0.5 }); R.text('lipid in', 31, 215, 4.4, { al: 'c' }); R.text('ethanol', 31, 222, 4.4, { al: 'c' });
    R.arrow([48, 170, 78, 170], { ink: 'B', w: 1, hs: 3 }); R.text('add water', 63, 162, 4.4, { al: 'c' });
    R.tube(88, 142, 11, 62, { ink: 'T', t: 0.1, level: 0.6 }); R.stipple([89.5, 168, 97.5, 168, 97.5, 200, 89.5, 200], 90, 0.55, { ink: 'Y', t: 1 });
    R.text('cloudy white:', 93, 215, 4.4, { al: 'c' }); R.text('lipid present', 93, 222, 4.4, { al: 'c' });
    R.tube(134, 142, 11, 62, { ink: 'T', t: 0.1, level: 0.6 }); R.text('stays clear:', 139, 215, 4.4, { al: 'c' }); R.text('no lipid', 139, 222, 4.4, { al: 'c' });
    // ---- triglyceride droplets in water ----
    R.line(176, 126, 176, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('triglycerides in water', 244, 134, 5.6, { al: 'c' });
    R.fill([182, 142, 308, 142, 308, 210, 182, 210], { ink: 'T', t: 0.16, wob: 0.2 });
    R.ellipse(222, 170, 20, 12, { ink: 'B', w: 1, fi: 'Y', ft: 0.75 }); R.ellipse(262, 182, 14, 9, { ink: 'B', w: 1, fi: 'Y', ft: 0.75 }); R.ellipse(282, 158, 10, 7, { ink: 'B', w: 1, fi: 'Y', ft: 0.75 });
    R.text('insoluble hydrophobic droplets', 244, 222, 4.6, { al: 'c' });
  },
  anim(A, sc) {
    for (let i = 0; i < 3; i++) { const p = A.ph(3.4, i * 0.33); A.dot(180 + p * 8, 50 + i * 16 - p * 6, 2.0, 'T', (1 - p) * 0.8, i); }
    const s = A.ph(4); for (let i = 0; i < 7; i++) A.dot(91.5 + (i % 3) * 3.0, 198 - ((s * 40 + i * 9) % 44), 0.8 + (i % 3) * 0.25, 'Y', 0.85, i);
  },
});
