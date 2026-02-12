import { nextTick, provide, type Ref } from 'vue';

import { toggleAppearanceKey } from '@/shared';

const enableTransitions = () => {
	return (
		'startViewTransition' in document &&
		window.matchMedia('(prefers-reduced-motion: no-preference)').matches
	);
};

export default function (isDark: Ref<boolean>) {
	provide(toggleAppearanceKey, async (coords: { clientX: number; clientY: number }) =>
		toggleAppearance(coords, isDark),
	);
}

async function toggleAppearance(
	{ clientX: x, clientY: y }: { clientX: number; clientY: number },
	isDark: Ref<boolean>,
) {
	if (!enableTransitions()) {
		isDark.value = !isDark.value;
		return;
	}
	document.documentElement.style.setProperty('--darkX', `${x}px`);
	document.documentElement.style.setProperty('--darkY', `${y}px`);

	await document.startViewTransition(async () => {
		isDark.value = !isDark.value;
		await nextTick();
	}).ready;
}
