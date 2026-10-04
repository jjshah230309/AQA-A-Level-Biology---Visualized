/* ===================== 3.6.1.2 Receptors; 3.6.1.3 Control of heart rate ===================== */
/* ---------- 3.6.1.2a Pacinian corpuscle ---------- */
S({
  id: '3.6.1.2a', num: '3.6.1.2', sub: 'The Pacinian corpuscle: stretch-mediated sodium ion channels and the generator potential', title: 'Receptors', topic: '3.6', slot: [2, 2], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.1.2.s1', '3.6.1.2.s2', '3.6.1.2.s3'],
  card: {
    text: 'The <b>Pacinian corpuscle</b> is a pressure receptor in the skin. It illustrates that receptors <b>respond only to specific stimuli</b> (pressure) and that stimulation of a receptor leads to a <b>generator potential</b>. Its structure: a sensory neurone ending (with a bare tip) wrapped in concentric rings of connective tissue separated by gel (lamellae). Pressure deforms the lamellae and stretches the neurone’s membrane, <b>deforming the stretch-mediated sodium ion channels</b>, which open. Na⁺ ions diffuse in, <b>depolarising</b> the membrane and producing a generator potential. If it reaches the threshold, an action potential is triggered in the sensory neurone.',
    terms: ['Pacinian corpuscle', 'receptor', 'specific stimulus', 'generator potential', 'stretch-mediated sodium ion channel', 'depolarisation', 'lamellae', 'threshold', 'action potential'],
    skill: 'MS 1.3: interpret generator potential graph', eq: null,
    q: 'How does pressure cause a generator potential in a Pacinian corpuscle?', a: 'Pressure deforms the lamellae and stretches the sensory neurone ending, opening stretch-mediated Na⁺ channels; Na⁺ enters and depolarises the membrane.'
  },
  draw(R, sc) {
    R.text('Pacinian corpuscle (pressure receptor)', 160, 14, 4.8, { al: 'c' });
    // concentric lamellae (oval) with neurone ending in the middle
    const cx = 100, cy = 94;
    for (let k = 7; k >= 1; k--) { R.ellipse(cx, cy, 14 + k * 6.8, 9 + k * 4.4, { ink: 'B', w: 0.9, fi: k % 2 ? 'Y' : 'P', ft: k % 2 ? 0.2 : 0.14, wob: 0.3 }); }
    R.rrect(cx - 38, cy - 5, 120, 10, 5, { ink: 'B', w: 1.3, fi: 'T', ft: 0.5, wob: 0.15 }); R.circle(cx - 38, cy, 6, { ink: 'B', w: 1, fi: 'T', ft: 0.5 });
    R.rect(cx + 78, cy - 3, 100, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.1 }); R.line(cx + 180, cy, cx + 192, cy, { ink: 'B', w: 1.5, taper: 'none' });
    leader(R, 'sensory neurone ending', cx - 30, cy, 54, 162, { size: 3.9, al: 'c' }); leader(R, 'lamellae (layers of connective tissue)', cx - 22, cy - 40, 100, 30, { size: 3.8, al: 'c' }); leader(R, 'gel between layers', cx + 12, cy + 40, 150, 148, { size: 3.8, al: 'c' });
    R.arrow([cx - 62, cy - 62, cx - 36, cy - 44], { ink: 'P', w: 2, hs: 4.4 }); R.text('pressure', cx - 68, cy - 66, 4.2, { al: 'c', ink: 'P' });
    R.text('myelinated axon to the CNS', cx + 126, cy - 10, 3.8, { al: 'c' });
    R.line(312, 22, 312, 176, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // membrane close-up
    R.text('stretch-mediated Na^+ channels', 482, 28, 4.4, { al: 'c' });
    const mem = (x0, y, open) => {
      R.bilayer([x0, y, x0 + 160, y], { gap: 7, hr: 2.3, sp: 5.2, tail: 3.6 });
      const cxm = x0 + 80; R.knock([cxm - 16, y - 12, cxm + 16, y - 12, cxm + 16, y + 12, cxm - 16, y + 12]);
      if (open) { R.rrect(cxm - 12, y - 11, 8, 22, 2, { ink: 'B', w: 1, fi: 'P', ft: 0.8 }); R.rrect(cxm + 4, y - 11, 8, 22, 2, { ink: 'B', w: 1, fi: 'P', ft: 0.8 }); }
      else R.rrect(cxm - 9, y - 11, 18, 22, 3, { ink: 'B', w: 1, fi: 'P', ft: 0.8 });
      return cxm;
    };
    const c1 = mem(402, 62, false); R.text('no pressure: channel closed', 482, 90, 3.8, { al: 'c' });
    for (let i = 0; i < 3; i++) R.text('Na^+', 418 + i * 52, 42, 3.7, { al: 'c', ink: 'P' });
    const c2 = mem(402, 140, true); R.text('pressure stretches the membrane:', 482, 166, 3.8, { al: 'c' }); R.text('channel opens, Na^+ enter', 482, 173, 3.8, { al: 'c', ink: 'P' });
    for (let i = 0; i < 3; i++) R.text('Na^+', 418 + i * 52, 120, 3.7, { al: 'c', ink: 'P' }); R.arrow([c2, 126, c2, 150], { ink: 'P', w: 1.4, hs: 3 });
    R.arrow([c1, 120, c1, 100], { ink: 'B', w: 0.001, hs: 0.1 });
        // generator potential graph
    R.line(8, 186, 656, 186, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    const g = R.graph(40, 196, 150, 36, { xmin: 0, xmax: 10, ymin: -70, ymax: -20, xl: '', yl: 'mV', xt: [], yt: [[-70, '-70'], [-55, '-55']], fs: 3.4, ylx: 4 }).axes();
    g.hline(-55, { ink: 'P', w: 0.6, dash: true });
    g.curve([0, -70, 2, -70, 3, -62, 4, -48, 5, -34, 6, -56, 7, -70, 10, -70], { ink: 'T', w: 1.4 });
    R.text('threshold', g.X(0.4), g.Y(-55) - 3, 3.4, { al: 'l', ink: 'P' });
    R.text('bigger pressure → bigger generator potential;', 230, 214, 3.9, { al: 'l' }); R.text('if the threshold is reached → action potential', 230, 221, 3.9, { al: 'l' });
    R.text('only pressure stimulates this receptor: receptors are specific', 230, 232, 3.9, { al: 'l', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(4); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.ion(418 + i * 52, 126 + u * 28, 'Na^+', 'P', 3, i); } A.dot(100 - 36 + p * 0, 94, 0, 'P', 0, 0); },
});

/* ---------- 3.6.1.2b Retina: rods and cones ---------- */
S({
  id: '3.6.1.2b', num: '3.6.1.2', sub: 'The human retina: rods and cones, sensitivity, colour and visual acuity', title: 'Receptors', topic: '3.6', slot: [0, 2], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.1.2.s4'],
  card: {
    text: 'The <b>retina</b> contains two types of photoreceptor. <b>Rods</b> contain the pigment <b>rhodopsin</b> and give vision in dim light (high <b>sensitivity</b>) but only in black and white; many rods share a single bipolar neurone (<b>retinal convergence</b>), so light from many rods is summed, but <b>visual acuity</b> is low. <b>Cones</b> contain <b>iodopsin</b> (three types, giving <b>colour vision</b>) and need bright light (low sensitivity); each cone usually has its own connection to the optic nerve, so <b>visual acuity</b> is high. Cones are concentrated in the <b>fovea</b>; rods are spread over the rest of the retina. Light passes through the ganglion and bipolar layers before reaching the photoreceptors.',
    terms: ['retina', 'rod', 'cone', 'rhodopsin', 'iodopsin', 'sensitivity', 'visual acuity', 'colour vision', 'bipolar neurone', 'retinal convergence', 'fovea', 'optic nerve'],
    skill: 'Explain differences by connections and pigments', eq: null,
    q: 'Why do rods give high sensitivity but low visual acuity?', a: 'Many rods connect to one bipolar neurone, so their effects sum to reach threshold in dim light (sensitivity), but the brain cannot tell which rod was stimulated (low acuity).'
  },
  draw(R, sc) {
    R.text('layers of the retina (light enters from the left)', 200, 14, 4.6, { al: 'c' });
    // light arrow
    R.arrow([8, 100, 54, 100], { ink: 'Y', w: 2.4, hs: 5 }); R.text('light', 28, 90, 4, { al: 'c' });
    // layers: ganglion | bipolar | photoreceptors (rods/cones) | pigment epithelium
    const L = [[66, 'ganglion cells', 'Y'], [112, 'bipolar neurones', 'P'], [168, 'rods and cones', 'T'], [232, '', 'B']];
    R.rect(58, 30, 36, 140, { ink: 'B', w: 1, fi: 'Y', ft: 0.1, wob: 0.2 }); R.rect(104, 30, 36, 140, { ink: 'B', w: 1, fi: 'P', ft: 0.07, wob: 0.2 }); R.rect(150, 30, 78, 140, { ink: 'B', w: 1, fi: 'T', ft: 0.07, wob: 0.2 }); R.rect(232, 30, 14, 140, { ink: 'B', w: 1, fi: 'B', ft: 0.5, wob: 0.2 });
    // cells: 3 cones (each with its own bipolar & ganglion) at top (fovea-like), 6 rods converging on one bipolar at bottom
    // cones
    [48, 66, 84].forEach((y, i) => { R.circle(76, y, 5.4, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5 }); R.circle(122, y, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.5 }); R.line(81, y, 117, y, { ink: 'B', w: 0.9, taper: 'none' }); R.line(127, y, 165, y, { ink: 'B', w: 0.9, taper: 'none' }); R.poly([165, y - 4.4, 196, y - 2, 212, y, 196, y + 2, 165, y + 4.4], { ink: 'B', w: 1, fi: ['P', 'Y', 'T'][i], ft: 0.7 }); });
    R.text('cones', 188, 36, 3.8, { al: 'c' });
    // rods
    const rodY = [112, 120, 128, 136, 144, 152];
    rodY.forEach(y => { R.rrect(168, y - 3, 44, 6, 3, { ink: 'B', w: 0.8, fi: 'B', ft: 0.4, wob: 0.1 }); R.line(168, y, 144, 132, { ink: 'B', w: 0.7, taper: 'none' }); });
    R.circle(122, 132, 5, { ink: 'B', w: 0.9, fi: 'P', ft: 0.5 }); R.line(127, 132, 100, 132, { ink: 'B', w: 0.9, taper: 'none' }); R.circle(76, 132, 5.4, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5 });
    R.text('rods', 188, 160, 3.8, { al: 'c' });
    R.stroke([76, 137, 76, 160, 44, 166], { ink: 'B', w: 1.4, smooth: true, taper: 'end' }); R.stroke([76, 84, 76, 102], { ink: 'B', w: 0.01, taper: 'none' });
    ['ganglion cells', 'bipolar neurones', 'photoreceptors', 'pigment layer'].forEach((t, i) => R.text(t, [76, 122, 190, 239][i], 180 + (i % 2) * 8, 3.5, { al: i === 3 ? 'r' : 'c' }));
    R.text('to the optic nerve', 96, 168, 3.5, { al: 'l' }); R.arrow([76, 160, 56, 168], { ink: 'B', w: 0.001, hs: 0.1 });
    R.line(262, 22, 262, 180, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // comparison table
    R.table(272, 34, [52, 46, 46], 15, [['', 'rods', 'cones'], ['pigment', 'rhodopsin', 'iodopsin'], ['colour', 'black/white', 'colour'], ['sensitivity', 'high', 'low'], ['acuity', 'low', 'high'], ['connection', 'many : 1', '1 : 1']], { size: 3.9, hink: 'Y' });
    R.text('many rods share one bipolar neurone:', 340, 134, 3.9, { al: 'c' }); R.text('summation in dim light, but poor detail', 340, 141, 3.9, { al: 'c' });
    R.text('each cone has its own pathway:', 340, 154, 3.9, { al: 'c' }); R.text('good detail and colour in bright light', 340, 161, 3.9, { al: 'c' });
    R.line(8, 192, 420, 192, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('cones are concentrated at the fovea; rods are spread over the rest of the retina', 214, 206, 4, { al: 'c' });
    R.text('light passes through the ganglion and bipolar layers to reach the photoreceptors', 214, 216, 3.8, { al: 'c' });
    // right: eye
    R.line(430, 22, 430, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.ellipse(540, 100, 56, 50, { ink: 'B', w: 1.4, fi: 'P', ft: 0.08, wob: 0.4 }); R.ellipse(540, 100, 56, 50, { ink: 'T', w: 3, t: 0.4, a0: 0.9, solid: false });
    R.circle(492, 100, 12, { ink: 'B', w: 1.1, fi: 'T', ft: 0.2 }); R.text('lens', 478, 124, 3.7, { al: 'c' });
    R.stroke([590, 70, 596, 100, 590, 128], { ink: 'T', w: 3, t: 0.6, smooth: true, taper: 'none' }); R.stroke([590, 70, 596, 100, 590, 128], { ink: 'B', w: 0.8, smooth: true, taper: 'none' });
    R.circle(594, 100, 3.2, { ink: 'P', w: 1.2 }); R.text('fovea', 628, 100, 3.8, { al: 'c', ink: 'P' }); R.text('retina', 626, 66, 3.8, { al: 'c' }); R.stroke([576, 140, 586, 158, 588, 176], { ink: 'Y', w: 3, t: 0.7, smooth: true, taper: 'none' }); R.stroke([576, 140, 586, 158, 588, 176], { ink: 'B', w: 0.8, smooth: true, taper: 'none' }); R.text('optic nerve', 612, 176, 3.7, { al: 'c' });
    R.arrow([456, 100, 484, 100], { ink: 'Y', w: 2, hs: 4 });
  },
  anim(A, sc) { const p = A.ph(4); A.photon(8 + p * 40, 100, 0, 8, 1); for (let i = 0; i < 4; i++) A.dot(168 + ((p + i / 4) % 1) * 0, 112 + i * 14, 0, 'P', 0, 0); A.dot(122 - p * 40 + 40, 132, 1.5, 'Y', 0.9, 2); },
});
