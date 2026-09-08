<script lang="ts" setup>
import { useIcon } from 'vitepress';
import { useTemplateRef } from 'vue';
import type { TritoTheme } from '@/shared';

const { icon } = defineProps<{ icon: TritoTheme.SocialLinkIcon }>();
const el = useTemplateRef<HTMLElement>('el');
const iconClass = useIcon(() => icon, el);
</script>

<template>
	<span v-if="typeof icon === 'object'" class="VPIcon" v-html="icon.svg"></span>
	<span v-else ref="el" :class="iconClass"></span>
</template>

<style lang="scss" scoped>
.VPIcon {
	display: inline-block;
	width: 1em;
	height: 1em;

	:deep(svg) {
		width: 100%;
		height: 100%;
		fill: currentColor;
	}
}
</style>
