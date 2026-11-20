<script lang="ts" setup>
import VPSocialLinks from './VPSocialLinks.vue';
import useData from '@/composables/data';

const { theme } = useData();
</script>

<template>
	<VPSocialLinks
		v-if="theme.socialLinks"
		class="VPNavBarSocialLinks"
		:links="theme.socialLinks"
	/>
</template>

<style lang="scss" scoped>
.VPNavBarSocialLinks {
	margin-bottom: 10px;
	display: flex;
	align-items: center;
}
</style>
