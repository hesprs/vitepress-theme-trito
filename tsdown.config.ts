import { defineConfig } from 'tsdown';
import vue from 'unplugin-vue/rolldown';

export default defineConfig({
	css: { inject: true, minify: true },
	dts: { tsc: { vue: true } },
	entry: ['./src/index.ts'],
	minify: true,
	platform: 'neutral',
	plugins: [vue({ isProduction: true })],
	unbundle: true,
});
