/* ===================== 3.3.4.1 (cont.) circulation, heart, cardiac cycle ===================== */
const BLOOD_OX = { ink: 'P', ink2: 'Y' };   // oxygenated: pink over yellow = red-orange; deoxygenated: blue over pink = violet
function oxFill(R, pts, ox, o = {}) { // fill a region with blood colour
  if (ox) { R.fill(pts, { ink: 'P', t: o.t === undefined ? 0.55 : o.t, wob: o.wob === undefined ? 0.2 : o.wob, smooth: o.smooth }); R.fill(pts, { ink: 'Y', t: o.t2 === undefined ? 0.5 : o.t2, wob: o.wob === undefined ? 0.2 : o.wob, smooth: o.smooth }); }
  else { R.fill(pts, { ink: 'B', t: o.t === undefined ? 0.4 : o.t, wob: o.wob === undefined ? 0.2 : o.wob, smooth: o.smooth }); R.fill(pts, { ink: 'P', t: o.t2 === undefined ? 0.22 : o.t2, wob: o.wob === undefined ? 0.2 : o.wob, smooth: o.smooth }); }
}
function oxStroke(R, pts, ox, w, o = {}) {
  R.stroke(pts, { ink: 'B', w: w + 1.2, smooth: o.smooth !== false, taper: 'none', wob: 0.15 });
  R.stroke(pts, { ink: 'B', w, smooth: o.smooth !== false, taper: 'none', wob: 0.15, knock: true });
  if (ox) { R.stroke(pts, { ink: 'P', w, t: 0.55, smooth: o.smooth !== false, taper: 'none', wob: 0.15 }); R.stroke(pts, { ink: 'Y', w, t: 0.5, smooth: o.smooth !== false, taper: 'none', wob: 0.15 }); }
  else { R.stroke(pts, { ink: 'B', w, t: 0.4, smooth: o.smooth !== false, taper: 'none', wob: 0.15 }); R.stroke(pts, { ink: 'P', w, t: 0.22, smooth: o.smooth !== false, taper: 'none', wob: 0.15 }); }
}

