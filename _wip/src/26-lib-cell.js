/* ===================== 26 LIB CELL: membranes, proteins, organelles (grows as scenes need it) ===================== */
/* ATP synthase embedded in a membrane at (x,y) (centre of the membrane). s = scale. dir: 1 head below the membrane, -1 above */
Recorder.prototype.atpSynthase = function (x, y, s = 1, o = {}) {
  const R = this, d = o.dir === undefined ? 1 : o.dir;
  R.rrect(x - 5 * s, y - 6 * s, 10 * s, 12 * s, 2.5 * s, { ink: 'B', w: 1.1, fi: 'P', ft: 0.7, wob: 0.15 });      // F0 rotor/channel in membrane
  R.line(x, y + d * 6 * s, x, y + d * 11 * s, { ink: 'B', w: 1.6 * s, taper: 'none', wob: 0.1 });                  // stalk
  R.circle(x, y + d * 17 * s, 6.4 * s, { ink: 'B', w: 1.2, fi: 'T', ft: 0.55 });                                    // F1 head
  R.line(x - 2.2 * s, y + d * 15 * s, x + 2.2 * s, y + d * 19 * s, { ink: 'B', w: 0.7, taper: 'none' });
  return { top: [x, y - d * 6 * s], head: [x, y + d * 17 * s] };
};
