// oxlint-disable typescript/no-explicit-any
import useData from '@/composables/data';

/**
 * @param themeObject Can be an object with `translations` and `locales` properties
 */
export default function createSearchTranslate(
	defaultTranslations: Record<string, any>,
): (key: string) => string {
	const { localeIndex, theme } = useData();

	function translate(key: string): string {
		const keyPath = key.split('.');
		const themeObject = theme.value.search?.options;

		const isObject = themeObject && typeof themeObject === 'object';
		const locales =
			(isObject && themeObject.locales?.[localeIndex.value]?.translations) || undefined;
		const translations = (isObject && themeObject.translations) || undefined;

		let localeResult: Record<string, any> | undefined = locales;
		let translationResult: Record<string, any> | undefined = translations;
		let defaultResult: Record<string, any> | undefined = defaultTranslations;

		// oxlint-disable-next-line typescript/no-non-null-assertion
		const lastKey = keyPath.pop()!;
		for (const k of keyPath) {
			let fallbackResult: Record<string, any> | undefined;
			const foundInFallback: any = defaultResult?.[k];
			if (foundInFallback) fallbackResult = defaultResult = foundInFallback;

			const foundInTranslation: any = translationResult?.[k];
			if (foundInTranslation) fallbackResult = translationResult = foundInTranslation;

			const foundInLocale: any = localeResult?.[k];
			if (foundInLocale) fallbackResult = localeResult = foundInLocale;

			// Put fallback into unresolved results
			if (!foundInFallback) defaultResult = fallbackResult;

			if (!foundInTranslation) translationResult = fallbackResult;

			if (!foundInLocale) localeResult = fallbackResult;
		}
		return (
			localeResult?.[lastKey] ??
			translationResult?.[lastKey] ??
			defaultResult?.[lastKey] ??
			''
		);
	}

	return translate;
}
