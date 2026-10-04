/* ===================== 3.4.4 Genetic diversity and adaptation; RP6 ===================== */
/* rod bacterium in plan view for populations: resistant (dark, filled) or susceptible (pale) */
function bugs(R, x, y, ang, res, s = 1) { R.push(x, y, rad(ang), s); R.rrect(-6, -2.8, 12, 5.6, 2.8, { ink: 'B', w: 0.9, fi: res ? 'B' : 'Y', ft: res ? 0.65 : 0.45, wob: 0.1 }); R.pop(); }

/* ---------- 3.4.4a Natural selection: antibiotic resistance ---------- */
S({
  id: '3.4.4a', num: '3.4.4', sub: 'Genetic diversity, natural selection and antibiotic resistance', title: 'Genetic diversity and adaptation', topic: '3.4', slot: [2, 3], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.4.4.s1', '3.4.4.s2', '3.4.4.s3', '3.4.4.s4'],
  card: {
    text: '<b>Genetic diversity</b> is the number of different alleles of genes in a population; it enables <b>natural selection</b>. <b>Random mutation</b> can result in new alleles. Many mutations are harmful but, in certain environments, a new allele might benefit its possessor, leading to increased <b>reproductive success</b>. The advantageous allele is inherited by members of the next generation, so over many generations the new allele increases in frequency in the population. Example: a random mutation gives a bacterium <b>antibiotic resistance</b>; when antibiotics are used, resistant bacteria survive and reproduce, passing on the allele (<b>directional selection</b>).',
    terms: ['genetic diversity', 'allele', 'random mutation', 'natural selection', 'reproductive success', 'allele frequency', 'antibiotic resistance', 'directional selection'],
    skill: 'MS 2.5: logarithmic scale for bacteria', eq: MATH(mt('log'), msub(mrow(), mn('10')), mt('(number of bacteria)'), mt('  e.g. 10'), msup(mrow(), mn('6')), mt(' → 6')),
    q: 'Explain how a population of bacteria becomes resistant to an antibiotic.', a: 'A random mutation gives some bacteria a resistance allele; in the presence of the antibiotic only they survive and reproduce, passing on the allele, so its frequency rises over generations.'
  },
  draw(R, sc) {
    R.text('antibiotic resistance evolves by natural selection', 332, 14, 5, { al: 'c' });
    const dish = (cx, cy, r, state) => { R.circle(cx, cy, r, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.08, wob: 0.4 }); R.circle(cx, cy, r - 3, { ink: 'B', w: 0.5, wob: 0.3 }); };
    const stages = [
      { x: 70, t: '1 population with variation', n: 22, res: 0, note: 'no resistance allele present at first' },
      { x: 192, t: '2 random mutation', n: 22, res: 1, note: 'one bacterium has a new allele' },
      { x: 314, t: '3 antibiotic used', n: 8, res: 1, note: 'susceptible bacteria killed' },
      { x: 436, t: '4 survivors reproduce', n: 20, res: 8, note: 'allele passed on to offspring' },
      { x: 558, t: '5 later generations', n: 26, res: 22, note: 'allele frequency has increased' }
    ];
    stages.forEach((st, si) => {
      dish(st.x, 78, 46);
      R.text(st.t, st.x, 14 + 14, 4.2, { al: 'c' });
      const rng = mulberry32(777 + si * 31), pts = [];
      for (let i = 0; i < st.n; i++) { const a = rng() * TAU, d = Math.sqrt(rng()) * 38; pts.push([st.x + Math.cos(a) * d, 78 + Math.sin(a) * d, rng() * 180]); }
      pts.forEach(([x, y, an], i) => { const res = i < st.res; if (si === 2 && !res) { R.push(x, y, rad(an), 0.9); R.rrect(-6, -2.8, 12, 5.6, 2.8, { ink: 'B', w: 0.6, wob: 0.1, st: 0.4 }); R.pop(); R.text('✗', x, y + 2, 5, { al: 'c', ink: 'P' }); } else bugs(R, x, y, an, res); });
      R.text(st.note, st.x, 134, 3.7, { al: 'c' });
      if (si < 4) R.arrow([st.x + 50, 78, st.x + 72, 78], { ink: 'B', w: 1, hs: 2.4 });
    });
    R.line(8, 146, 656, 146, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // key
    bugs(R, 20, 160, 0, true, 1); R.text('resistant (new allele)', 30, 162, 3.8, { al: 'l' }); bugs(R, 140, 160, 0, false, 1); R.text('susceptible', 150, 162, 3.8, { al: 'l' });
    // causal chain
    R.text('chain of reasoning', 332, 176, 4.6, { al: 'c' });
    const chain = ['random mutation: new allele', 'allele benefits the bacterium in antibiotic', 'more survive and reproduce', 'allele inherited by next generation', 'allele frequency increases'];
    chain.forEach((t, i) => { const x = 14 + i * 128, w = 114; R.rrect(x, 184, w, 22, 5, { ink: 'B', w: 1, fi: i % 2 ? 'Y' : 'P', ft: 0.15, wob: 0.2 }); wrapText(t, w - 10, 3.9).forEach((ln, k, arr) => R.text(ln, x + w / 2, 193.4 + k * 5.2 - (arr.length - 1) * 2.6, 3.9, { al: 'c' })); if (i < 4) R.arrow([x + w + 1, 195, x + 127, 195], { ink: 'P', w: 1, hs: 2.4 }); });
    R.text('directional selection: one extreme (resistant) is favoured and increases', 332, 222, 4.2, { al: 'c', ink: 'P' });
    R.text('genetic diversity (many alleles) is what allows selection to occur', 332, 231, 3.9, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 4; i++) A.dot(436 + Math.cos(p * TAU + i * 1.7) * 30, 78 + Math.sin(p * TAU * 0.7 + i * 2.1) * 26, 1.4, 'B', 0.7, i); },
});

