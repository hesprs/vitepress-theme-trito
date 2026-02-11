<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from '@/composables/data';
import type { TritoTheme } from '@/shared';
import { isActive } from '@/shared';
import VPLink from './VPLink.vue';

const props = defineProps<{
	item: TritoTheme.NavItemWithLink;
}>();

const { page } = useData();

const href = computed(() =>
	typeof props.item.link === 'function' ? props.item.link(page.value) : props.item.link,
);
</script>

<template>
	<VPLink
		class="nav-btn"
		style="padding: 4px 12px"
		:class="{
			active: isActive(page.relativePath, item.activeMatch || href, !!item.activeMatch),
		}"
		:href
		:target="item.target"
		:rel="item.rel"
		:no-icon="item.noIcon"
		tabindex="0"
	>
		<span v-html="item.text"></span>
	</VPLink>
</template>
