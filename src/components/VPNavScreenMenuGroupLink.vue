<script lang="ts" setup>
import { computed, inject } from 'vue';
import { useData } from '@/composables/data';
import { type NavExposedMethods, navInjectionKey } from '@/composables/nav';
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

const isActiveLink = computed(() =>
	isActive(
		page.value.relativePath,
		props.item.activeMatch || href.value,
		!!props.item.activeMatch,
	),
);

const { closeScreen } = inject(navInjectionKey) as NavExposedMethods;
</script>

<template>
	<VPLink
		:class="{ VPNavScreenMenuGroupLink: true, active: isActiveLink }"
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
.VPNavScreenMenuGroupLink {
	display: block;
	margin-left: 12px;
	line-height: 32px;
	font-size: 14px;
	font-weight: 400;
	color: var(--vp-c-text-1);
	transition: color 0.25s;
	&:hover,
	&.active {
		color: var(--vp-c-brand-1);
	}
}
</style>
