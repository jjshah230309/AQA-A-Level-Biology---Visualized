/* ===================== 3.6.3 (cont.) Contraction cycle, ATP / phosphocreatine, fibre types ===================== */
/* one frame of the actinomyosin cycle.  st: 0 resting, 1 bound, 2 power stroke, 3 detached (ATP), 4 re-cocked.
   Actin (pink) hangs above the myosin filament (teal); the myosin head is a pear on a flexible neck. */
function crossFrame(R, x0, st) {
  const fw = 78, ay = 44, by = 92, bx = x0 + 30;
  R.rrect(x0, 20, fw, 84, 5, { ink: 'B', w: 0.7, fi: 'Y', ft: 0.05, t: 0.8, wob: 0.3 });
  // actin shifted left by 16.8 once the power stroke has happened
  const sh = st >= 2 ? -16.8 : 0, sites = [14, 40, 66].map(v => x0 + v + sh).filter(v => v > x0 + 3 && v < x0 + fw - 3);
  R.line(x0 + 2, ay, x0 + fw - 2, ay, { ink: 'P', w: 2.6, taper: 'none', wob: 0.1 });
  sites.forEach(sx => R.rect(sx - 2, ay + 1.6, 4, 3.2, { ink: 'B', w: 0.5, fi: 'Y', ft: 0.9, wob: 0.05 }));
  // tropomyosin: blocks the sites when resting, pulled aside when Ca2+ has bound
  const ty = st === 0 ? ay + 6.6 : ay - 5, tp = [];
  for (let k = 0; k <= 9; k++) tp.push(x0 + 4 + k * 7.8 + (st >= 2 ? sh * 0.0 : 0), ty + Math.sin(k * 1.3 + st) * 1.1);
  R.stroke(tp, { ink: 'T', w: 1.7, smooth: true, taper: 'none', wob: 0.1 });
  if (st >= 1) R.circle(x0 + 14, ty, 2.0, { ink: 'B', w: 0.6, fi: 'P', ft: 0.9 });   // the protein attached to tropomyosin that Ca2+ binds
  // myosin thick filament
  R.rect(x0 + 2, by, fw - 4, 7, { ink: 'B', w: 0.9, fi: 'T', ft: 0.75, wob: 0.1 });
  // head
  const px = bx, py = st === 3 ? 70 : 66, phi = [-45, -60, -110, -105, -45][st];
  R.line(px, by, px, py, { ink: 'B', w: 1.4, taper: 'none', wob: 0.1 });
  const hx = px + Math.cos(rad(phi)) * 10, hy = py + Math.sin(rad(phi)) * 10;
  R.ellipse(hx, hy, 10, 4.2, { ink: 'B', w: 1.0, fi: 'P', ft: 0.6, rot: phi, wob: 0.1 });
  R.circle(px, py, 1.5, { ink: 'B', w: 0.6, fi: 'B', ft: 0.8 });
  if (st === 3) tok(R, hx + 12, hy + 7, 'ATP', { r: 5.2, fi: 'Y', ft: 0.9, size: 3.6 });
  if (st === 1) { tok(R, x0 + 14, 28, 'Ca^{2+}', { r: 5.6, fi: 'P', ft: 0.45, size: 3.4 }); R.arrow([x0 + 14, 34, x0 + 14, ty - 3.6], { ink: 'B', w: 0.6, hs: 1.8 }); }
  if (st === 2) R.arrow([x0 + 70, ay - 8, x0 + 52, ay - 8], { ink: 'P', w: 1.2, hs: 2.8 });
  if (st === 4) R.arrow([hx + 7, hy - 3, x0 + 49, ay + 8], { ink: 'B', w: 0.8, hs: 2 });
  if (st === 0) R.text('Ca^{2+} absent', x0 + fw / 2, 31, 3.3, { al: 'c' });
}

