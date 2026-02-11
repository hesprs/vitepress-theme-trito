import { computed } from 'vue';

import { useData } from './data';
import { useI18n } from './i18n';

export function useEditLink() {
	const { theme, page } = useData();
	const i18n = useI18n();

	return computed(() => {
		const pattern = theme.value.editLink || '';
		let url: string;
		if (typeof pattern === 'function') url = pattern(page.value);
		else url = pattern.replace(/:path/g, page.value.filePath);

		return { url, text: i18n.value.edit };
	});
}
