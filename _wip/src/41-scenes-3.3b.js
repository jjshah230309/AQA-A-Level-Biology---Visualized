/* ===================== 3.3.2 (cont.) human gas exchange; 3.3.3 digestion and absorption ===================== */
/* ---------- 3.3.2e Human gas exchange system: gross structure ---------- */
S({
  id: '3.3.2e', num: '3.3.2', sub: 'The human gas exchange system: trachea, bronchi, bronchioles, alveoli, lungs', title: 'Gas exchange', topic: '3.3', slot: [3, 1], dna: 'mark', ao: 1,
  covers: ['3.3.2.s6'],
  card: {
    text: 'The gross structure of the human gas exchange system is limited to the <b>trachea</b>, two <b>bronchi</b>, many branching <b>bronchioles</b> and the <b>alveoli</b>, all within the <b>lungs</b> in the thorax. Air passes down the trachea and bronchi to the bronchioles and ends in clusters of alveoli, surrounded by capillaries, where gas exchange takes place. The lungs are protected by the rib cage and ventilated by the intercostal muscles and the diaphragm.',
    terms: ['trachea', 'bronchus', 'bronchiole', 'alveolus', 'lung', 'thorax', 'diaphragm', 'ribs'],
    skill: 'Label a system', eq: null,
    q: 'Put these in order from the mouth: bronchiole, alveolus, trachea, bronchus.', a: 'Trachea → bronchus → bronchiole → alveolus.'
  },
  draw(R, sc) {
    R.text('human gas exchange system', 160, 15, 5, { al: 'c' });
    const K = 0.84, TX = -4, TY = 20, W = (x, y) => [TX + K * x, TY + K * y];
    R.push(TX, TY, 0, K);
    const torso = [66, 50, 40, 56, 22, 70, 20, 120, 28, 176, 56, 190, 120, 190, 148, 176, 156, 120, 154, 70, 136, 56, 110, 50];
    R.fill(torso, { ink: 'P', t: 0.05, smooth: true, wob: 0.6 }); R.poly(torso, { ink: 'B', w: 1.2 / K, smooth: true, wob: 0.8 });
    R.circle(88, 30, 13, { ink: 'B', w: 1.2 / K, fi: 'Y', ft: 0.12 }); R.line(80, 42, 80, 52, { ink: 'B', w: 1 / K, taper: 'none' }); R.line(96, 42, 96, 52, { ink: 'B', w: 1 / K, taper: 'none' });
    for (let k = 0; k < 5; k++) { R.stroke([30, 86 + k * 14, 40, 80 + k * 14, 56, 84 + k * 14], { ink: 'B', w: 0.8 / K, smooth: true, taper: 'both', t: 0.6 }); R.stroke([146, 86 + k * 14, 136, 80 + k * 14, 120, 84 + k * 14], { ink: 'B', w: 0.8 / K, smooth: true, taper: 'both', t: 0.6 }); }
    const lungR = [42, 84, 60, 78, 76, 90, 78, 150, 66, 166, 44, 162, 32, 126], lungL = [100, 90, 116, 78, 136, 84, 144, 126, 132, 162, 110, 166, 98, 150];
    [lungR, lungL].forEach(l => { R.fill(l, { ink: 'P', t: 0.2, smooth: true, wob: 0.4 }); R.poly(l, { ink: 'B', w: 1.2 / K, smooth: true, wob: 0.5 }); });
    // trachea with cartilage rings
    R.rect(84, 44, 8, 46, { ink: 'B', w: 1 / K, fi: 'T', ft: 0.3, wob: 0.1 }); for (let k = 0; k < 8; k++) R.line(82.6, 48 + k * 5.4, 93.4, 48 + k * 5.4, { ink: 'B', w: 0.8 / K, taper: 'none' });
    const brR = [88, 90, 80, 98, 64, 108], brL = [88, 90, 96, 98, 112, 108];
    [brR, brL].forEach(b => { R.stroke(b, { ink: 'T', w: 5 / K, t: 0.4, smooth: true, taper: 'none', solid: false }); R.stroke(b, { ink: 'B', w: 1 / K, smooth: true, taper: 'none' }); });
    const branch = (x, y, a, len, d, wd) => {
      if (d === 0) { R.circle(x, y, 2.4, { ink: 'B', w: 0.5 / K, fi: 'P', ft: 0.5 }); R.circle(x + 2, y + 1.5, 1.8, { ink: 'B', w: 0.4 / K, fi: 'P', ft: 0.5 }); return; }
      const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; R.line(x, y, x2, y2, { ink: 'B', w: wd / K, taper: 'none' });
      branch(x2, y2, a - 0.5, len * 0.72, d - 1, wd * 0.7); branch(x2, y2, a + 0.5, len * 0.72, d - 1, wd * 0.7);
    };
    branch(64, 108, 1.95, 22, 3, 1.4); branch(64, 108, 1.2, 14, 2, 1.1); branch(112, 108, 1.2, 22, 3, 1.4); branch(112, 108, 1.95, 14, 2, 1.1);
    R.stroke([24, 182, 50, 166, 88, 162, 126, 166, 152, 182], { ink: 'Y', w: 5 / K, t: 0.6, smooth: true, taper: 'none', solid: false }); R.stroke([24, 182, 50, 166, 88, 162, 126, 166, 152, 182], { ink: 'B', w: 1.2 / K, smooth: true, taper: 'none' });
    R.pop();
    const lab = (t, tx, ty, x, y) => { const q = W(x, y); leader(R, t, q[0], q[1], tx, ty, { size: 4.2, al: 'l' }); };
    lab('trachea', 134, 36, 90, 62); lab('bronchus', 134, 62, 106, 102); lab('bronchioles', 134, 84, 120, 124); lab('lung', 134, 106, 138, 140);
    lab('rib', 134, 130, 144, 100); lab('diaphragm', 134, 196, 124, 168);
    // zoom to alveoli
    R.circle(242, 134, 62, { ink: 'B', w: 1.4, fi: 'P', ft: 0.06 }); R.line(100, 128, 190, 110, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' }); R.line(104, 140, 194, 170, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.stroke([226, 80, 232, 98, 238, 106], { ink: 'T', w: 6, t: 0.4, smooth: true, taper: 'none', solid: false }); R.stroke([226, 80, 232, 98, 238, 106], { ink: 'B', w: 1, smooth: true, taper: 'none' });
    [[222, 124], [248, 122], [270, 136], [212, 152], [240, 148], [266, 162], [226, 178], [252, 180]].forEach(([x, y], i) => { R.circle(x, y, 13, { ink: 'B', w: 1.1, fi: 'T', ft: 0.12, wob: 0.3 }); for (let k = 0; k < 9; k++) { const a = k * TAU / 9 + i; R.arc(x + Math.cos(a) * 14, y + Math.sin(a) * 14, 4, 4, a - 1.2, a + 1.2, { ink: 'P', w: 1.1, taper: 'none' }); } });
    leader(R, 'bronchiole', 228, 86, 262, 62, { size: 4.2, al: 'l' }); leader(R, 'alveoli', 248, 124, 280, 100, { size: 4.2, al: 'l' }); leader(R, 'capillaries', 262 + 8, 162 + 12, 282, 206, { size: 4.2, al: 'l' });
    R.text('air in and out; gas exchange at the alveoli', 160, 236, 4.2, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(86, 44 + u * 46, 1.2, 'T', 0.7, i); }
    for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(226 + u * 6, 80 + u * 24, 1.2, 'T', 0.7, 4 + i); }
  },
});

