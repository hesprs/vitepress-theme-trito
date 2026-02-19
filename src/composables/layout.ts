import { useElementSize, useWindowScroll, useWindowSize } from '@vueuse/core';
import { onContentUpdated } from 'vitepress';
import { inBrowser } from 'vitepress';
import {
	type ComputedRef,
	computed,
	type InjectionKey,
	ref,
	shallowReadonly,
	shallowRef,
	watch,
	type Ref,
	type ShallowRef,
} from 'vue';
import type { TritoTheme } from '@/shared';
import { getSidebar, getSidebarGroups } from '@/support/sidebar';
import { useData } from './data';
import { getHeaders } from './outline';

const headers = shallowRef<TritoTheme.OutlineItem[]>([]);
const sidebar = shallowRef<TritoTheme.SidebarItem[]>([]);
let footerHeight: Ref<number> | undefined = undefined;
let contentHeight: Ref<number> | undefined = undefined;
const maxAsideHeightOffset = ref(0);
const showTitle = ref(false);
const { y } = useWindowScroll();
const { height: windowHeight } = useWindowSize();
const { height: scrollHeight } = inBrowser ? useElementSize(document.body) : useElementSize(ref());
const navSpace = inBrowser
	? parseInt(getCSSVariable('--vp-nav-height', '0px')) +
		parseInt(getCSSVariable('--vp-nav-top', '0px'))
	: 0;

export function useLayout() {
	const { frontmatter, theme } = useData();

	const isHome = computed(() => {
		return !!(frontmatter.value.isHome ?? frontmatter.value.layout === 'home');
	});

	const hasAside = computed(() => {
		if (isHome.value) return false;
		if (frontmatter.value.aside != null) return !!frontmatter.value.aside;
		return theme.value.aside !== false;
	});

	const hasSidebar = computed(() => {
		return frontmatter.value.sidebar !== false && sidebar.value.length > 0;
	});

	const hasOutline = computed(() => {
		return frontmatter.value.outline !== false && headers.value.length > 0;
	});

	const sidebarGroups = computed(() => {
		return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
	});

	const leftAside = computed(() => {
		if (!hasAside.value) return false;
		return frontmatter.value.aside == null
			? theme.value.aside === 'left'
			: frontmatter.value.aside === 'left';
	});

	const hasLocalNav = computed(() => {
		return headers.value.length > 0;
	});

	return {
		hasAside,
		leftAside,
		headers: shallowReadonly(headers),
		hasLocalNav,
		hasSidebar,
		showTitle,
		sidebarGroups,
		maxAsideHeightOffset,
		hasOutline,
	};
}

export function registerWatchers() {
	const { frontmatter, theme, page } = useData();

	watch(
		() => [page.value.relativePath, theme.value.sidebar] as const,
		([relativePath, sidebarConfig]) => {
			const newSidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
			if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value)) {
				sidebar.value = newSidebar;
			}
		},
		{ immediate: true, deep: true, flush: 'sync' },
	);

	onContentUpdated(() => {
		headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
	});

	watch(y, () => (showTitle.value = y.value >= 200));

	watch([y, windowHeight, scrollHeight], calcOffset);
}

function calcOffset() {
	if (!contentHeight || !footerHeight) return;
	if (contentHeight.value + navSpace + footerHeight.value + 72 <= windowHeight.value)
		maxAsideHeightOffset.value = footerHeight.value + 8;
	else
		maxAsideHeightOffset.value = Math.max(
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

export interface LayoutInfo {
	heroImageSlotExists: ComputedRef<boolean>;
}

export const layoutInfoInjectionKey: InjectionKey<LayoutInfo> = Symbol('layout-info');

function getCSSVariable(name: string, fallback: string) {
	const style = window.getComputedStyle(document.documentElement);
	const value = style.getPropertyValue(name);
	return value.trim() ?? fallback;
}
