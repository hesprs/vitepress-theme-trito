import type { ComputedRef, InjectionKey, Ref, ShallowRef } from 'vue';
import { useElementSize, useWindowScroll, useWindowSize } from '@vueuse/core';
import { onContentUpdated, inBrowser } from 'vitepress';
import { computed, ref, shallowReadonly, shallowRef, watch } from 'vue';
import type { TritoTheme } from '@/shared';
import { getSidebar, getSidebarGroups } from '@/support/sidebar';
import useData from './data';
import { getHeaders } from './outline';

const headers = shallowRef<Array<TritoTheme.OutlineItem>>([]);
const sidebar = shallowRef<Array<TritoTheme.SidebarItem>>([]);
let footerHeight: Ref<number> | undefined = undefined;
let contentHeight: Ref<number> | undefined = undefined;
const maxAsideHeightOffset = ref(0);
const showTitle = ref(false);
const { y } = useWindowScroll();
const { height: windowHeight } = useWindowSize();
const { height: scrollHeight } = inBrowser
	? useElementSize(document.body)
	: useElementSize(ref<HTMLElement>());
const navSpace = inBrowser
	? parseInt(getCSSVariable('--vp-nav-height', '0px')) +
		parseInt(getCSSVariable('--vp-nav-top', '0px'))
	: 0;

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

	const hasLocalNav = computed(() => headers.value.length > 0);

	return {
		hasAside,
		hasLocalNav,
		hasOutline,
		hasSidebar,
		headers: shallowReadonly(headers),
		leftAside,
		maxAsideHeightOffset,
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

	watch(y, () => (showTitle.value = y.value >= 200));

	watch([y, windowHeight, scrollHeight], calcOffset);
}

function calcOffset() {
	if (!contentHeight || !footerHeight) return;
	maxAsideHeightOffset.value =
		contentHeight.value + navSpace + footerHeight.value + 72 <= windowHeight.value
			? footerHeight.value + 8
			: Math.max(
					0,
					footerHeight.value + 8 - (scrollHeight.value - y.value - windowHeight.value),
				);
}

export function registerFooter(footer: ShallowRef<HTMLElement | null>) {
	footerHeight = useElementSize(
		footer,
		{ height: 50, width: 1000 },
		{ box: 'border-box' },
	).height;
	watch(footerHeight, calcOffset);
}

export function registerContent(footer: ShallowRef<HTMLElement | null>) {
	contentHeight = useElementSize(
		footer,
		{ height: 200, width: 500 },
		{ box: 'border-box' },
	).height;
	watch(contentHeight, calcOffset);
}

export type LayoutInfo = {
	heroImageSlotExists: ComputedRef<boolean>;
};

export const layoutInfoInjectionKey: InjectionKey<LayoutInfo> = Symbol('layout-info');

function getCSSVariable(name: string, fallback: string) {
	const style = window.getComputedStyle(document.documentElement);
	const value = style.getPropertyValue(name);
	return value.trim() ?? fallback;
}
