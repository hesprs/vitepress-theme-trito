<template>
	<Teleport to="body">
		<Transition name="fade" mode="out-in">
			<div v-if="show" class="loading" @click="show = false">
				<VPImage
					v-if="theme.logoLarge"
					style="max-width: 800px; max-height: 500px; width: 90%"
					:image="theme.logoLarge"
				/>
				<span :class="{ show: showTip }" class="tip">{{ i18n.loadingTip }}</span>
			</div>
		</Transition>
	</Teleport>
</template>

<script lang="ts" setup>
import { useRouteChange } from '@/composables/route-change';
import { onBeforeUnmount, ref } from 'vue';
import { useData } from '@/composables/data';
import { useI18n } from '@/composables/i18n';
import VPImage from './VPImage.vue';

const { onAfterRouteChange, onBeforeRouteChange } = useRouteChange();
const { theme } = useData();
const i18n = useI18n();

onBeforeRouteChange(() => {
	show.value = true;
	showTimeOut = setTimeout(() => {
		showTip.value = true;
	}, 3000);
});
onAfterRouteChange(() => {
	show.value = false;
	showTip.value = false;
	clear();
});

const show = ref(false);
const showTip = ref(false);
let showTimeOut: null | NodeJS.Timeout = null;

function clear() {
	if (showTimeOut) clearTimeout(showTimeOut);
}

onBeforeUnmount(clear);
</script>

<style lang="scss" scoped>
.loading {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background-color: var(--main-card-background);
	z-index: var(--vp-z-index-loading);
	.tip {
		position: absolute;
		bottom: 2rem;
		font-size: 14px;
		opacity: 0;
		transition: opacity 0.3s;
		&.show {
			opacity: 0.6;
		}
	}
}
</style>
