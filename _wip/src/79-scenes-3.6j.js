/* ===================== RP11 Glucose calibration with colorimetry ===================== */
const RP11_DATA = [0, 0, 2, 0.76, 4, 1.0, 6, 1.15, 8, 1.22, 10, 1.39];
rpScene({
  id: 'RP11', num: '3.6.4.2', rp: 11, title: 'Control of blood glucose concentration', sub: 'Required practical 11: dilution series and calibration curve to find glucose in a “urine” sample', topic: '3.6', slot: [0, 9],
  covers: ['RP11'], at: ['b', 'c', 'f'], ms: ['MS 0.2', 'MS 3.1', 'MS 3.2'], ps: ['PS 2.2', 'PS 3.1', 'PS 3.3'],
  card: {
    text: 'Make a <b>dilution series</b> of a glucose solution, react each with <b>Benedict’s solution</b> in a hot water bath and measure the <b>absorbance</b> with a <b>colorimeter</b> to draw a <b>calibration curve</b>; then use the curve to find the concentration of glucose in an unknown “urine” sample. Glucose in urine can be an early sign of diabetes. In the AQA handbook’s example a 10 mmol dm⁻³ standard is diluted with water to 0, 2, 4, 6, 8 and 10 mmol dm⁻³; 2 cm³ of Benedict’s is added to 2 cm³ of each; tubes are heated together at about 90 °C for four minutes; the 0.0 tube sets the colorimeter to zero absorbance (qualitative Benedict’s, orange/red filter, about 600 nm). Other schools use quantitative Benedict’s, where the blue colour is lost instead. This is one example method; schools may vary it.',
    terms: ['dilution series', 'calibration curve', 'colorimeter', 'absorbance', 'Benedict’s solution', 'blank', 'unknown sample'],
    skill: 'MS 3.1 / PS 3.1: read an unknown from a calibration curve', eq: MATH(mt('volume of standard '), mo('='), mfrac(mt('required concentration'), mt('standard concentration')), mo('×'), mt('final volume')),
    eqn: 'Volume of 10 mmol dm⁻³ standard for 2.0 cm³ of 4.0 mmol dm⁻³: (4 ÷ 10) × 2.0 = 0.8 cm³',
    q: 'Why is the 0.0 mmol dm⁻³ tube, heated with Benedict’s, used to zero the colorimeter?', a: 'It is a blank: it contains everything except glucose, so any absorbance it shows comes from the reagent and tube, not the glucose, and is subtracted from every reading.'
  },
  apparatus(R, b) {
    R.text('glucose / mmol dm⁻³  (U = unknown “urine”)', 92, 21, 3.9, { al: 'c' });
    const xs = i => 36 + i * 16;
    R.waterBath(26, 38, 118, 54, {});
    ['0', '2', '4', '6', '8', '10', 'U'].forEach((c, i) => {
      const o = i === 0 ? { ink: 'T', t: 0.5, ink2: 'B', t2: 0.12 } : { ink: 'Y', t: 0.6, ink2: 'P', t2: i === 6 ? 0.4 : 0.1 + 0.11 * i };
      R.tube(xs(i), 30, 8.4, 52, Object.assign({ level: 0.72 }, o));
      R.text(c, xs(i), 28, 3.8, { al: 'c', ink: i === 6 ? 'P' : 'B' });
    });
    R.thermometer(156, 40, 36, { level: 0.9 }); R.text('90 °C', 156, 90, 3.5, { al: 'c' }); R.text('4 min', 156, 96, 3.3, { al: 'c' });
    R.text('water', 20, 104, 3.2, { al: 'r' }); R.text('std', 20, 110, 3.2, { al: 'r' });
    [2.0, 1.6, 1.2, 0.8, 0.4, 0.0].forEach((v, i) => { R.text(v.toFixed(1), xs(i), 104, 3.2, { al: 'c' }); R.text((2 - v).toFixed(1), xs(i), 110, 3.2, { al: 'c' }); });
    R.text('cm³', 150, 104, 3.2, { al: 'l' });
    // colorimeter
    R.rrect(96, 114, 56, 22, 3, { ink: 'B', w: 1.2, fi: 'B', ft: 0.1 }); R.cuvette(108, 117, 8, 14, { ink: 'P', t: 0.5, ink2: 'Y' });
    R.line(98, 124, 107, 124, { ink: 'P', w: 1.5, taper: 'none' }); R.line(117, 124, 124, 124, { ink: 'P', w: 1.5, taper: 'none' });
    R.rect(128, 118, 20, 9, { ink: 'B', w: 0.7, fi: 'T', ft: 0.15 }); R.text('1.08', 138, 125, 3.9, { al: 'c' });
    R.text('orange filter, 600 nm', 60, 124, 3.4, { al: 'c' }); R.text('zero with the 0.0 tube', 60, 131, 3.3, { al: 'c' });
  },
  results(R, b) {
    const g = R.graph(b.x + 24, b.y + 8, 90, 82, { xmin: 0, xmax: 10.5, ymin: 0, ymax: 1.5, xl: 'glucose / mmol dm⁻³', yl: 'absorbance', xt: [[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10']], yt: [[0, '0'], [0.5, '0.5'], [1, '1.0'], [1.5, '1.5']], fs: 3.6, xly: 14, ylx: 12, paper: 0 }).axes();
    g.curve(RP11_DATA, { ink: 'P', w: 1.3 }); g.dots(RP11_DATA, { ink: 'B', r: 1.5 });
    g.hdrop(5.1, 1.08, { ink: 'T', w: 0.9 }); g.vdrop(5.1, 1.08, { ink: 'T', w: 0.9 });
    R.circle(g.X(5.1), g.Y(1.08), 2.2, { ink: 'T', w: 1 });
    g.label('unknown A = 1.08', 5.5, 0.55, { size: 3.3 }); R.text('≈ 5 mmol dm⁻³', g.X(5.5) + 1, g.Y(0.55) + 5.6, 3.3, { al: 'l', ink: 'T' });
  },
  vars: { iv: 'known glucose concentration', dv: 'absorbance of the mixture', ctl: ['volumes of sample and Benedict’s', 'heating time and temperature', 'same colorimeter and filter'] },
  calc: ['volume of standard =', '(c ÷ 10) × 2.0 cm³', 'e.g. 4 mmol dm⁻³: 0.8 cm³', 'unknown A = 1.08 lies between', '4.0 (1.00) and 6.0 (1.15):', 'c ≈ 4.0 + 2.0 × 0.08/0.15', '≈ 5.1 mmol dm⁻³'],
  risks: [['goggles', 'eye protection'], ['hot', 'hot water bath and tubes'], ['warn', 'handle glass with care']],
  limits: ['curve is read approximately', 'dilution errors add along the series', 'precipitate can block light', 'colour depends on heating time'],
  interp: 'more glucose → more orange precipitate → higher absorbance',
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 6; i++) A.dot(36 + i * 16 + Math.sin(p * TAU + i) * 1.3, 66 - ((p * (1 + i * 0.1)) % 1) * 24, 0.8, 'Y', 0.7, i); },
});
