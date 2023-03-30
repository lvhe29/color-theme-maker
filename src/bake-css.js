import { colors } from './colors.js';
import { writeToFile } from './misc.js';

const makeCssItem = (className) => (fg, bg, style) => `.${className} {
  color: ${fg};
  background: ${bg};
  font-weight: ${style.includes('bold') ? 'bold' : 'normal'};
  font-style: ${style.includes('italic') ? 'italic' : 'normal'};
  text-decoration: ${style.includes('underline') ? 'underline' : 'none'};
}
`;
const css = [];
const addCss = (className) => (fg, bg, style = []) => css.push(makeCssItem(className)(fg, bg, style));

Object.keys(colors).forEach((key) => {
  addCss(key)(...colors[key]);
});

const cssString = css.join('\n');
writeToFile('baked', 'baked.css', cssString);