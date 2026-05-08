declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import type { Config } from 'eslint/config';
  const configs: {
    readonly recommended: Config;
  };
  export = configs;
}

declare module 'eslint-plugin-promise' {
  import type { Config } from 'eslint/config';
  const plugin: {
    readonly configs: {
      readonly ['flat/recommended']: Config;
    };
  };
  export = plugin;
}
