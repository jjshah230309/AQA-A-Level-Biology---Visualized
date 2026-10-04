/* ===================== 3.6.1.3 Control of heart rate ===================== */
S({
  id: '3.6.1.3', num: '3.6.1.3', sub: 'Control of heart rate: SAN, AVN, Purkyne tissue; chemoreceptors and pressure receptors', title: 'Control of heart rate', topic: '3.6', slot: [3, 1], dna: 'mark', ao: 2,
  covers: ['3.6.1.3.s1', '3.6.1.3.s2', '3.6.1.3.s3'],
  card: {
    text: 'Heart muscle is <b>myogenic</b>: it contracts and relaxes without nervous stimulation. The <b>sinoatrial node (SAN)</b> in the right atrial wall initiates a wave of electrical activity across the atria, making them contract. A band of fibres prevents it passing straight to the ventricles; instead the <b>atrioventricular node (AVN)</b> delays it, then it passes down the <b>bundle of His</b> and along <b>Purkyne tissue</b> in the septum, so the ventricles contract from the apex upwards. <b>Chemoreceptors</b> (aortic and carotid bodies) detect pH/CO₂ and <b>pressure receptors</b> (aortic arch, carotid sinus) detect blood pressure; the medulla’s cardiac centre changes heart rate via the <b>autonomic nervous system</b> (sympathetic raises, parasympathetic lowers) acting on the SAN (effector).',
    terms: ['myogenic', 'sinoatrial node', 'atrioventricular node', 'bundle of His', 'Purkyne tissue', 'chemoreceptor', 'pressure receptor', 'autonomic nervous system', 'sympathetic', 'parasympathetic'],
    skill: 'MS 2.2: cardiac output = heart rate × stroke volume', eq: MATH(mt('CO '), mo('='), mt('stroke volume'), mo('×'), mt('heart rate')),
    eqn: '70 cm³ × 75 beats min⁻¹ = 5250 cm³ min⁻¹',
    q: 'Why is there a delay between atrial and ventricular contraction?', a: 'The AVN delays the wave of excitation so the atria empty completely before the ventricles contract.'
  },
  draw(R, sc) {
    R.text('electrical control of the heart', 160, 14, 4.8, { al: 'c' });
    // heart outline with SAN, AVN, bundle of His, Purkyne tissue
    const outer = [74, 40, 130, 34, 168, 44, 178, 90, 172, 130, 150, 162, 120, 176, 94, 160, 78, 120, 68, 76];
    R.fill(outer, { ink: 'P', t: 0.12, smooth: true, wob: 0.4 }); R.poly(outer, { ink: 'B', w: 1.6, smooth: true, wob: 0.5 });
    R.line(72, 82, 176, 82, { ink: 'B', w: 1.2, taper: 'none', t: 0.8 }); R.text('atria', 150, 66, 3.8, { al: 'c' }); R.text('ventricles', 150, 104, 3.8, { al: 'c' });
    R.line(122, 82, 122, 164, { ink: 'B', w: 2, taper: 'none' });
    R.circle(88, 48, 5, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.8 }); R.text('SAN', 88, 36, 3.8, { al: 'c', ink: 'P' });
    R.circle(120, 86, 4.6, { ink: 'B', w: 1.1, fi: 'P', ft: 0.8 }); R.text('AVN', 98, 94, 3.8, { al: 'r', ink: 'P' });
    R.stroke([120, 88, 122, 120], { ink: 'T', w: 2.4, taper: 'none' }); R.text('bundle of His', 100, 112, 3.6, { al: 'r' });
    [[122, 120, 90, 150], [122, 120, 156, 146]].forEach(([a, b, c, d]) => R.arrow([a, b, c, d], { ink: 'T', w: 1.6, hs: 3, smooth: true })); R.text('Purkyne tissue', 150, 150, 3.6, { al: 'l', ink: 'T' });
    // waves: atria then ventricles
    R.stroke([90, 54, 100, 64, 110, 74], { ink: 'Y', w: 2, smooth: true, taper: 'end', t: 0.9 }); R.stroke([158, 60, 140, 66, 130, 72], { ink: 'Y', w: 2, smooth: true, taper: 'end', t: 0.9 });
    // numbers
    R.bubble(76, 36, 3.8, '1'); R.bubble(104, 72, 3.8, '2'); R.bubble(108, 92, 3.8, '3'); R.bubble(98, 140, 3.8, '4');
    ['1 SAN starts a wave across the atria', '2 atria contract', '3 AVN delays, then bundle of His', '4 Purkyne tissue: ventricles contract'].forEach((t, i) => R.text(t, 196, 36 + i * 11, 3.8, { al: 'l' }));
    R.text('heart muscle is myogenic', 252, 90, 4, { al: 'c', ink: 'P' });
    R.text('(it contracts without a nerve impulse)', 252, 97, 3.4, { al: 'c' });
    R.line(8, 184, 312, 184, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // control loop
    R.text('detect → coordinate → act', 160, 196, 4.4, { al: 'c' });
    const bx = [[14, 'chemoreceptors', 'pH / CO_2 (aortic and carotid bodies)'], [112, 'pressure receptors', '(aortic arch, carotid sinus)']];
    R.rrect(14, 202, 76, 26, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.2, wob: 0.15 }); R.text('chemoreceptors', 52, 212, 3.7, { al: 'c' }); R.text('(pH, CO_2)', 52, 220, 3.4, { al: 'c' });
    R.rrect(96, 202, 76, 26, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.2, wob: 0.15 }); R.text('pressure receptors', 134, 212, 3.7, { al: 'c' }); R.text('(blood pressure)', 134, 220, 3.4, { al: 'c' });
    R.arrow([172, 215, 190, 215], { ink: 'B', w: 1, hs: 2.4 }); R.rrect(192, 202, 58, 26, 6, { ink: 'B', w: 1, fi: 'T', ft: 0.25, wob: 0.15 }); R.text('medulla', 221, 212, 3.8, { al: 'c' }); R.text('(cardiac centre)', 221, 220, 3.3, { al: 'c' });
    R.arrow([250, 215, 266, 215], { ink: 'B', w: 1, hs: 2.4 }); R.rrect(268, 202, 44, 26, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.25, wob: 0.15 }); R.text('SAN', 290, 212, 3.8, { al: 'c' }); R.text('(effector)', 290, 220, 3.3, { al: 'c' });
    R.text('sympathetic raises heart rate; parasympathetic lowers it', 160, 237, 3.7, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(2); const a1 = p < 0.3 ? p / 0.3 : 1; A.dot(88 + a1 * 30, 50 + a1 * 24, 2.4, 'Y', p < 0.4 ? 0.95 : 0, 1); if (p > 0.4) { const q = (p - 0.4) / 0.6; A.dot(121, 88 + q * 30, 2.4, 'Y', 0.95, 2); A.dot(121 - q * 30, 120 + q * 26, 2.2, 'Y', 0.9, 3); A.dot(121 + q * 34, 120 + q * 24, 2.2, 'Y', 0.9, 4); } },
});

