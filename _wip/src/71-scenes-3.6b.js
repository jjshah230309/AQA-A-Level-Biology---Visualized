/* ===================== 3.6.1.1 (cont.) taxes and kineses, reflex arc, RP10 ===================== */
/* woodlouse (top view) */
function woodlouse(R, x, y, s, rot, o = {}) {
  R.push(x, y, rad(rot), s);
  R.ellipse(0, 0, 9, 4.6, { ink: 'B', w: 1 / s, fi: o.fi || 'B', ft: o.ft || 0.35, wob: 0.15 });
  for (let k = -2; k <= 2; k++) R.line(k * 3.2, -4.4, k * 3.2, 4.4, { ink: 'B', w: 0.5 / s, taper: 'none', t: 0.7 });
  R.circle(10, 0, 2.2, { ink: 'B', w: 0.8 / s, fi: o.fi || 'B', ft: 0.5 });
  for (let k = -2; k <= 2; k++) { R.line(k * 3.2, 4.4, k * 3.2 + 1.5, 7.6, { ink: 'B', w: 0.5 / s, taper: 'none' }); R.line(k * 3.2, -4.4, k * 3.2 + 1.5, -7.6, { ink: 'B', w: 0.5 / s, taper: 'none' }); }
  R.pop();
}

/* ---------- 3.6.1.1b Taxes and kineses ---------- */
S({
  id: '3.6.1.1b', num: '3.6.1.1', sub: 'Taxes and kineses: simple responses that keep a mobile organism in a favourable environment', title: 'Survival and response', topic: '3.6', slot: [0, 1], dna: 'mark', ao: 2,
  covers: ['3.6.1.1.s4'],
  card: {
    text: '<b>Taxes</b> and <b>kineses</b> are simple responses that can maintain a mobile organism in a favourable environment. In a <b>taxis</b> the organism moves in a <b>directional</b> way towards (positive) or away from (negative) a stimulus, e.g. positive <b>phototaxis</b> of an alga towards light or negative <b>chemotaxis</b> away from a harmful chemical. In a <b>kinesis</b> the movement is <b>non-directional</b>: the rate of movement or of turning changes with the intensity of the stimulus. For example, woodlice move faster and turn more in dry air, so they are carried out of dry areas and tend to stay in humid ones where they lose less water.',
    terms: ['taxis', 'kinesis', 'phototaxis', 'chemotaxis', 'directional', 'non-directional', 'favourable environment', 'rate of turning'],
    skill: 'Distinguish taxis from kinesis', eq: null,
    q: 'What is the difference between a taxis and a kinesis?', a: 'In a taxis the movement is directional (towards or away from the stimulus); in a kinesis the movement is non-directional and its rate or turning changes with stimulus intensity.'
  },
  draw(R, sc) {
    R.text('taxis: directional', 80, 14, 4.8, { al: 'c' }); R.text('kinesis: not directional', 244, 14, 4.8, { al: 'c' });
    // taxis: light source on left, organisms move toward it
    R.circle(20, 60, 9, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.7 }); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; R.line(20 + Math.cos(a) * 12, 60 + Math.sin(a) * 12, 20 + Math.cos(a) * 17, 60 + Math.sin(a) * 17, { ink: 'Y', w: 1.2, taper: 'none' }); }
    [[60, 36], [92, 56], [120, 40], [76, 80], [112, 92], [140, 66]].forEach(([x, y], i) => { R.circle(x, y, 4, { ink: 'B', w: 0.9, fi: 'T', ft: 0.5 }); R.stroke([x + 4, y, x + 10, y + (i % 2 ? -2 : 2)], { ink: 'B', w: 0.7, taper: 'end' }); R.arrow([x - 6, y, x - 18, y + (i % 3 - 1) * 3], { ink: 'P', w: 1, hs: 2.6 }); });
    R.text('positive phototaxis:', 80, 112, 4, { al: 'c' }); R.text('move towards the light', 80, 119, 4, { al: 'c', ink: 'P' });
    R.line(164, 22, 164, 126, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // kinesis: woodlice in a choice chamber, humid vs dry
    R.rect(176, 32, 76, 64, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.18, wob: 0.2 }); R.rect(252, 32, 76, 64, { ink: 'B', w: 1.2, fi: 'T', ft: 0.2, wob: 0.2 });
    R.text('dry', 214, 44, 4, { al: 'c' }); R.text('humid', 290, 44, 4, { al: 'c' });
    R.stroke([186, 62, 196, 54, 208, 72, 220, 58, 232, 78, 244, 64], { ink: 'P', w: 1.1, smooth: true, taper: 'end' }); woodlouse(R, 246, 64, 0.8, 20); R.text('fast, frequent turns', 214, 90, 3.6, { al: 'c', ink: 'P' });
    R.stroke([262, 70, 292, 66, 310, 72], { ink: 'T', w: 1.1, smooth: true, taper: 'end' }); woodlouse(R, 312, 72, 0.8, 5); R.text('slow, few turns', 290, 90, 3.6, { al: 'c', ink: 'T' });
    R.text('movement changes with the humidity,', 252, 112, 3.9, { al: 'c' }); R.text('not towards or away from it', 252, 119, 3.9, { al: 'c' });
    R.line(8, 128, 336, 128, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // more examples
    R.text('both keep a mobile organism in a favourable environment', 172, 140, 4.4, { al: 'c', ink: 'P' });
    const ex = [['phototaxis', 'light: moves towards / away'], ['chemotaxis', 'chemical: moves towards food'], ['kinesis', 'speed/turning depends on intensity']];
    ex.forEach(([a, b], i) => { const x = 18 + i * 108; R.rrect(x, 150, 100, 36, 7, { ink: 'B', w: 1, fi: ['Y', 'T', 'P'][i], ft: 0.18, wob: 0.15 }); R.text(a, x + 50, 163, 4.6, { al: 'c' }); wrapText(b, 90, 3.5).forEach((ln, k) => R.text(ln, x + 50, 172 + k * 5, 3.5, { al: 'c' })); });
    R.text('woodlice in dry air move faster and turn more,', 172, 204, 3.9, { al: 'c' }); R.text('so leave dry areas and settle in humid ones', 172, 211, 3.9, { al: 'c' });
    R.text('(reducing water loss)', 172, 220, 3.7, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(140 - p * 40, 66 + Math.sin(p * 6) * 2, 3, 'T', 0.8, 1); A.dot(190 + p * 50, 62 + Math.sin(p * 18) * 6, 2.6, 'B', 0.7, 2); A.dot(300 + Math.sin(p * 6) * 3, 72, 2.6, 'B', 0.7, 3); },
});

