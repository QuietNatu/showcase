import '../../dist/tokens/_rotom.scss';
import '../../dist/tokens/_rotom-dark.scss';
import '../../dist/tokens/_smeargle.scss';
import '../../dist/tokens/_smeargle-dark.scss';

import { contrast } from 'colorizr';

const prefix = 'natu';
const wcagMininumContrast = 7;
const themeAttribute = 'data-theme';
const palette = ['brand', 'grey', 'blue', 'red', 'yellow'];

const themes = [
  {
    name: 'rotom',
    textColor: `${prefix}-color-white`,
  },
  {
    name: 'rotom-dark',
    textColor: `${prefix}-color-black`,
  },
  {
    name: 'smeargle',
    textColor: `${prefix}-color-white`,
  },
];

beforeEach(() => {
  // TODO: add rule no eslint disable except with explanation
  document.documentElement.removeAttribute(themeAttribute);
});

describe.each(themes)('$name', (theme) => {
  test.each(palette)('"%s" colors meet WCAG minimum contrast requirements', (colorName) => {
    document.documentElement.setAttribute(themeAttribute, theme.name);

    const style = globalThis.getComputedStyle(document.documentElement);

    const color1 = getColor(style, `${prefix}-color-${colorName}-50`);
    const color2 = getColor(style, theme.textColor);

    expect(contrast(color1, color2)).toBeGreaterThanOrEqual(wcagMininumContrast);
  });
});

const getColor = (style: CSSStyleDeclaration, name: string) => {
  return style.getPropertyValue(`--${name}`).replace('deg', ''); // deg is not supported by colorizr
};
