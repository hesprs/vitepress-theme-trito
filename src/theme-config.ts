import type { i18nTranslations } from '@/composables/i18n';
// oxlint-disable typescript/no-explicit-any
import type { DocSearchProps } from '@/shared/docsearch';
import type { Header, PageData } from '@/shared/index';
import type { LocalSearchTranslations } from '@/shared/local-search';
import type { Options as _MiniSearchOptions } from 'minisearch';

export namespace TritoTheme {
	export interface Config {
		/**
		 * The logo file of the site.
		 *
		 * @example '/logo.svg'
		 */
		logo?: ThemeableImage;

		/**
		 * The detailed logo file of the site.
		 *
		 * @example '/logo.svg'
		 */
		logoLarge?: ThemeableImage;

		/**
		 * Overrides the link of the site logo.
		 */
		logoLink?: string | { link?: string; rel?: string; target?: string };

		/**
		 * Custom site title in navbar. If the value is undefined,
		 * `config.title` will be used.
		 */
		siteTitle?: string | false;

		/**
		 * Custom header levels of outline in the aside component.
		 *
		 * @default 2
		 */
		outline?: number | [number, number] | 'deep' | false;

		/**
		 * The nav items.
		 */
		nav?: NavItem[];

		/**
		 * The sidebar items.
		 */
		sidebar?: Sidebar;

		/**
		 * Set to `false` to prevent rendering of aside container.
		 * Set to `true` to render the aside to the right.
		 * Set to `left` to render the aside to the left.
		 *
		 * @default true
		 */
		aside?: boolean | 'left';

		/**
		 * Translations of the text pieces used in UI.
		 * @see https://github.com/hesprs/vitepress-theme-trito/blob/main/src/composables/i18n.ts
		 * Where the keys are locale codes (e.g. 'en', 'de'), and values are the translation objects.
		 */
		i18n?: Record<string, typeof i18nTranslations.en>;

		/**
		 * Info for the edit link. If it's undefined, the edit link feature will
		 * be disabled.
		 *
		 * Pattern for edit link:
		 *
		 * @example 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
		 * @example ({ filePath }) => { ... }
		 */
		editLink?: string | ((payload: PageData) => string);

		/**
		 * Set options for last updated time formatting.
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
		 *
		 * @default
		 * { dateStyle: 'short', timeStyle: 'short' }
		 */
		lastUpdated?: Intl.DateTimeFormatOptions & { forceLocale?: boolean };

		/**
		 * Set custom prev/next labels.
		 */
		docFooter?: DocFooter;

		/**
		 * The social links to be displayed at the end of the nav bar. Perfect for
		 * placing links to social services such as GitHub, Twitter, Facebook, etc.
		 */
		socialLinks?: SocialLink[];

		/**
		 * The footer configuration.
		 */
		footer?: Footer;

		search?:
			| { provider: 'local'; options?: LocalSearchOptions }
			| { provider: 'algolia'; options: AlgoliaSearchOptions };

		/**
		 * Changing locale when current url is `/foo` will redirect to `/locale/foo`.
		 *
		 * @default true
		 */
		i18nRouting?: boolean;

		/**
		 * Show external link icon in Markdown links.
		 *
		 * @default false
		 */
		externalLinkIcon?: boolean;

		/**
		 * Customize the return link of 404 page.
		 *
		 * @default '/' or '/<locale>/' depending on `i18nRouting`
		 */
		notFoundLink?: string;
	}

	// nav -----------------------------------------------------------------------

	export type NavItem = NavItemComponent | NavItemWithLink | NavItemWithChildren;

	export interface NavItemComponent {
		component: string;
		props?: Record<string, any>;
	}

	export interface NavItemWithLink {
		text: string;
		link: string | ((payload: PageData) => string);
		items?: never;

		/**
		 * `activeMatch` is expected to be a regex string. We can't use actual
		 * RegExp object here because it isn't serializable
		 */
		activeMatch?: string;
		rel?: string;
		target?: string;
		noIcon?: boolean;
	}

	export interface NavItemChildren {
		text?: string;
		items: NavItemWithLink[];
	}

	export interface NavItemWithChildren {
		text?: string;
		items: (NavItemComponent | NavItemChildren | NavItemWithLink)[];

