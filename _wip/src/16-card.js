/* ===================== 16 TOPIC CARD (the one overlay) ===================== */
const cardEl = document.getElementById('card');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const Card = {
  enabled: true, shownId: null, shown: false, lastMove: 0, filled: null,
  setEnabled(b) { this.enabled = b; if (!b) this.hide(); },
  hide() { if (this.shown) { cardEl.classList.remove('on'); this.shown = false; } },
  fill(sc) {
    if (this.filled === sc.id) return;
    this.filled = sc.id;
    const c = sc.card || {};
    const terms = (c.terms || []).map(t => '<span>' + esc(t) + '</span>').join('');
    cardEl.innerHTML =
      '<div class="n">' + esc(sc.num || sc.id) + (sc.rp ? ' <b>Required practical ' + sc.rp + '</b>' : '') + '</div>' +
      '<h2>' + esc(sc.title) + '</h2>' + (sc.sub ? '<div class="s">' + esc(sc.sub) + '</div>' : '') +
      '<p>' + (c.text || '') + '</p>' +
      (terms ? '<div class="t">' + terms + '</div>' : '') +
      (c.eq ? '<div class="e"><i>' + esc(c.skill || 'Equation') + '</i>' + c.eq + (c.eqn ? '<small>' + c.eqn + '</small>' : '') + '</div>' : '') +
      (c.q ? '<details class="q"><summary>' + (c.q) + '</summary>' + (c.a || '') + '</details>' : '') +
      '<div class="h">C card · 0 whole sheet · drag, scroll, double-click · arrows · + −</div>';
    cardEl.scrollTop = 0;
  },
  dominant() {
    const A = availArea(), Z = cam.z;
    let best = null, ba = 0;
    for (const sc of SCENES) {
      const x0 = (sc.x - cam.x) * Z + VW / 2, y0 = (sc.y - cam.y) * Z + VH / 2, x1 = x0 + sc.w * Z, y1 = y0 + sc.h * Z;
      const ix = Math.max(0, Math.min(x1, A.x + A.w) - Math.max(x0, A.x)), iy = Math.max(0, Math.min(y1, A.y + A.h) - Math.max(y0, A.y));
      const a = ix * iy; if (a > ba) { ba = a; best = sc; }
    }
    return ba > A.w * A.h * 0.2 ? best : null;
  },
  update(now, moving) {
    if (!this.enabled || press.on) { return; }
    if (moving) { this.lastMove = now; this.hide(); return; }
    if (now - this.lastMove < 0.5) return;
    const sc = (tour.state === 'dwell' && tour.cur) ? tour.cur : this.dominant();
    if (!sc) { this.hide(); return; }
    this.fill(sc);
    if (!this.shown) { cardEl.classList.add('on'); this.shown = true; }
  },
};
