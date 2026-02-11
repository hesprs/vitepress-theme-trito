<script lang="ts" setup generic="T extends TritoTheme.NavItem">
import type { TritoTheme } from '@/shared';
import VPMenuGroup from './VPMenuGroup.vue';
import VPMenuLink from './VPMenuLink.vue';

defineProps<{
	items?: T[];
}>();
</script>

<template>
	<div class="s-card VPMenu card-enhance">
		<div v-if="items" class="items">
			<template v-for="item in items" :key="JSON.stringify(item)">
				<VPMenuLink v-if="'link' in item" :item />
				<component
					v-else-if="'component' in item"
					:is="item.component"
					v-bind="item.props"
				/>
				<VPMenuGroup v-else :text="item.text" :items="item.items" />
			</template>
		</div>

		<slot />
	</div>
</template>

<style lang="scss" scoped>
.VPMenu {
	max-height: calc(100vh - var(--vp-nav-height));
}

.VPMenu :deep(.group) {
	margin: 0 -12px;
	padding: 0 12px 12px;
}

.VPMenu :deep(.group + .group) {
	border-top: 1px solid var(--vp-c-divider);
	padding: 11px 12px 12px;
}

.VPMenu :deep(.group:last-child) {
	padding-bottom: 0;
}

.VPMenu :deep(.group + .item) {
	border-top: 1px solid var(--vp-c-divider);
	padding: 11px 16px 0;
}

.VPMenu :deep(.item) {
	padding: 0 16px;
	white-space: nowrap;
}

.VPMenu :deep(.label) {
	flex-grow: 1;
	line-height: 28px;
	font-size: 12px;
	font-weight: 500;
	color: var(--vp-c-text-2);
	transition: color 0.5s;
}

.VPMenu :deep(.action) {
	padding-left: 24px;
}
</style>
