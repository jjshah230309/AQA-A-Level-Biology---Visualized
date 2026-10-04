/* ===================== 3.6.3 Skeletal muscles ===================== */
/* sarcomere drawing: x0 Z-line left, width W (Z to Z), height H; contraction c in 0..1 (0 relaxed, 1 contracted).
   thin filaments (actin, pink) attached to Z lines; thick filaments (myosin, teal) with heads in the centre. */
function sarcomere(R, x0, y0, W, H, c, o = {}) {
  const thick = o.thick || W * 0.52, cx = x0 + W / 2, tx0 = cx - thick / 2, tx1 = cx + thick / 2;
  const rows = 4, dy = H / (rows + 1);
  R.rect(x0 - 1.4, y0, 2.8, H, { ink: 'B', w: 1.0, fi: 'B', ft: 0.7, wob: 0.1 }); R.rect(x0 + W - 1.4, y0, 2.8, H, { ink: 'B', w: 1.0, fi: 'B', ft: 0.7, wob: 0.1 });
  for (let r = 0; r < rows; r++) {
    const y = y0 + dy * (r + 1) + (r % 2 ? 1.2 : -1.2);
    // thin filaments from both Z lines
    const len = o.thinLen || W * 0.4;
    R.line(x0, y, x0 + len, y, { ink: 'P', w: 1.1, taper: 'none' }); R.line(x0 + W, y, x0 + W - len, y, { ink: 'P', w: 1.1, taper: 'none' });
  }
  // thick filaments in the middle, between thin rows
  const tys = [y0 + dy * 1.5, y0 + dy * 2.5, y0 + dy * 3.5];
  tys.forEach(y => { R.rect(tx0, y - 1.7, thick, 3.4, { ink: 'B', w: 0.8, fi: 'T', ft: 0.75, wob: 0.1 }); for (let k = 0; k < 7; k++) { const hx = tx0 + 3 + (thick - 6) * k / 6; if (Math.abs(hx - cx) < thick * 0.06) continue; R.line(hx, y - 1.7, hx + (hx < cx ? 1.6 : -1.6), y - 5, { ink: 'B', w: 0.6, taper: 'none' }); R.line(hx, y + 1.7, hx + (hx < cx ? 1.6 : -1.6), y + 5, { ink: 'B', w: 0.6, taper: 'none' }); } });
  R.line(cx, y0, cx, y0 + H, { ink: 'B', w: 0.7, t: 0.8, taper: 'none' });
  return { cx, tx0, tx1, x1: x0 + W, y0, H };
}

