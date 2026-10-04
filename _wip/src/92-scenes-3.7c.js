/* ===================== 3.7.4 Populations in ecosystems ===================== */
const GROW = t => 1 / (1 + 40 * Math.exp(-0.9 * t));

/* ---------- 3.7.4a Ecosystems, niche, carrying capacity ---------- */
S({
  id: '3.7.4a', num: '3.7.4', sub: 'Community, ecosystem, niche and carrying capacity', title: 'Populations in ecosystems', topic: '3.7', slot: [0, 6], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.7.4.s1', '3.7.4.s2', '3.7.4.s3', '3.7.4.s4'],
  card: {
    text: 'Populations of different species form a <b>community</b>; a community and the non-living components of its environment together form an <b>ecosystem</b>, which can be very small or very large. Within a <b>habitat</b>, a species occupies a <b>niche</b> governed by its adaptation to both <b>abiotic</b> and <b>biotic</b> conditions. An ecosystem supports a certain size of population of a species, the <b>carrying capacity</b>. Population size can vary because of abiotic factors and interactions between organisms: <b>interspecific</b> and <b>intraspecific competition</b> and <b>predation</b>. When a population grows exponentially, plotting the logarithm of its size gives a straight line (a <b>logarithmic scale</b>).',
    terms: ['community', 'ecosystem', 'habitat', 'niche', 'abiotic factor', 'biotic factor', 'carrying capacity', 'interspecific competition', 'intraspecific competition', 'predation'],
    skill: 'MS 2.5: logarithmic scale for population growth', eq: MATH(msub(mr('log'), mn(10)), mi('N')),
    q: 'Why does a population level off at the carrying capacity?', a: 'Limiting factors (food, space, competition, predation, abiotic conditions) cause death rates to rise or birth rates to fall until births and deaths balance.'
  },
  draw(R, sc) {
    R.text('levels of organisation', 110, 14, 4.3, { al: 'c' });
    R.ellipse(110, 96, 98, 66, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.06, wob: 0.5 }); R.text('ecosystem', 110, 36, 3.9, { al: 'c', ink: 'P' });
    R.ellipse(110, 100, 78, 48, { ink: 'B', w: 1, fi: 'T', ft: 0.06, wob: 0.5 }); R.text('community', 110, 62, 3.8, { al: 'c', ink: 'T' });
    R.ellipse(82, 98, 34, 20, { ink: 'B', w: 1, fi: 'P', ft: 0.1, wob: 0.4 }); R.text('population A', 82, 88, 3.3, { al: 'c' });
    R.ellipse(146, 114, 30, 18, { ink: 'B', w: 1, fi: 'Y', ft: 0.15, wob: 0.4 }); R.text('population B', 146, 124, 3.3, { al: 'c' });
    [[72, 102], [88, 106], [80, 110], [138, 108], [150, 114]].forEach(([x, y], i) => R.circle(x, y, 2.4, { ink: 'B', w: 0.7, fi: i < 3 ? 'P' : 'Y', ft: 0.7 }));
    R.text('populations of different species', 110, 176, 3.5, { al: 'c' }); R.text('+ the non-living environment', 110, 183, 3.5, { al: 'c' });
    ['habitat: where an organism lives', 'niche: its role, set by adaptation to', 'abiotic and biotic conditions'].forEach((t, i) => R.text(t, 12, 196 + i * 7, 3.7, { al: 'l', ink: i ? 'B' : 'P' }));
    R.text('abiotic: temperature, light, pH, water', 12, 223, 3.5, { al: 'l', ink: 'T' }); R.text('biotic: other organisms', 12, 230, 3.5, { al: 'l', ink: 'P' });
    R.line(216, 14, 216, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // growth
    R.text('population size and carrying capacity', 330, 14, 4.3, { al: 'c' });
    const g = R.graph(244, 28, 170, 112, { xmin: 0, xmax: 10, ymin: 0, ymax: 1.25, xl: 'time', yl: 'population size', fs: 3.5, xly: 9, ylx: 5 }).axes();
    g.hline(1, { dash: true, t: 0.8 }); g.curve(t => 1.0 * GROW(t * 1.0 + 1.5) * 1.0, { ink: 'P', w: 1.8, n: 60 });
    R.text('carrying capacity', g.X(0.3), g.Y(1) - 2.6, 3.7, { al: 'l', ink: 'T' });
    g.label('lag', 0.3, 0.2, { size: 3.4, dy: 7 }); g.label('exponential growth', 0.5, 0.78, { size: 3.4 }); g.label('levels off', 6.8, 0.88, { size: 3.4, dy: 10 });
    const g2 = R.graph(244, 160, 170, 48, { xmin: 0, xmax: 10, ymin: 0, ymax: 4, xl: 'time', yl: 'log10 N', fs: 3.4, xly: 9, ylx: 5 }).axes();
    g2.curve(t => 0.4 + 3.4 * GROW(t + 1.5), { ink: 'P', w: 1.5, n: 60 });
    R.text('log scale: exponential growth is a straight line', 330, 232, 3.5, { al: 'c' });
    R.line(436, 14, 436, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // factors
    R.text('what sets population size', 548, 14, 4.3, { al: 'c' });
    R.circle(548, 90, 22, { ink: 'B', w: 1.2, fi: 'P', ft: 0.12, wob: 0.4 }); R.text('population', 548, 88, 3.7, { al: 'c' }); R.text('size', 548, 95, 3.7, { al: 'c' });
    [['abiotic factors', 'light, temperature, water, pH', 490, 40], ['interspecific competition', 'between different species', 606, 40], ['intraspecific competition', 'within the same species', 490, 140], ['predation', 'predators eat prey', 606, 140]].forEach(([t, s2, x, y], i) => { R.rrect(x - 52, y - 12, 104, 28, 5, { ink: 'B', w: 0.8, fi: ['T', 'P', 'Y', 'P'][i], ft: 0.06, wob: 0.3 }); R.text(t, x, y, 3.5, { al: 'c', ink: 'P' }); R.text(s2, x, y + 9, 3.2, { al: 'c' }); R.arrow([x + (x < 548 ? 16 : -16), y + (y < 90 ? 17 : -13), 548 + (x < 548 ? -14 : 14), 90 + (y < 90 ? -16 : 16)], { ink: 'B', w: 0.8, hs: 2.2 }); });
    ['the population levels off where births', 'and deaths balance: the carrying capacity'].forEach((t, i) => R.text(t, 548, 190 + i * 8, 3.8, { al: 'c', ink: 'P' }));
    R.text('it can vary with abiotic factors', 548, 214, 3.6, { al: 'c' }); R.text('and interactions between organisms', 548, 221, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(7), t = p * 10; A.dot(244 + p * 170, 28 + 112 - GROW(t + 1.5) * 112 / 1.25, 2.2, 'P', 0.95, 1); },
});

/* ---------- 3.7.4b Competition and predation ---------- */
S({
  id: '3.7.4b', num: '3.7.4', sub: 'Interspecific and intraspecific competition; predator-prey cycles', title: 'Populations in ecosystems', topic: '3.7', slot: [2, 6], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.7.4.s4'],
  card: {
    text: '<b>Interspecific competition</b> is between individuals of different species for the same resource (food, light, space); the species better adapted to the conditions may reduce the population of the other. <b>Intraspecific competition</b> is between members of the same species and has the greatest effect on population size as the population nears its carrying capacity. <b>Predation</b> links predator and prey populations: when prey numbers rise there is more food for predators, so predator numbers rise after a delay; more predators eat more prey, so prey numbers fall, then predator numbers fall, and the cycle repeats. Abiotic factors and other food sources also affect the cycle, so correlation between the two curves does not prove cause.',
    terms: ['interspecific competition', 'intraspecific competition', 'predation', 'predator-prey cycle', 'time lag', 'carrying capacity', 'resource'],
    skill: 'MS 3.1: interpret predator-prey graphs; correlation is not causation', eq: null,
    q: 'On a predator-prey graph, why does the predator peak come after the prey peak?', a: 'Predator numbers can only rise once there is plenty of prey; breeding and growth take time, so predators peak later, then their predation reduces the prey.'
  },
  draw(R, sc) {
    R.text('competition', 112, 14, 4.4, { al: 'c' });
    R.text('interspecific: different species', 112, 28, 3.9, { al: 'c', ink: 'P' });
    R.ellipse(60, 54, 32, 14, { ink: 'B', w: 1, fi: 'P', ft: 0.12, wob: 0.4 }); R.ellipse(164, 54, 32, 14, { ink: 'B', w: 1, fi: 'T', ft: 0.12, wob: 0.4 }); R.ellipse(112, 62, 30, 22, { ink: 'B', w: 1, fi: 'Y', ft: 0.22, wob: 0.4 });
    R.text('species 1', 52, 54, 3.4, { al: 'c' }); R.text('species 2', 172, 54, 3.4, { al: 'c' }); R.text('shared', 112, 60, 3.4, { al: 'c' }); R.text('resource', 112, 66, 3.4, { al: 'c' });
    R.arrow([82, 56, 94, 60], { ink: 'B', w: 0.9, hs: 2.4 }); R.arrow([142, 56, 130, 60], { ink: 'B', w: 0.9, hs: 2.4 });
    R.text('the better adapted species may', 112, 90, 3.7, { al: 'c' }); R.text('reduce the population of the other', 112, 97, 3.7, { al: 'c' });
    R.line(10, 106, 214, 106, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('intraspecific: same species', 112, 120, 3.9, { al: 'c', ink: 'T' });
    for (let k = 0; k < 14; k++) beetle(R, 40 + (k % 7) * 22, 142 + Math.floor(k / 7) * 18, 'B', 0.55, (k * 31) % 60 - 30, 0.8);
    R.text('for food, mates, space, light', 112, 176, 3.7, { al: 'c' });
    R.text('strongest effect near the', 112, 190, 3.7, { al: 'c' }); R.text('carrying capacity', 112, 197, 3.7, { al: 'c' });
    R.text('both reduce the population size', 112, 218, 3.9, { al: 'c', ink: 'P' });
    R.line(222, 14, 222, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // predator-prey
    R.text('predator-prey cycles', 440, 14, 4.4, { al: 'c' });
    const g = R.graph(262, 28, 340, 130, { xmin: 0, xmax: 20, ymin: 0, ymax: 1.1, xl: 'time', yl: 'population size', fs: 3.6, xly: 10, ylx: 6 }).axes();
    const prey = t => 0.55 + 0.4 * Math.sin(t * 0.9), pred = t => 0.5 + 0.34 * Math.sin(t * 0.9 - 1.4);
    g.curve(prey, { ink: 'T', w: 1.8, n: 80 }); g.curve(pred, { ink: 'P', w: 1.8, n: 80 });
    R.text('prey', g.X(2.0), g.Y(1.0), 3.8, { al: 'c', ink: 'T' }); R.text('predator', g.X(4.3), g.Y(1.0), 3.8, { al: 'c', ink: 'P' });
    const pk = 0.9 * 0 + (PI / 2) / 0.9, pk2 = (PI / 2 + 1.4) / 0.9; g.dashed(pk, 0, pk, prey(pk), { ink: 'T', w: 0.8 }); g.dashed(pk2, 0, pk2, pred(pk2), { ink: 'P', w: 0.8 }); R.arrow([g.X(pk), g.Y(0.07), g.X(pk2), g.Y(0.07)], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('lag', g.X((pk + pk2) / 2), g.Y(0.18), 3.6, { al: 'c' });
    ['more prey: more food, so predators increase (after a lag)', 'more predators: more prey eaten, so prey decrease', 'less prey: predators starve and decrease, prey recover'].forEach((t, i) => R.text(t, 440, 180 + i * 8, 3.9, { al: 'c' }));
    R.text('other factors (abiotic, other food) also matter, so', 440, 212, 3.7, { al: 'c', ink: 'P' }); R.text('matching curves show correlation, not proof of cause', 440, 219, 3.7, { al: 'c', ink: 'P' });
    R.text('graph is an idealised example', 440, 229, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(8), t = p * 20; A.dot(262 + p * 340, 28 + 130 - (0.55 + 0.4 * Math.sin(t * 0.9)) * 130 / 1.1, 2, 'T', 0.95, 1); A.dot(262 + p * 340, 28 + 130 - (0.5 + 0.34 * Math.sin(t * 0.9 - 1.4)) * 130 / 1.1, 2, 'P', 0.95, 2); },
});

/* small plant glyphs for succession and fields */
function lichen(R, x, y, s = 1) { [[0, 0, 5], [7, -1, 3.4], [-6, 1, 3], [3, 3, 2.4]].forEach(([dx, dy, r], i) => R.ellipse(x + dx * s, y + dy * s, r * s, r * 0.5 * s, { ink: 'B', w: 0.6, fi: i % 2 ? 'Y' : 'TY', ft: 0.6, wob: 0.1 })); }
function mossTuft(R, x, y, s = 1) { for (let i = -3; i <= 3; i++) R.stroke([x + i * 1.6 * s, y, x + i * 2.1 * s, y - (6 - Math.abs(i)) * s], { ink: 'T', w: 1, taper: 'end', wob: 0.15 }); }
function grassTuft(R, x, y, s = 1) { for (let i = -3; i <= 3; i++) R.stroke([x + i * 1.2 * s, y, x + i * 2.4 * s, y - (12 - Math.abs(i) * 1.5) * s], { ink: 'T', w: 0.9, smooth: true, taper: 'end', wob: 0.15 }); }
function shrubGlyph(R, x, y, s = 1) { R.line(x, y, x, y - 8 * s, { ink: 'B', w: 1, taper: 'none' }); [[-6, -10, 6], [6, -10, 6], [0, -14, 8]].forEach(([dx, dy, r]) => { R.knock(polyPts(x + dx * s, y + dy * s, r * s, 14)); R.circle(x + dx * s, y + dy * s, r * s, { ink: 'B', w: 0.7, fi: 'TY', ft: 0.5, wob: 0.2 }); }); }
function treeGlyph(R, x, y, s = 1) { R.rect(x - 2 * s, y - 20 * s, 4 * s, 20 * s, { ink: 'B', w: 0.8, fi: 'P', ft: 0.5, wob: 0.1 }); [[-9, -24, 9], [9, -24, 9], [0, -22, 9], [0, -30, 12]].forEach(([dx, dy, r]) => { R.knock(polyPts(x + dx * s, y + dy * s, r * s, 16)); R.circle(x + dx * s, y + dy * s, r * s, { ink: 'B', w: 0.7, fi: 'TY', ft: 0.5, wob: 0.2 }); }); }

/* ---------- 3.7.4c Estimating populations with quadrats and transects ---------- */
S({
  id: '3.7.4c', num: '3.7.4', sub: 'Estimating population size with random quadrats and belt transects', title: 'Populations in ecosystems', topic: '3.7', slot: [0, 7], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.7.4.s5', '3.7.4.s6'],
  card: {
    text: 'The size of a population of <b>slow-moving or non-motile</b> organisms is estimated using <b>randomly placed quadrats</b> or quadrats along a <b>belt transect</b>. Random sampling avoids bias: use a random number table or generator for the coordinates of each quadrat on a grid marked out with two tape measures. A belt transect samples along a line to show how distribution changes with an environmental gradient. Abundance can be measured as <b>number per quadrat</b>, <b>frequency</b> (percentage of quadrats containing the species) or <b>percentage cover</b> (useful for plants that are hard to count). The estimate for the whole area is the mean number per quadrat × (total area ÷ area of one quadrat). More quadrats give a more reliable estimate.',
    terms: ['quadrat', 'random sampling', 'belt transect', 'abundance', 'frequency', 'percentage cover', 'random number table', 'sessile'],
    skill: 'MS 2.? / MS 1.5: sampling, mean, and scaling up to an area', eq: MATH(mt('population estimate '), mo('='), mt('mean per quadrat '), mo('×'), mfrac(mt('total area'), mt('area of one quadrat'))),
    q: 'A mean of 4 plants per 0.25 m² quadrat is found. Estimate the population in a 400 m² field.', a: '400 ÷ 0.25 = 1600 quadrat areas; 4 × 1600 = 6400 plants.'
  },
  draw(R, sc) {
    R.text('randomly placed quadrats', 118, 14, 4.2, { al: 'c' });
    R.rect(28, 28, 150, 118, { ink: 'B', w: 1, fi: 'Y', ft: 0.06, wob: 0.3 });
    for (let k = 0; k < 40; k++) { const h = Math.sin(k * 91.7) * 4375.85; const fx = h - Math.floor(h), h2 = Math.sin(k * 33.1 + 4) * 9871.3, fy = h2 - Math.floor(h2); R.circle(32 + fx * 142, 32 + fy * 110, 1.5, { ink: 'B', w: 0.5, fi: 'TY', ft: 0.9 }); }
    [[44, 40], [122, 48], [70, 84], [128, 108], [42, 112], [96, 126]].forEach(([x, y], i) => { R.rect(x, y, 16, 16, { ink: 'P', w: 1.3, wob: 0.2 }); R.text(String(i + 1), x + 8, y + 11, 3.8, { al: 'c', ink: 'P' }); });
    for (let i = 0; i <= 6; i++) { R.line(28 + i * 25, 148, 28 + i * 25, 152, { ink: 'B', w: 0.6, taper: 'none' }); R.text(String(i * 5), 28 + i * 25, 159, 3.2, { al: 'c' }); R.line(26, 28 + i * 19.6, 22, 28 + i * 19.6, { ink: 'B', w: 0.6, taper: 'none' }); }
    R.line(28, 148, 178, 148, { ink: 'B', w: 1, taper: 'none' }); R.text('tape measure (m)', 103, 167, 3.4, { al: 'c' });
    R.text('random coordinates', 118, 180, 3.8, { al: 'c', ink: 'P' }); R.text('from a random number table:', 118, 187, 3.5, { al: 'c' });
    R.text('(4, 3) (18, 5) (8, 11) (20, 15) (3, 16) (11, 18)', 118, 197, 3.4, { al: 'c' });
    R.text('avoids bias in where the quadrats are placed', 118, 210, 3.5, { al: 'c' }); R.text('for slow-moving or non-motile organisms', 118, 217, 3.5, { al: 'c' });
    R.line(212, 14, 212, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // belt transect
    R.text('belt transect', 322, 14, 4.2, { al: 'c' });
    R.stroke([226, 70, 270, 60, 320, 66, 372, 52, 416, 58], { ink: 'B', w: 1, smooth: true, taper: 'none', t: 0.0 });
    R.rect(226, 36, 190, 70, { ink: 'B', w: 1, fi: 'Y', ft: 0.05 });
    R.line(226, 71, 416, 71, { ink: 'B', w: 1.4, taper: 'none' });
    for (let i = 0; i < 6; i++) { const x = 232 + i * 31; R.rect(x, 62, 22, 18, { ink: 'P', w: 1.1, wob: 0.15 }); const n = 6 - i; for (let k = 0; k < n; k++) R.circle(x + 4 + (k % 3) * 7, 67 + Math.floor(k / 3) * 8, 1.6, { ink: 'B', w: 0.5, fi: 'TY', ft: 0.9 }); R.text(String(i * 5), x + 11, 92, 3.3, { al: 'c' }); }
    R.text('distance along the line / m', 322, 102, 3.5, { al: 'c' });
    R.text('quadrats at regular intervals along a line', 322, 118, 3.6, { al: 'c' }); R.text('show change along an environmental gradient', 322, 125, 3.6, { al: 'c' });
    const g = R.graph(252, 142, 160, 70, { xmin: 0, xmax: 30, ymin: 0, ymax: 100, xl: 'distance / m', yl: '% cover', xt: [0, 10, 20, 30], yt: [[0, '0'], [50, '50'], [100, '100']], fs: 3.3, xly: 10, ylx: 8 }).axes();
    [[0, 90], [5, 72], [10, 55], [15, 38], [20, 22], [25, 12]].forEach(([x, y]) => R.rect(g.X(x), g.Y(y), 12, g.Y(0) - g.Y(y), { ink: 'B', w: 0.7, fi: 'T', ft: 0.3 }));
    R.text('example: percentage cover falls along the line', 330, 232, 3.5, { al: 'c' });
    R.line(436, 14, 436, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // calculation
    R.text('from quadrats to a population estimate', 548, 14, 4.2, { al: 'c' });
    R.table(450, 24, [28, 17.4, 17.4, 17.4, 17.4, 17.4, 17.4, 17.4, 17.4, 17.4, 17.4], 13, [['quad.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], ['count', '3', '5', '2', '4', '6', '3', '5', '4', '2', '6']], { size: 3.3, hink: 'Y' });
    R.text('quadrat area 0.25 m², field area 400 m²', 548, 62, 3.5, { al: 'c' });
    ['mean = 40 ÷ 10 = 4 per quadrat', 'number of quadrat areas = 400 ÷ 0.25 = 1600', 'estimate = 4 × 1600 = 6400 plants'].forEach((t, i) => { R.rrect(456, 70 + i * 20, 192, 16, 4, { ink: 'B', w: 0.8, fi: i === 2 ? 'P' : 'Y', ft: i === 2 ? 0.18 : 0.1, wob: 0.2 }); R.text(t, 552, 70 + i * 20 + 10.6, 3.9, { al: 'c' }); });
    R.line(448, 138, 650, 138, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('measures of abundance', 548, 150, 4, { al: 'c' });
    [['number per quadrat', 'count the individuals'], ['frequency', 'quadrats with the species ÷ quadrats × 100'], ['percentage cover', 'area covered ÷ quadrat area × 100']].forEach((t, i) => { R.text(t[0], 452, 164 + i * 18, 3.9, { al: 'l', ink: 'P' }); R.text(t[1], 452, 171 + i * 18, 3.5, { al: 'l' }); });
    R.text('e.g. frequency: found in 7 of 10 quadrats = 70 %', 548, 224, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 6; i++) { const k = (i + Math.floor(p * 6)) % 6; } A.dot(52 + (Math.floor(p * 6) % 3) * 40, 48 + Math.floor(p * 2) * 38, 1.6, 'P', 0.9, 1); },
});

/* ---------- 3.7.4d Mark-release-recapture ---------- */
S({
  id: '3.7.4d', num: '3.7.4', sub: 'Mark-release-recapture for motile organisms', title: 'Populations in ecosystems', topic: '3.7', slot: [2, 7], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.7.4.s7', '3.7.4.s11'],
  card: {
    text: 'The size of a population of <b>motile</b> animals is estimated by <b>mark-release-recapture</b>: capture a sample, count it (n₁), mark the animals harmlessly, release them and allow time to mix; then capture a second sample (n₂) and count how many are marked (m). Population size = (n₁ × n₂) ÷ m. The assumptions are: no immigration or emigration, and negligible births and deaths, between the samples; the marked animals mix randomly with the rest; marking does not affect survival or behaviour (and the mark is not lost); and the samples are random, with an equal chance of capture for every individual.',
    terms: ['mark-release-recapture', 'motile', 'sample', 'marked', 'assumptions', 'population estimate', 'random mixing'],
    skill: 'MS 2.? / MS 0.4: use the mark-release-recapture equation', eq: MATH(mt('population size '), mo('='), mfrac(mrow(msub(mi('n'), mn(1)), mo('×'), msub(mi('n'), mn(2))), mi('m'))),
    q: '60 animals are marked and released. A second sample of 50 contains 10 marked animals. Estimate the population.', a: '(60 × 50) ÷ 10 = 300 animals.'
  },
  draw(R, sc) {
    const panel = (i, title, draw) => { const x = 10 + i * 104; R.rrect(x, 24, 98, 78, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.06, wob: 0.3 }); R.text(title, x + 49, 114, 3.7, { al: 'c' }); draw(x); if (i < 3) R.arrow([x + 99, 63, x + 103, 63], { ink: 'B', w: 0.8, hs: 2 }); };
    R.text('four steps', 214, 14, 4.2, { al: 'c' });
    panel(0, '1 capture a first sample (n_1)', x => { for (let k = 0; k < 8; k++) beetle(R, x + 18 + (k % 4) * 21, 42 + Math.floor(k / 4) * 20, 'B', 0.55, (k * 40) % 70 - 35, 0.8); R.text('n_1 = 80', x + 49, 94, 3.9, { al: 'c', ink: 'P' }); });
    panel(1, '2 mark harmlessly, release', x => { for (let k = 0; k < 8; k++) { beetle(R, x + 18 + (k % 4) * 21, 42 + Math.floor(k / 4) * 20, 'B', 0.55, (k * 40) % 70 - 35, 0.8); R.circle(x + 18 + (k % 4) * 21 - 1, 42 + Math.floor(k / 4) * 20 - 4, 2, { ink: 'P', w: 0.6, fi: 'P', ft: 1 }); } R.arrow([x + 20, 98, x + 80, 98], { ink: 'B', w: 0.7, hs: 2 }); });
    panel(2, '3 allow time to mix', x => { for (let k = 0; k < 11; k++) { const mk = k < 4; beetle(R, x + 14 + (k * 29 % 70), 36 + (k * 17 % 52), 'B', 0.55, (k * 53) % 90 - 45, 0.7); if (mk) R.circle(x + 14 + (k * 29 % 70) - 1, 36 + (k * 17 % 52) - 3, 1.8, { ink: 'P', w: 0.5, fi: 'P', ft: 1 }); } });
    panel(3, '4 capture a second sample', x => { for (let k = 0; k < 8; k++) { beetle(R, x + 18 + (k % 4) * 21, 42 + Math.floor(k / 4) * 20, 'B', 0.55, (k * 40) % 70 - 35, 0.8); if (k === 1 || k === 5) R.circle(x + 18 + (k % 4) * 21 - 1, 42 + Math.floor(k / 4) * 20 - 4, 2, { ink: 'P', w: 0.6, fi: 'P', ft: 1 }); } R.text('n_2 = 60, marked m = 12', x + 49, 94, 3.5, { al: 'c', ink: 'P' }); });
    R.line(8, 126, 430, 126, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('population size  =', 74, 145, 4.4, { al: 'c' });
    R.line(106, 142, 170, 142, { ink: 'B', w: 1.1, taper: 'none' }); R.text('n_1 × n_2', 138, 136, 4.4, { al: 'c' }); R.text('m', 138, 153, 4.4, { al: 'c' });
    R.rrect(188, 130, 222, 24, 5, { ink: 'B', w: 0.8, fi: 'P', ft: 0.14, wob: 0.2 }); R.text('(80 × 60) ÷ 12 = 400 animals', 299, 146, 4.6, { al: 'c' });
    R.text('the proportion of marked animals in the second sample', 214, 172, 3.8, { al: 'c' }); R.text('estimates the proportion marked in the whole population: 12/60 = 80/N', 214, 180, 3.8, { al: 'c' });
    R.text('use a harmless mark that does not make the animal easier to find', 214, 198, 3.8, { al: 'c', ink: 'P' });
    R.text('for slow-moving or non-motile organisms use quadrats instead', 214, 212, 3.7, { al: 'c' });
    R.line(440, 14, 440, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('assumptions', 548, 14, 4.4, { al: 'c' });
    ['no immigration or emigration, and negligible', 'births or deaths, between the samples', 'marked animals mix randomly with the rest', 'marking does not harm the animals or change', 'their survival, behaviour or chance of capture', 'the mark stays visible (not lost or faded)', 'samples are random: equal chance of capture'].forEach((t, i) => { const y = 36 + [0, 1, 2.8, 4.6, 5.6, 7.4, 9.2][i] * 11.5; if ([0, 2, 3, 5, 6].includes(i)) { R.circle(454, y - 1.2, 3.4, { ink: 'B', w: 0.8, fi: 'T', ft: 0.08 }); R.line(452.2, y - 1.2, 453.6, y + 0.4, { ink: 'B', w: 0.9, taper: 'none' }); R.line(453.6, y + 0.4, 456.4, y - 3.4, { ink: 'B', w: 0.9, taper: 'none' }); } R.text(t, 462, y, 3.7, { al: 'l' }); });
    R.text('if these fail, the estimate is unreliable', 548, 214, 3.9, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(6); for (let k = 0; k < 4; k++) A.dot(10 + 208 + 14 + ((k * 29 + p * 30) % 70), 36 + (k * 17 % 52) + Math.sin(p * TAU + k) * 2, 1.6, 'P', 0.9, k); },
});

/* ---------- 3.7.4e Succession ---------- */
S({
  id: '3.7.4e', num: '3.7.4', sub: 'Primary succession from pioneer species to climax community', title: 'Populations in ecosystems', topic: '3.7', slot: [0, 8], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.7.4.s8', '3.7.4.s9', '3.7.4.s10'],
  card: {
    text: 'Ecosystems are dynamic. In <b>primary succession</b> a bare area (e.g. rock or sand) is colonised by <b>pioneer species</b>, which are adapted to harsh abiotic conditions. At each stage, certain species change the environment (they add organic matter, form soil, retain water and add nutrients) so it becomes more suitable for other species with different adaptations; the new species may change it so that it becomes <b>less suitable</b> for the previous species, which are replaced. The environment becomes less hostile and <b>biodiversity</b> increases, until a stable <b>climax community</b> is reached. Conservation often involves <b>managing succession</b>, for example to keep habitats at an earlier stage.',
    terms: ['succession', 'primary succession', 'pioneer species', 'climax community', 'colonisation', 'biodiversity', 'soil formation', 'abiotic environment'],
    skill: 'AO2: explain how organisms change their environment', eq: null,
    q: 'Why can pioneer species be replaced by other species?', a: 'Pioneers change the environment (adding organic matter and forming soil) so it becomes more suitable for other species, which out-compete them and may make conditions unsuitable for the pioneers.'
  },
  draw(R, sc) {
    const stages = [['bare rock', 'weathering only'], ['pioneers', 'lichens, algae'], ['mosses, small plants', 'soil starts to form'], ['grasses, shrubs', 'deeper soil, shade'], ['climax community', 'stable, trees dominate']];
    stages.forEach((st, i) => {
      const x = 10 + i * 130, y0 = 120, w = 122;
      R.rrect(x, 22, w, 112, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.05, wob: 0.3 });
      R.text(st[0], x + w / 2, 33, 3.9, { al: 'c', ink: 'P' });
      const soil = [0, 2, 6, 11, 16][i];
      R.fill([x + 1, y0 - soil, x + w - 1, y0 - soil, x + w - 1, 134, x + 1, 134], { ink: soil ? 'Y' : 'B', t: soil ? 0.45 : 0.18, wob: 0.2 }); if (soil) R.fill([x + 1, y0 - soil, x + w - 1, y0 - soil, x + w - 1, 134, x + 1, 134], { ink: 'P', t: 0.18, wob: 0.2 });
      if (!soil) R.hatch([x + 1, y0, x + w - 1, y0, x + w - 1, 134, x + 1, 134], 40, 3.6, { ink: 'B', w: 0.4, t: 0.7 });
      else R.fill([x + 1, 126, x + w - 1, 126, x + w - 1, 134, x + 1, 134], { ink: 'B', t: 0.2, wob: 0.1 });
      R.line(x + 1, y0 - soil, x + w - 1, y0 - soil, { ink: 'B', w: 0.8, taper: 'none' });
      if (i >= 1) { lichen(R, x + 24, y0 - soil - 2); lichen(R, x + 92, y0 - soil - 2, 0.8); }
      if (i >= 2) { mossTuft(R, x + 50, y0 - soil); mossTuft(R, x + 76, y0 - soil); mossTuft(R, x + 108, y0 - soil, 0.8); }
      if (i >= 3) { grassTuft(R, x + 36, y0 - soil); grassTuft(R, x + 66, y0 - soil); shrubGlyph(R, x + 96, y0 - soil, 0.9); }
      if (i >= 4) { treeGlyph(R, x + 28, y0 - soil, 1.1); treeGlyph(R, x + 78, y0 - soil, 1.4); }
      R.text(st[1], x + w / 2, 148, 3.5, { al: 'c' });
      if (i < 4) R.arrow([x + w + 1, 78, x + 130 - 1, 78], { ink: 'B', w: 0.9, hs: 2.2 });
    });
    R.arrow([12, 164, 650, 164], { ink: 'P', w: 1.2, hs: 3.2 }); R.text('time', 331, 174, 4, { al: 'c', ink: 'P' });
    const g = R.graph(34, 182, 200, 48, { xmin: 0, xmax: 10, ymin: 0, ymax: 1, xl: '', yl: '', fs: 3.3 }).axes();
    g.curve(t => 1 - Math.exp(-0.45 * t), { ink: 'P', w: 1.5 }); g.curve(t => 0.15 + 0.6 * (1 - Math.exp(-0.5 * t)) + 0.12 * Math.sin(t * 0.3), { ink: 'T', w: 1.5 });
    R.text('soil depth and organic matter increase', 245, 200, 3.7, { al: 'l', ink: 'P' }); R.text('biodiversity increases', 245, 210, 3.7, { al: 'l', ink: 'T' });
    ['each stage changes the environment so that it becomes', 'more suitable for species with different adaptations;', 'the new species may make it less suitable for the earlier ones'].forEach((t, i) => R.text(t, 530, 184 + i * 8, 3.7, { al: 'c' }));
    R.text('abiotic conditions become less hostile', 530, 216, 3.8, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(8); A.dot(12 + p * 638, 164, 2.2, 'P', 0.95, 1); },
});

/* ---------- 3.7.4f Conservation and managing succession ---------- */
S({
  id: '3.7.4f', num: '3.7.4', sub: 'Conservation: managing succession and balancing human needs', title: 'Populations in ecosystems', topic: '3.7', slot: [2, 8], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.7.4.s9', '3.7.4.s12', '3.7.4.s13'],
  card: {
    text: 'Conservation of habitats frequently involves <b>managing succession</b>: grazing, cutting, coppicing or burning stops succession so that an earlier stage with high biodiversity is maintained (without management, grassland becomes scrub and then woodland). There is a conflict between <b>human needs</b> (food, timber, housing, fuel, water) and <b>conservation</b>; the aim is to manage natural resources so they are <b>sustainable</b>, i.e. available for future generations. You should be able to <b>evaluate evidence and data</b> about issues relating to the conservation of species and habitats, and consider <b>conflicting evidence</b> (sample size, controls, repeatability, bias, time scale, and whether a correlation shows cause).',
    terms: ['conservation', 'managing succession', 'sustainability', 'human needs', 'biodiversity', 'conflicting evidence', 'evaluate', 'sustainable resources'],
    skill: 'AO3: evaluate conflicting data on conservation', eq: null,
    q: 'Why might a conservationist stop succession at an early stage?', a: 'Early stages (e.g. grassland) can support a high biodiversity and species that would be lost as shrubs and trees take over; management such as grazing or cutting prevents succession.'
  },
  draw(R, sc) {
    R.text('managing succession', 108, 14, 4.3, { al: 'c' });
    R.rrect(10, 24, 80, 70, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.06, wob: 0.3 }); R.rrect(132, 24, 80, 70, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.06, wob: 0.3 });
    R.line(11, 82, 89, 82, { ink: 'B', w: 0.8, taper: 'none' }); R.line(133, 82, 211, 82, { ink: 'B', w: 0.8, taper: 'none' });
    for (let i = 0; i < 6; i++) grassTuft(R, 20 + i * 12, 82, 0.9); R.circle(28, 62, 1.8, { ink: 'P', w: 0.6, fi: 'P', ft: 0.9 }); R.circle(56, 66, 1.8, { ink: 'Y', w: 0.6, fi: 'Y', ft: 1 }); R.circle(76, 58, 1.8, { ink: 'P', w: 0.6, fi: 'P', ft: 0.9 });
    treeGlyph(R, 150, 82, 0.9); treeGlyph(R, 192, 82, 1.0); shrubGlyph(R, 171, 82, 0.8);
    R.text('grassland: many species', 50, 106, 3.5, { al: 'c' }); R.text('woodland: climax', 172, 106, 3.5, { al: 'c' });
    R.arrow([93, 50, 129, 50], { ink: 'P', w: 1.2, hs: 3 }); R.text('succession', 111, 44, 3.4, { al: 'c', ink: 'P' });
    R.arrow([129, 68, 93, 68], { ink: 'T', w: 1.2, hs: 3 }); R.text('management', 111, 77, 3.4, { al: 'c', ink: 'T' });
    ['grazing, cutting, coppicing or burning', 'stop succession and keep an early', 'stage with high biodiversity'].forEach((t, i) => R.text(t, 111, 122 + i * 7.6, 3.8, { al: 'c', ink: i == 0 ? 'T' : 'B' }));
    R.line(10, 154, 212, 154, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('sustainability', 111, 166, 4.1, { al: 'c', ink: 'P' });
    ['using resources at a rate that lets them', 'be replaced, so they remain available', 'for future generations'].forEach((t, i) => R.text(t, 111, 177 + i * 7.6, 3.8, { al: 'c' }));
    R.text('e.g. replanting after felling, fishing quotas', 111, 206, 3.6, { al: 'c', ink: 'T' });
    R.line(220, 14, 220, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // balance
    R.text('human needs against conservation', 330, 14, 4.3, { al: 'c' });
    R.line(330, 30, 330, 118, { ink: 'B', w: 1.6, taper: 'none' }); R.line(262, 40, 398, 40, { ink: 'B', w: 1.6, taper: 'none' });
    R.line(262, 40, 250, 60, { ink: 'B', w: 0.7, taper: 'none' }); R.line(262, 40, 274, 60, { ink: 'B', w: 0.7, taper: 'none' }); R.line(398, 40, 386, 60, { ink: 'B', w: 0.7, taper: 'none' }); R.line(398, 40, 410, 60, { ink: 'B', w: 0.7, taper: 'none' });
    R.ellipse(262, 61, 18, 4, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.4 }); R.ellipse(398, 61, 18, 4, { ink: 'B', w: 0.9, fi: 'T', ft: 0.4 });
    R.rect(240, 118, 180, 6, { ink: 'B', w: 0.8, fi: 'B', ft: 0.2 });
    ['food', 'timber', 'housing', 'fuel'].forEach((t, i) => R.text(t, 262, 74 + i * 8, 3.7, { al: 'c' })); ['habitats', 'species', 'biodiversity'].forEach((t, i) => R.text(t, 398, 74 + i * 8, 3.7, { al: 'c' }));
    R.text('human needs', 262, 32, 3.8, { al: 'c', ink: 'P' }); R.text('conservation', 398, 32, 3.8, { al: 'c', ink: 'T' });
    ['conflict between the two must be managed', 'so natural resources stay sustainable'].forEach((t, i) => R.text(t, 330, 140 + i * 8, 3.9, { al: 'c' }));
    R.text('ways to balance them', 330, 166, 4, { al: 'c', ink: 'P' });
    ['protected areas and managed use', 'quotas, replanting, rotation', 'involving local people and farmers'].forEach((t, i) => R.text(t, 330, 177 + i * 8, 3.8, { al: 'c' }));
    R.line(440, 14, 440, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // evaluate conflicting data
    R.text('evaluating conflicting evidence', 548, 14, 4.3, { al: 'c' });
    [['study A', [8, 14], 'T'], ['study B', [10, 9], 'P']].forEach(([nm, vals, ink], i) => { const x0 = 456 + i * 100; R.text(nm, x0 + 38, 28, 3.8, { al: 'c' }); vals.forEach((v, k) => { R.rect(x0 + 12 + k * 30, 100 - v * 4.4, 20, v * 4.4, { ink: 'B', w: 0.8, fi: ink, ft: 0.28 }); }); R.line(x0 + 6, 100, x0 + 74, 100, { ink: 'B', w: 0.6, taper: 'none' }); R.text('managed', x0 + 22, 108, 3.1, { al: 'c' }); R.text('unmanaged', x0 + 52, 108, 3.1, { al: 'c' }); });
    R.text('species per site: A shows an effect, B shows little', 548, 120, 3.5, { al: 'c' });
    ['sample size and number of sites', 'random sampling, controls, repeats', 'time scale of the study', 'who did it and why (bias)', 'correlation is not proof of cause'].forEach((t, i) => { R.circle(458, 143 + i * 14, 3, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.4 }); R.text(t, 466, 144.4 + i * 14, 3.8, { al: 'l' }); });
    R.text('consider all of the evidence', 548, 222, 3.9, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(111 + Math.cos(p * TAU) * 6, 62 + Math.sin(p * TAU) * 6, 1.4, 'P', 0.8, 1); },
});

/* ===================== RP12 Distribution of a species and an environmental factor ===================== */
rpScene({
  id: 'RP12', num: '3.7.4', rp: 12, title: 'Populations in ecosystems', sub: 'Required practical 12: effect of a named environmental factor on the distribution of a given species', topic: '3.7', slot: [0, 9],
  covers: ['RP12'], at: ['a', 'b', 'h', 'k', 'l'], ms: ['MS 1.5', 'MS 2.4', 'MS 1.9'], ps: ['PS 2.1', 'PS 2.4', 'PS 3.3'],
  card: {
    text: 'Investigate the effect of a <b>named environmental factor</b> on the <b>distribution</b> of a <b>given species</b> using <b>random sampling</b>. The AQA handbook’s example compares the cover of dandelions on a lawn treated with weed killer and one that is not, using a <b>point quadrat</b> (a frame with pointers): generate random coordinates with a random number table, place the frame using two tape measures, record each pointer that hits a dandelion, take 100 pointer samples at each site (10 placements) and calculate <b>percentage cover</b> = (hits ÷ pointer samples) × 100. A square quadrat or a transect (for example away from a path to measure the effect of trampling) can be used instead; measure the environmental factor as well. This is one example; schools may vary the species and factor.',
    terms: ['distribution', 'named environmental factor', 'random sampling', 'point quadrat', 'percentage cover', 'transect', 'random number table', 'abundance'],
    skill: 'MS 1.5 / MS 2.4: sampling; percentage cover; (optionally) Spearman’s rank', eq: MATH(mt('percentage cover '), mo('='), mfrac(mt('pointers touching the species'), mt('total pointer samples')), mo('×'), mn(100)),
    eqn: 'Treated lawn: 7 hits in 100 pointer samples → 7 % cover; untreated: 38 hits → 38 %',
    q: 'Why are the positions of the quadrats chosen using random numbers?', a: 'To avoid bias (for example, placing the quadrat where the species looks most or least abundant), so the sample represents the whole area and statistics can be used.'
  },
  apparatus(R, b) {
    R.text('lawn A (treated) and lawn B (untreated), random positions', 92, 21, 3.7, { al: 'c' });
    [[12, 'A', 0.1], [96, 'B', 0.55]].forEach(([x, nm, d]) => {
      R.rect(x, 28, 76, 56, { ink: 'B', w: 0.9, fi: 'T', ft: 0.12, wob: 0.2 }); R.text(nm, x + 6, 38, 4.4, { al: 'l', ink: 'P' });
      for (let k = 0; k < 30; k++) { const h = Math.sin(k * 47.3 + (nm === 'A' ? 1 : 9)) * 4375.85, fx = h - Math.floor(h), h2 = Math.sin(k * 21.7 + 3) * 9871.3, fy = h2 - Math.floor(h2); if (fx < d + 0.1 || nm === 'B' && fx < 0.9) R.circle(x + 4 + fx * 68, 32 + fy * 48, 1.3, { ink: 'B', w: 0.5, fi: 'Y', ft: 1 }); }
      [[10, 12], [42, 18], [24, 34], [52, 38]].forEach(([qx, qy]) => R.rect(x + qx, 28 + qy, 12, 12, { ink: 'P', w: 1, wob: 0.15 }));
    });
    // point quadrat
    R.line(10, 114, 170, 114, { ink: 'B', w: 1.2, taper: 'none' }); R.line(20, 114, 20, 90, { ink: 'B', w: 1.2, taper: 'none' }); R.line(160, 114, 160, 90, { ink: 'B', w: 1.2, taper: 'none' }); R.line(20, 92, 160, 92, { ink: 'B', w: 1.2, taper: 'none' });
    for (let k = 0; k < 10; k++) { const x = 30 + k * 13; R.line(x, 92, x, 118, { ink: 'B', w: 0.8, taper: 'none' }); R.circle(x, 119, 0.9, { ink: 'P', w: 0.5 }); if (k === 3 || k === 6) { R.circle(x + 1, 126, 3, { ink: 'B', w: 0.6, fi: 'Y', ft: 1 }); R.line(x, 118, x + 1, 124, { ink: 'P', w: 1, taper: 'none' }); } }
    R.text('point quadrat: record each pointer that hits', 88, 138, 3.4, { al: 'c' });
  },
  results(R, b) {
    R.text('percentage cover of dandelions', b.x + 60, b.y + 6, 3.8, { al: 'c' });
    const g = R.graph(b.x + 26, b.y + 14, 84, 84, { xmin: 0, xmax: 3, ymin: 0, ymax: 50, yl: '% cover', fs: 3.5, ylx: 12, yt: [[0, '0'], [10, '10'], [20, '20'], [30, '30'], [40, '40'], [50, '50']] }).axes();
    [[0.5, 7, 'P'], [1.8, 38, 'T']].forEach(([x, v, ink], i) => { R.rect(g.X(x), g.Y(v), 24, g.Y(0) - g.Y(v), { ink: 'B', w: 0.8, fi: ink, ft: 0.28 }); R.text(i ? 'B' : 'A', g.X(x) + 12, g.Y(0) + 7, 3.8, { al: 'c' }); R.text(v + ' %', g.X(x) + 12, g.Y(v) - 2, 3.6, { al: 'c' }); });
    R.text('A treated, B untreated', b.x + 60, b.y + 112, 3.5, { al: 'c' });
  },
  vars: { iv: 'factor, e.g. weed killer', dv: '% cover of the species', ctl: ['species and quadrat', 'number of samples'] },
  calc: ['hits ÷ samples × 100', 'A: 7 ÷ 100 × 100 = 7 %', 'B: 38 ÷ 100 × 100 = 38 %', 'then compare A with B'],
  risks: [['bio', 'wash hands, ticks'], ['warn', 'weed killer: read label'], ['ethics', 'leave site as found']],
  limits: ['one site per treatment', 'other factors differ', 'species identification'],
  interp: 'factor affects where it grows',
  anim(A, sc) { const p = A.ph(5); A.dot(13 + ((Math.floor(p * 4)) % 4) * 14 + 6, 28 + 18 + (Math.floor(p * 4) % 2) * 8, 1.6, 'P', 0.9, 1); },
});
