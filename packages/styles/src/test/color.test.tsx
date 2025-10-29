import '../../dist/tokens/_rotom.scss';
import '../../dist/tokens/_rotom-dark.scss';
import '../../dist/tokens/_smeargle.scss';
import '../../dist/tokens/_smeargle-dark.scss';

import Color from 'colorjs.io';

const prefix = 'natu';
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
  beforeEach(() => {
    document.documentElement.setAttribute(themeAttribute, theme.name);
  });

  test.each(palette)(
    '"%s" main colors meet WCAG minimum contrast of 7:1 with text color',
    (colorName) => {
      const wcagMininumContrast = 7;
      const style = globalThis.getComputedStyle(document.documentElement);

      const textColor = new Color(style.getPropertyValue(`--${theme.textColor}`));
      const backgroundColor = new Color(
        style.getPropertyValue(`--${prefix}-color-${colorName}-50`),
      );

      expect(textColor.contrastWCAG21(backgroundColor)).toBeGreaterThanOrEqual(wcagMininumContrast);
    },
  );

  test('colors are in sRGB gamut', () => {
    const style = globalThis.getComputedStyle(document.documentElement);

    const result = Array.from({ length: style.length })
      .map((_, index) => style[index])
      .filter((name): name is string => Boolean(name?.startsWith(`--${prefix}-color-`)))
      .map((name) => [name, new Color(style.getPropertyValue(name)).inGamut('srgb')]);

    const expected = result.map(([name]) => [name, true]);

    expect(Object.fromEntries(result)).toStrictEqual(Object.fromEntries(expected));
  });
});
