#!/bin/bash
# usage: block.sh <topicId> out.png [w h]  -- frames a whole topic block (all scenes baked via waiting)
T="$1"; OUT="$2"; W="${3:-1920}"; H="${4:-1200}"
node shot.js "$OUT" $W $H 1 14000 "AQA.press.skip(); AQA.setCard(false); const t=AQA.TOPICS.find(t=>t.id==='$T'); Object.assign(AQA.cam, AQA.viewFor(t.rect,1.02)); window.__r=AQA.recordAll(0); console.log('missing',JSON.stringify(window.__r.missing),'rec ms',window.__r.ms);" "" 0 | grep -v '^requests: 1 /$' | cut -c1-300
