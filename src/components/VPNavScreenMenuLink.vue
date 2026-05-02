<script lang="ts" setup>
import { computed, inject } from 'vue';
import type { NavExposedMethods } from '@/composables/nav';
import type { TritoTheme } from '@/shared';
import useData from '@/composables/data';
import { navInjectionKey } from '@/composables/nav';
import { isActive } from '@/shared';
import VPLink from './VPLink.vue';

const { item } = defineProps<{
	item: TritoTheme.NavItemWithLink;
}>();

const { page } = useData();

const href = computed(() => (typeof item.link === 'function' ? item.link(page.value) : item.link));

const isActiveLink = computed(() =>
	isActive(page.value.relativePath, item.activeMatch || href.value, Boolean(item.activeMatch)),
);

const { closeScreen } = inject(navInjectionKey) as NavExposedMethods;
</script>

<template>
	<VPLink
		:class="{ VPNavScreenMenuLink: true, active: isActiveLink }"
		:href
		:target="item.target"
		:rel="item.rel"
		:no-icon="item.noIcon"
		@click="closeScreen"
	>
		<span v-html="item.text"></span>
	</VPLink>
</template>

<style lang="scss" scoped>
.VPNavScreenMenuLink {
	display: block;
	border-bottom: 1px solid var(--vp-c-divider);
	padding: 12px 0 11px;
	line-height: 24px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-1);
	transition:
		border-color 0.25s,
		color 0.25s;
	&:hover,
	&.active {
		color: var(--vp-c-brand-1);
	}
}
</style>
