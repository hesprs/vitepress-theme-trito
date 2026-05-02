<script lang="ts" setup generic="T extends TritoTheme.NavItem">
import { IconChevronDown } from '@tabler/icons-vue';
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import type { TritoTheme } from '@/shared';
import VPMenu from './VPMenu.vue';

const { icon, button, label, items, noChevron } = defineProps<{
	icon?: string;
	button?: string;
	label?: string;
	items?: Array<T>;
	noChevron?: boolean;
}>();

const open = ref(false);
const menuLeft = ref(0);
const flyout = useTemplateRef('flyout');
const buttonRef = useTemplateRef('buttonRef');

const handleClickOutside = (e: PointerEvent) => {
	if (open.value && !flyout.value?.contains(e.target as Node)) open.value = false;
};

onMounted(() => {
	window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	window.removeEventListener('click', handleClickOutside);
});

watch(open, (value) => {
	if (!buttonRef.value || !value) return;
	const boundingRect = buttonRef.value.getBoundingClientRect();
	menuLeft.value = boundingRect.left + boundingRect.width / 2;
});
</script>

<template>
	<div class="VPFlyout flex-center" ref="flyout">
		<button
			type="button"
			aria-haspopup="true"
			:aria-expanded="open"
			:aria-label="label"
			@click="open = !open"
			@mouseenter="open = true"
			ref="buttonRef"
		>
			<span v-if="button || icon || $slots.icon" class="text flex-center">
				<slot name="icon" />
				<span v-if="icon" :class="[icon, 'option-icon']" />
				<span v-if="button" v-html="button" />
				<IconChevronDown v-if="!noChevron" class="text-icon" />
			</span>

			<span v-else class="vpi-more-horizontal icon" />
		</button>

		<Teleport defer to=".VPNav">
			<Transition name="fadeDown">
				<div
					class="menu"
					v-if="open"
					@mouseleave="open = false"
					:style="{ left: `${menuLeft}px` }"
				>
					<VPMenu :items>
						<slot />
					</VPMenu>
				</div>
			</Transition>
		</Teleport>
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
	width: 14px;
	height: 14px;
}

.icon {
	font-size: 20px;
}

.menu {
	display: flex;
	justify-content: center;
	position: absolute;
	top: calc(100% + 10px);
	width: 0;
	overflow: visible;
}
</style>
