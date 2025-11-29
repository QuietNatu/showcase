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
  {
    name: 'smeargle-dark',
    textColor: `${prefix}-color-black`,
  },
];

beforeEach(() => {
  // TODO: 11 shades of colors is probably too much
  document.documentElement.removeAttribute(themeAttribute);
});

describe.each(themes)('$name', (theme) => {
  beforeEach(() => {
    document.documentElement.setAttribute(themeAttribute, theme.name);
  });

  test.each(palette)(
    '"%s" main color meets WCAG minimum contrast of 7:1 with text color',
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
      .map((name) => {
        const color = new Color(style.getPropertyValue(name));
        return color.inGamut('srgb')
          ? null
          : { name, maxChroma: getMaxChromaForGamut(color, 'srgb') };
      })
      .filter(Boolean);

    expect(result).toStrictEqual([]);
  });
});

/** Lowers chroma until color is in the target gamut */
function getMaxChromaForGamut(color: Color, gamut: string): number {
  if (color.inGamut(gamut)) {
    return Number(color.c as unknown);
  }

  const adjustedChroma = (1000 * color.c - 1) / 1000;

  return getMaxChromaForGamut(new Color(`oklch(${color.l} ${adjustedChroma} ${color.h})`), gamut);
}
