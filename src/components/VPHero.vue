<script setup lang="ts">
import { inject } from 'vue';
import { type LayoutInfo, layoutInfoInjectionKey } from '@/composables/layout';
import { useData } from '@/composables/data';
import VPButton from './VPButton.vue';
import VPImage from './VPImage.vue';

export interface HeroAction {
	theme?: 'brand' | 'alt';
	text: string;
	link: string;
	target?: string;
	rel?: string;
}

defineProps<{
	name?: string;
	text?: string;
	tagline?: string;
	actions?: HeroAction[];
}>();

const { theme } = useData();

const { heroImageSlotExists } = inject(layoutInfoInjectionKey) as LayoutInfo;
</script>

<template>
	<div class="VPHero" :class="{ 'has-image': theme.logoLarge || heroImageSlotExists }">
		<div class="main">
			<slot name="home-hero-info-before" />
			<slot name="home-hero-info">
				<h1 class="heading">
					<span v-if="name" v-html="name" class="name clip" />
					<span v-if="text" v-html="text" class="text" />
				</h1>
				<p v-if="tagline" v-html="tagline" class="tagline" />
			</slot>
			<slot name="home-hero-info-after" />

			<div v-if="actions" class="actions">
				<div v-for="action in actions" :key="action.link" class="action">
					<VPButton
						tag="a"
						size="medium"
						:theme="action.theme"
						:text="action.text"
						:href="action.link"
						:target="action.target"
						:rel="action.rel"
					/>
				</div>
			</div>
			<slot name="home-hero-actions-after" />
		</div>

		<div v-if="theme.logoLarge || heroImageSlotExists" class="image-container">
			<div class="image-bg" />
			<slot name="home-hero-image">
				<VPImage v-if="theme.logoLarge" class="image-src" :image="theme.logoLarge" />
			</slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.VPHero {
	padding: 0 36px;
	@media (min-width: 960px) {
		padding: 0 48px;
		flex-direction: row !important;
	}
	display: flex;
	flex-direction: column;
	margin: 0 auto 60px;
	max-width: 1152px;
}

.main {
	margin: auto 0;
	z-index: 10;
	order: 2;
	@media (min-width: 960px) {
		order: 1;
		max-width: 60%;
	}
}

.VPHero.has-image .container {
	text-align: center;
	@media (min-width: 960px) {
		text-align: left;
	}
}

.heading {
	display: flex;
	flex-direction: column;
}

.name {
	line-height: 40px;
	font-size: 32px;
	@media (min-width: 640px) {
		line-height: 56px;
		font-size: 48px;
	}
	@media (min-width: 960px) {
		line-height: 64px;
		font-size: 56px;
	}
}

.text {
	line-height: 36px;
	font-size: 28px;
	@media (min-width: 640px) {
		line-height: 50px;
		font-size: 42px;
	}
	@media (min-width: 960px) {
		line-height: 58px;
		font-size: 50px;
	}
}

.tagline {
	padding-top: 8px;
	line-height: 28px;
	font-size: 24px;
	font-weight: 600;
	white-space: pre-wrap;
	color: var(--vp-c-text-2);
	.VPHero.has-image & {
		margin: 0 auto;
		@media (min-width: 960px) {
			margin: 0;
		}
	}
	@media (min-width: 640px) {
		padding-top: 12px;
		line-height: 32px;
		font-size: 32px;
	}
	@media (min-width: 960px) {
		line-height: 36px;
		font-size: 40px;
	}
}

.name,
.text {
	width: fit-content;
	max-width: calc(200px + 40vw);
	letter-spacing: -0.4px;
	font-weight: 700;
	white-space: pre-wrap;
	text-align: center;
	.VPHero.has-image & {
		margin: 0 auto;
		@media (min-width: 960px) {
			margin: 0;
		}
	}
	@media (min-width: 960px) {
		text-align: left;
	}
}

.clip {
	color: var(--vp-home-hero-name-color);
	background: var(--vp-home-hero-name-background);
	-webkit-background-clip: text;
	background-clip: text;
}

.actions {
	display: flex;
	flex-wrap: wrap;
	margin: -6px;
	padding-top: 24px;
}

.VPHero.has-image .actions {
	justify-content: center;
	@media (min-width: 960px) {
		justify-content: flex-start;
	}
}

.action {
	padding: 6px;
	@media (min-width: 640px) {
		padding-top: 32px;
	}
}

.image-container {
	display: flex;
	order: 1;
	justify-content: center;
	position: relative;
	margin-bottom: 30px;
	@media (min-width: 960px) {
		order: 2;
		flex: 1;
		margin-bottom: 0;
		margin-left: 60px;
	}
}

.image-bg {
	position: absolute;
	top: 50%;
	left: 50%;
	border-radius: 50%;
	height: 250px;
	width: 250px;
	background-image: var(--vp-home-hero-image-background-image);
	filter: var(--vp-home-hero-image-filter);
	transform: translate(-50%, -50%);
	z-index: -1;
}

:deep(.image-src) {
	width: 100%;
	max-width: calc(200px + 20vw);
	object-fit: contain;
	flex: 1;
}
</style>
