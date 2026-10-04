/* ===================== TOPIC 3.6 Organisms respond to changes in their internal and external environments ===================== */
/* neurone: soma at (x,y) with dendrites; axon to (x+len, y); myelin sheaths in segments, terminal at the end.  o: myel (bool), nodes, term */
function neurone(R, x, y, len, o = {}) {
  const r = o.r || 9;
  R.circle(x, y, r, { ink: 'B', w: 1.2, fi: 'P', ft: 0.2, wob: 0.3 }); R.circle(x - 1, y, r * 0.45, { ink: 'B', w: 0.8, fi: 'B', ft: 0.35 });
  for (let i = 0; i < 4; i++) { const a = PI - 1.0 + i * 0.66; R.stroke([x + Math.cos(a) * r, y + Math.sin(a) * r, x + Math.cos(a) * (r + 7), y + Math.sin(a) * (r + 7), x + Math.cos(a) * (r + 15), y + Math.sin(a) * (r + 12) - 2], { ink: 'B', w: 1, smooth: true, taper: 'end' }); }
  const ax0 = x + r, ax1 = x + len;
  R.line(ax0, y, ax1, y, { ink: 'B', w: o.aw || 1.6, taper: 'none' });
  if (o.myel) { const n = o.n || 4, seg = (ax1 - ax0 - 8) / n; for (let k = 0; k < n; k++) { const sx = ax0 + 4 + k * seg + 1.5; R.knock(R.rrectPts(sx, y - 5, seg - 3, 10, 4)); R.rrect(sx, y - 5, seg - 3, 10, 4, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.15 }); } }
  if (o.term !== false) { for (let i = -1; i <= 1; i++) { R.stroke([ax1, y, ax1 + 8, y + i * 6, ax1 + 14, y + i * 7], { ink: 'B', w: 1, smooth: true, taper: 'end' }); R.circle(ax1 + 14, y + i * 7, 2.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); } }
}

