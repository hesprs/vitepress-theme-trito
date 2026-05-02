<script lang="ts" setup>
import { computed } from 'vue';
import type { TritoTheme } from '@/shared';
import useData from '@/composables/data';
import { isActive } from '@/shared';
import VPLink from './VPLink.vue';

const { item } = defineProps<{ item: TritoTheme.NavItemWithLink }>();

const { page } = useData();

const href = computed(() => (typeof item.link === 'function' ? item.link(page.value) : item.link));

const isActiveLink = computed(() =>
	isActive(page.value.relativePath, item.activeMatch || href.value, Boolean(item.activeMatch)),
);
</script>

<template>
	<VPLink
		class="nav-btn"
		style="padding: 4px 12px"
		:class="{ active: isActiveLink }"
		:href
		:target="item.target"
		:rel="item.rel"
		:no-icon="item.noIcon"
		tabindex="0"
	>
		<span v-html="item.text"></span>
	</VPLink>
</template>
