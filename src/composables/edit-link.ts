import { computed } from 'vue';
import useData from './data';
import { useI18n } from './i18n';

export default function useEditLink() {
	const { theme, page } = useData();
	const i18n = useI18n();

	return computed(() => {
		const pattern = theme.value.editLink || '';
		const url =
			typeof pattern === 'function'
				? pattern(page.value)
				: pattern.replace(/:path/g, page.value.filePath);

		return { text: theme.value.i18n?.edit ?? i18n.value.edit, url };
	});
}
