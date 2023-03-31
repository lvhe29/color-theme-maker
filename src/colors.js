import chroma from 'chroma-js';

// 使用 LCH 色彩空间
const LCH = (l, c, h = 0) => {
  let _h = h;
  if (c === 0) {
    _h = 0;
  }
  const color = chroma.lch(l, c, _h);
  if (color._rgb._clipped === true) {
    setTimeout(() => {
      console.log('clipped', l, c, _h);
    }, 0);
    return '#f00';
  }
  return color.hex();
};

// 维度: 感知明度(L)
export const L = {
  bright: 86,
  normal: 70,
  dark: 56,
  darker: 46,
  black: 34,
  background: 3,
};

// 维度: 饱和度(C)
export const C = {
  grey: 0,
  low: 13,
  mid: 28,
  high: 36,
};

// 维度: 色相(H)
export const H = {
  red: 24,
  yellow: 80,
  blue: 204,
  fuchsia: 340,
};

// 维度: 字符样式(Style)
export const Style = {
  none: 'none',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
};

const colorBolderBias = 12;
const lBias = 5;
const hBias = 20;
const cBias = 7;

const fg = LCH(L.normal, C.grey);
const bg = LCH(L.background, C.grey);
const fg_property = LCH(L.normal - lBias, C.grey);
const fg_sys = LCH(L.dark, C.grey);
const fg_operator = LCH(L.darker, C.grey);
const fg_comment = LCH(L.black, C.grey);

const fg_function = LCH(L.normal, C.low, H.yellow);
const fg_extension = LCH(L.black - colorBolderBias, C.low, H.fuchsia);
const fg_type = LCH(L.dark - lBias, C.low + cBias, H.blue);

const fg_string = LCH(L.normal, C.high, H.blue - 0.4 * hBias);
const fg_value = LCH(L.normal - lBias, C.high, H.blue + 1.6 * hBias);
const fg_boolean = LCH(L.normal - lBias, C.high - cBias, H.blue + 2 * hBias);

const fg_logic = LCH(L.bright, C.grey);
const fg_tag = LCH(L.dark - colorBolderBias, C.mid, H.red);
const fg_tag1 = LCH(L.dark - colorBolderBias + lBias, C.mid, H.red + hBias);
const fg_tag_property = LCH(L.darker + lBias, C.low, H.red);

export const colors = {
  normal: [fg, bg],
  sys: [fg_sys, bg, Style.italic],
  logic: [fg_logic, bg, Style.bold],
  function: [fg_function, bg],
  value: [fg_value, bg],
  string: [fg_string, bg],
  boolean: [fg_boolean, bg],
  valueSpecial: [fg_boolean, bg, Style.underline],
  candidate: [fg_extension, bg, Style.bold],
  comment: [fg_comment, bg, Style.italic],
  operator: [fg_operator, bg, Style.none],
  type: [fg_type, bg, Style.italic],

  object: [fg, bg],
  property: [fg_property, bg, Style.italic],

  tag: [ fg_tag, bg, Style.bold],
  tagSpecial: [fg_tag1, bg, Style.bold],
  tagProperty: [fg_tag_property, bg, Style.italic],
  
  _test: ['#ff7777', '#aaaaaa', Style.bold],
};

colors._fg = (key) => colors[key][0];
colors._bg = (key) => colors[key][1];
colors._style = (key) => colors[key][2];
