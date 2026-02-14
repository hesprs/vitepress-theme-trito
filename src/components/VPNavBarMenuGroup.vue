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

const isActiveGroup = computed(() => {
	if (props.item.activeMatch) {
		return isActive(page.value.relativePath, props.item.activeMatch, true);
	}
	return isChildActive(props.item);
});

function isChildActive(navItem: TritoTheme.NavItem): boolean {
	if ('component' in navItem) return false;

	if ('link' in navItem) {
		const href = typeof navItem.link === 'function' ? navItem.link(page.value) : navItem.link;
		return isActive(
			page.value.relativePath,
			navItem.activeMatch || href,
			!!navItem.activeMatch,
		);
	}

	return navItem.items.some(isChildActive);
}
</script>

<template>
	<VPFlyout
		class="nav-btn"
		style="padding: 4px 12px"
		:class="{ active: isActiveGroup }"
		:button="item.text"
		:items="item.items"
	/>
</template>
