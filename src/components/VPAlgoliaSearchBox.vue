<script setup lang="ts">
import docsearch from '@docsearch/js/docsearch';
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
	const { locales, ...options } = { ...algolia, ...algolia.locales?.[localeIndex.value] };

	docsearch({
		...options,
		container: '#docsearch',
		indices: options.indices.map((index) => {
			const { name, searchParameters } = typeof index === 'string' ? { name: index } : index;
			const raw = searchParameters?.facetFilters ?? [];
			return {
				name,
				searchParameters: {
					...searchParameters,
					facetFilters: [
						...(Array.isArray(raw) ? raw : [raw]).filter(
							(f) => !(typeof f === 'string' && f.startsWith('lang:')),
						),
						`lang:${lang.value}`,
					],
				},
			};
		}),

		navigator: {
			navigate(item: { itemUrl: string }) {
				router.go(item.itemUrl);
			},
		},

		transformItems(items) {
			return items.map((item) => ({
				...item,
				url: getRelativePath(item.url),
			}));
		},
	});
}

function getRelativePath(url: string) {
	const { pathname, hash } = new URL(url, location.origin);
	return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash;
}
</script>

<template>
	<div id="docsearch" />
</template>