/* ---------- 3.3.2f Alveolar epithelium as a gas exchange surface ---------- */
S({
  id: '3.3.2f', num: '3.3.2', sub: 'The alveolar epithelium: features of the exchange surface', title: 'Gas exchange', topic: '3.3', slot: [0, 2], dna: 'mark', ao: 2,
  covers: ['3.3.2.s7'],
  card: {
    text: 'The <b>alveolar epithelium</b> is a surface over which gas exchange takes place efficiently. The alveolar wall and capillary wall are each a single, flattened cell thick, giving a very <b>short diffusion distance</b>. There are many alveoli (large <b>surface area</b>). Ventilation brings fresh air and the circulation removes oxygenated blood, so a steep <b>concentration gradient</b> is maintained: oxygen diffuses from alveolar air into red blood cells; carbon dioxide diffuses the other way.',
    terms: ['alveolar epithelium', 'diffusion distance', 'surface area', 'concentration gradient', 'capillary', 'red blood cell', 'ventilation', 'squamous epithelium'],
    skill: 'MS 2.2: rate of diffusion ∝ ...', eq: MATH(mt('rate of diffusion '), mo('∝'), mfrac(mt('surface area × concentration difference'), mt('thickness of exchange surface'))),
    q: 'Give two ways a steep concentration gradient is maintained across the alveolar epithelium.', a: 'Ventilation keeps air in the alveoli rich in oxygen; blood flow in the capillaries constantly removes oxygen and brings carbon dioxide.'
  },
  draw(R, sc) {
    R.text('alveolus and capillary', 100, 15, 5.2, { al: 'c' });
    // alveolus with flattened epithelial cells; capillary at right
    const cx = 88, cy = 100, r = 52;
    R.circle(cx, cy, r, { ink: 'B', w: 0.8, fi: 'T', ft: 0.07, wob: 0.4 });
    for (let i = 0; i < 18; i++) { const a = i * TAU / 18, a2 = (i + 0.85) * TAU / 18; R.arc(cx, cy, r, r, a, a2, { ink: 'B', w: 1.8, taper: 'none' }); }
    for (let i = 0; i < 6; i++) { const a = (i * 3 + 1.4) * TAU / 18; R.ellipse(cx + Math.cos(a) * (r + 0.8), cy + Math.sin(a) * (r + 0.8), 4, 1.8, { ink: 'B', w: 0.7, fi: 'B', ft: 0.45, rot: a * 180 / PI + 90 }); }
    R.text('air', cx, cy + 2, 6, { al: 'c', ink: 'T' }); R.text('O_2 rich', cx, cy + 12, 4.2, { al: 'c' });
    // capillary running along the right side
    const cap = []; for (let i = 0; i <= 14; i++) { const a = -1.4 + i * 0.2; cap.push(cx + Math.cos(a) * (r + 12), cy + Math.sin(a) * (r + 12)); }
    R.stroke(cap, { ink: 'P', w: 12, t: 0.3, smooth: true, taper: 'none', solid: false }); R.stroke(cap, { ink: 'B', w: 1.2, smooth: true, taper: 'none' });
    R.stroke(cap.map((v, i) => i % 2 ? cy + (v - cy) * 0.89 : cx + (v - cx) * 0.89), { ink: 'B', w: 1.2, smooth: true, taper: 'none' });
    for (let i = 1; i < 13; i += 2) { const a = -1.4 + i * 0.2; R.push(cx + Math.cos(a) * (r + 12), cy + Math.sin(a) * (r + 12), a + PI / 2, 1); R.ellipse(0, 0, 3.8, 2.2, { ink: 'B', w: 0.9, fi: 'P', ft: 0.85 }); R.pop(); }
    leader(R, 'alveolar epithelium', cx - 38, cy + 38, 52, 170, { size: 4, al: 'c' }); leader(R, 'capillary', cx + 70, cy + 28, 150, 160, { size: 4, al: 'c' }); leader(R, 'red blood cell', cx + 62, cy - 28, 154, 40, { size: 4, al: 'c' });
    R.text('many alveoli = large surface area', 100, 186, 4.2, { al: 'c' });
    ['ventilation keeps O_2 high in the air,', 'blood flow carries O_2 away:', 'steep concentration gradient'].forEach((t, i) => R.text(t, 100, 204 + i * 7, 4.2, { al: 'c' }));
    R.line(204, 22, 204, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // zoom: exchange barrier
    R.text('the exchange barrier', 262, 30, 4.8, { al: 'c' });
    R.rect(220, 44, 84, 30, { ink: 'B', w: 1, fi: 'T', ft: 0.12, wob: 0.2 }); R.text('air in alveolus', 262, 62, 4.4, { al: 'c' });
    R.rrect(220, 74, 84, 9, 3, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.3, wob: 0.2 }); R.ellipse(256, 78.5, 8, 2.6, { ink: 'B', w: 0.7, fi: 'B', ft: 0.5 });
    R.rrect(220, 85, 84, 9, 3, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.3, wob: 0.2 }); R.ellipse(282, 89.5, 8, 2.6, { ink: 'B', w: 0.7, fi: 'B', ft: 0.5 });
    R.rect(220, 96, 84, 40, { ink: 'B', w: 1, fi: 'P', ft: 0.14, wob: 0.2 }); R.ellipse(262, 118, 22, 12, { ink: 'B', w: 1, fi: 'P', ft: 0.85 }); R.text('red blood cell', 262, 120, 4, { al: 'c' });
    R.arrow([236, 56, 236, 128], { ink: 'P', w: 1.2, hs: 3 }); R.text('O_2', 230, 52, 4.4, { al: 'r', ink: 'P' });
    R.arrow([296, 128, 296, 56], { ink: 'T', w: 1.2, hs: 3 }); R.text('CO_2', 300, 52, 4.4, { al: 'r', ink: 'T' });
    leader(R, 'alveolar epithelium: 1 flat cell thick', 232, 78, 262, 150, { size: 3.7, al: 'c' });
    leader(R, 'capillary endothelium: 1 flat cell thick', 296, 90, 262, 164, { size: 3.7, al: 'c' });
    R.text('very short diffusion distance', 262, 196, 4.4, { al: 'c', ink: 'P' });
    ['thin walls + large area +', 'steep gradient = fast diffusion'].forEach((t, i) => R.text(t, 262, 212 + i * 6.6, 4.2, { al: 'c' }));
  },
  anim(A, sc) {
    const p = A.ph(4); for (let i = 0; i < 4; i++) { const u = (p + i / 4) % 1; A.dot(236 + (i % 2) * 8, 56 + u * 70, 1.3, 'P', 0.9, i); A.dot(292 - (i % 2) * 6, 128 - u * 70, 1.3, 'T', 0.8, 5 + i); }
    for (let i = 0; i < 3; i++) { const a = -1.1 + ((p + i / 3) % 1) * 2.2; A.dot(88 + Math.cos(a) * 62, 100 + Math.sin(a) * 62, 3, 'P', 0.9, 9 + i); }
  },
});

