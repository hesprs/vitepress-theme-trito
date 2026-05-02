<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { TritoTheme } from '@/shared';
import VPSidebarItem from './VPSidebarItem.vue';

const { items } = defineProps<{ items: Array<TritoTheme.SidebarItem> }>();

const disableTransition = ref(true);

let timer: NodeJS.Timeout | undefined;

onMounted(() => {
	timer = setTimeout(() => {
		timer = undefined;
		disableTransition.value = false;
	}, 300);
});

onBeforeUnmount(() => {
	if (timer) {
		clearTimeout(timer);
		timer = undefined;
	}
});
</script>

<template>
	<div
		v-for="item in items"
		:key="item.text"
		class="group"
		:class="{ 'no-transition': disableTransition }"
	>
		<VPSidebarItem :item :depth="0" />
	</div>
</template>

<style scoped>
.no-transition :deep(.caret-icon) {
	transition: none;
}

.group + .group {
	border-top: 1px solid var(--vp-c-divider);
	padding-top: 10px;
}

@media (min-width: 960px) {
	.group {
		padding-top: 10px;
		width: calc(var(--vp-sidebar-width) - 64px);
	}
}
</style>
