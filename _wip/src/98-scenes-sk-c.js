/* ===================== SKILLS (cont.): apparatus and techniques, practical skills, CPAC, required practicals ===================== */
/* ---------- SK AT a–l: apparatus and techniques ---------- */
S({
  id: 'SK.AT', num: 'AT', tag: 'AT a–l', sub: 'Apparatus and techniques (spec 8.1): the twelve skills and where each is used', title: 'Use of apparatus and techniques', topic: 'SK', slot: [2, 4], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['AT a', 'AT b', 'AT c', 'AT d', 'AT e', 'AT f', 'AT g', 'AT h', 'AT i', 'AT j', 'AT k', 'AT l'],
  card: {
    text: 'Students must have had the chance to use these apparatus and techniques; the 12 required practicals cover all of them. <b>a</b> apparatus for mass, time, volume, temperature, length and pH; <b>b</b> instruments such as a colorimeter or potometer; <b>c</b> laboratory glassware, including serial dilutions; <b>d</b> light microscope at high and low power with a graticule; <b>e</b> scientific drawing from observation with annotations; <b>f</b> qualitative reagents for biological molecules; <b>g</b> thin layer or paper chromatography, or electrophoresis; <b>h</b> safely and ethically using organisms to measure plant or animal responses and physiological functions; <b>i</b> aseptic techniques with agar plates and broth; <b>j</b> dissection of an animal or plant organ; <b>k</b> sampling in fieldwork; <b>l</b> ICT such as modelling, a data logger or processing software.',
    terms: ['apparatus', 'instrument', 'serial dilution', 'graticule', 'qualitative reagent', 'chromatography', 'electrophoresis', 'aseptic technique', 'dissection', 'sampling', 'data logger'],
    skill: 'AT a–l mapped to RP1–RP12', eq: null,
    q: 'Which technique is used to separate photosynthetic pigments in RP7?', a: 'Chromatography (AT g), together with AT b and c.'
  },
  draw(R, sc) {
    const cell = (i, code, nm, rps, draw) => {
      const x = 8 + (i % 4) * 162, y = 4 + Math.floor(i / 4) * 76;
      R.rrect(x, y, 156, 70, 5, { ink: 'B', w: 0.9, fi: ['Y', 'T', 'P'][i % 3], ft: i % 3 === 1 ? 0.04 : 0.08, wob: 0.3 });
      R.text(code, x + 8, y + 12, 5, { al: 'l', ink: 'P' }); wrapText(nm, 100, 3.2).slice(0, 3).forEach((ln, k) => R.text(ln, x + 36, y + 10 + k * 6, 3.2, { al: 'l' }));
      draw(x, y); R.text(rps, x + 148, y + 66, 3.1, { al: 'r', ink: 'T' });
    };
    const at = [
      ['AT a', 'mass, time, volume, temperature, length, pH', 'RP 1, 4, 7, 8, 9, 12', (x, y) => { R.thermometer(x + 24, y + 28, 22, { level: 0.6 }); R.stopwatch(x + 66, y + 48, 9); R.tube(x + 100, y + 30, 8, 30, { level: 0.5, ink: 'T', t: 0.3 }); R.text('pH 7', x + 134, y + 50, 4, { al: 'c' }); }],
      ['AT b', 'instruments, e.g. colorimeter, potometer', 'RP 1, 4, 5…', (x, y) => { R.rrect(x + 20, y + 34, 48, 20, 3, { ink: 'B', w: 1, fi: 'B', ft: 0.1 }); R.cuvette(x + 30, y + 36, 7, 12, { ink: 'P', t: 0.5 }); R.rect(x + 48, y + 38, 16, 8, { ink: 'B', w: 0.6, fi: 'T', ft: 0.3 }); R.text('0.65', x + 56, y + 44, 3.4, { al: 'c' }); R.tube(x + 96, y + 28, 7, 30, { level: 0.4, ink: 'T', t: 0.3 }); R.line(x + 100, y + 28, x + 130, y + 40, { ink: 'B', w: 0.8, taper: 'none' }); }],
      ['AT c', 'glassware; serial dilutions', 'RP 3, 6, 11', (x, y) => { [0, 1, 2, 3].forEach(k => R.tube(x + 20 + k * 20, y + 28, 8, 34, { level: 0.55, ink: 'P', t: 0.5 - k * 0.12 })); R.arrow([x + 24, y + 26, x + 38, y + 26], { ink: 'B', w: 0.7, hs: 1.8 }); R.text('÷ 2 each step', x + 100, y + 66, 3.2, { al: 'c' }); }],
      ['AT d', 'light microscope, graticule', 'RP 2', (x, y) => { R.circle(x + 40, y + 46, 14, { ink: 'B', w: 1, fi: 'T', ft: 0.12 }); for (let k = 0; k < 8; k++) R.line(x + 30 + k * 2.4, y + 44, x + 30 + k * 2.4, y + 48, { ink: 'B', w: 0.4, taper: 'none' }); R.circle(x + 40, y + 46, 5, { ink: 'B', w: 0.8, fi: 'P', ft: 0.5 }); R.text('graticule', x + 40, y + 66, 3.2, { al: 'c' }); R.rect(x + 80, y + 36, 40, 8, { ink: 'B', w: 0.9, fi: 'B', ft: 0.15 }); R.rect(x + 90, y + 44, 20, 14, { ink: 'B', w: 0.9, fi: 'B', ft: 0.2 }); }],
      ['AT e', 'scientific drawing with annotations', 'RP 2, 5', (x, y) => { R.ellipse(x + 40, y + 46, 22, 14, { ink: 'B', w: 1.1, wob: 0.4 }); R.circle(x + 36, y + 46, 5, { ink: 'B', w: 0.9 }); R.line(x + 58, y + 40, x + 100, y + 32, { ink: 'B', w: 0.6, taper: 'end' }); R.text('nucleus', x + 102, y + 34, 3.4, { al: 'l' }); R.line(x + 20, y + 46, x + 100, y + 56, { ink: 'B', w: 0.6, taper: 'end' }); R.text('membrane', x + 102, y + 58, 3.4, { al: 'l' }); }],
      ['AT f', 'qualitative reagents for biological molecules', 'RP 1, 2, 11', (x, y) => { [['T', 'Benedict’s'], ['B', 'biuret'], ['Y', 'iodine']].forEach(([ink, nm], k) => { R.tube(x + 22 + k * 40, y + 30, 8, 30, { level: 0.55, ink: ink === 'B' ? 'P' : ink, t: 0.4, ink2: ink === 'B' ? 'B' : null, t2: 0.3 }); R.text(nm, x + 26 + k * 40, y + 68, 3, { al: 'c' }); }); }],
      ['AT g', 'chromatography or electrophoresis', 'RP 7', (x, y) => { R.rect(x + 24, y + 28, 22, 36, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.05 }); [[40, 'T'], [48, 'Y'], [54, 'P']].forEach(([dy, ink]) => R.ellipse(x + 35, y + dy, 5, 2.4, { ink: 'B', w: 0.5, fi: ink, ft: 0.8 })); R.line(x + 24, y + 62, x + 46, y + 62, { ink: 'B', w: 0.6, taper: 'none', dash: true }); R.rect(x + 80, y + 30, 50, 32, { ink: 'B', w: 0.9, fi: 'T', ft: 0.08 }); [0, 1, 2].forEach(k => { R.rect(x + 86 + k * 14, y + 34, 8, 2.4, { ink: 'B', w: 0.4, fi: 'B', ft: 0.3 }); R.rect(x + 86 + k * 14, y + 44 + k * 3, 8, 2.4, { ink: 'B', w: 0.4, fi: 'P', ft: 0.8 }); }); }],
      ['AT h', 'safe, ethical use of organisms to measure responses', 'RP 3, 5, 10, 12', (x, y) => { beetle(R, x + 30, y + 46, 'B', 0.6, 0, 1.1); R.rrect(x + 64, y + 30, 56, 30, 4, { ink: 'B', w: 0.9, fi: 'T', ft: 0.08 }); R.line(x + 92, y + 30, x + 92, y + 60, { ink: 'B', w: 0.6, taper: 'none' }); beetle(R, x + 76, y + 46, 'B', 0.6, 20, 0.8); }],
      ['AT i', 'aseptic techniques: agar plates and broth', 'RP 6, 9', (x, y) => { R.circle(x + 44, y + 46, 18, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.1 }); R.circle(x + 44, y + 46, 12, { ink: 'B', w: 0.5, fi: 'T', ft: 0.2 }); [[-6, -4], [5, 6], [8, -7]].forEach(([dx, dy]) => R.circle(x + 44 + dx, y + 46 + dy, 1.8, { ink: 'B', w: 0.5, fi: 'P', ft: 0.9 })); R.stroke([x + 94, y + 66, x + 102, y + 46, x + 106, y + 38], { ink: 'B', w: 0.9, taper: 'none' }); R.circle(x + 108, y + 36, 3.4, { ink: 'B', w: 0.8 }); R.flameIcon && 0; Icons.flame(R, x + 112, y + 54, 4.4); }],
      ['AT j', 'dissection of an animal or plant organ', 'RP 3, 4, 5', (x, y) => { R.ellipse(x + 44, y + 48, 22, 12, { ink: 'B', w: 1, fi: 'P', ft: 0.4, wob: 0.4 }); R.line(x + 74, y + 30, x + 100, y + 58, { ink: 'B', w: 1.2, taper: 'none' }); R.poly([x + 100, y + 58, x + 104, y + 60, x + 108, y + 64], { ink: 'B', w: 1 }); R.text('scalpel: sharp', x + 96, y + 26, 3.2, { al: 'c', ink: 'P' }); }],
      ['AT k', 'sampling techniques in fieldwork', 'RP 12', (x, y) => { R.rect(x + 20, y + 30, 34, 34, { ink: 'P', w: 1.2 }); for (let k = 0; k < 10; k++) R.circle(x + 24 + (k * 7) % 28, y + 34 + (k * 11) % 26, 1.4, { ink: 'B', w: 0.4, fi: 'TY', ft: 1 }); R.line(x + 70, y + 64, x + 130, y + 64, { ink: 'B', w: 1, taper: 'none' }); [0, 1, 2].forEach(k => R.rect(x + 74 + k * 18, y + 52, 12, 12, { ink: 'P', w: 1 })); }],
      ['AT l', 'ICT: modelling, data logger, software', 'RP 1, 3, 4, 12', (x, y) => { R.rrect(x + 20, y + 30, 50, 32, 3, { ink: 'B', w: 1, fi: 'T', ft: 0.08 }); R.stroke([x + 26, y + 56, x + 36, y + 44, x + 46, y + 48, x + 62, y + 36], { ink: 'P', w: 1.1, smooth: true, taper: 'none' }); R.rect(x + 90, y + 40, 28, 18, { ink: 'B', w: 0.9, fi: 'B', ft: 0.15 }); R.line(x + 70, y + 48, x + 90, y + 48, { ink: 'B', w: 0.7, taper: 'none' }); R.text('logger', x + 104, y + 68, 3.2, { al: 'c' }); }],
    ];
    at.forEach((a, i) => cell(i, a[0], a[1], a[2], a[3]));
    R.text('each required practical (RP) uses several of these; the RP scenes show the mapping', 330, 236, 3.6, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(8 + 66 + Math.sin(p * TAU) * 6, 8 + 48 + Math.cos(p * TAU) * 6, 1.4, 'P', 0.8, 1); },
});

