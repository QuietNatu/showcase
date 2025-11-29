declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import type { Linter } from 'eslint';
  const configs: {
    readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
  };
  export = configs;
}

declare module 'eslint-plugin-promise' {
  import type { Linter } from 'eslint';
  const plugin: {
    readonly configs: {
      readonly ['flat/recommended']: { readonly rules: Readonly<Linter.RulesRecord> };
    };
  };
  export = plugin;
}
