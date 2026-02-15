<script setup lang="ts">
import { withBase } from 'vitepress';
import { useLangs } from '@/composables/langs';
import { useData } from '@/composables/data';
import { useI18n } from '@/composables/i18n';

const i18n = useI18n();
const { theme } = useData();
const { currentLang } = useLangs();
</script>

<template>
	<div class="NotFound">
		<p class="code">{{ i18n.notFound.code }}</p>
		<h1 class="title">{{ i18n.notFound.title }}</h1>
		<div class="divider" />
		<blockquote class="quote">{{ i18n.notFound.quote }}</blockquote>

		<div class="action">
			<a
				class="link"
				:href="withBase(theme.notFoundLink ?? currentLang.link)"
				:aria-label="i18n.notFound.linkText"
			>
				{{ i18n.notFound.linkText }}
			</a>
		</div>
	</div>
</template>

<style scoped>
.NotFound {
	padding: 64px 24px 96px;
	text-align: center;
}

@media (min-width: 768px) {
	.NotFound {
		padding: 96px 32px 168px;
	}
}

.code {
	line-height: 64px;
	font-size: 64px;
	font-weight: 600;
}

.title {
	padding-top: 12px;
	letter-spacing: 2px;
	line-height: 20px;
	font-size: 20px;
	font-weight: 700;
}

.divider {
	margin: 24px auto 18px;
	width: 64px;
	height: 1px;
	background-color: var(--vp-c-divider);
}

.quote {
	margin: 0 auto;
	max-width: 256px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}

.action {
	padding-top: 20px;
}

.link {
	display: inline-block;
	border: 1px solid var(--vp-c-brand-1);
	border-radius: 16px;
	padding: 3px 16px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-brand-1);
	transition:
		border-color 0.25s,
		color 0.25s;
}

.link:hover {
	border-color: var(--vp-c-brand-2);
	color: var(--vp-c-brand-2);
}
</style>
