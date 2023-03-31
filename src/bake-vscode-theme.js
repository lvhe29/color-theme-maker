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
  normal: ['variable'],

  comment: ['comment'],

  sys: [
    'storage.type',
    'storage.modifier',
    'keyword',
    'meta.function.definition',
    
    // 从 operator 中排除
    'meta.function-call keyword.operator.expression',

    // 从 logic 分组中排除
    'meta.import keyword.control',
    'keyword.control.import',
    'keyword.control.export',
    'keyword.control.from',
    'keyword.control.as',
    'keyword.control.directive', // C 的 #include #define 等
  ],

  operator: [
    'constant.other.option',
    'keyword.operator',
    'keyword.other.unit',
    'storage.type.function.arrow',
    'punctuation',
    // 'punctuation.definition',
    // 'punctuation.separator',
    // 'punctuation.terminator',
    // 'punctuation.accessor',
    // 'punctuation.section',
    // 'punctuation.section.embedded',
    'meta.brace',
    'meta.separator.markdown',
    // 'punctuation.definition.tag',
    // 'punctuation.definition.typeparameters',
    // 'punctuation.definition.template-expression',
    // 'punctuation.definition.markdown',
    // 'punctuation.definition.character-class.regexp',
    // 'punctuation.definition.heading.markdown',
    // 'punctuation.definition.list.begin.markdown',
    // 'punctuation.definition.list.end.markdown',
    // 'punctuation.definition.metadata.markdown',
    // 'punctuation.definition.quote.begin.markdown',
  ],

  logic: [
    'keyword.control',
    // 'keyword.control.r',
    // 'keyword.control.c',
    // 'keyword.control.julia',
    // 'keyword.control.lisp',
    // 'keyword.control.lua',
    // 'keyword.control.go',
    // 'keyword.control.conditional',
    // 'keyword.control.flow',
    // 'keyword.control.switch',
    // 'keyword.control.loop',
    // 'keyword.control.rust',
    // 'keyword.control.shell',
    // 'keyword.control.do',
    // 'keyword.control.else',
    // 'keyword.control.for',
    // 'keyword.control.if',
    // 'keyword.control.else',
    // 'keyword.control.elseif',
    // 'keyword.control.while',
    // 'keyword.control.end',
  ],

  function: [
    'entity.name.function',
    'support.function',
    'meta.function-call.generic',
  ],

  type: ['support.type', 'entity.name.type', 'storage.type.haskell'],
  value: ['constant.numeric'],
  string: ['string', 'punctuation.definition.string'],
  boolean: ['constant.language'],
  valueSpecial: ['support.constant.property-value', 'constant.other.color'],

  property: [
    'variable.other.property',
    'variable.other.object.property',
    'support.type.property-name',
  ],

  object: ['variable.other.object'],
  tag: ['entity.name.tag'],
  tagSpecial: ['support.class.component', 'markup.heading'],
  tagProperty: ['entity.other.attribute-name'],

  _test: [
    // only for test
    // 'keyword.operator.word',
  ],
};

Object.keys(scopesMap).forEach((key) => {
  const scope = scopesMap[key];
  if (!scope || scope?.length === 0) return;
  console.log(key, '-- [', c[key].join(' '), ']');
  console.log(scope.join('\n'), '\n');
  vscodeTheme.tokenColors.push(makeTokenColor(scope, ...c[key]));
});

writeToFile('baked', 'vscode-theme.json', JSON.stringify(vscodeTheme, null, 2));