/* ---------- 3.3.2g Ventilation: inspiration, expiration, pulmonary ventilation rate ---------- */
S({
  id: '3.3.2g', num: '3.3.2', sub: 'Ventilation: diaphragm and antagonistic intercostal muscles; pulmonary ventilation rate', title: 'Gas exchange', topic: '3.3', slot: [1, 2], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.3.2.s8'],
  card: {
    text: '<b>Inspiration</b>: the external intercostal muscles contract, raising the ribs up and out, and the diaphragm contracts and flattens. The volume of the thoracic cavity increases, the pressure falls below atmospheric pressure and air flows in. <b>Expiration</b> (at rest): the external intercostals relax and the ribs fall; the diaphragm relaxes and domes upwards; volume decreases, pressure rises above atmospheric and air flows out. In <b>forced expiration</b> the internal intercostal muscles contract, antagonistic to the external ones, pulling the ribs down and in. <b>Pulmonary ventilation rate</b> = tidal volume × breathing rate.',
    terms: ['diaphragm', 'external intercostal muscles', 'internal intercostal muscles', 'antagonistic', 'thoracic cavity', 'pressure', 'tidal volume', 'pulmonary ventilation rate'],
    skill: 'MS 2.2: PVR = tidal volume × breathing rate', eq: MATH(mt('PVR '), mo('='), mt('tidal volume'), mo('×'), mt('breathing rate')),
    eqn: 'e.g. 0.5 dm³ × 12 min⁻¹ = 6 dm³ min⁻¹',
    q: 'A person has a tidal volume of 0.45 dm³ and breathes 14 times per minute. What is their PVR?', a: '0.45 × 14 = 6.3 dm³ per minute.'
  },
  draw(R, sc) {
    const panel = (cx, insp) => {
      R.text(insp ? 'inspiration' : 'expiration', cx, 15, 5.4, { al: 'c' });
      const fx = insp ? -9 : 0, fy = insp ? -4 : 0;                // front wall moves up and forward on inspiration
      // spine (back wall) as a column of vertebrae
      for (let k = 0; k < 6; k++) R.rrect(cx + 58, 46 + k * 18, 11, 14, 3, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.15 });
      R.text('spine', cx + 64, 160, 3.7, { al: 'c' });
      // ribs: cross-sections of the front wall (sloping down towards the spine side), with intercostal muscles between
      for (let k = 0; k < 5; k++) {
        const bx = cx - 58 + fx - k * (insp ? 0.4 : 0), by = 54 + k * 19 + fy * (1 - k * 0.15);
        const sl = insp ? 0.15 : 0.55;
        R.push(bx, by, sl, 1); R.rrect(-7, -3, 14, 6, 3, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.5, wob: 0.15 }); R.pop();
        // rib continues round to the spine
        R.stroke([bx + 7, by + 0.4, cx - 20, by + 4 - (insp ? 3 : 0), cx + 30, by + 8 - (insp ? 4 : 0), cx + 58, 53 + k * 18], { ink: 'B', w: 1.5, smooth: true, taper: 'start', t: 0.45 });
        if (k < 4) { const nx = cx - 58 + fx - (k + 1) * (insp ? 0.4 : 0), ny = 54 + (k + 1) * 19 + fy * (1 - (k + 1) * 0.15); R.line(bx + 1, by + 3, nx + 1, ny - 3, { ink: 'P', w: 2.4, taper: 'none' }); R.line(bx - 3, by + 3, nx - 3, ny - 3, { ink: 'T', w: 1.5, taper: 'none' }); }
      }
      R.text('sternum', cx - 60 + fx, 40, 3.6, { al: 'c' });
      // lungs inside the cage
      const lh = insp ? 100 : 80, lw = insp ? 40 : 34, lt = 60 + fy;
      const lung = [cx - lw - 8 + fx * 0.6, lt + 18, cx - 6, lt - 4, cx + lw * 0.8, lt + 6, cx + lw + 6, lt + 40, cx + lw * 0.8, lt + lh * 0.8, cx - 4, lt + lh, cx - lw + 6, lt + lh * 0.9, cx - lw - 10 + fx * 0.6, lt + lh * 0.45];
      R.knock(lung, { smooth: true }); R.fill(lung, { ink: 'P', t: insp ? 0.12 : 0.3, smooth: true, wob: 0.5 }); R.poly(lung, { ink: 'B', w: 1.2, smooth: true, wob: 0.5 });
      R.text(insp ? 'lung expands' : 'lung recoils', cx, lt + lh * 0.45 + 2, 3.9, { al: 'c' });
      R.rect(cx + lw * 0.35 - 2, 30, 4, 34 + fy, { ink: 'B', w: 0.9, fi: 'T', ft: 0.3, wob: 0.1 });
      // diaphragm
      const dy = insp ? 156 : 138, dd = insp ? 3 : 16;
      const dia = [cx - 62 + fx, dy + dd * 0.4, cx - 22, dy - dd * 0.2, cx + 10, dy - dd, cx + 56, dy + 2];
      R.stroke(dia, { ink: 'Y', w: 5.4, t: 0.7, smooth: true, taper: 'none', solid: false }); R.stroke(dia, { ink: 'B', w: 1.3, smooth: true, taper: 'none' });
      R.text('diaphragm', cx, dy + 13, 3.8, { al: 'c' });
      // arrows
      if (insp) { R.arrow([cx - 78, 70, cx - 84, 54], { ink: 'P', w: 1.2, hs: 2.8 }); R.arrow([cx, dy + 4, cx, dy + 17], { ink: 'P', w: 1.2, hs: 2.8 }); R.arrow([cx + lw * 0.35, 22, cx + lw * 0.35, 34], { ink: 'T', w: 1.2, hs: 2.8 }); }
      else { R.arrow([cx - 84, 50, cx - 78, 66], { ink: 'P', w: 1.2, hs: 2.8 }); R.arrow([cx, dy - 2, cx, dy - 14], { ink: 'P', w: 1.2, hs: 2.8 }); R.arrow([cx + lw * 0.35, 34, cx + lw * 0.35, 22], { ink: 'T', w: 1.2, hs: 2.8 }); }
      R.text(insp ? 'air in' : 'air out', cx + lw * 0.35 + 12, 26, 4, { al: 'l', ink: 'T' });
      const L = insp ? ['external intercostals contract: ribs up and out', 'diaphragm contracts and flattens', 'thoracic volume increases', 'pressure falls below atmospheric'] : ['external intercostals relax: ribs down and in', 'diaphragm relaxes and domes up', 'thoracic volume decreases', 'pressure rises above atmospheric'];
      L.forEach((t, i) => R.text(t, cx, 186 + i * 7.4, 3.9, { al: 'c' }));
    };
    panel(110, true); panel(332, false);
    R.line(216, 22, 216, 234, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' }); R.line(444, 22, 444, 234, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // key
    R.line(40, 226, 48, 226, { ink: 'P', w: 2.4, taper: 'none' }); R.text('external intercostal muscle', 52, 228, 3.6, { al: 'l' }); R.line(168, 226, 176, 226, { ink: 'T', w: 1.6, taper: 'none' }); R.text('internal intercostal muscle', 180, 228, 3.6, { al: 'l' });
    // trace and PVR
    R.text('pulmonary ventilation rate', 550, 15, 5, { al: 'c' });
    const g = R.graph(468, 34, 180, 90, { xmin: 0, xmax: 24, ymin: 0, ymax: 3, xl: 'time / s', yl: 'volume / dm^3', xt: [[0, '0'], [10, '10'], [20, '20']], yt: [[0, '0'], [1, '1'], [2, '2'], [3, '3']], fs: 4, xly: 12, ylx: 12 }).axes();
    const tr = []; for (let i = 0; i <= 120; i++) { const t = i / 120 * 24; tr.push(t, 2.2 - 0.25 * Math.cos(t / 5 * TAU)); }
    g.curve(tr, { ink: 'P', w: 1.5 });
    g.dashed(0, 2.45, 7.5, 2.45, { ink: 'B', w: 0.6 }); g.dashed(0, 1.95, 7.5, 1.95, { ink: 'B', w: 0.6 });
    R.arrow([g.X(5.0), g.Y(1.97), g.X(5.0), g.Y(2.43)], { ink: 'T', w: 1, hs: 2.2, both: true }); R.text('tidal volume', g.X(5.0), g.Y(1.3), 3.8, { al: 'c' });
    R.line(g.X(5), g.Y(2.95), g.X(10), g.Y(2.95), { ink: 'B', w: 0.8, taper: 'none' }); R.text('one breath = 5 s (12 per minute)', g.X(7.5), g.Y(2.95) - 3, 3.7, { al: 'c' });
    R.text('PVR = tidal volume × breathing rate', 550, 150, 4.8, { al: 'c' });
    ['tidal volume 0.5 dm^3', 'breathing rate 12 min^-1', 'PVR = 0.5 × 12 = 6 dm^3 min^-1'].forEach((t, i) => R.text(t, 550, 164 + i * 8, 4.5, { al: 'c' }));
    R.text('forced expiration: internal intercostals contract', 550, 198, 3.9, { al: 'c' }); R.text('(antagonistic to the external muscles)', 550, 204, 3.9, { al: 'c' });
    R.text('and abdominal muscles push the diaphragm up', 550, 210, 3.9, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(4); const ins = p < 0.5; const u = (p % 0.5) * 2;
    A.dot(124, ins ? 24 + u * 18 : 42 - u * 18, 1.4, 'T', 0.9, 1); A.dot(350, ins ? 42 - u * 18 : 24 + u * 18, 1.4, 'T', 0.9, 2);
  },
});

