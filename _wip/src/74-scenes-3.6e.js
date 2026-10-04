/* ===================== 3.6.2.2 Synaptic transmission ===================== */
/* ACh molecule token and receptor helpers */
function achTok(R, x, y, s = 1) { R.circle(x, y, 2.2 * s, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.9 }); }
function synVesicle(R, x, y, r, n) { R.circle(x, y, r, { ink: 'B', w: 0.9, fi: 'P', ft: 0.2 }); for (let i = 0; i < n; i++) achTok(R, x + Math.cos(i * 2.4) * r * 0.45, y + Math.sin(i * 2.4) * r * 0.45, 0.8); }

/* ---------- 3.6.2.2a Cholinergic synapse ---------- */
S({
  id: '3.6.2.2a', num: '3.6.2.2', sub: 'Transmission across a cholinergic synapse: sequence of events and unidirectionality', title: 'Synaptic transmission', topic: '3.6', slot: [2, 4], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.2.2.s1', '3.6.2.2.s2', '3.6.2.2.s3'],
  card: {
    text: 'Sequence at a <b>cholinergic synapse</b>: (1) an action potential arrives at the <b>presynaptic knob</b>; (2) <b>voltage-gated calcium ion channels</b> open and Ca²⁺ ions diffuse in; (3) Ca²⁺ causes <b>synaptic vesicles</b> to fuse with the presynaptic membrane and release <b>acetylcholine (ACh)</b> by exocytosis; (4) ACh diffuses across the <b>synaptic cleft</b> and binds to <b>receptors</b> on the postsynaptic membrane; (5) <b>sodium ion channels</b> open, Na⁺ enter and depolarise the membrane; if the <b>threshold</b> is reached an action potential starts; (6) <b>acetylcholinesterase</b> hydrolyses ACh to choline and ethanoate, which are reabsorbed and recycled (using ATP from the many mitochondria). <b>Unidirectional</b>: neurotransmitter is released only from the presynaptic neurone and receptors are only on the postsynaptic membrane.',
    terms: ['cholinergic synapse', 'presynaptic knob', 'voltage-gated calcium ion channel', 'synaptic vesicle', 'acetylcholine', 'synaptic cleft', 'receptor', 'acetylcholinesterase', 'unidirectional', 'postsynaptic membrane'],
    skill: 'Sequence of events', eq: null,
    q: 'Why does a synapse transmit impulses in one direction only?', a: 'Neurotransmitter vesicles and the calcium channels are only in the presynaptic knob, and the receptors are only on the postsynaptic membrane.'
  },
  draw(R, sc) {
    R.text('cholinergic synapse', 332, 14, 5, { al: 'c' });
    // presynaptic knob (top), cleft, postsynaptic membrane (bottom)
    const knob = [120, 40, 160, 28, 360, 28, 400, 40, 410, 70, 396, 100, 360, 108, 160, 108, 128, 100, 112, 70];
    R.fill(knob, { ink: 'P', t: 0.1, smooth: true, wob: 0.4 }); R.poly(knob, { ink: 'B', w: 1.6, smooth: true, wob: 0.5 });
    R.rect(250, 28, 20, 0.01, {}); R.stroke([240, 28, 240, 12], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([280, 28, 280, 12], { ink: 'B', w: 1.6, taper: 'none' });
    R.text('action potential arrives', 160, 20, 3.9, { al: 'c', ink: 'P' }); R.arrow([196, 24, 238, 26], { ink: 'P', w: 1, hs: 2.6 });
    R.mito(160, 58, 34, 18, 20, { plain: true }); R.mito(364, 56, 34, 18, -15, { plain: true });
    R.text('mitochondria (ATP)', 160, 86, 3.6, { al: 'c' });
    // Ca channels on presynaptic membrane (bottom of knob y~105)
    [200, 300].forEach(x => { R.rrect(x - 7, 100, 14, 12, 2, { ink: 'B', w: 1, fi: 'T', ft: 0.8 }); });
    [190, 224, 288, 312].forEach((x, i) => R.text('Ca^{2+}', x, i % 2 ? 92 : 126, 3.6, { al: 'c', ink: 'P' }));
    // vesicles
    synVesicle(R, 228, 62, 10, 4); synVesicle(R, 266, 78, 10, 4); synVesicle(R, 306, 60, 10, 4); synVesicle(R, 334, 86, 9, 4);
    // a vesicle fusing at the membrane and releasing
    R.arrow([312, 80, 306, 98], { ink: 'B', w: 0.9, hs: 2.4 }); R.text('vesicle fuses, ACh released', 380, 100, 3.6, { al: 'l' });
    for (let i = 0; i < 9; i++) achTok(R, 252 + (i % 5) * 14, 126 + Math.floor(i / 5) * 14 + (i % 2) * 4, 1);
    R.text('ACh diffuses across', 360, 130, 3.9, { al: 'l' }); R.text('the synaptic cleft', 360, 137, 3.9, { al: 'l' });
    // cleft
    R.fill([120, 108, 400, 108, 400, 168, 120, 168], { ink: 'T', t: 0.06, wob: 0.2 });
    R.text('synaptic cleft', 150, 148, 4, { al: 'l' });
    // postsynaptic membrane with receptors + Na channels, below y=168
    R.stroke([108, 168, 160, 168, 400, 168, 420, 168], { ink: 'B', w: 1.8, taper: 'none' });
    const post = [108, 172, 128, 238, 404, 238, 424, 172]; R.fill(post, { ink: 'P', t: 0.1, wob: 0.3 }); R.poly([108, 172, 108, 236, 424, 236, 424, 172], { ink: 'B', w: 1.2, wob: 0.3 });
    R.text('postsynaptic neurone', 266, 200, 4.2, { al: 'c' });
    [200, 248, 296, 344].forEach((x, i) => { R.knock([x - 10, 164, x + 10, 164, x + 10, 178, x - 10, 178]); R.rrect(x - 9, 164, 18, 12, 2, { ink: 'B', w: 1, fi: i % 2 ? 'T' : 'P', ft: 0.8 }); R.recept(x, 164, -PI / 2, 'tri', { w: 8, h: 4, n: 1.8, d: 2.2, len: 0 }); });
    R.text('Na^+', 248, 190, 3.6, { al: 'c', ink: 'P' }); R.arrow([248, 180, 248, 196], { ink: 'P', w: 1.1, hs: 2.4 });
    R.text('Na^+', 344, 190, 3.6, { al: 'c', ink: 'P' }); R.arrow([344, 180, 344, 196], { ink: 'P', w: 1.1, hs: 2.4 });
    leader(R, 'ACh receptor', 296, 170, 296, 220, { size: 3.9, al: 'c' });
    // acetylcholinesterase
    R.ellipse(380, 154, 6.4, 4.6, { ink: 'B', w: 0.9, fi: 'T', ft: 0.8 }); leader(R, 'acetylcholinesterase', 380, 154, 450, 156, { size: 3.9, al: 'l' });
    R.text('breaks ACh into', 450, 166, 3.5, { al: 'l' }); R.text('choline + ethanoate', 450, 172, 3.5, { al: 'l' });
    // recycle arrow
    R.stroke([404, 148, 436, 138, 440, 100, 412, 76], { ink: 'B', w: 1, smooth: true, taper: 'end' }); R.text('reabsorbed', 424, 126, 3.6, { al: 'l' }); R.text('and recycled', 424, 132, 3.6, { al: 'l' });
    // legend numbers
    [[124, 20, '1'], [186, 96, '2'], [322, 96, '3'], [226, 146, '4'], [270, 178, '5'], [352, 150, '6']].forEach(([x, y, n]) => R.bubble(x, y, 4, n));
    // right: list
    R.line(500, 24, 500, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    ['1 action potential arrives', '2 Ca^{2+} channels open: Ca^{2+} in', '3 vesicles fuse: ACh released', '4 ACh crosses the cleft, binds', '5 Na^+ channels open: depolarisation', '6 acetylcholinesterase removes ACh'].forEach((t, i) => R.text(t, 510, 40 + i * 14, 3.9, { al: 'l', ink: i === 5 ? 'P' : 'B' }));
    R.text('unidirectional:', 580, 140, 4.4, { al: 'c', ink: 'P' }); R.text('vesicles and Ca^{2+} channels only presynaptic;', 580, 150, 3.5, { al: 'c' }); R.text('receptors only postsynaptic', 580, 157, 3.5, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); for (let i = 0; i < 5; i++) { const u = (p + i / 5) % 1; A.dot(252 + (i % 5) * 14 + Math.sin(i) * 3, 112 + u * 56, 1.6, 'Y', 0.95, i); } A.ion(208, 96 + p * 12, 'Ca^{2+}', 'P', 3.6, 9); },
});

/* ---------- 3.6.2.2b Summation, inhibition, neuromuscular junction, drugs ---------- */
S({
  id: '3.6.2.2b', num: '3.6.2.2', sub: 'Summation, inhibitory synapses, the neuromuscular junction and the effect of drugs', title: 'Synaptic transmission', topic: '3.6', slot: [0, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.6.2.2.s4', '3.6.2.2.s5', '3.6.2.2.s6', '3.6.2.2.s7'],
  card: {
    text: '<b>Summation</b>: one impulse may not release enough neurotransmitter to reach threshold. <b>Temporal summation</b>: several impulses in quick succession at one presynaptic neurone release enough ACh to reach threshold. <b>Spatial summation</b>: impulses from several presynaptic neurones together release enough. <b>Inhibition</b>: at an inhibitory synapse the neurotransmitter opens <b>chloride ion channels</b> (Cl⁻ in) and <b>potassium ion channels</b> (K⁺ out), making the postsynaptic membrane more negative (<b>hyperpolarisation</b>) so an action potential is less likely. The <b>neuromuscular junction (NMJ)</b>: between a motor neurone and muscle, always excitatory (ACh), with a folded postsynaptic membrane with more receptors and ACh in a large amount; the response is an action potential in the muscle fibre. <b>Drugs</b> can block receptors, inhibit acetylcholinesterase, or mimic/stimulate neurotransmitter release; students predict and explain their effects from information given.',
    terms: ['temporal summation', 'spatial summation', 'threshold', 'inhibitory synapse', 'chloride ion channel', 'hyperpolarisation', 'neuromuscular junction', 'motor end plate', 'drug', 'receptor'],
    skill: 'Predict effects of a drug', eq: null,
    q: 'Describe how temporal summation can bring a postsynaptic neurone to threshold.', a: 'Several action potentials arrive close together at one presynaptic knob, so enough ACh accumulates in the cleft to open enough Na⁺ channels and reach the threshold.'
  },
  draw(R, sc) {
    // summation traces
    R.text('summation', 100, 14, 4.8, { al: 'c' });
    const gt = (x, y, title, f) => { const g = R.graph(x, y, 116, 58, { xmin: 0, xmax: 10, ymin: -75, ymax: -45, xl: '', yl: 'mV', xt: [], yt: [[-70, '-70'], [-55, '-55']], fs: 3.3, ylx: 3 }).axes(); g.hline(-55, { ink: 'P', w: 0.7, dash: true }); g.curve(f, { ink: 'T', w: 1.5, n: 80 }); R.text(title, x + 58, y - 4, 4, { al: 'c' }); return g; };
    const tail = (t0, a, t) => t < t0 ? 0 : a * Math.exp(-(t - t0) / 1.6);
    const g1 = gt(30, 34, 'one impulse: below threshold', t => -70 + tail(1, 7, t));
    const g2 = gt(30, 112, 'temporal summation: threshold reached', t => -70 + tail(1, 7, t) + tail(2.2, 7, t) + tail(3.4, 7, t) + tail(4.6, 7, t) + tail(5.6, 7, t));
    [1, 2.2, 3.4, 4.6, 5.6].forEach(t => R.arrow([g2.X(t), g2.Y(-47) - 3, g2.X(t), g2.Y(-47) + 8], { ink: 'P', w: 0.8, hs: 2 }));
    R.text('spatial summation: impulses from several neurones add up', 100, 200, 3.9, { al: 'c' });
    [0, 1, 2].forEach(i => { R.circle(40 + i * 0, 212 + i * 8, 3, { ink: 'B', w: 0.8, fi: 'P', ft: 0.6 }); R.line(44, 212 + i * 8, 84, 222, { ink: 'B', w: 0.9, taper: 'none' }); });
    R.circle(92, 222, 7, { ink: 'B', w: 1, fi: 'T', ft: 0.5 }); R.text('postsynaptic', 128, 220, 3.5, { al: 'l' }); R.text('neurone', 128, 226, 3.5, { al: 'l' });
    R.line(184, 22, 184, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // inhibition
    R.text('inhibitory synapse', 258, 14, 4.8, { al: 'c' });
    R.rrect(194, 28, 128, 34, 10, { ink: 'B', w: 1.2, fi: 'P', ft: 0.12, wob: 0.3 }); synVesicle(R, 220, 44, 8, 3); synVesicle(R, 252, 46, 8, 3);
    R.fill([194, 62, 322, 62, 322, 98, 194, 98], { ink: 'T', t: 0.06, wob: 0.2 });
    R.bilayer([194, 98, 322, 98], { gap: 6, hr: 2, sp: 5, tail: 3.2 }); R.knock([248, 88, 268, 88, 268, 108, 248, 108]); R.rrect(250, 89, 16, 18, 2, { ink: 'B', w: 1, fi: 'Y', ft: 0.7 }); R.knock([286, 88, 304, 88, 304, 108, 286, 108]); R.rrect(288, 89, 14, 18, 2, { ink: 'B', w: 1, fi: 'P', ft: 0.7 });
    R.text('Cl^-', 258, 78, 3.8, { al: 'c', ink: 'P' }); R.arrow([258, 82, 258, 120], { ink: 'P', w: 1.2, hs: 2.6 }); R.text('K^+', 296, 128, 3.8, { al: 'c', ink: 'P' }); R.arrow([296, 118, 296, 80], { ink: 'P', w: 1.2, hs: 2.6 });
    R.text('Cl^- in, K^+ out:', 258, 146, 4, { al: 'c' }); R.text('hyperpolarisation', 258, 153, 4, { al: 'c', ink: 'P' }); R.text('(less likely to reach threshold)', 258, 160, 3.6, { al: 'c' });
    R.line(190, 168, 410, 168, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // NMJ
    R.text('neuromuscular junction', 300, 178, 4.8, { al: 'c' });
    R.rrect(206, 184, 90, 24, 8, { ink: 'B', w: 1.1, fi: 'P', ft: 0.12, wob: 0.2 }); R.text('motor neurone', 251, 198, 3.7, { al: 'c' });
    R.stroke([200, 216, 216, 212, 232, 220, 248, 212, 264, 220, 280, 212, 296, 220, 312, 212, 328, 220, 344, 214, 372, 218], { ink: 'B', w: 1.4, smooth: true, taper: 'none' }); R.rrect(196, 224, 192, 10, 4, { ink: 'B', w: 1.1, fi: 'P', ft: 0.2, wob: 0.2 });
    R.text('muscle fibre: folded membrane, many receptors', 292, 241, 3.4, { al: 'c' });
    R.text('always excitatory', 340, 190, 3.9, { al: 'l' }); R.text('ACh → muscle action potential', 340, 198, 3.7, { al: 'l', ink: 'P' });
    // right: comparison + drugs
    R.line(414, 22, 414, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('synapse vs neuromuscular junction', 534, 14, 4.4, { al: 'c' });
    R.table(424, 22, [66, 72, 72], 14, [['', 'synapse', 'NMJ'], ['between', 'neurones', 'neurone + muscle'], ['transmitter', 'ACh, others', 'ACh only'], ['effect', 'excite or inhibit', 'excitatory only'], ['membrane', 'smooth', 'folded, more receptors'], ['response', 'new impulse', 'muscle action potential']], { size: 3.5, hink: 'Y' });
    R.text('drugs can change synaptic transmission', 534, 126, 4.4, { al: 'c' });
    const dr = [['blocks receptors', 'less ACh binding: transmission falls'], ['inhibits acetylcholinesterase', 'ACh stays: more stimulation'], ['mimics ACh / more release', 'transmission rises']];
    dr.forEach(([a, b], i) => { const y = 142 + i * 28; R.rrect(430, y, 208, 24, 6, { ink: 'B', w: 1, fi: ['P', 'Y', 'T'][i], ft: 0.12, wob: 0.15 }); R.text(a, 534, y + 10, 3.9, { al: 'c' }); R.text(b, 534, y + 19, 3.6, { al: 'c' }); });
    R.text('(names of individual drugs are not required)', 534, 230, 3.4, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(258, 80 + p * 36, 1.5, 'P', 0.9, 1); A.dot(296, 118 - p * 36, 1.5, 'P', 0.9, 2); },
});
