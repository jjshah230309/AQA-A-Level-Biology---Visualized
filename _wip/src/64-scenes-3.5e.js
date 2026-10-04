/* ===================== 3.5.4 Nutrient cycles ===================== */
/* labelled cycle node */
function cyNode(R, x, y, w, h, t, ink, t2) { R.knock(R.rrectPts(x - w / 2, y - h / 2, w, h, 6)); R.rrect(x - w / 2, y - h / 2, w, h, 6, { ink: 'B', w: 1.1, fi: ink, ft: 0.22, wob: 0.2 }); R.text(t, x, y + (t2 ? -1 : 1.6), 4.1, { al: 'c' }); if (t2) R.text(t2, x, y + 5.4, 3.5, { al: 'c' }); }
function cyArrow(R, pts, label, lx, ly, ink = 'B', al = 'c') { R.arrow(pts, { ink, w: 1.3, hs: 4 }); if (label) label.split('|').forEach((t, i) => R.text(t, lx, ly + i * 5.4, 3.6, { al, ink: ink === 'P' ? 'P' : 'B' })); }

/* ---------- 3.5.4a The nitrogen cycle ---------- */
S({
  id: '3.5.4a', num: '3.5.4', sub: 'Nitrogen cycle: saprobiotic nutrition, ammonification, nitrification, nitrogen fixation, denitrification', title: 'Nutrient cycles', topic: '3.5', slot: [2, 5], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.5.4.s1', '3.5.4.s2', '3.5.4.s3', '3.5.4.s5'],
  card: {
    text: 'Nutrients are recycled in natural ecosystems, exemplified by the <b>nitrogen cycle</b>. Microorganisms play a vital role. <b>Saprobionts</b> feed on dead organisms and waste by <b>saprobiotic nutrition</b> (extracellular digestion), releasing nutrients. <b>Ammonification</b>: saprobionts decompose proteins and urea to ammonia (ammonium ions). <b>Nitrification</b>: nitrifying bacteria oxidise ammonium ions to nitrite then nitrate. <b>Nitrogen fixation</b>: bacteria convert atmospheric nitrogen to ammonia/ammonium (free-living or in root nodules of legumes). <b>Denitrification</b>: anaerobic denitrifying bacteria convert nitrate to nitrogen gas. Plants take up nitrate and make proteins. (Names of species are not required.)',
    terms: ['nitrogen cycle', 'saprobiont', 'saprobiotic nutrition', 'ammonification', 'nitrification', 'nitrogen fixation', 'denitrification', 'nitrate', 'ammonium ions', 'nitrite'],
    skill: 'Name the process from the change', eq: null,
    q: 'Which process converts ammonium ions to nitrate?', a: 'Nitrification (carried out by nitrifying bacteria, in two steps via nitrite).'
  },
  draw(R, sc) {
    R.text('the nitrogen cycle', 332, 14, 5.2, { al: 'c' });
    R.fill([8, 150, 656, 150, 656, 236, 8, 236], { ink: 'Y', t: 0.1, wob: 0.4 }); R.stroke([8, 150, 120, 148, 240, 152, 400, 148, 540, 151, 656, 149], { ink: 'B', w: 1, smooth: true, taper: 'none', wob: 0.6, t: 0.6 }); R.text('soil', 16, 160, 4, { al: 'l' });
    cyNode(R, 332, 34, 150, 20, 'nitrogen gas, N_2', 'T');
    cyNode(R, 150, 86, 112, 20, 'animal proteins', 'P'); cyNode(R, 514, 86, 112, 20, 'plant proteins', 'T');
    cyNode(R, 332, 120, 176, 20, 'dead organisms, waste, urea', 'Y');
    cyNode(R, 130, 196, 124, 22, 'ammonium, NH_4^+', 'P'); cyNode(R, 332, 196, 112, 22, 'nitrite, NO_2^-', 'Y'); cyNode(R, 534, 196, 112, 22, 'nitrate, NO_3^-', 'T');
    const ar = (pts, ink = 'B', w = 1.4) => R.arrow(pts, { ink, w, hs: 4.4 });
    ar([450, 72, 218, 72]); R.text('eaten by animals', 332, 68, 3.8, { al: 'c' });
    ar([488, 98, 410, 110]); ar([176, 98, 252, 110]); R.text('death', 224, 100, 3.6, { al: 'c' }); R.text('death, waste', 450, 106, 3.6, { al: 'c' });
    ar([300, 132, 164, 184], 'P'); R.text('ammonification', 200, 150, 3.9, { al: 'c', ink: 'P' }); R.text('(saprobionts)', 200, 157, 3.5, { al: 'c' });
    ar([194, 196, 274, 196], 'P'); ar([390, 196, 476, 196], 'P'); R.text('nitrification', 234, 184, 3.9, { al: 'c', ink: 'P' }); R.text('(nitrifying bacteria)', 234, 176, 3.4, { al: 'c' }); R.text('nitrification', 434, 184, 3.9, { al: 'c', ink: 'P' }); R.text('(nitrifying bacteria)', 434, 176, 3.4, { al: 'c' });
    ar([534, 184, 534, 98]); R.text('absorbed', 548, 140, 3.8, { al: 'l' }); R.text('by roots', 548, 146, 3.8, { al: 'l' });
    // outer arcs
    R.arrow([594, 196, 636, 150, 640, 100, 600, 50, 560, 38, 412, 34], { ink: 'P', w: 1.4, hs: 4.4, smooth: true }); R.text('denitrification', 636, 120, 3.9, { al: 'r', ink: 'P' }); R.text('(anaerobic', 636, 127, 3.4, { al: 'r' }); R.text('bacteria)', 636, 133, 3.4, { al: 'r' });
    R.arrow([256, 34, 80, 38, 26, 70, 22, 130, 52, 178, 66, 190], { ink: 'P', w: 1.4, hs: 4.4, smooth: true }); R.text('nitrogen fixation', 30, 106, 3.9, { al: 'l', ink: 'P' }); R.text('(bacteria, e.g. in', 30, 113, 3.4, { al: 'l' }); R.text('legume root nodules)', 30, 119, 3.4, { al: 'l' });
    R.text('all inorganic forms: ammonium, nitrite and nitrate', 332, 236, 3.6, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(8); for (let i = 0; i < 3; i++) { const u = (p + i / 3) % 1; A.dot(194 + u * 80, 196, 1.5, 'P', 0.8, i); A.dot(390 + u * 86, 196, 1.5, 'P', 0.8, 5 + i); A.dot(534, 184 - u * 86, 1.5, 'T', 0.8, 9 + i); } },
});

/* ---------- 3.5.4b Phosphorus cycle, mycorrhizae, fertilisers, eutrophication ---------- */
S({
  id: '3.5.4b', num: '3.5.4', sub: 'Phosphorus cycle; mycorrhizae; fertilisers, leaching and eutrophication', title: 'Nutrient cycles', topic: '3.5', slot: [0, 6], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.5.4.s4', '3.5.4.s6', '3.5.4.s7', '3.5.4.s8', '3.5.4.s9'],
  card: {
    text: 'In the <b>phosphorus cycle</b> phosphate ions in rocks and soil are taken up by plants and passed to animals; <b>saprobionts</b> decompose dead material and release phosphate ions; phosphate may be lost to sediments. <b>Mycorrhizae</b> (a symbiosis between fungi and plant roots) increase the surface area of the root system, helping the plant take up water and inorganic ions (phosphate) from the soil; the fungus receives organic compounds. <b>Fertilisers</b> (natural, e.g. manure, or artificial) replace nitrates and phosphates lost when crops are harvested and livestock removed. Excess fertiliser <b>leaches</b> into water, causing <b>eutrophication</b>: algal bloom, light blocked, plants die, saprobionts multiply and use up oxygen, fish die.',
    terms: ['phosphorus cycle', 'phosphate ions', 'mycorrhiza', 'saprobiont', 'natural fertiliser', 'artificial fertiliser', 'leaching', 'eutrophication', 'algal bloom'],
    skill: 'Chain of reasoning', eq: null,
    q: 'Describe how eutrophication reduces the oxygen concentration in a lake.', a: 'Nutrients cause an algal bloom; light is blocked so plants die; saprobionts decomposing them multiply, using up oxygen in respiration.'
  },
  draw(R, sc) {
    R.text('phosphorus cycle', 120, 14, 4.8, { al: 'c' });
    R.fill([8, 150, 238, 150, 238, 236, 8, 236], { ink: 'Y', t: 0.12, wob: 0.4 });
    cyNode(R, 42, 206, 60, 20, 'rocks', 'B'); cyNode(R, 156, 206, 128, 20, 'phosphate ions in soil', 'T');
    cyNode(R, 46, 62, 66, 20, 'plants', 'T'); cyNode(R, 196, 62, 70, 20, 'animals', 'P'); cyNode(R, 150, 120, 120, 22, 'dead organisms', 'Y', 'and waste');
    const ar = (pts, ink = 'B') => R.arrow(pts, { ink, w: 1.3, hs: 4 });
    ar([74, 206, 90, 206]); R.text('weathering', 42, 186, 3.7, { al: 'c' });
    ar([108, 196, 56, 74]); R.text('absorbed by roots', 66, 136, 3.7, { al: 'c' });
    ar([84, 56, 158, 56]); R.text('eaten', 120, 50, 3.6, { al: 'c' });
    ar([64, 74, 106, 108]); ar([190, 74, 172, 108]); R.text('death', 74, 98, 3.4, { al: 'l' });
    ar([150, 133, 156, 194], 'P'); R.text('saprobionts', 190, 160, 3.8, { al: 'c', ink: 'P' }); R.text('decompose', 190, 167, 3.8, { al: 'c', ink: 'P' }); R.text('release phosphate', 190, 174, 3.4, { al: 'c' });
    R.line(244, 22, 244, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // mycorrhiza
    R.text('mycorrhizae', 328, 14, 4.8, { al: 'c' });
    R.fill([252, 70, 408, 70, 408, 150, 252, 150], { ink: 'Y', t: 0.14, wob: 0.3 });
    R.stroke([330, 40, 330, 96], { ink: 'T', w: 7, t: 0.7, taper: 'none', solid: false }); R.stroke([326, 40, 326, 96], { ink: 'B', w: 0.8, taper: 'none' }); R.stroke([334, 40, 334, 96], { ink: 'B', w: 0.8, taper: 'none' });
    [[-34, 20], [-14, 34], [8, 36], [30, 24]].forEach(([dx, dy]) => { R.stroke([330, 94, 330 + dx * 0.6, 94 + dy * 0.7, 330 + dx, 94 + dy], { ink: 'B', w: 1.6, smooth: true, taper: 'end' }); for (let k = 0; k < 7; k++) { const a = -0.8 + k * 0.5, px = 330 + dx * (0.4 + 0.1 * k), py = 94 + dy * (0.4 + 0.1 * k); R.stroke([px, py, px + Math.cos(a) * 14, py + Math.sin(a) * 14 + 4, px + Math.cos(a) * 24, py + Math.sin(a) * 22 + 10], { ink: 'P', w: 0.7, smooth: true, taper: 'end' }); } });
    R.text('fungal hyphae', 380, 148, 3.8, { al: 'c', ink: 'P' }); R.text('plant root', 372, 60, 3.8, { al: 'l' });
    R.text('hyphae increase the surface', 330, 168, 3.8, { al: 'c' }); R.text('area for absorbing water', 330, 175, 3.8, { al: 'c' }); R.text('and inorganic ions', 330, 182, 3.8, { al: 'c' });
    R.text('fungus receives organic', 330, 196, 3.8, { al: 'c' }); R.text('compounds from the plant', 330, 203, 3.8, { al: 'c' });
    R.line(420, 22, 420, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // fertilisers + eutrophication
    R.text('fertilisers and eutrophication', 536, 14, 4.8, { al: 'c' });
    const steps = [['1 fertiliser used on fields', 'to replace nitrate/phosphate lost in harvest'], ['2 excess leaches into rivers and lakes', ''], ['3 algal bloom on the surface', 'blocks light'], ['4 submerged plants die', 'saprobionts multiply, using up O_2'], ['5 aerobic organisms (fish) die', '']];
    steps.forEach(([a, b], i) => { const y = 36 + i * 28; R.rrect(432, y - 9, 208, 22, 6, { ink: 'B', w: 1, fi: ['Y', 'T', 'TY', 'P', 'P'][i], ft: 0.2, wob: 0.15 }); R.text(a, 536, y + (b ? 0 : 3.4), 4, { al: 'c' }); if (b) R.text(b, 536, y + 8, 3.5, { al: 'c' }); if (i < 4) R.arrow([536, y + 13, 536, y + 18], { ink: 'B', w: 1, hs: 2.4 }); });
    R.text('natural (manure) or artificial', 536, 190, 3.8, { al: 'c' }); R.text('fertilisers replace nutrients lost', 536, 197, 3.8, { al: 'c' }); R.text('when plants and livestock are removed', 536, 204, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(6); A.dot(118, 196 - p * 124, 1.6, 'T', 0.8, 1); for (let i = 0; i < 3; i++) A.dot(330 - 20 + i * 20 + (p * 6) % 6, 140 - ((p + i / 3) % 1) * 40, 1.1, 'P', 0.7, 2 + i); },
});
