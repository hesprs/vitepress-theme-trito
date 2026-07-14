<script setup lang="ts">
import { useRoute } from 'vitepress';
import { computed, onMounted, useTemplateRef } from 'vue';
import useData from '@/composables/data';
import { registerContent, useLayout } from '@/composables/layout';
import VPDocAsideOutline from './VPDocAsideOutline.vue';
import VPDocAsideSidebar from './VPDocAsideSidebar.vue';
import VPDocFooter from './VPDocFooter.vue';

const { theme, frontmatter, page } = useData();
const route = useRoute();
const pageName = computed(() => route.path.replace(/[./]+/g, '_').replace(/_html$/, ''));
const content = useTemplateRef('content');
const { hasAside, leftAside } = useLayout();

onMounted(() => registerContent(content.value));
</script>

<template>
	<div class="VPDoc" :class="{ 'has-aside': hasAside }">
		<slot name="doc-top" />
		<div class="doc-container">
			<div v-if="hasAside" class="aside-container" :class="{ 'left-aside': leftAside }">
				<slot name="aside-top" />

				<VPDocAsideSidebar />
				<slot name="aside-outline-before" />
				<VPDocAsideOutline />
				<slot name="aside-outline-after" />

				<slot name="aside-bottom" />
			</div>

			<main class="content">
				<slot name="content-before" />
				<div class="content-container s-card" ref="content">
					<slot name="doc-before" />
					<Content
						:class="{
							'vp-doc': !frontmatter.unstyled,
							[pageName]: pageName,
							'external-link-icon-enabled': theme.externalLinkIcon,
						}"
					/>
					<VPDocFooter>
						<template #doc-footer-before>
							<slot name="doc-footer-before" />
						</template>
					</VPDocFooter>
					<slot name="doc-after" />
				</div>
				<slot name="content-after" />
			</main>
		</div>
		<slot name="doc-bottom" />
	</div>
</template>

<style lang="scss" scoped>
.VPDoc {
	width: 100%;
	margin: 0 auto;
	width: 100%;
	position: relative;
	@media (min-width: 960px) {
		width: calc(100% - 64px);
		max-width: 1260px;
	}
}

.doc-container {
	width: 100%;
	display: flex;
}

.content {
	position: relative;
	width: 70%;
	margin: 0;
	@media (max-width: 960px) {
		width: 100%;
		padding: 0 32px;
	}
	@media (max-width: 768px) {
		padding: 0;
	}
	order: 2;
}

.aside-container {
	display: none;
	order: 3;
	width: 30%;
	padding-left: 32px;
	@media (min-width: 960px) {
		display: flex;
	}
	scrollbar-width: none;
	flex: 1;
	flex-direction: column;
	gap: 32px;
	&.left-aside {
		order: 1;
		padding-left: 0;
		padding-right: 32px;
	}
}

.content-container {
	padding: 24px 24px 8px;
	@media (min-width: 960px) {
		padding: 30px 30px 12px;
	}
	@media (max-width: 768px) {
		border-left-color: transparent;
		border-right-color: transparent;
		border-radius: 0;
	}
}
</style>
