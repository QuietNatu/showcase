/// <reference path="../@types/jest-axe.d.ts" />

import { configureAxe } from 'jest-axe';
import { axeRulesObject } from '../index';

export const axe = configureAxe({
  rules: axeRulesObject,
});