/* ---------- 3.3.2h Lung disease: effects on gas exchange and ventilation; risk-factor data ---------- */
S({
  id: '3.3.2h', num: '3.3.2', sub: 'Lung disease and risk factors: interpreting data, correlation and causation', title: 'Gas exchange', topic: '3.3', slot: [3, 2], dna: 'mark', ao: 3,
  covers: ['3.3.2.s9', '3.3.2.s10', '3.3.2.s11', '3.3.2.s12', '3.3.2.s13'],
  card: {
    text: 'Lung disease changes gas exchange and ventilation. In <b>fibrosis</b> the alveolar walls thicken with scar tissue, lengthening the diffusion path and making the lungs less elastic, so less air can be moved (reduced <b>FVC</b>). In <b>emphysema</b> alveolar walls break down, reducing surface area and elasticity. In <b>asthma</b> the airways narrow, reducing the <b>FEV₁</b> (air forced out in the first second). Smoking and pollution are risk factors. A <b>correlation</b> between a risk factor and disease does not alone prove <b>causation</b>; evidence such as a mechanism, dose–response and controlled studies led to statutory restrictions.',
    terms: ['fibrosis', 'emphysema', 'asthma', 'tuberculosis', 'FEV1', 'FVC', 'correlation', 'causation', 'risk factor', 'pollution', 'smoking'],
    skill: 'MS 1.7: scatter diagram and correlation', eq: null, eqn: 'FEV₁ ÷ FVC: lower than normal in airway narrowing',
    q: 'A study shows that smokers have more lung cancer. Why does this not prove smoking causes cancer?', a: 'It shows a correlation only; other factors might differ between groups. Causation needs more evidence, e.g. a mechanism and dose–response relationship.'
  },
  draw(R, sc) {
    R.text('lung disease and risk data', 160, 14, 5, { al: 'c' });
    // three alveolar wall drawings
    const alv = (x, y, kind, label) => {
      const w = 90, h = 28;
      if (kind === 'normal') { for (let i = 0; i < 3; i++) R.circle(x + 15 + i * 30, y + 14, 12, { ink: 'B', w: 1, fi: 'T', ft: 0.12 }); }
      if (kind === 'fib') { for (let i = 0; i < 3; i++) { R.circle(x + 15 + i * 30, y + 14, 10, { ink: 'B', w: 3.2, fi: 'T', ft: 0.12 }); R.circle(x + 15 + i * 30, y + 14, 12.4, { ink: 'B', w: 1, fi: 'Y', ft: 0.3 }); } }
      if (kind === 'emph') { R.ellipse(x + 30, y + 14, 22, 12, { ink: 'B', w: 1, fi: 'T', ft: 0.12 }); R.circle(x + 72, y + 12, 11, { ink: 'B', w: 1, fi: 'T', ft: 0.12 }); R.line(x + 50, y + 4, x + 54, y + 24, { ink: 'B', w: 0.5, t: 0.4, taper: 'none' }); }
      R.text(label, x + 45, y + 36, 4, { al: 'c' });
    };
    alv(8, 24, 'normal', 'normal alveoli'); alv(8, 70, 'fib', 'fibrosis: thick walls'); alv(8, 116, 'emph', 'emphysema: walls break down');
    // spirometer traces: forced expiration
    R.text('forced expiration', 214, 24, 4.4, { al: 'c' });
    const g = R.graph(122, 32, 190, 96, { xmin: 0, xmax: 6, ymin: 0, ymax: 5, xl: 'time / s', yl: 'volume exhaled / dm^3', xt: [[0, '0'], [1, '1'], [3, '3'], [6, '6']], yt: [[0, '0'], [2, '2'], [4, '4']], fs: 3.9, xly: 11, ylx: 12 }).axes();
    g.curve(t => 4.6 * (1 - Math.exp(-t * 1.9)), { ink: 'T', w: 1.5 }); g.curve(t => 2.6 * (1 - Math.exp(-t * 3.2)), { ink: 'Y', w: 1.5 }); g.curve(t => 4.2 * (1 - Math.exp(-t * 0.7)), { ink: 'P', w: 1.5 });
    g.dashed(1, 0, 1, 4.3, { ink: 'B', w: 0.6 });
    R.text('normal', g.X(3.4), g.Y(4.9), 3.8, { al: 'l', ink: 'T' }); R.text('fibrosis', g.X(3.6), g.Y(2.2), 3.8, { al: 'l', ink: 'B' }); R.text('asthma / emphysema', g.X(2.6), g.Y(3.1), 3.8, { al: 'l', ink: 'P' });
    R.text('FEV_1 at 1 s', g.X(1) + 3, g.Y(0.7), 3.7, { al: 'l' }); R.text('FVC = total volume forced out', g.X(5.9), g.Y(3.5), 3.7, { al: 'r' }); R.arrow([g.X(5.5), g.Y(3.35), g.X(5.5), g.Y(4.45)], { ink: 'B', w: 0.7, hs: 2 });
    R.text('FEV_1 low relative to FVC: narrowed airways', 214, 154, 4, { al: 'c' }); R.text('FVC low: stiff, scarred lungs', 214, 161, 4, { al: 'c' });
    R.line(8, 168, 312, 168, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // correlation scatter
    R.text('risk factor data: smoking and lung cancer', 90, 180, 4.4, { al: 'c' });
    const s2 = R.graph(30, 190, 110, 38, { xmin: 0, xmax: 40, ymin: 0, ymax: 10, xl: 'cigarettes per day', yl: 'cases', xt: [], yt: [], fs: 3.7, xly: 9, ylx: 4 }).axes();
    [[2, 0.6], [6, 1.2], [10, 2.4], [14, 2.2], [18, 3.8], [22, 4.4], [26, 5.8], [30, 6.2], [34, 8.2], [38, 8.0]].forEach(([x, y]) => R.dot(s2.X(x), s2.Y(y), 1.5, { ink: 'B' }));
    s2.curve([0, 0, 40, 8.6], { ink: 'P', w: 1 });
    R.text('positive correlation', 128, 190, 3.8, { al: 'r' });
    ['correlation ≠ causation: need', 'a mechanism, dose–response,', 'controlled studies', '→ statutory restrictions'].forEach((t, i) => R.text(t, 232, 182 + i * 7, 4, { al: 'c', ink: i === 3 ? 'P' : 'B' }));
    R.line(172, 172, 172, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(122 + p * 190, 128 - 4.6 * (1 - Math.exp(-p * 6 * 1.9)) * 19, 1.2, 'T', 0.9, 1); },
});

/* gut cartoon helpers */
function enzArrow(R, x, y, w, label, o = {}) { R.arrow([x, y, x + w, y], { ink: 'P', w: 1.2, hs: 3 }); R.text(label, x + w / 2, y - 3.6, o.size || 4, { al: 'c', ink: 'P' }); }
function pacman(R, x, y, r, open, ink = 'P') { // enzyme-like blob with a notch
  const p = [x - r, y - r * 0.7, x - r * 0.2, y - r, x + r * 0.6, y - r * 0.8, x + r, y - r * 0.1, x + r * 0.8, y + r * 0.8, x - r * 0.1, y + r, x - r, y + r * 0.5];
  R.fill(p, { ink, t: 0.8, smooth: true, wob: 0.1 }); R.poly(p, { ink: 'B', w: 0.9, smooth: true, wob: 0.1 });
  R.fill([x - r * 0.1, y - r * 0.2, x + r * 0.3, y - r * 0.2, x + r * 0.2, y + r * 0.3, x - r * 0.2, y + r * 0.3], { knock: true });
  R.poly([x - r * 0.1, y - r * 0.2, x + r * 0.3, y - r * 0.2, x + r * 0.2, y + r * 0.3, x - r * 0.2, y + r * 0.3], { ink: 'B', w: 0.6, wob: 0.05 });
}

/* ---------- 3.3.3a Digestion ---------- */
S({
  id: '3.3.3a', num: '3.3.3', sub: 'Digestion in mammals: carbohydrates, lipids and proteins', title: 'Digestion and absorption', topic: '3.3', slot: [0, 3], span: [2, 1], dna: 'mark', ao: 1,
  covers: ['3.3.3.s1', '3.3.3.s2', '3.3.3.s3', '3.3.3.s4'],
  card: {
    text: 'During <b>digestion</b>, large biological molecules are <b>hydrolysed</b> to smaller molecules that can be absorbed across cell membranes. <b>Carbohydrates</b>: <b>amylases</b> (from the salivary glands and pancreas) hydrolyse starch to maltose; <b>membrane-bound disaccharidases</b> in the ileum epithelium hydrolyse disaccharides to monosaccharides. <b>Lipids</b>: <b>lipase</b> hydrolyses triglycerides into monoglycerides and fatty acids; <b>bile salts</b> emulsify lipids into small droplets, increasing surface area. <b>Proteins</b>: <b>endopeptidases</b> hydrolyse peptide bonds within the polypeptide; <b>exopeptidases</b> remove amino acids from the ends; <b>membrane-bound dipeptidases</b> hydrolyse dipeptides.',
    terms: ['hydrolysis', 'amylase', 'disaccharidase', 'lipase', 'bile salts', 'emulsification', 'endopeptidase', 'exopeptidase', 'dipeptidase', 'membrane-bound'],
    skill: 'MS 3.5/RP1-style rate: link to enzymes', eq: null,
    q: 'Why does the emulsification of lipids by bile salts speed up digestion?', a: 'It breaks large lipid globules into many small droplets, increasing the surface area available to lipase.'
  },
  draw(R, sc) {
    R.text('digestion: hydrolysis of large molecules', 332, 15, 5.2, { al: 'c' });
    // gut path: mouth/salivary glands -> stomach -> duodenum/pancreas -> ileum
    R.text('carbohydrates', 66, 36, 4.8, { al: 'c' }); R.text('lipids', 66, 100, 4.8, { al: 'c' }); R.text('proteins', 66, 164, 4.8, { al: 'c' });
    R.line(8, 88, 656, 88, { ink: 'B', w: 0.4, t: 0.4, taper: 'none' }); R.line(8, 152, 656, 152, { ink: 'B', w: 0.4, t: 0.4, taper: 'none' });
    // ---- carbohydrates: starch -> maltose -> glucose
    const sg = (x, y, n) => { for (let i = 0; i < n; i++) R.poly(hexPts(x + i * 9, y, 4.2), { ink: 'B', w: 0.8, fi: 'Y', ft: 0.5 }); R.line(x, y - 0, x + (n - 1) * 9, y, { ink: 'B', w: 0.5, taper: 'none', t: 0.6 }); };
    sg(136, 52, 9); R.text('starch', 172, 66, 3.9, { al: 'c' });
    enzArrow(R, 218, 52, 40, 'amylase'); pacman(R, 238, 38, 5.4); R.text('salivary glands, pancreas', 238, 26, 3.4, { al: 'c' });
    [0, 1, 2, 3].forEach(i => { sg(268 + i * 22, 52, 2); }); R.text('maltose', 300, 66, 3.9, { al: 'c' });
    enzArrow(R, 358, 52, 52, 'disaccharidase'); R.text('membrane-bound, ileum', 384, 66, 3.4, { al: 'c' });
    [0, 1, 2, 3, 4, 5].forEach(i => R.poly(hexPts(426 + i * 14, 52, 4.2), { ink: 'B', w: 0.8, fi: 'Y', ft: 0.5 })); R.text('glucose (monosaccharides)', 460, 66, 3.9, { al: 'c' });
    // bond mark
    R.bondMark(145, 52, 2.4); R.bondMark(163, 52, 2.4);
    // ---- lipids
    const tri = (x, y) => { R.line(x, y - 8, x, y + 8, { ink: 'B', w: 1.3, taper: 'none' }); [-8, 0, 8].forEach(dy => { R.stroke([x, y + dy, x + 10, y + dy, x + 14, y + dy - 2, x + 18, y + dy + 2, x + 22, y + dy - 2, x + 26, y + dy + 2, x + 30, y + dy], { ink: 'Y', w: 1.4, smooth: false, taper: 'none' }); R.bondMark(x + 5, y + dy, 2); }); };
    tri(136, 116); R.text('triglyceride', 160, 132, 3.9, { al: 'c' });
    // emulsification
    R.circle(222, 112, 11, { ink: 'B', w: 1, fi: 'Y', ft: 0.4 }); R.arrow([236, 112, 252, 112], { ink: 'P', w: 1.1, hs: 2.6 }); R.text('bile salts', 244, 106, 3.6, { al: 'c', ink: 'P' });
    [[262, 106], [276, 118], [264, 122], [280, 106], [270, 112]].forEach(([x, y]) => R.circle(x, y, 3.4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.4 }));
    R.text('large lipid droplet → emulsion of small droplets', 252, 132, 3.7, { al: 'c' });
    enzArrow(R, 310, 114, 40, 'lipase'); pacman(R, 330, 100, 5.4); R.text('pancreas', 330, 94, 3.4, { al: 'c' });
    R.line(372, 108, 372, 124, { ink: 'B', w: 1.3, taper: 'none' }); R.stroke([372, 108, 390, 108, 396, 106, 402, 110, 408, 106, 414, 110, 420, 108], { ink: 'Y', w: 1.4, taper: 'none' }); R.text('monoglyceride', 392, 130, 3.7, { al: 'c' });
    R.text('+', 430, 116, 6, { al: 'c' });
    [0, 1].forEach(i => { R.stroke([440, 106 + i * 12, 450, 106 + i * 12, 454, 104 + i * 12, 458, 108 + i * 12, 462, 104 + i * 12, 466, 108 + i * 12, 470, 106 + i * 12], { ink: 'Y', w: 1.4, taper: 'none' }); R.circle(437, 106 + i * 12, 2.2, { ink: 'B', w: 0.7, fi: 'P', ft: 0.9 }); }); R.text('fatty acids', 454, 132, 3.7, { al: 'c' });
    // ---- proteins
    const pep = (x, y, n, cols) => { for (let i = 0; i < n; i++) { R.circle(x + i * 10, y + (i % 2) * 3, 4, { ink: 'B', w: 0.8, fi: cols[i % cols.length], ft: 0.55 }); if (i) R.line(x + (i - 1) * 10 + 4, y + ((i - 1) % 2) * 3, x + i * 10 - 4, y + (i % 2) * 3, { ink: 'B', w: 0.8, taper: 'none' }); } };
    pep(136, 182, 10, ['P', 'Y', 'T', 'TY']); R.text('polypeptide', 182, 198, 3.9, { al: 'c' });
    enzArrow(R, 236, 182, 44, 'endopeptidase'); R.text('breaks bonds within', 258, 196, 3.4, { al: 'c' }); R.text('the chain', 258, 201.5, 3.4, { al: 'c' }); pacman(R, 258, 168, 5.4);
    pep(298, 176, 4, ['P', 'Y']); pep(354, 176, 3, ['T', 'TY']); pep(400, 176, 3, ['Y', 'P']);
    enzArrow(R, 444, 182, 44, 'exopeptidase'); R.text('removes amino acids', 466, 196, 3.4, { al: 'c' }); R.text('from the ends', 466, 201.5, 3.4, { al: 'c' }); pacman(R, 466, 168, 5.4);
    pep(506, 176, 2, ['P']); [0, 1, 2, 3, 4].forEach(i => R.circle(540 + i * 12, 182, 4, { ink: 'B', w: 0.8, fi: ['P', 'Y', 'T', 'TY', 'P'][i], ft: 0.55 }));
    R.text('dipeptide', 516, 198, 3.7, { al: 'c' }); R.text('amino acids', 566, 198, 3.7, { al: 'c' }); enzArrow(R, 524, 214, 30, 'dipeptidase', { size: 3.6 }); R.text('membrane-bound', 536, 224, 3.4, { al: 'c' });
    // all hydrolysis: water
    R.drop(600, 100, 7, {}); R.text('every step is hydrolysis:', 600, 120, 3.8, { al: 'c' }); R.text('water breaks bonds', 600, 126, 3.8, { al: 'c' });
    R.drop(600, 180, 7, {});
    R.text('digestion in the lumen', 640, 228, 3.6, { al: 'r' });
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(300 + u * 190, 52, 1.2, 'Y', 0.8, i); }
  },
});

