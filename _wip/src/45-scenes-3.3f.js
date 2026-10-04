/* ===================== 3.3.4.2 Mass transport in plants ===================== */
/* simple dicot plant: roots, stem, leaves.  Returns anchor points. */
function plantDraw(R, x, y, h, o = {}) {
  // soil line at y, shoot upward to y-h
  const top = y - h;
  R.stroke([x, y, x - 1, y - h * 0.4, x + 1, y - h * 0.75, x, top], { ink: 'T', w: o.sw || 4, t: 0.5, smooth: true, taper: 'none', solid: false }); R.stroke([x - (o.sw || 4) / 2, y, x - (o.sw || 4) / 2 - 1, y - h * 0.4, x + (o.sw || 4) / 2, top], { ink: 'B', w: 0.8, smooth: true, taper: 'none' }); R.stroke([x + (o.sw || 4) / 2, y, x + (o.sw || 4) / 2 + 1, y - h * 0.4, x + (o.sw || 4) / 2, top], { ink: 'B', w: 0.8, smooth: true, taper: 'none' });
  const leaf = (lx, ly, dir, sz) => { const p = [lx, ly, lx + dir * sz * 0.5, ly - sz * 0.5, lx + dir * sz, ly - sz * 0.2, lx + dir * sz * 0.5, ly + sz * 0.1]; R.fill(p, { ink: 'T', t: 0.55, smooth: true, wob: 0.2 }); R.fill(p, { ink: 'Y', t: 0.55, smooth: true, wob: 0.2 }); R.poly(p, { ink: 'B', w: 0.9, smooth: true, wob: 0.3 }); R.line(lx, ly, lx + dir * sz * 0.9, ly - sz * 0.25, { ink: 'B', w: 0.5, taper: 'none' }); };
  leaf(x, top + h * 0.1, -1, h * 0.28); leaf(x, top + h * 0.05, 1, h * 0.3); leaf(x, top + h * 0.34, -1, h * 0.24); leaf(x, top + h * 0.28, 1, h * 0.22);
  if (o.roots === false) return { top };
  // roots
  [[-24, 18], [-10, 26], [8, 24], [22, 16], [0, 30]].forEach(([dx, dy], i) => { R.stroke([x, y, x + dx * 0.4, y + dy * 0.6, x + dx, y + dy], { ink: 'B', w: 1.1, smooth: true, taper: 'end' }); for (let k = 0; k < 4; k++) R.line(x + dx * (0.5 + k * 0.12), y + dy * (0.5 + k * 0.12), x + dx * (0.5 + k * 0.12) + (k % 2 ? 3 : -3), y + dy * (0.5 + k * 0.12) + 1.5, { ink: 'B', w: 0.4, taper: 'none' }); });
  R.stroke([x - 54, y, x - 20, y - 1, x + 20, y + 1, x + 54, y], { ink: 'B', w: 1, smooth: true });
  return { top };
}
function xylemTube(R, x, y0, y1, w, o = {}) { // xylem vessel with lignin rings
  R.rect(x - w / 2, y0, w, y1 - y0, { ink: 'B', w: 1.1, fi: 'T', ft: 0.2, wob: 0.15 });
  for (let yy = y0 + 4; yy < y1 - 2; yy += o.sp || 5) R.line(x - w / 2, yy, x + w / 2, yy, { ink: o.ring || 'P', w: 1.3, t: 0.9, taper: 'none' });
}

