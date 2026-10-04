/* ===================== TOPIC 3.3 Organisms exchange substances with their environment ===================== */
/* isometric cube, front-left corner (x,y) is the bottom-left of the front face */
function isoCube(R, x, y, s, o = {}) {
  const dx = s * 0.5, dy = -s * 0.4;
  R.fill([x, y, x + s, y, x + s, y - s, x, y - s], { ink: 'Y', t: 0.4, wob: 0.1 });
  R.fill([x, y - s, x + dx, y - s + dy, x + s + dx, y - s + dy, x + s, y - s], { ink: 'Y', t: 0.18, wob: 0.1 });
  R.fill([x + s, y, x + s + dx, y + dy, x + s + dx, y - s + dy, x + s, y - s], { ink: 'Y', t: 0.62, wob: 0.1 });
  R.poly([x, y, x + s, y, x + s, y - s, x, y - s], { ink: 'B', w: 1.1, wob: 0.15 });
  R.poly([x, y - s, x + dx, y - s + dy, x + s + dx, y - s + dy, x + s, y - s], { ink: 'B', w: 1.1, wob: 0.15 });
  R.poly([x + s, y, x + s + dx, y + dy, x + s + dx, y - s + dy, x + s, y - s], { ink: 'B', w: 1.1, wob: 0.15 });
}
/* simple mammal silhouette facing right; kind: mouse | cat | human-ish | elephant */
function mammal(R, x, y, s, kind) {
  R.push(x, y, 0, s);
  const body = { mouse: [0, 0, 7, 3.5], cat: [0, 0, 11, 5.4], horse: [0, 0, 14, 6.4], elephant: [0, 0, 17, 9] }[kind];
  R.ellipse(body[0], body[1], body[2], body[3], { ink: 'B', w: 1.2 / s, fi: 'P', ft: 0.28, wob: 0.3 });
  R.circle(body[2] * 0.85, -body[3] * 0.5, body[3] * 0.62, { ink: 'B', w: 1.1 / s, fi: 'P', ft: 0.28, wob: 0.2 });
  if (kind === 'elephant') { R.stroke([body[2] * 1.2, -body[3] * 0.35, body[2] * 1.4, body[3] * 0.4, body[2] * 1.3, body[3] * 0.9], { ink: 'B', w: 2.2 / s, smooth: true, taper: 'end' }); R.ellipse(body[2] * 0.62, -body[3] * 0.5, 4, 5.4, { ink: 'B', w: 1 / s, fi: 'P', ft: 0.4, wob: 0.2 }); }
  else R.ellipse(body[2] * 0.7, -body[3] * 0.95, body[3] * 0.28, body[3] * 0.4, { ink: 'B', w: 0.9 / s, fi: 'P', ft: 0.4 });
  [-0.6, -0.2, 0.3, 0.7].forEach(f => R.line(f * body[2], body[3] * 0.7, f * body[2], body[3] * (kind === 'mouse' ? 1.3 : 1.7), { ink: 'B', w: (kind === 'elephant' ? 2.6 : 1.2) / s, taper: 'none' }));
  if (kind !== 'elephant') R.stroke([-body[2], -body[3] * 0.1, -body[2] * 1.4, -body[3] * 0.6, -body[2] * 1.7, -body[3] * 0.2], { ink: 'B', w: 0.8 / s, smooth: true, taper: 'end' });
  R.pop();
}

