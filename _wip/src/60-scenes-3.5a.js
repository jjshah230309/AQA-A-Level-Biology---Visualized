/* ===================== TOPIC 3.5 Energy transfers in and between organisms ===================== */
/* energy conversion overview: sun -> chloroplast -> sugars -> mitochondria -> ATP -> work, with losses as heat */
S({
  id: '3.5', num: '3.5', sub: 'Energy transfers in and between organisms: overview', title: 'Energy transfers in and between organisms', topic: '3.5', slot: [0, 0], span: [2, 1], dna: 'bio', ao: 1,
  covers: ['3.5.s1', '3.5.s2', '3.5.s3', '3.5.s4', '3.5.s5', '3.5.s6', '3.5.s7'],
  card: {
    text: 'Life depends on continuous transfers of energy. In <b>photosynthesis</b> light is absorbed by chlorophyll and this is linked to the production of <b>ATP</b>. In <b>respiration</b> various substrates are used; their hydrolysis is linked to the production of ATP. In both processes ATP production occurs when <b>protons</b> diffuse down an electrochemical gradient through <b>ATP synthase</b> embedded in the membranes of cellular organelles. Photosynthesis is common to all photoautotrophs and respiration to all organisms, which gives <b>indirect evidence for evolution</b>. In communities, biological molecules made by photosynthesis are consumed by animals, bacteria and fungi, some being used as respiratory substrates. Neither process, nor the transfer of biomass between organisms, is 100 % efficient.',
    terms: ['photosynthesis', 'respiration', 'ATP', 'ATP synthase', 'electrochemical gradient', 'protons', 'photoautotroph', 'respiratory substrate', 'efficiency', 'evolution'],
    skill: 'MS 0.3: percentages (efficiency)', eq: MATH(mt('efficiency '), mo('='), mfrac(mt('useful energy out'), mt('energy in')), mo('×'), mn('100'), mt(' %')),
    q: 'Why is photosynthesis described as indirect evidence for evolution?', a: 'The process is common to all photoautotrophs, suggesting they inherited it from a common ancestor.'
  },
  draw(R, sc) {
    R.text('energy flows through living things', 332, 14, 5.2, { al: 'c' });
    // sun
    R.circle(36, 56, 17, { ink: 'B', w: 1.3, fi: 'Y', ft: 0.7 }); for (let i = 0; i < 12; i++) { const a = i * TAU / 12; R.line(36 + Math.cos(a) * 21, 56 + Math.sin(a) * 21, 36 + Math.cos(a) * 29, 56 + Math.sin(a) * 29, { ink: 'Y', w: 1.4, taper: 'none' }); }
    R.text('light', 36, 94, 4.2, { al: 'c' });
    // chloroplast
    R.arrow([72, 56, 112, 56], { ink: 'Y', w: 1.6, hs: 3.4 });
    R.chloroplast(170, 58, 100, 56, 0, { grana: 4 });
    R.text('chloroplast', 170, 98, 4.4, { al: 'c' }); R.text('photosynthesis', 170, 105, 4, { al: 'c', ink: 'T' });
    R.text('light → ATP → sugars', 170, 114, 3.8, { al: 'c' });
    // sugars + O2 flow
    R.arrow([226, 52, 266, 52], { ink: 'B', w: 1.2, hs: 3 }); R.poly(hexPts(246, 52, 5.4), { ink: 'B', w: 0.9, fi: 'Y', ft: 0.5 }); R.text('glucose and', 246, 70, 3.7, { al: 'c' }); R.text('other organic', 246, 76, 3.7, { al: 'c' }); R.text('molecules', 246, 82, 3.7, { al: 'c' });
    // mitochondrion
    R.mito(332, 58, 100, 48, 0, {});
    R.text('mitochondrion', 332, 98, 4.4, { al: 'c' }); R.text('respiration', 332, 105, 4, { al: 'c', ink: 'P' }); R.text('substrate → ATP', 332, 114, 3.8, { al: 'c' });
    // ATP
    R.arrow([388, 52, 428, 52], { ink: 'B', w: 1.2, hs: 3 }); R.circle(444, 52, 10, { ink: 'B', w: 1.1, fi: 'Y', ft: 0.9 }); R.text('ATP', 444, 53.6, 4.6, { al: 'c' });
    R.text('energy for cell work', 444, 76, 3.8, { al: 'c' });
    // consumers
    R.text('consumers eat plants', 540, 34, 4.4, { al: 'c' });
    beast(R, 540, 60, 1.5, { fi: 'Y', ft: 0.3 });
    R.arrow([472, 56, 494, 62], { ink: 'B', w: 1, hs: 2.4 });
    R.text('bacteria and fungi', 614, 100, 4, { al: 'c' }); R.bacterium(612, 82, 22, 10, -10, { fi: 'TY', ft: 0.35 });
    R.line(8, 126, 656, 126, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // shared mechanism: ATP synthase in both membranes
    R.text('same mechanism in both organelles: protons diffuse through ATP synthase', 332, 138, 4.6, { al: 'c' });
    // H+ concentrated on one side (hi = -1 above the membrane, +1 below); ATP synthase head sits on the other side
    const memb = (x0, y, w, hi, label, hiLab, loLab) => {
      R.bilayer([x0, y, x0 + w, y], { gap: 7, hr: 2.2, sp: 5.2, tail: 3.6 });
      R.knock([x0 + w / 2 - 8, y - 12, x0 + w / 2 + 8, y - 12, x0 + w / 2 + 8, y + 12, x0 + w / 2 - 8, y + 12]);
      R.atpSynthase(x0 + w / 2, y, 0.8, { dir: -hi });
      [0.1, 0.2, 0.3, 0.7, 0.8, 0.9].forEach((u, i) => R.text('H^+', x0 + u * w, y + hi * (14 + (i % 2) * 7), 3.8, { al: 'c', ink: 'P' }));
      R.arrow([x0 + w / 2, y + hi * 24, x0 + w / 2, y + hi * 10], { ink: 'P', w: 1.2, hs: 2.6 }); R.text('protons diffuse through ATP synthase', x0 + w / 2 + 6, y + hi * 26, 3.4, { al: 'l', ink: 'P' });
      R.text(hiLab + ' (high H^+)', x0 + 4, y + hi * 30, 3.5, { al: 'l' }); R.text(loLab + ' (low H^+)', x0 + 4, y - hi * 30, 3.5, { al: 'l' });
      R.text(label, x0 + w / 2, y + 52 * (hi > 0 ? 1 : 1) + (hi > 0 ? 0 : 0), 4.2, { al: 'c' });
    };
    memb(40, 178, 250, 1, 'thylakoid membrane (chloroplast)', 'thylakoid space', 'stroma');
    memb(380, 178, 250, -1, 'inner mitochondrial membrane', 'intermembrane space', 'matrix');
    R.text('ADP + P_i → ATP in the stroma', 165, 222, 3.9, { al: 'c', ink: 'P' }); R.text('ADP + P_i → ATP in the matrix', 505, 222, 3.9, { al: 'c', ink: 'P' });
    R.line(334, 148, 334, 232, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.text('neither process is 100 % efficient: some energy is lost as heat', 332, 236, 3.9, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 4; i++) A.photon(76 + ((p + i / 4) % 1) * 36, 50 + (i % 2) * 8, 0, 8, i); A.atp(444 + Math.sin(p * TAU) * 2, 52, 9, 1); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.ion(165, 192 - u * 24, 'H^+', 'P', 3, 5 + i); A.ion(505, 164 + u * 24, 'H^+', 'P', 3, 8 + i); } },
});

/* ---------- 3.5.1a Light-dependent reaction ---------- */
S({
  id: '3.5.1a', num: '3.5.1', sub: 'Photosynthesis: the light-dependent reaction', title: 'Photosynthesis', topic: '3.5', slot: [2, 0], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.5.1.s1', '3.5.1.s2', '3.5.1.s3', '3.5.1.s4', '3.5.1.s5'],
  card: {
    text: 'In the <b>light-dependent reaction</b> (thylakoid membranes), <b>chlorophyll absorbs light</b>, leading to <b>photoionisation</b>: electrons are released from chlorophyll. Some of the energy from these electrons is conserved in the production of <b>ATP</b> and <b>reduced NADP</b>. ATP is made as electrons pass down the <b>electron transfer chain</b>, protons are moved across the chloroplast (thylakoid) membrane, and protons diffuse back through <b>ATP synthase</b> (chemiosmotic theory). <b>Photolysis of water</b> produces protons, electrons and oxygen; the electrons replace those lost from chlorophyll, and the protons help reduce NADP.',
    terms: ['chlorophyll', 'photoionisation', 'electron transfer chain', 'ATP synthase', 'chemiosmotic theory', 'photolysis', 'reduced NADP', 'thylakoid', 'proton'],
    skill: 'Sequence: light → electrons → ATP', eq: MATH(mt('2H'), msub(mrow(), mn('2')), mt('O → 4H'), msup(mrow(), mo('+')), mt(' + 4e'), msup(mrow(), mo('−')), mt(' + O'), msub(mrow(), mn('2'))),
    q: 'What is the role of photolysis of water in the light-dependent reaction?', a: 'It supplies electrons to replace those lost from chlorophyll, protons (for the proton gradient and to reduce NADP) and oxygen as a by-product.'
  },
  draw(R, sc) {
    R.text('light-dependent reaction at the thylakoid membrane', 332, 14, 5, { al: 'c' });
    const ym = 100;
    R.fill([10, 22, 654, 22, 654, ym - 10, 10, ym - 10], { ink: 'T', t: 0.07, wob: 0.3 }); R.fill([10, ym + 10, 654, ym + 10, 654, 176, 10, 176], { ink: 'Y', t: 0.1, wob: 0.3 });
    R.bilayer([10, ym, 654, ym], { gap: 8, hr: 2.5, sp: 5.4, tail: 3.8 });
    const slot = (x, w) => R.knock([x - w / 2, ym - 13, x + w / 2, ym - 13, x + w / 2, ym + 13, x - w / 2, ym + 13]);
    R.text('stroma', 16, 34, 4.4, { al: 'l', ink: 'T' }); R.text('thylakoid space', 330, 172, 4.4, { al: 'l' });
    // 1 chlorophyll + light
    slot(72, 46); R.rrect(50, ym - 12, 44, 24, 6, { ink: 'B', w: 1.1, fi: 'T', ft: 0.5, wob: 0.2 }); R.text('chlorophyll', 72, ym + 1.6, 3.6, { al: 'c' });
    R.photon(40, 40, 0.9, 24, 0); R.photon(56, 36, 0.9, 24, 1); R.text('light', 26, 58, 4, { al: 'c' });
    R.circle(104, 70, 3.8, { ink: 'B', w: 0.9, fi: 'Y', ft: 0.9 }); R.text('e^-', 104, 71.4, 3.2, { al: 'c' }); R.arrow([88, ym - 14, 100, 76], { ink: 'B', w: 1, hs: 2.6 });
    R.text('photoionisation:', 130, 44, 3.7, { al: 'l' }); R.text('electrons released', 130, 50.4, 3.7, { al: 'l' });
    R.bubble(36, 78, 4.4, '1');
    // 2 electron transfer chain
    [176, 236, 296].forEach(x => { slot(x, 30); R.rrect(x - 12, ym - 12, 24, 24, 5, { ink: 'B', w: 1, fi: 'P', ft: 0.6, wob: 0.15 }); });
    R.stroke([112, 70, 150, 76, 176, 82, 206, 78, 236, 82, 266, 78, 296, 82, 332, 78, 372, 82], { ink: 'Y', w: 1.5, smooth: true, taper: 'end' });
    R.text('electron transfer chain', 236, 64, 3.9, { al: 'c' }); R.bubble(176, 56, 4.4, '2');
    // 3 protons moved across the membrane
    [176, 236].forEach(x => R.arrow([x, ym + 14, x, ym + 48], { ink: 'P', w: 1.2, hs: 2.8 }));
    R.bubble(206, ym + 36, 4.4, '3'); R.text('H^+ moved into the', 246, ym + 46, 3.7, { al: 'l', ink: 'P' }); R.text('thylakoid space', 246, ym + 52.4, 3.7, { al: 'l', ink: 'P' });
    // photolysis (5)
    R.drop(40, ym + 44, 5.4, { label: 'H_2O' }); R.arrow([48, ym + 36, 66, ym + 22], { ink: 'B', w: 0.9, hs: 2.2 });
    R.text('photolysis of water:', 90, ym + 62, 3.8, { al: 'c' }); R.text('H^+ + e^- + O_2', 90, ym + 69.4, 3.8, { al: 'c', ink: 'P' });
    R.bubble(104, ym + 40, 4.4, '5');
    // reduced NADP (5)
    slot(372, 30); R.rrect(360, ym - 12, 24, 24, 5, { ink: 'B', w: 1, fi: 'Y', ft: 0.6, wob: 0.15 });
    R.text('NADP + e^- + H^+', 372, 44, 3.9, { al: 'c' }); R.arrow([372, 48, 372, ym - 16], { ink: 'B', w: 1, hs: 2.4 });
    R.circle(420, 56, 7.4, { ink: 'B', w: 1, fi: 'P', ft: 0.5 }); R.text('reduced NADP', 420, 74, 3.8, { al: 'c' }); R.arrow([386, ym - 18, 408, 62], { ink: 'B', w: 0.9, hs: 2.2 });
    R.bubble(340, 56, 4.4, '5');
    // 4 ATP synthase
    slot(520, 34); R.atpSynthase(520, ym, 1.2, { dir: -1 });
    R.arrow([520, ym + 52, 520, ym + 12], { ink: 'P', w: 1.4, hs: 3 }); R.text('H^+ diffuse back through', 530, ym + 50, 3.8, { al: 'l', ink: 'P' }); R.text('ATP synthase', 530, ym + 57, 3.8, { al: 'l', ink: 'P' });
    R.text('ADP + P_i', 576, 52, 3.8, { al: 'c' }); R.arrow([576, 56, 546, 66], { ink: 'B', w: 0.9, hs: 2.2 }); R.circle(580, 80, 7, { ink: 'B', w: 1, fi: 'Y', ft: 0.9 }); R.text('ATP', 580, 81.4, 4.4, { al: 'c' });
    R.bubble(612, 62, 4.4, '4');
    // many protons accumulate in the space
    [[330, 140], [350, 150], [372, 140], [394, 150], [416, 140], [438, 150], [460, 140], [482, 150]].forEach(([x, y], i) => R.text('H^+', x, y + 6, 3.7, { al: 'c', ink: 'P' }));
    R.text('high concentration of H^+ builds up', 406, ym + 66, 3.9, { al: 'c', ink: 'P' });
    // explanation
    const items = ['chlorophyll absorbs light: photoionisation releases electrons', 'electrons pass along the electron transfer chain', 'protons are moved across the thylakoid membrane', 'protons flow back through ATP synthase: ATP made', 'photolysis supplies e^-, H^+ and O_2; NADP is reduced'];
    items.forEach((t, i) => { const x = i < 3 ? 14 : 340, y = 196 + (i % 3) * 14; R.bubble(x + 4, y - 1.2, 4, String(i + 1)); R.text(t, x + 12, y, 3.9, { al: 'l' }); });
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.photon(52 + u * 30, 168 - u * 40, -0.9, 8, i); A.electron(176 + u * 100, 86, 3 + i); A.ion(430, 144 - u * 28, 'H^+', 'P', 3, 10 + i); } },
});
