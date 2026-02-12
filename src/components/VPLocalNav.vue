<script lang="ts" setup>
import { useData } from '@/composables/data';
import { useLayout } from '@/composables/layout';
import { useI18n } from '@/composables/i18n';
import VPLocalNavOutlineDropdown from './VPLocalNavOutlineDropdown.vue';
import { useSidebarControl } from '@/composables/sidebar';

const { page, title, theme } = useData();
const { headers } = useLayout();
const i18n = useI18n();
const { isOpen, open } = useSidebarControl();
</script>

<template>
	<div class="VPLocalNav">
		<button
			v-if="theme.sidebar"
			class="menu"
			:aria-expanded="isOpen"
			aria-controls="VPSidebarNav"
			@click="open"
		>
			<span class="vpi-align-left menu-icon"></span>
			<span class="menu-text">{{ i18n.menu }}</span>
		</button>
		<h4 class="title">{{ page.title || title }}</h4>
		<VPLocalNavOutlineDropdown :headers />
	</div>
</template>

<style lang="scss" scoped>
.VPLocalNav {
	z-index: var(--vp-z-index-local-nav);
	height: var(--vp-nav-height);
	width: 100%;
	opacity: 0;
	transition:
		transform 0.3s,
		opacity 0.2s;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 18px;
	@media (max-width: 960px) {
		.show-title & {
			pointer-events: auto;
			opacity: 1;
			transform: translateY(-55px);
		}
	}
	@media (min-width: 960px) {
		top: var(--vp-nav-space);
	}
	@media (min-width: 1280px) {
		display: none;
	}
}

.menu {
	display: flex;
	align-items: center;
	line-height: 24px;
	font-size: 10px;
	font-weight: 500;
	color: var(--vp-c-text-2);
	transition: color 0.5s;
	@media (min-width: 960px) {
		display: none;
	}
	&:hover {
		color: var(--vp-c-text-1);
		transition: color 0.25s;
	}
	min-width: 80px;
}

.menu-icon {
	margin-right: 8px;
	font-size: 14px;
}

.menu,
:deep(.VPLocalNavOutlineDropdown > button) {
	padding: 12px 0 11px;
	@media (min-width: 768px) {
		padding: 12px 0 11px;
	}
}

.title {
	font-weight: 500;
	font-size: 0.9em;
}
</style>
