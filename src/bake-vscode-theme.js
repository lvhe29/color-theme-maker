import { colors as c } from './colors.js';
import { writeToFile } from './misc.js';

const vscodeTheme = {};
vscodeTheme.type = 'dark';

vscodeTheme.colors = {
  // 编辑器文本默认颜色
  'editor.background': c._bg('normal'),
  'editor.foreground': c._fg('normal'),

  // 行号颜色
  'editorLineNumber.foreground': '#818181',

  // 其他
  'activityBarBadge.background': '#007acc',
  'editor.inactiveSelectionBackground': '#3a3d41',
  'editor.selectionHighlightBackground': '#add6ff26',
  'editorIndentGuide.activeBackground': '#707070',
  'editorIndentGuide.background': '#404040',
  'input.placeholderForeground': '#a6a6a6',
  'list.activeSelectionIconForeground': '#ffffff',
  'list.dropBackground': '#383b3d',
  'menu.background': '#303031',
  'menu.foreground': '#cccccc',
  'ports.iconRunningProcessForeground': '#369432',
  'sideBarSectionHeader.background': '#00000000',
  'sideBarSectionHeader.border': '#cccccc33',
  'sideBarTitle.foreground': '#bbbbbb',
  'statusBarItem.remoteBackground': '#16825d',
  'statusBarItem.remoteForeground': '#ffffff',
  'tab.lastPinnedBorder': '#cccccc33',
  'terminal.inactiveSelectionBackground': '#3a3d41',
};

const makeTokenColor = (scope, fg, bg, style) => {
  const tokenColor = {
    scope,
    settings: {},
  };
  if (fg) {
    tokenColor.settings.foreground = fg;
  }
  if (bg) {
    tokenColor.settings.background = bg;
  }
  if (style) {
    tokenColor.settings.fontStyle = style;
  }
  return tokenColor;
};

const makeStyle = (scope, style) => {
  const tokenColor = {
    scope,
    settings: {
      fontStyle: style,
    },
  };
  return tokenColor;
};

vscodeTheme.tokenColors = [
  makeStyle(['markup.bold'], 'bold'),
  makeStyle(['markup.italic'], 'italic'),
  makeStyle(['markup.underline'], 'underline'),
  makeStyle(['markup.heading'], 'bold'),
];

const scopesMap = {
  normal: ['variable.parameter', 'variable.other.readwrite'],
  comment: ['comment'],
  sys: ['storage.type', 'keyword.control', 'keyword.operator.new'],
  operator: [
    'keyword.operator',
    'punctuation.separator',
    'punctuation.terminator',
    'punctuation.definition.typeparameters',
    'punctuation.definition.tag',
    // 'punctuation.definition.block',
    'storage.type.function.arrow',
    'meta.brace',
    'punctuation.section.embedded',
    'punctuation.definition.template-expression',
    'source.css',
    'keyword.other.unit',
    'punctuation.definition.markdown',
    'punctuation.definition.character-class.regexp',
    'punctuation.definition.heading.markdown',
    'punctuation.definition.list.begin.markdown',
    'punctuation.definition.list.end.markdown',
    'punctuation.definition.metadata.markdown',
    'punctuation.definition.quote.begin.markdown',
    // 'meta.paragraph.markdown',
    'meta.separator.markdown',
  ],
  logic: [
    'keyword.control.conditional',
    'keyword.control.flow',
    'keyword.control.switch',
    'keyword.control.loop',
  ],
  function: ['entity.name.function', 'support.function', 'meta.function-call.generic'],
  type: ['support.type'],
  value: ['constant.numeric'],
  string: ['string'],
  boolean: ['constant.language'],
  valueSpecial: ['support.constant.property-value'],
  property: [
    'variable.other.property',
    'variable.other.object.property',
    'support.type.property-name',
  ],
  object: ['variable.other.object'],
  tag: ['entity.name.tag'],
  tagSpecial: ['support.class.component'],
  tagProperty: ['entity.other.attribute-name'],
};

Object.keys(scopesMap).forEach((key) => {
  const scope = scopesMap[key];
  console.log(key, '-- [', c[key].join(' '), ']');
  console.log(scope.join('\n'), '\n');
  vscodeTheme.tokenColors.push(makeTokenColor(scope, ...c[key]));
});

writeToFile('baked', 'vscode-theme.json', JSON.stringify(vscodeTheme, null, 2));
