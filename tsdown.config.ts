import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

export default defineConfig({
	dts: { vue: true },
	entry: ['./src/index.ts'],
	minify: true,
	platform: 'neutral',
	plugins: [Vue({ isProduction: true })],
	unbundle: true,
});
