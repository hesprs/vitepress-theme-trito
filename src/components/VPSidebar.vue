<script lang="ts" setup>
import { useScrollLock, useWindowSize } from '@vueuse/core';
import { ref, watch, useTemplateRef, computed } from 'vue';
import { useLayout } from '@/composables/layout';
import VPSidebarGroup from './VPSidebarGroup.vue';
import { useSidebarControl } from '@/composables/sidebar';
import { inBrowser } from 'vitepress';

const { sidebarGroups, hasSidebar } = useLayout();
const { isOpen } = useSidebarControl();
const { width } = useWindowSize();

// a11y: focus Nav element when menu has opened
const navEl = useTemplateRef('navEl');
const isLocked = useScrollLock(inBrowser ? document.body : null);

watch(isOpen, () => {
	if (isOpen.value) {
		isLocked.value = true;
		navEl.value?.focus();
	} else isLocked.value = false;
});

const key = ref(0);

watch(sidebarGroups, () => (key.value += 1), { deep: true });

const needSidebar = computed(() => hasSidebar.value && width.value <= 960);
</script>

<template>
	<div v-if="needSidebar" class="shade" :class="{ open: isOpen }" @click="isOpen = false" />
	<aside v-if="needSidebar" class="VPSidebar" :class="{ open: isOpen }" ref="navEl" @click.stop>
		<nav class="nav" id="VPSidebarNav" aria-label="Sidebar Navigation" tabindex="-1">
			<slot name="sidebar-nav-before" />
			<VPSidebarGroup :items="sidebarGroups" :key />
			<slot name="sidebar-nav-after" />
		</nav>
	</aside>
</template>

<style lang="scss" scoped>
.VPSidebar {
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	z-index: var(--vp-z-index-sidebar);
	padding: 32px;
	width: calc(100vw - 64px);
	max-width: 320px;
	background-color: var(--vp-sidebar-bg-color);
	overflow: hidden scroll;
	transform: translateX(-100%);
	transition: transform 0.25s ease;
	pointer-events: none;
	box-shadow: var(--vp-shadow-3);
	&.open {
		pointer-events: auto;
		transform: translateX(0);
		transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
	}
}

.shade {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: calc(var(--vp-z-index-sidebar) - 1);
	background-color: transparent;
	pointer-events: none;
	transition: background-color 0.25s ease;
	&.open {
		pointer-events: auto;
		background-color: var(--vp-c-faint);
	}
}

.nav {
	outline: 0;
}
</style>
