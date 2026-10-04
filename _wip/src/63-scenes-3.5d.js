/* ===================== RP9; 3.5.3 Energy and ecosystems; 3.5.4 Nutrient cycles ===================== */
rpScene({
  id: 'RP9', num: '3.5.2', rp: 9, title: 'Respiration', sub: 'Required practical 9: effect of a named variable on the rate of respiration of single-celled organisms', topic: '3.5', slot: [0, 4],
  covers: ['RP9'], at: ['b', 'i'], ms: ['MS 3.1', 'MS 1.3', 'MS 0.2'], ps: ['PS 2.3', 'PS 3.1'],
  card: {
    text: 'Investigate the effect of a named variable on the rate of respiration of a culture of single-celled organisms. The AQA handbook’s example uses yeast and glucose at different temperatures with <b>methylene blue</b>: as yeast respires, electrons taken up by methylene blue turn it from blue to colourless. Time how long decolourisation takes at each temperature (35 °C water bath; sample results 20 °C: 275 s, 35 °C: 128 s, 45 °C: 145 s). Rate is 1 ÷ time. Rates can also be measured with a respirometer (oxygen uptake or CO₂ production). Schools may use other variables and organisms.',
    terms: ['yeast', 'respiration', 'methylene blue', 'redox indicator', 'temperature', 'rate', 'respirometer', 'single-celled organism'],
    skill: 'MS 3.1: rate = 1 ÷ time', eq: MATH(mt('rate '), mo('='), mfrac(mn('1'), mt('time')), mt(' = 1 ÷ 128 s = 0.0078 s'), msup(mrow(), mo('−')), mt('1')),
    eqn: '20 °C: 1 ÷ 275 = 0.0036 s⁻¹; 35 °C: 0.0078 s⁻¹; 45 °C: 0.0069 s⁻¹',
    q: 'Why does the rate fall at the highest temperature?', a: 'Enzymes in respiration begin to denature, so the rate of respiration falls.'
  },
  apparatus(R, b) {
    R.text('yeast + glucose + methylene blue: blue → colourless', 92, 21, 4.2, { al: 'c' });
    R.waterBath(12, 60, 112, 58, { heat: true });
    [0, 1, 2, 3, 4].forEach(i => { const x = 28 + i * 20; R.tube(x, 36, 11, 64, { level: 0.6, ink: i < 2 ? 'B' : 'Y', t: i < 2 ? 0.35 : 0.3 }); R.text(String(i + 1), x, 32, 3.8, { al: 'c' }); });
    R.thermometer(138, 52, 40, { level: 0.6 }); R.text('35 °C', 138, 100, 3.8, { al: 'c' });
    R.stopwatch(150, 126, 7, { ang: 1.2 }); R.text('time to colourless', 100, 134, 3.8, { al: 'c' });
    R.text('blue', 28, 112, 3.5, { al: 'c', ink: 'B' }); R.text('colourless', 88, 112, 3.5, { al: 'c' });
    for (let i = 0; i < 4; i++) R.circle(32 + (i % 2) * 6, 78 + i * 6, 1.2, { ink: 'B', w: 0.5, fi: 'T', ft: 0.7 });
  },
  results(R, b) {
    const g = R.graph(b.x + 20, b.y + 8, 92, 82, { xmin: 10, xmax: 55, ymin: 0, ymax: 10, xl: 'temperature / °C', yl: 'rate / 10^{-3} s^{-1}', xt: [[20, '20'], [35, '35'], [45, '45']], yt: [[0, '0'], [5, '5'], [10, '10']], fs: 3.6, xly: 12, ylx: 12 }).axes();
    const pts = [20, 1000 / 275, 35, 1000 / 128, 45, 1000 / 145];
    g.curve([10, 1.6, 20, 3.64, 30, 6.4, 35, 7.8, 40, 7.6, 45, 6.9, 52, 3.2], { ink: 'P', w: 1.4 }); g.dots(pts, { ink: 'B', r: 1.9 });
    R.text('45 °C: enzymes begin to denature', b.x + 112, b.y + 102, 3.4, { al: 'r' });
  },
  vars: { iv: 'temperature of the water bath', dv: 'time for methylene blue to decolourise', ctl: ['volume of yeast and indicator', 'concentration of glucose and yeast', 'shaking time'] },
  calc: ['rate = 1 ÷ time', '35 °C: 1 ÷ 128 s = 0.0078 s^-1', '20 °C: 1 ÷ 275 s = 0.0036 s^-1', '35 °C is 2.2 × faster'],
  risks: [['hot', 'hot water: scald risk'], ['goggles', 'methylene blue stains'], ['bio', 'wash hands; yeast is low-risk']],
  limits: ['end point of colour change is subjective', 'yeast activity varies by batch', 'temperature drifts in a beaker'],
  interp: 'faster decolourising = faster respiration; the rate rises then falls',
  anim(A, sc) { const p = A.ph(6); for (let i = 0; i < 3; i++) A.dot(33 + ((i * 20) % 80), 90 - ((p + i / 3) % 1) * 16, 1, 'T', 0.7, i); },
});

