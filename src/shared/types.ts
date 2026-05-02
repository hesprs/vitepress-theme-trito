// oxlint-disable typescript/no-explicit-any
// Types shared between server and client
import type { UseDarkOptions } from '@vueuse/core';
import type { SSRContext } from 'vue/server-renderer';
export type { default as TritoTheme } from '@/theme-config';

export type Awaitable<T> = T | PromiseLike<T>;

type DeepPartial<T> =
	T extends Record<string, any>
		? T extends
				| Date
				| RegExp
				| Function
				| ReadonlyMap<any, any>
				| ReadonlySet<any>
				| ReadonlyArray<any>
			? T
			: { [P in keyof T]?: DeepPartial<T[P]> }
		: T;

export type PageData = {
	relativePath: string;
	/**
	 * Differs from relativePath in case of path rewrites
	 * empty string if the page is virtual (e.g. 404 page)
	 */
	filePath: string;
	title: string;
	titleTemplate?: string | boolean;
	description: string;
	headers: Array<Header>;
	frontmatter: Record<string, any>;
	params?: Record<string, any>;
	isNotFound?: boolean;
	lastUpdated?: number;
};

/**
 * SFC block extracted from markdown
 */
export type SfcBlock = {
	/**
	 * The type of the block
	 */
	type: string;
	/**
	 * The content, including open-tag and close-tag
	 */
	content: string;
	/**
	 * The content that stripped open-tag and close-tag off
	 */
	contentStripped: string;
	/**
	 * The open-tag
	 */
	tagOpen: string;
	/**
	 * The close-tag
	 */
	tagClose: string;
};

export type MarkdownSfcBlocks = {
	/**
	 * The `<template>` block
	 */
	template?: SfcBlock;
	/**
	 * The common `<script>` block
	 */
	script?: SfcBlock;
	/**
	 * The `<script setup>` block
	 */
	scriptSetup?: SfcBlock;
	/**
	 * All `<script>` blocks.
	 *
	 * By default, SFC only allows one `<script>` block and one `<script setup>` block.
	 * However, some tools may support different types of `<script>`s, so we keep all of them here.
	 */
	scripts: Array<SfcBlock>;
	/**
	 * All `<style>` blocks.
	 */
	styles: Array<SfcBlock>;
	/**
	 * All custom blocks.
	 */
	customBlocks: Array<SfcBlock>;
};

export type Header = {
	/**
	 * The level of the header
	 *
	 * `1` to `6` for `<h1>` to `<h6>`
	 */
	level: number;
	/**
	 * The title of the header
	 */
	title: string;
	/**
	 * The slug of the header
	 *
	 * Typically the `id` attr of the header anchor
	 */
	slug: string;
	/**
	 * Link of the header
	 *
	 * Typically using `#${slug}` as the anchor hash
	 */
	link: string;
	/**
	 * The children of the header
	 */
	children: Array<Header>;
};

export type SiteData<ThemeConfig = any> = {
	base: string;
	cleanUrls?: boolean;
	lang: string;
	dir: string;
	title: string;
	titleTemplate?: string | boolean;
	description: string;
	head: Array<HeadConfig>;
	appearance:
		| boolean
		| 'dark'
		| 'force-dark'
		| 'force-auto'
		| (Omit<UseDarkOptions, 'initialValue'> & { initialValue?: 'dark' });
	themeConfig: ThemeConfig;
	scrollOffset:
		| number
		| string
		| Array<string>
		| { selector: string | Array<string>; padding: number };
	locales: LocaleConfig<ThemeConfig>;
	localeIndex?: string;
	contentProps?: Record<string, any>;
	router: {
		prefetchLinks: boolean;
	};
	additionalConfig?: AdditionalConfigDict<ThemeConfig> | AdditionalConfigLoader<ThemeConfig>;
};

export type HeadConfig =
	| [string, Record<string, string>]
	| [string, Record<string, string>, string];

export type PageDataPayload = {
	path: string;
	pageData: PageData;
};

export type SSGContext = {
	content: string;
	vpSocialIcons: Set<string>;
} & SSRContext;

export type LocaleSpecificConfig<ThemeConfig = any> = {
	lang?: string;
	dir?: string;
	title?: string;
	titleTemplate?: string | boolean;
	description?: string;
	head?: Array<HeadConfig>;
	themeConfig?: DeepPartial<ThemeConfig>;
};

export type LocaleConfig<ThemeConfig = any> = Record<
	string,
	LocaleSpecificConfig<ThemeConfig> & { label: string; link?: string }
>;

export type AdditionalConfig<ThemeConfig = any> = LocaleSpecificConfig<ThemeConfig>;

export type AdditionalConfigDict<ThemeConfig = any> = Record<string, AdditionalConfig<ThemeConfig>>;

export type AdditionalConfigLoader<ThemeConfig = any> = (
	relativePath: string,
) => Array<AdditionalConfig<ThemeConfig>> | undefined;

// Manually declaring all properties as rollup-plugin-dts
// Is unable to merge augmented module declarations
export type MarkdownEnv = {
	/**
	 * The raw Markdown content without frontmatter
	 */
	content?: string;
	/**
	 * The excerpt that extracted by `@mdit-vue/plugin-frontmatter`
	 *
	 * - Would be the rendered HTML when `renderExcerpt` is enabled
	 * - Would be the raw Markdown when `renderExcerpt` is disabled
	 */
	excerpt?: string;
	/**
	 * The frontmatter that extracted by `@mdit-vue/plugin-frontmatter`
	 */
	frontmatter?: Record<string, unknown>;
	/**
	 * The headers that extracted by `@mdit-vue/plugin-headers`
	 */
	headers?: Array<Header>;
	/**
	 * SFC blocks that extracted by `@mdit-vue/plugin-sfc`
	 */
	sfcBlocks?: MarkdownSfcBlocks;
	/**
	 * The title that extracted by `@mdit-vue/plugin-title`
	 */
	title?: string;
	path: string;
	relativePath: string;
	cleanUrls: boolean;
	links?: Array<string>;
	includes?: Array<string>;
	realPath?: string;
	localeIndex?: string;
};
