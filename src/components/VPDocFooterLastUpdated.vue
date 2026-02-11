<script setup lang="ts">
import { useNavigatorLanguage } from '@vueuse/core';
import { computed, onMounted, shallowRef, useTemplateRef, watchEffect } from 'vue';
import { useData } from '@/composables/data';
import { useI18n } from '@/composables/i18n';

const { theme, page, lang: pageLang } = useData();
const { language: browserLang } = useNavigatorLanguage();

const timeRef = useTemplateRef('timeRef');

const date = computed(() => new Date(page.value.lastUpdated as number));
const isoDatetime = computed(() => date.value.toISOString());
const datetime = shallowRef('');
const i18n = useI18n();

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
	watchEffect(() => {
		const lang = theme.value.lastUpdated?.forceLocale ? pageLang.value : browserLang.value;

		datetime.value = new Intl.DateTimeFormat(
			lang,
			theme.value.lastUpdated ?? {
				dateStyle: 'medium',
				timeStyle: 'medium',
			},
		).format(date.value);

		if (lang && pageLang.value !== lang) {
			timeRef.value?.setAttribute('lang', lang);
		} else {
			timeRef.value?.removeAttribute('lang');
		}
	});
});
</script>

<template>
	<p class="VPLastUpdated">
		{{ i18n.lastUpdate }}: <time ref="timeRef" :datetime="isoDatetime">{{ datetime }}</time>
	</p>
</template>

<style scoped>
.VPLastUpdated {
	line-height: 24px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
	.VPLastUpdated {
		line-height: 32px;
		font-size: 14px;
		font-weight: 500;
	}
}
</style>
