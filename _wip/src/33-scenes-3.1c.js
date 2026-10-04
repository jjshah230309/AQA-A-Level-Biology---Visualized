/* ---------- Required practical 1: enzyme-controlled reaction ---------- */
rpScene({
  id: 'RP1', num: '3.1.4.2', rp: 1, title: 'Many proteins are enzymes', sub: 'Required practical 1: effect of a named variable on the rate of an enzyme-controlled reaction', topic: '3.1', slot: [0, 2],
  covers: ['RP1'], at: ['a', 'b', 'c', 'f', 'l'], ms: ['MS 0.1', 'MS 1.11', 'MS 3.2', 'MS 3.6', 'MS 3.3'], ps: ['PS 2.4', 'PS 3.3'],
  card: {
    text: 'Investigate the effect of a <b>named variable</b> (temperature, pH, enzyme or substrate concentration) on the rate of an enzyme-controlled reaction. The example method in the AQA handbook uses trypsin digesting casein in milk-powder suspension: the suspension clears as the protein is hydrolysed, timed until a marked X shows through. The independent variable is changed; the dependent variable is measured; all other variables are controlled (water bath, buffer, equal volumes and concentrations). Rate is proportional to 1/time, or the initial rate is the gradient of a tangent to a product–time graph. Uncertainty in each measurement should be considered. Schools may choose other enzymes and methods.',
    terms: ['independent variable', 'dependent variable', 'control variable', 'rate of reaction', 'initial rate', 'tangent', 'uncertainty', 'buffer'],
    skill: 'Rate from time taken', eq: MATH(mt('rate '), mo('∝'), mfrac(mn(1), mi('t')), mt('   (s'), msup(mo(''), mo('−1')), mt(')')),
    eqn: 'Initial rate = gradient of the tangent to a product–time graph at t = 0 (MS 3.6)',
    q: 'Why is a buffer used, and why are all tubes held in a water bath before the enzyme and substrate are mixed?', a: 'The buffer keeps pH constant (a control variable); equilibrating in the water bath ensures both solutions are at the test temperature when mixed.'
  },
  apparatus(R, b) {
    R.text('trypsin + pH 7 buffer, then milk powder (casein)', 92, 21, 4.6, { al: 'c' });
    [20, 30, 40, 50, 60].forEach((T, i) => {
      const x = 10 + i * 29, tx = x + 8.5;
      R.waterBath(x, 68, 25, 54, { heat: i > 2 });
      R.tube(tx, 34, 8, 78, { ink: 'T', t: 0.1, level: 0.6 });
      R.stipple([tx - 3.5, 66, tx + 3.5, 66, tx + 3.5, 104, tx - 3.5, 104], 60 - i * 10, 0.45, { ink: 'Y', t: 1 });
      R.text('\u2717', tx, 100, 4.6, { al: 'c', ink: 'P' });
      R.text(String(T) + '\u00B0C', x + 12.5, 136, 4.8, { al: 'c' });
    });
    R.stopwatch(160, 78, 8.5, { ang: -0.9 }); R.text('time until', 160, 97, 3.9, { al: 'c' }); R.text('X is visible', 160, 102.5, 3.9, { al: 'c' });
    R.arrow([40, 27, 40, 35], { ink: 'B', w: 0.9, hs: 2.4 });
  },
  results(R, b) {
    const g = R.graph(b.x + 16, b.y + 6, 98, 78, { xmin: 10, xmax: 70, ymin: 0, ymax: 16, xl: 'temperature / \u00B0C', yl: 'rate 1/t (\u00D710^{\u22123} s^{\u22121})', xt: [20, 40, 60], yt: [0, 8, 16], fs: 3.9, xly: 13, ylx: 8, paper: 7 }).axes();
    const pts = [25, 189, 40, 79, 50, 108, 60, 271].reduce((a, v, i, arr) => (i % 2 ? a : a.concat([v, 1000 / arr[i + 1]])), []);
    g.curve(x => 13.6 * Math.exp(-Math.pow((x - 42) / 12.5, 2)) + 0.2, { ink: 'P', w: 1.3, from: 12, to: 68 });
    g.dots(pts, { r: 1.9, ink: 'B' });
    g.vdrop(42, 13.8, { ink: 'B', w: 0.5 }); g.label('optimum', 42, 15.4, { al: 'c', size: 3.9 });
    g.err(40, 12.66, 0.9); g.err(50, 9.26, 0.9);
  },
  vars: { iv: 'temperature', dv: 'time for X to vanish', ctl: ['trypsin and milk volumes', 'concentrations', 'pH 7 buffer'] },
  calc: ['rate = 1 \u00F7 t', '= 1 \u00F7 79 s', '= 0.013 s^{\u22121} (40 \u00B0C)', '\u00B10.5 \u00B0C \u00F7 40 \u00B0C \u00D7 100', '= 1.3 % uncertainty'],
  risks: [['goggles', 'protease can irritate eyes'], ['hot', 'hot water: scalds']],
  limits: ['end point is subjective', 'equilibrate before mixing', 'repeat and take means'],
  interp: 'rate peaks at the optimum, then falls as the enzyme is denatured',
  anim(A, sc) {
    const p = A.ph(5);
    for (let i = 3; i < 5; i++) { const q = (p + i * 0.17) % 1; A.dot(10 + i * 29 + 12.5 + Math.sin(q * 9 + i) * 3, 118 - q * 22, 1.2, 'P', (1 - q) * 0.8); }
    A.line(160, 78, 160 + 6.5 * Math.cos(-0.9 + p * TAU), 78 + 6.5 * Math.sin(-0.9 + p * TAU), 'P', 1.1);
  },
});
