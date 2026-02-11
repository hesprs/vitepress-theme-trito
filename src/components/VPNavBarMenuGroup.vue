<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from '@/composables/data';
import type { TritoTheme } from '@/shared';
import { isActive } from '@/shared';
import VPFlyout from './VPFlyout.vue';

const props = defineProps<{
	item: TritoTheme.NavItemWithChildren;
}>();

const { page } = useData();

const isChildActive = (navItem: TritoTheme.NavItem) => {
	if ('component' in navItem) return false;

	if ('link' in navItem) {
		return isActive(
			page.value.relativePath,
			typeof navItem.link === 'function' ? navItem.link(page.value) : navItem.link,
			!!props.item.activeMatch,
		);
	}

	return navItem.items.some(isChildActive);
};

const childrenActive = computed(() => isChildActive(props.item));
</script>

<template>
	<VPFlyout
		class="nav-btn"
		style="padding: 4px 12px"
		:class="{
			active:
				isActive(page.relativePath, item.activeMatch, !!item.activeMatch) || childrenActive,
		}"
		:button="item.text"
		:items="item.items"
	/>
</template>
