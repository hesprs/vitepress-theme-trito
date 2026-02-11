<script setup lang="ts">
import { useRoute } from 'vitepress';
import { computed } from 'vue';
import { useData } from '@/composables/data';
import { useLayout } from '@/composables/layout';
import VPDocFooter from './VPDocFooter.vue';
import VPDocAsideOutline from './VPDocAsideOutline.vue';
import VPDocAsideSidebar from './VPDocAsideSidebar.vue';

const { theme, frontmatter } = useData();

const route = useRoute();
const { hasAside, leftAside, maxAsideHeightOffset } = useLayout();

const pageName = computed(() => route.path.replace(/[./]+/g, '_').replace(/_html$/, ''));
</script>

<template>
	<div class="VPDoc" :class="{ 'has-aside': hasAside }">
		<slot name="doc-top" />
		<div class="container">
			<div v-if="hasAside" class="aside" :class="{ 'left-aside': leftAside }">
				<div
					class="aside-container"
					:style="{ '--aside-offset': `${maxAsideHeightOffset}px` }"
				>
					<slot name="aside-top" />

					<VPDocAsideSidebar />
					<slot name="aside-outline-before" />
					<VPDocAsideOutline />
					<slot name="aside-outline-after" />

					<slot name="aside-bottom" />
				</div>
			</div>

			<div class="content">
				<div class="content-container s-card">
					<slot name="doc-before" />
					<main class="main">
						<Content
							:class="{
								'vp-doc': !frontmatter.unstyled,
								[pageName]: pageName,
								'external-link-icon-enabled': theme.externalLinkIcon,
							}"
						/>
					</main>
					<VPDocFooter>
						<template #doc-footer-before>
							<slot name="doc-footer-before" />
						</template>
					</VPDocFooter>
					<slot name="doc-after" />
				</div>
			</div>
		</div>
		<slot name="doc-bottom" />
	</div>
</template>

<style lang="scss" scoped>
.VPDoc {
	width: 100%;
}

.container {
	margin: 0 auto;
	width: 100%;
	@media (min-width: 960px) {
		display: flex;
		justify-content: center;
		width: calc(100% - 64px);
		max-width: 1260px;
	}
}

.aside {
	position: relative;
	display: none;
	order: 3;
	width: 30%;
	padding-left: 32px;
	@media (min-width: 960px) {
		display: block;
	}
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

.left-aside {
	order: 1;
	padding-left: unset;
	padding-right: 32px;
}

.aside-container {
	//TODO: apply transitions to heights
	--aside-top: calc(
		var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px) +
			36px
	);
	--aside-height: calc(100vh - var(--aside-top) - 32px - var(--aside-offset));
	position: sticky;
	top: var(--aside-top);
	scrollbar-width: none;
	display: flex;
	height: var(--aside-height);
	flex-direction: column;
	gap: 32px;
}

.aside-container::-webkit-scrollbar {
	display: none;
}

.content-container {
	padding: 24px 24px 8px;
	@media (min-width: 960px) {
		padding: 30px 30px 12px;
	}
	@media (max-width: 768px) {
		border: 0 solid transparent;
		border-radius: 0;
		box-shadow:
			0 4px 16px 2px var(--main-border-shadow),
			0 2px 4px var(--main-border-shadow);
	}
}
</style>