/* ---------- 3.6.3a Muscles in antagonistic pairs; gross and microscopic structure ---------- */
S({
  id: '3.6.3a', num: '3.6.3', sub: 'Antagonistic pairs; skeletal muscle from muscle to myofibril', title: 'Skeletal muscles', topic: '3.6', slot: [2, 5], span: [2, 1], dna: 'mark', ao: 1,
  covers: ['3.6.3.s1', '3.6.3.s2'],
  card: {
    text: 'Skeletal muscles act in <b>antagonistic pairs</b> against an incompressible <b>skeleton</b>: when one contracts the other relaxes, e.g. the biceps (flexor) and triceps (extensor) at the elbow; tendons attach muscle to bone. <b>Gross structure</b>: a muscle is made of bundles of <b>muscle fibres</b> (long multinucleate cells, whose cell membrane is the <b>sarcolemma</b> and cytoplasm the <b>sarcoplasm</b>, with many mitochondria and sarcoplasmic reticulum). Each fibre contains many <b>myofibrils</b>, bundles of the protein filaments <b>actin</b> (thin) and <b>myosin</b> (thick), arranged in repeating units called <b>sarcomeres</b> that give the muscle its striped appearance.',
    terms: ['skeletal muscle', 'antagonistic pair', 'tendon', 'muscle fibre', 'sarcolemma', 'sarcoplasm', 'myofibril', 'sarcomere', 'actin', 'myosin'],
    skill: 'MS 1.8: magnification of a micrograph', eq: null,
    q: 'Why must skeletal muscles work in antagonistic pairs?', a: 'A muscle can only pull when it contracts, so a second muscle is needed to pull the bone back the other way; the skeleton is incompressible so provides a firm lever.'
  },
  draw(R, sc) {
    R.text('from muscle to myofibril', 332, 14, 5, { al: 'c' });
    // arm: humerus, forearm (flexed), biceps above and triceps below
    R.line(22, 118, 122, 118, { ink: 'B', w: 6, t: 0.55, taper: 'none', solid: false }); R.line(22, 118, 122, 118, { ink: 'B', w: 1.2, taper: 'none' });
    R.line(122, 118, 192, 82, { ink: 'B', w: 6, t: 0.55, taper: 'none', solid: false }); R.line(122, 118, 192, 82, { ink: 'B', w: 1.2, taper: 'none' });
    R.circle(122, 118, 5, { ink: 'B', w: 1, fi: 'Y', ft: 0.7 }); R.text('elbow joint', 130, 134, 3.7, { al: 'l' }); R.text('humerus', 30, 130, 3.7, { al: 'c' }); R.text('radius and ulna', 206, 113, 3.7, { al: 'r' });
    R.ellipse(88, 98, 40, 11, { ink: 'B', w: 1.2, fi: 'P', ft: 0.5, rot: -6, wob: 0.3 }); R.line(46, 104, 36, 114, { ink: 'B', w: 1.2, taper: 'none' }); R.stroke([128, 92, 150, 92, 166, 92], { ink: 'B', w: 1.4, smooth: true, taper: 'none' }); R.line(166, 92, 160, 98, { ink: 'B', w: 1.2, taper: 'none' });
    R.text('biceps (flexor)', 86, 78, 3.8, { al: 'c' }); R.text('tendon', 148, 82, 3.6, { al: 'c' });
    R.ellipse(76, 136, 34, 8, { ink: 'B', w: 1.2, fi: 'T', ft: 0.45, rot: 4, wob: 0.3 }); R.stroke([108, 138, 120, 132, 124, 124], { ink: 'B', w: 1.4, smooth: true, taper: 'none' }); R.text('triceps (extensor)', 76, 154, 3.8, { al: 'c' });
    R.arrow([88, 108, 88, 100], { ink: 'P', w: 0.001, hs: 0.1 }); R.arrow([200, 94, 207, 70], { ink: 'P', w: 1.3, hs: 3.4 }); R.text('forearm lifts', 196, 62, 3.7, { al: 'r', ink: 'P' });
    R.text('biceps contracts, triceps relaxes:', 112, 172, 3.8, { al: 'c', ink: 'P' }); R.text('arm bends. Antagonistic pair acting', 112, 179, 3.8, { al: 'c' }); R.text('against an incompressible skeleton', 112, 186, 3.8, { al: 'c' });
    R.line(212, 22, 212, 196, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // muscle -> fibres -> myofibril -> sarcomere
    R.text('muscle', 266, 28, 4, { al: 'c' });
    R.ellipse(266, 62, 40, 26, { ink: 'B', w: 1.3, fi: 'P', ft: 0.2, wob: 0.4 }); for (let i = 0; i < 7; i++) R.line(236 + i * 10, 62 - 24 + Math.abs(i - 3) * 2, 236 + i * 10, 62 + 24 - Math.abs(i - 3) * 2, { ink: 'B', w: 0.7, taper: 'both', t: 0.7 });
    R.text('bundles of muscle fibres', 266, 100, 3.6, { al: 'c' });
    R.arrow([312, 62, 332, 62], { ink: 'B', w: 1, hs: 2.4 });
    R.text('muscle fibre', 380, 28, 4, { al: 'c' });
    R.rrect(344, 52, 76, 22, 8, { ink: 'B', w: 1.2, fi: 'P', ft: 0.2, wob: 0.2 }); for (let k = 0; k < 6; k++) R.line(354 + k * 12, 56, 354 + k * 12, 70, { ink: 'B', w: 0.6, taper: 'none', t: 0.7 });
    [356, 392].forEach(x => R.circle(x, 63, 3.2, { ink: 'B', w: 0.8, fi: 'B', ft: 0.5 })); R.text('many nuclei', 380, 86, 3.6, { al: 'c' }); R.text('sarcolemma = cell membrane; sarcoplasm = cytoplasm', 380, 94, 3.3, { al: 'c' });
    R.arrow([424, 62, 444, 62], { ink: 'B', w: 1, hs: 2.4 });
    R.text('myofibrils', 500, 28, 4, { al: 'c' });
    for (let k = 0; k < 4; k++) { const y = 46 + k * 9; R.rect(448, y, 104, 6, { ink: 'B', w: 0.8, fi: 'P', ft: 0.25, wob: 0.1 }); for (let j = 0; j < 8; j++) R.line(454 + j * 13, y, 454 + j * 13, y + 6, { ink: 'B', w: 0.7, taper: 'none' }); }
    R.text('each fibre has many myofibrils', 500, 94, 3.6, { al: 'c' });
    R.line(212, 112, 656, 112, { ink: 'B', w: 0.01, taper: 'none' });
    R.arrow([500, 100, 500, 132], { ink: 'B', w: 1, hs: 2.4 });
    // sarcomere large
    R.text('sarcomere: the repeating unit of a myofibril', 436, 140, 4.4, { al: 'c' });
    const sx = sarcomere(R, 340, 158, 192, 52, 0);
    R.text('Z line', 340, 224, 3.6, { al: 'c' }); R.text('Z line', 532, 224, 3.6, { al: 'c' });
    R.text('actin (thin)', 384, 153, 3.8, { al: 'c', ink: 'P' }); R.text('myosin (thick)', 488, 153, 3.8, { al: 'c', ink: 'T' });
    R.text('dark and light bands give the striped look', 436, 234, 3.7, { al: 'c' });
    // left: micrograph style stripes
    R.rect(228, 158, 92, 52, { ink: 'B', w: 1, fi: 'P', ft: 0.12, wob: 0.2 }); for (let k = 0; k < 9; k++) R.rect(234 + k * 10, 160, 5, 48, { ink: 'B', w: 0, fi: 'B', ft: 0.45 });
    R.text('striped (striated) muscle', 274, 222, 3.7, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(88 + Math.sin(p * TAU) * 26, 98 - Math.abs(Math.sin(p * TAU)) * 2, 1.5, 'P', 0.9, 1); },
});

/* ---------- 3.6.3b Ultrastructure of a myofibril: bands ---------- */
S({
  id: '3.6.3b', num: '3.6.3', sub: 'Ultrastructure of a myofibril: sarcomere bands in relaxed and contracted muscle', title: 'Skeletal muscles', topic: '3.6', slot: [0, 6], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.6.3.s2'],
  card: {
    text: 'A sarcomere runs from one <b>Z line</b> to the next. <b>Actin</b> (thin) filaments are attached to the Z lines; <b>myosin</b> (thick) filaments lie in the middle, held at the <b>M line</b>. The <b>A band</b> is the length of the myosin filaments (dark) and does not change on contraction. The <b>I band</b> is the region with actin only (light) and gets <b>shorter</b>. The <b>H zone</b> is the part of the A band with myosin only and gets <b>shorter</b> (may disappear). The sarcomere itself shortens as the actin filaments slide between the myosin filaments (<b>sliding filament theory</b>): the filaments do not shorten.',
    terms: ['sarcomere', 'Z line', 'M line', 'A band', 'I band', 'H zone', 'actin', 'myosin', 'sliding filament', 'ultrastructure'],
    skill: 'MS 1.8: measure sarcomere length', eq: null,
    q: 'Which bands get shorter when a sarcomere contracts and which stays the same?', a: 'The I band and the H zone shorten (and the sarcomere); the A band stays the same length because myosin filaments do not shorten.'
  },
  draw(R, sc) {
    R.text('relaxed', 150, 14, 4.8, { al: 'c' }); R.text('contracted', 150, 120, 4.8, { al: 'c' });
    const W1 = 190, W2 = 150, thin = 80, H = 34, thick = 98;
    const s1 = sarcomere(R, 40, 24, W1, H, 0, { thinLen: thin, thick }), s2 = sarcomere(R, 40, 134, W2, H, 1, { thinLen: thin, thick });
    const bandRow = (s, W, y) => {
      const zL = 40, zR = 40 + W, cx = s.cx, tL = s.tx0, tR = s.tx1;
      R.arrow([tL, y, tR, y], { ink: 'T', w: 1, hs: 2.4, both: true }); R.text('A band', cx, y + 7.5, 3.8, { al: 'c', ink: 'T' });
      R.arrow([zL, y + 11, tL, y + 11], { ink: 'P', w: 1, hs: 2.4, both: true }); R.text('I band', (zL + tL) / 2, y + 18.5, 3.6, { al: 'c', ink: 'P' });
      R.arrow([tR, y + 11, zR, y + 11], { ink: 'P', w: 1, hs: 2.4, both: true }); R.text('I band', (tR + zR) / 2, y + 18.5, 3.6, { al: 'c', ink: 'P' });
      const hL = zL + thin, hR = zR - thin;
      if (hR > hL + 2) { R.arrow([hL, y + 22, hR, y + 22], { ink: 'B', w: 1, hs: 2.4, both: true }); R.text('H zone', cx, y + 29.5, 3.8, { al: 'c' }); } else R.text('H zone: gone', cx, y + 26.5, 3.8, { al: 'c' });
      R.arrow([zL, y + 33, zR, y + 33], { ink: 'B', w: 1, hs: 2.4, both: true }); R.text('sarcomere', cx, y + 40.5, 3.8, { al: 'c' });
    };
    bandRow(s1, W1, 66); bandRow(s2, W2, 178);
    R.text('Z', 40, 22, 3.8, { al: 'c' }); R.text('Z', 40 + W1, 22, 3.8, { al: 'c' }); R.text('M', s1.cx, 22, 3.8, { al: 'c' });
    R.text('Z', 40, 132, 3.8, { al: 'c' }); R.text('Z', 40 + W2, 132, 3.8, { al: 'c' }); R.text('M', s2.cx, 132, 3.8, { al: 'c' });
    R.line(268, 22, 268, 238, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // table of bands
    R.text('what changes on contraction', 440, 28, 4.8, { al: 'c' });
    R.table(280, 36, [70, 60, 100], 13, [['band / zone', 'length', 'because'], ['A band', 'same', 'myosin does not shorten'], ['I band', 'shorter', 'actin slides in'], ['H zone', 'shorter', 'actin slides in'], ['sarcomere', 'shorter', 'Z lines pulled together']], { size: 3.9, hink: 'Y' });
    R.text('sliding filament theory', 440, 120, 4.4, { al: 'c', ink: 'P' });
    ['the actin filaments slide between', 'the myosin filaments, pulling the', 'Z lines towards each other', 'neither set of filaments shortens'].forEach((t, i) => R.text(t, 440, 134 + i * 8, 4, { al: 'c' }));
    R.text('legend', 440, 178, 3.8, { al: 'c' }); R.line(300, 188, 320, 188, { ink: 'P', w: 1.6, taper: 'none' }); R.text('actin (thin)', 326, 190, 3.8, { al: 'l', ink: 'P' }); R.rect(396, 186, 20, 4, { ink: 'B', w: 0.8, fi: 'T', ft: 0.75 }); R.text('myosin (thick)', 422, 190, 3.8, { al: 'l', ink: 'T' });
    R.rect(300, 198, 4, 12, { ink: 'B', w: 0.8, fi: 'B', ft: 0.7 }); R.text('Z line', 308, 207, 3.8, { al: 'l' });
  },
  anim(A, sc) { const p = A.ph(5); const k = 0.5 - 0.5 * Math.cos(p * TAU); const W = 190 - 40 * k; A.dot(40 + W, 42, 2.4, 'P', 0.8, 1); A.dot(40 + 190 - W + 0, 42, 0, 'P', 0, 2); },
});
