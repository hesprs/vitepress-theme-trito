<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';

const { width: vw } = useWindowSize({
	initialWidth: 0,
	includeScrollbar: false,
});
</script>

<template>
	<div class="vp-doc container" :style="vw ? { '--vp-offset': `calc(50% - ${vw / 2}px)` } : {}">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.container {
	margin: auto;
	width: 100%;
	max-width: 1280px;
	padding: 0 24px;
	@media (min-width: 640px) {
		padding: 0 48px;
	}
	@media (min-width: 960px) {
		width: 100%;
		padding: 0 64px;
	}
}

.vp-doc {
	:deep(.VPHomeSponsors),
	:deep(.VPTeamPage) {
		margin-left: var(--vp-offset, calc(50% - 50vw));
		margin-right: var(--vp-offset, calc(50% - 50vw));
	}
	:deep(.VPHomeSponsors h2) {
		border-top: none;
		letter-spacing: normal;
	}
	:deep(.VPHomeSponsors a),
	:deep(.VPTeamPage a) {
		text-decoration: none;
	}
}
</style>