/* ---------- 3.3.4.2a Xylem and the cohesion-tension theory ---------- */
S({
  id: '3.3.4.2a', num: '3.3.4.2', sub: 'Xylem and the cohesion-tension theory of water transport', title: 'Mass transport in plants', topic: '3.3', slot: [2, 7], dna: 'mark', ao: 2,
  covers: ['3.3.4.2.s1', '3.3.4.2.s2'],
  card: {
    text: '<b>Xylem</b> transports water (and mineral ions) in the stem and leaves of plants. Xylem vessels are long tubes of dead cells with no end walls, their walls thickened with <b>lignin</b>. In the <b>cohesion-tension theory</b>: water evaporates from the mesophyll cells and out through the stomata (<b>transpiration</b>); this lowers the water potential in the leaf so water is pulled out of the xylem, creating <b>tension</b> (negative pressure) in the xylem. Water molecules are <b>cohesive</b> (hydrogen bonds), so a continuous column of water is pulled up the xylem; adhesion to the walls also helps. Water enters the roots by osmosis down a water potential gradient.',
    terms: ['xylem', 'lignin', 'transpiration', 'cohesion', 'tension', 'adhesion', 'water potential gradient', 'stomata'],
    skill: 'Describe and explain', eq: null,
    q: 'Why does water not break into separate parts as it is pulled up a tall tree?', a: 'Water molecules are cohesive: hydrogen bonds between them hold the column together while tension pulls it up.'
  },
  draw(R, sc) {
    R.text('cohesion-tension: water pulled up the xylem', 160, 14, 4.8, { al: 'c' });
    plantDraw(R, 138, 214, 150, { sw: 6 });
    // numbered steps
    R.bubble(190, 66, 4.6, '1'); R.bubble(150, 128, 4.6, '2'); R.bubble(150, 174, 4.6, '3'); R.bubble(112, 238, 4.6, '4');
    // leaf cross-section zoom
    R.circle(250, 62, 38, { ink: 'B', w: 1.3, fi: 'T', ft: 0.08 }); R.line(196, 66, 213, 62, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    R.stroke([212, 80, 228, 78, 262, 86, 288, 80], { ink: 'B', w: 1.2, taper: 'none' }); R.stroke([212, 44, 230, 46, 268, 40, 288, 46], { ink: 'B', w: 1.2, taper: 'none' });
    [[226, 56], [246, 52], [266, 58], [236, 68], [258, 70]].forEach(([x, y]) => R.circle(x, y, 7, { ink: 'B', w: 0.8, fi: 'TY', ft: 0.2, wob: 0.2 }));
    R.knock([242, 78, 258, 78, 258, 90, 242, 90]); R.text('stoma', 250, 100, 3.7, { al: 'c' });
    for (let i = 0; i < 3; i++) { R.arrow([226 + i * 18, 46, 226 + i * 18, 32], { ink: 'T', w: 0.9, hs: 2.2 }); } R.arrow([250, 84, 250, 96], { ink: 'T', w: 1, hs: 2.4 }); R.text('H_2O evaporates', 250, 26, 3.7, { al: 'c', ink: 'T' });
    xylemTube(R, 214, 50, 80, 8); R.text('xylem', 206, 92, 3.5, { al: 'r' });
    // xylem column zoom
    R.rect(214, 120, 76, 104, { ink: 'B', w: 1.3, fi: 'T', ft: 0.1, wob: 0.2 });
    for (let yy = 124; yy < 222; yy += 8) R.line(214, yy, 290, yy, { ink: 'P', w: 1.5, t: 0.9, taper: 'none' });
    for (let k = 0; k < 7; k++) { const x = 226 + (k % 3) * 24, y = 132 + Math.floor(k / 3) * 36 + (k % 2) * 6; R.polyline = null; for (let q = 0; q < 3; q++) { R.circle(x + q * 0, y + q * 9, 3.8, { ink: 'B', w: 0.7, fi: 'T', ft: 0.5 }); } for (let q = 0; q < 2; q++) R.line(x, y + q * 9 + 3.8, x, y + (q + 1) * 9 - 3.8, { ink: 'B', w: 0.8, taper: 'none' }); }
    R.arrow([300, 214, 300, 128], { ink: 'T', w: 1.4, hs: 3 }); R.text('water pulled up', 252, 234, 3.7, { al: 'c' });
    R.text('cohesive water molecules', 252, 112, 3.7, { al: 'c' });
    // left steps text
    const cap = (x, y, t, w = 100) => wrapText(t, w, 4).forEach((ln, i) => R.text(ln, x, y + i * 5.2, 4, { al: 'l' }));
    cap(8, 40, '1 evaporation and loss of H_2O vapour from the leaf lowers its ψ'); cap(8, 126, '2 tension: water is pulled out of the xylem, pressure falls', 94);
    cap(8, 172, '3 cohesion: the whole column of water rises', 94); cap(120, 240, 'water enters roots by osmosis', 90);
  },
  anim(A, sc) { const p = A.ph(5); for (let i = 0; i < 6; i++) A.dot(226 + (i % 3) * 24, 220 - ((p + i / 6) % 1) * 94, 1.2, 'T', 0.9, i); for (let i = 0; i < 3; i++) A.dot(226 + i * 18, 46 - ((p + i / 3) % 1) * 14, 1.1, 'T', 0.7, 8 + i); A.dot(138, 190 - p * 100, 1.3, 'T', 0.9, 20); },
});

/* ---------- 3.3.4.2b Phloem and the mass flow hypothesis ---------- */
S({
  id: '3.3.4.2b', num: '3.3.4.2', sub: 'Phloem and the mass flow hypothesis of translocation', title: 'Mass transport in plants', topic: '3.3', slot: [3, 7], dna: 'mark', ao: 2,
  covers: ['3.3.4.2.s3', '3.3.4.2.s4'],
  card: {
    text: '<b>Phloem</b> transports organic substances (mainly sucrose) from <b>sources</b> (e.g. leaves) to <b>sinks</b> (e.g. roots, growing regions, storage organs): <b>translocation</b>. Phloem is made of living <b>sieve tube elements</b> joined at perforated <b>sieve plates</b>, each with a <b>companion cell</b>. The <b>mass flow hypothesis</b>: at the source, sucrose is actively loaded into the sieve tubes, lowering the water potential, so water enters by osmosis and the hydrostatic pressure rises. At the sink, sucrose is removed and used or stored, water potential rises, water leaves and pressure falls. Mass flow of sap occurs down this pressure gradient.',
    terms: ['phloem', 'sucrose', 'translocation', 'source', 'sink', 'sieve tube', 'companion cell', 'mass flow hypothesis', 'hydrostatic pressure'],
    skill: 'Source–sink reasoning', eq: null,
    q: 'Why does water enter the sieve tubes at the source?', a: 'Sucrose is actively loaded in, lowering the water potential of the sieve tube below that of the surrounding xylem, so water enters by osmosis.'
  },
  draw(R, sc) {
    R.text('mass flow: source to sink', 160, 14, 5, { al: 'c' });
    xylemTube(R, 252, 50, 214, 12, { sp: 6 }); R.text('xylem', 252, 228, 3.8, { al: 'c' });
    const sx = 132, tw = 36;
    R.rrect(sx - 70, 24, 62, 36, 8, { ink: 'B', w: 1.2, fi: 'TY', ft: 0.1, wob: 0.3 }); R.text('leaf cell: source', sx - 39, 38, 3.8, { al: 'c' }); R.text('sucrose is made', sx - 39, 46, 3.6, { al: 'c' });
    const seg = [[64, 98], [102, 138], [142, 176]];
    seg.forEach(([a2, b2]) => { R.rect(sx - tw / 2, a2, tw, b2 - a2 - 4, { ink: 'B', w: 1.2, fi: 'T', ft: 0.12, wob: 0.15 }); R.rect(sx - tw / 2 + 3, b2 - 4, tw - 6, 4, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.5 }); for (let k = 0; k < 5; k++) R.dot(sx - 10 + k * 5, b2 - 2, 0.6, { ink: 'B' }); });
    seg.forEach(([a2, b2]) => { R.rrect(sx + tw / 2 + 2, a2 + 4, 18, b2 - a2 - 12, 6, { ink: 'B', w: 1, fi: 'P', ft: 0.2, wob: 0.2 }); R.circle(sx + tw / 2 + 11, a2 + 14, 3, { ink: 'B', w: 0.7, fi: 'B', ft: 0.4 }); R.circle(sx + tw / 2 + 8, a2 + 24, 2, { ink: 'B', w: 0.6, fi: 'Y', ft: 0.7 }); });
    R.rrect(sx - 70, 196, 62, 36, 8, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.3, wob: 0.3 }); R.text('root cell: sink', sx - 39, 210, 3.8, { al: 'c' }); R.text('sucrose is used', sx - 39, 218, 3.6, { al: 'c' });
    const nd = [9, 6, 3]; seg.forEach(([a2, b2], i) => { for (let k = 0; k < nd[i]; k++) R.dot(sx - 12 + (k % 4) * 8, a2 + 7 + Math.floor(k / 4) * 10, 1.5, { ink: 'Y' }); });
    R.arrow([sx - 12, 52, sx - 4, 66], { ink: 'P', w: 1, hs: 2.4 });
    R.arrow([sx, 178, sx, 194], { ink: 'P', w: 1, hs: 2.4 });
    R.arrow([244, 74, sx + tw / 2 + 22, 82], { ink: 'T', w: 1, hs: 2.4 }); R.arrow([sx + tw / 2 + 22, 186, 244, 194], { ink: 'T', w: 1, hs: 2.4 });
    // left-hand annotations
    R.text('active loading', 10, 82, 3.8, { al: 'l', ink: 'P' }); R.text('(ATP)', 10, 88, 3.6, { al: 'l', ink: 'P' });
    R.text('high pressure', 10, 114, 3.8, { al: 'l', ink: 'P' }); R.text('low ψ', 10, 120, 3.6, { al: 'l', ink: 'P' });
    R.text('low pressure', 10, 160, 3.8, { al: 'l', ink: 'T' }); R.text('high ψ', 10, 166, 3.6, { al: 'l', ink: 'T' });
    R.arrow([88, 108, 88, 168], { ink: 'B', w: 1.5, hs: 3.2 }); R.text('mass flow', 80, 138, 3.8, { al: 'c', rot: -90 });
    // right-hand: water arrows text and leaders
    R.text('water in', 204, 66, 3.8, { al: 'c', ink: 'T' }); R.text('by osmosis', 204, 72, 3.6, { al: 'c', ink: 'T' });
    R.text('water out', 204, 206, 3.8, { al: 'c', ink: 'T' }); R.text('solutes removed', 128, 208, 3.6, { al: 'l', ink: 'P' });
    leader(R, 'sieve plate', 120, 98, 202, 110, { size: 3.8, al: 'c' }); leader(R, 'companion cell', sx + tw / 2 + 12, 126, 206, 130, { size: 3.8, al: 'c' }); leader(R, 'sieve tube element', sx + tw / 2 - 2, 156, 212, 156, { size: 3.8, al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); for (let i = 0; i < 5; i++) A.dot(120 + (i % 3) * 8, 70 + ((p + i / 5) % 1) * 106, 1.4, 'Y', 0.9, i); },
});