/* ---------- 3.3.4.1d General pattern of blood circulation in a mammal ---------- */
S({
  id: '3.3.4.1d', num: '3.3.4.1', sub: 'General pattern of blood circulation in a mammal: heart, lungs, kidneys', title: 'Mass transport in animals', topic: '3.3', slot: [0, 5], dna: 'mark', ao: 1,
  covers: ['3.3.4.1.s7'],
  card: {
    text: 'In mammals blood circulates in a <b>double circulation</b>: the right side of the heart pumps deoxygenated blood to the lungs via the <b>pulmonary artery</b>; oxygenated blood returns in the <b>pulmonary veins</b> to the left side, which pumps it round the body via the <b>aorta</b>. Blood returns to the right atrium in the <b>vena cava</b>. The <b>coronary arteries</b> supply the heart muscle itself; the <b>renal arteries</b> take blood to the kidneys and the <b>renal veins</b> carry it away. Names are required only for the coronary arteries and for the vessels entering and leaving the heart, lungs and kidneys.',
    terms: ['double circulation', 'aorta', 'vena cava', 'pulmonary artery', 'pulmonary vein', 'coronary artery', 'renal artery', 'renal vein'],
    skill: 'Trace blood flow', eq: null,
    q: 'Which vessel carries oxygenated blood from the lungs to the heart?', a: 'The pulmonary vein (the only vein carrying oxygenated blood in the body).'
  },
  draw(R, sc) {
    R.text('double circulation', 160, 14, 5.2, { al: 'c' });
    const tube = (pts, ox, w) => oxStroke(R, pts, ox, w, { smooth: false });
    // capillary beds
    const bed = (x, y, w, h, label, ox) => { R.rrect(x, y, w, h, 6, { ink: 'B', w: 1.2, fi: 'P', ft: 0.12, wob: 0.3 }); for (let i = 0; i < 9; i++) R.stroke([x + 8 + i * ((w - 16) / 8), y + 3, x + 8 + i * ((w - 16) / 8) + (i % 2 ? 3 : -3), y + h / 2, x + 8 + i * ((w - 16) / 8), y + h - 3], { ink: 'B', w: 0.6, smooth: true, taper: 'none' }); R.text(label, x + w / 2, y + h / 2 + 1.4, 4.4, { al: 'c' }); };
    bed(102, 26, 118, 26, 'lungs', 1);
    bed(62, 196, 70, 24, 'kidneys', 1); bed(168, 196, 100, 24, 'rest of body', 1);
    // heart: four chambers
    const hx = 130, hy = 88;
    const ch = (x, y, w, h, ox, label) => { const p = [x, y, x + w, y, x + w, y + h, x, y + h]; oxFill(R, p, ox); R.poly(p, { ink: 'B', w: 1.3, wob: 0.3 }); R.text(label, x + w / 2, y + h / 2 + 1.5, 4, { al: 'c' }); };
    ch(hx, hy, 30, 22, false, 'RA'); ch(hx + 30, hy, 30, 22, true, 'LA'); ch(hx, hy + 22, 30, 30, false, 'RV'); ch(hx + 30, hy + 22, 30, 30, true, 'LV');
    R.poly([hx, hy, hx + 60, hy, hx + 60, hy + 52, hx, hy + 52], { ink: 'B', w: 1.8, wob: 0.3 }); R.line(hx + 30, hy, hx + 30, hy + 52, { ink: 'B', w: 2.4, taper: 'none' });
    // pulmonary artery (RV -> lungs), pulmonary vein (lungs -> LA)
    tube([hx + 15, hy + 22, hx + 15, 68, 120, 60, 120, 52], false, 4); tube([hx + 46, 52, hx + 46, hy], true, 4);
    // vena cava (body -> RA)
    tube([96, 220, 96, 226, 40, 226, 40, 100, hx, 100], false, 4); tube([164, 220, 164, 226, 96, 226], false, 4);
    // aorta (LV -> body) with renal artery branch
    tube([hx + 46, hy + 52, hx + 46, 164, 214, 164, 214, 194], true, 4.4); tube([hx + 46, 164, 96, 164, 96, 196], true, 3.2);
    // flow arrows
    const ar = (pts, ink) => R.arrow(pts, { ink: 'B', w: 1, hs: 2.4, smooth: false });
    // labels
    const lab = (t, tx, ty, x, y, al) => leader(R, t, x, y, tx, ty, { size: 4, al });
    lab('pulmonary artery', 80, 70, 122, 62, 'c'); lab('pulmonary vein', 250, 72, hx + 46, 70, 'c');
    lab('aorta', 262, 124, 214, 178, 'c'); lab('renal artery', 70, 170, 98, 180, 'c'); lab('vena cava', 4, 80, 40, 90, 'l');
    lab('renal vein', 8, 236, 84, 224, 'l');
    lab('coronary arteries', 262, 100, hx + 56, hy + 30, 'c');
    R.stroke([hx + 46, hy + 40, hx + 56, hy + 34, hx + 58, hy + 22], { ink: 'P', w: 1.4, smooth: true, taper: 'end' });
    // key
    oxFill(R, [206, 28, 218, 28, 218, 36, 206, 36], true); R.rect(206, 28, 12, 8, { ink: 'B', w: 0.7 }); R.text('oxygenated', 222, 35, 3.8, { al: 'l' });
    oxFill(R, [206, 40, 218, 40, 218, 48, 206, 48], false); R.rect(206, 40, 12, 8, { ink: 'B', w: 0.7 }); R.text('deoxygenated', 222, 47, 3.8, { al: 'l' });
  },
  anim(A, sc) {
    const p = A.ph(6);
    const ppath = [145, 110, 145, 68, 120, 60, 120, 52]; for (let i = 0; i < 4; i++) { const q = A.along(ppath, (p + i / 4) % 1); A.rbc(q[0], q[1], 2.2, i, 0.75); }
    const apath = [176, 140, 176, 164, 214, 164, 214, 194]; for (let i = 0; i < 4; i++) { const q = A.along(apath, (p + i / 4) % 1); A.rbc(q[0], q[1], 2.2, 10 + i, 0.95); }
    const vpath = [164, 220, 164, 226, 40, 226, 40, 100, 130, 100]; for (let i = 0; i < 6; i++) { const q = A.along(vpath, (p + i / 6) % 1); A.rbc(q[0], q[1], 2.2, 20 + i, 0.7); }
    const pvpath = [176, 52, 176, 88]; for (let i = 0; i < 2; i++) { const q = A.along(pvpath, (p + i / 2) % 1); A.rbc(q[0], q[1], 2.2, 30 + i, 0.95); }
  },
});

