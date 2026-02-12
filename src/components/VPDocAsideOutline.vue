<script setup lang="ts">
import { IconVocabulary, IconChevronDown } from '@tabler/icons-vue';
import { ref, useTemplateRef, watch, type Ref, onMounted } from 'vue';
import { useI18n } from '@/composables/i18n';
import { useLayout } from '@/composables/layout';
import { useActiveAnchor } from '@/composables/outline';
import VPDocOutlineItem from './VPDocOutlineItem.vue';
import { useElementSize } from '@vueuse/core';

const outline = useTemplateRef('outline');
const marker = useTemplateRef('marker');
const expand = useTemplateRef('expand');
const i18n = useI18n();
const collapsed = ref(false);
const content = useTemplateRef('content');
const { height: contentHeight } = useElementSize(content);
const { headers, hasLocalNav } = useLayout();

useActiveAnchor(outline, marker);
watch(collapsed, () => {
	if (collapsed.value) outline.value?.scrollTo(0, 0);
});

function toggle(e: PointerEvent) {
	if (expand.value?.contains(e.target as Node)) {
		if (!collapsed.value) collapsed.value = true;
		else collapsed.value = false;
	} else if (collapsed.value) collapsed.value = false;
}
</script>

<template>
	<nav
		aria-labelledby="doc-outline-aria-label"
		class="VPDocAsideOutline s-card"
		v-if="hasLocalNav"
		:class="{
			'card-enhance': collapsed,
			hover: collapsed,
			collapse: collapsed,
		}"
		:style="{ maxHeight: `calc(${contentHeight}px + 62px)` }"
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
			{{ i18n.onThisPage }}
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
	overflow-y: scroll;
	overscroll-behavior: contain;
	min-height: 56px;
	flex: 1;
	&.collapse {
		overflow: hidden;
		cursor: pointer;
		flex: 0;
		height: 56px;
	}
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
	.VPDocAsideOutline:not(.collapse) &:hover {
		background-color: var(--vp-c-brand-soft);
		color: var(--vp-c-brand-1);
		padding: 0 8px;
	}
}
</style>