/* ---------- 3.3.4.2c Evidence: tracers, ringing; for and against mass flow ---------- */
S({
  id: '3.3.4.2c', num: '3.3.4.2', sub: 'Tracer and ringing experiments: evidence for and against the mass flow hypothesis', title: 'Mass transport in plants', topic: '3.3', slot: [0, 8], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.3.4.2.s5', '3.3.4.2.s6'],
  card: {
    text: '<b>Tracer</b> experiments: a leaf is supplied with ¹⁴CO₂; the radioactive carbon is incorporated into sugars, which can be traced (e.g. by autoradiography) moving from source to sink in the phloem. <b>Ringing</b> experiments: a ring of bark including the phloem is removed from a stem; sugars accumulate above the ring (a bulge forms) and the tissue below is starved, showing that sugars move in the phloem. <b>For</b> mass flow: a pressure gradient (sap flows faster nearer the source); metabolic inhibitors stop translocation (active loading); sap flows out of cut phloem. <b>Against</b>: sugars go to many sinks at different rates, not just the highest-pressure; sieve plates would resist flow. Mass flow is a <b>hypothesis</b>.',
    terms: ['tracer', 'radioactive carbon', 'autoradiography', 'ringing', 'phloem', 'pressure gradient', 'metabolic inhibitor', 'hypothesis', 'evidence for and against'],
    skill: 'Interpret evidence; correlation vs causation', eq: null,
    q: 'In a ringing experiment, why does the stem swell above the ring but not below?', a: 'Sugars carried down in the phloem cannot pass the gap where the phloem was removed, so they accumulate above it; below it no sugars arrive.'
  },
  draw(R, sc) {
    R.text('evidence for and against mass flow', 332, 14, 5, { al: 'c' });
    // --- tracer experiment: leaf in 14CO2 container, plant outline with autoradiograph dark areas
    const px = 76, py = 202;
    plantDraw(R, px, py, 118, { sw: 5 });
    R.rrect(px + 10, py - 128, 42, 28, 6, { ink: 'B', w: 1.1, fi: 'T', ft: 0.12, wob: 0.3 }); R.text('^{14}CO_2', px + 31, py - 111, 4.4, { al: 'c' });
    R.text('1 supply one leaf with ^{14}CO_2', 8, 28, 3.9, { al: 'l' }); R.text('2 ^{14}C goes into sugars', 8, 34.5, 3.9, { al: 'l' }); R.text('3 plant killed, placed on film:', 8, 41, 3.9, { al: 'l' }); R.text('dark = radioactive', 8, 47.5, 3.9, { al: 'l' });
    R.text('tracer: ^{14}C in sugars', 76, 240, 4, { al: 'c' });
    R.stroke([px - 14, py - 88, px - 4, py - 60, px, py - 20], { ink: 'B', w: 6, t: 0.7, smooth: true, taper: 'none', solid: false });
    R.line(150, 24, 150, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // --- ringing
    R.text('ringing experiment', 232, 28, 4.6, { al: 'c' });
    const stem = (x, ring, bulge) => {
      const w = 22; R.rect(x - w / 2, 56, w, 150, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.25, wob: 0.3 });
      R.rect(x - w / 2 + 4, 56, w - 8, 150, { ink: 'B', w: 0.8, fi: 'T', ft: 0.25 });                    // xylem core
      R.rect(x - w / 2, 56, 4, 150, { ink: 'B', w: 0, fi: 'P', ft: 0.5 }); R.rect(x + w / 2 - 4, 56, 4, 150, { ink: 'B', w: 0, fi: 'P', ft: 0.5 });  // phloem under bark
      if (ring) { R.knock([x - w / 2 - 2, 118, x + w / 2 + 2, 118, x + w / 2 + 2, 134, x - w / 2 - 2, 134]); R.line(x - w / 2 + 4, 118, x + w / 2 - 4, 118, { ink: 'B', w: 0.8, taper: 'none' }); R.line(x - w / 2 + 4, 134, x + w / 2 - 4, 134, { ink: 'B', w: 0.8, taper: 'none' }); R.rect(x - w / 2 + 4, 118, w - 8, 16, { ink: 'B', w: 0.8, fi: 'T', ft: 0.25 }); }
      if (bulge) { R.ellipse(x, 108, w / 2 + 6, 10, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.45, wob: 0.3 }); }
    };
    stem(196, false, false); stem(268, true, true);
    R.arrow([196, 60, 196, 110], { ink: 'Y', w: 1.4, hs: 3 }); R.text('sugars made in leaves', 196, 50, 3.6, { al: 'c' });
    R.arrow([268, 60, 268, 98], { ink: 'Y', w: 1.4, hs: 3 }); cross(R, 268, 126, 3.4);
    R.text('before', 196, 222, 4, { al: 'c' }); R.text('after: bulge above the ring', 268, 222, 4, { al: 'c' });
    R.text('sugars build up above;', 268, 230, 3.6, { al: 'c' }); R.text('none reach below', 268, 236, 3.6, { al: 'c' });
    leader(R, 'ring of bark removed', 279, 126, 308, 100, { size: 3.8, al: 'c' }); leader(R, 'phloem (in the bark)', 279, 170, 308, 186, { size: 3.8, al: 'c' });
    R.line(344, 24, 344, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // --- for and against
    R.text('evidence FOR', 450, 28, 4.8, { al: 'c', ink: 'T' });
    ['sap flows out of cut phloem (positive pressure)', 'sap flows faster nearer the leaves than further down the stem: a pressure gradient', 'a metabolic inhibitor stops translocation: active loading needs ATP', 'companion cells have many mitochondria', 'ringing: sugars accumulate above a ring'].forEach((t, i) => { R.circle(364, 42 + i * 17.5 + 3.5, 2, { ink: 'B', w: 0.8, fi: 'T', ft: 0.7 }); wrapText(t, 120, 3.7).forEach((ln, k) => R.text(ln, 370, 44 + i * 17.5 + k * 4.6, 3.7, { al: 'l' })); });
    R.line(358, 132, 560, 132, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('evidence AGAINST', 450, 142, 4.8, { al: 'c', ink: 'P' });
    ['sugars move to many sinks at different rates, not only the highest-pressure one', 'sieve plates would hinder flow; high pressure would be needed', 'not all substances move in the same direction at the same time'].forEach((t, i) => { R.circle(364, 156 + i * 17.5 + 3.5, 2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); wrapText(t, 120, 3.7).forEach((ln, k) => R.text(ln, 370, 158 + i * 17.5 + k * 4.6, 3.7, { al: 'l' })); });
    R.text('a hypothesis: not proven', 450, 224, 4.2, { al: 'c', ink: 'P' });
    // --- right: interpreting graph (autoradiograph time series cartoon)
    R.line(576, 24, 576, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('^{14}C reaches sinks over time', 616, 26, 3.7, { al: 'c' });
    [[584, 6], [614, 24], [644, 48]].forEach(([x, t], i) => { R.text(['1 h', '24 h', '48 h'][i], x + 6, 222, 3.8, { al: 'c' }); R.stroke([x + 6, 190, x + 6, 66], { ink: 'T', w: 3.4, t: 0.4, taper: 'none', solid: false }); const ext = [0.15, 0.5, 0.9][i]; R.stroke([x + 6, 70, x + 6, 70 + 120 * ext], { ink: 'B', w: 4.4, t: 0.95, taper: 'none' }); R.circle(x + 6, 62, 7, { ink: 'B', w: 1, fi: 'T', ft: 0.3 }); R.circle(x + 6, 62, 3, { ink: 'B', w: 0, fi: 'B', ft: 0.9 }); });
    R.text('source: leaf', 616, 46, 3.6, { al: 'c' }); R.text('sink: root', 616, 204, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(196, 60 + p * 50, 1.6, 'Y', 0.9, 1); A.dot(268, 60 + p * 38, 1.6, 'Y', 0.9, 2); A.dot(76 - 10 + p * 4, 120 + p * 70, 1.5, 'B', 0.9, 3); },
});

/* ---------- 3.3.4.2d Potometer (skills suggestion: AT b) ---------- */
S({
  id: '3.3.4.2d', num: '3.3.4.2', sub: 'Skills opportunity: a potometer estimates the rate of transpiration (AT b)', title: 'Mass transport in plants', topic: '3.3', slot: [2, 8], span: [2, 1], dna: 'mark', ao: 2, tag: '3.3.4.2',
  covers: ['3.3.4.2.s7'],
  card: {
    text: 'The specification suggests students <b>set up and use a potometer</b> to investigate the effect of a named environmental variable on the rate of <b>transpiration</b> (skills opportunity, AT b; this is <i>not</i> one of the 12 required practicals). A potometer actually measures water uptake, which is assumed to be directly related to water loss. A shoot is cut under water and fitted to the apparatus without air bubbles; the movement of an air bubble along a capillary scale in a set time estimates the rate. Change one factor (light, wind, temperature, humidity) and control the others. Schools may use other methods.',
    terms: ['potometer', 'transpiration', 'water uptake', 'air bubble', 'capillary tube', 'independent variable', 'control variable'],
    skill: 'MS 0.1, 2.3: rate and volume', eq: MATH(mt('volume moved '), mo('='), mi('π'), mi('r'), msup(mrow(), mn('2')), mo('×'), mt('distance moved by bubble')),
    eqn: 'e.g. bubble moves 24 mm in 4 min, capillary radius 0.5 mm → 0.79 × 24 ÷ 4 ≈ 4.7 mm³ min⁻¹',
    q: 'Why is the shoot cut and set up under water?', a: 'To prevent air entering the xylem, which would break the continuous water column and stop water moving up.'
  },
  draw(R, sc) {
    R.text('potometer (example)', 100, 14, 4.8, { al: 'c' });
    // shoot in bung, capillary with scale and bubble, reservoir
    const sh = [26, 90, 30, 66, 18, 50, 36, 38, 28, 22]; plantDraw(R, 44, 120, 72, { sw: 3, roots: false });
    R.rect(40, 118, 12, 12, { ink: 'B', w: 1, fi: 'Y', ft: 0.5, wob: 0.1 }); R.text('bung', 28, 128, 3.5, { al: 'r' });
    R.stroke([46, 130, 46, 160, 60, 172, 160, 172, 160, 142], { ink: 'T', w: 6, t: 0.4, smooth: false, taper: 'none', solid: false }); R.stroke([42, 130, 42, 162, 58, 176, 164, 176], { ink: 'B', w: 1.1, smooth: false, taper: 'none' }); R.stroke([50, 130, 50, 158, 62, 168, 156, 168, 156, 142], { ink: 'B', w: 1.1, smooth: false, taper: 'none' });
    R.rect(160, 142, 8, 40, { ink: 'B', w: 1, fi: 'T', ft: 0.2 }); R.circle(164, 156, 2.8, { ink: 'B', w: 0.8, fi: 'P', ft: 0.9 });
    // capillary with scale
    R.rect(96, 190, 100, 8, { ink: 'B', w: 1.1, fi: 'T', ft: 0.15, wob: 0.1 }); R.rect(122, 191.4, 6, 5.2, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.text('air bubble', 112, 186, 3.6, { al: 'c' });
    for (let i = 0; i <= 10; i++) R.line(96 + i * 10, 198, 96 + i * 10, 198 + (i % 5 === 0 ? 5 : 3), { ink: 'B', w: 0.5, taper: 'none' }); R.text('mm scale', 146, 214, 3.6, { al: 'c' });
    R.text('water moves this way', 98, 150, 3.5, { al: 'l' }); R.arrow([140, 160, 100, 160], { ink: 'T', w: 1, hs: 2.4 });
    R.beaker(190, 168, 32, 36, { level: 0.5, ink: 'T', t: 0.4 }); R.text('reservoir', 206, 214, 3.6, { al: 'c' });
    R.stroke([196, 194, 188, 194, 180, 190, 168, 190], { ink: 'T', w: 3, t: 0.4, smooth: true, taper: 'none', solid: false });
    // lamp/fan factors
    R.circle(18, 64, 6, { ink: 'B', w: 1, fi: 'Y', ft: 0.7 }); [0, 1, 2, 3, 4, 5].forEach(i => { const a = i * TAU / 6; R.line(18 + Math.cos(a) * 8, 64 + Math.sin(a) * 8, 18 + Math.cos(a) * 12, 64 + Math.sin(a) * 12, { ink: 'Y', w: 1, taper: 'none' }); });
    R.text('light', 18, 82, 3.6, { al: 'c' });
    R.line(226, 22, 226, 236, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // right: factors with graph
    R.text('factors that increase the rate', 400, 14, 4.6, { al: 'c' });
    const items = [['light intensity ↑', 'stomata open wider'], ['temperature ↑', 'faster evaporation, larger ψ gradient'], ['humidity ↓', 'steeper ψ gradient to the air'], ['air movement ↑', 'moist air blown away from the stomata']];
    items.forEach(([a, b], i) => { const y = 34 + i * 24; R.circle(244, y, 3, { ink: 'B', w: 0.8, fi: 'Y', ft: 0.8 }); R.text(a, 252, y + 1.4, 4.4, { al: 'l' }); R.text(b, 252, y + 8, 3.7, { al: 'l' }); });
    const g = R.graph(266, 140, 120, 66, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, xl: 'light intensity', yl: 'bubble speed', xt: [], yt: [], fs: 3.8, xly: 10, ylx: 5 }).axes();
    g.curve(x => 1.4 + 7.6 * (1 - Math.exp(-x / 3)), { ink: 'P', w: 1.5 });
    ['one factor changes;', 'others controlled', 'repeat and take a mean'].forEach((t, i) => R.text(t, 478, 150 + i * 7, 3.9, { al: 'c' }));
    R.text('bubble distance ÷ time = rate', 400, 224, 4.2, { al: 'c', ink: 'P' });
  },
  anim(A, sc) { const p = A.ph(8); A.dot(134 - p * 22, 193.6, 0, 'P', 0, 0); A.dot(124 + p * 40, 193.6, 2.4, 'P', 0.9, 1); for (let i = 0; i < 3; i++) A.dot(48 + ((p * 3 + i / 3) % 1) * 4, 124 + ((p * 3 + i / 3) % 1) * 30, 1, 'T', 0.7, 3 + i); },
});
