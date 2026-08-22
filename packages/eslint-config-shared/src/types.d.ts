declare module 'eslint-plugin-promise' {
  import type { Config } from 'eslint/config';
  const plugin: {
    readonly configs: {
      readonly ['flat/recommended']: Config;
    };
  };
  export = plugin;
}
