import axe from 'axe-core';

const enabledTags = [
  'wcag2a',
  'wcag2aa',
  'wcag2aaa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
  'best-practice',
];

/**
 * Default rules needed to match target a11y standards
 */
export const axeRules = axe.getRules(enabledTags).map(({ ruleId, tags }) => ({
  id: ruleId,
  enabled: !tags.includes('experimental') && !tags.includes('deprecated'),
}));

/**
 * Default rules needed to match target a11y standards
 */
export const axeRulesObject = axeRules.reduce<axe.RuleObject>((dictionary, rule) => {
  dictionary[rule.id] = { enabled: rule.enabled };
  return dictionary;
}, {});
