import { useRouter } from 'vitepress';

type MaybePromise<T = void> = T | Promise<T>;
type Func = (route: string) => MaybePromise;

const onBefore = new Set<Func>();
const onAfter = new Set<Func>();

export function useRouteChange() {
	const onBeforeRouteChange = (func: Func) => onBefore.add(func);
	const onAfterRouteChange = (func: Func) => onAfter.add(func);
	return {
		onBeforeRouteChange,
		onAfterRouteChange,
	};
}

export function setupRouteChange() {
	const router = useRouter();
	router.onBeforeRouteChange = (route) => {
		onBefore.forEach(async (fn) => await fn(route));
	};
	router.onAfterRouteChange = (route) => {
		onAfter.forEach(async (fn) => await fn(route));
	};
}