/* ---------- 3.4.4b Types of selection, adaptation ---------- */
S({
  id: '3.4.4b', num: '3.4.4', sub: 'Directional and stabilising selection; anatomical, physiological and behavioural adaptation', title: 'Genetic diversity and adaptation', topic: '3.4', slot: [0, 4], span: [2, 1], dna: 'bio', ao: 3,
  covers: ['3.4.4.s5', '3.4.4.s6', '3.4.4.s7'],
  card: {
    text: '<b>Directional selection</b>, exemplified by antibiotic resistance in bacteria, favours one extreme of a characteristic, shifting the mean. <b>Stabilising selection</b>, exemplified by human birth weights, favours the intermediate and acts against both extremes, narrowing the range with the mean unchanged. Natural selection results in species better adapted to their environment. <b>Adaptations</b> may be <b>anatomical</b> (structure), <b>physiological</b> (function) or <b>behavioural</b>. Students should use unfamiliar information to explain how selection produces change in a population, interpret data showing its effect, and appreciate that adaptation and selection are major factors in evolution.',
    terms: ['directional selection', 'stabilising selection', 'normal distribution', 'adaptation', 'anatomical', 'physiological', 'behavioural', 'evolution'],
    skill: 'Interpret distribution curves', eq: null,
    q: 'Human birth weight is an example of which type of selection, and why?', a: 'Stabilising: very small and very large babies have lower survival, so the intermediate weights are favoured and the range narrows.'
  },
  draw(R, sc) {
    const gauss = (m, sd) => x => 10 * Math.exp(-0.5 * Math.pow((x - m) / sd, 2));
    const panel = (x0, title, before, after, moved, note) => {
      const g = R.graph(x0 + 22, 38, 130, 76, { xmin: 0, xmax: 10, ymin: 0, ymax: 11, xl: 'characteristic', yl: 'number of individuals', xt: [], yt: [], fs: 3.7, xly: 9, ylx: 5 }).axes();
      R.text(title, x0 + 90, 28, 4.8, { al: 'c' });
      g.curve(gauss(...before), { ink: 'B', w: 1.2, t: 0.8 }); g.curve(gauss(...after), { ink: 'P', w: 1.7 });
      g.dashed(before[0], 0, before[0], 10.5, { ink: 'B', w: 0.5 }); if (moved) g.dashed(after[0], 0, after[0], 10.5, { ink: 'P', w: 0.5 });
      note.forEach((t, i) => R.text(t, x0 + 90, 138 + i * 6.4, 3.9, { al: 'c', ink: i === 0 ? 'B' : 'B' }));
      return g;
    };
    R.text('selection acts on variation in a population', 332, 14, 5, { al: 'c' });
    const g1 = panel(6, 'directional selection', [4.6, 1.5], [6.2, 1.5], true, ['one extreme is favoured', 'the mean shifts', 'e.g. antibiotic resistance']);
    R.arrow([g1.X(4.8), g1.Y(9.6), g1.X(6.0), g1.Y(9.6)], { ink: 'P', w: 1, hs: 2.4 });
    R.text('before', g1.X(2.6), g1.Y(5.4), 3.7, { al: 'r' }); R.text('after', g1.X(7.8), g1.Y(7.4), 3.7, { al: 'l', ink: 'P' });
    const g2 = panel(222, 'stabilising selection', [5, 2.1], [5, 1.2], false, ['intermediate favoured', 'range narrows, mean unchanged', 'e.g. human birth weight']);
    R.text('before', g2.X(1.4), g2.Y(5), 3.7, { al: 'r' }); R.text('after', g2.X(5.9), g2.Y(9.4), 3.7, { al: 'l', ink: 'P' });
    cross(R, g2.X(1.2), g2.Y(2.4), 2.4); cross(R, g2.X(8.8), g2.Y(2.4), 2.4);
    // birth-weight data panel
    R.line(438, 22, 438, 168, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    const g3 = R.graph(470, 38, 150, 76, { xmin: 1, xmax: 6, ymin: 0, ymax: 100, xl: 'birth mass / kg', yl: 'deaths (%)', xt: [[1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6']], yt: [[0, '0'], [50, '50'], [100, '100']], fs: 3.7, xly: 12, ylx: 12 }).axes();
    R.text('human birth weight (illustrative)', 548, 28, 4.4, { al: 'c' });
    g3.curve(x => 8 + 90 * Math.exp(-Math.pow((x - 3.4) / 0.62, 2)) * 0 + 12 + 74 * Math.pow((x - 3.4) / 2.2, 2), { ink: 'P', w: 1.5, from: 1.3, to: 5.9 });
    R.text('death rate is lowest', 548, 140, 3.9, { al: 'c' }); R.text('at intermediate masses', 548, 146.4, 3.9, { al: 'c' });
    R.line(8, 168, 656, 168, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // adaptations
    R.text('selection → adaptation', 332, 180, 4.6, { al: 'c' });
    const ad = [['anatomical', 'structure, e.g. a thick', 'waxy cuticle or long legs', 'T'], ['physiological', 'function, e.g. producing', 'antibiotic-resistant enzymes', 'P'], ['behavioural', 'actions, e.g. courtship', 'displays or migration', 'Y']];
    ad.forEach(([a, b, c, ink], i) => { const x = 20 + i * 218; R.rrect(x, 188, 202, 44, 8, { ink: 'B', w: 1, fi: ink, ft: 0.15, wob: 0.3 }); R.text(a, x + 101, 202, 5, { al: 'c' }); R.text(b, x + 101, 214, 3.9, { al: 'c' }); R.text(c, x + 101, 221, 3.9, { al: 'c' }); });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(28 + (4.6 + p * 1.6) / 10 * 130, 114 - 10 * Math.exp(-0.5 * Math.pow((p * 1.6 * 0.6) / 1.5, 2)) * 7.2, 2, 'P', 0.9, 1); },
});

/* ---------- RP6: aseptic technique and antimicrobial substances ---------- */
rpScene({
  id: 'RP6', num: '3.4.4', rp: 6, title: 'Genetic diversity and adaptation', sub: 'Required practical 6: aseptic techniques to investigate the effect of antimicrobial substances on microbial growth', topic: '3.4', slot: [2, 4],
  covers: ['RP6'], at: ['c', 'i'], ms: ['MS 0.2', 'MS 1.2', 'MS 0.3', 'MS 4.1'], ps: ['PS 2.3', 'PS 4.1'],
  card: {
    text: 'Use <b>aseptic techniques</b> to investigate the effect of antimicrobial substances on microbial growth. In the AQA handbook’s example a bacterial lawn (e.g. <i>E. coli</i> K12) is spread on nutrient agar, filter-paper discs soaked in different antimicrobial substances are placed on it, and the plate is incubated (at or below 25 °C in schools, lid taped but not sealed). Clear <b>zones of inhibition</b> appear around effective substances: measure the diameter, calculate the area (πr²) and compare. A fully quantitative variant uses serial dilutions of a broth culture. Schools may use other methods and organisms.',
    terms: ['aseptic technique', 'bacterial lawn', 'zone of inhibition', 'antimicrobial', 'agar plate', 'serial dilution', 'incubation', 'sterile'],
    skill: 'MS 4.1: area of a circle; MS 0.3', eq: MATH(mt('area of zone '), mo('='), mi('π'), msup(mi('r'), mn('2'))),
    eqn: 'e.g. diameter 14 mm → r = 7 mm → area = 3.14 × 7² ≈ 154 mm²',
    q: 'Why is the lid of the Petri dish taped but not sealed completely, and why is incubation kept at 25 °C or below?', a: 'Some air must get in to prevent anaerobic pathogens growing; a lower temperature reduces the growth of harmful human pathogens.'
  },
  apparatus(R, b) {
    R.text('lawn culture + discs → incubate → measure zones', 92, 21, 4.2, { al: 'c' });
    // bunsen and aseptic steps
    R.rect(14, 104, 20, 3, { ink: 'B', w: 1, fi: 'Y', ft: 0.6 }); R.rect(18, 76, 12, 28, { ink: 'B', w: 1, fi: 'B', ft: 0.2 }); R.fill([20, 74, 28, 74, 24, 58], { ink: 'P', t: 0.9, wob: 0.1 }); R.fill([22, 72, 26, 72, 24, 62], { ink: 'Y', t: 0.9, wob: 0.1 });
    R.text('flame', 22, 118, 3.6, { al: 'c' });
    R.tube(42, 62, 10, 44, { level: 0.5, ink: 'Y', t: 0.35 }); R.text('broth', 52, 118, 3.6, { al: 'c' }); R.text('culture', 52, 123.5, 3.6, { al: 'c' });
    R.arrow([54, 90, 72, 90], { ink: 'B', w: 1, hs: 2.4 });
    // petri dish (top view) with lawn and discs and zones of inhibition
    const cx = 114, cy = 80, r = 38;
    R.circle(cx, cy, r, { ink: 'B', w: 1.4, fi: 'Y', ft: 0.18, wob: 0.3 }); R.circle(cx, cy, r - 2.6, { ink: 'B', w: 0.5, wob: 0.3 });
    const discs = [[-14, -12, 11], [14, -12, 0], [-14, 14, 7], [14, 14, 14]];
    discs.forEach(([dx, dy, zr], i) => { if (zr) R.circle(cx + dx, cy + dy, zr, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.0, wob: 0.15, st: 0.8 }); R.knock(polyPts(cx + dx, cy + dy, zr, 20)); R.circle(cx + dx, cy + dy, 3.6, { ink: 'B', w: 0.9, fi: 'B', ft: 0.2 }); });
    R.fill(polyPts(cx, cy, r - 3, 24), { ink: 'Y', t: 0.0, wob: 0.1 });
    [[1, 0], [2, 11], [3, 7], [4, 14]].forEach(([n], i) => {});
    ['A', 'B', 'C', 'D'].forEach((t, i) => R.text(t, cx + discs[i][0], cy + discs[i][1] + 1.4, 3.4, { al: 'c' }));
    // measure zone diameter with ruler
    R.line(cx + 14 - 14, cy + 14 + 22, cx + 14 + 14, cy + 14 + 22, { ink: 'P', w: 1.4, taper: 'none' }); R.line(cx, cy + 34, cx, cy + 40, { ink: 'P', w: 0.8, taper: 'none' });
    R.text('zone of inhibition: no bacteria grow', 114, 130, 3.8, { al: 'c' }); R.text('lid taped, not sealed; ≤ 25 °C', 114, 137, 3.8, { al: 'c' });
    leader(R, 'filter-paper disc', cx - 14, cy - 12, 160, 36, { size: 3.8, al: 'c' }); leader(R, 'bacterial lawn', cx + 28, cy - 10, 168, 54, { size: 3.8, al: 'c' });
  },
  results(R, b) {
    const g = R.graph(b.x + 20, b.y + 10, 94, 78, { xmin: 0, xmax: 5, ymin: 0, ymax: 30, xl: '', yl: 'zone diameter / mm', xt: [], yt: [[0, '0'], [10, '10'], [20, '20'], [30, '30']], fs: 3.7, xly: 10, ylx: 12 }).axes();
    [['A', 22, 11], ['B', 0, 0], ['C', 14, 7], ['D', 28, 14]].forEach(([n, , ], i) => {});
    const d = [22, 0, 14, 28]; const lab = ['A', 'B', 'C', 'D'];
    d.forEach((h, i) => { const x = g.X(i + 0.8); R.fill([x, g.Y(h), x + 12, g.Y(h), x + 12, g.Y(0), x, g.Y(0)], { ink: 'P', t: 0.7, wob: 0.15 }); R.rect(x, g.Y(h), 12, g.Y(0) - g.Y(h), { ink: 'B', w: 0.8, wob: 0.1 }); R.text(lab[i], x + 6, g.Y(0) + 6, 4, { al: 'c' }); });
    R.text('antimicrobial substance A–D (B: no zone, no effect)', b.x + 66, b.y + 100, 3.6, { al: 'c' });
  },
  vars: { iv: 'antimicrobial substance', dv: 'area of zone of inhibition', ctl: ['same bacterium and lawn', 'agar depth and disc size', 'incubation time and temperature'] },
  calc: ['diameter 14 mm, r = 7 mm', 'area = π r² = 3.14 × 7²', '≈ 154 mm²', 'bigger area = more effective'],
  risks: [['bio', 'microbes: aseptic technique'], ['flame', 'Bunsen flame, hot loop'], ['goggles', 'tape lid; never reopen']],
  limits: ['uneven lawn', 'substances diffuse at different rates', 'zone edges hard to measure'],
  interp: 'larger clear zone = a more effective antimicrobial (diffusion also matters)',
  anim(A, sc) { const p = A.ph(6); A.ring(114 + 14, 80 + 14, 4 + p * 10, 'P', 0.8, 1 - p); A.dot(47 + Math.sin(p * TAU) * 1, 76 - p * 6, 1, 'Y', 0.8, 1); },
});
