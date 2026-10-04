/* ===================== 3.7.3 Evolution may lead to speciation ===================== */
const bell = (x, mu, sd) => Math.exp(-0.5 * Math.pow((x - mu) / sd, 2));
function beetle(R, x, y, ink, ft = 0.55, rot = 0, s = 1) {
  R.push(x, y, rad(rot), s);
  R.ellipse(0, 0, 6, 3.6, { ink: 'B', w: 0.9, fi: ink, ft, wob: 0.1 }); R.line(0, -3.6, 0, 3.6, { ink: 'B', w: 0.5, taper: 'none' });
  [-3, 0, 3].forEach(dx => { R.line(dx, -3.4, dx - 1.6, -6.2, { ink: 'B', w: 0.5, taper: 'none' }); R.line(dx, 3.4, dx - 1.6, 6.2, { ink: 'B', w: 0.5, taper: 'none' }); });
  R.circle(6.4, 0, 1.8, { ink: 'B', w: 0.7, fi: 'B', ft: 0.8 });
  R.pop();
}

/* ---------- 3.7.3a Variation and natural selection ---------- */
S({
  id: '3.7.3a', num: '3.7.3', sub: 'Sources of variation and natural selection', title: 'Evolution may lead to speciation', topic: '3.7', slot: [0, 4], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.7.3.s1', '3.7.3.s2', '3.7.3.s3', '3.7.3.s4', '3.7.3.s6'],
  card: {
    text: 'Individuals in a population show a wide range of variation in <b>phenotype</b> because of <b>genetic</b> and <b>environmental</b> factors. The primary source of genetic variation is <b>mutation</b>; <b>meiosis</b> (independent segregation and crossing over) and the <b>random fertilisation</b> of gametes produce further variation. <b>Predation</b>, <b>disease</b> and <b>competition</b> for the means of survival cause <b>differential survival and reproduction</b>, i.e. <b>natural selection</b>. Organisms with phenotypes that give a selective advantage are more likely to survive and produce more offspring, passing on their favourable alleles, so the frequency of those alleles in the gene pool increases from generation to generation. <b>Evolution</b> is a change in the allele frequencies in a population.',
    terms: ['variation', 'mutation', 'meiosis', 'random fertilisation', 'selection pressure', 'predation', 'disease', 'competition', 'selective advantage', 'allele frequency', 'evolution'],
    skill: 'MS 3.1 / AO3: interpret a graph of allele frequency over generations', eq: null,
    q: 'Explain how natural selection can change the frequency of an allele in a population.', a: 'Individuals with the advantageous allele survive and reproduce more, so more of their offspring inherit it; over generations the frequency of that allele in the gene pool increases.'
  },
  draw(R, sc) {
    R.text('where variation comes from', 106, 14, 4.4, { al: 'c' });
    [['mutation', 'primary source of new alleles'], ['meiosis', 'independent segregation, crossing over'], ['random fertilisation', 'of gametes'], ['environment', 'affects the phenotype too']].forEach((t, i) => { R.circle(20, 34 + i * 26, 7, { ink: 'B', w: 0.9, fi: ['P', 'T', 'Y', 'TY'][i], ft: 0.4 }); R.text(String(i + 1), 20, 36.6 + i * 26, 5, { al: 'c' }); R.text(t[0], 34, 32 + i * 26, 4.2, { al: 'l', ink: 'P' }); R.text(t[1], 34, 40 + i * 26, 3.6, { al: 'l' }); });
    R.text('phenotype = genotype + environment', 106, 148, 3.9, { al: 'c' });
    // mutation illustration
    R.helix(24, 176, 100, 176, { amp: 7, turns: 3, w: 0.8 }); R.circle(62, 176, 4, { ink: 'P', w: 1.3 }); R.text('a mutation', 62, 194, 3.6, { al: 'c', ink: 'P' });
    [['light', 128], ['dark', 168]].forEach(([n, x], i) => { beetle(R, x, 176, i ? 'B' : 'Y', i ? 0.7 : 0.3); R.text(n, x, 190, 3.4, { al: 'c' }); }); R.text('variation in phenotype', 148, 204, 3.6, { al: 'c' });
    R.line(212, 14, 212, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // selection
    R.text('differential survival and reproduction', 326, 14, 4.4, { al: 'c' });
    R.rect(222, 24, 208, 70, { ink: 'B', w: 0.9, fi: 'B', ft: 0.2, wob: 0.2 });
    [[240, 44, 'Y'], [262, 70, 'B'], [284, 46, 'B'], [306, 76, 'Y'], [328, 52, 'B'], [350, 80, 'B'], [372, 46, 'Y'], [394, 72, 'B'], [412, 52, 'B']].forEach(([x, y, c], i) => beetle(R, x, y, c, c === 'B' ? 0.7 : 0.3, (i * 37) % 70 - 35));
    R.arrow([306, 102, 306, 86], { ink: 'P', w: 1.2, hs: 3 }); R.text('predation (and disease, competition)', 326, 112, 3.8, { al: 'c', ink: 'P' }); R.text('remove more of the light beetles', 326, 119, 3.6, { al: 'c' });
    ['survivors with the advantageous allele', 'reproduce more and pass on that allele', '', 'the frequency of the allele in the gene pool', 'rises from generation to generation'].forEach((t, i) => { if (t) R.text(t, 326, 138 + i * 8, 3.9, { al: 'c', ink: i >= 3 ? 'P' : 'B' }); });
    ['predation', 'disease', 'competition for the means of survival'].forEach((t, i) => { R.rect(222 + i * 70, 190, 66, 14, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.12 }); });
    R.text('predation', 255, 199.5, 3.4, { al: 'c' }); R.text('disease', 325, 199.5, 3.4, { al: 'c' }); R.text('competition', 395, 199.5, 3.4, { al: 'c' });
    R.text('selection pressures', 326, 186, 3.6, { al: 'c' });
    R.text('natural selection', 326, 224, 4.2, { al: 'c', ink: 'P' });
    R.line(438, 14, 438, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // graph
    R.text('allele frequency changes', 548, 14, 4.4, { al: 'c' });
    const g = R.graph(474, 30, 160, 126, { xmin: 0, xmax: 12, ymin: 0, ymax: 1, xl: 'generation', yl: 'frequency of the advantageous allele', xt: [0, 4, 8, 12], yt: [[0, '0'], [0.5, '0.5'], [1, '1']], fs: 3.5, xly: 10, ylx: 15 }).axes();
    g.curve(x => 1 / (1 + 49 * Math.exp(-0.75 * x)), { ink: 'P', w: 1.7, n: 60 });
    g.hline(0.5, { dash: true, t: 0.5 });
    R.text('a change in allele frequency', 548, 190, 3.9, { al: 'c' }); R.text('in a population is evolution', 548, 198, 3.9, { al: 'c', ink: 'P' });
    R.text('generations of selection', 548, 212, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(8), x = p * 12; A.dot(474 + x / 12 * 160, 30 + 126 - 1 / (1 + 49 * Math.exp(-0.75 * x)) * 126, 2.2, 'P', 0.95, 1); },
});

/* ---------- 3.7.3b Types of selection ---------- */
S({
  id: '3.7.3b', num: '3.7.3', sub: 'Stabilising, directional and disruptive selection', title: 'Evolution may lead to speciation', topic: '3.7', slot: [2, 4], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.7.3.s5'],
  card: {
    text: 'Selection affects the distribution of a phenotype. <b>Stabilising selection</b> favours the average phenotype and acts against both extremes (when the environment is stable), reducing variation. <b>Directional selection</b> favours one extreme (when the environment changes, e.g. antibiotic resistance), so the mean shifts. <b>Disruptive selection</b> favours both extremes and acts against the intermediate, producing two peaks; it can lead to the formation of new species. In each case the allele frequencies in the population change.',
    terms: ['stabilising selection', 'directional selection', 'disruptive selection', 'normal distribution', 'extreme phenotype', 'selection pressure'],
    skill: 'AO3: identify the type of selection from distribution curves', eq: null,
    q: 'A population’s height distribution before and after selection shows a higher, narrower peak at the same mean. Which type of selection is this?', a: 'Stabilising selection: extremes are selected against, the mean stays the same and variation decreases.'
  },
  draw(R, sc) {
    const panels = [
      ['stabilising selection', 'average favoured; extremes selected against', 'stable environment', x => bell(x, 5, 1.7), x => 1.55 * bell(x, 5, 0.95), 'extremes'],
      ['directional selection', 'one extreme favoured; the mean shifts', 'environment changes', x => bell(x, 4.4, 1.5), x => bell(x, 6.4, 1.5), 'one extreme'],
      ['disruptive selection', 'both extremes favoured; intermediate lost', 'e.g. two habitats', x => bell(x, 5, 1.7), x => 0.75 * (bell(x, 2.9, 0.85) + bell(x, 7.1, 0.85)), 'intermediate'],
    ];
    panels.forEach(([nm, sub, env, f0, f1], i) => {
      const x0 = 12 + i * 218;
      R.text(nm, x0 + 100, 14, 4.4, { al: 'c', ink: 'P' });
      const g = R.graph(x0 + 20, 28, 170, 108, { xmin: 0, xmax: 10, ymin: 0, ymax: 1.7, xl: 'phenotype (e.g. size)', yl: 'frequency', fs: 3.5, xly: 9, ylx: 5 }).axes();
      // selected-against shading
      const against = i === 0 ? [[0, 2.4], [7.6, 10]] : i === 1 ? [[0, 3]] : [[3.8, 6.2]];
      against.forEach(([a, b]) => { const pts = []; for (let k = 0; k <= 14; k++) { const xv = a + (b - a) * k / 14; pts.push(g.X(xv), g.Y(f0(xv))); } pts.push(g.X(b), g.Y(0), g.X(a), g.Y(0)); R.hatch(pts, 55, 2.6, { ink: 'B', w: 0.4, t: 0.7 }); });
      g.curve(f0, { ink: 'T', w: 1.3, n: 60 }); g.curve(f1, { ink: 'P', w: 1.9, n: 60 });
      if (i === 1) { R.arrow([g.X(4.4), g.Y(1.12), g.X(6.4), g.Y(1.12)], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('mean shifts', g.X(5.4), g.Y(1.3), 3.4, { al: 'c' }); }
      R.line(x0 + 4, 160, x0 + 196, 160, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
      R.text(sub, x0 + 100, 172, 3.7, { al: 'c' }); R.text(env, x0 + 100, 181, 3.6, { al: 'c', ink: 'T' });
      R.line(x0 + 150, 200, x0 + 168, 200, { ink: 'T', w: 1.3, taper: 'none' }); R.text('before', x0 + 172, 201.6, 3.4, { al: 'l' }); R.line(x0 + 150, 208, x0 + 168, 208, { ink: 'P', w: 1.9, taper: 'none' }); R.text('after', x0 + 172, 209.6, 3.4, { al: 'l' });
      R.rect(x0 + 14, 194, 14, 8, { ink: 'B', w: 0, fi: null }); R.hatch([x0 + 14, 195, x0 + 28, 195, x0 + 28, 203, x0 + 14, 203], 55, 2.6, { ink: 'B', w: 0.4, t: 0.7 }); R.text('selected against', x0 + 32, 201.4, 3.4, { al: 'l' });
      if (i < 2) R.line(x0 + 209, 20, x0 + 209, 216, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    });
    R.text('all three change allele frequencies; disruptive selection can lead to speciation', 330, 228, 3.9, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); [0, 1, 2].forEach(i => { A.dot(12 + i * 218 + 20 + p * 170, 28 + 108 - ([x => 1.55 * bell(x, 5, 0.95), x => bell(x, 6.4, 1.5), x => 0.75 * (bell(x, 2.9, 0.85) + bell(x, 7.1, 0.85))][i](p * 10) / 1.7) * 108, 1.8, 'P', 0.9, i); }); },
});

/* ---------- 3.7.3c Genetic drift ---------- */
S({
  id: '3.7.3c', num: '3.7.3', sub: 'Genetic drift is important in small populations', title: 'Evolution may lead to speciation', topic: '3.7', slot: [0, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.7.3.s7', '3.7.3.s8'],
  card: {
    text: '<b>Genetic drift</b> is a change in allele frequency caused by chance: which alleles happen to be passed on to the next generation is a random sample of those in the parents. In a <b>small population</b> each individual carries a large fraction of the alleles, so chance can change the frequencies a lot and an allele can be lost altogether (or fixed) in a few generations. In a <b>large population</b> chance effects average out and allele frequencies change little. Unlike natural selection, drift is not related to how well an allele suits the environment. It can cause populations that are isolated from each other to diverge.',
    terms: ['genetic drift', 'small population', 'large population', 'random sampling', 'allele frequency', 'chance', 'allele loss'],
    skill: 'MS 1.5: random sampling; simulate drift with beads', eq: null,
    q: 'Why is genetic drift important only in small populations?', a: 'In a small population each allele is carried by only a few individuals, so by chance an allele can fail to be passed on and its frequency changes greatly; in a large population chance effects are averaged out.'
  },
  draw(R, sc) {
    R.text('random sampling of alleles each generation', 160, 14, 4.3, { al: 'c' });
    // small population sample
    R.text('small population', 78, 28, 4, { al: 'c', ink: 'P' });
    const dots = (x0, y0, n, cols, lost) => { for (let k = 0; k < n; k++) R.circle(x0 + (k % cols) * 12, y0 + Math.floor(k / cols) * 12, 4, { ink: 'B', w: 0.8, fi: (k * 7 % 5 < 2) ? 'T' : 'P', ft: 0.5 }); };
    dots(32, 40, 10, 5);
    R.arrow([78, 70, 78, 82], { ink: 'B', w: 1, hs: 2.6 }); R.text('chance: some alleles not passed on', 78, 92, 3.5, { al: 'c' });
    for (let k = 0; k < 10; k++) R.circle(32 + (k % 5) * 12, 104 + Math.floor(k / 5) * 12, 4, { ink: 'B', w: 0.8, fi: (k * 3 % 5 < 1) ? 'T' : 'P', ft: 0.5 });
    R.text('frequency of a blue allele has changed a lot', 78, 140, 3.4, { al: 'c' });
    R.text('large population', 238, 28, 4, { al: 'c', ink: 'T' });
    for (let k = 0; k < 40; k++) R.circle(190 + (k % 10) * 10, 38 + Math.floor(k / 10) * 10, 3, { ink: 'B', w: 0.6, fi: (k * 7 % 5 < 2) ? 'T' : 'P', ft: 0.5 });
    R.arrow([238, 82, 238, 92], { ink: 'B', w: 1, hs: 2.6 });
    for (let k = 0; k < 40; k++) R.circle(190 + (k % 10) * 10, 100 + Math.floor(k / 10) * 10, 3, { ink: 'B', w: 0.6, fi: (k * 7 % 5 < 2 || k === 3) ? 'T' : 'P', ft: 0.5 });
    R.text('frequency changes little', 238, 148, 3.5, { al: 'c' });
    R.line(8, 158, 330, 158, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    ['not related to how well an allele suits the environment', 'an allele can be lost altogether in a small population', 'isolated populations can drift apart'].forEach((t, i) => R.text(t, 170, 172 + i * 9, 3.9, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
    R.text('only a chance effect: no selective advantage', 170, 208, 3.9, { al: 'c', ink: 'T' });
    R.line(336, 14, 336, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // graphs
    const gr = (x0, ttl, ink, lines, ink2) => {
      R.text(ttl, x0 + 70, 28, 4, { al: 'c', ink: ink2 });
      const g = R.graph(x0 + 20, 36, 130, 160, { xmin: 0, xmax: 20, ymin: 0, ymax: 1, xl: 'generation', yl: 'allele frequency', xt: [0, 10, 20], yt: [[0, '0'], [0.5, '0.5'], [1, '1']], fs: 3.4, xly: 10, ylx: 14 }).axes();
      lines.forEach((l, i) => g.curve(l, { ink, w: 1.3, n: 40, wob: 0.3 }));
      return g;
    };
    const walk = (seed, sd, lim) => { let v = 0.5; const out = [0, 0.5]; for (let k = 1; k <= 20; k++) { const r = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453; const u = (r - Math.floor(r)) - 0.5; if (v > 0 && v < 1) v = Math.max(0, Math.min(1, v + u * sd)); out.push(k, v); } return out; };
    const gs = gr(346, 'small population', 'P', [], 'P'), gl = gr(500, 'large population', 'T', [], 'T');
    [3, 8, 15, 23, 31].forEach(sd => gs.curve(walk(sd, 0.9), { ink: 'P', w: 1.2, n: 1 })); [3, 8, 15, 23, 31].forEach(sd => gl.curve(walk(sd, 0.06), { ink: 'T', w: 1.2, n: 1 }));
    R.text('alleles can be lost (0) or fixed (1)', 416, 214, 3.6, { al: 'c' }); R.text('stays near the starting value', 570, 214, 3.6, { al: 'c' });
    R.text('five simulated populations in each graph', 494, 226, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); for (let k = 0; k < 3; k++) A.dot(32 + ((p * 8 + k * 3) % 5) * 12, 104 + Math.floor((p * 8 + k * 3) % 10 / 5) * 12, 1.4, 'Y', 0.7, k); },
});

/* ---------- 3.7.3d Speciation ---------- */
S({
  id: '3.7.3d', num: '3.7.3', sub: 'Reproductive separation: allopatric and sympatric speciation', title: 'Evolution may lead to speciation', topic: '3.7', slot: [2, 5], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.7.3.s9', '3.7.3.s10', '3.7.3.s11'],
  card: {
    text: '<b>Speciation</b> is the formation of new species from existing ones. Reproductive separation of two populations means there is no <b>gene flow</b> between them, so their <b>gene pools</b> accumulate differences (through mutation, natural selection and genetic drift). New species arise when the genetic differences mean members of the populations can no longer interbreed and produce <b>fertile offspring</b>. In <b>allopatric speciation</b> the populations are separated by a geographical barrier (e.g. a river, mountain range or sea) and selection pressures in their different habitats differ. In <b>sympatric speciation</b> new species arise in the same area, because of reproductive isolation such as different breeding times, behaviour or changes in chromosome number. Over a very long time, repeated speciation has produced the great diversity of species.',
    terms: ['speciation', 'allopatric speciation', 'sympatric speciation', 'geographical barrier', 'reproductive isolation', 'gene flow', 'fertile offspring', 'gene pool'],
    skill: 'AO2: explain how isolation can lead to a new species', eq: null,
    q: 'Describe how allopatric speciation could occur after a population is split by a new river.', a: 'The river stops gene flow; each population experiences different selection pressures and mutations, so allele frequencies diverge; eventually they cannot interbreed to produce fertile offspring, so they are separate species.'
  },
  draw(R, sc) {
    R.text('allopatric speciation: a geographical barrier', 162, 14, 4.3, { al: 'c', ink: 'P' });
    const step = (x, y, w, lbl, ink, draw) => { R.rrect(x, y, w, 54, 6, { ink: 'B', w: 0.9, fi: ink, ft: 0.08, wob: 0.3 }); draw(x, y, w); R.text(lbl, x + w / 2, y + 66, 3.5, { al: 'c' }); };
    step(10, 24, 100, '1  one population, with gene flow', 'Y', (x, y, w) => { R.ellipse(x + w / 2, y + 27, 38, 18, { ink: 'B', w: 1, fi: 'Y', ft: 0.2, wob: 0.4 }); [[-18, -4], [-4, 6], [10, -6], [20, 5], [0, -10]].forEach(([dx, dy]) => beetle(R, x + w / 2 + dx, y + 27 + dy, 'B', 0.5, dx * 3, 0.7)); });
    R.arrow([114, 51, 124, 51], { ink: 'B', w: 1, hs: 2.4 });
    step(128, 24, 100, '2  barrier splits it: no gene flow', 'T', (x, y, w) => { R.ellipse(x + 24, y + 27, 20, 14, { ink: 'B', w: 1, fi: 'Y', ft: 0.2, wob: 0.4 }); R.ellipse(x + w - 24, y + 27, 20, 14, { ink: 'B', w: 1, fi: 'Y', ft: 0.2, wob: 0.4 }); R.stroke([x + 50, y + 4, x + 46, y + 20, x + 54, y + 34, x + 50, y + 50], { ink: 'T', w: 3, smooth: true, taper: 'none', t: 0.8 }); beetle(R, x + 24, y + 27, 'B', 0.5, 0, 0.8); beetle(R, x + w - 24, y + 27, 'B', 0.5, 20, 0.8); });
    R.arrow([232, 51, 242, 51], { ink: 'B', w: 1, hs: 2.4 });
    step(246, 24, 100, '3  different selection, mutation, drift', 'P', (x, y, w) => { R.ellipse(x + 24, y + 27, 20, 14, { ink: 'B', w: 1, fi: 'Y', ft: 0.3, wob: 0.4 }); R.ellipse(x + w - 24, y + 27, 20, 14, { ink: 'B', w: 1, fi: 'T', ft: 0.3, wob: 0.4 }); R.stroke([x + 50, y + 4, x + 46, y + 20, x + 54, y + 34, x + 50, y + 50], { ink: 'T', w: 3, smooth: true, taper: 'none', t: 0.8 }); beetle(R, x + 24, y + 27, 'Y', 0.4, 0, 0.8); beetle(R, x + w - 24, y + 27, 'B', 0.8, 20, 0.8); });
    R.arrow([350, 51, 360, 51], { ink: 'B', w: 1, hs: 2.4 });
    step(364, 24, 80, '4  cannot interbreed', 'Y', (x, y, w) => { beetle(R, x + 20, y + 20, 'Y', 0.4, 0, 0.8); beetle(R, x + w - 20, y + 20, 'B', 0.8, 0, 0.8); R.line(x + 30, y + 40, x + w - 30, y + 40, { ink: 'P', w: 1.2, taper: 'none' }); R.line(x + 34, y + 34, x + w - 34, y + 46, { ink: 'P', w: 1.2, taper: 'none' }); R.line(x + 34, y + 46, x + w - 34, y + 34, { ink: 'P', w: 1.2, taper: 'none' }); });
    R.text('two species: no fertile offspring', 404, 98, 3.5, { al: 'c', ink: 'P' });
    R.line(8, 112, 450, 112, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('sympatric speciation: same area', 162, 124, 4.3, { al: 'c', ink: 'T' });
    R.ellipse(60, 164, 46, 24, { ink: 'B', w: 1, fi: 'Y', ft: 0.12, wob: 0.4 });
    [[-24, -4, 'Y'], [-8, 8, 'B'], [8, -8, 'Y'], [22, 6, 'B'], [-2, -6, 'B']].forEach(([dx, dy, c], i) => beetle(R, 60 + dx, 164 + dy, c, c === 'B' ? 0.7 : 0.3, dx * 4, 0.8));
    R.text('one population in one place', 60, 200, 3.5, { al: 'c' });
    R.arrow([110, 164, 130, 164], { ink: 'B', w: 1, hs: 2.4 });
    ['reproductive isolation arises within it:', 'e.g. breeding at different times, different', 'courtship behaviour, or a change in chromosome', 'number (common in plants)'].forEach((t, i) => R.text(t, 136, 150 + i * 8, 3.7, { al: 'l' }));
    R.arrow([262, 160, 280, 160], { ink: 'B', w: 1, hs: 2.4 });
    beetle(R, 300, 154, 'Y', 0.4, 0, 0.9); beetle(R, 326, 168, 'B', 0.8, 0, 0.9); R.text('two species', 314, 186, 3.6, { al: 'c', ink: 'T' });
    R.text('in the same area', 314, 193, 3.4, { al: 'c' });
    R.text('requirement for a new species:', 250, 214, 3.9, { al: 'c' }); R.text('members can no longer interbreed and produce fertile offspring', 250, 222, 3.9, { al: 'c', ink: 'P' });
    R.line(458, 14, 458, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // tree of diversity
    R.text('repeated speciation over a long time', 558, 14, 4.2, { al: 'c' });
    const stem = (a, b) => R.stroke([a[0], a[1], b[0], b[1]], { ink: 'B', w: 1.2, taper: 'none', wob: 0.25 });
    const A0 = [474, 120], t = [[510, 120], [548, 84], [548, 160], [590, 56], [590, 108], [590, 140], [590, 184], [632, 40], [632, 72], [632, 100], [632, 116], [632, 134], [632, 150], [632, 176], [632, 196]];
    stem(A0, t[0]); stem(t[0], t[1]); stem(t[0], t[2]); stem(t[1], t[3]); stem(t[1], t[4]); stem(t[2], t[5]); stem(t[2], t[6]);
    stem(t[3], t[7]); stem(t[3], t[8]); stem(t[4], t[9]); stem(t[4], t[10]); stem(t[5], t[11]); stem(t[5], t[12]); stem(t[6], t[13]); stem(t[6], t[14]);
    for (let k = 7; k < 15; k++) R.circle(t[k][0], t[k][1], 3, { ink: 'B', w: 0.8, fi: ['Y', 'P', 'T'][k % 3], ft: 0.5 });
    R.text('ancestral', 484, 134, 3.5, { al: 'l' }); R.text('species', 488, 140, 3.5, { al: 'l' });
    R.arrow([474, 222, 640, 222], { ink: 'P', w: 1.1, hs: 3 }); R.text('time', 558, 230, 3.8, { al: 'c', ink: 'P' });
    R.text('great diversity of species today', 558, 214, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(247 + p * 6, 51, 1.6, 'P', 0.9, 1); },
});