/* ---------- 3.5.3a Energy flow: GPP, NPP, N ---------- */
S({
  id: '3.5.3a', num: '3.5.3', sub: 'Primary production and the chemical energy store in biomass: GPP, NPP and R', title: 'Energy and ecosystems', topic: '3.5', slot: [1, 4], span: [2, 1], dna: 'mark', ao: 2,
  covers: ['3.5.3.s1', '3.5.3.s2', '3.5.3.s3', '3.5.3.s4', '3.5.3.s5'],
  card: {
    text: 'In any ecosystem, plants synthesise organic compounds from atmospheric or aquatic carbon dioxide. Most of the sugars are used by the plant as <b>respiratory substrates</b>; the rest make other biological molecules that form the plant’s <b>biomass</b>. Biomass can be measured as mass of carbon or <b>dry mass</b> of tissue per given area; the chemical energy store in dry biomass can be estimated by <b>calorimetry</b>. <b>Gross primary production (GPP)</b> is the chemical energy store in plant biomass in a given area or volume. <b>Net primary production (NPP)</b> is that store after <b>respiratory losses (R)</b>: <b>NPP = GPP − R</b>. NPP is available for plant growth and reproduction and to other trophic levels (herbivores, decomposers). Productivity is the rate of production, e.g. kJ ha⁻¹ year⁻¹.',
    terms: ['biomass', 'dry mass', 'calorimetry', 'gross primary production', 'net primary production', 'respiratory losses', 'productivity', 'trophic level'],
    skill: 'MS 2.4: NPP = GPP − R', eq: MATH(mt('NPP '), mo('='), mt('GPP'), mo('−'), mi('R')),
    eqn: 'GPP 28 000 kJ m⁻² year⁻¹, R 11 000 → NPP = 17 000 kJ m⁻² year⁻¹',
    q: 'A field has GPP of 4800 kJ m⁻² year⁻¹ and plant respiration of 2100. What is NPP?', a: '4800 − 2100 = 2700 kJ m⁻² year⁻¹.'
  },
  draw(R, sc) {
    R.text('what happens to the energy a plant captures', 332, 14, 5, { al: 'c' });
    // sun -> plant -> GPP split into R and NPP; NPP to growth, herbivores, decomposers
    R.circle(40, 54, 14, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.7 }); for (let i = 0; i < 10; i++) { const a = i * TAU / 10; R.line(40 + Math.cos(a) * 18, 54 + Math.sin(a) * 18, 40 + Math.cos(a) * 25, 54 + Math.sin(a) * 25, { ink: 'Y', w: 1.3, taper: 'none' }); }
    R.arrow([70, 54, 108, 70], { ink: 'Y', w: 1.5, hs: 3.4 });
    plantDraw(R, 130, 130, 62, { sw: 5, roots: false });
    R.text('plant: photosynthesis', 130, 144, 3.9, { al: 'c' });
    // GPP bar splitting into R + NPP
    const bx = 196, by = 60, bw = 292, bh = 34;
    R.rect(bx, by, bw, bh, { ink: 'B', w: 1.2, fi: 'T', ft: 0.25, wob: 0.15 }); R.text('GPP: chemical energy store in plant biomass produced (28 000 kJ m^-2 year^-1)', bx + bw / 2, by + 14, 4.4, { al: 'c' }); R.text('gross primary production', bx + bw / 2, by + 26, 3.9, { al: 'c' });
    R.arrow([bx + bw / 2, by + bh + 2, bx + bw * 0.2, by + bh + 22], { ink: 'P', w: 1.1, hs: 3 }); R.arrow([bx + bw / 2, by + bh + 2, bx + bw * 0.74, by + bh + 22], { ink: 'B', w: 1.1, hs: 3 });
    R.rect(bx, by + bh + 24, bw * 0.4, 30, { ink: 'B', w: 1.2, fi: 'P', ft: 0.3, wob: 0.15 }); R.text('R: respiratory losses', bx + bw * 0.2, by + bh + 40, 4, { al: 'c' }); R.text('11 000 (as heat to surroundings)', bx + bw * 0.2, by + bh + 48, 3.4, { al: 'c' });
    R.rect(bx + bw * 0.42, by + bh + 24, bw * 0.58, 30, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.4, wob: 0.15 }); R.text('NPP = GPP − R = 17 000', bx + bw * 0.71, by + bh + 40, 4.4, { al: 'c' }); R.text('net primary production', bx + bw * 0.71, by + bh + 48, 3.6, { al: 'c' });
    // fate of NPP
    const fy = by + bh + 84;
    R.text('NPP is available for:', bx + bw * 0.71, fy - 4, 4, { al: 'c' });
    [['plant growth and reproduction', 'T'], ['herbivores (consumers)', 'P'], ['decomposers', 'Y']].forEach(([t, ink], i) => { const x = bx + 50 + i * 98; R.rrect(x - 44, fy + 2, 88, 20, 7, { ink: 'B', w: 1, fi: ink, ft: 0.2, wob: 0.15 }); wrapText(t, 80, 3.5).forEach((ln, k, arr) => R.text(ln, x, fy + 12 + k * 5 - (arr.length - 1) * 2.5 + 1.4, 3.5, { al: 'c' })); });
    // right: measuring biomass
    R.line(500, 22, 500, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('measuring biomass', 580, 28, 4.6, { al: 'c' });
    R.rect(540, 44, 32, 26, { ink: 'B', w: 1, fi: 'T', ft: 0.2 }); R.text('fresh', 556, 82, 3.6, { al: 'c' }); R.arrow([576, 56, 590, 56], { ink: 'B', w: 1, hs: 2.4 }); R.text('dry in oven', 583, 48, 3.4, { al: 'c' }); R.rect(594, 50, 26, 12, { ink: 'B', w: 1, fi: 'Y', ft: 0.4 }); R.text('dry mass', 607, 82, 3.6, { al: 'c' });
    R.text('mass of carbon, or dry mass', 580, 100, 3.8, { al: 'c' }); R.text('per given area', 580, 107, 3.8, { al: 'c' });
    R.rrect(548, 116, 64, 36, 5, { ink: 'B', w: 1.1, fi: 'P', ft: 0.12, wob: 0.2 }); R.fill([556, 138, 604, 138, 604, 146, 556, 146], { ink: 'T', t: 0.5, wob: 0.1 }); R.fill([574, 122, 586, 122, 584, 136, 576, 136], { ink: 'Y', t: 0.8, wob: 0.1 }); R.stroke([580, 140, 584, 130, 580, 124], { ink: 'P', w: 1.4, smooth: true, taper: 'end' });
    R.text('calorimetry: burn dry', 580, 164, 3.7, { al: 'c' }); R.text('biomass to estimate its', 580, 171, 3.7, { al: 'c' }); R.text('chemical energy store', 580, 178, 3.7, { al: 'c' });
    R.text('productivity = rate of production', 580, 198, 3.8, { al: 'c', ink: 'P' }); R.text('e.g. kJ ha^-1 year^-1', 580, 206, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.photon(72 + p * 30, 56 + p * 12, 0.4, 8, 1); A.dot(244 + (p % 1) * 0, 108 + p * 14, 1.6, 'P', 0.8, 2); },
});

