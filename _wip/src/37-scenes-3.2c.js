/* ===================== 3.2 required practicals 3 and 4 ===================== */
/* ---------- RP3: dilution series, calibration curve, water potential of plant tissue ---------- */
rpScene({
  id: 'RP3', num: '3.2.3', rp: 3, title: 'Transport across cell membranes', sub: 'Required practical 3: dilution series and calibration curve for the water potential of plant tissue', topic: '3.2', slot: [3, 3],
  covers: ['RP3'], at: ['c', 'h', 'j', 'l'], ms: ['MS 3.2', 'MS 3.4', 'MS 0.3', 'MS 1.3'], ps: ['PS 2.3', 'PS 3.1'],
  card: {
    text: 'Make a <b>dilution series</b> of a solute (the AQA handbook’s example uses sucrose, 0.0 to 1.0 mol dm⁻³), place equal-sized pieces of plant tissue in each solution, then measure the <b>percentage change in mass</b>. Plot percentage change against concentration to give a <b>calibration curve</b>. Where the line crosses zero there is no net movement of water, so the solution has the same water potential as the tissue. Convert that concentration to a water potential using a table of values. Teachers may change the solute, tissue, concentrations and method.',
    terms: ['dilution series', 'calibration curve', 'percentage change in mass', 'water potential', 'intercept', 'osmosis', 'control variable'],
    skill: 'Percentage change; reading an intercept (MS 3.4)', eq: MATH(mt('percentage change '), mo('='), mfrac(mt('final mass − initial mass'), mt('initial mass')), mo('×'), mn('100')),
    eqn: 'Volume of stock = (concentration wanted ÷ stock concentration) × final volume',
    q: 'Why is the water potential of the tissue found at the point where the line crosses zero change in mass?', a: 'At that concentration there is no net movement of water into or out of the tissue, so its water potential equals that of the solution.'
  },
  apparatus(R, b) {
    R.text('dilution series → chips in each tube → reweigh', 92, 21, 4.4, { al: 'c' });
    // potato and chip
    R.ellipse(24, 96, 15, 10.5, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.4, wob: 0.5 }); R.dot(18, 94, 0.9, { ink: 'B' }); R.dot(30, 99, 0.9, { ink: 'B' }); R.dot(24, 91, 0.8, { ink: 'B' });
    R.rect(14, 62, 20, 5.4, { ink: 'B', w: 1, fi: 'Y', ft: 0.55, wob: 0.1 }); R.text('same size chip', 24, 74, 3.6, { al: 'c' });
    R.arrow([24, 78, 24, 84], { ink: 'B', w: 0.9, hs: 2.2 });
    // water bath with six tubes
    R.waterBath(44, 42, 112, 62, { heat: false });
    ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0'].forEach((c, i) => {
      const x = 56 + i * 17.5;
      R.tube(x, 36, 9, 56, { level: 0.74, ink: 'T', t: 0.08 + i * 0.1 });
      R.rect(x - 2.4, 66 + (i % 2) * 5, 4.8, 8, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.7 });
      R.text(c, x, 32, 3.8, { al: 'c' });
    });
    R.text('sucrose / mol dm^{-3}', 100, 111, 3.8, { al: 'c' });
    R.thermometer(166, 44, 40, { level: 0.5 }); R.text('30 °C', 166, 98, 3.8, { al: 'c' });
    R.stopwatch(56, 128, 6.5, { ang: 0.8 }); R.text('20 min', 66, 130, 4.4, { al: 'l' });
    // balance
    R.rrect(122, 112, 40, 22, 3, { ink: 'B', w: 1.2, fi: 'B', ft: 0.12 }); R.rect(126, 117, 20, 8, { ink: 'B', w: 0.7, fi: 'T', ft: 0.45 }); R.text('6.54 g', 136, 123.6, 4, { al: 'c' });
    R.rect(150, 106, 10, 3, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.5 });
  },
  results(R, b) {
    const g = R.graph(b.x + 24, b.y + 8, 88, 84, { xmin: 0, xmax: 1, ymin: -15, ymax: 6, xl: 'sucrose / mol dm^{-3}', yl: '% change in mass', xt: [[0, '0'], [0.2, '0.2'], [0.4, '0.4'], [0.6, '0.6'], [0.8, '0.8'], [1, '1.0']], yt: [[-10, '-10'], [0, '0'], [5, '5']], fs: 3.7, xly: 15, ylx: 15, paper: 0 }).axes();
    g.hline(0, { ink: 'B', w: 0.6, t: 0.8 });
    const d = [0, 4.13, 0.2, 0.91, 0.4, -5.42, 0.6, -7.02, 0.8, -10.3, 1, -12.64];
    g.curve([0, 3.45, 1, -13.55], { ink: 'P', w: 1.3 });
    g.dots(d, { ink: 'B', r: 1.5 });
    g.dashed(0.203, 0, 0.203, -15, { ink: 'T', w: 0.9 });
    const X = g.X(0.203), Y = g.Y(0); R.circle(X, Y, 2.6, { ink: 'T', w: 1 });
    R.text('≈ 0.2', X + 4, g.Y(-12.5), 4, { al: 'l', ink: 'T' });
    R.text('no net water movement', b.x + 112, g.Y(2.6), 3.5, { al: 'r' });
    R.text('gain', b.x + 28, g.Y(4), 3.5, { al: 'l' }); R.text('loss', b.x + 28, g.Y(-4), 3.5, { al: 'l' });
  },
  vars: { iv: 'concentration of sucrose solution', dv: 'percentage change in mass of chip', ctl: ['same tissue and chip size', 'volume of solution', 'time and temperature'] },
  calc: ['stock = wanted ÷ 1.0 × 20', '= 0.4 ÷ 1.0 × 20 = 8 cm^3', '% change = Δm ÷ initial × 100', '= (5.96 − 6.41) ÷ 6.41 × 100', '= −7.0 %'],
  risks: [['goggles', 'eye protection'], ['warn', 'sharp blade when cutting'], ['hot', 'water bath (30 °C only warm)']],
  limits: ['tissue varies between chips', 'blotting must be consistent', 'small changes: weigh to 2 d.p.'],
  interp: 'line crosses zero: ψ of solution = ψ of tissue (look up kPa)',
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) A.dot(60 + i * 35 + Math.sin(p * TAU + i) * 1.5, 55 + ((p + i / 3) % 1) * 28, 0.9, 'T', 0.7, i);
  },
});

