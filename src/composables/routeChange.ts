import { useRouter } from 'vitepress';

const onBefore = new Set<(route: string) => void>();
const onAfter = new Set<(route: string) => void>();

export function useRouteChange() {
	const onBeforeRouteChange = (fn: (route: string) => void) => onBefore.add(fn);
	const onAfterRouteChange = (fn: (route: string) => void) => onAfter.add(fn);
	return {
		onBeforeRouteChange,
		onAfterRouteChange,
	};
}

export function setupRouteChange() {
	const router = useRouter();
	router.onBeforeRouteChange = (route) => {
		onBefore.forEach((fn) => fn(route));
	};
	router.onAfterRouteChange = (route) => {
		onAfter.forEach((fn) => fn(route));
	};
}
