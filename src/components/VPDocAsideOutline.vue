<script setup lang="ts">
import { IconVocabulary, IconChevronDown } from '@tabler/icons-vue';
import { useElementSize } from '@vueuse/core';
import { ref, useTemplateRef, watch } from 'vue';
import useData from '@/composables/data';
import { useI18n } from '@/composables/i18n';
import { useLayout } from '@/composables/layout';
import { useActiveAnchor } from '@/composables/outline';
import VPDocOutlineItem from './VPDocOutlineItem.vue';

const outline = useTemplateRef('outline');
const marker = useTemplateRef('marker');
const expand = useTemplateRef('expand');
const i18n = useI18n();
const { theme } = useData();
const collapsed = ref(false);
const content = useTemplateRef('content');
const { height: contentHeight } = useElementSize(content);
const { headers, hasLocalNav } = useLayout();

useActiveAnchor(outline, marker);
watch(collapsed, () => {
	if (collapsed.value) outline.value?.scrollTo(0, 0);
});

function toggle(e: PointerEvent) {
	if (expand.value?.contains(e.target as Node)) collapsed.value = !collapsed.value;
	else if (collapsed.value) collapsed.value = false;
}
</script>

<template>
	<nav
		aria-labelledby="doc-outline-aria-label"
		class="VPDocAsideOutline s-card"
		v-if="hasLocalNav"
		:class="{
			'card-enhance': collapsed,
			collapse: collapsed,
		}"
		:style="{ '--card-max-height': `calc(${contentHeight}px + 62px)` }"
		ref="outline"
		@click="toggle"
	>
		<div
			aria-level="2"
			class="outline-title"
			id="doc-outline-aria-label"
			role="heading"
			ref="expand"
		>
			<IconVocabulary />
			{{ theme.i18n?.onThisPage ?? i18n.onThisPage }}
			<IconChevronDown class="expand" />
		</div>
		<div class="content" ref="content">
			<div class="outline-marker" ref="marker" />
			<VPDocOutlineItem :headers :root="true" />
		</div>
	</nav>
</template>

<style lang="scss" scoped>
.VPDocAsideOutline {
	padding-left: 1rem;
	padding-bottom: 0.5rem;
	min-height: 56px;
	overflow: hidden;
	max-height: var(--card-max-height);
	transition:
		max-height 0.4s,
		outline-color 0.3s,
		box-shadow 0.3s,
		background 0.3s;
	&.collapse {
		cursor: pointer;
		max-height: 56px;
	}
	--aside-top: calc(
		var(--vp-nav-space) + var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px) +
			32px
	);
	position: sticky;
	top: var(--aside-top);
}

.content {
	position: relative;
	padding-left: 16px;
	font-size: 13px;
	&::before {
		transition: opacity 0.2s;
		.collapse & {
			opacity: 0;
		}
		content: '';
		position: absolute;
		left: 0;
		bottom: 7px;
		width: 4px;
		top: 7px;
		background-color: var(--vp-c-border);
		border-radius: 8px;
	}
}

.expand {
	transition: transform 0.4s;
	margin-left: auto;
	.collapse & {
		transform: rotate(-90deg);
	}
}

.outline-marker {
	position: absolute;
	top: 32px;
	left: 0;
	z-index: 0;
	opacity: 0;
	width: 4px;
	border-radius: 2px;
	height: 18px;
	background-color: var(--vp-c-brand-1);
	transition:
		top 0.25s cubic-bezier(0, 1, 0.5, 1),
		background-color 0.5s,
		opacity 0.25s;
	.collapse & {
		opacity: 0 !important;
	}
}

.outline-title {
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
	&:hover {
		background-color: var(--vp-c-brand-soft);
		color: var(--vp-c-brand-1);
		padding: 0 8px;
	}
}
</style>
