import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default ({ env }) => ({
  plugins: [autoprefixer({}), env === 'production' ? postcssPresetEnv({}) : undefined],
});
