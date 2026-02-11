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
	transition: opacity 0.2s;
	opacity: 1;
	.show-title & {
		opacity: 0;
		& * {
			pointer-events: none;
		}
	}
}
.title {
	transition: opacity 0.2s;
	font-weight: 500;
	opacity: 0;
	user-select: none;
	.show-title & {
		opacity: 1;
		user-select: auto;
	}
	@media (max-width: 960px) {
		display: none;
	}
}
.VPNavBarMenu {
	display: none;
	margin: auto;
	flex-direction: column;
	align-items: center;
	transition:
		transform 0.3s,
		opacity 0.2s;
	@media (min-width: 768px) {
		display: flex;
	}
	@media (min-width: 960px) {
		&.show-title {
			transform: translateY(-43px);
		}
	}
}
</style>
