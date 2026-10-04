/* ===================== 99 MAIN ===================== */
(function boot() {
  initPlates(); layoutSheet(); resize();
  const fv = fitView(); cam.x = fv.x; cam.y = fv.y; cam.z = fv.z;
  Card.setEnabled(true);
  press.begin();
  window.AQA = { cam, press, tour, TILES, JOBS, STAGE, SCENES, LAYERS, get k() { return currentK; }, flyTo, viewFor, sceneRect, DLC, MISSING_GLYPHS,
    recordAll(v = 0) { const t0 = performance.now(), rep = []; let tot = 0; for (const L of LAYERS) { const a = performance.now(); const dl = recordLayer(L, v, false); rep.push([L.id, dl.count, dl.bytes(), Math.round(performance.now() - a)]); tot += dl.bytes(); } return { ms: Math.round(performance.now() - t0), bytes: tot, missing: [...MISSING_GLYPHS], rep }; } };
  requestAnimationFrame(frame);
})();