/* ---------- 3.3.1 Surface area to volume ratio ---------- */
S({
  id: '3.3.1', num: '3.3.1', sub: 'Surface area to volume ratio', title: 'Surface area to volume ratio', topic: '3.3', slot: [0, 0], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.3.1.s1', '3.3.1.s2', '3.3.1.s3'],
  card: {
    text: 'As an organism or structure gets larger, its <b>surface area to volume ratio</b> gets smaller: volume (which needs supplying) grows faster than surface area (through which exchange happens). Small organisms can exchange by diffusion across the body surface. Larger organisms are adapted by changes to <b>body shape</b> (e.g. flattening) and by the development of <b>exchange surfaces</b> and <b>mass transport systems</b>. A small mammal has a large surface area to volume ratio, loses heat quickly and so has a higher <b>metabolic rate</b> per gram than a large one.',
    terms: ['surface area to volume ratio', 'exchange surface', 'diffusion', 'metabolic rate', 'body shape', 'mass transport'],
    skill: 'MS 4.1: surface area : volume', eq: MATH(mt('cube: SA : V '), mo('='), mfrac(mn('6'), mi('a'))),
    eqn: 'Cube of side a: surface area = 6a², volume = a³, so SA:V = 6 ÷ a',
    q: 'Why does a mouse need a much higher metabolic rate per gram than an elephant?', a: 'The mouse has a larger surface area to volume ratio, so it loses heat much faster and must release more energy per gram to stay warm.'
  },
  draw(R, sc) {
    R.text('as size increases, SA:V decreases', 112, 15, 5.2, { al: 'c' });
    isoCube(R, 16, 104, 15); isoCube(R, 48, 104, 30); isoCube(R, 108, 104, 60);
    [['1 cm', 26], ['2 cm', 70], ['4 cm', 148]].forEach(([t, x]) => R.text(t, x, 116, 4.2, { al: 'c' }));
    R.table(18, 126, [38, 46, 46, 50], 12, [['side', 'SA / cm^2', 'V / cm^3', 'SA : V'], ['1 cm', '6', '1', '6 : 1'], ['2 cm', '24', '8', '3 : 1'], ['4 cm', '96', '64', '1.5 : 1']], { size: 4.2 });
    R.text('SA = 6a^2   V = a^3   SA:V = 6 ÷ a', 112, 190, 4.8, { al: 'c' });
    R.arrow([18, 210, 200, 210], { ink: 'P', w: 1.2, hs: 3 }); R.text('size increases', 110, 206, 4.2, { al: 'c' }); R.text('ratio decreases', 110, 224, 4.2, { al: 'c', ink: 'P' });
    R.line(230, 22, 230, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // organisms
    R.text('larger organisms need exchange surfaces and transport systems', 336, 15, 5.2, { al: 'c' });
    const ox = [256, 306, 356, 406];
    // single-celled
    R.stroke([ox[0] - 10, 78, ox[0] - 4, 66, ox[0] + 8, 68, ox[0] + 12, 80, ox[0] + 4, 90, ox[0] - 8, 88], { ink: 'B', w: 1.2, smooth: true, closed: true, taper: 'none', wob: 0.5 }); R.circle(ox[0], 78, 3, { ink: 'B', w: 0.8, fi: 'B', ft: 0.35 });
    [[-18, 70], [-18, 86]].forEach(([dx, dy]) => R.arrow([ox[0] + dx - 4, 78 + (dy - 78), ox[0] + dx + 8, 78 + (dy - 78) * 0.6], { ink: 'T', w: 0.8, hs: 2 }));
    R.text('single cell', ox[0], 106, 4, { al: 'c' }); R.text('diffusion', ox[0], 112, 3.8, { al: 'c' }); R.text('across surface', ox[0], 118, 3.8, { al: 'c' });
    // flatworm: flat body
    R.rrect(ox[1] - 22, 74, 44, 7, 3.5, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.3, wob: 0.3 }); R.circle(ox[1] - 16, 77.5, 1.2, { ink: 'B', w: 0.7, fi: 'B', ft: 1 });
    R.text('flat body', ox[1], 106, 4, { al: 'c' }); R.text('keeps SA:V', ox[1], 112, 3.8, { al: 'c' }); R.text('large', ox[1], 118, 3.8, { al: 'c' });
    // insect
    R.ellipse(ox[2] + 12, 78, 11, 5.4, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.3 }); R.ellipse(ox[2] - 4, 77, 5.4, 4, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.3 }); R.circle(ox[2] - 14, 76, 3.4, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.3 });
    [-6, 0, 6].forEach(d => R.line(ox[2] - 4 + d, 80, ox[2] - 6 + d * 1.6, 90, { ink: 'B', w: 0.8, taper: 'none' })); [6, 12, 18].forEach(d => R.dot(ox[2] + d, 81.5, 0.9, { ink: 'P' }));
    R.text('insect', ox[2], 106, 4, { al: 'c' }); R.text('tracheal system', ox[2], 112, 3.8, { al: 'c' });
    // fish
    R.stroke([ox[3] - 18, 78, ox[3] - 6, 68, ox[3] + 10, 70, ox[3] + 18, 78, ox[3] + 10, 86, ox[3] - 6, 88], { ink: 'B', w: 1.1, smooth: true, closed: true, taper: 'none' }); R.fill([ox[3] + 18, 78, ox[3] + 28, 70, ox[3] + 28, 86], { ink: 'Y', t: 0.4, wob: 0.1 }); R.poly([ox[3] + 18, 78, ox[3] + 28, 70, ox[3] + 28, 86], { ink: 'B', w: 1 });
    R.line(ox[3] - 8, 72, ox[3] - 8, 84, { ink: 'P', w: 1.2, taper: 'none' }); R.dot(ox[3] - 14, 76, 0.9, { ink: 'B' });
    R.text('fish', ox[3] + 4, 106, 4, { al: 'c' }); R.text('gills', ox[3] + 4, 112, 3.8, { al: 'c' });
    // mammal
    mammal(R, 466, 78, 1.9, 'cat');
    R.text('mammal', 468, 106, 4, { al: 'c' }); R.text('lungs, gut, heart', 468, 112, 3.8, { al: 'c' }); R.text('and blood vessels', 468, 118, 3.8, { al: 'c' });
    R.arrow([246, 40, 500, 40], { ink: 'P', w: 1.2, hs: 3 }); R.text('body size increases: SA:V decreases', 372, 36, 4.2, { al: 'c', ink: 'P' });
    // lower text: why
    R.line(240, 134, 500, 134, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    ['small organism: large SA:V,', 'short diffusion distance:', 'diffusion across the body surface supplies all cells'].forEach((t, i) => R.text(t, 250, 150 + i * 7, 4.2, { al: 'l' }));
    ['large organism: small SA:V,', 'cells too far from the surface:', 'specialised exchange surfaces', 'and mass transport needed'].forEach((t, i) => R.text(t, 250, 182 + i * 7, 4.2, { al: 'l' }));
    R.line(510, 22, 510, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // metabolic rate
    R.text('SA:V and metabolic rate', 584, 15, 5.2, { al: 'c' });
    const g = R.graph(538, 36, 104, 100, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'body mass', yl: 'metabolic rate per gram', xt: [], yt: [], fs: 4.2, xly: 9, ylx: 5 }).axes();
    g.curve(x => 9.6 / (0.9 + x * 0.6) + 0.2, { ink: 'P', w: 1.6, from: 0.4 });
    mammal(R, g.X(0.9), g.Y(8.8) - 8, 0.7, 'mouse'); mammal(R, g.X(3.2), g.Y(4.4) - 9, 0.8, 'cat'); mammal(R, g.X(8.4), g.Y(1.9) - 12, 0.6, 'elephant');
    ['small mammal: large SA:V', '→ loses heat fast', '→ high metabolic rate per gram'].forEach((t, i) => R.text(t, 584, 164 + i * 7, 4.2, { al: 'c' }));
    ['large mammal: small SA:V', '→ loses heat slowly', '→ lower rate per gram'].forEach((t, i) => R.text(t, 584, 192 + i * 7, 4.2, { al: 'c' }));
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) A.dot(238 + ((p + i / 3) % 1) * 36, 70 + i * 8, 1.2, 'T', 0.8, i);
      },
});

