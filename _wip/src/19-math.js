/* ===================== 19 MathML helpers for the topic card ===================== */
const MM = {
  m: (...a) => '<math display="block">' + a.join('') + '</math>',
  i: s => '<mi>' + s + '</mi>', // italic variable
  r: s => '<mi mathvariant="normal">' + s + '</mi>', // upright symbol / unit
  n: s => '<mn>' + s + '</mn>',
  o: s => '<mo>' + s + '</mo>',
  t: s => '<mtext>' + s + '</mtext>',
  sub: (a, b) => '<msub>' + a + b + '</msub>',
  sup: (a, b) => '<msup>' + a + b + '</msup>',
  subsup: (a, b, c) => '<msubsup>' + a + b + c + '</msubsup>',
  frac: (a, b) => '<mfrac><mrow>' + a + '</mrow><mrow>' + b + '</mrow></mfrac>',
  sqrt: a => '<msqrt>' + a + '</msqrt>',
  over: (a, b) => '<mover>' + a + b + '</mover>',
  row: (...a) => '<mrow>' + a.join('') + '</mrow>',
  sum: () => '<mo largeop="true">∑</mo>',
  under: (a, b) => '<munder>' + a + b + '</munder>',
  underover: (a, b, c) => '<munderover>' + a + b + c + '</munderover>',
  abs: a => '<mo>|</mo>' + a + '<mo>|</mo>',
  paren: a => '<mo>(</mo>' + a + '<mo>)</mo>',
  // common units
  u: s => '<mi mathvariant="normal">' + s + '</mi>',
};
