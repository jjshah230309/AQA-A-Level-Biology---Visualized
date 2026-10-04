/* ===================== 14 REGISTRY + SHEET LAYOUT ===================== */
const SCENES = [], SCENE_BY_ID = Object.create(null);
const SLOT_W = 320, SLOT_H = 240, GUT = 24, BLK_PAD = 28, BLK_TOP = 96, BLK_COLS = 4, BLK_ROWS = 4;
const BW = BLK_COLS * SLOT_W + (BLK_COLS - 1) * GUT + 2 * BLK_PAD;
const bhFor = rows => rows * SLOT_H + (rows - 1) * GUT + BLK_TOP + BLK_PAD;
const BGAP = 64, MARG_X = 130, MARG_T = 170, MARG_B = 250;
/* Topic blocks snake through the sheet so consecutive topics touch:  row0 L->R 3.1 3.2 3.3 ; row1 R->L 3.4 3.5 3.6 ; row2 L->R 3.7 3.8 Skills */
const TOPICS = [
  { id: '3.1', name: 'Biological molecules', col: 0, row: 0 },
  { id: '3.2', name: 'Cells', col: 1, row: 0 },
  { id: '3.3', name: 'Organisms exchange substances with their environment', col: 2, row: 0 },
  { id: '3.4', name: 'Genetic information, variation and relationships between organisms', col: 2, row: 1 },
  { id: '3.5', name: 'Energy transfers in and between organisms', col: 1, row: 1 },
  { id: '3.6', name: 'Organisms respond to changes in their internal and external environments', col: 0, row: 1 },
  { id: '3.7', name: 'Genetics, populations, evolution and ecosystems', col: 0, row: 2 },
  { id: '3.8', name: 'The control of gene expression', col: 1, row: 2 },
  { id: 'SK', name: 'Mathematical, practical and assessment skills', col: 2, row: 2 },
];
const TOPIC_BY_ID = Object.create(null); TOPICS.forEach(t => TOPIC_BY_ID[t.id] = t);
function S(def) {
  if (SCENE_BY_ID[def.id]) throw new Error('duplicate scene ' + def.id);
  SCENES.push(def); SCENE_BY_ID[def.id] = def; return def;
}
function checkSlots() {
  const occ = Object.create(null), clash = [];
  for (const sc of SCENES) {
    const sp = sc.span || [1, 1];
    if (sc.slot[0] + sp[0] > 4) clash.push(sc.id + ' wider than the block');
    for (let i = 0; i < sp[0]; i++) for (let j = 0; j < sp[1]; j++) { const k = sc.topic + ':' + (sc.slot[0] + i) + ',' + (sc.slot[1] + j); if (occ[k]) clash.push(sc.id + ' overlaps ' + occ[k] + ' at ' + k); else occ[k] = sc.id; }
  }
  return clash;
}
function computeBlocks() {
  for (const t of TOPICS) { t.rows = 1; }
  for (const sc of SCENES) { const t = TOPIC_BY_ID[sc.topic], sp = sc.span || [1, 1]; t.rows = Math.max(t.rows, sc.slot[1] + sp[1]); }
  const rowH = [0, 0, 0];
  for (const t of TOPICS) { t.minRows = t.minRows || 1; t.rows = Math.max(t.rows, t.minRows); t.bh = bhFor(t.rows); rowH[t.row] = Math.max(rowH[t.row], t.bh); }
  const rowY = [MARG_T, MARG_T + rowH[0] + BGAP, MARG_T + rowH[0] + rowH[1] + 2 * BGAP];
  for (const t of TOPICS) { const x = MARG_X + t.col * (BW + BGAP); t.rect = [x, rowY[t.row], x + BW, rowY[t.row] + rowH[t.row]]; }
  SHEET.x0 = 0; SHEET.y0 = 0;
  SHEET.x1 = MARG_X * 2 + 3 * BW + 2 * BGAP; SHEET.y1 = MARG_T + MARG_B + rowH[0] + rowH[1] + rowH[2] + 2 * BGAP;
}
const BACKDROPS = Object.create(null), PATHS = [];
let FURNITURE_DRAW = null, PATH_DRAW = null;
function layoutSheet() {
  LAYERS.length = 0;
  { const c = checkSlots(); if (c.length) console.error('SLOT CLASHES', c); }
  computeBlocks();
  for (const t of TOPICS) {
    const bd = BACKDROPS[t.id];
    LAYERS.push({ id: 'bd.' + t.id, rect: t.rect.slice(), ox: t.rect[0], oy: t.rect[1], w: BW, h: t.rect[3] - t.rect[1], topic: t, draw: (R, L) => { if (bd) bd(R, L); } });
  }
  if (PATH_DRAW) LAYERS.push({ id: 'paths', rect: [0, 0, SHEET.x1, SHEET.y1], ox: 0, oy: 0, draw: PATH_DRAW });
  for (const sc of SCENES) {
    const t = TOPIC_BY_ID[sc.topic]; if (!t) throw new Error('bad topic ' + sc.id);
    const sl = sc.slot, sp = sc.span || [1, 1];
    const x = t.rect[0] + BLK_PAD + sl[0] * (SLOT_W + GUT), y = t.rect[1] + BLK_TOP + sl[1] * (SLOT_H + GUT);
    sc.w = sp[0] * SLOT_W + (sp[0] - 1) * GUT; sc.h = sp[1] * SLOT_H + (sp[1] - 1) * GUT;
    sc.x = x; sc.y = y; sc.cx = x + sc.w / 2; sc.cy = y + sc.h / 2;
    sc.rect = [x - 6, y - 6, x + sc.w + 6, y + sc.h + 6];
    sc.layer = { id: 'sc.' + sc.id, rect: sc.rect, ox: x, oy: y, w: sc.w, h: sc.h, sc, draw: (R, L) => { sceneChrome(R, sc, true); sc.draw(R, sc); sceneChrome(R, sc, false); } };
    LAYERS.push(sc.layer);
  }
  if (FURNITURE_DRAW) LAYERS.push({ id: 'furniture', rect: [0, 0, SHEET.x1, SHEET.y1], ox: 0, oy: 0, draw: FURNITURE_DRAW });
}
function sceneAt(wx, wy) {
  for (const sc of SCENES) if (wx >= sc.x && wx <= sc.x + sc.w && wy >= sc.y && wy <= sc.y + sc.h) return sc;
  return null;
}
