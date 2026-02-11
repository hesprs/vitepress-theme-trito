<script setup lang="ts">
import { useData } from '@/composables/data';
import NotFound from '../NotFound.vue';
import VPDoc from './VPDoc.vue';
import VPHome from './VPHome.vue';
import VPPage from './VPPage.vue';

const { page, frontmatter } = useData();
</script>

<template>
	<div class="VPContent" id="VPContent">
		<slot name="not-found" v-if="page.isNotFound">
			<NotFound />
		</slot>

		<VPPage v-else-if="frontmatter.layout === 'page'">
			<template #page-top>
				<slot name="page-top" />
			</template>
			<template #page-bottom>
				<slot name="page-bottom" />
			</template>
		</VPPage>

		<VPHome v-else-if="frontmatter.layout === 'home'">
			<template #home-hero-before>
				<slot name="home-hero-before" />
			</template>
			<template #home-hero-info-before>
				<slot name="home-hero-info-before" />
			</template>
			<template #home-hero-info>
				<slot name="home-hero-info" />
			</template>
			<template #home-hero-info-after>
				<slot name="home-hero-info-after" />
			</template>
			<template #home-hero-actions-after>
				<slot name="home-hero-actions-after" />
			</template>
			<template #home-hero-image>
				<slot name="home-hero-image" />
			</template>
			<template #home-hero-after>
				<slot name="home-hero-after" />
			</template>
			<template #home-features-before>
				<slot name="home-features-before" />
			</template>
			<template #home-features-after>
				<slot name="home-features-after" />
			</template>
		</VPHome>

		<component
			v-else-if="frontmatter.layout && frontmatter.layout !== 'doc'"
			:is="frontmatter.layout"
		/>

		<VPDoc v-else>
			<template #doc-top>
				<slot name="doc-top" />
			</template>
			<template #doc-bottom>
				<slot name="doc-bottom" />
			</template>

			<template #doc-footer-before>
				<slot name="doc-footer-before" />
			</template>
			<template #doc-before>
				<slot name="doc-before" />
			</template>
			<template #doc-after>
				<slot name="doc-after" />
			</template>

			<template #aside-top>
				<slot name="aside-top" />
			</template>
			<template #aside-outline-before>
				<slot name="aside-outline-before" />
			</template>
			<template #aside-outline-after>
				<slot name="aside-outline-after" />
			</template>
			<template #aside-bottom>
				<slot name="aside-bottom" />
			</template>
		</VPDoc>
	</div>
</template>

<style lang="scss" scoped>
.VPContent {
	flex-grow: 1;
	flex-shrink: 0;
	margin: var(--vp-nav-height) auto 0;
	width: 100%;
	padding-top: 24px;
	@media (min-width: 960px) {
		padding-top: 36px;
	}
}
</style>
