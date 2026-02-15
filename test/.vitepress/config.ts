import { resolve } from 'node:path';

import type { ThemeConfig } from '@';
import { defineConfig } from 'vitepress';

export default defineConfig<ThemeConfig>({
	srcDir: resolve(__dirname, '..'),
	cleanUrls: true,
	lastUpdated: true,
	title: 'Trito',
	description: 'Visually refurbished VitePress default theme.',
	head: [
		['link', { rel: 'icon', href: '/logo.svg' }],
		['meta', { name: 'color-scheme', content: 'dark light' }],
	],
	themeConfig: {
		logo: { src: '/logo.svg', alt: 'Website logo' },
		logoLarge: { src: '/logo.svg', alt: 'Website logo' },
		aside: 'left',
		search: { provider: 'local' },
		socialLinks: [
			{ icon: 'npm', link: 'https://www.npmjs.com/~hesprs' },
			{ icon: 'github', link: 'https://github.com/hesprs' },
		],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2026 Hesprs',
		},
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'API', link: '/api-examples' },
			{ text: 'Markdown', link: '/markdown-examples' },
			{
				text: 'Group',
				items: [
					{ text: 'text1', link: 'link1' },
					{ text: 'text1', link: 'link1' },
				],
			},
		],
		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'API Examples', link: '/api-examples' },
					{ text: 'Markdown Examples', link: '/markdown-examples' },
				],
			},
			{
				text: 'text1',
				items: [
					{ text: 'text2', link: 'link1' },
					{ text: 'text3', link: 'link2' },
				],
			},
			{
				text: 'text4',
				link: 'link3',
				items: [
					{ text: 'text5', link: 'link4' },
					{ text: 'text6', link: 'link5' },
					{ text: 'text7', link: 'link6' },
					{ text: 'text8', link: 'link7' },
					{ text: 'text9', link: 'link8' },
				],
			},
			{
				text: 'text10',
				link: 'link9',
				items: [
					{ text: 'text11', link: 'link10' },
					{ text: 'text12', link: 'link11' },
					{ text: 'text13', link: 'link12' },
					{ text: 'text14', link: 'link13' },
				],
			},
			{
				text: 'text15',
				collapsed: true,
				items: [
					{ text: 'text16', link: 'link14' },
					{ text: 'text17', link: 'link15' },
				],
			},
		],
	},
	markdown: {
		image: { lazyLoading: true },
	},
	vite: {
		publicDir: resolve(__dirname, '../public'),
		resolve: {
			alias: { '@': resolve(__dirname, '../../src/') },
		},
	},
});
