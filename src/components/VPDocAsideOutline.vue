<script setup lang="ts">
import { IconVocabulary, IconChevronDown } from '@tabler/icons-vue';
import { ref, useTemplateRef, watch } from 'vue';
import { useI18n } from '@/composables/i18n';
import { useLayout } from '@/composables/layout';
import { useActiveAnchor } from '@/composables/outline';
import VPDocOutlineItem from './VPDocOutlineItem.vue';

const outline = useTemplateRef('outline');
const marker = useTemplateRef('marker');
const expand = useTemplateRef('expand');
const i18n = useI18n();
const collapsed = ref(false);

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
	<div class="outline-wrapper" :class="{ collapse: collapsed }" v-if="hasLocalNav">
		<nav
			aria-labelledby="doc-outline-aria-label"
			class="VPDocAsideOutline s-card"
			:class="{
				'card-enhance': collapsed,
				hover: collapsed,
			}"
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
			<div class="content">
				<div class="outline-marker" ref="marker" />
				<VPDocOutlineItem :headers :root="true" />
			</div>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
.outline-wrapper {
	min-height: 58px;
	transition: flex 0.4s;
	flex: 1;
	&.collapse {
		flex: 0;
		height: 58px;
	}
}

.VPDocAsideOutline {
	padding-left: 16px;
	padding-bottom: 8px;
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
	.outline-wrapper:not(.collapse) &:hover,
	.collapse:hover & {
		background-color: var(--vp-c-brand-soft);
		color: var(--vp-c-brand-1);
		padding: 0 8px;
	}
}
</style>
