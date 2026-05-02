import type { InjectionKey } from 'vue';
import { useRoute } from 'vitepress';
import { ref, watch } from 'vue';

export function useNav() {
	const isScreenOpen = ref(false);

	function openScreen() {
		isScreenOpen.value = true;
		window.addEventListener('resize', closeScreenOnTabletWindow);
	}

	function closeScreen() {
		isScreenOpen.value = false;
		window.removeEventListener('resize', closeScreenOnTabletWindow);
	}

	function toggleScreen() {
		if (isScreenOpen.value) closeScreen();
		else openScreen();
	}

	/**
	 * Close screen when the user resizes the window wider than tablet size.
	 */
	function closeScreenOnTabletWindow() {
		if (window.outerWidth >= 768) closeScreen();
	}

	const route = useRoute();
	watch(() => route.path, closeScreen);

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