/* ---------- 3.6 overview: stimulus, receptor, coordinator, effector; nerves vs hormones ---------- */
S({
  id: '3.6', num: '3.6', sub: 'Stimulus, receptor, coordinator and effector; nervous and hormonal coordination', title: 'Organisms respond to changes in their internal and external environments', topic: '3.6', slot: [0, 0], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.6.s1', '3.6.s2', '3.6.s3', '3.6.s4', '3.6.s5'],
  card: {
    text: 'A <b>stimulus</b> is a change in the internal or external environment. A <b>receptor</b> detects a stimulus (receptors are specific to one type of stimulus). A <b>coordinator</b> formulates a suitable response, and an <b>effector</b> produces the response. <b>Nerve cells</b> pass electrical impulses along their length; a nerve impulse is specific to a target cell only because it releases a chemical messenger directly onto it, giving a response that is usually rapid, short-lived and localised. <b>Mammalian hormones</b> stimulate target cells via the blood; they are specific to the tertiary structure of receptors on their target cells and produce responses that are usually slow, long-lasting and widespread. <b>Plants</b> control their responses using hormone-like growth substances.',
    terms: ['stimulus', 'receptor', 'coordinator', 'effector', 'nerve impulse', 'hormone', 'target cell', 'growth substance', 'response'],
    skill: 'Compare mechanisms', eq: null,
    q: 'Give two differences between a response coordinated by a nerve and one coordinated by a hormone.', a: 'Nervous: rapid, short-lived, localised. Hormonal (via blood): slower, long-lasting, widespread.'
  },
  draw(R, sc) {
    R.text('from stimulus to response', 200, 14, 5, { al: 'c' });
    const bx = [14, 108, 202, 296], t = ['stimulus', 'receptor', 'coordinator', 'effector'], sub2 = ['a change in the environment', 'detects the stimulus', 'formulates a response', 'produces the response'];
    t.forEach((s2, i) => { R.rrect(bx[i], 30, 80, 38, 8, { ink: 'B', w: 1.2, fi: ['Y', 'P', 'T', 'TY'][i], ft: 0.22, wob: 0.2 }); R.text(s2, bx[i] + 40, 44, 4.8, { al: 'c' }); wrapText(sub2[i], 70, 3.5).forEach((ln, k) => R.text(ln, bx[i] + 40, 54 + k * 4.8, 3.5, { al: 'c' })); if (i < 3) R.arrow([bx[i] + 82, 49, bx[i + 1] - 2, 49], { ink: 'B', w: 1.3, hs: 3.4 }); });
    R.arrow([376, 49, 396, 49], { ink: 'B', w: 1.3, hs: 3.4 }); R.text('response', 418, 52, 4.4, { al: 'c' });
    // examples row
    R.text('example: hot object touched', 14, 86, 4.2, { al: 'l' });
    [['heat', 14], ['temperature', 108], ['spinal cord', 202], ['muscle', 296]].forEach(([t2, x]) => R.text(t2, x + 40, 98, 3.9, { al: 'c', ink: 'P' }));
    R.text('specific to one type of stimulus', 148, 110, 3.5, { al: 'c' });
    R.line(8, 120, 472, 120, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // nervous vs hormonal comparison
    R.text('nervous coordination', 120, 132, 4.6, { al: 'c', ink: 'T' }); R.text('hormonal coordination', 354, 132, 4.6, { al: 'c', ink: 'P' });
    neurone(R, 20, 160, 130, { myel: true, n: 3, r: 7 }); R.drop(0, 0, 0.01, { label: '' });
    R.text('nerve cells pass electrical impulses', 120, 186, 3.9, { al: 'c' }); R.text('along their length', 120, 192, 3.9, { al: 'c' });
    R.text('a chemical messenger released', 120, 204, 3.9, { al: 'c' }); R.text('directly onto the target cell', 120, 210, 3.9, { al: 'c' });
    R.text('rapid, short-lived, localised', 120, 224, 4.2, { al: 'c', ink: 'T' });
    R.line(238, 126, 238, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // hormone: gland -> blood vessel -> target cell receptors
    R.rrect(260, 148, 50, 28, 8, { ink: 'B', w: 1.1, fi: 'P', ft: 0.2, wob: 0.2 }); R.text('gland', 285, 165, 3.9, { al: 'c' });
    R.stroke([312, 162, 340, 158, 380, 166, 430, 160], { ink: 'P', w: 8, t: 0.4, smooth: true, taper: 'none', solid: false }); R.stroke([312, 162, 340, 158, 380, 166, 430, 160], { ink: 'B', w: 0.9, smooth: true, taper: 'none' });
    for (let i = 0; i < 5; i++) R.circle(322 + i * 24, 162 + (i % 2) * 3, 2.2, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.9 });
    R.text('hormones carried in the blood', 360, 148, 3.8, { al: 'c' });
    R.circle(440, 188, 14, { ink: 'B', w: 1.1, fi: 'T', ft: 0.2 }); R.recept(440 - 14, 188, PI, 'tri', { w: 6, h: 4, n: 1.8, d: 2.2, len: 1 }); R.text('target cell', 440, 212, 3.7, { al: 'c' });
    R.text('specific to the tertiary structure of', 354, 190, 3.6, { al: 'c' }); R.text('receptors on target cells', 354, 196, 3.6, { al: 'c' });
    R.text('slow, long-lasting, widespread', 354, 224, 4.2, { al: 'c', ink: 'P' });
    // plants
    R.line(480, 22, 480, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('plants', 560, 30, 4.8, { al: 'c' });
    plantDraw(R, 560, 160, 90, { sw: 5 });
    ['hormone-like growth', 'substances control', 'plant responses'].forEach((t2, i) => R.text(t2, 560, 192 + i * 7, 3.9, { al: 'c' }));
  },
  anim(A, sc) { const p = A.ph(4); for (let i = 0; i < 4; i++) A.dot(14 + 80 + i * 94 + ((p % 1) * 10), 49, 1.4, 'P', 0.8, i); A.dot(20 + 7 + (p * 120), 160, 1.6, 'Y', 0.9, 5); A.dot(312 + p * 118, 162, 1.8, 'Y', 0.9, 6); },
});

/* ---------- 3.6.1.1a Plant growth factors: IAA, tropisms ---------- */
S({
  id: '3.6.1.1a', num: '3.6.1.1', sub: 'Plant responses: IAA, cell elongation, phototropism and gravitropism', title: 'Survival and response', topic: '3.6', slot: [2, 0], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.1.1.s1', '3.6.1.1.s2', '3.6.1.1.s3'],
  card: {
    text: 'Organisms increase their chance of survival by responding to changes in their environment. In flowering plants, specific growth factors move from growing regions to other tissues, where they regulate growth in response to directional stimuli (<b>tropisms</b>). <b>Indoleacetic acid (IAA)</b> is made in the tips and moves to the shaded side of a shoot (<b>phototropism</b>) or the lower side of a horizontal shoot or root (<b>gravitropism</b>). In <b>shoots</b>, a higher IAA concentration <b>stimulates cell elongation</b>, so the shaded/lower side grows faster and the shoot bends towards light and upwards. In <b>roots</b>, a higher IAA concentration <b>inhibits</b> elongation on the lower side, so the root bends downwards.',
    terms: ['tropism', 'indoleacetic acid (IAA)', 'cell elongation', 'phototropism', 'gravitropism', 'growth factor', 'shoot', 'root', 'concentration'],
    skill: 'Explain opposite effects in shoot and root', eq: null,
    q: 'Explain why a horizontal root grows downwards.', a: 'IAA accumulates on the lower side; in roots this high concentration inhibits cell elongation, so the upper side elongates faster and the root curves down.'
  },
  draw(R, sc) {
    R.text('IAA and directional growth', 332, 14, 5, { al: 'c' });
    const shoot = (x, y, light) => {
      R.rect(x - 10, y, 20, 80, { ink: 'B', w: 1.2, fi: 'T', ft: 0.3, wob: 0.3 });
      for (let k = 0; k < 8; k++) { R.line(x - 10, y + 6 + k * 10, x, y + 6 + k * 10, { ink: 'B', w: 0.5, taper: 'none', t: 0.6 }); R.line(x, y + 6 + k * 10, x + 10, y + 6 + k * 10, { ink: 'B', w: 0.5, taper: 'none', t: 0.6 }); }
      R.ellipse(x, y - 4, 10, 6, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.5 });
    };
    // 1 phototropism
    R.text('shoot: phototropism', 72, 28, 4.6, { al: 'c' });
    shoot(80, 52, 1); R.arrow([14, 74, 60, 84], { ink: 'Y', w: 2, hs: 4 }); R.arrow([14, 88, 60, 94], { ink: 'Y', w: 2, hs: 4 }); R.text('light', 24, 66, 3.8, { al: 'c' });
    for (let k = 0; k < 4; k++) R.dot(86, 62 + k * 14, 1.5, { ink: 'P' }); R.text('IAA on the', 112, 96, 3.6, { al: 'l', ink: 'P' }); R.text('shaded side', 112, 102, 3.6, { al: 'l', ink: 'P' });
    R.text('more IAA → more elongation', 72, 148, 3.8, { al: 'c' }); R.text('shoot bends towards the light', 72, 156, 3.8, { al: 'c', ink: 'P' });
    R.line(144, 22, 144, 170, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // 2 gravitropism in shoot (horizontal)
    R.text('shoot: gravitropism', 216, 28, 4.6, { al: 'c' });
    R.rect(166, 74, 80, 18, { ink: 'B', w: 1.2, fi: 'T', ft: 0.3, wob: 0.3 }); for (let k = 0; k < 7; k++) R.line(172 + k * 11, 74, 172 + k * 11, 92, { ink: 'B', w: 0.5, taper: 'none', t: 0.6 }); R.ellipse(248, 83, 5, 9, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.5 });
    for (let k = 0; k < 6; k++) R.dot(176 + k * 12, 88, 1.5, { ink: 'P' }); R.arrow([216, 52, 216, 70], { ink: 'B', w: 1.4, hs: 3.4 }); R.text('gravity', 216, 46, 3.8, { al: 'c' });
    R.text('IAA collects on lower side', 216, 108, 3.7, { al: 'c', ink: 'P' });
    R.text('lower side elongates more:', 216, 148, 3.8, { al: 'c' }); R.text('shoot grows upwards', 216, 156, 3.8, { al: 'c', ink: 'P' });
    R.line(268, 22, 268, 170, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // 3 gravitropism in root
    R.text('root: gravitropism', 340, 28, 4.6, { al: 'c' });
    R.rect(290, 74, 80, 14, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.25, wob: 0.3 }); for (let k = 0; k < 7; k++) R.line(296 + k * 11, 74, 296 + k * 11, 88, { ink: 'B', w: 0.5, taper: 'none', t: 0.6 }); R.ellipse(372, 81, 5, 8, { ink: 'B', w: 1.1, fi: 'P', ft: 0.3 });
    for (let k = 0; k < 6; k++) R.dot(300 + k * 12, 84, 1.5, { ink: 'P' }); R.arrow([340, 52, 340, 70], { ink: 'B', w: 1.4, hs: 3.4 }); R.text('gravity', 340, 46, 3.8, { al: 'c' });
    R.text('IAA collects on lower side', 340, 108, 3.7, { al: 'c', ink: 'P' });
    R.text('high IAA inhibits elongation', 340, 148, 3.8, { al: 'c' }); R.text('root grows downwards', 340, 156, 3.8, { al: 'c', ink: 'P' });
    R.line(396, 22, 396, 170, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // 4 graph
    R.text('effect of IAA concentration', 520, 28, 4.6, { al: 'c' });
    const g = R.graph(430, 38, 190, 96, { xmin: -3, xmax: 3, ymin: -10, ymax: 10, xl: 'IAA concentration (log scale)', yl: 'effect on elongation', xt: [], yt: [], fs: 3.6, xly: 12, ylx: 6 }).axes();
    g.hline(0, { ink: 'B', w: 0.6 });
    g.curve(x => 9 * Math.exp(-Math.pow((x - 1.1) / 1.0, 2)) - 1.2 * Math.max(0, x - 1.8) * 3, { ink: 'T', w: 1.6, from: -2.6, to: 2.8 });
    g.curve(x => 5.5 * Math.exp(-Math.pow((x + 1.6) / 0.6, 2)) - 9 * (1 / (1 + Math.exp(-(x + 0.2) * 3))) + 0.5, { ink: 'P', w: 1.6, from: -2.8, to: 2.8 });
    R.text('shoot', g.X(1.1), g.Y(9) + 0, 3.8, { al: 'c', ink: 'T' }); R.text('root', g.X(-1.8), g.Y(7), 3.8, { al: 'c', ink: 'P' });
    R.text('stimulates', g.X(-2.9), g.Y(8.6), 3.4, { al: 'l' }); R.text('inhibits', g.X(-2.9), g.Y(-8.2), 3.4, { al: 'l' });
    R.text('roots are more sensitive than shoots', 520, 152, 3.8, { al: 'c' });
    R.line(8, 174, 656, 174, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('IAA is made in growing regions (tips) and moves to other tissues, where it regulates growth in response to light and gravity', 332, 190, 4.2, { al: 'c' });
    R.text('shoot: high IAA → more elongation          root: high IAA → less elongation', 332, 206, 4.4, { al: 'c', ink: 'P' });
    R.text('the same hormone has opposite effects on shoots and roots', 332, 222, 4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let k = 0; k < 4; k++) A.dot(86 + 0, 62 + k * 14 + (p * 6) % 6, 1.4, 'P', 0.9, k); for (let k = 0; k < 4; k++) A.dot(176 + k * 18 + (p * 8) % 8, 88, 1.4, 'P', 0.9, 8 + k); },
});
