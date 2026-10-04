#!/bin/bash
# build + sanity: slot clashes, missing glyphs, console errors, single request
node src/build.js >/dev/null || exit 1
node shot.js shots/tmp.png 400 300 1 2500 "const r=AQA.recordAll(0); console.log('CHK missing',JSON.stringify(r.missing),'rec ms',r.ms,'KB',Math.round(r.bytes/1024),'clashes',JSON.stringify(AQA.checkSlots()),'scenes',AQA.SCENES.length)" "" 0 | grep -i "CHK\|error\|PAGEERROR\|EXTERNAL\|requests"