/* ---------- 3.5.3b Consumers: net production, efficiency, farming ---------- */
S({
  id: '3.5.3b', num: '3.5.3', sub: 'Net production of consumers, efficiency of transfer, farming practices', title: 'Energy and ecosystems', topic: '3.5', slot: [3, 4], dna: 'mark', ao: 3,
  covers: ['3.5.3.s6', '3.5.3.s7', '3.5.3.s8'],
  card: {
    text: 'The <b>net production of consumers</b> (N) is <b>N = I − (F + R)</b>, where I is the chemical energy store in ingested food, F the energy lost in <b>faeces and urine</b> and R the <b>respiratory losses</b>. Primary and secondary productivity are the rates of primary or secondary production (e.g. kJ ha⁻¹ year⁻¹). Energy transfer between trophic levels is not 100 % efficient: <b>efficiency = (energy transferred ÷ energy available) × 100</b>. Farming practices increase the efficiency of transfer by <b>simplifying food webs</b> (reducing energy losses to non-human food chains, e.g. by removing pests and weeds) and by <b>reducing respiratory losses</b> within a human food chain (e.g. restricting livestock movement and keeping them warm).',
    terms: ['net production', 'ingested food', 'faeces and urine', 'respiratory losses', 'efficiency of energy transfer', 'trophic level', 'food web', 'farming practice'],
    skill: 'MS 2.4, 0.3: N = I − (F + R); % efficiency', eq: MATH(mi('N'), mo('='), mi('I'), mo('−'), mpar(mi('F') + mo('+') + mi('R'))),
    eqn: 'I 100, F 30, R 55 → N = 100 − 85 = 15 kJ; efficiency = 15 ÷ 100 × 100 = 15 %',
    q: 'Give one way farmers increase the efficiency of energy transfer to humans.', a: 'Reduce respiratory losses (e.g. confine and warm livestock) or simplify food webs (pesticides/herbicides) so less energy goes to organisms humans do not eat.'
  },
  draw(R, sc) {
    R.text('energy through a consumer', 160, 14, 5, { al: 'c' });
    // animal with I in; F, R out; N stays
    beast(R, 160, 76, 2.1, { fi: 'P', ft: 0.25 });
    R.text('consumer', 160, 112, 4, { al: 'c' });
    R.arrow([30, 70, 118, 74], { ink: 'T', w: 3, hs: 5 }); R.text('I: ingested food', 74, 56, 4, { al: 'c' });
    R.arrow([140, 98, 112, 134], { ink: 'B', w: 1.6, hs: 4 }); R.text('F: faeces and urine', 100, 146, 3.9, { al: 'c' });
    R.arrow([196, 62, 236, 38], { ink: 'P', w: 1.6, hs: 4 }); R.text('R: respiration', 252, 38, 3.9, { al: 'c', ink: 'P' }); R.text('(heat lost)', 252, 45, 3.5, { al: 'c' });
    R.arrow([200, 94, 250, 114], { ink: 'Y', w: 2, hs: 4.4 }); R.text('N: net production', 270, 122, 3.9, { al: 'c' }); R.text('(growth, reproduction)', 270, 129, 3.5, { al: 'c' });
    R.text('N = I − (F + R)', 160, 172, 6, { al: 'c', ink: 'P' });
    R.line(8, 156, 312, 156, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    R.text('worked example (kJ)', 160, 184, 4.2, { al: 'c' });
    R.text('I = 100,  F = 30,  R = 55', 160, 194, 4.4, { al: 'c' }); R.text('N = 100 − (30 + 55) = 15 kJ', 160, 203, 4.4, { al: 'c' }); R.text('efficiency = 15 ÷ 100 × 100 = 15 %', 160, 212, 4.4, { al: 'c', ink: 'P' });
    R.text('not 100 % efficient at any stage', 160, 227, 3.9, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(30 + p * 88, 70 + p * 4, 2, 'T', 0.9, 1); A.dot(196 + p * 40, 62 - p * 24, 1.6, 'P', (1 - p) * 0.9, 2); },
});

/* ---------- 3.5.3c Farming to increase efficiency ---------- */
S({
  id: '3.5.3c', num: '3.5.3', sub: 'Farming practices that increase the efficiency of energy transfer', title: 'Energy and ecosystems', topic: '3.5', slot: [0, 5], span: [2, 1], dna: 'mark', ao: 3,
  covers: ['3.5.3.s9'],
  card: {
    text: 'Farming practices designed to increase the efficiency of energy transfer to humans: <b>simplifying food webs</b> to reduce energy losses to non-human food chains (e.g. <b>herbicides</b> remove weeds that compete with the crop for light and nutrients; <b>pesticides</b> kill insects that eat the crop), and <b>reducing respiratory losses</b> within a human food chain (e.g. keeping livestock in barns or pens with restricted movement and in warm conditions so less energy is lost as heat or used in movement). More of the energy fixed by the crop or fed to the animal ends up as biomass that humans can eat.',
    terms: ['simplifying food webs', 'herbicide', 'pesticide', 'respiratory loss', 'livestock', 'energy transfer', 'biomass', 'non-human food chain'],
    skill: 'MS 0.3: % efficiency comparison', eq: null,
    q: 'Why does restricting the movement of livestock increase the efficiency of energy transfer?', a: 'Less energy is used in movement and released as heat in respiration, so more energy goes into growth (biomass) available to humans.'
  },
  draw(R, sc) {
    R.text('how farming increases the efficiency of energy transfer', 332, 14, 5, { al: 'c' });
    // simplified food web: crop, pests, weeds, humans
    R.text('1  simplify food webs', 166, 30, 4.8, { al: 'c' });
    const nodes = { sun: [166, 48], crop: [90, 100], weeds: [166, 100], pests: [242, 100], humans: [90, 150], other: [242, 150] };
    const lab = (k, t, ink) => { const [x, y] = nodes[k]; R.rrect(x - 30, y - 10, 60, 20, 7, { ink: 'B', w: 1, fi: ink, ft: 0.25, wob: 0.15 }); R.text(t, x, y + 1.6, 4, { al: 'c' }); };
    lab('crop', 'crop', 'T'); lab('weeds', 'weeds', 'T'); lab('pests', 'insect pests', 'Y'); lab('humans', 'humans', 'P'); lab('other', 'other consumers', 'Y');
    R.circle(166, 46, 8, { ink: 'B', w: 1, fi: 'Y', ft: 0.7 });
    [[146, 52, 100, 92], [166, 56, 166, 90], [186, 52, 232, 92]].forEach(([a, b, c, d]) => R.arrow([a, b, c, d], { ink: 'Y', w: 1, hs: 2.6 }));
    R.arrow([90, 110, 90, 140], { ink: 'B', w: 1.2, hs: 3 }); R.arrow([242, 110, 242, 140], { ink: 'B', w: 1, hs: 3 }); 
    R.cross = null; cross(R, 166, 100, 7); cross(R, 242, 100, 7);
    R.text('herbicides remove weeds', 166, 126, 3.8, { al: 'c', ink: 'P' }); R.text('pesticides kill pests', 252, 126, 3.8, { al: 'c', ink: 'P' });
    R.text('more energy ends up in the crop humans eat', 166, 178, 4, { al: 'c', ink: 'P' });
    R.line(344, 22, 344, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // reduce respiratory losses
    R.text('2  reduce respiratory losses', 498, 30, 4.8, { al: 'c' });
    R.rrect(364, 44, 128, 62, 6, { ink: 'B', w: 1.2, fi: 'Y', ft: 0.12, wob: 0.25 }); R.text('free-range animal', 428, 56, 3.9, { al: 'c' });
    beast(R, 400, 90, 0.9, { fi: 'P' }); R.stroke([416, 86, 438, 80, 462, 90], { ink: 'P', w: 1.1, smooth: true, taper: 'end' }); R.text('moves a lot', 450, 70, 3.5, { al: 'c' });
    R.arrow([428, 108, 428, 122], { ink: 'P', w: 1, hs: 2.4 }); R.text('more heat and movement: R high, N low', 428, 132, 3.7, { al: 'c' });
    R.rrect(504, 44, 128, 62, 6, { ink: 'B', w: 1.2, fi: 'T', ft: 0.12, wob: 0.25 }); R.text('penned, warmed animal', 568, 56, 3.9, { al: 'c' });
    beast(R, 568, 90, 0.9, { fi: 'P' }); R.line(510, 106, 626, 106, { ink: 'B', w: 1.2, taper: 'none' });
    R.arrow([568, 108, 568, 122], { ink: 'P', w: 1, hs: 2.4 }); R.text('less movement, less heat loss: R low, N high', 568, 132, 3.7, { al: 'c' });
    R.line(358, 148, 640, 148, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('efficiency of transfer to humans rises', 498, 164, 4.6, { al: 'c', ink: 'P' });
    R.text('but consider ethics, animal welfare and the environment', 498, 178, 3.9, { al: 'c' });
    R.text('(evaluate the costs and benefits)', 498, 186, 3.9, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(5); A.dot(166 + (p % 1) * 0, 52 + p * 30, 1.5, 'Y', 0.9, 1); A.dot(90, 112 + p * 24, 1.6, 'B', 0.9, 2); },
});
