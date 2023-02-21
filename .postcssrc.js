import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default ({ env }) => ({
  plugins: [
    autoprefixer({}),
    env === 'production' ? postcssPresetEnv({}) : undefined, // develop with modern features, deploy with legacy support
  ],
});
