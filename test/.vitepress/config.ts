// oxlint-disable import/no-nodejs-modules
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
// oxlint-disable import/no-nodejs-modules
import type { ThemeConfig } from '../../src';

export function createP(url: string) {
	const fileName = fileURLToPath(url);
	const dirName = dirname(fileName);
	return (path: string) => resolve(dirName, path);
}
const p = createP(import.meta.url);

export default defineConfig<ThemeConfig>({
	cleanUrls: true,
	description: 'Visually refurbished VitePress default theme.',
	head: [
		['link', { href: '/logo.svg', rel: 'icon' }],
		['meta', { content: 'dark light', name: 'color-scheme' }],
	],
	lastUpdated: true,
	locales: {
		root: {
			label: 'English',
			lang: 'en',
		},
		'zh-Hans': {
			label: '简体中文',
			lang: 'zh-Hans',
		},
	},
	markdown: {
		image: { lazyLoading: true },
	},
	srcDir: p('..'),
	themeConfig: {
		aside: 'left',
		footer: {
			copyright: 'Copyright © 2026 Hesprs',
			message: 'Released under the MIT License.',
		},
		logo: { alt: 'Website logo', src: '/logo.svg' },
		logoLarge: { alt: 'Website logo', src: '/logo.svg' },
		nav: [
			{ link: '/', text: 'Home' },
			{ link: '/api-examples', text: 'API' },
			{ link: '/markdown-examples', text: 'Markdown' },
			{
				items: [
					{ link: 'link1', text: 'text1' },
					{ link: 'link1', text: 'text1' },
				],
				text: 'Group',
			},
		],
		search: { provider: 'local' },
		sidebar: [
			{
				items: [
					{ link: '/api-examples', text: 'API Examples' },
					{ link: '/markdown-examples', text: 'Markdown Examples' },
				],
				text: 'Introduction',
			},
			{
				items: [
					{ link: 'link1', text: 'text2' },
					{ link: 'link2', text: 'text3' },
				],
				text: 'text1',
			},
			{
				items: [
					{ link: 'link4', text: 'text5' },
					{ link: 'link5', text: 'text6' },
					{ link: 'link6', text: 'text7' },
					{ link: 'link7', text: 'text8' },
					{ link: 'link8', text: 'text9' },
				],
				link: 'link3',
				text: 'text4',
			},
			{
				items: [
					{ link: 'link10', text: 'text11' },
					{ link: 'link11', text: 'text12' },
					{ link: 'link12', text: 'text13' },
					{ link: 'link13', text: 'text14' },
				],
				link: 'link9',
				text: 'text10',
			},
			{
				collapsed: true,
				items: [
					{ link: 'link14', text: 'text16' },
					{ link: 'link15', text: 'text17' },
				],
				text: 'text15',
			},
		],
		socialLinks: [
			{ icon: 'npm', link: 'https://www.npmjs.com/~hesprs' },
			{ icon: 'github', link: 'https://github.com/hesprs' },
		],
	},
	title: 'Trito',
	vite: {
		publicDir: p('../public'),
		resolve: {
			alias: { '@': p('../../src/') },
		},
	},
});