/* ---------- RP4: permeability of cell-surface membranes ---------- */
rpScene({
  id: 'RP4', num: '3.2.3', rp: 4, title: 'Transport across cell membranes', sub: 'Required practical 4: effect of a named variable on the permeability of cell-surface membranes', topic: '3.2', slot: [2, 4],
  covers: ['RP4'], at: ['b', 'c', 'h', 'j'], ms: ['MS 3.2', 'MS 3.1', 'MS 1.3'], ps: ['PS 2.2', 'PS 4.1'],
  card: {
    text: 'Investigate the effect of a named variable on the permeability of cell-surface membranes. The AQA handbook’s example uses beetroot: the purple pigment (betalain) is inside vacuoles and cannot cross undamaged membranes. Soak equal beetroot discs in different concentrations of alcohol (or detergent, or different temperatures), then measure how much pigment leaks out, by comparing colour with a set of standards or by using a <b>colorimeter</b> and a <b>calibration curve</b>. Teachers may use other variables, tissues and methods.',
    terms: ['permeability', 'betalain', 'colorimeter', 'absorbance', 'calibration curve', 'named variable', 'control variable'],
    skill: 'Read a concentration from a calibration curve', eq: MATH(mt('concentration '), mo('≈'), mt('read from calibration curve at absorbance')),
    eqn: 'Absorbance at 520 nm is read for each solution; the calibration curve gives % extract',
    q: 'Why is the pigment not found outside the cells when the discs are in water?', a: 'The pigment is inside the vacuole and the intact membranes (tonoplast and cell-surface membrane) are not permeable to it; alcohol dissolves/disrupts the phospholipids so pigment leaks out.'
  },
  apparatus(R, b) {
    R.text('discs in each alcohol concentration → compare colour', 92, 21, 4.4, { al: 'c' });
    // beetroot and cork borer
    R.ellipse(24, 86, 13, 15, { ink: 'B', w: 1.3, fi: 'P', ft: 0.5, fi2: 'B', ft2: 0.45, wob: 0.5 }); R.stroke([24, 72, 22, 62, 26, 54], { ink: 'T', w: 1.2, taper: 'end' });
    [[16, 82], [32, 84], [24, 92]].forEach(([x, y]) => R.circle(x, y, 2.8, { ink: 'B', w: 0.7, fi: 'P', ft: 0.9 }));
    R.text('cut equal discs', 24, 108, 3.6, { al: 'c' });
    // tubes in water bath: alcohol concentrations
    R.waterBath(46, 44, 102, 58, {});
    ['0', '20', '40', '60', '80', '100'].forEach((c, i) => {
      const x = 56 + i * 15.6;
      R.tube(x, 38, 8.4, 50, { level: 0.7, ink: 'P', t: 0.06 + i * 0.1, ink2: 'B', t2: 0.03 + i * 0.08 });
      R.circle(x, 68 + (i % 2) * 4, 2.2, { ink: 'B', w: 0.6, fi: 'P', ft: 0.9 });
      R.text(c, x, 34, 3.8, { al: 'c' });
    });
    R.text('% alcohol in each tube', 100, 110, 3.8, { al: 'c' });
    R.thermometer(158, 46, 36, { level: 0.5 }); R.text('30 °C', 158, 94, 3.8, { al: 'c' }); R.text('5 min', 158, 104, 3.8, { al: 'c' });
    // colorimeter
    R.rrect(112, 118, 52, 18, 3, { ink: 'B', w: 1.2, fi: 'B', ft: 0.12 }); R.cuvette(122, 120, 8, 12, { ink: 'P', t: 0.6 }); R.line(114, 126, 121, 126, { ink: 'Y', w: 1.5, taper: 'none' }); R.line(131, 126, 140, 126, { ink: 'Y', w: 1.5, taper: 'none' });
    R.rect(144, 122, 15, 8, { ink: 'B', w: 0.7, fi: 'T', ft: 0.4 }); R.text('0.65', 151.5, 128.4, 3.8, { al: 'c' });
    R.text('520 nm', 100, 134, 3.8, { al: 'c' });
  },
  results(R, b) {
    const g = R.graph(b.x + 22, b.y + 8, 92, 84, { xmin: 0, xmax: 110, ymin: 0, ymax: 1.5, xl: '% alcohol', yl: 'absorbance at 520 nm', xt: [[0, '0'], [20, '20'], [40, '40'], [60, '60'], [80, '80'], [100, '100']], yt: [[0, '0'], [0.5, '0.5'], [1, '1.0'], [1.5, '1.5']], fs: 3.7, xly: 15, ylx: 14, paper: 0 }).axes();
    const d = [0, 0, 20, 0.37, 40, 0.65, 60, 0.9, 80, 1.04, 100, 1.31];
    g.curve(d, { ink: 'P', w: 1.3 }); g.dots(d, { ink: 'B', r: 1.5 });
    g.dashed(40, 0, 40, 0.65, { ink: 'T', w: 0.8 });
  },
  vars: { iv: 'concentration of alcohol', dv: 'absorbance of the solution (pigment leaked)', ctl: ['temperature and time', 'size and number of discs', 'volume of solution'] },
  calc: ['absorbance 0.65 lies between', '0.61 (40 %) and 0.95 (60 %)', '% extract = 40 + 20 × 0.04 ÷ 0.34', '≈ 42 %'],
  risks: [['flame', 'ethanol is flammable'], ['goggles', 'eye protection'], ['warn', 'sharp borer or scalpel']],
  limits: ['cut edges leak pigment too', 'discs vary between beetroots', 'colour matching is subjective'],
  interp: 'more alcohol → more membrane damage → more pigment leaks out',
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 4; i++) A.dot(56 + i * 15.6 + 4 + Math.sin(p * TAU + i) * 1.4, 60 + ((p * (1 + i * 0.2)) % 1) * 20, 0.9, 'P', 0.5 + i * 0.1, i);
  },
});
