#!/bin/bash
# usage: shots.sh <sceneIndexOrId> out.png [pad]
ID="$1"; OUT="$2"; PAD="${3:-1.04}"
node shot.js "$OUT" 1600 900 1 6500 "AQA.press.skip(); document.getElementById('card').style.display='none'; const sc=AQA.SCENES.find(s=>s.id==='$ID')||AQA.SCENES[+'$ID']; AQA.setCard(false); Object.assign(AQA.cam, AQA.viewFor(AQA.sceneRect(sc),$PAD)); window.__r=AQA.recordAll(0); console.log('missing',JSON.stringify(window.__r.missing),'rec ms',window.__r.ms);" "" 0 | grep -v '^requests: 1 /$' | cut -c1-300
