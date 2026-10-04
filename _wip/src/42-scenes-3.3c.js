/* ===================== 3.3.4.1 Mass transport in animals: haemoglobin, circulation, heart, vessels, tissue fluid ===================== */
/* haemoglobin molecule: four subunits (ribbon blobs) with haem discs; o.ox = 0..4 oxygen molecules bound */
function hbMol(R, x, y, s, o = {}) {
  const sub = [[-1, -1, 'P'], [1, -1, 'TY'], [-1, 1, 'TY'], [1, 1, 'P']];
  sub.forEach(([dx, dy, ink], i) => {
    const cx = x + dx * 11.5 * s, cy = y + dy * 11.5 * s, p = [];
    for (let k = 0; k < 20; k++) { const a = k * TAU / 20, rr = 12 * s * (1 + 0.12 * Math.sin(a * 3 + i * 1.7)); p.push(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92); }
    R.fill(p, { ink, t: 0.45, smooth: true, wob: 0.3 }); R.poly(p, { ink: 'B', w: 1.1, smooth: true, wob: 0.4 });
    for (let k = 0; k < 3; k++) R.stroke([cx - 7 * s, cy - 5 * s + k * 4.6 * s, cx - 2 * s, cy - 8 * s + k * 4.6 * s, cx + 3 * s, cy - 4 * s + k * 4.6 * s, cx + 7 * s, cy - 7 * s + k * 4.6 * s], { ink: 'B', w: 0.5, smooth: true, taper: 'none', t: 0.6 });
    R.rect(cx - 2.6 * s, cy - 2.6 * s, 5.2 * s, 5.2 * s, { ink: 'B', w: 0.9, fi: 'P', ft: 0.9, wob: 0.05 }); R.dot(cx, cy, 0.9 * s, { ink: 'B' });
    if (o.ox > i) { const ox = cx + dx * 10.4 * s, oy = cy + dy * 10.4 * s; R.circle(ox, oy, 3.3 * s, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.85 }); R.text('O_2', ox, oy + 1.3 * s, 2.7 * s, { al: 'c' }); }
  });
  return [x, y];
}

