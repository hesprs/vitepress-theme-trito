<script lang="ts" setup>
import { useData } from '@/composables/data';
import { useLayout } from '@/composables/layout';
import VPNavBarMenuGroup from './VPNavBarMenuGroup.vue';
import VPNavBarMenuLink from './VPNavBarMenuLink.vue';

const { showTitle } = useLayout();
const { theme, page, title } = useData();
</script>

<template>
	<div class="VPNavBarMenu" :class="{ 'show-title': showTitle }" v-if="theme.nav">
		<nav aria-label="Main Navigation" class="nav flex-center">
			<template v-for="item in theme.nav" :key="JSON.stringify(item)">
				<VPNavBarMenuLink v-if="'link' in item" :item />
				<component
					v-else-if="'component' in item"
					:is="item.component"
					v-bind="item.props"
				/>
				<VPNavBarMenuGroup v-else :item />
			</template>
		</nav>
		<h4 class="title">{{ page.title || title }}</h4>
	</div>
</template>

<style lang="scss" scoped>
.nav {
	height: var(--vp-nav-height);
	gap: 8px;
}
.title {
	display: flex;
	align-items: center;
	font-weight: 500;
	user-select: none;
	height: var(--vp-nav-height);
	@media (max-width: 960px) {
		display: none;
	}
}
.VPNavBarMenu {
	display: none;
	margin: auto;
	align-items: center;
	transition:
		transform 0.3s,
		opacity 0.2s;
	@media (min-width: 768px) {
		display: flex;
		flex-direction: column;
	}
	@media (min-width: 960px) {
		&.show-title {
			transform: translateY(calc(0px - var(--vp-nav-height)));
		}
	}
}
</style>
