<script setup lang="ts">
import { IconMenu2, IconChevronDown } from '@tabler/icons-vue';
import { watch, ref, useTemplateRef } from 'vue';
import { useI18n } from '@/composables/i18n';
import { useLayout } from '@/composables/layout';
import VPSidebarGroup from './VPSidebarGroup.vue';

const i18n = useI18n();
const collapsed = ref(false);
const { sidebarGroups, hasSidebar } = useLayout();
const key = ref(0);
const sidebar = useTemplateRef('sidebar');
const expand = useTemplateRef('expand');

watch(
	sidebarGroups,
	() => {
		key.value += 1;
	},
	{ deep: true },
);

watch(collapsed, () => {
	console.log(collapsed.value);
	if (collapsed.value) sidebar.value?.scrollTo(0, 0);
});

function toggle(e: PointerEvent) {
	if (expand.value?.contains(e.target as Node)) {
		if (!collapsed.value) collapsed.value = true;
		else collapsed.value = false;
	} else if (collapsed.value) collapsed.value = false;
}
</script>

<template>
	<div class="sidebar-wrapper" :class="{ collapse: collapsed }" v-if="hasSidebar">
		<nav
			aria-labelledby="doc-sidebar-aria-label"
			class="VPDocAsideSidebar s-card"
			:class="{
				'card-enhance': collapsed,
				hover: collapsed,
			}"
			@click="toggle"
			ref="sidebar"
		>
			<div
				aria-level="2"
				class="sidebar-title"
				id="doc-outline-sidebar-label"
				role="heading"
				ref="expand"
			>
				<IconMenu2 class="icon-toc" />
				{{ i18n.menu }}
				<IconChevronDown class="expand" />
			</div>
			<div class="content">
				<VPSidebarGroup :items="sidebarGroups" :key />
			</div>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
.sidebar-wrapper {
	min-height: 58px;
	flex: 1;
	transition: flex 0.4s;
	&.collapse {
		flex: 0;
		height: 58px;
	}
}

.VPDocAsideSidebar {
	padding-left: 16px;
	overflow: scroll;
	overscroll-behavior: contain;
	max-height: 100%;
	.collapse & {
		overflow: hidden;
		cursor: pointer;
	}
}

.content {
	position: relative;
	font-size: 13px;
	padding: 0 12px 0 8px;
}

.expand {
	margin-left: auto;
	transition: transform 0.4s;
	.collapse & {
		transform: rotate(-90deg);
	}
}

.sidebar-title {
	line-height: 32px;
	font-size: 14px;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 4px;
	background-color: transparent;
	cursor: pointer;
	border-radius: 8px;
	transition:
		background-color 0.25s,
		padding 0.25s;
	.sidebar-wrapper:not(.collapse) &:hover,
	.collapse:hover & {
		background-color: var(--vp-c-brand-soft);
		color: var(--vp-c-brand-1);
		padding: 0 8px;
	}
}
</style>