/* ---------- SK PS: practical skills assessed in written papers ---------- */
S({
  id: 'SK.PS', num: 'PS', tag: 'PS 1–4', sub: 'Practical skills assessed in written papers (spec 8.3)', title: 'Practical skills', topic: 'SK', slot: [0, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['PS 1.1', 'PS 1.2', 'PS 2.1', 'PS 2.2', 'PS 2.3', 'PS 2.4', 'PS 3.1', 'PS 3.2', 'PS 3.3', 'PS 4.1'],
  card: {
    text: 'At least 15 % of marks need <b>practical skills</b>. <b>1 Independent thinking</b>: PS 1.1 solve problems in practical contexts; PS 1.2 apply scientific knowledge to practical contexts. <b>2 Scientific methods and practices</b>: PS 2.1 comment on experimental design and evaluate methods; PS 2.2 present data in appropriate ways; PS 2.3 evaluate results and draw conclusions with reference to measurement uncertainties and errors; PS 2.4 identify variables, including those that must be controlled. <b>3 Numeracy</b>: PS 3.1 plot and interpret graphs; PS 3.2 process and analyse data using the maths skills; PS 3.3 consider margins of error, accuracy and precision. <b>4 Instruments</b>: PS 4.1 know how to use a wide range of instruments, equipment and techniques.',
    terms: ['independent variable', 'dependent variable', 'control variable', 'accuracy', 'precision', 'repeatability', 'reproducibility', 'valid', 'uncertainty'],
    skill: 'PS 1.1–4.1', eq: null,
    q: 'What is the difference between an accurate and a precise set of results?', a: 'Accurate results are close to the true value; precise results are close to each other (small spread). Results can be one without the other.'
  },
  draw(R, sc) {
    const blocks = [
      ['1  independent thinking', 'Y', [['PS 1.1', 'solve problems in practical contexts'], ['PS 1.2', 'apply scientific knowledge to practical contexts']]],
      ['2  scientific methods', 'T', [['PS 2.1', 'comment on design; evaluate methods'], ['PS 2.2', 'present data in appropriate ways'], ['PS 2.3', 'evaluate results, uncertainties, errors'], ['PS 2.4', 'identify variables to be controlled']]],
      ['3  numeracy', 'P', [['PS 3.1', 'plot and interpret graphs'], ['PS 3.2', 'process data with the maths skills'], ['PS 3.3', 'margins of error, accuracy, precision']]],
      ['4  instruments and equipment', 'Y', [['PS 4.1', 'use a wide range of instruments, equipment and techniques']]],
    ];
    const pos = [[8, 8, 204, 64], [8, 80, 204, 104], [8, 192, 204, 82 - 36], [8, 192, 0, 0]];
    let y = 8;
    const hs = [46, 66, 56, 38];
    blocks.forEach(([ttl, ink, items], i) => {
      const h = hs[i]; R.rrect(8, y, 212, h, 5, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(ttl, 16, y + 11, 4.1, { al: 'l', ink: 'P' });
      items.forEach(([c, t], k) => { R.text(c, 16, y + 23 + k * 10, 3.6, { al: 'l', ink: 'T' }); wrapText(t, 150, 3.4).forEach((ln, j) => R.text(ln, 50, y + 23 + k * 10 + j * 6, 3.4, { al: 'l' })); });
      y += h + 5;
    });
    R.line(228, 14, 228, 238, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // accuracy v precision
    R.text('accuracy and precision (PS 3.3)', 330, 14, 4.2, { al: 'c' });
    const tgt = (cx, cy, pts, ttl, ttl2) => { [26, 18, 10, 3].forEach((r, k) => R.circle(cx, cy, r, { ink: 'B', w: 0.6, fi: k === 3 ? 'P' : null, ft: 0.4, wob: 0.15 })); pts.forEach(([dx, dy]) => R.dot(cx + dx, cy + dy, 1.7, { ink: 'P' })); R.text(ttl, cx, cy + 36, 3.6, { al: 'c' }); R.text(ttl2, cx, cy + 43, 3.3, { al: 'c', ink: 'T' }); };
    tgt(268, 70, [[-2, 2], [3, -3], [1, 4], [-3, -2], [2, 1]], 'accurate and precise', 'close to true value, small spread');
    tgt(388, 70, [[12, 10], [14, 8], [13, 12], [11, 9], [15, 11]], 'precise, not accurate', 'close together, off target');
    tgt(268, 154, [[-14, 6], [10, -12], [-4, 14], [16, 4], [-12, -10]], 'accurate, not precise', 'centred but widely spread');
    tgt(388, 154, [[-18, 12], [14, -16], [20, 10], [-12, -14], [4, 18]], 'neither', 'scattered and off target');
    R.line(440, 14, 440, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // planning and evaluating
    R.text('planning and evaluating (PS 1, 2.1, 2.4)', 548, 14, 4.2, { al: 'c' });
    [['independent', 'what you change', 'T'], ['dependent', 'what you measure', 'P'], ['control', 'what you keep the same', 'Y']].forEach(([a, b, ink], i) => { R.rrect(452, 24 + i * 30, 194, 24, 4, { ink: 'B', w: 0.8, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.text(a + ' variable', 462, 40 + i * 30, 3.9, { al: 'l', ink: 'B' }); R.text(b, 560, 40 + i * 30, 3.7, { al: 'l' }); });
    ['repeat and calculate a mean', 'use enough values of the independent variable', 'use suitable apparatus (check the uncertainty)', 'identify risks and safe, ethical methods', 'suggest improvements, with reasons'].forEach((t, i) => { R.circle(458, 124 + i * 13, 2, { ink: 'B', w: 0.6, fi: 'T', ft: 0.7 }); R.text(t, 466, 125.4 + i * 13, 3.8, { al: 'l' }); });
    R.text('evaluate: reliability (repeats), validity (controls),', 548, 202, 3.7, { al: 'c', ink: 'P' }); R.text('and the effect of error on the conclusion', 548, 210, 3.7, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(268 + Math.cos(p * TAU) * 3, 70 + Math.sin(p * TAU) * 3, 1.7, 'P', 0.9, 1); },
});

/* ---------- SK CPAC: practical endorsement competencies ---------- */
S({
  id: 'SK.CPAC', num: 'CPAC', tag: 'CPAC 1–5', sub: 'Common Practical Assessment Criteria for the practical endorsement (spec 8.4)', title: 'Practical endorsement', topic: 'SK', slot: [2, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['CPAC 1', 'CPAC 2', 'CPAC 3', 'CPAC 4', 'CPAC 5'],
  card: {
    text: 'The practical endorsement is reported separately from the A-level grade and is assessed by teachers, who observe students against the <b>Common Practical Assessment Criteria (CPAC)</b>. A pass needs students to consistently and routinely meet the criteria for all five competencies: <b>1</b> follows written procedures; <b>2</b> applies investigative approaches and methods when using instruments and equipment (uses instrumentation correctly, works methodically, identifies and controls variables, selects suitable equipment and measurement strategies); <b>3</b> safely uses a range of practical equipment and materials (identifies hazards, assesses risks, uses safety equipment); <b>4</b> makes and records observations (accurate, precise and sufficient data); <b>5</b> researches, references and reports (uses appropriate software and tools to process data, carry out research and report findings; cites sources of information that support planning and conclusions). A minimum of 12 practical activities must be carried out; the 12 required practicals meet this.',
    terms: ['CPAC', 'endorsement', 'pass', 'follows written procedures', 'investigative approaches', 'safe use', 'records observations', 'research and reporting'],
    skill: 'CPAC 1–5 (assessed by teachers, not in written papers)', eq: null,
    q: 'Is the practical endorsement part of the A-level grade?', a: 'No. It is reported separately as a pass or not; the A-level grade is based only on the written exams (which still assess practical skills).'
  },
  draw(R, sc) {
    R.text('five competencies, assessed by teachers over the course', 330, 14, 4.4, { al: 'c' });
    const cp = [
      ['1', 'follows written procedures', 'correctly follows written instructions to carry out techniques', 'Y'],
      ['2', 'applies investigative approaches', 'uses instruments and ICT correctly; works methodically; identifies and controls variables; chooses suitable equipment', 'T'],
      ['3', 'safely uses equipment and materials', 'identifies hazards, assesses risks, makes safety adjustments', 'P'],
      ['4', 'makes and records observations', 'accurate observations; accurate, precise and sufficient data, recorded methodically with units', 'Y'],
      ['5', 'researches, references and reports', 'uses software and tools to process data, research and report; cites sources that support planning and conclusions', 'T'],
    ];
    cp.forEach(([n, ttl, d, ink], i) => { const y = 24 + i * 40; R.rrect(10, y, 420, 34, 5, { ink: 'B', w: 0.9, fi: ink, ft: ink === 'T' ? 0.05 : 0.09, wob: 0.3 }); R.bubble(26, y + 17, 8, n, { ft: 0.3 }); R.text(ttl, 42, y + 14, 4.4, { al: 'l', ink: 'P' }); wrapText(d, 380, 3.5).forEach((ln, k) => R.text(ln, 42, y + 24 + k * 6, 3.5, { al: 'l' })); });
    R.line(442, 14, 442, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('how it fits with the exams', 548, 14, 4.2, { al: 'c' });
    R.rrect(454, 24, 190, 60, 5, { ink: 'B', w: 0.9, fi: 'T', ft: 0.05, wob: 0.3 }); R.text('written papers', 549, 38, 4.2, { al: 'c', ink: 'P' }); ['at least 15 % of marks assess', 'practical skills (PS 1–4)', 'A-level grade comes only from these'].forEach((t, i) => R.text(t, 549, 50 + i * 9, 3.6, { al: 'c' }));
    R.rrect(454, 92, 190, 60, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.1, wob: 0.3 }); R.text('practical endorsement', 549, 106, 4.2, { al: 'c', ink: 'P' }); ['teachers observe CPAC 1–5', 'pass or not, reported separately', 'minimum of 12 practical activities'].forEach((t, i) => R.text(t, 549, 118 + i * 9, 3.6, { al: 'c' }));
    R.text('the 12 required practicals meet', 549, 176, 3.8, { al: 'c' }); R.text('the minimum of 12 and cover every', 549, 185, 3.8, { al: 'c' }); R.text('apparatus and technique (AT a–l)', 549, 194, 3.8, { al: 'c' });
    R.text('students may work in groups but the evidence', 549, 210, 3.5, { al: 'c', ink: 'P' }); R.text('must show each student meets the criteria', 549, 218, 3.5, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(26, 24 + 17 + Math.floor(p * 5) * 40 - 17 + 17 - 40 + 40, 1.6, 'P', 0.9, 1); },
});

/* ---------- SK RP map: the twelve required practicals ---------- */
S({
  id: 'SK.RP', num: 'RP 1–12', tag: 'RP 1–12', sub: 'The twelve required practicals (spec 8.2) mapped to topics, techniques and scenes', title: 'Required practical activities', topic: 'SK', slot: [0, 6], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['RP map'],
  card: {
    text: 'Every student must carry out these <b>12 required practicals</b>; written papers assess the knowledge, understanding and skills in them. <b>1</b> effect of a named variable on the rate of an enzyme-controlled reaction; <b>2</b> stained root-tip squash, microscope, mitotic index; <b>3</b> dilution series to find the water potential of plant tissue; <b>4</b> effect of a named variable on permeability of cell-surface membranes; <b>5</b> dissection of a gas exchange or mass transport system, or an organ within it; <b>6</b> aseptic technique and antimicrobial substances; <b>7</b> chromatography of leaf pigments; <b>8</b> rate of dehydrogenase activity in chloroplast extracts; <b>9</b> rate of respiration of single-celled organisms; <b>10</b> environmental variable and animal movement (choice chamber or maze); <b>11</b> glucose dilution series and colorimetry; <b>12</b> distribution of a species and an environmental factor. The methods shown on the poster are examples; teachers are encouraged to vary them.',
    terms: ['required practical', 'enzyme', 'mitotic index', 'water potential', 'permeability', 'dissection', 'aseptic', 'chromatography', 'dehydrogenase', 'respiration', 'choice chamber', 'colorimetry', 'distribution'],
    skill: 'RP 1–12 mapped to AT a–l', eq: null,
    q: 'Which required practical uses a colorimeter and a calibration curve to find an unknown concentration?', a: 'RP11 (glucose in a “urine” sample); RP4 and RP3 also use calibration or colorimetry.'
  },
  draw(R, sc) {
    const rp = [
      ['1', 'enzyme-controlled reaction rate', 'a b c f l', '3.1.4'], ['2', 'root-tip squash and mitotic index', 'd e f', '3.2.2'], ['3', 'water potential of plant tissue', 'c h j l', '3.2.3'],
      ['4', 'permeability of membranes', 'a b c j l', '3.2.3'], ['5', 'dissect a gas exchange or mass transport system', 'e h j', '3.3'], ['6', 'aseptic technique: antimicrobials', 'c i', '3.4.4'],
      ['7', 'chromatography of leaf pigments', 'b c g', '3.5.1'], ['8', 'dehydrogenase activity in chloroplast extracts', 'a b c', '3.5.1'], ['9', 'respiration of single-celled organisms', 'a b c i', '3.5.2'],
      ['10', 'animal movement: choice chamber or maze', 'h', '3.6.1'], ['11', 'glucose calibration curve: “urine”', 'b c f', '3.6.4'], ['12', 'distribution of a species and a factor', 'a b h k l', '3.7.4'],
    ];
    rp.forEach(([n, t, at, tp], i) => { const col = i < 6 ? 0 : 1, row = i % 6, x = 10 + col * 328, y = 22 + row * 34; R.rrect(x, y, 322, 29, 4, { ink: 'B', w: 0.8, fi: ['Y', 'T', 'P'][i % 3], ft: i % 3 === 1 ? 0.04 : 0.08, wob: 0.3 }); R.bubble(x + 14, y + 15, 7, n, { ft: 0.3 }); R.text(t, x + 28, y + 13, 3.9, { al: 'l' }); R.text('AT ' + at, x + 28, y + 24, 3.4, { al: 'l', ink: 'T' }); R.text('topic ' + tp, x + 316, y + 24, 3.4, { al: 'r', ink: 'P' }); });
    R.text('methods on this poster are examples: teachers are encouraged to vary them', 330, 232, 3.7, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(6); const i = Math.floor(p * 12), col = i < 6 ? 0 : 1, row = i % 6; A.dot(10 + col * 328 + 14, 22 + row * 34 + 15, 2.2, 'P', 0.9, 1); },
});
