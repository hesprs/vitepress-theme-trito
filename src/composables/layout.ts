import type { TritoTheme } from '@/shared';
import { useWindowScroll, useWindowSize } from '@vueuse/core';
import { onContentUpdated } from 'vitepress';
import {
	type ComputedRef,
	computed,
	type InjectionKey,
	ref,
	shallowReadonly,
	shallowRef,
	watchPostEffect,
	watch,
} from 'vue';

import { getSidebar, getSidebarGroups } from '@/support/sidebar';

import { useData } from './data';
import { getHeaders } from './outline';

const headers = shallowRef<TritoTheme.OutlineItem[]>([]);
const sidebar = shallowRef<TritoTheme.SidebarItem[]>([]);
let footer: null | HTMLElement = null;
const maxAsideHeightOffset = ref(0);
const showTitle = ref(false);
const { y } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

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

	watchPostEffect(() => {
		showTitle.value = y.value >= 300;
		computeOffset();
	});

	watch(windowHeight, computeOffset, { immediate: true });
}

export function registerFooter(_footer: HTMLElement) {
	footer = _footer;
}

function computeOffset() {
	maxAsideHeightOffset.value = Math.max(
		0,
		(footer?.clientHeight ?? 0) +
			8 -
			(document.body.clientHeight - y.value - windowHeight.value),
	);
}

export interface LayoutInfo {
	heroImageSlotExists: ComputedRef<boolean>;
}

export const layoutInfoInjectionKey: InjectionKey<LayoutInfo> = Symbol('layout-info');