/* ---------- 3.3.2a Gas exchange in a single-celled organism and in the insect tracheal system ---------- */
S({
  id: '3.3.2a', num: '3.3.2', sub: 'Gas exchange: body surface of a single-celled organism; insect tracheal system', title: 'Gas exchange', topic: '3.3', slot: [2, 0], span: [2, 1], dna: 'mark', ao: 1,
  covers: ['3.3.2.s1', '3.3.2.s2'],
  card: {
    text: 'A <b>single-celled organism</b> has a large surface area to volume ratio and a short diffusion distance, so oxygen and carbon dioxide diffuse across its body surface. In an <b>insect</b>, air enters through <b>spiracles</b> along the body and passes along branching <b>tracheae</b> to fine, fluid-filled <b>tracheoles</b> that reach the muscle cells. Oxygen diffuses down its concentration gradient to the cells, carbon dioxide diffuses out; abdominal movements can ventilate the system. Spiracles can close to reduce water loss.',
    terms: ['body surface', 'diffusion', 'spiracle', 'trachea', 'tracheole', 'concentration gradient', 'surface area to volume ratio'],
    skill: 'Diffusion distance', eq: null,
    q: 'Why do tracheoles end very close to, or inside, muscle cells?', a: 'To keep the diffusion distance for oxygen very short, since insects have no blood transporting oxygen to cells.'
  },
  draw(R, sc) {
    R.text('single-celled organism', 100, 15, 5.2, { al: 'c' });
    const cell = [60, 80, 80, 56, 118, 52, 150, 70, 160, 104, 142, 138, 108, 152, 72, 142, 52, 114];
    R.fill(cell, { ink: 'T', t: 0.14, smooth: true, wob: 0.6 }); R.poly(cell, { ink: 'B', w: 1.6, smooth: true, wob: 0.8 });
    R.circle(112, 98, 13, { ink: 'B', w: 1, fi: 'B', ft: 0.3, wob: 0.3 }); R.circle(124, 128, 10, { ink: 'B', w: 0.9, fi: 'T', ft: 0.3 }); R.circle(80, 118, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.3 });
    R.mito(86, 90, 14, 7, 30, { plain: true }); R.mito(136, 80, 14, 7, -20, { plain: true });
    [[44, 70], [48, 120], [52, 98]].forEach(([x, y]) => R.arrow([x - 12, y, x + 6, y + 4], { ink: 'P', w: 1.1, hs: 2.6 })); R.text('O_2 in', 24, 124, 4.4, { al: 'c', ink: 'P' });
    [[158, 76], [164, 120]].forEach(([x, y]) => R.arrow([x - 6, y, x + 14, y - 3], { ink: 'T', w: 1.1, hs: 2.6 })); R.text('CO_2 out', 182, 100, 4.4, { al: 'c', ink: 'T' });
    ['large surface area : volume', 'short diffusion distance', 'no specialised exchange surface needed'].forEach((t, i) => R.text(t, 100, 176 + i * 7, 4.2, { al: 'c' }));
    R.scaleBar(60, 224, 60, 'about 0.1 mm'); R.text('amoeba', 100, 168, 4.2, { al: 'c' });
    R.line(200, 22, 200, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // ---- insect
    R.text('insect: tracheal system', 430, 15, 5.2, { al: 'c' });
    const bx = 214, by = 96;
    R.ellipse(bx + 190, by + 8, 70, 26, { ink: 'B', w: 1.5, fi: 'Y', ft: 0.2, wob: 0.5 });           // abdomen
    R.ellipse(bx + 92, by + 4, 34, 22, { ink: 'B', w: 1.5, fi: 'Y', ft: 0.2, wob: 0.5 });            // thorax
    R.circle(bx + 40, by, 18, { ink: 'B', w: 1.5, fi: 'Y', ft: 0.2, wob: 0.4 }); R.circle(bx + 34, by - 4, 5, { ink: 'B', w: 1, fi: 'B', ft: 0.6 });
    [[62, 20], [100, 20], [124, 18]].forEach(([dx, dy]) => R.stroke([bx + dx, by + dy, bx + dx - 12, by + 50, bx + dx - 28, by + 64], { ink: 'B', w: 1.3, smooth: true, taper: 'end' }));
    for (let k = 0; k < 7; k++) { const sx = bx + 78 + k * 28, sy = by + 28 - Math.abs(k - 3) * 0.3; R.circle(sx, by + 30 - (k > 1 ? 3 : 0), 2.2, { ink: 'B', w: 0.9, fi: 'P', ft: 0.9 }); }
    // trachea network: main longitudinal trunk plus branches
    const trunk = [bx + 70, by + 4, bx + 120, by + 2, bx + 180, by + 4, bx + 240, by + 6]; R.stroke(trunk, { ink: 'T', w: 3, t: 0.5, smooth: true, taper: 'none', solid: false }); R.stroke(trunk, { ink: 'B', w: 0.8, smooth: true, taper: 'none' });
    for (let k = 0; k < 7; k++) { const sx = bx + 78 + k * 28, tp = [sx, by + 30 - (k > 1 ? 3 : 0), sx + 2, by + 18, sx - 1, by + 8, sx, by + 4]; R.stroke(tp, { ink: 'T', w: 2.2, t: 0.5, smooth: true, taper: 'none', solid: false }); R.stroke(tp, { ink: 'B', w: 0.7, smooth: true, taper: 'none' }); for (let q = 0; q < 4; q++) R.line(sx - 2, by + 28 - q * 5 - (k > 1 ? 3 : 0), sx + 2.4, by + 28 - q * 5 - (k > 1 ? 3 : 0), { ink: 'B', w: 0.5, taper: 'none' }); }
    for (let k = 0; k < 7; k++) { const sx = bx + 78 + k * 28; R.stroke([sx, by + 6, sx - 8, by - 6, sx - 10, by - 14], { ink: 'B', w: 0.6, smooth: true }); R.stroke([sx, by + 6, sx + 8, by - 8, sx + 10, by - 15], { ink: 'B', w: 0.6, smooth: true }); }
    // labels
    const lab = (s, tx, ty, x, y, al) => leader(R, s, x, y, tx, ty, { size: 4.4, al });
    lab('spiracle', 284, 168, bx + 106, by + 30, 'c'); lab('trachea', 330, 40, bx + 120, by + 2, 'c'); lab('tracheoles', 386, 36, bx + 128, by - 12, 'c');
    // zoom: tracheole end at a muscle cell
    R.circle(560, 128, 54, { ink: 'B', w: 1.4, fi: 'P', ft: 0.08 });
    R.line(bx + 204, by + 22, 548, 150, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.rrect(534, 104, 52, 40, 8, { ink: 'B', w: 1.1, fi: 'P', ft: 0.3, wob: 0.3 }); R.text('muscle cell', 560, 128, 4, { al: 'c' });
    R.stroke([510, 150, 530, 140, 538, 132], { ink: 'T', w: 4, t: 0.4, smooth: true, taper: 'none', solid: false }); R.stroke([510, 150, 530, 140, 538, 132], { ink: 'B', w: 0.8, smooth: true, taper: 'none' });
    R.text('tracheole', 520, 168, 4.2, { al: 'c' });
    R.arrow([512, 106, 530, 120], { ink: 'P', w: 1, hs: 2.4 }); R.text('O_2', 514, 100, 4.4, { al: 'c', ink: 'P' });
    R.arrow([590, 134, 612, 118], { ink: 'T', w: 1, hs: 2.4 }); R.text('CO_2', 622, 116, 4.4, { al: 'c', ink: 'T' });
    ['air enters through spiracles,', 'diffuses along tracheae and tracheoles', 'to the cells: short diffusion distance'].forEach((t, i) => R.text(t, 430, 188 + i * 7, 4.2, { al: 'c' }));
    R.scaleBar(540, 212, 50, '50 µm');
  },
  anim(A, sc) {
    const p = A.ph(4); for (let i = 0; i < 4; i++) { const u = (p + i / 4) % 1; A.dot(32 + u * 56, 80 + Math.sin(i * 2) * 16, 1.4, 'P', 0.8, i); }
    for (let k = 0; k < 7; k += 2) { const u = (p + k / 7) % 1; A.dot(292 + k * 28, 126 - u * 22, 1.4, 'P', 0.9, 10 + k); }
    A.dot(512 + 26 * p, 148 - 18 * p, 1.4, 'P', 0.9, 30);
  },
});

/* ---------- 3.3.2b Fish gills: counter-current principle ---------- */
S({
  id: '3.3.2b', num: '3.3.2', sub: 'Gas exchange across the gills of a fish: counter-current principle', title: 'Gas exchange', topic: '3.3', slot: [0, 1], dna: 'mark', ao: 2,
  covers: ['3.3.2.s3'],
  card: {
    text: 'Fish gills have many <b>filaments</b>, each covered with plate-like <b>gill lamellae</b> that give a large surface area; the lamellae are thin, with a rich blood supply. Water flows over the lamellae in one direction and blood flows through them in the <b>opposite direction</b>: the <b>counter-current</b> principle. This keeps a concentration gradient between water and blood along the whole length of the lamella, so much more oxygen diffuses into the blood than if the flows were in the same direction (parallel).',
    terms: ['gill filament', 'gill lamella', 'counter-current', 'concentration gradient', 'diffusion', 'surface area'],
    skill: 'Compare gradients (example values)', eq: null,
    q: 'Why does the counter-current flow absorb more oxygen than parallel flow?', a: 'Blood always meets water with a higher oxygen concentration, so a gradient is maintained along the entire lamella; in parallel flow the two equilibrate part-way and diffusion stops.'
  },
  draw(R, sc) {
    R.text('fish gill: counter-current exchange', 160, 15, 5.2, { al: 'c' });
    // fish with the operculum cut away to show the gill arches
    const body = [12, 62, 24, 46, 54, 38, 86, 44, 106, 56, 114, 62, 106, 70, 86, 80, 54, 86, 24, 80];
    R.fill(body, { ink: 'Y', t: 0.2, smooth: true, wob: 0.5 }); R.poly(body, { ink: 'B', w: 1.5, smooth: true, wob: 0.5 });
    R.fill([112, 62, 128, 46, 126, 78], { ink: 'Y', t: 0.35, wob: 0.2 }); R.poly([112, 62, 128, 46, 126, 78], { ink: 'B', w: 1.2, wob: 0.2 });
    R.circle(24, 58, 3.6, { ink: 'B', w: 1, fi: 'B', ft: 0.5 });
    R.knock(R.rrectPts(38, 44, 22, 34, 8)); R.rrect(38, 44, 22, 34, 8, { ink: 'B', w: 0.9, fi: 'P', ft: 0.12, wob: 0.3 });
    for (let k = 0; k < 4; k++) { const ax = 42 + k * 5; R.stroke([ax, 47, ax + 3, 61, ax + 1, 75], { ink: 'P', w: 2.6, t: 0.7, smooth: true, taper: 'none', solid: false }); R.stroke([ax, 47, ax + 3, 61, ax + 1, 75], { ink: 'B', w: 0.6, smooth: true, taper: 'none' }); }
    R.stroke([62, 40, 56, 62, 62, 84], { ink: 'B', w: 1.1, smooth: true, taper: 'none' });
    R.text('gills (operculum cut away)', 62, 98, 3.9, { al: 'c' });
    R.line(60, 46, 136, 30, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' }); R.line(52, 76, 136, 92, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // one gill arch with filaments
    R.stroke([140, 88, 156, 62, 188, 54, 208, 60], { ink: 'P', w: 5, t: 0.7, smooth: true, taper: 'none', solid: false }); R.stroke([140, 88, 156, 62, 188, 54, 208, 60], { ink: 'B', w: 1.2, smooth: true, taper: 'none' });
    for (let i = 0; i < 9; i++) { const u = i / 8, ax = 144 + u * 62, ay = 84 - Math.sin(u * 2.2 + 0.2) * 30 + u * 2; R.line(ax, ay, ax + 10 + u * 4, ay - 28, { ink: 'B', w: 1, taper: 'none' }); R.line(ax, ay, ax + 10 + u * 4, ay - 28, { ink: 'P', w: 2.6, t: 0.45, taper: 'none', solid: false }); }
    R.text('gill arch with filaments', 166, 100, 3.8, { al: 'c' });
    // filament with lamellae
    R.line(262, 24, 262, 92, { ink: 'B', w: 1.3, taper: 'none' }); R.line(262, 24, 262, 92, { ink: 'P', w: 4.4, t: 0.55, taper: 'none', solid: false });
    for (let i = 0; i < 8; i++) { const y = 26 + i * 8.2; R.rect(266, y, 22, 2.8, { ink: 'B', w: 0.7, fi: 'P', ft: 0.55, wob: 0.1 }); R.rect(236, y, 22, 2.8, { ink: 'B', w: 0.7, fi: 'P', ft: 0.55, wob: 0.1 }); }
    R.arrow([226, 22, 262, 22], { ink: 'T', w: 0.9, hs: 2.2 }); R.arrow([290, 66, 306, 66], { ink: 'T', w: 0.9, hs: 2.2 });
    leader(R, 'filament', 262, 84, 298, 88, { size: 3.9, al: 'c' }); leader(R, 'lamellae', 277, 45, 300, 36, { size: 3.9, al: 'c' });
    R.text('many thin lamellae:', 258, 101, 3.8, { al: 'c' }); R.text('large surface area', 258, 107, 3.8, { al: 'c' });
    R.line(8, 110, 312, 110, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // counter-current vs parallel schematics
    const lam = (y, label, wv, bv, counter) => {
      R.text(label, 160, y, 4.6, { al: 'c' });
      R.rrect(44, y + 4, 224, 20, 6, { ink: 'B', w: 1.1, fi: 'P', ft: 0.12 });
      R.arrow([48, y + 30, 264, y + 30], { ink: 'T', w: 1.1, hs: 3 }); R.text('water', 276, y + 32, 4, { al: 'l', ink: 'T' });
      if (counter) R.arrow([264, y + 37, 48, y + 37], { ink: 'P', w: 1.1, hs: 3 }); else R.arrow([48, y + 37, 264, y + 37], { ink: 'P', w: 1.1, hs: 3 });
      R.text('blood', 276, y + 39, 4, { al: 'l', ink: 'P' });
      wv.forEach((v, i) => R.text(String(v), 62 + i * 46, y + 13, 4.4, { al: 'c', ink: 'T' })); bv.forEach((v, i) => R.text(String(v), 62 + i * 46, y + 22, 4.4, { al: 'c', ink: 'P' }));
    };
    lam(120, 'counter-current: flows in opposite directions', [100, 90, 70, 50, 30], [90, 70, 50, 30, 10], true);
    R.text('a gradient is kept along the whole lamella', 160, 168, 4, { al: 'c' });
    lam(180, 'parallel flow (for comparison)', [100, 80, 60, 50, 50], [0, 20, 40, 50, 50], false);
    R.text('equilibrium is reached: diffusion stops', 160, 229, 3.9, { al: 'c' }); R.text('numbers: % O_2 saturation (example values)', 160, 236, 3.6, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(4); for (let i = 0; i < 4; i++) A.dot(50 + ((p + i / 4) % 1) * 212, 150, 1.3, 'T', 0.8, i);
    for (let i = 0; i < 4; i++) A.dot(262 - ((p + i / 4) % 1) * 212, 157, 1.3, 'P', 0.9, 8 + i);
  },
});

/* ---------- 3.3.2c Dicotyledonous leaf ---------- */
S({
  id: '3.3.2c', num: '3.3.2', sub: 'Gas exchange in the leaves of dicotyledonous plants: mesophyll and stomata', title: 'Gas exchange', topic: '3.3', slot: [1, 1], dna: 'mark', ao: 1,
  covers: ['3.3.2.s4'],
  card: {
    text: 'In a dicotyledonous leaf, gas exchange occurs through pores called <b>stomata</b>, opened and closed by pairs of <b>guard cells</b>, mostly in the lower epidermis. Carbon dioxide diffuses through the stomata into the air spaces of the <b>spongy mesophyll</b>, dissolves in the film of water on the cell walls and diffuses into the <b>palisade mesophyll</b> cells, where photosynthesis takes place. Oxygen and water vapour diffuse out. The large surface area of the mesophyll cells and the short diffusion distance make exchange efficient.',
    terms: ['stoma', 'guard cell', 'mesophyll', 'palisade mesophyll', 'spongy mesophyll', 'air space', 'epidermis', 'cuticle'],
    skill: 'AT d: examine a vertical section', eq: null,
    q: 'Where in a leaf does most carbon dioxide diffuse into cells?', a: 'Into the palisade (and spongy) mesophyll cells, from the air spaces beneath the stomata.'
  },
  draw(R, sc) {
    R.text('vertical section of a dicot leaf', 120, 15, 5.2, { al: 'c' });
    const X0 = 14, X1 = 232;
    // cuticle + upper epidermis
    R.rect(X0, 28, X1 - X0, 2.6, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.6, wob: 0.15 });
    for (let i = 0; i < 10; i++) R.rect(X0 + i * 21.8, 31, 21.8, 14, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.08, wob: 0.15 });
    // palisade mesophyll
    for (let i = 0; i < 14; i++) { const x = X0 + 1 + i * 15.5; R.rrect(x, 46, 14, 46, 4, { ink: 'B', w: 0.9, fi: 'TY', ft: 0.12, wob: 0.15 }); for (let k = 0; k < 7; k++) R.ellipse(x + 3.5 + (k % 2) * 6, 52 + k * 6.2, 2.2, 1.5, { ink: 'B', w: 0.5, fi: 'TY', ft: 0.9, wob: 0.05 }); }
    // spongy mesophyll with air spaces
    const sp = [[24, 102], [46, 108], [70, 100], [92, 110], [150, 104], [172, 110], [196, 102], [218, 108], [34, 124], [58, 128], [82, 122], [160, 126], [184, 124], [206, 128], [100, 132], [140, 134], [120, 136]];
    sp.forEach(([x, y], i) => { const r = 8 + (i % 3) * 1.4; R.circle(x, y, r, { ink: 'B', w: 0.9, fi: 'TY', ft: 0.1, wob: 0.3 }); for (let k = 0; k < 3; k++) R.ellipse(x - 3 + k * 3, y - 2 + (k % 2) * 4, 1.8, 1.3, { ink: 'B', w: 0.4, fi: 'TY', ft: 0.9, wob: 0.05 }); });
    R.fill([X0, 94, X1, 94, X1, 144, X0, 144], { ink: 'T', t: 0.05, wob: 0.2 });
    // vascular bundle
    R.ellipse(122, 108, 22, 20, { ink: 'B', w: 1.1, fi: 'P', ft: 0.1, wob: 0.3 });
    [[112, 100], [122, 98], [132, 101]].forEach(([x, y]) => R.circle(x, y, 5.2, { ink: 'B', w: 1.4, fi: 'T', ft: 0.45, wob: 0.15 }));
    [[112, 116], [120, 118], [128, 116], [136, 114]].forEach(([x, y], i) => R.circle(x, y, i % 2 ? 2.6 : 3.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.6, wob: 0.1 }));
    // lower epidermis with stomata
    R.rect(X0, 146, X1 - X0, 14, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.08, wob: 0.15 }); for (let i = 0; i < 10; i++) R.line(X0 + i * 21.8, 146, X0 + i * 21.8, 160, { ink: 'B', w: 0.8, taper: 'none' });
    R.rect(X0, 160, X1 - X0, 2.6, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.6, wob: 0.15 });
    const stoma = x => {
      R.knock([x - 12, 146, x + 12, 146, x + 12, 163, x - 12, 163]);
      R.poly([x - 1.6, 146, x - 10, 148, x - 11, 154, x - 8, 160, x - 1.6, 160, x - 3.6, 153], { ink: 'B', w: 1.1, fi: 'TY', ft: 0.4, smooth: true }); R.poly([x + 1.6, 146, x + 10, 148, x + 11, 154, x + 8, 160, x + 1.6, 160, x + 3.6, 153], { ink: 'B', w: 1.1, fi: 'TY', ft: 0.4, smooth: true });
      R.dot(x - 7, 154, 1.1, { ink: 'B' }); R.dot(x + 7, 154, 1.1, { ink: 'B' });
    };
    stoma(60); stoma(190);
    // gas arrows
    R.arrow([60, 186, 60, 164], { ink: 'P', w: 1.2, hs: 3 }); R.text('CO_2', 36, 184, 4.6, { al: 'c', ink: 'P' });
    R.arrow([76, 148, 80, 186], { ink: 'T', w: 1.2, hs: 3 }); R.text('O_2, H_2O', 106, 184, 4.2, { al: 'c', ink: 'T' });
    R.arrow([60, 142, 42, 118], { ink: 'P', w: 0.9, hs: 2.4 }); R.arrow([42, 112, 40, 70], { ink: 'P', w: 0.9, hs: 2.4 });
    // labels
    const lab = (t, tx, ty, x, y) => leader(R, t, x, y, tx, ty, { size: 4.2, al: 'l' });
    lab('waxy cuticle', 246, 28, X1 - 20, 29.4); lab('upper epidermis', 246, 42, X1 - 11, 38); lab('palisade mesophyll', 246, 78, X1 - 18, 78); lab('spongy mesophyll', 246, 100, X1 - 20, 100);
    lab('air space', 246, 116, 206, 116 - 2); lab('xylem', 246, 134, 134, 102 + 2); lab('phloem', 246, 146, 136, 114); lab('lower epidermis', 246, 164, X1 - 6, 153);
    lab('guard cells', 246, 178, 200, 156); lab('stoma', 246, 190, 190, 152);
    lab('chloroplasts', 246, 56, 221, 58);
    R.scaleBar(14, 214, 67, '50 µm', { size: 4.4 });
    R.text('thin leaf, large area of mesophyll cell walls', 120, 232, 4.2, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(4); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(60 - u * 14, 186 - u * 70, 1.3, 'P', 0.9, i); A.dot(76 + u * 4, 148 + u * 38, 1.2, 'T', 0.8, 5 + i); }
  },
});

