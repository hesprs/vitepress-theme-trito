import { useMediaQuery } from '@vueuse/core';
import { computed } from 'vue';

export default function useAside() {
	const is960 = useMediaQuery('(min-width: 960px)');
	const isAsideEnabled = computed(() => {
		if (!is960.value) return false;
		return is960.value;
	});
	return { isAsideEnabled };
}
