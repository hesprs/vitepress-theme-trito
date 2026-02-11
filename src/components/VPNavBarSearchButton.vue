<script lang="ts" setup>
import { IconSearch } from '@tabler/icons-vue';
import type { ButtonTranslations } from '@/shared/local-search';
import { createSearchTranslate } from '@/support/translation';

// button translations
const defaultTranslations: { button: ButtonTranslations } = {
	button: {
		buttonText: 'Search',
		buttonAriaLabel: 'Search',
	},
};

const translate = createSearchTranslate(defaultTranslations);
</script>

<template>
	<button
		type="button"
		:aria-label="translate('button.buttonAriaLabel')"
		aria-keyshortcuts="/ control+k meta+k"
		class="nav-btn DocSearch-Button"
	>
		<IconSearch class="icon" />
	</button>
</template>

<style lang="scss" scoped>
[class*='DocSearch'] {
	--docsearch-actions-height: auto;
	--docsearch-actions-width: auto;
	--docsearch-background-color: var(--vp-c-bg-soft);
	--docsearch-container-background: var(--vp-backdrop-bg-color);
	--docsearch-focus-color: var(--vp-c-brand-1);
	--docsearch-footer-background: var(--vp-c-bg);
	--docsearch-highlight-color: var(--vp-c-brand-1);
	--docsearch-hit-background: var(--vp-c-default-soft);
	--docsearch-hit-color: var(--vp-c-text-1);
	--docsearch-hit-highlight-color: var(--vp-c-brand-soft);
	--docsearch-icon-color: var(--vp-c-text-2);
	--docsearch-key-background: transparent;
	--docsearch-key-color: var(--vp-c-text-2);
	--docsearch-modal-background: var(--vp-c-bg-soft);
	--docsearch-muted-color: var(--vp-c-text-2);
	--docsearch-primary-color: var(--vp-c-brand-1);
	--docsearch-searchbox-focus-background: transparent;
	--docsearch-secondary-text-color: var(--vp-c-text-2);
	--docsearch-soft-primary-color: var(--vp-c-brand-soft);
	--docsearch-subtle-color: var(--vp-c-divider);
	--docsearch-success-color: var(--vp-c-brand-soft);
	--docsearch-text-color: var(--vp-c-text-1);
}

.dark [class*='DocSearch'] {
	--docsearch-modal-shadow: none;
}

.DocSearch-Button {
	--docsearch-muted-color: var(--docsearch-text-color);
	--docsearch-searchbox-background: transparent;
	border: none !important;
	color: unset;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	padding: 0;
	background-color: transparent;
	transition: background-color 0.3s;
	border-radius: 50%;
	cursor: pointer;
	.icon {
		transition:
			color 0.3s,
			opacity 0.3s;
	}
	&:hover {
		background-color: var(--vp-c-brand-1);
		.icon {
			color: var(--main-card-background);
		}
	}
}

@media (min-width: 768px) {
	.DocSearch-Button {
		--docsearch-muted-color: var(--docsearch-secondary-text-color);
		--docsearch-searchbox-background: var(--vp-c-bg-alt);
	}
}
</style>
