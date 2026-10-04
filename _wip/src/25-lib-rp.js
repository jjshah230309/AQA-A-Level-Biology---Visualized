/* ===================== 25 LIB RP: required-practical window template =====================
   Every RP scene shows the same nine facets so the audience can compare them:
   principle + apparatus + measurement (zone A), interpretation (zone B), variables + controls (C1),
   calculation (C2), risks (C3), limitations (C4).  Methods are always labelled as an EXAMPLE
   (the specification leaves the choice of method to schools).                                      */
const RP_FACETS = ['principle', 'variables', 'controls', 'apparatus', 'measurement', 'calculation', 'risk', 'limitation', 'interpretation'];
function wrapText(str, maxW, size) {
  const words = String(str).split(' '), lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (cur && labelWidth(t, size) > maxW) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur);
  return lines;
}
function rpScene(d) {
  const sc = {
    id: d.id, num: d.num, rp: d.rp, title: d.title, sub: d.sub, topic: d.topic, slot: d.slot, span: d.span, dna: d.dna || 'mark', ao: 3,
    covers: d.covers, card: d.card, at: d.at, ms: d.ms, ps: d.ps,
    rpFacets: { principle: !!d.apparatus, variables: !!(d.vars && d.vars.iv), controls: !!(d.vars && d.vars.ctl && d.vars.ctl.length), apparatus: !!d.apparatus, measurement: !!(d.vars && d.vars.dv), calculation: !!(d.calc && d.calc.length), risk: !!(d.risks && d.risks.length), limitation: !!(d.limits && d.limits.length), interpretation: !!d.interp },
    draw(R, s) {
      d.apparatus(R, { x: 8, y: 12, w: 172, h: 130 });
      R.text('example method', 176, 143, 3.8, { al: 'r' });
      R.line(184, 14, 184, 144, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
      d.results(R, { x: 192, y: 12, w: 120, h: 118 });
      wrapText(d.interp, 122, 4.0).slice(0, 2).forEach((t, i) => R.text(t, 252, 137 + i * 5.6, 4.0, { al: 'c' }));
      R.line(8, 148, 312, 148, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
      // C1 variables / controls
      const v = d.vars; let y = 156;
      const block = (icon, head, lines) => { Icons[icon](R, 16, y + 5, 5.2); R.text(head, 26, y + 1.4, 3.9, { al: 'l' }); lines.forEach((t, i) => R.text(t, 26, y + 7.6 + i * 5.4, 4.4, { al: 'l' })); y += 16 + Math.max(0, lines.length - 1) * 5.4; };
      block('knob', 'independent', wrapText(v.iv, 72, 4.4));
      block('gauge', 'dependent', wrapText(v.dv, 72, 4.4));
      block('lock', 'controlled', v.ctl.flatMap(t => wrapText(t, 72, 4.4)).slice(0, 4));
      R.line(104, 152, 104, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
      // C2 calculation
      R.text('calculation', 110, 160, 4.4, { al: 'l' }); R.text('\u03A3', 148, 160, 5.4, { al: 'l', ink: 'P' });
      let cy = 172; d.calc.forEach(t => { wrapText(t, 92, 5).forEach(ln => { R.text(ln, 110, cy, 5, { al: 'l' }); cy += 9; }); });
      R.line(204, 152, 204, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
      // C3 risks
      R.text('risk', 232, 160, 4.4, { al: 'c' });
      let ry = 170; d.risks.slice(0, 3).forEach(r => { Icons[r[0]](R, 214, ry + 3, 5.2); const ls = wrapText(r[1], 38, 3.9); ls.slice(0, 3).forEach((t, i) => R.text(t, 223, ry + 2 + i * 5, 3.9, { al: 'l' })); ry += 14 + Math.max(0, ls.length - 1) * 5; });
      R.line(262, 152, 262, 230, { ink: 'B', w: 0.5, t: 0.6, taper: 'none' });
      // C4 limitations
      Icons.warn(R, 272, 160, 4.4); R.text('limits', 281, 162, 4.4, { al: 'l' });
      let ly = 173; d.limits.slice(0, 4).forEach(t => { const ls = wrapText(t, 44, 3.9); R.dot(266, ly - 1.2, 0.7, { ink: 'P' }); ls.forEach((ln, i) => R.text(ln, 269, ly + i * 4.8, 3.9, { al: 'l' })); ly += 5.4 + ls.length * 4.8; });
      Icons.errbar(R, 276, 224, 4.2); Icons.repeat(R, 294, 224, 3.8);
    },
    anim: d.anim,
  };
  return S(sc);
}
