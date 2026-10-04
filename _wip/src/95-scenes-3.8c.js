/* ===================== 3.8.2.3 Gene expression and cancer ===================== */
/* ---------- 3.8.2.3a Tumour suppressor genes, oncogenes and tumours ---------- */
S({
  id: '3.8.2.3a', num: '3.8.2.3', sub: 'Benign and malignant tumours; oncogenes, tumour suppressor genes and abnormal methylation', title: 'Gene expression and cancer', topic: '3.8', slot: [0, 4], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.8.2.3.s1', '3.8.2.3.s2', '3.8.2.3.s3', '3.8.2.3.s4'],
  card: {
    text: '<b>Benign tumours</b> grow slowly, are often surrounded by a capsule, stay in one place and are rarely life-threatening; <b>malignant tumours</b> grow rapidly, invade and destroy surrounding tissue and can spread (<b>metastasis</b>), forming secondary tumours. Cell division is controlled by genes. <b>Proto-oncogenes</b> stimulate cell division; if mutated or over-expressed they become <b>oncogenes</b> and division is stimulated permanently. <b>Tumour suppressor genes</b> slow cell division; if a mutation inactivates them the cell divides out of control. <b>Abnormal methylation</b> also contributes: <b>hypermethylation</b> of a tumour suppressor gene switches it off (no protein, uncontrolled division) and <b>hypomethylation</b> of a proto-oncogene switches it on (overexpressed). Increased <b>oestrogen</b> concentrations are involved in the development of some breast cancers.',
    terms: ['benign tumour', 'malignant tumour', 'metastasis', 'oncogene', 'proto-oncogene', 'tumour suppressor gene', 'hypermethylation', 'hypomethylation', 'mitosis', 'uncontrolled cell division'],
    skill: 'AO1: distinguish benign from malignant; explain gene roles', eq: null,
    q: 'Explain how hypermethylation of a tumour suppressor gene could lead to a tumour.', a: 'Extra methyl groups stop the gene being transcribed, so the protein that slows cell division is not made and cells divide uncontrollably.'
  },
  draw(R, sc) {
    R.text('two types of tumour', 108, 14, 4.3, { al: 'c' });
    const tissue = (x, y, w, h, hole) => { for (let r = 0; r < Math.floor(h / 10); r++) for (let c = 0; c < Math.floor(w / 10); c++) { const cx = x + 5 + c * 10, cy = y + 5 + r * 10; if (hole && Math.hypot(cx - hole[0], cy - hole[1]) < hole[2]) continue; R.circle(cx, cy, 4.2, { ink: 'B', w: 0.6, fi: 'P', ft: 0.12, wob: 0.1 }); } };
    // benign
    tissue(10, 30, 96, 80, [58, 70, 26]);
    R.ellipse(58, 70, 22, 20, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.22, wob: 0.3 }); R.ellipse(58, 70, 25, 23, { ink: 'B', w: 0.8, wob: 0.3 }); for (let k = 0; k < 7; k++) R.circle(52 + (k % 3) * 8, 62 + Math.floor(k / 3) * 8, 3.6, { ink: 'B', w: 0.7, fi: 'B', ft: 0.4 });
    R.text('benign', 58, 122, 4.2, { al: 'c', ink: 'T' });
    ['slow growth', 'capsule around it', 'stays in one place', 'rarely life-threatening'].forEach((t, i) => R.text(t, 58, 134 + i * 7.4, 3.5, { al: 'c' }));
    // malignant
    tissue(116, 30, 96, 80, [166, 70, 14]);
    R.stroke([166, 70, 150, 54, 138, 50], { ink: 'B', w: 1.4, taper: 'end', smooth: true }); R.stroke([166, 70, 186, 52, 198, 48], { ink: 'B', w: 1.4, taper: 'end', smooth: true }); R.stroke([166, 70, 148, 90, 138, 98], { ink: 'B', w: 1.4, taper: 'end', smooth: true }); R.stroke([166, 70, 190, 92, 198, 100], { ink: 'B', w: 1.4, taper: 'end', smooth: true });
    for (let k = 0; k < 12; k++) { const a = k * 2.1; R.circle(166 + Math.cos(a) * (3 + k * 1.4), 70 + Math.sin(a) * (3 + k * 1.2), 4, { ink: 'B', w: 0.7, fi: 'B', ft: 0.5 + (k % 3) * 0.1, wob: 0.3 }); }
    R.text('malignant (cancer)', 164, 122, 4.2, { al: 'c', ink: 'P' });
    ['rapid growth', 'invades and destroys tissue', 'cells spread (metastasis)', 'secondary tumours'].forEach((t, i) => R.text(t, 164, 134 + i * 7.4, 3.5, { al: 'c' }));
    R.line(10, 172, 214, 172, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('tumour cells compared with normal cells', 112, 184, 3.6, { al: 'c' });
    R.circle(54, 204, 9, { ink: 'B', w: 0.9, fi: 'P', ft: 0.15 }); R.circle(54, 204, 3.4, { ink: 'B', w: 0.7, fi: 'B', ft: 0.4 }); R.text('normal', 54, 223, 3.3, { al: 'c' });
    R.ellipse(160, 204, 13, 10, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2, rot: 20, wob: 0.5 }); R.ellipse(158, 204, 7, 6, { ink: 'B', w: 0.7, fi: 'B', ft: 0.6 }); R.circle(168, 200, 3.4, { ink: 'B', w: 0.7, fi: 'B', ft: 0.6 }); R.text('tumour: larger, darker', 160, 223, 3.3, { al: 'c' });
    R.line(222, 14, 222, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // genes
    R.text('genes that control cell division', 340, 14, 4.3, { al: 'c' });
    const lane = (y, ttl, ink, norm, mut, nmut, mutn) => {
      R.text(ttl, 232, y, 3.9, { al: 'l', ink });
      R.rect(232, y + 8, 40, 14, { ink: 'B', w: 0.8, fi: ink, ft: ink === 'T' ? 0.12 : 0.3 }); R.text(norm[0], 252, y + 17.6, 3.2, { al: 'c' });
      R.arrow([274, y + 15, 286, y + 15], { ink: 'B', w: 0.8, hs: 2 }); R.text(norm[1], 290, y + 17, 3.4, { al: 'l' });
      R.rect(232, y + 28, 40, 14, { ink: 'B', w: 0.8, fi: ink, ft: 0.05 }); R.text(mut[0], 252, y + 37.6, 3.2, { al: 'c' });
      R.arrow([274, y + 35, 286, y + 35], { ink: 'P', w: 0.8, hs: 2 }); R.text(mut[1], 290, y + 37, 3.4, { al: 'l', ink: 'P' });
      R.text(nmut, 232, y + 52, 3.3, { al: 'l' });
    };
    lane(28, 'proto-oncogene', 'Y', ['gene', 'stimulates cell division'], ['mutated', 'oncogene: division stimulated all the time'], 'mutation or overexpression (hypomethylation)');
    lane(100, 'tumour suppressor gene', 'T', ['gene', 'slows cell division'], ['mutated', 'inactive: no brake on cell division'], 'mutation or hypermethylation switches it off');
    R.text('either way: uncontrolled mitosis → tumour', 340, 176, 4, { al: 'c', ink: 'P' });
    R.line(232, 184, 450, 184, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('abnormal methylation', 340, 196, 4, { al: 'c' });
    R.text('hypermethylated tumour suppressor gene: switched off', 340, 206, 3.5, { al: 'c' }); R.text('hypomethylated proto-oncogene: switched on', 340, 214, 3.5, { al: 'c' });
    R.line(458, 14, 458, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // control of cell cycle + oestrogen
    R.text('uncontrolled cell division', 556, 14, 4.3, { al: 'c' });
    [0, 1, 2, 3].forEach(i => { R.circle(480 + i * 20, 40, 6.4 - i * 0.5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); });
    R.circle(570, 40, 6.4, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); R.arrow([578, 40, 594, 40], { ink: 'B', w: 0.8, hs: 2 });
    for (let k = 0; k < 10; k++) R.circle(612 + (k % 5) * 9 - (Math.floor(k / 5)) * 4, 30 + Math.floor(k / 5) * 12, 4.2, { ink: 'B', w: 0.7, fi: 'B', ft: 0.4 });
    R.text('normal control of mitosis', 520, 58, 3.4, { al: 'c' }); R.text('uncontrolled mitosis', 628, 58, 3.4, { al: 'c', ink: 'P' });
    R.line(466, 68, 650, 68, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('breast cancer and oestrogen', 556, 80, 4.2, { al: 'c' });
    tok(R, 478, 106, 'E', { r: 5.5, fi: 'Y', ft: 0.9, size: 4 }); R.arrow([486, 106, 508, 106], { ink: 'B', w: 0.9, hs: 2.4 });
    R.ellipse(522, 106, 14, 9, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); R.arrow([538, 106, 560, 106], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('receptor', 522, 124, 3.3, { al: 'c' });
    R.rect(566, 98, 30, 16, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.3 }); R.text('gene', 581, 108.4, 3.4, { al: 'c' }); R.arrow([598, 106, 610, 106], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('more', 614, 104, 3.4, { al: 'l', ink: 'P' }); R.text('division', 614, 111, 3.4, { al: 'l', ink: 'P' });
    ['increased oestrogen concentrations', 'are involved in the development', 'of some breast cancers: more', 'stimulation of cell division'].forEach((t, i) => R.text(t, 556, 150 + i * 8, 3.8, { al: 'c' }));
    R.text('cancer risk factors: genetic and environmental', 556, 200, 3.6, { al: 'c', ink: 'P' }); R.text('(see next scene)', 556, 208, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); for (let k = 0; k < 4; k++) { const u = (p + k * 0.25) % 1; A.dot(612 + (k % 5) * 9, 30 + u * 12, 0.0, 'P', 0, k); } A.dot(480 + p * 90, 40, 1.8, 'P', 0.9, 1); },
});

/* ---------- 3.8.2.3b Evidence: genetic and environmental factors and cancer ---------- */
S({
  id: '3.8.2.3b', num: '3.8.2.3', sub: 'Evaluating evidence for genetic and environmental factors in cancer, and using it to prevent and treat', title: 'Gene expression and cancer', topic: '3.8', slot: [2, 4], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.8.2.3.s5', '3.8.2.3.s6'],
  card: {
    text: 'You should be able to <b>evaluate evidence showing correlations</b> between genetic and environmental factors and various forms of cancer. Risk factors can be genetic (inherited alleles, e.g. mutations in a tumour suppressor gene) or environmental (smoking, UV light, diet, alcohol, ionising radiation). A <b>correlation does not prove cause</b>: look for a sample size that is large, whether groups were matched for other factors, a plausible mechanism and repeated studies. You should also be able to <b>interpret information</b> on how understanding the roles of <b>oncogenes</b> and <b>tumour suppressor genes</b> can help <b>prevent</b> cancer (screening for risk alleles, avoiding mutagens), <b>treat</b> it (drugs targeted at the product of an oncogene, higher-risk patients monitored) and <b>cure</b> it (for example gene therapy to restore a working tumour suppressor gene, still experimental).',
    terms: ['risk factor', 'correlation', 'cause', 'screening', 'mutagen', 'targeted drug', 'gene therapy', 'sample size', 'evaluate'],
    skill: 'MS 3.1: correlation and cause; relative risk', eq: null,
    q: 'A study finds that more alcohol consumed is linked to more breast cancer. Why can you not conclude that alcohol causes it?', a: 'A correlation may arise from other factors (age, diet, genes); a cause needs matched groups, a mechanism and repeated evidence.'
  },
  draw(R, sc) {
    R.text('incidence of a cancer against a risk factor', 156, 14, 4.2, { al: 'c' });
    const g = R.graph(40, 30, 232, 120, { xmin: 20, xmax: 80, ymin: 0, ymax: 14, xl: 'age / years', yl: 'cases per 100 women', xt: [[20, '20'], [40, '40'], [60, '60'], [80, '80']], yt: [[0, '0'], [4, '4'], [8, '8'], [12, '12']], fs: 3.5, xly: 11, ylx: 14 }).axes();
    [['no alcohol', 6.8, 'T'], ['2 drinks/day', 8.4, 'Y'], ['4 drinks/day', 10.4, 'P'], ['6 drinks/day', 12.4, 'P']].forEach(([nm, top, ink], i) => { g.curve(x => top * Math.pow((x - 20) / 60, 1.5) + 0.2, { ink, w: 1.4 + i * 0.1, n: 30 }); R.text(nm, g.X(80) + 1, g.Y(top) + 1.5, 3.1, { al: 'l', ink: ink === 'Y' ? 'B' : ink }); });
    R.text('illustrative data: higher alcohol intake,', 156, 176, 3.6, { al: 'c' }); R.text('higher incidence at each age (a positive correlation)', 156, 183, 3.6, { al: 'c' });
    R.text('also age: incidence rises with age', 156, 194, 3.6, { al: 'c' });
    R.text('correlation does not prove cause', 156, 212, 4, { al: 'c', ink: 'P' });
    ['other factors (diet, genes, exercise)', 'may differ between the groups'].forEach((t, i) => R.text(t, 156, 221 + i * 7, 3.5, { al: 'c' }));
    R.line(300, 14, 300, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // risk factors
    R.text('risk factors', 372, 14, 4.3, { al: 'c' });
    R.rrect(310, 22, 120, 82, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.06, wob: 0.3 }); R.text('genetic', 370, 34, 4, { al: 'c', ink: 'P' });
    ['inherited alleles, e.g. a mutated', 'tumour suppressor gene', 'in every cell from birth', 'raises risk of some cancers'].forEach((t, i) => R.text(t, 370, 48 + i * 9.5, 3.5, { al: 'c' }));
    R.rrect(310, 112, 120, 104, 5, { ink: 'B', w: 0.9, fi: 'T', ft: 0.04, wob: 0.3 }); R.text('environmental', 370, 124, 4, { al: 'c', ink: 'T' });
    ['smoking', 'UV light and ionising radiation', 'some chemicals and viruses', 'diet and alcohol', 'many act as mutagens'].forEach((t, i) => { R.circle(322, 140 + i * 14, 2, { ink: 'B', w: 0.6, fi: 'T', ft: 0.9 }); R.text(t, 330, 141.4 + i * 14, 3.5, { al: 'l' }); });
    R.text('most cancers: both interact', 370, 227, 3.6, { al: 'c', ink: 'P' });
    R.line(440, 14, 440, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // prevent treat cure
    R.text('using knowledge of the genes', 546, 14, 4.3, { al: 'c' });
    [['prevent', 'screen for a known risk allele; monitor high-risk people; avoid mutagens', 'T'], ['treat', 'drugs targeted at a cancer’s particular mutation (e.g. block the oncogene product); more intensive treatment for fast-growing cancers', 'Y'], ['cure', 'gene therapy to give a working tumour suppressor gene (still being tested in trials)', 'P']].forEach(([h, t, ink], i) => { const y = 24 + i * 66; R.rrect(450, y, 192, 58, 5, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(h, 546, y + 12, 4.3, { al: 'c', ink: 'P' }); wrapText(t, 176, 3.5).forEach((ln, k) => R.text(ln, 546, y + 24 + k * 7, 3.5, { al: 'c' })); });
    R.text('knowing which genes are mutated guides', 546, 226, 3.5, { al: 'c' }); R.text('the best choice of action', 546, 233, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(40 + p * 232, 30 + 120 - (6.8 * Math.pow(p, 1.5)) / 14 * 120, 2, 'T', 0.9, 1); },
});
