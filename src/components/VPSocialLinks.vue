<script lang="ts" setup>
import type { TritoTheme } from '@/shared';
import VPSocialLink from './VPSocialLink.vue';

withDefaults(
	defineProps<{
		links: TritoTheme.SocialLink[];
		me?: boolean;
	}>(),
	{
		me: true,
	},
);
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