/* ---------- 3.3.4.1e Gross structure of the human heart ---------- */
S({
  id: '3.3.4.1e', num: '3.3.4.1', sub: 'Gross structure of the human heart', title: 'Mass transport in animals', topic: '3.3', slot: [1, 5], dna: 'mark', ao: 1,
  covers: ['3.3.4.1.s8'],
  card: {
    text: 'The human heart has four chambers: two thin-walled <b>atria</b> receive blood; two <b>ventricles</b> pump it out. The <b>left ventricle</b> has a thicker muscular wall than the right, as it pumps blood at higher pressure round the whole body, while the right pumps only to the lungs. <b>Atrioventricular valves</b> (tricuspid on the right, bicuspid on the left) are held by <b>tendinous cords</b> and prevent backflow into the atria; <b>semilunar valves</b> at the base of the aorta and pulmonary artery prevent backflow into the ventricles. The <b>septum</b> keeps oxygenated and deoxygenated blood separate. The <b>coronary arteries</b> supply the heart muscle.',
    terms: ['atrium', 'ventricle', 'atrioventricular valve', 'semilunar valve', 'tendinous cords', 'septum', 'aorta', 'vena cava', 'pulmonary artery', 'pulmonary vein', 'coronary artery'],
    skill: 'AT j: dissection (RP5)', eq: null,
    q: 'Why is the left ventricle wall thicker than the right?', a: 'It must generate enough pressure to push blood to the whole body, whereas the right ventricle pumps only a short distance to the lungs.'
  },
  draw(R, sc) {
    R.text('the human heart (section, seen from the front)', 160, 14, 4.6, { al: 'c' });
    const K = 0.9, TX = 22, TY = -4, W = (x, y) => [TX + K * x, TY + K * y];
    R.push(TX, TY, 0, K);
    const outer = [60, 100, 78, 92, 108, 96, 122, 104, 134, 98, 168, 92, 196, 100, 204, 128, 206, 170, 196, 206, 164, 232, 130, 248, 100, 236, 70, 200, 58, 150];
    R.fill(outer, { ink: 'P', t: 0.28, smooth: true, wob: 0.4 });
    const RA = [66, 106, 80, 100, 106, 102, 114, 110, 114, 148, 70, 148, 64, 128], LA = [162, 104, 182, 98, 198, 108, 200, 130, 198, 148, 162, 148];
    const RV = [70, 156, 114, 156, 120, 178, 116, 214, 98, 230, 82, 208, 68, 178], LV = [142, 158, 190, 158, 192, 182, 184, 206, 162, 226, 142, 222];
    [[RA, false], [LA, true], [RV, false], [LV, true]].forEach(([pp, ox]) => { R.knock(pp, { smooth: true }); oxFill(R, pp, ox, { smooth: true }); R.poly(pp, { ink: 'B', w: 1 / K, smooth: true, wob: 0.3 }); });
    R.poly(outer, { ink: 'B', w: 1.6 / K, smooth: true, wob: 0.5 });
    // great vessels: pulmonary trunk (front), aorta (behind, arch to the right), vena cava, pulmonary veins
    const tubeV = (pts, ox, w) => oxStroke(R, pts, ox, w);
    tubeV([146, 158, 146, 108, 152, 70, 172, 52, 196, 58, 208, 84, 210, 108], true, 14);
    tubeV([124, 158, 124, 104, 122, 74, 104, 54, 82, 46], false, 12);
    tubeV([68, 22, 70, 60, 72, 104], false, 13);
    tubeV([236, 122, 200, 118], true, 8); tubeV([236, 138, 200, 136], true, 8);
    // AV valves (flaps) with tendinous cords and papillary muscles
    const flap = (x0, x1, y, depth) => { const m = (x0 + x1) / 2; R.line(x0, y, x1, y, { ink: 'B', w: 1.8, taper: 'none' }); R.stroke([x0, y, x0 + (m - x0) * 0.4, y + depth * 0.7, m, y + depth], { ink: 'B', w: 1.2, smooth: true, taper: 'start' }); R.stroke([x1, y, x1 - (x1 - m) * 0.4, y + depth * 0.7, m, y + depth], { ink: 'B', w: 1.2, smooth: true, taper: 'start' }); return m; };
    const m1 = flap(70, 114, 150, 20), m2 = flap(142, 190, 150, 22);
    [[m1, 170, 86, 212], [m1, 170, 104, 210], [m2 - 1, 172, 156, 214], [m2 + 1, 172, 176, 212]].forEach(([x0, y0, x1, y1]) => R.line(x0, y0, x1, y1, { ink: 'B', w: 0.6, taper: 'none' }));
    R.ellipse(86, 214, 4.4, 6.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.ellipse(104, 212, 4.4, 6.4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.ellipse(156, 216, 5, 7, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 }); R.ellipse(176, 214, 5, 7, { ink: 'B', w: 0.8, fi: 'P', ft: 0.7 });
    // semilunar valves (pockets) at the bases of the aorta and pulmonary artery
    R.stroke([140, 140, 146, 150, 152, 140], { ink: 'B', w: 1.2, smooth: true, taper: 'none' }); R.stroke([118, 140, 124, 150, 130, 140], { ink: 'B', w: 1.2, smooth: true, taper: 'none' });
    // coronary arteries over the surface
    R.stroke([152, 72, 168, 90, 176, 124, 196, 160, 190, 206], { ink: 'P', w: 1.8 / K, smooth: true, taper: 'end' }); R.stroke([150, 70, 130, 90, 116, 96, 90, 98, 62, 120], { ink: 'P', w: 1.8 / K, smooth: true, taper: 'end', t: 0.9 });
    R.pop();
    const lab = (t, tx, ty, x, y, al = 'l') => { const q = W(x, y); leader(R, t, q[0], q[1], tx, ty, { size: 4, al }); };
    lab('vena cava', 6, 18, 69, 40, 'l'); lab('right atrium', 6, 72, 66, 120, 'l'); lab('tricuspid valve', 6, 120, 82, 150, 'l'); lab('right ventricle', 6, 166, 76, 188, 'l'); lab('papillary muscle', 6, 206, 86, 214, 'l');
    lab('pulmonary artery', 6, 32, 104, 56, 'l'); lab('semilunar valves', 6, 224, 120, 142, 'l');
    lab('aorta', 238, 24, 190, 56, 'l'); lab('pulmonary vein', 232, 56, 236, 122, 'l'); lab('left atrium', 246, 90, 190, 124, 'l');
    lab('bicuspid valve', 244, 108, 190, 150, 'l'); lab('tendinous cords', 244, 130, 160, 176, 'l'); lab('left ventricle', 244, 152, 190, 190, 'l'); R.text('(thick wall)', 244, 158, 3.8, { al: 'l' });
    lab('septum', 244, 190, 130, 200, 'l'); lab('coronary artery', 244, 214, 196, 160, 'l');
  },
  anim(A, sc) {
    const p = A.ph(2.4); const sys = p > 0.4; const k = sys ? (p - 0.4) / 0.6 : p / 0.4;
    if (!sys) { A.dot(84, 96 + k * 26, 2.2, 'B', 0.7, 1); A.dot(150, 96 + k * 26, 2.2, 'P', 0.8, 2); } else { A.dot(88, 140 - k * 70, 2.4, 'B', 0.7, 3); A.dot(160, 140 - k * 90, 2.4, 'P', 0.8, 4); }
  },
});

/* ---------- 3.3.4.1f The cardiac cycle ---------- */
S({
  id: '3.3.4.1f', num: '3.3.4.1', sub: 'The cardiac cycle: pressure, volume and valve movements', title: 'Mass transport in animals', topic: '3.3', slot: [2, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.3.4.1.s9', '3.3.4.1.s10'],
  card: {
    text: 'In the <b>cardiac cycle</b> pressure and volume changes in the atria and ventricles open and close valves so blood flows in one direction. <b>Atrial systole</b>: atria contract, pressure rises above the ventricle, AV valves open and top up the ventricle. <b>Ventricular systole</b>: ventricles contract, pressure rises above the atria so the <b>AV valves close</b> (first sound); when ventricular pressure exceeds the artery the <b>semilunar valves open</b> and blood is ejected. <b>Diastole</b>: the ventricle relaxes, pressure falls below the artery, so the <b>semilunar valves close</b> (second sound); the atria fill, and when atrial pressure exceeds ventricular pressure the AV valves open again.',
    terms: ['cardiac cycle', 'atrial systole', 'ventricular systole', 'diastole', 'atrioventricular valve', 'semilunar valve', 'pressure', 'volume', 'unidirectional flow'],
    skill: 'MS 2.4 and 1.3: CO = SV × HR; read graphs', eq: MATH(mt('cardiac output '), mo('='), mt('stroke volume'), mo('×'), mt('heart rate')),
    eqn: 'e.g. 70 cm³ × 72 min⁻¹ = 5040 cm³ min⁻¹ ≈ 5.0 dm³ min⁻¹',
    q: 'Between which two points on the pressure graph does the semilunar valve open?', a: 'When the left ventricular pressure rises above the aortic pressure, until the ventricular pressure falls back below it.'
  },
  draw(R, sc) {
    R.text('left side of the heart: one cardiac cycle (about 0.8 s)', 332, 14, 4.8, { al: 'c' });
    // pressure traces
    const X0 = 44, XW = 380, YT = 28, YH = 108;
    const tx = t => X0 + t / 0.8 * XW;   // t in s over one cycle
    const py = v => YT + YH - v / 18 * YH; // kPa
    R.arrow([X0, YT + YH, X0 + XW + 6, YT + YH], { ink: 'B', w: 1, hs: 3 }); R.arrow([X0, YT + YH, X0, YT - 4], { ink: 'B', w: 1, hs: 3 });
    R.text('pressure / kPa', 18, YT + YH / 2, 4.2, { al: 'c', rot: -90 });
    [0, 5, 10, 15].forEach(v => { R.line(X0 - 1.5, py(v), X0 + 1.5, py(v), { ink: 'B', w: 0.6, taper: 'none' }); R.text(String(v), X0 - 4, py(v) + 1.4, 3.6, { al: 'r' }); });
    // phase shading: atrial systole 0-0.1, ventricular systole 0.1-0.4 (isovolumetric 0.1-0.13, ejection 0.13-0.4), diastole 0.4-0.8
    const shade = (a, b, ink, t) => R.fill([tx(a), YT, tx(b), YT, tx(b), YT + YH, tx(a), YT + YH], { ink, t, wob: 0.1 });
    shade(0, 0.1, 'Y', 0.18); shade(0.1, 0.4, 'P', 0.1); shade(0.4, 0.8, 'T', 0.1);
    // curves (qualitative, left side): pressure in kPa against time in s
    const draw = (pts, ink, w) => { const q = []; for (let i = 0; i < pts.length; i += 2) q.push(tx(pts[i]), py(pts[i + 1])); R.stroke(q, { ink, w, smooth: true, taper: 'none' }); };
    draw([0, 10.4, 0.06, 10.2, 0.13, 10, 0.16, 12.6, 0.2, 15.2, 0.24, 16, 0.3, 14.9, 0.355, 12.3, 0.372, 11.0, 0.388, 11.9, 0.45, 11.3, 0.6, 10.6, 0.8, 10.2], 'B', 1.4);
    draw([0, 0.9, 0.05, 1.5, 0.1, 1.7, 0.115, 5.2, 0.13, 10, 0.18, 14.4, 0.24, 16, 0.3, 14.6, 0.355, 10.8, 0.378, 6, 0.4, 2.6, 0.43, 1.1, 0.5, 0.8, 0.8, 0.9], 'P', 1.6);
    draw([0, 0.8, 0.03, 1.6, 0.08, 1.3, 0.1, 0.8, 0.12, 1.5, 0.2, 1.7, 0.3, 2.1, 0.38, 2.5, 0.41, 1.2, 0.46, 0.9, 0.8, 0.8], 'T', 1.4);
    R.text('aorta', tx(0.62), py(10.2), 4.2, { al: 'l', ink: 'B' }); R.text('left ventricle', tx(0.2), py(17.8), 4.2, { al: 'c', ink: 'P' }); R.text('left atrium', tx(0.55), py(2.7), 4.2, { al: 'l', ink: 'T' });
    // valve events
    const ev = (t, v, label, ink = 'B') => { R.dot(tx(t), py(v), 1.8, { ink }); };
    ev(0.1, 1.7); ev(0.13, 10); ev(0.372, 11); ev(0.43, 1.1);
    [[0.1, 'AV valve closes'], [0.13, 'semilunar valve opens'], [0.372, 'semilunar valve closes (dicrotic notch)'], [0.43, 'AV valve opens']].forEach(([t, s], i) => { const y = YT + YH + 8 + (i % 3) * 8; R.line(tx(t), YT + YH, tx(t), y - 4, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' }); R.text(s, tx(t) + (i === 2 ? -3 : 3), y + 2, 3.6, { al: i === 2 ? 'r' : 'l', ink: i % 2 ? 'P' : 'B' }); });
    [['atrial systole', 0.05], ['ventricular systole', 0.25], ['diastole', 0.6]].forEach(([t, u]) => R.text(t, tx(u), YT - 4, 4, { al: 'c' }));
    // volume curve
    const VY = 172, VH = 44, vy = v => VY + VH - (v - 50) / 90 * VH;
    R.arrow([X0, VY + VH, X0 + XW + 6, VY + VH], { ink: 'B', w: 1, hs: 3 }); R.arrow([X0, VY + VH, X0, VY - 4], { ink: 'B', w: 1, hs: 3 }); R.text('ventricle volume / cm^3', 18, VY + VH / 2, 3.8, { al: 'c', rot: -90 });
    const vq = []; [[0, 110], [0.04, 121], [0.1, 130], [0.13, 130], [0.24, 100], [0.355, 66], [0.4, 65], [0.45, 84], [0.55, 104], [0.8, 110]].forEach(([t, v]) => vq.push(tx(t), vy(v))); R.stroke(vq, { ink: 'P', w: 1.5, smooth: true, taper: 'none' });
    R.text('130', X0 - 4, vy(130) + 1.4, 3.6, { al: 'r' }); R.text('65', X0 - 4, vy(65) + 1.4, 3.6, { al: 'r' }); R.arrow([tx(0.5), vy(66), tx(0.5), vy(130)], { ink: 'T', w: 0.9, hs: 2.2, both: true }); R.text('stroke volume', tx(0.52), vy(98), 3.8, { al: 'l' });
    R.text('time / s', X0 + XW / 2, VY + VH + 10, 4, { al: 'c' }); [0, 0.2, 0.4, 0.6, 0.8].forEach(t => { R.line(tx(t), VY + VH - 1.4, tx(t), VY + VH + 1.4, { ink: 'B', w: 0.6, taper: 'none' }); R.text(String(t), tx(t), VY + VH + 6, 3.4, { al: 'c' }); });
    // events table
    R.line(448, 24, 448, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    const cols = [52, 48, 40, 48], hx = 458, rows = [['phase', 'pressures', 'AV valve', 'semilunar valve'], ['atrial systole', 'atrium > ventricle', 'open', 'shut'], ['ventricular systole: start', 'ventricle > atrium, but < aorta', 'shut', 'shut'], ['ventricular systole: ejection', 'ventricle > aorta', 'shut', 'open'], ['diastole', 'ventricle < aorta; atria fill', 'shut, then open', 'shut']];
    let ty = 30; rows.forEach((row, ri) => {
      const cells = row.map((t, ci) => wrapText(t, cols[ci] - 4, 3.5)); const h = Math.max(...cells.map(c => c.length)) * 5.2 + 5;
      if (ri === 0) R.fill([hx, ty, hx + 188, ty, hx + 188, ty + h, hx, ty + h], { ink: 'T', t: 0.35, wob: 0.15 });
      let cx = hx; cells.forEach((c, ci) => { c.forEach((ln, k) => R.text(ln, cx + 2, ty + 7 + k * 5.2, 3.5, { al: 'l', ink: ri && ci >= 2 ? (ln.indexOf('open') >= 0 ? 'T' : 'P') : 'B' })); cx += cols[ci]; });
      R.line(hx, ty + h, hx + 188, ty + h, { ink: 'B', w: 0.5, t: 0.7, taper: 'none' }); ty += h;
    });
    R.rect(hx, 30, 188, ty - 30, { ink: 'B', w: 0.9, wob: 0.2 });
    let cx2 = hx; for (let i = 0; i < 3; i++) { cx2 += cols[i]; R.line(cx2, 30, cx2, ty, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' }); }
    R.text('closed valves give one-way flow', 552, ty + 14, 4, { al: 'c' });
    R.text('first heart sound: AV valves shut', 552, ty + 28, 3.8, { al: 'c' }); R.text('second heart sound: semilunar shut', 552, ty + 35, 3.8, { al: 'c' });
    R.text('cardiac output = stroke volume × heart rate', 552, ty + 54, 4, { al: 'c', ink: 'P' });
    R.text('130 cm^3 − 65 cm^3 = 65 cm^3 stroke volume', 552, ty + 62, 3.7, { al: 'c' });
  },
  anim(A, sc) { const t = A.ph(4.8) * 0.8; A.dot(44 + t / 0.8 * 380, 28 + 108 - (t < 0.13 ? 1.5 + t * 60 : t < 0.36 ? 9 + 7 * Math.sin((t - 0.13) / 0.23 * PI * 0.8) : 1.2) / 18 * 108, 2.2, 'P', 0.95, 1); },
});
