/* ===================== 3.4.5 Species and taxonomy ===================== */
/* generic quadruped silhouette (for horse / donkey / mule style comparisons) */
function beast(R, x, y, s, o = {}) {
  R.push(x, y, 0, s);
  R.ellipse(0, 0, 14, 7.2, { ink: 'B', w: 1.1 / s, fi: o.fi || 'P', ft: o.ft || 0.3, wob: 0.3 });
  R.ellipse(13, -9, 5.4, 4, { ink: 'B', w: 1 / s, fi: o.fi || 'P', ft: o.ft || 0.3, rot: -30, wob: 0.2 }); R.line(10, -5, 6, -2, { ink: 'B', w: 4 / s, t: 0.6, taper: 'none' });
  R.ellipse(10.2, -13.4, 1.4, 2.6, { ink: 'B', w: 0.8 / s, fi: o.fi || 'P', ft: 0.6, rot: (o.ear || 0) });
  [-8, -3, 4, 9].forEach(dx => R.line(dx, 5, dx, 15, { ink: 'B', w: 1.4 / s, taper: 'end' }));
  R.stroke([-14, -2, -18, 2, -17, 10], { ink: 'B', w: 1 / s, smooth: true, taper: 'end' });
  R.pop();
}

/* ---------- 3.4.5a What is a species; courtship ---------- */
S({
  id: '3.4.5a', num: '3.4.5', sub: 'Species: fertile offspring; courtship and species recognition', title: 'Species and taxonomy', topic: '3.4', slot: [3, 4], dna: 'bio', ao: 1,
  covers: ['3.4.5.s1', '3.4.5.s2'],
  card: {
    text: 'Two organisms belong to the same <b>species</b> if they are able to produce <b>fertile offspring</b>. <b>Courtship behaviour</b> is a necessary precursor to successful mating: it allows <b>species recognition</b> (so energy and gametes are not wasted on a mate of another species), identifies a mate that is able to breed (receptive, fit) and may synchronise mating. Courtship is often elaborate and specific to a species.',
    terms: ['species', 'fertile offspring', 'courtship', 'species recognition', 'hybrid', 'mating', 'behaviour'],
    skill: 'Apply a definition', eq: null,
    q: 'A horse and a donkey produce a mule that cannot breed. Are horses and donkeys the same species?', a: 'No: their offspring are infertile, so they fail the definition of the same species.'
  },
  draw(R, sc) {
    R.text('what makes a species?', 160, 14, 5, { al: 'c' });
    // horse + horse -> fertile foal;  horse + donkey -> infertile mule
    beast(R, 44, 60, 1.1, { fi: 'P' }); R.text('+', 76, 64, 8, { al: 'c' }); beast(R, 108, 60, 1.1, { fi: 'P' }); R.arrow([128, 60, 150, 60], { ink: 'B', w: 1, hs: 2.4 }); beast(R, 178, 66, 0.8, { fi: 'P' }); R.text('✓', 208, 54, 8, { al: 'c', ink: 'T' });
    R.text('horse', 44, 86, 3.6, { al: 'c' }); R.text('horse', 108, 86, 3.6, { al: 'c' }); R.text('foal', 178, 86, 3.6, { al: 'c' });
    R.text('same species: fertile offspring', 120, 100, 4, { al: 'c' });
    beast(R, 44, 122, 1.1, { fi: 'P' }); R.text('+', 76, 126, 8, { al: 'c' }); beast(R, 108, 122, 1.1, { fi: 'T', ear: 20 }); R.arrow([128, 122, 150, 122], { ink: 'B', w: 1, hs: 2.4 }); beast(R, 178, 128, 0.8, { fi: 'TY' }); R.text('✗', 208, 116, 8, { al: 'c', ink: 'P' });
    R.text('horse', 44, 148, 3.6, { al: 'c' }); R.text('donkey', 108, 148, 3.6, { al: 'c' }); R.text('mule', 178, 148, 3.6, { al: 'c' });
    R.text('different species: the offspring is infertile', 120, 158, 4, { al: 'c' });
    R.line(232, 22, 232, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('definition', 272, 28, 4.4, { al: 'c' });
    ['two organisms are the', 'same species if they can', 'produce fertile offspring'].forEach((t, i) => R.text(t, 272, 42 + i * 7, 3.9, { al: 'c', ink: i === 2 ? 'P' : 'B' }));
    R.line(8, 166, 232, 166, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // courtship: male displays, female responds
    R.text('courtship behaviour', 120, 178, 4.6, { al: 'c' });
    const bird = (x, y, fl, male) => { R.push(x, y, 0, fl); R.ellipse(0, 0, 13, 7.4, { ink: 'B', w: 1.1, fi: male ? 'Y' : 'T', ft: male ? 0.45 : 0.2, wob: 0.3 }); R.circle(13, -6, 4.6, { ink: 'B', w: 1, fi: male ? 'Y' : 'T', ft: male ? 0.45 : 0.2 }); R.poly([17, -6.4, 23, -5, 17, -4], { ink: 'B', w: 0.9, fi: 'P', ft: 0.8 }); R.dot(14.4, -7, 0.8, { ink: 'B' }); R.line(-3, 7, -3, 14, { ink: 'B', w: 1, taper: 'end' }); R.line(3, 7, 3, 14, { ink: 'B', w: 1, taper: 'end' }); if (male) { for (let i = -3; i <= 3; i++) R.stroke([-10, -2, -20 + Math.abs(i) * 0.5, -10 + i * 7, -26 + Math.abs(i), -14 + i * 9], { ink: i % 2 ? 'P' : 'T', w: 2.4, smooth: true, taper: 'end', t: 0.8 }); R.stroke([12, -10, 15, -17, 11, -19], { ink: 'P', w: 1.3, smooth: true, taper: 'end' }); } else R.stroke([-12, 0, -20, 2, -24, 4], { ink: 'B', w: 1.4, taper: 'end' }); R.pop(); };
    bird(52, 206, 1, true); bird(168, 214, 1, false);
    R.arrow([82, 198, 140, 204], { ink: 'P', w: 1, hs: 2.4 }); R.text('display', 112, 196, 3.7, { al: 'c', ink: 'P' });
    R.arrow([148, 224, 96, 224], { ink: 'T', w: 1, hs: 2.4 }); R.text('response', 122, 233, 3.7, { al: 'c', ink: 'T' });
    // roles
    R.text('courtship allows:', 272, 100, 4.4, { al: 'c' });
    ['species recognition', 'a fit, receptive mate', 'mating at the same time'].forEach((t, i) => { R.circle(244, 114 + i * 11, 1.6, { ink: 'B', w: 0.8, fi: 'P', ft: 0.8 }); R.text(t, 249, 115.4 + i * 11, 3.8, { al: 'l' }); });
    R.text('so gametes and energy are', 272, 170, 3.8, { al: 'c' }); R.text('not wasted on the wrong', 272, 176.5, 3.8, { al: 'c' }); R.text('species', 272, 183, 3.8, { al: 'c' });
  },
  anim(A, sc) { const p = A.ph(4); A.dot(96 + Math.sin(p * TAU) * 6, 203 + Math.cos(p * TAU) * 2, 1.4, 'P', 0.9, 1); A.dot(8 + Math.sin(p * TAU * 2) * 6, 200, 1.2, 'P', 0.8, 2); },
});

/* ---------- 3.4.5b Phylogenetic classification and binomial ---------- */
S({
  id: '3.4.5b', num: '3.4.5', sub: 'Phylogenetic classification: taxa, hierarchy and binomial naming; evidence from immunology and sequencing', title: 'Species and taxonomy', topic: '3.4', slot: [0, 5], span: [2, 1], dna: 'bio', ao: 2,
  covers: ['3.4.5.s3', '3.4.5.s4', '3.4.5.s5', '3.4.5.s6'],
  card: {
    text: 'A <b>phylogenetic</b> classification system arranges species into groups based on their <b>evolutionary origins and relationships</b>. It uses a <b>hierarchy</b> in which smaller groups are placed within larger groups, with no overlap between groups; each group is a <b>taxon</b> (plural taxa). One hierarchy comprises the taxa <b>domain, kingdom, phylum, class, order, family, genus and species</b>. Each species is universally identified by a <b>binomial</b> of its genus and species names, e.g. <i>Homo sapiens</i>. Advances in <b>immunology</b> and <b>genome sequencing</b> help to clarify evolutionary relationships. (Recall of different taxonomic systems is not required.)',
    terms: ['phylogenetic', 'hierarchy', 'taxon', 'domain', 'kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species', 'binomial'],
    skill: 'Interpret a phylogenetic tree', eq: null,
    q: 'Why does the hierarchy have no overlap between groups?', a: 'Each smaller group (taxon) is placed entirely within one larger group, reflecting shared evolutionary origin, so a species belongs to only one taxon at each level.'
  },
  draw(R, sc) {
    R.text('classification hierarchy', 90, 14, 5, { al: 'c' });
    const taxa = ['domain', 'kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'], ex = ['Eukarya', 'Animalia', 'Chordata', 'Mammalia', 'Primates', 'Hominidae', 'Homo', 'sapiens'];
    taxa.forEach((t, i) => { const w = 150 - i * 12, x = 90 - w / 2, y = 26 + i * 25; R.rrect(x, y, w, 21, 5, { ink: 'B', w: 1, fi: i % 2 ? 'Y' : 'T', ft: 0.1, wob: 0.25 }); R.text(t, 90, y + 8.4, 4, { al: 'c' }); R.text(ex[i], 90, y + 16.6, 3.9, { al: 'c' }); });
    R.text('smaller groups lie entirely within larger groups', 90, 232, 3.6, { al: 'c' });
    R.line(188, 22, 188, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    // binomial
    R.text('binomial: genus + species', 266, 28, 4.6, { al: 'c' });
    R.text('Homo sapiens', 266, 52, 7.4, { al: 'c' });
    R.line(238, 58, 252, 58, { ink: 'P', w: 1, taper: 'none' }); R.line(262, 58, 296, 58, { ink: 'T', w: 1, taper: 'none' });
    R.text('genus (capital)', 245, 66, 3.7, { al: 'c', ink: 'P' }); R.text('species (lower case)', 288, 72, 3.7, { al: 'c', ink: 'T' });
    R.text('written in italics, or underlined', 266, 86, 3.7, { al: 'c' });
    R.text('the same name is used worldwide', 266, 94, 3.7, { al: 'c' });
    R.line(198, 104, 566, 104, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
    // phylogenetic tree
    R.text('phylogenetic tree: relationships from shared ancestors', 380, 116, 4.4, { al: 'c' });
    const tr = (x0, y0) => {
      const sp = ['species A', 'species B', 'species C', 'species D'], ys = [136, 160, 184, 208];
      R.line(x0, y0, x0, y0, { ink: 'B', w: 0.01, taper: 'none' });
      R.stroke([204, 172, 232, 172], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([232, 148, 232, 196], { ink: 'B', w: 1.6, taper: 'none' });
      R.stroke([232, 148, 264, 148], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([264, 136, 264, 160], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([264, 136, 330, 136], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([264, 160, 330, 160], { ink: 'B', w: 1.6, taper: 'none' });
      R.stroke([232, 196, 270, 196], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([270, 184, 270, 208], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([270, 184, 330, 184], { ink: 'B', w: 1.6, taper: 'none' }); R.stroke([270, 208, 330, 208], { ink: 'B', w: 1.6, taper: 'none' });
      sp.forEach((s2, i) => { R.circle(334, ys[i], 3, { ink: 'B', w: 0.9, fi: ['P', 'T', 'Y', 'TY'][i], ft: 0.7 }); R.text(s2, 340, ys[i] + 1.4, 3.9, { al: 'l' }); });
      R.circle(232, 148, 2.4, { ink: 'P', w: 1 }); R.circle(264, 148, 2.4, { ink: 'P', w: 1 }); R.circle(270, 196, 2.4, { ink: 'P', w: 1 });
      R.text('common ancestor', 206, 190, 3.6, { al: 'l' }); R.arrow([218, 184, 230, 175], { ink: 'P', w: 0.7, hs: 1.8 });
    };
    tr(0, 0);
    R.text('A and B share a more recent common', 420, 144, 3.7, { al: 'l' }); R.text('ancestor: more closely related', 420, 150, 3.7, { al: 'l' });
    // right: evidence
    R.line(566, 22, 566, 232, { ink: 'B', w: 0.5, t: 0.5, taper: 'none' });
    R.text('evidence', 612, 28, 4.6, { al: 'c' });
    R.helix(594, 40, 594, 86, { amp: 6, turns: 2, w: 0.9 }); R.text('DNA base', 626, 54, 3.7, { al: 'l' }); R.text('sequences', 626, 60, 3.7, { al: 'l' });
    R.antibody(592, 126, -PI / 2, 'tri', { s: 0.6 }); R.text('proteins and', 626, 108, 3.7, { al: 'l' }); R.text('immunology', 626, 114, 3.7, { al: 'l' });
    ['more similar', 'sequences or', 'antibody binding', '= more closely', 'related'].forEach((t, i) => R.text(t, 612, 152 + i * 7, 3.8, { al: 'c', ink: i > 2 ? 'P' : 'B' }));
  },
  anim(A, sc) { const p = A.ph(5); A.dot(204 + p * 28, 172, 1.4, 'P', 0.9, 1); },
});