/* ---------- 3.6.1.1c Simple reflex: three-neurone arc ---------- */
S({
  id: '3.6.1.1c', num: '3.6.1.1', sub: 'The protective effect of a simple reflex: three-neurone reflex arc', title: 'Survival and response', topic: '3.6', slot: [1, 1], dna: 'mark', ao: 1,
  covers: ['3.6.1.1.s5'],
  card: {
    text: 'A <b>simple reflex</b> protects the body: it is rapid, automatic and involves no decision. In a three-neurone arc a <b>receptor</b> detects the stimulus (e.g. heat); a <b>sensory neurone</b> carries the impulse to the central nervous system; a <b>relay neurone</b> connects the sensory and motor neurones; a <b>motor neurone</b> carries the impulse to an <b>effector</b> (e.g. a muscle), which responds by withdrawing the limb. Because there are few synapses and the brain is not involved first, the response is fast, so damage is reduced. (Details of the spinal cord and dorsal and ventral roots are not required.)',
    terms: ['reflex', 'receptor', 'sensory neurone', 'relay neurone', 'motor neurone', 'effector', 'synapse', 'central nervous system'],
    skill: 'Sequence the pathway', eq: null,
    q: 'Why is a reflex response faster than a voluntary one?', a: 'The pathway is short, with few synapses and without conscious decision in the brain.'
  },
  draw(R, sc) {
    R.text('three-neurone reflex arc', 160, 14, 5, { al: 'c' });
    // hand + hot object (left), spinal cord (middle), muscle in arm (bottom)
    R.rrect(206, 38, 96, 100, 12, { ink: 'B', w: 1.1, fi: 'P', ft: 0.08, wob: 0.4 }); R.text('central nervous system', 254, 52, 3.7, { al: 'c' });
    // receptor: skin with temperature receptor
    R.rect(14, 150, 70, 22, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.25, wob: 0.2 }); R.text('skin', 49, 164, 3.8, { al: 'c' });
    R.fill([26, 138, 40, 138, 34, 120], { ink: 'P', t: 0.9, wob: 0.1 }); R.fill([30, 134, 38, 134, 34, 126], { ink: 'Y', t: 0.9, wob: 0.1 }); R.text('heat', 34, 112, 3.8, { al: 'c', ink: 'P' });
    R.circle(50, 146, 4.4, { ink: 'B', w: 0.9, fi: 'P', ft: 0.7 }); R.text('receptor', 70, 140, 3.7, { al: 'l' });
    // sensory neurone: receptor -> into CNS
    R.stroke([50, 150, 50, 130, 70, 110, 120, 104, 170, 100, 214, 98], { ink: 'B', w: 1.8, smooth: true, taper: 'none' });
    R.circle(122, 104, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.3 }); R.text('sensory neurone', 126, 90, 3.8, { al: 'c' });
    // relay neurone inside CNS
    R.stroke([214, 98, 232, 98, 250, 84, 268, 98, 290, 98], { ink: 'T', w: 2.2, smooth: true, taper: 'none' }); R.circle(250, 84, 5, { ink: 'B', w: 1, fi: 'T', ft: 0.5 }); R.text('relay neurone', 250, 72, 3.7, { al: 'c' });
    R.circle(214, 98, 2.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.9 }); R.circle(290, 98, 2.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.9 });
    R.text('synapse', 214, 114, 3.5, { al: 'c' }); R.text('synapse', 290, 114, 3.5, { al: 'c' });
    // motor neurone to effector
    R.stroke([290, 98, 290, 120, 260, 170, 200, 200, 150, 206], { ink: 'B', w: 1.8, smooth: true, taper: 'none' }); R.circle(290, 122, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.3 }); R.text('motor neurone', 318, 178, 3.8, { al: 'r' });
    // effector: muscle
    R.stroke([60, 214, 100, 202, 150, 206], { ink: 'B', w: 0.01, taper: 'none' }); R.rrect(20, 196, 130, 22, 10, { ink: 'B', w: 1.2, fi: 'P', ft: 0.5, wob: 0.3 }); for (let k = 0; k < 8; k++) R.line(30 + k * 15, 198, 30 + k * 15, 216, { ink: 'B', w: 0.5, taper: 'none', t: 0.6 }); R.text('effector: muscle contracts', 85, 228, 3.9, { al: 'c' });
    R.arrow([60, 194, 52, 176], { ink: 'P', w: 1.3, hs: 3 }); R.text('withdraws hand', 90, 186, 3.8, { al: 'c', ink: 'P' });
    // numbers
    ['1', '2', '3', '4', '5'].forEach((n, i) => R.bubble([34, 120, 250, 290, 150][i] + (i === 4 ? 0 : 0), [128, 112, 98, 138, 196][i] + (i === 0 ? 18 : 0), 4.4, n));
    R.text('1 receptor detects heat   2 sensory neurone   3 relay neurone   4 motor neurone   5 effector', 160, 237, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(2.5); const path = [50, 150, 50, 130, 70, 110, 120, 104, 170, 100, 214, 98, 250, 84, 290, 98, 290, 120, 260, 170, 200, 200, 150, 206]; const q = A.along(path, p); A.dot(q[0], q[1], 2.6, 'Y', 0.95, 1); const q2 = A.along(path, (p + 0.5) % 1); A.dot(q2[0], q2[1], 2, 'P', 0.5, 2); },
});

