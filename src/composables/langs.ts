import { useRoute } from 'vitepress';
import { computed } from 'vue';
import { ensureStartingSlash } from '@/support/utils';
import useData from './data';

export default function useLangs({ linkToCorrespondingPage = false } = {}) {
	const data = useData();
	const route = useRoute();
	const { site, localeIndex } = data;
	const currentLang = computed(() => ({
		label: site.value.locales[localeIndex.value]?.label,
		link:
			site.value.locales[localeIndex.value]?.link ||
			(localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`),
	}));
	const localeLinks = computed(() =>
		Object.entries(site.value.locales).flatMap(([key, value]) =>
			currentLang.value.label === value.label
				? []
				: {
						dir: value.dir,
						lang: value.lang,
						link: resolveLocaleLink(data, route, {
							currentLocaleLink: currentLang.value.link,
							linkToCorrespondingPage,
							targetLocale: key,
							targetLocaleLink: value.link || (key === 'root' ? '/' : `/${key}/`),
						}),
						text: value.label,
					},
		),
	);

	return { currentLang, localeLinks };
}

/**
 * Resolves the link used for switching from the current page to
 * `targetLocale`. Without `linkToCorrespondingPage`, this is simply the home
 * of the target locale. With it, the current page's path is rewritten into
 * the target locale (honoring `cleanUrls`) — unless
 * `themeConfig.i18nRouting` is `false` (the locale home is used instead) or
 * a function (which then fully controls the resolution).
 *
 * The current query and hash are carried over, except when a custom
 * `i18nRouting` function is used.
 */
function resolveLocaleLink(
	data: ReturnType<typeof useData>,
	route: ReturnType<typeof useRoute>,
	{
		targetLocale,
		targetLocaleLink,
		currentLocaleLink,
		linkToCorrespondingPage,
	}: {
		targetLocale: string;
		targetLocaleLink: string;
		currentLocaleLink: string;
		linkToCorrespondingPage: boolean;
	},
) {
	const { site, theme, page } = data;
	const i18nRouting = theme.value.i18nRouting;
	if (linkToCorrespondingPage && typeof i18nRouting === 'function')
		return i18nRouting(data, route, targetLocale);
	return (
		normalizeLink(
			targetLocaleLink,
			i18nRouting !== false && linkToCorrespondingPage,
			page.value.relativePath.slice(currentLocaleLink.length - 1),
			!site.value.cleanUrls,
		) +
		route.query +
		route.hash
	);
}

function normalizeLink(link: string, addPath: boolean, path: string, addExt: boolean) {
	return addPath
		? link.replace(/\/$/, '') +
				ensureStartingSlash(
					path
						.replace(/(?<pathPrefix>^|\/)index\.md$/, '$<pathPrefix>')
						.replace(/\.md$/, addExt ? '.html' : ''),
				)
		: link;
}