/* ---------- 3.3.4.1a Haemoglobin: structure and function ---------- */
S({
  id: '3.3.4.1a', num: '3.3.4.1', sub: 'Haemoglobin and red blood cells: loading, transport and unloading of oxygen', title: 'Mass transport in animals', topic: '3.3', slot: [0, 4], dna: 'mark', ao: 1,
  covers: ['3.3.4.1.s1', '3.3.4.1.s2'],
  card: {
    text: 'The <b>haemoglobins</b> are a group of chemically similar molecules found in many organisms. Haemoglobin is a protein with a <b>quaternary structure</b>: four polypeptide chains, each with a <b>haem</b> group containing an iron ion that binds one oxygen molecule. In the lungs (high partial pressure of oxygen) haemoglobin <b>loads</b> oxygen to form <b>oxyhaemoglobin</b>; red blood cells transport it; in respiring tissues (low partial pressure) oxyhaemoglobin <b>unloads</b> oxygen. Red blood cells are biconcave (large surface area) and have no nucleus, so room for more haemoglobin.',
    terms: ['haemoglobin', 'quaternary structure', 'haem group', 'oxyhaemoglobin', 'loading', 'unloading', 'partial pressure of oxygen', 'red blood cell'],
    skill: 'MS 0.1: units (kPa)', eq: null, eqn: 'Hb + 4O₂ ⇌ HbO₈ (association / dissociation)',
    q: 'Why does haemoglobin unload oxygen in respiring tissues?', a: 'The partial pressure of oxygen there is low, so haemoglobin has a lower affinity for oxygen and releases it.'
  },
  draw(R, sc) {
    R.text('haemoglobin: 4 chains, 4 haem groups', 160, 15, 4.8, { al: 'c' });
    hbMol(R, 96, 78, 1.35, { ox: 0 });
    leader(R, 'polypeptide chain', 80, 54, 40, 34, { size: 4, al: 'c' }); leader(R, 'haem group (Fe^{2+})', 113, 63, 152, 30, { size: 4, al: 'c' });
    R.text('quaternary structure:', 96, 126, 4.2, { al: 'c' }); R.text('4 polypeptide chains', 96, 132, 4.2, { al: 'c' });
    R.line(190, 22, 190, 138, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // red blood cell biconcave section
    R.text('red blood cell', 252, 34, 4.4, { al: 'c' });
    const rb = []; for (let i = 0; i < 24; i++) { const a = i * TAU / 24; rb.push(252 + Math.cos(a) * 30, 74 + Math.sin(a) * 22); }
    R.fill(rb, { ink: 'P', t: 0.8, smooth: true, wob: 0.3 }); R.poly(rb, { ink: 'B', w: 1.3, smooth: true, wob: 0.4 });
    R.ellipse(252, 74, 12, 5.6, { ink: 'B', w: 0.8, fi: 'P', ft: 0.5 });
    R.text('biconcave, no nucleus:', 252, 108, 3.9, { al: 'c' }); R.text('large surface area,', 252, 114, 3.9, { al: 'c' }); R.text('full of haemoglobin', 252, 120, 3.9, { al: 'c' });
    R.line(8, 144, 312, 144, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // loading / unloading cycle
    R.text('loading in lungs', 62, 154, 4.4, { al: 'c' }); R.text('unloading in tissues', 258, 154, 4.4, { al: 'c' });
    hbMol(R, 34, 192, 0.7, { ox: 0 }); R.arrow([56, 186, 100, 186], { ink: 'P', w: 1.1, hs: 2.6 }); R.text('+ O_2', 78, 182, 4, { al: 'c', ink: 'P' }); hbMol(R, 126, 192, 0.7, { ox: 4 });
    R.text('haemoglobin', 34, 216, 3.7, { al: 'c' }); R.text('oxyhaemoglobin', 126, 216, 3.7, { al: 'c' });
    R.text('high p_{O2}: high affinity', 80, 230, 3.9, { al: 'c' });
    hbMol(R, 200, 192, 0.7, { ox: 4 }); R.arrow([228, 186, 276, 186], { ink: 'T', w: 1.1, hs: 2.6 }); R.text('releases O_2', 252, 182, 4, { al: 'c', ink: 'T' }); hbMol(R, 302, 192, 0.7, { ox: 0 });
    R.text('low p_{O2}: lower affinity', 252, 230, 3.9, { al: 'c' });
    R.line(160, 150, 160, 236, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(88 + p * 50, 186, 2.6, 'P', 0.9, 1); A.dot(236 + p * 40, 186, 2.6, 'P', 0.9, 2); },
});

/* ---------- 3.3.4.1b Oxyhaemoglobin dissociation curve; cooperative binding ---------- */
S({
  id: '3.3.4.1b', num: '3.3.4.1', sub: 'The oxyhaemoglobin dissociation curve and cooperative binding of oxygen', title: 'Mass transport in animals', topic: '3.3', slot: [1, 4], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.3.4.1.s3', '3.3.4.1.s4'],
  card: {
    text: 'The <b>oxyhaemoglobin dissociation curve</b> plots % saturation of haemoglobin against the partial pressure of oxygen (kPa). It is S-shaped because binding is <b>cooperative</b>: the binding of the first oxygen changes the shape of haemoglobin, making it easier for further oxygens to bind (steep middle). At high pO₂ in the lungs (about 13 kPa) haemoglobin is almost saturated (loading); at the low pO₂ of respiring tissues (about 5 kPa for resting muscle) it unloads a large fraction of its oxygen. A small fall in pO₂ gives a large fall in saturation where the curve is steep.',
    terms: ['dissociation curve', '% saturation', 'partial pressure of oxygen', 'kPa', 'cooperative binding', 'affinity', 'loading', 'unloading'],
    skill: 'MS 1.3: read values from a graph', eq: MATH(mt('% unloaded '), mo('='), mt('% saturation in lungs'), mo('−'), mt('% saturation in tissues')),
    q: 'Why is the curve S-shaped?', a: 'The first oxygen to bind changes haemoglobin’s shape, making it easier for the next ones (cooperativity); at the end the last binding site is hardest to fill, so the curve flattens.'
  },
  draw(R, sc) {
    R.text('oxyhaemoglobin dissociation curve', 192, 15, 5, { al: 'c' });
    const g = R.graph(34, 32, 256, 170, { xmin: 0, xmax: 14, ymin: 0, ymax: 100, xl: 'partial pressure of oxygen / kPa', yl: '% saturation of haemoglobin', xt: [[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10'], [12, '12'], [14, '14']], yt: [[0, '0'], [20, '20'], [40, '40'], [60, '60'], [80, '80'], [100, '100']], fs: 4.2, xly: 14, ylx: 15, paper: 8 }).axes();
    const sat = p => 100 * Math.pow(p, 2.6) / (Math.pow(p, 2.6) + Math.pow(3.6, 2.6));
    g.curve(sat, { ink: 'P', w: 1.9, n: 70 });
    g.dashed(13, 0, 13, sat(13), { ink: 'T', w: 0.9 }); g.dashed(0, sat(13), 13, sat(13), { ink: 'T', w: 0.9 });
    g.dashed(5, 0, 5, sat(5), { ink: 'B', w: 0.9 }); g.dashed(0, sat(5), 5, sat(5), { ink: 'B', w: 0.9 });
    R.circle(g.X(13), g.Y(sat(13)), 2.2, { ink: 'T', w: 1.1 }); R.circle(g.X(5), g.Y(sat(5)), 2.2, { ink: 'B', w: 1.1 });
    R.text('lungs: ≈ 13 kPa, about 97 %', g.X(13) - 4, g.Y(sat(13)) + 12, 4, { al: 'r', ink: 'T' }); R.text('resting tissue: ≈ 5 kPa, about 70 %', g.X(5) + 4, g.Y(sat(5)) + 10, 4, { al: 'l' });
    const u0 = g.X(0) + 6; R.arrow([g.X(13) + 4, g.Y(sat(13)), g.X(13) + 4, g.Y(sat(5))], { ink: 'P', w: 1, hs: 2.6, both: true }); R.text('unloaded', g.X(13) + 8, (g.Y(sat(13)) + g.Y(sat(5))) / 2 + 1, 3.7, { al: 'l', ink: 'P' });
    R.text('first O_2 hard to load', g.X(0.4), g.Y(14), 3.7, { al: 'l' });
    R.text('steep: easy to load', g.X(2.9), g.Y(50), 3.7, { al: 'r' });
    R.text('plateau: almost full', g.X(8), g.Y(88), 3.7, { al: 'l' });
    R.line(318, 22, 318, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // cooperative binding: Hb with 0,1,2,3,4 O2
    R.text('cooperative binding', 442, 28, 4.8, { al: 'c' });
    [0, 1, 3, 4].forEach((n, i) => { const x = 346 + i * 74; hbMol(R, x, 74, 0.82, { ox: n }); });
        ['first O_2 binds with difficulty', 'and changes the shape', 'of haemoglobin', '→ the next O_2 binds more easily', '→ the last site is the hardest to fill'].forEach((t, i) => R.text(t, 442, 118 + i * 8, 4.2, { al: 'c' }));
    R.text('0', 346, 52, 4, { al: 'c' }); R.text('1', 420, 52, 4, { al: 'c' }); R.text('3', 494, 52, 4, { al: 'c' }); R.text('4', 568, 52, 4, { al: 'c' }); R.text('O_2 bound', 360, 46, 3.4, { al: 'c' });
    R.line(332, 172, 556, 172, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    ['steep part of the curve:', 'a small fall in p_{O2} causes a large fall in saturation', '= large release of O_2 to respiring cells'].forEach((t, i) => R.text(t, 442, 188 + i * 8, 4.2, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(7); const x = p * 13, y = 100 * Math.pow(x, 2.6) / (Math.pow(x, 2.6) + Math.pow(3.6, 2.6)); A.dot(34 + x / 14 * 256, 202 - y * 1.7, 2.4, 'B', 0.9, 1); },
});

/* ---------- 3.3.4.1c Bohr effect and different haemoglobins ---------- */
S({
  id: '3.3.4.1c', num: '3.3.4.1', sub: 'The Bohr effect; haemoglobins adapted to different environments', title: 'Mass transport in animals', topic: '3.3', slot: [3, 4], dna: 'mark', ao: 3,
  covers: ['3.3.4.1.s5', '3.3.4.1.s6'],
  card: {
    text: 'A higher concentration (partial pressure) of <b>carbon dioxide</b> lowers haemoglobin’s affinity for oxygen, so the dissociation curve shifts <b>to the right</b>: at any given pO₂ the haemoglobin is less saturated, releasing more oxygen to actively respiring tissues. This is the <b>Bohr effect</b>. Many animals have <b>different types of haemoglobin</b> adapted to their environment: haemoglobin with a curve to the <b>left</b> (higher affinity) suits low-oxygen habitats, e.g. a lugworm in sand or a fetus; haemoglobin with a curve to the <b>right</b> suits highly active animals or those with a high metabolic rate.',
    terms: ['Bohr effect', 'carbon dioxide', 'shift to the right', 'affinity', 'lugworm', 'adaptation', 'metabolic rate'],
    skill: 'Interpret shifted curves', eq: null,
    q: 'Which way does the curve shift for an animal living in a low-oxygen burrow, and why?', a: 'To the left: its haemoglobin has a higher affinity for oxygen, so it loads oxygen even at low partial pressures.'
  },
  draw(R, sc) {
    R.text('shifting the curve', 160, 14, 5.2, { al: 'c' });
    const sat = (p, k) => 100 * Math.pow(p, 2.6) / (Math.pow(p, 2.6) + Math.pow(k, 2.6));
    // Bohr
    const g = R.graph(34, 28, 168, 92, { xmin: 0, xmax: 14, ymin: 0, ymax: 100, xl: 'p_{O2} / kPa', yl: '% saturation', xt: [[0, '0'], [5, '5'], [10, '10']], yt: [[0, '0'], [50, '50'], [100, '100']], fs: 3.7, xly: 12, ylx: 12, paper: 0 }).axes();
    g.curve(p => sat(p, 3.6), { ink: 'T', w: 1.4 }); g.curve(p => sat(p, 5.4), { ink: 'P', w: 1.4 });
    g.dashed(5, 0, 5, sat(5, 3.6), { ink: 'B', w: 0.6 }); g.dashed(0, sat(5, 3.6), 5, sat(5, 3.6), { ink: 'B', w: 0.6 }); g.dashed(0, sat(5, 5.4), 5, sat(5, 5.4), { ink: 'B', w: 0.6 });
    R.arrow([g.X(6.4), g.Y(22), g.X(8.6), g.Y(22)], { ink: 'B', w: 1, hs: 2.4 });
    R.text('low CO_2', g.X(3.6), g.Y(96), 3.8, { al: 'r', ink: 'T' }); R.text('high CO_2', g.X(8), g.Y(54), 3.8, { al: 'l', ink: 'P' });
    R.text('Bohr effect', 262, 40, 4.8, { al: 'c', ink: 'P' });
    ['more CO_2 from', 'respiring tissue →', 'curve shifts right:', 'less saturated at', 'the same p_{O2},', 'so more O_2 is', 'released'].forEach((t, i) => R.text(t, 262, 52 + i * 7.2, 3.9, { al: 'c' }));
    R.line(8, 144, 312, 144, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // different haemoglobins
    const g2 = R.graph(34, 156, 168, 62, { xmin: 0, xmax: 14, ymin: 0, ymax: 100, xl: 'p_{O2} / kPa', yl: '% saturation', xt: [], yt: [], fs: 3.7, xly: 11, ylx: 6, paper: 0 }).axes();
    g2.curve(p => sat(p, 2.2), { ink: 'T', w: 1.3 }); g2.curve(p => sat(p, 3.6), { ink: 'B', w: 1.3 }); g2.curve(p => sat(p, 5.4), { ink: 'P', w: 1.3 });
    R.text('human', g2.X(8.8), g2.Y(78), 3.7, { al: 'l', ink: 'B' }); R.arrow([g2.X(4), g2.Y(18), g2.X(1.4), g2.Y(18)], { ink: 'T', w: 0.8, hs: 2 }); R.arrow([g2.X(7), g2.Y(18), g2.X(9.6), g2.Y(18)], { ink: 'P', w: 0.8, hs: 2 });
    R.text('left:', 214, 160, 4.4, { al: 'l', ink: 'T' }); ['higher affinity: low-O_2', 'habitats, e.g. lugworm', 'in sand, or a fetus'].forEach((t, i) => R.text(t, 214, 167 + i * 5.8, 3.7, { al: 'l' }));
    R.text('right:', 214, 192, 4.4, { al: 'l', ink: 'P' }); ['lower affinity: very', 'active animals with a', 'high metabolic rate'].forEach((t, i) => R.text(t, 214, 199 + i * 5.8, 3.7, { al: 'l' }));
    R.text('different animals, different haemoglobins', 160, 238, 3.9, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(34 + p * 168, 120 - (100 * Math.pow(p * 14, 2.6) / (Math.pow(p * 14, 2.6) + Math.pow(5.4, 2.6))) * 0.92, 2, 'P', 0.9, 1); },
});
