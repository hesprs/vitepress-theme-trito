<script setup lang="ts">
import type { DocSearchProps } from '@docsearch/js';
import docsearch from '@docsearch/js';
import { useRouter } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';
import type { TritoTheme } from '@/shared';
import useData from '@/composables/data';

const { algolia } = defineProps<{ algolia: TritoTheme.AlgoliaSearchOptions }>();

const router = useRouter();
const { site, localeIndex, lang } = useData();

onMounted(update);
watch(localeIndex, update);

async function update() {
	await nextTick();
	const options = {
		...algolia,
		...algolia.locales?.[localeIndex.value],
	};
	const rawFacetFilters = options.searchParameters?.facetFilters ?? [];
	const facetFilters = [
		...(Array.isArray(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters]).filter(
			(f) => !f.startsWith('lang:'),
		),
		`lang:${lang.value}`,
	];

	// Rebuild the askAi prop as an object:
	// If the askAi prop is a string, treat it as the assistantId and use
	// The default indexName, apiKey and appId from the main options.
	// If the askAi prop is an object, spread its explicit values.
	const askAiProp = options.askAi;
	const isAskAiString = typeof askAiProp === 'string';

	const askAi = askAiProp
		? {
				apiKey: isAskAiString ? options.apiKey : askAiProp.apiKey,
				appId: isAskAiString ? options.appId : askAiProp.appId,
				assistantId: isAskAiString ? askAiProp : askAiProp.assistantId,
				indexName: isAskAiString ? options.indexName : askAiProp.indexName,
				// Re-use the merged facetFilters from the search parameters so that
				// Ask AI uses the same language filtering as the regular search.
				searchParameters: facetFilters.length ? { facetFilters } : undefined,
			}
		: undefined;

	initialize({
		...options,
		askAi,
		searchParameters: {
			...options.searchParameters,
			facetFilters,
		},
	});
}

function initialize(userOptions: TritoTheme.AlgoliaSearchOptions) {
	const options = {
		...userOptions,
		container: '#docsearch',

		navigator: {
			navigate(item: { itemUrl: string }) {
				router.go(item.itemUrl);
			},
		},

		transformItems(items: Array<{ url: string }>) {
			return items.map((item) => ({
				...item,
				url: getRelativePath(item.url),
			}));
		},
	};

	docsearch(options as DocSearchProps);
}

function getRelativePath(url: string) {
	const { pathname, hash } = new URL(url, location.origin);
	return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash;
}
</script>

<template>
	<div id="docsearch" />
</template>
