<script lang="ts" setup generic="T extends TritoTheme.NavItem">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import type { TritoTheme } from '@/shared';
import VPMenu from './VPMenu.vue';

defineProps<{
	icon?: string;
	button?: string;
	label?: string;
	items?: T[];
	noChevron?: boolean;
}>();

const open = ref(false);
const menu = useTemplateRef('menu');

const handleClickOutside = (e: PointerEvent) => {
	if (open.value && !menu.value?.contains(e.target as Node)) open.value = false;
};

onMounted(() => {
	window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
	<div class="VPFlyout flex-center" ref="menu">
		<button
			type="button"
			aria-haspopup="true"
			:aria-expanded="open"
			:aria-label="label"
			@click="open = !open"
		>
			<span v-if="button || icon || $slots.icon" class="text flex-center">
				<slot name="icon" />
				<span v-if="icon" :class="[icon, 'option-icon']" />
				<span v-if="button" v-html="button" />
				<span v-if="!noChevron" class="vpi-chevron-down text-icon" />
			</span>

			<span v-else class="vpi-more-horizontal icon" />
		</button>

		<div class="menu" :class="{ open: open }" @mouseleave="open = false">
			<VPMenu :items>
				<slot />
			</VPMenu>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.VPFlyout {
	position: relative;
}

.text {
	font-size: 16px;
	font-weight: 500;
}

.option-icon {
	margin-right: 0px;
	font-size: 16px;
}

.text-icon {
	margin-left: 4px;
	font-size: 14px;
}

.icon {
	font-size: 20px;
}

.menu {
	z-index: 100;
	display: flex;
	justify-content: center;
	position: absolute;
	top: calc(100% + 10px);
	width: 0;
	overflow: visible;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.25s;
	&.open {
		pointer-events: auto;
		opacity: 1;
	}
}
</style>
