import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  outDir: 'dist',
  target: 'es2022',
  external: [],
  banner: {
    js: '// WMarket Prediction SDK v2 — https://github.com/jelly-chain/wmarket-prediction-sdk',
  },
});
