import type { ComputedRef, InjectionKey } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import { onContentUpdated } from 'vitepress';
import { computed, shallowReadonly, shallowRef, watch } from 'vue';
import type { TritoTheme } from '@/shared';
import { getSidebar, getSidebarGroups } from '@/support/sidebar';
import useData from './data';
import { getHeaders } from './outline';

const headers = shallowRef<Array<TritoTheme.OutlineItem>>([]);
const sidebar = shallowRef<Array<TritoTheme.SidebarItem>>([]);
const activeFooter = shallowRef<HTMLElement | undefined>();
const activeContent = shallowRef<HTMLElement | undefined>();

export function useLayout() {
	const { frontmatter, theme } = useData();

	const isHome = computed(() =>
		Boolean(frontmatter.value.isHome ?? frontmatter.value.layout === 'home'),
	);

	const hasAside = computed(() => {
		if (isHome.value) return false;
		if (frontmatter.value.aside) return Boolean(frontmatter.value.aside);
		return theme.value.aside !== false;
	});

	const hasSidebar = computed(
		() => frontmatter.value.sidebar !== false && sidebar.value.length > 0,
	);

	const hasOutline = computed(
		() => frontmatter.value.outline !== false && headers.value.length > 0,
	);

	const sidebarGroups = computed(() => (hasSidebar.value ? getSidebarGroups(sidebar.value) : []));

	const leftAside = computed(() => {
		if (!hasAside.value) return false;
		return !frontmatter.value.aside
			? theme.value.aside === 'left'
			: frontmatter.value.aside === 'left';
	});

	const { y } = useWindowScroll();
	const showTitle = computed(() => y.value >= 200);
	const hasLocalNav = computed(() => headers.value.length > 0);

	return {
		hasAside,
		hasLocalNav,
		hasOutline,
		hasSidebar,
		headers: shallowReadonly(headers),
		leftAside,
		showTitle,
		sidebarGroups,
	};
}

export function registerWatchers() {
	const { frontmatter, theme, page } = useData();

	watch(
		() => [page.value.relativePath, theme.value.sidebar] as const,
		([relativePath, sidebarConfig]) => {
			const newSidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
			if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value))
				sidebar.value = newSidebar;
		},
		{ deep: true, flush: 'sync', immediate: true },
	);

	onContentUpdated(() => {
		headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
	});
}

export function registerFooter(footer: HTMLElement | null) {
	if (footer) activeFooter.value = footer;
}

export function registerContent(content: HTMLElement | null) {
	if (content) activeContent.value = content;
}

export type LayoutInfo = {
	heroImageSlotExists: ComputedRef<boolean>;
};

export const layoutInfoInjectionKey: InjectionKey<LayoutInfo> = Symbol('layout-info');
