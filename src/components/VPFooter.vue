<script setup lang="ts">
import { useData } from '@/composables/data';
import VPFooterSocialLinks from './VPFooterSocialLinks.vue';
import { registerFooter } from '@/composables/layout';
import { useTemplateRef } from 'vue';

const { theme, frontmatter } = useData();
const footer = useTemplateRef('footer');
registerFooter(footer);
</script>

<template>
	<footer v-if="frontmatter.footer !== false" class="VPFooter" ref="footer">
		<VPFooterSocialLinks />
		<div class="container">
			<p v-if="theme.footer?.message" class="message" v-html="theme.footer.message"></p>
			<p v-if="theme.footer?.copyright" class="copyright" v-html="theme.footer.copyright"></p>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.VPFooter {
	position: relative;
	z-index: var(--vp-z-index-footer);
	padding: 6px 24px;
	margin-top: 20px;
	margin-bottom: 20px;
	@media (min-width: 960px) {
		margin-top: 40px;
		margin-bottom: 0;
	}
}

.VPFooter :deep(a) {
	text-decoration-line: underline;
	text-underline-offset: 2px;
	transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
	color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
	.VPFooter {
		padding: 32px;
	}
}

.container {
	margin: 0 auto;
	max-width: var(--vp-layout-max-width);
	text-align: center;
}

.message,
.copyright {
	line-height: 24px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}
</style>
