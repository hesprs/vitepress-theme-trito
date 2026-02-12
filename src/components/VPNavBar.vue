<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core';
import { ref, watchPostEffect } from 'vue';
import VPLocalNav from '@/components/VPLocalNav.vue';
import { useLayout } from '@/composables/layout';
import VPNavBarAppearance from './VPNavBarAppearance.vue';
import VPNavBarHamburger from './VPNavBarHamburger.vue';
import VPNavBarMenu from './VPNavBarMenu.vue';
import VPNavBarSearch from './VPNavBarSearch.vue';
import VPNavBarTitle from './VPNavBarTitle.vue';
import VPNavBarTranslations from './VPNavBarTranslations.vue';

const props = defineProps<{
	isScreenOpen: boolean;
}>();

defineEmits<(e: 'toggle-screen') => void>();

const { y } = useWindowScroll();
const { showTitle } = useLayout();

const classes = ref<Record<string, boolean>>({});

watchPostEffect(() => {
	classes.value = {
		top: y.value <= 1,
		'screen-open': props.isScreenOpen,
		'show-title': showTitle.value,
	};
});
</script>

<template>
	<div class="VPNavBar" :class="classes">
		<div class="container">
			<div class="title">
				<VPNavBarTitle>
					<template #nav-bar-title-before>
						<slot name="nav-bar-title-before" />
					</template>
					<template #nav-bar-title-after>
						<slot name="nav-bar-title-after" />
					</template>
				</VPNavBarTitle>
			</div>

			<VPNavBarMenu />

			<div class="content-body">
				<slot name="nav-bar-content-before" />
				<VPNavBarSearch />
				<VPNavBarTranslations />
				<VPNavBarAppearance />
				<slot name="nav-bar-content-after" />
				<VPNavBarHamburger :active="isScreenOpen" @click="$emit('toggle-screen')" />
			</div>
		</div>
		<VPLocalNav />
	</div>
</template>

<style lang="scss" scoped>
.VPNavBar {
	position: relative;
	height: var(--vp-nav-height);
	white-space: nowrap;
	margin: 0 auto;
	top: var(--vp-nav-top);
	border-radius: calc(var(--vp-nav-height) / 2);
	max-width: var(--vp-layout-max-width);
	width: calc(100% - var(--vp-nav-top) * 2);
	border: 1px solid var(--vp-c-border);
	box-shadow: var(--vp-shadow-2);
	transition:
		background-color 0.25s,
		border 0.25s,
		backdrop-filter 0.25s,
		box-shadow 0.25s;
	background-color: var(--vp-nav-bg-color);
	backdrop-filter: blur(20px) saturate(140%);
	&.top:not(.screen-open) {
		border: 1px solid transparent;
		background-color: transparent;
		backdrop-filter: none;
		box-shadow: none;
	}
}

.container {
	transition:
		transform 0.3s,
		opacity 0.2s;
	padding: 0 8px 0 16px;
	@media (max-width: 960px) {
		.show-title & {
			transform: translateY(-55px);
		}
	}
	display: flex;
	justify-content: space-between;
	height: var(--vp-nav-height);
}

.title {
	flex-shrink: 0;
	height: calc(var(--vp-nav-height) - 1px);
	transition: background-color 0.5s;
}

.content-body {
	display: flex;
	align-items: center;
	gap: 12px;
	height: var(--vp-nav-height);
	transition: background-color 0.5s;
	@media (max-width: 960px) {
		gap: 8px;
	}
}
</style>