/* ---------- 3.3.3b Absorption of the products of digestion ---------- */
S({
  id: '3.3.3b', num: '3.3.3', sub: 'Absorption in the ileum: co-transport and micelles', title: 'Digestion and absorption', topic: '3.3', slot: [2, 3], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.3.3.s5', '3.3.3.s6', '3.3.3.s7'],
  card: {
    text: 'The <b>ileum</b> is adapted for absorption: folded wall, <b>villi</b> and <b>microvilli</b> give a very large surface area; thin epithelium; a rich blood supply maintains concentration gradients. Amino acids and monosaccharides are absorbed by <b>co-transport</b>: sodium ions are actively transported out of the epithelial cell, Na⁺ then diffuses in from the lumen through a co-transporter protein bringing the amino acid or monosaccharide with it; these then diffuse into the blood. Lipid digestion products form <b>micelles</b> with bile salts; micelles bring them to the epithelium, where monoglycerides and fatty acids diffuse across the membrane (lipid-soluble). Inside the cell they are reassembled into triglycerides and leave in vesicles via the lymph and blood.',
    terms: ['ileum', 'villus', 'microvilli', 'co-transport', 'sodium ions', 'amino acid', 'monosaccharide', 'micelle', 'bile salts', 'monoglyceride', 'fatty acid'],
    skill: 'Link to 3.2.3: co-transport', eq: null,
    q: 'Why do monoglycerides and fatty acids not need a carrier protein to enter epithelial cells?', a: 'They are lipid-soluble (non-polar), so they diffuse directly through the phospholipid bilayer; micelles keep a high concentration near the membrane.'
  },
  draw(R, sc) {
    R.text('the ileum: villi and microvilli', 90, 15, 5, { al: 'c' });
    // villi in section
    for (let v = 0; v < 3; v++) { const x = 38 + v * 56, h = 84; const vil = [x - 12, 160, x - 12, 160 - h * 0.6, x - 10, 160 - h, x, 160 - h - 6, x + 10, 160 - h, x + 12, 160 - h * 0.6, x + 12, 160]; R.fill(vil, { ink: 'Y', t: 0.12, wob: 0.3 }); R.poly(vil, { ink: 'B', w: 1.2, smooth: true, wob: 0.4 }); R.stroke([x - 3, 160, x - 3, 160 - h + 6], { ink: 'P', w: 2, t: 0.7, taper: 'none' }); R.stroke([x + 3, 160, x + 3, 160 - h + 6, x, 160 - h + 2], { ink: 'T', w: 1.8, t: 0.8, taper: 'none' }); }
    R.rect(8, 160, 164, 6, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.2, wob: 0.2 });
    leader(R, 'villus', 94, 76, 110, 62, { size: 4.2, al: 'c' }); leader(R, 'blood capillary', 91, 118, 44, 186, { size: 4.2, al: 'c' }); leader(R, 'lacteal', 97, 118, 140, 186, { size: 4.2, al: 'c' });
    R.text('large surface area:', 92, 208, 4.2, { al: 'c' }); R.text('folds, villi, microvilli', 92, 214.5, 4.2, { al: 'c' }); R.text('thin wall, rich blood supply', 92, 223, 4.2, { al: 'c' });
    R.line(178, 22, 178, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // epithelial cell with microvilli: co-transport + micelle
    const cx0 = 196, cx1 = 644;
    R.fill([cx0, 62, cx1, 62, cx1, 22, cx0, 22], { ink: 'T', t: 0.08, wob: 0.2 }); R.text('lumen of ileum', cx0 + 4, 30, 4.4, { al: 'l' });
    R.fill([cx0, 206, cx1, 206, cx1, 232, cx0, 232], { ink: 'P', t: 0.14, wob: 0.2 }); R.text('blood capillary', cx0 + 4, 223, 4.4, { al: 'l' });
    const top = []; for (let i = 0; i < 20; i++) { const x = cx0 + 4 + i * 22.4; top.push(x, 82, x, 68, x + 3, 64, x + 14, 64, x + 18, 68, x + 18, 82); }
    R.fill([cx0, 82, cx1, 82, cx1, 196, cx0, 196], { ink: 'P', t: 0.08, wob: 0.2 });
    R.stroke([cx0, 82, ...top, cx1, 82], { ink: 'B', w: 1.2, smooth: false, taper: 'none' });
    R.stroke([cx0, 82, cx0, 196, cx1, 196, cx1, 82], { ink: 'B', w: 1.2, smooth: false, taper: 'none' });
    R.text('microvilli', cx1 - 30, 56, 4, { al: 'c' });
    R.circle(404, 140, 17, { ink: 'B', w: 1, fi: 'B', ft: 0.25 }); R.text('epithelial cell', 404, 168, 4.4, { al: 'c' });
    const mp = (x, y, w, h, fi) => R.rrect(x, y, w, h, 2, { ink: 'B', w: 1, fi, ft: 0.8, wob: 0.1 });
    // co-transport
    mp(232, 76, 18, 12, 'P'); tok(R, 226, 38, 'Na^+', { r: 4.6 }); glucTok(R, 246, 42, 4.2); R.arrow([236, 50, 240, 76], { ink: 'P', w: 1.1, hs: 2.8 });
    R.text('co-transport:', 270, 40, 4.2, { al: 'l' }); R.text('Na^+ brings glucose or', 270, 46.5, 4.2, { al: 'l' }); R.text('an amino acid with it', 270, 53, 4.2, { al: 'l' });
    mp(298, 190, 18, 12, 'P'); tok(R, 307, 176, 'Na^+', { r: 4.6 }); R.arrow([307, 182, 307, 210], { ink: 'P', w: 1.1, hs: 2.8 }); R.text('Na^+ pumped out', 332, 176, 4, { al: 'l' }); R.text('(active transport, ATP)', 332, 182, 4, { al: 'l' });
    glucTok(R, 238, 120, 4.4); glucTok(R, 262, 134, 4.4); glucTok(R, 224, 148, 4.4); R.text('glucose builds up inside', 244, 168, 4, { al: 'c' });
    mp(556, 190, 18, 12, 'P'); glucTok(R, 565, 176, 4.4); R.arrow([565, 184, 565, 214], { ink: 'P', w: 1.1, hs: 2.8 }); R.text('glucose diffuses into blood', 548, 176, 4, { al: 'r' }); R.text('(facilitated diffusion)', 548, 182, 4, { al: 'r' });
    // micelle
    const mc = [500, 42], mr = 17;
    R.circle(mc[0], mc[1], mr, { ink: 'B', w: 0.8, fi: 'T', ft: 0.15 });
    for (let i = 0; i < 12; i++) { const a = i * TAU / 12; R.circle(mc[0] + Math.cos(a) * mr, mc[1] + Math.sin(a) * mr, 2.3, { ink: 'B', w: 0.6, fi: 'T', ft: 0.9 }); R.line(mc[0] + Math.cos(a) * (mr - 2), mc[1] + Math.sin(a) * (mr - 2), mc[0] + Math.cos(a) * (mr - 10), mc[1] + Math.sin(a) * (mr - 10), { ink: 'B', w: 0.7, taper: 'none' }); }
    R.circle(mc[0], mc[1], 4.4, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.6 });
    R.text('micelle:', 530, 32, 4.2, { al: 'l' }); R.text('bile salts + lipid products', 530, 38.5, 4.2, { al: 'l' });
    R.arrow([mc[0] - 4, mc[1] + 20, mc[0] - 4, 86], { ink: 'Y', w: 1.5, hs: 3 }); R.text('monoglycerides and fatty acids', 536, 98, 4.2, { al: 'c' }); R.text('diffuse through the membrane', 536, 104.5, 4.2, { al: 'c' });
    R.circle(500, 130, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5 }); R.text('reassembled into triglycerides', 520, 122, 4, { al: 'l' });
    R.arrow([506, 134, 522, 152], { ink: 'B', w: 0.9, hs: 2.4 }); R.circle(528, 158, 5, { ink: 'B', w: 0.9, fi: 'T', ft: 0.2 }); R.circle(528, 158, 2.4, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.5 }); R.text('vesicle → lymph', 538, 160, 4, { al: 'l' });
  },
  anim(A, sc) {
    const p = A.ph(5); A.ion(226 + p * 10, 38 + p * 40, 'Na^+', 'T', 4, 1); A.glucose(246 - p * 6, 42 + p * 40, 4.2, 2);
    A.dot(496, 66 + p * 24, 1.4, 'Y', 0.9, 3); A.glucose(565, 176 + p * 32, 4.4, 4); A.ion(307, 176 + p * 36, 'Na^+', 'T', 4, 5);
  },
});
