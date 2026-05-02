import type { DefaultTheme } from 'vitepress/theme';
import { isActive } from '@/shared';
import { ensureStartingSlash } from './utils';

export type SidebarLink = {
	text: string;
	link: string;
	docFooterText?: string;
};

type SidebarItem = DefaultTheme.SidebarItem;

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export function getSidebar(
	_sidebar: DefaultTheme.Sidebar | undefined,
	path: string,
): Array<SidebarItem> {
	if (Array.isArray(_sidebar)) return addBase(_sidebar);
	if (!_sidebar) return [];

	path = ensureStartingSlash(path);

	const directory = Object.keys(_sidebar)
		.sort((a, b) => b.split('/').length - a.split('/').length)
		.find((dir) => path.startsWith(ensureStartingSlash(dir)));

	const sidebar = directory ? _sidebar[directory] : [];
	return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}

/**
 * Get or generate sidebar group from the given sidebar items.
 */
export function getSidebarGroups(sidebar: Array<SidebarItem>): Array<SidebarItem> {
	const groups: Array<SidebarItem> = [];

	let lastGroupIndex = 0;

	for (const item of sidebar) {
		if (item.items) {
			lastGroupIndex = groups.push(item);
			continue;
		}
		if (!groups[lastGroupIndex]) groups.push({ items: [] });
		groups[lastGroupIndex]?.items?.push(item);
	}

	return groups;
}

export function getFlatSideBarLinks(sidebar: Array<SidebarItem>): Array<SidebarLink> {
	const links: Array<SidebarLink> = [];

	function recursivelyExtractLinks(items: Array<SidebarItem>) {
		for (const item of items) {
			if (item.text && item.link)
				links.push({
					docFooterText: item.docFooterText,
					link: item.link,
					text: item.text,
				});

			if (item.items) recursivelyExtractLinks(item.items);
		}
	}

	recursivelyExtractLinks(sidebar);

	return links;
}

/**
 * Check if the given sidebar item contains any active link.
 */
export function hasActiveLink(path: string, items: SidebarItem | Array<SidebarItem>): boolean {
	if (Array.isArray(items)) return items.some((item) => hasActiveLink(path, item));

	return isActive(path, items.link)
		? true
		: items.items
			? hasActiveLink(path, items.items)
			: false;
}

function addBase(items: Array<SidebarItem>, _base?: string): Array<SidebarItem> {
	return [...items].map((item) => {
		const base = item.base || _base;
		if (base && item.link)
			item.link = base + item.link.replace(/^\//, base.endsWith('/') ? '' : '/');
		if (item.items) item.items = addBase(item.items, base);
		return item;
	});
}