		/**
		 * `activeMatch` is expected to be a regex string. We can't use actual
		 * RegExp object here because it isn't serializable
		 */
		activeMatch?: string;
	}

	// sidebar -------------------------------------------------------------------

	export type Sidebar = SidebarItem[] | SidebarMulti;

	export interface SidebarMulti {
		[path: string]: SidebarItem[] | { items: SidebarItem[]; base: string };
	}

	export type SidebarItem = {
		/**
		 * The text label of the item.
		 */
		text?: string;

		/**
		 * The link of the item.
		 */
		link?: string;

		/**
		 * The children of the item.
		 */
		items?: SidebarItem[];

		/**
		 * If not specified, group is not collapsible.
		 *
		 * If `true`, group is collapsible and collapsed by default
		 *
		 * If `false`, group is collapsible but expanded by default
		 */
		collapsed?: boolean;

		/**
		 * Base path for the children items.
		 */
		base?: string;

		/**
		 * Customize text that appears on the footer of previous/next page.
		 */
		docFooterText?: string;

		rel?: string;
		target?: string;
	};

	// image ---------------------------------------------------------------------

	export type ThemeableImage =
		| string
		| { src: string; alt?: string; [prop: string]: any }
		| { light: string; dark: string; alt?: string; [prop: string]: any };

	export type FeatureIcon =
		| string
		| {
				src: string;
				alt?: string;
				width?: string;
				height?: string;
				wrap?: boolean;
		  }
		| {
				light: string;
				dark: string;
				alt?: string;
				width?: string;
				height?: string;
				wrap?: boolean;
		  };

	// prev-next -----------------------------------------------------------------

	export interface DocFooter {
		/**
		 * Previous page button, set to `false` to disable.
		 */
		prev?: boolean;

		/**
		 * Next page button, set to `false` to disable.
		 */
		next?: boolean;
	}

	// social link ---------------------------------------------------------------

	export interface SocialLink {
		icon: SocialLinkIcon;
		link: string;
		ariaLabel?: string;
	}

	export type SocialLinkIcon = string | { svg: string };

	// footer --------------------------------------------------------------------

	export interface Footer {
		message?: string;
		copyright?: string;
	}

	// team ----------------------------------------------------------------------

	export interface TeamMember {
		avatar: string;
		name: string;
		title?: string;
		org?: string;
		orgLink?: string;
		desc?: string;
		links?: SocialLink[];
		sponsor?: string;
		actionText?: string;
	}

	// outline -------------------------------------------------------------------

	export type OutlineItem = Omit<Header, 'slug' | 'children'> & {
		element: HTMLHeadElement;
		children?: OutlineItem[];
	};

	// local search --------------------------------------------------------------

	export interface LocalSearchOptions {
		/**
		 * @default false
		 * @deprecated Use `detailedView: false` instead.
		 */
		disableDetailedView?: boolean;

		/**
		 * If `true`, the detailed view will be enabled by default.
		 * If `false`, the detailed view will be disabled.
		 * If `'auto'`, the detailed view will be disabled by default, but can be enabled by the user.
		 *
		 * @default 'auto'
		 */
		detailedView?: boolean | 'auto';

		/**
		 * @default false
		 */
		disableQueryPersistence?: boolean;

		translations?: LocalSearchTranslations;
		locales?: Record<string, Partial<Omit<LocalSearchOptions, 'locales'>>>;

		miniSearch?: MiniSearchOptions;
	}

	interface MiniSearchOptions {
		/**
		 * @see https://lucaong.github.io/minisearch/types/MiniSearch.Options.html
		 */
		options?: Pick<_MiniSearchOptions, 'extractField' | 'tokenize' | 'processTerm'>;
		/**
		 * @see https://lucaong.github.io/minisearch/types/MiniSearch.SearchOptions.html
		 */
		searchOptions?: _MiniSearchOptions['searchOptions'];
	}

	// algolia -------------------------------------------------------------------

	/**
	 * Algolia search options. Partially copied from
	 * `@docsearch/react/dist/esm/DocSearch.d.ts`
	 */
	export interface AlgoliaSearchOptions extends DocSearchProps {
		locales?: Record<string, Partial<DocSearchProps>>;
	}
}
