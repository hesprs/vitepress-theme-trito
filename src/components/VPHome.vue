<script setup lang="ts">
import { useData } from '@/composables/data';
import VPHomeContent from './VPHomeContent.vue';
import VPHomeFeatures from './VPHomeFeatures.vue';
import VPHomeHero from './VPHomeHero.vue';

const { frontmatter, theme } = useData();
</script>

<template>
	<main
		class="VPHome"
		:class="{
			'external-link-icon-enabled': theme.externalLinkIcon,
		}"
	>
		<slot name="home-hero-before" />
		<VPHomeHero>
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
		</VPHomeHero>
		<slot name="home-hero-after" />

		<slot name="home-features-before" />
		<VPHomeFeatures />
		<slot name="home-features-after" />

		<VPHomeContent v-if="frontmatter.markdownStyles !== false">
			<Content />
		</VPHomeContent>
		<Content v-else />
	</main>
</template>

<style lang="scss" scoped>
.VPHome {
	margin-top: 24px;
	@media (min-width: 960px) {
		margin-top: 40px;
	}
}
</style>
