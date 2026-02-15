<script setup lang="ts">
import { IconArrowBarToUp, IconChevronLeft } from '@tabler/icons-vue';
import { onKeyStroke } from '@vueuse/core';
import { onContentUpdated } from 'vitepress';
import { nextTick, ref, watch } from 'vue';
import { scrollToTop as toTop } from '@/composables/context-menu-actions';
import { useI18n } from '@/composables/i18n';
import type { TritoTheme } from '@/shared';
import VPDocOutlineItem from './VPDocOutlineItem.vue';

const props = defineProps<{
	headers: TritoTheme.OutlineItem[];
}>();

const open = ref(false);
const main = ref<HTMLDivElement>();
const items = ref<HTMLDivElement>();
const i18n = useI18n();

function closeOnClickOutside(e: Event) {
	if (!main.value?.contains(e.target as Node)) {
		open.value = false;
	}
}

watch(open, (value) => {
	if (value) {
		document.addEventListener('click', closeOnClickOutside);
		return;
	}
	document.removeEventListener('click', closeOnClickOutside);
});

onKeyStroke('Escape', () => {
	open.value = false;
});

onContentUpdated(() => {
	open.value = false;
});

function toggle() {
	open.value = !open.value;
}

function onItemClick(e: Event) {
	if ((e.target as HTMLElement).classList.contains('outline-link')) {
		// disable animation on hash navigation when page jumps
		if (items.value) {
			items.value.style.transition = 'none';
		}
		nextTick(() => {
			open.value = false;
		});
	}
}

function scrollToTop() {
	open.value = false;
	toTop();
}
</script>

<template>
	<div class="VPLocalNavOutlineDropdown" ref="main">
		<button @click="toggle" :class="{ open }" v-if="headers.length > 0">
			{{ i18n.onThisPage }}
			<IconChevronLeft class="icon" />
		</button>
		<button @click="scrollToTop" v-else>
			{{ i18n.returnToTop }}
			<IconArrowBarToUp class="icon" />
		</button>
		<Teleport defer to=".VPNav">
			<Transition name="fadeDown">
				<div v-if="open" ref="items" class="items" @click="onItemClick">
					<div class="header">
						<a class="top-link" href="#" @click="scrollToTop">
							{{ i18n.returnToTop }}
						</a>
					</div>
					<div class="outline">
						<VPDocOutlineItem :headers />
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<style scoped>
.VPLocalNavOutlineDropdown button {
	display: block;
	font-size: 10px;
	font-weight: 500;
	line-height: 24px;
	color: var(--vp-c-text-2);
	transition: color 0.5s;
	position: relative;
	min-width: 80px;
	text-align: right;
}

.VPLocalNavOutlineDropdown button:hover {
	color: var(--vp-c-text-1);
	transition: color 0.25s;
}

.VPLocalNavOutlineDropdown button.open {
	color: var(--vp-c-text-1);
}

.icon {
	display: inline-block;
	vertical-align: middle;
	margin-left: 2px;
	margin-right: -4px;
	height: 16px;
	width: 16px;
	transform: rotate(0) /*rtl:rotate(180deg)*/;
	transition: transform 0.25s;
}

@media (min-width: 960px) {
	.VPLocalNavOutlineDropdown button {
		font-size: 14px;
	}

	.icon {
		font-size: 16px;
	}
}

.open > .icon {
	/*rtl:ignore*/
	transform: rotate(-90deg);
}

.items {
	position: fixed;
	top: var(--vp-nav-empty);
	right: 16px;
	left: 16px;
	display: grid;
	gap: 1px;
	border: 1px solid var(--vp-c-border);
	border-radius: 8px;
	background-color: var(--vp-c-gutter);
	max-height: calc(100vh - var(--vp-nav-empty));
	overflow: hidden auto;
	box-shadow: var(--vp-shadow-3);
	z-index: 100;
}

@media (min-width: 960px) {
	.items {
		right: auto;
		left: 32px;
		width: 320px;
	}
}

.header {
	background-color: var(--vp-c-bg-soft);
}

.top-link {
	display: block;
	padding: 0 16px;
	line-height: 48px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-brand-1);
}

.outline {
	padding: 8px 0;
	background-color: var(--vp-c-bg-soft);
}
</style>
