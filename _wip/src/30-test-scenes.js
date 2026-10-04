/* TEST SCENES (temporary) */
S({ id: 't1', num: 't1', title: 'mol test', topic: '3.1', slot: [0, 0], card: { text: 'x' },
  draw(R, sc) {
    R.hexose(60, 70, 24, { beta: false }); R.text('α-glucose', 60, 118, 7, { al: 'c' });
    R.hexose(150, 70, 24, { beta: true }); R.text('β-glucose', 150, 118, 7, { al: 'c' });
    R.aminoAcid(250, 70, 26);
    R.nucleotide(50, 170, { base: 'A', s: 14 }); R.nucleotide(120, 170, { base: 'G', s: 14 });
    R.atpMol(190, 150, 12);
    R.water(250, 185, 11, 0, { charges: true });
    R.zigzag(20, 215, 0, 14, 10, { db: [5] });
  } });
S({ id: 't2', num: 't2', title: 'graph test', topic: '3.1', slot: [1, 0], card: { text: 'x' },
  draw(R, sc) {
    const g = R.graph(40, 30, 220, 150, { xmin: 0, xmax: 60, ymin: 0, ymax: 10, xl: 'Temperature / °C', yl: 'Rate', xt: [0, 20, 40, 60], yt: [0, 5, 10], paper: 10 }).axes();
    g.curve(x => 10 * Math.exp(-Math.pow((x - 38) / 12, 2)) * (x < 38 ? 1 : 1 - (x - 38) / 25), { ink: 'P' });
    g.tangent(30, 6, 0.5, 40); g.vdrop(38, 10); g.label('optimum', 38, 10.3, { al: 'c' });
    R.table(40, 195, [40, 40, 40, 40], 10, [['x', 'y', 'z', 'w'], [1, 2, 3, 4]]);
  } });