/* ---------- RP10: choice chamber and chi-squared ---------- */
rpScene({
  id: 'RP10', num: '3.6.1.1', rp: 10, title: 'Survival and response', sub: 'Required practical 10: effect of an environmental variable on movement of an animal (choice chamber or maze)', topic: '3.6', slot: [2, 1],
  covers: ['RP10'], at: ['h'], ms: ['MS 1.9', 'MS 0.3', 'MS 1.3'], ps: ['PS 2.2', 'PS 4.1'],
  card: {
    text: 'Investigate the effect of an environmental variable on the movement of an animal using a <b>choice chamber</b> or a maze. The AQA handbook’s example puts 12 woodlice (or maggots) in a choice chamber with light/dark or humid/dry halves (using anhydrous calcium chloride to dry one side, black paper to darken it) and counts how many are in each half after four minutes. Compare with a control. A <b>chi-squared test</b> compares the observed numbers with the numbers expected if there were no preference (equal in each half). Treat animals ethically; return them to their habitat. Schools may use other animals and variables.',
    terms: ['choice chamber', 'taxis/kinesis', 'environmental variable', 'control', 'chi-squared test', 'expected', 'observed', 'degrees of freedom', 'ethical treatment'],
    skill: 'MS 1.9: chi-squared test', eq: MATH(msup(mi('χ'), mn('2')), mo('='), mo('∑'), mfrac(msup(mpar(mi('O') + mo('−') + mi('E')), mn('2')), mi('E'))),
    eqn: 'humid/dry: O = 1, 11; E = 6, 6 → χ² = 25/6 + 25/6 = 8.33; df = 1; critical value (p = 0.05) = 3.84',
    q: 'Observed light/dark numbers are 2 and 10. State the expected values and whether the result is significant if χ² = 5.33.', a: 'Expected 6 and 6 (no preference). 5.33 > 3.84 (df 1, p = 0.05), so the difference is significant: reject the null hypothesis.'
  },
  apparatus(R, b) {
    R.text('woodlice in a choice chamber', 92, 21, 4.4, { al: 'c' });
    // two chambers: control, light/dark, humid/dry
    const ch = (x, label, left, right, nl, nr) => {
      R.rrect(x, 34, 52, 60, 6, { ink: 'B', w: 1.2, fi: 'T', ft: 0.08, wob: 0.2 }); R.rect(x, 34, 26, 60, { ink: '', w: 0, fi: left, ft: left === 'B' ? 0.35 : 0.2 }); R.rect(x + 26, 34, 26, 60, { ink: '', w: 0, fi: right, ft: right === 'B' ? 0.35 : 0.2 }); R.line(x + 26, 34, x + 26, 94, { ink: 'B', w: 0.6, taper: 'none', t: 0.7 });
      for (let k = 0; k < nl; k++) woodlouse(R, x + 6 + (k % 2) * 12, 42 + k * 4.6, 0.38, 30 + k * 37);
      for (let k = 0; k < nr; k++) woodlouse(R, x + 32 + (k % 2) * 12, 40 + k * 5, 0.38, 80 + k * 41);
      R.text(label, x + 26, 108, 3.8, { al: 'c' }); R.text(nl + ' : ' + nr, x + 26, 116, 3.9, { al: 'c', ink: 'P' });
    };
    ch(14, 'control', 'T', 'T', 8, 4); ch(76, 'light and dark', 'Y', 'B', 2, 10); ch(138, 'humid and dry', 'T', 'Y', 11, 1);
    R.text('12 woodlice each; counted after 4 minutes', 92, 130, 3.7, { al: 'c' });
  },
  results(R, b) {
    const g = R.graph(b.x + 22, b.y + 8, 90, 72, { xmin: 0, xmax: 6, ymin: 0, ymax: 12, xl: '', yl: 'woodlice in half', xt: [], yt: [[0, '0'], [6, '6'], [12, '12']], fs: 3.6, ylx: 12 }).axes();
    [[0.4, 8, 'T'], [1.0, 4, 'T'], [2.2, 2, 'Y'], [2.8, 10, 'B'], [4.0, 1, 'Y'], [4.6, 11, 'T']].forEach(([x, h, ink], i) => { R.rect(g.X(x), g.Y(h), 9, g.Y(0) - g.Y(h), { ink: 'B', w: 0.8, fi: ink, ft: ink === 'B' ? 0.45 : 0.4, wob: 0.1 }); });
    g.dashed(0, 6, 6, 6, { ink: 'P', w: 0.7 }); R.text('expected 6', g.X(5.9), g.Y(6) - 3, 3.4, { al: 'r', ink: 'P' });
    ['control', 'light/dark', 'humid/dry'].forEach((t, i) => R.text(t, g.X(0.9 + i * 2.2), g.Y(0) + 8, 3.4, { al: 'c' }));
    R.text('χ² = 0.67 (ns)   5.33 (sig.)   8.33 (sig.)', b.x + 62, b.y + 104, 3.5, { al: 'c' });
  },
  vars: { iv: 'light or humidity (half of chamber)', dv: 'number of woodlice in each half', ctl: ['number and type of animal', 'time (4 min), temperature', 'chamber, same starting position'] },
  calc: ['expected = 12 ÷ 2 = 6 per half', 'χ² = Σ (O − E)² ÷ E', '= (1 − 6)² ÷ 6 + (11 − 6)² ÷ 6', '= 8.33 > 3.84 (df 1, p = 0.05)'],
  risks: [['bio', 'wash hands'], ['warn', 'drying agent: use forceps'], ['ethics', 'return animals to habitat']],
  limits: ['animals disturbed by handling', 'small sample (12): repeat', 'humidity/light not perfectly separated', 'time to settle varies'],
  interp: 'χ² above 3.84: a real preference (taxis or kinesis effect), not chance',
  anim(A, sc) { const p = A.ph(5); A.dot(104 + Math.sin(p * 6) * 3, 60, 1.5, 'B', 0.8, 1); A.dot(40 + Math.sin(p * 9) * 4, 70 + Math.cos(p * 7) * 3, 1.5, 'B', 0.8, 2); },
});