/* ---------- 3.6.3c Actinomyosin cycle; ATP and phosphocreatine; slow and fast fibres ---------- */
S({
  id: '3.6.3c', num: '3.6.3', sub: 'Cross-bridge cycle, ATP and phosphocreatine, slow and fast fibres', title: 'Skeletal muscles', topic: '3.6', slot: [2, 6], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.3.s3', '3.6.3.s4', '3.6.3.s5', '3.6.3.s6'],
  card: {
    text: 'In resting muscle <b>tropomyosin</b> blocks the myosin-binding sites on <b>actin</b>. When an action potential reaches the muscle, <b>calcium ions</b> are released into the sarcoplasm; they bind to a protein on tropomyosin, which moves and exposes the binding sites. A <b>myosin head</b> binds to actin forming an <b>actinomyosin bridge</b>, then bends (<b>power stroke</b>), pulling the actin filament along. <b>ATP</b> binds to the head so it detaches; ATP hydrolysis (by ATPase, activated by Ca²⁺) provides energy to return the head to its original position so it can bind further along. The cycle repeats while Ca²⁺ is present; Ca²⁺ is actively transported back into the sarcoplasmic reticulum using ATP. <b>Phosphocreatine</b> stores a phosphate that can rapidly regenerate ATP from ADP, anaerobically and without lactate, but only for a few seconds. <b>Slow</b> fibres (posture, endurance) are rich in mitochondria, capillaries and myoglobin; <b>fast</b> fibres (sprinting, power) have few mitochondria and capillaries, little myoglobin, and stores of glycogen and phosphocreatine; they fatigue quickly.',
    terms: ['actinomyosin bridge', 'tropomyosin', 'calcium ions', 'ATP', 'phosphocreatine', 'power stroke', 'sarcoplasmic reticulum', 'slow fibre', 'fast fibre', 'myoglobin'],
    skill: 'AT h: investigate muscle fatigue (repeated contractions)', eq: MATH(mt('ADP + phosphocreatine '), mo('→'), mt(' ATP + creatine')),
    q: 'Why do muscles stay relaxed when calcium ion concentration in the sarcoplasm is low?', a: 'Tropomyosin covers the myosin-binding sites on actin, so myosin heads cannot attach and no actinomyosin bridges form.'
  },
  draw(R, sc) {
    const names = ['resting', 'cross bridge forms', 'power stroke', 'ATP: head detaches', 're-cocked, rebinds'];
    const caps = [
      ['tropomyosin blocks the', 'binding sites on actin'],
      ['Ca^{2+} binds a protein on', 'tropomyosin; sites exposed;', 'head (ADP + P_i) binds'],
      ['head bends, pulling actin', 'towards the sarcomere', 'centre; ADP + P_i released'],
      ['new ATP binds the head;', 'the cross bridge breaks'],
      ['ATP hydrolysed: energy', 'returns head to start;', 'it binds further along'],
    ];
    for (let i = 0; i < 5; i++) {
      const x0 = 8 + i * 86;
      R.text(names[i], x0 + 39, 14, 3.6, { al: 'c', ink: i === 2 ? 'P' : 'B' });
      crossFrame(R, x0, i);
      caps[i].forEach((t, j) => R.text(t, x0 + 39, 112 + j * 5.2, 3.3, { al: 'c' }));
      if (i < 4) R.arrow([x0 + 79, 62, x0 + 85, 62], { ink: 'B', w: 0.8, hs: 2 });
    }
    R.text('actin', 12, 39, 3.4, { al: 'l', ink: 'P' });
    R.text('cycle repeats while Ca^{2+} is present', 220, 132, 3.7, { al: 'c', ink: 'P' });
    // where the calcium comes from
    const boxes = [['action potential', 'depolarises the', 'sarcolemma'], ['spreads down', 'T-tubules to the', 'sarcoplasmic reticulum'], ['SR releases', 'Ca^{2+} into the', 'sarcoplasm'], ['Ca^{2+} present:', 'bridges keep', 'cycling, muscle shortens'], ['stimulation stops:', 'Ca^{2+} pumped into SR', '(active transport, ATP)']];
    boxes.forEach((b, i) => { const x0 = 8 + i * 86; R.rrect(x0, 138, 78, 28, 4, { ink: 'B', w: 0.8, fi: i === 2 ? 'P' : i === 4 ? 'T' : 'Y', ft: 0.12, wob: 0.3 }); b.forEach((t, j) => R.text(t, x0 + 39, 146 + j * 6.2, 3.3, { al: 'c' })); if (i < 4) R.arrow([x0 + 79, 152, x0 + 85, 152], { ink: 'B', w: 0.8, hs: 2 }); });
    // ATP and phosphocreatine
    R.rrect(8, 174, 206, 60, 5, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.12, wob: 0.3 });
    tok(R, 22, 188, 'ATP', { r: 6, fi: 'Y', ft: 0.9, size: 4 });
    R.text('ATP is needed to:', 34, 190, 4.2, { al: 'l' });
    ['bend the head (power stroke)', 'detach the head from actin', 'pump Ca^{2+} back into the SR'].forEach((t, i) => { R.dot(18, 200.5 + i * 10, 0.9, { ink: 'P' }); R.text(t, 23, 202 + i * 10, 4, { al: 'l' }); });
    R.rrect(222, 174, 208, 60, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.1, wob: 0.3 });
    R.text('phosphocreatine (PCr)', 326, 186, 4.4, { al: 'c', ink: 'P' });
    R.text('ADP + PCr  →  ATP + Cr', 326, 199, 4.8, { al: 'c' });
    ['store in muscle: regenerates ATP very quickly', 'anaerobic, no lactate', 'runs out after a few seconds'].forEach((t, i) => R.text(t, 326, 210.5 + i * 7.2, 3.7, { al: 'c' }));
    // slow versus fast fibres
    R.line(436, 12, 436, 236, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('slow and fast skeletal muscle fibres', 548, 14, 4.4, { al: 'c' });
    R.table(444, 20, [48, 84, 76], 12.6, [['', 'slow', 'fast'], ['speed', 'contract slowly', 'contract quickly'], ['fatigue', 'slowly', 'quickly'], ['use', 'endurance, posture', 'short bursts, power'], ['ATP from', 'aerobic respiration', 'glycolysis, PCr'], ['mitochondria', 'many', 'few'], ['capillaries', 'many', 'few'], ['myoglobin', 'lots (red)', 'little (pale)'], ['found in', 'back, calves', 'legs, arms, eyes']], { size: 3.5, hink: 'Y' });
    // fibre drawings
    const fibre = (x, y, slow) => {
      R.rrect(x, y, 92, 30, 9, { ink: 'B', w: 1.1, fi: 'P', ft: slow ? 0.38 : 0.06, wob: 0.3 });
      const n = slow ? 9 : 2;
      for (let k = 0; k < n; k++) { const mx = x + 10 + (slow ? k * 9 : 20 + k * 40), my = (k % 2 ? y + 7 : y + 23); R.ellipse(mx, my, 3.6, 2.2, { ink: 'B', w: 0.6, fi: 'T', ft: 0.7, wob: 0.1 }); }
      if (!slow) R.scatter(x + 46, y + 15, 34, 6, 18, 0.5, { ink: 'B', t: 0.7 });
      if (slow) { R.circle(x + 22, y + 36, 3.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.circle(x + 66, y + 36, 3.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); }
    };
    R.text('slow twitch fibre', 492, 144, 3.8, { al: 'c' }); R.text('fast twitch fibre', 598, 144, 3.8, { al: 'c' });
    fibre(446, 150, true); fibre(552, 150, false);
    R.ellipse(458, 212, 3.6, 2.2, { ink: 'B', w: 0.6, fi: 'T', ft: 0.7 }); R.text('mitochondrion', 464, 213.5, 3.5, { al: 'l' });
    R.circle(536, 212, 3.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.text('capillary', 542, 213.5, 3.5, { al: 'l' });
    R.scatter(594, 212, 5, 3, 8, 0.5, { ink: 'B', t: 0.7 }); R.text('glycogen', 602, 213.5, 3.5, { al: 'l' });
    R.text('slow: red, aerobic, endurance. fast: pale, stores for short bursts', 548, 228, 3.5, { al: 'c' });
  },
  anim(A, sc) {
    const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.ion(94 + 40 + i * 13, 24 + u * 9, 'Ca^{2+}', 'P', 2.9, i); }
    A.atp(22, 188 + Math.sin(p * TAU) * 1.2, 5.2, 7);
  },
});
