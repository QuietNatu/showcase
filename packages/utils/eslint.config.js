import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(...projectConfig.configs.base, ...projectConfig.configs.vitest, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
