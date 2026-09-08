import type { InjectionKey } from 'vue';
import { useMediaQuery, whenever } from '@vueuse/core';
import { useRoute } from 'vitepress';
import { ref, watch } from 'vue';

export function useNav() {
	const isScreenOpen = ref(false);

	const route = useRoute();
	watch(() => route.path, closeScreen);

	/**
	 * Close screen when the window becomes wider than a tablet.
	 */
	const isTablet = useMediaQuery('(min-width: 48rem)');
	whenever(isTablet, closeScreen);

	function openScreen() {
		isScreenOpen.value = true;
	}

	function closeScreen() {
		isScreenOpen.value = false;
	}

	function toggleScreen() {
		if (isScreenOpen.value) closeScreen();
		else openScreen();
	}

	return {
		closeScreen,
		isScreenOpen,
		openScreen,
		toggleScreen,
	};
}

export type NavExposedMethods = {
	closeScreen: () => void;
};

export const navInjectionKey: InjectionKey<NavExposedMethods> = Symbol('nav');