/* ===================== 3.6.2 Nervous coordination ===================== */
/* ---------- 3.6.2.1a Myelinated motor neurone and the resting potential ---------- */
S({
  id: '3.6.2.1a', num: '3.6.2.1', sub: 'Structure of a myelinated motor neurone; the resting potential', title: 'Nerve impulses', topic: '3.6', slot: [0, 3], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.2.1.s1', '3.6.2.1.s2'],
  card: {
    text: 'A <b>myelinated motor neurone</b> has a cell body (with nucleus), dendrites, a long <b>axon</b> insulated by a <b>myelin sheath</b> made by Schwann cells, with gaps called <b>nodes of Ranvier</b>, and axon terminals. The <b>resting potential</b> (about −70 mV inside relative to outside) is established by differential membrane permeability and electrochemical gradients: the <b>sodium–potassium pump</b> actively transports 3 Na⁺ out and 2 K⁺ in; the membrane is far more permeable to K⁺ (open K⁺ channels, so K⁺ diffuses out) than to Na⁺ (Na⁺ channels closed), so the inside is negative.',
    terms: ['motor neurone', 'axon', 'myelin sheath', 'Schwann cell', 'node of Ranvier', 'resting potential', 'sodium–potassium pump', 'differential permeability', 'electrochemical gradient'],
    skill: 'Describe the maintenance of −70 mV', eq: null,
    q: 'Explain how the resting potential is established.', a: 'The Na⁺/K⁺ pump moves 3 Na⁺ out and 2 K⁺ in; K⁺ diffuses out through open channels while the membrane is largely impermeable to Na⁺, leaving the inside more negative (about −70 mV).'
  },
  draw(R, sc) {
    R.text('myelinated motor neurone', 332, 14, 5, { al: 'c' });
    neurone(R, 40, 60, 520, { myel: true, n: 8, r: 13, aw: 1.8 });
    leader(R, 'cell body (nucleus)', 40, 60, 44, 108, { size: 4, al: 'c' }); leader(R, 'dendrites', 14, 48, 26, 26, { size: 4, al: 'c' });
    leader(R, 'axon', 106, 60, 112, 30, { size: 4, al: 'c' }); leader(R, 'myelin sheath', 190, 55, 210, 30, { size: 4, al: 'c' }); leader(R, 'node of Ranvier', 262, 60, 298, 100, { size: 4, al: 'c' });
    leader(R, 'axon terminals', 574, 60, 540, 100, { size: 4, al: 'c' });
    R.text('Schwann cell wrapped round the axon', 410, 26, 4, { al: 'c' }); R.line(410, 29, 380, 52, { ink: 'B', w: 0.5, taper: 'end', t: 0.8 });
    R.line(8, 118, 656, 118, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // membrane at rest (full width)
    const ym = 168;
    R.fill([8, 128, 656, 128, 656, ym - 8, 8, ym - 8], { ink: 'T', t: 0.07, wob: 0.3 }); R.fill([8, ym + 8, 656, ym + 8, 656, 228, 8, 228], { ink: 'P', t: 0.07, wob: 0.3 });
    R.text('outside the axon: more positive', 14, 140, 4, { al: 'l' }); R.text('inside the axon: about −70 mV', 648, 140 + 90, 4, { al: 'r', ink: 'P' });
    R.bilayer([8, ym, 656, ym], { gap: 7, hr: 2.2, sp: 5.2, tail: 3.6 });
    const bl = (x, w) => R.knock([x - w / 2, ym - 12, x + w / 2, ym - 12, x + w / 2, ym + 12, x - w / 2, ym + 12]);
    // sodium-potassium pump
    bl(120, 34); R.rrect(106, ym - 11, 28, 22, 3, { ink: 'B', w: 1, fi: 'P', ft: 0.8 }); R.text('pump', 120, ym + 2.4, 3.6, { al: 'c' });
    R.arrow([114, ym + 10, 114, ym - 40], { ink: 'P', w: 1.4, hs: 3 }); R.text('3 Na^+ out', 124, ym - 40, 3.9, { al: 'l', ink: 'P' });
    R.arrow([126, ym - 10, 126, ym + 40], { ink: 'P', w: 1.4, hs: 3 }); R.text('2 K^+ in', 134, ym + 40, 3.9, { al: 'l', ink: 'P' });
    R.circle(88, ym + 30, 6, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('ATP', 88, ym + 31.6, 4.6, { al: 'c' });
    R.text('sodium–potassium pump:', 120, ym + 52, 3.9, { al: 'c' }); R.text('active transport', 120, ym + 58, 3.9, { al: 'c' });
    // K+ channel open (K+ out)
    bl(332, 30); R.rrect(320, ym - 11, 9, 22, 2, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 }); R.rrect(336, ym - 11, 9, 22, 2, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 }); R.arrow([332, ym + 30, 332, ym - 38], { ink: 'P', w: 1.6, hs: 3.4 });
    R.text('K^+ channels open:', 332, ym + 46, 3.9, { al: 'c' }); R.text('K^+ diffuses out', 332, ym + 53, 3.9, { al: 'c', ink: 'P' });
    // Na+ channel closed
    bl(520, 30); R.rrect(508, ym - 11, 24, 22, 3, { ink: 'B', w: 1, fi: 'T', ft: 0.8 }); cross(R, 520, ym - 26, 3.4); R.text('Na^+', 520, ym - 38, 3.9, { al: 'c', ink: 'P' });
    R.text('Na^+ channels closed:', 520, ym + 46, 3.9, { al: 'c' }); R.text('very little Na^+ enters', 520, ym + 53, 3.9, { al: 'c' });
    R.text('membrane much more permeable to K^+ than to Na^+: inside negative', 332, 237, 4, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(4); A.ion(332, 202 - p * 56, 'K^+', 'P', 3.2, 1); A.ion(114, 162 - p * 36, 'Na^+', 'T', 3.2, 2); A.ion(126, 172 + p * 26, 'K^+', 'P', 3.2, 3); },
});

/* ---------- 3.6.2.1b The action potential ---------- */
S({
  id: '3.6.2.1b', num: '3.6.2.1', sub: 'Depolarisation, repolarisation and hyperpolarisation: the action potential and the all-or-nothing principle', title: 'Nerve impulses', topic: '3.6', slot: [2, 3], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.6.2.1.s3', '3.6.2.1.s4'],
  card: {
    text: 'A stimulus that raises the membrane potential to the <b>threshold</b> (about −55 mV) opens <b>voltage-gated sodium ion channels</b>: Na⁺ floods in, causing <b>depolarisation</b> (the inside becomes positive, about +40 mV) — positive feedback. Then the Na⁺ channels close and <b>voltage-gated potassium ion channels</b> open: K⁺ leaves, causing <b>repolarisation</b>. K⁺ channels are slow to close, so the potential overshoots below the resting potential (<b>hyperpolarisation</b>) before the sodium–potassium pump and leak channels restore −70 mV. The <b>all-or-nothing principle</b>: a stimulus below threshold produces no action potential; above threshold all action potentials are the same size — a stronger stimulus increases frequency, not size.',
    terms: ['action potential', 'threshold', 'depolarisation', 'repolarisation', 'hyperpolarisation', 'voltage-gated sodium channel', 'voltage-gated potassium channel', 'all-or-nothing principle', 'resting potential'],
    skill: 'MS 1.3: interpret an action potential trace', eq: null,
    q: 'What does the all-or-nothing principle mean?', a: 'Either the threshold is reached and a full-size action potential results, or it is not reached and there is none; the size does not vary with stimulus strength, only the frequency.'
  },
  draw(R, sc) {
    R.text('one action potential', 200, 14, 5, { al: 'c' });
    const g = R.graph(46, 30, 360, 160, { xmin: 0, xmax: 6, ymin: -90, ymax: 50, xl: 'time / ms', yl: 'membrane potential / mV', xt: [[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6']], yt: [[-70, '-70'], [-55, '-55'], [0, '0'], [40, '+40']], fs: 3.8, xly: 12, ylx: 16 }).axes();
    g.hline(-70, { ink: 'B', w: 0.6, t: 0.6 }); g.hline(-55, { ink: 'P', w: 0.8, dash: true });
    const ap = [0, -70, 0.45, -70, 0.7, -66, 0.9, -55, 1.05, -25, 1.2, 20, 1.35, 38, 1.5, 30, 1.7, -5, 1.95, -50, 2.2, -78, 2.55, -84, 3, -80, 3.6, -74, 4.2, -71, 5, -70, 6, -70];
    g.curve(ap, { ink: 'T', w: 1.8 });
    // stimulus mark
    R.arrow([g.X(0.55), g.Y(46), g.X(0.55), g.Y(-62)], { ink: 'B', w: 1, hs: 2.6 }); R.text('stimulus', g.X(0.55), g.Y(46) - 5, 3.8, { al: 'c' });
    // failed initial
    g.curve([0.2, -70, 0.3, -64, 0.4, -70], { ink: 'B', w: 1, t: 0.8 });
    R.text('threshold ≈ −55 mV', g.X(5.95), g.Y(-55) - 4, 3.8, { al: 'r', ink: 'P' });
    leader(R, 'depolarisation: Na^+ in', g.X(1.14), g.Y(2), g.X(2.0), g.Y(42), { size: 3.8, al: 'l' });
    leader(R, 'repolarisation: K^+ out', g.X(1.8), g.Y(-28), g.X(2.6), g.Y(10), { size: 3.8, al: 'l' });
    leader(R, 'hyperpolarisation', g.X(2.6), g.Y(-84), g.X(3.4), g.Y(-52), { size: 3.8, al: 'l' });
    R.text('resting potential ≈ −70 mV', g.X(5.95), g.Y(-80), 3.8, { al: 'r' });
    // phases below
    R.line(422, 22, 422, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('channels during the action potential', 540, 28, 4.4, { al: 'c' });
    const ph = [['1 stimulus reaches threshold', 'Na^+ channels open'], ['2 Na^+ rush in: depolarisation', 'positive feedback'], ['3 Na^+ close, K^+ open', 'K^+ leave: repolarisation'], ['4 K^+ close slowly', 'hyperpolarisation, then −70 mV']];
    ph.forEach(([a, b], i) => { const y = 44 + i * 36; R.rrect(432, y, 216, 30, 6, { ink: 'B', w: 1, fi: ['Y', 'T', 'P', 'TY'][i], ft: 0.1, wob: 0.15 }); R.text(a, 540, y + 12, 4, { al: 'c' }); R.text(b, 540, y + 23, 3.8, { al: 'c' }); });
    R.line(8, 202, 416, 202, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('all-or-nothing: below threshold no action potential; above it, always the same size.', 212, 214, 3.9, { al: 'c' });
    R.text('a stronger stimulus raises the frequency of impulses, not their size', 212, 224, 3.9, { al: 'c', ink: 'P' });
    R.text('(values approximate)', 212, 233, 3.3, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); const t = p * 6; const ap = [0, -70, 0.45, -70, 0.7, -66, 0.9, -55, 1.05, -25, 1.2, 20, 1.35, 38, 1.5, 30, 1.7, -5, 1.95, -50, 2.2, -78, 2.55, -84, 3, -80, 3.6, -74, 4.2, -71, 5, -70, 6, -70]; let v = -70; for (let i = 0; i < ap.length - 2; i += 2) if (t >= ap[i] && t <= ap[i + 2]) v = ap[i + 1] + (ap[i + 3] - ap[i + 1]) * (t - ap[i]) / (ap[i + 2] - ap[i]); A.dot(46 + t / 6 * 360, 30 + 160 - (v + 90) / 140 * 160, 2.6, 'P', 0.95, 1); },
});

/* ---------- 3.6.2.1c Local circuits, saltatory conduction, speed of conductance, refractory period ---------- */
S({
  id: '3.6.2.1c', num: '3.6.2.1', sub: 'Passage of an action potential; saltatory conduction; refractory period; factors affecting speed', title: 'Nerve impulses', topic: '3.6', slot: [0, 4], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.6.2.1.s5', '3.6.2.1.s6', '3.6.2.1.s7'],
  card: {
    text: 'In a <b>non-myelinated</b> axon, depolarisation at one point causes <b>local circuits</b>: Na⁺ diffuse sideways inside the axon, depolarising the next region to threshold, so the action potential travels as a wave. In a <b>myelinated</b> axon the myelin is an electrical insulator, so depolarisation occurs only at the <b>nodes of Ranvier</b> and the impulse “jumps” from node to node: <b>saltatory conduction</b>, which is much faster. The <b>refractory period</b> (when voltage-gated Na⁺ channels are inactive and the membrane cannot be stimulated) ensures impulses are <b>discrete</b>, travel in one direction and limits the <b>frequency</b> of impulses (maximum frequency = 1 ÷ refractory period). Speed is greater with <b>myelination</b>, a larger <b>axon diameter</b> and a higher <b>temperature</b> (up to a point).',
    terms: ['local circuit', 'non-myelinated axon', 'myelinated axon', 'node of Ranvier', 'saltatory conduction', 'refractory period', 'discrete impulses', 'axon diameter', 'temperature', 'speed of conductance'],
    skill: 'MS 0.2: maximum frequency = 1 ÷ refractory period', eq: MATH(mt('maximum frequency '), mo('='), mfrac(mn('1'), mt('refractory period'))),
    eqn: 'refractory period 4 ms = 0.004 s → 1 ÷ 0.004 = 250 impulses per second',
    q: 'Explain why a myelinated neurone conducts impulses faster than a non-myelinated one.', a: 'Myelin insulates the axon, so depolarisation occurs only at nodes of Ranvier and the impulse jumps between them (saltatory conduction) instead of travelling along the whole membrane.'
  },
  draw(R, sc) {
    // non-myelinated
    R.text('non-myelinated axon: local circuits', 200, 14, 4.8, { al: 'c' });
    R.rrect(14, 34, 400, 36, 14, { ink: 'B', w: 1.2, fi: 'T', ft: 0.08, wob: 0.3 });
    for (let i = 0; i < 18; i++) { const x = 34 + i * 21.4, dep = x > 150 && x < 258; R.text(dep ? '+' : '−', x, 62, 7.5, { al: 'c', ink: dep ? 'P' : 'B', w: 1.2 }); R.text(dep ? '−' : '+', x, 30, 7.5, { al: 'c', ink: dep ? 'B' : 'P', w: 1.2 }); }
    R.arrow([150, 49, 76, 49], { ink: 'P', w: 1.3, hs: 3.4 }); R.arrow([258, 49, 338, 49], { ink: 'P', w: 1.3, hs: 3.4 });
    R.text('local circuits', 112, 44, 3.5, { al: 'c', ink: 'P' }); R.text('local circuits', 300, 44, 3.5, { al: 'c', ink: 'P' });
    R.text('Na^+ diffuse sideways inside the axon', 204, 82, 3.9, { al: 'c' }); R.text('depolarised region', 204, 90, 3.9, { al: 'c', ink: 'P' });
    R.arrow([356, 90, 396, 90], { ink: 'B', w: 1.2, hs: 3 }); R.text('impulse travels', 346, 93, 3.6, { al: 'r' });
    R.line(8, 100, 422, 100, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // myelinated
    R.text('myelinated axon: saltatory conduction', 200, 112, 4.8, { al: 'c' });
    R.line(14, 150, 410, 150, { ink: 'B', w: 4.4, t: 0.5, taper: 'none' });
    [[40, 86], [140, 86], [240, 86], [340, 76]].forEach(([x, w], i) => { R.knock(R.rrectPts(x, 138, w, 24, 8)); R.rrect(x, 138, w, 24, 8, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.5, wob: 0.15 }); });
    [126, 226, 326].forEach(x => R.text('node', x, 178, 3.5, { al: 'c' }));
    [[126, 'P'], [226, 'P'], [326, 'P']].forEach(([x], i) => R.circle(x, 150, 6 + 0, { ink: 'P', w: 1.2, wob: 0.1, st: 0.8 }));
    [[134, 214], [234, 314]].forEach(([a, b]) => R.arrow([a, 130, b, 130], { ink: 'P', w: 1.3, hs: 3, smooth: false }));
    R.text('myelin: electrical insulator', 100, 128, 3.7, { al: 'c' }); R.text('the impulse jumps from node to node', 260, 122, 3.9, { al: 'c', ink: 'P' });
    R.text('depolarisation only at the nodes of Ranvier → much faster', 200, 196, 4, { al: 'c' });
    R.line(8, 206, 422, 206, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('refractory period: Na^+ channels cannot reopen → impulses are discrete,', 200, 218, 3.9, { al: 'c' }); R.text('one-directional, with a maximum frequency = 1 ÷ refractory period', 200, 226, 3.9, { al: 'c', ink: 'P' });
    R.line(436, 22, 436, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // speed factors
    R.text('factors that affect speed', 548, 28, 4.6, { al: 'c' });
    // myelination chart bars
    R.text('myelination', 480, 50, 4, { al: 'c' }); R.rect(466, 56, 30, 8, { ink: 'B', w: 0.9, fi: 'T', ft: 0.4 }); R.text('no myelin ~ 1 m/s', 534, 62, 3.6, { al: 'l' }); R.rect(466, 70, 74 * 0.9, 8, { ink: 'B', w: 0.9, fi: 'P', ft: 0.5 }); R.text('myelin ~ 100 m/s', 536, 76, 3.6, { al: 'l' });
    R.text('axon diameter', 480, 100, 4, { al: 'c' }); R.circle(474, 114, 5, { ink: 'B', w: 1, fi: 'Y', ft: 0.5 }); R.circle(504, 114, 12, { ink: 'B', w: 1, fi: 'Y', ft: 0.5 }); R.text('wider axon: less resistance, faster', 586, 116, 3.7, { al: 'c' });
    R.text('temperature', 480, 148, 4, { al: 'c' }); R.thermometer(470, 156, 24, { level: 0.35 }); R.thermometer(498, 156, 24, { level: 0.75 }); R.text('warmer: faster (ions diffuse faster,', 590, 164, 3.7, { al: 'c' }); R.text('enzymes work faster) until denaturing', 590, 171, 3.7, { al: 'c' });
    R.text('speed of conductance depends on myelination,', 548, 204, 3.8, { al: 'c', ink: 'P' }); R.text('axon diameter and temperature', 548, 211, 3.8, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(4); A.ring(24 + p * 360, 45, 6, 'P', 1.1, 0.9); const nodes = [126, 226, 326]; const k = Math.min(2, Math.floor(p * 3)); A.ring(nodes[k], 150, 5 + ((p * 3) % 1) * 4, 'P', 1.1, 1 - ((p * 3) % 1) * 0.5); },
});
