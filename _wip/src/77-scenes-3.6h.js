/* ===================== 3.6.4.1 Principles of homeostasis and negative feedback ===================== */
const TEMP_F = x => 37 + 0.45 * Math.sin(x * 1.5 + 0.6);
S({
  id: '3.6.4.1', num: '3.6.4.1', sub: 'Principles of homeostasis and negative feedback', title: 'Principles of homeostasis and negative feedback', topic: '3.6', slot: [0, 7], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.6.4.1.s1', '3.6.4.1.s2', '3.6.4.1.s3', '3.6.4.1.s4', '3.6.4.1.s5', '3.6.4.1.s6'],
  card: {
    text: '<b>Homeostasis</b> is the maintenance of a stable internal environment within restricted limits by physiological control systems. A stable <b>core temperature</b> and <b>blood pH</b> matter because they affect <b>enzyme</b> activity (too hot or too far from the optimum pH and enzymes are <b>denatured</b>; too cold and reactions are slow). A stable <b>blood glucose</b> concentration matters because glucose is the <b>respiratory substrate</b> and because it affects the <b>water potential</b> of the blood. <b>Negative feedback</b> (receptor → communication by nervous or hormonal system → effector) <b>restores</b> a system to its original level. Having <b>separate mechanisms</b> for departures in each direction gives greater control. <b>Positive feedback</b> amplifies a change away from the original level, so it is not part of homeostasis (e.g. platelets activating more platelets).',
    terms: ['homeostasis', 'negative feedback', 'positive feedback', 'receptor', 'effector', 'core temperature', 'blood pH', 'enzyme activity', 'water potential', 'respiratory substrate'],
    skill: 'MS 0.5: pH is a log scale; each pH unit is a tenfold change in [H⁺]', eq: MATH(mt('pH '), mo('='), mo('−'), msub(mt('log'), mn(10)), mo('['), msup(mr('H'), mo('+')), mo(']')),
    q: 'Why does having two separate negative feedback mechanisms give better control than one?', a: 'One mechanism can only be switched on or off, so the level can be corrected in one direction only; two opposing mechanisms can actively raise or lower the level, giving faster and finer control.'
  },
  draw(R, sc) {
    const box = (x, y, w, h, lines, fi, ft = 0.14) => { R.rrect(x, y, w, h, 4, { ink: 'B', w: 0.9, fi, ft, wob: 0.3 }); lines.forEach((t, i) => R.text(t, x + w / 2, y + h / 2 + 1.3 - (lines.length - 1) * 3.2 + i * 6.4, 3.6, { al: 'c' })); };
    // ---- A: negative feedback loop ----
    R.text('negative feedback', 111, 14, 4.8, { al: 'c' });
    box(12, 26, 88, 26, ['level departs', 'from normal'], 'Y'); box(120, 26, 88, 26, ['receptors detect', 'the change'], 'T');
    box(120, 90, 88, 26, ['communication:', 'nervous or hormonal'], 'B', 0.1); box(12, 90, 88, 26, ['effectors respond', 'to oppose it'], 'P');
    R.arrow([101, 39, 119, 39], { ink: 'B', w: 1, hs: 2.6 }); R.arrow([164, 53, 164, 89], { ink: 'B', w: 1, hs: 2.6 });
    R.arrow([119, 103, 101, 103], { ink: 'B', w: 1, hs: 2.6 }); R.arrow([56, 89, 56, 53], { ink: 'B', w: 1, hs: 2.6 });
    R.text('level brought back', 110, 67, 3.8, { al: 'c', ink: 'P' }); R.text('towards normal', 110, 73.5, 3.8, { al: 'c', ink: 'P' });
    // positive feedback (not homeostasis)
    R.line(12, 124, 208, 124, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('positive feedback: amplifies the change', 111, 133, 4, { al: 'c', ink: 'P' });
    const gp = R.graph(26, 144, 82, 70, { xmin: 0, xmax: 1, ymin: 0, ymax: 1, xl: 'time', yl: 'level', fs: 3.4, xly: 9, ylx: 4 }).axes();
    gp.hline(0.35, { dash: true, t: 0.7 }); gp.label('normal', 0.5, 0.35, { dy: 6, size: 3.2 });
    gp.curve(x => x < 0.3 ? 0.35 + 0.03 * Math.sin(x * 40) : 0.35 + 0.65 * (Math.exp(5 * (x - 0.3)) - 1) / (Math.exp(3.5) - 1), { ink: 'P', w: 1.5, n: 50 });
    ['e.g. blood clotting:', 'activated platelets', 'release a chemical that', 'activates more platelets', '', 'e.g. hypothermia:', 'shivering stops as', 'temperature falls'].forEach((t, i) => { if (t) R.text(t, 120, 150 + i * 6, 3.4, { al: 'l', ink: i === 0 || i === 5 ? 'P' : 'B' }); });
    R.line(220, 14, 220, 230, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // ---- B: temperature trace and two mechanisms ----
    R.text('body temperature: kept within about 0.5 °C of 37 °C', 330, 14, 4.2, { al: 'c' });
    const g = R.graph(258, 30, 168, 84, { xmin: 0, xmax: 10, ymin: 36.2, ymax: 37.8, xl: 'time', yl: 'temperature / °C', yt: [[37, '37']], fs: 3.8, xly: 10, ylx: 17 }).axes();
    R.rect(g.x, g.Y(37.5), g.w, g.Y(36.5) - g.Y(37.5), { ink: 'T', w: 0, fi: 'T', ft: 0.1, wob: 0.1 });
    g.hline(37, { dash: true, t: 0.8 }); g.curve(TEMP_F, { ink: 'P', w: 1.6, n: 70 });
        R.arrow([g.X(4.84) + 4, g.Y(37.4), g.X(5.55), g.Y(37.12)], { ink: 'B', w: 0.8, hs: 2.2 }); R.text('too high:', g.X(4.84) - 2, g.Y(37.55) - 5.5, 3.5, { al: 'c' }); R.text('effectors lower it', g.X(4.84) + 1, g.Y(37.55), 3.5, { al: 'c', ink: 'P' });
    R.arrow([g.X(6.93) + 3, g.Y(36.62), g.X(7.55), g.Y(36.92)], { ink: 'B', w: 0.8, hs: 2.2 }); R.text('too low:', g.X(6.93) - 6, g.Y(36.42) + 1, 3.5, { al: 'c' }); R.text('effectors raise it', g.X(6.93) + 2, g.Y(36.42) + 6.5, 3.5, { al: 'c', ink: 'T' });
    R.line(232, 132, 436, 132, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('separate mechanisms for each direction', 334, 142, 4.1, { al: 'c' });
    R.rrect(250, 150, 18, 78, 5, { ink: 'B', w: 0.9, fi: 'T', ft: 0.08, wob: 0.3 }); R.line(246, 189, 272, 189, { ink: 'B', w: 1.4, taper: 'none' }); R.text('normal', 244, 191, 3.4, { al: 'r' });
    R.arrow([282, 156, 282, 183], { ink: 'P', w: 1.6, hs: 3.6 }); R.arrow([282, 226, 282, 195], { ink: 'T', w: 1.6, hs: 3.6 });
    ['mechanism that', 'decreases the level'].forEach((t, i) => R.text(t, 290, 164 + i * 6.4, 3.8, { al: 'l', ink: 'P' })); ['mechanism that', 'increases the level'].forEach((t, i) => R.text(t, 290, 208 + i * 6.4, 3.8, { al: 'l', ink: 'T' }));
    ['two opposing mechanisms:', 'level can be pushed back', 'actively from either side', 'greater control'].forEach((t, i) => R.text(t, 366, 164 + i * 6.6, 3.6, { al: 'l', ink: i === 3 ? 'P' : 'B' }));
    ['one mechanism only:', 'can only be switched', 'on or off: slower', 'response, less control'].forEach((t, i) => R.text(t, 366, 202 + i * 6.6, 3.6, { al: 'l' }));
    R.line(444, 14, 444, 230, { ink: 'B', w: 0.4, t: 0.5, taper: 'none' });
    // ---- C: why it matters ----
    R.text('why a stable internal environment matters', 550, 14, 4.2, { al: 'c' });
    const gt = R.graph(468, 34, 70, 48, { xmin: 0, xmax: 60, ymin: 0, ymax: 1.05, xl: 'temperature / °C', yl: 'enzyme rate', xt: [[37, '37']], fs: 3.6, xly: 14, ylx: 4 }).axes();
    gt.curve(T => Math.exp(-Math.pow((T - 38) / (T < 38 ? 14 : 4.5), 2)), { ink: 'P', w: 1.4, n: 60 }); gt.vdrop(38, 1, { t: 0.7 });
    R.text('denatured', gt.X(52), gt.Y(0.62), 3.3, { al: 'c' });
    const gh = R.graph(572, 34, 70, 48, { xmin: 2, xmax: 12, ymin: 0, ymax: 1.05, xl: 'pH', yl: 'enzyme rate', xt: [[7.4, '7.4']], fs: 3.6, xly: 14, ylx: 4 }).axes();
    gh.curve(p => Math.exp(-Math.pow((p - 7.4) / 1.5, 2)), { ink: 'P', w: 1.4, n: 60 }); gh.vdrop(7.4, 1, { t: 0.7 });
        R.text('too hot / wrong pH: bonds that hold the', 550, 104, 3.5, { al: 'c' }); R.text('enzyme shape break: active site changes', 550, 110, 3.5, { al: 'c' });
    R.line(450, 115, 654, 115, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    const blood = (x, n, y) => {
      R.rrect(x, 128, 94, 22, 4, { ink: 'B', w: 0.8, fi: 'P', ft: 0.12, wob: 0.3 });
      for (let i = 0; i < n; i++) glucTok(R, x + 8 + (i % 7) * 12.5, 134 + Math.floor(i / 7) * 10, 3.4);
    };
    R.text('blood glucose too high', 501, 124, 3.8, { al: 'c' }); R.text('blood glucose too low', 605, 124, 3.8, { al: 'c' });
    blood(454, 12); blood(558, 2);
    // cell, shrunk (left) and with few resources (right)
    const shr = [501, 176, 16, 11];
    R.ellipse(shr[0], shr[1], shr[2], shr[3], { ink: 'B', w: 1.2, fi: 'T', ft: 0.12, wob: 0.8 });
    R.circle(shr[0] - 3, shr[1], 4, { ink: 'B', w: 0.8, fi: 'B', ft: 0.4 });
    [-8, 0, 8].forEach(dx => R.drop(501 + dx * 1.6, 158, 2.8, { label: false, ft: 0.6 })); R.arrow([492, 160, 492, 150], { ink: 'T', w: 1, hs: 2.4 }); R.arrow([510, 160, 510, 150], { ink: 'T', w: 1, hs: 2.4 });
    ['water potential of blood falls:', 'water leaves the cells by osmosis'].forEach((t, i) => R.text(t, 501, 202 + i * 6.2, 3.4, { al: 'c' })); R.text('cells shrivel', 501, 219, 3.5, { al: 'c', ink: 'P' });
    R.circle(605, 176, 18, { ink: 'B', w: 1.2, fi: 'T', ft: 0.12, wob: 0.5 });
    R.mito(598, 180, 18, 8, 0); R.circle(612, 168, 3.6, { ink: 'B', w: 0.8, fi: 'B', ft: 0.4 });
    ['not enough respiratory substrate', 'for respiration: little ATP'].forEach((t, i) => R.text(t, 605, 202 + i * 6.2, 3.4, { al: 'c' })); R.text('cells cannot function', 605, 219, 3.5, { al: 'c', ink: 'P' });
  },
  anim(A, sc) {
    const p = A.ph(6), seg = Math.floor(p * 4), u = p * 4 - seg, P = [[100, 39, 120, 39], [164, 52, 164, 90], [120, 103, 100, 103], [56, 90, 56, 52]][seg];
    A.dot(P[0] + (P[2] - P[0]) * u, P[1] + (P[3] - P[1]) * u, 1.9, seg % 2 ? 'P' : 'Y', 0.95, 1);
    const x = p * 10; A.dot(258 + x * 16.8, 30 + 84 - (TEMP_F(x) - 36.2) / 1.6 * 84, 2.1, 'B', 0.9, 2);
  },
});
