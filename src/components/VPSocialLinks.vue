<script lang="ts" setup>
import type { TritoTheme } from '@/shared';
import VPSocialLink from './VPSocialLink.vue';

defineProps<{
	links: Array<TritoTheme.SocialLink>;
	me?: boolean;
}>();
</script>

<template>
	<div class="VPSocialLinks">
		<VPSocialLink
			v-for="{ link, icon, ariaLabel } in links"
			:key="link"
			:icon
			:link
			:ariaLabel
			:me
		/>
	</div>
</template>

<style scoped>
.VPSocialLinks {
	display: flex;
	justify-content: center;
	gap: 16px;
}
</style>
