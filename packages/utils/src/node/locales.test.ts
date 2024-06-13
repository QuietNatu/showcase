import { bundleLocales, saveLocales } from './locales';
import fs from 'fs';
import path from 'path';

const fixturesPath = `${import.meta.dirname}/locales-test-fixtures`;
const sourcePath = `${fixturesPath}/source`;
const destinationPath = `${fixturesPath}/destination`;

afterEach(() => {
  fs.rmSync(path.resolve(destinationPath), { recursive: true, force: true });
});

test('bundles all locales', () => {
  const expected = new Map([
    [
      'en-GB',
      {
        common: { hello: 'Hello GB' },
        features: { feature: { name: 'Feature GB' } },
      },
    ],
    [
      'en-US',
      {
        common: { hello: 'Hello US' },
        features: { feature: { name: 'Feature US' } },
      },
    ],
  ]);

  const result = bundleLocales({
    root: import.meta.dirname,
    source: sourcePath,
  });

  expect(result).toStrictEqual(expected);
});

test('bundles a given locale', () => {
  const expected = new Map([
    [
      'en-GB',
      {
        common: { hello: 'Hello GB' },
        features: { feature: { name: 'Feature GB' } },
      },
    ],
  ]);

  const result = bundleLocales({
    root: import.meta.dirname,
    source: sourcePath,
    language: 'en-GB',
  });

  expect(result).toStrictEqual(expected);
});

test('saves bundled locales', () => {
  const expectedEnGb = { common: { hello: 'Hello GB' } };
  const expectedEnUs = { common: { hello: 'Hello US' } };

  const bundledLocales = new Map([
    ['en-GB', expectedEnGb],
    ['en-US', expectedEnUs],
  ]);

  saveLocales({
    root: import.meta.dirname,
    destination: destinationPath,
    bundledLocales,
    filename: 'translation.json',
  });

  const destination = path.resolve(destinationPath);

  const enGbFileData = fs.readFileSync(path.resolve(`${destination}/en-GB/translation.json`));
  const enGbJson = JSON.parse(enGbFileData.toString()) as unknown;

  const enUsFileData = fs.readFileSync(path.resolve(`${destination}/en-US/translation.json`));
  const enUsJson = JSON.parse(enUsFileData.toString()) as unknown;

  expect(enGbJson).toStrictEqual(expectedEnGb);
  expect(enUsJson).toStrictEqual(expectedEnUs);
});