/* ---------- 3.3.2d Compromises: terrestrial insects and xerophytes ---------- */
S({
  id: '3.3.2d', num: '3.3.2', sub: 'Structural and functional compromises: terrestrial insects and xerophytic plants', title: 'Gas exchange', topic: '3.3', slot: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.3.2.s5'],
  card: {
    text: 'Efficient gas exchange needs a large, thin, permeable, moist surface, but this also loses water by evaporation. Terrestrial organisms therefore show <b>compromises</b>. <b>Insects</b> have a waterproof, waxy cuticle and a small surface area to volume ratio, and their <b>spiracles</b> can close (opening only when oxygen is needed) to limit water loss. <b>Xerophytes</b> (plants of dry habitats) have, e.g., a thick waxy cuticle, rolled leaves, hairs and <b>sunken stomata</b> that trap a humid layer of air, and reduced leaf area, so reducing water loss by diffusion and evaporation.',
    terms: ['xerophyte', 'spiracle', 'cuticle', 'sunken stomata', 'rolled leaf', 'water loss', 'compromise', 'surface area to volume ratio'],
    skill: 'Evaluate trade-offs', eq: null,
    q: 'How does a rolled leaf reduce water loss in marram grass?', a: 'It traps still, humid air around the stomata inside the roll, reducing the water potential gradient so less water vapour diffuses out.'
  },
  draw(R, sc) {
    R.text('the opposing needs: gas exchange and water conservation', 160, 15, 4.8, { al: 'c' });
    const txt = (t, x, y, w, ink) => wrapText(t, w, 4).forEach((ln, i) => R.text(ln, x, y + i * 5.8, 4, { al: 'c', ink }));
    txt('large, thin, moist, permeable surface: fast gas exchange, but water evaporates', 52, 34, 88);
    txt('small area, thick, waterproof surface: little water lost, but slow gas exchange', 268, 34, 88);
    // balance
    R.line(160, 52, 160, 78, { ink: 'B', w: 1.3, taper: 'none' }); R.line(148, 78, 172, 78, { ink: 'B', w: 1.3, taper: 'none' }); R.line(118, 52, 202, 50, { ink: 'B', w: 1.4, taper: 'none' });
    R.stroke([108, 60, 114, 70, 132, 70, 138, 60], { ink: 'B', w: 1.1, smooth: true, taper: 'none' }); R.stroke([182, 58, 188, 68, 206, 68, 212, 58], { ink: 'B', w: 1.1, smooth: true, taper: 'none' });
    R.line(118, 53, 108, 60, { ink: 'B', w: 0.6, taper: 'none' }); R.line(120, 53, 138, 60, { ink: 'B', w: 0.6, taper: 'none' }); R.line(200, 51, 182, 58, { ink: 'B', w: 0.6, taper: 'none' }); R.line(202, 51, 212, 58, { ink: 'B', w: 0.6, taper: 'none' });
    R.text('compromise', 160, 90, 4.6, { al: 'c', ink: 'P' });
    R.line(8, 98, 312, 98, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // insect spiracle open/closed
    R.text('terrestrial insect', 80, 110, 4.8, { al: 'c' });
    const spir = (x, open) => {
      R.rect(x - 24, 130, 16, 24, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5, wob: 0.15 }); R.rect(x + 8, 130, 16, 24, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5, wob: 0.15 });
      R.rect(x - 24, 126, 48, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.9, wob: 0.1 });
      R.rect(x - 8, 130, 16, 24, { ink: 'B', w: 0.7, fi: open ? 'T' : 'Y', ft: open ? 0.2 : 0.7, wob: 0.1 });
      if (!open) R.line(x - 8, 132, x + 8, 132, { ink: 'B', w: 2.6, taper: 'none' });
      R.text(open ? 'spiracle open' : 'spiracle closed', x, 164, 4, { al: 'c' });
    };
    spir(40, true); R.arrow([40, 122, 40, 140], { ink: 'T', w: 1, hs: 2.4 }); spir(116, false);
    R.text('tracheae', 40, 148, 3.6, { al: 'c' });
    ['waterproof waxy cuticle', 'small SA:V', 'spiracles close to cut water loss'].forEach((t, i) => R.text(t, 80, 184 + i * 6.8, 4.2, { al: 'c' }));
    R.line(156, 100, 156, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // marram grass rolled leaf
    R.text('xerophyte (e.g. marram grass)', 234, 110, 4.8, { al: 'c' });
    const cx = 196, cy = 156, rr = 30;
    const out2 = []; for (let i = 0; i <= 40; i++) { const a = -PI / 2 + 0.5 + (TAU - 1.0) * i / 40; out2.push(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
    const in2 = []; for (let i = 0; i <= 40; i++) { const a = -PI / 2 + 0.5 + (TAU - 1.0) * i / 40, rg = rr - 6 - (i % 2 ? 3 : 0); in2.push(cx + Math.cos(a) * rg, cy + Math.sin(a) * rg); }
    R.stroke(out2, { ink: 'Y', w: 5, t: 0.7, smooth: true, taper: 'none', solid: false }); R.stroke(out2, { ink: 'B', w: 1.4, smooth: true, taper: 'none' });
    R.stroke(in2, { ink: 'B', w: 1.1, smooth: false, taper: 'none' });
    for (let i = 1; i < 40; i += 2) { const a = -PI / 2 + 0.5 + (TAU - 1.0) * i / 40, rg = rr - 9; R.line(cx + Math.cos(a) * rg, cy + Math.sin(a) * rg, cx + Math.cos(a) * (rg - 7), cy + Math.sin(a) * (rg - 7), { ink: 'B', w: 0.5, taper: 'none' }); }
    for (let i = 3; i < 40; i += 6) { const a = -PI / 2 + 0.5 + (TAU - 1.0) * i / 40, rg = rr - 13; R.circle(cx + Math.cos(a) * rg, cy + Math.sin(a) * rg, 3, { ink: 'B', w: 0.7, fi: 'T', ft: 0.4 }); }
    R.fill(polyPts(cx, cy - 2, 12, 8), { ink: 'T', t: 0.14, wob: 0.3 });
    leader(R, 'thick waxy cuticle', cx - 22, cy + 22, 176, 206, { size: 4, al: 'c' }); leader(R, 'rolled leaf', cx + 6, cy - 28, 250, 126, { size: 4, al: 'l' });
    leader(R, 'hairs trap moist air', cx + 4, cy - 4, 250, 142, { size: 4, al: 'l' }); leader(R, 'sunken stomata', cx + 24, cy + 6, 250, 158, { size: 4, al: 'l' });
    ['also: reduced leaf area', '(e.g. spines): lower SA:V'].forEach((t, i) => R.text(t, 270, 184 + i * 6.4, 4, { al: 'c' }));
    ['each feature cuts the', 'water potential gradient', 'or the area for evaporation'].forEach((t, i) => R.text(t, 234, 210 + i * 6.4, 4, { al: 'c', ink: 'P' }));
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(40 + Math.sin(i * 3) * 3, 124 + u * 28, 1.2, 'T', 0.8, i); }
    for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(196 + Math.cos(i * 2) * 5, 152 - u * 16, 1, 'T', 0.7 * (1 - u), 4 + i); }
  },
});
