<script lang="ts" setup>
import { computed } from 'vue';
import type { TritoTheme } from '@/shared';
import { isExternal } from '@/shared';
import VPIcon from './VPIcon.vue';

const { icon, link } = defineProps<{
	icon: TritoTheme.SocialLinkIcon;
	link: string;
	ariaLabel?: string;
	target?: string;
	me: boolean;
}>();
const qualifiedIcon = computed(() =>
	typeof icon === 'string' && !icon.includes(':') ? `simple-icons:${icon}` : icon,
);
</script>

<template>
	<a
		class="VPSocialLink no-icon"
		:href="link"
		:aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
		:target="target ?? (isExternal(link) ? '_blank' : undefined)"
		:rel="me ? 'me noopener' : 'noopener'"
	>
		<VPIcon :icon="qualifiedIcon" />
	</a>
</template>

<style lang="scss" scoped>
.VPSocialLink {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 36px;
	height: 36px;
	color: var(--vp-c-text-2);
	transition: color 0.5s;

	&::before {
		display: none;
	}
}

.VPSocialLink:hover {
	color: var(--vp-c-text-1);
	transition: color 0.25s;
}

.VPSocialLink > :deep(span) {
	display: flex;
	width: 20px;
	height: 20px;
}

.VPSocialLink :deep(svg) {
	fill: currentColor;
}
</style>
